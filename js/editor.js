const EditorState = {
    pattern: 'abstract-1.jpg',
    bgOpacity: 0.2,
    borderColor: '#D4AF37',
    borderWidth: 2,
    borderRadius: 30,
    containerBgColor: '#FFFFFF',
    containerBgOpacity: 0.95,
    eventType: 'Свадебное приглашение',
    names: 'Александр & Елена',
    greeting: 'приглашают вас разделить с ними радость',
    dateText: '15 июня 2026',
    timeText: 'в 16:00',
    placeText: 'ЗАГС, г. Москва',
    messageText: 'Программа:\n1. Сбор гостей - 15:00\n2. Церемония - 16:00\n3. Фуршет - 17:00\n4. Танцы - 18:00',
    fontNames: "'Great Vibes', cursive",
    namesSize: 48,
    textColor: '#475569',
    textAlign: 'center',
    showDecorLines: true,
    decor: [],
    nextDecorId: 1
};

const patterns = [
    { id: 'abstract-1', file: '123.jpg' },
    { id: 'abstract-2', file: 'wedding-watercolor.png' },
    { id: 'wedding', file: 'wedding-royal.png' },
    { id: 'birthday', file: 'wedding-rose.png' },
    { id: 'corporate', file: 'corporate-pattern.jpg' },
    { id: 'floral', file: 'floral-pattern.jpg' }
];

const decorItems = [
    { id: 'rings', file: 'rings_1.png', name: 'Кольца' },
    { id: 'hearts', file: 'flower_1.png', name: 'Сердечки' },
    { id: 'stars', file: 'rings_2.png', name: 'Звезды' },
    { id: 'flowers', file: 'wedding_1.png', name: 'Цветы' },
    { id: 'balloons', file: 'hearth_1.png', name: 'Шарики' },
    { id: 'cake', file: 'black_wedding_1.png', name: 'Торт' }
];

let selectedDecorId = null;
let isDragging = false;
let isResizing = false;
let isRotating = false;
let dragOffset = { x: 0, y: 0 };
let startDecorState = {};
let activeAccordion = null;

