const EditorState = {
    pattern: 'abstract-1.jpg',
    bgOpacity: 0.2,
    borderColor: '#D4AF37',
    borderWidth: 2,
    borderRadius: 30,
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
    showDecorLines: true
};

const patterns = [
    { id: 'abstract-1', file: 'bg1.png' },
    { id: 'abstract-2', file: 'abstract-2.jpg' },
    { id: 'wedding', file: 'wedding-classic.png' },
    { id: 'wedding2', file: 'wedding-watercolor.png' },
    { id: 'wedding3', file: 'wedding-royal.png' },
    { id: 'wedding4', file: 'wedding-rose.png' },
    { id: 'corporate', file: 'corporate-pattern.jpg' },
    { id: 'floral', file: 'floral-pattern.jpg' }
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
    { value: "'Parisienne', cursive", name: "Parisienne" }
];

let isMobileView = window.innerWidth <= 768;
let activeTab = 'settings';

document.addEventListener('DOMContentLoaded', () => {
    initPatternGrid();
    initEventListeners();
    initMobileTabs();
    initColorPresets();
    initAccordion();
    initMobileMenu();
    initFontSelectors();
    initBoldItalicButtons();
    updatePreview();
    updateAllText();
    setInitialFonts();

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            isMobileView = window.innerWidth <= 768;
            applyMobileScale();
            fixMobileTabsPosition();
        }, 100);
    });

    applyMobileScale();
    fixMobileTabsPosition();
});

function fixMobileTabsPosition() {
    const navbar = document.querySelector('.navbar');
    const mobileTabs = document.getElementById('mobileTabs');

    if (navbar && mobileTabs && isMobileView) {
        const navbarHeight = navbar.offsetHeight;
        mobileTabs.style.top = navbarHeight + 'px';
    }
}

function applyMobileScale() {
    const cards = document.querySelectorAll('.invitation-card');
    if (isMobileView) {
        cards.forEach(card => {
            card.style.transform = 'scale(0.7)';
            card.style.transformOrigin = 'center top';
            card.style.margin = '0 auto';
        });
    } else {
        cards.forEach(card => {
            card.style.transform = 'none';
        });
    }
}

function initFontSelectors() {
    // Заполняем все выпадающие списки шрифтов
    document.querySelectorAll('.font-select').forEach(select => {
        select.innerHTML = fonts.map(f =>
            `<option value="${f.value}" style="font-family: ${f.value}">${f.name}</option>`
        ).join('');
    });
}

function setInitialFonts() {
    // Устанавливаем начальные значения для всех селектов
    document.getElementById('eventTypeFont').value = EditorState.eventTypeFont;
    document.getElementById('namesFont').value = EditorState.namesFont;
    document.getElementById('greetingFont').value = EditorState.greetingFont;
    document.getElementById('dateFont').value = EditorState.dateFont;
    document.getElementById('timeFont').value = EditorState.timeFont;
    document.getElementById('placeFont').value = EditorState.placeFont;
    document.getElementById('messageFont').value = EditorState.messageFont;
}

function initBoldItalicButtons() {
    // Функция для инициализации кнопок жирный/курсив
    function setupButton(buttonId, stateProperty, elementId, styleType) {
        const btn = document.getElementById(buttonId);
        if (!btn) return;

        // Устанавливаем начальное состояние
        if (EditorState[stateProperty]) {
            btn.classList.add('active');
        }

        btn.addEventListener('click', () => {
            EditorState[stateProperty] = !EditorState[stateProperty];

            if (EditorState[stateProperty]) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }

            const element = document.getElementById(elementId);
            if (element) {
                if (styleType === 'bold') {
                    element.style.fontWeight = EditorState[stateProperty] ? 'bold' : 'normal';
                } else if (styleType === 'italic') {
                    element.style.fontStyle = EditorState[stateProperty] ? 'italic' : 'normal';
                }
            }
        });
    }

    // Инициализируем все кнопки
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

