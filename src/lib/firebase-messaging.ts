import { getFirebaseMessaging } from './firebase-config';
import { getToken, onMessage, MessagePayload } from 'firebase/messaging';

/**
 * Request notification permission from the user
 */
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    console.warn('This browser does not support notifications');
    return 'denied';
  }

  return await Notification.requestPermission();
}

/**
 * Get FCM token for push notifications
 * Requires notification permission to be granted
 *
 * @param vapidKey - Your Firebase VAPID key from Firebase Console > Project Settings > Cloud Messaging
 * @returns FCM token or null if failed
 */
export async function getFCMToken(vapidKey: string): Promise<string | null> {
  try {
    const messaging = await getFirebaseMessaging();
    if (!messaging) {
      console.warn('Firebase Messaging not available');
      return null;
    }

    // Check if permission is granted
    const permission = await requestNotificationPermission();
    if (permission !== 'granted') {
      console.warn('Notification permission not granted');
      return null;
    }

    // Register service worker
    if ('serviceWorker' in navigator) {
      try {
        // Register or get existing service worker
        console.log('Registering service worker...');
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js', {
          scope: '/',
          updateViaCache: 'none',
        });

        // Wait for service worker to be ready
        console.log('Waiting for service worker to be ready...');
        const readyRegistration = await navigator.serviceWorker.ready;
        console.log('Service Worker ready, state:', readyRegistration.active?.state);

        // Additional wait to ensure service worker is fully active
        if (readyRegistration.active?.state === 'activating') {
          console.log('Service Worker is activating, waiting...');
          await new Promise((resolve) => setTimeout(resolve, 500));
        }

        console.log('Service Worker is active, getting token...');

        // Get FCM token
        const token = await getToken(messaging, {
          vapidKey,
          serviceWorkerRegistration: registration,
        });

        if (token) {
          console.log('FCM Token:', token);
          return token;
        } else {
          console.warn('No registration token available');
          return null;
        }
      } catch (swError) {
        console.error('Service Worker registration failed:', swError);
        return null;
      }
    } else {
      console.warn('Service workers are not supported in this browser');
      return null;
    }
  } catch (error) {
    console.error('Error getting FCM token:', error);
    return null;
  }
}

/**
 * Handle foreground messages
 * Call this function to listen for messages when the app is in the foreground
 *
 * @param callback - Function to handle incoming messages
 */
export async function onForegroundMessage(
  callback: (payload: MessagePayload) => void
): Promise<(() => void) | null> {
  try {
    const messaging = await getFirebaseMessaging();
    if (!messaging) {
      console.warn('Firebase Messaging not available');
      return null;
    }

    // Listen for foreground messages
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('Foreground message received:', payload);
      callback(payload);
    });

    return unsubscribe;
  } catch (error) {
    console.error('Error setting up foreground message listener:', error);
    return null;
  }
}

/**
 * Show a notification using the Notifications API
 * Useful for displaying foreground notifications
 */
export function showNotification(title: string, options?: NotificationOptions): void {
  if (typeof window === 'undefined' || !('Notification' in window)) {
    console.warn('This browser does not support notifications');
    return;
  }

  if (Notification.permission === 'granted') {
    new Notification(title, options);
  } else {
    console.warn('Notification permission not granted');
  }
}