document.addEventListener('DOMContentLoaded', () => {
    const previewCard = document.getElementById('previewCard');
    if (previewCard) {
        previewCard.style.position = 'relative';
    }
    initPatternGrid();
    initDecorGrid();
    initEventListeners();
    initGlobalEvents();
    initMobileTabs();
    initColorPresets();
    initMobileDecor();
    initAccordion();
    updatePreview();
    updateAllText();
    initMobileMenu();
});

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
            }
        });

        document.querySelectorAll('#navLinks a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
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
             style="background-image: url('../images/patterns/${p.file}')">
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

function initDecorGrid() {
    const grid = document.getElementById('decorGrid');
    if (!grid) return;

    grid.innerHTML = decorItems.map(d => `
        <div class="decor-item" data-decor="${d.file}" data-name="${d.name}">
            <img src="../images/decor/${d.file}" alt="${d.name}">
        </div>
    `).join('');

    grid.querySelectorAll('.decor-item').forEach(item => {
        item.addEventListener('click', () => {
            const decorFile = item.dataset.decor;
            const decorName = item.dataset.name;
            addDecor(decorFile, decorName);
        });
    });
}

function addDecor(file, name) {
    const containerRect = document.getElementById('previewCard').getBoundingClientRect();
    const centerX = containerRect.width / 2;
    const centerY = containerRect.height / 2;

    const id = EditorState.nextDecorId++;

    EditorState.decor.push({
        id: id,
        file: file,
        name: name,
        x: centerX,
        y: centerY,
        width: 80,
        height: 80,
        rotation: 0
    });

    renderDecor();
    selectDecor(id);
}

function renderDecor() {
    const layer = document.getElementById('decorLayer');
    if (!layer) return;

    layer.innerHTML = EditorState.decor.map(d => {
        const isSelected = selectedDecorId === d.id;
        return `
        <div class="decor-element ${isSelected ? 'selected' : ''}" 
             data-id="${d.id}"
             style="
                position: absolute;
                left: ${d.x - d.width / 2}px;
                top: ${d.y - d.height / 2}px;
                width: ${d.width}px;
                height: ${d.height}px;
                transform: rotate(${d.rotation || 0}deg);
                cursor: move;
                z-index: ${isSelected ? 1000 : 10};
                user-select: none;
                touch-action: none;
                -webkit-tap-highlight-color: transparent;
             ">
            <img src="../images/decor/${d.file}" draggable="false" style="
                width: 100%;
                height: 100%;
                object-fit: contain;
                pointer-events: none;
                user-select: none;
            ">
            ${isSelected ? `
                <div class="decor-resize" style="
                    position: absolute;
                    bottom: -10px;
                    right: -10px;
                    width: 20px;
                    height: 20px;
                    background: white;
                    border: 2px solid #D4AF37;
                    border-radius: 50%;
                    cursor: se-resize;
                    z-index: 1001;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
                    pointer-events: all;
                "></div>
                <div class="decor-rotate" style="
                    position: absolute;
                    top: -30px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 30px;
                    height: 30px;
                    background: white;
                    border: 2px solid #D4AF37;
                    border-radius: 50%;
                    cursor: grab;
                    z-index: 1001;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 18px;
                    color: #D4AF37;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
                    pointer-events: all;
                ">↻</div>
            ` : ''}
        </div>
    `}).join('');
}

function attachDecorEvents() {
    document.querySelectorAll('.decor-element').forEach(el => {
        const id = parseInt(el.dataset.id);

        el.addEventListener('click', (e) => {
            e.stopPropagation();
            selectDecor(id);
        });

        el.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('decor-resize') || e.target.classList.contains('decor-rotate')) return;
            e.preventDefault();
            startDrag(e, id);
        });

        el.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (e.target.classList.contains('decor-resize')) {
                startResize(e.touches[0], id);
            } else if (e.target.classList.contains('decor-rotate')) {
                startRotate(e.touches[0], id);
            } else {
                startDrag(e.touches[0], id);
            }
        }, { passive: false });

        const resizeHandle = el.querySelector('.decor-resize');
        if (resizeHandle) {
            resizeHandle.addEventListener('mousedown', (e) => {
                e.preventDefault();
                startResize(e, id);
            });
        }

        const rotateHandle = el.querySelector('.decor-rotate');
        if (rotateHandle) {
            rotateHandle.addEventListener('mousedown', (e) => {
                e.preventDefault();
                startRotate(e, id);
            });
        }
    });
}

function startDrag(e, id) {
    isDragging = true;
    selectDecor(id);

    const el = document.querySelector(`.decor-element[data-id="${id}"]`);
    const rect = el.getBoundingClientRect();
    const containerRect = document.getElementById('previewCard').getBoundingClientRect();

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    dragOffset.x = e.clientX - centerX;
    dragOffset.y = e.clientY - centerY;

    el.style.cursor = 'grabbing';
    el.style.transition = 'none';
}

function startResize(e, id) {
    isResizing = true;
    selectDecor(id);

    const decor = EditorState.decor.find(d => d.id === id);
    startDecorState = {
        width: decor.width,
        x: e.clientX
    };
}

function startRotate(e, id) {
    isRotating = true;
    selectDecor(id);

    const el = document.querySelector(`.decor-element[data-id="${id}"]`);
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const decor = EditorState.decor.find(d => d.id === id);
    startDecorState = {
        rotation: decor.rotation || 0,
        startAngle: Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180 / Math.PI,
        centerX, centerY
    };
}

function initGlobalEvents() {
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', stopInteraction);

    document.addEventListener('touchmove', (e) => {
        if (isDragging || isResizing || isRotating) {
            e.preventDefault();
            handleMove(e.touches[0]);
        }
    }, { passive: false });

    document.addEventListener('touchend', stopInteraction);
    document.addEventListener('touchcancel', stopInteraction);

    // Клавиатура
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Delete' && selectedDecorId) {
            deleteSelectedDecor();
        }
    });
}

