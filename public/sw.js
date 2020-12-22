

var CACHE_NAME = 'website';


this.addEventListener('install', (event)=> {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache)=> {
        console.log(cache)
        cache.addAll([
            'static/js/bundle.js',
            'static/js/0.chunk.js',
            'static/js/main.chunk.js',
            "index.html",
            '/'
        ]);
      })
  );
});



this.addEventListener('fetch', (event)=> {
  if(!navigator.onLine){
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
          return fetch(event.request);
        }
        )
    )
  }
})