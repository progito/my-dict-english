// ===== RULES SYSTEM - rules.js =====

(function() {
    'use strict';

    const initRulesSystem = () => {
        if (!window.app) {
            setTimeout(initRulesSystem, 100);
            return;
        }

        const app = window.app;

        // Инициализируем данные правил
        app.rules = [];
        app.currentRuleId = null;
        app.selectedRules = new Set();

        // Загружаем правила
        app.loadRulesData();

        // Привязываем события
        app.bindRulesEvents();

        // Обновляем бейдж
        app.updateRulesBadge();

        console.log('Rules system initialized');
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRulesSystem);
    } else {
        initRulesSystem();
    }
})();

// ===================== ДАННЫЕ ПРАВИЛ =====================

DictionaryApp.prototype.loadRulesData = function() {
    try {
        const saved = localStorage.getItem('dictionary_rules');
        this.rules = saved ? JSON.parse(saved) : [];
    } catch (e) {
        console.error('Error loading rules:', e);
        this.rules = [];
    }
};

DictionaryApp.prototype.saveRulesData = function() {
    try {
        localStorage.setItem('dictionary_rules', JSON.stringify(this.rules));
        this.updateRulesBadge();
    } catch (e) {
        console.error('Error saving rules:', e);
        this.showToast('Ошибка сохранения правил', 'error');
    }
};

DictionaryApp.prototype.updateRulesBadge = function() {
    const badge = document.getElementById('navRulesBadge');
    if (badge) {
        badge.textContent = this.rules.length;
        badge.style.display = this.rules.length > 0 ? 'inline-flex' : 'none';
    }
};

// ===================== РЕНДЕР РАЗДЕЛА =====================

DictionaryApp.prototype.updateRulesSection = function() {
    this.selectedRules.clear();
    this.updateSelectedRulesUI();
    this.renderRulesGrid();
};

DictionaryApp.prototype.renderRulesGrid = function() {
    const grid = document.getElementById('rulesGrid');
    const emptyState = document.getElementById('rulesEmptyState');
    if (!grid) return;

    // Получаем фильтры
    const searchQuery = (document.getElementById('rulesSearchInput')?.value || '').toLowerCase().trim();
    const formatFilter = document.getElementById('rulesFormatFilter')?.value || 'all';
    const sortBy = document.getElementById('rulesSortSelect')?.value || 'newest';

    // Фильтруем
    let filtered = this.rules.filter(rule => {
        // Поиск
        if (searchQuery) {
            const titleMatch = (rule.title || '').toLowerCase().includes(searchQuery);
            const contentMatch = (rule.content || '').toLowerCase().includes(searchQuery);
            const examplesMatch = (rule.examples || []).some(ex => ex.toLowerCase().includes(searchQuery));
            if (!titleMatch && !contentMatch && !examplesMatch) return false;
        }

        // Формат
        if (formatFilter !== 'all' && rule.format !== formatFilter) return false;

        return true;
    });

    // Сортируем
    filtered.sort((a, b) => {
        switch (sortBy) {
            case 'newest': return (b.createdAt || 0) - (a.createdAt || 0);
            case 'oldest': return (a.createdAt || 0) - (b.createdAt || 0);
            case 'az': return (a.title || '').localeCompare(b.title || '');
            case 'za': return (b.title || '').localeCompare(a.title || '');
            default: return 0;
        }
    });

    // Показываем/скрываем empty state
    if (filtered.length === 0) {
        grid.innerHTML = '';
        if (emptyState) emptyState.style.display = 'flex';
        return;
    }

    if (emptyState) emptyState.style.display = 'none';

    // Рендерим карточки
    grid.innerHTML = filtered.map(rule => this.createRuleCard(rule)).join('');

    // Привязываем события к карточкам
    this.bindRuleCardEvents();
};

