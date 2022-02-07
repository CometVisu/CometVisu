/**
 *
 */
qx.Class.define('cv.ui.structure.tile.elements.Icon', {
  extend: cv.ui.structure.tile.elements.AbstractCustomElement,

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    id: {
      check: 'String',
      nullable: true,
      apply: '_applyId'
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    __initialized: false,

    _init() {
      const element = this._element;
      if (element.textContent.trim()) {
        this.__initialized = true;
        this.setId(element.textContent.trim());
      } else {
        const it = element.classList.values();
        for (let name of it) {
          if (name.startsWith('ri-') || name.startsWith('knxuf_')) {
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
    }
  },

  defer(Clazz) {
    customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'icon', class extends QxConnector {
      constructor() {
        super(Clazz);
      }
    });
  }
});
