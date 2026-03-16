let mobileDecorPanel = null;
let currentDecorFilter = 'all';

window.decorLibrary = [
    { id: 'decor-1', file: 'bd1.webp', name: 'Подарки с шарами 1', category: 'party' },
    { id: 'decor-2', file: 'bd2.webp', name: 'Подарки с шарами 2', category: 'party' },
    { id: 'decor-3', file: 'bd3.webp', name: 'Шары 1', category: 'party' },
    { id: 'decor-4', file: 'bd4.webp', name: 'Шары 2', category: 'party' },
    { id: 'decor-5', file: 'bd5.webp', name: 'Шары 3', category: 'party' },
    { id: 'decor-6', file: 'bd6.webp', name: 'Шары 4', category: 'party' },
    { id: 'decor-7', file: 'bd7.webp', name: 'Шары 5', category: 'party' },
    { id: 'decor-8', file: 'flower1.webp', name: 'Цветы 1', category: 'wedding' },
    { id: 'decor-9', file: 'flower2.webp', name: 'Цветы 2', category: 'wedding' },
    { id: 'decor-10', file: 'flower3.webp', name: 'Цветы 3', category: 'wedding' },
    { id: 'decor-11', file: 'flower4.webp', name: 'Цветы 4', category: 'wedding' },
    { id: 'decor-12', file: 'flower5.webp', name: 'Цветы 5', category: 'wedding' },
    { id: 'decor-13', file: 'flower6.webp', name: 'Цветы 6', category: 'wedding' },
    { id: 'decor-14', file: 'flower7.webp', name: 'Цветы 7', category: 'wedding' },
    { id: 'decor-15', file: 'gold1.webp', name: 'Уголок золотой 1', category: 'wedding' },
    { id: 'decor-16', file: 'gold2.webp', name: 'Уголок золотой 2', category: 'wedding' },
    { id: 'decor-17', file: 'gold3.webp', name: 'Уголок золотой 3', category: 'wedding' },
    { id: 'decor-18', file: 'gold4.webp', name: 'Уголок золотой 4', category: 'wedding' },
    { id: 'decor-19', file: 'gold5.webp', name: 'Уголок золотой 5', category: 'wedding' },
    { id: 'decor-20', file: 'gold6.webp', name: 'Уголок золотой 6', category: 'wedding' },
    { id: 'decor-21', file: 'gold7.webp', name: 'Уголок золотой 7', category: 'wedding' },
    { id: 'decor-22', file: 'gold8.webp', name: 'Уголок золотой 8', category: 'wedding' },
    { id: 'decor-23', file: 'gold9.webp', name: 'Кольца 1', category: 'wedding' },
    { id: 'decor-24', file: 'gold10.webp', name: 'Сердце 1', category: 'wedding' },
    { id: 'decor-25', file: 'gold11.webp', name: 'Сердце 2', category: 'wedding' },
    { id: 'decor-26', file: 'food1.webp', name: 'Пирог 1', category: 'party' },
    { id: 'decor-27', file: 'food2.webp', name: 'Пирог 2', category: 'party' },
    { id: 'decor-28', file: 'food3.webp', name: 'Мороженное 1', category: 'party' },
    { id: 'decor-29', file: 'food4.webp', name: 'Мороженное 2', category: 'party' },
    { id: 'decor-30', file: 'anime1.webp', name: 'Котик в коробке 1', category: 'pets' },
    { id: 'decor-31', file: 'anime2.webp', name: 'Котик в коробке 2', category: 'pets' },
    { id: 'decor-32', file: 'anime3.webp', name: 'Котик 1', category: 'pets' },
    { id: 'decor-33', file: 'anime4.webp', name: 'Котик 2', category: 'pets' },
    { id: 'decor-34', file: 'anime5.webp', name: 'Бургер 1', category: 'party' },
    { id: 'decor-35', file: 'anime6.webp', name: 'Пёсель 1', category: 'pets' },
    { id: 'decor-36', file: 'anime7.webp', name: 'Котик 3', category: 'pets' },
    { id: 'decor-37', file: 'anime8.webp', name: 'Котик 4', category: 'pets' },
    { id: 'decor-38', file: 'anime9.webp', name: 'Котик 5', category: 'pets' },
    { id: 'decor-39', file: 'anime10.webp', name: 'Котик 6', category: 'pets' },
    { id: 'decor-40', file: 'anime11.webp', name: 'Стакан 1', category: 'party' },
    { id: 'decor-41', file: 'anime12.webp', name: 'Стакан 2', category: 'party' },
    { id: 'decor-42', file: 'anime13.webp', name: 'Чашка 1', category: 'party' },
    { id: 'decor-43', file: 'anime14.webp', name: 'Котик 7', category: 'pets' },
    { id: 'decor-44', file: 'black1.webp', name: 'Роза 1', category: 'wedding' },
    { id: 'decor-45', file: 'black2.webp', name: 'Роза 2', category: 'wedding' },
    { id: 'decor-46', file: 'black3.webp', name: 'Роза 3', category: 'wedding' },
    { id: 'decor-47', file: 'black4.webp', name: 'Роза 4', category: 'wedding' },
    { id: 'decor-48', file: 'black5.webp', name: 'Роза 5', category: 'wedding' },
    { id: 'decor-49', file: 'black6.webp', name: 'Роза 6', category: 'wedding' },
    { id: 'decor-50', file: 'black7.webp', name: 'Роза 7', category: 'wedding' },
    { id: 'decor-51', file: 'black8.webp', name: 'Букет 1', category: 'wedding' },
    { id: 'decor-52', file: 'black9.webp', name: 'Бантик 1', category: 'wedding' },
    { id: 'decor-53', file: 'black10.webp', name: 'Бантик 2', category: 'wedding' },
    { id: 'decor-54', file: 'black11.webp', name: 'Вместе 1', category: 'wedding' },
    { id: 'decor-55', file: 'black12.webp', name: 'Вместе 2', category: 'wedding' },
    { id: 'decor-56', file: 'black13.webp', name: 'Вместе 3', category: 'wedding' },
    { id: 'decor-57', file: 'black14.webp', name: 'Вместе 4', category: 'wedding' },
    { id: 'decor-58', file: 'black15.webp', name: 'Вместе 5', category: 'wedding' },
    { id: 'decor-59', file: 'halloween1.webp', name: 'Скелет', category: 'party' },
    { id: 'decor-60', file: 'halloween2.webp', name: 'Тыква', category: 'party' },
    { id: 'decor-61', file: 'halloween3.webp', name: 'Привидения', category: 'party' },
    { id: 'decor-62', file: 'halloween4.webp', name: 'Цветы', category: 'party' },
    { id: 'decor-63', file: 'halloween5.webp', name: 'Кружка', category: 'party' },
    { id: 'decor-64', file: 'newyear1.webp', name: 'Ёлка', category: 'party' },
    { id: 'decor-65', file: 'newyear2.webp', name: 'Снеговик', category: 'party' },
    { id: 'decor-66', file: 'newyear3.webp', name: 'Белка', category: 'party' },
    { id: 'decor-67', file: 'newyear4.webp', name: 'Кот у ёлки', category: 'party' },
    { id: 'decor-68', file: 'paskha1.webp', name: 'Кролик и цыпленок', category: 'party' },
    { id: 'decor-69', file: 'paskha2.webp', name: 'Кулич 1', category: 'party' },
    { id: 'decor-70', file: 'paskha3.webp', name: 'Кулич 2', category: 'party' },
    { id: 'decor-71', file: 'pets1.webp', name: 'Котик с букетом', category: 'pets' },
    { id: 'decor-72', file: 'pets2.webp', name: 'Пара котиков', category: 'pets' },
    { id: 'decor-73', file: 'pets3.webp', name: 'Мышка в очках', category: 'pets' },
    { id: 'decor-74', file: 'pets4.webp', name: 'Пухлый котик', category: 'pets' },
    { id: 'decor-75', file: 'pets5.webp', name: 'Слоник', category: 'pets' },
    { id: 'decor-76', file: 'pets6.webp', name: 'Жирафик', category: 'pets' },
    { id: 'decor-77', file: 'pets7.webp', name: 'Киса', category: 'pets' },
    { id: 'decor-78', file: 'pets8.webp', name: 'Пухляш', category: 'pets' },
    { id: 'decor-79', file: 'pets9.webp', name: 'Зайка 1', category: 'pets' },
    { id: 'decor-80', file: 'pets10.webp', name: 'Зайка 2', category: 'pets' },
    { id: 'decor-81', file: 'pets11.webp', name: 'Кролик', category: 'pets' },
    { id: 'decor-82', file: 'pets12.webp', name: 'Хомяк', category: 'pets' },
    { id: 'decor-83', file: 'pets13.webp', name: 'Мишка', category: 'pets' },
    { id: 'decor-84', file: 'pets14.webp', name: 'Оленёнок', category: 'pets' },
    { id: 'decor-85', file: 'pets15.webp', name: 'Пёсель', category: 'pets' },
    { id: 'decor-86', file: 'pets16.webp', name: 'Котик', category: 'pets' },
    { id: 'decor-87', file: 'pets17.webp', name: 'Пингвин', category: 'pets' },
    { id: 'decor-88', file: 'pets18.webp', name: 'Клубок 1', category: 'pets' },
    { id: 'decor-89', file: 'pets19.webp', name: 'Клубок 2', category: 'pets' },
    { id: 'decor-90', file: 'pets20.webp', name: 'Киски', category: 'pets' },
    { id: 'decor-91', file: 'pets21.webp', name: 'Котик с тыквой 1', category: 'pets' },
    { id: 'decor-92', file: 'pets22.webp', name: 'Котик с тыквой 2', category: 'pets' },
    { id: 'decor-93', file: 'pets23.webp', name: 'Зайка ', category: 'pets' },
    { id: 'decor-94', file: 'pets24.webp', name: 'Котик', category: 'pets' },
    { id: 'decor-95', file: 'pets25.webp', name: 'Енотик', category: 'pets' },
    { id: 'decor-96', file: 'pets26.webp', name: 'Киса в телефоне', category: 'pets' },
    { id: 'decor-97', file: 'pets27.webp', name: 'Шерстяной зайка', category: 'pets' },
    { id: 'decor-98', file: 'pets28.webp', name: 'Ёлкокот', category: 'pets' },
    { id: 'decor-99', file: 'pets29.webp', name: 'Мишки', category: 'pets' },
    { id: 'decor-100', file: 'pets30.webp', name: 'Лис', category: 'pets' },
    { id: 'decor-101', file: 'pets31.webp', name: 'Пчелокот', category: 'pets' },
    { id: 'decor-102', file: 'pets32.webp', name: 'Единорог', category: 'pets' },
    { id: 'decor-103', file: 'pets33.webp', name: 'Ёжи в тарелке', category: 'pets' },
    { id: 'decor-104', file: 'pets34.webp', name: 'Киски?', category: 'pets' },
    { id: 'decor-105', file: 'pets35.webp', name: 'Лебели', category: 'pets' },
];

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initDecorations();
        initMobileDecorPanel();
    }, 100);

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const wasMobile = isMobileView;
            isMobileView = window.innerWidth <= 768;

            if (wasMobile && !isMobileView) {
                closeMobileDecorPanel();
            }

            updatePreviewDecorations();
        }, 150);
    });
});

