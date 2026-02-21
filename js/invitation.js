// ============================================
// Стили для шаблонов (из предоставленных макетов)
// ============================================
const STYLES = {
    wedding: {
        container: 'bg-gradient-soft',
        card: 'bg-white border-gold-delicate',
        titleFont: 'font-script',
        nameFont: 'font-script',
        accentColor: 'text-gold-dark',
        secondaryColor: 'text-slate-400',
        buttonClass: 'bg-gold-gradient text-white hover:shadow-gold/40',
        secondaryButtonClass: 'bg-white text-gold-dark border-gold/30 hover:bg-gold-light/10',
        icon: 'filter_vintage',
        structure: (data) => `
            <div class="flex flex-col items-center space-y-2 mt-4">
                <div class="relative flex items-center justify-center">
                    <span class="material-symbols-outlined text-6xl text-gold" style="font-variation-settings: 'wght' 200">fiber_manual_record</span>
                    <span class="material-symbols-outlined text-6xl text-gold absolute left-8" style="font-variation-settings: 'wght' 200">fiber_manual_record</span>
                </div>
                <div class="w-16 h-px bg-gold/30 mt-4"></div>
            </div>
            
            <div class="flex-1 flex flex-col items-center justify-center text-center space-y-6">
                <p class="uppercase tracking-[0.3em] text-[10px] text-gold-dark font-semibold">The Wedding of</p>
                <div class="space-y-1">
                    <h1 class="font-script text-5xl text-gold-dark leading-tight">${data.names?.split('и')[0]?.trim() || data.organizerName || 'Александра'}</h1>
                    <p class="font-serif text-2xl italic text-slate-400">&amp;</p>
                    <h1 class="font-script text-5xl text-gold-dark leading-tight">${data.names?.split('и')[1]?.trim() || data.organizerName || 'Бенджамин'}</h1>
                </div>
                
                <div class="space-y-1 pt-4">
                    <p class="font-serif text-lg text-slate-800">${data.formattedDate || formatDate(data.eventDate)}</p>
                    <p class="font-serif text-sm italic text-slate-500">${data.eventTime ? 'в ' + data.eventTime : 'в четыре часа дня'}</p>
                </div>
                
                <div class="pt-2">
                    <p class="font-display text-[11px] uppercase tracking-widest text-slate-400">${data.eventPlace?.split(',')[0] || 'Гранд Бальный Зал'}</p>
                    <p class="font-display text-[11px] uppercase tracking-widest text-slate-400">${data.eventPlace?.split(',')[1]?.trim() || 'Москва'}</p>
                </div>
            </div>
            
            <div class="w-full space-y-3 mt-8">
                <button class="w-full py-4 bg-gold-gradient text-white font-semibold rounded-full shadow-lg shadow-gold/20 hover:shadow-gold/40 transition-all active:scale-95 text-sm uppercase tracking-widest">
                    Подтвердить присутствие
                </button>
                <button class="w-full py-3 bg-white text-gold-dark font-medium rounded-full border border-gold/30 hover:bg-gold-light/10 transition-colors text-sm uppercase tracking-widest">
                    Список подарков
                </button>
            </div>
            
            <div class="absolute top-6 right-6 opacity-20">
                <span class="material-symbols-outlined text-gold text-3xl">filter_vintage</span>
            </div>
            <div class="absolute bottom-6 left-6 opacity-20 rotate-180">
                <span class="material-symbols-outlined text-gold text-3xl">filter_vintage</span>
            </div>
        `
    },
    
    birthday: {
        container: 'bg-birthday-gradient',
        card: 'bg-white',
        titleFont: 'font-elegant',
        nameFont: 'font-display',
        accentColor: 'text-festive-pink',
        secondaryColor: 'text-slate-500',
        buttonClass: 'bg-button-pink text-white hover:shadow-festive-pink/50',
        secondaryButtonClass: 'bg-soft-mint text-festive-blue hover:bg-festive-blue/10',
        icon: 'celebration',
        structure: (data) => `
            <div class="w-full flex justify-center items-end gap-3 mt-4 h-32 relative">
                <div class="gift-box w-16 h-16 bg-festive-purple rounded-lg shadow-md -rotate-12 mb-2">
                    <div class="ribbon-vertical"></div>
                    <div class="ribbon-horizontal"></div>
                    <div class="absolute -top-2 w-4 h-4 rounded-full border-2 border-white/40"></div>
                </div>
                <div class="gift-box w-20 h-24 bg-festive-pink rounded-xl shadow-lg z-10">
                    <div class="ribbon-vertical"></div>
                    <div class="ribbon-horizontal"></div>
                    <div class="absolute -top-3 w-8 h-4 rounded-full border-2 border-white/60"></div>
                </div>
                <div class="gift-box w-14 h-18 bg-festive-blue rounded-lg shadow-md rotate-12 mb-1">
                    <div class="ribbon-vertical"></div>
                    <div class="ribbon-horizontal"></div>
                </div>
            </div>
            
            <div class="flex-1 flex flex-col items-center justify-center text-center space-y-4 px-2">
                <div class="space-y-1">
                    <p class="text-festive-pink font-bold uppercase tracking-[0.2em] text-xs">Приглашаем на праздник</p>
                    <h1 class="font-elegant text-5xl text-slate-800 py-2">С Днём Рождения!</h1>
                </div>
                
                <div class="space-y-1 pt-2">
                    <p class="font-display text-2xl font-bold text-slate-700">${data.organizerName || 'София'}</p>
                    <p class="font-playful text-slate-500 font-medium italic">${data.ageText || 'Приглашаем отметить этот день'}</p>
                </div>
                
                <div class="pt-4 flex items-center gap-3">
                    <div class="h-px w-8 bg-slate-200"></div>
                    <div class="flex gap-1">
                        <span class="material-symbols-outlined text-festive-yellow text-xl fill-current">star</span>
                        <span class="material-symbols-outlined text-festive-yellow text-xl fill-current">star</span>
                        <span class="material-symbols-outlined text-festive-yellow text-xl fill-current">star</span>
                    </div>
                    <div class="h-px w-8 bg-slate-200"></div>
                </div>
                
                <div class="pt-4 space-y-1">
                    <p class="text-slate-600 font-semibold">${data.formattedDate || formatDate(data.eventDate)}, ${data.eventTime || '19:30'}</p>
                    <p class="text-slate-400 text-sm">${data.eventPlace || 'Лаунж на крыше, Центр'}</p>
                </div>
            </div>
            
            <div class="w-full space-y-3 mt-6">
                <button class="w-full py-4 bg-button-pink text-white font-bold rounded-2xl shadow-lg shadow-festive-pink/30 hover:shadow-festive-pink/50 transition-all active:scale-95 text-sm uppercase tracking-wider">
                    Присоединиться
                </button>
                <button class="w-full py-4 bg-soft-mint text-festive-blue font-bold rounded-2xl transition-colors text-sm uppercase tracking-wider hover:bg-festive-blue/10">
                    Загадать желание
                </button>
            </div>
            
            <div class="absolute top-10 left-6 opacity-40">
                <span class="material-symbols-outlined text-festive-yellow text-2xl">celebration</span>
            </div>
            <div class="absolute bottom-40 right-4 opacity-40">
                <span class="material-symbols-outlined text-festive-purple text-2xl rotate-45">auto_awesome</span>
            </div>
        `
    },
    
    other: {
        container: 'bg-deep-corporate',
        card: 'platinum-panel fine-border',
        titleFont: 'font-display',
        nameFont: 'font-sans',
        accentColor: 'text-corp-navy',
        secondaryColor: 'text-corp-slate',
        buttonClass: 'brushed-button text-corp-navy hover:brightness-95',
        secondaryButtonClass: 'bg-transparent text-corp-slate border-corp-slate/20 hover:bg-white/10',
        icon: 'account_balance',
        structure: (data) => `
            <div class="w-full flex flex-col items-center mt-4">
                <div class="w-16 h-16 bg-corp-navy rounded-2xl flex items-center justify-center shadow-inner mb-6">
                    <span class="material-symbols-outlined text-platinum-light text-4xl font-light">${data.icon || 'business_center'}</span>
                </div>
                <div class="text-center space-y-1">
                    <p class="text-corp-slate font-bold uppercase tracking-[0.25em] text-[10px]">${data.eventType || 'Деловое мероприятие'}</p>
                    <h1 class="font-display text-2xl font-bold text-corp-navy">${data.organizerName || 'Platinum Portal'}</h1>
                </div>
            </div>
            
            <div class="flex-1 flex flex-col items-center justify-center text-center w-full space-y-8">
                <div class="w-full h-px bg-gradient-to-r from-transparent via-platinum-dark to-transparent opacity-50"></div>
                
                <div class="space-y-3">
                    <p class="text-xs font-semibold text-corp-slate/60 uppercase tracking-widest">${data.subtitle || 'Приглашение'}</p>
                    <p class="text-2xl font-display font-bold text-corp-navy tracking-tight">${data.formattedDate || formatDate(data.eventDate)}</p>
                    <p class="text-sm text-corp-slate">${data.eventTime || '19:00'}</p>
                </div>
                
                <div class="grid grid-cols-1 gap-2 w-full pt-4">
                    <div class="text-left p-4 rounded-xl bg-white/30 backdrop-blur-sm border border-white/40">
                        <p class="text-[10px] font-bold text-corp-slate/50 uppercase">Место проведения</p>
                        <p class="text-sm font-bold text-corp-navy">${data.eventPlace || 'Конференц-зал, Бизнес-центр'}</p>
                    </div>
                </div>
                
                ${data.eventMessage ? `
                <div class="text-left p-4 rounded-xl bg-white/30 backdrop-blur-sm border border-white/40">
                    <p class="text-[10px] font-bold text-corp-slate/50 uppercase">Детали</p>
                    <p class="text-sm text-corp-slate">${data.eventMessage}</p>
                </div>
                ` : ''}
                
                <div class="w-full h-px bg-gradient-to-r from-transparent via-platinum-dark to-transparent opacity-50"></div>
            </div>
            
            <div class="w-full space-y-4 mt-8">
                <button class="brushed-button w-full py-4 text-corp-navy font-bold rounded-xl transition-all text-xs uppercase tracking-[0.15em] border border-white/20">
                    Подтвердить участие
                </button>
                <button class="w-full py-4 bg-transparent text-corp-slate font-semibold rounded-xl transition-colors text-xs uppercase tracking-[0.15em] border border-corp-slate/20 hover:bg-white/10">
                    Программа мероприятия
                </button>
            </div>
            
            <div class="absolute -top-24 -right-24 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
            <div class="absolute -bottom-24 -left-24 w-48 h-48 bg-platinum-dark/20 rounded-full blur-3xl"></div>
        `
    }
};

