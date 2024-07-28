(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.tabview.Page": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.Grow": {
        "construct": true
      },
      "qx.ui.container.Composite": {
        "construct": true
      },
      "qx.ui.container.Scroll": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2022 Zenesis Limited, https://www.zenesis.com
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * John Spackman (johnspackman)
  
  ************************************************************************ */

  /**
   * A scrolling page uses a `qx.ui.container.Scroll` to make sure that the contents
   * never cause the parent TabView to size outside of it's natural boundaries; a
   * side effect of this is that if you use all `ScrollingPage` and do not use `Page`
   * instances, then the tabview will be very small unless you use a layout which will
   * expand the TabView.
   */
  qx.Class.define("qx.ui.tabview.ScrollingPage", {
    extend: qx.ui.tabview.Page,
    /**
     * @param label {String} Initial label of the tab
     * @param icon {String} Initial icon of the tab
     */
    construct: function construct(label, icon) {
      qx.ui.tabview.Page.constructor.call(this, label, icon);
      this._setLayout(new qx.ui.layout.Grow());
      this.__P_683_0 = new qx.ui.container.Composite();
      var scroll = new qx.ui.container.Scroll(this.__P_683_0);
      this._add(scroll);
    },
    members: {
      /** @type{qx.ui.core.Widget} the container that the user's children are added to */
      __P_683_0: null,
      /**
       * Make sure that children are added to the scrolling container
       *
       * @return {qx.ui.core.Widget} the widget to add to
       */
      getChildrenContainer: function getChildrenContainer() {
        return this.__P_683_0;
      }
    }
  });
  qx.ui.tabview.ScrollingPage.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ScrollingPage.js.map?dt=1722151859164