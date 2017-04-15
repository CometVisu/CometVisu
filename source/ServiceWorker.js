/**
 * ServiceWorker for the CometVisu
 *
 * @author Tobias Bräutigam
 * @since (0.11.0) 2017
 */

var CACHE = "cv-cache-v1";
var NO_CACHE_TEST = /.+\.php$/i;
var config = {};

self.addEventListener('message', function(event) {
  var data = event.data;

  if (data.command === "configure") {
    config = data.message;
  }
});

self.addEventListener('fetch', function(ev) {
  if (config.disableCache === true || !ev.request.url.startsWith(this.registration.scope)) {
    return;
  }

  if (!NO_CACHE_TEST.test(ev.request.url) &&
      (!ev.request.headers.pragma || ev.request.headers.pragma !== "no-cache") &&
      (!ev.request.headers['Cache-Control'] || ev.request.headers['Cache-Control'] !== "no-cache")
  ) {

    ev.respondWith(fromCache(ev.request).then(function(response){
      // console.log(ev.request.url+" from cache");
      return response;
    }).catch(function () {
      // not cached -> do now
      // console.log("caching " + ev.request.url);
      return fetchAndUpdate(ev.request);
    }));

    if (config.forceReload === true) {
      // always update cache
      ev.waitUntil(update(ev.request));
    }
  } else {
    ev.respondWith(fromNetwork(ev.request));
  }
});

function fromNetwork(request, timeout) {
  return new Promise(function (resolve, reject) {
    if (timeout) {
      var timeoutId = setTimeout(reject, timeout);
    }

    fetch(request).then(function (response) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      resolve(response);
    }, reject);
  });
}

/**
 * Get response from cache
 * @param request {Request}
 * @return {Response}
 */
function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}

/**
 * Fetch request from network and update the cache
 * @param request {Request}
 * @return {Promise}
 */
function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}

/**
 * Fetch request from network, update the cache and return the response
 * @param request {Request}
 * @return {Response}
 */
function fetchAndUpdate(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      cache.put(request, response.clone());
      return response;
    });
  });
}