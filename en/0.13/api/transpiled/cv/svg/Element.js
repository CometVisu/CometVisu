(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.html.Element": {
        "construct": true,
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* Element.js
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

  qx.Class.define('cv.svg.Element', {
    extend: qx.html.Element,
    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct(tagName) {
      qx.html.Element.constructor.call(this);
      this.__P_547_0 = document.createElementNS('http://www.w3.org/2000/svg', tagName);
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _createDomElement: function _createDomElement() {
        return this.__P_547_0;
      },
      getDomElement: function getDomElement() {
        return this.__P_547_0;
      }
    },
    destruct: function destruct() {
      this.__P_547_0.$$widget = null;
      this.__P_547_0 = null;
    }
  });
  cv.svg.Element.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Element.js.map?dt=1677345962300