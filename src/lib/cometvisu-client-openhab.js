/* cometvisu-client-openhab.js (c) 2015 by Tobias Bräutigam [tbraeutigam at gmail dot com]
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 */

/**
 * The JavaScript library that implements the CometVisu protocol.
 * @module CometVisu Client
 * @title  CometVisu Client
 * @requires jQuery
 */

define( ['cometvisu-client'], function( CometVisu ) {
  "use strict";
  
  /**
   * Class that handles the communicaton of the client
   * 
   * @class CometVisu
   * @constructor foo
   * @param {String}
   *          urlPrefix The address of the service
   */
   
  function CometVisuOh(urlPrefix) {
    var thisVisu = this;
    this.urlPrefix = "/rest/cv/";
    this.eventSource = null; // the EventSource

    /**
     * This function gets called once the communication is established and
     * session information is available
     * 
     * @method handleSession
     */
    this.handleSession = function(json) {
      this.session = json.s;
      this.version = json.v.split('.', 3);

      if (0 < parseInt(this.version[0]) || 1 < parseInt(this.version[1]))
        alert('ERROR CometVisu Client: too new protocol version (' + json.v
            + ') used!');

      // send first request
      this.running = true;
      this.eventSource = new EventSource(this.urlPrefix + 'r?'
          + this.buildRequest());
      this.eventSource.addEventListener('message', this.handleMessage, false);
      this.eventSource.addEventListener('error', this.handleError, false);
    };

    this.handleMessage = function(e) {
      var json = JSON.parse(e.data);
      var data = json.d;
      thisVisu.lastIndex = e.lastEventId;
      thisVisu.update(data);
    }

    this.handleError = function(e) {
      if (e.readyState == EventSource.CLOSED) {
        // Connection was closed.
        thisVisu.running = false;
      }
    }

    /**
     * Abort the read request properly
     * 
     * @method restart
     */
    this.abort = function() {
      if (thisVisu.eventSource) {
        thisVisu.eventSource.close();
      }
    }

    /**
     * This function stops an ongoing connection
     * 
     * @method stop
     */
    this.stop = function() {
      this.running = false;
      this.abort();
      // alert('this.stop');
    };

    /**
     * prevent the watchdog from restarting
     * 
     * @method restart
     */
    this.restart = function() {
    }
  };
  CometVisuOh.prototype = new CometVisu('/rest/cv/');
  CometVisuOh.prototype.constructor = CometVisuOh;
  CometVisuOh.prototype.update = function(json) {
};

  return CometVisuOh;
});