function initDecorFilters() {
    const filterContainer = document.querySelector('.decor-filters');
    if (!filterContainer) return;

    filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
        btn.removeEventListener('click', handleDecorFilterClick);
        btn.addEventListener('click', handleDecorFilterClick);
    });
}

function handleDecorFilterClick(e) {
    const btn = e.currentTarget;
    const filterContainer = btn.closest('.decor-filters');
    if (!filterContainer) return;

    filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentDecorFilter = btn.dataset.decorFilter;
    renderDecorLibrary();
}

function initDecorations() {
    renderDecorLibrary();
    renderDecorList();
    initDecorControls();
    initDecorFilters();

    const clipCheckbox = document.getElementById('decorClipToFrame');
    if (clipCheckbox) {
        clipCheckbox.checked = EditorState.clipDecorations;
        clipCheckbox.addEventListener('change', (e) => {
            EditorState.clipDecorations = e.target.checked;
            applyClipToFrame();
        });
    }
}

function renderDecorLibrary() {
    const library = document.getElementById('decorLibrary');
    if (!library) return;

    let filteredDecor = window.decorLibrary;
    if (currentDecorFilter !== 'all') {
        filteredDecor = window.decorLibrary.filter(decor => decor.category === currentDecorFilter);
    }

    library.innerHTML = filteredDecor.map(decor => `
        <div class="decor-library-item" 
             data-decor-id="${decor.id}"
             data-decor-file="${decor.file}"
             data-decor-name="${decor.name}"
             title="${decor.name}"
             style="background-image: url('/images/decorations/${decor.file}')">
        </div>
    `).join('');

    library.querySelectorAll('.decor-library-item').forEach(item => {
        item.addEventListener('click', () => {
            const file = item.dataset.decorFile;
            const name = item.dataset.decorName;
            addDecor(file, name);
        });
    });
}

