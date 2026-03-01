const EditorState = {
    pattern: 'wedding6.webp',
    bgOpacity: 0.8,
    borderColor: '#D4AF37',
    borderWidth: 2,
    borderRadius: 30,
    borderGlowEnabled: false,
    borderGlowColor: '#D4AF37',
    borderGlowSize: 10,
    borderGlowIntensity: 0.5,
    containerBgColor: '#FFFFFF',
    containerBgOpacity: 0.95,
    eventType: 'Свадебное приглашение',
    eventTypeSize: 16,
    eventTypeBold: false,
    eventTypeItalic: false,
    eventTypeFont: "'Playfair Display', serif",
    names: 'Александр & Елена',
    namesSize: 48,
    namesBold: false,
    namesItalic: false,
    namesFont: "'Great Vibes', cursive",
    greeting: 'приглашают вас разделить с ними радость',
    greetingSize: 18,
    greetingBold: false,
    greetingItalic: true,
    greetingFont: "'Playfair Display', serif",
    dateText: '15 июня 2026',
    dateSize: 18,
    dateBold: false,
    dateItalic: false,
    dateFont: "'Playfair Display', serif",
    timeText: 'в 16:00',
    timeSize: 18,
    timeBold: false,
    timeItalic: false,
    timeFont: "'Playfair Display', serif",
    placeText: 'ЗАГС, г. Москва',
    placeSize: 18,
    placeBold: true,
    placeItalic: false,
    placeFont: "'Playfair Display', serif",
    messageText: 'Программа:\n1. Сбор гостей - 15:00\n2. Церемония - 16:00\n3. Фуршет - 17:00\n4. Танцы - 18:00',
    messageSize: 16,
    messageBold: false,
    messageItalic: false,
    messageFont: "'Inter', sans-serif",
    textColor: '#475569',
    showDecorLines: true,
    enablePerLineDecor: false,
    enableAnimations: false,
    animationType: 'balloons',
    animationIntensity: 5,
    animationSpeed: 3,
    animationColors: ['#FF69B4', '#FFD700', '#87CEEB', '#98FB98', '#FFA07A', '#DDA0DD'],
    animationSize: 30,
    animationPosition: 'whole',
    decorations: [],
    activeDecorId: null,
    clipDecorations: true
};

const PAYMENT_AMOUNT = 299; // рублей

const patterns = [
    { id: 'wedding-1', file: 'wedding1.webp', category: 'wedding', name: '1' },
    { id: 'wedding-2', file: 'wedding2.webp', category: 'wedding', name: '2' },
    { id: 'wedding-3', file: 'wedding3.webp', category: 'wedding', name: '3' },
    { id: 'wedding-4', file: 'wedding4.webp', category: 'wedding', name: '4' },
    { id: 'wedding-5', file: 'wedding5.webp', category: 'wedding', name: '5' },
    { id: 'wedding-6', file: 'wedding6.webp', category: 'wedding', name: '6' },
    { id: 'wedding-7', file: 'wedding7.webp', category: 'wedding', name: '7' },
    { id: 'wedding-8', file: 'wedding8.webp', category: 'wedding', name: '8' },
    { id: 'wedding-9', file: 'wedding9.webp', category: 'wedding', name: '9' },
    { id: 'wedding-10', file: 'wedding10.webp', category: 'wedding', name: '10' },
    { id: 'wedding-11', file: 'wedding11.webp', category: 'wedding', name: '11' },
    { id: 'wedding-12', file: 'wedding12.webp', category: 'wedding', name: '12' },
    { id: 'wedding-13', file: 'wedding13.webp', category: 'wedding', name: '13' },
    { id: 'wedding-14', file: 'wedding14.webp', category: 'wedding', name: '14' },
    { id: 'wedding-15', file: 'wedding15.webp', category: 'wedding', name: '15' },
    { id: 'wedding-16', file: 'wedding16.webp', category: 'wedding', name: '16' },
    { id: 'wedding-17', file: 'wedding17.webp', category: 'wedding', name: '17' },
    { id: 'wedding-18', file: 'wedding18.webp', category: 'wedding', name: '18' },
    { id: 'wedding-19', file: 'wedding19.webp', category: 'wedding', name: '19' },
    { id: 'wedding-20', file: 'wedding20.webp', category: 'wedding', name: '20' },
    { id: 'wedding-21', file: 'wedding21.webp', category: 'wedding', name: '21' },
    { id: 'wedding-22', file: 'wedding22.webp', category: 'wedding', name: '22' },
    { id: 'wedding-23', file: 'wedding23.webp', category: 'wedding', name: '23' },
    { id: 'wedding-24', file: 'wedding24.webp', category: 'wedding', name: '24' },
    { id: 'wedding-25', file: 'wedding25.webp', category: 'wedding', name: '25' },
    { id: 'wedding-26', file: 'wedding26.webp', category: 'wedding', name: '26' },
    { id: 'wedding-27', file: 'wedding27.webp', category: 'wedding', name: '27' },
    { id: 'wedding-28', file: 'wedding28.webp', category: 'wedding', name: '28' },
    { id: 'wedding-32', file: 'wedding32.webp', category: 'wedding', name: '32' },
    { id: 'birthday-1', file: 'birthday1.webp', category: 'birthday', name: '1' },
    { id: 'birthday-2', file: 'birthday2.webp', category: 'birthday', name: '2' },
    { id: 'birthday-3', file: 'birthday3.webp', category: 'birthday', name: '3' },
    { id: 'birthday-4', file: 'birthday4.webp', category: 'birthday', name: '4' },
    { id: 'birthday-5', file: 'birthday5.webp', category: 'birthday', name: '5' },
    { id: 'birthday-6', file: 'birthday6.webp', category: 'birthday', name: '6' },
    { id: 'birthday-7', file: 'birthday7.webp', category: 'birthday', name: '7' },
    { id: 'birthday-8', file: 'birthday8.webp', category: 'birthday', name: '8' },
    { id: 'birthday-9', file: 'birthday9.webp', category: 'birthday', name: '9' },
    { id: 'birthday-10', file: 'birthday10.webp', category: 'birthday', name: '10' },
    { id: 'birthday-11', file: 'birthday11.webp', category: 'birthday', name: '11' },
    { id: 'birthday-12', file: 'birthday12.webp', category: 'birthday', name: '12' },
    { id: 'birthday-13', file: 'birthday13.webp', category: 'birthday', name: '13' },
    { id: 'birthday-14', file: 'birthday14.webp', category: 'birthday', name: '14' },
    { id: 'birthday-15', file: 'birthday15.webp', category: 'birthday', name: '15' },
    { id: 'other-1', file: 'other1.webp', category: 'other', name: '1' },
    { id: 'other-2', file: 'other2.webp', category: 'other', name: '2' },
    { id: 'other-3', file: 'other3.webp', category: 'other', name: '3' },
    { id: 'other-4', file: 'other4.webp', category: 'other', name: '4' },
    { id: 'other-5', file: 'other5.webp', category: 'other', name: '5' },
    { id: 'other-6', file: 'other6.webp', category: 'other', name: '6' },
    { id: 'other-7', file: 'other7.webp', category: 'other', name: '7' },
    { id: 'other-8', file: 'other8.webp', category: 'other', name: '8' },
    { id: 'other-9', file: 'other9.webp', category: 'other', name: '9' },
    { id: 'other-10', file: 'other10.webp', category: 'other', name: '10' },
    { id: 'other-11', file: 'other11.webp', category: 'other', name: '11' },
    { id: 'other-13', file: 'other13.webp', category: 'other', name: '13' },
    { id: 'other-14', file: 'other14.webp', category: 'other', name: '14' },
    { id: 'other-15', file: 'other15.webp', category: 'other', name: '15' },
];

