(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.dom.Element": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ProgressBar.js 
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
   * Shows a progressbar to visualize a state that is completed by x %
   *
   * @author Tobias Bräutigam
   * @since 0.11.0
   */
  qx.Class.define('cv.ui.util.ProgressBar', {
    extend: qx.core.Object,

    /*
    ******************************************************
      CONSTRUCTOR
    ******************************************************
    */
    construct: function construct() {
      qx.core.Object.constructor.call(this);

      this._createDomElement();
    },

    /*
    ******************************************************
      PROPERTIES
    ******************************************************
    */
    properties: {
      value: {
        check: 'Integer',
        init: 0,
        apply: '_applyValue'
      }
    },

    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      __P_538_0: null,
      __P_538_1: null,
      _applyValue: function _applyValue(value) {
        var rect = this.__P_538_0.getBoundingClientRect();

        var totalWidth = Math.round(rect.right - rect.left);
        this.__P_538_1.style.width = Math.round(totalWidth * value / 100) + 'px';
      },
      getDomElement: function getDomElement() {
        return this.__P_538_0;
      },
      _createDomElement: function _createDomElement() {
        var container = this.__P_538_0 = qx.dom.Element.create('div', {
          'class': 'progressbar'
        });
        this.__P_538_0.$$widget = this;
        var progress = this.__P_538_1 = qx.dom.Element.create('div', {
          'class': 'completed'
        });
        container.appendChild(progress);
        return container;
      }
    }
  });
  cv.ui.util.ProgressBar.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ProgressBar.js.map?dt=1643061818625