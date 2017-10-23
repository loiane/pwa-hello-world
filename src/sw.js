var cacheName = 'usersCacheV1';

var cacheFiles = [
  'dist/app.js',
  './',
  'index.html',
  'assets/js/localForage/localforage.min.js',
  'assets/js/localForage/localforage-getitems.js',
  'assets/js/localForage/localforage-setitems.js',
  'assets/mdl/material.min.css',
  'assets/mdl/material.min.js'
];

//Installing
//Pre-cache App Shell
self.addEventListener('install', function(event) {
  console.log("From SW: Install Event");
  self.skipWaiting();
  event.waitUntil(
    caches.open(cacheName)
    .then(function(cache){
      return cache.addAll(cacheFiles)
    })
  );
});

//Activating
//Clean up
self.addEventListener('activate', function(event) {
  console.log("From SW: Activate Event");
  self.clients.claim();
  event.waitUntil(
    caches.keys()
      .then(function(cacheKeys){
        var deletePromises = [];
        for(var i = 0; i < cacheKeys.length; i++){
          if(cacheKeys[i] != cacheName){
            deletePromises.push(caches.delete(cacheKeys[i]));
          }
        }
        return Promise.all(deletePromises);
      })
  );
});
