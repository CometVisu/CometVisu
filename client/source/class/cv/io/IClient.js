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
    user: {
      check: "String",
      nullable: false
    },

    connected: {
      check: "Boolean",
      init: false,
      event: "changeConnected"
    },

    /**
     * The server the client is currently speaking to
     */
    server: {
      check: "String",
      nullable: true,
      event: 'changedServer'
    }
  },
  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    /**
     * Set a subset of addresses the client should request initially (e.g. the ones one the start page).
     * This can be used to increase the init state loading speed by sending an initial request with a smaller
     * subset of addresses to the backend and send the rest later.
     * @param addresses {Array}
     */
    setInitialAddresses: function(addresses) { },

    /**
     * Subscribe to the addresses in the parameter. The second parameter
     * (filter) is optional
     *
     * @param addresses {Array?} addresses to subscribe to
     * @param filters {Array?} Filters
     *
     */
    subscribe : function (addresses, filters) { },

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
    login : function (loginOnly, credentials, callback, context) {},

    /**
     * Creates an authorized request to the backend with a relative path
     * @param url {String?} appended to the backends base path
     * @param method {String?} HTTP method type (GET is the default)
     * @return A XHR request {qx.io.request.Xhr}
     */
    createAuthorizedRequest: function (url, method) {},

    /**
     * Authorize a Request by adding the necessary headers.
     * @param req {qx.io.request.Xhr}
     */
    authorize: function (req) {},

    /**
     * This function sends a value
     * @param address {String} address to send the value to
     * @param value {String} value to send
     *
     */
    write : function (address, value) {},

    /**
     * Get the last recorded error
     *
     * @return {{code: (*|Integer), text: (*|String), response: (*|String|null), url: (*|String), time: number}|*}
     */
    getLastError: function() {},

    /**
     * Restart the connection
     */
    restart: function(full) {},


    /**
     * Handle the incoming state updates. This method is not implemented by the client itself.
     * It is injected by the project using the client.
     * @param json
     */
    update: function(json) {},

    /**
     * Can be overridden to record client communication with backend
     * @param type {String} type of event to record
     * @param data {Object} data to record
     */
    record: function(type, data) {},

    /**
     * Can be overridden to provide an error handler for client errors
     * @param type {Number} one of cv.io.Client.ERROR_CODES
     * @param message {String} detailed error message
     * @param args
     */
    showError: function(type, message, args) {}
  },
});
