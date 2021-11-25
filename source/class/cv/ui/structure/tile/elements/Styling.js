/**
 * Styling maps a value to another value that can be used to style a component
 * @author Tobias Bräutigam
 * @since 2022
 */
qx.Class.define('cv.ui.structure.tile.elements.Styling', {
  extend: cv.ui.structure.tile.elements.Mapping,

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _applyConnected(value) {
      if (value) {
        cv.Application.structureController.addStyling(this._element.getAttribute('name'), this);
      } else {
        cv.Application.structureController.removeStyling(this._element.getAttribute('name'));
      }
    }
  },
  defer(Clazz) {
    customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'styling', class extends QxConnector {
      constructor() {
        super(Clazz);
      }
    });
  }
});
