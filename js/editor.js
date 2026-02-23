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
    decor: [],
    nextDecorId: 1
};

const patterns = [
    { id: 'abstract-1', file: 'wedding-watercolor.png' },
    { id: 'abstract-2', file: 'abstract-2.jpg' },
    { id: 'wedding', file: 'wedding-pattern.jpg' },
    { id: 'birthday', file: 'birthday-pattern.jpg' },
    { id: 'corporate', file: 'corporate-pattern.jpg' },
    { id: 'floral', file: 'floral-pattern.jpg' }
];

const decorItems = [
    { id: 'rings', file: 'rings_1.png', name: 'Кольца' },
    { id: 'hearts', file: 'hearts.png', name: 'Сердечки' },
    { id: 'stars', file: 'stars.png', name: 'Звезды' },
    { id: 'flowers', file: 'flowers.png', name: 'Цветы' },
    { id: 'balloons', file: 'balloons.png', name: 'Шарики' },
    { id: 'cake', file: 'cake.png', name: 'Торт' }
];

let selectedDecorId = null;
let isDragging = false;
let isResizing = false;
let isRotating = false;
let dragOffset = { x: 0, y: 0 };
let startDecorState = {};

document.addEventListener('DOMContentLoaded', () => {
    initPatternGrid();
    initDecorGrid();
    initEventListeners();
    initGlobalEvents();
    updatePreview();
    updateAllText();
});

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
    const containerRect = document.getElementById('previewCard').getBoundingClientRect();

    const id = EditorState.nextDecorId++;

    EditorState.decor.push({
        id: id,
        file: file,
        name: name,
        x: containerRect.width / 2,
        y: containerRect.height / 2,
        width: 50,
        height: 50,
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
             ">
            <img src="/images/decor/${d.file}" draggable="false" style="
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

    attachDecorEvents();
}

function attachDecorEvents() {
    document.querySelectorAll('.decor-element').forEach(el => {
        const id = parseInt(el.dataset.id);

        el.addEventListener('click', (e) => {
            e.stopPropagation();
            e.preventDefault();
            selectDecor(id);
        });

        el.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('decor-resize') || e.target.classList.contains('decor-rotate')) return;

            e.preventDefault();
            e.stopPropagation();

            const rect = el.getBoundingClientRect();
            const containerRect = document.getElementById('previewCard').getBoundingClientRect();

            isDragging = true;
            selectDecor(id);

            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            dragOffset.x = e.clientX - centerX;
            dragOffset.y = e.clientY - centerY;

            el.style.cursor = 'grabbing';
            el.style.transition = 'none';
        });

        const resizeHandle = el.querySelector('.decor-resize');
        if (resizeHandle) {
            resizeHandle.addEventListener('mousedown', (e) => {
                e.preventDefault();
                e.stopPropagation();

                isResizing = true;
                selectDecor(id);

                const decor = EditorState.decor.find(d => d.id === id);
                startDecorState = {
                    width: decor.width,
                    height: decor.height,
                    x: e.clientX,
                    y: e.clientY
                };
            });
        }

        const rotateHandle = el.querySelector('.decor-rotate');
        if (rotateHandle) {
            rotateHandle.addEventListener('mousedown', (e) => {
                e.preventDefault();
                e.stopPropagation();

                isRotating = true;
                selectDecor(id);

                const rect = el.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                const decor = EditorState.decor.find(d => d.id === id);
                startDecorState = {
                    rotation: decor.rotation || 0,
                    startAngle: Math.atan2(e.clientY - centerY, e.clientX - centerX) * 180 / Math.PI,
                    centerX,
                    centerY
                };
            });
        }
    });
}

function initGlobalEvents() {
    document.addEventListener('mousemove', (e) => {
        if (isDragging && selectedDecorId) {
            e.preventDefault();

            const containerRect = document.getElementById('previewCard').getBoundingClientRect();

            let newCenterX = e.clientX - containerRect.left - dragOffset.x;
            let newCenterY = e.clientY - containerRect.top - dragOffset.y;

            const decor = EditorState.decor.find(d => d.id === selectedDecorId);
            if (decor) {
                const halfWidth = decor.width / 2;
                const halfHeight = decor.height / 2;

                newCenterX = Math.max(halfWidth + 10, Math.min(containerRect.width - halfWidth - 10, newCenterX));
                newCenterY = Math.max(halfHeight + 10, Math.min(containerRect.height - halfHeight - 10, newCenterY));

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
            const newSize = Math.min(120, Math.max(30, startDecorState.width + dx));

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

                document.getElementById('decorSize').value = newSize;
                document.getElementById('decorSizeValue').textContent = newSize;
            }
        }

        if (isRotating && selectedDecorId) {
            e.preventDefault();

            const containerRect = document.getElementById('previewCard').getBoundingClientRect();
            const decor = EditorState.decor.find(d => d.id === selectedDecorId);
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
    });

    document.addEventListener('mouseup', () => {
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
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Delete' && selectedDecorId) {
            deleteSelectedDecor();
        }
    });
}

