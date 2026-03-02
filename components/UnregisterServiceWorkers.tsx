'use client';

import { useEffect } from 'react';

/**
 * In development, unregister any service workers (e.g. from Serwist/PWA extensions)
 * that intercept navigation and cause "Failed to fetch" on localhost.
 * Run once on mount so the next reload is not controlled by a SW.
 */
export default function UnregisterServiceWorkers() {
  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      process.env.NODE_ENV !== 'development' ||
      !('serviceWorker' in navigator)
    ) {
      return;
    }
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      registrations.forEach((registration) => {
        registration.unregister().then(() => {
          console.log('[dev] Unregistered service worker:', registration.scope);
        });
      });
    });
  }, []);
  return null;
}