function handleMove(e) {
    if (!e) return;
    const clientX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const clientY = e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
    if (!clientX && !clientY) return;
    if (isDragging && selectedDecorId) {
        e.preventDefault();

        const containerRect = document.getElementById('previewCard').getBoundingClientRect();
        let newCenterX = e.clientX - containerRect.left - dragOffset.x;
        let newCenterY = e.clientY - containerRect.top - dragOffset.y;

        const decor = EditorState.decor.find(d => d.id === selectedDecorId);
        if (decor) {
            newCenterX = Math.max(decor.width / 2, Math.min(containerRect.width - decor.width / 2, newCenterX));
            newCenterY = Math.max(decor.height / 2, Math.min(containerRect.height - decor.height / 2, newCenterY));

            decor.x = newCenterX;
            decor.y = newCenterY;

            const el = document.querySelector(`.decor-element[data-id="${selectedDecorId}"]`);
            if (el) {
                el.style.left = (decor.x - decor.width / 2) + 'px';
                el.style.top = (decor.y - decor.height / 2) + 'px';
            }
        }
    }

    if (isResizing && selectedDecorId) {
        e.preventDefault();

        const dx = e.clientX - startDecorState.x;
        const newSize = Math.min(500, Math.max(30, startDecorState.width + dx));

        const decor = EditorState.decor.find(d => d.id === selectedDecorId);
        if (decor) {
            decor.width = newSize;
            decor.height = newSize;

            const el = document.querySelector(`.decor-element[data-id="${selectedDecorId}"]`);
            if (el) {
                el.style.width = newSize + 'px';
                el.style.height = newSize + 'px';
                el.style.left = (decor.x - newSize / 2) + 'px';
                el.style.top = (decor.y - newSize / 2) + 'px';
            }

            const sizeInput = document.getElementById('decorSize');
            const sizeValue = document.getElementById('decorSizeValue');
            if (sizeInput) sizeInput.value = newSize;
            if (sizeValue) sizeValue.textContent = newSize;
        }
    }

    if (isRotating && selectedDecorId) {
        e.preventDefault();

        const decor = EditorState.decor.find(d => d.id === selectedDecorId);
        const containerRect = document.getElementById('previewCard').getBoundingClientRect();
        const el = document.querySelector(`.decor-element[data-id="${selectedDecorId}"]`);

        if (decor && el) {
            const centerX = containerRect.left + decor.x;
            const centerY = containerRect.top + decor.y;

            const currentAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180 / Math.PI;
            const deltaAngle = currentAngle - startDecorState.startAngle;

            decor.rotation = startDecorState.rotation + deltaAngle;
            el.style.transform = `rotate(${decor.rotation}deg)`;
        }
    }
}

function stopInteraction() {
    if (isDragging || isResizing || isRotating) {
        isDragging = false;
        isResizing = false;
        isRotating = false;

        const el = document.querySelector(`.decor-element[data-id="${selectedDecorId}"]`);
        if (el) {
            el.style.cursor = 'move';
            el.style.transition = '';
        }
    }
}

function selectDecor(id) {
    if (selectedDecorId === id) return;

    selectedDecorId = id;

    const decor = EditorState.decor.find(d => d.id === id);
    if (decor) {
        const info = document.getElementById('selectedDecorInfo');
        if (info) info.style.display = 'block';

        const nameSpan = document.getElementById('selectedDecorName');
        if (nameSpan) nameSpan.textContent = decor.name;

        const sizeInput = document.getElementById('decorSize');
        const sizeValue = document.getElementById('decorSizeValue');
        if (sizeInput) sizeInput.value = decor.width;
        if (sizeValue) sizeValue.textContent = decor.width;
    }

    renderDecor();
}

function deleteSelectedDecor() {
    if (selectedDecorId) {
        EditorState.decor = EditorState.decor.filter(d => d.id !== selectedDecorId);
        selectedDecorId = null;

        const info = document.getElementById('selectedDecorInfo');
        if (info) info.style.display = 'none';

        renderDecor();
    }
}