const fonts = [
    { value: "'Playfair Display', serif", name: "Playfair Display" },
    { value: "'Great Vibes', cursive", name: "Great Vibes" },
    { value: "'Dancing Script', cursive", name: "Dancing Script" },
    { value: "'Cormorant Garamond', serif", name: "Cormorant Garamond" },
    { value: "'Montserrat', sans-serif", name: "Montserrat" },
    { value: "'Lora', serif", name: "Lora" },
    { value: "'Inter', sans-serif", name: "Inter" },
    { value: "'Pacifico', cursive", name: "Pacifico" },
    { value: "'Amatic SC', cursive", name: "Amatic SC" },
    { value: "'Parisienne', cursive", name: "Parisienne" },
    { value: "'Press Start 2P', cursive", name: "Press Start 2P" },
    { value: "'VT323', monospace", name: "VT323" },
    { value: "'Courier Prime', monospace", name: "Courier Prime" },
    { value: "'Caveat', cursive", name: "Caveat" },
    { value: "'Comfortaa', sans-serif", name: "Comfortaa" }
];

let isMobileView = window.innerWidth <= 768;
let activeTab = 'settings';
let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', () => {
    initPatternFilters();
    initPatternGrid();
    initEventListeners();
    initMobileTabs();
    initColorPresets();
    initAccordion();
    initFontSelectors();
    initBoldItalicButtons();
    initAnimationControls();
    updatePreview();
    updateAllText();
    setInitialFonts();

    // Проверяем соединение с бэкендом
    setTimeout(() => {
        if (window.checkBackendHealth) {
            window.checkBackendHealth();
        }
        checkPendingPayment();
    }, 500);

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            isMobileView = window.innerWidth <= 768;
            applyMobileScale();
            fixMobileTabsPosition();
            fixBackgroundScroll();
        }, 100);
    });

    applyMobileScale();
    fixMobileTabsPosition();
    fixBackgroundScroll();

    setTimeout(() => {
        if (window.decorationsAPI) {
            window.decorationsAPI.initDecorations();
        }
    }, 300);

    setTimeout(observeCardResize, 500);
});

// ==================== ФУНКЦИИ ДЛЯ РАБОТЫ С ЮKASSA ====================

// Функция создания платежа
async function createPayment(slug) {
    try {
        const response = await fetch(API_CONFIG.getUrl(API_CONFIG.endpoints.createPayment), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                slug: slug,
                amount: PAYMENT_AMOUNT
            })
        });

        const data = await response.json();
        
        if (data.success && data.confirmation_url) {
            // Сохраняем данные приглашения в localStorage
            localStorage.setItem('pendingInvitation', JSON.stringify({
                slug: slug,
                data: getInvitationData()
            }));
            
            // Перенаправляем на оплату
            window.location.href = data.confirmation_url;
        } else {
            throw new Error(data.error || 'Не удалось создать платеж');
        }
    } catch (error) {
        console.error('Payment error:', error);
        showUserNotification(
            'Не удалось создать платеж. Попробуйте позже или напишите в поддержку',
            'error'
        );
    }
}

// Функция для сбора всех данных приглашения
function getInvitationData() {
    return {
        pattern: EditorState.pattern,
        bgOpacity: EditorState.bgOpacity,
        borderColor: EditorState.borderColor,
        borderWidth: EditorState.borderWidth,
        borderRadius: EditorState.borderRadius,
        borderGlowEnabled: EditorState.borderGlowEnabled,
        borderGlowColor: EditorState.borderGlowColor,
        borderGlowSize: EditorState.borderGlowSize,
        borderGlowIntensity: EditorState.borderGlowIntensity,
        containerBgColor: EditorState.containerBgColor,
        containerBgOpacity: EditorState.containerBgOpacity,
        eventType: EditorState.eventType,
        eventTypeSize: EditorState.eventTypeSize,
        eventTypeBold: EditorState.eventTypeBold,
        eventTypeItalic: EditorState.eventTypeItalic,
        eventTypeFont: EditorState.eventTypeFont,
        names: EditorState.names,
        namesSize: EditorState.namesSize,
        namesBold: EditorState.namesBold,
        namesItalic: EditorState.namesItalic,
        namesFont: EditorState.namesFont,
        greeting: EditorState.greeting,
        greetingSize: EditorState.greetingSize,
        greetingBold: EditorState.greetingBold,
        greetingItalic: EditorState.greetingItalic,
        greetingFont: EditorState.greetingFont,
        dateText: EditorState.dateText,
        dateSize: EditorState.dateSize,
        dateBold: EditorState.dateBold,
        dateItalic: EditorState.dateItalic,
        dateFont: EditorState.dateFont,
        timeText: EditorState.timeText,
        timeSize: EditorState.timeSize,
        timeBold: EditorState.timeBold,
        timeItalic: EditorState.timeItalic,
        timeFont: EditorState.timeFont,
        placeText: EditorState.placeText,
        placeSize: EditorState.placeSize,
        placeBold: EditorState.placeBold,
        placeItalic: EditorState.placeItalic,
        placeFont: EditorState.placeFont,
        messageText: EditorState.messageText,
        messageSize: EditorState.messageSize,
        messageBold: EditorState.messageBold,
        messageItalic: EditorState.messageItalic,
        messageFont: EditorState.messageFont,
        textColor: EditorState.textColor,
        showDecorLines: EditorState.showDecorLines,
        enablePerLineDecor: EditorState.enablePerLineDecor,
        enableAnimations: EditorState.enableAnimations,
        animationType: EditorState.animationType,
        animationIntensity: EditorState.animationIntensity,
        animationSpeed: EditorState.animationSpeed,
        animationColors: EditorState.animationColors,
        animationSize: EditorState.animationSize,
        animationPosition: EditorState.animationPosition,
        decorations: EditorState.decorations.map(d => ({
            id: d.id,
            file: d.file,
            name: d.name,
            width: d.width,
            rotation: d.rotation,
            posX: d.posX,
            posY: d.posY,
            opacity: d.opacity,
            aboveText: d.aboveText,
        })),
        clipDecorations: EditorState.clipDecorations
    };
}

