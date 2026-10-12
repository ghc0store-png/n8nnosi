// Cangkang aplikasi di-cache supaya halaman tetap terbuka walau jaringan putus. Data API tidak pernah di-cache.
const V = "kontrol-v2";
self.addEventListener("install", (e) => { e.waitUntil(caches.open(V).then((c) => c.addAll(["./", "icon.svg", "icon-192.png", "icon-512.png", "manifest.webmanifest"])).then(() => self.skipWaiting())); });
self.addEventListener("activate", (e) => { e.waitUntil(caches.keys().then((k) => Promise.all(k.filter((x) => x !== V).map((x) => caches.delete(x)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", (e) => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== location.origin) return;
  e.respondWith(fetch(e.request).then((r) => { if (r.ok) { const c = r.clone(); caches.open(V).then((x) => x.put(e.request, c)); } return r; }).catch(() => caches.match(e.request).then((m) => m || caches.match("./"))));
});
