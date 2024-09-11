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
      "qx.lang.Function": {},
      "qx.core.Object": {},
      "qx.core.AssertionError": {},
      "qx.event.GlobalError": {}
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
   * @ignore(qx.test.Name.*)
   */

  qx.Class.define("qx.test.lang.Function", {
    extend: qx.dev.unit.TestCase,
    members: {
      testGlobalEval: function testGlobalEval() {
        qx.lang.Function.globalEval("var JUHU=12;");
        this.assertEquals(12, window.JUHU);
        try {
          delete window.JUHU;
        } catch (e) {
          window.JUHU = null;
        }
      },
      testFunctionWrap: function testFunctionWrap() {
        var context = null;
        var result = 0;
        var add = function add(a, b) {
          context = this;
          return a + b;
        };
        context = null;
        result = add(1, 2);
        this.assertEquals(context, window);
        this.assertEquals(3, result);
        context = null;
        var boundAdd = qx.lang.Function.bind(add, this);
        result = boundAdd(1, 3);
        this.assertEquals(context, this);
        this.assertEquals(4, result);
        context = null;
        var addOne = qx.lang.Function.bind(add, this, 1);
        result = addOne(4);
        this.assertEquals(context, this);
        this.assertEquals(5, result);
      },
      testBindWithDisposedContext: function testBindWithDisposedContext() {
        if (!this.isDebugOn()) {
          return;
        }
        var obj = new qx.core.Object();
        obj.dispose();
        var callback = function callback() {};
        var bound = qx.lang.Function.bind(callback, obj);
        this.assertException(function () {
          bound();
        }, qx.core.AssertionError);
      },
      testBindWithUndefinedArguments: function testBindWithUndefinedArguments() {
        var undef;
        var callback = function callback(undef, arg) {
          this.assertTrue(arg);
        };
        var bound = qx.lang.Function.bind(callback, this, undef, true);
        bound();
      },
      testCreateDelayGlobalError: function testCreateDelayGlobalError() {
        var fail = function fail() {
          throw new Error("fail");
        };
        var onError = function onError() {
          this.resume(function () {
            qx.event.GlobalError.setErrorHandler(null, null);
          });
        };
        qx.event.GlobalError.setErrorHandler(onError, this);
        var delayed = qx.lang.Function.create(fail, {
          self: this,
          delay: 20
        });
        delayed();
        this.wait(100);
      },
      testGetName: function testGetName() {
        qx.Class.define("qx.test.Name", {
          extend: qx.core.Object,
          construct: function construct() {},
          properties: {
            prop: {}
          },
          statics: {
            foo: function foo() {}
          },
          members: {
            bar: function bar() {}
          },
          destruct: function destruct() {}
        });
        var name = new qx.test.Name();
        this.assertEquals("qx.test.Name.constructor()", qx.lang.Function.getName(qx.test.Name));
        this.assertEquals("qx.test.Name.destruct()", qx.lang.Function.getName(qx.test.Name.$$destructor));
        name.setProp(1);
        name.getProp();
        this.assertEquals("qx.test.Name.prototype.setProp()", qx.lang.Function.getName(name.setProp));
        this.assertEquals("qx.test.Name.prototype.getProp()", qx.lang.Function.getName(name.getProp));
        this.assertEquals("qx.test.Name.foo()", qx.lang.Function.getName(qx.test.Name.foo));
        this.assertEquals("qx.test.Name.prototype.bar()", qx.lang.Function.getName(name.bar));
        this.assertEquals("anonymous()", qx.lang.Function.getName(function () {}));
        function named() {}
        // the variable optimizer renames the "named" function. Only perform this
        // test if variable optimization is off.
        if (named.toString().indexOf("named") !== -1) {
          this.assertEquals("named()", qx.lang.Function.getName(named));
        }
      }
    }
  });
  qx.test.lang.Function.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Function.js.map?dt=1726089055076