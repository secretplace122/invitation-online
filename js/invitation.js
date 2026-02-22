let invitationSlug = window.invitationSlug || null;

document.addEventListener('DOMContentLoaded', () => {
    if (invitationSlug) {
        loadInvitation();
    } else {
        showError();
    }
    document.getElementById('copyLinkBtn')?.addEventListener('click', copyInvitationLink);
});

async function loadInvitation() {
    try {
        document.getElementById('loadingSpinner').style.display = 'flex';
        
        const query = await db.collection('invitations')
            .where('slug', '==', invitationSlug)
            .limit(1)
            .get();
        
        if (!query.empty) {
            const data = query.docs[0].data();
            displayInvitation(data);
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

    const patternBg = document.querySelector('.pattern-bg');
    if (patternBg) {
        patternBg.style.backgroundImage = `url('/images/patterns/${data.pattern || 'abstract-1.jpg'}')`;
        patternBg.style.opacity = data.bgOpacity || 0.2;
    }

    const containerBgColor = data.containerBgColor || '#FFFFFF';
    const containerBgOpacity = data.containerBgOpacity || 0.95;
    const rgb = hexToRgb(containerBgColor);

    const decorHtml = (data.decor || []).map(d => `
        <div style="
            position: absolute;
            left: ${d.x}px;
            top: ${d.y}px;
            width: ${d.width}px;
            height: ${d.height}px;
            transform: translate(-50%, -50%) rotate(${d.rotation || 0}deg);
            pointer-events: none;
        ">
            <img src="/images/decor/${d.file}" style="width: 100%; height: 100%; object-fit: contain;">
        </div>
    `).join('');

    const content = document.getElementById('invitationContent');
    content.innerHTML = `
        <div class="invitation-card" style="
            border: ${data.borderWidth || 2}px solid ${data.borderColor || '#D4AF37'};
            border-radius: ${data.borderRadius || 30}px;
            background-color: rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${containerBgOpacity});
            color: ${data.textColor || '#475569'};
            max-width: 600px;
            margin: 0 auto;
            padding: 2.5rem 2rem;
            position: relative;
        ">
            <div class="card-header" style="text-align: ${data.textAlign || 'center'}; margin-bottom: 1rem;">
                <div class="decor-line" style="width: 80px; height: 2px; background: currentColor; margin: ${data.textAlign === 'center' ? '0.5rem auto' : '0.5rem auto'}; opacity: 0.5;"></div>
                <h2 class="event-type" style="font-size: 1rem; letter-spacing: 2px; text-transform: uppercase; margin: 0.5rem 0;">${data.eventType || 'Приглашение'}</h2>
                <div class="decor-line" style="width: 80px; height: 2px; background: currentColor; margin: ${data.textAlign === 'center' ? '0.5rem auto' : '0.5rem auto'}; opacity: 0.5;"></div>
            </div>
            <div class="card-body" style="text-align: ${data.textAlign || 'center'};">
                <h1 class="names" style="font-family: ${data.fontNames || "'Great Vibes', cursive"}; font-size: ${data.namesSize || 48}px; margin: 0.5rem 0; line-height: 1.2;">${data.names || 'Александр & Елена'}</h1>
                <p class="greeting" style="font-size: 1.1rem; margin-bottom: 2rem; font-style: italic;">${data.greeting || 'приглашают вас разделить с ними радость'}</p>
                <div class="details" style="margin: 0.3rem 0;">
                    <p class="date" style="font-size: 1.1rem;">${data.dateText || '15 июня 2026'}</p>
                    <p class="time" style="font-size: 1.1rem;">${data.timeText || 'в 16:00'}</p>
                    <p class="place" style="font-size: 1.1rem; font-weight: 600; margin-top: 0.5rem;">${data.placeText || 'ЗАГС, г. Москва'}</p>
                </div>
                <div class="message" style="margin-top: 2rem; font-size: 1rem; line-height: 1.5; white-space: pre-line;">${data.messageText || 'Будем рады видеть вас!'}</div>
            </div>
            <div class="card-footer" style="text-align: ${data.textAlign || 'center'}; margin-top: 1rem;">
                <div class="decor-line" style="width: 80px; height: 2px; background: currentColor; margin: ${data.textAlign === 'center' ? '0.5rem auto' : '0.5rem auto'}; opacity: 0.5;"></div>
            </div>
            ${decorHtml}
        </div>
    `;
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
    document.getElementById('errorPage').style.display = 'block';
}

function copyInvitationLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        const btn = document.getElementById('copyLinkBtn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span class="material-symbols-outlined">check</span><span>Скопировано!</span>';
        setTimeout(() => { btn.innerHTML = originalText; }, 2000);
    });
}