(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.io.rest.Client": {},
      "qx.io.request.Xhr": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
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
      /**
       *
       * @param resource {URL|string}
       * @param options {object}
       * @param proxy {boolean}
       * @param client {cv.io.IClient}
       * @returns {Promise<Response>}
       */
      fetch: function fetch(resource) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var proxy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var client = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
        if (proxy) {
          var url = new URL(cv.io.rest.Client.getBaseUrl() + '/proxy', window.location.origin);
          if (resource) {
            url.searchParams.set('url', resource);
          }
          if (options) {
            for (var _i = 0, _arr = ['self-signed', 'config-section', 'auth-type']; _i < _arr.length; _i++) {
              var proxyParam = _arr[_i];
              if (Object.prototype.hasOwnProperty.call(options, proxyParam)) {
                url.searchParams.set(proxyParam, options[proxyParam]);
                delete options[proxyParam];
              }
            }
          }
          resource = url;
        } else if (options) {
          for (var _i2 = 0, _arr2 = ['self-signed', 'config-section', 'auth-type']; _i2 < _arr2.length; _i2++) {
            var _proxyParam = _arr2[_i2];
            if (Object.prototype.hasOwnProperty.call(options, _proxyParam)) {
              delete options[_proxyParam];
            }
          }
        }
        return new Promise(function (resolve, reject) {
          var xhr = new qx.io.request.Xhr('' + resource);
          xhr.set(options);
          if (client) {
            client.authorize(xhr);
          }
          xhr.addListener('success', function (ev) {
            var request = ev.getTarget();
            resolve(request.getResponse());
          });
          xhr.addListener('statusError', function (ev) {
            var request = ev.getTarget();
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
      proxyFetch: function proxyFetch(resource, options, client) {
        return this.fetch(resource, options, true, client);
      }
    }
  });
  cv.io.Fetch.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Fetch.js.map?dt=1673093883619