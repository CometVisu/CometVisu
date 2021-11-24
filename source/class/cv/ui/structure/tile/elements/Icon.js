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
    iconSet: {
      check: ['knx-uf'],
      nullable: true
    },
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
      if (element.hasAttribute('set')) {
        this.setIconSet(element.getAttribute('set'));
      }
      if (element.textContent.trim()) {
        this.setId(element.textContent.trim());
      } else {
        const it = element.classList.values();
        for (let name of it) {
          if (name.startsWith('ri-')) {
            this.setId(name);
            break;
          }
        }
      }
      this.__initialized = true;
    },

    _applyId(value, oldValue) {
      if (this.__initialized) {
        const set = this.getIconSet();
        if (oldValue && oldValue.startsWith('ri-') && set !== 'knx-uf') {
          this._element.classList.remove(oldValue);
        }
        if (value) {
          if (set === 'knx-uf') {
            // TODO: external sprites are not loaded in custom elements, no fix available
            const iconPath = qx.util.ResourceManager.getInstance().toUri('icons/knx-uf-iconset.svg');
            const svg = document.createElement('svg');
            const use = document.createElement('use');
            use.setAttribute('xlink:href', iconPath + '#kuf-' + value);
            svg.appendChild(use);

            const element = this._element;
            if (element.textContent) {
              element.textContent = '';
            }
            element.appendChild(svg);
          } else {
            // default is an icon font that uses CSS classes
            this._element.classList.add(value);
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
