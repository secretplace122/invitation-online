let mobileTextPanel = null;
let activeTextInputId = null;

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        initTextBlocks();
        initMobileTextPanel();
        initMobileFontPicker();
        initMobileColorPicker();
    }, 200);

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (window.innerWidth <= 768 && EditorState.activeTextId) {
                openMobileTextPanel(EditorState.activeTextId);
            }
            updatePreviewTextBlocks();
        }, 150);
    });
});

function initTextBlocks() {
    renderTextList();
    initTextControls();
}

function renderTextList() {
    const list = document.getElementById('textList');
    if (!list) return;

    if (!EditorState.textBlocks || EditorState.textBlocks.length === 0) {
        list.innerHTML = '<div style="text-align: center; padding: 1rem; color: #94a3b8;">Нет текстовых блоков. Нажмите "+ Добавить текст"</div>';
        return;
    }

    const sortedBlocks = [...EditorState.textBlocks].sort((a, b) => a.order - b.order);

    list.innerHTML = sortedBlocks.map(block => `
        <div class="text-list-item ${block.id === EditorState.activeTextId ? 'active' : ''}" data-text-id="${block.id}">
            <div class="text-list-info">
                <span class="material-symbols-outlined" style="font-size: 1.2rem;">notes</span>
                <span class="text-list-preview">${block.content.substring(0, 20)}${block.content.length > 20 ? '...' : ''}</span>
            </div>
            <div class="text-list-actions">
                <button class="text-list-btn move-up" title="Переместить вверх" ${block.order === 0 ? 'disabled' : ''}>
                    <span class="material-symbols-outlined">arrow_upward</span>
                </button>
                <button class="text-list-btn move-down" title="Переместить вниз" ${block.order === EditorState.textBlocks.length - 1 ? 'disabled' : ''}>
                    <span class="material-symbols-outlined">arrow_downward</span>
                </button>
                <button class="text-list-btn delete" title="Удалить">
                    <span class="material-symbols-outlined">delete</span>
                </button>
            </div>
        </div>
    `).join('');

    attachTextListEvents();
}

function attachTextListEvents() {
    const list = document.getElementById('textList');
    if (!list) return;

    list.querySelectorAll('.text-list-item').forEach(item => {
        const textId = item.dataset.textId;

        item.addEventListener('click', (e) => {
            if (e.target.closest('.text-list-btn')) return;
            selectTextBlock(textId);
            if (window.innerWidth <= 768) {
                const previewTab = document.querySelector('.mobile-tab[data-tab="preview"]');
                if (previewTab) previewTab.click();
                openMobileTextPanel(textId);
            }
        });

        const upBtn = item.querySelector('.move-up');
        const downBtn = item.querySelector('.move-down');
        const deleteBtn = item.querySelector('.delete');

        if (upBtn && !upBtn.disabled) {
            upBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                moveTextBlock(textId, 'up');
            });
        }

        if (downBtn && !downBtn.disabled) {
            downBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                moveTextBlock(textId, 'down');
            });
        }

        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteTextBlock(textId);
            if (textId === EditorState.activeTextId && window.innerWidth <= 768) {
                closeMobileTextPanel();
            }
        });
    });
}

function addTextBlock() {
    const newBlock = {
        id: 'text_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
        type: 'textBlock',
        content: 'Новый текст',
        fontSize: 18,
        fontFamily: "'Inter', sans-serif",
        fontWeight: 'normal',
        fontStyle: 'normal',
        color: EditorState.defaultTextColor || '#475569',
        textAlign: 'center',
        posX: 50,
        posY: 50,
        width: 80,
        aboveText: false,
        isMultiLine: true,
        order: EditorState.textBlocks.length
    };

    EditorState.textBlocks.push(newBlock);
    selectTextBlock(newBlock.id);
    renderTextList();
    updatePreviewTextBlocks();

    if (window.innerWidth <= 768) {
        const previewTab = document.querySelector('.mobile-tab[data-tab="preview"]');
        if (previewTab) previewTab.click();
        setTimeout(() => {
            openMobileTextPanel(newBlock.id);
        }, 50);
    }
}

function selectTextBlock(id) {
    if (EditorState.activeTextId === id) {
        EditorState.activeTextId = null;
        hideTextControls();
        if (window.innerWidth <= 768) {
            closeMobileTextPanel();
        }
    } else {
        EditorState.activeTextId = id;
        showTextControls(id);
        if (window.innerWidth <= 768) {
            const block = EditorState.textBlocks.find(b => b.id === id);
            if (block && mobileTextPanel && mobileTextPanel.classList.contains('active')) {
                updateMobileTextPanelValues(block);
            }
        }
    }
    renderTextList();
    updatePreviewTextBlocks();
}

