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
    _init() {
      const element = this._element;
      if (element.hasAttribute('set')) {
        this.setIconSet(element.getAttribute('set'));
      }
      if (element.textContent) {
        this.setId(element.textContent);
      }
    },

    _applyId(value) {
      if (value) {
        const set = this.getIconSet();
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
          this.warn('currently only knf-uf-icons are supported');
        }
      }
    }
  },

  defer(Clazz) {
    customElements.define('cv-icon', class extends QxConnector {
      constructor() {
        super(Clazz);
      }
    });
  }
});
