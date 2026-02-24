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
    applyMobileScale();
    
    window.addEventListener('resize', () => {
        applyMobileScale();
    });
});

function applyMobileScale() {
    const isMobile = window.innerWidth <= 768;
    const cards = document.querySelectorAll('.invitation-card');
    
    if (isMobile) {
        cards.forEach(card => {
            card.style.transform = 'scale(0.7)';
            card.style.transformOrigin = 'center top';
        });
    } else {
        cards.forEach(card => {
            card.style.transform = 'none';
        });
    }
}

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

    const messageText = (data.messageText || '').replace(/\n/g, '<br>');

    const content = document.getElementById('invitationContent');
    content.innerHTML = `
        <div class="invitation-card" style="
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
            box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
            transform-origin: center top;
        ">
            <div class="card-header" style="text-align: center; margin-bottom: 1rem;">
                <div class="decor-line" style="
                    width: 80px; 
                    height: 2px; 
                    background: currentColor; 
                    margin: 0.5rem auto; 
                    opacity: ${data.showDecorLines !== false ? '0.5' : '0'};
                "></div>
                
                <h2 class="event-type" style="
                    font-size: ${data.eventTypeSize || 16}px; 
                    letter-spacing: 2px; 
                    text-transform: uppercase; 
                    margin: 0.5rem 0;
                    font-weight: ${data.eventTypeBold ? 'bold' : 'normal'};
                    font-style: ${data.eventTypeItalic ? 'italic' : 'normal'};
                    font-family: ${data.eventTypeFont || "'Playfair Display', serif"};
                ">${data.eventType || 'Приглашение'}</h2>
                
                <div class="decor-line" style="
                    width: 80px; 
                    height: 2px; 
                    background: currentColor; 
                    margin: 0.5rem auto; 
                    opacity: ${data.showDecorLines !== false ? '0.5' : '0'};
                "></div>
            </div>
            
            <div class="card-body" style="text-align: center;">
                <h1 class="names" style="
                    font-family: ${data.namesFont || "'Great Vibes', cursive"}; 
                    font-size: ${data.namesSize || 48}px; 
                    margin: 0.5rem 0; 
                    line-height: 1.2;
                    font-weight: ${data.namesBold ? 'bold' : 'normal'};
                    font-style: ${data.namesItalic ? 'italic' : 'normal'};
                ">${data.names || 'Александр & Елена'}</h1>
                
                <p class="greeting" style="
                    font-size: ${data.greetingSize || 18}px; 
                    margin-bottom: 2rem; 
                    font-family: ${data.greetingFont || "'Playfair Display', serif"};
                    font-weight: ${data.greetingBold ? 'bold' : 'normal'};
                    font-style: ${data.greetingItalic ? 'italic' : 'normal'};
                ">${data.greeting || 'приглашают вас разделить с ними радость'}</p>
                
                <div class="details" style="margin: 0.3rem 0;">
                    <p class="date" style="
                        font-size: ${data.dateSize || 18}px;
                        font-family: ${data.dateFont || "'Playfair Display', serif"};
                        font-weight: ${data.dateBold ? 'bold' : 'normal'};
                        font-style: ${data.dateItalic ? 'italic' : 'normal'};
                    ">${data.dateText || '15 июня 2026'}</p>
                    <p class="time" style="
                        font-size: ${data.timeSize || 18}px;
                        font-family: ${data.timeFont || "'Playfair Display', serif"};
                        font-weight: ${data.timeBold ? 'bold' : 'normal'};
                        font-style: ${data.timeItalic ? 'italic' : 'normal'};
                    ">${data.timeText || 'в 16:00'}</p>
                    <p class="place" style="
                        font-size: ${data.placeSize || 18}px; 
                        font-weight: ${data.placeBold ? 'bold' : '600'}; 
                        margin-top: 0.5rem;
                        font-family: ${data.placeFont || "'Playfair Display', serif"};
                        font-style: ${data.placeItalic ? 'italic' : 'normal'};
                    ">${data.placeText || 'ЗАГС, г. Москва'}</p>
                </div>
                
                <div class="message" style="
                    margin-top: 2rem; 
                    font-size: ${data.messageSize || 16}px; 
                    line-height: 1.5;
                    font-family: ${data.messageFont || "'Inter', sans-serif"};
                    font-weight: ${data.messageBold ? 'bold' : 'normal'};
                    font-style: ${data.messageItalic ? 'italic' : 'normal'};
                ">${messageText}</div>
            </div>
            
            <div class="card-footer" style="text-align: center; margin-top: 1rem;">
                <div class="decor-line" style="
                    width: 80px; 
                    height: 2px; 
                    background: currentColor; 
                    margin: 0.5rem auto; 
                    opacity: ${data.showDecorLines !== false ? '0.5' : '0'};
                "></div>
            </div>
        </div>
    `;
    
    console.log('Invitation displayed');
    applyMobileScale();
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