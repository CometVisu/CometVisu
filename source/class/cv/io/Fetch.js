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
    /**
     *
     * @param resource {URL|string}
     * @param options {object}
     * @param proxy {boolean}
     * @param client {cv.io.IClient}
     * @returns {Promise<Response>}
     */
    fetch(resource, options = {}, proxy = false, client = undefined) {
      if (proxy) {
        const url = new URL(cv.io.rest.Client.getBaseUrl() + '/proxy', window.location.origin);
        url.searchParams.set('url', resource);
        resource = url;
      }
      return new Promise((resolve, reject) => {
        const xhr = new qx.io.request.Xhr('' + resource);
        xhr.set(options);
        if (client) {
          client.authorize(xhr);
        }
        xhr.addListener('success', function(ev) {
          const request = ev.getTarget();
          resolve(request.getResponse());
        }, this);
        xhr.addListener('statusError', function(ev) {
          const request = ev.getTarget();
          reject(request.getResponse());
        }, this);
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
    proxyFetch(resource, options, client) {
      return this.fetch(resource, options, true, client);
    }
  }
});