// Проверка незавершенных платежей при загрузке
async function checkPendingPayment() {
    const pending = localStorage.getItem('pendingInvitation');
    if (pending) {
        const { slug, data } = JSON.parse(pending);
        
        // Спрашиваем пользователя
        if (confirm('У вас есть незавершенное приглашение. Восстановить?')) {
            // Восстанавливаем данные в редактор
            Object.assign(EditorState, data);
            updatePreview();
            document.getElementById('customSlug').value = slug;
            
            // Обновляем все поля ввода
            updateAllInputs();
            
            // Обновляем декорации
            if (window.decorationsAPI && data.decorations) {
                setTimeout(() => {
                    window.decorationsAPI.renderDecorList();
                    window.decorationsAPI.updatePreviewDecorations();
                }, 100);
            }
            
            // Очищаем localStorage
            localStorage.removeItem('pendingInvitation');
            
            showUserNotification('Данные восстановлены. Оплатите приглашение для сохранения', 'info');
        } else {
            localStorage.removeItem('pendingInvitation');
        }
    }
}

// Функция для обновления всех полей ввода после восстановления
function updateAllInputs() {
    // Обновляем текстовые поля
    const textInputs = {
        'eventType': EditorState.eventType,
        'names': EditorState.names,
        'greeting': EditorState.greeting,
        'dateText': EditorState.dateText,
        'timeText': EditorState.timeText,
        'placeText': EditorState.placeText,
        'messageText': EditorState.messageText
    };
    
    Object.entries(textInputs).forEach(([id, value]) => {
        const el = document.getElementById(id);
        if (el) el.value = value;
    });
    
    // Обновляем color inputs
    const colorInputs = {
        'borderColor': EditorState.borderColor,
        'borderGlowColor': EditorState.borderGlowColor,
        'containerBgColor': EditorState.containerBgColor,
        'textColor': EditorState.textColor
    };
    
    Object.entries(colorInputs).forEach(([id, value]) => {
        const el = document.getElementById(id);
        if (el) el.value = value;
    });
    
    // Обновляем range'ы
    const ranges = [
        'bgOpacity', 'borderWidth', 'borderRadius', 'borderGlowSize', 
        'borderGlowIntensity', 'containerBgOpacity', 'eventTypeSize', 
        'namesSize', 'greetingSize', 'dateSize', 'timeSize', 'placeSize', 
        'messageSize', 'animationIntensity', 'animationSpeed', 'animationSize'
    ];
    
    ranges.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.value = EditorState[id];
            const valueEl = document.getElementById(`${id}Value`);
            if (valueEl) valueEl.textContent = EditorState[id];
        }
    });
    
    // Обновляем чекбоксы
    const checkboxes = [
        'borderGlowEnabled', 'enableAnimations', 'showDecorLines', 
        'enablePerLineDecor', 'eventTypeBold', 'eventTypeItalic',
        'namesBold', 'namesItalic', 'greetingBold', 'greetingItalic',
        'dateBold', 'dateItalic', 'timeBold', 'timeItalic',
        'placeBold', 'placeItalic', 'messageBold', 'messageItalic'
    ];
    
    checkboxes.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.checked = EditorState[id];
    });
    
    // Обновляем селекты
    const selects = [
        'eventTypeFont', 'namesFont', 'greetingFont', 'dateFont',
        'timeFont', 'placeFont', 'messageFont', 'animationType',
        'animationPosition'
    ];
    
    selects.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = EditorState[id];
    });
}

// ==================== СУЩЕСТВУЮЩИЕ ФУНКЦИИ (БЕЗ ИЗМЕНЕНИЙ) ====================

function observeCardResize() {
    const card = document.getElementById('previewCard');
    if (!card) return;

    const resizeObserver = new ResizeObserver(() => {
        if (window.decorationsAPI) {
            window.decorationsAPI.updatePreviewDecorations();
        }
    });

    resizeObserver.observe(card);
}

function fixBackgroundScroll() {
    const previewContainer = document.getElementById('previewContainer');
    const bgLayer = document.getElementById('previewBgLayer');
    if (previewContainer && bgLayer && isMobileView) {
        previewContainer.removeEventListener('scroll', handleBgScroll);
        previewContainer.addEventListener('scroll', handleBgScroll);
    }
}

function handleBgScroll(e) {
    const bgLayer = document.getElementById('previewBgLayer');
    if (bgLayer) bgLayer.style.transform = `translateY(${e.target.scrollTop}px)`;
}

function fixMobileTabsPosition() {
    const navbar = document.querySelector('.navbar');
    const mobileTabs = document.getElementById('mobileTabs');
    if (navbar && mobileTabs && isMobileView) {
        mobileTabs.style.top = navbar.offsetHeight + 'px';
    }
}

function applyMobileScale() {
    const cards = document.querySelectorAll('.invitation-card');
    if (isMobileView) {
        cards.forEach(card => {
            card.style.transform = 'scale(0.7)';
            card.style.transformOrigin = 'center top';
            card.style.margin = '20px auto';
        });
    } else {
        cards.forEach(card => card.style.transform = 'none');
    }
}

function initFontSelectors() {
    document.querySelectorAll('.font-select').forEach(select => {
        select.innerHTML = fonts.map(f =>
            `<option value="${f.value}" style="font-family: ${f.value}">${f.name}</option>`
        ).join('');
    });
}

function setInitialFonts() {
    const fontMap = {
        eventTypeFont: 'eventTypeFont',
        namesFont: 'namesFont',
        greetingFont: 'greetingFont',
        dateFont: 'dateFont',
        timeFont: 'timeFont',
        placeFont: 'placeFont',
        messageFont: 'messageFont'
    };
    Object.entries(fontMap).forEach(([id, state]) => {
        const el = document.getElementById(id);
        if (el) el.value = EditorState[state];
    });
}

