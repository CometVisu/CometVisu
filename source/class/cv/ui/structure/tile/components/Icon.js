/**
 *
 */
qx.Class.define('cv.ui.structure.tile.components.Icon', {
  extend: cv.ui.structure.tile.components.AbstractComponent,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function (element) {
    this.base(arguments, element);
    this._idRegex = /^[^\s]+$/;
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    id: {
      check: 'String',
      nullable: true,
      apply: '_applyId',
      // the id is used as 'class' property and therefore must not have spaces
      transform: '_transformId'
    },

    color: {
      check: 'String',
      nullable: true,
      apply: '_applyColor'
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    __initialized: false,
    _idRegex: null,

    _transformId(value) {
      if (this._idRegex.test(value)) {
        return value;
      }
      this.error('invalid icon id:', value);
      return null;
    },

    _init() {
      this.base(arguments);
      const element = this._element;
      if (element.textContent.trim()) {
        this.__initialized = true;
        this.setId(element.textContent.trim());
      } else {
        const it = element.classList.values();
        for (let name of it) {
          if (name.startsWith('ri-') || name.startsWith('knxuf-')) {
            this.setId(name);
            break;
          }
        }
      }
      this.__initialized = true;
    },

    _applyId(value, oldValue) {
      const element = this._element;
      if (this.__initialized) {
        if (oldValue) {
          element.classList.remove(oldValue);
        }
        if (value) {
          // default is an icon font that uses CSS classes
          element.classList.add(value);
          if (element.textContent) {
            element.textContent = '';
          }
        }
      }
    },

    _applyColor(value, oldValue) {
      const element = this._element;
      if (oldValue) {
        element.classList.remove(oldValue);
      }
      if (value) {
        element.classList.add(value);
      }
    }
  },

  defer(Clazz) {
    customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'icon', class extends QxConnector {
      constructor() {
        super(Clazz);
      }

      static get observedAttributes() {
        return ['color'];
      }
    });
  }
});
