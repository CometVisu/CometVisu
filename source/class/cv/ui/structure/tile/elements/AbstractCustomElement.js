/**
 *
 */
qx.Class.define('cv.ui.structure.tile.elements.AbstractCustomElement', {
  extend: qx.core.Object,
  type: 'abstract',

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function (element) {
    this._element = element;
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    connected: {
      check: 'Boolean',
      init: false,
      apply: '_applyConnected',
      event: 'changeConnected'
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    /**
     * @var {HTMLElement}
     */
    _element: null,

    _initialized: false,

    _applyConnected(value) {
      if (value && !this._initialized) {
        this._init();
        this._initialized = true;
      } else {
        this._initialized = false;
      }
    },
    _init() {},

    getElement() {
      return this._element;
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    this._element = null;
  }
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
    if (this.hasAttribute('colspan')) {
      this.classList.add('colspan-' + this.getAttribute('colspan'));
    }
    if (this.hasAttribute('rowspan')) {
      this.classList.add('rowspan-' + this.getAttribute('rowspan'));
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

  getQxInstance() {
    return this._instance;
  }
}

window.QxConnector = QxConnector;
