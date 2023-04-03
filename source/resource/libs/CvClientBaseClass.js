class CvClientBaseClass {
  // Properties
  #name = '';
  #dataReceived = false;
  #connected = false;
  #server = null;
  #listeners = {};
  #resources = null;
  #type = null;
  #backendUrl = null;
  #initialAddresses = [];

  constructor(type, backendUrl) {
    this.#type = type;
    this.#backendUrl = backendUrl;
  }

  /*************************************
   * START property getters and setters
   **************************************/

  backendUrl() {
    return this.#backendUrl;
  }

  setName(name) {
    if (name !== name) {
      this.#name = name;
    }
  }

  getName() {
    return this.#name;
  }

  setDataReceived(received) {
    this.#dataReceived = received;
  }

  getDataReceived() {
    return this.#dataReceived;
  }

  isDataReceived() {
    return this.getDataReceived();
  }

  setConnected(connected) {
    if (this.#connected !== connected) {
      this.#connected = connected;
      this.emit('changeConnected', connected);
    }
  }

  getConnected() {
    return this.#connected;
  }

  isConnected() {
    return this.getConnected();
  }

  resetConnected() {
    this.setConnected(false);
  }

  setServer(server) {
    if (this.#server !== server) {
      this.#server = server;
      this.emit('changedServer', server);
    }
  }

  resetServer() {
    this.setServer(null);
  }

  /*************************************
   * START interface implementation
   **************************************/

  /**
   * Returns the current backend configuration
   * @return {Map}
   */
  getBackend() {
    return {};
  }

  /**
   * Returns the backend type
   * @return {string} e.g. openhab, mqtt or knxd
   */
  getType() {
    return this.#type;
  }

  /**
   * Returns true, when the backend provides a special data provider for this kind of data
   * @param name {String}
   * @return {Boolean}
   */
  hasProvider(name) {
    return false;
  }

  /**
   * URL to the provided data
   * @param name
   * @return {String}
   */
  getProviderUrl(name) {
    return null;
  }

  /**
   * Return the provided data directly from client, return null when not implemented
   * @param name {String}
   * @param format {String} 'monaco' for texteditor and 'dp' for Tree editor
   * @return {Promise<variant>|null}
   */
  getProviderData(name, format) {
    return null;
  }

  /**
   * Mapping function the convert the data from the backend to a format the CometVisu data provider consumer can process.
   * @param name {String}
   * @param format {String} 'monaco' for texteditor and 'dp' for Tree editor
   */
  getProviderConvertFunction(name, format) {
    return null;
  }

  /**
   * Set a subset of addresses the client should request initially (e.g. the ones one the start page).
   * This can be used to increase the init state loading speed by sending an initial request with a smaller
   * subset of addresses to the backend and send the rest later.
   * @param addresses {Array}
   */
  setInitialAddresses(addresses) {
    this.#initialAddresses = addresses;
  }

  /**
   * Subscribe to the addresses in the parameter. The second parameter
   * (filter) is optional
   *
   * @param addresses {Array?} addresses to subscribe to
   * @param filters {Array?} Filters
   *
   */
  subscribe(addresses, filters) {
    console.error('subscribe not implemented!');
  }

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
  login(loginOnly, credentials, callback, context) {
    console.error('login not implemented!');
  }

  /**
   * Authorize a Request by adding the necessary headers.
   * @param req {qx.io.request.Xhr}
   */
  authorize(req) {}

  /**
   * return the relative path to a resource on the currently used backend
   *
   * @param name {String} Name of the resource (e.g. login, read, write, chart)
   * @param params {Map?} optional data needed to generate the resource path
   * @return {String|null} relative path to the resource, returns `null` when the backend does not provide that resource
   */
  getResourcePath(name, params) {
    return this.#resources[name];
  }

  /**
   * Set the relative path to a resource on the currently used backend
   * @param name {String} Name of the resource (e.g. login, read, write, chart)
   * @param path {String} relative path to the resource
   */
  setResourcePath(name, path) {
    this.#resources[name] = path;
    this.emit('resourcePathAdded', name);
  }

  /**
   * This client provides an own processor for charts data
   * @return {Boolean}
   */
  hasCustomChartsDataProcessor() {
    return false;
  }

  /**
   * For custom backend charts data some processing might be done to convert it in a format the CometVisu can handle
   * @param data {var}
   */
  processChartsData(data) {
    return data;
  }

  /**
   * This function sends a value
   * @param address {String} address to send the value to
   * @param value {String} value to send
   * @param options {Object} optional options, depending on backend
   *
   */
  write(address, value, options) {
    console.error('write not implemented!');
  }

  /**
   * Get the last recorded error
   *
   * @return {{code: (*|Integer), text: (*|String), response: (*|String|null), url: (*|String), time: number}|*}
   */
  getLastError() {}

  /**
   * Restart the connection
   * @param full
   */
  restart(full) {
    console.error('restart not implemented!');
  }

  /**
   * Called directly before the page gets unloaded. Can be used to disconnect correctly.
   */
  terminate() {}

  /**
   * Handle the incoming state updates. This method is not implemented by the client itself.
   * It is injected by the project using the client.
   * @param json
   */
  update(json) {}

  /**
   * Can be overridden to record client communication with backend
   * @param type {String} type of event to record
   * @param data {Object} data to record
   */
  record(type, data) {}

  /**
   * Can be overridden to provide an error handler for client errors
   * @param type {Number} one of cv.io.Client.ERROR_CODES
   * @param message {String} detailed error message
   * @param args
   */
  showError(type, message, args) {}

  /*************************************
   * START event handling
   **************************************/
  addListener(eventName, callback, context) {
    if (!this.#listeners[eventName]) {
      this.#listeners[eventName] = [[callback, context]];
    } else if (!this.#listeners[eventName].map(e => e[0]).includes(callback)) {
      this.#listeners[eventName].push([callback, context]);
    }
  }

  emit(eventName, data) {
    let cbs = this.#listeners[eventName];
    if (cbs) {
      for (const [callback, context] of cbs) {
        if (context) {
          callback.call(context, data);
        } else {
          callback(data);
        }
      }
    }
  }
}

window.CvClientBaseClass = CvClientBaseClass;
