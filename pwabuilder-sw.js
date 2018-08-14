//This is the "Offline page" service worker

//Install stage sets up the offline page in the cache and opens a new cache
try {
self.addEventListener('install', function(event) {
  var offlinePage = new Request('index.html');
  event.waitUntil(
    fetch(offlinePage).then(function(response) {
      return caches.open('pwabuilder-offline').then(function(cache) {
        alertify.warning('[PWA Builder] Cached offline page during Install'+ response.url);

        return cache.put(offlinePage, response);
      });
    }).catch((e) => handleError(e, "Event Listener 'install' Error"))
  );
});
}
catch (e) {
  handleError(e, "Register 'install' Event Listener TryCatch Error")
}

// If any fetch fails, it will show the offline page.
// Maybe this should be limited to HTML documents?
self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function(e) {
      alertify.warning('[PWA Builder] Network request Failed. Serving offline page ' + e);
      handleError(e, "Event Listener 'fetch' Error")

      return caches.open('pwabuilder-offline').then(function(cache) {
        return cache.match('index.html');
      });
    }
  ));
});

//This is a event that can be fired from your page to tell the SW to update the offline page
self.addEventListener('refreshOffline', function(response) {
  return caches.open('pwabuilder-offline')
    .then(function(cache) {
      alertify.warning('[PWA Builder] Offline page updated from refreshOffline event: '+ response.url);

      return cache.put(offlinePage, response);
    })
    .catch((e) => handleError(e, "Event Listener 'refreshOffline' Error"));
});
