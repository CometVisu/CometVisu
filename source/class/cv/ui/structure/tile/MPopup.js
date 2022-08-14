/**
 * Handles cv-popup children and some general popup tasks, like global registration and close on click outside, modal blocker etc.
 */
qx.Mixin.define('cv.ui.structure.tile.MPopup', {

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    openedPopups: []
  },

  events: {
    closed: 'qx.event.type.Event'
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _childPopup: null,

    _initPopupChild() {
      const popup = this._childPopup = this._element.querySelector(':scope > cv-popup');
      if (popup) {
        qx.event.Registration.addListener(this._element, 'tap', this._openPopupChild, this);
      }
    },

    _openPopupChild() {
      const popup = this._element.querySelector(':scope > cv-popup:not([open])');
      if (popup) {
        popup.getInstance().open();
      }
    },

    _closePopupChild() {
      const popup = this._element.querySelector(':scope > cv-popup[open]');
      if (popup) {
        popup.getInstance().close();
      }
    },

    registerModalPopup() {
      qx.event.Registration.addListener(document, 'pointerdown', this._onPointerDown, this);
      let blocker = document.body.querySelector('.modal-popup-blocker');
      if (!blocker) {
        blocker = document.createElement('div');
        blocker.classList.add('modal-popup-blocker');
        document.body.appendChild(blocker);
      }
      blocker.style.display = 'block';
      cv.ui.structure.tile.MPopup.openedPopups.push(this);
    },

    unregisterModalPopup() {
      qx.event.Registration.removeListener(document, 'pointerdown', this._onPointerDown, this);
      const index = cv.ui.structure.tile.MPopup.openedPopups.indexOf(this);
      cv.ui.structure.tile.MPopup.openedPopups.splice(index, 1);
      let blocker = document.body.querySelector('.modal-popup-blocker');
      if (blocker && cv.ui.structure.tile.MPopup.openedPopups.length === 0) {
        blocker.style.display = 'none';
      }
    },

    _onPointerDown(ev) {
      if (!cv.util.Tree.isChildOf(ev.getTarget(), this._element)) {
        // clicked outside -> close
        this.close();
        ev.preventDefault();
      }
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    qx.event.Registration.removeListener(this._element, 'tap', this._openPopupChild, this);
    this._childPopup = null;
  }
});