function renderDecorList() {
    const list = document.getElementById('decorList');
    if (!list) return;

    if (!EditorState.decorations || EditorState.decorations.length === 0) {
        list.innerHTML = '<div style="text-align: center; padding: 1rem; color: #94a3b8;">Нет добавленных декораций</div>';
        return;
    }

    list.innerHTML = EditorState.decorations.map(decor => `
        <div class="decor-list-item ${decor.id === EditorState.activeDecorId ? 'active' : ''}" data-decor-id="${decor.id}">
            <div class="decor-list-thumb" style="background-image: url('/images/decorations/${decor.file}')"></div>
            <div class="decor-list-info">${decor.name}</div>
            <div class="decor-list-actions">
                <button class="decor-list-btn move-up" title="Переместить вверх" ${decor === EditorState.decorations[0] ? 'disabled' : ''}>
                    <span class="material-symbols-outlined">arrow_upward</span>
                </button>
                <button class="decor-list-btn move-down" title="Переместить вниз" ${decor === EditorState.decorations[EditorState.decorations.length - 1] ? 'disabled' : ''}>
                    <span class="material-symbols-outlined">arrow_downward</span>
                </button>
                <button class="decor-list-btn delete" title="Удалить">
                    <span class="material-symbols-outlined">delete</span>
                </button>
            </div>
        </div>
    `).join('');

    list.querySelectorAll('.decor-list-item').forEach(item => {
        const decorId = item.dataset.decorId;

        item.addEventListener('click', (e) => {
            if (e.target.closest('.decor-list-btn')) return;
            selectDecor(decorId);

            if (window.innerWidth <= 768) {
                openMobileDecorPanel(decorId);
            }
        });

        const upBtn = item.querySelector('.move-up');
        const downBtn = item.querySelector('.move-down');
        const deleteBtn = item.querySelector('.delete');

        if (upBtn && !upBtn.disabled) {
            upBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                moveDecor(decorId, 'up');
            });
        }

        if (downBtn && !downBtn.disabled) {
            downBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                moveDecor(decorId, 'down');
            });
        }

        if (deleteBtn) {
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                deleteDecor(decorId);

                if (decorId === EditorState.activeDecorId && window.innerWidth <= 768) {
                    closeMobileDecorPanel();
                }
            });
        }
    });
}

