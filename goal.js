// ===== GOAL SYSTEM - goal.js =====

// Инициализация системы целей после загрузки основного приложения
(function() {
    'use strict';

    // Ждём загрузки основного приложения
    const initGoalSystem = () => {
        if (!window.app) {
            setTimeout(initGoalSystem, 100);
            return;
        }

        const app = window.app;

        // Загружаем данные целей
        app.loadGoalData();
        
        // Привязываем события
        app.bindGoalEvents();
        
        // Обновляем бейдж в навигации
        app.updateGoalBadge();
        
        // Инициализируем текущую неделю
        app.currentGoalWeek = 0;

        console.log('Goal system initialized');
    };

    // Запускаем после загрузки DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGoalSystem);
    } else {
        initGoalSystem();
    }
})();

// ===================== РАСШИРЕНИЕ ФУНКЦИОНАЛА ЦЕЛЕЙ =====================

// Загрузка данных целей
DictionaryApp.prototype.loadGoalData = function() {
    try {
        const savedGoal = localStorage.getItem('dictionary_current_goal');
        this.currentGoal = savedGoal ? JSON.parse(savedGoal) : null;

        const savedHistory = localStorage.getItem('dictionary_goal_history');
        this.goalHistory = savedHistory ? JSON.parse(savedHistory) : [];
        
        // Инициализируем текущую неделю
        this.currentGoalWeek = 0;
    } catch (e) {
        console.error('Error loading goal data:', e);
        this.currentGoal = null;
        this.goalHistory = [];
    }
};

// Сохранение данных целей
DictionaryApp.prototype.saveGoalData = function() {
    try {
        localStorage.setItem('dictionary_current_goal', JSON.stringify(this.currentGoal));
        localStorage.setItem('dictionary_goal_history', JSON.stringify(this.goalHistory));
    } catch (e) {
        console.error('Error saving goal data:', e);
        this.showToast('Ошибка сохранения данных цели', 'error');
    }
};

// Получение словарного запаса по уровню
DictionaryApp.prototype.getVocabForLevel = function(levelId) {
    const vocabMap = {
        'a0': 0,          // Начало пути
        'pre-a1': 100,    // 100+ слов
        'a1': 250,        // 250+ слов (Elementary)
        'pre-a2': 600,    // 600+ слов
        'a2': 800,        // 800+ слов (Pre-Intermediate)
        'pre-b1': 1100,   // 1100+ слов
        'b1': 1400,       // 1400+ слов (Intermediate)
        'pre-b2': 1600,   // 1600+ слов
        'b2': 2000,       // 2000+ слов (Upper-Intermediate)
        'pre-c1': 2500,   // 2500+ слов
        'c1': 3000,       // 3000+ слов (Advanced)
        'c1-pro': 3250,   // 3250+ слов
        'pre-c2': 3500,   // 3500+ слов
        'c2': 3800,       // 3800+ слов (Proficient)
        'c2-pro': 4200    // 4100+ слов (Mastery)
    };
    return vocabMap[levelId] || 3000;
};

// Обновление бейджа цели в навигации
DictionaryApp.prototype.updateGoalBadge = function() {
    const badge = document.getElementById('navGoalBadge');
    if (badge) {
        if (this.currentGoal && this.currentGoal.active) {
            badge.style.display = 'inline-flex';
        } else {
            badge.style.display = 'none';
        }
    }
};

// Обновление раздела цели
DictionaryApp.prototype.updateGoalSection = function() {
    const goalSetup = document.getElementById('goalSetup');
    const goalActive = document.getElementById('goalActive');

    if (this.currentGoal && this.currentGoal.active) {
        if (goalSetup) goalSetup.style.display = 'none';
        if (goalActive) goalActive.style.display = 'block';
        this.renderActiveGoal();
        this.renderGoalChart();
    } else {
        if (goalSetup) goalSetup.style.display = 'block';
        if (goalActive) goalActive.style.display = 'none';
    }
};

// Инициализация формы создания цели
DictionaryApp.prototype.initGoalForm = function() {
    // Устанавливаем начальное значение словарного запаса
    const targetLevelSelect = document.getElementById('goalTargetLevel');
    const targetVocabInput = document.getElementById('goalTargetVocab');
    
    if (targetLevelSelect && targetVocabInput) {
        const vocab = this.getVocabForLevel(targetLevelSelect.value);
        targetVocabInput.value = vocab;
    }
};