function initAccordion() {
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.closest('.accordion-item');
            const wasActive = item.classList.contains('active');

            document.querySelectorAll('.accordion-item.active').forEach(activeItem => {
                if (activeItem !== item) {
                    activeItem.classList.remove('active');
                    const prevIcon = activeItem.querySelector('.material-symbols-outlined');
                    if (prevIcon) prevIcon.textContent = 'expand_more';
                }
            });

            if (!wasActive) {
                item.classList.add('active');
                const icon = header.querySelector('.material-symbols-outlined');
                if (icon) icon.textContent = 'expand_less';
            } else {
                item.classList.remove('active');
                const icon = header.querySelector('.material-symbols-outlined');
                if (icon) icon.textContent = 'expand_more';
            }
        });
    });
}

function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');

            const spans = menuBtn.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });

        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
                navLinks.classList.remove('active');
                const spans = menuBtn?.querySelectorAll('span');
                spans?.forEach(span => span.classList.remove('active'));
            }
        });

        document.querySelectorAll('#navLinks a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const spans = menuBtn?.querySelectorAll('span');
                spans?.forEach(span => span.classList.remove('active'));
            });
        });
    }
}

function initPatternGrid() {
    const grid = document.getElementById('patternGrid');
    if (!grid) return;

    grid.innerHTML = patterns.map(p => `
        <div class="pattern-item ${p.file === EditorState.pattern ? 'selected' : ''}" 
             data-pattern="${p.file}"
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

function initEventListeners() {
    // Фон страницы
    document.getElementById('bgOpacity')?.addEventListener('input', (e) => {
        EditorState.bgOpacity = parseFloat(e.target.value);
        document.getElementById('bgOpacityValue').textContent = EditorState.bgOpacity.toFixed(2);
        updatePreview();
    });

    // Рамка контейнера
    document.getElementById('borderColor')?.addEventListener('input', (e) => {
        EditorState.borderColor = e.target.value;
        updatePreview();
    });

    document.getElementById('borderWidth')?.addEventListener('input', (e) => {
        EditorState.borderWidth = parseInt(e.target.value);
        document.getElementById('borderWidthValue').textContent = EditorState.borderWidth;
        updatePreview();
    });

    document.getElementById('borderRadius')?.addEventListener('input', (e) => {
        EditorState.borderRadius = parseInt(e.target.value);
        document.getElementById('borderRadiusValue').textContent = EditorState.borderRadius;
        updatePreview();
    });

    // Внутренний фон
    document.getElementById('containerBgColor')?.addEventListener('input', (e) => {
        EditorState.containerBgColor = e.target.value;
        updatePreview();
    });

    document.getElementById('containerBgOpacity')?.addEventListener('input', (e) => {
        EditorState.containerBgOpacity = parseFloat(e.target.value);
        document.getElementById('containerBgOpacityValue').textContent = EditorState.containerBgOpacity.toFixed(2);
        updatePreview();
    });

    // Текст - общие настройки
    document.getElementById('textColor')?.addEventListener('input', (e) => {
        EditorState.textColor = e.target.value;
        updatePreview();
    });

    document.getElementById('showDecorLines')?.addEventListener('change', (e) => {
        EditorState.showDecorLines = e.target.checked;
        updateDecorLines();
    });

    // Тип мероприятия
    document.getElementById('eventType')?.addEventListener('input', (e) => {
        EditorState.eventType = e.target.value;
        document.getElementById('previewEventType').textContent = EditorState.eventType;
    });

    document.getElementById('eventTypeSize')?.addEventListener('input', (e) => {
        EditorState.eventTypeSize = parseInt(e.target.value);
        document.getElementById('eventTypeSizeValue').textContent = EditorState.eventTypeSize;
        document.getElementById('previewEventType').style.fontSize = EditorState.eventTypeSize + 'px';
    });

    document.getElementById('eventTypeFont')?.addEventListener('change', (e) => {
        EditorState.eventTypeFont = e.target.value;
        document.getElementById('previewEventType').style.fontFamily = EditorState.eventTypeFont;
    });

    // Имена
    document.getElementById('names')?.addEventListener('input', (e) => {
        EditorState.names = e.target.value;
        document.getElementById('previewNames').textContent = EditorState.names;
    });

    document.getElementById('namesSize')?.addEventListener('input', (e) => {
        EditorState.namesSize = parseInt(e.target.value);
        document.getElementById('namesSizeValue').textContent = EditorState.namesSize;
        document.getElementById('previewNames').style.fontSize = EditorState.namesSize + 'px';
    });

    document.getElementById('namesFont')?.addEventListener('change', (e) => {
        EditorState.namesFont = e.target.value;
        document.getElementById('previewNames').style.fontFamily = EditorState.namesFont;
    });

    // Приветствие
    document.getElementById('greeting')?.addEventListener('input', (e) => {
        EditorState.greeting = e.target.value;
        document.getElementById('previewGreeting').textContent = EditorState.greeting;
    });

    document.getElementById('greetingSize')?.addEventListener('input', (e) => {
        EditorState.greetingSize = parseInt(e.target.value);
        document.getElementById('greetingSizeValue').textContent = EditorState.greetingSize;
        document.getElementById('previewGreeting').style.fontSize = EditorState.greetingSize + 'px';
    });

    document.getElementById('greetingFont')?.addEventListener('change', (e) => {
        EditorState.greetingFont = e.target.value;
        document.getElementById('previewGreeting').style.fontFamily = EditorState.greetingFont;
    });

    // Дата
    document.getElementById('dateText')?.addEventListener('input', (e) => {
        EditorState.dateText = e.target.value;
        document.getElementById('previewDate').textContent = EditorState.dateText;
    });

    document.getElementById('dateSize')?.addEventListener('input', (e) => {
        EditorState.dateSize = parseInt(e.target.value);
        document.getElementById('dateSizeValue').textContent = EditorState.dateSize;
        document.getElementById('previewDate').style.fontSize = EditorState.dateSize + 'px';
    });

    document.getElementById('dateFont')?.addEventListener('change', (e) => {
        EditorState.dateFont = e.target.value;
        document.getElementById('previewDate').style.fontFamily = EditorState.dateFont;
    });

    // Время
    document.getElementById('timeText')?.addEventListener('input', (e) => {
        EditorState.timeText = e.target.value;
        document.getElementById('previewTime').textContent = EditorState.timeText;
    });

    document.getElementById('timeSize')?.addEventListener('input', (e) => {
        EditorState.timeSize = parseInt(e.target.value);
        document.getElementById('timeSizeValue').textContent = EditorState.timeSize;
        document.getElementById('previewTime').style.fontSize = EditorState.timeSize + 'px';
    });

    document.getElementById('timeFont')?.addEventListener('change', (e) => {
        EditorState.timeFont = e.target.value;
        document.getElementById('previewTime').style.fontFamily = EditorState.timeFont;
    });

    // Место
    document.getElementById('placeText')?.addEventListener('input', (e) => {
        EditorState.placeText = e.target.value;
        document.getElementById('previewPlace').textContent = EditorState.placeText;
    });

    document.getElementById('placeSize')?.addEventListener('input', (e) => {
        EditorState.placeSize = parseInt(e.target.value);
        document.getElementById('placeSizeValue').textContent = EditorState.placeSize;
        document.getElementById('previewPlace').style.fontSize = EditorState.placeSize + 'px';
    });

    document.getElementById('placeFont')?.addEventListener('change', (e) => {
        EditorState.placeFont = e.target.value;
        document.getElementById('previewPlace').style.fontFamily = EditorState.placeFont;
    });

    // Доп. текст
    document.getElementById('messageText')?.addEventListener('input', (e) => {
        EditorState.messageText = e.target.value;
        updateMessagePreview();
    });

    document.getElementById('messageSize')?.addEventListener('input', (e) => {
        EditorState.messageSize = parseInt(e.target.value);
        document.getElementById('messageSizeValue').textContent = EditorState.messageSize;
        document.getElementById('previewMessage').style.fontSize = EditorState.messageSize + 'px';
    });

    document.getElementById('messageFont')?.addEventListener('change', (e) => {
        EditorState.messageFont = e.target.value;
        document.getElementById('previewMessage').style.fontFamily = EditorState.messageFont;
    });

    document.getElementById('saveInvitationBtn')?.addEventListener('click', saveInvitation);
}

function updateMessagePreview() {
    const messageEl = document.getElementById('previewMessage');
    messageEl.innerHTML = EditorState.messageText.replace(/\n/g, '<br>');

    // Принудительно применяем стили для переноса текста
    messageEl.style.whiteSpace = 'pre-wrap';
    messageEl.style.wordWrap = 'break-word';
    messageEl.style.overflowWrap = 'break-word';
    messageEl.style.maxWidth = '100%';
}

function updateDecorLines() {
    document.querySelectorAll('.decor-line').forEach(line => {
        line.style.opacity = EditorState.showDecorLines ? '0.5' : '0';
    });
}

function updateAllText() {
    // Тип мероприятия
    document.getElementById('previewEventType').textContent = EditorState.eventType;
    document.getElementById('previewEventType').style.fontSize = EditorState.eventTypeSize + 'px';
    document.getElementById('previewEventType').style.fontWeight = EditorState.eventTypeBold ? 'bold' : 'normal';
    document.getElementById('previewEventType').style.fontStyle = EditorState.eventTypeItalic ? 'italic' : 'normal';
    document.getElementById('previewEventType').style.fontFamily = EditorState.eventTypeFont;

    // Имена
    document.getElementById('previewNames').textContent = EditorState.names;
    document.getElementById('previewNames').style.fontSize = EditorState.namesSize + 'px';
    document.getElementById('previewNames').style.fontWeight = EditorState.namesBold ? 'bold' : 'normal';
    document.getElementById('previewNames').style.fontStyle = EditorState.namesItalic ? 'italic' : 'normal';
    document.getElementById('previewNames').style.fontFamily = EditorState.namesFont;

    // Приветствие
    document.getElementById('previewGreeting').textContent = EditorState.greeting;
    document.getElementById('previewGreeting').style.fontSize = EditorState.greetingSize + 'px';
    document.getElementById('previewGreeting').style.fontWeight = EditorState.greetingBold ? 'bold' : 'normal';
    document.getElementById('previewGreeting').style.fontStyle = EditorState.greetingItalic ? 'italic' : 'normal';
    document.getElementById('previewGreeting').style.fontFamily = EditorState.greetingFont;

    // Дата
    document.getElementById('previewDate').textContent = EditorState.dateText;
    document.getElementById('previewDate').style.fontSize = EditorState.dateSize + 'px';
    document.getElementById('previewDate').style.fontWeight = EditorState.dateBold ? 'bold' : 'normal';
    document.getElementById('previewDate').style.fontStyle = EditorState.dateItalic ? 'italic' : 'normal';
    document.getElementById('previewDate').style.fontFamily = EditorState.dateFont;

    // Время
    document.getElementById('previewTime').textContent = EditorState.timeText;
    document.getElementById('previewTime').style.fontSize = EditorState.timeSize + 'px';
    document.getElementById('previewTime').style.fontWeight = EditorState.timeBold ? 'bold' : 'normal';
    document.getElementById('previewTime').style.fontStyle = EditorState.timeItalic ? 'italic' : 'normal';
    document.getElementById('previewTime').style.fontFamily = EditorState.timeFont;

    // Место
    document.getElementById('previewPlace').textContent = EditorState.placeText;
    document.getElementById('previewPlace').style.fontSize = EditorState.placeSize + 'px';
    document.getElementById('previewPlace').style.fontWeight = EditorState.placeBold ? 'bold' : 'normal';
    document.getElementById('previewPlace').style.fontStyle = EditorState.placeItalic ? 'italic' : 'normal';
    document.getElementById('previewPlace').style.fontFamily = EditorState.placeFont;

    // Доп. текст
    updateMessagePreview();

    // Обновляем значения в интерфейсе
    document.getElementById('eventTypeSizeValue').textContent = EditorState.eventTypeSize;
    document.getElementById('namesSizeValue').textContent = EditorState.namesSize;
    document.getElementById('greetingSizeValue').textContent = EditorState.greetingSize;
    document.getElementById('dateSizeValue').textContent = EditorState.dateSize;
    document.getElementById('timeSizeValue').textContent = EditorState.timeSize;
    document.getElementById('placeSizeValue').textContent = EditorState.placeSize;
    document.getElementById('messageSizeValue').textContent = EditorState.messageSize;

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
        const rgb = hexToRgb(EditorState.containerBgColor);
        card.style.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${EditorState.containerBgOpacity})`;
        card.style.color = EditorState.textColor;
    }

    updateAllText();
    applyMobileScale();
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

    function switchToTab(tabName) {
        activeTab = tabName;
        document.querySelectorAll('.mobile-tab').forEach(t => t.classList.remove('active'));

        if (tabName === 'settings') {
            document.querySelector('.mobile-tab[data-tab="settings"]').classList.add('active');
            sidebar.classList.remove('hidden');
            preview.classList.add('hidden');
        } else {
            document.querySelector('.mobile-tab[data-tab="preview"]').classList.add('active');
            sidebar.classList.add('hidden');
            preview.classList.remove('hidden');
            setTimeout(applyMobileScale, 50);
        }
    }

    isMobileView = window.innerWidth <= 768;

    if (isMobileView) {
        switchToTab('settings');
        fixMobileTabsPosition();
    }

    document.querySelectorAll('.mobile-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            switchToTab(tabName);
        });
    });

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            isMobileView = window.innerWidth <= 768;
            if (isMobileView) {
                const activeTab = document.querySelector('.mobile-tab.active');
                if (activeTab) {
                    switchToTab(activeTab.dataset.tab);
                }
                fixMobileTabsPosition();
            } else {
                sidebar.classList.remove('hidden');
                preview.classList.remove('hidden');
                activeTab = 'settings';
            }
            applyMobileScale();
        }, 150);
    });
}