// ============================================
// Глобальные переменные для загрузки
// ============================================
let invitationSlug = window.invitationSlug || null;
let invitationId = window.invitationId || null;

// ============================================
// Инициализация при загрузке страницы
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Invitation.js loaded', { slug: invitationSlug, id: invitationId });
    
    if (invitationSlug) {
        // Загрузка по ЧПУ (новый формат)
        loadInvitationBySlug(invitationSlug);
    } else if (invitationId) {
        // Загрузка по ID (старый формат)
        loadInvitationById(invitationId);
    } else {
        // Нет идентификатора - показываем ошибку
        showError();
    }

    // Кнопка копирования ссылки
    document.getElementById('copyLinkBtn')?.addEventListener('click', copyInvitationLink);
});

// ============================================
// Загрузка приглашения по ID
// ============================================
async function loadInvitationById(id) {
    try {
        let data = null;
        
        // Пытаемся загрузить из Firebase
        if (!id.startsWith('local_')) {
            const doc = await db.collection('invitations').doc(id).get();
            if (doc.exists) {
                data = doc.data();
                data.id = doc.id;
            }
        }

        // Если не нашли в Firebase, пробуем localStorage
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
        console.error('Ошибка загрузки:', error);
        showError();
    }
}

// ============================================
// Загрузка приглашения по slug
// ============================================
async function loadInvitationBySlug(slug) {
    try {
        // Показываем загрузку
        document.getElementById('loadingSpinner').style.display = 'flex';
        
        // Ищем в Firestore документ с таким slug
        const query = await db.collection('invitations')
            .where('slug', '==', slug)
            .limit(1)
            .get();
        
        if (!query.empty) {
            const doc = query.docs[0];
            const data = doc.data();
            data.id = doc.id;
            
            // Обновляем счетчик просмотров (асинхронно, не ждем)
            updateViewCount(doc.id);
            
            // Обновляем мета-теги для соцсетей
            updateMetaTags(data);
            
            displayInvitation(data);
        } else {
            showError();
        }
    } catch (error) {
        console.error('Ошибка загрузки по slug:', error);
        showError();
    }
}