DictionaryApp.prototype.createRuleCard = function(rule) {
    const isSelected = this.selectedRules.has(rule.id);
    const formattedDate = this.formatRuleDate(rule.createdAt);
    
    let contentPreview = '';
    
    if (rule.format === 'text') {
        const textPreview = (rule.content || '').substring(0, 120);
        const examplesCount = (rule.examples || []).length;
        
        contentPreview = `
            <div class="rule-card-content">
                ${textPreview ? `<p class="rule-card-text-preview">${this.escapeHtml(textPreview)}${rule.content.length > 120 ? '...' : ''}</p>` : ''}
                ${examplesCount > 0 ? `
                    <div class="rule-card-examples-count">
                        <i class="fas fa-lightbulb"></i>
                        <span>${examplesCount} ${this.pluralize(examplesCount, 'пример', 'примера', 'примеров')}</span>
                    </div>
                ` : ''}
            </div>
        `;
    } else if (rule.format === 'table' && rule.tableData) {
        const headers = rule.tableData.headers || [];
        const rows = rule.tableData.rows || [];
        const displayRows = rows.slice(0, 2);
        const moreRows = rows.length - 2;

        contentPreview = `
            <div class="rule-card-content">
                <div class="rule-card-table-preview">
                    <table>
                        <thead>
                            <tr>
                                ${headers.map(h => `<th>${this.escapeHtml(h)}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            ${displayRows.map(row => `
                                <tr>
                                    ${row.map(cell => `<td>${this.escapeHtml(cell)}</td>`).join('')}
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    ${moreRows > 0 ? `<div class="rule-card-table-more">+ ещё ${moreRows} ${this.pluralize(moreRows, 'строка', 'строки', 'строк')}</div>` : ''}
                </div>
            </div>
        `;
    }

    return `
        <div class="rule-card ${isSelected ? 'selected' : ''}" data-rule-id="${rule.id}">
            <label class="rule-card-checkbox" onclick="event.stopPropagation()">
                <input type="checkbox" ${isSelected ? 'checked' : ''} data-rule-id="${rule.id}">
            </label>
            
            <div class="rule-card-image">
                ${rule.image 
                    ? `<img src="${this.escapeHtml(rule.image)}" alt="${this.escapeHtml(rule.title)}" onerror="this.parentElement.innerHTML='<div class=\\'rule-card-image-placeholder\\'><i class=\\'fas fa-gavel\\'></i></div>'">`
                    : '<div class="rule-card-image-placeholder"><i class="fas fa-gavel"></i></div>'
                }
            </div>
            
            <div class="rule-card-body">
                <div class="rule-card-header">
                    <h3 class="rule-card-title">${this.escapeHtml(rule.title)}</h3>
                    <div class="rule-card-actions" onclick="event.stopPropagation()">
                        <button class="icon-btn edit-rule-btn" title="Редактировать" data-rule-id="${rule.id}">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="icon-btn delete delete-rule-btn" title="Удалить" data-rule-id="${rule.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                
                <span class="rule-format-badge ${rule.format}">
                    <i class="fas fa-${rule.format === 'text' ? 'align-left' : 'table'}"></i>
                    ${rule.format === 'text' ? 'Текст' : 'Таблица'}
                </span>
                
                ${contentPreview}
                
                <div class="rule-card-footer">
                    <span class="rule-card-date">
                        <i class="fas fa-calendar"></i>
                        ${formattedDate}
                    </span>
                </div>
            </div>
        </div>
    `;
};

DictionaryApp.prototype.bindRuleCardEvents = function() {
    const grid = document.getElementById('rulesGrid');
    if (!grid) return;

    // Клик по карточке - открыть просмотр
    grid.querySelectorAll('.rule-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (e.target.closest('.rule-card-checkbox') || e.target.closest('.rule-card-actions')) return;
            const ruleId = card.dataset.ruleId;
            this.openViewRuleModal(ruleId);
        });
    });

    // Чекбоксы
    grid.querySelectorAll('.rule-card-checkbox input').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const ruleId = e.target.dataset.ruleId;
            if (e.target.checked) {
                this.selectedRules.add(ruleId);
            } else {
                this.selectedRules.delete(ruleId);
            }
            this.updateSelectedRulesUI();
            e.target.closest('.rule-card').classList.toggle('selected', e.target.checked);
        });
    });

    // Кнопки редактирования
    grid.querySelectorAll('.edit-rule-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const ruleId = btn.dataset.ruleId;
            this.openRuleModal(ruleId);
        });
    });

    // Кнопки удаления
    grid.querySelectorAll('.delete-rule-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const ruleId = btn.dataset.ruleId;
            this.openDeleteRuleModal(ruleId);
        });
    });
};

