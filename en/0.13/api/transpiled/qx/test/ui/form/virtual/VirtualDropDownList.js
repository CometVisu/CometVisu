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
      "qx.test.ui.list.MAssert": {
        "require": true
      },
      "qx.ui.form.core.AbstractVirtualBox": {},
      "qx.ui.form.core.VirtualDropDownList": {},
      "qx.ui.core.Widget": {},
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

  /**
   * @ignore(qx.ui.form.core.AbstractVirtualBoxMock)
   */

  qx.Class.define("qx.test.ui.form.virtual.VirtualDropDownList", {
    extend: qx.test.ui.LayoutTestCase,
    include: qx.test.ui.list.MAssert,
    construct: function construct() {
      qx.test.ui.LayoutTestCase.constructor.call(this);
      qx.Class.define("qx.ui.form.core.AbstractVirtualBoxMock", {
        extend: qx.ui.form.core.AbstractVirtualBox,
        members: {
          _addBindings: function _addBindings() {},
          _removeBindings: function _removeBindings() {}
        }
      });
    },
    members: {
      __P_421_0: null,
      __P_421_1: null,
      __P_421_2: null,
      setUp: function setUp() {
        qx.test.ui.form.virtual.VirtualDropDownList.superclass.prototype.setUp.call(this);
        this.__P_421_0 = new qx.ui.form.core.AbstractVirtualBoxMock();
        this.__P_421_1 = new qx.ui.form.core.VirtualDropDownList(this.__P_421_0);
        this.__P_421_2 = this.__P_421_3();
        this.__P_421_1.getChildControl("list").setModel(this.__P_421_2);
        this.getRoot().add(this.__P_421_0);
      },
      tearDown: function tearDown() {
        qx.test.ui.form.virtual.VirtualDropDownList.superclass.prototype.tearDown.call(this);
        this.__P_421_0.destroy();
        this.__P_421_1.destroy();
        this.__P_421_0 = null;
        this.__P_421_1 = null;
        this.__P_421_2.dispose();
        this.__P_421_2 = null;
      },
      testException: function testException() {
        this.assertException(function () {
          new qx.ui.form.core.VirtualDropDownList();
        }, Error, "Invalid parameter 'target'!");
        this.assertException(function () {
          new qx.ui.form.core.VirtualDropDownList(null);
        }, Error, "Invalid parameter 'target'!");
        var widget = new qx.ui.core.Widget();
        this.assertException(function () {
          new qx.ui.form.core.VirtualDropDownList(widget);
        }, Error, "Invalid parameter 'target'!");
        widget.dispose();
      },
      testCreation: function testCreation() {
        var model = this.__P_421_2;
        var listModel = this.__P_421_1.getChildControl("list").getModel();
        this.assertEquals(model, listModel, "Model instance not equals!");
        this.__P_421_4(model);
      },
      testCreationWithSorter: function testCreationWithSorter() {
        var sortedModel = this.__P_421_5();
        this.__P_421_4(sortedModel);
        sortedModel.dispose();
      },
      testCreationWithFilter: function testCreationWithFilter() {
        var filteredModel = this.__P_421_6();
        this.__P_421_4(filteredModel);
        filteredModel.dispose();
      },
      __P_421_4: function __P_421_4(model) {
        var list = this.__P_421_1.getChildControl("list");
        this.assertModelEqualsRowData(model, list);
        this.__P_421_7(model.getItem(0));
      },
      testSelection: function testSelection() {
        this.__P_421_8(this.__P_421_2);
      },
      testSelectionWithSorter: function testSelectionWithSorter() {
        var sortedModel = this.__P_421_5();
        this.__P_421_8(sortedModel);
        sortedModel.dispose();
      },
      testSelectionWithFilter: function testSelectionWithFilter() {
        var filteredModel = this.__P_421_6();
        this.__P_421_4(filteredModel);
        var model = this.__P_421_2;
        var selection = this.__P_421_1.getSelection();
        var invalidItem = model.getItem(2);
        this.assertFalse(filteredModel.contains(invalidItem));
        var that = this;
        this.__P_421_9(selection, function () {
          selection.push(invalidItem);
        }, 2);
        this.__P_421_7(filteredModel.getItem(0));
        filteredModel.dispose();
      },
      __P_421_8: function __P_421_8(model) {
        var selection = this.__P_421_1.getSelection();
        var that = this;
        var newItem = model.getItem(2);
        this.__P_421_9(selection, function () {
          selection.push(newItem);
        }, 2);
        this.__P_421_7(newItem);
        var that = this;
        newItem = model.getItem(4);
        this.__P_421_9(selection, function () {
          selection.splice(0, 1, newItem).dispose();
        }, 1);
        this.__P_421_7(newItem);
      },
      __P_421_3: function __P_421_3() {
        var model = new qx.data.Array();
        for (var i = 0; i < 100; i++) {
          model.push("item " + i);
        }
        return model;
      },
      __P_421_7: function __P_421_7(item) {
        this.assertTrue(this.__P_421_2.contains(item), "The itme '" + item + "' is not in the model!");
        var modelIndex = this.__P_421_2.indexOf(item);
        var selection = this.__P_421_1.getSelection();
        var listSelection = this.__P_421_1.getChildControl("list").getSelection();
        this.assertEquals(1, selection.getLength(), "Selection length not equals!");
        this.assertEquals(this.__P_421_2.getItem(modelIndex), selection.getItem(0), "Selection instance not equals!");
        this.assertEquals(selection.getLength(), listSelection.getLength(), "Selection length not equals with list selection length!");
        this.assertEquals(selection.getItem(0), listSelection.getItem(0), "Selection instance not equals with list selection instance!");
      },
      __P_421_9: function __P_421_9(target, callback, fired) {
        var count = 0;
        this.assertEventFired(target, "change", callback, function () {
          count++;
        });
        this.assertEquals(fired, count, "The event is not fired the expected times!");
      },
      __P_421_5: function __P_421_5() {
        var sorter = function sorter(a, b) {
          return a < b ? 1 : a > b ? -1 : 0;
        };
        this.__P_421_1.getChildControl("list").setDelegate({
          sorter: sorter
        });
        var sortedModel = this.__P_421_2.copy();
        sortedModel.sort(sorter);
        return sortedModel;
      },
      __P_421_6: function __P_421_6() {
        var filter = function filter(data) {
          // Filters all even items
          return parseInt(data.slice(5, data.length), 10) % 2 == 1;
        };
        this.__P_421_1.getChildControl("list").setDelegate({
          filter: filter
        });
        var filteredModel = new qx.data.Array();
        for (var i = 0; i < this.__P_421_2.getLength(); i++) {
          var item = this.__P_421_2.getItem(i);
          if (filter(item)) {
            filteredModel.push(item);
          }
        }
        return filteredModel;
      }
    },
    destruct: function destruct() {
      qx.Class.undefine("qx.ui.form.core.AbstractVirtualBoxMock");
    }
  });
  qx.test.ui.form.virtual.VirtualDropDownList.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=VirtualDropDownList.js.map?dt=1735222431933