// Старт новой цели
DictionaryApp.prototype.startGoal = function() {
    const currentLevel = document.getElementById('goalCurrentLevel')?.value || 'a1';
    const currentVocab = parseInt(document.getElementById('goalCurrentVocab')?.value) || 0;
    const canReadA = document.getElementById('goalCanReadA')?.checked || false;
    const canWriteA = document.getElementById('goalCanWriteA')?.checked || false;
    const canSpeakA = document.getElementById('goalCanSpeakA')?.checked || false;
    const canListenA = document.getElementById('goalCanListenA')?.checked || false;

    const targetLevel = document.getElementById('goalTargetLevel')?.value || 'b1';
    const targetVocab = parseInt(document.getElementById('goalTargetVocab')?.value) || 3000;
    const canReadB = document.getElementById('goalCanReadB')?.checked || true;
    const canWriteB = document.getElementById('goalCanWriteB')?.checked || true;
    const canSpeakB = document.getElementById('goalCanSpeakB')?.checked || true;
    const canListenB = document.getElementById('goalCanListenB')?.checked || true;

    const activePeriodBadge = document.querySelector('.goal-period-badge.active');
    const periodDays = activePeriodBadge ? parseInt(activePeriodBadge.dataset.days) : 90;

    // Проверка: целевой уровень должен быть выше текущего
    const levelOrder = ['a0', 'pre-a1', 'a1', 'pre-a2', 'a2', 'pre-b1', 'b1', 'pre-b2', 'b2', 'pre-c1', 'c1', 'c1-pro', 'pre-c2', 'c2', 'c2-pro'];
    const currentIdx = levelOrder.indexOf(currentLevel);
    const targetIdx = levelOrder.indexOf(targetLevel);
    
    if (targetIdx <= currentIdx) {
        this.showToast('Целевой уровень должен быть выше текущего', 'error');
        return;
    }

    const startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(startDate.getTime() + periodDays * 24 * 60 * 60 * 1000);

    this.currentGoal = {
        id: 'goal-' + Date.now(),
        active: true,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        periodDays: periodDays,
        pointA: {
            level: currentLevel,
            vocab: currentVocab,
            canRead: canReadA,
            canWrite: canWriteA,
            canSpeak: canSpeakA,
            canListen: canListenA
        },
        pointB: {
            level: targetLevel,
            vocab: targetVocab,
            canRead: canReadB,
            canWrite: canWriteB,
            canSpeak: canSpeakB,
            canListen: canListenB
        },
        stats: {
            totalNewWords: 0,
            totalLearnedWords: 0,
            totalTexts: 0,
            totalVideos: 0,
            totalNewsVideos: 0,
            totalSpeakingMinutes: 0,
            totalWritingMinutes: 0,
            totalListeningMinutes: 0,
            streak: 0,
            maxStreak: 0,
            daysCompleted: 0
        },
        dailyLogs: {}
    };

    this.currentGoalWeek = 0;
    this.saveGoalData();
    this.updateGoalBadge();
    this.updateGoalSection();
    this.showToast('Цель успешно открыта! Удачи в достижении!', 'success');
};

