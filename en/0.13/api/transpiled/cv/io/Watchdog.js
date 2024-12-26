/* Watchdog.js
 *
 * copyright (c) 2010-2016, Christian Mayer and the CometVisu contributers.
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
'use strict';

/**
 * The Watchdog observes the backend communication and restarts the connection if
 * the client received to data from the backend within a defined timeout.
 */
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      },
      "cv.io.Client": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define('cv.io.Watchdog', {
    extend: qx.core.Object,
    /*
    ******************************************************
      CONSTRUCTOR
    ******************************************************
    */
    construct: function construct() {
      this.last = Date.now();
    },
    /*
    ******************************************************
      PROPERTIES
    ******************************************************
    */
    properties: {
      client: {
        check: 'cv.io.Client',
        nullable: true,
        init: null
      }
    },
    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      /**
       * Time of the last successful watchdog update.
       * @type {Date}
       */
      last: null,
      /**
       * Time of the last successful watchdog update when the data were loaded
       * completely.
       * @type {Date}
       */
      hardLast: null,
      /**
       * ID of the setInterval
       * @type {number|null}
       */
      __P_802_0: null,
      /**
       * Check whether the watchdog was pinged recently enough.
       * If not, restart the connection. When the last data reading is older than
       * `maxDataAge` a reload is requested.
       * This does not update the last ping.
       */
      aliveCheckFunction: function aliveCheckFunction() {
        var now = new Date();
        if (now - this.last > this.getClient().getBackend().maxConnectionAge || !this.getClient().getCurrentTransport().isConnectionRunning()) {
          this.getClient().getCurrentTransport().restart(now - this.hardLast > this.getClient().getBackend().maxDataAge);
          this.last = now;
        }
      },
      /**
       * Start the watchdog.
       * @param watchdogTimer {number} The interval in seconds.
       */
      start: function start(watchdogTimer) {
        if (this.__P_802_0 !== null) {
          this.stop();
        }
        this.__P_802_0 = setInterval(this.aliveCheckFunction.bind(this), watchdogTimer * 1000);
      },
      /**
       * Stop the watchdog.
       */
      stop: function stop() {
        if (this.__P_802_0 !== null) {
          clearInterval(this.__P_802_0);
          this.__P_802_0 = null;
        }
      },
      /**
       * Return whether the watchdog is running.
       * @return {boolean}
       */
      isActive: function isActive() {
        return this.__P_802_0 !== null;
      },
      /**
       * Ping the watchdog to tell it that the function is still running.
       * @param fullReload {boolean} Were all data read?
       *   (Relevant for data aging)
       */
      ping: function ping() {
        var fullReload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
        this.last = new Date();
        if (fullReload) {
          this.hardLast = this.last;
        }
      }
    }
  });
  cv.io.Watchdog.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Watchdog.js.map?dt=1735222455376