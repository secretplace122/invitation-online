// Конфиг Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCdUv3v40ppx8lNEToYQHFEsAMSj8MNIcE",
    authDomain: "invitation-maker-8f14d.firebaseapp.com",
    projectId: "invitation-maker-8f14d",
    storageBucket: "invitation-maker-8f14d.firebasestorage.app",
    messagingSenderId: "1025693724589",
    appId: "1:1025693724589:web:f014f67036ec8d9fe23b24",
    measurementId: "G-WPY5EJM2M8"
};

// Инициализация Firebase (если еще не инициализирован)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
    console.log('Firebase инициализирован');
}

// Создаем глобальный объект db
const db = firebase.firestore();


// Проверяем подключение
db.collection('invitations').limit(1).get()
    .then(() => console.log('Firestore подключен успешно'))
    .catch(err => {
        console.error('Ошибка подключения к Firestore:', err);
        // Показываем сообщение пользователю
        if (typeof showFirebaseError === 'function') {
            showFirebaseError();
        }
    });

// Делаем db доступным глобально
window.db = db;