// ===================== ВЫБОР НЕСКОЛЬКИХ =====================

DictionaryApp.prototype.updateSelectedRulesUI = function() {
    const count = this.selectedRules.size;
    const deleteBtn = document.getElementById('deleteSelectedRulesBtn');
    const countSpan = document.getElementById('selectedRulesCount');
    const selectAllCheckbox = document.getElementById('rulesSelectAll');

    if (deleteBtn) {
        deleteBtn.style.display = count > 0 ? 'inline-flex' : 'none';
    }

    if (countSpan) {
        countSpan.textContent = count;
    }

    if (selectAllCheckbox) {
        const visibleCards = document.querySelectorAll('.rule-card');
        selectAllCheckbox.checked = visibleCards.length > 0 && count === visibleCards.length;
        selectAllCheckbox.indeterminate = count > 0 && count < visibleCards.length;
    }
};

DictionaryApp.prototype.toggleSelectAllRules = function() {
    const selectAllCheckbox = document.getElementById('rulesSelectAll');
    const visibleCards = document.querySelectorAll('.rule-card');

    if (selectAllCheckbox?.checked) {
        visibleCards.forEach(card => {
            const ruleId = card.dataset.ruleId;
            this.selectedRules.add(ruleId);
            card.classList.add('selected');
            const checkbox = card.querySelector('.rule-card-checkbox input');
            if (checkbox) checkbox.checked = true;
        });
    } else {
        this.selectedRules.clear();
        visibleCards.forEach(card => {
            card.classList.remove('selected');
            const checkbox = card.querySelector('.rule-card-checkbox input');
            if (checkbox) checkbox.checked = false;
        });
    }

    this.updateSelectedRulesUI();
};

// ===================== МОДАЛЬНЫЕ ОКНА =====================

// Открытие модалки добавления/редактирования
DictionaryApp.prototype.openRuleModal = function(ruleId = null) {
    this.currentRuleId = ruleId;

    const modal = document.getElementById('ruleModal');
    const title = document.getElementById('ruleModalTitle');
    const form = document.getElementById('ruleForm');

    // Сбрасываем форму
    form?.reset();
    
    // Очищаем превью картинки
    const imagePreview = document.getElementById('ruleImagePreview');
    if (imagePreview) {
        imagePreview.innerHTML = '';
        imagePreview.classList.remove('has-image');
    }

    // Сбрасываем таблицу
    this.resetTableEditor();

    // Показываем текстовый формат по умолчанию
    this.toggleRuleFormat('text');

    if (ruleId) {
        // Редактирование
        const rule = this.rules.find(r => r.id === ruleId);
        if (!rule) return;

        if (title) title.innerHTML = '<i class="fas fa-edit"></i> Редактировать правило';

        // Заполняем поля
        document.getElementById('ruleTitleInput').value = rule.title || '';
        document.getElementById('ruleImageInput').value = rule.image || '';

        if (rule.image) {
            this.previewImage(rule.image, imagePreview);
        }

        // Формат
        const formatRadio = document.querySelector(`input[name="ruleFormat"][value="${rule.format}"]`);
        if (formatRadio) formatRadio.checked = true;
        this.toggleRuleFormat(rule.format);

        if (rule.format === 'text') {
            document.getElementById('ruleContentInput').value = rule.content || '';
            document.getElementById('ruleExamplesInput').value = (rule.examples || []).join('\n');
        } else if (rule.format === 'table' && rule.tableData) {
            this.loadTableData(rule.tableData);
        }
    } else {
        // Добавление
        if (title) title.innerHTML = '<i class="fas fa-plus-circle"></i> Добавить правило';
    }

    this.openModal('ruleModal');
};

