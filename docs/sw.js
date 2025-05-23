const cacheName = 'lebellego-24';

const filesToCache = [
  '/',
  '/css/main.css',
  '/css/vars.css',
  '/css/AfacadFlux-VariableFont_slnt,wght.ttf',
  '/img/logo.svg'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(cacheName).then(function (cache) {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== cacheName) {
          return caches.delete(key);
        }
      }));
    })
  );
});

self.addEventListener('fetch', function (e) {
  e.respondWith(
    fetch(e.request)
      .catch(() => {
        return caches.match(e.request).then(function (response) {
          return response
        })
      })
  );
});