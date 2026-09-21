/* SocketLibrary.js
 *
 * copyright (c) 2010-2026, Christian Mayer and the CometVisu contributors.
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
 * Loads the socket client library an ioBroker server publishes under /socket.io.js.
 *
 * Which protocol such a server speaks depends on its configuration - the raw framing of
 * \@iobroker/ws or socket.io - and that cannot be told apart from the outside. It does not have to
 * be: every server delivers the matching client library under that path, and both offer the same
 * `io.connect(url, options)` interface. Loading it instead of talking the protocol by hand is what
 * every other ioBroker frontend does, and it is the only way to reach all configurations.
 *
 * The library announces itself in the global `window.io`. It is picked up right after loading and
 * the previous value is put back, so several backends can be used side by side. Loads are
 * serialized for the same reason.
 */
qx.Class.define('cv.io.iobroker.SocketLibrary', {
  type: 'static',

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    /** origin -> promise of the library loaded from there */
    __libraries: {},
    /** loads run one after the other, they all pass through the global window.io */
    __queue: null,

    /**
     * The library published by the server that hosts the given backend, loaded at most once per
     * origin.
     *
     * @param backendUrl {URL|String} url of the ioBroker backend
     * @return {Promise} resolves with the `io` object of the library
     */
    load(backendUrl) {
      const origin = this.getOrigin(backendUrl);

      if (!this.__libraries[origin]) {
        this.__queue = (this.__queue || Promise.resolve()).then(
          () => this.__loadFrom(origin),
          () => this.__loadFrom(origin)
        );

        this.__libraries[origin] = this.__queue;
      }

      return this.__libraries[origin];
    },

    /**
     * Origin to load the library from. The backend is addressed as ws(s), the library is fetched
     * over http(s) from the same host.
     *
     * @param backendUrl {URL|String} url of the ioBroker backend
     * @return {String} origin without a trailing slash
     */
    getOrigin(backendUrl) {
      const url = typeof backendUrl === 'string' ? new window.URL(backendUrl) : backendUrl;

      return `${url.protocol.replace(/^ws/, 'http')}//${url.host}`;
    },

    /**
     * Load the library from one origin and hand back what it registered globally.
     *
     * @param origin {String} origin to load from
     * @return {Promise} resolves with the `io` object
     */
    __loadFrom(origin) {
      return new Promise((resolve, reject) => {
        const url = `${origin}/socket.io.js`;
        const previous = window.io;
        const request = new qx.bom.request.Script();

        /**
         * Take the library out of the global and restore what was there before.
         *
         * @return {Object|undefined} the loaded library
         */
        const collect = () => {
          const loaded = window.io;
          window.io = previous;
          return loaded;
        };

        request.onload = () => {
          const io = collect();
          if (io && typeof io.connect === 'function') {
            resolve(io);
          } else {
            reject(new Error(url + ' did not provide a socket client'));
          }
        };
        request.onerror = () => {
          collect();
          reject(new Error('cannot load ' + url));
        };
        request.ontimeout = () => {
          collect();
          reject(new Error('timeout while loading ' + url));
        };

        request.open('GET', url);
        request.send();
      });
    }
  }
});
