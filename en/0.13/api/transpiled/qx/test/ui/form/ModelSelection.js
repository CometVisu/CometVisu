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
      "qx.ui.form.SelectBox": {},
      "qx.ui.form.List": {},
      "qx.ui.form.ListItem": {},
      "qx.ui.form.RadioGroup": {},
      "qx.ui.form.RadioButtonGroup": {},
      "qx.ui.form.RadioButton": {},
      "qx.ui.tree.Tree": {},
      "qx.ui.tree.TreeFolder": {}
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
  qx.Class.define("qx.test.ui.form.ModelSelection", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      __P_405_0: function __P_405_0(widget, children) {
        var children = children || widget.getChildren();

        // check the model selection
        widget.setSelection([children[0]]);
        this.assertEquals(1, widget.getModelSelection().getItem(0));

        // check the model selection again
        widget.setSelection([children[2]]);
        this.assertEquals(3, widget.getModelSelection().getItem(0));
      },
      __P_405_1: function __P_405_1(widget, children) {
        var children = children || widget.getChildren();

        // check the model selection
        widget.setSelection([children[0]]);
        this.assertEquals(1, widget.getModelSelection().getItem(0));

        // check the model selection again
        widget.setSelection([children[1], children[2]]);
        this.assertEquals(2, widget.getModelSelection().getLength(), "Wrong length");
        this.assertTrue(widget.getModelSelection().contains(2));
        this.assertTrue(widget.getModelSelection().contains(3));
      },
      __P_405_2: function __P_405_2(widget, children) {
        var children = children || widget.getChildren();

        // check the set selection
        widget.setModelSelection([2]);
        this.assertEquals(children[1], widget.getSelection()[0]);

        // check the set selection again
        widget.setModelSelection([3]);
        this.assertEquals(children[2], widget.getSelection()[0]);
      },
      __P_405_3: function __P_405_3(widget, children) {
        var children = children || widget.getChildren();

        // check the set selection
        widget.setModelSelection([2]);
        this.assertEquals(children[1], widget.getSelection()[0]);

        // check the set selection again
        widget.setModelSelection([2, 3]);
        this.assertEquals(2, widget.getSelection().length);
        this.assertTrue(widget.getSelection().includes(children[1]));
        this.assertTrue(widget.getSelection().includes(children[2]));
      },
      __P_405_4: function __P_405_4() {
        var box = new qx.ui.form.SelectBox();
        this.__P_405_5(box);
        return box;
      },
      __P_405_6: function __P_405_6() {
        var list = new qx.ui.form.List();
        this.__P_405_5(list);
        return list;
      },
      __P_405_5: function __P_405_5(widget) {
        for (var i = 0; i < 3; i++) {
          var l = new qx.ui.form.ListItem("I" + (i + 1));
          l.setModel(i + 1);
          widget.add(l);
        }
      },
      __P_405_7: function __P_405_7() {
        var group = new qx.ui.form.RadioGroup();
        this.__P_405_8(group);
        return group;
      },
      __P_405_9: function __P_405_9() {
        var group = new qx.ui.form.RadioButtonGroup();
        this.__P_405_8(group);
        return group;
      },
      __P_405_8: function __P_405_8(widget) {
        for (var i = 0; i < 3; i++) {
          var r = new qx.ui.form.RadioButton();
          r.setModel(i + 1);
          widget.add(r);
        }
      },
      __P_405_10: function __P_405_10() {
        var tree = new qx.ui.tree.Tree();
        var t2 = new qx.ui.tree.TreeFolder().set({
          model: 3
        });
        var t1 = new qx.ui.tree.TreeFolder().set({
          model: 2
        });
        var t0 = new qx.ui.tree.TreeFolder().set({
          model: 1
        });
        tree.setRoot(t0);
        t0.add(t1);
        t1.add(t2);
        // keep one folder closed because the behavior could change if the
        // folders should be opened
        t1.setOpen(true);
        return tree;
      },
      __P_405_11: function __P_405_11(box) {
        var children = box.getChildren();
        for (var i = 0; i < children.length; i++) {
          children[i].dispose();
        }
        box.dispose();
      },
      testSelectBoxGetSingle: function testSelectBoxGetSingle() {
        var box = this.__P_405_4();
        this.__P_405_0(box);
        this.__P_405_11(box);
      },
      testSelectBoxSetSingle: function testSelectBoxSetSingle() {
        var box = this.__P_405_4();
        this.__P_405_2(box);
        this.__P_405_11(box);
      },
      testListGetSingle: function testListGetSingle() {
        var list = this.__P_405_6();
        this.__P_405_0(list);
        this.__P_405_11(list);
      },
      testListSetSingle: function testListSetSingle() {
        var list = this.__P_405_6();
        this.__P_405_2(list);
        this.__P_405_11(list);
      },
      testListGetMulti: function testListGetMulti() {
        var list = this.__P_405_6();
        list.setSelectionMode("multi");
        this.__P_405_1(list);
        this.__P_405_11(list);
      },
      testListSetMulti: function testListSetMulti() {
        var list = this.__P_405_6();
        list.setSelectionMode("multi");
        this.__P_405_3(list);
        this.__P_405_11(list);
      },
      testRadioGroupGetSingle: function testRadioGroupGetSingle() {
        var group = this.__P_405_7();
        this.__P_405_0(group);
        this.__P_405_11(group);
      },
      testRadioGroupSetSingle: function testRadioGroupSetSingle() {
        var group = this.__P_405_7();
        this.__P_405_2(group);
        this.__P_405_11(group);
      },
      testRadioButtonGroupGetSingle: function testRadioButtonGroupGetSingle() {
        var group = this.__P_405_9();
        this.__P_405_0(group);
        this.__P_405_11(group);
      },
      testRadioButtonGroupSetSingle: function testRadioButtonGroupSetSingle() {
        var group = this.__P_405_9();
        this.__P_405_2(group);
        this.__P_405_11(group);
      },
      testTreeGetSingle: function testTreeGetSingle() {
        var widget = this.__P_405_10();
        var children = widget.getItems(true);
        this.__P_405_0(widget, children);
        widget.destroy();
      },
      testTreeSetSingle: function testTreeSetSingle() {
        var widget = this.__P_405_10();
        var children = widget.getItems(true);
        this.__P_405_2(widget, children);
        widget.destroy();
      },
      testTreeGetMulti: function testTreeGetMulti() {
        var widget = this.__P_405_10();
        widget.setSelectionMode("multi");
        var children = widget.getItems(true);
        this.__P_405_1(widget, children);
        widget.destroy();
      },
      testTreeSetMulti: function testTreeSetMulti() {
        var widget = this.__P_405_10();
        widget.setSelectionMode("multi");
        var children = widget.getItems(true);
        this.__P_405_3(widget, children);
        widget.destroy();
      }
    }
  });
  qx.test.ui.form.ModelSelection.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ModelSelection.js.map?dt=1717235394216