function initBoldItalicButtons() {
    const setupButton = (buttonId, stateProperty, elementId, styleType) => {
        const btn = document.getElementById(buttonId);
        if (!btn) return;

        if (EditorState[stateProperty]) btn.classList.add('active');

        btn.addEventListener('click', () => {
            EditorState[stateProperty] = !EditorState[stateProperty];
            btn.classList.toggle('active');

            const element = document.getElementById(elementId);
            if (element) {
                if (styleType === 'bold') element.style.fontWeight = EditorState[stateProperty] ? 'bold' : 'normal';
                else if (styleType === 'italic') element.style.fontStyle = EditorState[stateProperty] ? 'italic' : 'normal';
            }
        });
    };

    setupButton('eventTypeBold', 'eventTypeBold', 'previewEventType', 'bold');
    setupButton('eventTypeItalic', 'eventTypeItalic', 'previewEventType', 'italic');
    setupButton('namesBold', 'namesBold', 'previewNames', 'bold');
    setupButton('namesItalic', 'namesItalic', 'previewNames', 'italic');
    setupButton('greetingBold', 'greetingBold', 'previewGreeting', 'bold');
    setupButton('greetingItalic', 'greetingItalic', 'previewGreeting', 'italic');
    setupButton('dateBold', 'dateBold', 'previewDate', 'bold');
    setupButton('dateItalic', 'dateItalic', 'previewDate', 'italic');
    setupButton('timeBold', 'timeBold', 'previewTime', 'bold');
    setupButton('timeItalic', 'timeItalic', 'previewTime', 'italic');
    setupButton('placeBold', 'placeBold', 'previewPlace', 'bold');
    setupButton('placeItalic', 'placeItalic', 'previewPlace', 'italic');
    setupButton('messageBold', 'messageBold', 'previewMessage', 'bold');
    setupButton('messageItalic', 'messageItalic', 'previewMessage', 'italic');
}

function initPatternFilters() {
    const filterContainer = document.querySelector('.pattern-filters');
    if (!filterContainer) return;

    filterContainer.innerHTML = `
        <button class="filter-btn active" data-filter="all">Все</button>
        <button class="filter-btn" data-filter="wedding">Свадьба</button>
        <button class="filter-btn" data-filter="birthday">День рождения</button>
        <button class="filter-btn" data-filter="other">Другое</button>
    `;

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderPatternGrid();
        });
    });
}

function renderPatternGrid() {
    const grid = document.getElementById('patternGrid');
    if (!grid) return;

    const filtered = currentFilter === 'all' ? patterns : patterns.filter(p => p.category === currentFilter);

    grid.innerHTML = filtered.map(p => `
        <div class="pattern-item ${p.file === EditorState.pattern ? 'selected' : ''}" 
             data-pattern="${p.file}"
             data-category="${p.category}"
             title="${p.name}"
             style="background-image: url('/images/patterns/${p.file}')">
        </div>
    `).join('');

    grid.querySelectorAll('.pattern-item').forEach(item => {
        item.addEventListener('click', () => {
            grid.querySelectorAll('.pattern-item').forEach(i => i.classList.remove('selected'));
            item.classList.add('selected');
            EditorState.pattern = item.dataset.pattern;
            updatePreview();
        });
    });
}

function initPatternGrid() {
    renderPatternGrid();
}

function initAccordion() {
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.closest('.accordion-item');
            const wasActive = item.classList.contains('active');
            const icon = header.querySelector('.material-symbols-outlined');

            document.querySelectorAll('.accordion-item.active').forEach(activeItem => {
                if (activeItem !== item) {
                    activeItem.classList.remove('active');
                    const prevIcon = activeItem.querySelector('.material-symbols-outlined');
                    if (prevIcon) prevIcon.textContent = 'expand_more';
                }
            });

            item.classList.toggle('active');
            if (icon) icon.textContent = item.classList.contains('active') ? 'expand_less' : 'expand_more';
        });
    });
}

function initAnimationControls() {
    const enableAnimations = document.getElementById('enableAnimations');
    if (enableAnimations) {
        enableAnimations.checked = EditorState.enableAnimations;

        enableAnimations.addEventListener('change', (e) => {
            EditorState.enableAnimations = e.target.checked;
            if (EditorState.enableAnimations && window.animationManager) {
                window.animationManager.start(getAnimationConfig());
            } else if (window.animationManager) {
                window.animationManager.stop();
            }
        });
    }

    const animationType = document.getElementById('animationType');
    if (animationType) {
        animationType.value = EditorState.animationType;
        animationType.addEventListener('change', (e) => {
            EditorState.animationType = e.target.value;
            if (EditorState.enableAnimations && window.animationManager) {
                window.animationManager.start(getAnimationConfig());
            }
        });
    }

    const intensity = document.getElementById('animationIntensity');
    if (intensity) {
        intensity.value = EditorState.animationIntensity;
        document.getElementById('animationIntensityValue').textContent = EditorState.animationIntensity;
        intensity.addEventListener('input', (e) => {
            EditorState.animationIntensity = parseInt(e.target.value);
            document.getElementById('animationIntensityValue').textContent = EditorState.animationIntensity;
            if (EditorState.enableAnimations && window.animationManager) {
                window.animationManager.start(getAnimationConfig());
            }
        });
    }

    const speed = document.getElementById('animationSpeed');
    if (speed) {
        speed.value = EditorState.animationSpeed;
        document.getElementById('animationSpeedValue').textContent = EditorState.animationSpeed;
        speed.addEventListener('input', (e) => {
            EditorState.animationSpeed = parseInt(e.target.value);
            document.getElementById('animationSpeedValue').textContent = EditorState.animationSpeed;
            if (EditorState.enableAnimations && window.animationManager) {
                window.animationManager.start(getAnimationConfig());
            }
        });
    }

    const size = document.getElementById('animationSize');
    if (size) {
        size.value = EditorState.animationSize;
        document.getElementById('animationSizeValue').textContent = EditorState.animationSize;
        size.addEventListener('input', (e) => {
            EditorState.animationSize = parseInt(e.target.value);
            document.getElementById('animationSizeValue').textContent = EditorState.animationSize;
            if (EditorState.enableAnimations && window.animationManager) {
                window.animationManager.start(getAnimationConfig());
            }
        });
    }

    const position = document.getElementById('animationPosition');
    if (position) {
        position.value = EditorState.animationPosition;
        position.addEventListener('change', (e) => {
            EditorState.animationPosition = e.target.value;
            if (EditorState.enableAnimations && window.animationManager) {
                window.animationManager.start(getAnimationConfig());
            }
        });
    }

    document.querySelectorAll('.color-checkbox').forEach(checkbox => {
        checkbox.checked = EditorState.animationColors.includes(checkbox.dataset.color);
        checkbox.addEventListener('change', updateAnimationColors);
    });

    document.getElementById('previewAnimationBtn')?.addEventListener('click', () => {
        if (window.animationManager) {
            const config = getAnimationConfig();
            config.enabled = true;
            window.animationManager.start(config);
            setTimeout(() => window.animationManager.stop(), 5000);
        } else {
            alert('Ошибка: менеджер анимаций не загружен');
        }
    });
}

function updateAnimationColors() {
    const colors = [];
    document.querySelectorAll('.color-checkbox:checked').forEach(cb => colors.push(cb.dataset.color));
    EditorState.animationColors = colors.length > 0 ? colors : ['#FF69B4'];
    if (EditorState.enableAnimations && window.animationManager) {
        window.animationManager.start(getAnimationConfig());
    }
}

