class AnimationManager {
    constructor() {
        this.interval = null;
        this.elements = [];
        this.isRunning = false;
        this.container = null;
    }

    start(config) {
        if (!config || !config.enabled) {
            this.stop();
            return;
        }

        if (this.isRunning) return;

        this.isRunning = true;

        this.createContainer(config.container);

        const colors = config.colors || ['#FF69B4', '#FFD700', '#87CEEB'];
        const intensity = config.intensity || 5;
        const size = config.size || 30;
        const speed = config.speed || 3;
        const type = config.type || 'balloons';

        const intervalTime = Math.max(200, 1000 / intensity);

        this.interval = setInterval(() => {
            if (!this.isRunning || !this.container) return;
            this.createElement(type, colors, size, speed);
        }, intervalTime);
    }

    createContainer(containerElement) {
        this.destroyContainer();

        if (!containerElement) {
            containerElement = document.querySelector('.preview-container');
        }

        if (!containerElement) return;

        this.container = document.createElement('div');
        this.container.className = 'animation-container';

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

        containerElement.style.position = 'relative';
        containerElement.appendChild(this.container);
    }

    destroyContainer() {
        if (this.container?.parentNode) {
            this.container.remove();
            this.container = null;
        }
    }

    createElement(type, colors, baseSize, speed) {
        if (!this.container) return;

        const element = document.createElement('div');
        element.className = `animation-element animation-${type}`;

        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = baseSize * (0.7 + Math.random() * 0.6);
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 2;
        const duration = (speed * 0.8 + Math.random() * 0.4) * 2;

        const animationMap = {
            balloons: { content: '🎈', anim: 'float-up' },
            confetti: { content: '🎉', anim: 'float-confetti' },
            hearts: { content: '❤️', anim: 'float-heart' },
            stars: { content: '⭐', anim: 'float-star' },
            flowers: { content: '🌸', anim: 'float-flower' },
            snow: { content: '❄️', anim: 'float-snow' },
            rings: { content: '💍', anim: 'float-up' },
            'wedding-hearts': { content: '💕', anim: 'float-heart' },
            doves: { content: '🕊️', anim: 'float-up' },
            'wedding-cake': { content: '🎂', anim: 'float-flower' },
            champagne: { content: '🥂', anim: 'float-confetti' },
            gifts: { content: '🎁', anim: 'float-up' },
            candles: { content: '🕯️', anim: 'float-star' },
            party: { content: '🎊', anim: 'float-confetti' },
            crown: { content: '👑', anim: 'float-star' },
            rose: { content: '🌹', anim: 'float-flower' },
            tulip: { content: '🌷', anim: 'float-flower' },
            sunflower: { content: '🌻', anim: 'float-flower' },
            bouquet: { content: '💐', anim: 'float-flower' },
            pumpkin: { content: '🎃', anim: 'float-up' },
            ghost: { content: '👻', anim: 'float-snow' },
            bat: { content: '🦇', anim: 'float-confetti' },
            spider: { content: '🕷️', anim: 'float-snow' },
            'easter-egg': { content: '🥚', anim: 'float-up' },
            'easter-bunny': { content: '🐰', anim: 'float-heart' },
            chick: { content: '🐥', anim: 'float-flower' },
            snowflake: { content: '❄️', anim: 'float-snow' },
            'christmas-tree': { content: '🎄', anim: 'float-star' },
            santa: { content: '🎅', anim: 'float-up' },
            'gifts-xmas': { content: '🎁', anim: 'float-confetti' },
            snowman: { content: '⛄', anim: 'float-snow' }
        };

        const { content, anim } = animationMap[type] || { content: '✨', anim: 'float-up' };

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
            animation: ${anim} ${duration}s ease-in-out ${delay}s infinite;
            transform: translate(-50%, -50%);
            text-shadow: 0 0 10px ${color};
            pointer-events: none;
            will-change: transform, opacity;
        `;

        element.textContent = content;
        this.container.appendChild(element);
        this.elements.push(element);

        setTimeout(() => {
            if (element?.parentNode) {
                element.remove();
                this.elements = this.elements.filter(el => el !== element);
            }
        }, (duration + delay) * 1000 + 100);
    }

    cleanup() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
        this.elements.forEach(el => el?.parentNode?.remove());
        this.elements = [];
    }

    stop() {
        this.isRunning = false;
        this.cleanup();
        this.destroyContainer();
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes float-up {
        0% { transform: translate(-50%, -50%) translateY(0) rotate(0deg); opacity: 0; }
        10% { opacity: 1; }
        50% { transform: translate(-50%, -50%) translateY(-100px) rotate(10deg); }
        90% { opacity: 1; }
        100% { transform: translate(-50%, -50%) translateY(-200px) rotate(-10deg); opacity: 0; }
    }
    @keyframes float-confetti {
        0% { transform: translate(-50%, -50%) translateY(0) rotate(0deg) scale(0.5); opacity: 0; }
        20% { opacity: 1; transform: translate(-50%, -50%) translateY(-30px) rotate(180deg) scale(1); }
        80% { opacity: 1; transform: translate(-50%, -50%) translateY(-150px) rotate(720deg) scale(1); }
        100% { transform: translate(-50%, -50%) translateY(-200px) rotate(1080deg) scale(0.5); opacity: 0; }
    }
    @keyframes float-heart {
        0% { transform: translate(-50%, -50%) scale(0) translateY(0); opacity: 0; }
        20% { transform: scale(1) translateY(0); opacity: 1; }
        80% { transform: scale(1) translateY(-100px); opacity: 1; }
        100% { transform: scale(0) translateY(-150px); opacity: 0; }
    }
    @keyframes float-star {
        0% { transform: translate(-50%, -50%) rotate(0deg) scale(0); opacity: 0; }
        20% { transform: rotate(180deg) scale(1); opacity: 1; }
        80% { transform: rotate(360deg) scale(1) translateY(-80px); opacity: 1; }
        100% { transform: rotate(540deg) scale(0) translateY(-120px); opacity: 0; }
    }
    @keyframes float-flower {
        0% { transform: translate(-50%, -50%) translateY(0) rotate(0deg) scale(0.8); opacity: 0; }
        20% { opacity: 1; transform: translate(-50%, -50%) translateY(-20px) rotate(10deg) scale(1); }
        80% { transform: translate(-50%, -50%) translateY(-100px) rotate(-10deg) scale(1); opacity: 1; }
        100% { transform: translate(-50%, -50%) translateY(-150px) rotate(20deg) scale(0.8); opacity: 0; }
    }
    @keyframes float-snow {
        0% { transform: translate(-50%, -50%) translateY(-50px) rotate(0deg); opacity: 0; }
        20% { opacity: 1; }
        80% { transform: translate(-50%, -50%) translateY(100px) rotate(10deg); opacity: 1; }
        100% { transform: translate(-50%, -50%) translateY(150px) rotate(20deg); opacity: 0; }
    }
    .animation-container { 
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        user-select: none;
        overflow: hidden;
        z-index: 100;
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
window.animationManager = new AnimationManager();