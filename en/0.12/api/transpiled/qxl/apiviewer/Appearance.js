(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Theme": {
        "usage": "dynamic",
        "require": true
      },
      "qx.theme.indigo.Appearance": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
       2006 STZ-IDA, Germany, http://www.stz-ida.de
       2018 Zenesis Limited, http://www.zenesis.com
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * John Spackman (johnspackman)
       * Jonathan Weiß (jonathan_rass)
  
  ************************************************************************ */

  /**
   * Extends the default qooxdoo appearance theme.
   */
  qx.Theme.define("qxl.apiviewer.Appearance", {
    title: "Theme for API Viewer",
    extend: qx.theme.indigo.Appearance,
    appearances: {
      "toggleview": {
        style: function style(states) {
          return {
            width: 240,
            decorator: "main"
          };
        }
      },
      "detailviewer": {
        style: function style(states) {
          return {
            backgroundColor: "white",
            decorator: "main",
            padding: [10, 0, 10, 0]
          };
        }
      },
      "legend": {
        include: "scrollarea",
        alias: "scrollarea",
        style: function style(states) {
          return {
            contentPadding: [10, 10, 10, 10],
            backgroundColor: "white"
          };
        }
      },
      "legendview-label-important": {
        style: function style(states) {
          return {
            textColor: "#134275",
            font: "bold"
          };
        }
      },
      "legendview-label": {
        style: function style(states) {
          return {
            textColor: "#134275"
          };
        }
      },
      "tabview": {
        style: function style(states) {
          return {
            contentPadding: 0
          };
        }
      },
      "tabview/pane": {
        style: function style(states) {
          return {
            minHeight: 100,
            marginBottom: states.barBottom ? -1 : 0,
            marginTop: states.barTop ? -1 : 0,
            marginLeft: states.barLeft ? -1 : 0,
            marginRight: states.barRight ? -1 : 0
          };
        }
      }
    }
  });
  qxl.apiviewer.Appearance.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Appearance.js.map?dt=1731946701859