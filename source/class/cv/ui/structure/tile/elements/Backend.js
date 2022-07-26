/**
 * <cv-backend> Custom element to define a backend connection
 */
qx.Class.define('cv.ui.structure.tile.elements.Backend', {
  extend: cv.ui.structure.tile.elements.AbstractCustomElement,

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _init() {
      const element = this._element;
      const type = element.getAttribute('type');
      const uriString = element.hasAttribute('uri') ? element.getAttribute('uri') : '';
      let uri;
      if (uriString) {
        try {
          uri = new URL(uriString, window.location.origin + window.location.pathname);
        } catch (e) {
          this.error('Error parsing uri: ' + uriString);
        }
      }

      if (type) {
        let credentials = null;
        if (element.hasAttribute('username')) {
          credentials = {
            username: element.getAttribute('username'),
            password: element.getAttribute('password') || ''
          };
        } else if (uri && uri.username) {
          credentials = {
            username: uri.username,
            password: uri.password
          };
        }
        const model = cv.data.Model.getInstance();
        let backendUrl = uri ? uri.toString() : null;
        let name = type;
        if (element.hasAttribute('name')) {
          name = element.getAttribute('name');
        } else if (!cv.io.BackendConnections.hasClient('main')) {
          // we need one main backend
          name = 'main';
        } else if (cv.io.BackendConnections.getClient('main').configuredIn === 'config') {
          qx.log.Logger.warn(this, 'there is already a backend registered with name "main" and type', type, 'skipping this one');
          return cv.io.BackendConnections.getClient('main');
        }
        qx.log.Logger.debug(this, 'init backend', name);
        if (cv.io.BackendConnections.hasClient(name)) {
          const notification = {
            topic: 'cv.config.error',
            title: qx.locale.Manager.tr('Config error'),
            message:  qx.locale.Manager.tr('There already exists a backend named: "%1"', name),
            severity: 'urgent',
            unique: true,
            deletable: true
          };
          cv.core.notifications.Router.dispatchMessage(notification.topic, notification);
          return null;
        }
        const client = cv.io.BackendConnections.addBackendClient(name, type, backendUrl, 'config');
        client.update = data => model.updateFrom(name, data); // override clients update function
        client.login(true, credentials, () => {
          this.debug(name, 'connected');
          if (element.hasAttribute('default') && element.getAttribute('default') === 'true') {
            model.setDefaultBackendName(name);
          }
          const addressesToSubscribe = model.getAddresses(name);
          if (addressesToSubscribe.length !== 0) {
            client.subscribe(addressesToSubscribe);
          }
        });
      } else {
        this.error('<cv-backend> must have a type attribute');
      }
    }
  },

  defer(Clazz) {
    customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'backend', class extends QxConnector {
      constructor() {
        super(Clazz);
      }
    });
  }
});
