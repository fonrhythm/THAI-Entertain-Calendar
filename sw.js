// sw.js —— 放在网站根目录 https://yourdomain.com/sw.js
// 版本号改一下就能强制所有用户更新缓存，上线新版本时记得改
const CACHE_VERSION = 'chob-calendar-v1';

// 应用外壳：首次安装时预先缓存，保证离线也能打开页面框架
const APP_SHELL = [
  '/thai-local-calendar/',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // 活动数据来自 Google Apps Script，要保持新鲜：network-first，
  // 网络失败（离线）时才退回上次缓存的数据，保证弱网也能看到内容
  if (url.hostname === 'script.google.com') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const clone = res.clone();
          caches.open(CACHE_VERSION).then((cache) => {
            cache.put(request, clone).catch(() => {
              // 缓存失败（比如chrome-extension请求）不中断流程
            });
          });
          return res;
        })
        .catch(() => caches.match(request).catch(() => null))
    );
    return;
  }

  // 页面导航：network-first，离线时退回缓存的外壳页面
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const clone = res.clone();
          caches.open(CACHE_VERSION).then((cache) => {
            cache.put(request, clone).catch(() => {});
          });
          return res;
        })
        .catch(() => 
          caches.match(request)
            .then((r) => r || caches.match('/thai-local-calendar/'))
            .catch(() => null)
        )
    );
    return;
  }

  // 其余静态资源（图标、字体、CSS等）：cache-first，加快二次打开速度
  event.respondWith(
    caches.match(request)
      .then((cached) => {
        if (cached) return cached;
        return fetch(request).then((res) => {
          const clone = res.clone();
          caches.open(CACHE_VERSION).then((cache) => {
            cache.put(request, clone).catch(() => {});
          });
          return res;
        });
      })
      .catch(() => null)
  );
});
