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
qx.Class.define('cv.io.Watchdog', {
  extend: qx.core.Object,

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct() {
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
    __id: null,

    /**
     * Check whether the watchdog was pinged recently enough.
     * If not, restart the connection. When the last data reading is older than
     * `maxDataAge` a reload is requested.
     * This does not update the last ping.
     */
    aliveCheckFunction() {
      const now = new Date();
      if (
        now - this.last > this.getClient().getBackend().maxConnectionAge ||
        !this.getClient().getCurrentTransport().isConnectionRunning()
      ) {
        this.getClient()
          .getCurrentTransport()
          .restart(now - this.hardLast > this.getClient().getBackend().maxDataAge);

        this.last = now;
      }
    },

    /**
     * Start the watchdog.
     * @param watchdogTimer {number} The interval in seconds.
     */
    start(watchdogTimer) {
      if (this.__id !== null) {
        this.stop();
      }
      this.__id = setInterval(this.aliveCheckFunction.bind(this), watchdogTimer * 1000);
    },

    /**
     * Stop the watchdog.
     */
    stop() {
      if (this.__id !== null) {
        clearInterval(this.__id);
        this.__id = null;
      }
    },

    /**
     * Return whether the watchdog is running.
     * @return {boolean}
     */
    isActive() {
      return this.__id !== null;
    },

    /**
     * Ping the watchdog to tell it that the function is still running.
     * @param fullReload {boolean} Were all data read?
     *   (Relevant for data aging)
     */
    ping(fullReload = false) {
      this.last = new Date();
      if (fullReload) {
        this.hardLast = this.last;
      }
    }
  }
});
