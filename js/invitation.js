let invitationSlug = null;

document.addEventListener('DOMContentLoaded', async () => {
    if (window.location.hash) {
        invitationSlug = window.location.hash.substring(1);
        await checkPendingAfterPayment();
        await loadInvitation();
    } else {
        showError();
    }
    document.getElementById('copyLinkBtn')?.addEventListener('click', copyInvitationLink);
    document.getElementById('shareBtn')?.addEventListener('click', shareInvitation);
    applyMobileScale();
    window.addEventListener('resize', () => applyMobileScale());
    window.addEventListener('orientationchange', () => setTimeout(applyMobileScale, 100));
});

function applyMobileScale() {
    const container = document.querySelector('.invitation-wrapper');
    const card = document.getElementById('invitationCard');

    if (!container || !card) return;

    if (window.innerWidth <= 768) {
        const containerWidth = container.clientWidth - 40;
        const cardWidth = 500;
        let scale = containerWidth / cardWidth;
        scale = Math.min(scale, 0.9);

        card.style.transform = `scale(${scale})`;
        card.style.transformOrigin = 'center top';
        card.style.margin = '20px auto';
        card.style.marginBottom = `${50 + (1 - scale) * 200}px`;
    } else {
        card.style.transform = 'none';
        card.style.margin = '0 auto';
    }
}

async function checkPendingAfterPayment() {
    const pending = localStorage.getItem('pendingInvitation');
    if (!pending) return false;
    try {
        const { slug, data, timestamp } = JSON.parse(pending);
        if (timestamp && Date.now() - timestamp > 60 * 60 * 1000) {
            localStorage.removeItem('pendingInvitation');
            return false;
        }
        if (slug !== invitationSlug) return false;
        const existing = await db.collection('invitations').where('slug', '==', slug).get();
        if (existing.empty) {
            await db.collection('invitations').add({
                ...data,
                slug: slug,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                paid: true,
                recoveredAt: new Date().toISOString()
            });
        }
        localStorage.removeItem('pendingInvitation');
        return true;
    } catch (error) {
        console.error('Error checking pending:', error);
        return false;
    }
}

async function loadInvitation() {
    try {
        document.getElementById('loadingSpinner').style.display = 'flex';
        document.getElementById('invitationWrapper').style.display = 'none';
        document.getElementById('errorPage').style.display = 'none';
        const query = await db.collection('invitations').where('slug', '==', invitationSlug).limit(1).get();
        if (!query.empty) {
            displayInvitation(query.docs[0].data());
        } else {
            showError();
        }
    } catch (error) {
        console.error('Load error:', error);
        showError();
    }
}

