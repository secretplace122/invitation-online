const firebaseConfig = {
    apiKey: "AIzaSyCdUv3v40ppx8lNEToYQHFEsAMSj8MNIcE",
    authDomain: "invitation-maker-8f14d.firebaseapp.com",
    projectId: "invitation-maker-8f14d",
    storageBucket: "invitation-maker-8f14d.firebasestorage.app",
    messagingSenderId: "1025693724589",
    appId: "1:1025693724589:web:f014f67036ec8d9fe23b24"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
window.db = db;