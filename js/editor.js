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
    defaultTextColor: '#475569',
    cardHeight: 700,
    enableAnimations: false,
    animationType: 'balloons',
    animationIntensity: 5,
    animationSpeed: 3,
    animationColors: ['#FF69B4', '#FFD700', '#87CEEB', '#98FB98', '#FFA07A', '#DDA0DD'],
    animationSize: 30,
    animationPosition: 'whole',
    decorations: [],
    activeDecorId: null,
    clipDecorations: true,
    textBlocks: [
        {
            id: 'text_' + Date.now() + '_1',
            type: 'textBlock',
            content: 'Свадебное приглашение',
            fontSize: 16,
            fontFamily: "'Playfair Display', serif",
            fontWeight: 'normal',
            fontStyle: 'normal',
            color: '#475569',
            textAlign: 'center',
            posX: 50,
            posY: 15,
            width: 90,
            aboveText: false,
            isMultiLine: false,
            order: 0
        },
        {
            id: 'text_' + Date.now() + '_2',
            type: 'textBlock',
            content: 'Александр & Елена',
            fontSize: 48,
            fontFamily: "'Great Vibes', cursive",
            fontWeight: 'normal',
            fontStyle: 'normal',
            color: '#475569',
            textAlign: 'center',
            posX: 50,
            posY: 40,
            width: 90,
            aboveText: false,
            isMultiLine: false,
            order: 1
        },
        {
            id: 'text_' + Date.now() + '_3',
            type: 'textBlock',
            content: 'приглашают вас разделить с ними радость',
            fontSize: 18,
            fontFamily: "'Playfair Display', serif",
            fontWeight: 'normal',
            fontStyle: 'italic',
            color: '#475569',
            textAlign: 'center',
            posX: 50,
            posY: 55,
            width: 80,
            aboveText: false,
            isMultiLine: false,
            order: 2
        },
        {
            id: 'text_' + Date.now() + '_4',
            type: 'textBlock',
            content: '15 июня 2026\nв 16:00\nЗАГС, г. Москва',
            fontSize: 18,
            fontFamily: "'Playfair Display', serif",
            fontWeight: 'normal',
            fontStyle: 'normal',
            color: '#475569',
            textAlign: 'center',
            posX: 50,
            posY: 70,
            width: 80,
            aboveText: false,
            isMultiLine: true,
            order: 3
        }
    ],
    activeTextId: null,
};

const PAYMENT_AMOUNT = 299;
let isProcessingPayment = false;

const patterns = [
    { id: 'wedding-1', file: 'wedding1.webp', category: 'wedding', name: '1' },
    { id: 'wedding-2', file: 'wedding2.webp', category: 'wedding', name: '2' },
    { id: 'wedding-3', file: 'wedding3.webp', category: 'wedding', name: '3' },
    { id: 'wedding-4', file: 'wedding4.webp', category: 'wedding', name: '4' },
    { id: 'wedding-5', file: 'wedding5.webp', category: 'wedding', name: '5' },
    { id: 'wedding-6', file: 'wedding6.webp', category: 'wedding', name: '6' },
    { id: 'wedding-7', file: 'wedding7.webp', category: 'wedding', name: '7' },
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
    { id: 'other-12', file: 'other12.webp', category: 'other', name: '12' },
];

const fonts = [
    { value: "'Playfair Display', serif", name: "Playfair Display" },
    { value: "'Great Vibes', cursive", name: "Great Vibes" },
    { value: "'Cormorant Garamond', serif", name: "Cormorant Garamond" },
    { value: "'Montserrat', sans-serif", name: "Montserrat" },
    { value: "'Lora', serif", name: "Lora" },
    { value: "'Inter', sans-serif", name: "Inter" },
    { value: "'Pacifico', cursive", name: "Pacifico" },
    { value: "'Amatic SC', cursive", name: "Amatic SC" },
    { value: "'Caveat', cursive", name: "Caveat" },
    { value: "'Comfortaa', sans-serif", name: "Comfortaa" },
    { value: "'Rubik', sans-serif", name: "Rubik" },
    { value: "'Raleway', sans-serif", name: "Raleway" },
    { value: "'Marck Script', cursive", name: "Marck Script" },
    { value: "'Poiret One', cursive", name: "Poiret One" },
    { value: "'Neucha', cursive", name: "Neucha" },
    { value: "'Roboto', sans-serif", name: "Roboto" },
    { value: "'Open Sans', sans-serif", name: "Open Sans" },
    { value: "'Merriweather', serif", name: "Merriweather" },
    { value: "'Exo 2', sans-serif", name: "Exo 2" },
    { value: "'Jura', sans-serif", name: "Jura" }
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
    initAnimationControls();
    updatePreview();

    setTimeout(() => {
        checkPaymentReturn();
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

    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            applyMobileScale();
        }, 100);
    });

    applyMobileScale();
    fixMobileTabsPosition();
    fixBackgroundScroll();

    setTimeout(() => {
        if (window.decorationsAPI) {
            window.decorationsAPI.initDecorations();
        }
        if (window.textBlocksAPI) {
            window.textBlocksAPI.initTextBlocks();
        }
    }, 300);

    setTimeout(observeCardResize, 500);

    const testBtn = document.getElementById('testSaveInvitationBtn');
    if (testBtn) {
        testBtn.addEventListener('click', testSaveInvitation);
    }

    const customSlugInput = document.getElementById('customSlug');
    if (customSlugInput) {
        customSlugInput.addEventListener('input', function(e) {
            let value = e.target.value;
            e.target.value = value.toLowerCase();
        });
    }
});