function initDecorControls() {
    const sizeInput = document.getElementById('decorSize');
    const sizeValue = document.getElementById('decorSizeValue');

    if (sizeInput) {
        sizeInput.addEventListener('input', (e) => {
            if (!EditorState.activeDecorId) return;
            const decor = EditorState.decorations.find(d => d.id === EditorState.activeDecorId);
            if (decor) {
                decor.width = parseInt(e.target.value);
                if (sizeValue) sizeValue.textContent = decor.width + 'px';
                updatePreviewDecorations();
            }
        });
    }

    const rotateLeft = document.getElementById('rotateLeft');
    if (rotateLeft) {
        const newRotateLeft = rotateLeft.cloneNode(true);
        rotateLeft.parentNode.replaceChild(newRotateLeft, rotateLeft);

        newRotateLeft.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!EditorState.activeDecorId) return;
            const decor = EditorState.decorations.find(d => d.id === EditorState.activeDecorId);
            if (decor) {
                decor.rotation = ((decor.rotation !== undefined ? decor.rotation : 0) - 90 + 360) % 360;
                document.getElementById('decorAngle').textContent = decor.rotation + '°';
                updatePreviewDecorations();
            }
        });
    }

    const rotateRight = document.getElementById('rotateRight');
    if (rotateRight) {
        const newRotateRight = rotateRight.cloneNode(true);
        rotateRight.parentNode.replaceChild(newRotateRight, rotateRight);

        newRotateRight.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!EditorState.activeDecorId) return;
            const decor = EditorState.decorations.find(d => d.id === EditorState.activeDecorId);
            if (decor) {
                decor.rotation = ((decor.rotation !== undefined ? decor.rotation : 0) + 90) % 360;
                document.getElementById('decorAngle').textContent = decor.rotation + '°';
                updatePreviewDecorations();
            }
        });
    }

    const posX = document.getElementById('decorPosX');
    const posXValue = document.getElementById('decorPosXValue');

    if (posX) {
        posX.addEventListener('input', (e) => {
            if (!EditorState.activeDecorId) return;
            const decor = EditorState.decorations.find(d => d.id === EditorState.activeDecorId);
            if (decor) {
                decor.posX = parseInt(e.target.value);
                if (posXValue) posXValue.textContent = decor.posX + '%';
                updatePreviewDecorations();
            }
        });
    }

    const posY = document.getElementById('decorPosY');
    const posYValue = document.getElementById('decorPosYValue');

    if (posY) {
        posY.addEventListener('input', (e) => {
            if (!EditorState.activeDecorId) return;
            const decor = EditorState.decorations.find(d => d.id === EditorState.activeDecorId);
            if (decor) {
                decor.posY = parseInt(e.target.value);
                if (posYValue) posYValue.textContent = decor.posY + '%';
                updatePreviewDecorations();
            }
        });
    }

    const opacity = document.getElementById('decorOpacity');
    const opacityValue = document.getElementById('decorOpacityValue');

    if (opacity) {
        opacity.addEventListener('input', (e) => {
            if (!EditorState.activeDecorId) return;
            const decor = EditorState.decorations.find(d => d.id === EditorState.activeDecorId);
            if (decor) {
                const val = parseFloat(e.target.value);
                decor.opacity = val;
                if (opacityValue) opacityValue.textContent = val.toFixed(2);
                updatePreviewDecorations();
            }
        });
    }

    document.getElementById('decorAboveText')?.addEventListener('change', (e) => {
        if (!EditorState.activeDecorId) return;
        const decor = EditorState.decorations.find(d => d.id === EditorState.activeDecorId);
        if (decor) {
            decor.aboveText = e.target.checked;
            updatePreviewDecorations();
        }
    });

    document.getElementById('deleteDecorBtn')?.addEventListener('click', () => {
        if (!EditorState.activeDecorId) return;
        deleteDecor(EditorState.activeDecorId);
    });
}

