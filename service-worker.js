const CACHE_NAME = 'rr-iptv-stream-v1';

const FILES_TO_CACHE = [
  './',
  './src/index.html',
  './src/styles.css',
  './src/app.js',
  './src/auth.js',
  './src/hls-player.js',
  './src/epg.js',
  './src/record.js',
  './src/m3u.js',
  './src/profiles.js',
  './src/storage.js',
  './src/remote.js',
  './manifest.json',
  './public/icons/icon-192.png',
  './public/icons/icon-512.png',
  './public/icons/logo.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});