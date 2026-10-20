const C='k4mori-v11';const FILES=['./','index.html','manifest.webmanifest','icon-180.png','icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
  if(new URL(e.request.url).origin!==location.origin&&!e.request.url.includes('fonts.g'))return;
  e.respondWith(fetch(e.request).then(r=>{if(r.ok&&(new URL(e.request.url).origin===location.origin||e.request.url.includes('fonts.g'))){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp))}return r}).catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('index.html'))));});