// ============================================
// Обновление счетчика просмотров
// ============================================
async function updateViewCount(docId) {
    try {
        const docRef = db.collection('invitations').doc(docId);
        await docRef.update({
            views: firebase.firestore.FieldValue.increment(1)
        });
    } catch (error) {
        console.error('Ошибка обновления счетчика просмотров:', error);
    }
}

// ============================================
// Обновление мета-тегов для социальных сетей
// ============================================
function updateMetaTags(data) {
    if (!data) return;
    
    // Определяем заголовок
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
        const formattedDate = date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
        description += ` | ${formattedDate}`;
    }
    
    // Обновляем или создаем мета-теги
    const tags = {
        'title': title,
        'description': description,
        'og:title': title,
        'og:description': description,
        'og:image': imageUrl,
        'og:url': window.location.href,
        'og:type': 'website',
        'og:site_name': 'InviteMaster',
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
    
    // Обновляем заголовок страницы
    document.title = `${title} - InviteMaster`;
}

// ============================================
// Отображение приглашения
// ============================================
function displayInvitation(data) {
    // Скрываем загрузку, показываем контент
    document.getElementById('loadingSpinner').style.display = 'none';
    document.getElementById('invitationWrapper').style.display = 'block';
    
    // Определяем категорию и получаем соответствующий стиль
    const category = data.category || 'other';
    const style = STYLES[category] || STYLES.other;
    
    // Форматируем дату
    let formattedDate = formatDate(data.eventDate);
    
    // Подготавливаем данные для шаблона
    const templateData = {
        organizerName: data.organizerName,
        eventDate: data.eventDate,
        eventTime: data.eventTime,
        eventPlace: data.eventPlace,
        eventMessage: data.eventMessage,
        formattedDate: formattedDate,
        ageText: data.ageText || 'Приглашаем отметить этот день',
        eventType: data.eventType || 'Деловое мероприятие',
        subtitle: data.subtitle || 'Приглашение',
        icon: data.icon || 'business_center',
        names: data.organizerName // для обратной совместимости
    };
    
    // Формируем HTML
    const content = document.getElementById('invitationContent');
    content.innerHTML = `
        <div class="invitation-themed ${style.container}">
            <div class="invitation-card ${style.card}">
                ${style.structure(templateData)}
            </div>
        </div>
    `;
    
    // Добавляем динамические стили
    addCustomStyles();
}

