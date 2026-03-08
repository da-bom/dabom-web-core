const CACHE_NAME = 'dabom-v1';

const APP_SHELL_RESOURCES = [
  '/',
  '/offline',
  '/manifest.webmanifest',
  '/favicon.ico',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
];

globalThis.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.all(
        APP_SHELL_RESOURCES.map((url) =>
          cache
            .add(url)
            .then(() => console.log(`SW: 캐싱 성공 - ${url}`))
            .catch((error) => console.error(`SW: 캐싱 실패 - ${url}`, error)),
        ),
      );
    }),
  );
  globalThis.skipWaiting();
});

globalThis.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(names.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))),
      ),
  );
  globalThis.clients.claim();
});

globalThis.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  if (url.pathname.startsWith('/api/')) return;

  if (url.pathname === '/offline') {
    event.respondWith(caches.match('/offline'));
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (
          response.ok &&
          response.type === 'basic' &&
          response.headers.get('Cache-Control') !== 'no-store'
        ) {
          const clone = response.clone();
          caches
            .open(CACHE_NAME)
            .then((cache) => cache.put(event.request, clone))
            .catch((error) => console.error('SW: Caching failed', error));
        }
        return response;
      })
      .catch(async () => {
        if (event.request.mode === 'navigate') {
          const offlinePage = await caches.match('/offline');
          if (offlinePage) return offlinePage;
        }

        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) return cachedResponse;
      }),
  );
});
