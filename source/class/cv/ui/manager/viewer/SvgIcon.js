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
qx.Class.define("cv.ui.manager.viewer.SvgIcon", {
  extend: qx.ui.core.Widget,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct(name) {
    super();
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
      check: "String",
      nullable: true,
      apply: "_applyName",
    },

    appearance: {
      refine: true,
      init: "cv-svg-icon",
    },
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    __spriteUrl: null,
    __useElement: null,

    _applyName(value) {
      if (value) {
        if (!this.__spriteUrl) {
          this.__spriteUrl = qx.util.ResourceManager.getInstance().toUri(
            "icons/knx-uf-iconset.svg"
          );
        }
        if (!this.__useElement.getDomElement()) {
          this.__useElement.addListenerOnce("appear", () => {
            this._applyName(value);
          });
          return;
        }
        // qx.xml.Element.setAttributeNS(document, this.__useElement.getDomElement(), 'http://www.w3.org/1999/xlink', 'xlink:href', this.__spriteUrl + '#kuf-' + value);
        this.__useElement
          .getDomElement()
          .setAttributeNS(
            "http://www.w3.org/1999/xlink",
            "xlink:href",
            this.__spriteUrl + "#kuf-" + value
          );
      } else {
        this.__useElement.removeAttribute("xlink:href");
      }
    },

    // overridden
    _createContentElement() {
      const svgElem = new cv.svg.Element("svg");
      this.__useElement = new cv.svg.Element("use");
      svgElem.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
      svgElem.add(this.__useElement);
      return svgElem;
    },
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct() {
    this.__useElement = null;
  },
});