function getAnimationConfig() {
    return {
        enabled: EditorState.enableAnimations,
        type: EditorState.animationType,
        intensity: EditorState.animationIntensity,
        speed: EditorState.animationSpeed,
        colors: EditorState.animationColors,
        size: EditorState.animationSize,
        position: EditorState.animationPosition
    };
}

function initEventListeners() {
    const bgOpacity = document.getElementById('bgOpacity');
    if (bgOpacity) {
        bgOpacity.value = EditorState.bgOpacity;
        const bgOpacityValue = document.getElementById('bgOpacityValue');
        if (bgOpacityValue) bgOpacityValue.textContent = EditorState.bgOpacity.toFixed(2);
        bgOpacity.addEventListener('input', (e) => {
            EditorState.bgOpacity = parseFloat(e.target.value);
            if (bgOpacityValue) bgOpacityValue.textContent = EditorState.bgOpacity.toFixed(2);
            updatePreview();
        });
    }

    const borderColor = document.getElementById('borderColor');
    if (borderColor) {
        borderColor.value = EditorState.borderColor;
        borderColor.addEventListener('input', (e) => {
            EditorState.borderColor = e.target.value;
            updatePreview();
        });
    }

    const borderWidth = document.getElementById('borderWidth');
    if (borderWidth) {
        borderWidth.value = EditorState.borderWidth;
        const borderWidthValue = document.getElementById('borderWidthValue');
        if (borderWidthValue) borderWidthValue.textContent = EditorState.borderWidth;
        borderWidth.addEventListener('input', (e) => {
            EditorState.borderWidth = parseInt(e.target.value);
            if (borderWidthValue) borderWidthValue.textContent = EditorState.borderWidth;
            updatePreview();
        });
    }

    const borderRadius = document.getElementById('borderRadius');
    if (borderRadius) {
        borderRadius.value = EditorState.borderRadius;
        const borderRadiusValue = document.getElementById('borderRadiusValue');
        if (borderRadiusValue) borderRadiusValue.textContent = EditorState.borderRadius;
        borderRadius.addEventListener('input', (e) => {
            EditorState.borderRadius = parseInt(e.target.value);
            if (borderRadiusValue) borderRadiusValue.textContent = EditorState.borderRadius;
            updatePreview();
        });
    }

    const containerBgColor = document.getElementById('containerBgColor');
    if (containerBgColor) {
        containerBgColor.value = EditorState.containerBgColor;
        containerBgColor.addEventListener('input', (e) => {
            EditorState.containerBgColor = e.target.value;
            updatePreview();
        });
    }

    const containerBgOpacity = document.getElementById('containerBgOpacity');
    if (containerBgOpacity) {
        containerBgOpacity.value = EditorState.containerBgOpacity;
        const containerBgOpacityValue = document.getElementById('containerBgOpacityValue');
        if (containerBgOpacityValue) containerBgOpacityValue.textContent = EditorState.containerBgOpacity.toFixed(2);
        containerBgOpacity.addEventListener('input', (e) => {
            EditorState.containerBgOpacity = parseFloat(e.target.value);
            if (containerBgOpacityValue) containerBgOpacityValue.textContent = EditorState.containerBgOpacity.toFixed(2);
            updatePreview();
        });
    }

    const textColor = document.getElementById('textColor');
    if (textColor) {
        textColor.value = EditorState.textColor;
        textColor.addEventListener('input', (e) => {
            EditorState.textColor = e.target.value;
            updatePreview();
        });
    }

    const showDecorLines = document.getElementById('showDecorLines');
    if (showDecorLines) {
        showDecorLines.checked = EditorState.showDecorLines;
        showDecorLines.addEventListener('change', (e) => {
            EditorState.showDecorLines = e.target.checked;
            updateDecorLines();
        });
    }

    const eventType = document.getElementById('eventType');
    if (eventType) {
        eventType.value = EditorState.eventType;
        eventType.addEventListener('input', (e) => {
            EditorState.eventType = e.target.value;
            document.getElementById('previewEventType').textContent = EditorState.eventType;
        });
    }

    const eventTypeSize = document.getElementById('eventTypeSize');
    if (eventTypeSize) {
        eventTypeSize.value = EditorState.eventTypeSize;
        const eventTypeSizeValue = document.getElementById('eventTypeSizeValue');
        if (eventTypeSizeValue) eventTypeSizeValue.textContent = EditorState.eventTypeSize;
        eventTypeSize.addEventListener('input', (e) => {
            EditorState.eventTypeSize = parseInt(e.target.value);
            if (eventTypeSizeValue) eventTypeSizeValue.textContent = EditorState.eventTypeSize;
            document.getElementById('previewEventType').style.fontSize = EditorState.eventTypeSize + 'px';
        });
    }

    const eventTypeFont = document.getElementById('eventTypeFont');
    if (eventTypeFont) {
        eventTypeFont.value = EditorState.eventTypeFont;
        eventTypeFont.addEventListener('change', (e) => {
            EditorState.eventTypeFont = e.target.value;
            document.getElementById('previewEventType').style.fontFamily = EditorState.eventTypeFont;
        });
    }

    const names = document.getElementById('names');
    if (names) {
        names.value = EditorState.names;
        names.addEventListener('input', (e) => {
            EditorState.names = e.target.value;
            document.getElementById('previewNames').textContent = EditorState.names;
        });
    }

    const namesSize = document.getElementById('namesSize');
    if (namesSize) {
        namesSize.value = EditorState.namesSize;
        const namesSizeValue = document.getElementById('namesSizeValue');
        if (namesSizeValue) namesSizeValue.textContent = EditorState.namesSize;
        namesSize.addEventListener('input', (e) => {
            EditorState.namesSize = parseInt(e.target.value);
            if (namesSizeValue) namesSizeValue.textContent = EditorState.namesSize;
            document.getElementById('previewNames').style.fontSize = EditorState.namesSize + 'px';
        });
    }

    const namesFont = document.getElementById('namesFont');
    if (namesFont) {
        namesFont.value = EditorState.namesFont;
        namesFont.addEventListener('change', (e) => {
            EditorState.namesFont = e.target.value;
            document.getElementById('previewNames').style.fontFamily = EditorState.namesFont;
        });
    }

    const greeting = document.getElementById('greeting');
    if (greeting) {
        greeting.value = EditorState.greeting;
        greeting.addEventListener('input', (e) => {
            EditorState.greeting = e.target.value;
            document.getElementById('previewGreeting').textContent = EditorState.greeting;
        });
    }

    const greetingSize = document.getElementById('greetingSize');
    if (greetingSize) {
        greetingSize.value = EditorState.greetingSize;
        const greetingSizeValue = document.getElementById('greetingSizeValue');
        if (greetingSizeValue) greetingSizeValue.textContent = EditorState.greetingSize;
        greetingSize.addEventListener('input', (e) => {
            EditorState.greetingSize = parseInt(e.target.value);
            if (greetingSizeValue) greetingSizeValue.textContent = EditorState.greetingSize;
            document.getElementById('previewGreeting').style.fontSize = EditorState.greetingSize + 'px';
        });
    }

    const greetingFont = document.getElementById('greetingFont');
    if (greetingFont) {
        greetingFont.value = EditorState.greetingFont;
        greetingFont.addEventListener('change', (e) => {
            EditorState.greetingFont = e.target.value;
            document.getElementById('previewGreeting').style.fontFamily = EditorState.greetingFont;
        });
    }

    const dateText = document.getElementById('dateText');
    if (dateText) {
        dateText.value = EditorState.dateText;
        dateText.addEventListener('input', (e) => {
            EditorState.dateText = e.target.value;
            document.getElementById('previewDate').textContent = EditorState.dateText;
        });
    }

    const dateSize = document.getElementById('dateSize');
    if (dateSize) {
        dateSize.value = EditorState.dateSize;
        const dateSizeValue = document.getElementById('dateSizeValue');
        if (dateSizeValue) dateSizeValue.textContent = EditorState.dateSize;
        dateSize.addEventListener('input', (e) => {
            EditorState.dateSize = parseInt(e.target.value);
            if (dateSizeValue) dateSizeValue.textContent = EditorState.dateSize;
            document.getElementById('previewDate').style.fontSize = EditorState.dateSize + 'px';
        });
    }

    const dateFont = document.getElementById('dateFont');
    if (dateFont) {
        dateFont.value = EditorState.dateFont;
        dateFont.addEventListener('change', (e) => {
            EditorState.dateFont = e.target.value;
            document.getElementById('previewDate').style.fontFamily = EditorState.dateFont;
        });
    }

    const timeText = document.getElementById('timeText');
    if (timeText) {
        timeText.value = EditorState.timeText;
        timeText.addEventListener('input', (e) => {
            EditorState.timeText = e.target.value;
            document.getElementById('previewTime').textContent = EditorState.timeText;
        });
    }

    const timeSize = document.getElementById('timeSize');
    if (timeSize) {
        timeSize.value = EditorState.timeSize;
        const timeSizeValue = document.getElementById('timeSizeValue');
        if (timeSizeValue) timeSizeValue.textContent = EditorState.timeSize;
        timeSize.addEventListener('input', (e) => {
            EditorState.timeSize = parseInt(e.target.value);
            if (timeSizeValue) timeSizeValue.textContent = EditorState.timeSize;
            document.getElementById('previewTime').style.fontSize = EditorState.timeSize + 'px';
        });
    }

    const timeFont = document.getElementById('timeFont');
    if (timeFont) {
        timeFont.value = EditorState.timeFont;
        timeFont.addEventListener('change', (e) => {
            EditorState.timeFont = e.target.value;
            document.getElementById('previewTime').style.fontFamily = EditorState.timeFont;
        });
    }

    const placeText = document.getElementById('placeText');
    if (placeText) {
        placeText.value = EditorState.placeText;
        placeText.addEventListener('input', (e) => {
            EditorState.placeText = e.target.value;
            document.getElementById('previewPlace').textContent = EditorState.placeText;
        });
    }

    const placeSize = document.getElementById('placeSize');
    if (placeSize) {
        placeSize.value = EditorState.placeSize;
        const placeSizeValue = document.getElementById('placeSizeValue');
        if (placeSizeValue) placeSizeValue.textContent = EditorState.placeSize;
        placeSize.addEventListener('input', (e) => {
            EditorState.placeSize = parseInt(e.target.value);
            if (placeSizeValue) placeSizeValue.textContent = EditorState.placeSize;
            document.getElementById('previewPlace').style.fontSize = EditorState.placeSize + 'px';
        });
    }

    const placeFont = document.getElementById('placeFont');
    if (placeFont) {
        placeFont.value = EditorState.placeFont;
        placeFont.addEventListener('change', (e) => {
            EditorState.placeFont = e.target.value;
            document.getElementById('previewPlace').style.fontFamily = EditorState.placeFont;
        });
    }

    const messageText = document.getElementById('messageText');
    if (messageText) {
        messageText.value = EditorState.messageText;
        messageText.addEventListener('input', (e) => {
            EditorState.messageText = e.target.value;
            updateMessagePreview();
        });
    }

    const messageSize = document.getElementById('messageSize');
    if (messageSize) {
        messageSize.value = EditorState.messageSize;
        const messageSizeValue = document.getElementById('messageSizeValue');
        if (messageSizeValue) messageSizeValue.textContent = EditorState.messageSize;
        messageSize.addEventListener('input', (e) => {
            EditorState.messageSize = parseInt(e.target.value);
            if (messageSizeValue) messageSizeValue.textContent = EditorState.messageSize;
            document.getElementById('previewMessage').style.fontSize = EditorState.messageSize + 'px';
        });
    }

    const messageFont = document.getElementById('messageFont');
    if (messageFont) {
        messageFont.value = EditorState.messageFont;
        messageFont.addEventListener('change', (e) => {
            EditorState.messageFont = e.target.value;
            document.getElementById('previewMessage').style.fontFamily = EditorState.messageFont;
        });
    }

    const borderGlowEnabled = document.getElementById('borderGlowEnabled');
    if (borderGlowEnabled) {
        borderGlowEnabled.checked = EditorState.borderGlowEnabled;
        borderGlowEnabled.addEventListener('change', (e) => {
            EditorState.borderGlowEnabled = e.target.checked;
            updatePreview();
        });
    }

    const borderGlowColor = document.getElementById('borderGlowColor');
    if (borderGlowColor) {
        borderGlowColor.value = EditorState.borderGlowColor;
        borderGlowColor.addEventListener('input', (e) => {
            EditorState.borderGlowColor = e.target.value;
            updatePreview();
        });
    }

    const borderGlowSize = document.getElementById('borderGlowSize');
    if (borderGlowSize) {
        borderGlowSize.value = EditorState.borderGlowSize;
        const borderGlowSizeValue = document.getElementById('borderGlowSizeValue');
        if (borderGlowSizeValue) borderGlowSizeValue.textContent = EditorState.borderGlowSize;
        borderGlowSize.addEventListener('input', (e) => {
            EditorState.borderGlowSize = parseInt(e.target.value);
            if (borderGlowSizeValue) borderGlowSizeValue.textContent = EditorState.borderGlowSize;
            updatePreview();
        });
    }

    const borderGlowIntensity = document.getElementById('borderGlowIntensity');
    if (borderGlowIntensity) {
        borderGlowIntensity.value = EditorState.borderGlowIntensity;
        const borderGlowIntensityValue = document.getElementById('borderGlowIntensityValue');
        if (borderGlowIntensityValue) borderGlowIntensityValue.textContent = EditorState.borderGlowIntensity.toFixed(2);
        borderGlowIntensity.addEventListener('input', (e) => {
            EditorState.borderGlowIntensity = parseFloat(e.target.value);
            if (borderGlowIntensityValue) borderGlowIntensityValue.textContent = EditorState.borderGlowIntensity.toFixed(2);
            updatePreview();
        });
    }

    const enablePerLineDecor = document.getElementById('enablePerLineDecor');
    if (enablePerLineDecor) {
        enablePerLineDecor.checked = EditorState.enablePerLineDecor;
        enablePerLineDecor.addEventListener('change', (e) => {
            EditorState.enablePerLineDecor = e.target.checked;
            updateMessagePreview();
        });
    }

    document.getElementById('saveInvitationBtn')?.addEventListener('click', saveInvitation);
}

