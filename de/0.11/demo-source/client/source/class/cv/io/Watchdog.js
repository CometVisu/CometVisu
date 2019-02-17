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

/**
 * The Watchdog observes the backend communication and restarts the connection, if
 * the client received to data from the backend within a defined timeout.
 */
qx.Class.define("cv.io.Watchdog", {
  extend: qx.core.Object,

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct: function() {
    this.last = Date.now();
  },

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    client: {
      check: "cv.io.Client",
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
    last: null,
    hardLast: null,
    __id: null,

    aliveCheckFunction: function () {
      var now = new Date();
      if (now - this.last < this.getClient().getBackend().maxConnectionAge && this.getClient().getCurrentTransport().isConnectionRunning()) {
        return;
      }
      this.getClient().getCurrentTransport().restart(now - this.hardLast > this.getClient().getBackend().maxDataAge);
      this.last = now;
    },

    start: function (watchdogTimer) {
      if (this.__id) {
        this.stop();
      }
      this.__id = setInterval(this.aliveCheckFunction.bind(this), watchdogTimer * 1000);
    },

    stop: function() {
      if (this.__id) {
        clearInterval(this.__id);
        this.__id = null;
      }
    },

    isActive: function() {
      return !!this.__id;
    },

    ping: function (fullReload) {
      this.last = new Date();
      if (fullReload) {
        this.hardLast = this.last;
      }
    }
  }
});