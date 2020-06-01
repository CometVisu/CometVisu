(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.plugins.diagram.AbstractDiagram": {
        "construct": true,
        "require": true
      },
      "cv.ui.common.Update": {
        "require": true
      },
      "cv.parser.WidgetParser": {
        "defer": "runtime"
      },
      "cv.ui.structure.WidgetFactory": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Info.js 
   * 
   * copyright (c) 2010-2017, Christian Mayer and the CometVisu contributers.
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
  qx.Class.define('cv.plugins.diagram.Info', {
    extend: cv.plugins.diagram.AbstractDiagram,
    include: [cv.ui.common.Update],

    /*
     ******************************************************
     CONSTRUCTOR
     ******************************************************
     */
    construct: function construct(props) {
      this._init = false;
      cv.plugins.diagram.AbstractDiagram.constructor.call(this, props);
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
      parse: function parse(xml, path, flavour, pageType) {
        var data = cv.plugins.diagram.AbstractDiagram.parse(xml, path, flavour, pageType);
        cv.parser.WidgetParser.parseAddress(xml, path);
        cv.parser.WidgetParser.parseFormat(xml, path);
        return data;
      }
    },

    /*
     ******************************************************
     MEMBERS
     ******************************************************
     */
    members: {
      _getInnerDomString: function _getInnerDomString() {
        return '<div class="actor clickable switchUnpressed"><div class="value">-</div></div>';
      },
      _update: function _update(address, data) {
        if (address !== undefined && data !== undefined) {
          return this.defaultUpdate(address, data, this.getDomElement(), true, this.getPath());
        }
      }
    },
    defer: function defer(statics) {
      // register the parser
      cv.parser.WidgetParser.addHandler("diagram_info", statics);
      cv.ui.structure.WidgetFactory.registerClass("diagram_info", statics);
    }
  });
  cv.plugins.diagram.Info.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Info.js.map?dt=1591013391891