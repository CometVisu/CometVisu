(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /**
   * Interface all CometVisu-Client must implement.
   */
  qx.Interface.define('cv.io.IClient', {
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      connected: {
        check: 'Boolean',
        init: false,
        event: 'changeConnected'
      },
      /**
       * The server the client is currently speaking to
       */
      server: {
        check: 'String',
        nullable: true,
        event: 'changedServer'
      },
      /**
       * needed to be able to check if the incoming update is the initial answer or a successing update
       */
      dataReceived: {
        check: 'Boolean',
        init: false
      },
      /**
       * The name this client is registered for
       */
      name: {
        check: 'String',
        nullable: true
      }
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      /**
       * Returns the current backend configuration
       * @return {Map}
       */
      getBackend: function getBackend() {},
      /**
       * Returns the backend type
       * @return {string} e.g. openhab, mqtt or knxd
       */
      getType: function getType() {},
      /**
       * Returns true, when the backend provides a special data provider for this kind of data
       * @param name {String}
       * @return {Boolean}
       */
      hasProvider: function hasProvider(name) {},
      /**
       * URL to the provided data
       * @param name
       * @return {String}
       */
      getProviderUrl: function getProviderUrl(name) {},
      /**
       * Return the provided data directly from client, return null when not implemented
       * @param name {String}
       * @param format {String} 'monaco' for texteditor and 'dp' for Tree editor
       * @return {Promise<variant>|null}
       */
      getProviderData: function getProviderData(name, format) {},
      /**
       * Mapping function the convert the data from the backend to a format the CometVisu data provider consumer can process.
       * @param name {String}
       * @param format {String} 'monaco' for texteditor and 'dp' for Tree editor
       */
      getProviderConvertFunction: function getProviderConvertFunction(name, format) {},
      /**
       * Set a subset of addresses the client should request initially (e.g. the ones one the start page).
       * This can be used to increase the init state loading speed by sending an initial request with a smaller
       * subset of addresses to the backend and send the rest later.
       * @param addresses {Array}
       */
      setInitialAddresses: function setInitialAddresses(addresses) {},
      /**
       * Subscribe to the addresses in the parameter. The second parameter
       * (filter) is optional
       *
       * @param addresses {Array<String>} addresses to subscribe to
       * @param filters {Array?} Filters
       *
       */
      subscribe: function subscribe(addresses, filters) {},
      /**
       * Add a single subscription
       * @param address {String}
       */
      addSubscription: function addSubscription(address) {},
      /**
       * This function starts the communication by a login and then runs the
       * ongoing communication task
       *
       * @param loginOnly {Boolean} if true only login and backend configuration, no subscription
       *                            to addresses (default: false)
       * @param credentials {Map} map with "username" and "password" (optional)
       * @param callback {Function} call this function when login is done
       * @param context {Object} context for the callback (this)
       *
       */
      login: function login(loginOnly, credentials, callback, context) {},
      /**
       * Authorize a Request by adding the necessary headers.
       * @param req {qx.io.request.Xhr}
       */
      authorize: function authorize(req) {},
      /**
       * return the relative path to a resource on the currently used backend
       *
       * @param name {String} Name of the resource (e.g. login, read, write, chart)
       * @param params {Map?} optional data needed to generate the resource path
       * @return {String|null} relative path to the resource, returns `null` when the backend does not provide that resource
       */
      getResourcePath: function getResourcePath(name, params) {},
      /**
       * Set the relative path to a resource on the currently used backend
       * @param name {String} Name of the resource (e.g. login, read, write, chart)
       * @param path {String} relative path to the resource
       */
      setResourcePath: function setResourcePath(name, path) {},
      /**
       * This client provides an own processor for charts data
       * @return {Boolean}
       */
      hasCustomChartsDataProcessor: function hasCustomChartsDataProcessor() {},
      /**
       * For custom backend charts data some processing might be done to convert it in a format the CometVisu can handle
       * @param data {var}
       * @param config {{scaling: number, offset: number}}
       */
      processChartsData: function processChartsData(data, config) {},
      /**
       * This function sends a value
       * @param address {String} address to send the value to
       * @param value {String} value to send
       * @param options {Object} optional options, depending on backend
       *
       */
      write: function write(address, value, options) {},
      /**
       * Get the last recorded error
       *
       * @return {{code: (*|Integer), text: (*|String), response: (*|String|null), url: (*|String), time: number}|*}
       */
      getLastError: function getLastError() {},
      /**
       * Restart the connection
       * @param full
       */
      restart: function restart(full) {},
      /**
       * Called directly before the page gets unloaded. Can be used to disconnect correctly.
       */
      terminate: function terminate() {},
      /**
       * Handle the incoming state updates. This method is not implemented by the client itself.
       * It is injected by the project using the client.
       * @param json
       */
      update: function update(json) {},
      /**
       * Can be overridden to record client communication with backend
       * @param type {String} type of event to record
       * @param data {Object} data to record
       */
      record: function record(type, data) {},
      /**
       * Can be overridden to provide an error handler for client errors
       * @param type {Number} one of cv.io.Client.ERROR_CODES
       * @param message {String} detailed error message
       * @param args
       */
      showError: function showError(type, message, args) {}
    }
  });
  cv.io.IClient.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IClient.js.map?dt=1717235424307