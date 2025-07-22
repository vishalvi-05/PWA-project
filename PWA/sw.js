const CACHE_NAME = 'techconf-cache-v1';

const urlsToCache = [
  '/',
  // '/index.html',
  // '/about.html',
  // '/register.html',
  // '/schedule.html',
  // '/speakers.html',
  // '/contact.html',

  // '/style.css',
  // '/about.css',
  // '/register.css',
  // '/schedule.css',
  // '/speakers.css',
  // '/contact.css',

  // '/icons/icon-192.png',
  // '/icons/icon-512.png',

  // '/PWA',
  // '/manifest.webmanifest'
];

// Install Event - Cache app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching all assets');
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

// Activate Event - Clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch Event - Serve from cache first
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cache hit or fetch from network
      return response || fetch(event.request);
    })
  );
});