function applyMobileScale() {
    const container = document.querySelector('.preview-container');
    const card = document.getElementById('previewCard');

    if (!container || !card) return;

    const oldSpacer = document.getElementById('scroll-spacer');
    if (oldSpacer) oldSpacer.remove();

    if (window.innerWidth <= 768) {
        const paddingLeft = 30;
        const paddingRight = 30;

        container.style.paddingLeft = paddingLeft + 'px';
        container.style.paddingRight = paddingRight + 'px';
        container.style.paddingTop = '20px';
        container.style.paddingBottom = '40px';

        const containerWidth = container.clientWidth - paddingLeft - paddingRight;
        const cardWidth = 500;
        let scale = containerWidth / cardWidth;
        scale = Math.min(scale, 0.9);

        card.style.position = 'absolute';
        card.style.left = '50%';
        card.style.top = '20px';
        card.style.transform = `translateX(-50%) scale(${scale})`;
        card.style.margin = '0';

        const spacer = document.createElement('div');
        spacer.id = 'scroll-spacer';
        spacer.style.width = '1px';
        spacer.style.height = (card.offsetHeight * scale + 40) + 'px';
        spacer.style.pointerEvents = 'none';

        container.appendChild(spacer);

    } else {
        card.style.position = 'relative';
        card.style.left = 'auto';
        card.style.top = 'auto';
        card.style.transform = 'none';
        card.style.margin = '0 auto';

        container.style.paddingLeft = '';
        container.style.paddingRight = '';
        container.style.paddingTop = '';
        container.style.paddingBottom = '';
    }
}

