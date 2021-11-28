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
      const uri = element.getAttribute('uri');
      const match = /^(simulated|openhab|default|mqtt):\/\/([^@]+@)?(.+)$/.exec(uri);
      if (match) {
        const type = match[1];
        let credentials;
        if (match[2]) {
          const cred = match[2].split(':');
          credentials = {
            username: cred[0],
            password: cred[1]
          };
        }
        const model = cv.data.Model.getInstance();
        const backendUrl = match[3];
        const name = element.hasAttribute('name') ? element.getAttribute('name') : type;
        const client = cv.TemplateEngine.getInstance().addBackendClient(name, type, backendUrl);
        client.update = data => model.updateFrom(name, data); // override clients update function
        client.login(true, credentials, () => {
          this.debug(name, 'connected');
          if (element.hasAttribute('default') && element.getAttribute('default') === 'true') {
            model.setDefaultBackendName(name);
          }
        });
      } else {
        this.error('<cv-backend> must have an uri attribute with a valid value');
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