function showTextControls(id) {
    const controls = document.getElementById('textControls');
    const block = EditorState.textBlocks.find(b => b.id === id);

    if (controls && block) {
        controls.style.display = 'block';

        const contentInput = document.getElementById('textContent');
        if (contentInput) {
            if (contentInput.tagName !== 'TEXTAREA') {
                const textarea = document.createElement('textarea');
                textarea.id = 'textContent';
                textarea.rows = 4;
                textarea.placeholder = 'Введите текст...';
                textarea.value = block.content || '';
                contentInput.parentNode.replaceChild(textarea, contentInput);

                textarea.addEventListener('input', (e) => {
                    if (!EditorState.activeTextId) return;
                    const currentBlock = EditorState.textBlocks.find(b => b.id === EditorState.activeTextId);
                    if (currentBlock) {
                        currentBlock.content = e.target.value;
                        updatePreviewTextBlocks();
                        const previewEl = document.querySelector(`.text-list-item[data-text-id="${currentBlock.id}"] .text-list-preview`);
                        if (previewEl) {
                            previewEl.textContent = currentBlock.content.substring(0, 20) + (currentBlock.content.length > 20 ? '...' : '');
                        }
                    }
                });
            } else {
                contentInput.value = block.content || '';
            }
        }

        document.getElementById('textFont').value = block.fontFamily;
        document.getElementById('textSize').value = block.fontSize;
        document.getElementById('textSizeValue').textContent = block.fontSize + 'px';
        document.getElementById('textColor').value = block.color;
        document.getElementById('textAlign').value = block.textAlign;
        document.getElementById('textWidth').value = block.width;
        document.getElementById('textWidthValue').textContent = block.width + '%';
        document.getElementById('textPosX').value = block.posX;
        document.getElementById('textPosXValue').textContent = block.posX + '%';
        document.getElementById('textPosY').value = block.posY;
        document.getElementById('textPosYValue').textContent = block.posY + '%';

        document.getElementById('textBold').classList.toggle('active', block.fontWeight === 'bold');
        document.getElementById('textItalic').classList.toggle('active', block.fontStyle === 'italic');
    }
}

function hideTextControls() {
    const controls = document.getElementById('textControls');
    if (controls) {
        controls.style.display = 'none';
    }
}

function deleteTextBlock(id) {
    EditorState.textBlocks = EditorState.textBlocks.filter(b => b.id !== id);
    EditorState.textBlocks.forEach((block, index) => block.order = index);

    if (EditorState.activeTextId === id) {
        EditorState.activeTextId = null;
        hideTextControls();
    }

    renderTextList();
    updatePreviewTextBlocks();

    if (window.innerWidth <= 768) {
        closeMobileTextPanel();
    }
}

function moveTextBlock(id, direction) {
    const index = EditorState.textBlocks.findIndex(b => b.id === id);
    if (index === -1) return;

    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= EditorState.textBlocks.length) return;

    [EditorState.textBlocks[index], EditorState.textBlocks[newIndex]] =
        [EditorState.textBlocks[newIndex], EditorState.textBlocks[index]];

    EditorState.textBlocks.forEach((block, i) => block.order = i);

    renderTextList();
    updatePreviewTextBlocks();
}

function updatePreviewTextBlocks() {
    const card = document.getElementById('previewCard');
    if (!card) return;

    card.querySelectorAll('.text-block').forEach(el => el.remove());

    const sortedBlocks = [...EditorState.textBlocks].sort((a, b) => a.order - b.order);

    sortedBlocks.forEach(block => {
        const blockEl = document.createElement('div');
        blockEl.className = `text-block ${block.aboveText ? 'above-text' : ''}`;
        blockEl.id = `text-${block.id}`;
        blockEl.dataset.textId = block.id;

        const displayText = block.isMultiLine ? block.content.replace(/\n/g, '<br>') : block.content;

        blockEl.innerHTML = displayText;

        blockEl.style.cssText = `
            position: absolute;
            left: ${block.posX}%;
            top: ${block.posY}%;
            transform: translate(-50%, -50%);
            width: ${block.width}%;
            max-width: ${block.width}%;
            font-family: ${block.fontFamily};
            font-size: ${block.fontSize}px;
            font-weight: ${block.fontWeight};
            font-style: ${block.fontStyle};
            color: ${block.color};
            text-align: ${block.textAlign};
            pointer-events: none;
            z-index: ${block.aboveText ? 25 : 10};
            line-height: 1.4;
            word-wrap: break-word;
            white-space: pre-wrap;
            overflow-wrap: break-word;
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        `;

        card.appendChild(blockEl);
    });
}

