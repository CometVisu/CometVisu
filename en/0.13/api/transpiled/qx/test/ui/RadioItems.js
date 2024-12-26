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
      "qx.ui.form.RadioButton": {},
      "qx.ui.menu.RadioButton": {},
      "qx.ui.toolbar.RadioButton": {},
      "qx.ui.form.RadioGroup": {}
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
       * mw (martinwittemann)
  
  ************************************************************************ */
  qx.Class.define("qx.test.ui.RadioItems", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      testTwiceClickForm: function testTwiceClickForm() {
        var item = new qx.ui.form.RadioButton();
        this.__P_380_0(item);
        item.destroy();
      },
      testTwiceClickMenu: function testTwiceClickMenu() {
        var item = new qx.ui.menu.RadioButton();
        this.__P_380_0(item);
        item.destroy();
      },
      testTwiceClickToolbar: function testTwiceClickToolbar() {
        var item = new qx.ui.toolbar.RadioButton();
        this.__P_380_0(item);
        item.destroy();
      },
      __P_380_0: function __P_380_0(widget) {
        this.assertFalse(widget.getValue());
        // execute the widget
        widget.execute();
        this.assertTrue(widget.getValue(), "1");

        // execute again to see that it is still selected
        widget.execute();
        this.assertTrue(widget.getValue(), "2");
      },
      testTwiceClickEmptySelectionForm: function testTwiceClickEmptySelectionForm() {
        var item = new qx.ui.form.RadioButton();
        this.__P_380_1(item);
        item.destroy();
      },
      testTwiceClickEmptySelectionMenu: function testTwiceClickEmptySelectionMenu() {
        var item = new qx.ui.menu.RadioButton();
        this.__P_380_1(item);
        item.destroy();
      },
      testTwiceClickEmptySelectionToolbar: function testTwiceClickEmptySelectionToolbar() {
        var item = new qx.ui.toolbar.RadioButton();
        this.__P_380_1(item);
        item.destroy();
      },
      __P_380_1: function __P_380_1(widget) {
        var grp = new qx.ui.form.RadioGroup();
        grp.setAllowEmptySelection(true);
        widget.setGroup(grp);
        this.assertFalse(widget.getValue());
        // execute the widget
        widget.execute();
        this.assertTrue(widget.getValue(), "1");

        // execute again to see that it is still selected
        widget.execute();
        this.assertFalse(widget.getValue(), "2");
        grp.dispose();
      }
    }
  });
  qx.test.ui.RadioItems.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=RadioItems.js.map?dt=1735222430787