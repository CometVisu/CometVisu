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
      "qx.core.Object": {
        "construct": true
      },
      "qx.ui.form.List": {},
      "qx.data.Array": {},
      "qx.data.controller.List": {}
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
   * @ignore(qx.test.ListWithObject, qx.demo.Parent, qx.demo.Kid)
   */

  qx.Class.define("qx.test.data.controller.ListWithObjects", {
    extend: qx.test.ui.LayoutTestCase,
    construct: function construct() {
      qx.test.ui.LayoutTestCase.constructor.call(this);

      // define a test class
      qx.Class.define("qx.test.ListWithObject", {
        extend: qx.core.Object,
        properties: {
          name: {
            check: "String",
            event: "changeName"
          },
          icon: {
            check: "String",
            init: "Juhu",
            event: "changeIcon"
          }
        }
      });
    },
    members: {
      __P_331_0: null,
      __P_331_1: null,
      __P_331_2: null,
      __P_331_3: null,
      setUp: function setUp() {
        this.__P_331_0 = new qx.ui.form.List();

        // create the model
        this.__P_331_2 = [];
        for (var i = 0; i < 5; i++) {
          var obj = new qx.test.ListWithObject();
          obj.setName("name" + i);
          obj.setIcon("icon" + i);
          this.__P_331_2.push(obj);
        }
        // create a new array
        this.__P_331_3 = new qx.data.Array(this.__P_331_2);
      },
      tearDown: function tearDown() {
        this.flush();
        this.__P_331_1.dispose();
        this.__P_331_1 = null;
        this.__P_331_3.setAutoDisposeItems(true);
        this.__P_331_3.dispose();
        this.__P_331_3 = null;
        this.__P_331_2 = null;
        this.__P_331_0.dispose();
      },
      testRead: function testRead() {
        // create the controller
        this.__P_331_1 = new qx.data.controller.List(this.__P_331_3, this.__P_331_0, "name");

        // check the binding
        for (var i = 0; i < this.__P_331_2.length; i++) {
          var label = this.__P_331_0.getChildren()[i].getLabel();
          this.assertEquals(this.__P_331_2[i].getName(), label, "Binding " + i + " is wrong!");
        }
      },
      testChangeLablePath: function testChangeLablePath() {
        // create the controller
        this.__P_331_1 = new qx.data.controller.List(this.__P_331_3, this.__P_331_0, "name");

        // check the binding
        for (var i = 0; i < this.__P_331_2.length; i++) {
          var label = this.__P_331_0.getChildren()[i].getLabel();
          this.assertEquals(this.__P_331_2[i].getName(), label, "Binding " + i + " is wrong!");
        }
        this.__P_331_1.setLabelPath("icon");

        // check the binding again
        for (var i = 0; i < this.__P_331_2.length; i++) {
          var label = this.__P_331_0.getChildren()[i].getLabel();
          this.assertEquals(this.__P_331_2[i].getIcon(), label, "Binding " + i + " is wrong!");
        }
      },
      testSelection: function testSelection() {
        // create the controller
        this.__P_331_1 = new qx.data.controller.List(this.__P_331_3, this.__P_331_0, "name");

        // select the first object
        this.__P_331_0.addToSelection(this.__P_331_0.getChildren()[0]);
        // test the selection
        this.assertEquals(this.__P_331_3.getItem(0), this.__P_331_1.getSelection().getItem(0), "Selection does not work.");

        // test for the length
        this.assertEquals(1, this.__P_331_1.getSelection().length, "Selection length is wrong.");

        // select the second object
        this.__P_331_0.addToSelection(this.__P_331_0.getChildren()[1]);
        // test the selection
        this.assertEquals(this.__P_331_3.getItem(1), this.__P_331_1.getSelection().getItem(0), "Selection does not work.");

        // test for the length
        this.assertEquals(1, this.__P_331_1.getSelection().length, "Selection length is wrong.");
      },
      testSelectionBackMultiple: function testSelectionBackMultiple() {
        // create the controller
        this.__P_331_1 = new qx.data.controller.List(this.__P_331_3, this.__P_331_0, "name");

        // select the second and third object
        this.__P_331_0.setSelectionMode("multi");

        // add the some elements to the selection
        this.__P_331_1.getSelection().push(this.__P_331_3.getItem(1));
        this.__P_331_1.getSelection().push(this.__P_331_3.getItem(2));

        // test the selection
        this.assertEquals(this.__P_331_3.getItem(1), this.__P_331_1.getSelection().getItem(0), "addToSelection does not work.");
        this.assertEquals(this.__P_331_3.getItem(2), this.__P_331_1.getSelection().getItem(1), "addToSelection does not work.");
      },
      testChangeModelSmaller: function testChangeModelSmaller() {
        // create the controller
        this.__P_331_1 = new qx.data.controller.List(this.__P_331_3, this.__P_331_0, "name");

        // create the model
        this.__P_331_2 = [];
        for (var i = 0; i < 2; i++) {
          var obj = new qx.test.ListWithObject();
          obj.setName("name");
          obj.setIcon("icon");
          this.__P_331_2.push(obj);
        }
        // create a new array
        this.__P_331_3.setAutoDisposeItems(true);
        this.__P_331_3.dispose();
        this.__P_331_3 = new qx.data.Array(this.__P_331_2);
        this.__P_331_1.setModel(this.__P_331_3);

        // check the binding
        for (var i = 0; i < this.__P_331_2.length; i++) {
          var label = this.__P_331_0.getChildren()[i].getLabel();
          this.assertEquals(this.__P_331_2[i].getName(), label, "Binding " + i + " is wrong!");
        }
        // check the length
        this.assertEquals(this.__P_331_2.length, this.__P_331_0.getChildren().length, "Wrong length!");
      },
      testIcon: function testIcon() {
        // create the controller
        this.__P_331_1 = new qx.data.controller.List(this.__P_331_3, this.__P_331_0, "name");
        this.__P_331_1.setIconPath("icon");

        // check the label binding
        for (var i = 0; i < this.__P_331_2.length; i++) {
          var label = this.__P_331_0.getChildren()[i].getLabel();
          this.assertEquals(this.__P_331_2[i].getName(), label, "Binding " + i + " is wrong!");
        }
        // check the icon binding
        for (var i = 0; i < this.__P_331_2.length; i++) {
          var icon = this.__P_331_0.getChildren()[i].getIcon();
          this.assertEquals(this.__P_331_2[i].getIcon(), icon, "Binding " + i + " is wrong!");
        }
      },
      testChangeIconPath: function testChangeIconPath() {
        // create the controller
        this.__P_331_1 = new qx.data.controller.List(this.__P_331_3, this.__P_331_0, "name");
        this.__P_331_1.setIconPath("icon");

        // check the binding
        for (var i = 0; i < this.__P_331_2.length; i++) {
          var icon = this.__P_331_0.getChildren()[i].getIcon();
          this.assertEquals(this.__P_331_2[i].getIcon(), icon, "Binding " + i + " is wrong!");
        }
        this.__P_331_1.setIconPath("name");

        // check the binding again
        for (var i = 0; i < this.__P_331_2.length; i++) {
          var icon = this.__P_331_0.getChildren()[i].getIcon();
          this.assertEquals(this.__P_331_2[i].getName(), icon, "Binding " + i + " is wrong!");
        }
      },
      testConversionLabelAndIcon: function testConversionLabelAndIcon() {
        // create the label options
        var labelOptions = {
          converter: function converter(value) {
            return "Dr. " + value;
          }
        };

        // create the icon options
        var iconOptions = {
          converter: function converter(value) {
            return value + ".png";
          }
        };

        // create the controller
        this.__P_331_1 = new qx.data.controller.List(this.__P_331_3, this.__P_331_0, "name");
        this.__P_331_1.setIconPath("icon");
        this.__P_331_1.setLabelOptions(labelOptions);
        this.__P_331_1.setIconOptions(iconOptions);

        // check the label binding
        for (var i = 0; i < this.__P_331_2.length; i++) {
          var label = this.__P_331_0.getChildren()[i].getLabel();
          this.assertEquals("Dr. " + this.__P_331_2[i].getName(), label, "Binding " + i + " is wrong!");
        }

        // check the icon binding
        for (var i = 0; i < this.__P_331_2.length; i++) {
          var icon = this.__P_331_0.getChildren()[i].getIcon();
          this.assertEquals(this.__P_331_2[i].getIcon() + ".png", icon, "Binding " + i + " is wrong!");
        }
      },
      testSetModelLate: function testSetModelLate() {
        // create the controller
        this.__P_331_1 = new qx.data.controller.List(null, this.__P_331_0, "name");
        this.__P_331_1.setModel(this.__P_331_3);

        // check the binding
        for (var i = 0; i < this.__P_331_2.length; i++) {
          var label = this.__P_331_0.getChildren()[i].getLabel();
          this.assertEquals(this.__P_331_2[i].getName(), label, "Binding " + i + " is wrong!");
        }
      },
      testSetTargetLate: function testSetTargetLate() {
        // create the controller
        this.__P_331_1 = new qx.data.controller.List(this.__P_331_3, null, "name");
        this.__P_331_1.setTarget(this.__P_331_0);

        // check the binding
        for (var i = 0; i < this.__P_331_2.length; i++) {
          var label = this.__P_331_0.getChildren()[i].getLabel();
          this.assertEquals(this.__P_331_2[i].getName(), label, "Binding " + i + " is wrong!");
        }
      },
      testFilter: function testFilter() {
        // create the controller
        this.__P_331_1 = new qx.data.controller.List(this.__P_331_3, this.__P_331_0, "name");
        this.__P_331_1.setIconPath("icon");
        var delegate = {};
        delegate.filter = function (data) {
          return data.getName() == "name2" ? true : false;
        };
        // set the filter
        this.__P_331_1.setDelegate(delegate);

        // check for the length
        this.assertEquals(1, this.__P_331_0.getChildren().length, "Too much list items.");

        // check the label binding
        var label = this.__P_331_0.getChildren()[0].getLabel();
        this.assertEquals("name2", label, "Label binding is wrong!");
        // check the icon binding
        var icon = this.__P_331_0.getChildren()[0].getIcon();
        this.assertEquals("icon2", icon, "Icon binding is wrong!");
      },
      testOnUpdateLabel: function testOnUpdateLabel() {
        // create the options map with the converter
        var options = {};
        var flag = false;
        options.onUpdate = function () {
          flag = true;
        };
        // create the controller
        this.__P_331_1 = new qx.data.controller.List(this.__P_331_3, this.__P_331_0, "name");
        this.__P_331_1.setLabelOptions(options);

        // change something to invoke a change of a binding
        this.__P_331_2.pop().dispose();
        this.__P_331_3.pop().dispose();

        // check the binding
        for (var i = 0; i < this.__P_331_2.length; i++) {
          var label = this.__P_331_0.getChildren()[i].getLabel();
          this.assertEquals(this.__P_331_2[i].getName(), label, "Binding " + i + " is wrong!");
        }

        // check if the flag is set
        this.assertTrue(flag, "onUpdate not executed");
      },
      // [BUG #2088]
      testDeepSelection: function testDeepSelection() {
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
        parentB.getKid().setName("kidB");
        var parentC = new qx.demo.Parent();
        parentC.setName("parentC");
        parentC.getKid().setName("kidC");
        var parents = new qx.data.Array();
        parents.push(parentA);
        parents.push(parentB);
        parents.push(parentC);
        this.__P_331_1 = new qx.data.controller.List(parents, this.__P_331_0, "name");
        this.assertEquals(parentC.getName(), this.__P_331_0.getChildren()[2].getModel().getName(), "Wrong model stored before the splice.");
        var temp = parents.splice(parents.indexOf(parentB), 1);
        temp.getItem(0).getKid().dispose();
        temp.setAutoDisposeItems(true);
        temp.dispose();
        this.assertEquals("parentC", this.__P_331_0.getChildren()[1].getLabel(), "Wrong name of the parent.");
        this.assertEquals(parentC, this.__P_331_0.getChildren()[1].getModel(), "Wrong model stored after the splice.");

        // clean up
        for (var i = 0; i < parents.length; i++) {
          parents.getItem(i).getKid().dispose();
        }
        parents.setAutoDisposeItems(true);
        parents.dispose();
      },
      testModelProperty: function testModelProperty() {
        // create the controller
        this.__P_331_1 = new qx.data.controller.List(null, this.__P_331_0, "name");

        // filter only the first item
        var delegate = {};
        delegate.filter = function (data) {
          return data.getName() == "name0" || data.getName() == "name2" ? false : true;
        };
        delegate.bindItem = function (c, item, index) {
          c.bindProperty("", "model", null, item, index);
        };
        // set the filter
        this.__P_331_1.setDelegate(delegate);
        this.__P_331_1.setModel(this.__P_331_3);
        this.assertEquals(3, this.__P_331_0.getChildren().length);

        // check the binding
        this.assertEquals(this.__P_331_3.getItem(1), this.__P_331_0.getChildren()[0].getModel());
        this.assertEquals(this.__P_331_3.getItem(3), this.__P_331_0.getChildren()[1].getModel());
        this.assertEquals(this.__P_331_3.getItem(4), this.__P_331_0.getChildren()[2].getModel());

        // add another item
        var item = new qx.test.ListWithObject().set({
          name: "name5",
          icon: "icon5"
        });
        this.__P_331_3.push(item);
        this.assertEquals(this.__P_331_3.getItem(5), this.__P_331_0.getChildren()[3].getModel());
        item.dispose();
      },
      testModelPropertyBinding: function testModelPropertyBinding() {
        // create the controller
        this.__P_331_1 = new qx.data.controller.List(null, this.__P_331_0, "name");

        // filter only the first item
        var delegate = {};
        delegate.bindItem = function (c, item, index) {
          c.bindProperty("icon", "model", null, item, index);
        };
        // set the filter
        this.__P_331_1.setDelegate(delegate);
        this.__P_331_1.setModel(this.__P_331_3);

        // test the right set model properties
        for (var i = 0; i < this.__P_331_0.getChildren().length; i++) {
          var child = this.__P_331_0.getChildren()[i];
          this.assertEquals("icon" + i, child.getModel());
        }

        // test selection
        this.__P_331_1.getSelection().push("icon1");
        this.assertEquals("icon1", this.__P_331_0.getSelection()[0].getModel());
      },
      testModelInConverter: function testModelInConverter() {
        // create the controller
        this.__P_331_1 = new qx.data.controller.List(this.__P_331_3, this.__P_331_0, "name");
        this.__P_331_1.setLabelOptions({
          converter: function converter(value, model) {
            return model.getIcon();
          }
        });

        // add a new object after the options are set
        var obj = new qx.test.ListWithObject();
        obj.setName("namex");
        obj.setIcon("iconx");
        this.__P_331_3.push(obj);

        // check the binding
        for (var i = 0; i < this.__P_331_2.length; i++) {
          var label = this.__P_331_0.getChildren()[i].getLabel();
          this.assertEquals(this.__P_331_2[i].getIcon(), label, "Binding " + i + " is wrong!");
        }
        var label = this.__P_331_0.getChildren()[this.__P_331_2.length].getLabel();
        this.assertEquals("iconx", label, "New binding is wrong!");
      }
    }
  });
  qx.test.data.controller.ListWithObjects.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ListWithObjects.js.map?dt=1729101239069