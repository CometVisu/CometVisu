(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.form.CheckBox": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* CheckBox.js 
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
   *
   */
  qx.Class.define('cv.ui.manager.form.CheckBox', {
    extend: qx.ui.form.CheckBox,

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _onExecute: function _onExecute(e) {
        if (this.isTriState()) {
          // toggle between three states
          if (this.getValue() === true) {
            this.setValue(false);
          } else if (this.getValue() === false) {
            this.setValue(null);
          } else {
            this.setValue(true);
          }
        } else {
          this.toggleValue();
        }
      },
      _applyValue: function _applyValue(value, old) {
        cv.ui.manager.form.CheckBox.superclass.prototype._applyValue.call(this, value, old);

        if (value === null) {
          this.setLabel(' - ' + this.tr('not set') + ' - ');
        } else {
          this.setLabel('');
        }
      }
    }
  });
  cv.ui.manager.form.CheckBox.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=CheckBox.js.map?dt=1664613601794