/**
 * ServiceWorker for the CometVisu
 *
 * @author Tobias Bräutigam
 * @since (0.12.0) 2022
 */

var CACHE = "a2125df7440351eb71045f622ababc610b65465d";
var CACHE_TEST = /.+\.(js|jpg|gif|webp|svg|ttf|woff|eot|css|png|html|json)$/i;
var config = {};
var updateQueue = [];
var queueTid = null;
let startTime = 0;
const logPrefix = 'cv.ServiceWorker:';
const logStyling = 'color: #0044b2;';

const logger = {
  log: function () {
    console.log.apply(console, this._generateArgs(arguments));
  },

  debug: function () {
    if (config.debug === true) {
      console.debug.apply(console, this._generateArgs(arguments));
    }
  },

  _generateArgs(argsIn) {
    let args = Array.prototype.slice.call(argsIn);
    let message = this._getPrefix();
    let params = [logStyling];
    // apply the style prefix
    args.forEach(msg => {
      switch (typeof msg) {
        case 'object':
          message += ' %o';
          params.push(msg);
          break;
        default:
          message += ' ' + msg;
          break;
      }
    });
    params.unshift(message);
    return params;
  },

  _getPrefix() {
    return '%c' + (Date.now() - startTime).toString().padStart(6, '0') + ' ' +logPrefix;
  }
};

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
 * Fetch request from network and update the cache
 * @param request {Request}
 * @return {Promise}
 */
function update(request) {
  caches.open(CACHE).then(function (cache) {
    fetch(request).then(function (response) {
      if (response.status < 400) {
        cache.put(request, response);
      }
    }).catch(err => logger.log('error fetching request:', err));
  }).catch((err => logger.log('error opening cache:', err)));
}

function processQueue() {
  while (updateQueue.length) {
    var request = updateQueue.shift();
    update(request);
  }
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
    }).catch(err => Promise.reject('no-match'));
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
      if (response.status < 400) {
        cache.put(request, response.clone());
      }
      return response;
    }).catch(err => logger.log('error fetching request:', err));
  });
}

self.addEventListener('message', function (event) {
  var data = event.data;

  if (data.command === "configure") {
    config = data.message;
    logger.debug('Configuration:', config);
  }
});

self.addEventListener('install', function () {
  startTime = Date.now();
  // take over right now
  logger.log("CometVisu service worker installed");
});

// delete old caches after activation
self.addEventListener('activate', function (event) {
  logger.log("CometVisu service worker activated");
  var cacheWhitelist = [CACHE];
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function(ev) {
  if (config.disableCache === true ||
      ev.request.method.toLowerCase() !== "get" ||
      !ev.request.url.startsWith(this.registration.scope) ||
      !CACHE_TEST.test(ev.request.url)
  ) {
    // fallback to "normal" behaviour without serviceWorker -> sends HTTP request
    logger.debug("ignore cache for " +ev.request.method + " " + ev.request.url);
    return;
  }

  ev.respondWith(fromCache(ev.request).then(function(response){
    logger.debug('load from cache ' + ev.request.url);
    if (config.forceReload === true) {
      update(ev.request);
    } else {
      updateQueue.push(ev.request);
      if (queueTid) {
        clearTimeout(queueTid);
      }
      queueTid = setTimeout(processQueue, 1000);
    }

    return response;
  }).catch(function () {
    // not cached -> do now
    logger.debug("caching " + ev.request.url);
    return fetchAndUpdate(ev.request);
  }));
});
