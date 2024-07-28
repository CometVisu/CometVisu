function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
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
      __P_324_0: function __P_324_0(value) {
        return value === 0 && 1 / value < 0; // 1/-0 => -Infinity
      },
      /**
       * Check whether the (numeric) value is positive zero (+0)
       *
       * @param value {number} Value to check
       * @return {Boolean} whether the value is <code>+0</code>
       */
      __P_324_1: function __P_324_1(value) {
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
          var isNegativeZero = self.__P_324_0(e.getData());
          var isPositiveZero = self.__P_324_1(e.getOldData());
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
          var isNegativeZero = self.__P_324_0(e.getData());
          var isPositiveZero = self.__P_324_1(e.getOldData());
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
              isEqual: "__P_324_2"
            }
          },
          members: {
            __P_324_2: function __P_324_2(foo, bar) {
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
          var isNegativeZero = self.__P_324_0(e.getData());
          var isPositiveZero = self.__P_324_1(e.getOldData());
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
              isEqual: "__P_324_3"
            }
          },
          members: {
            __P_324_3: function __P_324_3(foo, bar) {
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
            __P_324_3: function __P_324_3(foo, bar) {
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
              isEqual: "__P_324_3"
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
              transform: "__P_324_4"
            },
            propTwo: {
              check: "qx.data.Array",
              nullable: true,
              event: "changePropTwo",
              transform: "__P_324_4",
              deferredInit: true
            }
          },
          members: {
            __P_324_4: function __P_324_4(value, oldValue) {
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
            setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return fn();
                  case 2:
                    resolve();
                  case 3:
                  case "end":
                    return _context.stop();
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
              return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
                return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                  while (1) switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return promiseDelay(10, function () {
                        _this.state.push("apply-one");
                      });
                    case 2:
                      return _context2.abrupt("return", "apply-one");
                    case 3:
                    case "end":
                      return _context2.stop();
                  }
                }, _callee2);
              }))();
            },
            _applyPropTwo: function _applyPropTwo(value) {
              var _this2 = this;
              return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
                return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                  while (1) switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.next = 2;
                      return promiseDelay(10, function () {
                        _this2.state.push("apply-two");
                      });
                    case 2:
                      return _context3.abrupt("return", "apply-two");
                    case 3:
                    case "end":
                      return _context3.stop();
                  }
                }, _callee3);
              }))();
            }
          }
        });
        var createTestPromise = function createTestPromise() {
          var tp = new qxl.TestPromises();
          tp.addListener("changePropOne", /*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(evt) {
              return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                while (1) switch (_context4.prev = _context4.next) {
                  case 0:
                    _context4.next = 2;
                    return promiseDelay(1, function () {
                      evt.getTarget().state.push("event-one");
                    });
                  case 2:
                    return _context4.abrupt("return", "event-one");
                  case 3:
                  case "end":
                    return _context4.stop();
                }
              }, _callee4);
            }));
            return function (_x) {
              return _ref2.apply(this, arguments);
            };
          }());
          tp.addListener("changePropTwo", /*#__PURE__*/function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(evt) {
              return _regeneratorRuntime().wrap(function _callee5$(_context5) {
                while (1) switch (_context5.prev = _context5.next) {
                  case 0:
                    _context5.next = 2;
                    return promiseDelay(1, function () {
                      evt.getTarget().state.push("event-two");
                    });
                  case 2:
                    return _context5.abrupt("return", "event-two");
                  case 3:
                  case "end":
                    return _context5.stop();
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
          var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
            "";
            var tmp, tp, result;
            return _regeneratorRuntime().wrap(function _callee6$(_context6) {
              while (1) switch (_context6.prev = _context6.next) {
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
                  _context6.next = 14;
                  return tmp;
                case 14:
                  result = _context6.sent;
                  _this3.assertTrue(result === 16);
                  _this3.assertArrayEquals(tp.state, ["apply-two", "event-two"]);
                  tp = createTestPromise();
                  tmp = tp.setPropTwoAsync(qx.Promise.resolve(18));
                  _this3.assertTrue(qx.lang.Type.isPromise(tmp));
                  _this3.assertArrayEquals(tp.state, []);
                  _context6.next = 23;
                  return tmp;
                case 23:
                  result = _context6.sent;
                  _this3.assertTrue(result === 18);
                  _this3.assertArrayEquals(tp.state, ["apply-two", "event-two"]);
                case 26:
                case "end":
                  return _context6.stop();
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

//# sourceMappingURL=Property.js.map?dt=1722153825286