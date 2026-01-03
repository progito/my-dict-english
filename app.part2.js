// ===== DICTIONARY APPLICATION - PART 2 =====
//
// ВАЖНО:
// 1) Из этого файла УДАЛЁН дублирующий GOAL SYSTEM блок. Goal-логика должна жить в goal.js.
// 2) Добавлен автосчётчик "Видео просмотрено" через incrementDailyActivity('videos', 1)
//    (метод incrementDailyActivity должен быть добавлен в app.part1.js как мы делали).

// ===================== VIDEOS =====================
DictionaryApp.prototype.syncVideosMeta = function () {
    const byId = new Map((this.videos || []).map(v => [String(v.id), v]));

    (this.videos || []).forEach(v => {
        const id = String(v.id);
        if (!this.videosMeta[id]) {
            this.videosMeta[id] = {
                status: v.status || 'new',
                liked: false,
                disliked: false,
                viewsDelta: 0,
                lastOpenedAt: null
            };
        } else {
            if (!this.videosMeta[id].status) this.videosMeta[id].status = v.status || 'new';
            if (typeof this.videosMeta[id].viewsDelta !== 'number') this.videosMeta[id].viewsDelta = 0;
        }
    });

    this.saveVideosMeta();
};

DictionaryApp.prototype.getVideoEffectiveStatus = function (video) {
    const meta = this.videosMeta[String(video.id)];
    return meta?.status || video.status || 'new';
};

DictionaryApp.prototype.getVideoEffectiveViews = function (video) {
    const meta = this.videosMeta[String(video.id)];
    const base = typeof video.views === 'number' ? video.views : 0;
    const delta = typeof meta?.viewsDelta === 'number' ? meta.viewsDelta : 0;
    return base + delta;
};

DictionaryApp.prototype.getVideoEffectiveLikes = function (video) {
    const meta = this.videosMeta[String(video.id)];
    const base = typeof video.likes === 'number' ? video.likes : 0;
    const plus = meta?.liked ? 1 : 0;
    return base + plus;
};

DictionaryApp.prototype.parseDurationToSeconds = function (dur) {
    if (!dur || typeof dur !== 'string') return 0;
    const parts = dur.split(':').map(x => parseInt(x, 10));
    if (parts.some(n => Number.isNaN(n))) return 0;
    if (parts.length === 2) return parts[0] * 60 + parts[1];
    if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
    return 0;
};

DictionaryApp.prototype.formatViewsCount = function (count) {
    if (count >= 1000000) {
        return (count / 1000000).toFixed(1).replace('.0', '') + 'M';
    }
    if (count >= 1000) {
        return (count / 1000).toFixed(1).replace('.0', '') + 'K';
    }
    return String(count);
};

DictionaryApp.prototype.updateVideosSection = function () {
    if (!this.videos || this.videos.length === 0) {
        const grid = document.getElementById('videosGrid');
        const empty = document.getElementById('noVideosState');
        const cnt = document.getElementById('videosResultsCount');
        if (grid) grid.innerHTML = '';
        if (cnt) cnt.textContent = 'Найдено: 0';
        if (empty) empty.style.display = 'flex';
        return;
    }

    this.syncVideosMeta();
    this.showVideosSetup();
    this.renderVideosGrid();
    this.updateVideosBadge();
};

DictionaryApp.prototype.updateVideosBadge = function () {
    const badge = document.getElementById('navVideosBadge');
    if (!badge) return;
    const newCount = (this.videos || []).filter(v => this.getVideoEffectiveStatus(v) === 'new').length;
    badge.textContent = String(newCount);
    badge.style.display = newCount > 0 ? 'inline-flex' : 'none';
};

DictionaryApp.prototype.showVideosSetup = function () {
    this.stopVideoPlayback();

    const setup = document.getElementById('videosSetup');
    const view = document.getElementById('videosView');
    if (setup) setup.style.display = 'block';
    if (view) view.style.display = 'none';
    this.currentVideoId = null;
};

DictionaryApp.prototype.stopVideoPlayback = function () {
    const frame = document.getElementById('videoFrame');
    if (frame) {
        frame.src = '';
    }
};

DictionaryApp.prototype.renderVideosGrid = function () {
    const grid = document.getElementById('videosGrid');
    const empty = document.getElementById('noVideosState');
    if (!grid) return;

    const q = (document.getElementById('videosSearch')?.value || '').toLowerCase().trim();
    const level = document.getElementById('videosLevelFilter')?.value || 'all';
    const status = document.getElementById('videosStatusFilter')?.value || 'all';
    const sort = document.getElementById('videosSort')?.value || 'relevance';

    let list = [...this.videos];

    // filters
    if (level !== 'all') list = list.filter(v => String(v.level).toLowerCase() === String(level).toLowerCase());
    if (status !== 'all') {
        if (status === 'favorite') {
            list = list.filter(v => this.getVideoEffectiveStatus(v) === 'favorite');
        } else {
            list = list.filter(v => this.getVideoEffectiveStatus(v) === status);
        }
    }
    if (q) {
        list = list.filter(v =>
            (v.title || '').toLowerCase().includes(q) ||
            (v.description || '').toLowerCase().includes(q)
        );
    }

    // sort
    const relevanceScore = (v) => {
        if (!q) return 0;
        const t = (v.title || '').toLowerCase();
        const d = (v.description || '').toLowerCase();
        let s = 0;
        if (t.includes(q)) s += 3;
        if (d.includes(q)) s += 1;
        if (this.getVideoEffectiveStatus(v) === 'new') s += 0.2;
        return s;
    };

    list.sort((a, b) => {
        if (sort === 'relevance') {
            const rs = relevanceScore(b) - relevanceScore(a);
            if (rs !== 0) return rs;
            return (this.getVideoEffectiveViews(b) - this.getVideoEffectiveViews(a));
        }
        if (sort === 'popular') return this.getVideoEffectiveViews(b) - this.getVideoEffectiveViews(a);
        if (sort === 'likes') return this.getVideoEffectiveLikes(b) - this.getVideoEffectiveLikes(a);
        if (sort === 'duration') return this.parseDurationToSeconds(b.duration) - this.parseDurationToSeconds(a.duration);
        if (sort === 'newest') return Number(b.id) - Number(a.id);
        return 0;
    });

    // count
    const cnt = document.getElementById('videosResultsCount');
    if (cnt) cnt.textContent = `Найдено: ${list.length}`;

    if (list.length === 0) {
        grid.innerHTML = '';
        if (empty) empty.style.display = 'flex';
        return;
    }
    if (empty) empty.style.display = 'none';

    grid.innerHTML = list.map(v => this.createVideoCard(v)).join('');

    grid.querySelectorAll('.video-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.dataset.videoId;
            this.openVideo(id);
        });
    });
};