// Переключение формата
DictionaryApp.prototype.toggleRuleFormat = function(format) {
    const textFormat = document.getElementById('ruleTextFormat');
    const tableFormat = document.getElementById('ruleTableFormat');

    if (textFormat) textFormat.style.display = format === 'text' ? 'block' : 'none';
    if (tableFormat) tableFormat.style.display = format === 'table' ? 'block' : 'none';
};

// Сброс редактора таблицы
DictionaryApp.prototype.resetTableEditor = function() {
    const headerRow = document.getElementById('ruleTableHeader');
    const tbody = document.getElementById('ruleTableBody');

    if (headerRow) {
        headerRow.innerHTML = `
            <th><input type="text" placeholder="Заголовок 1" class="table-header-input"></th>
            <th><input type="text" placeholder="Заголовок 2" class="table-header-input"></th>
            <th class="table-actions-col"></th>
        `;
    }

    if (tbody) {
        tbody.innerHTML = `
            <tr>
                <td><input type="text" placeholder="Ячейка" class="table-cell-input"></td>
                <td><input type="text" placeholder="Ячейка" class="table-cell-input"></td>
                <td class="table-row-actions">
                    <button type="button" class="btn-icon danger remove-table-row"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    }

    this.bindTableRowEvents();
};

// Загрузка данных таблицы
DictionaryApp.prototype.loadTableData = function(tableData) {
    const headerRow = document.getElementById('ruleTableHeader');
    const tbody = document.getElementById('ruleTableBody');
    const headers = tableData.headers || [];
    const rows = tableData.rows || [];

    if (headerRow) {
        headerRow.innerHTML = headers.map(h => 
            `<th><input type="text" placeholder="Заголовок" class="table-header-input" value="${this.escapeHtml(h)}"></th>`
        ).join('') + '<th class="table-actions-col"></th>';
    }

    if (tbody) {
        tbody.innerHTML = rows.map(row => `
            <tr>
                ${row.map(cell => `<td><input type="text" placeholder="Ячейка" class="table-cell-input" value="${this.escapeHtml(cell)}"></td>`).join('')}
                <td class="table-row-actions">
                    <button type="button" class="btn-icon danger remove-table-row"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `).join('');
    }

    this.bindTableRowEvents();
};

// Добавление столбца
DictionaryApp.prototype.addTableColumn = function() {
    const headerRow = document.getElementById('ruleTableHeader');
    const tbody = document.getElementById('ruleTableBody');

    if (headerRow) {
        const actionsCol = headerRow.querySelector('.table-actions-col');
        const newTh = document.createElement('th');
        newTh.innerHTML = '<input type="text" placeholder="Заголовок" class="table-header-input">';
        headerRow.insertBefore(newTh, actionsCol);
    }

    if (tbody) {
        tbody.querySelectorAll('tr').forEach(row => {
            const actionsCell = row.querySelector('.table-row-actions');
            const newTd = document.createElement('td');
            newTd.innerHTML = '<input type="text" placeholder="Ячейка" class="table-cell-input">';
            row.insertBefore(newTd, actionsCell);
        });
    }
};

// Добавление строки
DictionaryApp.prototype.addTableRow = function() {
    const tbody = document.getElementById('ruleTableBody');
    const headerRow = document.getElementById('ruleTableHeader');
    if (!tbody || !headerRow) return;

    const colCount = headerRow.querySelectorAll('th:not(.table-actions-col)').length;
    
    const newRow = document.createElement('tr');
    newRow.innerHTML = Array(colCount).fill('<td><input type="text" placeholder="Ячейка" class="table-cell-input"></td>').join('') +
        `<td class="table-row-actions">
            <button type="button" class="btn-icon danger remove-table-row"><i class="fas fa-trash"></i></button>
        </td>`;
    
    tbody.appendChild(newRow);
    this.bindTableRowEvents();
};

// Привязка событий к строкам таблицы
DictionaryApp.prototype.bindTableRowEvents = function() {
    const tbody = document.getElementById('ruleTableBody');
    if (!tbody) return;

    tbody.querySelectorAll('.remove-table-row').forEach(btn => {
        btn.onclick = (e) => {
            const row = e.target.closest('tr');
            if (tbody.querySelectorAll('tr').length > 1) {
                row.remove();
            } else {
                this.showToast('Нельзя удалить последнюю строку', 'warning');
            }
        };
    });
};

// Получение данных таблицы
DictionaryApp.prototype.getTableData = function() {
    const headerRow = document.getElementById('ruleTableHeader');
    const tbody = document.getElementById('ruleTableBody');

    const headers = [];
    headerRow?.querySelectorAll('.table-header-input').forEach(input => {
        headers.push(input.value.trim());
    });

    const rows = [];
    tbody?.querySelectorAll('tr').forEach(tr => {
        const row = [];
        tr.querySelectorAll('.table-cell-input').forEach(input => {
            row.push(input.value.trim());
        });
        rows.push(row);
    });

    return { headers, rows };
};

// Сохранение правила
DictionaryApp.prototype.saveRule = function() {
    const title = document.getElementById('ruleTitleInput')?.value.trim();
    const image = document.getElementById('ruleImageInput')?.value.trim();
    const format = document.querySelector('input[name="ruleFormat"]:checked')?.value || 'text';

    if (!title) {
        this.showToast('Введите заголовок правила', 'error');
        return;
    }

    let ruleData = {
        title,
        image,
        format,
        updatedAt: Date.now()
    };

    if (format === 'text') {
        ruleData.content = document.getElementById('ruleContentInput')?.value.trim() || '';
        const examplesText = document.getElementById('ruleExamplesInput')?.value.trim() || '';
        ruleData.examples = examplesText.split('\n').map(e => e.trim()).filter(e => e);
        ruleData.tableData = null;
    } else {
        ruleData.tableData = this.getTableData();
        ruleData.content = '';
        ruleData.examples = [];
    }

    if (this.currentRuleId) {
        // Редактирование
        const index = this.rules.findIndex(r => r.id === this.currentRuleId);
        if (index !== -1) {
            this.rules[index] = { ...this.rules[index], ...ruleData };
            this.showToast('Правило обновлено', 'success');
        }
    } else {
        // Добавление
        ruleData.id = 'rule-' + Date.now();
        ruleData.createdAt = Date.now();
        this.rules.unshift(ruleData);
        this.showToast('Правило добавлено', 'success');
    }

    this.saveRulesData();
    this.closeModal('ruleModal');
    this.renderRulesGrid();
};

// Открытие просмотра правила
DictionaryApp.prototype.openViewRuleModal = function(ruleId) {
    const rule = this.rules.find(r => r.id === ruleId);
    if (!rule) return;

    this.currentRuleId = ruleId;
    const body = document.getElementById('viewRuleBody');
    if (!body) return;

    const formattedDate = this.formatRuleDate(rule.createdAt);

    let contentHtml = '';

    if (rule.format === 'text') {
        contentHtml = `
            ${rule.content ? `
                <div class="view-rule-text">
                    <h3><i class="fas fa-file-alt"></i> Правило</h3>
                    <div class="view-rule-text-content">${this.escapeHtml(rule.content)}</div>
                </div>
            ` : ''}
            
            ${rule.examples && rule.examples.length > 0 ? `
                <div class="view-rule-examples">
                    <h3><i class="fas fa-lightbulb"></i> Примеры</h3>
                    <div class="view-rule-examples-list">
                        ${rule.examples.map(ex => `<div class="view-rule-example-item">${this.escapeHtml(ex)}</div>`).join('')}
                    </div>
                </div>
            ` : ''}
        `;
    } else if (rule.format === 'table' && rule.tableData) {
        const { headers, rows } = rule.tableData;
        contentHtml = `
            <div class="view-rule-table">
                <h3><i class="fas fa-table"></i> Таблица</h3>
                <div class="view-rule-table-wrapper">
                    <table>
                        <thead>
                            <tr>
                                ${headers.map(h => `<th>${this.escapeHtml(h)}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            ${rows.map(row => `
                                <tr>
                                    ${row.map(cell => `<td>${this.escapeHtml(cell)}</td>`).join('')}
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    body.innerHTML = `
        <div class="view-rule-content">
            <div class="view-rule-header">
                ${rule.image ? `
                    <div class="view-rule-image">
                        <img src="${this.escapeHtml(rule.image)}" alt="${this.escapeHtml(rule.title)}">
                    </div>
                ` : ''}
                <h2 class="view-rule-title">${this.escapeHtml(rule.title)}</h2>
                <div class="view-rule-meta">
                    <span>
                        <i class="fas fa-${rule.format === 'text' ? 'align-left' : 'table'}"></i>
                        ${rule.format === 'text' ? 'Текстовое' : 'Табличное'}
                    </span>
                    <span>
                        <i class="fas fa-calendar"></i>
                        ${formattedDate}
                    </span>
                </div>
            </div>
            ${contentHtml}
        </div>
    `;

    this.openModal('viewRuleModal');
};

// Открытие модалки удаления
DictionaryApp.prototype.openDeleteRuleModal = function(ruleId) {
    const rule = this.rules.find(r => r.id === ruleId);
    if (!rule) return;

    this.currentRuleId = ruleId;
    
    const nameEl = document.getElementById('deleteRuleName');
    if (nameEl) nameEl.textContent = rule.title;

    this.openModal('deleteRuleModal');
};

// Удаление правила
DictionaryApp.prototype.deleteRule = function() {
    if (!this.currentRuleId) return;

    const index = this.rules.findIndex(r => r.id === this.currentRuleId);
    if (index !== -1) {
        this.rules.splice(index, 1);
        this.saveRulesData();
        this.showToast('Правило удалено', 'success');
    }

    this.closeModal('deleteRuleModal');
    this.closeModal('viewRuleModal');
    this.renderRulesGrid();
};

// Открытие модалки удаления нескольких
DictionaryApp.prototype.openDeleteMultipleRulesModal = function() {
    const count = this.selectedRules.size;
    if (count === 0) return;

    const countEl = document.getElementById('deleteRulesCount');
    if (countEl) countEl.textContent = count;

    this.openModal('deleteMultipleRulesModal');
};

// Удаление нескольких правил
DictionaryApp.prototype.deleteMultipleRules = function() {
    if (this.selectedRules.size === 0) return;

    this.rules = this.rules.filter(r => !this.selectedRules.has(r.id));
    this.saveRulesData();
    this.selectedRules.clear();
    this.updateSelectedRulesUI();
    
    this.showToast('Правила удалены', 'success');
    this.closeModal('deleteMultipleRulesModal');
    this.renderRulesGrid();
};

// ===================== СОБЫТИЯ =====================

DictionaryApp.prototype.bindRulesEvents = function() {
    // Кнопка добавления
    document.getElementById('addRuleBtn')?.addEventListener('click', () => this.openRuleModal());
    document.getElementById('rulesEmptyAddBtn')?.addEventListener('click', () => this.openRuleModal());

    // Поиск и фильтры
    document.getElementById('rulesSearchInput')?.addEventListener('input', () => this.renderRulesGrid());
    document.getElementById('rulesFormatFilter')?.addEventListener('change', () => this.renderRulesGrid());
    document.getElementById('rulesSortSelect')?.addEventListener('change', () => this.renderRulesGrid());

    // Очистка поиска
    document.getElementById('clearRulesSearch')?.addEventListener('click', () => {
        const input = document.getElementById('rulesSearchInput');
        if (input) {
            input.value = '';
            this.renderRulesGrid();
        }
    });

    // Выбор всех
    document.getElementById('rulesSelectAll')?.addEventListener('change', () => this.toggleSelectAllRules());

    // Удаление выбранных
    document.getElementById('deleteSelectedRulesBtn')?.addEventListener('click', () => this.openDeleteMultipleRulesModal());

    // Модалка добавления/редактирования
    document.getElementById('closeRuleModal')?.addEventListener('click', () => this.closeModal('ruleModal'));
    document.getElementById('cancelRuleBtn')?.addEventListener('click', () => this.closeModal('ruleModal'));
    document.querySelector('#ruleModal .modal-overlay')?.addEventListener('click', () => this.closeModal('ruleModal'));

    document.getElementById('ruleForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        this.saveRule();
    });

    // Превью картинки
    document.getElementById('previewRuleImageBtn')?.addEventListener('click', () => {
        const url = document.getElementById('ruleImageInput')?.value;
        const preview = document.getElementById('ruleImagePreview');
        if (url && preview) this.previewImage(url, preview);
    });

    document.getElementById('ruleImageInput')?.addEventListener('blur', (e) => {
        const preview = document.getElementById('ruleImagePreview');
        if (preview) this.previewImage(e.target.value, preview);
    });

    // Переключение формата
    document.querySelectorAll('input[name="ruleFormat"]').forEach(radio => {
        radio.addEventListener('change', (e) => this.toggleRuleFormat(e.target.value));
    });

    // Таблица
    document.getElementById('addTableColumn')?.addEventListener('click', () => this.addTableColumn());
    document.getElementById('addTableRow')?.addEventListener('click', () => this.addTableRow());

    // Модалка просмотра
    document.getElementById('closeViewRuleModal')?.addEventListener('click', () => this.closeModal('viewRuleModal'));
    document.querySelector('#viewRuleModal .modal-overlay')?.addEventListener('click', () => this.closeModal('viewRuleModal'));

    document.getElementById('editRuleFromView')?.addEventListener('click', () => {
        this.closeModal('viewRuleModal');
        this.openRuleModal(this.currentRuleId);
    });

    document.getElementById('deleteRuleFromView')?.addEventListener('click', () => {
        this.closeModal('viewRuleModal');
        this.openDeleteRuleModal(this.currentRuleId);
    });

    // Модалка удаления
    document.getElementById('closeDeleteRuleModal')?.addEventListener('click', () => this.closeModal('deleteRuleModal'));
    document.getElementById('cancelDeleteRule')?.addEventListener('click', () => this.closeModal('deleteRuleModal'));
    document.querySelector('#deleteRuleModal .modal-overlay')?.addEventListener('click', () => this.closeModal('deleteRuleModal'));
    document.getElementById('confirmDeleteRule')?.addEventListener('click', () => this.deleteRule());

    // Модалка удаления нескольких
    document.getElementById('closeDeleteMultipleRulesModal')?.addEventListener('click', () => this.closeModal('deleteMultipleRulesModal'));
    document.getElementById('cancelDeleteMultipleRules')?.addEventListener('click', () => this.closeModal('deleteMultipleRulesModal'));
    document.querySelector('#deleteMultipleRulesModal .modal-overlay')?.addEventListener('click', () => this.closeModal('deleteMultipleRulesModal'));
    document.getElementById('confirmDeleteMultipleRules')?.addEventListener('click', () => this.deleteMultipleRules());
};

// ===================== УТИЛИТЫ =====================

DictionaryApp.prototype.formatRuleDate = function(timestamp) {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};

DictionaryApp.prototype.pluralize = function(count, one, few, many) {
    const mod10 = count % 10;
    const mod100 = count % 100;

    if (mod100 >= 11 && mod100 <= 19) return many;
    if (mod10 === 1) return one;
    if (mod10 >= 2 && mod10 <= 4) return few;
    return many;
};

// ===================== ИНТЕГРАЦИЯ С renderCurrentSection =====================

const originalRenderCurrentSection2 = DictionaryApp.prototype.renderCurrentSection;
DictionaryApp.prototype.renderCurrentSection = function() {
    if (this.currentSection === 'rules') {
        this.updateRulesSection();
        return;
    }

    if (originalRenderCurrentSection2) {
        originalRenderCurrentSection2.call(this);
    }
};

// ===================== ЭКСПОРТ/ИМПОРТ =====================

// Расширяем экспорт данных
const originalExportData = DictionaryApp.prototype.exportData;
DictionaryApp.prototype.exportData = function() {
    const data = {
        words: this.words,
        settings: this.settings,
        stats: this.stats,
        readTexts: this.readTexts,
        videosMeta: this.videosMeta,
        currentGoal: this.currentGoal,
        goalHistory: this.goalHistory,
        rules: this.rules, // Добавляем правила
        exportDate: new Date().toISOString(),
        version: '2.6'
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dictionary_export_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    this.showToast('Данные экспортированы', 'success');
};

// Расширяем импорт данных
const originalImportData = DictionaryApp.prototype.importData;
DictionaryApp.prototype.importData = function(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);

            if (data.words) this.words = data.words;
            if (data.settings) this.settings = { ...this.settings, ...data.settings };
            if (data.stats) this.stats = { ...this.stats, ...data.stats };
            if (data.readTexts) this.readTexts = data.readTexts;
            if (data.videosMeta) this.videosMeta = data.videosMeta;
            if (data.currentGoal) this.currentGoal = data.currentGoal;
            if (data.goalHistory) this.goalHistory = data.goalHistory;
            if (data.rules) this.rules = data.rules; // Импортируем правила

            this.saveWords();
            this.saveSettings();
            this.saveStats();
            this.saveReadTexts();
            this.saveVideosMeta();
            this.saveGoalData();
            this.saveRulesData();

            this.applyTheme();
            this.renderCurrentSection();
            this.updateAllStats();
            this.updateGoalBadge();
            this.updateRulesBadge();

            this.showToast('Данные успешно импортированы', 'success');
        } catch (error) {
            this.showToast('Ошибка при импорте данных', 'error');
            console.error(error);
        }
    };
    reader.readAsText(file);

    event.target.value = '';
};

