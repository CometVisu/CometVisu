(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.container.Scroll": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.Grid": {
        "construct": true
      },
      "qx.ui.container.Composite": {
        "construct": true
      },
      "qxl.apiviewer.TreeUtil": {
        "construct": true
      },
      "qx.ui.basic.Image": {
        "construct": true
      },
      "qx.ui.basic.Label": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
       2018 Zenesis Limited, http://www.zenesis.com
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Til Schneider (til132)
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
       * Fabian Jakobs (fjakobs)
       * Jonathan Weiß (jonathan_rass)
       * John Spackman (johnspackman)
  
  ************************************************************************ */

  /**
   * Shows the info pane.
   */
  qx.Class.define("qxl.apiviewer.ui.LegendView", {
    extend: qx.ui.container.Scroll,

    /*
    *****************************************************************************
     CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.ui.container.Scroll.constructor.call(this);
      this.setAppearance("legend");
      var layout = new qx.ui.layout.Grid(10, 10);
      layout.setColumnWidth(1, 150);
      layout.setColumnFlex(1, 1);
      var content = new qx.ui.container.Composite(layout);
      this.__P_531_0 = [{
        icon: "ICON_PACKAGE",
        desc: "Package"
      }, {
        icon: "ICON_CLASS",
        desc: "Class"
      }, {
        icon: "ICON_CLASS_STATIC",
        desc: "Static Class"
      }, {
        icon: "ICON_CLASS_ABSTRACT",
        desc: "Abstract Class"
      }, {
        icon: "ICON_CLASS_SINGLETON",
        desc: "Singleton Class"
      }, {
        icon: "ICON_INTERFACE",
        desc: "Interface"
      }, {
        icon: "ICON_MIXIN",
        desc: "Mixin"
      }, {
        icon: "ICON_CHILDCONTROL",
        desc: "Child Control"
      }, {
        icon: "ICON_METHOD_PUB",
        desc: "Public Method"
      }, {
        icon: "ICON_METHOD_PROT",
        desc: "Protected Method"
      }, {
        icon: "ICON_METHOD_PRIV",
        desc: "Private Method"
      }, {
        icon: "ICON_PROPERTY_PUB",
        desc: "Public Property"
      }, {
        icon: "ICON_PROPERTY_PROT",
        desc: "Protected Property"
      }, {
        icon: "ICON_PROPERTY_PRIV",
        desc: "Private Property"
      }, {
        icon: "ICON_PROPERTY_PUB_THEMEABLE",
        desc: "Themeable Property"
      }, {
        icon: "ICON_EVENT",
        desc: "Event"
      }, {
        icon: "ICON_CONSTANT",
        desc: "Constant"
      }, {
        icon: "ICON_BLANK",
        desc: "<span style=\"text-decoration: line-through;color: #7193b9;\">deprecated</span>"
      }, {
        icon: "OVERLAY_WARN",
        desc: "Package/Class/Mixin/Interface is not fully documented"
      }, {
        icon: "OVERLAY_ERROR",
        desc: "Method/Property/Event is not fully documented"
      }, {
        icon: "OVERLAY_MIXIN",
        desc: "Method/Property is included from a mixin"
      }, {
        icon: "OVERLAY_INHERITED",
        desc: "Method/Property/Event is inherited from one of the super classes"
      }, {
        icon: "OVERLAY_OVERRIDDEN",
        desc: "Method/Property overrides the Method/Property of the super class"
      }];
      var length = this.__P_531_0.length;
      var entry;
      var imageUrl;

      for (var i = 0; i < length; i++) {
        entry = this.__P_531_0[i];
        imageUrl = qxl.apiviewer.TreeUtil.iconNameToIconPath(entry.icon);

        if (typeof imageUrl != "string") {
          imageUrl = imageUrl[0];
        }

        content.add(new qx.ui.basic.Image(imageUrl).set({
          alignX: "center",
          alignY: "middle"
        }), {
          row: i,
          column: 0
        });
        content.add(new qx.ui.basic.Label(entry.desc).set({
          rich: true,
          appearance: i < 17 ? "legendview-label-important" : "legendview-label"
        }), {
          row: i,
          column: 1
        });
      }

      this.add(content);
    },

    /*
    *****************************************************************************
     MEMBERS
    *****************************************************************************
    */
    members: {
      __P_531_0: null
    },

    /*
    *****************************************************************************
     DESTRUCTOR
    *****************************************************************************
    */
    destruct: function destruct() {
      this._disposeMap("__P_531_0");
    }
  });
  qxl.apiviewer.ui.LegendView.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=LegendView.js.map?dt=1642802418985