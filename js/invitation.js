const STYLES = {
    wedding: (data) => `
        <div class="invitation-themed wedding-theme">
            <div class="invitation-card wedding-card">
                <div class="card-header">
                    <div class="decor-line"></div>
                    <h2 class="event-type">Свадебное приглашение</h2>
                    <div class="decor-line"></div>
                </div>
                <div class="card-body">
                    <h1 class="names">${data.organizerName || 'Александр & Елена'}</h1>
                    <p class="greeting">приглашают вас разделить с ними радость</p>
                    <div class="details">
                        <p class="date">${data.formattedDate || formatDate(data.eventDate)}</p>
                        <p class="time">${data.eventTime ? 'в ' + data.eventTime : 'в 16:00'}</p>
                        <p class="place">${data.eventPlace || 'ЗАГС, г. Москва'}</p>
                    </div>
                    <p class="message">${data.eventMessage || 'Будем рады видеть вас на нашем торжестве!'}</p>
                </div>
                <div class="card-footer">
                    <div class="decor-line"></div>
                </div>
            </div>
        </div>
    `,
    birthday: (data) => `
        <div class="invitation-themed birthday-theme">
            <div class="invitation-card birthday-card">
                <div class="card-header">
                    <div class="decor-line"></div>
                    <h2 class="event-type">День рождения</h2>
                    <div class="decor-line"></div>
                </div>
                <div class="card-body">
                    <h1 class="names">${data.organizerName || 'София'}</h1>
                    <p class="greeting">приглашает на свой праздник</p>
                    <div class="details">
                        <p class="date">${data.formattedDate || formatDate(data.eventDate)}</p>
                        <p class="time">${data.eventTime ? 'в ' + data.eventTime : 'в 18:00'}</p>
                        <p class="place">${data.eventPlace || 'Кафе "Уют", ул. Центральная'}</p>
                    </div>
                    <p class="message">${data.eventMessage || 'Будет весело и вкусно! Жду!'}</p>
                </div>
                <div class="card-footer">
                    <div class="decor-line"></div>
                </div>
            </div>
        </div>
    `,
    other: (data) => `
        <div class="invitation-themed other-theme">
            <div class="invitation-card other-card">
                <div class="card-header">
                    <div class="decor-line"></div>
                    <h2 class="event-type">Приглашение</h2>
                    <div class="decor-line"></div>
                </div>
                <div class="card-body">
                    <h1 class="names">${data.organizerName || 'Мероприятие'}</h1>
                    <p class="greeting">${data.eventMessage || 'Приглашаем вас принять участие'}</p>
                    <div class="details">
                        <p class="date">${data.formattedDate || formatDate(data.eventDate)}</p>
                        <p class="time">${data.eventTime ? 'в ' + data.eventTime : 'в 19:00'}</p>
                        <p class="place">${data.eventPlace || 'Конференц-зал, Бизнес-центр'}</p>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="decor-line"></div>
                </div>
            </div>
        </div>
    `
};

let invitationSlug = window.invitationSlug || null;
let invitationId = window.invitationId || null;

document.addEventListener('DOMContentLoaded', () => {
    console.log('Invitation.js loaded', { slug: invitationSlug, id: invitationId });
    
    if (invitationSlug) {
        loadInvitationBySlug(invitationSlug);
    } else if (invitationId) {
        loadInvitationById(invitationId);
    } else {
        showError();
    }

    document.getElementById('copyLinkBtn')?.addEventListener('click', copyInvitationLink);
});

async function loadInvitationById(id) {
    try {
        let data = null;
        
        if (!id.startsWith('local_')) {
            const doc = await db.collection('invitations').doc(id).get();
            if (doc.exists) {
                data = doc.data();
                data.id = doc.id;
            }
        }

        if (!data) {
            const local = localStorage.getItem(id);
            if (local) {
                data = JSON.parse(local);
                data.id = id;
            }
        }

        if (data) {
            displayInvitation(data);
        } else {
            showError();
        }
    } catch (error) {
        console.error('Load error:', error);
        showError();
    }
}