function initFontSelectors() {
    document.querySelectorAll('.font-select').forEach(select => {
        select.innerHTML = fonts.map(f =>
            `<option value="${f.value}" style="font-family: ${f.value}">${f.name}</option>`
        ).join('');
    });
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
                if (window.innerWidth <= 768) {
                    const activeTab = document.querySelector('.mobile-tab.active');
                    if (activeTab && activeTab.dataset.tab === 'preview') {
                        window.animationManager.start({
                            ...getAnimationConfig(),
                            container: document.querySelector('.preview-container')
                        });
                    }
                } else {
                    window.animationManager.start({
                        ...getAnimationConfig(),
                        container: document.querySelector('.preview-container')
                    });
                }
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
                if (window.innerWidth <= 768) {
                    const activeTab = document.querySelector('.mobile-tab.active');
                    if (activeTab && activeTab.dataset.tab === 'preview') {
                        window.animationManager.start({
                            ...getAnimationConfig(),
                            container: document.querySelector('.preview-container')
                        });
                    }
                } else {
                    window.animationManager.start({
                        ...getAnimationConfig(),
                        container: document.querySelector('.preview-container')
                    });
                }
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
                if (window.innerWidth <= 768) {
                    const activeTab = document.querySelector('.mobile-tab.active');
                    if (activeTab && activeTab.dataset.tab === 'preview') {
                        window.animationManager.start({
                            ...getAnimationConfig(),
                            container: document.querySelector('.preview-container')
                        });
                    }
                } else {
                    window.animationManager.start({
                        ...getAnimationConfig(),
                        container: document.querySelector('.preview-container')
                    });
                }
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
                if (window.innerWidth <= 768) {
                    const activeTab = document.querySelector('.mobile-tab.active');
                    if (activeTab && activeTab.dataset.tab === 'preview') {
                        window.animationManager.start({
                            ...getAnimationConfig(),
                            container: document.querySelector('.preview-container')
                        });
                    }
                } else {
                    window.animationManager.start({
                        ...getAnimationConfig(),
                        container: document.querySelector('.preview-container')
                    });
                }
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
                if (window.innerWidth <= 768) {
                    const activeTab = document.querySelector('.mobile-tab.active');
                    if (activeTab && activeTab.dataset.tab === 'preview') {
                        window.animationManager.start({
                            ...getAnimationConfig(),
                            container: document.querySelector('.preview-container')
                        });
                    }
                } else {
                    window.animationManager.start({
                        ...getAnimationConfig(),
                        container: document.querySelector('.preview-container')
                    });
                }
            }
        });
    }

    const position = document.getElementById('animationPosition');
    if (position) {
        position.value = EditorState.animationPosition;
        position.addEventListener('change', (e) => {
            EditorState.animationPosition = e.target.value;
            if (EditorState.enableAnimations && window.animationManager) {
                if (window.innerWidth <= 768) {
                    const activeTab = document.querySelector('.mobile-tab.active');
                    if (activeTab && activeTab.dataset.tab === 'preview') {
                        window.animationManager.start({
                            ...getAnimationConfig(),
                            container: document.querySelector('.preview-container')
                        });
                    }
                } else {
                    window.animationManager.start({
                        ...getAnimationConfig(),
                        container: document.querySelector('.preview-container')
                    });
                }
            }
        });
    }
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
    const cardHeight = document.getElementById('cardHeight');
    if (cardHeight) {
        cardHeight.value = EditorState.cardHeight;
        const cardHeightValue = document.getElementById('cardHeightValue');
        if (cardHeightValue) cardHeightValue.textContent = EditorState.cardHeight + 'px';
        cardHeight.addEventListener('input', (e) => {
            EditorState.cardHeight = parseInt(e.target.value);
            if (cardHeightValue) cardHeightValue.textContent = EditorState.cardHeight + 'px';
            updatePreview();
        });
    }
    document.getElementById('saveInvitationBtn')?.addEventListener('click', saveInvitation);
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
        card.style.minHeight = EditorState.cardHeight + 'px';
        card.style.height = 'auto';
        if (EditorState.borderGlowEnabled) {
            card.style.boxShadow = `0 0 ${EditorState.borderGlowSize}px ${EditorState.borderGlowColor}, 0 25px 50px -12px rgba(0,0,0,0.25)`;
        } else {
            card.style.boxShadow = '0 25px 50px -12px rgba(0,0,0,0.25)';
        }
        const rgb = hexToRgb(EditorState.containerBgColor);
        card.style.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${EditorState.containerBgOpacity})`;
    }
    applyMobileScale();
    if (window.decorationsAPI) {
        setTimeout(() => {
            window.decorationsAPI.updatePreviewDecorations();
            window.decorationsAPI.applyClipToFrame();
            applyMobileScale();
        }, 10);
    }
    if (window.textBlocksAPI) {
        setTimeout(() => {
            window.textBlocksAPI.updatePreviewTextBlocks();
            applyMobileScale();
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
    const navbar = document.querySelector('.navbar');
    const editorMain = document.querySelector('.editor-main');
    
    if (!mobileTabs || !sidebar || !preview || !navbar || !editorMain) return;

    const switchToTab = (tabName) => {
        activeTab = tabName;
        document.querySelectorAll('.mobile-tab').forEach(t => t.classList.remove('active'));
        document.querySelector(`.mobile-tab[data-tab="${tabName}"]`).classList.add('active');

        if (tabName === 'settings') {
            navbar.style.display = 'block';
            mobileTabs.style.top = navbar.offsetHeight + 'px';
            
            const doneBtn = document.getElementById('mobileTextDone');
            if (doneBtn && window.getComputedStyle(doneBtn).display !== 'none') {
                doneBtn.click();
            }

            const decorDoneBtn = document.getElementById('mobileDecorDone');
            if (decorDoneBtn && window.getComputedStyle(decorDoneBtn).display !== 'none') {
                decorDoneBtn.click();
            }

            if (EditorState.activeTextId) {
                EditorState.activeTextId = null;
                if (window.textBlocksAPI) {
                    window.textBlocksAPI.renderTextList();
                    window.textBlocksAPI.hideTextControls();
                }
            }
            if (EditorState.activeDecorId) {
                EditorState.activeDecorId = null;
                if (window.decorationsAPI) {
                    window.decorationsAPI.renderDecorList();
                    window.decorationsAPI.hideDecorControls();
                }
            }

            if (window.animationManager) {
                window.animationManager.stop();
            }

            sidebar.classList.remove('hidden');
            preview.classList.add('hidden');
        } else {
            navbar.style.display = 'none';
            mobileTabs.style.top = '0';
            
            sidebar.classList.add('hidden');
            preview.classList.remove('hidden');
            setTimeout(() => {
                applyMobileScale();
                fixBackgroundScroll();
                if (EditorState.enableAnimations && window.animationManager) {
                    window.animationManager.start({
                        ...getAnimationConfig(),
                        container: document.querySelector('.preview-container')
                    });
                }
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
                if (active) {
                    if (active.dataset.tab === 'settings') {
                        mobileTabs.style.top = navbar.offsetHeight + 'px';
                    } else {
                        mobileTabs.style.top = '0';
                    }
                }
                fixMobileTabsPosition();
            } else {
                navbar.style.display = 'block';
                sidebar.classList.remove('hidden');
                preview.classList.remove('hidden');
                if (window.animationManager) {
                    window.animationManager.stop();
                }
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
    const activeTab = document.querySelector('.mobile-tab.active');
    
    if (navbar && mobileTabs && isMobileView) {
        if (activeTab && activeTab.dataset.tab === 'settings') {
            mobileTabs.style.top = navbar.offsetHeight + 'px';
        } else {
            mobileTabs.style.top = '0';
        }
    }
}

function observeCardResize() {
    const card = document.getElementById('previewCard');
    if (!card) return;
    const resizeObserver = new ResizeObserver(() => {
        if (window.decorationsAPI) {
            window.decorationsAPI.updatePreviewDecorations();
        }
        if (window.textBlocksAPI) {
            window.textBlocksAPI.updatePreviewTextBlocks();
        }
    });
    resizeObserver.observe(card);
}

function cancelPendingPayment() {
    localStorage.removeItem('pendingInvitation');
    isProcessingPayment = false;
    const btn = document.getElementById('saveInvitationBtn');
    if (btn) {
        btn.disabled = false;
        btn.innerHTML = 'Сохранить';
    }
    showUserNotification('Платёж отменён', 'info');
}

function checkPaymentReturn() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('payment_id') && urlParams.has('status')) {
        const status = urlParams.get('status');
        if (status === 'cancelled' || status === 'canceled') {
            cancelPendingPayment();
        }
        const url = new URL(window.location);
        url.searchParams.delete('payment_id');
        url.searchParams.delete('status');
        window.history.replaceState({}, '', url);
    }
}

async function checkPendingPayment() {
    const pending = localStorage.getItem('pendingInvitation');
    if (pending) {
        try {
            const { slug, data, timestamp } = JSON.parse(pending);
            if (timestamp && Date.now() - timestamp > 30 * 60 * 1000) {
                localStorage.removeItem('pendingInvitation');
                return;
            }
            const action = confirm('У вас есть незавершённый платёж. Нажмите ОК для продолжения оплаты или Отмена для отмены');
            if (action) {
                Object.assign(EditorState, data);
                updatePreview();
                document.getElementById('customSlug').value = slug;
                if (window.decorationsAPI && data.decorations) {
                    setTimeout(() => {
                        window.decorationsAPI.renderDecorList();
                        window.decorationsAPI.updatePreviewDecorations();
                    }, 100);
                }
                if (window.textBlocksAPI && data.textBlocks) {
                    setTimeout(() => {
                        window.textBlocksAPI.renderTextList();
                        window.textBlocksAPI.updatePreviewTextBlocks();
                    }, 100);
                }
                showUserNotification('Данные восстановлены. Нажмите "Сохранить" для оплаты', 'info');
            } else {
                cancelPendingPayment();
            }
        } catch (e) {
            localStorage.removeItem('pendingInvitation');
        }
    }
}

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
        defaultTextColor: EditorState.defaultTextColor,
        cardHeight: EditorState.cardHeight,
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
        clipDecorations: EditorState.clipDecorations,
        textBlocks: EditorState.textBlocks.map(b => ({
            id: b.id,
            content: b.content,
            fontSize: b.fontSize,
            fontFamily: b.fontFamily,
            fontWeight: b.fontWeight,
            fontStyle: b.fontStyle,
            color: b.color,
            textAlign: b.textAlign,
            posX: b.posX,
            posY: b.posY,
            width: b.width,
            aboveText: b.aboveText,
            isMultiLine: b.isMultiLine,
            order: b.order
        }))
    };
}

async function createPayment(slug) {
    try {
        const response = await fetch(API_CONFIG.getUrl(API_CONFIG.endpoints.createPayment), {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ slug: slug, amount: PAYMENT_AMOUNT })
        });
        const data = await response.json();
        if (data.success && data.confirmation_url) {
            localStorage.setItem('pendingInvitation', JSON.stringify({
                slug: slug,
                data: getInvitationData(),
                timestamp: Date.now(),
                paymentId: data.payment_id
            }));
            window.location.href = data.confirmation_url;
        } else {
            throw new Error(data.error || 'Не удалось создать платеж');
        }
    } catch (error) {
        console.error('Payment error:', error);
        showUserNotification('Не удалось создать платеж. Попробуйте позже или напишите в поддержку', 'error');
        isProcessingPayment = false;
        const btn = document.getElementById('saveInvitationBtn');
        if (btn) {
            btn.disabled = false;
            btn.innerHTML = 'Сохранить';
        }
    }
}

async function saveInvitation() {
    if (isProcessingPayment) {
        showUserNotification('Платёж уже обрабатывается', 'warning');
        return;
    }
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
    isProcessingPayment = true;
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner-small"></span> Проверка...`;
    try {
        const existing = await db.collection('invitations').where('slug', '==', slug).get();
        if (!existing.empty) {
            btn.disabled = false;
            btn.innerHTML = originalHTML;
            isProcessingPayment = false;
            showUserNotification('Эта ссылка уже занята. Придумайте другую', 'error');
            return;
        }
        localStorage.setItem('pendingInvitation', JSON.stringify({
            slug: slug,
            data: getInvitationData(),
            timestamp: Date.now()
        }));
        btn.innerHTML = `<span class="spinner-small"></span> Переход к оплате...`;
        await createPayment(slug);
    } catch (error) {
        console.error('Save error:', error);
        btn.disabled = false;
        btn.innerHTML = originalHTML;
        isProcessingPayment = false;
        showUserNotification('Не удалось проверить ссылку. Проверьте подключение к интернету и попробуйте снова.', 'error');
    }
}

