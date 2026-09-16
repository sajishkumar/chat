// Service Worker for Background Stealth Notifications
self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

// Push notification listener (triggers even when browser tab is completely closed)
self.addEventListener('push', (event) => {
    let data = { title: 'KSEB', body: 'New notice update.' };
    try {
        if (event.data) {
            data = event.data.json();
        }
    } catch(e) {}

    const options = {
        body: data.body || 'New regulatory notice available.',
        icon: 'https://img.icons8.com/color/48/document.png',
        badge: 'https://img.icons8.com/color/48/document.png',
        silent: true, // COMPLETELY SILENT (NO AUDIO SOUND)
        tag: 'kseb-stealth-background'
    };

    event.waitUntil(
        self.registration.showNotification(data.title || 'KSEB', options)
    );
});

// Notification click listener — SILENT DISMISS (Does NOT open browser window!)
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
});
