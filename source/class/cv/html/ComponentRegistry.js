// eslint-disable-next-line no-unused-vars
class QxConnector extends HTMLElement {
  constructor() {
    super();
    this.qxComponent = cv.html.ComponentRegistry.onComponentCreated(this);
  }

  connectedCallback() {
    if (this.qxComponent) {
      this.qxComponent.setConnected(true);
    }
  }

  disconnectedCallback() {
    if (this.qxComponent) {
      this.qxComponent.setConnected(false);
      /*this.qxComponent.dispose();
      this.qxComponent = null;*/
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (this.qxComponent && qx.Class.hasProperty(this.qxComponent.constructor, name)) {
      this.qxComponent.set(name, newValue);
    }
  }
}

window.QxConnector = QxConnector;

/**
 *
 */
qx.Class.define('cv.html.ComponentRegistry', {
  type: 'static',
  /*
***********************************************
  STATICS
***********************************************
*/
  statics: {
    __MAP: {},
    __I: {},
    register(webComponentName, qxClass) {
      qx.log.Logger.debug(this, `registering Qx class '${qxClass}' for web component '${webComponentName}'`);
      this.__MAP[webComponentName] = qxClass;
    },

    onComponentCreated(element) {
      const name = element.tagName.toLowerCase();
      if (Object.prototype.hasOwnProperty.call(this.__MAP, name)) {
        const QxClass = this.__MAP[name];
        if (!Object.prototype.hasOwnProperty.call(this.__I, name)) {
          this.__I[name] = [];
        }
        const qxComp = new QxClass(element);
        this.__I[name].push(qxComp);
        return qxComp;
      }
      qx.log.Logger.error('no QxClass registered for custom element ' + name);
      return null;
    }
  }
});
