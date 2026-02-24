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
    { id: 'abstract-1', file: 'wedding-classic.png' },
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
let touchStartTime = 0;
let lastTouchPosition = { x: 0, y: 0 };

document.addEventListener('DOMContentLoaded', () => {
    initPatternGrid();
    initDecorGrid();
    initEventListeners();
    initGlobalEvents();
    initMobileTabs();
    initColorPresets();
    initAccordion();
    initMobileMenu();
    updatePreview();
    updateAllText();

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            renderDecor();
        }, 100);
    });
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

function initDecorGrid() {
    const grid = document.getElementById('decorGrid');
    if (!grid) return;

    grid.innerHTML = decorItems.map(d => `
        <div class="decor-item" data-decor="${d.file}" data-name="${d.name}">
            <img src="/images/decor/${d.file}" alt="${d.name}">
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
    const id = EditorState.nextDecorId++;

    EditorState.decor.push({
        id: id,
        file: file,
        name: name,
        x: 50,
        y: 50,
        width: 80,
        height: 80,
        rotation: 0
    });

    renderDecor();
    selectDecor(id);
}

function renderDecor() {
    const layer = document.getElementById('decorLayer');
    const card = document.getElementById('previewCard');
    if (!layer || !card) return;

    layer.innerHTML = EditorState.decor.map(d => {
        const isSelected = selectedDecorId === d.id;

        return `
        <div class="decor-element ${isSelected ? 'selected' : ''}" 
             data-id="${d.id}"
             data-width="${d.width}"
             data-height="${d.height}"
             style="
                position: absolute;
                left: ${d.x}%;
                top: ${d.y}%;
                width: ${d.width}px;
                height: ${d.height}px;
                transform: translate(-50%, -50%) rotate(${d.rotation || 0}deg);
                cursor: move;
                z-index: ${isSelected ? 1000 : 10};
                user-select: none;
                touch-action: none;
                -webkit-tap-highlight-color: transparent;
             ">
            <img src="/images/decor/${d.file}" draggable="false" style="
                width: 100%;
                height: 100%;
                object-fit: contain;
                pointer-events: none;
                user-select: none;
            ">
            ${isSelected ? `
                <div class="decor-resize"></div>
                <div class="decor-rotate">↻</div>
            ` : ''}
        </div>
    `}).join('');

    attachDecorEvents();
}

function attachDecorEvents() {
    document.querySelectorAll('.decor-element').forEach(el => {
        const id = parseInt(el.dataset.id);

        el.addEventListener('click', (e) => {
            e.stopPropagation();
            selectDecor(id);
        });

        // Mouse events for desktop
        el.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('decor-resize') || e.target.classList.contains('decor-rotate')) return;
            e.preventDefault();
            startDrag(e, id);
        });

        // Touch events for mobile
        el.addEventListener('touchstart', (e) => {
            e.preventDefault();
            touchStartTime = Date.now();
            const touch = e.touches[0];
            lastTouchPosition = { x: touch.clientX, y: touch.clientY };

            if (e.target.classList.contains('decor-resize')) {
                startResize(touch, id);
            } else if (e.target.classList.contains('decor-rotate')) {
                startRotate(touch, id);
            } else {
                startDrag(touch, id);
            }
        }, { passive: false });

        el.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (!isDragging && !isResizing && !isRotating) return;
            
            const touch = e.touches[0];
            const deltaX = Math.abs(touch.clientX - lastTouchPosition.x);
            const deltaY = Math.abs(touch.clientY - lastTouchPosition.y);
            
            // Если движение значительное, предотвращаем скролл
            if (deltaX > 5 || deltaY > 5) {
                e.preventDefault();
            }
            
            lastTouchPosition = { x: touch.clientX, y: touch.clientY };
            
            if (isDragging) handleDrag(touch, id);
            else if (isResizing) handleResize(touch, id);
            else if (isRotating) handleRotate(touch, id);
            
        }, { passive: false });

        el.addEventListener('touchend', (e) => {
            e.preventDefault();
            const touchEndTime = Date.now();
            
            // Если это было быстрое касание (тап), не останавливаем взаимодействие
            if (touchEndTime - touchStartTime < 200 && !isDragging && !isResizing && !isRotating) {
                selectDecor(id);
            }
            
            stopInteraction();
        }, { passive: false });

        const resizeHandle = el.querySelector('.decor-resize');
        if (resizeHandle) {
            resizeHandle.addEventListener('mousedown', (e) => {
                e.preventDefault();
                startResize(e, id);
            });

            resizeHandle.addEventListener('touchstart', (e) => {
                e.preventDefault();
                startResize(e.touches[0], id);
            }, { passive: false });
        }

        const rotateHandle = el.querySelector('.decor-rotate');
        if (rotateHandle) {
            rotateHandle.addEventListener('mousedown', (e) => {
                e.preventDefault();
                startRotate(e, id);
            });

            rotateHandle.addEventListener('touchstart', (e) => {
                e.preventDefault();
                startRotate(e.touches[0], id);
            }, { passive: false });
        }
    });
}

function startDrag(e, id) {
    e.preventDefault();
    isDragging = true;
    selectDecor(id);

    const card = document.getElementById('previewCard');
    const cardRect = card.getBoundingClientRect();
    const decor = EditorState.decor.find(d => d.id === id);
    
    // Вычисляем центр элемента в пикселях
    const centerX = (decor.x / 100) * cardRect.width;
    const centerY = (decor.y / 100) * cardRect.height;

    dragOffset.x = e.clientX - (cardRect.left + centerX);
    dragOffset.y = e.clientY - (cardRect.top + centerY);

    const el = document.querySelector(`.decor-element[data-id="${id}"]`);
    if (el) {
        el.style.cursor = 'grabbing';
        el.style.transition = 'none';
    }
}

function startResize(e, id) {
    e.preventDefault();
    isResizing = true;
    selectDecor(id);

    const decor = EditorState.decor.find(d => d.id === id);
    startDecorState = {
        width: decor.width,
        x: e.clientX,
        y: e.clientY
    };
}

function startRotate(e, id) {
    e.preventDefault();
    isRotating = true;
    selectDecor(id);

    const card = document.getElementById('previewCard');
    const cardRect = card.getBoundingClientRect();
    const decor = EditorState.decor.find(d => d.id === id);

    // Вычисляем центр элемента
    const centerX = cardRect.left + (decor.x / 100) * cardRect.width;
    const centerY = cardRect.top + (decor.y / 100) * cardRect.height;

    startDecorState = {
        rotation: decor.rotation || 0,
        startAngle: Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180 / Math.PI,
        centerX,
        centerY
    };
}

function handleDrag(e, id) {
    if (!isDragging || !selectedDecorId) return;

    const card = document.getElementById('previewCard');
    const cardRect = card.getBoundingClientRect();
    const decor = EditorState.decor.find(d => d.id === id);
    if (!decor) return;

    // Вычисляем новую позицию центра
    let newCenterX = e.clientX - cardRect.left - dragOffset.x;
    let newCenterY = e.clientY - cardRect.top - dragOffset.y;

    // Конвертируем в проценты
    let newX = (newCenterX / cardRect.width) * 100;
    let newY = (newCenterY / cardRect.height) * 100;

    // Рассчитываем границы в процентах с учетом размера элемента
    const halfWidthPercent = (decor.width / 2 / cardRect.width) * 100;
    const halfHeightPercent = (decor.height / 2 / cardRect.height) * 100;

    // Ограничиваем позицию
    newX = Math.max(halfWidthPercent, Math.min(100 - halfWidthPercent, newX));
    newY = Math.max(halfHeightPercent, Math.min(100 - halfHeightPercent, newY));

    // Обновляем состояние
    decor.x = newX;
    decor.y = newY;

    // Обновляем DOM
    const el = document.querySelector(`.decor-element[data-id="${id}"]`);
    if (el) {
        el.style.left = newX + '%';
        el.style.top = newY + '%';
    }
}

function handleResize(e, id) {
    if (!isResizing || !selectedDecorId) return;

    const dx = e.clientX - startDecorState.x;
    const newSize = Math.min(500, Math.max(30, startDecorState.width + dx));

    const decor = EditorState.decor.find(d => d.id === id);
    if (decor) {
        decor.width = newSize;
        decor.height = newSize;

        const el = document.querySelector(`.decor-element[data-id="${id}"]`);
        if (el) {
            el.style.width = newSize + 'px';
            el.style.height = newSize + 'px';
            el.dataset.width = newSize;
            el.dataset.height = newSize;
        }

        const sizeInput = document.getElementById('decorSize');
        const sizeValue = document.getElementById('decorSizeValue');
        if (sizeInput) sizeInput.value = newSize;
        if (sizeValue) sizeValue.textContent = newSize;
    }
}

function handleRotate(e, id) {
    if (!isRotating || !selectedDecorId) return;

    const decor = EditorState.decor.find(d => d.id === id);
    const card = document.getElementById('previewCard');
    const cardRect = card.getBoundingClientRect();

    if (decor) {
        const centerX = cardRect.left + (decor.x / 100) * cardRect.width;
        const centerY = cardRect.top + (decor.y / 100) * cardRect.height;

        const currentAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180 / Math.PI;
        const deltaAngle = currentAngle - startDecorState.startAngle;

        decor.rotation = startDecorState.rotation + deltaAngle;
        
        const el = document.querySelector(`.decor-element[data-id="${id}"]`);
        if (el) {
            el.style.transform = `translate(-50%, -50%) rotate(${decor.rotation}deg)`;
        }
    }
}

function initGlobalEvents() {
    // Mouse events
    document.addEventListener('mousemove', (e) => {
        if (isDragging && selectedDecorId) {
            e.preventDefault();
            handleDrag(e, selectedDecorId);
        } else if (isResizing && selectedDecorId) {
            e.preventDefault();
            handleResize(e, selectedDecorId);
        } else if (isRotating && selectedDecorId) {
            e.preventDefault();
            handleRotate(e, selectedDecorId);
        }
    });

    document.addEventListener('mouseup', stopInteraction);

    // Global touch events to prevent scrolling while interacting
    document.addEventListener('touchmove', (e) => {
        if (isDragging || isResizing || isRotating) {
            e.preventDefault();
        }
    }, { passive: false });

    document.addEventListener('touchend', stopInteraction);
    document.addEventListener('touchcancel', stopInteraction);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Delete' && selectedDecorId) {
            deleteSelectedDecor();
        }
    });
}

function stopInteraction() {
    if (isDragging || isResizing || isRotating) {
        isDragging = false;
        isResizing = false;
        isRotating = false;

        if (selectedDecorId) {
            const el = document.querySelector(`.decor-element[data-id="${selectedDecorId}"]`);
            if (el) {
                el.style.cursor = 'move';
                el.style.transition = '';
            }
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
                    el.dataset.width = size;
                    el.dataset.height = size;
                }
            }
        }
    });

    document.getElementById('deleteSelectedDecor')?.addEventListener('click', deleteSelectedDecor);
    document.getElementById('saveInvitationBtn')?.addEventListener('click', saveInvitation);
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

    const namesEl = document.getElementById('previewNames');
    if (namesEl) {
        namesEl.style.fontFamily = EditorState.fontNames;
        namesEl.style.fontSize = `${EditorState.namesSize}px`;
    }

    updateDecorLines();
    renderDecor();
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
        document.querySelectorAll('.mobile-tab').forEach(t => t.classList.remove('active'));

        if (tabName === 'settings') {
            document.querySelector('.mobile-tab[data-tab="settings"]').classList.add('active');
            sidebar.classList.remove('hidden');
            preview.classList.add('hidden');

            setTimeout(() => {
                const sidebarContent = document.getElementById('sidebarContent');
                if (sidebarContent) {
                    sidebarContent.style.overflowY = 'auto';
                }
            }, 50);
        } else {
            document.querySelector('.mobile-tab[data-tab="preview"]').classList.add('active');
            sidebar.classList.add('hidden');
            preview.classList.remove('hidden');
            setTimeout(() => {
                renderDecor();
                const previewContainer = document.querySelector('.preview-container');
                if (previewContainer) {
                    previewContainer.style.overflowY = 'auto';
                }
            }, 100);
        }
    }

    if (window.innerWidth <= 768) {
        switchToTab('settings');
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
            if (window.innerWidth <= 768) {
                const activeTab = document.querySelector('.mobile-tab.active');
                if (activeTab) {
                    switchToTab(activeTab.dataset.tab);
                }
            } else {
                sidebar.classList.remove('hidden');
                preview.classList.remove('hidden');
            }
            renderDecor();
        }, 150);
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
            names: EditorState.names,
            greeting: EditorState.greeting,
            dateText: EditorState.dateText,
            timeText: EditorState.timeText,
            placeText: EditorState.placeText,
            messageText: EditorState.messageText,
            fontNames: EditorState.fontNames,
            namesSize: EditorState.namesSize,
            textColor: EditorState.textColor,
            textAlign: EditorState.textAlign,
            showDecorLines: EditorState.showDecorLines,
            decor: EditorState.decor,
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