// Рендер активной цели
DictionaryApp.prototype.renderActiveGoal = function() {
    if (!this.currentGoal) return;

    const goal = this.currentGoal;
    const startDate = new Date(goal.startDate);
    const endDate = new Date(goal.endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const totalDays = goal.periodDays;
    const daysPassed = Math.floor((today - startDate) / (1000 * 60 * 60 * 24)) + 1;
    const currentDay = Math.max(1, Math.min(daysPassed, totalDays));
    const daysLeft = Math.max(0, totalDays - daysPassed);
    const progressPercent = Math.min((currentDay / totalDays) * 100, 100);

    // Обновление UI
    const goalDates = document.getElementById('goalDates');
    if (goalDates) {
        goalDates.textContent = `${this.formatDateShort(startDate)} - ${this.formatDateShort(endDate)}`;
    }

    const fromLevel = document.getElementById('goalFromLevel');
    const toLevel = document.getElementById('goalToLevel');
    if (fromLevel) fromLevel.textContent = goal.pointA.level.toUpperCase();
    if (toLevel) toLevel.textContent = goal.pointB.level.toUpperCase();

    const currentDayEl = document.getElementById('goalCurrentDay');
    const totalDaysEl = document.getElementById('goalTotalDays');
    const progressPercentEl = document.getElementById('goalProgressPercent');
    const progressFillEl = document.getElementById('goalProgressFill');
    const daysLeftEl = document.getElementById('goalDaysLeft');

    if (currentDayEl) currentDayEl.textContent = currentDay;
    if (totalDaysEl) totalDaysEl.textContent = totalDays;
    if (progressPercentEl) progressPercentEl.textContent = Math.round(progressPercent) + '%';
    if (progressFillEl) progressFillEl.style.width = progressPercent + '%';
    if (daysLeftEl) daysLeftEl.textContent = daysLeft;

    this.updateGoalStats();
    this.renderGoalWeek();
    
    // Проверяем, закрыт ли сегодняшний день
    this.updateCloseDayButton();
};

// Обновление кнопки закрытия дня
DictionaryApp.prototype.updateCloseDayButton = function() {
    const closeDayBtn = document.getElementById('closeDayBtn');
    if (!closeDayBtn || !this.currentGoal) return;

    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    const isCompleted = this.currentGoal.dailyLogs[dateStr]?.completed;

    if (isCompleted) {
        closeDayBtn.innerHTML = '<i class="fas fa-check-circle"></i> День закрыт';
        closeDayBtn.disabled = true;
        closeDayBtn.classList.remove('btn-success');
        closeDayBtn.classList.add('btn-secondary');
    } else {
        closeDayBtn.innerHTML = '<i class="fas fa-check-circle"></i> Закрыть сегодняшний день';
        closeDayBtn.disabled = false;
        closeDayBtn.classList.remove('btn-secondary');
        closeDayBtn.classList.add('btn-success');
    }
};

// Форматирование даты
DictionaryApp.prototype.formatDateShort = function(date) {
    const d = new Date(date);
    return d.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit', year: 'numeric' });
};

// Обновление статистики цели
// Обновление статистики цели (с учетом сегодняшней активности, даже если день ещё не закрыт)
DictionaryApp.prototype.updateGoalStats = function() {
    if (!this.currentGoal) return;

    const stats = this.currentGoal.stats || {};
    const todayKey = this.getTodayKey ? this.getTodayKey() : new Date().toISOString().split('T')[0];

    const todayLog = this.currentGoal.dailyLogs?.[todayKey];
    const todayIsClosed = !!todayLog?.completed;

    // если сегодня ещё не закрыто — добавляем автостату "за сегодня" к общим итогам
    const autoToday = (!todayIsClosed && typeof this.getAutoDailyStatsForDate === 'function')
        ? this.getAutoDailyStatsForDate(todayKey)
        : { newWords: 0, learnedWords: 0, texts: 0, videos: 0, news: 0, speaking: 0, writing: 0, listening: 0 };

    const effective = {
        totalNewWords: (Number(stats.totalNewWords) || 0) + (Number(autoToday.newWords) || 0),
        totalLearnedWords: (Number(stats.totalLearnedWords) || 0) + (Number(autoToday.learnedWords) || 0),
        totalTexts: (Number(stats.totalTexts) || 0) + (Number(autoToday.texts) || 0),
        totalVideos: (Number(stats.totalVideos) || 0) + (Number(autoToday.videos) || 0),
        totalSpeakingMinutes: (Number(stats.totalSpeakingMinutes) || 0) + (Number(autoToday.speaking) || 0),
        streak: Number(stats.streak) || 0
    };

    const elements = {
        goalStatNewWords: effective.totalNewWords,
        goalStatLearnedWords: effective.totalLearnedWords,
        goalStatTexts: effective.totalTexts,
        goalStatVideos: effective.totalVideos,
        goalStatSpeaking: effective.totalSpeakingMinutes,
        goalStatStreak: effective.streak
    };

    Object.entries(elements).forEach(([id, value]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    });
};

// Рендер недели в календаре
DictionaryApp.prototype.renderGoalWeek = function() {
    if (!this.currentGoal) return;

    const weekDaysContainer = document.getElementById('goalWeekDays');
    const weekLabel = document.getElementById('goalWeekLabel');
    if (!weekDaysContainer) return;

    const startDate = new Date(this.currentGoal.startDate);
    startDate.setHours(0, 0, 0, 0);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const totalWeeks = Math.ceil(this.currentGoal.periodDays / 7);
    const currentWeekNum = Math.min(Math.max(0, this.currentGoalWeek || 0), totalWeeks - 1);
    this.currentGoalWeek = currentWeekNum;

    if (weekLabel) {
        weekLabel.textContent = `Неделя ${currentWeekNum + 1} из ${totalWeeks}`;
    }

    // Получаем начало периода цели и прибавляем недели
    const weekStartDate = new Date(startDate);
    weekStartDate.setDate(weekStartDate.getDate() + (currentWeekNum * 7));

    // Корректируем на понедельник той недели
    const dayOfWeek = weekStartDate.getDay();
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
    
    const mondayOfWeek = new Date(weekStartDate);
    mondayOfWeek.setDate(mondayOfWeek.getDate() + diffToMonday);

    const goalStart = new Date(this.currentGoal.startDate);
    goalStart.setHours(0, 0, 0, 0);
    const goalEnd = new Date(this.currentGoal.endDate);
    goalEnd.setHours(23, 59, 59, 999);

    let html = '';
    for (let i = 0; i < 7; i++) {
        const dayDate = new Date(mondayOfWeek);
        dayDate.setDate(dayDate.getDate() + i);
        dayDate.setHours(0, 0, 0, 0);

        const dateStr = dayDate.toISOString().split('T')[0];
        const isToday = dayDate.getTime() === today.getTime();
        const isPast = dayDate < today;
        const isInGoalRange = dayDate >= goalStart && dayDate <= goalEnd;

        const dayLog = this.currentGoal.dailyLogs[dateStr];
        const isCompleted = dayLog && dayLog.completed;

        let statusClass = '';
        let statusIcon = '';
        
        if (!isInGoalRange) {
            statusClass = 'outside';
            statusIcon = '';
        } else if (isCompleted) {
            statusClass = 'completed';
            statusIcon = '<i class="fas fa-check"></i>';
        } else if (isToday) {
            statusClass = 'today';
            statusIcon = '<i class="fas fa-circle"></i>';
        } else if (isPast) {
            statusClass = 'missed';
            statusIcon = '<i class="fas fa-times"></i>';
        } else {
            statusClass = 'future';
            statusIcon = '';
        }

        html += `
            <div class="goal-day ${statusClass}" data-date="${dateStr}" ${!isInGoalRange ? 'data-outside="true"' : ''}>
                <span class="goal-day-num">${dayDate.getDate()}</span>
                <span class="goal-day-status">${statusIcon}</span>
            </div>
        `;
    }

    weekDaysContainer.innerHTML = html;

    // Привязка кликов на дни
    weekDaysContainer.querySelectorAll('.goal-day:not([data-outside="true"])').forEach(day => {
        day.addEventListener('click', () => {
            const dateStr = day.dataset.date;
            this.showDayDetails(dateStr);
        });
    });
};

// Показ деталей дня
DictionaryApp.prototype.showDayDetails = function(dateStr) {
    const detailsContainer = document.getElementById('goalDayDetails');
    const detailsTitle = document.getElementById('goalDayDetailsTitle');
    const detailsBody = document.getElementById('goalDayDetailsBody');

    if (!detailsContainer || !this.currentGoal) return;

    const dayLog = this.currentGoal.dailyLogs[dateStr];
    const date = new Date(dateStr + 'T00:00:00');

    const dayNames = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const monthNames = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 
                       'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

    if (detailsTitle) {
        detailsTitle.textContent = `${dayNames[date.getDay()]}, ${date.getDate()} ${monthNames[date.getMonth()]}`;
    }

    if (detailsBody) {
        if (dayLog && dayLog.completed) {
            detailsBody.innerHTML = `
                <div class="goal-day-stats-detail">
                    <div class="goal-day-stat-row">
                        <i class="fas fa-plus-circle"></i>
                        <span>Новых слов:</span>
                        <strong>${dayLog.newWords || 0}</strong>
                    </div>
                    <div class="goal-day-stat-row">
                        <i class="fas fa-check-circle"></i>
                        <span>Выучено:</span>
                        <strong>${dayLog.learnedWords || 0}</strong>
                    </div>
                    <div class="goal-day-stat-row">
                        <i class="fas fa-book-reader"></i>
                        <span>Текстов:</span>
                        <strong>${dayLog.texts || 0}</strong>
                    </div>
                    <div class="goal-day-stat-row">
                        <i class="fas fa-video"></i>
                        <span>Видео:</span>
                        <strong>${dayLog.videos || 0}</strong>
                    </div>
                    <div class="goal-day-stat-row">
                        <i class="fas fa-newspaper"></i>
                        <span>Новости:</span>
                        <strong>${dayLog.news || 0}</strong>
                    </div>
                    <div class="goal-day-stat-row">
                        <i class="fas fa-microphone"></i>
                        <span>Говорение:</span>
                        <strong>${dayLog.speaking || 0} мин</strong>
                    </div>
                    <div class="goal-day-stat-row">
                        <i class="fas fa-pen"></i>
                        <span>Письмо:</span>
                        <strong>${dayLog.writing || 0} мин</strong>
                    </div>
                    <div class="goal-day-stat-row">
                        <i class="fas fa-headphones"></i>
                        <span>Аудирование:</span>
                        <strong>${dayLog.listening || 0} мин</strong>
                    </div>
                </div>
                ${dayLog.notes ? `
                    <div class="goal-day-notes-detail">
                        <div class="goal-day-notes-label"><i class="fas fa-sticky-note"></i> Заметки:</div>
                        <div class="goal-day-notes-text">${this.escapeHtml(dayLog.notes)}</div>
                    </div>
                ` : ''}
            `;
        } else {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const checkDate = new Date(dateStr + 'T00:00:00');
            
            if (checkDate < today) {
                detailsBody.innerHTML = `
                    <div class="goal-day-missed">
                        <i class="fas fa-calendar-times"></i>
                        <p>День был пропущен</p>
                    </div>
                `;
            } else if (checkDate.getTime() === today.getTime()) {
                detailsBody.innerHTML = `
                    <div class="goal-day-today">
                        <i class="fas fa-calendar-day"></i>
                        <p>Сегодняшний день ещё не закрыт</p>
                        <button class="btn btn-success btn-small" onclick="app.openCloseDayModal()">
                            <i class="fas fa-check"></i> Закрыть день
                        </button>
                    </div>
                `;
            } else {
                detailsBody.innerHTML = `
                    <div class="goal-day-future">
                        <i class="fas fa-clock"></i>
                        <p>Этот день ещё не наступил</p>
                    </div>
                `;
            }
        }
    }

    detailsContainer.style.display = 'block';
};

// Скрытие деталей дня
DictionaryApp.prototype.hideDayDetails = function() {
    const detailsContainer = document.getElementById('goalDayDetails');
    if (detailsContainer) {
        detailsContainer.style.display = 'none';
    }
};

// ===== AUTO DAILY STATS HELPERS =====

// безопасно достаем "сегодня" в формате YYYY-MM-DD
DictionaryApp.prototype.getTodayKey = function() {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d.toISOString().split('T')[0];
};

// получить автостату за день из приложения (если счетчики реализованы в app.part*.js)
// fallback = 0
DictionaryApp.prototype.getAutoDailyStatsForDate = function(dateStr) {
    // ожидаемый контракт, который мы сделаем в app.part1.js/app.part2.js:
    // this.getDailyActivityStats(dateStr) => { newWords, learnedWords, texts, videos, news, speaking, writing, listening }
    if (typeof this.getDailyActivityStats === 'function') {
        const s = this.getDailyActivityStats(dateStr) || {};
        return {
            newWords: Number(s.newWords) || 0,
            learnedWords: Number(s.learnedWords) || 0,
            texts: Number(s.texts) || 0,
            videos: Number(s.videos) || 0,
            news: Number(s.news) || 0,
            speaking: Number(s.speaking) || 0,
            writing: Number(s.writing) || 0,
            listening: Number(s.listening) || 0
        };
    }

    // fallback: пока счетчиков нет — все нули
    return {
        newWords: 0,
        learnedWords: 0,
        texts: 0,
        videos: 0,
        news: 0,
        speaking: 0,
        writing: 0,
        listening: 0
    };
};

// проставить значения в модалку
DictionaryApp.prototype.fillCloseDayModalFromStats = function(stats) {
    const map = {
        closeDayNewWords: stats.newWords,
        closeDayLearnedWords: stats.learnedWords,
        closeDayTexts: stats.texts,
        closeDayVideos: stats.videos,
        closeDayNews: stats.news,
        closeDaySpeaking: stats.speaking,
        closeDayWriting: stats.writing,
        closeDayListening: stats.listening
    };

    Object.entries(map).forEach(([id, val]) => {
        const el = document.getElementById(id);
        if (el) el.value = Number(val) || 0;
    });
};

// Открытие модалки закрытия дня
// Открытие модалки закрытия дня
DictionaryApp.prototype.openCloseDayModal = function() {
    if (!this.currentGoal) {
        this.showToast('Нет активной цели', 'error');
        return;
    }

    const today = new Date();
    const dateStr = this.getTodayKey();

    if (this.currentGoal.dailyLogs[dateStr]?.completed) {
        this.showToast('Сегодняшний день уже закрыт', 'warning');
        return;
    }

    const dateDisplay = document.getElementById('closeDayDate');
    if (dateDisplay) {
        const dayNames = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
        const monthNames = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
                           'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
        dateDisplay.textContent = `${dayNames[today.getDay()]}, ${today.getDate()} ${monthNames[today.getMonth()]} ${today.getFullYear()}`;
    }

    // Автозаполнение статистики за сегодня
    const autoStats = this.getAutoDailyStatsForDate(dateStr);
    this.fillCloseDayModalFromStats(autoStats);

    // заметки вручную
    const notesEl = document.getElementById('closeDayNotes');
    if (notesEl) notesEl.value = '';

    this.openModal('closeDayModal');
};

// Подтверждение закрытия дня
// Подтверждение закрытия дня
DictionaryApp.prototype.confirmCloseDay = function() {
    if (!this.currentGoal) return;

    const today = new Date();
    const dateStr = this.getTodayKey();

    if (this.currentGoal.dailyLogs[dateStr]?.completed) {
        this.showToast('Сегодняшний день уже закрыт', 'warning');
        return;
    }

    // Берем автостатистику прямо сейчас (чтобы не зависеть от того, что в инпутах)
    const auto = this.getAutoDailyStatsForDate(dateStr);

    // На всякий случай синхронизируем отображение в модалке
    this.fillCloseDayModalFromStats(auto);

    const dayLog = {
        completed: true,
        date: dateStr,
        timestamp: Date.now(),
        newWords: auto.newWords,
        learnedWords: auto.learnedWords,
        texts: auto.texts,
        videos: auto.videos,
        news: auto.news,
        speaking: auto.speaking,
        writing: auto.writing,
        listening: auto.listening,
        notes: document.getElementById('closeDayNotes')?.value || ''
    };

    // Сохраняем лог дня
    this.currentGoal.dailyLogs[dateStr] = dayLog;

    // Обновляем общую статистику
    this.currentGoal.stats.totalNewWords += dayLog.newWords;
    this.currentGoal.stats.totalLearnedWords += dayLog.learnedWords;
    this.currentGoal.stats.totalTexts += dayLog.texts;
    this.currentGoal.stats.totalVideos += dayLog.videos;
    this.currentGoal.stats.totalNewsVideos += dayLog.news;
    this.currentGoal.stats.totalSpeakingMinutes += dayLog.speaking;
    this.currentGoal.stats.totalWritingMinutes += dayLog.writing;
    this.currentGoal.stats.totalListeningMinutes += dayLog.listening;
    this.currentGoal.stats.daysCompleted++;

    // streak
    this.calculateStreak();

    // проверка завершения цели
    const endDate = new Date(this.currentGoal.endDate);
    endDate.setHours(23, 59, 59, 999);

    if (today >= endDate) {
        this.closeModal('closeDayModal');
        this.completeGoal();
        return;
    }

    this.saveGoalData();
    this.closeModal('closeDayModal');
    this.renderActiveGoal();
    this.renderGoalChart();
    this.showToast('День успешно закрыт!', 'success');
};

// Расчёт streak (серии дней подряд)
DictionaryApp.prototype.calculateStreak = function() {
    if (!this.currentGoal) return;

    const logs = this.currentGoal.dailyLogs;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let streak = 0;
    let checkDate = new Date(today);

    // Считаем от сегодня назад
    while (true) {
        const dateStr = checkDate.toISOString().split('T')[0];
        
        if (logs[dateStr]?.completed) {
            streak++;
            checkDate.setDate(checkDate.getDate() - 1);
        } else {
            break;
        }
        
        // Защита от бесконечного цикла
        if (streak > 1000) break;
    }

    this.currentGoal.stats.streak = streak;
    if (streak > this.currentGoal.stats.maxStreak) {
        this.currentGoal.stats.maxStreak = streak;
    }
};

// Завершение цели
DictionaryApp.prototype.completeGoal = function() {
    if (!this.currentGoal) return;

    this.currentGoal.active = false;
    this.currentGoal.completedDate = new Date().toISOString();

    // Добавляем в историю
    this.goalHistory.unshift({...this.currentGoal});

    // Показываем модалку завершения
    this.showGoalCompleteModal();

    // Сбрасываем текущую цель
    this.currentGoal = null;

    this.saveGoalData();
    this.updateGoalBadge();
};

// Показ модалки завершения цели
DictionaryApp.prototype.showGoalCompleteModal = function() {
    const summaryContainer = document.getElementById('goalCompleteSummary');
    if (summaryContainer && this.goalHistory.length > 0) {
        const goal = this.goalHistory[0];
        const successRate = goal.periodDays > 0 
            ? Math.round((goal.stats.daysCompleted / goal.periodDays) * 100) 
            : 0;
            
        summaryContainer.innerHTML = `
            <div class="goal-summary-stats">
                <div class="summary-stat">
                    <span class="summary-value">${goal.stats.daysCompleted}</span>
                    <span class="summary-label">дней закрыто</span>
                </div>
                <div class="summary-stat">
                    <span class="summary-value">${goal.stats.totalNewWords}</span>
                    <span class="summary-label">новых слов</span>
                </div>
                <div class="summary-stat">
                    <span class="summary-value">${goal.stats.totalLearnedWords}</span>
                    <span class="summary-label">выучено</span>
                </div>
                <div class="summary-stat">
                    <span class="summary-value">${goal.stats.maxStreak}</span>
                    <span class="summary-label">макс. streak</span>
                </div>
                <div class="summary-stat">
                    <span class="summary-value">${successRate}%</span>
                    <span class="summary-label">успешность</span>
                </div>
            </div>
        `;
    }
    this.openModal('goalCompleteModal');
};

// Досрочное закрытие цели
DictionaryApp.prototype.closeGoalEarly = function() {
    if (!this.currentGoal) return;

    if (confirm('Вы уверены, что хотите завершить цель досрочно? Весь прогресс будет сохранён в истории.')) {
        this.currentGoal.active = false;
        this.currentGoal.completedDate = new Date().toISOString();
        this.currentGoal.closedEarly = true;

        this.goalHistory.unshift({...this.currentGoal});
        this.currentGoal = null;

        this.saveGoalData();
        this.updateGoalBadge();
        this.updateGoalSection();
        this.showToast('Цель завершена и сохранена в историю', 'info');
    }
};

// Обновление раздела истории целей
DictionaryApp.prototype.updateGoalHistorySection = function() {
    const historyList = document.getElementById('goalHistoryList');
    const historyEmpty = document.getElementById('goalHistoryEmpty');

    if (!historyList) return;

    if (!this.goalHistory || this.goalHistory.length === 0) {
        historyList.innerHTML = '';
        if (historyEmpty) historyEmpty.style.display = 'flex';
        return;
    }

    if (historyEmpty) historyEmpty.style.display = 'none';

    historyList.innerHTML = this.goalHistory.map((goal, index) => {
        const startDate = new Date(goal.startDate);
        const endDate = new Date(goal.completedDate || goal.endDate);
        const successRate = goal.periodDays > 0 
            ? Math.round((goal.stats.daysCompleted / goal.periodDays) * 100) 
            : 0;

        return `
            <div class="goal-history-card" data-goal-index="${index}">
                <div class="goal-history-header">
                    <div class="goal-history-levels">
                        <span class="goal-level from">${goal.pointA.level.toUpperCase()}</span>
                        <i class="fas fa-arrow-right"></i>
                        <span class="goal-level to">${goal.pointB.level.toUpperCase()}</span>
                    </div>
                    <span class="goal-history-status ${goal.closedEarly ? 'early' : 'completed'}">
                        ${goal.closedEarly ? '<i class="fas fa-flag"></i> Досрочно' : '<i class="fas fa-check"></i> Завершено'}
                    </span>
                </div>
                <div class="goal-history-dates">
                    <i class="fas fa-calendar"></i>
                    ${this.formatDateShort(startDate)} — ${this.formatDateShort(endDate)}
                </div>
                <div class="goal-history-stats">
                    <span><i class="fas fa-check-circle"></i> ${goal.stats.daysCompleted}/${goal.periodDays} дней</span>
                    <span><i class="fas fa-book"></i> ${goal.stats.totalNewWords} слов</span>
                    <span><i class="fas fa-fire"></i> ${goal.stats.maxStreak} streak</span>
                    <span><i class="fas fa-percentage"></i> ${successRate}%</span>
                </div>
                <button class="btn btn-secondary btn-small view-goal-btn" data-index="${index}">
                    <i class="fas fa-eye"></i> Подробнее
                </button>
            </div>
        `;
    }).join('');

    // Привязка кликов
    historyList.querySelectorAll('.view-goal-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = parseInt(e.currentTarget.dataset.index);
            this.viewGoalDetails(index);
        });
    });
};

