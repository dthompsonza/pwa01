//This is the "Offline page" service worker

//Add this below content to your HTML page, or add the js file to your page at the very top to register service worker
try{
  if (navigator.serviceWorker.controller) {
    alertify.message('[PWA Builder] active service worker found, no need to register')
  } else {
    //Register the ServiceWorker
    navigator.serviceWorker.register('pwabuilder-sw.js', {
      scope: './'
    }).then(function(reg) {
      alertify.success('Service worker has been registered for scope:'+ reg.scope);
    }).catch((e) => handleError(e, "Register Service Worker 'pwabuilder-sw.js' Error"));
  }
}
catch (e) {
  handleError(e, "Register Service Worker 'pwabuilder-sw.js' TryCatch Error");
}