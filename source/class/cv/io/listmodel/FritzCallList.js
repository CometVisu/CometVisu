/**
 * Data retrieval for FritzBox calllists retrieves via TR64 (using the same PHP backend as the TR64 plugin).
 */
qx.Class.define('cv.io.listmodel.FritzCallList', {
  extend: qx.core.Object,
  implement: cv.io.listmodel.IListModel,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct() {
    super();
    this.initModel(new qx.data.Array());
  },

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    REQUIRES: ['php']
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    model: {
      check: 'qx.data.Array',
      deferredInit: true
    },

    device: {
      check: 'String',
      init: '',
      apply: '_applyDevice'
    },

    max: {
      check: 'Number',
      init: 0,
      transform: '_parseInt'
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    __calllistUri: null,

    _parseInt(value) {
      if (typeof value === 'string') {
        return parseInt(value);
      }
      return value;
    },

    _applyDevice() {
      // reset calllistUrl when device has changed
      this.__calllistUri = null;
    },

    async _init() {
      const url =
        'resource/plugins/tr064/soap.php?device=' +
        this.getDevice() +
        '&location=upnp/control/x_contact&uri=urn:dslforum-org:service:X_AVM-DE_OnTel:1&fn=GetCallList';
      const response = await window.fetch(url);
      let data;
      if (response.ok) {
        data = await response.json();
        if (typeof data === 'string') {
          this.__calllistUri = data;
        } else {
          cv.core.notifications.Router.dispatchMessage('cv.tr064.error', {
            title: qx.locale.Manager.tr('TR-064 communication response error'),
            severity: 'urgent',
            message: qx.locale.Manager.tr('Reading URL "%1" failed with content: "%2"', url, JSON.stringify(data))
          });

          this.__calllistUri = '<fail>';
        }
      } else {
        // else:
        cv.core.notifications.Router.dispatchMessage('cv.tr064.error', {
          title: qx.locale.Manager.tr('TR-064 communication error'),
          severity: 'urgent',
          message: qx.locale.Manager.tr(
            'Reading URL "%1" failed with status "%2": "%2"',
            response.url,
            response.status,
            response.statusText
          )
        });

        this.__calllistUri = '<fail>';
      }
    },

    async refresh() {
      if (!this.__calllistUri) {
        await this._init();
      }
      const model = this.getModel();
      model.removeAll();
      if (this.__calllistUri === '<fail>') {
        return; // this problem won't fix anymore during this instance
      }

      const url =
        'resource/plugins/tr064/proxy.php?device=' +
        this.getDevice() +
        '&uri=' +
        this.__calllistUri +
        '%26max=' +
        this.getMax();
      const response = await window.fetch(url);
      if (response.ok) {
        const str = await response.text();
        const data = new window.DOMParser().parseFromString(str, 'text/xml');
        const itemList = data.getElementsByTagName('Call');

        for (let item of itemList) {
          const childrenList = item.children;
          const entry = {};
          for (let child of childrenList) {
            entry[child.nodeName] = child.textContent;
          }
          model.push(entry);
        }
      } else if (response.status === 404) {
        // refresh session id
        await this._init();
        await this.refresh();
      } else {
        cv.core.notifications.Router.dispatchMessage('cv.tr064.error', {
          title: qx.locale.Manager.tr('TR-064 communication error'),
          severity: 'urgent',
          message: qx.locale.Manager.tr(
            'Reading URL "%1" failed with status "%2": "%2"',
            response.url,
            response.status,
            response.statusText
          )
        });

        model.removeAll();
      }
    }
  },

  defer(clazz) {
    cv.io.listmodel.Registry.register(clazz);
  }
});
