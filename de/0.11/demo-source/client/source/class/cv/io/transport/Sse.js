/* Sse.js 
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


qx.Class.define('cv.io.transport.Sse', {
  extend: qx.core.Object,

  /*
   ******************************************************
   CONSTRUCTOR
   ******************************************************
   */
  /**
   *
   * @param client {cv.io.Client}
   */
  construct: function(client) {
    this.client = client;
    this.__additionalTopics = {};
  },

  /*
   ******************************************************
   MEMBERS
   ******************************************************
   */
  members: {

    running: false,
    sessionId: null,
    client: null,
    eventSource: null,
    __additionalTopics: null,
    /**
     * This function gets called once the communication is established
     * and session information is available
     *
     * @param args {Array} arguments from the XHR response callback
     * @param connect {Boolean} whether to start the connection or not
     */
    handleSession: function (args, connect) {
      var json = this.client.getResponse(args);
      this.sessionId = json.s;
      this.version = json.v.split('.', 3);

      if (0 < parseInt(this.version[0]) || 1 < parseInt(this.version[1])) {
        this.error('ERROR CometVisu Client: too new protocol version (' + json.v + ') used!');
      }
      if (connect) {
        this.connect();
      }
    },

    /**
     * Establish the SSE connection
     */
    connect: function () {
      // send first request
      this.running = true;
      this.client.setDataReceived(false);
      this.eventSource = new EventSource(qx.util.Uri.appendParamsToUrl(
        this.client.getResourcePath("read"),
        this.client.buildRequest(null, true))
      );
      // add default listeners
      this.eventSource.addEventListener('message', this.handleMessage.bind(this), false);
      this.eventSource.addEventListener('error', this.handleError.bind(this), false);
      // add additional listeners
      Object.getOwnPropertyNames(this.__additionalTopics).forEach(this.__addRecordedEventListener, this);
      this.eventSource.onerror = function () {
        this.error("connection lost");
        this.client.setConnected(false);
      }.bind(this);
      this.eventSource.onopen = function () {
        this.debug("connection established");
        this.client.setConnected(true);
      }.bind(this);
    },

    /**
     * Handle messages send from server as Server-Sent-Event
     */
    handleMessage: function (e) {
      this.client.record("read", e.data);
      var json = JSON.parse(e.data);
      var data = json.d;
      this.client.update(data);
      this.client.setDataReceived(true);
    },

    dispatchTopicMessage: function(topic, message) {
      this.client.record(topic, message);
      if (this.__additionalTopics[topic]) {
        this.__additionalTopics[topic].forEach(function(entry) {
          entry[0].call(entry[1], message);
        });
      }
    },

    /**
     * Subscribe to SSE events of a certain topic
     * @param topic {String}
     * @param callback {Function}
     * @param context {Object}
     */
    subscribe: function(topic, callback, context) {
      if (!this.__additionalTopics[topic]) {
        this.__additionalTopics[topic] = [];
      }
      this.__additionalTopics[topic].push([callback, context]);
      if (this.isConnectionRunning()) {
        this.__addRecordedEventListener(topic);
      }
    },

    __addRecordedEventListener: function(topic) {
      this.debug("subscribing to topic "+topic);
      this.eventSource.addEventListener(topic, function(e) {
        this.dispatchTopicMessage(topic, e);
      }.bind(this), false);
    },

    /**
     * Handle errors
     */
    handleError: function (e) {
      if (e.readyState === EventSource.CLOSED) {
        // Connection was closed.
        this.running = false;
        // reconnect
        this.connect();
      }
    },

    /**
     * Check if the connection is still running.
     *
     * @return {Boolean}
     */
    isConnectionRunning: function () {
      return this.eventSource && this.eventSource.readyState === EventSource.OPEN;
    },

    /**
     * Restart the read request
     */
    restart: function (doFullReload) {
      if (doFullReload || this.eventSource.readyState === EventSource.CLOSED) {
        this.abort();
        this.connect();
      }
    },

    /**
     * Abort the read request properly
     *
     *
     */
    abort: function () {
      if (this.isConnectionRunning() === true) {
        this.eventSource.close();
      }
    }
  }
});