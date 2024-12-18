self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('my-app-cache').then(cache => {
      return cache.addAll([
        '/',
        '/index.html',
        '/styles.css',
        '/script.js',
        '/images/logo.png'
      ]).catch(error => {
        console.error('Failed to cache some resources:', error);
      });
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

if(!self.define){let e,s={};const t=(t,n)=>(t=new URL(t+".js",n).href,s[t]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=t,e.onload=s,document.head.appendChild(e)}else e=t,importScripts(t),s()})).then((()=>{let e=s[t];if(!e)throw new Error(`Module ${t} didn’t register its module`);return e})));self.define=(n,i)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let o={};const c=e=>t(e,r),u={module:{uri:r},exports:o,require:c};s[r]=Promise.all(n.map((e=>u[e]||c(e)))).then((e=>(i(...e),o)))}}define(["./workbox-2b078caf"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"manifest.json",revision:"0a5defb101b2b67394e989586c16b4a1"}],{}),e.registerRoute((({request:e})=>"document"===e.destination),new e.NetworkFirst({cacheName:"documents",plugins:[]}),"GET"),e.registerRoute((({request:e})=>"image"===e.destination),new e.CacheFirst({cacheName:"images",plugins:[new e.ExpirationPlugin({maxEntries:50})]}),"GET"),e.registerRoute((({request:e})=>"script"===e.destination||"style"===e.destination),new e.StaleWhileRevalidate({cacheName:"static-resources",plugins:[]}),"GET")}));
//# sourceMappingURL=sw.js.map