function initTextControls() {
    document.getElementById('addTextBtn')?.addEventListener('click', addTextBlock);

    const fontSelect = document.getElementById('textFont');
    if (fontSelect) {
        if (window.innerWidth <= 768) {
            const wrapper = document.createElement('div');
            wrapper.style.position = 'relative';
            wrapper.style.width = '100%';
            fontSelect.parentNode.insertBefore(wrapper, fontSelect);
            wrapper.appendChild(fontSelect);

            const clickArea = document.createElement('div');
            clickArea.style.position = 'absolute';
            clickArea.style.top = '0';
            clickArea.style.left = '0';
            clickArea.style.right = '0';
            clickArea.style.bottom = '0';
            clickArea.style.cursor = 'pointer';
            clickArea.style.zIndex = '10';
            wrapper.appendChild(clickArea);

            clickArea.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                activeTextInputId = 'textFont';
                showMobileFontPicker('textFont');
            });

            fontSelect.style.pointerEvents = 'none';
            fontSelect.style.appearance = 'none';
        } else {
            fontSelect.addEventListener('change', (e) => {
                if (!EditorState.activeTextId) return;
                const block = EditorState.textBlocks.find(b => b.id === EditorState.activeTextId);
                if (block) {
                    block.fontFamily = e.target.value;
                    updatePreviewTextBlocks();
                }
            });
        }
    }

    const sizeInput = document.getElementById('textSize');
    if (sizeInput) {
        sizeInput.addEventListener('input', (e) => {
            if (!EditorState.activeTextId) return;
            const block = EditorState.textBlocks.find(b => b.id === EditorState.activeTextId);
            if (block) {
                block.fontSize = parseInt(e.target.value);
                document.getElementById('textSizeValue').textContent = block.fontSize + 'px';
                updatePreviewTextBlocks();
            }
        });
    }

    document.getElementById('textBold')?.addEventListener('click', (e) => {
        e.preventDefault();
        if (!EditorState.activeTextId) return;
        const block = EditorState.textBlocks.find(b => b.id === EditorState.activeTextId);
        if (block) {
            block.fontWeight = block.fontWeight === 'bold' ? 'normal' : 'bold';
            document.getElementById('textBold').classList.toggle('active');
            updatePreviewTextBlocks();
        }
    });

    document.getElementById('textItalic')?.addEventListener('click', (e) => {
        e.preventDefault();
        if (!EditorState.activeTextId) return;
        const block = EditorState.textBlocks.find(b => b.id === EditorState.activeTextId);
        if (block) {
            block.fontStyle = block.fontStyle === 'italic' ? 'normal' : 'italic';
            document.getElementById('textItalic').classList.toggle('active');
            updatePreviewTextBlocks();
        }
    });

    const colorInput = document.getElementById('textColor');
    if (colorInput) {
        if (window.innerWidth <= 768) {
            const wrapper = document.createElement('div');
            wrapper.style.position = 'relative';
            wrapper.style.width = '100%';
            colorInput.parentNode.insertBefore(wrapper, colorInput);
            wrapper.appendChild(colorInput);

            const clickArea = document.createElement('div');
            clickArea.style.position = 'absolute';
            clickArea.style.top = '0';
            clickArea.style.left = '0';
            clickArea.style.right = '0';
            clickArea.style.bottom = '0';
            clickArea.style.cursor = 'pointer';
            clickArea.style.zIndex = '10';
            wrapper.appendChild(clickArea);

            clickArea.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                activeTextInputId = 'textColor';
                showMobileColorPicker('textColor');
            });

            colorInput.style.pointerEvents = 'none';
        } else {
            colorInput.addEventListener('input', (e) => {
                if (!EditorState.activeTextId) return;
                const block = EditorState.textBlocks.find(b => b.id === EditorState.activeTextId);
                if (block) {
                    block.color = e.target.value;
                    updatePreviewTextBlocks();
                }
            });
        }
    }

    const alignSelect = document.getElementById('textAlign');
    if (alignSelect) {
        alignSelect.addEventListener('change', (e) => {
            if (!EditorState.activeTextId) return;
            const block = EditorState.textBlocks.find(b => b.id === EditorState.activeTextId);
            if (block) {
                block.textAlign = e.target.value;
                updatePreviewTextBlocks();
            }
        });
    }

    const widthInput = document.getElementById('textWidth');
    if (widthInput) {
        widthInput.addEventListener('input', (e) => {
            if (!EditorState.activeTextId) return;
            const block = EditorState.textBlocks.find(b => b.id === EditorState.activeTextId);
            if (block) {
                block.width = parseInt(e.target.value);
                document.getElementById('textWidthValue').textContent = block.width + '%';
                updatePreviewTextBlocks();
            }
        });
    }

    const posX = document.getElementById('textPosX');
    if (posX) {
        posX.addEventListener('input', (e) => {
            if (!EditorState.activeTextId) return;
            const block = EditorState.textBlocks.find(b => b.id === EditorState.activeTextId);
            if (block) {
                block.posX = parseInt(e.target.value);
                document.getElementById('textPosXValue').textContent = block.posX + '%';
                updatePreviewTextBlocks();
            }
        });
    }

    const posY = document.getElementById('textPosY');
    if (posY) {
        posY.addEventListener('input', (e) => {
            if (!EditorState.activeTextId) return;
            const block = EditorState.textBlocks.find(b => b.id === EditorState.activeTextId);
            if (block) {
                block.posY = parseInt(e.target.value);
                document.getElementById('textPosYValue').textContent = block.posY + '%';
                updatePreviewTextBlocks();
            }
        });
    }

    document.getElementById('deleteTextBtn')?.addEventListener('click', () => {
        if (!EditorState.activeTextId) return;
        deleteTextBlock(EditorState.activeTextId);
    });
}