function displayInvitation(data) {
    document.getElementById('loadingSpinner').style.display = 'none';
    document.getElementById('invitationWrapper').style.display = 'block';
    document.getElementById('errorPage').style.display = 'none';

    const patternBg = document.querySelector('.pattern-bg');
    if (patternBg) {
        patternBg.style.backgroundImage = `url('/images/patterns/${data.pattern || 'wedding6.webp'}')`;
        patternBg.style.opacity = data.bgOpacity || 0.2;
    }

    const containerBgColor = data.containerBgColor || '#FFFFFF';
    const containerBgOpacity = data.containerBgOpacity || 0.95;
    const rgb = hexToRgb(containerBgColor);

    const content = document.getElementById('invitationContent');
    const clipDecorations = data.clipDecorations !== undefined ? data.clipDecorations : true;

    content.innerHTML = `
        <div class="invitation-card" id="invitationCard" style="
            border: ${data.borderWidth || 2}px solid ${data.borderColor || '#D4AF37'};
            border-radius: ${data.borderRadius || 30}px;
            background-color: rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${containerBgOpacity});
            width: 500px;
            min-width: 500px;
            max-width: 500px;
            min-height: ${data.cardHeight || 700}px;
            height: auto;
            margin: 0 auto;
            padding: 2.5rem 2rem;
            position: relative;
            box-shadow: ${data.borderGlowEnabled ? `0 0 ${data.borderGlowSize || 10}px ${data.borderGlowColor || data.borderColor || '#D4AF37'}, 0 25px 50px -12px rgba(0,0,0,0.25)` : '0 25px 50px -12px rgba(0,0,0,0.25)'};
            transform-origin: center top;
            overflow: ${clipDecorations ? 'hidden' : 'visible'};
        "></div>
    `;

    const card = document.getElementById('invitationCard');

    if (data.decorations && Array.isArray(data.decorations)) {
        data.decorations.forEach(decor => {
            const decorEl = document.createElement('div');
            decorEl.className = `invitation-decor ${decor.aboveText ? 'above-text' : ''}`;
            decorEl.style.cssText = `
                position: absolute;
                width: ${decor.width || 150}px;
                height: ${decor.width || 150}px;
                left: ${decor.posX || 50}%;
                top: ${decor.posY || 50}%;
                transform: translate(-50%, -50%) rotate(${decor.rotation || 0}deg);
                background-image: url('/images/decorations/${decor.file}');
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                opacity: ${decor.opacity || 1};
                pointer-events: none;
                z-index: ${decor.aboveText ? 30 : 5};
            `;
            card.appendChild(decorEl);
        });
    }

    if (data.textBlocks && Array.isArray(data.textBlocks)) {
        const sortedBlocks = [...data.textBlocks].sort((a, b) => a.order - b.order);

        sortedBlocks.forEach(block => {
            const blockEl = document.createElement('div');
            blockEl.className = `text-block ${block.aboveText ? 'above-text' : ''}`;
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

    const firstTextBlock = data.textBlocks?.find(b => b.content);
    document.title = (firstTextBlock?.content || 'Приглашение') + ' - invitation-online';

    window.invitationAnimationData = data;
    window.invitationClipDecorations = clipDecorations;

    applyMobileScale();

    if (data.enableAnimations && window.animationManager) {
        setTimeout(() => {
            startAnimations(data);
        }, 500);
    }

    setupButtons();
}

function startAnimations(data) {
    if (!data.enableAnimations) return;

    let container;
    if (data.animationPosition === 'around-card') {
        container = document.getElementById('invitationCard');
    } else {
        container = document.querySelector('.invitation-wrapper');
    }

    if (window.animationManager) {
        window.animationManager.start({
            enabled: true,
            type: data.animationType || 'balloons',
            intensity: data.animationIntensity || 5,
            speed: data.animationSpeed || 3,
            colors: data.animationColors || ['#FF69B4', '#FFD700', '#87CEEB'],
            size: data.animationSize || 60,
            position: data.animationPosition || 'whole',
            container: container
        });
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

function showError() {
    document.getElementById('loadingSpinner').style.display = 'none';
    document.getElementById('invitationWrapper').style.display = 'none';
    document.getElementById('errorPage').style.display = 'block';
}

function copyInvitationLink() {
    const fullUrl = window.location.href;
    navigator.clipboard.writeText(fullUrl).then(() => {
        showToast('Ссылка скопирована!', 'success');
    }).catch(() => {
        showToast('Не удалось скопировать', 'error');
    });
}

function shareInvitation() {
    const fullUrl = window.location.href;
    const title = document.title;

    if (navigator.share) {
        navigator.share({
            title: title,
            text: 'Посмотрите моё приглашение!',
            url: fullUrl
        }).catch(() => { });
    } else {
        copyInvitationLink();
    }
}

function setupButtons() {
    const downloadBtn = document.getElementById('downloadImageBtn');
    if (downloadBtn) {
        const newBtn = downloadBtn.cloneNode(true);
        downloadBtn.parentNode.replaceChild(newBtn, downloadBtn);
        newBtn.addEventListener('click', downloadInvitationAsImage);
    }
}

async function downloadInvitationAsImage() {
    const card = document.getElementById('invitationCard');
    if (!card) {
        showToast('Приглашение не найдено', 'error');
        return;
    }

    if (typeof html2canvas === 'undefined') {
        showToast('Загрузка библиотеки... Попробуйте ещё раз', 'error');
        return;
    }

    const btn = document.getElementById('downloadImageBtn');
    const originalHTML = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

    const animationContainer = document.querySelector('.animation-container');
    const wasAnimationManagerRunning = window.animationManager && window.animationManager.isRunning;

    if (window.animationManager && window.animationManager.isRunning) {
        window.animationManager.stop();
    }

    if (animationContainer) {
        animationContainer.style.display = 'none';
    }

    const actionsDiv = document.querySelector('.invitation-actions');
    const originalActionsDisplay = actionsDiv ? actionsDiv.style.display : null;
    if (actionsDiv) {
        actionsDiv.style.display = 'none';
    }

    const shouldClip = window.invitationClipDecorations === true;

    try {
        await new Promise(resolve => setTimeout(resolve, 100));

        const originalWidth = card.style.width;
        const originalMinWidth = card.style.minWidth;
        const originalMaxWidth = card.style.maxWidth;
        const originalPosition = card.style.position;
        const originalLeft = card.style.left;
        const originalTop = card.style.top;
        const originalTransform = card.style.transform;
        const originalOverflow = card.style.overflow;
        const originalBoxShadow = card.style.boxShadow;

        card.style.position = 'relative';
        card.style.left = 'auto';
        card.style.top = 'auto';
        card.style.transform = 'none';
        card.style.width = '500px';
        card.style.minWidth = '500px';
        card.style.maxWidth = '500px';
        card.style.overflow = shouldClip ? 'hidden' : 'visible';

        const cardRect = card.getBoundingClientRect();
        const cardWidth = cardRect.width;
        const cardHeight = cardRect.height;

        const padding = 40;
        const finalWidth = cardWidth + (padding * 2);
        const finalHeight = cardHeight + (padding * 2);

        const canvas = await html2canvas(card, {
            scale: 4,
            backgroundColor: null,
            useCORS: true,
            logging: false,
            allowTaint: false,
            shadow: true,
            onclone: (clonedDoc, element) => {
                const clonedCard = clonedDoc.getElementById('invitationCard');
                if (clonedCard) {
                    clonedCard.style.position = 'relative';
                    clonedCard.style.left = 'auto';
                    clonedCard.style.top = 'auto';
                    clonedCard.style.transform = 'none';
                    clonedCard.style.overflow = shouldClip ? 'hidden' : 'visible';
                    const originalCard = document.getElementById('invitationCard');
                    if (originalCard) {
                        const originalShadow = window.getComputedStyle(originalCard).boxShadow;
                        clonedCard.style.boxShadow = originalShadow;
                    }
                }
                const clonedAnimations = clonedDoc.querySelectorAll('.animation-container');
                clonedAnimations.forEach(anim => anim.style.display = 'none');
                const clonedActions = clonedDoc.querySelectorAll('.invitation-actions');
                clonedActions.forEach(actions => actions.style.display = 'none');
            }
        });

        card.style.width = originalWidth;
        card.style.minWidth = originalMinWidth;
        card.style.maxWidth = originalMaxWidth;
        card.style.position = originalPosition;
        card.style.left = originalLeft;
        card.style.top = originalTop;
        card.style.transform = originalTransform;
        card.style.overflow = originalOverflow;
        card.style.boxShadow = originalBoxShadow;

        const finalCanvas = document.createElement('canvas');
        finalCanvas.width = finalWidth;
        finalCanvas.height = finalHeight;
        const ctx = finalCanvas.getContext('2d');

        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = 'high';

        const patternBgElement = document.querySelector('.pattern-bg');
        let patternImage = null;

        if (patternBgElement && patternBgElement.style.backgroundImage) {
            const bgUrl = patternBgElement.style.backgroundImage.slice(5, -2);
            patternImage = await loadImage(bgUrl);
        }

        if (patternImage) {
            const pattern = ctx.createPattern(patternImage, 'repeat');
            ctx.fillStyle = pattern;
            ctx.fillRect(0, 0, finalWidth, finalHeight);
        } else {
            ctx.fillStyle = '#f5f7fa';
            ctx.fillRect(0, 0, finalWidth, finalHeight);
        }

        ctx.drawImage(canvas, padding, padding, cardWidth, cardHeight);

        const link = document.createElement('a');
        const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
        link.download = `invitation-${timestamp}.png`;
        link.href = finalCanvas.toDataURL('image/png');
        link.click();

        showToast('Приглашение сохранено!', 'success');

    } catch (error) {
        console.error('Ошибка при создании скриншота:', error);
        showToast('Не удалось создать изображение', 'error');
    } finally {
        if (animationContainer) {
            animationContainer.style.display = '';
        }

        if (actionsDiv) {
            actionsDiv.style.display = originalActionsDisplay || '';
        }

        if (window.invitationAnimationData && window.invitationAnimationData.enableAnimations) {
            setTimeout(() => {
                startAnimations(window.invitationAnimationData);
            }, 100);
        }

        btn.disabled = false;
        btn.innerHTML = originalHTML;
    }
}

function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => resolve(img);
        img.onerror = () => reject(null);
        img.src = url;
    });
}

function showToast(message, type = 'info') {
    const oldToast = document.querySelector('.invitation-toast');
    if (oldToast) oldToast.remove();

    const toast = document.createElement('div');
    toast.className = 'invitation-toast';
    const icons = { success: '✓', error: '✗', info: 'ℹ' };
    const colors = { success: '#4CAF50', error: '#F44336', info: '#2196F3' };

    toast.innerHTML = `
        <div style="
            position: fixed;
            bottom: 80px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 10000;
            background: ${colors[type]};
            color: white;
            padding: 8px 16px;
            border-radius: 40px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 13px;
            font-weight: 500;
            animation: slideUp 0.3s ease;
            white-space: nowrap;
        ">
            <span style="font-size: 14px;">${icons[type]}</span>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.transition = 'opacity 0.3s';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }
    }, 2000);
}