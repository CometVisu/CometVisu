/* Info.js
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

qx.Class.define("cv.plugins.diagram.Info", {
  extend: cv.plugins.diagram.AbstractDiagram,
  include: [cv.ui.common.Update],

  /*
   ******************************************************
   CONSTRUCTOR
   ******************************************************
   */
  construct(props) {
    this._init = false;
    super(props);
  },

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    /**
     * Parses the widgets XML configuration and extracts the given information
     * to a simple key/value map.
     *
     * @param xml {Element} XML-Element
     * @param path {String} internal path of the widget
     * @param flavour {String} Flavour of the widget
     * @param pageType {String} Page type (2d, 3d, ...)
     */
    parse(xml, path, flavour, pageType) {
      const data = cv.plugins.diagram.AbstractDiagram.parse(
        xml,
        path,
        flavour,
        pageType
      );
      cv.parser.pure.WidgetParser.parseAddress(xml, path);
      cv.parser.pure.WidgetParser.parseFormat(xml, path);
      return data;
    },
  },

  /*
   ******************************************************
   MEMBERS
   ******************************************************
   */
  members: {
    _getInnerDomString() {
      return '<div class="actor clickable switchUnpressed"><div class="value">-</div></div>';
    },
    _update(address, data) {
      if (address !== undefined && data !== undefined) {
        return this.defaultUpdate(
          address,
          data,
          this.getDomElement(),
          true,
          this.getPath()
        );
      }
      return null;
    },
  },

  defer(statics) {
    // register the parser
    cv.parser.pure.WidgetParser.addHandler("diagram_info", statics);
    cv.ui.structure.WidgetFactory.registerClass("diagram_info", statics);
  },
});
