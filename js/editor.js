// Состояние редактора
const EditorState = {
    templateId: null,
    theme: null
};

// ПОЛНЫЙ список всех шаблонов с их темами
const templateThemes = {
    // СВАДЬБА (1-20)
    1: {
        name: 'Вечная любовь',
        category: 'wedding',
        pattern: 'wedding-classic.png',
        colors: {
            primary: '#D4AF37',
            secondary: '#F9F3E6',
            text: '#4A4A4A'
        }
    },
    2: {
        name: 'Красная роза',
        category: 'wedding',
        pattern: 'wedding-rose.png',
        colors: {
            primary: '#8B0000',
            secondary: '#FFE4E1',
            text: '#333333'
        }
    },
    3: {
        name: 'Королевская свадьба',
        category: 'wedding',
        pattern: 'wedding-royal.png',
        colors: {
            primary: '#4B0082',
            secondary: '#F5F5F5',
            text: '#2F4F4F'
        }
    },
    4: {
        name: 'Минимализм шик',
        category: 'wedding',
        pattern: 'wedding-minimal.png',
        colors: {
            primary: '#000000',
            secondary: '#FFFFFF',
            text: '#333333'
        }
    },
    5: {
        name: 'Акварельная нежность',
        category: 'wedding',
        pattern: 'wedding-watercolor.png',
        colors: {
            primary: '#FF69B4',
            secondary: '#E6E6FA',
            text: '#4A4A4A'
        }
    },
    6: {
        name: 'Фото-история',
        category: 'wedding',
        pattern: 'wedding-photo.png',
        colors: {
            primary: '#808080',
            secondary: '#F5F5F5',
            text: '#333333'
        }
    },
    7: {
        name: 'Градиент любви',
        category: 'wedding',
        pattern: 'wedding-gradient.png',
        colors: {
            primary: '#FF1493',
            secondary: '#00FFFF',
            text: '#FFFFFF'
        }
    },
    8: {
        name: 'Старинный свиток',
        category: 'wedding',
        pattern: 'wedding-vintage.png',
        colors: {
            primary: '#8B4513',
            secondary: '#F5DEB3',
            text: '#2F4F4F'
        }
    },
    9: {
        name: 'Ретро 20-х',
        category: 'wedding',
        pattern: 'wedding-retro.png',
        colors: {
            primary: '#000000',
            secondary: '#FFD700',
            text: '#FFFFFF'
        }
    },
    10: {
        name: 'Замковая сказка',
        category: 'wedding',
        pattern: 'wedding-castle.png',
        colors: {
            primary: '#708090',
            secondary: '#F5F5F5',
            text: '#2F4F4F'
        }
    },
    11: {
        name: 'Прованс',
        category: 'wedding',
        pattern: 'wedding-provence.png',
        colors: {
            primary: '#9370DB',
            secondary: '#E6E6FA',
            text: '#4A4A4A'
        }
    },
    12: {
        name: 'Лесная сказка',
        category: 'wedding',
        pattern: 'wedding-forest.png',
        colors: {
            primary: '#2E8B57',
            secondary: '#E8F0E8',
            text: '#2F4F4F'
        }
    },
    13: {
        name: 'Пляжная церемония',
        category: 'wedding',
        pattern: 'wedding-beach.png',
        colors: {
            primary: '#00CED1',
            secondary: '#FFE4B5',
            text: '#333333'
        }
    },
    14: {
        name: 'Горный воздух',
        category: 'wedding',
        pattern: 'wedding-mountain.png',
        colors: {
            primary: '#87CEEB',
            secondary: '#F5F5F5',
            text: '#2F4F4F'
        }
    },
    15: {
        name: 'Сад цветов',
        category: 'wedding',
        pattern: 'wedding-garden.png',
        colors: {
            primary: '#FF69B4',
            secondary: '#98FB98',
            text: '#4A4A4A'
        }
    },
    16: {
        name: 'Белый лист',
        category: 'wedding',
        pattern: 'wedding-white.png',
        colors: {
            primary: '#FFFFFF',
            secondary: '#F5F5F5',
            text: '#333333'
        }
    },
    17: {
        name: 'Графичный стиль',
        category: 'wedding',
        pattern: 'wedding-graphic.png',
        colors: {
            primary: '#000000',
            secondary: '#FFFFFF',
            text: '#000000'
        }
    },
    18: {
        name: 'Геометрия чувств',
        category: 'wedding',
        pattern: 'wedding-geo.png',
        colors: {
            primary: '#2C3E50',
            secondary: '#BDC3C7',
            text: '#2C3E50'
        }
    },
    19: {
        name: 'Для геймеров',
        category: 'wedding',
        pattern: 'wedding-gamer.png',
        colors: {
            primary: '#4B0082',
            secondary: '#00FF00',
            text: '#FFFFFF'
        }
    },
    20: {
        name: 'Кино-стиль',
        category: 'wedding',
        pattern: 'wedding-movie.png',
        colors: {
            primary: '#FFD700',
            secondary: '#000000',
            text: '#FFFFFF'
        }
    },
    21: {
        name: 'Космическая',
        category: 'wedding',
        pattern: 'wedding-space.png',
        colors: {
            primary: '#4B0082',
            secondary: '#FF1493',
            text: '#FFFFFF'
        }
    },

    // ДЕНЬ РОЖДЕНИЯ (101-399)
    101: {
        name: 'Радужное настроение',
        category: 'birthday',
        pattern: 'birthday-rainbow.png',
        colors: {
            primary: '#FFB6C1',
            secondary: '#87CEEB',
            text: '#4A4A4A'
        }
    },
    102: {
        name: 'Супергерои',
        category: 'birthday',
        pattern: 'birthday-heroes.png',
        colors: {
            primary: '#FF4500',
            secondary: '#1E90FF',
            text: '#FFFFFF'
        }
    },
    103: {
        name: 'Милые зверята',
        category: 'birthday',
        pattern: 'birthday-animals.png',
        colors: {
            primary: '#D2B48C',
            secondary: '#98FB98',
            text: '#4A4A4A'
        }
    },
    104: {
        name: 'Космическое приключение',
        category: 'birthday',
        pattern: 'birthday-space.png',
        colors: {
            primary: '#4B0082',
            secondary: '#00CED1',
            text: '#FFFFFF'
        }
    },
    201: {
        name: 'Стильная вечеринка',
        category: 'birthday',
        pattern: 'birthday-party.png',
        colors: {
            primary: '#000000',
            secondary: '#FFD700',
            text: '#FFFFFF'
        }
    },
    202: {
        name: 'Цветочное настроение',
        category: 'birthday',
        pattern: 'birthday-flowers.png',
        colors: {
            primary: '#FF69B4',
            secondary: '#FFA07A',
            text: '#4A4A4A'
        }
    },
    203: {
        name: 'Вечер в стиле ретро',
        category: 'birthday',
        pattern: 'birthday-retro.png',
        colors: {
            primary: '#8B4513',
            secondary: '#DEB887',
            text: '#2F4F4F'
        }
    },
    204: {
        name: 'Пляжная вечеринка',
        category: 'birthday',
        pattern: 'birthday-beach.png',
        colors: {
            primary: '#FFA500',
            secondary: '#40E0D0',
            text: '#4A4A4A'
        }
    },
    301: {
        name: 'Золотой юбилей',
        category: 'birthday',
        pattern: 'birthday-gold.png',
        colors: {
            primary: '#FFD700',
            secondary: '#B8860B',
            text: '#4A4A4A'
        }
    },
    302: {
        name: 'Бриллиантовая дата',
        category: 'birthday',
        pattern: 'birthday-diamond.png',
        colors: {
            primary: '#B0C4DE',
            secondary: '#2F4F4F',
            text: '#FFFFFF'
        }
    },
    303: {
        name: 'Нашему папе/маме',
        category: 'birthday',
        pattern: 'birthday-family.png',
        colors: {
            primary: '#CD5C5C',
            secondary: '#FA8072',
            text: '#4A4A4A'
        }
    },

    // ДРУГОЕ (401-999)
    401: {
        name: 'Деловой стиль',
        category: 'other',
        pattern: 'other-corporate.png',
        colors: {
            primary: '#2C3E50',
            secondary: '#ECF0F1',
            text: '#2C3E50'
        }
    },
    402: {
        name: 'Новогодний корпоратив',
        category: 'other',
        pattern: 'other-newyear.png',
        colors: {
            primary: '#C0392B',
            secondary: '#27AE60',
            text: '#FFFFFF'
        }
    },
    403: {
        name: 'Награждение',
        category: 'other',
        pattern: 'other-award.png',
        colors: {
            primary: '#F39C12',
            secondary: '#16A085',
            text: '#FFFFFF'
        }
    },
    501: {
        name: 'Громкая вечеринка',
        category: 'other',
        pattern: 'other-party.png',
        colors: {
            primary: '#E74C3C',
            secondary: '#8E44AD',
            text: '#FFFFFF'
        }
    },
    502: {
        name: 'Хэллоуин',
        category: 'other',
        pattern: 'other-halloween.png',
        colors: {
            primary: '#E67E22',
            secondary: '#2C3E50',
            text: '#FFFFFF'
        }
    },
    503: {
        name: 'Вечеринка у бассейна',
        category: 'other',
        pattern: 'other-pool.png',
        colors: {
            primary: '#3498DB',
            secondary: '#F1C40F',
            text: '#2C3E50'
        }
    },
    504: {
        name: 'Итальянская вечеринка',
        category: 'other',
        pattern: 'other-italy.png',
        colors: {
            primary: '#27AE60',
            secondary: '#E74C3C',
            text: '#FFFFFF'
        }
    },
    601: {
        name: 'Школьный выпускной',
        category: 'other',
        pattern: 'other-school.png',
        colors: {
            primary: '#2980B9',
            secondary: '#F39C12',
            text: '#FFFFFF'
        }
    },
    602: {
        name: 'Университетский выпускной',
        category: 'other',
        pattern: 'other-university.png',
        colors: {
            primary: '#8B4513',
            secondary: '#DAA520',
            text: '#FFFFFF'
        }
    },
    603: {
        name: 'Выпускной в детском саду',
        category: 'other',
        pattern: 'other-kindergarten.png',
        colors: {
            primary: '#FFB6C1',
            secondary: '#87CEEB',
            text: '#4A4A4A'
        }
    },
    701: {
        name: 'Теплый дом',
        category: 'other',
        pattern: 'other-house.png',
        colors: {
            primary: '#D2691E',
            secondary: '#DEB887',
            text: '#4A4A4A'
        }
    },
    702: {
        name: 'Загородный дом',
        category: 'other',
        pattern: 'other-cottage.png',
        colors: {
            primary: '#228B22',
            secondary: '#8B4513',
            text: '#FFFFFF'
        }
    },
    703: {
        name: 'Вручение ключей',
        category: 'other',
        pattern: 'other-keys.png',
        colors: {
            primary: '#FFD700',
            secondary: '#C0C0C0',
            text: '#2C3E50'
        }
    }
};

