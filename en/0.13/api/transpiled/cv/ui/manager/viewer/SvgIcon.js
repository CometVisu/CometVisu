(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.util.ResourceManager": {},
      "cv.svg.Element": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* SvgIcon.js
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
   * QX version of the svg use icon way of displaying the KNF-UF icons.
   */
  qx.Class.define('cv.ui.manager.viewer.SvgIcon', {
    extend: qx.ui.core.Widget,
    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct(name) {
      qx.ui.core.Widget.constructor.call(this);
      if (name) {
        this.setName(name);
      }
    },
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      name: {
        check: 'String',
        nullable: true,
        apply: '_applyName'
      },
      appearance: {
        refine: true,
        init: 'cv-svg-icon'
      }
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      __P_56_0: null,
      __P_56_1: null,
      _applyName: function _applyName(value) {
        var _this = this;
        if (value) {
          if (!this.__P_56_0) {
            this.__P_56_0 = qx.util.ResourceManager.getInstance().toUri('icons/knx-uf-iconset.svg');
          }
          if (!this.__P_56_1.getDomElement()) {
            this.__P_56_1.addListenerOnce('appear', function () {
              _this._applyName(value);
            });
            return;
          }
          // qx.xml.Element.setAttributeNS(document, this.__useElement.getDomElement(), 'http://www.w3.org/1999/xlink', 'xlink:href', this.__spriteUrl + '#kuf-' + value);
          this.__P_56_1.getDomElement().setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', this.__P_56_0 + '#kuf-' + value);
        } else {
          this.__P_56_1.removeAttribute('xlink:href');
        }
      },
      // overridden
      _createContentElement: function _createContentElement() {
        var svgElem = new cv.svg.Element('svg');
        this.__P_56_1 = new cv.svg.Element('use');
        svgElem.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
        svgElem.add(this.__P_56_1);
        return svgElem;
      }
    },
    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this.__P_56_1 = null;
    }
  });
  cv.ui.manager.viewer.SvgIcon.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=SvgIcon.js.map?dt=1735341759703