DictionaryApp.prototype.createVideoCard = function (video) {
    const status = this.getVideoEffectiveStatus(video);
    const views = this.getVideoEffectiveViews(video);
    const duration = video.duration || '0:00';

    const viewsFormatted = this.formatViewsCount(views);

    let statusIcon = '';
    if (status === 'watched') {
        statusIcon = '<i class="fas fa-check-circle" style="color: var(--success);"></i>';
    } else if (status === 'favorite') {
        statusIcon = '<i class="fas fa-bookmark" style="color: var(--primary);"></i>';
    }

    return `
        <div class="video-card" data-video-id="${this.escapeHtml(String(video.id))}">
            <div class="video-card-thumbnail">
                <img src="${this.escapeHtml(video.thumbnail || '')}" 
                     alt="${this.escapeHtml(video.title || '')}"
                     onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 320 180%22><rect fill=%22%23334155%22 width=%22320%22 height=%22180%22/><text x=%2250%25%22 y=%2250%25%22 font-size=%2240%22 text-anchor=%22middle%22 fill=%22%2394a3b8%22 dy=%22.3em%22>▶</text></svg>'">
                <span class="video-duration-badge">${this.escapeHtml(duration)}</span>
                ${status === 'new' ? '<span class="video-new-badge">NEW</span>' : ''}
            </div>
            <div class="video-card-info">
                <div class="video-card-title">${this.escapeHtml(video.title || 'Без названия')}</div>
                <div class="video-card-meta">
                    <span class="video-card-channel">${this.escapeHtml(String(video.level || 'A1'))}</span>
                    <span class="video-card-stats">
                        ${viewsFormatted} просм. ${statusIcon}
                    </span>
                </div>
            </div>
        </div>
    `;
};

DictionaryApp.prototype.openVideo = function (videoId) {
    const video = (this.videos || []).find(v => String(v.id) === String(videoId));
    if (!video) return;

    this.currentVideoId = String(video.id);

    // views +1 (локально)
    const meta = this.videosMeta[this.currentVideoId] || (this.videosMeta[this.currentVideoId] = {});
    meta.viewsDelta = (typeof meta.viewsDelta === 'number' ? meta.viewsDelta : 0) + 1;
    meta.lastOpenedAt = Date.now();
    this.saveVideosMeta();

    // show view
    const setup = document.getElementById('videosSetup');
    const view = document.getElementById('videosView');
    if (setup) setup.style.display = 'none';
    if (view) view.style.display = 'block';

    // fill UI
    const badge = document.getElementById('videoLevelBadge');
    const frame = document.getElementById('videoFrame');
    const title = document.getElementById('videoTitle');
    const desc = document.getElementById('videoDescription');
    const dur = document.getElementById('videoDuration');
    const views = document.getElementById('videoViews');
    const likes = document.getElementById('videoLikes');
    const pill = document.getElementById('videoStatusPill');

    const effectiveStatus = this.getVideoEffectiveStatus(video);

    if (badge) badge.textContent = String(video.level || 'A1');
    if (frame) frame.src = video.link || '';
    if (title) title.textContent = video.title || '';
    if (desc) desc.textContent = video.description || '';
    if (dur) dur.textContent = video.duration || '0:00';
    if (views) views.textContent = this.formatViewsCount(this.getVideoEffectiveViews(video));
    if (likes) likes.textContent = this.formatViewsCount(this.getVideoEffectiveLikes(video));

    if (pill) {
        const statusLabels = { new: 'Новое', watched: 'Просмотрено', favorite: 'Избранное' };
        pill.textContent = statusLabels[effectiveStatus] || effectiveStatus;
        pill.className = `status-badge ${effectiveStatus === 'favorite' ? 'learned' : effectiveStatus === 'watched' ? 'success' : 'learning'}`;
    }

    // buttons state
    this.updateVideoActionButtons();

    // new words
    this.renderVideoNewWords(video);

    // recommendations
    this.renderVideoRecommendations(video);

    // update badge
    this.updateVideosBadge();
};

DictionaryApp.prototype.renderVideoNewWords = function (video) {
    const container = document.getElementById('videoNewWords');
    const list = document.getElementById('videoNewWordsList');

    if (!container || !list) return;

    if (!video.newWords || video.newWords.length === 0) {
        container.style.display = 'none';
        return;
    }

    container.style.display = 'block';

    list.innerHTML = video.newWords.map(word => `
        <div class="video-word-item">
            <span class="video-word-text">${this.escapeHtml(word.word)}</span>
            ${word.translation ? `<span class="video-word-translation">— ${this.escapeHtml(word.translation)}</span>` : ''}
            <button class="btn btn-small btn-secondary add-video-word-btn" 
                    data-word="${this.escapeHtml(word.word)}" 
                    data-translation="${this.escapeHtml(word.translation || '')}">
                <i class="fas fa-plus"></i>
            </button>
        </div>
    `).join('');

    list.querySelectorAll('.add-video-word-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const word = btn.dataset.word;
            const translation = btn.dataset.translation;
            this.openWordModal(null, word);

            setTimeout(() => {
                const translationInput = document.getElementById('translationInput');
                if (translationInput && translation) {
                    translationInput.value = translation;
                }
            }, 100);
        });
    });
};

