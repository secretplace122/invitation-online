// ===== ДЕКОРАЦИИ =====

// Массив доступных декораций
const decorLibrary = [
    { id: 'decor-1', file: '1.webp', name: 'Цветок 1' },
    { id: 'decor-2', file: '2.webp', name: 'Цветок 1' },
    { id: 'decor-3', file: '3.webp', name: 'Цветок 1' },
    { id: 'decor-4', file: '4.webp', name: 'Цветок 1' },
    { id: 'decor-5', file: '5.webp', name: 'Цветок 1' },
    { id: 'decor-6', file: '6.webp', name: 'Цветок 1' },
    { id: 'decor-7', file: '7.webp', name: 'Цветок 1' },
    { id: 'decor-8', file: '8.webp', name: 'Цветок 1' },
    { id: 'decor-9', file: '9.webp', name: 'Цветок 1' },
    { id: 'decor-10', file: '10.webp', name: 'Цветок 1' },
    { id: 'decor-11', file: '11.webp', name: 'Цветок 1' },
    { id: 'decor-12', file: '12.webp', name: 'Цветок 1' },
    { id: 'decor-13', file: '13.webp', name: 'Цветок 1' },
    { id: 'decor-14', file: '14.webp', name: 'Цветок 1' },
    { id: 'decor-15', file: '15.webp', name: 'Цветок 1' },
    { id: 'decor-16', file: '16.webp', name: 'Цветок 1' },
    { id: 'decor-17', file: '17.webp', name: 'Цветок 1' },
    { id: 'decor-18', file: '18.webp', name: 'Цветок 1' },
    { id: 'decor-19', file: '19.webp', name: 'Цветок 1' },
    { id: 'decor-20', file: '20.webp', name: 'Цветок 1' },
    { id: 'decor-21', file: '21.webp', name: 'Цветок 1' },
    { id: 'decor-22', file: '22.webp', name: 'Цветок 1' },
    { id: 'decor-23', file: '23.webp', name: 'Цветок 1' },
    { id: 'decor-24', file: '24.webp', name: 'Цветок 1' },
    { id: 'decor-25', file: '25.webp', name: 'Цветок 1' },
    { id: 'decor-26', file: '26.webp', name: 'Цветок 1' },
    { id: 'decor-27', file: '27.webp', name: 'Цветок 1' },
    { id: 'decor-28', file: '28.webp', name: 'Цветок 1' },
    { id: 'decor-29', file: '29.webp', name: 'Цветок 1' },
];

// Инициализация декораций
function initDecorations() {
    if (!document.getElementById('decorLibrary')) {
        console.warn('Decor elements not found, retrying...');
        setTimeout(initDecorations, 100);
        return;
    }
    
    if (!EditorState.decorations) {
        EditorState.decorations = [];
        EditorState.activeDecorId = null;
        EditorState.clipDecorations = true;
    }
    
    renderDecorLibrary();
    renderDecorList();
    applyClipToFrame();
}

// Применение обрезки рамкой
function applyClipToFrame() {
    const card = document.getElementById('previewCard');
    if (!card) return;
    
    if (EditorState.clipDecorations) {
        card.classList.add('clip-decorations');
    } else {
        card.classList.remove('clip-decorations');
    }
}

// Отрисовка библиотеки декораций
function renderDecorLibrary() {
    const container = document.getElementById('decorLibrary');
    if (!container) return;
    
    container.innerHTML = decorLibrary.map(decor => `
        <div class="decor-library-item" 
             data-decor-id="${decor.id}"
             data-decor-file="${decor.file}"
             data-decor-name="${decor.name}"
             style="background-image: url('/images/decor/${decor.file}')"
             title="${decor.name}">
        </div>
    `).join('');
    
    container.querySelectorAll('.decor-library-item').forEach(item => {
        item.addEventListener('click', () => {
            addDecoration(item.dataset.decorId, item.dataset.decorFile, item.dataset.decorName);
        });
    });
}