function initEventListeners() {
    document.getElementById('bgOpacity')?.addEventListener('input', (e) => {
        EditorState.bgOpacity = parseFloat(e.target.value);
        document.getElementById('bgOpacityValue').textContent = EditorState.bgOpacity.toFixed(2);
        updatePreview();
    });

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

    document.getElementById('containerBgColor')?.addEventListener('input', (e) => {
        EditorState.containerBgColor = e.target.value;
        updatePreview();
    });

    document.getElementById('containerBgOpacity')?.addEventListener('input', (e) => {
        EditorState.containerBgOpacity = parseFloat(e.target.value);
        document.getElementById('containerBgOpacityValue').textContent = EditorState.containerBgOpacity.toFixed(2);
        updatePreview();
    });

    document.getElementById('eventType')?.addEventListener('input', (e) => {
        EditorState.eventType = e.target.value;
        document.getElementById('previewEventType').textContent = EditorState.eventType;
    });

    document.getElementById('names')?.addEventListener('input', (e) => {
        EditorState.names = e.target.value;
        document.getElementById('previewNames').textContent = EditorState.names;
    });

    document.getElementById('greeting')?.addEventListener('input', (e) => {
        EditorState.greeting = e.target.value;
        document.getElementById('previewGreeting').textContent = EditorState.greeting;
    });

    document.getElementById('dateText')?.addEventListener('input', (e) => {
        EditorState.dateText = e.target.value;
        document.getElementById('previewDate').textContent = EditorState.dateText;
    });

    document.getElementById('timeText')?.addEventListener('input', (e) => {
        EditorState.timeText = e.target.value;
        document.getElementById('previewTime').textContent = EditorState.timeText;
    });

    document.getElementById('placeText')?.addEventListener('input', (e) => {
        EditorState.placeText = e.target.value;
        document.getElementById('previewPlace').textContent = EditorState.placeText;
    });

    document.getElementById('messageText')?.addEventListener('input', (e) => {
        EditorState.messageText = e.target.value;
        document.getElementById('previewMessage').innerHTML = e.target.value.replace(/\n/g, '<br>');
    });

    document.getElementById('fontNames')?.addEventListener('change', (e) => {
        EditorState.fontNames = e.target.value;
        updatePreview();
    });

    document.getElementById('namesSize')?.addEventListener('input', (e) => {
        EditorState.namesSize = parseInt(e.target.value);
        document.getElementById('namesSizeValue').textContent = EditorState.namesSize;
        updatePreview();
    });

    document.getElementById('textColor')?.addEventListener('input', (e) => {
        EditorState.textColor = e.target.value;
        updatePreview();
    });

    document.getElementById('messageAlignCenter')?.addEventListener('change', (e) => {
        if (e.target.checked) {
            EditorState.textAlign = 'center';
            document.getElementById('previewMessage').style.textAlign = 'center';
            updateDecorLines();
        }
    });

    document.getElementById('messageAlignLeft')?.addEventListener('change', (e) => {
        if (e.target.checked) {
            EditorState.textAlign = 'left';
            document.getElementById('previewMessage').style.textAlign = 'left';
            updateDecorLines();
        }
    });

    document.getElementById('showDecorLines')?.addEventListener('change', (e) => {
        EditorState.showDecorLines = e.target.checked;
        updateDecorLines();
    });

    document.getElementById('decorSize')?.addEventListener('input', (e) => {
        if (selectedDecorId) {
            const size = parseInt(e.target.value);
            document.getElementById('decorSizeValue').textContent = size;

            const decor = EditorState.decor.find(d => d.id === selectedDecorId);
            if (decor) {
                decor.width = size;
                decor.height = size;

                const el = document.querySelector(`.decor-element[data-id="${selectedDecorId}"]`);
                if (el) {
                    el.style.width = size + 'px';
                    el.style.height = size + 'px';
                    el.style.left = (decor.x - size / 2) + 'px';
                    el.style.top = (decor.y - size / 2) + 'px';
                }
            }
        }
    });

    document.getElementById('deleteSelectedDecor')?.addEventListener('click', deleteSelectedDecor);
    document.getElementById('saveInvitationBtn')?.addEventListener('click', saveInvitation);
    document.getElementById('copyPreviewLink')?.addEventListener('click', copyPreviewLink);
}

