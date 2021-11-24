/**
 *
 */
qx.Class.define('cv.ui.structure.tile.elements.Mapping', {
  extend: cv.ui.structure.tile.elements.AbstractCustomElement,

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    mapValue(val) {
      let exactValue = this._element.querySelector(`value[match='${val}']`);
      if (exactValue) {
        return {
          mappedValue: exactValue.textContent,
          targetSelector: this._element.getAttribute('target')
        };
      }
      return {
        mappedValue: val,
        targetSelector: this._element.getAttribute('target')
      };
    }
  },

  defer(Clazz) {
    customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'mapping', class extends QxConnector {
      constructor() {
        super(Clazz);
      }
    });
  }
});