function addDecor(file, name) {
    const newDecor = {
        id: 'decor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        file: file,
        name: name,
        width: 150,
        rotation: 0,
        posX: 50,
        posY: 50,
        opacity: 1,
        aboveText: false
    };

    EditorState.decorations.push(newDecor);
    selectDecor(newDecor.id);
    renderDecorList();
    updatePreviewDecorations();

    if (window.innerWidth <= 768) {
        setTimeout(() => {
            openMobileDecorPanel(newDecor.id);
        }, 50);
    }
}

function selectDecor(id) {
    if (EditorState.activeDecorId === id) {
        EditorState.activeDecorId = null;
        hideDecorControls();

        if (window.innerWidth <= 768) {
            closeMobileDecorPanel();
        }
    } else {
        EditorState.activeDecorId = id;
        showDecorControls(id);

        if (window.innerWidth <= 768) {
            const decor = EditorState.decorations.find(d => d.id === id);
            if (decor && mobileDecorPanel && mobileDecorPanel.classList.contains('active')) {
                updateMobilePanelValues(decor);
            }
        }
    }

    renderDecorList();
    updatePreviewDecorations();
}

function showDecorControls(id) {
    const controls = document.getElementById('decorControls');
    const decor = EditorState.decorations.find(d => d.id === id);

    if (controls && decor) {
        controls.style.display = 'block';

        document.getElementById('decorSize').value = decor.width !== undefined ? decor.width : 150;
        document.getElementById('decorSizeValue').textContent = (decor.width !== undefined ? decor.width : 150) + 'px';

        document.getElementById('decorAngle').textContent = (decor.rotation !== undefined ? decor.rotation : 0) + '°';

        document.getElementById('decorPosX').value = decor.posX !== undefined ? decor.posX : 50;
        document.getElementById('decorPosXValue').textContent = (decor.posX !== undefined ? decor.posX : 50) + '%';

        document.getElementById('decorPosY').value = decor.posY !== undefined ? decor.posY : 50;
        document.getElementById('decorPosYValue').textContent = (decor.posY !== undefined ? decor.posY : 50) + '%';

        const opacityInput = document.getElementById('decorOpacity');
        const opacityValue = document.getElementById('decorOpacityValue');
        if (opacityInput) {
            opacityInput.value = decor.opacity !== undefined ? decor.opacity : 1;
        }
        if (opacityValue) {
            opacityValue.textContent = (decor.opacity !== undefined ? decor.opacity : 1).toFixed(2);
        }

        document.getElementById('decorAboveText').checked = decor.aboveText || false;
    }
}

