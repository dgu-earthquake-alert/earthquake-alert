importScripts(
  "https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js"
);
importScripts("env.js");

firebase.initializeApp({
  apiKey: self.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "earthquake-alert-fcm.firebaseapp.com",
  projectId: "earthquake-alert-fcm",
  storageBucket: "earthquake-alert-fcm.appspot.com",
  messagingSenderId: self.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: self.env.REACT_APP_APP_ID,
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  // payload에서 알림 타이틀과 내용 추출
  const notificationTitle = payload.notification.title; // 변경된 부분
  const notificationOptions = {
    body: payload.notification.body, // 변경된 부분
    //icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
