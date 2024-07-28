(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.ui.LayoutTestCase": {
        "construct": true,
        "require": true
      },
      "qx.ui.form.TextField": {},
      "qx.ui.form.Resetter": {},
      "qx.ui.form.SelectBox": {},
      "qx.ui.form.ListItem": {},
      "qx.ui.form.Slider": {},
      "qx.ui.form.TextArea": {},
      "qx.ui.form.RadioButton": {},
      "qx.ui.form.List": {},
      "qx.data.Array": {},
      "qx.ui.form.VirtualSelectBox": {}
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
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */
  qx.Class.define("qx.test.ui.form.Resetter", {
    extend: qx.test.ui.LayoutTestCase,
    construct: function construct() {
      qx.test.ui.LayoutTestCase.constructor.call(this);
    },
    members: {
      __P_412_0: null,
      __P_412_1: null,
      __P_412_2: null,
      __P_412_3: null,
      setUp: function setUp() {
        this.__P_412_0 = new qx.ui.form.TextField();
        this.__P_412_1 = new qx.ui.form.TextField();
        this.__P_412_2 = new qx.ui.form.TextField();
        this.__P_412_3 = new qx.ui.form.Resetter();
      },
      tearDown: function tearDown() {
        this.__P_412_3.dispose();
        this.__P_412_0.dispose();
        this.__P_412_1.dispose();
        this.__P_412_2.dispose();
      },
      testReset: function testReset() {
        // set the initial values
        this.__P_412_0.setValue("A");
        this.__P_412_1.setValue("B");
        this.__P_412_2.setValue("C");
        // add the fields to the form manager
        this.__P_412_3.add(this.__P_412_0);
        this.__P_412_3.add(this.__P_412_1);
        this.__P_412_3.add(this.__P_412_2);
        // change the values of the fields
        this.__P_412_0.setValue("a");
        this.__P_412_1.setValue("b");
        this.__P_412_2.setValue("c");
        // reset the manager
        this.__P_412_3.reset();

        // check if the initial values are reset
        this.assertEquals("A", this.__P_412_0.getValue());
        this.assertEquals("B", this.__P_412_1.getValue());
        this.assertEquals("C", this.__P_412_2.getValue());
      },
      testRemove: function testRemove() {
        // set the initial values
        this.__P_412_0.setValue("A");
        this.__P_412_1.setValue("B");
        // add the fields to the form manager
        this.__P_412_3.add(this.__P_412_0);
        this.__P_412_3.add(this.__P_412_1);
        // change the values of the fields
        this.__P_412_0.setValue("a");
        this.__P_412_1.setValue("b");
        // remove one item
        this.assertTrue(this.__P_412_3.remove(this.__P_412_1));
        // remove again to see that it has not been removed
        this.assertFalse(this.__P_412_3.remove(this.__P_412_1));
        // reset the manager
        this.__P_412_3.reset();

        // check if the initial values are reset or kept
        this.assertEquals("A", this.__P_412_0.getValue());
        this.assertEquals("b", this.__P_412_1.getValue());
      },
      testResetWithSelectBox: function testResetWithSelectBox() {
        var box = new qx.ui.form.SelectBox();
        var item1 = new qx.ui.form.ListItem("1");
        var item2 = new qx.ui.form.ListItem("2");
        box.add(item1);
        box.add(item2);
        box.setSelection([item2]);

        // check the initial selection
        this.assertEquals(item2, box.getSelection()[0], "1");

        // add the box to the manager
        this.__P_412_3.add(box);
        // change the selection
        box.setSelection([item1]);
        // check the new selection
        this.assertEquals(item1, box.getSelection()[0], "");

        // reset the manager
        this.__P_412_3.reset();

        // check if the selection has been reseted
        this.assertEquals(item2, box.getSelection()[0], "3");
        item2.dispose();
        item1.dispose();
        box.dispose();
      },
      testDifferentWidgets: function testDifferentWidgets() {
        // set up
        var slider = new qx.ui.form.Slider();
        var textarea = new qx.ui.form.TextArea();
        var radiobutton = new qx.ui.form.RadioButton();
        var list = new qx.ui.form.List();
        var l1 = new qx.ui.form.ListItem("1");
        list.add(l1);
        var l2 = new qx.ui.form.ListItem("2");
        list.add(l2);
        var model = new qx.data.Array("a", "b", "c");
        var vsb = new qx.ui.form.VirtualSelectBox(model);

        // set the init values
        slider.setValue(22);
        textarea.setValue("aaa");
        radiobutton.setValue(false);
        list.setSelection([l2]);
        vsb.getSelection().setItem(0, "b");

        // add the resetter
        this.__P_412_3.add(slider);
        this.__P_412_3.add(textarea);
        this.__P_412_3.add(radiobutton);
        this.__P_412_3.add(list);
        this.__P_412_3.add(vsb);

        // change the values
        slider.setValue(55);
        textarea.setValue("bbb");
        radiobutton.setValue(true);
        list.setSelection([l1]);
        vsb.getSelection().setItem(0, "c");

        // reset
        this.__P_412_3.reset();

        // check
        this.assertEquals(22, slider.getValue());
        this.assertEquals("aaa", textarea.getValue());
        this.assertEquals(false, radiobutton.getValue());
        this.assertEquals(l2, list.getSelection()[0]);
        this.assertEquals("b", vsb.getSelection().getItem(0));

        // tear down
        list.dispose();
        radiobutton.dispose();
        textarea.dispose();
        slider.dispose();
        vsb.destroy();
        model.dispose();
      },
      testRedefine: function testRedefine() {
        // set the initial values
        this.__P_412_0.setValue("A");
        this.__P_412_1.setValue("B");
        this.__P_412_2.setValue("C");
        // add the fields to the form manager
        this.__P_412_3.add(this.__P_412_0);
        this.__P_412_3.add(this.__P_412_1);
        this.__P_412_3.add(this.__P_412_2);
        // change the values of the fields
        this.__P_412_0.setValue("a");
        this.__P_412_1.setValue("b");
        this.__P_412_2.setValue("c");
        // redefine the manager
        this.__P_412_3.redefine();
        // change the values of the fields
        this.__P_412_0.setValue("aa");
        this.__P_412_1.setValue("bb");
        this.__P_412_2.setValue("cc");

        // reset the manager
        this.__P_412_3.reset();

        // check if the initial values are reset
        this.assertEquals("a", this.__P_412_0.getValue());
        this.assertEquals("b", this.__P_412_1.getValue());
        this.assertEquals("c", this.__P_412_2.getValue());
      },
      testRefineSelection: function testRefineSelection() {
        var box = new qx.ui.form.SelectBox();
        var item1 = new qx.ui.form.ListItem("1");
        var item2 = new qx.ui.form.ListItem("2");
        box.add(item1);
        box.add(item2);
        box.setSelection([item2]);

        // add the box to the manager
        this.__P_412_3.add(box);
        // change the selection
        box.setSelection([item1]);
        // check the new selection
        this.assertEquals(item1, box.getSelection()[0]);

        // redefine the manager
        this.__P_412_3.redefine();
        // change the selection
        box.setSelection([item2]);
        // reset the manager
        this.__P_412_3.reset();

        // check if the selection has been reseted
        this.assertEquals(item1, box.getSelection()[0]);
        item2.dispose();
        item1.dispose();
        box.dispose();
      },
      testResetOneItem: function testResetOneItem() {
        // set the initial values
        this.__P_412_0.setValue("A");
        this.__P_412_1.setValue("B");
        this.__P_412_2.setValue("C");
        // add the fields to the form manager
        this.__P_412_3.add(this.__P_412_0);
        this.__P_412_3.add(this.__P_412_1);
        this.__P_412_3.add(this.__P_412_2);
        // change the values of the fields
        this.__P_412_0.setValue("a");
        this.__P_412_1.setValue("b");
        this.__P_412_2.setValue("c");
        // reset the first two items
        this.__P_412_3.resetItem(this.__P_412_0);
        this.__P_412_3.resetItem(this.__P_412_1);

        // check if the initial values are reset
        this.assertEquals("A", this.__P_412_0.getValue());
        this.assertEquals("B", this.__P_412_1.getValue());
        this.assertEquals("c", this.__P_412_2.getValue());

        // check for a not added item
        var self = this;
        this.assertException(function () {
          self.__P_412_3.resetItem(this);
        }, Error);
      },
      testRedefineOneItem: function testRedefineOneItem() {
        // set the initial values
        this.__P_412_0.setValue("A");
        this.__P_412_1.setValue("B");
        this.__P_412_2.setValue("C");
        // add the fields to the form manager
        this.__P_412_3.add(this.__P_412_0);
        this.__P_412_3.add(this.__P_412_1);
        this.__P_412_3.add(this.__P_412_2);
        // change the values of the fields
        this.__P_412_0.setValue("a");
        this.__P_412_1.setValue("b");
        this.__P_412_2.setValue("c");
        // redefine the first two items
        this.__P_412_3.redefineItem(this.__P_412_0);
        this.__P_412_3.redefineItem(this.__P_412_1);
        // change the first two items
        this.__P_412_0.setValue("1");
        this.__P_412_1.setValue("2");

        // reset the manager
        this.__P_412_3.reset();

        // check if the initial values are reset
        this.assertEquals("a", this.__P_412_0.getValue());
        this.assertEquals("b", this.__P_412_1.getValue());
        this.assertEquals("C", this.__P_412_2.getValue());

        // check for a not added item
        var self = this;
        this.assertException(function () {
          self.__P_412_3.redefineItem(this);
        }, Error);
      }
    }
  });
  qx.test.ui.form.Resetter.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Resetter.js.map?dt=1722151837045