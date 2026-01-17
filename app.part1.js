// ===== DICTIONARY APPLICATION - PART 1 =====

class DictionaryApp {
    constructor() {
        this.words = [];
        this.settings = {};
        this.stats = {};
        this.readTexts = [];
        this.currentWordId = null;
        this.currentSection = 'dictionary';
        this.currentTextId = null;
        this.speakingStartTs = null;
        // Audio state
        this.audioCache = {};
        this.currentAudio = null;
        this.isAudioPlaying = false;
        this.audioLoop = false; // НОВОЕ: режим повтора
        this.listeningSession = {
            active: false,
            lastTime: 0,
            accumulatedSeconds: 0
        };
        // Practice state
        this.practiceMode = 'word';
        this.practiceWords = [];
        this.practiceIndex = 0;
        this.practiceCorrect = 0;
        this.practiceWrong = 0;

        // Game state
        this.currentGame = null;
        this.gameScore = 0;
        this.gameTimer = null;
        this.gameTime = 0;
        this.gameLives = 3;
        this.quizWords = [];
        this.quizIndex = 0;
        this.matchCards = [];
        this.matchFlipped = [];
        this.matchLocked = false;

        // Videos state
        this.videos = (typeof videosData !== 'undefined' && Array.isArray(videosData)) ? videosData : [];
        this.videosMeta = {};
        this.currentVideoId = null;

        // Speaking state
        this.isRecording = false;
        this.recognition = null;
        this.transcript = '';
        this.interimTranscript = '';
        this.speakingLanguage = 'en-US';

        // Goal state (НОВОЕ)
        this.currentGoal = null;
        this.goalHistory = [];
        this.goalDailyLogs = {};
        // Daily activity (для автоподсчёта "Закрыть день")
        this.dailyActivity = {};
        this.DAILY_ACTIVITY_KEY = 'dictionary_daily_activity';
        this.currentGoalWeek = 0;

        // Уровни
        this.levels = [
            { id: 'a0', name: 'A0', icon: 'fa-seedling', words: 0, desc: 'Начало пути', vocab: 0 },
            { id: 'pre-a1', name: 'Pre-A1', icon: 'fa-leaf', words: 100, desc: '100+ слов', vocab: 250 },
            { id: 'a1', name: 'A1', icon: 'fa-pagelines', words: 250, desc: '250+ слов (Elementary)', vocab: 500 },
            { id: 'pre-a2', name: 'Pre-A2', icon: 'fa-spa', words: 600, desc: '600+ слов', vocab: 1000 },
            { id: 'a2', name: 'A2', icon: 'fa-tree', words: 800, desc: '800+ слов (Pre-Intermediate)', vocab: 1500 },
            { id: 'pre-b1', name: 'Pre-B1', icon: 'fa-mountain', words: 1100, desc: '1100+ слов', vocab: 2000 },
            { id: 'b1', name: 'B1', icon: 'fa-mountain-sun', words: 1400, desc: '1400+ слов (Intermediate)', vocab: 3000 },
            { id: 'pre-b2', name: 'Pre-B2', icon: 'fa-fire', words: 1600, desc: '1600+ слов', vocab: 4000 },
            { id: 'b2', name: 'B2', icon: 'fa-fire-flame-curved', words: 2000, desc: '2000+ слов (Upper-Intermediate)', vocab: 5000 },
            { id: 'pre-c1', name: 'Pre-C1', icon: 'fa-bolt', words: 2500, desc: '2500+ слов', vocab: 6000 },
            { id: 'c1', name: 'C1', icon: 'fa-crown', words: 3000, desc: '3000+ слов (Advanced)', vocab: 8000 },
            { id: 'c1-pro', name: 'C1 Pro', icon: 'fa-gem', words: 3250, desc: '3250+ слов', vocab: 10000 },
            { id: 'pre-c2', name: 'Pre-C2', icon: 'fa-star', words: 3500, desc: '3500+ слов', vocab: 12000 },
            { id: 'c2', name: 'C2', icon: 'fa-trophy', words: 3800, desc: '3800+ слов (Proficient)', vocab: 15000 },
            { id: 'c2-pro', name: 'C2 Pro', icon: 'fa-dragon', words: 4100, desc: '4100+ слов (Mastery)', vocab: 20000 }
        ];

        // Диапазоны слов для фильтра
        this.wordCountRanges = [
            { id: 'all', name: 'Все', min: 0, max: Infinity },
            { id: 'short', name: 'Короткие (до 100 слов)', min: 0, max: 100 },
            { id: 'medium', name: 'Средние (100-300 слов)', min: 100, max: 300 },
            { id: 'long', name: 'Длинные (300-500 слов)', min: 300, max: 500 },
            { id: 'very-long', name: 'Очень длинные (500+ слов)', min: 500, max: Infinity }
        ];

        // Пороги разблокировки
        this.GAMES_UNLOCK_THRESHOLD = 50;
        this.READING_UNLOCK_THRESHOLD = 0;

        this.init();
    }

    init() {
        this.loadData();
        this.checkAutoBackup();
        this.initSpeechRecognition();
        this.bindEvents();
        this.applyTheme();
        this.renderCurrentSection();
        this.updateAllStats();
        this.updateGameLock();
        this.updateReadingLock();
        this.updateGoalBadge();
        this.preloadAudioDurations();
        this.syncVideosMeta();
    }

   

    // ===================== SPEECH RECOGNITION =====================
    initSpeechRecognition() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        
        if (!SpeechRecognition) {
            console.warn('Speech Recognition API не поддерживается в этом браузере');
            return;
        }

        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = this.speakingLanguage;

