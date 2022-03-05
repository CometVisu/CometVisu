/**
 * Creates a group of widgets that can be hidden (works like the <detail> HTML Element)
 *
 * @author Tobias Bräutigam
 * @since 2022
 */
qx.Class.define('cv.ui.structure.tile.widgets.Group', {
  extend: cv.ui.structure.tile.components.AbstractComponent,

  /*
   ******************************************************
   MEMBERS
   ******************************************************
   */
  members: {
    _init() {
      const summary = this._element.querySelector(':scope > summary');
      if (summary) {
        qx.event.Registration.addListener(summary, 'click', this._toggleOpen, this);
      }
    },

    _toggleOpen() {
      if (this._element.hasAttribute('open')) {
        this._element.removeAttribute('open');
      } else {
        this._element.setAttribute('open', 'true');
      }
    }
  },

  defer: function(QxClass) {
    customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'group', class extends QxConnector {
      constructor() {
        super(QxClass);
      }
    });
  }
});
