/* NavBar.js
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
qx.Class.define("cv.parser.pure.widgets.NavBar", {
  type: "static",

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
      const data = cv.parser.pure.WidgetParser.parseElement(
        this,
        xml,
        path,
        flavour,
        pageType,
        this.getAttributeToPropertyMappings()
      );
      // navbars are no 2d/3d pages
      cv.parser.pure.WidgetParser.parseChildren(xml, path, flavour, "text");
      return data;
    },

    createDefaultWidget(widgetType, n, path) {
      let classes = "navbar clearfix";
      if (n.getAttribute("flavour")) {
        classes += " flavour_" + n.getAttribute("flavour");
      } // sub design choice

      // store scope globally
      const id = path.split("_");
      id.pop();
      const pos = n.getAttribute("position") || "left";
      cv.data.Model.getInstance().setWidgetData(
        id.join("_") + "_" + pos + "_navbar",
        {
          dynamic: cv.parser.pure.widgets.NavBar._transformDynamic(
            n.getAttribute("dynamic")
          ),
          scope: cv.parser.pure.widgets.NavBar._transformScope(
            n.getAttribute("scope")
          ),
          width: n.getAttribute("width"),
        }
      );

      return cv.data.Model.getInstance().setWidgetData(
        cv.parser.pure.WidgetParser.getStoragePath(n, path),
        {
          path: path,
          classes: classes,
          $$type: widgetType,
        }
      );
    },

    _transformDynamic(value) {
      switch (value) {
        case "true":
          return true;

        case "false":
          return false;
      }

      return null;
    },

    _transformScope(value) {
      value = parseInt(value);
      if (value >= 0) {
        return value;
      }
      return -1;
    },

    getAttributeToPropertyMappings() {
      return {
        scope: {
          default: -1,
          transform: cv.parser.pure.widgets.NavBar._transformScope,
        },
        name: {},
        dynamic: { transform: cv.parser.pure.widgets.NavBar._transformDynamic },
        width: { default: "300" },
        position: { default: "left" },
      };
    },
  },

  defer(statics) {
    cv.parser.pure.WidgetParser.addHandler("navbar", statics);
  },
});