        this.recognition.onresult = (event) => {
            let interim = '';
            let final = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    final += transcript + ' ';
                } else {
                    interim += transcript;
                }
            }

            if (final) {
                this.transcript += final;
            }
            this.interimTranscript = interim;

            this.updateTranscriptDisplay();
        };

        this.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            
            if (event.error === 'not-allowed') {
                this.showToast('Доступ к микрофону запрещён. Разрешите доступ в настройках браузера.', 'error');
            } else if (event.error === 'no-speech') {
                this.showToast('Речь не обнаружена. Попробуйте снова.', 'warning');
            } else {
                this.showToast(`Ошибка распознавания: ${event.error}`, 'error');
            }
            
            this.stopRecording();
        };

        this.recognition.onend = () => {
            if (this.isRecording) {
                try {
                    this.recognition.start();
                } catch (e) {
                    this.isRecording = false;
                    this.updateRecordingUI();
                }
            }
        };
    }

    startRecording() {
        if (!this.recognition) {
            this.showToast('Распознавание речи не поддерживается вашим браузером. Используйте Chrome или Edge.', 'error');
            return;
        }

        this.transcript = '';
        this.interimTranscript = '';
        this.updateTranscriptDisplay();

        const langSelect = document.getElementById('speakingLanguage');
        if (langSelect) {
            this.speakingLanguage = langSelect.value;
            this.recognition.lang = this.speakingLanguage;
        }

        try {
            this.recognition.start();
            this.speakingStartTs = Date.now();
            this.isRecording = true;
            this.updateRecordingUI();
            this.showToast('Запись начата. Говорите...', 'info');
        } catch (e) {
            console.error('Error starting recognition:', e);
            this.showToast('Не удалось начать запись', 'error');
        }
    }

    stopRecording() {
        if (this.recognition && this.isRecording) {
            this.isRecording = false;
            if (this.speakingStartTs) {
                const ms = Date.now() - this.speakingStartTs;
                this.speakingStartTs = null;

                // округляем вверх до минуты, чтобы короткие записи тоже считались
                const minutes = Math.max(1, Math.ceil(ms / 60000));

                // автостатистика: минуты говорения сегодня
                this.incrementDailyActivity('speaking', minutes);
            }
            this.recognition.stop();
            
            this.updateRecordingUI();
            
            if (this.transcript.trim()) {
                this.showToast('Запись завершена', 'success');
            } else {
                this.showToast('Текст не распознан. Попробуйте снова.', 'warning');
            }
        }
    }

    toggleRecording() {
        if (this.isRecording) {
            this.stopRecording();
        } else {
            this.startRecording();
        }
    }

    updateRecordingUI() {
        const recordBtn = document.getElementById('speakingRecordBtn');
        const statusIndicator = document.getElementById('speakingStatus');
        const copyBtn = document.getElementById('speakingCopyBtn');
        const clearBtn = document.getElementById('speakingClearBtn');

        if (recordBtn) {
            if (this.isRecording) {
                recordBtn.innerHTML = '<i class="fas fa-stop"></i> Остановить запись';
                recordBtn.classList.remove('btn-primary');
                recordBtn.classList.add('btn-danger', 'recording');
            } else {
                recordBtn.innerHTML = '<i class="fas fa-microphone"></i> Начать запись';
                recordBtn.classList.remove('btn-danger', 'recording');
                recordBtn.classList.add('btn-primary');
            }
        }

        if (statusIndicator) {
            if (this.isRecording) {
                statusIndicator.innerHTML = '<span class="recording-indicator"><i class="fas fa-circle"></i> Идёт запись...</span>';
                statusIndicator.classList.add('active');
            } else {
                statusIndicator.innerHTML = '<span><i class="fas fa-microphone-slash"></i> Ожидание</span>';
                statusIndicator.classList.remove('active');
            }
        }

        if (copyBtn) {
            copyBtn.disabled = !this.transcript.trim();
        }

        if (clearBtn) {
            clearBtn.disabled = !this.transcript.trim();
        }
    }

    updateTranscriptDisplay() {
        const transcriptArea = document.getElementById('speakingTranscript');
        const placeholder = document.getElementById('speakingPlaceholder');
        const charCount = document.getElementById('speakingCharCount');

        if (transcriptArea) {
            const fullText = this.transcript + this.interimTranscript;
            
            if (fullText.trim()) {
                transcriptArea.innerHTML = `
                    <span class="final-text">${this.escapeHtml(this.transcript)}</span><span class="interim-text">${this.escapeHtml(this.interimTranscript)}</span>
                `;
                if (placeholder) placeholder.style.display = 'none';
            } else {
                transcriptArea.innerHTML = '';
                if (placeholder) placeholder.style.display = 'block';
            }
        }

        if (charCount) {
            charCount.textContent = `${this.transcript.length} символов`;
        }

        const copyBtn = document.getElementById('speakingCopyBtn');
        const clearBtn = document.getElementById('speakingClearBtn');
        
        if (copyBtn) copyBtn.disabled = !this.transcript.trim();
        if (clearBtn) clearBtn.disabled = !this.transcript.trim();
    }

    clearTranscript() {
        this.transcript = '';
        this.interimTranscript = '';
        this.updateTranscriptDisplay();
        this.showToast('Текст очищен', 'info');
    }

    copyForAI() {
        if (!this.transcript.trim()) {
            this.showToast('Нет текста для копирования', 'warning');
            return;
        }

        const languageName = this.speakingLanguage.startsWith('en') ? 'английском' : 'английском';
        
        const promptText = `Проверь мою устную речь на ${languageName} языке.

=== ИНСТРУКЦИИ ===
- Отвечай на русском языке
- Найди и подчеркни все грамматические ошибки
- Найди ошибки в использовании слов и выражений
- Укажи на неестественные конструкции
- Предложи правильные варианты
- Оцени общий уровень речи (A1-C2)
- Дай краткие советы по улучшению

=== МОЯ РЕЧЬ ===
${this.transcript.trim()}

=== КОНЕЦ ===`;

        navigator.clipboard.writeText(promptText)
            .then(() => {
                this.showToast('Текст скопирован! Вставьте его в любой AI-чат (ChatGPT, Claude и др.)', 'success');
                
                const copyBtn = document.getElementById('speakingCopyBtn');
                if (copyBtn) {
                    const originalHTML = copyBtn.innerHTML;
                    copyBtn.innerHTML = '<i class="fas fa-check"></i> Скопировано!';
                    copyBtn.classList.add('copied');
                    
                    setTimeout(() => {
                        copyBtn.innerHTML = originalHTML;
                        copyBtn.classList.remove('copied');
                    }, 2000);
                }
            })
            .catch(err => {
                console.error('Failed to copy:', err);
                this.showToast('Не удалось скопировать текст', 'error');
            });
    }

    updateSpeakingSection() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const notSupported = document.getElementById('speakingNotSupported');
        const speakingContent = document.getElementById('speakingContent');

        if (!SpeechRecognition) {
            if (notSupported) notSupported.style.display = 'block';
            if (speakingContent) speakingContent.style.display = 'none';
            return;
        }

        if (notSupported) notSupported.style.display = 'none';
        if (speakingContent) speakingContent.style.display = 'block';

        this.updateRecordingUI();
        this.updateTranscriptDisplay();
    }

    // ===================== AUDIO =====================
    preloadAudioDurations() {
        if (typeof readingTextsWithAudio === 'undefined') return;

        readingTextsWithAudio.forEach(text => {
            if (text.audioSrc) {
                this.checkAudioDuration(text.audioSrc);
            }
        });
    }

    checkAudioDuration(audioSrc) {
        return new Promise((resolve) => {
            if (this.audioCache.hasOwnProperty(audioSrc)) {
                resolve(this.audioCache[audioSrc]);
                return;
            }

            const audio = new Audio();

            audio.addEventListener('loadedmetadata', () => {
                const duration = audio.duration;
                this.audioCache[audioSrc] = duration > 0 ? duration : 0;
                this.saveAudioCache();
                resolve(this.audioCache[audioSrc]);
            });

            audio.addEventListener('error', () => {
                this.audioCache[audioSrc] = 0;
                this.saveAudioCache();
                resolve(0);
            });

            setTimeout(() => {
                if (!this.audioCache.hasOwnProperty(audioSrc)) {
                    this.audioCache[audioSrc] = 0;
                    this.saveAudioCache();
                    resolve(0);
                }
            }, 3000);

            audio.src = audioSrc;
        });
    }

    hasAudio(audioSrc) {
        const duration = this.audioCache[audioSrc];
        return duration !== undefined && duration > 0;
    }

    loadData() {
        const savedWords = localStorage.getItem('dictionary_words');
        this.words = savedWords ? JSON.parse(savedWords) : [];
    
        const savedSettings = localStorage.getItem('dictionary_settings');
        this.settings = savedSettings ? JSON.parse(savedSettings) : {
            theme: 'light',
            autoBackup: true,
            manualLevel: 'auto'
        };
    
        const savedStats = localStorage.getItem('dictionary_stats');
        this.stats = savedStats ? JSON.parse(savedStats) : {
            totalPractices: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            lastBackup: null
        };
    
        const savedReadTexts = localStorage.getItem('dictionary_read_texts');
        this.readTexts = savedReadTexts ? JSON.parse(savedReadTexts) : [];
    
        const savedAudioCache = localStorage.getItem('dictionary_audio_cache');
        this.audioCache = savedAudioCache ? JSON.parse(savedAudioCache) : {};
    
        const savedVideosMeta = localStorage.getItem('dictionary_videos_meta');
        this.videosMeta = savedVideosMeta ? JSON.parse(savedVideosMeta) : {};
        
        const savedDailyActivity = localStorage.getItem(this.DAILY_ACTIVITY_KEY);
        this.dailyActivity = savedDailyActivity ? JSON.parse(savedDailyActivity) : {};
        
        // Загрузка данных целей
        this.loadGoalData();
    }
    saveWords() {
        localStorage.setItem('dictionary_words', JSON.stringify(this.words));
        this.updateAllStats();
        this.updateGameLock();
        this.updateReadingLock();
    }
    

    saveSettings() {
        localStorage.setItem('dictionary_settings', JSON.stringify(this.settings));
    }

    saveStats() {
        localStorage.setItem('dictionary_stats', JSON.stringify(this.stats));
    }

    saveReadTexts() {
        localStorage.setItem('dictionary_read_texts', JSON.stringify(this.readTexts));
    }

    saveAudioCache() {
        localStorage.setItem('dictionary_audio_cache', JSON.stringify(this.audioCache));
    }

    saveVideosMeta() {
        localStorage.setItem('dictionary_videos_meta', JSON.stringify(this.videosMeta));
    }
    // ===== DAILY ACTIVITY STORAGE =====

getDateKey(date = new Date()) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d.toISOString().split('T')[0];
}

saveDailyActivity() {
    localStorage.setItem(this.DAILY_ACTIVITY_KEY, JSON.stringify(this.dailyActivity));
}

// гарантируем структуру на дату
ensureDailyActivity(dateStr) {
    if (!this.dailyActivity[dateStr]) {
        this.dailyActivity[dateStr] = {
            newWords: 0,
            learnedWords: 0,
            texts: 0,
            videos: 0,
            news: 0,
            speaking: 0,
            writing: 0,
            listening: 0
        };
    }
    return this.dailyActivity[dateStr];
}

// универсальный инкремент
incrementDailyActivity(field, amount = 1, dateStr = null) {
    const key = dateStr || this.getDateKey();
    const day = this.ensureDailyActivity(key);
    day[field] = (Number(day[field]) || 0) + (Number(amount) || 0);
    this.saveDailyActivity();
}

