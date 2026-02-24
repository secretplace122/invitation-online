// Класс для управления анимациями
class AnimationManager {
    constructor() {
        this.interval = null;
        this.elements = [];
        this.isRunning = false;
        this.isStopping = false;
        this.container = null;
    }
    
    // Запуск анимации
    start(config) {
        if (!config || !config.enabled) {
            this.stop(true); // true = плавное отключение
            return;
        }
        
        // Если уже работает, не останавливаем резко
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.isStopping = false; // Флаг для плавной остановки
        
        this.createContainer(config.position);
        
        const colors = config.colors || ['#FF69B4', '#FFD700', '#87CEEB'];
        const intensity = config.intensity || 5;
        const size = config.size || 60;
        const speed = config.speed || 3;
        const type = config.type || 'balloons';
        
        // Создаем элементы с интервалом
        const intervalTime = Math.max(200, 1000 / intensity);
        
        this.interval = setInterval(() => {
            if (!this.isRunning || this.isStopping || !this.container) return;
            this.createElement(type, colors, size, speed);
        }, intervalTime);
    }
    
    // Создание контейнера для анимаций
    createContainer(position) {
        // Удаляем старый контейнер если есть
        if (this.container && this.container.parentNode) {
            this.container.remove();
        }
        
        this.container = document.createElement('div');
        this.container.className = 'animation-container';
        
        let card = null;
        
        switch(position) {
            case 'top':
                this.container.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 30%;
                    pointer-events: none;
                    z-index: 9999;
                    overflow: hidden;
                `;
                document.body.appendChild(this.container);
                break;
                
            case 'bottom':
                this.container.style.cssText = `
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 30%;
                    pointer-events: none;
                    z-index: 9999;
                    overflow: hidden;
                `;
                document.body.appendChild(this.container);
                break;
                
            case 'around-card':
                card = document.querySelector('.invitation-card');
                if (card) {
                    this.container.style.cssText = `
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        pointer-events: none;
                        z-index: 100;
                        overflow: hidden;
                    `;
                    card.style.position = 'relative';
                    card.appendChild(this.container);
                } else {
                    // Fallback
                    this.container.style.cssText = `
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        pointer-events: none;
                        z-index: 9999;
                        overflow: hidden;
                    `;
                    document.body.appendChild(this.container);
                }
                break;
                
            default: // 'whole'
                this.container.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 9999;
                    overflow: hidden;
                `;
                document.body.appendChild(this.container);
        }
    }
    
    // Создание одного элемента анимации
    createElement(type, colors, baseSize, speed) {
        if (!this.container) return;
        
        const element = document.createElement('div');
        element.className = `animation-element animation-${type}`;
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = baseSize * (0.7 + Math.random() * 0.6);
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 2;
        const duration = (speed * 0.8 + Math.random() * 0.4) * 2; // Преобразуем скорость в длительность
        
        let content = '';
        let animationName = '';
        
        switch(type) {
            // Основные
            case 'balloons': content = '🎈'; animationName = 'float-up'; break;
            case 'confetti': content = '🎉'; animationName = 'float-confetti'; break;
            case 'hearts': content = '❤️'; animationName = 'float-heart'; break;
            case 'stars': content = '⭐'; animationName = 'float-star'; break;
            case 'flowers': content = '🌸'; animationName = 'float-flower'; break;
            case 'snow': content = '❄️'; animationName = 'float-snow'; break;
            
            // Свадьба
            case 'rings': content = '💍'; animationName = 'float-up'; break;
            case 'wedding-hearts': content = '💕'; animationName = 'float-heart'; break;
            case 'doves': content = '🕊️'; animationName = 'float-up'; break;
            case 'wedding-cake': content = '🎂'; animationName = 'float-flower'; break;
            case 'champagne': content = '🥂'; animationName = 'float-confetti'; break;
            
            // День рождения
            case 'gifts': content = '🎁'; animationName = 'float-up'; break;
            case 'candles': content = '🕯️'; animationName = 'float-star'; break;
            case 'party': content = '🎊'; animationName = 'float-confetti'; break;
            case 'crown': content = '👑'; animationName = 'float-star'; break;
            
            // Цветы (разные)
            case 'rose': content = '🌹'; animationName = 'float-flower'; break;
            case 'tulip': content = '🌷'; animationName = 'float-flower'; break;
            case 'sunflower': content = '🌻'; animationName = 'float-flower'; break;
            case 'bouquet': content = '💐'; animationName = 'float-flower'; break;
            
            // Хэллоуин
            case 'pumpkin': content = '🎃'; animationName = 'float-up'; break;
            case 'ghost': content = '👻'; animationName = 'float-snow'; break;
            case 'bat': content = '🦇'; animationName = 'float-confetti'; break;
            case 'skull': content = '💀'; animationName = 'float-star'; break;
            case 'spider': content = '🕷️'; animationName = 'float-snow'; break;
            
            // Пасха
            case 'easter-egg': content = '🥚'; animationName = 'float-up'; break;
            case 'easter-bunny': content = '🐰'; animationName = 'float-heart'; break;
            case 'chick': content = '🐥'; animationName = 'float-flower'; break;
            case 'easter-basket': content = '🧺'; animationName = 'float-up'; break;
            
            // Новый год
            case 'snowflake': content = '❄️'; animationName = 'float-snow'; break;
            case 'christmas-tree': content = '🎄'; animationName = 'float-star'; break;
            case 'santa': content = '🎅'; animationName = 'float-up'; break;
            case 'gifts-xmas': content = '🎁'; animationName = 'float-confetti'; break;
            case 'snowman': content = '⛄'; animationName = 'float-snow'; break;
            
            default: content = '✨'; animationName = 'float-up';
        }
        
        element.style.cssText = `
            position: absolute;
            left: ${left}%;
            top: ${top}%;
            width: ${size}px;
            height: ${size}px;
            color: ${color};
            font-size: ${size}px;
            line-height: 1;
            opacity: 0;
            animation: ${animationName} ${duration}s ease-in-out ${delay}s infinite;
            transform: translate(-50%, -50%);
            text-shadow: 0 0 10px ${color};
            pointer-events: none;
            will-change: transform, opacity;
        `;
        
        element.textContent = content;
        
        this.container.appendChild(element);
        this.elements.push(element);
        
        // Удаляем элемент после окончания анимации
        setTimeout(() => {
            if (element && element.parentNode) {
                element.remove();
                this.elements = this.elements.filter(el => el !== element);
            }
        }, (duration + delay) * 1000 + 1000);
    }
    
