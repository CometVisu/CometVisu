(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.dev.unit.TestCase": {
        "require": true
      },
      "qx.bom.Viewport": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Daniel Wagner (d_wagner)
  
  ************************************************************************ */

  qx.Class.define("qx.test.bom.Viewport", {
    extend: qx.dev.unit.TestCase,
    members: {
      testGetScrollLeft: function testGetScrollLeft() {
        this.assertPositiveInteger(qx.bom.Viewport.getScrollLeft());
      },
      testGetScrollTop: function testGetScrollTop() {
        this.assertPositiveInteger(qx.bom.Viewport.getScrollTop());
      }
    }
  });
  qx.test.bom.Viewport.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Viewport.js.map?dt=1722153824023