// Контракт для goal.js: вернуть дневные показатели
getDailyActivityStats(dateStr) {
    const key = dateStr || this.getDateKey();
    const day = this.dailyActivity[key] || {};
    return {
        newWords: Number(day.newWords) || 0,
        learnedWords: Number(day.learnedWords) || 0,
        texts: Number(day.texts) || 0,
        videos: Number(day.videos) || 0,
        news: Number(day.news) || 0,
        speaking: Number(day.speaking) || 0,
        writing: Number(day.writing) || 0,
        listening: Number(day.listening) || 0
    };
}

    checkAutoBackup() {
        if (!this.settings.autoBackup) return;
        const lastBackup = this.stats.lastBackup;
        if (!lastBackup) return;
        const daysSinceBackup = (Date.now() - lastBackup) / (1000 * 60 * 60 * 24);
        if (daysSinceBackup >= 20) {
            this.createBackup();
            this.showToast('Автоматическая резервная копия создана', 'info');
        }
    }

    createBackup() {
        const data = {
            words: this.words,
            settings: this.settings,
            stats: this.stats,
            readTexts: this.readTexts,
            videosMeta: this.videosMeta,
            currentGoal: this.currentGoal,
            goalHistory: this.goalHistory,
            exportDate: new Date().toISOString(),
            version: '2.5'
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `dictionary_backup_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        this.stats.lastBackup = Date.now();
        this.saveStats();
        this.updateLastBackupDisplay();
    }

    bindEvents() {
        document.getElementById('menuToggle')?.addEventListener('click', () => {
            document.getElementById('sidebar')?.classList.toggle('open');
        });

        document.addEventListener('click', (e) => {
            const sidebar = document.getElementById('sidebar');
            const menuToggle = document.getElementById('menuToggle');
            if (sidebar && sidebar.classList.contains('open') &&
                !sidebar.contains(e.target) &&
                menuToggle && !menuToggle.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        });

        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const section = e.currentTarget.dataset.section;
                this.switchSection(section);
                document.getElementById('sidebar')?.classList.remove('open');
            });
        });

        document.getElementById('addWordBtn')?.addEventListener('click', () => this.openWordModal());
        document.getElementById('emptyAddBtn')?.addEventListener('click', () => this.openWordModal());

        const searchInput = document.getElementById('searchInput');
        searchInput?.addEventListener('input', (e) => {
            this.filterWords();
            const clearBtn = document.getElementById('clearSearch');
            if (clearBtn) {
                clearBtn.classList.toggle('visible', e.target.value.length > 0);
            }
        });

        document.getElementById('clearSearch')?.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            document.getElementById('clearSearch')?.classList.remove('visible');
            this.filterWords();
        });

        document.getElementById('sortSelect')?.addEventListener('change', () => this.filterWords());
        document.getElementById('filterStatus')?.addEventListener('change', () => this.filterWords());

        this.bindWordModalEvents();
        this.bindViewModalEvents();
        this.bindDeleteModalEvents();
        this.bindClearModalEvents();
        this.bindPracticeEvents();
        this.bindGameEvents();
        this.bindProgressEvents();
        this.bindSettingsEvents();
        this.bindReadingEvents();
        this.bindVideosEvents();
        this.bindSpeakingEvents();
        this.bindGoalEvents(); // НОВОЕ
    }

    // ===================== SPEAKING EVENTS =====================
    bindSpeakingEvents() {
        document.getElementById('speakingRecordBtn')?.addEventListener('click', () => {
            this.toggleRecording();
        });

        document.getElementById('speakingCopyBtn')?.addEventListener('click', () => {
            this.copyForAI();
        });

        document.getElementById('speakingClearBtn')?.addEventListener('click', () => {
            this.clearTranscript();
        });

        document.getElementById('speakingLanguage')?.addEventListener('change', (e) => {
            this.speakingLanguage = e.target.value;
            if (this.recognition) {
                this.recognition.lang = this.speakingLanguage;
            }
        });
    }

    bindVideosEvents() {
        document.getElementById('videosSearch')?.addEventListener('input', () => this.renderVideosGrid());
        document.getElementById('videosLevelFilter')?.addEventListener('change', () => this.renderVideosGrid());
        document.getElementById('videosStatusFilter')?.addEventListener('change', () => this.renderVideosGrid());
        document.getElementById('videosSort')?.addEventListener('change', () => this.renderVideosGrid());

        document.getElementById('clearVideosSearch')?.addEventListener('click', () => {
            const s = document.getElementById('videosSearch');
            if (s) s.value = '';
            this.renderVideosGrid();
        });

        document.getElementById('backToVideos')?.addEventListener('click', () => this.showVideosSetup());

        document.getElementById('videoLikeBtn')?.addEventListener('click', () => this.toggleVideoLike(true));
        document.getElementById('videoDislikeBtn')?.addEventListener('click', () => this.toggleVideoLike(false));
        document.getElementById('videoToggleFavoriteBtn')?.addEventListener('click', () => this.toggleVideoFavorite());
        document.getElementById('videoMarkWatchedBtn')?.addEventListener('click', () => this.markVideoWatched());
        
        document.getElementById('videoAddWordBtn')?.addEventListener('click', () => this.openWordModal());
    }

    bindWordModalEvents() {
        const modal = document.getElementById('wordModal');
        const form = document.getElementById('wordForm');

        document.getElementById('closeModal')?.addEventListener('click', () => this.closeModal('wordModal'));
        document.getElementById('cancelBtn')?.addEventListener('click', () => this.closeModal('wordModal'));
        modal?.querySelector('.modal-overlay')?.addEventListener('click', () => this.closeModal('wordModal'));

        document.getElementById('previewImageBtn')?.addEventListener('click', () => {
            const url = document.getElementById('imageInput')?.value;
            const preview = document.getElementById('imagePreview');
            if (url && preview) this.previewImage(url, preview);
        });

        document.getElementById('imageInput')?.addEventListener('blur', (e) => {
            const preview = document.getElementById('imagePreview');
            if (preview) this.previewImage(e.target.value, preview);
        });

        document.getElementById('addExample')?.addEventListener('click', () => this.addExampleField());

        document.getElementById('examplesList')?.addEventListener('click', (e) => {
            const target = e.target.closest('button');
            if (!target) return;
            if (target.classList.contains('remove-example')) {
                const items = document.querySelectorAll('.example-item');
                if (items.length > 1) target.closest('.example-item')?.remove();
            }
            if (target.classList.contains('preview-example-img')) {
                const item = target.closest('.example-item');
                const url = item?.querySelector('.example-image')?.value;
                const preview = item?.querySelector('.example-image-preview');
                if (url && preview) this.previewImage(url, preview);
            }
        });

        form?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveWord();
        });
    }

    bindViewModalEvents() {
        const modal = document.getElementById('viewModal');
        document.getElementById('closeViewModal')?.addEventListener('click', () => this.closeModal('viewModal'));
        modal?.querySelector('.modal-overlay')?.addEventListener('click', () => this.closeModal('viewModal'));
        document.getElementById('viewSpeak')?.addEventListener('click', () => {
            const word = this.words.find(w => w.id === this.currentWordId);
            if (word) this.speak(word.word);
        });
        document.getElementById('editFromView')?.addEventListener('click', () => {
            this.closeModal('viewModal');
            this.openWordModal(this.currentWordId);
        });
        document.getElementById('deleteFromView')?.addEventListener('click', () => {
            this.closeModal('viewModal');
            this.openDeleteModal(this.currentWordId);
        });
    }

    bindDeleteModalEvents() {
        const modal = document.getElementById('deleteModal');
        document.getElementById('closeDeleteModal')?.addEventListener('click', () => this.closeModal('deleteModal'));
        document.getElementById('cancelDelete')?.addEventListener('click', () => this.closeModal('deleteModal'));
        modal?.querySelector('.modal-overlay')?.addEventListener('click', () => this.closeModal('deleteModal'));
        document.getElementById('confirmDelete')?.addEventListener('click', () => this.deleteWord());
    }

    bindClearModalEvents() {
        const modal = document.getElementById('clearModal');
        const input = document.getElementById('clearConfirmInput');
        const confirmBtn = document.getElementById('confirmClear');
        document.getElementById('closeClearModal')?.addEventListener('click', () => this.closeModal('clearModal'));
        document.getElementById('cancelClear')?.addEventListener('click', () => this.closeModal('clearModal'));
        modal?.querySelector('.modal-overlay')?.addEventListener('click', () => this.closeModal('clearModal'));
        input?.addEventListener('input', (e) => {
            if (confirmBtn) confirmBtn.disabled = e.target.value !== 'УДАЛИТЬ';
        });
        confirmBtn?.addEventListener('click', () => {
            if (input?.value === 'УДАЛИТЬ') this.clearAllData();
        });
    }

    bindPracticeEvents() {
        document.querySelectorAll('.mode-card').forEach(card => {
            card.addEventListener('click', () => {
                document.querySelectorAll('.mode-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                this.practiceMode = card.dataset.mode;
            });
        });
        document.getElementById('startPractice')?.addEventListener('click', () => this.startPractice());
        document.getElementById('exitPractice')?.addEventListener('click', () => this.resetPractice());
        document.getElementById('showAnswer')?.addEventListener('click', () => this.showPracticeAnswer());
        document.getElementById('dontKnow')?.addEventListener('click', () => this.practiceAnswer(false));
        document.getElementById('know')?.addEventListener('click', () => this.practiceAnswer(true));
        document.getElementById('restartPractice')?.addEventListener('click', () => this.startPractice());
        document.getElementById('backToSetup')?.addEventListener('click', () => this.resetPractice());
    }

    bindGameEvents() {
        document.querySelectorAll('.game-mode-card .btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const game = e.target.closest('[data-game]')?.dataset.game;
                if (game) this.startGame(game);
            });
        });
        document.getElementById('exitQuiz')?.addEventListener('click', () => this.exitGame());
        document.getElementById('exitTyping')?.addEventListener('click', () => this.exitGame());
        document.getElementById('exitMatch')?.addEventListener('click', () => this.exitGame());
        document.getElementById('checkTyping')?.addEventListener('click', () => this.checkTypingAnswer());
        document.getElementById('typingInput')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.checkTypingAnswer();
        });
        document.getElementById('playAgain')?.addEventListener('click', () => this.startGame(this.currentGame));
        document.getElementById('backToGames')?.addEventListener('click', () => this.showGameSetup());
    }

    bindProgressEvents() {
        document.getElementById('saveLevelBtn')?.addEventListener('click', () => {
            const select = document.getElementById('manualLevelSelect');
            if (select) {
                this.settings.manualLevel = select.value;
                this.saveSettings();
                this.updateProgressSection();
                this.updateSidebarLevel();
                this.showToast('Уровень сохранён', 'success');
            }
        });
    }

    bindSettingsEvents() {
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.addEventListener('click', () => this.setTheme(btn.dataset.theme));
        });
        document.getElementById('exportBtn')?.addEventListener('click', () => this.exportData());
        document.getElementById('importInput')?.addEventListener('change', (e) => this.importData(e));
        document.getElementById('clearAllBtn')?.addEventListener('click', () => {
            const input = document.getElementById('clearConfirmInput');
            const confirmBtn = document.getElementById('confirmClear');
            if (input) input.value = '';
            if (confirmBtn) confirmBtn.disabled = true;
            this.openModal('clearModal');
        });
        document.getElementById('autoBackupToggle')?.addEventListener('change', (e) => {
            this.settings.autoBackup = e.target.checked;
            this.saveSettings();
        });
        document.getElementById('manualBackupBtn')?.addEventListener('click', () => {
            this.createBackup();
            this.showToast('Резервная копия создана', 'success');
        });
    }

    bindReadingEvents() {
        document.getElementById('readingSearch')?.addEventListener('input', () => this.renderTextsGrid());
        document.getElementById('readingLevelFilter')?.addEventListener('change', () => this.renderTextsGrid());
        document.getElementById('readingAudioFilter')?.addEventListener('change', () => this.renderTextsGrid());
        document.getElementById('readingWordCountFilter')?.addEventListener('change', () => this.renderTextsGrid());

        document.getElementById('clearReadingSearch')?.addEventListener('click', () => {
            const searchInput = document.getElementById('readingSearch');
            if (searchInput) {
                searchInput.value = '';
                this.renderTextsGrid();
            }
        });

        document.getElementById('backToTexts')?.addEventListener('click', () => this.showTextsSetup());
        document.getElementById('markAsRead')?.addEventListener('click', () => this.markTextAsRead());
        document.getElementById('toggleAudioBtn')?.addEventListener('click', () => this.toggleAudio());
        document.getElementById('toggleLoopBtn')?.addEventListener('click', () => this.toggleAudioLoop());
    }

    // ===== SECTIONS =====
    switchSection(section) {
        this.stopAudio();

        if (this.currentSection === 'speaks' && section !== 'speaks') {
            if (this.isRecording) {
                this.stopRecording();
            }
        }

        if (this.currentSection === 'videos' && section !== 'videos') {
            this.stopVideoPlayback();
        }

        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.section === section);
        });
        document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));
        document.getElementById(`${section}-section`)?.classList.add('active');
        this.currentSection = section;
        this.renderCurrentSection();
    }

    renderCurrentSection() {
        switch (this.currentSection) {
            case 'goal': this.updateGoalSection(); break; // НОВОЕ
            case 'goalHistory': this.updateGoalHistorySection(); break; // НОВОЕ
            case 'dictionary': this.renderWords(); break;
            case 'learning': this.renderLearningWords(); break;
            case 'learned': this.renderLearnedWords(); break;
            case 'practice': this.resetPractice(); break;
            case 'speaks': this.updateSpeakingSection(); break;
            case 'reading': this.updateReadingSection(); break;
            case 'wordgame': this.updateGameSection(); break;
            case 'videos': this.updateVideosSection(); break;
            case 'progress': this.updateProgressSection(); break;
            case 'settings': this.updateSettingsSection(); break;
        }
    }

    // ===== AUDIO CONTROLS =====
    toggleAudio() {
        if (!this.currentAudio) return;

        const btn = document.getElementById('toggleAudioBtn');

        if (this.isAudioPlaying) {
            // 1) останавливаем учет
            if (this.listeningSession) this.listeningSession.active = false;

            // 2) фиксируем накопленное в минуты
            this.flushListeningMinutes?.();

            // 3) пауза
            this.currentAudio.pause();
            this.isAudioPlaying = false;

            if (btn) {
                btn.innerHTML = '<i class="fas fa-play"></i> Воспроизвести';
                btn.classList.remove('playing');
            }
        } else {
            // старт учета
            if (this.listeningSession) {
                this.listeningSession.active = true;
                this.listeningSession.lastTime = this.currentAudio.currentTime || 0;
            }

            this.currentAudio.play().catch(e => {
                console.error('Audio play error:', e);
                this.showToast('Ошибка воспроизведения аудио', 'error');
            });

            this.isAudioPlaying = true;
            if (btn) {
                btn.innerHTML = '<i class="fas fa-pause"></i> Пауза';
                btn.classList.add('playing');
            }
        }
    }
    flushListeningMinutes() {
        if (!this.listeningSession) return;

        // перевести накопленные секунды в минуты
        const minutes = Math.floor((this.listeningSession.accumulatedSeconds || 0) / 60);

        if (minutes > 0) {
            this.incrementDailyActivity('listening', minutes);
            this.listeningSession.accumulatedSeconds -= minutes * 60;
        }
    }
    stopAudio() {
        this.flushListeningMinutes?.();
        if (this.listeningSession) this.listeningSession.active = false;
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio.currentTime = 0;
            this.currentAudio = null;
            this.isAudioPlaying = false;
        }
        // Сбросить UI кнопки повтора при смене текста
        this.audioLoop = false;
        const loopBtn = document.getElementById('toggleLoopBtn');
        if (loopBtn) loopBtn.classList.remove('active');
    }

    setupAudio(audioSrc) {
        this.stopAudio();

        const audioControls = document.getElementById('audioControls');
        const toggleBtn = document.getElementById('toggleAudioBtn');
        const audioDuration = document.getElementById('audioDuration');
        const audioProgress = document.getElementById('audioProgress');

        if (!this.hasAudio(audioSrc)) {
            if (audioControls) audioControls.style.display = 'none';
            return;
        }

        if (audioControls) audioControls.style.display = 'flex';

        this.currentAudio = new Audio(audioSrc);
        // сброс слушания для нового аудио
        this.listeningSession = { active: false, lastTime: 0, accumulatedSeconds: 0 };

        // когда играет — копим секунды
        this.currentAudio.addEventListener('timeupdate', () => {
            if (!this.listeningSession.active) return;

            const cur = this.currentAudio.currentTime || 0;
            const delta = cur - (this.listeningSession.lastTime || 0);

            // защита от перемоток/скачков
            if (delta > 0 && delta < 3) {
                this.listeningSession.accumulatedSeconds += delta;
            }

            this.listeningSession.lastTime = cur;
        });

        this.currentAudio.addEventListener('loadedmetadata', () => {
            if (audioDuration) audioDuration.textContent = this.formatDuration(this.currentAudio.duration);
        });

        this.currentAudio.addEventListener('timeupdate', () => {
            if (audioProgress && this.currentAudio.duration) {
                const progress = (this.currentAudio.currentTime / this.currentAudio.duration) * 100;
                audioProgress.style.width = `${progress}%`;
            }
        });

        this.currentAudio.addEventListener('ended', () => {
            if (this.audioLoop) {
                // Повтор аудио
                this.currentAudio.currentTime = 0;
                this.currentAudio.play().catch(e => console.error('Loop play error:', e));
                // Обновляем lastTime для корректного подсчёта listening
                if (this.listeningSession) {
                    this.listeningSession.lastTime = 0;
                }
            } else {
                // Остановка
                this.isAudioPlaying = false;
                if (this.listeningSession) this.listeningSession.active = false;
                this.flushListeningMinutes?.();
                
                if (toggleBtn) {
                    toggleBtn.innerHTML = '<i class="fas fa-play"></i> Воспроизвести';
                    toggleBtn.classList.remove('playing');
                }
                if (audioProgress) audioProgress.style.width = '0%';
            }
        });
        this.currentAudio.addEventListener('error', () => {
            if (audioControls) audioControls.style.display = 'none';
            this.showToast('Ошибка загрузки аудио', 'error');
        });

        if (toggleBtn) {
            toggleBtn.innerHTML = '<i class="fas fa-play"></i> Воспроизвести';
            toggleBtn.classList.remove('playing');
        }
    }

    formatDuration(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    toggleAudioLoop() {
        this.audioLoop = !this.audioLoop;
        
        const loopBtn = document.getElementById('toggleLoopBtn');
        if (loopBtn) {
            loopBtn.classList.toggle('active', this.audioLoop);
        }
        
        this.showToast(
            this.audioLoop ? 'Повтор включён 🔁' : 'Повтор выключен', 
            'info'
        );
    }
    // ===== READING SECTION =====
    updateReadingSection() {
        const learnedCount = this.words.filter(w => w.status === 'learned').length;
        const isUnlocked = learnedCount >= this.READING_UNLOCK_THRESHOLD;

        const readingLocked = document.getElementById('readingLocked');
        const readingSetup = document.getElementById('readingSetup');
        const readingView = document.getElementById('readingView');

        if (readingLocked) readingLocked.style.display = isUnlocked ? 'none' : 'block';
        if (readingSetup) readingSetup.style.display = isUnlocked ? 'block' : 'none';
        if (readingView) readingView.style.display = 'none';

        const progress = this.READING_UNLOCK_THRESHOLD === 0 ? 100 : Math.min((learnedCount / this.READING_UNLOCK_THRESHOLD) * 100, 100);
        const progressFill = document.getElementById('readingProgressFill');
        const progressText = document.getElementById('readingProgressText');
        if (progressFill) progressFill.style.width = `${progress}%`;
        if (progressText) progressText.textContent = `${learnedCount} / ${this.READING_UNLOCK_THRESHOLD} выученных слов`;

        if (isUnlocked) {
            const level = this.getCurrentLevel();
            const levelText = document.getElementById('readingCurrentLevel');
            const levelIcon = document.getElementById('readingLevelIcon');
            if (levelText) levelText.textContent = level.name;
            if (levelIcon) levelIcon.className = `fas ${level.icon}`;

            this.initReadingFilters();
            this.renderTextsGrid();
        }
    }

    initReadingFilters() {
        const levelFilter = document.getElementById('readingLevelFilter');
        if (levelFilter && levelFilter.options.length <= 2) {
            this.levels.forEach(level => {
                const option = document.createElement('option');
                option.value = level.id;
                option.textContent = level.name;
                levelFilter.appendChild(option);
            });
        }

        const wordCountFilter = document.getElementById('readingWordCountFilter');
        if (wordCountFilter && wordCountFilter.options.length === 0) {
            this.wordCountRanges.forEach(range => {
                const option = document.createElement('option');
                option.value = range.id;
                option.textContent = range.name;
                wordCountFilter.appendChild(option);
            });
        }
    }

    renderTextsGrid() {
        const grid = document.getElementById('textsGrid');
        const noTexts = document.getElementById('noTextsState');

        const searchQuery = document.getElementById('readingSearch')?.value.toLowerCase().trim() || '';
        const levelFilter = document.getElementById('readingLevelFilter')?.value || 'all';
        const audioFilter = document.getElementById('readingAudioFilter')?.value || 'all';
        const wordCountFilter = document.getElementById('readingWordCountFilter')?.value || 'all';

        const currentLevel = this.getCurrentLevel();

        if (typeof readingTextsWithAudio === 'undefined' || readingTextsWithAudio.length === 0) {
            if (grid) grid.innerHTML = '';
            if (noTexts) noTexts.style.display = 'block';
            return;
        }

        let textsToShow = readingTextsWithAudio.filter(text => {
            if (levelFilter === 'current') {
                if (text.level !== currentLevel.id) return false;
            } else if (levelFilter !== 'all') {
                if (text.level !== levelFilter) return false;
            } else {
                const textLevelIndex = this.levels.findIndex(l => l.id === text.level);
                const currentLevelIndex = this.levels.findIndex(l => l.id === currentLevel.id);
                if (textLevelIndex > currentLevelIndex) return false;
            }

            if (searchQuery) {
                if (!text.title.toLowerCase().includes(searchQuery)) return false;
            }

            if (audioFilter !== 'all') {
                const hasAudioFile = this.hasAudio(text.audioSrc);
                if (audioFilter === 'with-audio' && !hasAudioFile) return false;
                if (audioFilter === 'without-audio' && hasAudioFile) return false;
            }

            if (wordCountFilter !== 'all') {
                const range = this.wordCountRanges.find(r => r.id === wordCountFilter);
                if (range) {
                    if (text.wordCount < range.min || text.wordCount >= range.max) return false;
                }
            }

            return true;
        });

        const resultsCount = document.getElementById('textsResultsCount');
        if (resultsCount) resultsCount.textContent = `Найдено: ${textsToShow.length}`;

        if (textsToShow.length === 0) {
            if (grid) grid.innerHTML = '';
            if (noTexts) noTexts.style.display = 'block';
            return;
        }

        if (noTexts) noTexts.style.display = 'none';

        if (grid) {
            grid.innerHTML = textsToShow.map(text => {
                const isRead = this.readTexts.includes(text.id);
                const hasAudioFile = this.hasAudio(text.audioSrc);

                return `
                    <div class="text-card ${isRead ? 'read' : ''}" data-text-id="${text.id}">
                        <div class="text-card-header">
                            <span class="text-level-badge level-${text.level}">${text.levelName}</span>
                            <div class="text-card-badges">
                                ${hasAudioFile ? '<span class="audio-badge" title="Есть аудио"><i class="fas fa-headphones"></i></span>' : ''}
                                ${isRead ? '<i class="fas fa-check-circle read-icon"></i>' : ''}
                            </div>
                        </div>
                        <h3 class="text-card-title">${text.title}</h3>
                        <div class="text-card-meta">
                            <span><i class="fas fa-align-left"></i> ${text.wordCount} слов</span>
                            ${hasAudioFile ? '<span><i class="fas fa-volume-up"></i> Аудио</span>' : ''}
                        </div>
                        <button class="btn btn-primary btn-small read-text-btn">
                            <i class="fas fa-book-open"></i> ${isRead ? 'Читать снова' : 'Читать'}
                        </button>
                    </div>
                `;
            }).join('');

            grid.querySelectorAll('.text-card').forEach(card => {
                card.querySelector('.read-text-btn')?.addEventListener('click', () => {
                    const textId = card.dataset.textId;
                    this.openText(textId);
                });
            });
        }
    }

    openText(textId) {
        if (typeof readingTextsWithAudio === 'undefined') return;
        const text = readingTextsWithAudio.find(t => t.id === textId);
        if (!text) return;

        this.currentTextId = textId;

        const readingSetup = document.getElementById('readingSetup');
        const readingView = document.getElementById('readingView');
        if (readingSetup) readingSetup.style.display = 'none';
        if (readingView) readingView.style.display = 'block';

        const levelBadge = document.getElementById('textLevelBadge');
        const title = document.getElementById('readingTitle');
        const wordCount = document.getElementById('readingWordCount');
        const textContent = document.getElementById('readingText');

        if (levelBadge) {
            levelBadge.textContent = text.levelName;
            levelBadge.className = `reading-level-badge level-${text.level}`;
        }
        if (title) title.textContent = text.title;
        if (wordCount) wordCount.textContent = text.wordCount;

        this.setupAudio(text.audioSrc);

        if (textContent) {
            const paragraphs = text.text.split('\n\n');
            textContent.innerHTML = paragraphs.map(p => {
                const tokens = p.split(/(\s+|[.,!?;:'"()[\]{}«»—–-]+)/);
                const wrappedTokens = tokens.map(token => {
                    if (/^[\s.,!?;:'"()[\]{}«»—–-]+$/.test(token) || !token) return token;
                    const cleanWord = token.replace(/[.,!?;:'"()[\]{}«»—–-]/g, '').trim();
                    if (cleanWord && /[a-zA-Zа-яА-ЯёЁ]/.test(cleanWord)) {
                        return `<span class="clickable-word" data-word="${this.escapeHtml(cleanWord)}">${token}</span>`;
                    }
                    return token;
                }).join('');
                return `<p>${wrappedTokens}</p>`;
            }).join('');

            textContent.querySelectorAll('.clickable-word').forEach(span => {
                span.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const word = e.currentTarget.dataset.word;
                    if (word) this.openWordModal(null, word);
                });
            });
        }

        const isRead = this.readTexts.includes(textId);
        const markBtn = document.getElementById('markAsRead');
        if (markBtn) {
            markBtn.innerHTML = isRead
                ? '<i class="fas fa-check-circle"></i> Прочитано'
                : '<i class="fas fa-check"></i> Отметить как прочитано';
            markBtn.disabled = isRead;
        }
    }

    showTextsSetup() {
        this.stopAudio();
        const readingView = document.getElementById('readingView');
        const readingSetup = document.getElementById('readingSetup');
        if (readingView) readingView.style.display = 'none';
        if (readingSetup) readingSetup.style.display = 'block';
        this.renderTextsGrid();
    }

    markTextAsRead() {
        if (!this.currentTextId || this.readTexts.includes(this.currentTextId)) return;

        this.readTexts.push(this.currentTextId);
        this.saveReadTexts();
        this.incrementDailyActivity('texts', 1);
        const markBtn = document.getElementById('markAsRead');
        if (markBtn) {
            markBtn.innerHTML = '<i class="fas fa-check-circle"></i> Прочитано';
            markBtn.disabled = true;
        }

        this.showToast('Текст отмечен как прочитанный', 'success');
    }

    // ===== WORDS RENDERING =====
    renderWords() { this.filterWords(); }

    filterWords() {
        const searchInput = document.getElementById('searchInput');
        const sortSelect = document.getElementById('sortSelect');
        const filterStatus = document.getElementById('filterStatus');

        const search = searchInput?.value.toLowerCase() || '';
        const sort = sortSelect?.value || 'newest';
        const status = filterStatus?.value || 'all';

        let filtered = [...this.words];

        if (search) {
            filtered = filtered.filter(w =>
                w.word.toLowerCase().includes(search) ||
                (w.translation && w.translation.toLowerCase().includes(search))
            );
        }

        if (status !== 'all') filtered = filtered.filter(w => w.status === status);

        filtered.sort((a, b) => {
            switch (sort) {
                case 'newest': return b.createdAt - a.createdAt;
                case 'oldest': return a.createdAt - b.createdAt;
                case 'az': return a.word.localeCompare(b.word);
                case 'za': return b.word.localeCompare(a.word);
                default: return 0;
            }
        });

        this.displayWords(filtered, 'wordsGrid', 'emptyState');
    }

    renderLearningWords() {
        const learning = this.words.filter(w => w.status === 'learning');
        this.displayWords(learning, 'learningGrid', 'learningEmpty');
    }

    renderLearnedWords() {
        const learned = this.words.filter(w => w.status === 'learned');
        this.displayWords(learned, 'learnedGrid', 'learnedEmpty');
    }

    displayWords(words, gridId, emptyId) {
        const grid = document.getElementById(gridId);
        const empty = document.getElementById(emptyId);
        if (!grid) return;

        if (words.length === 0) {
            grid.innerHTML = '';
            if (empty) empty.style.display = 'flex';
            return;
        }

        if (empty) empty.style.display = 'none';
        grid.innerHTML = words.map(word => this.createWordCard(word)).join('');

        grid.querySelectorAll('.word-card').forEach(card => {
            const wordId = card.dataset.wordId;
            const word = this.words.find(w => w.id === wordId);
            if (!word) return;

            card.addEventListener('click', (e) => {
                if (e.target.closest('.word-card-actions') || e.target.closest('.status-toggle')) return;
                this.openViewModal(wordId);
            });

            card.querySelector('.speak-btn')?.addEventListener('click', (e) => {
                e.stopPropagation();
                this.speak(word.word);
            });

            card.querySelector('.edit-btn')?.addEventListener('click', (e) => {
                e.stopPropagation();
                this.openWordModal(wordId);
            });

            card.querySelector('.delete-btn')?.addEventListener('click', (e) => {
                e.stopPropagation();
                this.openDeleteModal(wordId);
            });

            card.querySelector('.status-toggle')?.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleWordStatus(wordId);
            });
        });
    }

    createWordCard(word) {
        const statusIcon = word.status === 'learned'
            ? '<i class="fas fa-check-circle"></i>'
            : '<i class="fas fa-graduation-cap"></i>';
        const statusText = word.status === 'learned' ? 'Выучено' : 'Изучается';
        const statusClass = word.status === 'learned' ? 'learned' : 'learning';

        return `
            <div class="word-card" data-word-id="${word.id}">
                <div class="word-card-image">
                    <img src="${word.image}" alt="${word.word}" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><rect fill=%22%23e2e8f0%22 width=%22100%22 height=%22100%22/><text x=%2250%22 y=%2255%22 font-size=%2240%22 text-anchor=%22middle%22 fill=%22%2394a3b8%22>?</text></svg>'">
                </div>
                <div class="word-card-body">
                    <div class="word-card-header">
                        <div class="word-title">
                            <h3>${this.escapeHtml(word.word)}</h3>
                            <button class="speak-btn" title="Произнести">
                                <i class="fas fa-volume-up"></i>
                            </button>
                        </div>
                        <div class="word-card-actions">
                            <button class="icon-btn edit-btn" title="Редактировать">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="icon-btn delete delete-btn" title="Удалить">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <p class="word-translation">${this.escapeHtml(word.translation || '')}</p>
                    <div class="word-card-footer">
                        <span class="status-badge ${statusClass}">
                            ${statusIcon} ${statusText}
                        </span>
                        <button class="status-toggle" title="Изменить статус">
                            <i class="fas fa-sync-alt"></i> Статус
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // ===== WORD MODAL =====
    openWordModal(wordId = null, prefilledWord = null) {
        this.currentWordId = wordId;
        const title = document.getElementById('modalTitle');
        const form = document.getElementById('wordForm');

        form?.reset();
        const imagePreview = document.getElementById('imagePreview');
        if (imagePreview) {
            imagePreview.innerHTML = '';
            imagePreview.classList.remove('has-image');
        }

        const examplesList = document.getElementById('examplesList');
        if (examplesList) {
            examplesList.innerHTML = this.createExampleItem();
        }

        if (wordId) {
            const word = this.words.find(w => w.id === wordId);
            if (!word) return;

            if (title) title.innerHTML = '<i class="fas fa-edit"></i> Редактировать слово';

            const wordInput = document.getElementById('wordInput');
            const translationInput = document.getElementById('translationInput');
            const imageInput = document.getElementById('imageInput');
            const statusSelect = document.getElementById('statusSelect');

            if (wordInput) wordInput.value = word.word;
            if (translationInput) translationInput.value = word.translation || '';
            if (imageInput) imageInput.value = word.image;
            if (statusSelect) statusSelect.value = word.status;

            if (imagePreview && word.image) {
                this.previewImage(word.image, imagePreview);
            }

            if (word.examples && word.examples.length > 0 && examplesList) {
                examplesList.innerHTML = word.examples.map(ex => this.createExampleItem(ex)).join('');
            }
        } else {
            if (title) title.innerHTML = '<i class="fas fa-plus-circle"></i> Добавить слово';

            if (prefilledWord) {
                const wordInput = document.getElementById('wordInput');
                if (wordInput) wordInput.value = prefilledWord;
                this.showToast(`Добавление слова: "${prefilledWord}"`, 'info');
            }
        }

        this.openModal('wordModal');

        if (prefilledWord) {
            setTimeout(() => document.getElementById('translationInput')?.focus(), 100);
        } else {
            setTimeout(() => document.getElementById('wordInput')?.focus(), 100);
        }
    }

    createExampleItem(example = null) {
        const text = example?.text || '';
        const image = example?.image || '';
        const hasImage = image ? 'has-image' : '';
        const imgHtml = image ? `<img src="${image}" alt="Preview">` : '';

        return `
            <div class="example-item">
                <div class="example-text-group">
                    <input type="text" class="example-text" placeholder="Пример использования слова" value="${this.escapeHtml(text)}">
                </div>
                <div class="example-image-group">
                    <input type="url" class="example-image" placeholder="URL картинки для примера (необязательно)" value="${this.escapeHtml(image)}">
                    <button type="button" class="preview-example-img btn-icon"><i class="fas fa-eye"></i></button>
                </div>
                <div class="example-image-preview ${hasImage}">${imgHtml}</div>
                <button type="button" class="remove-example btn-icon danger"><i class="fas fa-trash"></i></button>
            </div>
        `;
    }

    addExampleField() {
        const examplesList = document.getElementById('examplesList');
        if (examplesList) {
            const newExample = document.createElement('div');
            newExample.innerHTML = this.createExampleItem();
            examplesList.appendChild(newExample.firstElementChild);
        }
    }

    saveWord() {
        const wordInput = document.getElementById('wordInput');
        const translationInput = document.getElementById('translationInput');
        const imageInput = document.getElementById('imageInput');
        const statusSelect = document.getElementById('statusSelect');

        const word = wordInput?.value.trim();
        const translation = translationInput?.value.trim();
        const image = imageInput?.value.trim();
        const status = statusSelect?.value || 'learning';

        if (!word) {
            this.showToast('Заполните обязательные поля', 'error');
            return;
        }

        const examples = Array.from(document.querySelectorAll('.example-item')).map(item => {
            const textInput = item.querySelector('.example-text');
            const imgInput = item.querySelector('.example-image');
            const text = textInput?.value.trim();
            const img = imgInput?.value.trim();
            if (text) return { text, image: img };
            return null;
        }).filter(ex => ex !== null);

                if (this.currentWordId) {
            const wordObj = this.words.find(w => w.id === this.currentWordId);
            if (wordObj) {
                wordObj.word = word;
                wordObj.translation = translation;
                wordObj.image = image;
                wordObj.status = status;
                wordObj.examples = examples;
                wordObj.updatedAt = Date.now();
            }
            this.showToast('Слово обновлено', 'success');
        } else {
            const newWord = {
                id: 'word-' + Date.now(),
                word,
                translation,
                image,
                status,
                examples,
                createdAt: Date.now(),
                updatedAt: Date.now()
            };
            this.words.unshift(newWord);

            // автостатистика: новое слово добавлено сегодня
            this.incrementDailyActivity('newWords', 1);

            this.showToast('Слово добавлено', 'success');
        }

        this.saveWords();
        this.closeModal('wordModal');
        this.renderCurrentSection();
    }

    // ===== VIEW MODAL =====
    openViewModal(wordId) {
        const word = this.words.find(w => w.id === wordId);
        if (!word) return;

        this.currentWordId = wordId;

        const viewWord = document.getElementById('viewWord');
        const viewTranslation = document.getElementById('viewTranslation');
        const viewImage = document.getElementById('viewImage');
        const viewStatus = document.getElementById('viewStatus');
        const viewExamples = document.getElementById('viewExamples');
        const viewExamplesList = document.getElementById('viewExamplesList');

        if (viewWord) viewWord.textContent = word.word;
        if (viewTranslation) viewTranslation.textContent = word.translation || 'Нет перевода';

        if (viewImage) {
            viewImage.innerHTML = `<img src="${word.image}" alt="${word.word}" onerror="this.parentElement.innerHTML='<i class=\\'fas fa-image\\'></i>'">`;
        }

        const statusIcon = word.status === 'learned'
            ? '<i class="fas fa-check-circle"></i>'
            : '<i class="fas fa-graduation-cap"></i>';
        const statusText = word.status === 'learned' ? 'Выучено' : 'В изучении';
        const statusClass = word.status === 'learned' ? 'learned' : 'learning';

        if (viewStatus) {
            viewStatus.innerHTML = `<span class="status-badge ${statusClass}">${statusIcon} ${statusText}</span>`;
        }

        if (viewExamples && viewExamplesList) {
            if (word.examples && word.examples.length > 0) {
                viewExamples.style.display = 'block';
                viewExamplesList.innerHTML = word.examples.map(ex => `
                    <div class="example-gallery-item">
                        ${ex.image ? `<img src="${ex.image}" alt="Example" class="example-img">` : ''}
                        <p class="example-text">${this.escapeHtml(ex.text)}</p>
                    </div>
                `).join('');
            } else {
                viewExamples.style.display = 'none';
            }
        }

        this.openModal('viewModal');
    }

    // ===== DELETE MODAL =====
    openDeleteModal(wordId) {
        const word = this.words.find(w => w.id === wordId);
        if (!word) return;

        this.currentWordId = wordId;
        const deleteWordName = document.getElementById('deleteWordName');
        if (deleteWordName) deleteWordName.textContent = word.word;
        this.openModal('deleteModal');
    }

    deleteWord() {
        const index = this.words.findIndex(w => w.id === this.currentWordId);
        if (index === -1) return;

        this.words.splice(index, 1);
        this.saveWords();
        this.closeModal('deleteModal');
        this.renderCurrentSection();
        this.showToast('Слово удалено', 'success');
    }

    toggleWordStatus(wordId) {
        const word = this.words.find(w => w.id === wordId);
        if (!word) return;

        const prevStatus = word.status;

        word.status = word.status === 'learned' ? 'learning' : 'learned';
        word.updatedAt = Date.now();

        // автостатистика: засчитываем "выучено", только если было learning -> стало learned
        if (prevStatus !== 'learned' && word.status === 'learned') {
            this.incrementDailyActivity('learnedWords', 1);
        }

        this.saveWords();
        this.renderCurrentSection();
        this.showToast(`Статус изменён: ${word.status === 'learned' ? 'Выучено' : 'В изучении'}`, 'success');
    }

    // ===== MODAL UTILITIES =====
    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    previewImage(url, container) {
        if (!url) {
            container.innerHTML = '';
            container.classList.remove('has-image');
            return;
        }

        const img = new Image();
        img.onload = () => {
            container.innerHTML = `<img src="${url}" alt="Preview">`;
            container.classList.add('has-image');
        };
        img.onerror = () => {
            container.innerHTML = '<p class="error">Не удалось загрузить изображение</p>';
            container.classList.remove('has-image');
        };
        img.src = url;
    }

    // ===== SPEAK =====
    speak(text) {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            utterance.rate = 0.9;
            window.speechSynthesis.speak(utterance);
        } else {
            this.showToast('Синтез речи не поддерживается', 'error');
        }
    }

    // ===== UTILITIES =====
    escapeHtml(text) {
        if (!text) return '';
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showToast(message, type = 'info') {
        const container = document.getElementById('toastContainer');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        const icons = {
            success: 'fa-check-circle',
            error: 'fa-times-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };

        toast.innerHTML = `
            <i class="fas ${icons[type] || icons.info}"></i>
            <span>${message}</span>
        `;

        container.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 10);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // ===== THEME =====
    applyTheme() {
        const theme = this.settings.theme || 'light';
        document.documentElement.setAttribute('data-theme', theme);
    }

    setTheme(theme) {
        this.settings.theme = theme;
        this.saveSettings();
        this.applyTheme();

        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === theme);
        });
    }

    // ===== LEVELS =====
    getCurrentLevel() {
        if (this.settings.manualLevel && this.settings.manualLevel !== 'auto') {
            return this.levels.find(l => l.id === this.settings.manualLevel) || this.levels[0];
        }

        const learnedCount = this.words.filter(w => w.status === 'learned').length;

        for (let i = this.levels.length - 1; i >= 0; i--) {
            if (learnedCount >= this.levels[i].words) {
                return this.levels[i];
            }
        }

        return this.levels[0];
    }

    // ===== STATS =====
    updateAllStats() {
        const total = this.words.length;
        const learning = this.words.filter(w => w.status === 'learning').length;
        const learned = this.words.filter(w => w.status === 'learned').length;

        // Nav badges
        const navTotal = document.getElementById('navTotalBadge');
        const navLearning = document.getElementById('navLearningBadge');
        const navLearned = document.getElementById('navLearnedBadge');

        if (navTotal) navTotal.textContent = total;
        if (navLearning) navLearning.textContent = learning;
        if (navLearned) navLearned.textContent = learned;

        // Sidebar level
        this.updateSidebarLevel();
    }

    updateSidebarLevel() {
        const level = this.getCurrentLevel();
        const learnedCount = this.words.filter(w => w.status === 'learned').length;

        const levelTitle = document.getElementById('userLevelTitle');
        const levelWords = document.getElementById('userLevelWords');

        if (levelTitle) levelTitle.textContent = level.name;
        if (levelWords) levelWords.textContent = `${learnedCount} слов`;
    }

    // ===== GAME LOCK =====
    updateGameLock() {
        const totalWords = this.words.length;
        const isUnlocked = totalWords >= this.GAMES_UNLOCK_THRESHOLD;

        const badge = document.getElementById('gameLockedBadge');
        if (badge) {
            badge.style.display = isUnlocked ? 'none' : 'inline-flex';
        }
    }

    // ===== READING LOCK =====
    updateReadingLock() {
        const learnedCount = this.words.filter(w => w.status === 'learned').length;
        const isUnlocked = learnedCount >= this.READING_UNLOCK_THRESHOLD;

        const badge = document.getElementById('readingLockedBadge');
        if (badge) {
            badge.style.display = isUnlocked ? 'none' : 'inline-flex';
        }
    }

    // ===== EXPORT / IMPORT =====
    exportData() {
        const data = {
            words: this.words,
            settings: this.settings,
            stats: this.stats,
            readTexts: this.readTexts,
            videosMeta: this.videosMeta,
            currentGoal: this.currentGoal,
            goalHistory: this.goalHistory,
            exportDate: new Date().toISOString(),
            version: '2.5'
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
    }

    importData(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);

                if (data.words && Array.isArray(data.words)) {
                    this.words = data.words;
                    this.saveWords();
                }

                if (data.settings) {
                    this.settings = { ...this.settings, ...data.settings };
                    this.saveSettings();
                }

                if (data.stats) {
                    this.stats = { ...this.stats, ...data.stats };
                    this.saveStats();
                }

                if (data.readTexts && Array.isArray(data.readTexts)) {
                    this.readTexts = data.readTexts;
                    this.saveReadTexts();
                }

                if (data.videosMeta) {
                    this.videosMeta = data.videosMeta;
                    this.saveVideosMeta();
                }

                if (data.currentGoal) {
                    this.currentGoal = data.currentGoal;
                }

                if (data.goalHistory && Array.isArray(data.goalHistory)) {
                    this.goalHistory = data.goalHistory;
                }

                this.saveGoalData();

                this.applyTheme();
                this.renderCurrentSection();
                this.updateAllStats();
                this.updateGoalBadge();

                this.showToast(`Импортировано ${this.words.length} слов`, 'success');
            } catch (error) {
                console.error('Import error:', error);
                this.showToast('Ошибка импорта данных', 'error');
            }
        };

        reader.readAsText(file);
        event.target.value = '';
    }

    clearAllData() {
        this.words = [];
        this.stats = {
            totalPractices: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
            lastBackup: null
        };
        this.readTexts = [];
        this.videosMeta = {};
        this.currentGoal = null;
        this.goalHistory = [];

        localStorage.removeItem('dictionary_words');
        localStorage.removeItem('dictionary_stats');
        localStorage.removeItem('dictionary_read_texts');
        localStorage.removeItem('dictionary_videos_meta');
        localStorage.removeItem('dictionary_current_goal');
        localStorage.removeItem('dictionary_goal_history');

        this.saveWords();
        this.saveStats();
        this.saveReadTexts();
        this.saveVideosMeta();

        this.closeModal('clearModal');
        this.renderCurrentSection();
        this.updateAllStats();
        this.updateGoalBadge();

        this.showToast('Все данные удалены', 'success');
    }

    // ===== UPDATE SECTIONS =====
    updateLastBackupDisplay() {
        const el = document.getElementById('lastBackupDate');
        if (el) {
            if (this.stats.lastBackup) {
                const date = new Date(this.stats.lastBackup);
                el.textContent = date.toLocaleDateString('ru-RU', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
            } else {
                el.textContent = 'Никогда';
            }
        }
    }

    updateSettingsSection() {
        // Theme buttons
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === this.settings.theme);
        });

        // Auto backup toggle
        const autoBackupToggle = document.getElementById('autoBackupToggle');
        if (autoBackupToggle) {
            autoBackupToggle.checked = this.settings.autoBackup !== false;
        }

        // Last backup date
        this.updateLastBackupDisplay();

        // Storage info
        const storageUsed = document.getElementById('storageUsed');
        if (storageUsed) {
            let totalSize = 0;
            for (let key in localStorage) {
                if (localStorage.hasOwnProperty(key) && key.startsWith('dictionary_')) {
                    totalSize += localStorage[key].length * 2;
                }
            }
            const kb = (totalSize / 1024).toFixed(2);
            storageUsed.textContent = `${kb} KB`;
        }
    }

    updateProgressSection() {
        const level = this.getCurrentLevel();
        const learnedCount = this.words.filter(w => w.status === 'learned').length;
        const total = this.words.length;
        const learning = this.words.filter(w => w.status === 'learning').length;

        // Level badge
        const levelBadge = document.getElementById('progressLevelBadge');
        const levelName = document.getElementById('progressLevelName');
        const levelDesc = document.getElementById('progressLevelDesc');

        if (levelBadge) {
            levelBadge.innerHTML = `<i class="fas ${level.icon}"></i>`;
        }
        if (levelName) levelName.textContent = level.name;
        if (levelDesc) levelDesc.textContent = level.desc;

        // Progress bar
        const nextLevel = this.levels.find(l => l.words > learnedCount);
        const prevLevel = [...this.levels].reverse().find(l => l.words <= learnedCount) || this.levels[0];

        let progress = 100;
        let progressText = 'Максимальный уровень!';

        if (nextLevel) {
            const wordsNeeded = nextLevel.words - prevLevel.words;
            const wordsProgress = learnedCount - prevLevel.words;
            progress = wordsNeeded > 0 ? (wordsProgress / wordsNeeded) * 100 : 100;
            progressText = `${learnedCount} / ${nextLevel.words} слов до ${nextLevel.name}`;
        }

        const progressFill = document.getElementById('levelProgressFill');
        const progressTextEl = document.getElementById('levelProgressText');

        if (progressFill) progressFill.style.width = `${progress}%`;
        if (progressTextEl) progressTextEl.textContent = progressText;

        // Stats
        const statTotal = document.getElementById('statTotal');
        const statLearning = document.getElementById('statLearning');
        const statLearned = document.getElementById('statLearned');
        const statAccuracy = document.getElementById('statAccuracy');

        if (statTotal) statTotal.textContent = total;
        if (statLearning) statLearning.textContent = learning;
        if (statLearned) statLearned.textContent = learnedCount;

        if (statAccuracy) {
            const totalAnswers = this.stats.correctAnswers + this.stats.wrongAnswers;
            const accuracy = totalAnswers > 0 ? Math.round((this.stats.correctAnswers / totalAnswers) * 100) : 0;
            statAccuracy.textContent = `${accuracy}%`;
        }

        // Levels list
        const levelsList = document.getElementById('levelsList');
        if (levelsList) {
            levelsList.innerHTML = this.levels.map(lvl => {
                const isCompleted = learnedCount >= lvl.words;
                const isCurrent = lvl.id === level.id;

                return `
                    <div class="level-item ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}">
                        <div class="level-item-icon">
                            <i class="fas ${lvl.icon}"></i>
                        </div>
                        <div class="level-item-info">
                            <span class="level-item-name">${lvl.name}</span>
                            <span class="level-item-desc">${lvl.desc}</span>
                        </div>
                        <div class="level-item-status">
                            ${isCompleted ? '<i class="fas fa-check-circle"></i>' : `${lvl.words} слов`}
                        </div>
                    </div>
                `;
            }).join('');
        }

        // Manual level select
        const manualLevelSelect = document.getElementById('manualLevelSelect');
        if (manualLevelSelect && manualLevelSelect.options.length === 0) {
            const autoOption = document.createElement('option');
            autoOption.value = 'auto';
            autoOption.textContent = 'Автоматически';
            manualLevelSelect.appendChild(autoOption);

            this.levels.forEach(lvl => {
                const option = document.createElement('option');
                option.value = lvl.id;
                option.textContent = `${lvl.name} - ${lvl.desc}`;
                manualLevelSelect.appendChild(option);
            });

            manualLevelSelect.value = this.settings.manualLevel || 'auto';
        }
    }

    updateGameSection() {
        const totalWords = this.words.length;
        const isUnlocked = totalWords >= this.GAMES_UNLOCK_THRESHOLD;

        const gameLocked = document.getElementById('gameLocked');
        const gameSetup = document.getElementById('gameSetup');

        if (gameLocked) gameLocked.style.display = isUnlocked ? 'none' : 'block';
        if (gameSetup) gameSetup.style.display = isUnlocked ? 'block' : 'none';

        const progress = Math.min((totalWords / this.GAMES_UNLOCK_THRESHOLD) * 100, 100);
        const progressFill = document.getElementById('gameProgressFill');
        const progressText = document.getElementById('gameProgressText');

        if (progressFill) progressFill.style.width = `${progress}%`;
        if (progressText) progressText.textContent = `${totalWords} / ${this.GAMES_UNLOCK_THRESHOLD} слов`;
    }

    // ===== VIDEOS SECTION =====
    syncVideosMeta() {
        // Синхронизация метаданных видео с localStorage
        this.videos.forEach(video => {
            if (!this.videosMeta[video.id]) {
                this.videosMeta[video.id] = {
                    watched: false,
                    favorite: false,
                    liked: null,
                    addedWords: []
                };
            }
        });
    }

    updateVideosSection() {
        const videosSetup = document.getElementById('videosSetup');
        const videosView = document.getElementById('videosView');

        if (videosSetup) videosSetup.style.display = 'block';
        if (videosView) videosView.style.display = 'none';

        this.renderVideosGrid();
    }

    renderVideosGrid() {
        const grid = document.getElementById('videosGrid');
        const noVideos = document.getElementById('noVideosState');
        const resultsCount = document.getElementById('videosResultsCount');

        if (!grid) return;

        const searchQuery = document.getElementById('videosSearch')?.value.toLowerCase().trim() || '';
        const levelFilter = document.getElementById('videosLevelFilter')?.value || 'all';
        const statusFilter = document.getElementById('videosStatusFilter')?.value || 'all';
        const sortBy = document.getElementById('videosSort')?.value || 'relevance';

        let videosToShow = this.videos.filter(video => {
            // Search
            if (searchQuery && !video.title.toLowerCase().includes(searchQuery)) {
                return false;
            }

            // Level filter
            if (levelFilter !== 'all' && video.level !== levelFilter) {
                return false;
            }

            // Status filter
            const meta = this.videosMeta[video.id] || {};
            if (statusFilter === 'new' && meta.watched) return false;
            if (statusFilter === 'watched' && !meta.watched) return false;
            if (statusFilter === 'favorite' && !meta.favorite) return false;

            return true;
        });

        // Sorting
        videosToShow.sort((a, b) => {
            switch (sortBy) {
                case 'popular':
                    return (b.views || 0) - (a.views || 0);
                case 'likes':
                    return (b.likes || 0) - (a.likes || 0);
                case 'duration':
                    return this.parseDuration(a.duration) - this.parseDuration(b.duration);
                case 'newest':
                    return b.id.localeCompare(a.id);
                default:
                    return 0;
            }
        });

        if (resultsCount) {
            resultsCount.textContent = `Найдено: ${videosToShow.length}`;
        }

        if (videosToShow.length === 0) {
            grid.innerHTML = '';
            if (noVideos) noVideos.style.display = 'block';
            return;
        }

        if (noVideos) noVideos.style.display = 'none';

        grid.innerHTML = videosToShow.map(video => {
            const meta = this.videosMeta[video.id] || {};
            const isWatched = meta.watched;
            const isFavorite = meta.favorite;

            return `
                <div class="video-card ${isWatched ? 'watched' : ''}" data-video-id="${video.id}">
                    <div class="video-card-thumbnail">
                        <img src="${video.thumbnail || 'https://via.placeholder.com/320x180?text=Video'}" alt="${video.title}">
                        <span class="video-duration">${video.duration || '0:00'}</span>
                        ${isFavorite ? '<span class="video-favorite-badge"><i class="fas fa-bookmark"></i></span>' : ''}
                        ${isWatched ? '<span class="video-watched-badge"><i class="fas fa-check"></i></span>' : ''}
                    </div>
                    <div class="video-card-body">
                        <span class="video-level-badge level-${video.level}">${video.level?.toUpperCase() || 'N/A'}</span>
                        <h3 class="video-card-title">${video.title}</h3>
                        <div class="video-card-meta">
                            <span><i class="fas fa-eye"></i> ${this.formatNumber(video.views || 0)}</span>
                            <span><i class="fas fa-thumbs-up"></i> ${this.formatNumber(video.likes || 0)}</span>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Bind click events
        grid.querySelectorAll('.video-card').forEach(card => {
            card.addEventListener('click', () => {
                const videoId = card.dataset.videoId;
                this.openVideo(videoId);
            });
        });
    }

    openVideo(videoId) {
        const video = this.videos.find(v => v.id === videoId);
        if (!video) return;

        this.currentVideoId = videoId;

        const videosSetup = document.getElementById('videosSetup');
        const videosView = document.getElementById('videosView');

        if (videosSetup) videosSetup.style.display = 'none';
        if (videosView) videosView.style.display = 'block';

        // Update video details
        const levelBadge = document.getElementById('videoLevelBadge');
        const title = document.getElementById('videoTitle');
        const duration = document.getElementById('videoDuration');
        const views = document.getElementById('videoViews');
        const likes = document.getElementById('videoLikes');
        const description = document.getElementById('videoDescription');
        const frame = document.getElementById('videoFrame');
        const statusPill = document.getElementById('videoStatusPill');

        if (levelBadge) {
            levelBadge.textContent = video.level?.toUpperCase() || 'N/A';
            levelBadge.className = `reading-level-badge level-${video.level}`;
        }

        if (title) title.textContent = video.title;
        if (duration) duration.textContent = video.duration || '0:00';
        if (views) views.textContent = this.formatNumber(video.views || 0);
        if (likes) likes.textContent = this.formatNumber(video.likes || 0);
        if (description) description.textContent = video.description || 'Нет описания';

        if (frame && video.embedUrl) {
            frame.src = video.embedUrl;
        }

        const meta = this.videosMeta[videoId] || {};

        if (statusPill) {
            if (meta.watched) {
                statusPill.textContent = 'Просмотрено';
                statusPill.className = 'status-badge learned';
            } else {
                statusPill.textContent = 'Новое';
                statusPill.className = 'status-badge learning';
            }
        }

        this.updateVideoButtons();
        this.renderVideoRecommendations(video);
    }

    updateVideoButtons() {
        const meta = this.videosMeta[this.currentVideoId] || {};

        const likeBtn = document.getElementById('videoLikeBtn');
        const dislikeBtn = document.getElementById('videoDislikeBtn');
        const favBtn = document.getElementById('videoToggleFavoriteBtn');
        const watchedBtn = document.getElementById('videoMarkWatchedBtn');

        if (likeBtn) {
            likeBtn.classList.toggle('active', meta.liked === true);
        }

        if (dislikeBtn) {
            dislikeBtn.classList.toggle('active', meta.liked === false);
        }

        if (favBtn) {
            if (meta.favorite) {
                favBtn.innerHTML = '<i class="fas fa-bookmark"></i> В избранном';
                favBtn.classList.add('active');
            } else {
                favBtn.innerHTML = '<i class="far fa-bookmark"></i> В избранное';
                favBtn.classList.remove('active');
            }
        }

        if (watchedBtn) {
            if (meta.watched) {
                watchedBtn.innerHTML = '<i class="fas fa-check-circle"></i> Просмотрено';
                watchedBtn.disabled = true;
            } else {
                watchedBtn.innerHTML = '<i class="fas fa-check"></i> Отметить как просмотрено';
                watchedBtn.disabled = false;
            }
        }
    }

    renderVideoRecommendations(currentVideo) {
        const container = document.getElementById('videoRecommendations');
        if (!container) return;

        const recommendations = this.videos
            .filter(v => v.id !== currentVideo.id && v.level === currentVideo.level)
            .slice(0, 5);

        if (recommendations.length === 0) {
            container.innerHTML = '<p class="no-recommendations">Нет рекомендаций</p>';
            return;
        }

        container.innerHTML = recommendations.map(video => {
            const meta = this.videosMeta[video.id] || {};
            return `
                <div class="video-reco-item ${meta.watched ? 'watched' : ''}" data-video-id="${video.id}">
                    <div class="video-reco-thumb">
                        <img src="${video.thumbnail || 'https://via.placeholder.com/120x68?text=Video'}" alt="${video.title}">
                        <span class="video-duration">${video.duration || '0:00'}</span>
                    </div>
                    <div class="video-reco-info">
                        <h4>${video.title}</h4>
                        <span><i class="fas fa-eye"></i> ${this.formatNumber(video.views || 0)}</span>
                    </div>
                </div>
            `;
        }).join('');

        container.querySelectorAll('.video-reco-item').forEach(item => {
            item.addEventListener('click', () => {
                const videoId = item.dataset.videoId;
                this.stopVideoPlayback();
                this.openVideo(videoId);
            });
        });
    }

    toggleVideoLike(isLike) {
        if (!this.currentVideoId) return;

        if (!this.videosMeta[this.currentVideoId]) {
            this.videosMeta[this.currentVideoId] = {};
        }

        const meta = this.videosMeta[this.currentVideoId];

        if (isLike) {
            meta.liked = meta.liked === true ? null : true;
        } else {
            meta.liked = meta.liked === false ? null : false;
        }

        this.saveVideosMeta();
        this.updateVideoButtons();
    }

    toggleVideoFavorite() {
        if (!this.currentVideoId) return;

        if (!this.videosMeta[this.currentVideoId]) {
            this.videosMeta[this.currentVideoId] = {};
        }

        this.videosMeta[this.currentVideoId].favorite = !this.videosMeta[this.currentVideoId].favorite;
        this.saveVideosMeta();
        this.updateVideoButtons();

        const isFav = this.videosMeta[this.currentVideoId].favorite;
        this.showToast(isFav ? 'Добавлено в избранное' : 'Удалено из избранного', 'success');
    }

    markVideoWatched() {
        if (!this.currentVideoId) return;

        if (!this.videosMeta[this.currentVideoId]) {
            this.videosMeta[this.currentVideoId] = {};
        }

        this.videosMeta[this.currentVideoId].watched = true;
        this.saveVideosMeta();
        this.updateVideoButtons();

        const statusPill = document.getElementById('videoStatusPill');
        if (statusPill) {
            statusPill.textContent = 'Просмотрено';
            statusPill.className = 'status-badge learned';
        }

        this.showToast('Видео отмечено как просмотренное', 'success');
    }

    showVideosSetup() {
        this.stopVideoPlayback();

        const videosSetup = document.getElementById('videosSetup');
        const videosView = document.getElementById('videosView');

        if (videosView) videosView.style.display = 'none';
        if (videosSetup) videosSetup.style.display = 'block';

        this.renderVideosGrid();
    }

    stopVideoPlayback() {
        const frame = document.getElementById('videoFrame');
        if (frame) {
            frame.src = '';
        }
    }

    parseDuration(durationStr) {
        if (!durationStr) return 0;
        const parts = durationStr.split(':').map(Number);
        if (parts.length === 2) {
            return parts[0] * 60 + parts[1];
        } else if (parts.length === 3) {
            return parts[0] * 3600 + parts[1] * 60 + parts[2];
        }
        return 0;
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }
}

// ===== INITIALIZE APP =====
document.addEventListener('DOMContentLoaded', () => {
    window.app = new DictionaryApp();
});
