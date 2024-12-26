(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.dev.unit.TestCase": {
        "construct": true,
        "require": true
      },
      "qx.core.Object": {},
      "qx.data.Array": {
        "construct": true
      },
      "qx.test.data.singlevalue.TextFieldDummy": {},
      "qx.data.SingleValueBinding": {},
      "qx.log.Logger": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * @ignore(qx.test.data.singlevalue.Array_MultiBinding)
   */

  /**
   * Test-Class for testing the single value binding
   */
  qx.Class.define("qx.test.data.singlevalue.Array", {
    extend: qx.dev.unit.TestCase,
    construct: function construct() {
      qx.dev.unit.TestCase.constructor.call(this);

      // define a test class
      qx.Class.define("qx.test.data.singlevalue.Array_MultiBinding", {
        extend: qx.core.Object,
        construct: function construct() {
          this.setArray(new qx.data.Array(["one", "two", "three"]));
        },
        destruct: function destruct() {
          this.getArray().dispose();
          var children = this.getChildren();
          if (children != null) {
            children.dispose();
          }
        },
        properties: {
          child: {
            check: "qx.test.data.singlevalue.Array_MultiBinding",
            event: "changeChild",
            nullable: true
          },
          children: {
            check: "qx.data.Array",
            event: "changeChildren",
            nullable: true,
            init: null
          },
          name: {
            check: "String",
            event: "changeName",
            nullable: true
          },
          array: {
            init: null,
            event: "changeArray"
          }
        }
      });
    },
    members: {
      __P_336_0: null,
      __P_336_1: null,
      __P_336_2: null,
      __P_336_3: null,
      setUp: function setUp() {
        this.__P_336_0 = new qx.test.data.singlevalue.Array_MultiBinding().set({
          name: "a",
          children: new qx.data.Array()
        });
        this.__P_336_1 = new qx.test.data.singlevalue.Array_MultiBinding().set({
          name: "b1",
          children: new qx.data.Array()
        });
        this.__P_336_2 = new qx.test.data.singlevalue.Array_MultiBinding().set({
          name: "b2",
          children: new qx.data.Array()
        });
        this.__P_336_3 = new qx.test.data.singlevalue.TextFieldDummy();
      },
      tearDown: function tearDown() {
        this.__P_336_1.dispose();
        this.__P_336_2.dispose();
        this.__P_336_0.dispose();
        this.__P_336_3.dispose();
      },
      testChangeItem: function testChangeItem() {
        // bind the first element of the array
        qx.data.SingleValueBinding.bind(this.__P_336_0, "array[0]", this.__P_336_3, "value");

        // check the binding
        this.assertEquals("one", this.__P_336_3.getValue(), "Array[0] binding does not work!");

        // change the value
        this.__P_336_0.getArray().setItem(0, "ONE");
        this.assertEquals("ONE", this.__P_336_3.getValue(), "Array[0] binding does not work!");
      },
      testChangeArray: function testChangeArray() {
        // bind the first element of the array
        qx.data.SingleValueBinding.bind(this.__P_336_0, "array[0]", this.__P_336_3, "value");

        // change the array itself
        this.__P_336_0.getArray().dispose();
        this.__P_336_0.setArray(new qx.data.Array(1, 2, 3));
        qx.log.Logger.debug(this.__P_336_0.getArray().getItem(0));
        // check the binding
        this.assertEquals("1", this.__P_336_3.getValue(), "Changing the array does not work!");
      },
      testLast: function testLast() {
        // bind the last element
        qx.data.SingleValueBinding.bind(this.__P_336_0, "array[last]", this.__P_336_3, "value");

        // check the binding
        this.assertEquals("three", this.__P_336_3.getValue(), "Array[last] binding does not work!");

        // change the value
        this.__P_336_0.getArray().setItem(2, "THREE");
        this.assertEquals("THREE", this.__P_336_3.getValue(), "Array[last] binding does not work!");
      },
      testPushPop: function testPushPop() {
        // bind the last element
        qx.data.SingleValueBinding.bind(this.__P_336_0, "array[last]", this.__P_336_3, "value");

        // check the binding
        this.assertEquals("three", this.__P_336_3.getValue(), "Array[last] binding does not work!");

        // pop the last element
        this.__P_336_0.getArray().pop();
        // check the binding
        this.assertEquals("two", this.__P_336_3.getValue(), "Array[last] binding does not work!");

        // push a new element to the end
        this.__P_336_0.getArray().push("new");
        // check the binding
        this.assertEquals("new", this.__P_336_3.getValue(), "Array[last] binding does not work!");
      },
      testShiftUnshift: function testShiftUnshift() {
        // bind the last element
        qx.data.SingleValueBinding.bind(this.__P_336_0, "array[0]", this.__P_336_3, "value");

        // check the binding
        this.assertEquals("one", this.__P_336_3.getValue(), "Array[last] binding does not work!");

        // pop the last element
        this.__P_336_0.getArray().shift();
        // check the binding
        this.assertEquals("two", this.__P_336_3.getValue(), "Array[last] binding does not work!");

        // push a new element to the end
        this.__P_336_0.getArray().unshift("new");
        // check the binding
        this.assertEquals("new", this.__P_336_3.getValue(), "Array[last] binding does not work!");
      },
      testChildArray: function testChildArray() {
        // create the objects
        this.__P_336_0.setChild(this.__P_336_1);
        this.__P_336_1.getArray().dispose();
        this.__P_336_1.setArray(new qx.data.Array("eins", "zwei", "drei"));
        this.__P_336_2.getArray().dispose();
        this.__P_336_2.setArray(new qx.data.Array("1", "2", "3"));

        // bind the last element
        qx.data.SingleValueBinding.bind(this.__P_336_0, "child.array[0]", this.__P_336_3, "value");

        // check the binding
        this.assertEquals("eins", this.__P_336_3.getValue(), "child.array[0] binding does not work!");

        // change the child
        this.__P_336_0.setChild(this.__P_336_2);
        // check the binding
        this.assertEquals("1", this.__P_336_3.getValue(), "child.array[0] binding does not work!");
        this.__P_336_1.getArray().dispose();
        this.__P_336_2.getArray().dispose();
      },
      testChildren: function testChildren() {
        // create the objects
        this.__P_336_0.getChildren().push(this.__P_336_1);
        this.__P_336_0.getChildren().push(this.__P_336_2);

        // bind the element
        qx.data.SingleValueBinding.bind(this.__P_336_0, "children[0].name", this.__P_336_3, "value");

        // check the binding
        this.assertEquals("b1", this.__P_336_3.getValue(), "children[0].name binding does not work!");

        // remove the first element
        this.__P_336_0.getChildren().shift();
        // check the binding
        this.assertEquals("b2", this.__P_336_3.getValue(), "children[0].name binding does not work!");

        // change the name of b2
        this.__P_336_2.setName("AFFE");
        // check the binding
        this.assertEquals("AFFE", this.__P_336_3.getValue(), "children[0].name binding does not work!");
      },
      test2Arrays: function test2Arrays() {
        // create the objects
        this.__P_336_0.getChildren().push(this.__P_336_1);
        this.__P_336_1.getChildren().push(this.__P_336_2);

        // bind the element
        qx.data.SingleValueBinding.bind(this.__P_336_0, "children[0].children[0].name", this.__P_336_3, "value");

        // check the binding
        this.assertEquals("b2", this.__P_336_3.getValue(), "children[0].children[0].name binding does not work!");

        // rename the last element
        this.__P_336_2.setName("OHJE");
        // check the binding
        this.assertEquals("OHJE", this.__P_336_3.getValue(), "children[0].name binding does not work!");
      },
      testSplice: function testSplice() {
        // bind the first element
        qx.data.SingleValueBinding.bind(this.__P_336_0, "array[0]", this.__P_336_3, "value");

        // remove the first and add "eins" at position 0
        var array = this.__P_336_0.getArray().splice(0, 1, "eins");

        // check the binding
        this.assertEquals("eins", this.__P_336_3.getValue(), "Array[last] binding does not work!");
        array.dispose();
      },
      testWrongInput: function testWrongInput() {
        var a = this.__P_336_0;
        var label = this.__P_336_3;

        // bind a senseless value
        this.assertException(function () {
          qx.data.SingleValueBinding.bind(a, "array[affe]", label, "value");
        }, Error, null, "Affe not an array value.");

        // bind empty array
        this.assertException(function () {
          qx.data.SingleValueBinding.bind(a, "array[]", label, "value");
        }, Error, null, "'' not an array value.");

        // bind 2 arrays
        this.assertException(function () {
          qx.data.SingleValueBinding.bind(a, "array[0][0]", label, "value");
        }, Error, null, "array[][] not an array value.");

        // bind an float
        this.assertException(function () {
          qx.data.SingleValueBinding.bind(a, "array[1.5]", label, "value");
        }, Error, null, "1.5 not an array value.");

        // bind strange value
        this.assertException(function () {
          qx.data.SingleValueBinding.bind(a, "array[[affe]]", label, "value");
        }, Error, null, "'[[affe]]' not an array value.");

        // test map in array
        this.assertException(function () {
          qx.data.SingleValueBinding.bind(a, "array[{name: 'a'}]", label, "value");
        }, Error, null, "'[affe]' not an array value.");

        // test null in the array
        this.assertException(function () {
          qx.data.SingleValueBinding.bind(a, "array[null]", label, "value");
        }, Error, null, "'null' not an array value.");
      },
      testLateBinding: function testLateBinding() {
        // create the precondition
        this.__P_336_0.getArray().dispose();
        this.__P_336_0.setArray(new qx.data.Array());
        // bind the last element
        qx.data.SingleValueBinding.bind(this.__P_336_0, "array[last]", this.__P_336_3, "value");

        // check the binding
        this.assertNull(this.__P_336_3.getValue(), "Late binding does not work!");

        // set a value and check it
        this.__P_336_0.getArray().push("1");
        this.assertEquals("1", this.__P_336_3.getValue(), "Late binding does not work!");

        // set another value and check it
        this.__P_336_0.getArray().push("2");
        this.assertEquals("2", this.__P_336_3.getValue(), "Late binding does not work!");
      },
      testRemoveArrayItem: function testRemoveArrayItem() {
        // bind the last element
        qx.data.SingleValueBinding.bind(this.__P_336_0, "array[last]", this.__P_336_3, "value");

        // check the binding
        this.assertEquals("three", this.__P_336_3.getValue(), "Array[last] binding does not work!");

        // pop all 3 elements
        this.__P_336_0.getArray().pop();
        this.__P_336_0.getArray().pop();
        this.__P_336_0.getArray().pop();

        // check the binding
        this.assertNull(this.__P_336_3.getValue(), "Array[last] binding does not work!");
      },
      testBidirectional: function testBidirectional() {
        // two way binding
        // model.name <-- bind --> model.child.array[0]

        // create model: model.child.array
        var model = new qx.test.data.singlevalue.Array_MultiBinding();
        model.setChild(new qx.test.data.singlevalue.Array_MultiBinding());

        // set up the two way binding
        model.bind("name", model, "child.array[0]");
        model.bind("child.array[0]", model, "name");

        // set the value of the textfield
        model.setName("affe");
        this.assertEquals("affe", model.getChild().getArray().getItem(0), "affe not set in the model array.");

        // set the value in the model
        model.getChild().getArray().setItem(0, "stadtaffe");
        this.assertEquals("stadtaffe", model.getName(), "stadtaffe not set in the model.");

        // set the models name to null
        model.setName(null);
        this.assertEquals(null, model.getChild().getArray().getItem(0), "model array not reseted to initial.");

        // set the model array item to null
        model.getChild().getArray().setItem(0, null);
        this.assertEquals(null, model.getName(), "model not reseted.");
        model.getChild().dispose();
        model.dispose();
      },
      testDirect: function testDirect() {
        // bind the first element of the array
        qx.data.SingleValueBinding.bind(this.__P_336_0.getArray(), "[0]", this.__P_336_3, "value");

        // check the binding
        this.assertEquals("one", this.__P_336_3.getValue(), "[0] binding does not work!");

        // change the value
        this.__P_336_0.getArray().setItem(0, "ONE");
        this.assertEquals("ONE", this.__P_336_3.getValue(), "[0] binding does not work!");
      },
      testDirectTarget: function testDirectTarget() {
        this.__P_336_3.setValue("affe");
        // bind the first element of the array
        qx.data.SingleValueBinding.bind(this.__P_336_3, "value", this.__P_336_0.getArray(), "[0]");

        // check the binding
        this.assertEquals("affe", this.__P_336_0.getArray().getItem(0), "[0] binding does not work!");

        // change the value
        this.__P_336_3.setValue("AFFE");
        this.assertEquals("AFFE", this.__P_336_0.getArray().getItem(0), "[0] binding does not work!");
      },
      testChildrenDirect: function testChildrenDirect() {
        // create the objects
        this.__P_336_0.getChildren().push(this.__P_336_1);
        this.__P_336_0.getChildren().push(this.__P_336_2);

        // bind the element
        qx.data.SingleValueBinding.bind(this.__P_336_0.getChildren(), "[0].name", this.__P_336_3, "value");

        // check the binding
        this.assertEquals("b1", this.__P_336_3.getValue(), "[0].name binding does not work!");

        // remove the first element
        this.__P_336_0.getChildren().shift();
        // check the binding
        this.assertEquals("b2", this.__P_336_3.getValue(), "[0].name binding does not work!");

        // change the name of b2
        this.__P_336_2.setName("AFFE");
        // check the binding
        this.assertEquals("AFFE", this.__P_336_3.getValue(), "[0].name binding does not work!");
      },
      testTargetChildren: function testTargetChildren() {
        // create the objects
        this.__P_336_0.getChildren().push(this.__P_336_1);
        this.__P_336_0.getChildren().push(this.__P_336_2);

        // bind the element
        this.__P_336_3.setValue("l");
        qx.data.SingleValueBinding.bind(this.__P_336_3, "value", this.__P_336_0.getChildren(), "[0].name");

        // check the binding
        this.assertEquals("l", this.__P_336_0.getChildren().getItem(0).getName(), "[0].name binding does not work!");

        // remove the first element
        this.__P_336_0.getChildren().shift();
        // check the binding
        this.assertEquals("l", this.__P_336_0.getChildren().getItem(0).getName(), "[0].name binding does not work!");
      }
    }
  });
  qx.test.data.singlevalue.Array.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Array.js.map?dt=1735222427443