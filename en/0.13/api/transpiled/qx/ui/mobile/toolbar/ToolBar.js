(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.mobile.container.Composite": {
        "construct": true,
        "require": true
      },
      "qx.ui.mobile.layout.HBox": {
        "construct": true
      },
      "qx.ui.mobile.toolbar.Separator": {},
      "qx.lang.Object": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Gabriel Munteanu (gabios)
  
  ************************************************************************ */

  /**
   * A toolbar widget.
   *
   */
  qx.Class.define("qx.ui.mobile.toolbar.ToolBar", {
    extend: qx.ui.mobile.container.Composite,

    /*
     *****************************************************************************
        CONSTRUCTOR
     *****************************************************************************
     */
    construct: function construct(layout) {
      qx.ui.mobile.container.Composite.constructor.call(this, layout);

      if (!layout) {
        this.setLayout(new qx.ui.mobile.layout.HBox().set({
          alignY: "middle"
        }));
      }
    },

    /*
    *****************************************************************************
        PROPERTIES
    *****************************************************************************
    */
    properties: {
      // overridden
      defaultCssClass: {
        refine: true,
        init: "toolbar"
      }
    },
    members: {
      /**
        * Flag to keep the show/hidden state of the toolbar
        */
      __P_398_0: false,

      /**
        * Adds a new child widget.
        *
        * @param child {qx.ui.mobile.core.Widget} the widget to add.
        * @param layoutProperties {Map?null} Optional layout data for widget.
        */
      add: function add(child, layoutProperties) {
        if (!(child instanceof qx.ui.mobile.toolbar.Separator)) {
          layoutProperties = layoutProperties ? layoutProperties : {};
          qx.lang.Object.mergeWith(layoutProperties, {
            flex: 1
          }, false);
        }

        qx.ui.mobile.toolbar.ToolBar.superclass.prototype.add.call(this, child, layoutProperties);
      }
    }
  });
  qx.ui.mobile.toolbar.ToolBar.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ToolBar.js.map?dt=1664788525262