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
            overflow: ${data.clipDecorations ? 'hidden' : 'visible'};
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

    applyMobileScale();

    if (data.enableAnimations && window.animationManager) {
        setTimeout(() => {
            let container;
            if (data.animationPosition === 'around-card') {
                container = document.getElementById('invitationCard');
            } else {
                container = document.querySelector('.invitation-wrapper');
            }

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
        }, 500);
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
    const path = window.location.pathname;
    const hash = window.location.hash;
    const wwwLink = `www.invitation-online.ru${path}${hash}`;
    navigator.clipboard.writeText(wwwLink).then(() => {
        const btn = document.getElementById('copyLinkBtn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span class="material-symbols-outlined">check</span> Скопировано!';
        setTimeout(() => { btn.innerHTML = originalText; }, 2000);
    });
}