DictionaryApp.prototype.updateVideoActionButtons = function () {
    const vid = (this.videos || []).find(v => String(v.id) === String(this.currentVideoId));
    if (!vid) return;

    const meta = this.videosMeta[String(vid.id)] || {};
    const likeBtn = document.getElementById('videoLikeBtn');
    const dislikeBtn = document.getElementById('videoDislikeBtn');
    const favBtn = document.getElementById('videoToggleFavoriteBtn');
    const watchedBtn = document.getElementById('videoMarkWatchedBtn');

    if (likeBtn) {
        likeBtn.classList.toggle('active', !!meta.liked);
        likeBtn.innerHTML = meta.liked
            ? '<i class="fas fa-thumbs-up"></i> Нравится'
            : '<i class="far fa-thumbs-up"></i> Нравится';
    }

    if (dislikeBtn) {
        dislikeBtn.classList.toggle('active', !!meta.disliked);
        dislikeBtn.innerHTML = meta.disliked
            ? '<i class="fas fa-thumbs-down"></i>'
            : '<i class="far fa-thumbs-down"></i>';
    }

    const st = this.getVideoEffectiveStatus(vid);
    if (favBtn) {
        favBtn.innerHTML = st === 'favorite'
            ? '<i class="fas fa-bookmark"></i> В избранном'
            : '<i class="far fa-bookmark"></i> Сохранить';
        favBtn.classList.toggle('active', st === 'favorite');
    }

    if (watchedBtn) {
        watchedBtn.disabled = (st === 'watched' || st === 'favorite');
        watchedBtn.innerHTML = (st === 'watched' || st === 'favorite')
            ? '<i class="fas fa-check-circle"></i> Просмотрено'
            : '<i class="fas fa-check"></i> Просмотрено';
    }
};

DictionaryApp.prototype.toggleVideoLike = function (isLike) {
    const id = this.currentVideoId;
    if (!id) return;

    const meta = this.videosMeta[id] || (this.videosMeta[id] = {});
    if (isLike) {
        meta.liked = !meta.liked;
        if (meta.liked) meta.disliked = false;
    } else {
        meta.disliked = !meta.disliked;
        if (meta.disliked) meta.liked = false;
    }

    this.saveVideosMeta();

    const vid = (this.videos || []).find(v => String(v.id) === String(id));
    if (!vid) return;

    const likes = document.getElementById('videoLikes');
    if (likes) likes.textContent = this.formatViewsCount(this.getVideoEffectiveLikes(vid));

    this.updateVideoActionButtons();
};

DictionaryApp.prototype.toggleVideoFavorite = function () {
    const id = this.currentVideoId;
    if (!id) return;

    const vid = (this.videos || []).find(v => String(v.id) === String(id));
    if (!vid) return;

    const meta = this.videosMeta[id] || (this.videosMeta[id] = {});
    const current = this.getVideoEffectiveStatus(vid);

    meta.status = (current === 'favorite') ? 'watched' : 'favorite';
    this.saveVideosMeta();

    const pill = document.getElementById('videoStatusPill');
    if (pill) {
        const statusLabels = { new: 'Новое', watched: 'Просмотрено', favorite: 'Избранное' };
        pill.textContent = statusLabels[meta.status] || meta.status;
        pill.className = `status-badge ${meta.status === 'favorite' ? 'learned' : meta.status === 'watched' ? 'success' : 'learning'}`;
    }

    this.updateVideoActionButtons();
    this.updateVideosBadge();
    this.showToast(meta.status === 'favorite' ? 'Добавлено в избранное' : 'Убрано из избранного', 'success');
};

DictionaryApp.prototype.markVideoWatched = function () {
    const id = this.currentVideoId;
    if (!id) return;

    const vid = (this.videos || []).find(v => String(v.id) === String(id));
    if (!vid) return;

    const meta = this.videosMeta[id] || (this.videosMeta[id] = {});
    meta.status = 'watched';
    this.saveVideosMeta();

    // автостатистика: видео просмотрено сегодня
    if (typeof this.incrementDailyActivity === 'function') {
        this.incrementDailyActivity('videos', 1);
    }

    const pill = document.getElementById('videoStatusPill');
    if (pill) {
        pill.textContent = 'Просмотрено';
        pill.className = 'status-badge success';
    }

    this.updateVideoActionButtons();
    this.updateVideosBadge();
    this.showToast('Видео отмечено как просмотренное', 'success');
};