function initMobileFontPicker() {
    if (document.getElementById('mobileFontPicker')) return;

    const modal = document.createElement('div');
    modal.id = 'mobileFontPicker';
    modal.className = 'mobile-font-picker';
    modal.innerHTML = `
        <div class="mobile-font-picker-content">
            <div class="mobile-font-picker-header">
                <span>Выберите шрифт</span>
                <button class="mobile-font-picker-close">
                    <span class="material-symbols-outlined">close</span>
                </button>
            </div>
            <div class="mobile-font-picker-list" id="mobileFontList"></div>
        </div>
    `;
    document.body.appendChild(modal);

    const style = document.createElement('style');
    style.textContent = `
        .mobile-font-picker {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            z-index: 11000;
            display: none;
            align-items: flex-end;
            justify-content: center;
        }
        .mobile-font-picker.active {
            display: flex;
        }
        .mobile-font-picker-content {
            background: white;
            width: 100%;
            max-height: 70vh;
            border-radius: 20px 20px 0 0;
            display: flex;
            flex-direction: column;
            animation: slideUp 0.3s ease;
        }
        .mobile-font-picker-header {
            padding: 16px;
            background: linear-gradient(135deg, #A8D8EA, #FAC0C0);
            border-radius: 20px 20px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #475569;
            font-weight: 600;
        }
        .mobile-font-picker-header button {
            background: none;
            border: none;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: #475569;
        }
        .mobile-font-picker-list {
            overflow-y: auto;
            padding: 10px;
            max-height: calc(70vh - 70px);
        }
        .mobile-font-item {
            padding: 15px;
            border-bottom: 1px solid #e2e8f0;
            font-size: 18px;
            cursor: pointer;
            transition: background 0.2s;
        }
        .mobile-font-item:active {
            background: #f0f9ff;
        }
        .mobile-font-item.selected {
            background: #e6f3ff;
            border-left: 4px solid #A8D8EA;
        }
        @keyframes slideUp {
            from { transform: translateY(100%); }
            to { transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);

    const closeBtn = modal.querySelector('.mobile-font-picker-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    window.showMobileFontPicker = (targetSelectId) => {
        activeTextInputId = targetSelectId;
        const list = document.getElementById('mobileFontList');
        const currentValue = document.getElementById(targetSelectId).value;

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

        list.innerHTML = fonts.map(font => {
            const isSelected = font.value === currentValue ? 'selected' : '';
            return `<div class="mobile-font-item ${isSelected}" data-value="${font.value}" style="font-family: ${font.value}">${font.name}</div>`;
        }).join('');

        list.querySelectorAll('.mobile-font-item').forEach(item => {
            item.addEventListener('click', () => {
                const value = item.dataset.value;
                const select = document.getElementById(activeTextInputId);
                select.value = value;

                if (activeTextInputId === 'textFont' && EditorState.activeTextId) {
                    const block = EditorState.textBlocks.find(b => b.id === EditorState.activeTextId);
                    if (block) {
                        block.fontFamily = value;
                        updatePreviewTextBlocks();
                    }
                } else if (activeTextInputId === 'mobileTextFont' && EditorState.activeTextId) {
                    const block = EditorState.textBlocks.find(b => b.id === EditorState.activeTextId);
                    if (block) {
                        block.fontFamily = value;
                        updatePreviewTextBlocks();
                        updateMobileTextPanelValues(block);
                    }
                }

                modal.classList.remove('active');
            });
        });

        modal.classList.add('active');
    };
}

function initMobileColorPicker() {
    if (document.getElementById('mobileColorPicker')) return;

    const modal = document.createElement('div');
    modal.id = 'mobileColorPicker';
    modal.className = 'mobile-color-picker';
    modal.innerHTML = `
        <div class="mobile-color-picker-content">
            <div class="mobile-color-picker-header">
                <span>Выберите цвет</span>
                <button class="mobile-color-picker-close">
                    <span class="material-symbols-outlined">close</span>
                </button>
            </div>
            <div class="mobile-color-picker-body">
                <div class="quick-colors">
                    <div class="quick-color" style="background: #000000;" data-color="#000000"></div>
                    <div class="quick-color" style="background: #475569;" data-color="#475569"></div>
                    <div class="quick-color" style="background: #D4AF37;" data-color="#D4AF37"></div>
                    <div class="quick-color" style="background: #C0C0C0;" data-color="#C0C0C0"></div>
                    <div class="quick-color" style="background: #8B4513;" data-color="#8B4513"></div>
                    <div class="quick-color" style="background: #2E8B57;" data-color="#2E8B57"></div>
                    <div class="quick-color" style="background: #8B0000;" data-color="#8B0000"></div>
                    <div class="quick-color" style="background: #2047f8;" data-color="#2047f8"></div>
                    <div class="quick-color" style="background: #FF69B4;" data-color="#FF69B4"></div>
                    <div class="quick-color" style="background: #FFD700;" data-color="#FFD700"></div>
                    <div class="quick-color" style="background: #87CEEB;" data-color="#87CEEB"></div>
                    <div class="quick-color" style="background: #98FB98;" data-color="#98FB98"></div>
                    <div class="quick-color" style="background: #FFA07A;" data-color="#FFA07A"></div>
                    <div class="quick-color" style="background: #DDA0DD;" data-color="#DDA0DD"></div>
                    <div class="quick-color" style="background: #FFFFFF;" data-color="#FFFFFF"></div>
                </div>
                <div class="color-palette-container">
                    <canvas id="colorPalette" width="300" height="200"></canvas>
                    <div class="color-palette-preview" id="colorPreview"></div>
                </div>
                <div class="color-sliders">
                    <div class="color-slider-group">
                        <label>R <span id="redValue">255</span></label>
                        <input type="range" id="redSlider" min="0" max="255" value="255" class="color-slider red-slider">
                    </div>
                    <div class="color-slider-group">
                        <label>G <span id="greenValue">255</span></label>
                        <input type="range" id="greenSlider" min="0" max="255" value="255" class="color-slider green-slider">
                    </div>
                    <div class="color-slider-group">
                        <label>B <span id="blueValue">255</span></label>
                        <input type="range" id="blueSlider" min="0" max="255" value="255" class="color-slider blue-slider">
                    </div>
                </div>
                <div class="hex-input-group">
                    <span>#</span>
                    <input type="text" id="mobileHexInput" maxlength="6" placeholder="000000">
                </div>
                <div class="mobile-color-controls">
                    <button class="btn btn-secondary" id="mobileColorCancel">Отмена</button>
                    <button class="btn btn-primary" id="mobileColorApply">Применить</button>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const style = document.createElement('style');
    style.textContent = `
        .mobile-color-picker {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.5);
            z-index: 11000;
            display: none;
            align-items: flex-end;
            justify-content: center;
        }
        .mobile-color-picker.active {
            display: flex;
        }
        .mobile-color-picker-content {
            background: white;
            width: 100%;
            max-width: 500px;
            border-radius: 20px 20px 0 0;
            display: flex;
            flex-direction: column;
            animation: slideUp 0.3s ease;
            padding: 20px;
            max-height: 90vh;
            overflow-y: auto;
        }
        .mobile-color-picker-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
            color: #475569;
            font-weight: 600;
        }
        .mobile-color-picker-header button {
            background: none;
            border: none;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: #475569;
        }
        .color-palette-container {
            position: relative;
            margin-bottom: 15px;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        #colorPalette {
            width: 100%;
            height: auto;
            display: block;
            cursor: crosshair;
        }
        .color-palette-preview {
            position: absolute;
            bottom: 10px;
            right: 10px;
            width: 50px;
            height: 50px;
            border-radius: 8px;
            border: 2px solid white;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        .quick-colors {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 10px;
            margin-bottom: 15px;
        }
        .quick-color {
            aspect-ratio: 1;
            border-radius: 8px;
            cursor: pointer;
            border: 2px solid transparent;
            transition: all 0.2s;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .quick-color:hover {
            transform: scale(1.1);
            border-color: #A8D8EA;
        }
        .quick-color.selected {
            border-color: #A8D8EA;
            box-shadow: 0 0 0 2px #A8D8EA;
        }
        .color-sliders {
            margin-bottom: 15px;
        }
        .color-slider-group {
            margin-bottom: 10px;
        }
        .color-slider-group label {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
            color: #475569;
            font-size: 14px;
        }
        .color-slider {
            width: 100%;
            height: 8px;
            border-radius: 4px;
            -webkit-appearance: none;
            appearance: none;
        }
        .color-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: white;
            border: 2px solid #A8D8EA;
            cursor: pointer;
            margin-top: -6px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        }
        .red-slider { background: linear-gradient(to right, #000000, #FF0000); }
        .green-slider { background: linear-gradient(to right, #000000, #00FF00); }
        .blue-slider { background: linear-gradient(to right, #000000, #0000FF); }
        .hex-input-group {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 15px;
            background: #f8fafc;
            padding: 10px;
            border-radius: 8px;
        }
        .hex-input-group span {
            font-size: 18px;
            font-weight: 600;
            color: #475569;
        }
        .hex-input-group input {
            flex: 1;
            padding: 8px;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            font-size: 14px;
            text-transform: uppercase;
        }
        .mobile-color-controls {
            display: flex;
            gap: 10px;
        }
        .mobile-color-controls button {
            flex: 1;
            padding: 15px;
            font-size: 16px;
            border-radius: 12px;
            border: none;
            font-weight: 600;
            cursor: pointer;
        }
        .btn-secondary {
            background: #e2e8f0;
            color: #475569;
        }
        .btn-primary {
            background: linear-gradient(135deg, #A8D8EA, #FAC0C0);
            color: #475569;
        }
    `;
    document.head.appendChild(style);

    initColorPalette();

    const closeBtn = modal.querySelector('.mobile-color-picker-close');
    const cancelBtn = modal.querySelector('#mobileColorCancel');
    const applyBtn = modal.querySelector('#mobileColorApply');
    const hexInput = modal.querySelector('#mobileHexInput');
    const quickColors = modal.querySelectorAll('.quick-color');
    const redSlider = document.getElementById('redSlider');
    const greenSlider = document.getElementById('greenSlider');
    const blueSlider = document.getElementById('blueSlider');
    const redValue = document.getElementById('redValue');
    const greenValue = document.getElementById('greenValue');
    const blueValue = document.getElementById('blueValue');
    const colorPreview = document.getElementById('colorPreview');
    const canvas = document.getElementById('colorPalette');

    let currentColor = { r: 255, g: 255, b: 255 };

    function updateColorFromRGB() {
        const r = parseInt(redSlider.value);
        const g = parseInt(greenSlider.value);
        const b = parseInt(blueSlider.value);

        currentColor = { r, g, b };

        redValue.textContent = r;
        greenValue.textContent = g;
        blueValue.textContent = b;

        const hex = ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
        hexInput.value = hex;
        colorPreview.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    }

    function updateColorFromHex() {
        let hex = hexInput.value.replace('#', '').toUpperCase();
        while (hex.length < 6) hex += '0';
        if (/^[0-9A-F]{6}$/.test(hex)) {
            const r = parseInt(hex.substring(0, 2), 16);
            const g = parseInt(hex.substring(2, 4), 16);
            const b = parseInt(hex.substring(4, 6), 16);

            redSlider.value = r;
            greenSlider.value = g;
            blueSlider.value = b;
            updateColorFromRGB();
        }
    }

    if (canvas) {
        canvas.addEventListener('click', (e) => {
            const rect = canvas.getBoundingClientRect();
            const scaleX = canvas.width / rect.width;
            const scaleY = canvas.height / rect.height;

            const x = Math.floor((e.clientX - rect.left) * scaleX);
            const y = Math.floor((e.clientY - rect.top) * scaleY);

            const ctx = canvas.getContext('2d');
            const pixel = ctx.getImageData(x, y, 1, 1).data;

            redSlider.value = pixel[0];
            greenSlider.value = pixel[1];
            blueSlider.value = pixel[2];

            updateColorFromRGB();
        });
    }

    if (redSlider) {
        redSlider.addEventListener('input', updateColorFromRGB);
        greenSlider.addEventListener('input', updateColorFromRGB);
        blueSlider.addEventListener('input', updateColorFromRGB);
    }

    if (hexInput) {
        hexInput.addEventListener('input', updateColorFromHex);
    }

    quickColors.forEach(color => {
        color.addEventListener('click', () => {
            quickColors.forEach(c => c.classList.remove('selected'));
            color.classList.add('selected');

            const hex = color.dataset.color;
            const r = parseInt(hex.substring(1, 3), 16);
            const g = parseInt(hex.substring(3, 5), 16);
            const b = parseInt(hex.substring(5, 7), 16);

            redSlider.value = r;
            greenSlider.value = g;
            blueSlider.value = b;
            updateColorFromRGB();
        });
    });

    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    cancelBtn.addEventListener('click', () => modal.classList.remove('active'));

    applyBtn.addEventListener('click', () => {
        if (activeTextInputId) {
            const input = document.getElementById(activeTextInputId);
            if (input) {
                const hex = ((1 << 24) + (currentColor.r << 16) + (currentColor.g << 8) + currentColor.b).toString(16).slice(1).toUpperCase();
                const fullHex = '#' + hex;
                input.value = fullHex;

                if (activeTextInputId === 'textColor' && EditorState.activeTextId) {
                    const block = EditorState.textBlocks.find(b => b.id === EditorState.activeTextId);
                    if (block) {
                        block.color = fullHex;
                        updatePreviewTextBlocks();
                    }
                } else if (activeTextInputId === 'mobileTextColor' && EditorState.activeTextId) {
                    const block = EditorState.textBlocks.find(b => b.id === EditorState.activeTextId);
                    if (block) {
                        block.color = fullHex;
                        updatePreviewTextBlocks();
                        updateMobileTextPanelValues(block);
                    }
                } else if (activeTextInputId === 'borderColor') {
                    document.getElementById('borderColor').value = fullHex;
                    if (EditorState) {
                        EditorState.borderColor = fullHex;
                        if (typeof updatePreview === 'function') updatePreview();
                    }
                } else if (activeTextInputId === 'containerBgColor') {
                    document.getElementById('containerBgColor').value = fullHex;
                    if (EditorState) {
                        EditorState.containerBgColor = fullHex;
                        if (typeof updatePreview === 'function') updatePreview();
                    }
                }
            }
        }
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    window.showMobileColorPicker = (targetInputId) => {
        activeTextInputId = targetInputId;
        const input = document.getElementById(targetInputId);
        if (input) {
            const hex = input.value;
            const r = parseInt(hex.substring(1, 3), 16);
            const g = parseInt(hex.substring(3, 5), 16);
            const b = parseInt(hex.substring(5, 7), 16);

            if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
                redSlider.value = r;
                greenSlider.value = g;
                blueSlider.value = b;
                updateColorFromRGB();
            }
        }
        modal.classList.add('active');
    };
}

function initColorPalette() {
    const canvas = document.getElementById('colorPalette');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    for (let x = 0; x < width; x++) {
        const hue = (x / width) * 360;
        for (let y = 0; y < height; y++) {
            const saturation = 1;
            const lightness = 0.5 - (y / height) * 0.5;
            ctx.fillStyle = `hsl(${hue}, ${saturation * 100}%, ${lightness * 100}%)`;
            ctx.fillRect(x, y, 1, 1);
        }
    }
}

function initMobileTextPanel() {
    mobileTextPanel = document.getElementById('mobileTextPanel');
    if (!mobileTextPanel) return;

    let isManualSwitch = false;

    const closeBtn = document.getElementById('mobileTextClose');
    if (closeBtn) closeBtn.addEventListener('click', closeMobileTextPanel);

    const doneBtn = document.getElementById('mobileTextDone');
    if (doneBtn) {
        doneBtn.addEventListener('click', () => {
            if (EditorState.activeTextId) {
                EditorState.activeTextId = null;
                hideTextControls();
                renderTextList();
                updatePreviewTextBlocks();
            }
            closeMobileTextPanel();
        });
    }

    const mobileTabs = document.getElementById('mobileTabs');
    if (mobileTabs) {
        const settingsTab = mobileTabs.querySelector('.mobile-tab[data-tab="settings"]');
        if (settingsTab) {
            settingsTab.addEventListener('click', () => {
                if (mobileTextPanel.classList.contains('active')) {
                    isManualSwitch = true;
                    if (EditorState.activeTextId) {
                        EditorState.activeTextId = null;
                        hideTextControls();
                        renderTextList();
                        updatePreviewTextBlocks();
                    }
                    closeMobileTextPanel();
                }
            });
        }

        const observer = new MutationObserver(() => {
            const activeTab = document.querySelector('.mobile-tab.active');
            if (activeTab && activeTab.dataset.tab === 'settings' && mobileTextPanel.classList.contains('active')) {
                if (!isManualSwitch) {
                    closeMobileTextPanel();
                }
                isManualSwitch = false;
            }
        });

        observer.observe(mobileTabs, {
            attributes: true,
            subtree: true,
            attributeFilter: ['class']
        });
    }

    const mobileContent = document.getElementById('mobileTextContent');
    if (mobileContent) {
        mobileContent.addEventListener('input', (e) => {
            if (!EditorState.activeTextId) return;
            const block = EditorState.textBlocks.find(b => b.id === EditorState.activeTextId);
            if (block) {
                block.content = e.target.value;
                updatePreviewTextBlocks();
                const previewEl = document.querySelector(`.text-list-item[data-text-id="${block.id}"] .text-list-preview`);
                if (previewEl) {
                    previewEl.textContent = block.content.substring(0, 20) + (block.content.length > 20 ? '...' : '');
                }
            }
        });
    }

    const mobileFont = document.getElementById('mobileTextFont');
    if (mobileFont) {
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        wrapper.style.width = '100%';
        mobileFont.parentNode.insertBefore(wrapper, mobileFont);
        wrapper.appendChild(mobileFont);

        const clickArea = document.createElement('div');
        clickArea.style.position = 'absolute';
        clickArea.style.top = '0';
        clickArea.style.left = '0';
        clickArea.style.right = '0';
        clickArea.style.bottom = '0';
        clickArea.style.cursor = 'pointer';
        clickArea.style.zIndex = '10';
        wrapper.appendChild(clickArea);

        clickArea.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            activeTextInputId = 'mobileTextFont';
            showMobileFontPicker('mobileTextFont');
        });

        mobileFont.style.pointerEvents = 'none';
        mobileFont.style.appearance = 'none';
    }

    const mobileSize = document.getElementById('mobileTextSize');
    if (mobileSize) {
        mobileSize.addEventListener('input', (e) => {
            if (!EditorState.activeTextId) return;
            const block = EditorState.textBlocks.find(b => b.id === EditorState.activeTextId);
            if (block) {
                block.fontSize = parseInt(e.target.value);
                document.getElementById('mobileTextSizeValue').textContent = block.fontSize + 'px';
                updatePreviewTextBlocks();
            }
        });
    }

    document.getElementById('mobileTextBold')?.addEventListener('click', (e) => {
        e.preventDefault();
        if (!EditorState.activeTextId) return;
        const block = EditorState.textBlocks.find(b => b.id === EditorState.activeTextId);
        if (block) {
            block.fontWeight = block.fontWeight === 'bold' ? 'normal' : 'bold';
            document.getElementById('mobileTextBold').classList.toggle('active');
            updatePreviewTextBlocks();
        }
    });

    document.getElementById('mobileTextItalic')?.addEventListener('click', (e) => {
        e.preventDefault();
        if (!EditorState.activeTextId) return;
        const block = EditorState.textBlocks.find(b => b.id === EditorState.activeTextId);
        if (block) {
            block.fontStyle = block.fontStyle === 'italic' ? 'normal' : 'italic';
            document.getElementById('mobileTextItalic').classList.toggle('active');
            updatePreviewTextBlocks();
        }
    });

    const mobileColor = document.getElementById('mobileTextColor');
    if (mobileColor) {
        const wrapper = document.createElement('div');
        wrapper.style.position = 'relative';
        wrapper.style.width = '100%';
        mobileColor.parentNode.insertBefore(wrapper, mobileColor);
        wrapper.appendChild(mobileColor);

        const clickArea = document.createElement('div');
        clickArea.style.position = 'absolute';
        clickArea.style.top = '0';
        clickArea.style.left = '0';
        clickArea.style.right = '0';
        clickArea.style.bottom = '0';
        clickArea.style.cursor = 'pointer';
        clickArea.style.zIndex = '10';
        wrapper.appendChild(clickArea);

        clickArea.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            activeTextInputId = 'mobileTextColor';
            showMobileColorPicker('mobileTextColor');
        });

        mobileColor.style.pointerEvents = 'none';
    }

    const mobileAlign = document.getElementById('mobileTextAlign');
    if (mobileAlign) {
        mobileAlign.addEventListener('change', (e) => {
            if (!EditorState.activeTextId) return;
            const block = EditorState.textBlocks.find(b => b.id === EditorState.activeTextId);
            if (block) {
                block.textAlign = e.target.value;
                updatePreviewTextBlocks();
            }
        });
    }

    const mobileWidth = document.getElementById('mobileTextWidth');
    if (mobileWidth) {
        mobileWidth.addEventListener('input', (e) => {
            if (!EditorState.activeTextId) return;
            const block = EditorState.textBlocks.find(b => b.id === EditorState.activeTextId);
            if (block) {
                block.width = parseInt(e.target.value);
                document.getElementById('mobileTextWidthValue').textContent = block.width + '%';
                updatePreviewTextBlocks();
            }
        });
    }

    const mobilePosX = document.getElementById('mobileTextPosX');
    if (mobilePosX) {
        mobilePosX.addEventListener('input', (e) => {
            if (!EditorState.activeTextId) return;
            const block = EditorState.textBlocks.find(b => b.id === EditorState.activeTextId);
            if (block) {
                block.posX = parseInt(e.target.value);
                document.getElementById('mobileTextPosXValue').textContent = block.posX + '%';
                updatePreviewTextBlocks();
            }
        });
    }

    const mobilePosY = document.getElementById('mobileTextPosY');
    if (mobilePosY) {
        mobilePosY.addEventListener('input', (e) => {
            if (!EditorState.activeTextId) return;
            const block = EditorState.textBlocks.find(b => b.id === EditorState.activeTextId);
            if (block) {
                block.posY = parseInt(e.target.value);
                document.getElementById('mobileTextPosYValue').textContent = block.posY + '%';
                updatePreviewTextBlocks();
            }
        });
    }

    const deleteBtn = document.getElementById('mobileDeleteTextBtn');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
            if (!EditorState.activeTextId) return;
            deleteTextBlock(EditorState.activeTextId);
            closeMobileTextPanel();
        });
    }
}

