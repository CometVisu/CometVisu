/* Fetch.js
 *
 * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 */

/**
 * native fetch replacement that supports the internal recording mechanism for replay file.
 */
qx.Class.define('cv.io.Fetch', {
  type: 'static',

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    __cache: {},
    DEFAULT_CACHE_TTL: 5*60, // 5 minutes
    __gcInterval: null,

    async cachedFetch(resource, options = {}, proxy = false, client = undefined) {
      const cache = cv.io.Fetch.__cache;
      if (Object.prototype.hasOwnProperty.call(cache, resource)) {
        const entry = cache[resource];
        const ttl = options.ttl || cv.io.Fetch.DEFAULT_CACHE_TTL;
        // check age
        if (entry.time === 0) {
          // request is still running, return the promise
          return entry.data;
        } else if (entry.time > Date.now() - ttl*1000) {
          // request is not outdated yet
          return entry.data;
        }
      }
      if (options && Object.prototype.hasOwnProperty.call(options, 'ttl')) {
        delete options.ttl;
      }
      const ps = cv.io.Fetch.fetch(resource, options, proxy, client);
      const cacheEntry = {
        data: ps,
        time: 0,
        ttl: options.ttl || cv.io.Fetch.DEFAULT_CACHE_TTL
      };
      cache[resource] = cacheEntry;
      ps.then(() => {
        cacheEntry.time = Date.now();
      }).catch(e => {
        qx.log.Logger.error(cv.io.Fetch, 'error loading ' + resource + ': ', e);
        delete cache[resource];
      });
      if (!cv.io.Fetch.__gcInterval) {
        cv.io.Fetch.__gcInterval = setInterval(() => {
          cv.io.Fetch._gc();
        }, cv.io.Fetch.DEFAULT_CACHE_TTL);
      }
      return ps;
    },

    /**
     *
     * @param resource {URL|string}
     * @param options {object}
     * @param proxy {boolean}
     * @param client {cv.io.IClient}
     * @returns {Promise<Response>}
     */
    async fetch(resource, options = {}, proxy = false, client = undefined) {
      if (proxy) {
        const url = new URL(cv.io.rest.Client.getBaseUrl() + '/proxy', window.location.origin);
        if (resource) {
          url.searchParams.set('url', resource);
        }
        if (options) {
          for (const proxyParam of ['self-signed', 'config-section', 'auth-type']) {
            if (Object.prototype.hasOwnProperty.call(options, proxyParam)) {
              url.searchParams.set(proxyParam, options[proxyParam]);
              delete options[proxyParam];
            }
          }
        }
        resource = url;
      } else if (options) {
        for (const proxyParam of ['self-signed', 'config-section', 'auth-type']) {
          if (Object.prototype.hasOwnProperty.call(options, proxyParam)) {
            delete options[proxyParam];
          }
        }
      }
      return new Promise((resolve, reject) => {
        const xhr = new qx.io.request.Xhr('' + resource);
        xhr.set(options);
        if (client) {
          client.authorize(xhr);
        }
        xhr.addListener('success', ev => {
          const request = ev.getTarget();
          resolve(request.getResponse());
        });
        xhr.addListener('statusError', ev => {
          const request = ev.getTarget();
          reject(request.getResponse());
        });
        xhr.send();
      });
    },

    /**
     *
     * @param resource {URL|string}
     * @param options {object}
     * @param client {cv.io.IClient}
     * @returns {Promise<Response>}
     */
    async proxyFetch(resource, options, client) {
      return cv.io.Fetch.fetch(resource, options, true, client);
    },

    /**
     * Garbage collection for fetch cache
     * @private
     */
    _gc() {
      // go through cache and delete what's older than an hour (unless its ttl is bigger)
      let entry;
      let maxAge = 60*60*1000; // one hour
      let eol = Date.now() - maxAge;
      for (const resource in cv.io.Fetch.__cache) {
        entry = cv.io.Fetch.__cache[resource];
        if (entry.time <= eol && entry.ttl*1000 < maxAge) {
          delete cv.io.Fetch.__cache[resource];
        }
      }
    }
  }
});
