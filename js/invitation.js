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
});

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

function applyMobileScale() {
    const isMobile = window.innerWidth <= 768;
    document.querySelectorAll('.invitation-card').forEach(card => {
        if (isMobile) {
            card.style.transform = 'scale(0.7)';
            card.style.transformOrigin = 'center top';
            card.style.margin = '20px auto';
        } else {
            card.style.transform = 'none';
        }
    });
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
        patternBg.style.backgroundImage = `url('/images/patterns/${data.pattern || 'bg1.png'}')`;
        patternBg.style.opacity = data.bgOpacity || 0.2;
    }
    const containerBgColor = data.containerBgColor || '#FFFFFF';
    const containerBgOpacity = data.containerBgOpacity || 0.95;
    const rgb = hexToRgb(containerBgColor);
    const messageText = data.messageText || '';
    const lines = messageText.split('\n');
    let messageHtml = '';
    lines.forEach((line, index) => {
        messageHtml += `<div class="message-line" style="width:100%; text-align:center; white-space:pre-wrap; word-wrap:break-word; margin:0; padding:0;">${line || '&nbsp;'}</div>`;
        if (data.enablePerLineDecor && index < lines.length - 1) {
            messageHtml += `<div class="message-line-decor" style="width:80%; height:1px; background:${data.textColor || '#475569'}; opacity:0.3; pointer-events:none;"></div>`;
        }
    });
    const showBottomLine = data.enableMessageLine && messageText.trim() !== '';
    const bottomLineOpacity = showBottomLine ? (data.messageLineOpacity || 0.3) : 0;
    const content = document.getElementById('invitationContent');
    content.innerHTML = `
        <div class="invitation-card" id="invitationCard" style="
            border: ${data.borderWidth || 2}px solid ${data.borderColor || '#D4AF37'};
            border-radius: ${data.borderRadius || 30}px;
            background-color: rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${containerBgOpacity});
            color: ${data.textColor || '#475569'};
            width: 500px;
            min-width: 500px;
            max-width: 500px;
            margin: 0 auto;
            padding: 2.5rem 2rem;
            position: relative;
            box-shadow: ${data.borderGlowEnabled ? `0 0 ${data.borderGlowSize || 10}px ${data.borderGlowColor || data.borderColor || '#D4AF37'}, 0 25px 50px -12px rgba(0,0,0,0.25)` : '0 25px 50px -12px rgba(0,0,0,0.25)'};
            transform-origin: center top;
            overflow: ${data.clipDecorations ? 'hidden' : 'visible'};
        ">
            <div class="card-header" style="text-align: center; margin-bottom: 1rem;">
                <div class="decor-line" style="width: 80px; height: 2px; background: currentColor; margin: 0.5rem auto; opacity: ${data.showDecorLines !== false ? '0.5' : '0'};"></div>
                <h2 class="event-type" style="font-size: ${data.eventTypeSize || 16}px; letter-spacing: 2px; text-transform: uppercase; margin: 0.5rem 0; font-weight: ${data.eventTypeBold ? 'bold' : 'normal'}; font-style: ${data.eventTypeItalic ? 'italic' : 'normal'}; font-family: ${data.eventTypeFont || "'Playfair Display', serif"};">${data.eventType || 'Приглашение'}</h2>
                <div class="decor-line" style="width: 80px; height: 2px; background: currentColor; margin: 0.5rem auto; opacity: ${data.showDecorLines !== false ? '0.5' : '0'};"></div>
            </div>
            <div class="card-body" style="text-align: center;">
                <h1 class="names" style="font-family: ${data.namesFont || "'Great Vibes', cursive"}; font-size: ${data.namesSize || 48}px; margin: 0.5rem 0; line-height: 1.2; font-weight: ${data.namesBold ? 'bold' : 'normal'}; font-style: ${data.namesItalic ? 'italic' : 'normal'};">${data.names || 'Александр & Елена'}</h1>
                <p class="greeting" style="font-size: ${data.greetingSize || 18}px; margin-bottom: 2rem; font-family: ${data.greetingFont || "'Playfair Display', serif"}; font-weight: ${data.greetingBold ? 'bold' : 'normal'}; font-style: ${data.greetingItalic ? 'italic' : 'normal'};">${data.greeting || 'приглашают вас разделить с ними радость'}</p>
                <div class="details" style="margin: 0.3rem 0;">
                    <p class="date" style="font-size: ${data.dateSize || 18}px; font-family: ${data.dateFont || "'Playfair Display', serif"}; font-weight: ${data.dateBold ? 'bold' : 'normal'}; font-style: ${data.dateItalic ? 'italic' : 'normal'};">${data.dateText || '15 июня 2026'}</p>
                    <p class="time" style="font-size: ${data.timeSize || 18}px; font-family: ${data.timeFont || "'Playfair Display', serif"}; font-weight: ${data.timeBold ? 'bold' : 'normal'}; font-style: ${data.timeItalic ? 'italic' : 'normal'};">${data.timeText || 'в 16:00'}</p>
                    <p class="place" style="font-size: ${data.placeSize || 18}px; font-weight: ${data.placeBold ? 'bold' : '600'}; margin-top: 0.5rem; font-family: ${data.placeFont || "'Playfair Display', serif"}; font-style: ${data.placeItalic ? 'italic' : 'normal'};">${data.placeText || 'ЗАГС, г. Москва'}</p>
                </div>
                <div class="message" style="margin-top: 2rem; font-size: ${data.messageSize || 16}px; line-height: 1.5; font-family: ${data.messageFont || "'Inter', sans-serif"}; font-weight: ${data.messageBold ? 'bold' : 'normal'}; font-style: ${data.messageItalic ? 'italic' : 'normal'}; max-width: 100%; width: 100%; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 0px;">
                    ${messageHtml}
                </div>
                <div class="message-decor-line" style="width: calc(100% - 2rem); height: 2px; background: ${data.textColor || '#475569'}; margin: 1rem auto 0; opacity: ${bottomLineOpacity}; transition: opacity 0.3s;"></div>
            </div>
            <div class="card-footer" style="text-align: center; margin-top: 1rem;">
                <div class="decor-line" style="width: 80px; height: 2px; background: currentColor; margin: 0.5rem auto; opacity: ${data.showDecorLines !== false ? '0.5' : '0'};"></div>
            </div>
        </div>
    `;
    const card = document.getElementById('invitationCard');
    if (card && data.decorations && Array.isArray(data.decorations)) {
        setTimeout(() => {
            renderSavedDecorations(card, data.decorations);
        }, 50);
    }
    document.title = data.eventType || 'Приглашение - invitation-online';
    applyMobileScale();
    if (data.enableAnimations && window.animationManager) {
        setTimeout(() => {
            window.animationManager.start({
                enabled: true,
                type: data.animationType || 'balloons',
                intensity: data.animationIntensity || 5,
                speed: data.animationSpeed || 3,
                colors: data.animationColors || ['#FF69B4', '#FFD700', '#87CEEB'],
                size: data.animationSize || 60,
                position: data.animationPosition || 'whole'
            });
        }, 500);
    }
}

function renderSavedDecorations(card, decorations) {
    if (!decorations || !card) return;
    const cardWidth = card.offsetWidth;
    const cardHeight = card.offsetHeight;
    decorations.forEach(decor => {
        const decorEl = document.createElement('div');
        decorEl.className = `invitation-decor ${decor.aboveText ? 'above-text' : ''}`;
        const posX = (decor.posX / 100) * cardWidth;
        const posY = (decor.posY / 100) * cardHeight;
        decorEl.style.cssText = `
            position: absolute;
            width: ${decor.width || 150}px;
            height: ${decor.width || 150}px;
            left: ${posX}px;
            top: ${posY}px;
            transform: translate(-50%, -50%) rotate(${decor.rotation || 0}deg);
            background-image: url('/images/decorations/${decor.file}');
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
            opacity: ${decor.opacity || 1};
            pointer-events: none;
        `;
        decorEl.onerror = function () {
            this.style.backgroundColor = '#f0f0f0';
            this.style.backgroundImage = 'none';
        };
        card.appendChild(decorEl);
    });
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