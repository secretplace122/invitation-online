let invitationSlug = null;

document.addEventListener('DOMContentLoaded', () => {
    console.log('Invitation page loaded');
    
    if (window.location.hash) {
        invitationSlug = window.location.hash.substring(1);
        console.log('Loading invitation:', invitationSlug);
        loadInvitation();
    } else {
        console.log('No slug found in URL');
        showError();
    }
    
    document.getElementById('copyLinkBtn')?.addEventListener('click', copyInvitationLink);
});

async function loadInvitation() {
    try {
        document.getElementById('loadingSpinner').style.display = 'flex';
        document.getElementById('invitationWrapper').style.display = 'none';
        document.getElementById('errorPage').style.display = 'none';
        
        console.log('Searching for slug:', invitationSlug);
        
        const query = await db.collection('invitations')
            .where('slug', '==', invitationSlug)
            .limit(1)
            .get();
        
        console.log('Query result:', query.empty ? 'empty' : 'found');
        
        if (!query.empty) {
            const doc = query.docs[0];
            const data = doc.data();
            console.log('Invitation data:', data);
            displayInvitation(data);
        } else {
            console.log('No invitation found');
            showError();
        }
    } catch (error) {
        console.error('Load error:', error);
        showError();
    }
}

function displayInvitation(data) {
    console.log('Displaying invitation');
    
    document.getElementById('loadingSpinner').style.display = 'none';
    document.getElementById('invitationWrapper').style.display = 'block';
    document.getElementById('errorPage').style.display = 'none';

    const patternBg = document.querySelector('.pattern-bg');
    if (patternBg) {
        patternBg.style.backgroundImage = `url('/images/patterns/${data.pattern || 'abstract-1.jpg'}')`;
        patternBg.style.opacity = data.bgOpacity || 0.2;
    }

    const containerBgColor = data.containerBgColor || '#FFFFFF';
    const containerBgOpacity = data.containerBgOpacity || 0.95;
    const rgb = hexToRgb(containerBgColor);

    const decorHtml = (data.decor || []).map(d => {
        return `
        <div style="
            position: absolute;
            left: ${d.x}%;
            top: ${d.y}%;
            width: ${d.width}px;
            height: ${d.height}px;
            transform: translate(-50%, -50%) rotate(${d.rotation || 0}deg);
            pointer-events: none;
            z-index: 10;
        ">
            <img src="/images/decor/${d.file}" style="width: 100%; height: 100%; object-fit: contain;">
        </div>
    `}).join('');

    const messageText = (data.messageText || '').replace(/\n/g, '<br>');

    const content = document.getElementById('invitationContent');
    content.innerHTML = `
        <div class="invitation-card" style="
            border: ${data.borderWidth || 2}px solid ${data.borderColor || '#D4AF37'};
            border-radius: ${data.borderRadius || 30}px;
            background-color: rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${containerBgOpacity});
            color: ${data.textColor || '#475569'};
            max-width: 600px;
            width: 100%;
            margin: 0 auto;
            padding: 2.5rem 2rem;
            position: relative;
            box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
        ">
            <div class="card-header" style="text-align: ${data.textAlign || 'center'}; margin-bottom: 1rem;">
                <div class="decor-line" style="
                    width: 80px; 
                    height: 2px; 
                    background: currentColor; 
                    margin: ${data.textAlign === 'center' ? '0.5rem auto' : '0.5rem 0'}; 
                    opacity: 0.5; 
                    display: ${data.showDecorLines !== false ? 'block' : 'none'};
                "></div>
                
                <h2 class="event-type" style="
                    font-size: 1rem; 
                    letter-spacing: 2px; 
                    text-transform: uppercase; 
                    margin: 0.5rem 0;
                ">${data.eventType || 'Приглашение'}</h2>
                
                <div class="decor-line" style="
                    width: 80px; 
                    height: 2px; 
                    background: currentColor; 
                    margin: ${data.textAlign === 'center' ? '0.5rem auto' : '0.5rem 0'}; 
                    opacity: 0.5; 
                    display: ${data.showDecorLines !== false ? 'block' : 'none'};
                "></div>
            </div>
            
            <div class="card-body" style="text-align: ${data.textAlign || 'center'};">
                <h1 class="names" style="
                    font-family: ${data.fontNames || "'Great Vibes', cursive"}; 
                    font-size: ${data.namesSize || 48}px; 
                    margin: 0.5rem 0; 
                    line-height: 1.2;
                ">${data.names || 'Александр & Елена'}</h1>
                
                <p class="greeting" style="
                    font-size: 1.1rem; 
                    margin-bottom: 2rem; 
                    font-style: italic;
                ">${data.greeting || 'приглашают вас разделить с ними радость'}</p>
                
                <div class="details" style="margin: 0.3rem 0;">
                    <p class="date" style="font-size: 1.1rem;">${data.dateText || '15 июня 2026'}</p>
                    <p class="time" style="font-size: 1.1rem;">${data.timeText || 'в 16:00'}</p>
                    <p class="place" style="font-size: 1.1rem; font-weight: 600; margin-top: 0.5rem;">${data.placeText || 'ЗАГС, г. Москва'}</p>
                </div>
                
                <div class="message" style="
                    margin-top: 2rem; 
                    font-size: 1rem; 
                    line-height: 1.5;
                ">${messageText}</div>
            </div>
            
            <div class="card-footer" style="text-align: ${data.textAlign || 'center'}; margin-top: 1rem;">
                <div class="decor-line" style="
                    width: 80px; 
                    height: 2px; 
                    background: currentColor; 
                    margin: ${data.textAlign === 'center' ? '0.5rem auto' : '0.5rem 0'}; 
                    opacity: 0.5; 
                    display: ${data.showDecorLines !== false ? 'block' : 'none'};
                "></div>
            </div>
            
            ${decorHtml}
        </div>
    `;
    
    console.log('Invitation displayed');
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
    console.log('Showing error page');
    document.getElementById('loadingSpinner').style.display = 'none';
    document.getElementById('invitationWrapper').style.display = 'none';
    document.getElementById('errorPage').style.display = 'block';
}

function copyInvitationLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        const btn = document.getElementById('copyLinkBtn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span class="material-symbols-outlined">check</span> Скопировано!';
        setTimeout(() => { btn.innerHTML = originalText; }, 2000);
    });
}