import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import { getMessaging, Messaging, isSupported } from 'firebase/messaging';

// Firebase configuration
// These values come from your Firebase project settings > General > Your apps > Web app
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp | undefined;
let messaging: Messaging | undefined;

/**
 * Initialize Firebase app
 * Only initializes once to avoid duplicate app errors
 */
export function initializeFirebase(): FirebaseApp {
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
  } else {
    app = getApps()[0];
  }
  return app;
}

/**
 * Get Firebase Cloud Messaging instance
 * Only works in browser environment and if messaging is supported
 */
export async function getFirebaseMessaging(): Promise<Messaging | null> {
  if (typeof window === 'undefined') {
    // Server-side rendering - no messaging
    return null;
  }

  // Check if messaging is supported (some browsers don't support it)
  const messagingSupported = await isSupported();
  if (!messagingSupported) {
    console.warn('Firebase Messaging is not supported in this browser');
    return null;
  }

  if (!messaging) {
    const app = initializeFirebase();
    messaging = getMessaging(app);
  }

  return messaging;
}

export { app, messaging };
