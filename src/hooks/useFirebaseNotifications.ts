'use client';

import { useEffect, useState, useCallback } from 'react';
import { MessagePayload } from 'firebase/messaging';
import {
  getFCMToken,
  onForegroundMessage,
  requestNotificationPermission,
  showNotification,
} from '@/lib/firebase-messaging';

export interface UseFirebaseNotificationsOptions {
  /**
   * Firebase VAPID key from Firebase Console > Project Settings > Cloud Messaging
   * Required for getting FCM tokens
   */
  vapidKey: string;

  /**
   * Callback when a foreground notification is received
   */
  onMessage?: (payload: MessagePayload) => void;

  /**
   * Whether to automatically show notifications when received in foreground
   * Default: true
   */
  autoShowNotifications?: boolean;

  /**
   * Whether to automatically request notification permission on mount
   * Default: false
   */
  autoRequestPermission?: boolean;
}

export interface UseFirebaseNotificationsReturn {
  /**
   * The FCM token for this device/browser
   */
  token: string | null;

  /**
   * Whether the token is currently being fetched
   */
  loading: boolean;

  /**
   * Any error that occurred during token fetching
   */
  error: Error | null;

  /**
   * Current notification permission status
   */
  permission: NotificationPermission | null;

  /**
   * Request notification permission from the user
   */
  requestPermission: () => Promise<NotificationPermission>;

  /**
   * Manually refresh the FCM token
   */
  refreshToken: () => Promise<void>;
}

/**
 * React hook for Firebase Cloud Messaging notifications
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { token, permission, requestPermission } = useFirebaseNotifications({
 *     vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY!,
 *     onMessage: (payload) => {
 *       console.log('Received notification:', payload);
 *     },
 *   });
 *
 *   // Use the token to subscribe to notifications on your backend
 *   useEffect(() => {
 *     if (token) {
 *       subscribeToNotifications(token);
 *     }
 *   }, [token]);
 *
 *   return (
 *     <div>
 *       {permission !== 'granted' && (
 *         <button onClick={requestPermission}>
 *           Enable Notifications
 *         </button>
 *       )}
 *     </div>
 *   );
 * }
 * ```
 */
export function useFirebaseNotifications(
  options: UseFirebaseNotificationsOptions
): UseFirebaseNotificationsReturn {
  const {
    vapidKey,
    onMessage,
    autoShowNotifications = true,
    autoRequestPermission = false,
  } = options;

  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [permission, setPermission] = useState<NotificationPermission | null>(null);

  // Request permission
  const requestPermission = useCallback(async (): Promise<NotificationPermission> => {
    try {
      const result = await requestNotificationPermission();
      setPermission(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to request permission');
      setError(error);
      return 'denied';
    }
  }, []);

  // Fetch FCM token
  const fetchToken = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const fcmToken = await getFCMToken(vapidKey);
      setToken(fcmToken);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to get FCM token');
      setError(error);
      console.error('Error fetching FCM token:', error);
    } finally {
      setLoading(false);
    }
  }, [vapidKey]);

  // Refresh token
  const refreshToken = useCallback(async () => {
    await fetchToken();
  }, [fetchToken]);

  // Initialize on mount
  useEffect(() => {
    // Check initial permission status
    if (typeof window !== 'undefined' && 'Notification' in window) {
      setPermission(Notification.permission);

      // Auto-request permission if enabled
      if (autoRequestPermission && Notification.permission === 'default') {
        requestPermission();
      }
    }

    // Fetch token if permission is already granted
    if (typeof window !== 'undefined' && Notification.permission === 'granted') {
      fetchToken();
    } else {
      setLoading(false);
    }
  }, [fetchToken, autoRequestPermission, requestPermission]);

  // Fetch token when permission changes to granted
  useEffect(() => {
    if (permission === 'granted' && !token && !loading) {
      fetchToken();
    }
  }, [permission, token, loading, fetchToken]);

  // Set up foreground message listener
  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    const setupListener = async () => {
      unsubscribe = await onForegroundMessage((payload) => {
        // Call user's onMessage callback
        onMessage?.(payload);

        // Auto-show notification if enabled
        if (autoShowNotifications && payload.notification) {
          const options: NotificationOptions & { image?: string } = {
            body: payload.notification.body,
            icon: payload.notification.icon || '/favicon.ico',
            data: payload.data,
          };

          // Add image if available (not in TS types but supported by browsers)
          if (payload.notification.image) {
            options.image = payload.notification.image;
          }

          showNotification(payload.notification.title || 'New Notification', options);
        }
      });
    };

    setupListener();

    // Cleanup
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [onMessage, autoShowNotifications]);

  return {
    token,
    loading,
    error,
    permission,
    requestPermission,
    refreshToken,
  };
}