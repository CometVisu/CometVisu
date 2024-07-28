(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* AbstractCustomElement.js
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
  qx.Class.define('cv.ui.structure.tile.elements.AbstractCustomElement', {
    extend: qx.core.Object,
    type: 'abstract',
    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct(element) {
      this._element = element;
    },
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      connected: {
        check: 'Boolean',
        init: false,
        apply: '_applyConnected',
        event: 'changeConnected'
      }
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      /**
       * @var {HTMLElement}
       */
      _element: null,
      _initialized: false,
      _applyConnected: function _applyConnected(value) {
        if (value && !this._initialized) {
          this._init();
          this._initialized = true;
        } else {
          this._disconnected();
          this._initialized = false;
        }
      },
      _init: function _init() {},
      _disconnected: function _disconnected() {},
      getElement: function getElement() {
        return this._element;
      }
    },
    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this._element = null;
    }
  });
  cv.ui.structure.tile.elements.AbstractCustomElement.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AbstractCustomElement.js.map?dt=1722151813364