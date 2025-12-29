const CACHE_NAME = 'protracker-v9.4';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    'https://cdn.tailwindcss.com'
];

// 1. Install Service Worker & Cache Static Assets
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
    self.skipWaiting();
});

// 2. Activate Service Worker & Clean Old Caches
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) return caches.delete(key);
                })
            );
        })
    );
    self.clients.claim();
});

// 3. Fetch Interceptor (Network First, Fallback to Cache)
self.addEventListener('fetch', (e) => {
    e.respondWith(
        fetch(e.request)
            .then((res) => {
                // If it's a success, clone and cache it
                if (res && res.status === 200 && e.request.method === 'GET') {
                    const resClone = res.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(e.request, resClone);
                    });
                }
                return res;
            })
            .catch(() => caches.match(e.request))
    );
});

// 4. Notification Click Handler
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
            // If the app is already open, focus it
            for (const client of clientList) {
                if (client.url.includes('index.html') && 'focus' in client) return client.focus();
            }
            // Otherwise open it (optional, usually index.html)
            if (clients.openWindow) return clients.openWindow('./index.html');
        })
    );
});
