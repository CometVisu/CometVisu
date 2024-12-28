(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.ui.table.celleditor.AbstractField": {
        "require": true
      },
      "qx.ui.table.celleditor.TextField": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  qx.Class.define("qx.test.ui.table.celleditor.TextField", {
    extend: qx.test.ui.table.celleditor.AbstractField,
    members: {
      setUp: function setUp() {
        this.factory = new qx.ui.table.celleditor.TextField();
      },
      tearDown: function tearDown() {
        qx.test.ui.table.celleditor.TextField.superclass.prototype.tearDown.call(this);
        this.factory.dispose();
      }
    }
  });
  qx.test.ui.table.celleditor.TextField.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=TextField.js.map?dt=1735383865480