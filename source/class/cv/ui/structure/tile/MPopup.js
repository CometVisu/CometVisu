/**
 * Handles cv-popup children
 */
qx.Mixin.define('cv.ui.structure.tile.MPopup', {
  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    initPopup() {
      const popup = this._element.querySelector(':scope > cv-popup');
      if (popup) {
        qx.event.Registration.addListener(this._element, 'tap', this._openPopup, this);
      }
    },

    _openPopup() {
      const popup = this._element.querySelector(':scope > cv-popup:not([open])');
      if (popup) {
        popup.getInstance().open();
      }
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    qx.event.Registration.removeListener(this._element, 'tap', this._openPopup, this);
  }
});
