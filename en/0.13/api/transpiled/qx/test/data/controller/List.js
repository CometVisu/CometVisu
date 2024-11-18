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
      "qx.dev.unit.MMock": {
        "require": true
      },
      "qx.io.ImageLoader": {},
      "qx.ui.form.List": {},
      "qx.data.Array": {},
      "qx.data.controller.List": {},
      "qx.ui.form.SelectBox": {},
      "qx.data.marshal.Json": {},
      "qx.ui.form.ComboBox": {},
      "qx.ui.basic.Label": {},
      "qx.ui.form.CheckBox": {},
      "qx.core.Object": {
        "construct": true
      }
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

  /**
   * @ignore(qx.demo.Kid, qx.demo.Parent)
   */

  qx.Class.define("qx.test.data.controller.List", {
    extend: qx.test.ui.LayoutTestCase,
    include: qx.dev.unit.MMock,
    members: {
      __P_329_0: null,
      __P_329_1: null,
      __P_329_2: null,
      __P_329_3: null,
      setUp: function setUp() {
        // prevent the icon load error with this stub
        this.stub(qx.io.ImageLoader, "load");
        this.__P_329_0 = new qx.ui.form.List();
      },
      tearDown: function tearDown() {
        this.__P_329_1 ? this.__P_329_1.dispose() : null;
        this.__P_329_3 ? this.__P_329_3.dispose() : null;
        for (var i = 0; i < this.__P_329_0.getChildren().length; i++) {
          this.__P_329_0.getChildren()[i].destroy();
        }
        this.__P_329_0.destroy();
        this.flush();
        this.__P_329_1 = null;
        this.__P_329_3 = null;
        this.__P_329_2 = null;
        qx.test.data.controller.List.superclass.prototype.tearDown.call(this);
        // clear the stub
        this.getSandbox().restore();
      },
      __P_329_4: function __P_329_4(attribute) {
        this.__P_329_2 = ["a", "b", "c", "d", "e"];
        // create a new array
        this.__P_329_3 = new qx.data.Array(this.__P_329_2);

        // create the controller
        this.__P_329_1 = new qx.data.controller.List(this.__P_329_3, this.__P_329_0);
      },
      testChangeSelectionOnPush: function testChangeSelectionOnPush() {
        var selectBox = new qx.ui.form.SelectBox();
        var model = new qx.data.Array(["a", "b", "c"]);
        var controller = new qx.data.controller.List(model, selectBox);
        var change = false;
        controller.getSelection().addListener("change", function () {
          change = true;
        });
        model.push("d");
        this.wait(function () {
          this.assertFalse(change, "Change event has been fired.");
          selectBox.destroy();
          model.dispose();
          controller.dispose();
        }, 200, this);
      },
      testNumberModel: function testNumberModel() {
        var selectBox = new qx.ui.form.SelectBox();
        var model = qx.data.marshal.Json.createModel([1, 0]);
        var controller = new qx.data.controller.List(model, selectBox);
        controller.getSelection().push(0);
        this.assertEquals(1, controller.getSelection().length);
        this.assertEquals(0, controller.getSelection().getItem(0));
        selectBox.destroy();
        model.dispose();
        controller.dispose();
      },
      testModelChangeCombobox: function testModelChangeCombobox() {
        var model2 = new qx.data.Array(["A", "B"]);
        var box = new qx.ui.form.ComboBox();
        var controller = new qx.data.controller.List(this.__P_329_3, box);

        // change the model
        controller.setModel(model2);
        this.assertEquals("A", box.getChildControl("list").getChildren()[0].getLabel());
        this.assertEquals("B", box.getChildControl("list").getChildren()[1].getLabel());
        model2.dispose();
        box.dispose();
        controller.dispose();
      },
      testStringArray: function testStringArray() {
        this.__P_329_4();

        // check the binding
        for (var i = 0; i < this.__P_329_2.length; i++) {
          var label = this.__P_329_0.getChildren()[i].getLabel();
          this.assertEquals(this.__P_329_2[i], label, "Binding " + i + " is wrong!");
        }
      },
      testEmptyList: function testEmptyList() {
        this.__P_329_4();
        this.__P_329_1.setModel(null);

        // check that the list is empty
        this.assertEquals(0, this.__P_329_0.getChildren().length);
      },
      testStringElementRemove: function testStringElementRemove() {
        this.__P_329_4();

        // remove the last elements
        this.__P_329_2.shift();
        this.__P_329_3.shift();

        // check the binding
        for (var i = 0; i < this.__P_329_2.length; i++) {
          var label = this.__P_329_0.getChildren()[i].getLabel();
          this.assertEquals(this.__P_329_2[i], label, "Binding " + i + " is wrong!");
        }
        // check the length
        this.assertEquals(this.__P_329_2.length, this.__P_329_0.getChildren().length, "Wrong length!");
      },
      testStringElementAdd: function testStringElementAdd() {
        this.__P_329_4();

        // remove the last elements
        this.__P_329_2.unshift("A");
        this.__P_329_3.unshift("A");

        // check the binding
        for (var i = 0; i < this.__P_329_2.length; i++) {
          var label = this.__P_329_0.getChildren()[i].getLabel();
          this.assertEquals(this.__P_329_2[i], label, "Binding " + i + " is wrong!");
        }
        // check the length
        this.assertEquals(this.__P_329_2.length, this.__P_329_0.getChildren().length, "Wrong length!");
      },
      testChangeElement: function testChangeElement() {
        this.__P_329_4();

        // change one element
        this.__P_329_2[0] = "A";
        this.__P_329_3.setItem(0, "A");

        // check the binding
        for (var i = 0; i < this.__P_329_2.length; i++) {
          var label = this.__P_329_0.getChildren()[i].getLabel();
          this.assertEquals(this.__P_329_2[i], label, "Binding " + i + " is wrong!");
        }
      },
      testChangeModelSmaller: function testChangeModelSmaller() {
        this.__P_329_4();
        this.__P_329_3.dispose();
        // change one element
        this.__P_329_2 = ["f", "g", "h", "i"];
        this.__P_329_3 = new qx.data.Array(this.__P_329_2);
        this.__P_329_1.setModel(this.__P_329_3);

        // check the binding
        for (var i = 0; i < this.__P_329_2.length; i++) {
          var label = this.__P_329_0.getChildren()[i].getLabel();
          this.assertEquals(this.__P_329_2[i], label, "Binding " + i + " is wrong!");
        }
        // check the length
        this.assertEquals(this.__P_329_2.length, this.__P_329_0.getChildren().length, "Wrong length!");
      },
      testChangeModelBigger: function testChangeModelBigger() {
        this.__P_329_4();
        this.__P_329_3.dispose();
        // change one element
        this.__P_329_2 = ["f", "g", "h", "i", "j", "k"];
        this.__P_329_3 = new qx.data.Array(this.__P_329_2);
        this.__P_329_1.setModel(this.__P_329_3);

        // check the binding
        for (var i = 0; i < this.__P_329_2.length; i++) {
          var label = this.__P_329_0.getChildren()[i].getLabel();
          this.assertEquals(this.__P_329_2[i], label, "Binding " + i + " is wrong!");
        }
        // check the length
        this.assertEquals(this.__P_329_2.length, this.__P_329_0.getChildren().length, "Wrong length!");
      },
      testChangeTarget: function testChangeTarget() {
        this.__P_329_4();
        var list = new qx.ui.form.List();

        // change the target
        this.__P_329_1.setTarget(list);

        // check the binding
        for (var i = 0; i < this.__P_329_2.length; i++) {
          var label = list.getChildren()[i].getLabel();
          this.assertEquals(this.__P_329_2[i], label, "Binding " + i + " is wrong!");
        }
        // check the length of the old list
        this.assertEquals(0, this.__P_329_0.getChildren().length, "Wrong length!");
        list.dispose();
      },
      testReverse: function testReverse() {
        this.__P_329_4();

        // reverse the datas
        this.__P_329_2.reverse();
        this.__P_329_3.reverse();

        // check the binding
        for (var i = 0; i < this.__P_329_2.length; i++) {
          var label = this.__P_329_0.getChildren()[i].getLabel();
          this.assertEquals(this.__P_329_2[i], label, "Binding " + i + " is wrong!");
        }
      },
      testBooleanArray: function testBooleanArray() {
        this.__P_329_2 = [true, false, false];
        // create a new array
        this.__P_329_3 = new qx.data.Array(this.__P_329_2);

        // create the controller
        this.__P_329_1 = new qx.data.controller.List(this.__P_329_3, this.__P_329_0);
        var checkArray = ["true", "false", "false"];
        // check the binding
        for (var i = 0; i < checkArray.length; i++) {
          var label = this.__P_329_0.getChildren()[i].getLabel();
          this.assertEquals(checkArray[i], label, "Boolean-Binding " + i + " is wrong!");
        }
      },
      testNumberArray: function testNumberArray() {
        this.__P_329_2 = [10, 20, -1, 50];
        // create a new array
        this.__P_329_3 = new qx.data.Array(this.__P_329_2);

        // create the controller
        this.__P_329_1 = new qx.data.controller.List(this.__P_329_3, this.__P_329_0);
        var checkArray = ["10", "20", "-1", "50"];
        // check the binding
        for (var i = 0; i < checkArray.length; i++) {
          var label = this.__P_329_0.getChildren()[i].getLabel();
          this.assertEquals(checkArray[i], label, "Boolean-Binding " + i + " is wrong!");
        }
      },
      testSelectBox: function testSelectBox() {
        this.__P_329_2 = ["10", "20", "-1", "50"];
        // create a new array
        this.__P_329_3 = new qx.data.Array(this.__P_329_2);

        // create the controller
        var box = new qx.ui.form.SelectBox();
        this.__P_329_1 = new qx.data.controller.List(this.__P_329_3, box);

        // check the binding
        for (var i = 0; i < this.__P_329_2.length; i++) {
          var label = box.getChildren()[i].getLabel();
          this.assertEquals(this.__P_329_2[i], label, "SelectBox-Binding " + i + " is wrong!");
        }
        box.dispose();
      },
      testComboBox: function testComboBox() {
        this.__P_329_2 = ["10", "20", "-1", "50"];
        // create a new array
        this.__P_329_3 = new qx.data.Array(this.__P_329_2);

        // create the controller
        var box = new qx.ui.form.ComboBox();
        this.__P_329_1 = new qx.data.controller.List(this.__P_329_3, box);

        // check the binding
        for (var i = 0; i < this.__P_329_2.length; i++) {
          var label = box.getChildren()[i].getLabel();
          this.assertEquals(this.__P_329_2[i], label, "ComboBox-Binding " + i + " is wrong!");
        }
        box.dispose();
      },
      testResetSelectionSingle: function testResetSelectionSingle() {
        this.__P_329_4();
        var box = new qx.ui.form.SelectBox();
        this.__P_329_1.setTarget(box);
        var model = new qx.data.Array(["x", "y", "z"]);
        this.__P_329_1.getSelection().push("b");

        // change the model (should reset the selection)
        this.__P_329_1.setModel(model);

        // first element should be selected because its a select box

        this.wait(100, function () {
          this.assertEquals("x", this.__P_329_1.getSelection().getItem(0));
          model.dispose();
          box.destroy();
        }, this);
      },
      testSelectionSingle: function testSelectionSingle() {
        this.__P_329_4();

        // select the first object
        this.__P_329_0.addToSelection(this.__P_329_0.getChildren()[0]);
        // test the selection
        this.assertEquals(this.__P_329_3.getItem(0), this.__P_329_1.getSelection().getItem(0), "Selection does not work.");

        // test for the length
        this.assertEquals(1, this.__P_329_1.getSelection().length, "Selection length is wrong.");

        // select the second object
        this.__P_329_0.addToSelection(this.__P_329_0.getChildren()[1]);
        // test the selection
        this.assertEquals(this.__P_329_3.getItem(1), this.__P_329_1.getSelection().getItem(0), "Selection does not work.");

        // test for the length
        this.assertEquals(1, this.__P_329_1.getSelection().length, "Selection length is wrong.");
      },
      testSelectionSingleRemoveFirst: function testSelectionSingleRemoveFirst() {
        this.__P_329_4();
        var model = this.__P_329_3;
        this.__P_329_0.setSelectionMode("one");
        var selection = this.__P_329_1.getSelection();
        this.assertEquals(model.getItem(0), this.__P_329_0.getSelection()[0].getModel());
        this.assertEventFired(selection, "change", function () {
          model.removeAt(0);
        });
      },
      testSelectionMultiple: function testSelectionMultiple() {
        this.__P_329_4();

        // select the second and third object
        this.__P_329_0.setSelectionMode("multi");
        this.__P_329_0.addToSelection(this.__P_329_0.getChildren()[1]);
        this.__P_329_0.addToSelection(this.__P_329_0.getChildren()[2]);

        // test the selection
        this.assertEquals(this.__P_329_3.getItem(1), this.__P_329_1.getSelection().getItem(0), "Selection does not work.");
        this.assertEquals(this.__P_329_3.getItem(2), this.__P_329_1.getSelection().getItem(1), "Selection does not work.");

        // test for the selection length
        this.assertEquals(2, this.__P_329_1.getSelection().length, "Selection length is wrong.");
      },
      testSelectionBackSingle: function testSelectionBackSingle() {
        this.__P_329_4();

        // add the first element to the selection
        this.__P_329_1.getSelection().push(this.__P_329_3.getItem(0));

        // test the selection
        this.assertEquals(this.__P_329_3.getItem(0), this.__P_329_1.getSelection().getItem(0), "addToSelection does not work.");
      },
      testSelectionBackMultiple: function testSelectionBackMultiple() {
        this.__P_329_4();

        // select the second and third object
        this.__P_329_0.setSelectionMode("multi");

        // add the some elements to the selection
        this.__P_329_1.getSelection().push(this.__P_329_3.getItem(1));
        this.__P_329_1.getSelection().push(this.__P_329_3.getItem(2));

        // test the selection
        this.assertEquals(this.__P_329_3.getItem(1), this.__P_329_1.getSelection().getItem(0), "addToSelection does not work.");
        this.assertEquals(this.__P_329_3.getItem(2), this.__P_329_1.getSelection().getItem(1), "addToSelection does not work.");
      },
      testSelectionArrayChange: function testSelectionArrayChange() {
        this.__P_329_4();

        // set a new selection array
        this.__P_329_1.setSelection(new qx.data.Array([this.__P_329_3.getItem(0)]));

        // test the selection
        this.assertEquals(this.__P_329_3.getItem(0), this.__P_329_0.getSelection()[0].getLabel(), "Change the selection array does not work.");
        this.__P_329_1.getSelection().dispose();
      },
      testSelectionArrayChangeItem: function testSelectionArrayChangeItem() {
        this.__P_329_4();

        // set the selection in the array
        this.__P_329_1.getSelection().push(this.__P_329_3.getItem(0));

        // test the selection
        this.assertEquals(this.__P_329_3.getItem(0), this.__P_329_0.getSelection()[0].getLabel(), "Change the selection array does not work.");
      },
      testSelectionArrayReverse: function testSelectionArrayReverse() {
        this.__P_329_4();

        // set the selection in the array
        this.__P_329_1.getSelection().push(this.__P_329_3.getItem(0));

        // test the selection
        this.assertEquals(this.__P_329_3.getItem(0), this.__P_329_0.getSelection()[0].getLabel(), "Change the selection array does not work.");

        // reverse the model
        this.__P_329_3.reverse();

        // test the selection (the selection is async in that case)
        var self = this;
        this.wait(100, function () {
          self.assertEquals(self.__P_329_3.getItem(self.__P_329_3.getLength() - 1), self.__P_329_0.getSelection()[0].getLabel(), "Can not handle reverse.");
        });
      },
      testSelectionAfterDelete: function testSelectionAfterDelete() {
        this.__P_329_4();

        // add b to the selection
        this.__P_329_1.getSelection().push("b");
        // remove the first element of the controller 'a'
        this.__P_329_3.shift();

        // check if the selected item in the list is "b"
        this.assertTrue(this.__P_329_1.getSelection().contains("b"), "Selection array wrong!");

        // selection updates work with the widget pool and can be async
        this.wait(100, function () {
          this.assertEquals("b", this.__P_329_0.getSelection()[0].getLabel(), "Remove from selection does not work!");
        }, this);
      },
      testSelectionAfterDeleteEmpty: function testSelectionAfterDeleteEmpty() {
        this.__P_329_4();

        // add c to the selection
        this.__P_329_1.getSelection().push("c");
        // remove the c
        this.__P_329_3.splice(2, 1);

        // selection updates work with the widget pool and can be async
        this.wait(100, function () {
          // check if the selection is empty
          this.assertEquals(0, this.__P_329_1.getSelection().length, "Remove from selection does not work!");
        }, this);
      },
      testResetBug: function testResetBug() {
        this.__P_329_4();

        // create the test label
        var label = new qx.ui.basic.Label();
        this.__P_329_1.bind("selection[0]", label, "value");

        // add stuff to the selection
        this.__P_329_1.getSelection().push("c");

        // remove the first element of the controller 'a'
        this.__P_329_3.shift();
        this.__P_329_3.shift();

        // check for the label
        this.assertEquals("c", label.getValue(), "Label has not the right value.");

        // remove the selected element
        this.__P_329_3.shift();

        // check for null
        var self = this;
        this.wait(100, function () {
          self.assertNull(label.getValue(), "Label does still contain something!");
        }, this);
      },
      testDates: function testDates() {
        this.__P_329_2 = [new Date(0), new Date(100)];
        // create a new array
        this.__P_329_3 = new qx.data.Array(this.__P_329_2);

        // create the controller
        this.__P_329_1 = new qx.data.controller.List(this.__P_329_3, this.__P_329_0);

        // check the binding
        for (var i = 0; i < this.__P_329_2.length; i++) {
          var label = this.__P_329_0.getChildren()[i].getLabel();
          this.assertEquals(this.__P_329_2[i].toString(), label, "Date-Binding " + i + " is wrong!");
        }
      },
      testConversionLabel: function testConversionLabel() {
        this.__P_329_4();

        // create the options map with the converter
        var options = {};
        options.converter = function (data) {
          return data + " Converted";
        };
        this.__P_329_1.setLabelOptions(options);

        // check the binding
        for (var i = 0; i < this.__P_329_2.length; i++) {
          var label = this.__P_329_0.getChildren()[i].getLabel();
          this.assertEquals(this.__P_329_2[i] + " Converted", label, "Binding " + i + " is wrong!");
        }
      },
      testOnUpdateLabel: function testOnUpdateLabel() {
        this.__P_329_2 = ["a", "b", "c", "d", "e"];
        // create a new array
        this.__P_329_3 = new qx.data.Array(this.__P_329_2);

        // create the options map with the converter
        var options = {};
        var flag = false;
        options.onUpdate = function () {
          flag = true;
        };
        // create the controller
        this.__P_329_1 = new qx.data.controller.List(this.__P_329_3, this.__P_329_0);
        this.__P_329_1.setLabelOptions(options);

        // change something to invoke a change of a binding
        this.__P_329_2.pop();
        this.__P_329_3.pop();

        // check the binding
        for (var i = 0; i < this.__P_329_2.length; i++) {
          var label = this.__P_329_0.getChildren()[i].getLabel();
          this.assertEquals(this.__P_329_2[i], label, "Binding " + i + " is wrong!");
        }

        // check if the flag is set
        this.assertTrue(flag, "onUpdate not executed");
      },
      testSelectBoxSelectionSingle: function testSelectBoxSelectionSingle() {
        this.__P_329_2 = ["10", "20", "-1", "50"];
        // create a new array
        this.__P_329_3 = new qx.data.Array(this.__P_329_2);

        // create the controller
        var box = new qx.ui.form.SelectBox();
        this.__P_329_1 = new qx.data.controller.List(this.__P_329_3, box);

        // add 10 to the selection
        this.__P_329_1.getSelection().push("10");

        // check for the Selection
        this.assertEquals("10", box.getSelection()[0].getLabel(), "Wrong selection");
        box.dispose();
      },
      testSelectionWithModelChange: function testSelectionWithModelChange() {
        this.__P_329_4();

        // select the first object
        this.__P_329_0.addToSelection(this.__P_329_0.getChildren()[0]);
        // test the selection
        this.assertEquals(this.__P_329_3.getItem(0), this.__P_329_1.getSelection().getItem(0), "Selection does not work.");

        // change the model
        this.__P_329_1.setModel(new qx.data.Array(["x", "y", "z"]));

        // test for an empty selection
        this.assertEquals(0, this.__P_329_1.getSelection().length, "Selection is not empty.");

        // select an item
        this.__P_329_1.getSelection().push("x");

        // test for the selection
        this.assertEquals("x", this.__P_329_1.getSelection().getItem(0), "Selection is wrong.");
        this.__P_329_1.getModel().dispose();
      },
      testSelectionWithModelChangeSelectBox: function testSelectionWithModelChangeSelectBox() {
        var _this = this;
        this.__P_329_2 = ["a", "b", "c", "d", "e"];
        // create a new array
        this.__P_329_3 = new qx.data.Array(this.__P_329_2);
        var selectBox = new qx.ui.form.SelectBox();
        // create the controller
        this.__P_329_1 = new qx.data.controller.List(this.__P_329_3, selectBox);

        // first object is selected (one selection mode)

        // test the selection
        this.assertEquals(this.__P_329_3.getItem(0), selectBox.getSelection()[0].getModel());
        this.assertEquals(this.__P_329_3.getItem(0), this.__P_329_1.getSelection().getItem(0), "Selection does not work.");

        // change the model
        this.__P_329_1.setModel(new qx.data.Array(["x", "y", "z"]));

        // select an item
        this.__P_329_1.getSelection().push("y");

        // test for the selection
        this.assertEquals(1, this.__P_329_1.getSelection().length, "Selection has a wrong length.");
        this.assertEquals("y", this.__P_329_1.getSelection().getItem(0), "Selection is wrong.");
        this.__P_329_1.setModel(new qx.data.Array(["1", "2", "3"]));
        this.__P_329_1.addListener("changeSelection", function () {
          _this.resume(function () {
            // test for the first selected item (one selection)
            this.assertEquals(1, this.__P_329_1.getSelection().length, "Selection has a wrong length.");
            this.assertEquals("1", this.__P_329_1.getSelection().getItem(0), "Selection does not work.");
            selectBox.dispose();
          }, _this);
        });
        this.wait();
      },
      testFilterApply: function testFilterApply() {
        this.__P_329_4();
        var delegate = {};
        delegate.filter = function (data) {
          return data == "b" || data == "c" || data == "d";
        };
        this.__P_329_1.setDelegate(delegate);

        // check the binding
        for (var i = 0; i < this.__P_329_2.length - 2; i++) {
          var label = this.__P_329_0.getChildren()[i].getLabel();
          this.assertEquals(this.__P_329_2[i + 1], label, "Binding " + i + " is wrong!");
        }
      },
      testFilterChange: function testFilterChange() {
        this.__P_329_4();
        var delegate1 = {};
        delegate1.filter = function (data) {
          return data == "b" || data == "c" || data == "d";
        };
        var delegate2 = {};
        delegate2.filter = function (data) {
          return data == "a" || data == "b" || data == "c";
        };
        this.__P_329_1.setDelegate(delegate1);
        this.__P_329_1.setDelegate(delegate2);

        // check the binding
        for (var i = 0; i < this.__P_329_2.length - 2; i++) {
          var label = this.__P_329_0.getChildren()[i].getLabel();
          this.assertEquals(this.__P_329_2[i], label, "Binding " + i + " is wrong!");
        }
      },
      testFilterChangeModel: function testFilterChangeModel() {
        this.__P_329_4();
        var delegate = {};
        delegate.filter = function (data) {
          return data == "B" || data == "C" || data == "D";
        };
        this.__P_329_1.setDelegate(delegate);

        // check for the right length
        this.assertEquals(0, this.__P_329_0.getChildren().length, "Some list items created.");
        var model = new qx.data.Array("A", "B", "C", "D", "E");
        this.__P_329_1.setModel(model);

        // check the length
        this.assertEquals(3, this.__P_329_0.getChildren().length, "Wrong number of list items");

        // check the labels
        this.assertEquals("B", this.__P_329_0.getChildren()[0].getLabel(), "Binding is wrong!");
        this.assertEquals("C", this.__P_329_0.getChildren()[1].getLabel(), "Binding is wrong!");
        this.assertEquals("D", this.__P_329_0.getChildren()[2].getLabel(), "Binding is wrong!");
        model.dispose();
      },
      testFilterReverseModel: function testFilterReverseModel() {
        this.__P_329_4();
        var delegate = {};
        delegate.filter = function (data) {
          return data == "a" || data == "b" || data == "c";
        };
        this.__P_329_1.setDelegate(delegate);

        // check for the right length
        this.assertEquals(3, this.__P_329_0.getChildren().length, "Some list items created.");

        // check the labels
        this.assertEquals("a", this.__P_329_0.getChildren()[0].getLabel(), "Binding is wrong!");
        this.assertEquals("b", this.__P_329_0.getChildren()[1].getLabel(), "Binding is wrong!");
        this.assertEquals("c", this.__P_329_0.getChildren()[2].getLabel(), "Binding is wrong!");

        // reverse the order of the model
        this.__P_329_3.reverse();

        // check for the right length
        this.assertEquals(3, this.__P_329_0.getChildren().length, "Some list items created.");

        // check the labels
        this.assertEquals("c", this.__P_329_0.getChildren()[0].getLabel(), "Binding is wrong!");
        this.assertEquals("b", this.__P_329_0.getChildren()[1].getLabel(), "Binding is wrong!");
        this.assertEquals("a", this.__P_329_0.getChildren()[2].getLabel(), "Binding is wrong!");
      },
      testFilterRemove: function testFilterRemove() {
        this.__P_329_4();
        var delegate = {};
        delegate.filter = function (data) {
          return data == "a" || data == "b" || data == "c";
        };
        this.__P_329_1.setDelegate(delegate);

        // check for the right length
        this.assertEquals(3, this.__P_329_0.getChildren().length, "Some list items created.");

        // check the labels
        this.assertEquals("a", this.__P_329_0.getChildren()[0].getLabel(), "Binding is wrong!");
        this.assertEquals("b", this.__P_329_0.getChildren()[1].getLabel(), "Binding is wrong!");
        this.assertEquals("c", this.__P_329_0.getChildren()[2].getLabel(), "Binding is wrong!");

        // remove the filter
        this.__P_329_1.setDelegate(null);

        // check for the right length
        this.assertEquals(5, this.__P_329_0.getChildren().length, "Some list items created.");

        // check the labels
        this.assertEquals("a", this.__P_329_0.getChildren()[0].getLabel(), "Binding is wrong!");
        this.assertEquals("b", this.__P_329_0.getChildren()[1].getLabel(), "Binding is wrong!");
        this.assertEquals("c", this.__P_329_0.getChildren()[2].getLabel(), "Binding is wrong!");
        this.assertEquals("d", this.__P_329_0.getChildren()[3].getLabel(), "Binding is wrong!");
        this.assertEquals("e", this.__P_329_0.getChildren()[4].getLabel(), "Binding is wrong!");
      },
      testFilterChangeTarget: function testFilterChangeTarget() {
        this.__P_329_4();
        var list = new qx.ui.form.List();
        var delegate = {};
        delegate.filter = function (data) {
          return data == "b" || data == "d";
        };
        this.__P_329_1.setDelegate(delegate);

        // check the length of the first list
        this.assertEquals(2, this.__P_329_0.getChildren().length, "Wrong number of list items");

        // change the target
        this.__P_329_1.setTarget(null);
        // check if everything is cleaned up
        this.assertEquals(0, this.__P_329_0.getChildren().length, "Wrong number of list items");

        // set the new target
        this.__P_329_1.setTarget(list);

        // check the new target
        this.assertEquals(2, list.getChildren().length, "Wrong number of list items");
        this.assertEquals("b", list.getChildren()[0].getLabel(), "Binding is wrong!");
        this.assertEquals("d", list.getChildren()[1].getLabel(), "Binding is wrong!");
        this.__P_329_1.dispose();
        list.dispose();
      },
      testFilterWithSelection: function testFilterWithSelection() {
        this.__P_329_4();
        var delegate = {};
        delegate.filter = function (data) {
          return data == "a" || data == "e";
        };
        this.__P_329_1.setDelegate(delegate);

        // select the first object
        this.__P_329_0.addToSelection(this.__P_329_0.getChildren()[0]);
        // test the selection
        this.assertEquals(this.__P_329_3.getItem(0), this.__P_329_1.getSelection().getItem(0), "Selection does not work.");

        // test for the length
        this.assertEquals(1, this.__P_329_1.getSelection().length, "Selection length is wrong.");

        // select the second object
        this.__P_329_0.addToSelection(this.__P_329_0.getChildren()[1]);
        // test the selection
        this.assertEquals(this.__P_329_3.getItem(4), this.__P_329_1.getSelection().getItem(0), "Selection does not work.");

        // test for the length
        this.assertEquals(1, this.__P_329_1.getSelection().length, "Selection length is wrong.");
      },
      testFilterAfterSelection: function testFilterAfterSelection() {
        this.__P_329_4();

        // select the first object
        this.__P_329_0.addToSelection(this.__P_329_0.getChildren()[1]);

        // apply the filter
        var delegate = {};
        delegate.filter = function (data) {
          return data == "b" || data == "c" || data == "d";
        };
        this.__P_329_1.setDelegate(delegate);
        this.assertEquals("b", this.__P_329_1.getSelection().getItem(0), "Selection does not work.");
        this.assertEquals("b", this.__P_329_0.getSelection()[0].getLabel(), "Selection does not work.");
      },
      testDelegateLate: function testDelegateLate() {
        this.__P_329_4();

        // create the delegate
        var delegate = {};
        delegate.configureItem = function (item) {
          item.setRich(true);
        };
        this.__P_329_1.setDelegate(delegate);

        // check the binding
        for (var i = 0; i < this.__P_329_2.length; i++) {
          var item = this.__P_329_0.getChildren()[i];
          this.assertTrue(item.getRich(), "Delegate " + i + " is wrong!");
        }
      },
      testDelegateFirst: function testDelegateFirst() {
        this.__P_329_2 = ["a", "b", "c", "d", "e"];
        // create a new array
        this.__P_329_3 = new qx.data.Array(this.__P_329_2);

        // create the controller
        this.__P_329_1 = new qx.data.controller.List();
        // create the delegate
        var delegate = {};
        delegate.configureItem = function (item) {
          item.setRich(true);
        };
        this.__P_329_1.setDelegate(delegate);
        this.__P_329_1.setTarget(this.__P_329_0);
        this.__P_329_1.setModel(this.__P_329_3);

        // check the binding
        for (var i = 0; i < this.__P_329_2.length; i++) {
          var item = this.__P_329_0.getChildren()[i];
          this.assertTrue(item.getRich(), "Delegate " + i + " is wrong!");
        }
      },
      testDelegateBindItem: function testDelegateBindItem() {
        this.__P_329_2 = [true, true, false, true, false];
        // create a new array
        this.__P_329_3 = new qx.data.Array(this.__P_329_2);
        this.__P_329_1 = new qx.data.controller.List();
        var delegate = {};
        delegate.createItem = function () {
          return new qx.ui.form.CheckBox();
        };
        delegate.bindItem = function (controller, item, id) {
          controller.bindProperty(null, "enabled", null, item, id);
        };
        this.__P_329_1.setDelegate(delegate);
        this.__P_329_1.setTarget(this.__P_329_0);
        this.__P_329_1.setModel(this.__P_329_3);

        // check the binding
        // check the binding
        for (var i = 0; i < this.__P_329_2.length; i++) {
          this.assertEquals("qx.ui.form.CheckBox", this.__P_329_0.getChildren()[i].classname);
          var label = this.__P_329_0.getChildren()[i].getEnabled();
          this.assertEquals(this.__P_329_2[i], label, "Binding " + i + " is wrong!");
        }
      },
      testDelegateBindItemLate: function testDelegateBindItemLate() {
        this.__P_329_2 = [true, true, false, true, false];
        // create a new array
        this.__P_329_3 = new qx.data.Array(this.__P_329_2);
        this.__P_329_1 = new qx.data.controller.List();
        this.__P_329_1.setTarget(this.__P_329_0);
        this.__P_329_1.setModel(this.__P_329_3);
        var delegate = {};
        delegate.createItem = function () {
          return new qx.ui.form.CheckBox();
        };
        delegate.bindItem = function (controller, item, id) {
          controller.bindProperty(null, "enabled", null, item, id);
        };
        this.__P_329_1.setDelegate(delegate);

        // check the binding
        for (var i = 0; i < this.__P_329_2.length; i++) {
          this.assertEquals("qx.ui.form.CheckBox", this.__P_329_0.getChildren()[i].classname);
          var label = this.__P_329_0.getChildren()[i].getEnabled();
          this.assertEquals(this.__P_329_2[i], label, "Binding " + i + " is wrong!");
        }
      },
      testDelegateBindDefaultProperties: function testDelegateBindDefaultProperties() {
        this.__P_329_4();
        this.__P_329_1.setModel(null);
        var delegate = {};
        delegate.bindItem = function (controller, item, id) {
          controller.bindDefaultProperties(item, id);
        };
        this.__P_329_1.setDelegate(delegate);
        this.__P_329_1.setModel(this.__P_329_3);

        // check the binding
        for (var i = 0; i < this.__P_329_2.length; i++) {
          var label = this.__P_329_0.getChildren()[i].getLabel();
          this.assertEquals(this.__P_329_2[i], label, "Binding " + i + " is wrong!");
        }
      },
      testDelegateBindDefaultPropertiesLate: function testDelegateBindDefaultPropertiesLate() {
        this.__P_329_4();
        var delegate = {};
        delegate.bindItem = function (controller, item, id) {
          controller.bindDefaultProperties(item, id);
        };
        this.__P_329_1.setDelegate(delegate);

        // check the binding
        for (var i = 0; i < this.__P_329_2.length; i++) {
          this.__P_329_3.setItem(i, i + "");
          var label = this.__P_329_0.getChildren()[i].getLabel();
          this.assertEquals(i + "", label, "Binding " + i + " is wrong!");
        }
      },
      testSelectionSequence: function testSelectionSequence() {
        // "a", "b", "c", "d", "e"
        this.__P_329_4();
        this.__P_329_0.setSelectionMode("multi");
        var selList = new qx.ui.form.List();
        var selController = new qx.data.controller.List(null, selList);

        // add the last two to the selection of the first list
        this.__P_329_0.addToSelection(this.__P_329_0.getChildren()[4]);
        this.__P_329_0.addToSelection(this.__P_329_0.getChildren()[3]);

        // special hack for chrome because his selection order is different
        selController.setModel(this.__P_329_1.getSelection());
        var labels = [];
        for (var i = 0; i < selList.getChildren().length; i++) {
          labels.push(selList.getChildren()[i].getLabel());
        }

        // check if the second list is filled right
        this.assertNotEquals(-1, labels.indexOf("e"), "e is not in the selection list.");
        this.assertNotEquals(-1, labels.indexOf("d"), "d is not in the selection list.");
        selList.addToSelection(selList.getChildren()[1]);
        this.assertEquals(selList.getChildren()[1].getLabel(), selController.getSelection().getItem(0), "d not selected in the second list.");

        // remove the last element of the first list
        this.__P_329_3.pop();
        this.wait(100, function () {
          // is d still in the list?
          this.assertEquals("d", selList.getChildren()[0].getLabel(), "d is not in the selection list anymore.");

          // get rid of that old stuff
          this.flush();
          selList.dispose();
          selController.dispose();
        }, this);
      },
      testGetVisibleModels: function testGetVisibleModels() {
        this.__P_329_4();
        var delegate = {};
        delegate.filter = function (data) {
          return data == "b" || data == "c" || data == "d";
        };
        this.__P_329_1.setDelegate(delegate);
        var visibleModels = this.__P_329_1.getVisibleModels();
        this.assertEquals(visibleModels.classname, "qx.data.Array");
        this.assertEquals(3, visibleModels.getLength());
        this.assertEquals("b", visibleModels.getItem(0));
        this.assertEquals("c", visibleModels.getItem(1));
        this.assertEquals("d", visibleModels.getItem(2));
        visibleModels.dispose();
      },
      testBindIconWithStringArray: function testBindIconWithStringArray() {
        this.__P_329_4();
        this.__P_329_1.setIconPath("");

        // check the binding
        for (var i = 0; i < this.__P_329_2.length; i++) {
          var icon = this.__P_329_0.getChildren()[i].getIcon();
          this.assertEquals(this.__P_329_2[i], icon, "Binding " + i + " is wrong!");
        }
      },
      testScrollBySelection: function testScrollBySelection() {
        this.__P_329_4();
        // set a smal hight (list has to scroll)
        this.__P_329_0.setHeight(40);
        this.getRoot().add(this.__P_329_0);
        var selectables = this.__P_329_0.getSelectables();

        // select the first item
        this.__P_329_0.setSelection([selectables[0]]);
        // scroll a bit down (scrollY is 40)
        this.__P_329_0.scrollByY(40);
        // select the current visible item
        this.__P_329_0.addToSelection(selectables[2]);
        // check that it has not been scrolled
        this.assertEquals(40, this.__P_329_0.getScrollY());
      },
      testScrollBySelectionMulti: function testScrollBySelectionMulti() {
        this.__P_329_4();
        // set a smal hight (list has to scroll)
        this.__P_329_0.setHeight(40);
        this.__P_329_0.setSelectionMode("multi");
        this.getRoot().add(this.__P_329_0);
        var selectables = this.__P_329_0.getSelectables();

        // select the first item
        this.__P_329_0.setSelection([selectables[0]]);
        // scroll a bit down (scrollY is 40)
        this.__P_329_0.scrollByY(40);
        // select the current visible item
        this.__P_329_0.addToSelection(selectables[2]);
        // check that it has not been scrolled
        this.assertEquals(40, this.__P_329_0.getScrollY());
      },
      testBug1947: function testBug1947() {
        qx.Class.define("qx.demo.Kid", {
          extend: qx.core.Object,
          properties: {
            name: {
              check: "String",
              event: "changeName",
              init: null
            }
          }
        });
        var kid = new qx.demo.Kid();
        qx.Class.define("qx.demo.Parent", {
          extend: qx.core.Object,
          construct: function construct() {
            qx.core.Object.constructor.call(this);
            this.setKid(kid);
          },
          properties: {
            name: {
              check: "String",
              event: "changeName",
              init: null
            },
            kid: {
              check: "qx.demo.Kid",
              event: "changeKid"
            }
          }
        });
        var parentA = new qx.demo.Parent();
        parentA.setName("parentA");
        parentA.getKid().setName("kidA");
        var parentB = new qx.demo.Parent();
        parentB.setName("parentB");
        parentB.getKid().setName("kidB");
        var parents = new qx.data.Array();
        parents.push(parentA);
        parents.push(parentB);
        var list = new qx.ui.form.List();
        var ctrl = new qx.data.controller.List(parents, list, "name");
        var label = new qx.ui.basic.Label();
        label.setDecorator("main");
        ctrl.bind("selection[0].Kid.Name", label, "value");
        ctrl.getSelection().push(parentA);
        parentA.dispose();
        parentB.dispose();
        kid.dispose();
        list.dispose();
        ctrl.dispose();
        label.dispose();
        parents.dispose();
      },
      testBug1988: function testBug1988() {
        qx.Class.define("qx.demo.Kid", {
          extend: qx.core.Object,
          properties: {
            name: {
              check: "String",
              event: "changeName",
              init: null,
              nullable: true
            }
          }
        });

        //var kid = new qx.demo.Kid();
        qx.Class.define("qx.demo.Parent", {
          extend: qx.core.Object,
          construct: function construct() {
            qx.core.Object.constructor.call(this);
            this.setKid(new qx.demo.Kid());
          },
          properties: {
            name: {
              check: "String",
              event: "changeName",
              init: null
            },
            kid: {
              check: "qx.demo.Kid",
              event: "changeKid"
            }
          }
        });
        var parentA = new qx.demo.Parent();
        parentA.setName("parentA");
        parentA.getKid().setName("kidA");
        var parentB = new qx.demo.Parent();
        parentB.setName("parentB");
        //parentB.getKid().setName("kidB");

        var parents = new qx.data.Array();
        parents.push(parentA);
        parents.push(parentB);
        var list = new qx.ui.form.List();
        var ctrl = new qx.data.controller.List(parents, list, "name");
        var label = new qx.ui.basic.Label();
        ctrl.bind("selection[0].kid.name", label, "value");

        // select the first child of the list
        list.addToSelection(list.getChildren()[0]);
        // check the label
        this.assertEquals("kidA", label.getValue(), "Wrong name in the label.");

        // select the second label
        list.addToSelection(list.getChildren()[1]);
        this.assertNull(label.getValue(), "Label has not been reseted.");
        parentA.getKid().dispose();
        parentA.dispose();
        parentB.getKid().dispose();
        parentB.dispose();
        list.dispose();
        ctrl.dispose();
        label.dispose();
        parents.dispose();
      },
      testSpliceAll: function testSpliceAll() {
        this.__P_329_4();
        this.__P_329_3.splice(0, 5, "A", "B", "C", "D", "E");
        this.assertEquals("E", this.__P_329_0.getChildren()[4].getLabel());
      }
    }
  });
  qx.test.data.controller.List.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=List.js.map?dt=1731948114446