// Расширяем очистку данных
const originalClearAllData = DictionaryApp.prototype.clearAllData;
DictionaryApp.prototype.clearAllData = function() {
    this.stopAudio?.();
    this.stopVideoPlayback?.();

    if (this.isRecording) {
        this.stopRecording();
    }

    this.words = [];
    this.readTexts = [];
    this.audioCache = {};
    this.videosMeta = {};
    this.transcript = '';
    this.interimTranscript = '';
    this.currentGoal = null;
    this.goalHistory = [];
    this.rules = []; // Очищаем правила
    this.settings = {
        theme: 'light',
        autoBackup: true,
        manualLevel: 'auto'
    };
    this.stats = {
        totalPractices: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        lastBackup: null
    };

    localStorage.clear();

    this.applyTheme();
    this.closeModal('clearModal');
    this.renderCurrentSection();
    this.updateAllStats();
    this.updateGoalBadge?.();
    this.updateRulesBadge();

    this.showToast('Все данные удалены', 'success');
};

// Расширяем updateStorageUsed
const originalUpdateStorageUsed = DictionaryApp.prototype.updateStorageUsed;
DictionaryApp.prototype.updateStorageUsed = function() {
    const elem = document.getElementById('storageUsed');
    if (!elem) return;

    const data = JSON.stringify({
        words: this.words,
        settings: this.settings,
        stats: this.stats,
        readTexts: this.readTexts,
        videosMeta: this.videosMeta,
        currentGoal: this.currentGoal,
        goalHistory: this.goalHistory,
        rules: this.rules
    });
    const bytes = new Blob([data]).size;
    const kb = (bytes / 1024).toFixed(2);
    elem.textContent = `${kb} KB`;
};