function initColorPresets() {
    // Цвета рамки
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

    // Цвета внутреннего фона
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

    // Цвет текста
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

async function saveInvitation() {
    const slug = document.getElementById('customSlug')?.value.trim();

    if (!slug) {
        alert('Введите ссылку');
        return;
    }

    if (!/^[a-z0-9-]+$/.test(slug)) {
        alert('Только латинские буквы, цифры и дефисы');
        return;
    }

    const btn = document.getElementById('saveInvitationBtn');
    const originalText = btn.textContent;
    btn.textContent = 'Сохранение...';
    btn.disabled = true;

    try {
        const existing = await db.collection('invitations')
            .where('slug', '==', slug)
            .get();

        if (!existing.empty) {
            alert('Эта ссылка уже занята. Придумайте другую');
            btn.textContent = originalText;
            btn.disabled = false;
            return;
        }

        const invitationData = {
            slug: slug,
            pattern: EditorState.pattern,
            bgOpacity: EditorState.bgOpacity,
            borderColor: EditorState.borderColor,
            borderWidth: EditorState.borderWidth,
            borderRadius: EditorState.borderRadius,
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
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        await db.collection('invitations').add(invitationData);

        window.location.href = `/invitation/#${slug}`;

    } catch (error) {
        console.error('Save error:', error);
        alert('Ошибка при сохранении: ' + error.message);
        btn.textContent = originalText;
        btn.disabled = false;
    }
}