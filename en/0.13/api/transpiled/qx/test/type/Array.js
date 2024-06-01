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
      "qx.type.Array": {},
      "qx.type.BaseArray": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2010 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */
  qx.Class.define("qx.test.type.Array", {
    extend: qx.dev.unit.TestCase,
    members: {
      __P_375_0: null,
      setUp: function setUp() {
        this.__P_375_0 = new qx.type.Array("x");
      },
      testConstruct: function testConstruct() {
        this.assertEquals(this.__P_375_0[0], "x");
      },
      testAppend: function testAppend() {
        // native array
        this.__P_375_0.append([1, 2]);
        this.assertEquals(this.__P_375_0[1], 1);
        this.assertEquals(this.__P_375_0[2], 2);

        // type array
        var a = new qx.type.Array(3, 4);
        this.__P_375_0.append(a);
        this.assertEquals(this.__P_375_0[3], 3);
        this.assertEquals(this.__P_375_0[4], 4);

        // type base array
        var b = new qx.type.BaseArray(5, 6);
        this.__P_375_0.append(b);
        this.assertEquals(this.__P_375_0[5], 5);
        this.assertEquals(this.__P_375_0[6], 6);
      },
      testPrepend: function testPrepend() {
        // native array
        this.__P_375_0.prepend([1, 2]);
        this.assertEquals(this.__P_375_0[0], 1);
        this.assertEquals(this.__P_375_0[1], 2);

        // type array
        var a = new qx.type.Array(3, 4);
        this.__P_375_0.prepend(a);
        this.assertEquals(this.__P_375_0[0], 3);
        this.assertEquals(this.__P_375_0[1], 4);

        // type base array
        var b = new qx.type.BaseArray(5, 6);
        this.__P_375_0.prepend(b);
        this.assertEquals(this.__P_375_0[0], 5);
        this.assertEquals(this.__P_375_0[1], 6);
      }
    }
  });
  qx.test.type.Array.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Array.js.map?dt=1717235392787