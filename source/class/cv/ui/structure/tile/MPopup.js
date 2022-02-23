/**
 * Handles cv-popup children
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
        popup.setAttribute('open', '');
        qx.event.Registration.addListener(document, 'pointerdown', this._onPointerDown, this);
        if (popup.hasAttribute('modal') && popup.getAttribute('modal') === 'true') {
          let blocker = document.body.querySelector('.modal-popup-blocker');
          if (!blocker) {
            blocker = document.createElement('div');
            blocker.classList.add('modal-popup-blocker');
            document.body.appendChild(blocker);
          }
          blocker.style.display = 'block';
          cv.ui.structure.tile.MPopup.openedPopups.push(this);
        }
      }
    },

    _closePopup() {
      const popup = this._element.querySelector(':scope > cv-popup[open]');
      if (popup) {
        popup.removeAttribute('open');
        qx.event.Registration.removeListener(document, 'pointerdown', this._onPointerDown, this);
        const index = cv.ui.structure.tile.MPopup.openedPopups.indexOf(this);
        cv.ui.structure.tile.MPopup.openedPopups.splice(index, 1);
        if (popup.hasAttribute('modal') && popup.getAttribute('modal') === 'true') {
          let blocker = document.body.querySelector('.modal-popup-blocker');
          if (blocker && cv.ui.structure.tile.MPopup.openedPopups.length === 0) {
            blocker.style.display = 'none';
          }
        }
      }
    },

    _onPointerDown(ev) {
      const popup = this._element.querySelector(':scope > cv-popup[open]');
      if (!cv.util.Tree.isChildOf(ev.getTarget(), popup)) {
        // clicked outside -> close
        this._closePopup();
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
