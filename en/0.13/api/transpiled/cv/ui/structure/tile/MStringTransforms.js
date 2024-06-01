(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /*
   * Copyright (c) 2023, Christian Mayer and the CometVisu contributors.
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
   *
   */

  /**
   * Provides all transform helper functions for converting a string value,
   * to other scalar property types.
   *
   * @since 2023
   * @author Tobias Bräutigam
   */
  qx.Mixin.define('cv.ui.structure.tile.MStringTransforms', {
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _parseInt: function _parseInt(val) {
        if (typeof val === 'string') {
          return parseInt(val, 10);
        }
        return val;
      },
      _parseFloat: function _parseFloat(val) {
        if (typeof val === 'string') {
          return parseFloat(val);
        }
        return val;
      },
      _parseBoolean: function _parseBoolean(val) {
        if (typeof val === 'string') {
          return val === 'true';
        }
        return val;
      }
    }
  });
  cv.ui.structure.tile.MStringTransforms.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MStringTransforms.js.map?dt=1717235367986