async function loadInvitationBySlug(slug) {
    try {
        document.getElementById('loadingSpinner').style.display = 'flex';
        
        const query = await db.collection('invitations')
            .where('slug', '==', slug)
            .limit(1)
            .get();
        
        if (!query.empty) {
            const doc = query.docs[0];
            const data = doc.data();
            data.id = doc.id;
            
            updateViewCount(doc.id);
            updateMetaTags(data);
            displayInvitation(data);
        } else {
            showError();
        }
    } catch (error) {
        console.error('Slug load error:', error);
        showError();
    }
}

async function updateViewCount(docId) {
    try {
        const docRef = db.collection('invitations').doc(docId);
        await docRef.update({ views: firebase.firestore.FieldValue.increment(1) });
    } catch (error) {
        console.error('View count error:', error);
    }
}

function updateMetaTags(data) {
    if (!data) return;
    
    let title = 'InviteMaster - Приглашение';
    let description = 'Приглашение на мероприятие';
    let imageUrl = '/images/og-default.jpg';
    
    switch(data.category) {
        case 'wedding':
            title = `Свадьба ${data.organizerName || ''}`;
            description = data.eventMessage || 'Приглашаем на свадебное торжество';
            imageUrl = '/images/og-wedding.jpg';
            break;
        case 'birthday':
            title = `День рождения ${data.organizerName || ''}`;
            description = data.eventMessage || 'Приглашаем на празднование дня рождения';
            imageUrl = '/images/og-birthday.jpg';
            break;
        default:
            title = `${data.organizerName || 'Мероприятие'}`;
            description = data.eventMessage || 'Приглашаем вас на мероприятие';
            imageUrl = '/images/og-event.jpg';
    }
    
    if (data.eventDate) {
        const date = new Date(data.eventDate + 'T12:00:00');
        const formattedDate = date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
        description += ` | ${formattedDate}`;
    }
    
    const tags = {
        'title': title,
        'description': description,
        'og:title': title,
        'og:description': description,
        'og:image': imageUrl,
        'og:url': window.location.href,
        'twitter:card': 'summary_large_image',
        'twitter:title': title,
        'twitter:description': description,
        'twitter:image': imageUrl
    };
    
    Object.entries(tags).forEach(([property, content]) => {
        let meta = document.querySelector(`meta[property="${property}"]`) || 
                   document.querySelector(`meta[name="${property}"]`);
        
        if (!meta) {
            meta = document.createElement('meta');
            if (property.startsWith('og:')) {
                meta.setAttribute('property', property);
            } else {
                meta.setAttribute('name', property);
            }
            document.head.appendChild(meta);
        }
        meta.setAttribute('content', content);
    });
    
    document.title = `${title} - InviteMaster`;
}

function displayInvitation(data) {
    document.getElementById('loadingSpinner').style.display = 'none';
    document.getElementById('invitationWrapper').style.display = 'block';

    const category = data.category || 'other';
    const templateFunction = STYLES[category] || STYLES.other;

    let formattedDate = formatDate(data.eventDate);

    const templateData = {
        organizerName: data.organizerName,
        eventDate: data.eventDate,
        eventTime: data.eventTime,
        eventPlace: data.eventPlace,
        eventMessage: data.eventMessage,
        formattedDate: formattedDate,
    };

    const content = document.getElementById('invitationContent');
    content.innerHTML = templateFunction(templateData);

    if (window.setPatternBg) {
        setPatternBg(data.theme?.pattern || 'default-pattern.png');
    }
}

function formatDate(dateString) {
    if (!dateString) return 'Дата не указана';
    try {
        const date = new Date(dateString + 'T12:00:00');
        return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }).replace(' г.', '');
    } catch (e) {
        return dateString;
    }
}

function showError() {
    const spinner = document.getElementById('loadingSpinner');
    const errorPage = document.getElementById('errorPage');
    
    if (spinner) spinner.style.display = 'none';
    if (errorPage) errorPage.style.display = 'block';
}

function copyInvitationLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        const btn = document.getElementById('copyLinkBtn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span class="material-symbols-outlined">check</span><span>Скопировано!</span>';
        setTimeout(() => { btn.innerHTML = originalText; }, 2000);
    }).catch(() => {
        alert('Не удалось скопировать ссылку');
    });
}

window.displayInvitation = displayInvitation;
window.loadInvitationById = loadInvitationById;
window.loadInvitationBySlug = loadInvitationBySlug;