function openMobileTextPanel(textId) {
    if (window.innerWidth > 768) return;

    if (mobileTextPanel) {
        mobileTextPanel.classList.add('active');

        setTimeout(() => {
            const card = document.getElementById('previewCard');
            const container = document.querySelector('.preview-container');
            if (card && container) {
                const cardRect = card.getBoundingClientRect();
                if (cardRect.bottom > window.innerHeight - 200) {
                    container.scrollTo({
                        top: container.scrollTop + (cardRect.bottom - window.innerHeight + 200),
                        behavior: 'smooth'
                    });
                }
            }
        }, 100);
    }

    const block = EditorState.textBlocks.find(b => b.id === textId);
    if (block) updateMobileTextPanelValues(block);
}

function closeMobileTextPanel() {
    if (mobileTextPanel) {
        mobileTextPanel.classList.remove('active');
    }
}

function updateMobileTextPanelValues(block) {
    const contentInput = document.getElementById('mobileTextContent');
    if (contentInput) contentInput.value = block.content || '';

    const fontSelect = document.getElementById('mobileTextFont');
    if (fontSelect) fontSelect.value = block.fontFamily;

    const sizeInput = document.getElementById('mobileTextSize');
    const sizeValue = document.getElementById('mobileTextSizeValue');
    if (sizeInput) sizeInput.value = block.fontSize;
    if (sizeValue) sizeValue.textContent = block.fontSize + 'px';

    document.getElementById('mobileTextBold')?.classList.toggle('active', block.fontWeight === 'bold');
    document.getElementById('mobileTextItalic')?.classList.toggle('active', block.fontStyle === 'italic');

    const colorInput = document.getElementById('mobileTextColor');
    if (colorInput) colorInput.value = block.color;

    const alignSelect = document.getElementById('mobileTextAlign');
    if (alignSelect) alignSelect.value = block.textAlign;

    const widthInput = document.getElementById('mobileTextWidth');
    const widthValue = document.getElementById('mobileTextWidthValue');
    if (widthInput) widthInput.value = block.width;
    if (widthValue) widthValue.textContent = block.width + '%';

    const posX = document.getElementById('mobileTextPosX');
    const posXValue = document.getElementById('mobileTextPosXValue');
    if (posX) posX.value = block.posX;
    if (posXValue) posXValue.textContent = block.posX + '%';

    const posY = document.getElementById('mobileTextPosY');
    const posYValue = document.getElementById('mobileTextPosYValue');
    if (posY) posY.value = block.posY;
    if (posYValue) posYValue.textContent = block.posY + '%';
}

window.textBlocksAPI = {
    addTextBlock,
    selectTextBlock,
    deleteTextBlock,
    moveTextBlock,
    updatePreviewTextBlocks,
    initTextBlocks,
    openMobileTextPanel,
    closeMobileTextPanel,
    renderTextList
};