function updateMessagePreview() {
    const messageEl = document.getElementById('previewMessage');
    if (!messageEl) return;

    const lines = EditorState.messageText.split('\n');
    let html = '';

    lines.forEach((line, index) => {
        html += `<div class="message-line" style="width:100%; text-align:center; white-space:pre-wrap; word-wrap:break-word; margin:0; padding:0;">${line || '&nbsp;'}</div>`;

        if (EditorState.enablePerLineDecor && index < lines.length - 1) {
            html += `<div class="message-line-decor" style="background: ${EditorState.textColor};"></div>`;
        }
    });

    messageEl.innerHTML = html;
    messageEl.style.display = 'flex';
    messageEl.style.flexDirection = 'column';
    messageEl.style.alignItems = 'center';
    messageEl.style.gap = '0px';
    messageEl.style.width = '100%';
    messageEl.style.maxWidth = '100%';
}

function updateDecorLines() {
    document.querySelectorAll('.decor-line').forEach(line => {
        line.style.opacity = EditorState.showDecorLines ? '0.5' : '0';
    });
}

function updateAllText() {
    const previewEventType = document.getElementById('previewEventType');
    if (previewEventType) {
        previewEventType.textContent = EditorState.eventType;
        previewEventType.style.fontSize = EditorState.eventTypeSize + 'px';
        previewEventType.style.fontWeight = EditorState.eventTypeBold ? 'bold' : 'normal';
        previewEventType.style.fontStyle = EditorState.eventTypeItalic ? 'italic' : 'normal';
        previewEventType.style.fontFamily = EditorState.eventTypeFont;
    }

    const previewNames = document.getElementById('previewNames');
    if (previewNames) {
        previewNames.textContent = EditorState.names;
        previewNames.style.fontSize = EditorState.namesSize + 'px';
        previewNames.style.fontWeight = EditorState.namesBold ? 'bold' : 'normal';
        previewNames.style.fontStyle = EditorState.namesItalic ? 'italic' : 'normal';
        previewNames.style.fontFamily = EditorState.namesFont;
    }

    const previewGreeting = document.getElementById('previewGreeting');
    if (previewGreeting) {
        previewGreeting.textContent = EditorState.greeting;
        previewGreeting.style.fontSize = EditorState.greetingSize + 'px';
        previewGreeting.style.fontWeight = EditorState.greetingBold ? 'bold' : 'normal';
        previewGreeting.style.fontStyle = EditorState.greetingItalic ? 'italic' : 'normal';
        previewGreeting.style.fontFamily = EditorState.greetingFont;
    }

    const previewDate = document.getElementById('previewDate');
    if (previewDate) {
        previewDate.textContent = EditorState.dateText;
        previewDate.style.fontSize = EditorState.dateSize + 'px';
        previewDate.style.fontWeight = EditorState.dateBold ? 'bold' : 'normal';
        previewDate.style.fontStyle = EditorState.dateItalic ? 'italic' : 'normal';
        previewDate.style.fontFamily = EditorState.dateFont;
    }

    const previewTime = document.getElementById('previewTime');
    if (previewTime) {
        previewTime.textContent = EditorState.timeText;
        previewTime.style.fontSize = EditorState.timeSize + 'px';
        previewTime.style.fontWeight = EditorState.timeBold ? 'bold' : 'normal';
        previewTime.style.fontStyle = EditorState.timeItalic ? 'italic' : 'normal';
        previewTime.style.fontFamily = EditorState.timeFont;
    }

    const previewPlace = document.getElementById('previewPlace');
    if (previewPlace) {
        previewPlace.textContent = EditorState.placeText;
        previewPlace.style.fontSize = EditorState.placeSize + 'px';
        previewPlace.style.fontWeight = EditorState.placeBold ? 'bold' : 'normal';
        previewPlace.style.fontStyle = EditorState.placeItalic ? 'italic' : 'normal';
        previewPlace.style.fontFamily = EditorState.placeFont;
    }

    updateMessagePreview();

    const eventTypeSizeValue = document.getElementById('eventTypeSizeValue');
    if (eventTypeSizeValue) eventTypeSizeValue.textContent = EditorState.eventTypeSize;

    const namesSizeValue = document.getElementById('namesSizeValue');
    if (namesSizeValue) namesSizeValue.textContent = EditorState.namesSize;

    const greetingSizeValue = document.getElementById('greetingSizeValue');
    if (greetingSizeValue) greetingSizeValue.textContent = EditorState.greetingSize;

    const dateSizeValue = document.getElementById('dateSizeValue');
    if (dateSizeValue) dateSizeValue.textContent = EditorState.dateSize;

    const timeSizeValue = document.getElementById('timeSizeValue');
    if (timeSizeValue) timeSizeValue.textContent = EditorState.timeSize;

    const placeSizeValue = document.getElementById('placeSizeValue');
    if (placeSizeValue) placeSizeValue.textContent = EditorState.placeSize;

    const messageSizeValue = document.getElementById('messageSizeValue');
    if (messageSizeValue) messageSizeValue.textContent = EditorState.messageSize;

    updateDecorLines();
}