function selectDecor(id) {
    if (selectedDecorId === id) return;

    selectedDecorId = id;

    const decor = EditorState.decor.find(d => d.id === id);
    if (decor) {
        document.getElementById('selectedDecorInfo').style.display = 'block';
        document.getElementById('selectedDecorName').textContent = decor.name;
        document.getElementById('decorSize').value = decor.width;
        document.getElementById('decorSizeValue').textContent = decor.width;
    }

    renderDecor();
}

function deleteSelectedDecor() {
    if (selectedDecorId) {
        EditorState.decor = EditorState.decor.filter(d => d.id !== selectedDecorId);
        selectedDecorId = null;
        document.getElementById('selectedDecorInfo').style.display = 'none';
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
            document.getElementById('previewMessage').style.textAlign = 'center';
        }
    });

    document.getElementById('messageAlignLeft')?.addEventListener('change', (e) => {
        if (e.target.checked) {
            document.getElementById('previewMessage').style.textAlign = 'left';
        }
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

    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.closest('.accordion-item');
            const content = item.querySelector('.accordion-content');
            const icon = header.querySelector('.material-symbols-outlined');

            if (content.style.display === 'none') {
                content.style.display = 'block';
                icon.textContent = 'expand_less';
            } else {
                content.style.display = 'none';
                icon.textContent = 'expand_more';
            }
        });
    });

    document.getElementById('saveInvitationBtn')?.addEventListener('click', saveInvitation);
    document.getElementById('copyPreviewLink')?.addEventListener('click', copyPreviewLink);
}

function updateAllText() {
    document.getElementById('previewEventType').textContent = EditorState.eventType;
    document.getElementById('previewNames').textContent = EditorState.names;
    document.getElementById('previewGreeting').textContent = EditorState.greeting;
    document.getElementById('previewDate').textContent = EditorState.dateText;
    document.getElementById('previewTime').textContent = EditorState.timeText;
    document.getElementById('previewPlace').textContent = EditorState.placeText;
    document.getElementById('previewMessage').innerHTML = EditorState.messageText.replace(/\n/g, '<br>');
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
        card.style.backgroundColor = `rgba(${hexToRgb(EditorState.containerBgColor).r}, ${hexToRgb(EditorState.containerBgColor).g}, ${hexToRgb(EditorState.containerBgColor).b}, ${EditorState.containerBgOpacity})`;
        card.style.color = EditorState.textColor;
    }

    const namesEl = document.getElementById('previewNames');
    if (namesEl) {
        namesEl.style.fontFamily = EditorState.fontNames;
        namesEl.style.fontSize = `${EditorState.namesSize}px`;
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

document.querySelectorAll('.mobile-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const tabName = tab.dataset.tab;

        document.querySelectorAll('.mobile-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        if (tabName === 'settings') {
            document.getElementById('editorSidebar').classList.remove('hidden');
            document.getElementById('editorPreview').classList.add('hidden');
        } else {
            document.getElementById('editorSidebar').classList.add('hidden');
            document.getElementById('editorPreview').classList.remove('hidden');
        }
    });
});

if (window.innerWidth <= 768) {
    document.getElementById('editorPreview').classList.add('hidden');
}
// Добавить после initEventListeners:

function initColorPresets() {
    // Цвет рамки
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

    // Цвет внутреннего фона
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

// Мобильное переключение вкладок
function initMobileTabs() {
    const mobileTabs = document.getElementById('mobileTabs');
    const sidebar = document.getElementById('editorSidebar');
    const preview = document.getElementById('editorPreview');

    if (!mobileTabs || !sidebar || !preview) return;

    // При загрузке показываем настройки на мобильных
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

// Адаптация декораций для мобильных
function initMobileDecor() {
    if (window.innerWidth > 768) return;

    // Добавляем touch-события для декораций
    document.addEventListener('touchstart', (e) => {
        const decorElement = e.target.closest('.decor-element');
        if (!decorElement) return;

        const id = parseInt(decorElement.dataset.id);
        selectDecor(id);

        if (e.target.classList.contains('decor-resize')) {
            // Логика ресайза для тача
            startResize(e.touches[0]);
        } else if (e.target.classList.contains('decor-rotate')) {
            // Логика поворота для тача
            startRotate(e.touches[0]);
        } else {
            // Логика перетаскивания для тача
            startDrag(e.touches[0]);
        }
    }, { passive: false });
}

// Вызвать новые функции в DOMContentLoaded
// Добавить в конец функции:
initColorPresets();
initMobileTabs();
initMobileDecor();