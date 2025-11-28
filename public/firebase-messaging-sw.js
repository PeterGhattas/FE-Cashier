// Firebase Cloud Messaging Service Worker
// This service worker handles background notifications when the app is not in focus

// Import Firebase scripts for service worker
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js');

// Initialize Firebase in the service worker
// Note: These values should match your Firebase project configuration
// You can get these from Firebase Console > Project Settings > General > Your apps > Web app
// TODO: Replace these with your actual Firebase configuration values
firebase.initializeApp({
  apiKey: "AIzaSyBjgL9vzqdXbB7GGC1e1bfytCdXdyKFnns",
  authDomain: "erp-system-fafb4.firebaseapp.com",
  projectId: "erp-system-fafb4",
  storageBucket: "erp-system-fafb4.firebasestorage.app",
  messagingSenderId: "117441633689",
  appId: "1:117441633689:web:0817df9e8d6ac29fbc4708",
});

// Retrieve an instance of Firebase Messaging
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message:', payload);

  // Customize notification here
  const notificationTitle = payload.notification?.title || 'New Notification';
  const notificationOptions = {
    body: payload.notification?.body || 'You have a new notification',
    icon: payload.notification?.icon || '/favicon.ico',
    badge: '/favicon.ico',
    image: payload.notification?.image,
    data: payload.data,
    tag: payload.data?.tag || 'notification',
    requireInteraction: false,
    vibrate: [200, 100, 200],
  };

  // Show the notification
  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  console.log('[firebase-messaging-sw.js] Notification clicked:', event);

  event.notification.close();

  // Get the URL to open (from notification data or default to app root)
  const urlToOpen = event.notification.data?.url || '/';

  // Open or focus the app window
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Check if there's already a window open with the app
      for (const client of clientList) {
        if (client.url === urlToOpen && 'focus' in client) {
          return client.focus();
        }
      }

      // If no window is open, open a new one
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});