// ============================================
// Инициализация
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Проверяем, что Firebase и db определены
    if (typeof db === 'undefined') {
        console.error('Firebase db не определен. Проверьте подключение firebase-config.js');
        showFirebaseError();
        return;
    }

    EditorState.templateId = sessionStorage.getItem('selectedTemplate');
    EditorState.theme = templateThemes[EditorState.templateId];

    if (!EditorState.templateId || !EditorState.theme) {
        console.error('Шаблон не найден');
        window.location.href = '/';
        return;
    }

    displayTemplateInfo();
    applyThemeColors();

    const form = document.getElementById('invitationForm');
    if (form) {
        form.addEventListener('submit', createInvitation);
    }

    // Устанавливаем минимальную дату - сегодня
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('eventDate');
    if (dateInput) {
        dateInput.min = today;
    }
});

// ============================================
// Показать ошибку Firebase
// ============================================
function showFirebaseError() {
    const container = document.querySelector('.editor-container');
    if (container) {
        container.innerHTML = `
            <div style="text-align: center; padding: 3rem; background: white; border-radius: 20px;">
                <span style="font-size: 3rem;">🔌</span>
                <h2>Ошибка подключения к базе данных</h2>
                <p>Пожалуйста, обновите страницу или попробуйте позже</p>
                <button onclick="location.reload()" class="btn btn-primary" style="margin-top: 1rem;">
                    Обновить страницу
                </button>
            </div>
        `;
    }
}

