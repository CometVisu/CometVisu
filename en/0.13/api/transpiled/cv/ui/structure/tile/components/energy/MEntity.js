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
   * Mixin for all Entity-Classes.
   *
   * @since 2023
   * @author Tobias Bräutigam
   */
  qx.Mixin.define('cv.ui.structure.tile.components.energy.MEntity', {
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      type: {
        check: ['pv', 'battery', 'grid', 'house', 'charger', 'heatpump', 'consumer'],
        nullable: true,
        apply: '_applyType'
      },
      foregroundColor: {
        check: 'String',
        nullable: true,
        apply: '_applyForegroundColor'
      }
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _noValue: null,
      hasNoValue: function hasNoValue() {
        return this._noValue;
      },
      preMappingHook: function preMappingHook(value) {
        // we only show positive values here, power flow is shown via connection direction
        return Math.abs(value);
      },
      _applyForegroundColor: function _applyForegroundColor(value) {
        var bar = this._svg ? this._svg.querySelector('circle.bar') : null;
        if (bar) {
          bar.style.stroke = value;
        }
      }
    }
  });
  cv.ui.structure.tile.components.energy.MEntity.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MEntity.js.map?dt=1726089034317