// Добавление новой декорации
function addDecoration(decorId, decorFile, decorName) {
    const card = document.getElementById('previewCard');
    const cardWidth = card?.offsetWidth || 500;
    const cardHeight = card?.offsetHeight || 500;
    
    const newDecor = {
        id: 'decor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 8),
        file: decorFile,
        name: decorName,
        width: 150,
        rotation: 0,
        posX: 50,        // в процентах (единственная координата)
        posY: 50,        // в процентах (единственная координата)
        opacity: 1,
        aboveText: false,
        zIndex: 5
    };
    
    EditorState.decorations.push(newDecor);
    EditorState.activeDecorId = newDecor.id;
    
    renderDecorList();
    showDecorControls(newDecor.id);
    updatePreviewDecorations();
}

// Отрисовка списка добавленных декораций
function renderDecorList() {
    const container = document.getElementById('decorList');
    if (!container) return;
    
    if (EditorState.decorations.length === 0) {
        container.innerHTML = '<p style="color: #94a3b8; text-align: center; padding: 1rem;">Нет добавленных декораций</p>';
        document.getElementById('decorControls')?.style.setProperty('display', 'none');
        return;
    }
    
    container.innerHTML = EditorState.decorations.map(decor => {
        const isActive = decor.id === EditorState.activeDecorId;
        const decorInfo = decorLibrary.find(d => d.file === decor.file) || { name: decor.name || 'Декорация' };
        
        return `
            <div class="decor-list-item ${isActive ? 'active' : ''}" data-decor-id="${decor.id}">
                <div class="decor-list-thumb" style="background-image: url('/images/decor/${decor.file}')"></div>
                <div class="decor-list-info">${decorInfo.name}</div>
                <div class="decor-list-actions">
                    <button class="decor-list-btn rotate-left" title="Повернуть на 90°">
                        <span class="material-symbols-outlined" style="font-size: 1rem;">rotate_left</span>
                    </button>
                    <button class="decor-list-btn rotate-right" title="Повернуть на 90°">
                        <span class="material-symbols-outlined" style="font-size: 1rem;">rotate_right</span>
                    </button>
                    <button class="decor-list-btn delete" title="Удалить">
                        <span class="material-symbols-outlined" style="font-size: 1rem;">delete</span>
                    </button>
                </div>
            </div>
        `;
    }).join('');
    
    container.querySelectorAll('.decor-list-item').forEach(item => {
        const decorId = item.dataset.decorId;
        
        item.addEventListener('click', (e) => {
            if (!e.target.closest('.decor-list-btn')) {
                EditorState.activeDecorId = decorId;
                renderDecorList();
                showDecorControls(decorId);
            }
        });
        
        item.querySelector('.rotate-left')?.addEventListener('click', (e) => {
            e.stopPropagation();
            rotateDecoration(decorId, -90);
        });
        
        item.querySelector('.rotate-right')?.addEventListener('click', (e) => {
            e.stopPropagation();
            rotateDecoration(decorId, 90);
        });
        
        item.querySelector('.delete')?.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteDecoration(decorId);
        });
    });
}

// Поворот декорации
function rotateDecoration(decorId, angleChange) {
    const decor = EditorState.decorations.find(d => d.id === decorId);
    if (!decor) return;
    
    decor.rotation = (decor.rotation + angleChange + 360) % 360;
    
    if (decorId === EditorState.activeDecorId) {
        updateDecorControlsValues(decor);
        document.getElementById('decorAngle').textContent = decor.rotation + '°';
    }
    
    renderDecorList();
    updatePreviewDecorations();
}

// Удаление декорации
function deleteDecoration(decorId) {
    EditorState.decorations = EditorState.decorations.filter(d => d.id !== decorId);
    
    if (EditorState.activeDecorId === decorId) {
        EditorState.activeDecorId = EditorState.decorations[0]?.id || null;
        
        if (EditorState.activeDecorId) {
            showDecorControls(EditorState.activeDecorId);
        } else {
            hideDecorControls();
        }
    }
    
    renderDecorList();
    updatePreviewDecorations();
}

