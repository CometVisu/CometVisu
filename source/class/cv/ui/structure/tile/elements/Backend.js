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
      const uri = element.hasAttribute('uri') ? new URL(element.getAttribute('uri')) : null;
      if (type) {
        let credentials = null;
        if (uri && uri.username) {
          credentials = {
            username: uri.username,
            password: uri.password
          };
        }
        const model = cv.data.Model.getInstance();
        let backendUrl = uri ? uri.toString() : null;
        const name = element.hasAttribute('name') ? element.getAttribute('name') : type;
        const client = cv.TemplateEngine.getInstance().addBackendClient(name, type, backendUrl);
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
