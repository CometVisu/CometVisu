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
      "qx.dev.unit.MRequirements": {
        "require": true
      },
      "qx.test.data.singlevalue.TextFieldDummy": {},
      "qx.data.SingleValueBinding": {},
      "qx.core.Object": {},
      "qx.util.Validate": {},
      "qx.data.Conversion": {},
      "qx.lang.Type": {},
      "qx.core.AssertionError": {},
      "qx.data.marshal.Json": {}
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
   * @ignore(qx.test.SVB)
   * @ignore(qx.test.TwoProperties)
   * @ignore(qx.Target)
   * @ignore(qx.Test)
   */
  qx.Class.define("qx.test.data.singlevalue.Simple", {
    extend: qx.dev.unit.TestCase,
    include: qx.dev.unit.MRequirements,
    members: {
      __P_338_0: null,
      __P_338_1: null,
      setUp: function setUp() {
        // create the widgets
        this.__P_338_0 = new qx.test.data.singlevalue.TextFieldDummy();
        this.__P_338_1 = new qx.test.data.singlevalue.TextFieldDummy();
      },
      tearDown: function tearDown() {
        qx.data.SingleValueBinding.removeAllBindingsForObject(this.__P_338_0);
        qx.data.SingleValueBinding.removeAllBindingsForObject(this.__P_338_1);
        this.__P_338_0.dispose();
        this.__P_338_1.dispose();
      },
      testStringPropertyBinding: function testStringPropertyBinding() {
        qx.data.SingleValueBinding.bind(this.__P_338_0, "appearance", this.__P_338_1, "appearance");
        this.__P_338_0.setAppearance("affe");
        this.assertEquals("affe", this.__P_338_1.getAppearance(), "String binding does not work!");
        var affe = new qx.test.data.singlevalue.TextFieldDummy();
        affe.setAppearance("Jonny");
        qx.data.SingleValueBinding.bind(affe, "appearance", this.__P_338_1, "appearance");
        this.assertEquals("Jonny", this.__P_338_1.getAppearance(), "String binding does not work!");
        qx.data.SingleValueBinding.removeAllBindingsForObject(affe);
        affe.dispose();
      },
      testBooleanPropertyBinding: function testBooleanPropertyBinding() {
        qx.data.SingleValueBinding.bind(this.__P_338_0, "enabled", this.__P_338_1, "enabled");
        this.__P_338_0.setEnabled(false);
        this.assertFalse(this.__P_338_1.getEnabled(), "Boolean binding does not work!");
      },
      testNumberPropertyBinding: function testNumberPropertyBinding() {
        qx.data.SingleValueBinding.bind(this.__P_338_0, "zIndex", this.__P_338_1, "zIndex");
        this.__P_338_0.setZIndex(2456);
        this.assertEquals(2456, this.__P_338_1.getZIndex(), "Number binding does not work!");
      },
      testColorPropertyBinding: function testColorPropertyBinding() {
        qx.data.SingleValueBinding.bind(this.__P_338_0, "backgroundColor", this.__P_338_1, "backgroundColor");
        this.__P_338_0.setBackgroundColor("red");
        this.assertEquals("red", this.__P_338_1.getBackgroundColor(), "Color binding does not work!");
      },
      testWrongPropertyNames: function testWrongPropertyNames() {},
      testWrongEventType: function testWrongEventType() {},
      testDefaultConversion: function testDefaultConversion() {
        // String to number
        this.__P_338_0.setAppearance("0");
        qx.data.SingleValueBinding.bind(this.__P_338_0, "appearance", this.__P_338_1, "zIndex");
        this.__P_338_0.setAppearance("4879");
        this.assertEquals(4879, this.__P_338_1.getZIndex(), "String --> Number does not work!");

        // number to String
        this.__P_338_0.setZIndex(568);
        qx.data.SingleValueBinding.bind(this.__P_338_0, "zIndex", this.__P_338_1, "appearance");
        this.__P_338_0.setZIndex(1234);
        this.assertEquals("1234", this.__P_338_1.getAppearance(), "Number --> String does not work!");

        // boolean to string
        qx.data.SingleValueBinding.bind(this.__P_338_0, "enabled", this.__P_338_1, "appearance");
        this.__P_338_0.setEnabled(true);
        this.assertEquals("true", this.__P_338_1.getAppearance(), "Boolean --> String does not work!");

        // string to float
        var s = new qx.test.data.singlevalue.TextFieldDummy();
        s.setFloatt(0);
        qx.data.SingleValueBinding.bind(s, "floatt", this.__P_338_1, "appearance");
        s.setFloatt(13.5);
        this.assertEquals("13.5", this.__P_338_1.getAppearance(), "Float --> String does not work!");
        qx.data.SingleValueBinding.removeAllBindingsForObject(s);
        s.dispose();
      },
      testRemoveBinding: function testRemoveBinding() {
        // add a binding
        var id = qx.data.SingleValueBinding.bind(this.__P_338_0, "appearance", this.__P_338_1, "appearance");

        // set and chech the name
        this.__P_338_0.setAppearance("hans");
        this.assertEquals("hans", this.__P_338_1.getAppearance(), "String binding does not work!");

        // remove the binding
        qx.data.SingleValueBinding.removeBindingFromObject(this.__P_338_0, id);
        // set and chech the name
        this.__P_338_0.setAppearance("hans2");
        this.assertEquals("hans", this.__P_338_1.getAppearance(), "Did not remove the binding!");

        // test if the binding is not listed anymore
        var bindings = qx.data.SingleValueBinding.getAllBindingsForObject(this.__P_338_0);
        this.assertEquals(0, bindings.length, "Binding still in the registry!");

        // only in source version
      },
      testGetAllBindingsForObject: function testGetAllBindingsForObject() {
        // add two binding
        var id = qx.data.SingleValueBinding.bind(this.__P_338_0, "appearance", this.__P_338_1, "appearance");
        var id2 = qx.data.SingleValueBinding.bind(this.__P_338_0, "zIndex", this.__P_338_1, "zIndex");

        // set and chech the binding
        this.__P_338_0.setAppearance("hans");
        this.assertEquals("hans", this.__P_338_1.getAppearance(), "String binding does not work!");
        this.__P_338_0.setZIndex(89);
        this.assertEquals(89, this.__P_338_1.getZIndex(), "Number binding does not work!");

        // check the method
        var bindings = qx.data.SingleValueBinding.getAllBindingsForObject(this.__P_338_0);
        this.assertEquals(2, bindings.length, "There are more than 2 bindings!");
        this.assertEquals(id, bindings[0][0], "Binding 1 not in the array.");
        this.assertEquals(id2, bindings[1][0], "Binding 2 not in the array.");

        // check for a non existing binding
        var noBindings = qx.data.SingleValueBinding.getAllBindingsForObject(this);
        this.assertEquals(0, noBindings.length, "There are bindings for this?");
      },
      testRemoveAllBindingsForObject: function testRemoveAllBindingsForObject() {
        // add two bindings
        qx.data.SingleValueBinding.bind(this.__P_338_0, "appearance", this.__P_338_1, "appearance");
        qx.data.SingleValueBinding.bind(this.__P_338_0, "zIndex", this.__P_338_1, "zIndex");
        // set and check the binding
        this.__P_338_0.setAppearance("hans");
        this.assertEquals("hans", this.__P_338_1.getAppearance(), "String binding does not work!");
        this.__P_338_0.setZIndex(89);
        this.assertEquals(89, this.__P_338_1.getZIndex(), "Number binding does not work!");

        // remove the bindings at once
        qx.data.SingleValueBinding.removeAllBindingsForObject(this.__P_338_0);

        // set and check the binding
        this.__P_338_0.setAppearance("hans2");
        this.assertEquals("hans", this.__P_338_1.getAppearance(), "String binding not removed!");
        this.__P_338_0.setZIndex(892);
        this.assertEquals(89, this.__P_338_1.getZIndex(), "Number binding not removed!");

        // check if they are internally removed
        var bindings = qx.data.SingleValueBinding.getAllBindingsForObject(this.__P_338_0);
        this.assertEquals(0, bindings.length, "Still bindings there!");

        // check if a remove of an object without a binding works
        var o = new qx.core.Object();
        o.dispose();

        // only test in the source version
      },
      testGetAllBindings: function testGetAllBindings() {
        // add three bindings
        var id1 = qx.data.SingleValueBinding.bind(this.__P_338_0, "appearance", this.__P_338_1, "appearance");
        var id2 = qx.data.SingleValueBinding.bind(this.__P_338_0, "zIndex", this.__P_338_1, "zIndex");
        var id3 = qx.data.SingleValueBinding.bind(this.__P_338_1, "zIndex", this.__P_338_0, "zIndex");

        // get all bindings
        var allBindings = qx.data.SingleValueBinding.getAllBindings();

        // check for the binding ids
        this.assertEquals(id1, allBindings[this.__P_338_0.toHashCode()][0][0], "This id should be in!");
        this.assertEquals(id2, allBindings[this.__P_338_0.toHashCode()][1][0], "This id should be in!");
        this.assertEquals(id3, allBindings[this.__P_338_1.toHashCode()][0][0], "This id should be in!");

        // check for the length
        this.assertEquals(2, allBindings[this.__P_338_0.toHashCode()].length, "Not the right amount in the data!");
        this.assertEquals(1, allBindings[this.__P_338_1.toHashCode()].length, "Not the right amount in the data!");
      },
      testDebugStuff: function testDebugStuff() {
        // just a test if the method runs threw without an exception
        var id1 = qx.data.SingleValueBinding.bind(this.__P_338_0, "appearance", this.__P_338_1, "appearance");
        qx.data.SingleValueBinding.bind(this.__P_338_0, "zIndex", this.__P_338_1, "zIndex");
        qx.data.SingleValueBinding.bind(this.__P_338_1, "appearance", this.__P_338_0, "appearance");
        qx.data.SingleValueBinding.bind(this.__P_338_1, "zIndex", this.__P_338_0, "zIndex");
        // test the single log
        qx.data.SingleValueBinding.showBindingInLog(this.__P_338_0, id1);
      },
      testMixinSupport: function testMixinSupport() {
        // create a new Binding
        var id1 = this.__P_338_0.bind("appearance", this.__P_338_1, "appearance");
        this.__P_338_0.setAppearance("hulk");
        this.assertEquals("hulk", this.__P_338_1.getAppearance(), "String binding does not work!");

        // remove the binding
        this.__P_338_0.removeBinding(id1);
        this.__P_338_0.setAppearance("hulk2");
        this.assertEquals("hulk", this.__P_338_1.getAppearance(), "Unbinding does not work!");

        // add another two bindings
        var id1 = this.__P_338_0.bind("changeAppearance", this.__P_338_1, "appearance");
        var id2 = this.__P_338_0.bind("zIndex", this.__P_338_1, "zIndex");

        // get the current bindings
        var bindings = this.__P_338_0.getBindings();
        this.assertEquals(id1, bindings[0][0], "First binding is not there.");
        this.assertEquals(id2, bindings[1][0], "Second binding is not there.");

        // remove all bindings
        this.__P_338_0.removeAllBindings();
        var bindings = this.__P_338_0.getBindings();
        this.assertEquals(0, bindings.length, "Still bindings there?");
      },
      testDebugListenerMessages: function testDebugListenerMessages() {
        // enable debugging
        qx.data.SingleValueBinding.DEBUG_ON = true;

        // just do some bindings and invoke the changes
        qx.data.SingleValueBinding.bind(this.__P_338_0, "appearance", this.__P_338_1, "appearance");
        this.__P_338_0.setAppearance("affe");
        this.assertEquals("affe", this.__P_338_1.getAppearance(), "String binding does not work!");
        var affe = new qx.test.data.singlevalue.TextFieldDummy();
        affe.setAppearance("Jonny");
        qx.data.SingleValueBinding.bind(affe, "appearance", this.__P_338_1, "appearance");
        this.assertEquals("Jonny", this.__P_338_1.getAppearance(), "String binding does not work!");
        qx.data.SingleValueBinding.removeAllBindingsForObject(affe);
        affe.dispose();
      },
      testFallback: function testFallback() {
        // change + "name" binding
        this.__P_338_0.bind("value", this.__P_338_1, "value");
        this.__P_338_0.setValue("affe");
        this.assertEquals(this.__P_338_0.getValue(), this.__P_338_1.getValue(), "change event binding is not working.");

        // event binding
        this.__P_338_0.bind("changeZIndex", this.__P_338_1, "zIndex");
        this.__P_338_0.setZIndex(123);
        this.assertEquals(this.__P_338_0.getZIndex(), this.__P_338_1.getZIndex(), "Event binding is not working.");
      },
      testNullWithConverter: function testNullWithConverter() {
        // create a test class
        qx.Class.define("qx.Test", {
          extend: qx.core.Object,
          members: {
            __P_338_0: null,
            setA: function setA(data) {
              this.__P_338_0 = data;
            },
            getA: function getA() {
              return this.__P_338_0;
            }
          }
        });
        var t = new qx.Test();

        // define the converter
        var options = {
          converter: function converter(data) {
            if (data == null) {
              return "affe";
            }
            return data + "";
          }
        };

        // starting point
        this.__P_338_0.setZIndex(null);
        this.__P_338_0.bind("zIndex", t, "a", options);
        this.assertEquals("affe", t.getA(), "Converter will not be executed.");
        this.__P_338_0.setZIndex(10);
        this.assertEquals(this.__P_338_0.getZIndex() + "", t.getA(), "Wrong start binding.");

        // set the zIndex to null
        this.__P_338_0.setZIndex(null);
        this.assertEquals("affe", t.getA(), "Converter will not be executed.");
        t.dispose();
      },
      testCallbacksOnInitialSet: function testCallbacksOnInitialSet() {
        // create a test class
        qx.Class.define("qx.Target", {
          extend: qx.core.Object,
          properties: {
            value: {
              init: "Some String!",
              validate: qx.util.Validate.string()
            }
          }
        });
        var target = new qx.Target();

        // some test flags
        var ok = false;
        var fail = false;

        // callback methods
        var that = this;
        var options = {
          onUpdate: function onUpdate(sourceObject, targetObject, value) {
            ok = true;
            that.assertEquals(sourceObject, that.__P_338_0, "Wrong source object.");
            that.assertEquals(targetObject, target, "Wrong target object.");
            that.assertEquals(value, "affe", "Wrong value.");
          },
          onSetFail: function onSetFail() {
            fail = true;
          }
        };

        // set a valid initial value
        this.__P_338_0.setValue("affe");
        this.__P_338_0.bind("value", target, "value", options);
        this.assertEquals("affe", target.getValue(), "Binding not set anyway!");
        this.assertTrue(ok, "onUpdate not called.");
        this.assertFalse(fail, "onSetFail called?!");

        // reset the checks
        this.__P_338_0.removeAllBindings();
        ok = false;
        fail = false;

        // set an invalid initial value
        this.__P_338_0.setZIndex(10);
        this.__P_338_0.bind("zIndex", target, "value", options);
        this.assertTrue(fail, "onSetFail not called.");
        this.assertFalse(ok, "onUpdate called?!");
        target.dispose();
      },
      testConversionClass: function testConversionClass() {
        qx.Class.define("qx.test.TwoProperties", {
          extend: qx.core.Object,
          properties: {
            a: {
              event: "changeA",
              nullable: true
            },
            b: {
              event: "changeB",
              nullable: true
            }
          }
        });
        var o = new qx.test.TwoProperties();

        // number to string
        var id = qx.data.SingleValueBinding.bind(o, "a", o, "b", qx.data.Conversion.TOSTRINGOPTIONS);
        o.setA(10);
        this.assertEquals("10", o.getB(), "Number -> String");
        qx.data.SingleValueBinding.removeBindingFromObject(o, id);

        // boolean to string
        var id = qx.data.SingleValueBinding.bind(o, "a", o, "b", qx.data.Conversion.TOSTRINGOPTIONS);
        o.setA(true);
        this.assertEquals("true", o.getB(), "Boolean -> String");
        qx.data.SingleValueBinding.removeBindingFromObject(o, id);

        // date to string
        var id = qx.data.SingleValueBinding.bind(o, "a", o, "b", qx.data.Conversion.TOSTRINGOPTIONS);
        o.setA(new Date());
        this.assertTrue(qx.lang.Type.isString(o.getB()), "Date -> String");
        qx.data.SingleValueBinding.removeBindingFromObject(o, id);

        // string to number
        var id = qx.data.SingleValueBinding.bind(o, "a", o, "b", qx.data.Conversion.TONUMBEROPTIONS);
        o.setA("123");
        this.assertEquals(123, o.getB(), "String -> Number");
        qx.data.SingleValueBinding.removeBindingFromObject(o, id);

        // string to boolean
        var id = qx.data.SingleValueBinding.bind(o, "a", o, "b", qx.data.Conversion.TOBOOLEANOPTIONS);
        o.setA("123");
        this.assertEquals(true, o.getB(), "String -> Boolean");
        qx.data.SingleValueBinding.removeBindingFromObject(o, id);

        // number to boolean
        var id = qx.data.SingleValueBinding.bind(o, "a", o, "b", qx.data.Conversion.TOBOOLEANOPTIONS);
        o.setA(0);
        this.assertEquals(false, o.getB(), "Number -> Boolean");
        qx.data.SingleValueBinding.removeBindingFromObject(o, id);
        o.dispose();
      },
      testResetNotNull: function testResetNotNull() {
        qx.Class.define("qx.test.SVB", {
          extend: qx.core.Object,
          properties: {
            x: {
              nullable: true,
              init: "affe",
              event: "changeX"
            }
          }
        });
        var a = new qx.test.SVB();
        var b = new qx.test.SVB();
        a.bind("x", b, "x");
        a.setX("x");
        this.assertEquals(a.getX(), b.getX());
        a.setX(null);
        this.assertEquals(a.getX(), b.getX());
        qx.data.SingleValueBinding.removeAllBindingsForObject(a);
        qx.data.SingleValueBinding.removeAllBindingsForObject(b);
        a.dispose();
        b.dispose();
        qx.Class.undefine("qx.test.SVB");
      },
      testResetNotNullInit: function testResetNotNullInit() {
        qx.Class.define("qx.test.SVB", {
          extend: qx.core.Object,
          properties: {
            x: {
              nullable: true,
              init: "affe",
              event: "changeX"
            }
          }
        });
        var a = new qx.test.SVB();
        var b = new qx.test.SVB();
        a.setX(null);
        b.setX("x");
        qx.data.SingleValueBinding.bind(a, "x", b, "x");
        this.assertEquals(a.getX(), b.getX());
        qx.data.SingleValueBinding.removeAllBindingsForObject(a);
        qx.data.SingleValueBinding.removeAllBindingsForObject(b);
        a.dispose();
        b.dispose();
        qx.Class.undefine("qx.test.SVB");
      },
      testChangeEventMissing: function testChangeEventMissing() {
        qx.Class.define("qx.test.SVB", {
          extend: qx.core.Object,
          properties: {
            x: {
              nullable: true,
              init: "affe"
            }
          }
        });
        var a = new qx.test.SVB();
        var b = new qx.test.SVB();
        this.assertException(function () {
          qx.data.SingleValueBinding.bind(a, "x", b, "x");
        }, qx.core.AssertionError, "Binding property x of object qx.test.SVB");
        qx.data.SingleValueBinding.removeAllBindingsForObject(a);
        qx.data.SingleValueBinding.removeAllBindingsForObject(b);
        a.dispose();
        b.dispose();
        qx.Class.undefine("qx.test.SVB");
      },
      testConverterParam: function testConverterParam() {
        var self = this;
        var options = {
          converter: function converter(data, model, source, target) {
            // will be called twice (init and set)
            self.assertEquals(self.__P_338_0, source);
            self.assertEquals(self.__P_338_1, target);
            return data;
          }
        };
        qx.data.SingleValueBinding.bind(this.__P_338_0, "appearance", this.__P_338_1, "appearance", options);
        this.__P_338_0.setAppearance("affe");
        this.assertEquals("affe", this.__P_338_1.getAppearance(), "String binding does not work!");
      },
      testWrongArguments: function testWrongArguments() {
        this.require(["qx.debug"]);
        this.assertException(function () {
          qx.data.SingleValueBinding.bind(this.__P_338_0, "appearance", this.__P_338_1, undefined);
        }, qx.core.AssertionError, "");
        this.assertException(function () {
          qx.data.SingleValueBinding.bind(this.__P_338_0, "appearance", undefined, "appearance");
        }, qx.core.AssertionError, "");
        this.assertException(function () {
          qx.data.SingleValueBinding.bind(this.__P_338_0, undefined, this.__P_338_1, "appearance");
        }, qx.core.AssertionError, "");
        this.assertException(function () {
          qx.data.SingleValueBinding.bind(undefined, "appearance", this.__P_338_1, "appearance");
        }, qx.core.AssertionError, "");
      },
      testRemoveRelatedBindings: function testRemoveRelatedBindings() {
        var c = new qx.test.data.singlevalue.TextFieldDummy();

        // add three bindings
        qx.data.SingleValueBinding.bind(this.__P_338_0, "appearance", this.__P_338_1, "appearance");
        qx.data.SingleValueBinding.bind(this.__P_338_0, "zIndex", this.__P_338_1, "zIndex");
        qx.data.SingleValueBinding.bind(this.__P_338_1, "zIndex", this.__P_338_0, "zIndex");

        // add another binding to __a, which should not be affected
        qx.data.SingleValueBinding.bind(c, "appearance", this.__P_338_0, "appearance");

        // add another binding to __b, which should not be affected
        qx.data.SingleValueBinding.bind(c, "appearance", this.__P_338_1, "appearance");

        // check if the bindings are there
        var bindingsA = qx.data.SingleValueBinding.getAllBindingsForObject(this.__P_338_0);
        var bindingsB = qx.data.SingleValueBinding.getAllBindingsForObject(this.__P_338_1);
        this.assertEquals(4, bindingsA.length, "There are more than 4 bindings!");
        this.assertEquals(4, bindingsB.length, "There are more than 3 bindings!");

        // remove related bindings between __a and __b, do not affect bindings to c
        qx.data.SingleValueBinding.removeRelatedBindings(this.__P_338_0, this.__P_338_1);

        // __a object should have one binding to object c
        bindingsA = qx.data.SingleValueBinding.getAllBindingsForObject(this.__P_338_0);
        this.assertEquals(1, bindingsA.length, "There must be one binding!");
        this.assertTrue(bindingsA[0][1] === c, "Source object of the binding must be object 'c'!");

        // __b object should have one binding to object c
        bindingsB = qx.data.SingleValueBinding.getAllBindingsForObject(this.__P_338_1);
        this.assertEquals(1, bindingsB.length, "There must be one binding!");
        this.assertTrue(bindingsA[0][1] === c, "Source object of the binding must be object 'c'!");
      },
      testNonExistingSetup: function testNonExistingSetup() {
        var a = qx.data.marshal.Json.createModel({
          b: {},
          target: null
        });
        qx.data.SingleValueBinding.bind(a, "b.c", a, "target");
        this.assertNull(a.getTarget());
        a.setB(qx.data.marshal.Json.createModel({
          c: "txt"
        }));
        this.assertEquals("txt", a.getTarget());
      },
      testNonExistingSetupDeep: function testNonExistingSetupDeep() {
        var a = qx.data.marshal.Json.createModel({
          b: {
            c: {
              d: {
                e: {}
              }
            }
          },
          target: null
        });
        qx.data.SingleValueBinding.bind(a, "b.c.d.e.f", a, "target");
        this.assertNull(a.getTarget());
        a.getB().setC(qx.data.marshal.Json.createModel({
          d: {
            e: {
              f: "txt"
            }
          }
        }));
        this.assertEquals("txt", a.getTarget());
      },
      testNonExistingChange: function testNonExistingChange() {
        var a = qx.data.marshal.Json.createModel({
          b: {
            c: "txt"
          },
          bb: {},
          target: null
        });
        qx.data.SingleValueBinding.bind(a, "b.c", a, "target");
        this.assertEquals("txt", a.getTarget());
        a.setB(a.getBb());
        this.assertNull(a.getTarget());
      },
      testNonExistingChangeDeep: function testNonExistingChangeDeep() {
        var a = qx.data.marshal.Json.createModel({
          b: {
            c: {
              d: {
                e: {
                  f: "txt"
                }
              }
            }
          },
          target: null
        });
        qx.data.SingleValueBinding.bind(a, "b.c.d.e.f", a, "target");
        this.assertEquals("txt", a.getTarget());
        a.getB().setC(qx.data.marshal.Json.createModel({
          d: {
            e: {}
          }
        }));
        this.assertNull(a.getTarget());
        a.getB().setC(qx.data.marshal.Json.createModel({
          d: {}
        }));
        this.assertNull(a.getTarget());
      }
    }
  });
  qx.test.data.singlevalue.Simple.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Simple.js.map?dt=1735341777277