    // Очистка от старых элементов
    cleanup() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        
        // Удаляем все элементы
        this.elements.forEach(el => {
            if (el && el.parentNode) el.remove();
        });
        this.elements = [];
    }
    
    // Плавная остановка
    stop(graceful = true) {
        if (graceful) {
            this.isStopping = true;
            // Новые элементы не создаем, старые доживают свой срок
            if (this.interval) {
                clearInterval(this.interval);
                this.interval = null;
            }
            // Удаляем контейнер через 10 секунд (макс время жизни элемента)
            setTimeout(() => {
                if (this.container && this.container.parentNode) {
                    this.container.remove();
                    this.container = null;
                }
                this.elements = [];
                this.isRunning = false;
                this.isStopping = false;
            }, 10000);
        } else {
            // Резкая остановка
            this.isRunning = false;
            this.cleanup();
            
            if (this.container && this.container.parentNode) {
                this.container.remove();
                this.container = null;
            }
        }
    }
}

// Добавляем CSS анимации
const style = document.createElement('style');
style.textContent = `
    @keyframes float-up {
        0% {
            transform: translate(-50%, -50%) translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        50% {
            transform: translate(-50%, -50%) translateY(-100px) rotate(10deg);
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) translateY(-200px) rotate(-10deg);
            opacity: 0;
        }
    }
    
    @keyframes float-confetti {
        0% {
            transform: translate(-50%, -50%) translateY(0) rotate(0deg) scale(0.5);
            opacity: 0;
        }
        20% {
            opacity: 1;
            transform: translate(-50%, -50%) translateY(-30px) rotate(180deg) scale(1);
        }
        80% {
            opacity: 1;
            transform: translate(-50%, -50%) translateY(-150px) rotate(720deg) scale(1);
        }
        100% {
            transform: translate(-50%, -50%) translateY(-200px) rotate(1080deg) scale(0.5);
            opacity: 0;
        }
    }
    
    @keyframes float-heart {
        0% {
            transform: translate(-50%, -50%) scale(0) translateY(0);
            opacity: 0;
        }
        20% {
            transform: scale(1) translateY(0);
            opacity: 1;
        }
        80% {
            transform: scale(1) translateY(-100px);
            opacity: 1;
        }
        100% {
            transform: scale(0) translateY(-150px);
            opacity: 0;
        }
    }
    
    @keyframes float-star {
        0% {
            transform: translate(-50%, -50%) rotate(0deg) scale(0);
            opacity: 0;
        }
        20% {
            transform: rotate(180deg) scale(1);
            opacity: 1;
        }
        80% {
            transform: rotate(360deg) scale(1) translateY(-80px);
            opacity: 1;
        }
        100% {
            transform: rotate(540deg) scale(0) translateY(-120px);
            opacity: 0;
        }
    }
    
    @keyframes float-flower {
        0% {
            transform: translate(-50%, -50%) translateY(0) rotate(0deg) scale(0.8);
            opacity: 0;
        }
        20% {
            opacity: 1;
            transform: translate(-50%, -50%) translateY(-20px) rotate(10deg) scale(1);
        }
        80% {
            transform: translate(-50%, -50%) translateY(-100px) rotate(-10deg) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) translateY(-150px) rotate(20deg) scale(0.8);
            opacity: 0;
        }
    }
    
    @keyframes float-snow {
        0% {
            transform: translate(-50%, -50%) translateY(-50px) rotate(0deg);
            opacity: 0;
        }
        20% {
            opacity: 1;
        }
        80% {
            transform: translate(-50%, -50%) translateY(100px) rotate(10deg);
            opacity: 1;
        }
        100% {
            transform: translate(-50%, -50%) translateY(150px) rotate(20deg);
            opacity: 0;
        }
    }
    
    .animation-container {
        pointer-events: none;
        user-select: none;
    }
    
    .animation-element {
        position: absolute;
        user-select: none;
        pointer-events: none;
        will-change: transform, opacity;
        filter: drop-shadow(0 0 5px currentColor);
    }
`;

document.head.appendChild(style);

// Создаем глобальный экземпляр
window.animationManager = new AnimationManager();