function hideDecorControls() {
    const controls = document.getElementById('decorControls');
    if (controls) {
        controls.style.display = 'none';
    }
}

function deleteDecor(id) {
    EditorState.decorations = EditorState.decorations.filter(d => d.id !== id);

    if (EditorState.activeDecorId === id) {
        EditorState.activeDecorId = null;
        hideDecorControls();
    }

    renderDecorList();
    updatePreviewDecorations();

    if (window.innerWidth <= 768) {
        closeMobileDecorPanel();
    }
}

function moveDecor(id, direction) {
    const index = EditorState.decorations.findIndex(d => d.id === id);
    if (index === -1) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;

    if (newIndex < 0 || newIndex >= EditorState.decorations.length) return;

    [EditorState.decorations[index], EditorState.decorations[newIndex]] =
        [EditorState.decorations[newIndex], EditorState.decorations[index]];

    renderDecorList();
    updatePreviewDecorations();
}

function updatePreviewDecorations() {
    const card = document.getElementById('previewCard');
    if (!card) return;

    card.querySelectorAll('.invitation-decor').forEach(el => el.remove());

    EditorState.decorations.forEach(decor => {
        const decorEl = document.createElement('div');
        decorEl.className = `invitation-decor ${decor.aboveText ? 'above-text' : ''}`;
        decorEl.id = `decor-${decor.id}`;
        decorEl.dataset.decorId = decor.id;

        decorEl.style.cssText = `
            position: absolute;
            width: ${decor.width !== undefined ? decor.width : 150}px;
            height: ${decor.width !== undefined ? decor.width : 150}px;
            left: ${decor.posX !== undefined ? decor.posX : 50}%;
            top: ${decor.posY !== undefined ? decor.posY : 50}%;
            transform: translate(-50%, -50%) rotate(${decor.rotation !== undefined ? decor.rotation : 0}deg);
            opacity: ${decor.opacity !== undefined ? decor.opacity : 1};
            background-image: url('/images/decorations/${decor.file}');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            pointer-events: none;
            z-index: ${decor.aboveText ? 20 : 5};
        `;

        card.appendChild(decorEl);
    });

    applyClipToFrame();
}

function applyClipToFrame() {
    const card = document.getElementById('previewCard');
    if (!card) return;

    if (EditorState.clipDecorations) {
        card.classList.add('clip-decorations');
    } else {
        card.classList.remove('clip-decorations');
    }
}

