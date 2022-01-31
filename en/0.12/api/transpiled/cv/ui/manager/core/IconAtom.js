(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.basic.Atom": {
        "require": true
      },
      "cv.ui.manager.viewer.SvgIcon": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* IconAtom.js 
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
   * Atom with cv.ui.manager.viewer.SvgIcon instead ob an qx.ui.basic.Image
   */
  qx.Class.define('cv.ui.manager.core.IconAtom', {
    extend: qx.ui.basic.Atom,

    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      appearance: {
        refine: true,
        init: 'cv-icon'
      }
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _applyLabel: function _applyLabel(value) {
        cv.ui.manager.core.IconAtom.prototype._applyLabel.base.call(this, value);

        this.getChildControl('icon').setName(value);
      },

      /**
       * Updates the visibility of the icon
       */
      _handleIcon: function _handleIcon() {
        if (!this.getChildControl('icon').getName() || this.getShow() === 'label') {
          this._excludeChildControl('icon');
        } else {
          this._showChildControl('icon');
        }
      },
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id) {
        var control;

        switch (id) {
          case 'icon':
            control = new cv.ui.manager.viewer.SvgIcon();
            control.setAnonymous(true);

            this._addAt(control, 0);

            break;
        }

        return control || cv.ui.manager.core.IconAtom.prototype._createChildControlImpl.base.call(this, id);
      }
    }
  });
  cv.ui.manager.core.IconAtom.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IconAtom.js.map?dt=1643663933765