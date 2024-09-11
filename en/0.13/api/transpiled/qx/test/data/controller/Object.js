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
      "qx.ui.basic.Label": {},
      "qx.ui.core.Widget": {},
      "qx.data.controller.Object": {},
      "qx.ui.form.SelectBox": {},
      "qx.ui.form.ListItem": {}
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
  qx.Class.define("qx.test.data.controller.Object", {
    extend: qx.dev.unit.TestCase,
    members: {
      __P_332_0: null,
      __P_332_1: null,
      __P_332_2: null,
      __P_332_3: null,
      setUp: function setUp() {
        this.__P_332_0 = new qx.ui.basic.Label();
        this.__P_332_1 = new qx.ui.basic.Label();
        this.__P_332_2 = new qx.ui.core.Widget();
        this.__P_332_3 = new qx.data.controller.Object(this.__P_332_2);
      },
      tearDown: function tearDown() {
        this.__P_332_2.dispose();
        this.__P_332_1.dispose();
        this.__P_332_0.dispose();
        this.__P_332_3.dispose();
      },
      testOneToOne: function testOneToOne() {
        // Tie the label1s content to the zindex of the model
        this.__P_332_3.addTarget(this.__P_332_0, "value", "zIndex");

        // set a new zIndex to the model
        this.__P_332_2.setZIndex(10);

        // test for the binding
        this.assertEquals("10", this.__P_332_0.getValue(), "Binding does not work!");
      },
      testOneToTwo: function testOneToTwo() {
        // Tie the label1s content to the zindex of the model
        this.__P_332_3.addTarget(this.__P_332_0, "value", "zIndex");
        // Tie the label2s content to the zindex of the model
        this.__P_332_3.addTarget(this.__P_332_1, "value", "zIndex");

        // set a new zIndex to the model
        this.__P_332_2.setZIndex(10);

        // test for the binding
        this.assertEquals("10", this.__P_332_0.getValue(), "Binding1 does not work!");
        this.assertEquals("10", this.__P_332_1.getValue(), "Binding2 does not work!");
      },
      testChangeModel: function testChangeModel() {
        // Tie the labels content to the zindex of the model
        this.__P_332_3.addTarget(this.__P_332_0, "value", "zIndex");
        this.__P_332_3.addTarget(this.__P_332_1, "value", "zIndex");

        // set an old zIndex
        this.__P_332_2.setZIndex(10);

        // create a new model with a different zIndex
        var newModel = new qx.ui.core.Widget();
        newModel.setZIndex(20);

        // dispose the old model to check that the controller can handle that
        this.__P_332_2.dispose();

        // set the new Model
        this.__P_332_3.setModel(newModel);

        // test for the binding
        this.assertEquals("20", this.__P_332_0.getValue(), "Binding1 does not work!");
        this.assertEquals("20", this.__P_332_1.getValue(), "Binding2 does not work!");
        newModel.dispose();
      },
      testRemoveOneBinding: function testRemoveOneBinding() {
        // set a zIndex
        this.__P_332_2.setZIndex(20);

        // Tie the labels content to the zindex of the model
        this.__P_332_3.addTarget(this.__P_332_0, "value", "zIndex");
        this.__P_332_3.addTarget(this.__P_332_1, "value", "zIndex");

        // test for the binding
        this.assertEquals("20", this.__P_332_0.getValue(), "Binding1 does not work!");
        this.assertEquals("20", this.__P_332_1.getValue(), "Binding2 does not work!");

        // remove one target
        this.__P_332_3.removeTarget(this.__P_332_0, "value", "zIndex");

        // set a new zIndex
        this.__P_332_2.setZIndex(5);

        // test for the binding
        this.assertEquals("20", this.__P_332_0.getValue(), "Binding1 has not been removed!");
        this.assertEquals("5", this.__P_332_1.getValue(), "Binding2 has been removed!");
      },
      testRemoveUnexistantTarget: function testRemoveUnexistantTarget() {
        // test some cases
        this.__P_332_3.removeTarget(this.__P_332_0, "value", "zIndex");
        this.__P_332_3.removeTarget(null, "AFFE", "AFFEN");

        // set a target for testing
        this.__P_332_3.addTarget(this.__P_332_0, "value", "zIndex");

        // test the same cases again
        this.__P_332_3.removeTarget(this.__P_332_0, "value", "zIndex");
        this.__P_332_3.removeTarget(null, "AFFE", "AFFEN");
      },
      testTowToTwo: function testTowToTwo() {
        // set up two links
        this.__P_332_3.addTarget(this.__P_332_0, "value", "zIndex");
        this.__P_332_3.addTarget(this.__P_332_1, "value", "visibility");

        // set the values
        this.__P_332_2.setZIndex(11);
        this.__P_332_2.setVisibility("visible");

        // test for the binding
        this.assertEquals("11", this.__P_332_0.getValue(), "Binding1 does not work!");
        this.assertEquals("visible", this.__P_332_1.getValue(), "Binding2 does not work!");

        // set new values
        this.__P_332_2.setZIndex(15);
        this.__P_332_2.setVisibility("hidden");

        // test again for the binding
        this.assertEquals("15", this.__P_332_0.getValue(), "Binding1 does not work!");
        this.assertEquals("hidden", this.__P_332_1.getValue(), "Binding2 does not work!");
      },
      testOneToOneBi: function testOneToOneBi() {
        // Tie the label1s content to the zindex of the model
        this.__P_332_3.addTarget(this.__P_332_0, "value", "zIndex", true);

        // set a new zIndex to the model
        this.__P_332_2.setZIndex(10);

        // test for the binding
        this.assertEquals("10", this.__P_332_0.getValue(), "Binding does not work!");

        // set a new content
        this.__P_332_0.setValue("20");

        // test the reverse binding
        this.assertEquals(20, this.__P_332_2.getZIndex(), "Reverse-Binding does not work!");
      },
      testOneToTwoBi: function testOneToTwoBi() {
        // Tie the label1s content to the zindex of the model
        this.__P_332_3.addTarget(this.__P_332_0, "value", "zIndex", true);
        // Tie the label2s content to the zindex of the model
        this.__P_332_3.addTarget(this.__P_332_1, "value", "zIndex", true);

        // set a new zIndex to the model
        this.__P_332_2.setZIndex(10);

        // test for the binding
        this.assertEquals("10", this.__P_332_0.getValue(), "Binding1 does not work!");
        this.assertEquals("10", this.__P_332_1.getValue(), "Binding2 does not work!");

        // change one label
        this.__P_332_0.setValue("100");

        // test for the binding
        this.assertEquals(100, this.__P_332_2.getZIndex(), "Reverse Binding does not work!");
        this.assertEquals("100", this.__P_332_1.getValue(), "Binding2 does not work!");

        // change the other label
        this.__P_332_1.setValue("200");

        // test for the binding
        this.assertEquals(200, this.__P_332_2.getZIndex(), "Reverse Binding does not work!");
        this.assertEquals("200", this.__P_332_0.getValue(), "Binding1 does not work!");
      },
      testChangeModelBi: function testChangeModelBi() {
        // Tie the labels content to the zindex of the model
        this.__P_332_3.addTarget(this.__P_332_0, "value", "zIndex", true);
        this.__P_332_3.addTarget(this.__P_332_1, "value", "zIndex", true);

        // set an old zIndex
        this.__P_332_2.setZIndex(10);

        // create a new model with a different zIndex
        var newModel = new qx.ui.core.Widget();
        newModel.setZIndex(20);

        // set the new Model
        this.__P_332_3.setModel(newModel);

        // test for the binding
        this.assertEquals("20", this.__P_332_0.getValue(), "Binding1 does not work!");
        this.assertEquals("20", this.__P_332_1.getValue(), "Binding2 does not work!");

        // set the zIndex in a label
        this.__P_332_1.setValue("11");

        // test for the bindings (working and should not work)
        this.assertEquals("11", this.__P_332_0.getValue(), "Binding1 does not work!");
        this.assertEquals(11, newModel.getZIndex(), "Reverse-Binding does not work!");
        this.assertEquals(10, this.__P_332_2.getZIndex(), "Binding has not been removed.");
        newModel.dispose();
      },
      testConverting: function testConverting() {
        // create the options map
        var opt = {
          converter: function converter(value) {
            if (value > 10) {
              return "A";
            }
            return "B";
          }
        };

        // Tie the labels content to the zindex of the model
        this.__P_332_3.addTarget(this.__P_332_0, "value", "zIndex", false, opt);

        // set a zIndex and test it
        this.__P_332_2.setZIndex(11);
        this.assertEquals("A", this.__P_332_0.getValue(), "Converter does not work!");

        // set a zIndex and test it
        this.__P_332_2.setZIndex(5);
        this.assertEquals("B", this.__P_332_0.getValue(), "Converter does not work!");
      },
      testConvertingBi: function testConvertingBi() {
        // create the options map for source to target
        var opt = {
          converter: function converter(value) {
            if (value > 10) {
              return "A";
            }
            return "B";
          }
        };

        // create the options map for target to source
        var revOpt = {
          converter: function converter(value) {
            if (value == "A") {
              return 11;
            }
            return 10;
          }
        };

        // Tie the labels content to the zindex of the model
        this.__P_332_3.addTarget(this.__P_332_0, "value", "zIndex", true, opt, revOpt);

        // set a zIndex and test it
        this.__P_332_2.setZIndex(11);
        this.assertEquals("A", this.__P_332_0.getValue(), "Converter does not work!");

        // set a zIndex and test it
        this.__P_332_2.setZIndex(5);
        this.assertEquals("B", this.__P_332_0.getValue(), "Converter does not work!");

        // change the target and check the model
        this.__P_332_0.setValue("A");
        this.assertEquals(11, this.__P_332_2.getZIndex(), "Back-Converter does not work!");
        this.__P_332_0.setValue("B");
        this.assertEquals(10, this.__P_332_2.getZIndex(), "Back-Converter does not work!");
      },
      testChangeModelCon: function testChangeModelCon() {
        // create the options map
        var opt = {
          converter: function converter(value) {
            if (value > 10) {
              return "A";
            }
            return "B";
          }
        };

        // Tie the labels content to the zindex of the model
        this.__P_332_3.addTarget(this.__P_332_0, "value", "zIndex", false, opt);
        this.__P_332_3.addTarget(this.__P_332_1, "value", "zIndex", false, opt);

        // set an old zIndex
        this.__P_332_2.setZIndex(3);

        // create a new model with a different zIndex
        var newModel = new qx.ui.core.Widget();
        newModel.setZIndex(20);

        // set the new Model
        this.__P_332_3.setModel(newModel);

        // test for the binding
        this.assertEquals("A", this.__P_332_0.getValue(), "Binding1 does not work!");
        this.assertEquals("A", this.__P_332_1.getValue(), "Binding2 does not work!");
        newModel.dispose();
      },
      testSetLateModel: function testSetLateModel() {
        this.__P_332_3.dispose();
        // create a blank controller
        this.__P_332_3 = new qx.data.controller.Object();

        // set the model
        this.__P_332_3.setModel(this.__P_332_2);

        // Tie the label1s content to the zindex of the model
        this.__P_332_3.addTarget(this.__P_332_0, "value", "zIndex");

        // set a new zIndex to the model
        this.__P_332_2.setZIndex(10);

        // test for the binding
        this.assertEquals("10", this.__P_332_0.getValue(), "Binding does not work!");
      },
      testSetModelNull: function testSetModelNull() {
        // Tie the label1s content to the zindex of the model
        this.__P_332_3.addTarget(this.__P_332_0, "value", "zIndex");
        this.__P_332_0.setValue("test");

        // set the model of the controller to null and back
        this.__P_332_3.setModel(null);

        // check if the values have been reseted
        this.assertNull(this.__P_332_0.getValue());
        this.__P_332_3.setModel(this.__P_332_2);

        // set a new zIndex to the model
        this.__P_332_2.setZIndex(10);

        // test for the binding
        this.assertEquals("10", this.__P_332_0.getValue(), "Binding does not work!");
      },
      testCreateWithoutModel: function testCreateWithoutModel() {
        // create a new controller
        this.__P_332_3.dispose();
        this.__P_332_3 = new qx.data.controller.Object();

        // Tie the label1s content to the zindex of the model
        this.__P_332_3.addTarget(this.__P_332_0, "value", "zIndex");

        // set a new zIndex to the model
        this.__P_332_2.setZIndex(10);
        this.__P_332_3.setModel(this.__P_332_2);

        // test for the binding
        this.assertEquals("10", this.__P_332_0.getValue(), "Binding does not work!");
      },
      testTargetArrayBi: function testTargetArrayBi() {
        var selectbox = new qx.ui.form.SelectBox();
        for (var i = 0; i < 10; i++) {
          selectbox.add(new qx.ui.form.ListItem("item " + i).set({
            model: i
          }));
        }
        this.__P_332_3.addTarget(selectbox, "modelSelection[0]", "zIndex", true);

        // selectbox --> model
        selectbox.setSelection([selectbox.getSelectables()[6]]);
        this.assertEquals(6, this.__P_332_2.getZIndex());

        // model --> selectbox
        this.__P_332_2.setZIndex(3);
        this.assertEquals(3, selectbox.getSelection()[0].getModel());
        selectbox.dispose();
      },
      testDispose: function testDispose() {
        // Tie the label1s content to the zindex of the model
        this.__P_332_3.addTarget(this.__P_332_0, "value", "zIndex", true);

        // create a common startbase
        this.__P_332_0.setZIndex(7);

        // dispose the controller to remove the bindings
        this.__P_332_3.dispose();

        // set a new zIndex to the model
        this.__P_332_2.setZIndex(10);

        // test if the binding has been removed and reseted
        this.assertEquals(null, this.__P_332_0.getValue(), "Binding does not work!");

        // set a new content
        this.__P_332_0.setValue("20");

        // test the reverse binding
        this.assertEquals(10, this.__P_332_2.getZIndex(), "Reverse-Binding does not work!");
      }
    }
  });
  qx.test.data.controller.Object.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Object.js.map?dt=1726089052640