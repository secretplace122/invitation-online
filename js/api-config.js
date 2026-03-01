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