// ============================================
// Отображение информации о шаблоне
// ============================================
function displayTemplateInfo() {
    const container = document.getElementById('selectedTemplateInfo');
    if (!container) return;

    const theme = EditorState.theme;

    const categoryEmoji = {
        wedding: '💒',
        birthday: '🎂',
        other: '🎉'
    };

    const categoryNames = {
        wedding: 'Свадебное приглашение',
        birthday: 'Приглашение на день рождения',
        other: 'Приглашение на мероприятие'
    };

    container.innerHTML = `
        <div class="template-header" style="
            background: ${theme.colors.primary};
            color: white;
            padding: 1.5rem;
            border-radius: 20px;
            margin-bottom: 2rem;
            text-align: center;
        ">
            <div style="font-size: 3rem; margin-bottom: 0.5rem;">
                ${categoryEmoji[theme.category]}
            </div>
            <h2 style="margin: 0; font-size: 1.8rem;">
                ${theme.name}
            </h2>
            <p style="margin: 0.5rem 0 0; opacity: 0.9;">
                ${categoryNames[theme.category]}
            </p>
        </div>
    `;

    // Устанавливаем фоновый паттерн
    const patternBg = document.querySelector('.pattern-bg');
    if (patternBg) {
        patternBg.style.backgroundImage = `url('/images/patterns/${theme.pattern}')`;
    }
}

