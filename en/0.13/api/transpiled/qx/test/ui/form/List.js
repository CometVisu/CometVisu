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
      "qx.ui.form.List": {},
      "qx.ui.form.ListItem": {},
      "qx.ui.container.Composite": {}
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
       * Tristan Koch (tristankoch)
  
  ************************************************************************ */

  qx.Class.define("qx.test.ui.form.List", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      __P_403_0: null,
      setUp: function setUp() {
        var list = this.__P_403_0 = new qx.ui.form.List();
        var items = ["AAA", "BBB", "CCC"];
        items.forEach(function (item) {
          item = new qx.ui.form.ListItem(item);
          list.add(item);
        });
        this.getRoot().add(list);
        this.flush();
      },
      "test: find regular item": function test_find_regular_item() {
        var list = this.__P_403_0;
        var found = list.findItem("AAA");
        this.assertInstance(found, qx.ui.form.ListItem, "Item not found");
      },
      "test: find rich-text item": function test_find_richText_item() {
        var list = this.__P_403_0;
        var item = new qx.ui.form.ListItem("<b>Bold</b>").set({
          rich: true
        });
        list.add(item);
        this.flush();
        var found = list.findItem("Bold");
        this.assertInstance(found, qx.ui.form.ListItem, "Item not found");
      },
      "test: get container for list items": function test_get_container_for_list_items() {
        var container = this.__P_403_0._createListItemContainer();
        this.assertInstance(container, qx.ui.container.Composite, "Wrong return value of '_createListItemContainer'");
        container.dispose();
      },
      tearDown: function tearDown() {
        qx.test.ui.form.List.superclass.prototype.tearDown.call(this);
        this.__P_403_0.destroy();
      }
    }
  });
  qx.test.ui.form.List.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=List.js.map?dt=1735383864506