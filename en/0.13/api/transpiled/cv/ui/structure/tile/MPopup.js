(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "cv.util.Tree": {},
      "qx.event.Timer": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* MPopup.js
   *
   * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
   *
   * This program is free software; you can redistribute it and/or modify it
   * under the terms of the GNU General Public License as published by the Free
   * Software Foundation; either version 3 of the License, or (at your option)
   * any later version.
   *
   * This program is distributed in the hope that it will be useful, but WITHOUT
   * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
   * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
   * more details.
   *
   * You should have received a copy of the GNU General Public License along
   * with this program; if not, write to the Free Software Foundation, Inc.,
   * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
   */

  /**
   * Handles cv-popup children and some general popup tasks, like global registration and close on click outside, modal blocker etc.
   */
  qx.Mixin.define('cv.ui.structure.tile.MPopup', {
    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct() {
      this._onPointerDownBounded = this._onPointerDown.bind(this);
      this._openPopupChildBounded = this._openPopupChild.bind(this);
    },
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
      _onPointerDownBounded: null,
      _openPopupChildBounded: null,
      _initPopupChild: function _initPopupChild() {
        var popup = this._childPopup = this._element.querySelector(':scope > cv-popup');
        if (popup) {
          this._element.addEventListener('click', this._openPopupChildBounded);

          // we need to tell the parent widget that is inside a group that wen have a popup here
          var parent = popup.parentElement;
          var last;
          while (parent) {
            if (parent.tagName.toLowerCase() === 'cv-group') {
              last.classList.add('has-popup');
            } else if (parent.tagName.toLowerCase() === 'cv-page') {
              break;
            }
            last = parent;
            parent = parent.parentElement;
          }
        }
      },
      _openPopupChild: function _openPopupChild() {
        var popup = this._element.querySelector(':scope > cv-popup:not([open])');
        if (popup) {
          popup.getInstance().open();
        }
      },
      _closePopupChild: function _closePopupChild() {
        var popup = this._element.querySelector(':scope > cv-popup[open]');
        if (popup) {
          popup.getInstance().close();
        }
      },
      registerModalPopup: function registerModalPopup() {
        document.addEventListener('pointerup', this._onPointerDownBounded);
        var blocker = document.body.querySelector('.modal-popup-blocker');
        if (!blocker) {
          blocker = document.createElement('div');
          blocker.classList.add('modal-popup-blocker');
          document.body.appendChild(blocker);
        }
        blocker.style.display = 'block';
        cv.ui.structure.tile.MPopup.openedPopups.push(this);
      },
      unregisterModalPopup: function unregisterModalPopup() {
        document.removeEventListener('pointerup', this._onPointerDownBounded);
        var index = cv.ui.structure.tile.MPopup.openedPopups.indexOf(this);
        cv.ui.structure.tile.MPopup.openedPopups.splice(index, 1);
        var blocker = document.body.querySelector('.modal-popup-blocker');
        if (blocker && cv.ui.structure.tile.MPopup.openedPopups.length === 0) {
          blocker.style.display = 'none';
        }
      },
      _onPointerDown: function _onPointerDown(ev) {
        var element = this._headerFooterParent || this._element;
        if (!cv.util.Tree.isChildOf(ev.target, element)) {
          ev.preventDefault();
          ev.stopImmediatePropagation();
          // clicked outside -> close (with delay to capture composed events)
          qx.event.Timer.once(this.close, this, 100);
        }
      }
    },
    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this._element.removeEventListener('click', this._openPopupChildBounded);
      this._childPopup = null;
    }
  });
  cv.ui.structure.tile.MPopup.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MPopup.js.map?dt=1735383844001