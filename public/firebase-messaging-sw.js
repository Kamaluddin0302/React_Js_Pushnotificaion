importScripts('https://www.gstatic.com/firebasejs/8.1.2/firebase-app.js')
importScripts('https://www.gstatic.com/firebasejs/8.1.2/firebase-messaging.js')

let configration = {
    apiKey: "AIzaSyCe4U-z_U8n_NqAQ8Tm4EQl2JT6MeZFGlg",
    authDomain: "pushnotification-a1f4b.firebaseapp.com",
    projectId: "pushnotification-a1f4b",
    storageBucket: "pushnotification-a1f4b.appspot.com",
    messagingSenderId: "270027218415",
    appId: "1:270027218415:web:0f1d7ef5a3f5eeb3f82a1a",
    measurementId: "G-X0BFJKQW9P"
}


firebase.initializeApp(configration);
firebase.messaging();