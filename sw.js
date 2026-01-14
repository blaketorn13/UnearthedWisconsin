// Unearthed Wisconsin Service Worker
const CACHE_NAME = 'unearthed-wisconsin-v1';

// Files to cache for offline use
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/cover.png',
  '/Certificate.png',
  '/Aztalan1.png',
  '/Aztalan2.png',
  '/Highcliff1.png',
  '/Highcliff2.png',
  '/LizardMound.png',
  '/LizardMoundMap.png',
  '/Dock.png',
  '/Lake.png',
  '/Sign.png',
  '/hike.png',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// External CDN resources to cache
const CDN_ASSETS = [
  'https://unpkg.com/react@18/umd/react.development.js',
  'https://unpkg.com/react-dom@18/umd/react-dom.development.js',
  'https://unpkg.com/@babel/standalone/babel.min.js'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching static assets');
      // Cache local assets
      const localPromise = cache.addAll(STATIC_ASSETS).catch(err => {
        console.warn('[SW] Some local assets failed to cache:', err);
      });
      // Cache CDN assets
      const cdnPromise = Promise.all(
        CDN_ASSETS.map(url => 
          fetch(url, { mode: 'cors' })
            .then(response => {
              if (response.ok) {
                return cache.put(url, response);
              }
            })
            .catch(err => console.warn('[SW] CDN asset failed:', url))
        )
      );
      return Promise.all([localPromise, cdnPromise]);
    })
  );
  // Activate immediately
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    })
  );
  // Take control of all pages immediately
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') return;

  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) return;

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        // Return cached version
        return cachedResponse;
      }

      // Not in cache, fetch from network
      return fetch(request).then((networkResponse) => {
        // Cache successful responses for future
        if (networkResponse.ok && url.protocol.startsWith('http')) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Network failed, return offline fallback for HTML
        if (request.headers.get('accept')?.includes('text/html')) {
          return caches.match('/index.html');
        }
      });
    })
  );
});

// Handle messages from the app
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});