// ============================================
// Применение цветов темы
// ============================================
function applyThemeColors() {
    const theme = EditorState.theme;

    const submitBtn = document.querySelector('.btn-primary');
    if (submitBtn) {
        submitBtn.style.background = theme.colors.primary;
        submitBtn.style.boxShadow = `0 10px 20px ${theme.colors.primary}40`;
    }

    // Удаляем старые стили если есть
    const oldStyle = document.getElementById('editor-theme-styles');
    if (oldStyle) {
        oldStyle.remove();
    }

    const style = document.createElement('style');
    style.id = 'editor-theme-styles';
    style.textContent = `
        .form-group input:focus,
        .form-group textarea:focus {
            border-color: ${theme.colors.primary} !important;
            box-shadow: 0 0 0 3px ${theme.colors.primary}20 !important;
        }
    `;
    document.head.appendChild(style);
}


// ============================================
// Создание приглашения
// ============================================
async function createInvitation(e) {
    e.preventDefault();

    // Получаем значения полей
    const organizerName = document.getElementById('organizerName').value.trim();
    const eventDate = document.getElementById('eventDate').value;
    const eventTime = document.getElementById('eventTime').value;
    const eventPlace = document.getElementById('eventPlace').value.trim();
    const eventMessage = document.getElementById('eventMessage').value.trim();

    // НОВОЕ: получаем кастомный slug
    const customSlug = document.getElementById('customSlug').value.toLowerCase().trim();

    // Валидация
    if (!organizerName || !eventDate || !eventTime || !eventPlace || !customSlug) {
        alert('Пожалуйста, заполните все обязательные поля');
        return;
    }

    // Валидация slug (только латиница, цифры, дефис)
    if (!/^[a-z0-9-]+$/.test(customSlug)) {
        alert('Ссылка может содержать только латинские буквы, цифры и дефисы');
        return;
    }

    if (customSlug.length < 3) {
        alert('Ссылка должна быть минимум 3 символа');
        return;
    }

    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    try {
        btn.textContent = 'Проверка ссылки...';
        btn.disabled = true;

        // Проверяем, что Firebase инициализирован
        if (typeof db === 'undefined') {
            throw new Error('Firebase не инициализирован');
        }

        // НОВОЕ: проверяем уникальность кастомного slug
        const existingSlug = await db.collection('invitations')
            .where('slug', '==', customSlug)
            .get();

        if (!existingSlug.empty) {
            alert('Эта ссылка уже занята. Пожалуйста, придумайте другую');
            btn.textContent = originalText;
            btn.disabled = false;
            return;
        }

        // Формируем данные для сохранения
        const formData = {
            slug: customSlug, // используем кастомный slug
            templateId: EditorState.templateId,
            templateName: EditorState.theme.name,
            category: EditorState.theme.category,
            theme: {
                pattern: EditorState.theme.pattern,
                colors: EditorState.theme.colors
            },
            organizerName: organizerName,
            eventDate: eventDate,
            eventTime: eventTime,
            eventPlace: eventPlace,
            eventMessage: eventMessage,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),

            searchableFields: {
                name: organizerName.toLowerCase(),
                date: eventDate,
                category: EditorState.theme.category
            },

            views: 0,
            rsvp: {
                yes: 0,
                no: 0,
                maybe: 0
            }
        };

        // Сохраняем в Firebase
        const docRef = await db.collection('invitations').add(formData);

        // Сохраняем ID документа в sessionStorage
        sessionStorage.setItem('lastCreatedInvitation', docRef.id);
        sessionStorage.setItem('lastCreatedSlug', customSlug);

        // Перенаправляем на ЧПУ-ссылку
        window.location.href = `/invitation/#${customSlug}`;

    } catch (error) {
        console.error('Firebase error:', error);

        btn.textContent = originalText;
        btn.disabled = false;

        let errorMessage = 'Произошла ошибка при создании приглашения';

        if (error.message === 'Firebase не инициализирован') {
            errorMessage = 'Ошибка подключения к базе данных. Пожалуйста, обновите страницу.';
        } else if (error.code === 'permission-denied') {
            errorMessage = 'Ошибка доступа к базе данных. Пожалуйста, обновите страницу и попробуйте снова.';
        } else if (error.code === 'unavailable') {
            errorMessage = 'Сервис временно недоступен. Пожалуйста, попробуйте позже.';
        }

        alert(errorMessage);
    }
}