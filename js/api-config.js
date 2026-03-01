const API_CONFIG = {
    baseUrl: 'https://functions.yandexcloud.net/d4es8acgi8bq2sijdvt3',
    
    endpoints: {
        createPayment: '/api/create-payment',
        checkPayment: '/api/check-payment/',
        health: '/api/health'
    },
    
    getUrl(endpoint) {
        return `${this.baseUrl}?path=${endpoint}`;
    }
};

async function checkBackendHealth() {
    try {
        const response = await fetch(API_CONFIG.getUrl(API_CONFIG.endpoints.health));
        const data = await response.json();
        console.log('✅ Бэкенд работает:', data);
        return true;
    } catch (error) {
        console.error('❌ Бэкенд недоступен:', error);
        return false;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('/editor/')) {
        checkBackendHealth();
    }
});