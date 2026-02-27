let mobileDecorPanel = null;

window.decorLibrary = [
    { id: 'decor-1', file: '1.webp', name: 'Уголок золотой 1', category: 'corners' },
    { id: 'decor-2', file: '2.webp', name: 'Уголок золотой 2', category: 'corners' },
    { id: 'decor-3', file: '3.webp', name: 'Уголок цветочный', category: 'corners' },
    { id: 'decor-4', file: '4.webp', name: 'Розы букет', category: 'flowers' },
    { id: 'decor-5', file: '5.webp', name: 'Пионы', category: 'flowers' },
    { id: 'decor-6', file: '6.webp', name: 'Кольца обручальные', category: 'rings' },
    { id: 'decor-7', file: '7.webp', name: 'Кольца с бриллиантами', category: 'rings' },
    { id: 'decor-8', file: '8.webp', name: 'Сердце объемное', category: 'hearts' },
    { id: 'decor-9', file: '9.webp', name: 'Сердце из цветов', category: 'hearts' },
    { id: 'decor-10', file: '10.webp', name: 'Узор резной 1', category: 'patterns' },
    { id: 'decor-11', file: '11.webp', name: 'Узор резной 2', category: 'patterns' },
    { id: 'decor-12', file: '12.webp', name: 'Цветочная гирлянда', category: 'garlands' },
    { id: 'decor-13', file: '13.webp', name: 'Свадебная арка', category: 'arches' },
    { id: 'decor-14', file: '14.webp', name: 'Лебеди', category: 'animals' },
    { id: 'decor-15', file: '15.webp', name: 'Бокалы', category: 'celebration' },
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

function initDecorations() {
    renderDecorLibrary();
    renderDecorList();
    initDecorControls();
    
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
    
    library.innerHTML = window.decorLibrary.map(decor => `
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
    
    document.getElementById('rotateLeft')?.addEventListener('click', () => {
        if (!EditorState.activeDecorId) return;
        const decor = EditorState.decorations.find(d => d.id === EditorState.activeDecorId);
        if (decor) {
            decor.rotation = ((decor.rotation !== undefined ? decor.rotation : 0) - 90 + 360) % 360;
            document.getElementById('decorAngle').textContent = decor.rotation + '°';
            updatePreviewDecorations();
        }
    });
    
    document.getElementById('rotateRight')?.addEventListener('click', () => {
        if (!EditorState.activeDecorId) return;
        const decor = EditorState.decorations.find(d => d.id === EditorState.activeDecorId);
        if (decor) {
            decor.rotation = ((decor.rotation !== undefined ? decor.rotation : 0) + 90) % 360;
            document.getElementById('decorAngle').textContent = decor.rotation + '°';
            updatePreviewDecorations();
        }
    });
    
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
    if (doneBtn) doneBtn.addEventListener('click', closeMobileDecorPanel);
    
    const rotateLeft = document.getElementById('mobileRotateLeft');
    if (rotateLeft) {
        rotateLeft.addEventListener('click', () => {
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
        rotateRight.addEventListener('click', () => {
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
    
    if (mobileDecorPanel) mobileDecorPanel.classList.add('active');
    
    const decor = EditorState.decorations.find(d => d.id === decorId);
    if (decor) updateMobilePanelValues(decor);
}

function closeMobileDecorPanel() {
    if (mobileDecorPanel) mobileDecorPanel.classList.remove('active');
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