// Просмотр деталей цели из истории
DictionaryApp.prototype.viewGoalDetails = function(index) {
    const goal = this.goalHistory[index];
    if (!goal) return;

    const modalBody = document.getElementById('viewGoalBody');
    if (!modalBody) return;

    const startDate = new Date(goal.startDate);
    const endDate = new Date(goal.completedDate || goal.endDate);
    const successRate = goal.periodDays > 0 
        ? Math.round((goal.stats.daysCompleted / goal.periodDays) * 100) 
        : 0;

    modalBody.innerHTML = `
        <div class="goal-details">
            <div class="goal-details-header">
                <div class="goal-levels-display">
                    <div class="goal-level-box from">
                        <span class="level-label">Точка A</span>
                        <span class="level-value">${goal.pointA.level.toUpperCase()}</span>
                        <span class="level-vocab">${goal.pointA.vocab} слов</span>
                    </div>
                    <div class="goal-arrow-icon">
                        <i class="fas fa-arrow-right"></i>
                    </div>
                    <div class="goal-level-box to">
                        <span class="level-label">Точка B</span>
                        <span class="level-value">${goal.pointB.level.toUpperCase()}</span>
                        <span class="level-vocab">${goal.pointB.vocab} слов</span>
                    </div>
                </div>
            </div>

            <div class="goal-details-meta">
                <div class="goal-meta-item">
                    <i class="fas fa-calendar"></i>
                    <span><strong>Период:</strong> ${this.formatDateShort(startDate)} — ${this.formatDateShort(endDate)}</span>
                </div>
                <div class="goal-meta-item">
                    <i class="fas fa-clock"></i>
                    <span><strong>Длительность:</strong> ${goal.periodDays} дней</span>
                </div>
                <div class="goal-meta-item">
                    <i class="fas fa-flag"></i>
                    <span><strong>Статус:</strong> ${goal.closedEarly ? 'Завершено досрочно' : 'Полностью завершено'}</span>
                </div>
                <div class="goal-meta-item">
                    <i class="fas fa-percentage"></i>
                    <span><strong>Успешность:</strong> ${successRate}%</span>
                </div>
            </div>

            <div class="goal-details-stats">
                <h4><i class="fas fa-chart-bar"></i> Статистика</h4>
                <div class="goal-stats-detail-grid">
                    <div class="stat-detail-item">
                        <i class="fas fa-calendar-check"></i>
                        <span class="stat-detail-value">${goal.stats.daysCompleted}</span>
                        <span class="stat-detail-label">дней закрыто</span>
                    </div>
                    <div class="stat-detail-item">
                        <i class="fas fa-plus-circle"></i>
                        <span class="stat-detail-value">${goal.stats.totalNewWords}</span>
                        <span class="stat-detail-label">новых слов</span>
                    </div>
                    <div class="stat-detail-item">
                        <i class="fas fa-check-circle"></i>
                        <span class="stat-detail-value">${goal.stats.totalLearnedWords}</span>
                        <span class="stat-detail-label">выучено</span>
                    </div>
                    <div class="stat-detail-item">
                        <i class="fas fa-book-reader"></i>
                        <span class="stat-detail-value">${goal.stats.totalTexts}</span>
                        <span class="stat-detail-label">текстов</span>
                    </div>
                    <div class="stat-detail-item">
                        <i class="fas fa-video"></i>
                        <span class="stat-detail-value">${goal.stats.totalVideos}</span>
                        <span class="stat-detail-label">видео</span>
                    </div>
                    <div class="stat-detail-item">
                        <i class="fas fa-microphone"></i>
                        <span class="stat-detail-value">${goal.stats.totalSpeakingMinutes}</span>
                        <span class="stat-detail-label">мин говорения</span>
                    </div>
                    <div class="stat-detail-item">
                        <i class="fas fa-fire"></i>
                        <span class="stat-detail-value">${goal.stats.maxStreak}</span>
                        <span class="stat-detail-label">макс. streak</span>
                    </div>
                </div>
            </div>

            <div class="goal-details-skills">
                <h4><i class="fas fa-tasks"></i> Навыки</h4>
                <div class="skills-comparison">
                    <div class="skills-column">
                        <h5>Было (Точка A)</h5>
                        <ul class="skills-list">
                            <li class="${goal.pointA.canRead ? 'active' : 'inactive'}">
                                <i class="fas fa-${goal.pointA.canRead ? 'check' : 'times'}"></i>
                                Чтение
                            </li>
                            <li class="${goal.pointA.canWrite ? 'active' : 'inactive'}">
                                <i class="fas fa-${goal.pointA.canWrite ? 'check' : 'times'}"></i>
                                Письмо
                            </li>
                            <li class="${goal.pointA.canSpeak ? 'active' : 'inactive'}">
                                <i class="fas fa-${goal.pointA.canSpeak ? 'check' : 'times'}"></i>
                                Говорение
                            </li>
                            <li class="${goal.pointA.canListen ? 'active' : 'inactive'}">
                                <i class="fas fa-${goal.pointA.canListen ? 'check' : 'times'}"></i>
                                Понимание речи
                            </li>
                        </ul>
                    </div>
                    <div class="skills-column">
                        <h5>Цель (Точка B)</h5>
                        <ul class="skills-list">
                            <li class="${goal.pointB.canRead ? 'active' : 'inactive'}">
                                <i class="fas fa-${goal.pointB.canRead ? 'check' : 'times'}"></i>
                                Чтение
                            </li>
                            <li class="${goal.pointB.canWrite ? 'active' : 'inactive'}">
                                <i class="fas fa-${goal.pointB.canWrite ? 'check' : 'times'}"></i>
                                Письмо
                            </li>
                            <li class="${goal.pointB.canSpeak ? 'active' : 'inactive'}">
                                <i class="fas fa-${goal.pointB.canSpeak ? 'check' : 'times'}"></i>
                                Говорение
                            </li>
                            <li class="${goal.pointB.canListen ? 'active' : 'inactive'}">
                                <i class="fas fa-${goal.pointB.canListen ? 'check' : 'times'}"></i>
                                Понимание речи
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `;

    this.openModal('viewGoalModal');
};

