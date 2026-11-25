// La app se mudó a https://copiloto-regularidad.pages.dev/ — este service worker reemplaza al viejo,
// borra lo guardado y recarga las pestañas abiertas en la página de mudanza (que pasa los datos a la dirección nueva).
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) await caches.delete(k);
    await self.registration.unregister();
    for (const c of await self.clients.matchAll({ type: 'window' })) { try { c.navigate('/copiloto-regularidad/'); } catch (err) { } }
  })());
});