function initMobileDecorPanel() {
    mobileDecorPanel = document.getElementById('mobileDecorPanel');
    if (!mobileDecorPanel) return;

    const closeBtn = document.getElementById('mobileDecorClose');
    if (closeBtn) closeBtn.addEventListener('click', closeMobileDecorPanel);

    const doneBtn = document.getElementById('mobileDecorDone');
    if (doneBtn) {
        doneBtn.addEventListener('click', () => {
            if (EditorState.activeDecorId) {
                EditorState.activeDecorId = null;
                hideDecorControls();
                renderDecorList();
                updatePreviewDecorations();
            }
            closeMobileDecorPanel();
        });
    }

    const rotateLeft = document.getElementById('mobileRotateLeft');
    if (rotateLeft) {
        rotateLeft.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!EditorState.activeDecorId) return;
            const decor = EditorState.decorations.find(d => d.id === EditorState.activeDecorId);
            if (decor) {
                decor.rotation = ((decor.rotation !== undefined ? decor.rotation : 0) - 90 + 360) % 360;
                updateMobilePanelValues(decor);
                updatePreviewDecorations();
            }
        });
    }

    const rotateRight = document.getElementById('mobileRotateRight');
    if (rotateRight) {
        rotateRight.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (!EditorState.activeDecorId) return;
            const decor = EditorState.decorations.find(d => d.id === EditorState.activeDecorId);
            if (decor) {
                decor.rotation = ((decor.rotation !== undefined ? decor.rotation : 0) + 90) % 360;
                updateMobilePanelValues(decor);
                updatePreviewDecorations();
            }
        });
    }

    const mobileSize = document.getElementById('mobileDecorSize');
    if (mobileSize) {
        mobileSize.addEventListener('input', (e) => {
            if (!EditorState.activeDecorId) return;
            const decor = EditorState.decorations.find(d => d.id === EditorState.activeDecorId);
            if (decor) {
                decor.width = parseInt(e.target.value);
                document.getElementById('mobileDecorSizeValue').textContent = decor.width + 'px';
                updatePreviewDecorations();
            }
        });
    }

    const mobilePosX = document.getElementById('mobileDecorPosX');
    if (mobilePosX) {
        mobilePosX.addEventListener('input', (e) => {
            if (!EditorState.activeDecorId) return;
            const decor = EditorState.decorations.find(d => d.id === EditorState.activeDecorId);
            if (decor) {
                decor.posX = parseInt(e.target.value);
                document.getElementById('mobileDecorPosXValue').textContent = decor.posX + '%';
                updatePreviewDecorations();
            }
        });
    }

    const mobilePosY = document.getElementById('mobileDecorPosY');
    if (mobilePosY) {
        mobilePosY.addEventListener('input', (e) => {
            if (!EditorState.activeDecorId) return;
            const decor = EditorState.decorations.find(d => d.id === EditorState.activeDecorId);
            if (decor) {
                decor.posY = parseInt(e.target.value);
                document.getElementById('mobileDecorPosYValue').textContent = decor.posY + '%';
                updatePreviewDecorations();
            }
        });
    }

    const mobileOpacity = document.getElementById('mobileDecorOpacity');
    if (mobileOpacity) {
        mobileOpacity.addEventListener('input', (e) => {
            if (!EditorState.activeDecorId) return;
            const decor = EditorState.decorations.find(d => d.id === EditorState.activeDecorId);
            if (decor) {
                const val = parseFloat(e.target.value);
                decor.opacity = val;
                document.getElementById('mobileDecorOpacityValue').textContent = Math.round(val * 100) + '%';
                updatePreviewDecorations();
            }
        });
    }

    const aboveText = document.getElementById('mobileDecorAboveText');
    if (aboveText) {
        aboveText.addEventListener('change', (e) => {
            if (!EditorState.activeDecorId) return;
            const decor = EditorState.decorations.find(d => d.id === EditorState.activeDecorId);
            if (decor) {
                decor.aboveText = e.target.checked;
                updatePreviewDecorations();
            }
        });
    }

    const clipToFrame = document.getElementById('mobileDecorClipToFrame');
    if (clipToFrame) {
        clipToFrame.checked = EditorState.clipDecorations;
        clipToFrame.addEventListener('change', (e) => {
            EditorState.clipDecorations = e.target.checked;
            applyClipToFrame();
            updatePreviewDecorations();
        });
    }

    const deleteBtn = document.getElementById('mobileDeleteDecorBtn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
            if (!EditorState.activeDecorId) return;
            deleteDecor(EditorState.activeDecorId);
            closeMobileDecorPanel();
        });
    }

    const mobileTabs = document.getElementById('mobileTabs');
    if (mobileTabs) {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const settingsTab = document.querySelector('.mobile-tab[data-tab="settings"]');
                    if (settingsTab && settingsTab.classList.contains('active')) {
                        if (EditorState.activeDecorId) {
                            EditorState.activeDecorId = null;
                            hideDecorControls();
                            renderDecorList();
                            updatePreviewDecorations();
                        }
                        closeMobileDecorPanel();
                    }
                }
            });
        });

        observer.observe(mobileTabs, {
            attributes: true,
            subtree: true,
            attributeFilter: ['class']
        });
    }
}

