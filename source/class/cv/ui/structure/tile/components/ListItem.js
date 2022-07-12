/**
 * Shows an item in a list.
 */
qx.Class.define('cv.ui.structure.tile.components.ListItem', {
  extend: cv.ui.structure.tile.components.AbstractComponent,

  defer(QxClass) {
    customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'listitem', class extends QxConnector {
      constructor() {
        super(QxClass);
      }
    });
  }
});