// Показать панель управления
function showDecorControls(decorId) {
    const controls = document.getElementById('decorControls');
    const decor = EditorState.decorations.find(d => d.id === decorId);
    
    if (!controls || !decor) return;
    
    controls.style.display = 'block';
    
    document.getElementById('decorSize').value = decor.width;
    document.getElementById('decorSizeValue').textContent = decor.width;
    
    document.getElementById('decorPosX').value = decor.posX;
    document.getElementById('decorPosXValue').textContent = decor.posX + '%';
    
    document.getElementById('decorPosY').value = decor.posY;
    document.getElementById('decorPosYValue').textContent = decor.posY + '%';
    
    document.getElementById('decorOpacity').value = decor.opacity;
    document.getElementById('decorOpacityValue').textContent = decor.opacity.toFixed(1);
    
    document.getElementById('decorAboveText').checked = decor.aboveText;
    document.getElementById('decorAngle').textContent = decor.rotation + '°';
    
    const clipCheckbox = document.getElementById('decorClipToFrame');
    if (clipCheckbox) {
        clipCheckbox.checked = EditorState.clipDecorations;
    }
    
    setupDecorControls(decorId);
    setupGlobalControls();
}

// Обновить значения в контролах
function updateDecorControlsValues(decor) {
    document.getElementById('decorSize').value = decor.width;
    document.getElementById('decorSizeValue').textContent = decor.width;
    
    document.getElementById('decorPosX').value = decor.posX;
    document.getElementById('decorPosXValue').textContent = decor.posX + '%';
    
    document.getElementById('decorPosY').value = decor.posY;
    document.getElementById('decorPosYValue').textContent = decor.posY + '%';
    
    document.getElementById('decorOpacity').value = decor.opacity;
    document.getElementById('decorOpacityValue').textContent = decor.opacity.toFixed(1);
    
    document.getElementById('decorAboveText').checked = decor.aboveText;
    document.getElementById('decorAngle').textContent = decor.rotation + '°';
}

// Настройка глобальных контролов
function setupGlobalControls() {
    const clipCheckbox = document.getElementById('decorClipToFrame');
    if (!clipCheckbox) return;
    
    clipCheckbox.removeEventListener('change', clipCheckbox._handler);
    clipCheckbox._handler = (e) => {
        EditorState.clipDecorations = e.target.checked;
        applyClipToFrame();
    };
    clipCheckbox.addEventListener('change', clipCheckbox._handler);
}

