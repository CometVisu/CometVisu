(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.form.ListItem": {
        "require": true
      },
      "cv.ui.manager.basic.Image": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ListItem.js
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
   * ListItem that uses cv.ui.manager.basic.Image
   */
  qx.Class.define('cv.ui.manager.form.ListItem', {
    extend: qx.ui.form.ListItem,
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        var control;
        switch (id) {
          case 'icon':
            control = new cv.ui.manager.basic.Image(this.getIcon());
            control.set({
              anonymous: true,
              scale: true,
              maxHeight: 64
            });
            this._addAt(control, 0);
            if (this.getIcon() === null || this.getShow() === 'label') {
              control.exclude();
            }
            break;
        }
        return control || cv.ui.manager.form.ListItem.superclass.prototype._createChildControlImpl.call(this, id);
      }
    }
  });
  cv.ui.manager.form.ListItem.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ListItem.js.map?dt=1735341758655