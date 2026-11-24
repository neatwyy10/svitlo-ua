const CACHE='vexi-v13-single';
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['./index.html','./manifest.json','./icon.png'])))});
self.addEventListener('activate',e=>e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>/^(attend-|vexi-)/.test(k)&&k!==CACHE).map(k=>caches.delete(k))))])));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==self.location.origin)return;e.respondWith(fetch(e.request,{cache:'no-store'}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||Response.error())))});
