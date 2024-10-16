(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.ui.layout.LayoutItem": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.Basic": {
        "construct": true
      },
      "qx.ui.core.queue.Visibility": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  qx.Class.define("qx.test.ui.layout.LayoutRoot", {
    extend: qx.test.ui.layout.LayoutItem,
    construct: function construct() {
      qx.test.ui.layout.LayoutItem.constructor.call(this, 10000, 10000);
      this.setLayout(new qx.ui.layout.Basic());
      qx.ui.core.queue.Visibility.add(this);
    },
    members: {
      isRootWidget: function isRootWidget() {
        return true;
      }
    },
    destruct: function destruct() {
      this._getLayout().dispose();
    }
  });
  qx.test.ui.layout.LayoutRoot.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=LayoutRoot.js.map?dt=1729101245665