async function testSaveInvitation() {
    if (isProcessingPayment) {
        showUserNotification('Операция уже выполняется', 'warning');
        return;
    }
    const slug = document.getElementById('customSlug')?.value.trim();
    const btn = document.getElementById('testSaveInvitationBtn');
    const originalHTML = btn.innerHTML;

    if (!slug) {
        showUserNotification('Введите ссылку для приглашения', 'warning');
        return;
    }
    if (!/^[a-z0-9-]+$/.test(slug)) {
        showUserNotification('Используйте только латинские буквы, цифры и дефисы', 'warning');
        return;
    }

    isProcessingPayment = true;
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner-small"></span> Сохранение...`;

    try {
        const existing = await db.collection('invitations').where('slug', '==', slug).get();
        if (!existing.empty) {
            btn.disabled = false;
            btn.innerHTML = originalHTML;
            isProcessingPayment = false;
            showUserNotification('Эта ссылка уже занята. Придумайте другую', 'error');
            return;
        }

        const invitationData = getInvitationData();
        await db.collection('invitations').add({
            ...invitationData,
            slug: slug,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            paid: true,
            testMode: true
        });

        showUserNotification('Приглашение успешно создано!', 'success');
        setTimeout(() => {
            window.location.href = `/invitation/#${slug}`;
        }, 1500);

    } catch (error) {
        console.error('Test save error:', error);
        btn.disabled = false;
        btn.innerHTML = originalHTML;
        isProcessingPayment = false;
        showUserNotification('Ошибка при сохранении. Попробуйте снова.', 'error');
    }
}

function showUserNotification(message, type = 'info') {
    const oldNotification = document.querySelector('.user-notification');
    if (oldNotification) oldNotification.remove();
    const notification = document.createElement('div');
    notification.className = `user-notification user-notification-${type}`;
    const icons = { success: 'check_circle', error: 'error', warning: 'warning', info: 'info' };
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
            @keyframes slideIn { from { transform: translateX(100%); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            @keyframes spin { to { transform: rotate(360deg); } }
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
window.cancelPendingPayment = cancelPendingPayment;
window.applyMobileScale = applyMobileScale;
window.testSaveInvitation = testSaveInvitation;