const CACHE_NAME = 'dabom-v1';

globalThis.addEventListener('install', (event) => {
  globalThis.skipWaiting();
});

globalThis.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name)),
      ),
    ),
  );
  globalThis.clients.claim();
});

globalThis.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (url.pathname.startsWith('/api/')) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (
          response.ok &&
          response.type === 'basic' &&
          response.headers.get('Cache-Control') !== 'no-store'
        ) {
          const clone = response.clone();
          caches.open(CACHE_NAME)
            .then((cache) => cache.put(event.request, clone))
            .catch(error => console.error('SW: Caching failed', error));
        }
        return response;
      })
      .catch(() => caches.match(event.request)),
  );
});
