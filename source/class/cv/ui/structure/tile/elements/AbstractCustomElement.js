/**
 *
 */
qx.Class.define('cv.ui.structure.tile.elements.AbstractCustomElement', {
  extend: qx.core.Object,
  include: cv.ui.structure.tile.elements.MCustomElement,
  type: 'abstract'
});

// eslint-disable-next-line no-unused-vars
class QxConnector extends HTMLElement {
  constructor(QxClass) {
    super();
    if (qx.Class.isSubClassOf(QxClass, cv.ui.structure.tile.elements.AbstractCustomElement)) {
      this._instance = new QxClass(this);
    } else {
      throw Error(QxClass + ' must be a subclass of cv.ui.structure.tile.elements.AbstractCustomElement');
    }
  }

  connectedCallback() {
    if (this._instance) {
      this._instance.setConnected(true);
    }
  }

  disconnectedCallback() {
    if (this._instance) {
      this._instance.setConnected(false);
    }
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (this._instance && qx.Class.hasProperty(this._instance.constructor, name)) {
      this._instance.set(name, newValue);
    }
  }
}

window.QxConnector = QxConnector;
