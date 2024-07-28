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
      "qx.ui.form.Form": {},
      "qx.ui.form.Button": {},
      "qx.ui.form.renderer.Single": {},
      "qx.ui.form.renderer.Double": {},
      "qx.ui.form.TextField": {},
      "qx.lang.Array": {}
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
  qx.Class.define("qx.test.ui.form.Renderer", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      __P_411_0: null,
      __P_411_1: null,
      setUp: function setUp() {
        this.__P_411_0 = new qx.ui.form.Form();
        this.__P_411_1 = new qx.ui.form.Button("a");
        this.__P_411_0.addButton(this.__P_411_1);
      },
      tearDown: function tearDown() {
        this.__P_411_0.dispose();
        this.__P_411_1.dispose();
      },
      testDisposeSingle: function testDisposeSingle() {
        var renderer = new qx.ui.form.renderer.Single(this.__P_411_0);
        renderer.dispose();

        // check if the button container has been disposed
        this.assertNull(renderer._buttonRow);
        this.assertNotNull(this.__P_411_1);
        this.assertFalse(this.__P_411_1.isDisposed());
      },
      testDisposeDouble: function testDisposeDouble() {
        var renderer = new qx.ui.form.renderer.Double(this.__P_411_0);
        renderer.dispose();

        // check if the button container has been disposed
        this.assertNull(renderer._buttonRow);
        this.assertNotNull(this.__P_411_1);
        this.assertFalse(this.__P_411_1.isDisposed());
      },
      __P_411_2: function __P_411_2(clazz) {
        var text = new qx.ui.form.TextField();
        this.__P_411_0.add(text, "test");
        var renderer = new clazz(this.__P_411_0);
        var label = renderer._getChildren()[0];
        text.setVisibility("excluded");
        this.assertEquals(text.getVisibility(), label.getVisibility());
        renderer.dispose();
        text.dispose();
      },
      testExcludeSingle: function testExcludeSingle() {
        this.__P_411_2(qx.ui.form.renderer.Single);
      },
      testExcludeDouble: function testExcludeDouble() {
        this.__P_411_2(qx.ui.form.renderer.Double);
      },
      __P_411_3: function __P_411_3(clazz) {
        // after adding the text field get length of bindings for text field, label, form and renderer

        var text = new qx.ui.form.TextField();
        this.__P_411_0.add(text, "test");
        var renderer = new clazz(this.__P_411_0);
        var label = renderer._getChildren()[0];

        // text field bindings
        this.assertEquals(2, text.getBindings().length, "Text field should have one binding!");

        // label bindings
        this.assertEquals(2, label.getBindings().length, "Label should have one binding!");

        // text field and label bindings must be equal
        this.assertTrue(qx.lang.Array.equals(text.getBindings(), label.getBindings()), "Text field and label bindings must be equal");

        // dispose renderer must dispose text field, label and its self
        renderer.dispose();
        this.assertTrue(text.isDisposed(), "Disposing renderer should have disposed text field as well.");
        this.assertTrue(label.isDisposed(), "Disposing renderer should have disposed label as well.");
        this.assertTrue(renderer.isDisposed(), "Renderer must be disposed.");

        // text field bindings
        this.assertEquals(0, text.getBindings().length, "Still bindings there!");

        // label bindings
        this.assertEquals(0, label.getBindings().length, "Still bindings there!");
      },
      testBindingsSingle: function testBindingsSingle() {
        this.__P_411_3(qx.ui.form.renderer.Single);
      },
      testBindingsDouble: function testBindingsDouble() {
        this.__P_411_3(qx.ui.form.renderer.Double);
      }
    }
  });
  qx.test.ui.form.Renderer.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Renderer.js.map?dt=1722153832059