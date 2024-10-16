(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.ui.LayoutTestCase": {
        "require": true
      },
      "qx.ui.form.VirtualSelectBox": {},
      "qx.data.Array": {}
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
       * Christian Hagendorn (chris_schmidt)
  
  ************************************************************************ */
  qx.Class.define("qx.test.ui.form.virtual.VirtualSelectBox", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      __P_421_0: null,
      setUp: function setUp() {
        qx.test.ui.form.virtual.VirtualSelectBox.superclass.prototype.setUp.call(this);
        this.__P_421_1 = this.__P_421_2();
        this.__P_421_0 = new qx.ui.form.VirtualSelectBox(this.__P_421_1);
        this.getRoot().add(this.__P_421_0);
        this.flush();
      },
      tearDown: function tearDown() {
        qx.test.ui.form.virtual.VirtualSelectBox.superclass.prototype.tearDown.call(this);
        this.__P_421_0.destroy();
        this.__P_421_0 = null;
        this.__P_421_1.dispose();
        this.__P_421_1 = null;
      },
      __P_421_2: function __P_421_2() {
        var model = new qx.data.Array();
        for (var i = 0; i < 100; i++) {
          model.push("item " + (i + 1));
        }
        return model;
      },
      testCreation: function testCreation() {
        this.assertEquals(this.__P_421_1.getLength(), this.__P_421_0.getModel().getLength(), "Model length not equals!");
        this.assertEquals(this.__P_421_1, this.__P_421_0.getModel(), "Model instance not equals!");
        this.assertEquals(this.__P_421_1, this.__P_421_0.getChildControl("dropdown").getChildControl("list").getModel(), "Model instance on list not equals!");
        this.assertEquals(1, this.__P_421_0.getSelection().getLength(), "Selection length not equals!");
        this.assertEquals(this.__P_421_1.getItem(0), this.__P_421_0.getSelection().getItem(0), "Selection instance not equals!");
      }
    }
  });
  qx.test.ui.form.virtual.VirtualSelectBox.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=VirtualSelectBox.js.map?dt=1729101245443