// Рендер графика прогресса
DictionaryApp.prototype.renderGoalChart = function() {
    const canvas = document.getElementById('goalChartCanvas');
    if (!canvas || !this.currentGoal) return;

    const ctx = canvas.getContext('2d');
    const logs = this.currentGoal.dailyLogs;
    const startDate = new Date(this.currentGoal.startDate);
    
    // Получаем размеры canvas
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width || 600;
    canvas.height = 200;
    
    const width = canvas.width;
    const height = canvas.height;
    const padding = { top: 20, right: 20, bottom: 30, left: 50 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Очистка
    ctx.clearRect(0, 0, width, height);

    // Собираем данные
    const sortedDates = Object.keys(logs).sort();
    if (sortedDates.length === 0) {
        // Показываем сообщение если нет данных
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-muted') || '#6b7280';
        ctx.font = '14px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Нет данных для отображения', width / 2, height / 2);
        return;
    }

    // Кумулятивные данные
    let cumulative = 0;
    const dataPoints = sortedDates.map((date, i) => {
        cumulative += logs[date].newWords || 0;
        return { date, value: cumulative, index: i };
    });

    const maxValue = Math.max(...dataPoints.map(d => d.value), 10);

    // Рисуем сетку
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--border') || '#e5e7eb';
    ctx.lineWidth = 1;
    
    // Горизонтальные линии
    for (let i = 0; i <= 4; i++) {
        const y = padding.top + (chartHeight / 4) * i;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(width - padding.right, y);
        ctx.stroke();
        
        // Подписи оси Y
        const value = Math.round(maxValue - (maxValue / 4) * i);
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-muted') || '#6b7280';
        ctx.font = '11px system-ui, sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(value.toString(), padding.left - 8, y + 4);
    }

    // Рисуем линию графика
    if (dataPoints.length > 1) {
        ctx.beginPath();
        ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary') || '#3b82f6';
        ctx.lineWidth = 2;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        dataPoints.forEach((point, i) => {
            const x = padding.left + (chartWidth / (dataPoints.length - 1)) * i;
            const y = padding.top + chartHeight - (point.value / maxValue) * chartHeight;
            
            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();

        // Заливка под графиком
        ctx.lineTo(padding.left + chartWidth, padding.top + chartHeight);
        ctx.lineTo(padding.left, padding.top + chartHeight);
        ctx.closePath();
        
        const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartHeight);
        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary') || '#3b82f6';
        gradient.addColorStop(0, primaryColor + '40');
        gradient.addColorStop(1, primaryColor + '00');
        ctx.fillStyle = gradient;
        ctx.fill();

        // Точки
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary') || '#3b82f6';
        dataPoints.forEach((point, i) => {
            const x = padding.left + (chartWidth / (dataPoints.length - 1)) * i;
            const y = padding.top + chartHeight - (point.value / maxValue) * chartHeight;
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
        });
    } else if (dataPoints.length === 1) {
        // Одна точка
        const x = padding.left + chartWidth / 2;
        const y = padding.top + chartHeight - (dataPoints[0].value / maxValue) * chartHeight;
        
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary') || '#3b82f6';
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
    }
};

// Привязка событий для системы целей
DictionaryApp.prototype.bindGoalEvents = function() {
    // Кнопка открытия цели
    document.getElementById('startGoalBtn')?.addEventListener('click', () => this.startGoal());

    // Кнопка закрытия дня
    document.getElementById('closeDayBtn')?.addEventListener('click', () => this.openCloseDayModal());

    // Кнопка завершения цели досрочно
    document.getElementById('closeGoalBtn')?.addEventListener('click', () => this.closeGoalEarly());

    // Навигация по неделям
    document.getElementById('goalPrevWeek')?.addEventListener('click', () => {
        if (this.currentGoalWeek > 0) {
            this.currentGoalWeek--;
            this.renderGoalWeek();
            this.hideDayDetails();
        }
    });

    document.getElementById('goalNextWeek')?.addEventListener('click', () => {
        const totalWeeks = Math.ceil((this.currentGoal?.periodDays || 90) / 7);
        if (this.currentGoalWeek < totalWeeks - 1) {
            this.currentGoalWeek++;
            this.renderGoalWeek();
            this.hideDayDetails();
        }
    });

    // Закрытие деталей дня
    document.getElementById('closeDayDetails')?.addEventListener('click', () => this.hideDayDetails());

    // Модалка закрытия дня
    document.getElementById('closeCloseDayModal')?.addEventListener('click', () => this.closeModal('closeDayModal'));
    document.getElementById('cancelCloseDay')?.addEventListener('click', () => this.closeModal('closeDayModal'));
    document.getElementById('confirmCloseDay')?.addEventListener('click', () => this.confirmCloseDay());
    document.querySelector('#closeDayModal .modal-overlay')?.addEventListener('click', () => this.closeModal('closeDayModal'));

    // Модалка завершения цели
    document.getElementById('closeGoalCompleteModal')?.addEventListener('click', () => this.closeModal('goalCompleteModal'));
    document.getElementById('viewGoalHistory')?.addEventListener('click', () => {
        this.closeModal('goalCompleteModal');
        this.switchSection('goalHistory');
    });
    document.getElementById('startNewGoal')?.addEventListener('click', () => {
        this.closeModal('goalCompleteModal');
        this.switchSection('goal');
    });
    document.querySelector('#goalCompleteModal .modal-overlay')?.addEventListener('click', () => this.closeModal('goalCompleteModal'));

    // Модалка просмотра цели из истории
    document.getElementById('closeViewGoalModal')?.addEventListener('click', () => this.closeModal('viewGoalModal'));
    document.getElementById('closeViewGoalBtn')?.addEventListener('click', () => this.closeModal('viewGoalModal'));
    document.querySelector('#viewGoalModal .modal-overlay')?.addEventListener('click', () => this.closeModal('viewGoalModal'));

    // Привязка бейджей периода
    document.querySelectorAll('.goal-period-badge').forEach(badge => {
        badge.addEventListener('click', () => {
            document.querySelectorAll('.goal-period-badge').forEach(b => b.classList.remove('active'));
            badge.classList.add('active');
        });
    });

    // Автообновление словарного запаса при смене целевого уровня
    document.getElementById('goalTargetLevel')?.addEventListener('change', (e) => {
        const vocab = this.getVocabForLevel(e.target.value);
        const vocabInput = document.getElementById('goalTargetVocab');
        if (vocabInput) vocabInput.value = vocab;
    });

    // Обработка resize для перерисовки графика
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (this.currentSection === 'goal' && this.currentGoal?.active) {
                this.renderGoalChart();
            }
        }, 250);
    });
};

// Переопределение renderCurrentSection для добавления goal и goalHistory
const originalRenderCurrentSection = DictionaryApp.prototype.renderCurrentSection;
DictionaryApp.prototype.renderCurrentSection = function() {
    // Сначала проверяем goal секции
    if (this.currentSection === 'goal') {
        this.updateGoalSection();
        return;
    }
    
    if (this.currentSection === 'goalHistory') {
        this.updateGoalHistorySection();
        return;
    }
    
    // Вызываем оригинальный метод для остальных секций
    if (originalRenderCurrentSection) {
        originalRenderCurrentSection.call(this);
    }
};