function openMobileDecorPanel(decorId) {
    if (!isMobileView) return;

    const previewTab = document.querySelector('.mobile-tab[data-tab="preview"]');
    if (previewTab) previewTab.click();

    if (mobileDecorPanel) {
        mobileDecorPanel.classList.add('active');
        
        setTimeout(() => {
            const card = document.getElementById('previewCard');
            const container = document.querySelector('.preview-container');
            if (card && container) {
                const cardRect = card.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                const scrollTop = container.scrollTop;
                
                if (cardRect.bottom > window.innerHeight - 200) {
                    container.scrollTo({
                        top: scrollTop + (cardRect.bottom - window.innerHeight + 200),
                        behavior: 'smooth'
                    });
                }
            }
        }, 100);
    }

    const decor = EditorState.decorations.find(d => d.id === decorId);
    if (decor) updateMobilePanelValues(decor);
}

function closeMobileDecorPanel() {
    if (mobileDecorPanel) {
        mobileDecorPanel.classList.remove('active');
        
        setTimeout(() => {
            const container = document.querySelector('.preview-container');
            if (container) {
                container.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
}

function updateMobilePanelValues(decor) {
    const sizeInput = document.getElementById('mobileDecorSize');
    const sizeValue = document.getElementById('mobileDecorSizeValue');
    if (sizeInput) sizeInput.value = decor.width !== undefined ? decor.width : 150;
    if (sizeValue) sizeValue.textContent = (decor.width !== undefined ? decor.width : 150) + 'px';

    const angle = decor.rotation !== undefined ? decor.rotation : 0;
    const angleSpan = document.getElementById('mobileDecorAngle');
    if (angleSpan) angleSpan.textContent = angle + '°';

    const angleDisplay = document.querySelector('.mobile-decor-angle-display');
    if (angleDisplay) angleDisplay.textContent = angle + '°';

    const posX = document.getElementById('mobileDecorPosX');
    const posXValue = document.getElementById('mobileDecorPosXValue');
    if (posX) posX.value = decor.posX !== undefined ? decor.posX : 50;
    if (posXValue) posXValue.textContent = (decor.posX !== undefined ? decor.posX : 50) + '%';

    const posY = document.getElementById('mobileDecorPosY');
    const posYValue = document.getElementById('mobileDecorPosYValue');
    if (posY) posY.value = decor.posY !== undefined ? decor.posY : 50;
    if (posYValue) posYValue.textContent = (decor.posY !== undefined ? decor.posY : 50) + '%';

    const opacity = document.getElementById('mobileDecorOpacity');
    const opacityValue = document.getElementById('mobileDecorOpacityValue');
    if (opacity) {
        opacity.value = decor.opacity !== undefined ? decor.opacity : 1;
    }
    if (opacityValue) {
        opacityValue.textContent = Math.round((decor.opacity !== undefined ? decor.opacity : 1) * 100) + '%';
    }

    const aboveText = document.getElementById('mobileDecorAboveText');
    if (aboveText) aboveText.checked = decor.aboveText || false;

    const clipToFrame = document.getElementById('mobileDecorClipToFrame');
    if (clipToFrame) clipToFrame.checked = EditorState.clipDecorations;
}

window.decorationsAPI = {
    initDecorations,
    renderDecorLibrary,
    renderDecorList,
    addDecor,
    selectDecor,
    deleteDecor,
    moveDecor,
    updatePreviewDecorations,
    applyClipToFrame,
    openMobileDecorPanel,
    closeMobileDecorPanel,
    initMobileDecorPanel
};