// ============================================
// Форматирование даты
// ============================================
function formatDate(dateString) {
    if (!dateString) return 'Дата не указана';
    
    try {
        const date = new Date(dateString + 'T12:00:00');
        return date.toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).replace(' г.', '');
    } catch (e) {
        return dateString;
    }
}

// ============================================
// Добавление кастомных стилей
// ============================================
function addCustomStyles() {
    // Проверяем, добавлены ли уже стили
    if (document.getElementById('custom-invitation-styles')) return;
    
    const styleEl = document.createElement('style');
    styleEl.id = 'custom-invitation-styles';
    styleEl.textContent = `
        /* Свадебные стили */
        .bg-gradient-soft {
            background: linear-gradient(135deg, #ffd1e3 0%, #d1e9ff 100%);
        }
        
        .bg-gold-gradient {
            background: linear-gradient(135deg, #B8860B 0%, #D4AF37 50%, #F4E0A1 100%);
        }
        
        .border-gold-delicate {
            border: 1px solid rgba(212, 175, 55, 0.4);
        }
        
        .text-gold {
            color: #D4AF37;
        }
        
        .text-gold-dark {
            color: #B8860B;
        }
        
        .bg-gold\\/30 {
            background-color: rgba(212, 175, 55, 0.3);
        }
        
        .shadow-gold\\/20 {
            box-shadow: 0 10px 25px -5px rgba(212, 175, 55, 0.2);
        }
        
        .hover\\:shadow-gold\\/40:hover {
            box-shadow: 0 20px 30px -5px rgba(212, 175, 55, 0.4);
        }
        
        .bg-gold-light\\/10 {
            background-color: rgba(244, 224, 161, 0.1);
        }
        
        /* День рождения стили */
        .bg-birthday-gradient {
            background: linear-gradient(135deg, #FFDEE9 0%, #B5FFFC 100%);
        }
        
        .bg-button-pink {
            background: linear-gradient(135deg, #FF8E9E 0%, #FF6B6B 100%);
        }
        
        .gift-box {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        
        .ribbon-vertical {
            position: absolute;
            width: 0.5rem;
            height: 100%;
            background-color: rgba(255, 255, 255, 0.4);
        }
        
        .ribbon-horizontal {
            position: absolute;
            height: 0.5rem;
            width: 100%;
            background-color: rgba(255, 255, 255, 0.4);
        }
        
        .bg-festive-purple {
            background-color: #B689C0;
        }
        
        .bg-festive-pink {
            background-color: #FF8E9E;
        }
        
        .bg-festive-blue {
            background-color: #9AD1D4;
        }
        
        .text-festive-pink {
            color: #FF8E9E;
        }
        
        .text-festive-yellow {
            color: #FFE15D;
        }
        
        .text-festive-purple {
            color: #B689C0;
        }
        
        .text-festive-blue {
            color: #9AD1D4;
        }
        
        .bg-soft-mint {
            background-color: #E3F6F5;
        }
        
        .shadow-festive-pink\\/30 {
            box-shadow: 0 10px 25px -5px rgba(255, 142, 158, 0.3);
        }
        
        .hover\\:shadow-festive-pink\\/50:hover {
            box-shadow: 0 20px 30px -5px rgba(255, 142, 158, 0.5);
        }
        
        .hover\\:bg-festive-blue\\/10:hover {
            background-color: rgba(154, 209, 212, 0.1);
        }
        
        /* Корпоративные стили */
        .bg-deep-corporate {
            background-color: #0B0E14;
        }
        
        .platinum-panel {
            background: linear-gradient(145deg, #F0F0F0 0%, #D1D1D1 100%);
            box-shadow: inset 0 1px 1px rgba(255,255,255,0.8), 0 20px 40px rgba(0,0,0,0.4);
        }
        
        .brushed-button {
            background: linear-gradient(180deg, #E5E7EB 0%, #9CA3AF 100%);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255,255,255,0.5);
        }
        
        .brushed-button:active {
            filter: brightness(0.9);
            transform: translateY(1px);
        }
        
        .fine-border {
            border: 0.5px solid rgba(255, 255, 255, 0.4);
        }
        
        .text-platinum-light {
            color: #E5E4E2;
        }
        
        .text-platinum-dark {
            color: #B8B8B8;
        }
        
        .bg-corp-navy {
            background-color: #0F172A;
        }
        
        .text-corp-navy {
            color: #0F172A;
        }
        
        .text-corp-slate {
            color: #334155;
        }
        
        .border-corp-slate\\/20 {
            border-color: rgba(51, 65, 85, 0.2);
        }
        
        .hover\\:brightness-95:hover {
            filter: brightness(0.95);
        }
        
        /* Шрифты */
        .font-script {
            font-family: 'Great Vibes', cursive;
        }
        
        .font-serif {
            font-family: 'Playfair Display', serif;
        }
        
        .font-playful {
            font-family: 'Quicksand', sans-serif;
        }
        
        .font-elegant {
            font-family: 'Dancing Script', cursive;
        }
        
        .font-display {
            font-family: 'Plus Jakarta Sans', sans-serif;
        }
        
        .font-sans {
            font-family: 'Inter', sans-serif;
        }
        
        /* Утилиты */
        .rotate-180 {
            transform: rotate(180deg);
        }
        
        .rotate-45 {
            transform: rotate(45deg);
        }
        
        .-rotate-12 {
            transform: rotate(-12deg);
        }
        
        .rotate-12 {
            transform: rotate(12deg);
        }
        
        .backdrop-blur-sm {
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
        }
        
        .fill-current {
            font-variation-settings: 'FILL' 1;
        }
        
        /* Стили для карточки */
        .invitation-themed {
            width: 100%;
            min-height: calc(100vh - 200px);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1.5rem;
        }
        
        .invitation-card {
            width: 100%;
            max-width: 480px;
            margin: 0 auto;
            border-radius: 2.5rem;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 2.5rem 2rem;
            position: relative;
            box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
            min-height: 650px;
        }
        
        .invitation-actions {
            width: 100%;
            max-width: 480px;
            margin: 2rem auto 0;
            background: rgba(255,255,255,0.9);
            backdrop-filter: blur(10px);
            border-radius: 3rem;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        
        .actions-bar {
            display: flex;
            justify-content: center;
            padding: 0.75rem;
        }
        
        .action-btn {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.75rem 2rem;
            border: none;
            background: linear-gradient(135deg, #D4AF37, #B8860B);
            border-radius: 50px;
            cursor: pointer;
            font-size: 0.95rem;
            font-weight: 600;
            color: white;
            transition: all 0.3s;
            box-shadow: 0 4px 10px rgba(212,175,55,0.3);
        }
        
        .action-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(212,175,55,0.4);
        }
    `;
    
    document.head.appendChild(styleEl);
}

// ============================================
// Показать ошибку
// ============================================
function showError() {
    const spinner = document.getElementById('loadingSpinner');
    const errorPage = document.getElementById('errorPage');
    
    if (spinner) spinner.style.display = 'none';
    if (errorPage) errorPage.style.display = 'block';
}

// ============================================
// Копирование ссылки на приглашение
// ============================================
function copyInvitationLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        // Показываем уведомление
        const btn = document.getElementById('copyLinkBtn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span class="material-symbols-outlined">check</span><span>Скопировано!</span>';
        
        setTimeout(() => {
            btn.innerHTML = originalText;
        }, 2000);
    }).catch(() => {
        alert('Не удалось скопировать ссылку');
    });
}

// ============================================
// Для совместимости со старыми вызовами
// ============================================
window.displayInvitation = displayInvitation;
window.loadInvitationById = loadInvitationById;
window.loadInvitationBySlug = loadInvitationBySlug;