DictionaryApp.prototype.renderVideoRecommendations = function (currentVideo) {
    const box = document.getElementById('videoRecommendations');
    if (!box) return;

    const currentId = String(currentVideo.id);
    const currentLevel = String(currentVideo.level || '').toUpperCase();

    const list = (this.videos || [])
        .filter(v => String(v.id) !== currentId)
        .map(v => {
            const sameLevel = String(v.level || '').toUpperCase() === currentLevel ? 1 : 0;
            const st = this.getVideoEffectiveStatus(v);
            const notWatched = (st === 'new') ? 1 : (st === 'watched' ? 0 : 0.5);
            const pop = this.getVideoEffectiveViews(v) / 100000 + this.getVideoEffectiveLikes(v) / 10000;
            const score = sameLevel * 2 + notWatched * 1.5 + pop;
            return { v, score };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, 8)
        .map(x => x.v);

    box.innerHTML = list.map(v => {
        const views = this.formatViewsCount(this.getVideoEffectiveViews(v));

        return `
            <div class="reco-item" data-video-id="${this.escapeHtml(String(v.id))}">
                <div class="reco-thumb">
                    <img src="${this.escapeHtml(v.thumbnail || '')}" alt=""
                         onerror="this.style.display='none'">
                    <span class="reco-duration">${this.escapeHtml(v.duration || '0:00')}</span>
                </div>
                <div class="reco-info">
                    <div class="reco-title">${this.escapeHtml(v.title || '')}</div>
                    <div class="reco-meta">
                        <span>${this.escapeHtml(String(v.level || 'A1'))}</span>
                        <span>${views} просм.</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    box.querySelectorAll('.reco-item').forEach(el => {
        el.addEventListener('click', () => {
            const id = el.dataset.videoId;
            if (id) this.openVideo(id);
        });
    });
};

// ===================== PRACTICE =====================
DictionaryApp.prototype.startPractice = function () {
    const practiceLearning = document.getElementById('practiceLearning');
    const practiceLearned = document.getElementById('practiceLearned');
    const practiceCount = document.getElementById('practiceCount');

    const includeLearning = practiceLearning?.checked ?? true;
    const includeLearned = practiceLearned?.checked ?? true;
    const count = practiceCount?.value || 'all';

    let pool = this.words.filter(w => {
        if (includeLearning && w.status === 'learning') return true;
        if (includeLearned && w.status === 'learned') return true;
        return false;
    });

    if (pool.length === 0) {
        this.showToast('Нет слов для повторения', 'error');
        return;
    }

    this.practiceWords = this.shuffleArray([...pool]);
    if (count !== 'all') this.practiceWords = this.practiceWords.slice(0, parseInt(count, 10));

    this.practiceIndex = 0;
    this.practiceCorrect = 0;
    this.practiceWrong = 0;

    const practiceSetup = document.getElementById('practiceSetup');
    const practiceCardContainer = document.getElementById('practiceCardContainer');
    const practiceResults = document.getElementById('practiceResults');

    if (practiceSetup) practiceSetup.style.display = 'none';
    if (practiceCardContainer) practiceCardContainer.style.display = 'block';
    if (practiceResults) practiceResults.style.display = 'none';

    this.showPracticeCard();
};

DictionaryApp.prototype.showPracticeCard = function () {
    if (this.practiceIndex >= this.practiceWords.length) {
        this.showPracticeResults();
        return;
    }

    const word = this.practiceWords[this.practiceIndex];
    const cardFront = document.getElementById('cardFront');
    const cardBack = document.getElementById('cardBack');
    const practiceProgress = document.getElementById('practiceProgress');
    const progressFill = document.getElementById('progressFill');

    if (practiceProgress) practiceProgress.textContent = `${this.practiceIndex + 1} / ${this.practiceWords.length}`;

    const progress = ((this.practiceIndex) / this.practiceWords.length) * 100;
    if (progressFill) progressFill.style.width = `${progress}%`;

    if (cardFront && cardBack) {
        if (this.practiceMode === 'word') {
            cardFront.innerHTML = `<h2 class="practice-word">${this.escapeHtml(word.word)}</h2>`;
            cardBack.innerHTML = `
                <h2 class="answer-word">${this.escapeHtml(word.word)}</h2>
                ${word.translation ? `<p class="answer-translation">${this.escapeHtml(word.translation)}</p>` : ''}
                <div class="answer-image">
                    <img src="${word.image}" alt="${word.word}">
                </div>
                ${this.renderExamplesForPractice(word.examples)}
            `;
        } else {
            cardFront.innerHTML = `
                <div class="practice-image">
                    <img src="${word.image}" alt="?">
                </div>
            `;
            cardBack.innerHTML = `
                <h2 class="answer-word">${this.escapeHtml(word.word)}</h2>
                ${word.translation ? `<p class="answer-translation">${this.escapeHtml(word.translation)}</p>` : ''}
                ${this.renderExamplesForPractice(word.examples)}
            `;
        }

        cardFront.style.display = 'flex';
        cardBack.style.display = 'none';
    }

    const showAnswerBtn = document.getElementById('showAnswer');
    const answerButtons = document.getElementById('answerButtons');
    if (showAnswerBtn) showAnswerBtn.style.display = 'block';
    if (answerButtons) answerButtons.style.display = 'none';
};

DictionaryApp.prototype.renderExamplesForPractice = function (examples) {
    if (!examples || examples.length === 0) return '';
    return `
        <div class="answer-examples">
            ${examples.map(ex => `
                <div class="example">
                    <p>${this.escapeHtml(ex.text)}</p>
                    ${ex.image ? `<img src="${ex.image}" alt="Example">` : ''}
                </div>
            `).join('')}
        </div>
    `;
};

DictionaryApp.prototype.showPracticeAnswer = function () {
    const cardFront = document.getElementById('cardFront');
    const cardBack = document.getElementById('cardBack');
    const showAnswerBtn = document.getElementById('showAnswer');
    const answerButtons = document.getElementById('answerButtons');

    if (cardFront) cardFront.style.display = 'none';
    if (cardBack) cardBack.style.display = 'flex';
    if (showAnswerBtn) showAnswerBtn.style.display = 'none';
    if (answerButtons) answerButtons.style.display = 'flex';
};

DictionaryApp.prototype.practiceAnswer = function (correct) {
    if (correct) this.practiceCorrect++;
    else this.practiceWrong++;

    this.practiceIndex++;
    this.showPracticeCard();
};

DictionaryApp.prototype.showPracticeResults = function () {
    const practiceCardContainer = document.getElementById('practiceCardContainer');
    const practiceResults = document.getElementById('practiceResults');

    if (practiceCardContainer) practiceCardContainer.style.display = 'none';
    if (practiceResults) practiceResults.style.display = 'flex';

    const total = this.practiceCorrect + this.practiceWrong;
    const accuracy = total > 0 ? Math.round((this.practiceCorrect / total) * 100) : 0;

    const correctCount = document.getElementById('correctCount');
    const wrongCount = document.getElementById('wrongCount');
    const accuracyPercent = document.getElementById('accuracyPercent');

    if (correctCount) correctCount.textContent = this.practiceCorrect;
    if (wrongCount) wrongCount.textContent = this.practiceWrong;
    if (accuracyPercent) accuracyPercent.textContent = `${accuracy}%`;

    this.stats.totalPractices++;
    this.stats.correctAnswers += this.practiceCorrect;
    this.stats.wrongAnswers += this.practiceWrong;
    this.saveStats();
};

DictionaryApp.prototype.resetPractice = function () {
    const practiceSetup = document.getElementById('practiceSetup');
    const practiceCardContainer = document.getElementById('practiceCardContainer');
    const practiceResults = document.getElementById('practiceResults');
    const practiceEmpty = document.getElementById('practiceEmpty');

    if (practiceSetup) practiceSetup.style.display = 'block';
    if (practiceCardContainer) practiceCardContainer.style.display = 'none';
    if (practiceResults) practiceResults.style.display = 'none';

    const hasWords = this.words.some(w => w.status === 'learning' || w.status === 'learned');
    if (practiceEmpty) practiceEmpty.style.display = hasWords ? 'none' : 'flex';
};

// ===================== GAMES =====================
DictionaryApp.prototype.updateGameSection = function () {
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
};

DictionaryApp.prototype.updateGameLock = function () {
    const totalWords = this.words.length;
    const isUnlocked = totalWords >= this.GAMES_UNLOCK_THRESHOLD;
    const badge = document.getElementById('gameLockedBadge');
    if (badge) badge.style.display = isUnlocked ? 'none' : 'inline-flex';
};

DictionaryApp.prototype.updateReadingLock = function () {
    const learnedWords = this.words.filter(w => w.status === 'learned').length;
    const isUnlocked = learnedWords >= this.READING_UNLOCK_THRESHOLD;
    const badge = document.getElementById('readingLockedBadge');
    if (badge) badge.style.display = isUnlocked ? 'none' : 'inline-flex';
};

DictionaryApp.prototype.startGame = function (game) {
    this.currentGame = game;
    this.gameScore = 0;
    this.gameTime = 0;

    const gameSetup = document.getElementById('gameSetup');
    const gameResults = document.getElementById('gameResults');
    const quizGame = document.getElementById('quizGame');
    const typingGame = document.getElementById('typingGame');
    const matchGame = document.getElementById('matchGame');

    if (gameSetup) gameSetup.style.display = 'none';
    if (gameResults) gameResults.style.display = 'none';
    if (quizGame) quizGame.style.display = 'none';
    if (typingGame) typingGame.style.display = 'none';
    if (matchGame) matchGame.style.display = 'none';

    switch (game) {
        case 'quiz': this.startQuizGame(); break;
        case 'typing': this.startTypingGame(); break;
        case 'match': this.startMatchGame(); break;
    }
};

DictionaryApp.prototype.startQuizGame = function () {
    const quizGame = document.getElementById('quizGame');
    if (quizGame) quizGame.style.display = 'block';

    this.quizWords = this.shuffleArray([...this.words]).slice(0, 10);
    this.quizIndex = 0;
    this.gameScore = 0;

    this.startGameTimer('quizTimer');
    this.showQuizQuestion();
};

DictionaryApp.prototype.showQuizQuestion = function () {
    if (this.quizIndex >= this.quizWords.length) {
        this.endGame();
        return;
    }

    const word = this.quizWords[this.quizIndex];
    const quizImage = document.getElementById('quizImage');
    const quizWord = document.getElementById('quizWord');
    const quizOptions = document.getElementById('quizOptions');
    const quizScore = document.getElementById('quizScore');

    if (quizImage) quizImage.innerHTML = `<img src="${word.image}" alt="${word.word}">`;
    if (quizWord) quizWord.textContent = word.word;

    const options = this.generateQuizOptions(word);
    if (quizOptions) {
        quizOptions.innerHTML = options.map(opt => `
            <button class="quiz-option" data-correct="${opt === (word.translation || word.word)}">
                ${this.escapeHtml(opt)}
            </button>
        `).join('');

        quizOptions.querySelectorAll('.quiz-option').forEach(btn => {
            btn.addEventListener('click', (e) => this.checkQuizAnswer(e.target));
        });
    }

    if (quizScore) quizScore.textContent = this.gameScore;
};

DictionaryApp.prototype.generateQuizOptions = function (correctWord) {
    const correct = correctWord.translation || correctWord.word;
    const options = [correct];
    const otherWords = this.words.filter(w => w.id !== correctWord.id);

    while (options.length < 4 && otherWords.length > 0) {
        const randomIndex = Math.floor(Math.random() * otherWords.length);
        const random = otherWords[randomIndex];
        const option = random.translation || random.word;
        if (!options.includes(option)) options.push(option);
        otherWords.splice(randomIndex, 1);
    }

    return this.shuffleArray(options);
};

DictionaryApp.prototype.checkQuizAnswer = function (btn) {
    const isCorrect = btn.dataset.correct === 'true';
    btn.classList.add(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) {
        this.gameScore += 10;
        const quizScore = document.getElementById('quizScore');
        if (quizScore) quizScore.textContent = this.gameScore;
    } else {
        document.querySelectorAll('.quiz-option').forEach(opt => {
            if (opt.dataset.correct === 'true') opt.classList.add('correct');
        });
    }

    document.querySelectorAll('.quiz-option').forEach(opt => { opt.disabled = true; });

    setTimeout(() => {
        this.quizIndex++;
        this.showQuizQuestion();
    }, 1500);
};

DictionaryApp.prototype.startTypingGame = function () {
    const typingGame = document.getElementById('typingGame');
    if (typingGame) typingGame.style.display = 'block';

    this.quizWords = this.shuffleArray([...this.words]).slice(0, 10);
    this.quizIndex = 0;
    this.gameScore = 0;
    this.gameLives = 3;

    this.updateLivesDisplay();
    this.showTypingQuestion();
};

DictionaryApp.prototype.showTypingQuestion = function () {
    if (this.quizIndex >= this.quizWords.length || this.gameLives === 0) {
        this.endGame();
        return;
    }

    const word = this.quizWords[this.quizIndex];
    const typingImage = document.getElementById('typingImage');
    const typingHint = document.getElementById('typingHint');
    const typingInput = document.getElementById('typingInput');
    const typingScore = document.getElementById('typingScore');

    if (typingImage) typingImage.innerHTML = `<img src="${word.image}" alt="?">`;
    if (typingHint) typingHint.textContent = word.translation || 'Напишите слово';
    if (typingInput) {
        typingInput.value = '';
        typingInput.classList.remove('correct', 'wrong');
        typingInput.focus();
    }
    if (typingScore) typingScore.textContent = this.gameScore;
};

DictionaryApp.prototype.checkTypingAnswer = function () {
    const typingInput = document.getElementById('typingInput');
    if (!typingInput) return;

    const userAnswer = typingInput.value.trim().toLowerCase();
    const correctAnswer = this.quizWords[this.quizIndex].word.toLowerCase();

    if (userAnswer === correctAnswer) {
        typingInput.classList.add('correct');
        this.gameScore += 10;
        this.showToast('Правильно!', 'success');

        setTimeout(() => {
            this.quizIndex++;
            this.showTypingQuestion();
        }, 500);
    } else {
        typingInput.classList.add('wrong');
        this.gameLives--;
        this.updateLivesDisplay();
        this.showToast(`Неправильно! Правильный ответ: ${correctAnswer}`, 'error');

        if (this.gameLives === 0) {
            setTimeout(() => this.endGame(), 1500);
        } else {
            setTimeout(() => {
                this.quizIndex++;
                this.showTypingQuestion();
            }, 1500);
        }
    }
};

DictionaryApp.prototype.updateLivesDisplay = function () {
    const typingLives = document.getElementById('typingLives');
    if (typingLives) {
        typingLives.innerHTML = Array(3).fill(0).map((_, i) =>
            i < this.gameLives
                ? '<i class="fas fa-heart"></i>'
                : '<i class="fas fa-heart lost"></i>'
        ).join('');
    }
};

DictionaryApp.prototype.startMatchGame = function () {
    const matchGame = document.getElementById('matchGame');
    if (matchGame) matchGame.style.display = 'block';

    const words = this.shuffleArray([...this.words]).slice(0, 6);
    this.matchCards = [];

    words.forEach(word => {
        this.matchCards.push({ type: 'word', value: word.word, id: word.id, matched: false, flipped: false });
        this.matchCards.push({ type: 'image', value: word.image, id: word.id, matched: false, flipped: false });
    });

    this.matchCards = this.shuffleArray(this.matchCards);
    this.matchFlipped = [];
    this.matchLocked = false;
    this.gameScore = 0;

    this.startGameTimer('matchTimer');
    this.renderMatchGrid();
};

DictionaryApp.prototype.renderMatchGrid = function () {
    const grid = document.getElementById('matchGrid');
    if (!grid) return;

    grid.innerHTML = this.matchCards.map((card, index) => {
        const content = card.type === 'word'
            ? `<span>${this.escapeHtml(card.value)}</span>`
            : `<img src="${card.value}" alt="Image">`;

        let classes = 'match-card';
        if (card.matched) classes += ' matched';
        if (card.flipped) classes += ' flipped';

        return `<div class="${classes}" data-index="${index}">${card.flipped || card.matched ? content : '<i class="fas fa-question"></i>'}</div>`;
    }).join('');

    grid.querySelectorAll('.match-card:not(.matched)').forEach(cardEl => {
        cardEl.addEventListener('click', () => {
            const index = parseInt(cardEl.dataset.index, 10);
            this.flipMatchCard(index);
        });
    });
};

DictionaryApp.prototype.flipMatchCard = function (index) {
    if (this.matchLocked) return;
    if (this.matchCards[index].matched) return;
    if (this.matchCards[index].flipped) return;
    if (this.matchFlipped.length >= 2) return;

    this.matchCards[index].flipped = true;
    this.matchFlipped.push(index);
    this.renderMatchGrid();

    if (this.matchFlipped.length === 2) this.checkMatchCards();
};

DictionaryApp.prototype.checkMatchCards = function () {
    this.matchLocked = true;
    const [index1, index2] = this.matchFlipped;
    const card1 = this.matchCards[index1];
    const card2 = this.matchCards[index2];

    if (card1.id === card2.id && card1.type !== card2.type) {
        card1.matched = true;
        card2.matched = true;
        this.gameScore += 20;

        const matchScore = document.getElementById('matchScore');
        if (matchScore) matchScore.textContent = this.gameScore;

        this.matchFlipped = [];
        this.matchLocked = false;
        this.renderMatchGrid();

        if (this.matchCards.every(c => c.matched)) {
            setTimeout(() => this.endGame(), 500);
        }
    } else {
        setTimeout(() => {
            this.matchCards[index1].flipped = false;
            this.matchCards[index2].flipped = false;
            this.matchFlipped = [];
            this.matchLocked = false;
            this.renderMatchGrid();
        }, 1000);
    }
};

DictionaryApp.prototype.startGameTimer = function (elementId) {
    this.gameTime = 0;
    clearInterval(this.gameTimer);
    this.gameTimer = setInterval(() => {
        this.gameTime++;
        const minutes = Math.floor(this.gameTime / 60);
        const seconds = this.gameTime % 60;
        const timerEl = document.getElementById(elementId);
        if (timerEl) timerEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
};

DictionaryApp.prototype.stopGameTimer = function () {
    clearInterval(this.gameTimer);
};

DictionaryApp.prototype.endGame = function () {
    this.stopGameTimer();

    const quizGame = document.getElementById('quizGame');
    const typingGame = document.getElementById('typingGame');
    const matchGame = document.getElementById('matchGame');
    const gameResults = document.getElementById('gameResults');
    const finalScore = document.getElementById('finalScore');

    if (quizGame) quizGame.style.display = 'none';
    if (typingGame) typingGame.style.display = 'none';
    if (matchGame) matchGame.style.display = 'none';
    if (gameResults) gameResults.style.display = 'flex';
    if (finalScore) finalScore.textContent = this.gameScore;
};

DictionaryApp.prototype.exitGame = function () {
    this.stopGameTimer();
    this.showGameSetup();
};

DictionaryApp.prototype.showGameSetup = function () {
    const gameSetup = document.getElementById('gameSetup');
    const quizGame = document.getElementById('quizGame');
    const typingGame = document.getElementById('typingGame');
    const matchGame = document.getElementById('matchGame');
    const gameResults = document.getElementById('gameResults');

    if (gameSetup) gameSetup.style.display = 'block';
    if (quizGame) quizGame.style.display = 'none';
    if (typingGame) typingGame.style.display = 'none';
    if (matchGame) matchGame.style.display = 'none';
    if (gameResults) gameResults.style.display = 'none';
};

// ===================== PROGRESS =====================
DictionaryApp.prototype.updateProgressSection = function () {
    const currentLevel = this.getCurrentLevel();
    const learnedCount = this.words.filter(w => w.status === 'learned').length;

    const progressLevelBadge = document.getElementById('progressLevelBadge');
    const progressLevelName = document.getElementById('progressLevelName');
    const progressLevelDesc = document.getElementById('progressLevelDesc');

    if (progressLevelBadge) progressLevelBadge.innerHTML = `<i class="fas ${currentLevel.icon}"></i>`;
    if (progressLevelName) progressLevelName.textContent = currentLevel.name;
    if (progressLevelDesc) progressLevelDesc.textContent = currentLevel.desc;

    const levelProgressFill = document.getElementById('levelProgressFill');
    const levelProgressText = document.getElementById('levelProgressText');

    const nextLevel = this.levels[this.levels.findIndex(l => l.id === currentLevel.id) + 1];
    if (nextLevel) {
        const progress = (learnedCount / nextLevel.words) * 100;
        if (levelProgressFill) levelProgressFill.style.width = `${Math.min(progress, 100)}%`;
        if (levelProgressText) levelProgressText.textContent = `${learnedCount} / ${nextLevel.words} слов до уровня ${nextLevel.name}`;
    } else {
        if (levelProgressFill) levelProgressFill.style.width = '100%';
        if (levelProgressText) levelProgressText.textContent = 'Максимальный уровень достигнут!';
    }

    const statTotal = document.getElementById('statTotal');
    const statLearning = document.getElementById('statLearning');
    const statLearned = document.getElementById('statLearned');
    const statAccuracy = document.getElementById('statAccuracy');

    if (statTotal) statTotal.textContent = this.words.length;
    if (statLearning) statLearning.textContent = this.words.filter(w => w.status === 'learning').length;
    if (statLearned) statLearned.textContent = learnedCount;

    const totalAnswers = this.stats.correctAnswers + this.stats.wrongAnswers;
    const accuracy = totalAnswers > 0 ? Math.round((this.stats.correctAnswers / totalAnswers) * 100) : 0;
    if (statAccuracy) statAccuracy.textContent = `${accuracy}%`;

    this.renderLevelsList();
    this.renderLevelSelect();
};

DictionaryApp.prototype.renderLevelsList = function () {
    const levelsList = document.getElementById('levelsList');
    if (!levelsList) return;

    const learnedCount = this.words.filter(w => w.status === 'learned').length;
    const currentLevel = this.getCurrentLevel();

    levelsList.innerHTML = this.levels.map(level => {
        const isUnlocked = learnedCount >= level.words;
        const isCurrent = level.id === currentLevel.id;

        return `
            <div class="level-item ${isUnlocked ? 'unlocked' : 'locked'} ${isCurrent ? 'current' : ''}">
                <div class="level-icon">
                    <i class="fas ${level.icon}"></i>
                </div>
                <div class="level-info">
                    <span class="level-name">${level.name}</span>
                    <span class="level-req">${level.desc}</span>
                </div>
                ${isCurrent ? '<i class="fas fa-check level-check"></i>' : ''}
                ${!isUnlocked ? '<i class="fas fa-lock"></i>' : ''}
            </div>
        `;
    }).join('');
};

DictionaryApp.prototype.renderLevelSelect = function () {
    const select = document.getElementById('manualLevelSelect');
    if (!select) return;

    select.innerHTML = `
        <option value="auto">Автоматически (по количеству слов)</option>
        ${this.levels.map(level => `
            <option value="${level.id}" ${this.settings.manualLevel === level.id ? 'selected' : ''}>
                ${level.name} - ${level.desc}
            </option>
        `).join('')}
    `;
};

DictionaryApp.prototype.getCurrentLevel = function () {
    if (this.settings.manualLevel && this.settings.manualLevel !== 'auto') {
        return this.levels.find(l => l.id === this.settings.manualLevel) || this.levels[0];
    }

    const learnedCount = this.words.filter(w => w.status === 'learned').length;
    for (let i = this.levels.length - 1; i >= 0; i--) {
        if (learnedCount >= this.levels[i].words) return this.levels[i];
    }
    return this.levels[0];
};

// ===================== SETTINGS =====================
DictionaryApp.prototype.updateSettingsSection = function () {
    const autoBackupToggle = document.getElementById('autoBackupToggle');
    if (autoBackupToggle) autoBackupToggle.checked = this.settings.autoBackup;

    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === this.settings.theme);
    });

    this.updateLastBackupDisplay();
    this.updateStorageUsed();
};

DictionaryApp.prototype.updateLastBackupDisplay = function () {
    const elem = document.getElementById('lastBackupDate');
    if (!elem) return;

    if (this.stats.lastBackup) {
        const date = new Date(this.stats.lastBackup);
        elem.textContent = date.toLocaleDateString('ru-RU') + ' ' + date.toLocaleTimeString('ru-RU');
    } else {
        elem.textContent = 'Никогда';
    }
};

DictionaryApp.prototype.updateStorageUsed = function () {
    const elem = document.getElementById('storageUsed');
    if (!elem) return;

    const data = JSON.stringify({
        words: this.words,
        settings: this.settings,
        stats: this.stats,
        readTexts: this.readTexts,
        videosMeta: this.videosMeta,
        currentGoal: this.currentGoal,
        goalHistory: this.goalHistory
    });
    const bytes = new Blob([data]).size;
    const kb = (bytes / 1024).toFixed(2);
    elem.textContent = `${kb} KB`;
};

DictionaryApp.prototype.setTheme = function (theme) {
    this.settings.theme = theme;
    this.saveSettings();
    this.applyTheme();

    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.theme === theme);
    });
};

DictionaryApp.prototype.applyTheme = function () {
    document.documentElement.setAttribute('data-theme', this.settings.theme);
};

DictionaryApp.prototype.exportData = function () {
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
};

DictionaryApp.prototype.importData = function (event) {
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

            this.saveWords();
            this.saveSettings();
            this.saveStats();
            this.saveReadTexts();
            this.saveVideosMeta();
            this.saveGoalData();

            this.applyTheme();
            this.renderCurrentSection();
            this.updateAllStats();
            this.updateGoalBadge();

            this.showToast('Данные успешно импортированы', 'success');
        } catch (error) {
            this.showToast('Ошибка при импорте данных', 'error');
            console.error(error);
        }
    };
    reader.readAsText(file);

    event.target.value = '';
};

DictionaryApp.prototype.clearAllData = function () {
    this.stopAudio();
    this.stopVideoPlayback();

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

    // ВАЖНО: dailyActivity тоже удалится, потому что localStorage.clear()
    localStorage.clear();

    this.applyTheme();
    this.closeModal('clearModal');
    this.renderCurrentSection();
    this.updateAllStats();
    this.updateGoalBadge();

    this.showToast('Все данные удалены', 'success');
};

// ===================== UTILITIES =====================
DictionaryApp.prototype.updateAllStats = function () {
    const totalWords = this.words.length;
    const learningWords = this.words.filter(w => w.status === 'learning').length;
    const learnedWords = this.words.filter(w => w.status === 'learned').length;

    const navTotalBadge = document.getElementById('navTotalBadge');
    const navLearningBadge = document.getElementById('navLearningBadge');
    const navLearnedBadge = document.getElementById('navLearnedBadge');

    if (navTotalBadge) navTotalBadge.textContent = totalWords;
    if (navLearningBadge) navLearningBadge.textContent = learningWords;
    if (navLearnedBadge) navLearnedBadge.textContent = learnedWords;

    this.updateSidebarLevel();
    this.updateVideosBadge();
};

DictionaryApp.prototype.updateSidebarLevel = function () {
    const level = this.getCurrentLevel();
    const userLevelTitle = document.getElementById('userLevelTitle');
    const userLevelWords = document.getElementById('userLevelWords');

    if (userLevelTitle) userLevelTitle.textContent = level.name;
    if (userLevelWords) userLevelWords.textContent = `${this.words.filter(w => w.status === 'learned').length} слов`;
};

DictionaryApp.prototype.previewImage = function (url, container) {
    if (!url || !container) {
        if (container) {
            container.innerHTML = '';
            container.classList.remove('has-image');
        }
        return;
    }

    const img = new Image();
    img.onload = () => {
        container.innerHTML = `<img src="${url}" alt="Preview">`;
        container.classList.add('has-image');
    };
    img.onerror = () => {
        container.innerHTML = '<p class="error-text">Не удалось загрузить изображение</p>';
        container.classList.add('has-image', 'error');
    };
    img.src = url;
};

DictionaryApp.prototype.speak = function (text) {
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        speechSynthesis.speak(utterance);
    }
};

DictionaryApp.prototype.shuffleArray = function (array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

DictionaryApp.prototype.escapeHtml = function (text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
};

DictionaryApp.prototype.openModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
};

DictionaryApp.prototype.closeModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

DictionaryApp.prototype.showToast = function (message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;

    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };

    toast.innerHTML = `
        <i class="toast-icon fas ${icons[type]}"></i>
        <span class="toast-message">${this.escapeHtml(message)}</span>
        <button class="toast-close"><i class="fas fa-times"></i></button>
    `;

    container.appendChild(toast);

    toast.querySelector('.toast-close')?.addEventListener('click', () => {
        toast.classList.add('hiding');
        setTimeout(() => toast.remove(), 300);
    });

    setTimeout(() => {
        toast.classList.add('hiding');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};