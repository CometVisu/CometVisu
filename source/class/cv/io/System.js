/**
 * A Backend client that handles write so internal system calls, e.g. to restart a backend connection, reload the browser, etc.
 */
qx.Class.define('cv.io.System', {
  extend: qx.core.Object,
  implement: cv.io.IClient,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function () {
    this.base(arguments);
    this.addresses = [];
    qx.event.message.Bus.subscribe('cv.ui.structure.tile.currentPage', this._onPageChange, this);
  },
  /*
 ***********************************************
   PROPERTIES
 ***********************************************
 */
  properties: {

    connected: {
      check: 'Boolean',
      init: true,
      event: 'changeConnected'
    },

    /**
     * The server the client is currently speaking to
     */
    server: {
      check: 'String',
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
    backendName: 'system',
    addresses: null,

    _onPageChange(ev) {
      const page = ev.getData();
      const data = {};
      data['nav:current-page'] = page.getAttribute('id');
      cv.data.Model.getInstance().updateFrom('system', data);
    },

    getType() {
      return this.backendName;
    },

    receive: function (json) {
    },

    login: function (loginOnly, credentials, callback, context) {
      if (callback) {
        callback.call(context);
      }
    },

    subscribe: function (addresses, filters) {
      this.addresses = addresses ? addresses : [];
    },

    write: function (address, value, options) {
      if (address) {
        const parts = address.split(':');
        const target = parts.shift();
        if (target === 'backend') {
          const name = parts.shift();
          const backend = name === 'system' ? this : cv.io.BackendConnections.getClient(name);
          if (backend) {
            switch (value) {
              case 'restart':
                backend.restart(true);
                break;

              default:
                this.warn('unhandled backend action:', value);
            }
          }
        } else if (target === 'browser') {
          let url;
          switch (value) {
            case 'reload':
              window.location.reload();
              break;

            case 'forced-reload':
              url = new URL(window.location.href);
              url.searchParams.set('forceReload', 'true');
              window.location.replace(url.toString());
              break;

            default:
              this.warn('unhandled browser action:', value);
          }
        } else if (target === 'nav') {
          const action = parts.shift();
          switch (action) {
            case 'current-page':
              cv.Application.structureController.scrollToPage(value);
              break;
          }
        } else if (target === 'theme') {
          const theme = value;
          document.documentElement.setAttribute('data-theme', theme);
          const model = cv.data.Model.getInstance();
          model.onUpdate('theme', theme, 'system');
        }
      }
    },

    restart: function () {
    },

    stop: function () {
    },

    getResourcePath: function (name, params) {
      if (name === 'charts') {
        return null;
      }
      return name;
    },

    getLastError: function () {
      return null;
    },

    getBackend: function () {
      return new Map();
    },

    authorize: function (req) {
    },

    terminate: function () {
    },

    update: function (json) {
    },
    record: function (type, data) {
    },
    showError: function (type, message, args) {
    },

    // not used / needed in this client
    setInitialAddresses: function (addresses) {
    },

    hasCustomChartsDataProcessor: function () {
      return false;
    },
    processChartsData: function (data) {
      return data;
    },
    hasProvider: function (name) {
      return false;
    },
    getProviderUrl: function (name) {
      return null;
    },
    getProviderConvertFunction: function (name, format) {
      return null;
    }
  }
});