// Настройка обработчиков для панели управления
function setupDecorControls(decorId) {
    const sizeInput = document.getElementById('decorSize');
    const posXInput = document.getElementById('decorPosX');
    const posYInput = document.getElementById('decorPosY');
    const opacityInput = document.getElementById('decorOpacity');
    const aboveTextCheck = document.getElementById('decorAboveText');
    const rotateLeftBtn = document.getElementById('rotateLeft');
    const rotateRightBtn = document.getElementById('rotateRight');
    const deleteBtn = document.getElementById('deleteDecorBtn');
    
    // Удаляем старые обработчики
    sizeInput?.removeEventListener('input', sizeInput._handler);
    posXInput?.removeEventListener('input', posXInput._handler);
    posYInput?.removeEventListener('input', posYInput._handler);
    opacityInput?.removeEventListener('input', opacityInput._handler);
    aboveTextCheck?.removeEventListener('change', aboveTextCheck._handler);
    rotateLeftBtn?.removeEventListener('click', rotateLeftBtn._handler);
    rotateRightBtn?.removeEventListener('click', rotateRightBtn._handler);
    deleteBtn?.removeEventListener('click', deleteBtn._handler);
    
    // Добавляем новые обработчики
    sizeInput._handler = (e) => {
        const decor = EditorState.decorations.find(d => d.id === decorId);
        if (!decor) return;
        decor.width = parseInt(e.target.value);
        document.getElementById('decorSizeValue').textContent = decor.width;
        updatePreviewDecorations();
    };
    sizeInput.addEventListener('input', sizeInput._handler);
    
    posXInput._handler = (e) => {
        const decor = EditorState.decorations.find(d => d.id === decorId);
        if (!decor) return;
        decor.posX = parseInt(e.target.value);
        document.getElementById('decorPosXValue').textContent = decor.posX + '%';
        updatePreviewDecorations();
    };
    posXInput.addEventListener('input', posXInput._handler);
    
    posYInput._handler = (e) => {
        const decor = EditorState.decorations.find(d => d.id === decorId);
        if (!decor) return;
        decor.posY = parseInt(e.target.value);
        document.getElementById('decorPosYValue').textContent = decor.posY + '%';
        updatePreviewDecorations();
    };
    posYInput.addEventListener('input', posYInput._handler);
    
    opacityInput._handler = (e) => {
        const decor = EditorState.decorations.find(d => d.id === decorId);
        if (!decor) return;
        decor.opacity = parseFloat(e.target.value);
        document.getElementById('decorOpacityValue').textContent = decor.opacity.toFixed(1);
        updatePreviewDecorations();
    };
    opacityInput.addEventListener('input', opacityInput._handler);
    
    aboveTextCheck._handler = (e) => {
        const decor = EditorState.decorations.find(d => d.id === decorId);
        if (!decor) return;
        decor.aboveText = e.target.checked;
        decor.zIndex = decor.aboveText ? 20 : 5;
        updatePreviewDecorations();
    };
    aboveTextCheck.addEventListener('change', aboveTextCheck._handler);
    
    rotateLeftBtn._handler = () => {
        rotateDecoration(decorId, -90);
    };
    rotateLeftBtn.addEventListener('click', rotateLeftBtn._handler);
    
    rotateRightBtn._handler = () => {
        rotateDecoration(decorId, 90);
    };
    rotateRightBtn.addEventListener('click', rotateRightBtn._handler);
    
    deleteBtn._handler = () => {
        deleteDecoration(decorId);
    };
    deleteBtn.addEventListener('click', deleteBtn._handler);
}

// Скрыть панель управления
function hideDecorControls() {
    const controls = document.getElementById('decorControls');
    if (controls) {
        controls.style.display = 'none';
    }
}

// Обновление декораций на холсте
function updatePreviewDecorations() {
    const card = document.getElementById('previewCard');
    if (!card) return;
    
    const cardWidth = card.offsetWidth;
    const cardHeight = card.offsetHeight;
    
    card.querySelectorAll('.invitation-decor').forEach(el => el.remove());
    
    if (EditorState.decorations && EditorState.decorations.length > 0) {
        EditorState.decorations.forEach(decor => {
            const decorEl = document.createElement('div');
            decorEl.className = `invitation-decor ${decor.aboveText ? 'above-text' : ''}`;
            
            // Проценты напрямую дают позицию
            const posX = (decor.posX / 100) * cardWidth;
            const posY = (decor.posY / 100) * cardHeight;
            
            decorEl.style.cssText = `
                position: absolute;
                width: ${decor.width}px;
                height: ${decor.width}px;
                left: ${posX}px;
                top: ${posY}px;
                transform: translate(-50%, -50%) rotate(${decor.rotation}deg);
                background-image: url('/images/decor/${decor.file}');
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                opacity: ${decor.opacity};
                z-index: ${decor.zIndex};
                pointer-events: none;
            `;
            
            // Добавляем обработчик ошибки загрузки изображения
            decorEl.onerror = function() {
                this.style.backgroundColor = '#f0f0f0';
                this.style.backgroundImage = 'none';
                console.warn('Failed to load decor image:', decor.file);
            };
            
            card.appendChild(decorEl);
        });
    }
}

// Экспортируем API
window.decorationsAPI = {
    initDecorations,
    renderDecorLibrary,
    addDecoration,
    deleteDecoration,
    updatePreviewDecorations,
    applyClipToFrame,
    rotateDecoration
};