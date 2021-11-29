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
        this.__initialized = true;
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
      const element = this._element;
      if (this.__initialized) {
        const set = this.getIconSet();
        if (oldValue && oldValue.startsWith('ri-') && set !== 'knx-uf') {
          element.classList.remove(oldValue);
        }
        if (value) {
          if (set === 'knx-uf') {
            // TODO: external sprites are not loaded in custom elements, no fix available
            const iconPath = qx.util.ResourceManager.getInstance().toUri('icons/knx-uf-iconset.svg');
            if (element.textContent) {
              element.textContent = '';
            }
            let use = element.querySelector(':scope > svg > use');
            if (!use) {
              const svg = document.createElement('svg');
              use = document.createElement('use');
              svg.appendChild(use);
              element.appendChild(svg);
            }
            use.setAttribute('xlink:href', iconPath + '#kuf-' + value);
          } else {
            // default is an icon font that uses CSS classes
            element.classList.add(value);
            if (element.textContent) {
              element.textContent = '';
            }
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
