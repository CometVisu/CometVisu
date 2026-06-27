function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
      "qx.core.Property": {},
      "qx.test.core.PropertyHelper": {},
      "qx.test.core.InheritanceDummy": {},
      "qx.core.Object": {
        "construct": true
      },
      "qx.Interface": {},
      "qx.data.Array": {
        "construct": true
      },
      "qx.Promise": {},
      "qx.lang.Type": {}
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
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * @ignore(qx.Node, qx.test.A, qx.test.B, qx.test.clName, qx.test.IForm)
   * @ignore(qx.TestProperty, qx.Super)
   */

  qx.Class.define("qx.test.core.Property", {
    extend: qx.dev.unit.TestCase,
    members: {
      testBasic: function testBasic() {
        this.assertNotUndefined(qx.core.Property);

        // Check instance
        var inst = new qx.test.core.PropertyHelper();
        this.assertNotUndefined(inst, "instance");

        // Public setter/getter etc.
        this.assertFunction(inst.setPublicProp, "public setter");
        this.assertFunction(inst.getPublicProp, "public getter");
        this.assertFunction(inst.resetPublicProp, "public reset");
        this.assertUndefined(inst.togglePublicProp, "public toggler");
        this.assertUndefined(inst.setThemedPublicProp, "public themed");

        // Boolean property
        this.assertFunction(inst.toggleBooleanProp, "boolean toggler");
        inst.dispose();
      },
      testBuiltinTypes: function testBuiltinTypes() {
        this.assertNotUndefined(qx.core.Property);

        // Check instance
        var inst = new qx.test.core.PropertyHelper();
        this.assertNotUndefined(inst, "instance");

        // Type checks: String
        this.assertIdentical("Hello", inst.setStringProp("Hello"), "string property, set");
        this.assertIdentical("Hello", inst.getStringProp(), "string property, get");

        // Type checks: Boolean, true
        this.assertIdentical(true, inst.setBooleanProp(true), "boolean property, set");
        this.assertIdentical(true, inst.getBooleanProp(), "boolean property, get");

        // Type checks: Boolean, false
        this.assertIdentical(false, inst.setBooleanProp(false), "boolean property, set");
        this.assertIdentical(false, inst.getBooleanProp(), "boolean property, get");

        // Type checks: Number, int
        this.assertIdentical(3, inst.setNumberProp(3), "number property, set");
        this.assertIdentical(3, inst.getNumberProp(), "number property, get");

        // Type checks: Number, float
        this.assertIdentical(3.14, inst.setNumberProp(3.14), "number property, set");
        this.assertIdentical(3.14, inst.getNumberProp(), "number property, get");

        // Type checks: Object, inline
        var obj = {};
        this.assertIdentical(obj, inst.setObjectProp(obj), "object property, set");
        this.assertIdentical(obj, inst.getObjectProp(), "object property, get");

        // Type checks: Object, new
        var obj = new Object();
        this.assertIdentical(obj, inst.setObjectProp(obj), "object property, set");
        this.assertIdentical(obj, inst.getObjectProp(), "object property, get");

        // Type checks: Array, inline
        var arr = [];
        this.assertIdentical(arr, inst.setArrayProp(arr), "array property, set");
        this.assertIdentical(arr, inst.getArrayProp(), "array property, get");

        // Type checks: Array, new
        var arr = new Array();
        this.assertIdentical(arr, inst.setArrayProp(arr), "array property, set");
        this.assertIdentical(arr, inst.getArrayProp(), "array property, get");
        inst.dispose();
      },
      testInheritance: function testInheritance() {
        this.assertNotUndefined(qx.core.Property);
        var pa = new qx.test.core.InheritanceDummy();
        var ch1 = new qx.test.core.InheritanceDummy();
        var ch2 = new qx.test.core.InheritanceDummy();
        var ch3 = new qx.test.core.InheritanceDummy();
        var chh1 = new qx.test.core.InheritanceDummy();
        var chh2 = new qx.test.core.InheritanceDummy();
        var chh3 = new qx.test.core.InheritanceDummy();
        pa.add(ch1);
        pa.add(ch2);
        pa.add(ch3);
        ch2.add(chh1);
        ch2.add(chh2);
        ch2.add(chh3);

        // Simple: Only inheritance, no local values
        this.assertTrue(pa.setEnabled(true), "a1");
        this.assertTrue(pa.getEnabled(), "a2");
        this.assertTrue(ch1.getEnabled(), "a3");
        this.assertTrue(ch2.getEnabled(), "a4");
        this.assertTrue(ch3.getEnabled(), "a5");
        this.assertTrue(chh1.getEnabled(), "a6");
        this.assertTrue(chh2.getEnabled(), "a7");
        this.assertTrue(chh3.getEnabled(), "a8");

        // Enabling local value
        this.assertFalse(ch2.setEnabled(false), "b1");
        this.assertFalse(ch2.getEnabled(), "b2");
        this.assertFalse(chh1.getEnabled(), "b3");
        this.assertFalse(chh2.getEnabled(), "b4");
        this.assertFalse(chh3.getEnabled(), "b5");

        // Reset local value
        ch2.resetEnabled();
        this.assertTrue(ch2.getEnabled(), "c2");
        this.assertTrue(chh1.getEnabled(), "c3");
        this.assertTrue(chh2.getEnabled(), "c4");
        this.assertTrue(chh3.getEnabled(), "c5");
        pa.dispose();
        ch1.dispose();
        ch2.dispose();
        ch3.dispose();
        chh1.dispose();
        chh2.dispose();
        chh3.dispose();
      },
      testParent: function testParent() {
        var pa = new qx.test.core.InheritanceDummy();
        var ch1 = new qx.test.core.InheritanceDummy();
        var ch2 = new qx.test.core.InheritanceDummy();
        var ch3 = new qx.test.core.InheritanceDummy();
        this.assertIdentical(pa.getEnabled(), null, "d1");
        this.assertIdentical(ch1.getEnabled(), null, "d2");
        this.assertIdentical(ch2.getEnabled(), null, "d3");
        this.assertIdentical(ch3.getEnabled(), null, "d4");
        pa.add(ch1);
        this.assertTrue(pa.setEnabled(true), "a1"); // ch1 gets enabled, too
        this.assertFalse(ch3.setEnabled(false), "a2");
        this.assertTrue(pa.getEnabled(), "b1");
        this.assertTrue(ch1.getEnabled(), "b2");
        this.assertIdentical(ch2.getEnabled(), null, "b3");
        this.assertFalse(ch3.getEnabled(), "b4");
        pa.add(ch2); // make ch2 enabled_ through inheritance
        pa.add(ch3); // keep ch2 disabled, user value has higher priority

        this.assertTrue(pa.getEnabled(), "c1");
        this.assertTrue(ch1.getEnabled(), "c2");
        this.assertTrue(ch2.getEnabled(), "c3");
        this.assertFalse(ch3.getEnabled(), "c4");
        pa.dispose();
        ch1.dispose();
        ch2.dispose();
        ch3.dispose();
      },
      testMultiValues: function testMultiValues() {
        this.assertNotUndefined(qx.core.Property);

        // Check instance
        var inst = new qx.test.core.PropertyHelper();
        this.assertNotUndefined(inst, "instance");

        // Check init value
        this.assertIdentical(inst.getInitProp(), "foo", "a1");
        this.assertIdentical(inst.setInitProp("hello"), "hello", "a2");
        this.assertIdentical(inst.getInitProp(), "hello", "a3");
        this.assertIdentical(inst.resetInitProp(), undefined, "a4");
        this.assertIdentical(inst.getInitProp(), "foo", "a5");

        // Check null value
        this.assertIdentical(inst.getNullProp(), "bar", "b1");
        this.assertIdentical(inst.setNullProp("hello"), "hello", "b2");
        this.assertIdentical(inst.getNullProp(), "hello", "b3");
        this.assertIdentical(inst.setNullProp(null), null, "b4");
        this.assertIdentical(inst.getNullProp(), null, "b5");
        this.assertIdentical(inst.resetNullProp(), undefined, "b6");
        this.assertIdentical(inst.getNullProp(), "bar", "b7");

        // Check appearance value
        this.assertIdentical(inst.setThemedAppearanceProp("black"), "black", "c1");
        this.assertIdentical(inst.getAppearanceProp(), "black", "c2");
        this.assertIdentical(inst.setAppearanceProp("white"), "white", "c3");
        this.assertIdentical(inst.getAppearanceProp(), "white", "c4");
        this.assertIdentical(inst.resetAppearanceProp(), undefined, "c5");
        this.assertIdentical(inst.getAppearanceProp(), "black", "c6");

        // No prop
        this.assertIdentical(inst.getNoProp(), null, "c1");
        inst.dispose();
      },
      testInitApply: function testInitApply() {
        var inst = new qx.test.core.PropertyHelper();
        this.assertNotUndefined(inst, "instance");
        this.assertUndefined(inst.lastApply);
        inst.setInitApplyProp1("juhu"); //set to init value
        this.assertJsonEquals(["juhu", "juhu"], inst.lastApply);
        inst.lastApply = undefined;
        inst.setInitApplyProp1("juhu"); // set to same value
        this.assertUndefined(inst.lastApply); // apply must not be called
        inst.lastApply = undefined;
        inst.setInitApplyProp1("kinners"); // set to new value
        this.assertJsonEquals(["kinners", "juhu"], inst.lastApply);
        inst.lastApply = undefined;
        this.assertUndefined(inst.lastApply);
        inst.setInitApplyProp2(null); //set to init value
        this.assertJsonEquals([null, null], inst.lastApply);
        inst.lastApply = undefined;
        inst.dispose();
      },
      testInit: function testInit() {
        // now test the init functions
        var self = this;
        var inst = new qx.test.core.PropertyHelper(function (inst) {
          inst.initInitApplyProp1();
          self.assertJsonEquals(["juhu", null], inst.lastApply);
          inst.lastApply = undefined;
          inst.initInitApplyProp2();
          self.assertJsonEquals([null, null], inst.lastApply);
          inst.lastApply = undefined;
        });
        this.assertNotUndefined(inst, "instance");
        inst.dispose();
      },
      testDefinesThanSubClassWithInterface: function testDefinesThanSubClassWithInterface() {
        // see bug #2162 for details
        delete qx.test.A;
        delete qx.test.B;
        delete qx.test.IForm;
        qx.Class.define("qx.test.A", {
          extend: qx.core.Object,
          properties: {
            enabled: {}
          }
        });
        var a = new qx.test.A();
        qx.Interface.define("qx.test.IForm", {
          members: {
            setEnabled: function setEnabled(value) {}
          }
        });
        qx.Class.define("qx.test.B", {
          extend: qx.test.A,
          implement: qx.test.IForm
        });
        var b = new qx.test.B();
        b.setEnabled(true);
        a.dispose();
        b.dispose();
      },
      testPropertyNamedClassname: function testPropertyNamedClassname() {
        qx.Class.define("qx.test.clName", {
          extend: qx.core.Object,
          properties: {
            classname: {}
          }
        });
        delete qx.test.clName;
      },
      testWrongPropertyDefinitions: function testWrongPropertyDefinitions() {},
      testRecursive: function testRecursive() {
        qx.Class.define("qx.Node", {
          extend: qx.core.Object,
          construct: function construct() {
            this._min = 0;
          },
          properties: {
            value: {
              apply: "applyValue"
            }
          },
          members: {
            applyValue: function applyValue(value, old) {
              if (value < this._min) {
                this.setValue(this._min);
              }
            }
          }
        });
        var root = new qx.Node();
        root.setValue(100);
        this.assertEquals(100, root.getValue());
        root.setValue(-100);
        this.assertEquals(0, root.getValue());
        root.dispose();
      },
      testEventWithInitOldData: function testEventWithInitOldData() {
        qx.Class.define("qx.TestProperty", {
          extend: qx.core.Object,
          properties: {
            prop: {
              check: "Boolean",
              init: false,
              event: "changeProp"
            }
          }
        });
        var object = new qx.TestProperty();

        // test for the default (false)
        this.assertFalse(object.getProp());

        // check for the event
        var self = this;
        this.assertEventFired(object, "changeProp", function () {
          object.setProp(true);
        }, function (e) {
          self.assertTrue(e.getData(), "Wrong data in the event!");
          self.assertFalse(e.getOldData(), "Wrong old data in the event!");
        }, "Change event not fired!");
        object.dispose();
      },
      testEventWithoutInitOldData: function testEventWithoutInitOldData() {
        qx.Class.define("qx.TestProperty", {
          extend: qx.core.Object,
          properties: {
            prop: {
              check: "Boolean",
              nullable: true,
              event: "changeProp"
            }
          }
        });
        var object = new qx.TestProperty();

        // test for the default (false)
        this.assertNull(object.getProp());

        // check for the event
        var self = this;
        this.assertEventFired(object, "changeProp", function () {
          object.setProp(true);
        }, function (e) {
          self.assertTrue(e.getData(), "Wrong data in the event!");
          self.assertNull(e.getOldData(), "Wrong old data in the event!");
        }, "Change event not fired!");
        object.dispose();
      },
      testEventWithInitAndInheritableOldData: function testEventWithInitAndInheritableOldData() {
        qx.Class.define("qx.TestProperty", {
          extend: qx.core.Object,
          properties: {
            prop: {
              check: "Boolean",
              init: false,
              inheritable: true,
              event: "changeProp"
            }
          }
        });
        var object = new qx.TestProperty();

        // test for the default (false)
        this.assertFalse(object.getProp());

        // check for the event
        var self = this;
        this.assertEventFired(object, "changeProp", function () {
          object.setProp(true);
        }, function (e) {
          self.assertTrue(e.getData(), "Wrong data in the event!");
          self.assertFalse(e.getOldData(), "Wrong old data in the event!");
        }, "Change event not fired!");
        object.dispose();
      },
      testEventWithoutInitAndInheritableOldData: function testEventWithoutInitAndInheritableOldData() {
        qx.Class.define("qx.TestProperty", {
          extend: qx.core.Object,
          properties: {
            prop: {
              check: "Boolean",
              nullable: true,
              inheritable: true,
              event: "changeProp"
            }
          }
        });
        var object = new qx.TestProperty();

        // test for the default (false)
        this.assertNull(object.getProp());

        // check for the event
        var self = this;
        this.assertEventFired(object, "changeProp", function () {
          object.setProp(true);
        }, function (e) {
          self.assertTrue(e.getData(), "Wrong data in the event!");
          self.assertNull(e.getOldData(), "Wrong old data in the event!");
        }, "Change event not fired!");
        object.dispose();
      },
      /*
      ---------------------------------------------------------------------------
         IS-EQUAL OVERRIDE TEST
      ---------------------------------------------------------------------------
      */
      /**
       * Check whether the (numeric) value is negative zero (-0)
       *
       * @param value {number} Value to check
       * @return {Boolean} whether the value is <code>-0</code>
       */
      __P_335_0: function __P_335_0(value) {
        return value === 0 && 1 / value < 0; // 1/-0 => -Infinity
      },
      /**
       * Check whether the (numeric) value is positive zero (+0)
       *
       * @param value {number} Value to check
       * @return {Boolean} whether the value is <code>+0</code>
       */
      __P_335_1: function __P_335_1(value) {
        return value === 0 && 1 / value > 0; // 1/+0 => +Infinity
      },
      testWrongIsEqualDefinitions: function testWrongIsEqualDefinitions() {},
      testIsEqualInline: function testIsEqualInline() {
        qx.Class.define("qx.TestProperty", {
          extend: qx.core.Object,
          properties: {
            prop: {
              check: "Number",
              nullable: true,
              event: "changeProp",
              isEqual: "Object.is(a, b)"
            }
          }
        });
        var object = new qx.TestProperty();
        object.setProp(0); // initialize with +0

        //
        // check for the event
        //
        var self = this;

        // No change expected
        this.assertEventNotFired(object, "changeProp", function () {
          object.setProp(0);
          object.setProp(+0);
        }, function (e) {}, "'changeProp' event fired!");

        // Change expected
        this.assertEventFired(object, "changeProp", function () {
          object.setProp(-0);
        }, function (e) {
          var isNegativeZero = self.__P_335_0(e.getData());
          var isPositiveZero = self.__P_335_1(e.getOldData());
          self.assertTrue(isNegativeZero, "Wrong data in the event!");
          self.assertTrue(isPositiveZero, "Wrong old data in the event!");
        }, "Change event not fired!");

        // @todo: check 'apply' and 'transform', too

        object.dispose();
      },
      testIsEqualFunction: function testIsEqualFunction() {
        qx.Class.define("qx.TestProperty", {
          extend: qx.core.Object,
          properties: {
            prop: {
              check: "Number",
              nullable: true,
              event: "changeProp",
              isEqual: function isEqual(x, y) {
                return Object.is(x, y);
              }
            }
          }
        });
        var object = new qx.TestProperty();
        object.setProp(0); // initialize with +0

        //
        // check for the event
        //
        var self = this;

        // No change expected
        this.assertEventNotFired(object, "changeProp", function () {
          object.setProp(0);
          object.setProp(+0);
        }, function (e) {}, "'changeProp' event fired!");

        // Change expected
        this.assertEventFired(object, "changeProp", function () {
          object.setProp(-0);
        }, function (e) {
          var isNegativeZero = self.__P_335_0(e.getData());
          var isPositiveZero = self.__P_335_1(e.getOldData());
          self.assertTrue(isNegativeZero, "Wrong data in the event!");
          self.assertTrue(isPositiveZero, "Wrong old data in the event!");
        }, "Change event not fired!");

        // @todo: check 'apply' and 'transform', too

        object.dispose();
      },
      testIsEqualMember: function testIsEqualMember() {
        qx.Class.define("qx.TestProperty", {
          extend: qx.core.Object,
          properties: {
            prop: {
              check: "Number",
              nullable: true,
              event: "changeProp",
              isEqual: "__P_335_2"
            }
          },
          members: {
            __P_335_2: function __P_335_2(foo, bar) {
              return Object.is(foo, bar);
            }
          }
        });
        var object = new qx.TestProperty();
        object.setProp(0); // initialize with +0

        //
        // check for the event
        //
        var self = this;

        // No change expected
        this.assertEventNotFired(object, "changeProp", function () {
          object.setProp(0);
          object.setProp(+0);
        }, function (e) {}, "'changeProp' event fired!");

        // Change expected
        this.assertEventFired(object, "changeProp", function () {
          object.setProp(-0);
        }, function (e) {
          var isNegativeZero = self.__P_335_0(e.getData());
          var isPositiveZero = self.__P_335_1(e.getOldData());
          self.assertTrue(isNegativeZero, "Wrong data in the event!");
          self.assertTrue(isPositiveZero, "Wrong old data in the event!");
        }, "Change event not fired!");

        // @todo: check 'apply' and 'transform', too

        object.dispose();
      },
      testIsEqualInlineContext: function testIsEqualInlineContext() {
        var context, object;
        qx.Class.define("qx.TestProperty", {
          extend: qx.core.Object,
          properties: {
            prop: {
              check: "Number",
              nullable: true,
              event: "changeProp",
              isEqual: "(this._checkCtx(a,b))"
            }
          },
          members: {
            _checkCtx: function _checkCtx(foo, bar) {
              context = this;
            }
          }
        });
        object = new qx.TestProperty().set({
          prop: 4711
        });
        this.assertIdentical(object, context);
        object.dispose();
      },
      testIsEqualFunctionContext: function testIsEqualFunctionContext() {
        var context, object;
        qx.Class.define("qx.TestProperty", {
          extend: qx.core.Object,
          properties: {
            prop: {
              check: "Number",
              nullable: true,
              event: "changeProp",
              isEqual: function isEqual(x, y) {
                context = this;
              }
            }
          }
        });
        object = new qx.TestProperty().set({
          prop: 4711
        });
        this.assertIdentical(object, context);
        object.dispose();
      },
      testIsEqualMemberContext: function testIsEqualMemberContext() {
        var context, object;
        qx.Class.define("qx.TestProperty", {
          extend: qx.core.Object,
          properties: {
            prop: {
              check: "Number",
              nullable: true,
              event: "changeProp",
              isEqual: "__P_335_3"
            }
          },
          members: {
            __P_335_3: function __P_335_3(foo, bar) {
              context = this;
            }
          }
        });
        object = new qx.TestProperty().set({
          prop: 4711
        });
        this.assertIdentical(object, context);
        object.dispose();
      },
      testIsEqualBaseClassMember: function testIsEqualBaseClassMember() {
        var context, object;
        qx.Class.define("qx.Super", {
          extend: qx.core.Object,
          members: {
            __P_335_3: function __P_335_3(foo, bar) {
              context = this;
            }
          }
        });
        qx.Class.define("qx.TestProperty", {
          extend: qx.Super,
          properties: {
            prop: {
              check: "Number",
              nullable: true,
              event: "changeProp",
              isEqual: "__P_335_3"
            }
          }
        });
        object = new qx.TestProperty().set({
          prop: 4711
        });
        this.assertIdentical(object, context);
        object.dispose();
      },
      testTransform: function testTransform() {
        qx.Class.define("qx.TestProperty", {
          extend: qx.core.Object,
          construct: function construct() {
            qx.core.Object.constructor.call(this);
            this.initPropTwo(new qx.data.Array());
          },
          properties: {
            prop: {
              check: "qx.data.Array",
              nullable: true,
              event: "changeProp",
              transform: "__P_335_4"
            },
            propTwo: {
              check: "qx.data.Array",
              nullable: true,
              event: "changePropTwo",
              transform: "__P_335_4",
              deferredInit: true
            }
          },
          members: {
            __P_335_4: function __P_335_4(value, oldValue) {
              if (oldValue === undefined) {
                return value;
              }
              if (!value) {
                oldValue.removeAll();
              } else {
                oldValue.replace(value);
              }
              return oldValue;
            }
          }
        });
        var object = new qx.TestProperty();
        var arr = new qx.data.Array();
        object.setProp(arr);
        this.assertIdentical(arr, object.getProp());
        arr.push("1");
        var arr2 = new qx.data.Array();
        arr2.push("2");
        arr2.push("3");
        object.setProp(arr2);
        this.assertIdentical(arr, object.getProp());
        this.assertArrayEquals(["2", "3"], arr.toArray());
        var savePropTwo = object.getPropTwo();
        object.setPropTwo(arr2);
        this.assertIdentical(savePropTwo, object.getPropTwo());
        this.assertArrayEquals(["2", "3"], savePropTwo.toArray());
      },
      testPromises: function testPromises() {
        var _this3 = this;
        var promiseDelay = function promiseDelay(delay, fn) {
          return new qx.Promise(function (resolve) {
            setTimeout(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
              return _regenerator().w(function (_context) {
                while (1) switch (_context.n) {
                  case 0:
                    _context.n = 1;
                    return fn();
                  case 1:
                    resolve();
                  case 2:
                    return _context.a(2);
                }
              }, _callee);
            })), delay);
          });
        };
        qx.Class.define("qxl.TestPromises", {
          extend: qx.core.Object,
          construct: function construct() {
            qx.core.Object.constructor.call(this);
            this.state = [];
          },
          properties: {
            propOne: {
              init: null,
              nullable: true,
              apply: "_applyPropOne",
              event: "changePropOne"
            },
            propTwo: {
              init: null,
              nullable: true,
              async: true,
              apply: "_applyPropTwo",
              event: "changePropTwo"
            }
          },
          members: {
            state: null,
            _applyPropOne: function _applyPropOne(value) {
              var _this = this;
              return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
                return _regenerator().w(function (_context2) {
                  while (1) switch (_context2.n) {
                    case 0:
                      _context2.n = 1;
                      return promiseDelay(10, function () {
                        _this.state.push("apply-one");
                      });
                    case 1:
                      return _context2.a(2, "apply-one");
                  }
                }, _callee2);
              }))();
            },
            _applyPropTwo: function _applyPropTwo(value) {
              var _this2 = this;
              return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
                return _regenerator().w(function (_context3) {
                  while (1) switch (_context3.n) {
                    case 0:
                      _context3.n = 1;
                      return promiseDelay(10, function () {
                        _this2.state.push("apply-two");
                      });
                    case 1:
                      return _context3.a(2, "apply-two");
                  }
                }, _callee3);
              }))();
            }
          }
        });
        var createTestPromise = function createTestPromise() {
          var tp = new qxl.TestPromises();
          tp.addListener("changePropOne", /*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(evt) {
              return _regenerator().w(function (_context4) {
                while (1) switch (_context4.n) {
                  case 0:
                    _context4.n = 1;
                    return promiseDelay(1, function () {
                      evt.getTarget().state.push("event-one");
                    });
                  case 1:
                    return _context4.a(2, "event-one");
                }
              }, _callee4);
            }));
            return function (_x) {
              return _ref2.apply(this, arguments);
            };
          }());
          tp.addListener("changePropTwo", /*#__PURE__*/function () {
            var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(evt) {
              return _regenerator().w(function (_context5) {
                while (1) switch (_context5.n) {
                  case 0:
                    _context5.n = 1;
                    return promiseDelay(1, function () {
                      evt.getTarget().state.push("event-two");
                    });
                  case 1:
                    return _context5.a(2, "event-two");
                }
              }, _callee5);
            }));
            return function (_x2) {
              return _ref3.apply(this, arguments);
            };
          }());
          return tp;
        };
        var testImpl = /*#__PURE__*/function () {
          var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6() {
            "";
            var tmp, tp, result;
            return _regenerator().w(function (_context6) {
              while (1) switch (_context6.n) {
                case 0:
                  tp = createTestPromise();
                  tmp = tp.setPropOne(12);
                  _this3.assertTrue(tmp === 12);
                  _this3.assertArrayEquals(tp.state, []);
                  tp = createTestPromise();
                  tmp = tp.setPropOne(qx.Promise.resolve(14));
                  _this3.assertTrue(qx.lang.Type.isPromise(tmp));
                  _this3.assertArrayEquals(tp.state, []);
                  tp = createTestPromise();
                  tmp = tp.setPropTwoAsync(16);
                  _this3.assertTrue(qx.lang.Type.isPromise(tmp));
                  _this3.assertArrayEquals(tp.state, []);
                  _context6.n = 1;
                  return tmp;
                case 1:
                  result = _context6.v;
                  _this3.assertTrue(result === 16);
                  _this3.assertArrayEquals(tp.state, ["apply-two", "event-two"]);
                  tp = createTestPromise();
                  tmp = tp.setPropTwoAsync(qx.Promise.resolve(18));
                  _this3.assertTrue(qx.lang.Type.isPromise(tmp));
                  _this3.assertArrayEquals(tp.state, []);
                  _context6.n = 2;
                  return tmp;
                case 2:
                  result = _context6.v;
                  _this3.assertTrue(result === 18);
                  _this3.assertArrayEquals(tp.state, ["apply-two", "event-two"]);
                case 3:
                  return _context6.a(2);
              }
            }, _callee6);
          }));
          return function testImpl() {
            return _ref4.apply(this, arguments);
          };
        }();
        testImpl().then(function () {
          return _this3.resume();
        });
        this.wait(1000);
      }
    }
  });
  qx.test.core.Property.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Property.js.map?dt=1782595061591