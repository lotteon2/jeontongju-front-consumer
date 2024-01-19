importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js");

const config = {
  apiKey: "AIzaSyA1GNxBU0SnupYmC1mg4kH_AIDWNQWZp5g",
  authDomain: "jeontongjujum-4d228.firebaseapp.com",
  projectId: "jeontongjujum-4d228",
  storageBucket: "jeontongjujum-4d228.appspot.com",
  messagingSenderId: "499842917350",
  appId: "1:499842917350:web:d66d354c45d33bd19eac27",
  measurementId: "G-141N6H4QJC",
};
firebase.initializeApp(config);

const messaging = firebase.messaging();