function updateDecorLines() {
    document.querySelectorAll('.decor-line').forEach(line => {
        line.style.display = EditorState.showDecorLines ? 'block' : 'none';
        if (EditorState.textAlign === 'left') {
            line.style.margin = '0.5rem 0';
        } else {
            line.style.margin = '0.5rem auto';
        }
    });
}

function updateAllText() {
    document.getElementById('previewEventType').textContent = EditorState.eventType;
    document.getElementById('previewNames').textContent = EditorState.names;
    document.getElementById('previewGreeting').textContent = EditorState.greeting;
    document.getElementById('previewDate').textContent = EditorState.dateText;
    document.getElementById('previewTime').textContent = EditorState.timeText;
    document.getElementById('previewPlace').textContent = EditorState.placeText;
    document.getElementById('previewMessage').innerHTML = EditorState.messageText.replace(/\n/g, '<br>');
    updateDecorLines();
}

function updatePreview() {
    const bgLayer = document.getElementById('previewBgLayer');
    if (bgLayer) {
        bgLayer.style.backgroundImage = `url('../images/patterns/${EditorState.pattern}')`;
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

    const namesEl = document.getElementById('previewNames');
    if (namesEl) {
        namesEl.style.fontFamily = EditorState.fontNames;
        namesEl.style.fontSize = `${EditorState.namesSize}px`;
    }

    updateDecorLines();
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

    if (window.innerWidth <= 768) {
        preview.classList.add('hidden');
        sidebar.classList.remove('hidden');
    }

    document.querySelectorAll('.mobile-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;

            document.querySelectorAll('.mobile-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            if (tabName === 'settings') {
                sidebar.classList.remove('hidden');
                preview.classList.add('hidden');
            } else {
                sidebar.classList.add('hidden');
                preview.classList.remove('hidden');
            }
        });
    });
}