function updatePreview() {
    const bgLayer = document.getElementById('previewBgLayer');
    if (bgLayer) {
        bgLayer.style.backgroundImage = `url('/images/patterns/${EditorState.pattern}')`;
        bgLayer.style.opacity = EditorState.bgOpacity;
    }

    const card = document.getElementById('previewCard');
    if (card) {
        card.style.border = `${EditorState.borderWidth}px solid ${EditorState.borderColor}`;
        card.style.borderRadius = `${EditorState.borderRadius}px`;

        if (EditorState.borderGlowEnabled) {
            card.style.boxShadow = `0 0 ${EditorState.borderGlowSize}px ${EditorState.borderGlowColor}, 0 25px 50px -12px rgba(0,0,0,0.25)`;
        } else {
            card.style.boxShadow = '0 25px 50px -12px rgba(0,0,0,0.25)';
        }

        const rgb = hexToRgb(EditorState.containerBgColor);
        card.style.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${EditorState.containerBgOpacity})`;
        card.style.color = EditorState.textColor;
    }

    updateAllText();
    applyMobileScale();

    if (window.decorationsAPI) {
        setTimeout(() => {
            window.decorationsAPI.updatePreviewDecorations();
            window.decorationsAPI.applyClipToFrame();
        }, 10);
    }
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 255, g: 255, b: 255 };
}

function initMobileTabs() {
    const mobileTabs = document.getElementById('mobileTabs');
    const sidebar = document.getElementById('editorSidebar');
    const preview = document.getElementById('editorPreview');

    if (!mobileTabs || !sidebar || !preview) return;

    const switchToTab = (tabName) => {
        activeTab = tabName;
        document.querySelectorAll('.mobile-tab').forEach(t => t.classList.remove('active'));
        document.querySelector(`.mobile-tab[data-tab="${tabName}"]`).classList.add('active');

        if (tabName === 'settings') {
            sidebar.classList.remove('hidden');
            preview.classList.add('hidden');
        } else {
            sidebar.classList.add('hidden');
            preview.classList.remove('hidden');
            setTimeout(() => {
                applyMobileScale();
                fixBackgroundScroll();
            }, 50);
        }
    };

    isMobileView = window.innerWidth <= 768;
    if (isMobileView) switchToTab('settings');

    document.querySelectorAll('.mobile-tab').forEach(tab => {
        tab.addEventListener('click', () => switchToTab(tab.dataset.tab));
    });

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            isMobileView = window.innerWidth <= 768;
            if (isMobileView) {
                const active = document.querySelector('.mobile-tab.active');
                if (active) switchToTab(active.dataset.tab);
                fixMobileTabsPosition();
            } else {
                sidebar.classList.remove('hidden');
                preview.classList.remove('hidden');
            }
            applyMobileScale();
        }, 150);
    });
}

function initColorPresets() {
    document.querySelectorAll('#borderColorPresets .color-preset, #borderColorPresets2 .color-preset').forEach(preset => {
        preset.addEventListener('click', () => {
            const color = preset.dataset.color;
            document.getElementById('borderColor').value = color;
            EditorState.borderColor = color;
            updatePreview();

            document.querySelectorAll('#borderColorPresets .color-preset, #borderColorPresets2 .color-preset').forEach(p => p.classList.remove('selected'));
            preset.classList.add('selected');
        });
    });

    document.querySelectorAll('#containerBgColorPresets .color-preset, #containerBgColorPresets2 .color-preset').forEach(preset => {
        preset.addEventListener('click', () => {
            const color = preset.dataset.color;
            document.getElementById('containerBgColor').value = color;
            EditorState.containerBgColor = color;
            updatePreview();

            document.querySelectorAll('#containerBgColorPresets .color-preset, #containerBgColorPresets2 .color-preset').forEach(p => p.classList.remove('selected'));
            preset.classList.add('selected');
        });
    });

    document.querySelectorAll('#textColorPresets .color-preset').forEach(preset => {
        preset.addEventListener('click', () => {
            const color = preset.dataset.color;
            document.getElementById('textColor').value = color;
            EditorState.textColor = color;
            updatePreview();

            document.querySelectorAll('#textColorPresets .color-preset').forEach(p => p.classList.remove('selected'));
            preset.classList.add('selected');
        });
    });
}

// Обновленная функция saveInvitation
async function saveInvitation() {
    const slug = document.getElementById('customSlug')?.value.trim();
    const btn = document.getElementById('saveInvitationBtn');
    const originalHTML = btn.innerHTML;

    if (!slug) {
        showUserNotification('Введите ссылку для приглашения', 'warning');
        return;
    }

    if (!/^[a-z0-9-]+$/.test(slug)) {
        showUserNotification('Используйте только латинские буквы, цифры и дефисы', 'warning');
        return;
    }

    btn.disabled = true;
    btn.innerHTML = `
        <span class="spinner-small" style="
            display: inline-block;
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255,255,255,0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 0.8s linear infinite;
            margin-right: 8px;
        "></span>
        Проверка...
    `;

    try {
        // Проверяем, свободен ли slug
        const existing = await db.collection('invitations').where('slug', '==', slug).get();

        if (!existing.empty) {
            btn.disabled = false;
            btn.innerHTML = originalHTML;
            showUserNotification('Эта ссылка уже занята. Придумайте другую', 'error');
            return;
        }

        // Если свободен, создаем платеж
        btn.innerHTML = `
            <span class="spinner-small"></span>
            Переход к оплате...
        `;
        
        await createPayment(slug);

    } catch (error) {
        console.error('Save error:', error);

        btn.disabled = false;
        btn.innerHTML = originalHTML;

        showUserNotification(
            'Не удалось проверить ссылку. Проверьте подключение к интернету и попробуйте снова. ' +
            'Если ошибка повторяется, напишите нам: secretplace122.95@gmail.com',
            'error'
        );
    }
}

function showUserNotification(message, type = 'info') {
    const oldNotification = document.querySelector('.user-notification');
    if (oldNotification) oldNotification.remove();

    const notification = document.createElement('div');
    notification.className = `user-notification user-notification-${type}`;

    const icons = {
        success: 'check_circle',
        error: 'error',
        warning: 'warning',
        info: 'info'
    };

    notification.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#F44336' : type === 'warning' ? '#FF9800' : '#2196F3'};
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            gap: 12px;
            max-width: 400px;
            animation: slideIn 0.3s ease;
            font-size: 14px;
            line-height: 1.5;
        ">
            <span class="material-symbols-outlined" style="font-size: 24px;">${icons[type]}</span>
            <span style="flex: 1;">${message}</span>
            <button onclick="this.parentElement.remove()" style="
                background: none;
                border: none;
                color: white;
                cursor: pointer;
                padding: 4px;
                display: flex;
                align-items: center;
                opacity: 0.7;
                hover: opacity: 1;
            ">
                <span class="material-symbols-outlined" style="font-size: 18px;">close</span>
            </button>
        </div>
    `;

    document.body.appendChild(notification);

    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

    setTimeout(() => {
        const notif = document.querySelector('.user-notification');
        if (notif) {
            notif.style.transition = 'opacity 0.3s';
            notif.style.opacity = '0';
            setTimeout(() => notif.remove(), 300);
        }
    }, 5000);
}

window.createPayment = createPayment;
window.checkPendingPayment = checkPendingPayment;
window.getInvitationData = getInvitationData;