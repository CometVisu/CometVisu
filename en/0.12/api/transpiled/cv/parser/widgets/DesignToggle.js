(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.parser.WidgetParser": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* DesignToggle.js 
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

  /**
   * Parse &lt;designtoggle;gt; config elements
   */
  qx.Class.define('cv.parser.widgets.DesignToggle', {
    type: "static",

    /*
     ******************************************************
     STATICS
     ******************************************************
     */
    statics: {
      parse: function parse(xml, path, flavour, pageType) {
        return cv.parser.WidgetParser.parseElement(this, xml, path, flavour, pageType);
      },
      getDefaultClasses: function getDefaultClasses() {
        return 'widget clearfix toggle';
      }
    },
    defer: function defer(statics) {
      // register the parser
      cv.parser.WidgetParser.addHandler("designtoggle", statics);
    }
  });
  cv.parser.widgets.DesignToggle.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=DesignToggle.js.map?dt=1619360963473