function initMobileDecor() {
    // Добавляем обработчики для мобильных устройств
    if (window.innerWidth > 768) return;

    const previewContainer = document.getElementById('previewContainer');
    const previewCard = document.getElementById('previewCard');

    if (!previewContainer || !previewCard) return;

    // Делаем контейнер preview доступным для touch-событий
    previewContainer.style.touchAction = 'none';
    previewCard.style.touchAction = 'none';

    // Обработчик touchstart на контейнере
    previewContainer.addEventListener('touchstart', (e) => {
        const decorElement = e.target.closest('.decor-element');

        if (decorElement) {
            e.preventDefault();
            e.stopPropagation();

            const id = parseInt(decorElement.dataset.id);
            selectDecor(id);

            // Определяем тип действия
            if (e.target.classList.contains('decor-resize')) {
                startResize(e.touches[0], id);
            } else if (e.target.classList.contains('decor-rotate')) {
                startRotate(e.touches[0], id);
            } else {
                startDrag(e.touches[0], id);
            }
        }
    }, { passive: false });

    // Глобальные обработчики для перемещения
    document.addEventListener('touchmove', (e) => {
        if (isDragging || isResizing || isRotating) {
            e.preventDefault();

            const touch = e.touches[0];
            if (!touch) return;

            if (isDragging && selectedDecorId) {
                const containerRect = previewCard.getBoundingClientRect();
                let newCenterX = touch.clientX - containerRect.left - dragOffset.x;
                let newCenterY = touch.clientY - containerRect.top - dragOffset.y;

                const decor = EditorState.decor.find(d => d.id === selectedDecorId);
                if (decor) {
                    // Ограничиваем перемещение
                    newCenterX = Math.max(decor.width / 2, Math.min(containerRect.width - decor.width / 2, newCenterX));
                    newCenterY = Math.max(decor.height / 2, Math.min(containerRect.height - decor.height / 2, newCenterY));

                    decor.x = newCenterX;
                    decor.y = newCenterY;

                    const el = document.querySelector(`.decor-element[data-id="${selectedDecorId}"]`);
                    if (el) {
                        el.style.left = (decor.x - decor.width / 2) + 'px';
                        el.style.top = (decor.y - decor.height / 2) + 'px';
                    }
                }
            }

            if (isResizing && selectedDecorId) {
                const dx = touch.clientX - startDecorState.x;
                const newSize = Math.min(500, Math.max(30, startDecorState.width + dx));

                const decor = EditorState.decor.find(d => d.id === selectedDecorId);
                if (decor) {
                    decor.width = newSize;
                    decor.height = newSize;

                    const el = document.querySelector(`.decor-element[data-id="${selectedDecorId}"]`);
                    if (el) {
                        el.style.width = newSize + 'px';
                        el.style.height = newSize + 'px';
                        el.style.left = (decor.x - newSize / 2) + 'px';
                        el.style.top = (decor.y - newSize / 2) + 'px';
                    }

                    const sizeInput = document.getElementById('decorSize');
                    const sizeValue = document.getElementById('decorSizeValue');
                    if (sizeInput) sizeInput.value = newSize;
                    if (sizeValue) sizeValue.textContent = newSize;
                }
            }

            if (isRotating && selectedDecorId) {
                const decor = EditorState.decor.find(d => d.id === selectedDecorId);
                const containerRect = previewCard.getBoundingClientRect();
                const el = document.querySelector(`.decor-element[data-id="${selectedDecorId}"]`);

                if (decor && el) {
                    const centerX = containerRect.left + decor.x;
                    const centerY = containerRect.top + decor.y;

                    const currentAngle = Math.atan2(touch.clientY - centerY, touch.clientX - centerX) * 180 / Math.PI;
                    const deltaAngle = currentAngle - startDecorState.startAngle;

                    decor.rotation = startDecorState.rotation + deltaAngle;
                    el.style.transform = `rotate(${decor.rotation}deg)`;
                }
            }
        }
    }, { passive: false });

    document.addEventListener('touchend', (e) => {
        if (isDragging || isResizing || isRotating) {
            e.preventDefault();
            isDragging = false;
            isResizing = false;
            isRotating = false;

            const el = document.querySelector(`.decor-element[data-id="${selectedDecorId}"]`);
            if (el) {
                el.style.cursor = 'move';
                el.style.transition = '';
            }
        }
    });

    document.addEventListener('touchcancel', (e) => {
        if (isDragging || isResizing || isRotating) {
            e.preventDefault();
            isDragging = false;
            isResizing = false;
            isRotating = false;
        }
    });
}

function initColorPresets() {
    document.querySelectorAll('#borderColorPresets .color-preset').forEach(preset => {
        preset.addEventListener('click', () => {
            const color = preset.dataset.color;
            document.getElementById('borderColor').value = color;
            EditorState.borderColor = color;
            updatePreview();

            document.querySelectorAll('#borderColorPresets .color-preset').forEach(p => p.classList.remove('selected'));
            preset.classList.add('selected');
        });
    });

    document.querySelectorAll('#containerBgColorPresets .color-preset').forEach(preset => {
        preset.addEventListener('click', () => {
            const color = preset.dataset.color;
            document.getElementById('containerBgColor').value = color;
            EditorState.containerBgColor = color;
            updatePreview();

            document.querySelectorAll('#containerBgColorPresets .color-preset').forEach(p => p.classList.remove('selected'));
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
    btn.textContent = 'Сохранение...';
    btn.disabled = true;

    try {
        const existing = await db.collection('invitations')
            .where('slug', '==', slug)
            .get();

        if (!existing.empty) {
            alert('Ссылка занята');
            btn.textContent = 'Сохранить';
            btn.disabled = false;
            return;
        }

        const invitationData = {
            slug: slug,
            ...EditorState,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        await db.collection('invitations').add(invitationData);
        window.location.href = `/invitation/#${slug}`;

    } catch (error) {
        console.error('Save error:', error);
        alert('Ошибка');
        btn.textContent = 'Сохранить';
        btn.disabled = false;
    }
}

function copyPreviewLink() {
    const slug = document.getElementById('customSlug')?.value || 'preview';
    const url = `${window.location.origin}/invitation/#${slug}`;
    navigator.clipboard.writeText(url);
    alert('Ссылка скопирована');
}