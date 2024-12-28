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
      "qx.dev.unit.MMock": {
        "require": true
      },
      "qx.core.Object": {},
      "qx.test.data.singlevalue.TextFieldDummy": {},
      "qx.data.Array": {},
      "qx.data.marshal.Json": {},
      "qx.data.SingleValueBinding": {}
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
   * Test-Class for testing the single value binding
   *
   * @ignore(qx.test.MultiBinding)
   */
  qx.Class.define("qx.test.data.singlevalue.Deep", {
    extend: qx.dev.unit.TestCase,
    include: [qx.dev.unit.MMock],
    construct: function construct() {
      qx.dev.unit.TestCase.constructor.call(this);

      // define a test class
      qx.Class.define("qx.test.MultiBinding", {
        extend: qx.core.Object,
        properties: {
          child: {
            check: "qx.test.MultiBinding",
            event: "changeChild",
            nullable: true
          },
          childWithout: {
            check: "qx.test.MultiBinding",
            nullable: true
          },
          name: {
            check: "String",
            nullable: true,
            init: "Juhu",
            event: "changeName"
          },
          array: {
            init: null,
            event: "changeArray"
          },
          lab: {
            event: "changeLable"
          }
        },
        destruct: function destruct() {
          if (this.getLab()) {
            this.getLab().dispose();
          }
          if (this.getArray()) {
            this.getArray().dispose();
          }
        }
      });
    },
    members: {
      __P_337_0: null,
      __P_337_1: null,
      __P_337_2: null,
      __P_337_3: null,
      setUp: function setUp() {
        this.__P_337_0 = new qx.test.MultiBinding().set({
          name: "a",
          lab: new qx.test.data.singlevalue.TextFieldDummy(""),
          array: new qx.data.Array(["one", "two", "three"])
        });
        this.__P_337_1 = new qx.test.MultiBinding().set({
          name: "b1",
          lab: new qx.test.data.singlevalue.TextFieldDummy(""),
          array: new qx.data.Array(["one", "two", "three"])
        });
        this.__P_337_2 = new qx.test.MultiBinding().set({
          name: "b2",
          lab: new qx.test.data.singlevalue.TextFieldDummy(""),
          array: new qx.data.Array(["one", "two", "three"])
        });
        this.__P_337_3 = new qx.test.data.singlevalue.TextFieldDummy();
      },
      tearDown: function tearDown() {
        this.__P_337_1.dispose();
        this.__P_337_2.dispose();
        this.__P_337_0.dispose();
        this.__P_337_3.dispose();
      },
      testConverterChainBroken: function testConverterChainBroken() {
        var m = qx.data.marshal.Json.createModel({
          a: {
            a: 1
          },
          b: 2
        });
        var called = 0;
        m.bind("a.a", m, "b", {
          converter: function converter(data) {
            called++;
            return 3;
          }
        });

        // check the init values
        this.assertEquals(1, called);
        this.assertEquals(3, m.getB());

        // set the binding leaf to null
        m.getA().setA(null);
        this.assertEquals(2, called);
        this.assertEquals(3, m.getB());

        // set the binding root to null
        m.setA(null);
        this.assertEquals(3, called);
        this.assertEquals(3, m.getB());
        m.dispose();
      },
      testConverterChainBrokenInitialNull: function testConverterChainBrokenInitialNull() {
        var m = qx.data.marshal.Json.createModel({
          a: null
        });
        var t = qx.data.marshal.Json.createModel({
          a: null
        });
        var spy = this.spy(function () {
          return 123;
        });
        m.bind("a.b", t, "a", {
          converter: spy
        });
        this.assertCalledOnce(spy);
        this.assertCalledWith(spy, undefined, undefined, m, t);
        this.assertEquals(123, t.getA());
        m.dispose();
        t.dispose();
      },
      testDepthOf2: function testDepthOf2() {
        // create a hierarchy
        // a --> b1
        this.__P_337_0.setChild(this.__P_337_1);

        // create the binding
        // a --> b1 --> label
        qx.data.SingleValueBinding.bind(this.__P_337_0, "child.name", this.__P_337_3, "value");

        // just set the name of the second component
        this.__P_337_1.setName("B1");
        this.assertEquals("B1", this.__P_337_3.getValue(), "Deep binding does not work with updating the first parameter.");

        // change the second component
        // a --> b2 --> label
        this.__P_337_0.setChild(this.__P_337_2);
        this.assertEquals("b2", this.__P_337_3.getValue(), "Deep binding does not work with updating the first parameter.");

        // check for the null value
        // a --> null
        this.__P_337_0.setChild(null);
        this.assertNull(this.__P_337_3.getValue(), "Binding does not work with null.");
      },
      testDepthOf3: function testDepthOf3(attribute) {
        // create a hierarchy
        var c1 = new qx.test.MultiBinding().set({
          name: "c1"
        });
        var c2 = new qx.test.MultiBinding().set({
          name: "c2"
        });

        // a --> b1 --> c1 --> label
        //       b2 --> c2
        this.__P_337_0.setChild(this.__P_337_1);
        this.__P_337_1.setChild(c1);
        this.__P_337_2.setChild(c2);

        // create the binding
        qx.data.SingleValueBinding.bind(this.__P_337_0, "child.child.name", this.__P_337_3, "value");

        // just set the name of the last component
        c1.setName("C1");
        this.assertEquals("C1", this.__P_337_3.getValue(), "Deep binding does not work with updating the third parameter.");

        // change the middle child
        // a --> b2 --> c2 --> label
        this.__P_337_0.setChild(this.__P_337_2);
        this.assertEquals("c2", this.__P_337_3.getValue(), "Deep binding does not work with updating the second parameter.");

        // set the middle child to null
        // a --> null
        this.__P_337_0.setChild(null);
        this.assertNull(this.__P_337_3.getValue(), "Deep binding does not work with first null child.");

        // set only two childs
        // a --> b1 --> null
        this.__P_337_1.setChild(null);
        this.__P_337_0.setChild(this.__P_337_1);
        this.assertNull(this.__P_337_3.getValue(), "Deep binding does not work with second null child.");

        // set the childs in a row
        // a --> b1 --> c1 --> label
        this.__P_337_1.setChild(c1);
        this.assertEquals("C1", this.__P_337_3.getValue(), "Deep binding does not work with updating the third parameter.");
      },
      testDepthOf5: function testDepthOf5(attribute) {
        // create a hierarchy
        var c = new qx.test.MultiBinding().set({
          name: "c"
        });
        var d = new qx.test.MultiBinding().set({
          name: "d"
        });
        var e = new qx.test.MultiBinding().set({
          name: "e"
        });

        // a --> b1 --> c --> d --> e --> label
        this.__P_337_0.setChild(this.__P_337_1);
        this.__P_337_1.setChild(c);
        c.setChild(d);
        d.setChild(e);

        // create the binding
        qx.data.SingleValueBinding.bind(this.__P_337_0, "child.child.child.child.name", this.__P_337_3, "value");

        // test if the binding did work
        this.assertEquals("e", this.__P_337_3.getValue(), "Deep binding does not work with updating the third parameter.");
      },
      testWrongDeep: function testWrongDeep() {
        // create a hierarchy
        this.__P_337_0.setChild(this.__P_337_1);
        var a = this.__P_337_0;
        var label = this.__P_337_3;

        // only in source version
      },
      testSingle: function testSingle() {
        // set only one property in the chain
        qx.data.SingleValueBinding.bind(this.__P_337_0, "name", this.__P_337_3, "value");

        // chech the initial value
        this.assertEquals("a", this.__P_337_3.getValue(), "Single property names don't work!");

        // check the binding
        this.__P_337_0.setName("A");
        this.assertEquals("A", this.__P_337_3.getValue(), "Single property names don't work!");
      },
      testDebug: function testDebug(attribute) {
        // build the structure
        this.__P_337_0.setChild(this.__P_337_1);
        // bind the stuff together
        var id = qx.data.SingleValueBinding.bind(this.__P_337_0, "child.name", this.__P_337_3, "value");

        // log this binding in the console
        qx.data.SingleValueBinding.showBindingInLog(this.__P_337_0, id);
      },
      testRemove: function testRemove() {
        // build the structure
        this.__P_337_0.setChild(this.__P_337_1);
        // bind the stuff together
        var id = qx.data.SingleValueBinding.bind(this.__P_337_0, "child.name", this.__P_337_3, "value");

        // check the binding
        this.__P_337_1.setName("A");
        this.assertEquals("A", this.__P_337_3.getValue(), "Single property names don't work!");

        // remove the binding
        qx.data.SingleValueBinding.removeBindingFromObject(this.__P_337_0, id);

        // check the binding again
        this.__P_337_0.setName("A2");
        this.assertEquals("A", this.__P_337_3.getValue(), "Removing does not work!");

        // smoke Test for the remove
        qx.data.SingleValueBinding.bind(this.__P_337_0, "child.name", this.__P_337_3, "value");
        qx.data.SingleValueBinding.bind(this.__P_337_0, "child.name", this.__P_337_3, "value");
        qx.data.SingleValueBinding.bind(this.__P_337_0, "child.name", this.__P_337_3, "value");
      },
      testArrayDeep: function testArrayDeep() {
        this.__P_337_0.getArray().dispose();
        this.__P_337_0.setArray(new qx.data.Array([this.__P_337_1]));
        this.__P_337_1.setChild(this.__P_337_2);
        this.__P_337_2.setChild(this.__P_337_1);
        qx.data.SingleValueBinding.bind(this.__P_337_0, "array[0].child.name", this.__P_337_3, "value");
        this.assertEquals("b2", this.__P_337_3.getValue(), "Deep binding does not work.");
        this.__P_337_0.getArray().pop();
        this.assertNull(this.__P_337_3.getValue(), "Deep binding does not work.");
        this.__P_337_0.getArray().push(this.__P_337_2);
        this.assertEquals("b1", this.__P_337_3.getValue(), "Deep binding does not work.");
        this.__P_337_1.setName("B1");
        this.assertEquals("B1", this.__P_337_3.getValue(), "Deep binding does not work.");
      },
      testDeepTarget: function testDeepTarget() {
        qx.data.SingleValueBinding.bind(this.__P_337_0, "name", this.__P_337_1, "lab.value");
        this.assertEquals("a", this.__P_337_1.getLab().getValue(), "Deep binding on the target does not work.");
      },
      testDeepTarget2: function testDeepTarget2() {
        this.__P_337_2.setChild(this.__P_337_1);
        qx.data.SingleValueBinding.bind(this.__P_337_0, "name", this.__P_337_2, "child.lab.value");
        this.assertEquals("a", this.__P_337_1.getLab().getValue(), "Deep binding on the target does not work.");
      },
      testDeepTargetNull: function testDeepTargetNull() {
        qx.data.SingleValueBinding.bind(this.__P_337_0, "name", this.__P_337_2, "child.lab.value");
        this.assertEquals("", this.__P_337_1.getLab().getValue(), "Deep binding on the target does not work.");
      },
      testDeepTargetArray: function testDeepTargetArray() {
        this.__P_337_0.getArray().dispose();
        this.__P_337_0.setArray(new qx.data.Array([this.__P_337_1]));
        qx.data.SingleValueBinding.bind(this.__P_337_0, "name", this.__P_337_0, "array[0].lab.value");
        this.assertEquals("a", this.__P_337_1.getLab().getValue(), "Deep binding on the target does not work.");
      },
      testDeepTargetArrayLast: function testDeepTargetArrayLast() {
        this.__P_337_0.getArray().dispose();
        this.__P_337_0.setArray(new qx.data.Array([this.__P_337_1]));
        qx.data.SingleValueBinding.bind(this.__P_337_0, "name", this.__P_337_0, "array[last].lab.value");
        this.assertEquals("a", this.__P_337_1.getLab().getValue(), "Deep binding on the target does not work.");
      },
      testDeepTargetChange: function testDeepTargetChange() {
        var oldLabel = this.__P_337_1.getLab();
        var newLabel = new qx.test.data.singlevalue.TextFieldDummy("x");
        qx.data.SingleValueBinding.bind(this.__P_337_0, "name", this.__P_337_1, "lab.value");
        this.__P_337_1.setLab(newLabel);
        this.assertEquals("a", this.__P_337_1.getLab().getValue());
        this.__P_337_0.setName("l");
        this.assertEquals("a", oldLabel.getValue());
        this.assertEquals("l", this.__P_337_1.getLab().getValue());
        newLabel.dispose();
        oldLabel.dispose();
      },
      testDeepTargetChangeConverter: function testDeepTargetChangeConverter() {
        var oldLabel = this.__P_337_1.getLab();
        var newLabel = new qx.test.data.singlevalue.TextFieldDummy("x");
        qx.data.SingleValueBinding.bind(this.__P_337_0, "name", this.__P_337_1, "lab.value", {
          converter: function converter(data) {
            return data + "...";
          }
        });
        this.__P_337_1.setLab(newLabel);
        this.assertEquals("a...", this.__P_337_1.getLab().getValue());
        this.__P_337_0.setName("l");
        this.assertEquals("a...", oldLabel.getValue());
        this.assertEquals("l...", this.__P_337_1.getLab().getValue());
        newLabel.dispose();
        oldLabel.dispose();
      },
      testDeepTargetChange3: function testDeepTargetChange3() {
        // set up the target chain
        this.__P_337_0.setChild(this.__P_337_1);
        this.__P_337_1.setChild(this.__P_337_2);
        this.__P_337_2.setChild(this.__P_337_1);
        qx.data.SingleValueBinding.bind(this.__P_337_3, "value", this.__P_337_0, "child.child.lab.value");

        // check the default set
        this.__P_337_3.setValue("123");
        this.assertEquals("123", this.__P_337_2.getLab().getValue());

        // change the child of __a
        this.__P_337_0.setChild(this.__P_337_2);
        this.assertEquals("123", this.__P_337_1.getLab().getValue());

        // set another label value
        this.__P_337_3.setValue("456");
        this.assertEquals("123", this.__P_337_2.getLab().getValue());
        this.assertEquals("456", this.__P_337_1.getLab().getValue());
      },
      testDeepTargetChange3Remove: function testDeepTargetChange3Remove() {
        // set up the target chain
        this.__P_337_0.setChild(this.__P_337_1);
        this.__P_337_1.setChild(this.__P_337_2);
        this.__P_337_2.setChild(this.__P_337_1);
        var id = qx.data.SingleValueBinding.bind(this.__P_337_3, "value", this.__P_337_0, "child.child.lab.value");

        // check the default set
        this.__P_337_3.setValue("123");
        this.assertEquals("123", this.__P_337_2.getLab().getValue(), "0");
        qx.data.SingleValueBinding.removeBindingFromObject(this.__P_337_3, id);

        // change the child of __a
        this.__P_337_0.setChild(this.__P_337_2);
        this.assertEquals("", this.__P_337_1.getLab().getValue(), "listener still there");

        // set another label value
        this.__P_337_3.setValue("456");
        this.assertEquals("123", this.__P_337_2.getLab().getValue(), "1");
        this.assertEquals("", this.__P_337_1.getLab().getValue(), "2");
      },
      testDeepTargetChangeArray: function testDeepTargetChangeArray() {
        qx.data.SingleValueBinding.bind(this.__P_337_3, "value", this.__P_337_0, "array[0]");
        this.__P_337_3.setValue("123");
        this.assertEquals("123", this.__P_337_0.getArray().getItem(0));
        var newArray = new qx.data.Array([0, 1, 0]);
        var oldArray = this.__P_337_0.getArray();
        this.__P_337_0.setArray(newArray);
        this.assertEquals("123", this.__P_337_0.getArray().getItem(0), "initial set");
        this.__P_337_3.setValue("456");
        this.assertEquals("456", newArray.getItem(0));
        this.assertEquals("123", oldArray.getItem(0));
        oldArray.dispose();
        newArray.dispose();
      },
      testDeepTargetChangeArrayLast: function testDeepTargetChangeArrayLast() {
        qx.data.SingleValueBinding.bind(this.__P_337_3, "value", this.__P_337_0, "array[last]");
        this.__P_337_3.setValue("123");
        this.assertEquals("123", this.__P_337_0.getArray().getItem(2));
        var newArray = new qx.data.Array([0, 1, 0]);
        var oldArray = this.__P_337_0.getArray();
        this.__P_337_0.setArray(newArray);
        this.assertEquals("123", this.__P_337_0.getArray().getItem(2), "initial set");
        this.__P_337_3.setValue("456");
        this.assertEquals("456", newArray.getItem(2));
        this.assertEquals("123", oldArray.getItem(2));
        oldArray.dispose();
        newArray.dispose();
      },
      testDeepTargetChange3Array: function testDeepTargetChange3Array() {
        // set up the target chain
        this.__P_337_0.setChild(this.__P_337_1);
        this.__P_337_1.setChild(this.__P_337_2);
        this.__P_337_2.setChild(this.__P_337_1);
        qx.data.SingleValueBinding.bind(this.__P_337_3, "value", this.__P_337_0, "child.child.array[0]");

        // check the default set
        this.__P_337_3.setValue("123");
        this.assertEquals("123", this.__P_337_2.getArray().getItem(0));

        // change the child of __a
        this.__P_337_0.setChild(this.__P_337_2);
        this.assertEquals("123", this.__P_337_1.getArray().getItem(0));

        // set another label value
        this.__P_337_3.setValue("456");
        this.assertEquals("456", this.__P_337_1.getArray().getItem(0));
        this.assertEquals("123", this.__P_337_2.getArray().getItem(0), "binding still exists");
      },
      testDeepTargetChangeMiddleArray: function testDeepTargetChangeMiddleArray() {
        var oldArray = this.__P_337_0.getArray();
        var array = new qx.data.Array([this.__P_337_1, this.__P_337_2]);
        this.__P_337_0.setArray(array);
        oldArray.dispose();
        qx.data.SingleValueBinding.bind(this.__P_337_3, "value", this.__P_337_0, "array[0].lab.value");
        this.__P_337_3.setValue("123");
        this.assertEquals("123", this.__P_337_1.getLab().getValue());
        array.reverse();
        this.assertEquals("123", this.__P_337_2.getLab().getValue());
        this.__P_337_3.setValue("456");
        this.assertEquals("456", this.__P_337_2.getLab().getValue());
        this.assertEquals("123", this.__P_337_1.getLab().getValue());
      },
      testDeepTargetChangeMiddleArrayLast: function testDeepTargetChangeMiddleArrayLast() {
        var oldArray = this.__P_337_0.getArray();
        var array = new qx.data.Array([this.__P_337_2, this.__P_337_1]);
        this.__P_337_0.setArray(array);
        oldArray.dispose();
        qx.data.SingleValueBinding.bind(this.__P_337_3, "value", this.__P_337_0, "array[last].lab.value");
        this.__P_337_3.setValue("123");
        this.assertEquals("123", this.__P_337_1.getLab().getValue());
        array.reverse();
        this.assertEquals("123", this.__P_337_2.getLab().getValue());
        this.__P_337_3.setValue("456");
        this.assertEquals("456", this.__P_337_2.getLab().getValue());
        this.assertEquals("123", this.__P_337_1.getLab().getValue());
      },
      testDeepTargetChangeWithoutEvent: function testDeepTargetChangeWithoutEvent() {
        this.__P_337_0.setChildWithout(this.__P_337_1);
        qx.data.SingleValueBinding.bind(this.__P_337_3, "value", this.__P_337_0, "childWithout.name");
        this.__P_337_3.setValue("123");
        this.assertEquals("123", this.__P_337_1.getName());
        this.__P_337_0.setChildWithout(this.__P_337_2);
        this.assertEquals("b2", this.__P_337_2.getName());
        this.__P_337_3.setValue("456");
        this.assertEquals("456", this.__P_337_2.getName());
        this.assertEquals("123", this.__P_337_1.getName());
      },
      testDeepTargetChangeWithoutEvent3: function testDeepTargetChangeWithoutEvent3() {
        this.__P_337_0.setChild(this.__P_337_1);
        this.__P_337_1.setChildWithout(this.__P_337_2);
        this.__P_337_2.setChildWithout(this.__P_337_1);
        qx.data.SingleValueBinding.bind(this.__P_337_3, "value", this.__P_337_0, "child.childWithout.name");
        this.__P_337_3.setValue("123");
        this.assertEquals("123", this.__P_337_2.getName());
        this.__P_337_0.setChild(this.__P_337_2);
        this.assertEquals("123", this.__P_337_1.getName());
        this.__P_337_2.setChildWithout(this.__P_337_0);
        this.assertEquals("a", this.__P_337_0.getName());
        this.__P_337_3.setValue("456");
        this.assertEquals("456", this.__P_337_0.getName());
        this.assertEquals("123", this.__P_337_1.getName());
      },
      testDeepTargetChange3ResetNotNull: function testDeepTargetChange3ResetNotNull() {
        // set up the target chain
        this.__P_337_0.setChild(this.__P_337_1);
        this.__P_337_1.setChild(this.__P_337_2);
        this.__P_337_2.setChild(this.__P_337_1);
        this.__P_337_0.setName(null);
        qx.data.SingleValueBinding.bind(this.__P_337_0, "name", this.__P_337_0, "child.child.name");
        this.assertEquals(this.__P_337_0.getName(), this.__P_337_2.getName());
        this.__P_337_0.setName("nnnnn");
        this.assertEquals(this.__P_337_0.getName(), this.__P_337_2.getName());
        this.__P_337_0.setName(null);
        this.assertEquals(this.__P_337_0.getName(), this.__P_337_2.getName());
      },
      /**
       * Remove a deep binding that has a class in its binding that does not have a property in the chain.
       */
      testRemoveIncompleteBinding: function testRemoveIncompleteBinding() {
        var source = qx.data.marshal.Json.createModel({
          a: null
        });
        var a = qx.data.marshal.Json.createModel({}); // a class that does not contain a property with name "b"
        var target = qx.data.marshal.Json.createModel({
          result: null
        });
        try {
          source.bind("a.b", target, "result");
          source.setA(a);
          source.removeAllBindings();
        } catch (e) {
          this.error(e);
          this.assertTrue(false, e.message);
        }
        source = qx.data.marshal.Json.createModel({
          a: null
        });
        source.setA(a);
        try {
          source.bind("a.b", target, "result");
          source.removeAllBindings();
        } catch (e) {
          this.error(e);
          this.assertTrue(false, e.message);
        }
      }
    }
  });
  qx.test.data.singlevalue.Deep.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Deep.js.map?dt=1735383860423