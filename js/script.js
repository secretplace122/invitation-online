// Основные функции для всего сайта
const App = {
    // Инициализация
    init: function() {
        this.mobileMenu();
        this.smoothScroll();
        this.activeMenuHighlight();
        this.lazyLoadImages();
        this.formValidation();
    },

    // Мобильное меню
    mobileMenu: function() {
        const menuBtn = document.getElementById('mobileMenuBtn');
        const navLinks = document.getElementById('navLinks');
        
        if (menuBtn && navLinks) {
            menuBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                navLinks.classList.toggle('active');
                
                // Анимация кнопки
                const spans = this.querySelectorAll('span');
                spans.forEach(span => span.classList.toggle('active'));
            });

            // Закрытие меню при клике вне
            document.addEventListener('click', function(e) {
                if (!navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
                    navLinks.classList.remove('active');
                }
            });
        }
    },

    // Плавная прокрутка
    smoothScroll: function() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Закрываем мобильное меню
                    document.getElementById('navLinks')?.classList.remove('active');
                }
            });
        });
    },

    // Подсветка активного пункта меню
    activeMenuHighlight: function() {
        const sections = document.querySelectorAll('section[id]');
        const navItems = document.querySelectorAll('.nav-links a');

        if (sections.length === 0) return;

        window.addEventListener('scroll', () => {
            let current = '';
            const scrollPosition = window.scrollY + 100;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navItems.forEach(item => {
                item.classList.remove('active');
                const href = item.getAttribute('href').replace('#', '');
                if (href === current) {
                    item.classList.add('active');
                }
            });
        });
    },

    // Ленивая загрузка изображений
    lazyLoadImages: function() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    },

    // Валидация форм
    formValidation: function() {
        const forms = document.querySelectorAll('form[data-validate]');
        
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                let isValid = true;
                const inputs = this.querySelectorAll('input[required], textarea[required], select[required]');
                
                inputs.forEach(input => {
                    if (!input.value.trim()) {
                        this.showError(input, 'Это поле обязательно');
                        isValid = false;
                    } else if (input.type === 'email' && !this.validateEmail(input.value)) {
                        this.showError(input, 'Введите корректный email');
                        isValid = false;
                    } else {
                        this.removeError(input);
                    }
                });

                if (isValid) {
                    // Отправка формы
                    this.submit();
                }
            });
        });
    },

    validateEmail: function(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },

    showError: function(input, message) {
        const formGroup = input.closest('.form-group');
        if (!formGroup) return;
        
        formGroup.classList.add('error');
        
        let errorMsg = formGroup.querySelector('.error-message');
        if (!errorMsg) {
            errorMsg = document.createElement('span');
            errorMsg.className = 'error-message';
            formGroup.appendChild(errorMsg);
        }
        errorMsg.textContent = message;
    },

    removeError: function(input) {
        const formGroup = input.closest('.form-group');
        if (formGroup) {
            formGroup.classList.remove('error');
            const errorMsg = formGroup.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.remove();
            }
        }
    },

    // Форматирование даты
    formatDate: function(dateString) {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('ru-RU', options);
    },

    // Копирование в буфер обмена
    copyToClipboard: function(text) {
        navigator.clipboard.writeText(text).then(() => {
            this.showNotification('Скопировано!', 'success');
        }).catch(() => {
            this.showNotification('Ошибка при копировании', 'error');
        });
    },

    // Показать уведомление
    showNotification: function(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            background: ${type === 'success' ? '#10B981' : '#EF4444'};
            color: white;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 9999;
            animation: slideIn 0.3s ease;
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
};

// Добавляем стили для анимаций
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .form-group.error input,
    .form-group.error textarea,
    .form-group.error select {
        border-color: #EF4444;
    }
    
    .error-message {
        color: #EF4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: block;
    }
`;
document.head.appendChild(style);

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => App.init());