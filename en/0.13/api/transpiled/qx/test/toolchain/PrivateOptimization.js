(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.dev.unit.TestCase": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007-20011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  qx.Class.define("qx.test.toolchain.PrivateOptimization", {
    extend: qx.dev.unit.TestCase,
    members: {
      /*
       * The next test tests whether privates are renamed at all.
       */
      testPrivatesRenaming: function testPrivatesRenaming() {
        // Can only fail in build version with all optimizations
        this.assertEquals("__test a", this.__P_374_0(), "Variable in a string renamed!");
        this.assertEquals("__test a test", this.__P_374_0() + " test", "Variable in a string renamed!");
      },
      // needed for testPrivatesRenaming
      __P_374_0: function __P_374_0() {
        return "__test a";
      }
    }
  });
  qx.test.toolchain.PrivateOptimization.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=PrivateOptimization.js.map?dt=1717235392742