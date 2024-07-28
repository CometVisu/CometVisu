(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "defer": "runtime",
        "require": true
      },
      "qx.dev.unit.TestCase": {
        "require": true
      },
      "qx.Bootstrap": {
        "defer": "runtime"
      },
      "qx.core.Object": {
        "defer": "runtime"
      }
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
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * @ignore(qx.test.Construct.*, qx.test.ExtendError, qx.test.ExtendNull)
   * @ignore(qx.test.ExtendQxObject, qx.test.ExtendSuper.*, qx.test.Super.*)
   * @ignore(qx.test.ROOT, qx.test.MyClass.*, qx.test.Car, qx.test.Bmw.*)
   */
  qx.Class.define("qx.test.Bootstrap", {
    extend: qx.dev.unit.TestCase,
    members: {
      testDefineAnonymous: function testDefineAnonymous() {
        var clazz = qx.Bootstrap.define(null, {
          statics: {
            test: function test() {
              return true;
            }
          }
        });
        this.assertTrue(clazz.test());
        var clazz = qx.Bootstrap.define(null, {
          statics: {
            test2: function test2() {
              return true;
            }
          }
        });
        this.assertTrue(clazz.test2());
      },
      testClassnameProperty: function testClassnameProperty() {
        qx.Bootstrap.define("qx.test.MyClass", {
          //extend : Object,
          members: {}
        });
        var o = new qx.test.MyClass();
        this.assertEquals("qx.test.MyClass", o.classname);
        this.assertEquals("qx.test.MyClass", o.name);
        qx.Class.undefine("qx.test.MyClass");
      },
      testAlternativeRoot: function testAlternativeRoot() {
        var qq = {};
        var foobar = {};
        var myRoots = {
          qq: qq,
          foobar: foobar
        };
        qx.Bootstrap.setRoot(myRoots);
        var qqClass = qx.Bootstrap.define("qq.test.ROOT", {});
        var foobarClass = qx.Bootstrap.define("foobar.test.ROOT", {});
        var vanillebaerClass = qx.Bootstrap.define("vanillebaer.test.ROOT", {});
        this.assertEquals(qqClass, qq.test.ROOT);
        this.assertEquals(foobarClass, foobar.test.ROOT);
        this.assertEquals(vanillebaerClass, window.vanillebaer.test.ROOT);
        qx.Bootstrap.setRoot(undefined);
        qx.Class.undefine("vanillebaer.test.ROOT");
      },
      "test: merge methods of same class (statics optimization)": function test_merge_methods_of_same_class_Statics_optimization() {
        qx.Bootstrap.define("qx.test.MyClass", {
          statics: {
            methodA: function methodA() {
              return true;
            }
          }
        });
        qx.Bootstrap.define("qx.test.MyClass", {
          statics: {
            methodB: function methodB() {
              return true;
            }
          }
        });
        this.assertNotUndefined(qx.test.MyClass.methodA);
        this.assertNotUndefined(qx.test.MyClass.methodB);
        qx.Class.undefine("qx.test.MyClass");
      },
      "test: merge methods of same class (statics optimization) respect defer": function test_merge_methods_of_same_class_Statics_optimization_respect_defer() {
        qx.Bootstrap.define("qx.test.MyClass", {
          statics: {
            methodA: function methodA() {
              return true;
            },
            methodB: function methodB() {
              return true;
            }
          }
        });
        qx.Bootstrap.define("qx.test.MyClass", {
          statics: {
            methodA: null
          },
          defer: function defer(statics) {
            statics.methodA = function () {
              return true;
            };
          }
        });
        this.assertNotNull(qx.test.MyClass.methodA);
        this.assertNotUndefined(qx.test.MyClass.methodB);
        qx.Class.undefine("qx.test.MyClass");
      },
      "test: define class with constructor": function test_define_class_with_constructor() {
        var c = qx.Bootstrap.define("qx.test.Construct", {
          extend: Object,
          construct: function construct() {
            this.called = true;
          }
        });
        var obj = new qx.test.Construct();
        this.assertTrue(obj.called);
        this.assertEquals(c, qx.Bootstrap.getByName("qx.test.Construct"));
        this.assertEquals(qx.test.Construct, qx.Bootstrap.getByName("qx.test.Construct"));
        qx.Class.undefine("qx.test.Construct");
      },
      "test: define bootstrap class, which extends 'Error'": function test_define_bootstrap_class_which_extends_Error() {
        qx.Bootstrap.define("qx.test.ExtendError", {
          extend: Error
        });
        var obj = new qx.test.ExtendError();
        this.assertInstance(obj, Error);
        qx.Class.undefine("qx.test.ExtendError");
      },
      "test: extend from qx.core.Object": function test_extend_from_qxCoreObject() {
        qx.Bootstrap.define("qx.test.ExtendQxObject", {
          extend: qx.core.Object
        });
        var obj = new qx.test.ExtendQxObject();
        this.assertInstance(obj, qx.core.Object);
        obj.dispose();
        qx.Class.undefine("qx.test.ExtendQxObject");
      },
      "test: extend from null should extend Object": function test_extend_from_null_should_extend_Object() {
        qx.Bootstrap.define("qx.test.ExtendNull", {
          extend: null,
          members: {}
        });
        var obj = new qx.test.ExtendNull();
        this.assertInstance(obj, Object);
        qx.Class.undefine("qx.test.ExtendNull");
      },
      "test: extend from Bootstrap class": function test_extend_from_Bootstrap_class() {
        qx.Bootstrap.define("qx.test.Super", {
          members: {}
        });
        qx.Bootstrap.define("qx.test.ExtendSuper", {
          extend: qx.test.Super,
          members: {}
        });
        var obj = new qx.test.ExtendSuper();
        this.assertInstance(obj, Object);
        this.assertInstance(obj, qx.test.Super);
        this.assertInstance(obj, qx.test.ExtendSuper);
        qx.Class.undefine("qx.test.Super");
        qx.Class.undefine("qx.test.ExtendSuper");
      },
      "test: extended Bootstap class should append members to the prototype": function test_extended_Bootstap_class_should_append_members_to_the_prototype() {
        qx.Bootstrap.define("qx.test.Super", {
          members: {
            foo: 10,
            baz: "juhu"
          }
        });
        qx.Bootstrap.define("qx.test.ExtendSuper", {
          extend: qx.test.Super,
          members: {
            bar: "affe",
            foo: 11
          }
        });
        var obj = new qx.test.ExtendSuper();
        this.assertEquals("affe", obj.bar);
        this.assertEquals(11, obj.foo);
        this.assertEquals("juhu", obj.baz);
        this.assertEquals(11, qx.test.ExtendSuper.prototype.foo);
        this.assertEquals(10, qx.test.Super.prototype.foo);
        qx.Class.undefine("qx.test.Super");
        qx.Class.undefine("qx.test.ExtendSuper");
      },
      "test: superclass calls aka basecalls (constructor and methods)": function test_superclass_calls_aka_basecalls_Constructor_and_methods() {
        qx.Bootstrap.define("qx.test.Car", {
          construct: function construct(name) {
            this._name = name;
          },
          members: {
            startEngine: function startEngine() {
              return "start";
            },
            stopEngine: function stopEngine() {
              return "stop";
            },
            getName: function getName() {
              return this._name;
            }
          }
        });
        var car = new qx.test.Car("Audi");
        this.assertEquals("start", car.startEngine());
        this.assertEquals("stop", car.stopEngine());
        this.assertEquals("Audi", car.getName());
        qx.Bootstrap.define("qx.test.Bmw", {
          extend: qx.test.Car,
          construct: function construct(name, prize) {
            qx.test.Car.constructor.call(this, name);
          },
          members: {
            startEngine: function startEngine() {
              var ret = qx.test.Bmw.superclass.prototype.startEngine.call(this);
              return "brrr " + ret;
            },
            stopEngine: function stopEngine() {
              var ret = qx.test.Bmw.superclass.prototype.stopEngine.call(this);
              return "brrr " + ret;
            },
            getWheels: function getWheels() {
              return qx.test.Bmw.WHEELS;
            },
            getMaxSpeed: function getMaxSpeed() {
              // call base in non overridden method
              qx.test.Bmw.superclass.prototype.getMaxSpeed.call(this);
            }
          },
          statics: {
            WHEELS: 4
          }
        });
        var bmw = new qx.test.Bmw("bmw", 44000);
        this.assertEquals("bmw", bmw.getName());
        this.assertEquals("brrr start", bmw.startEngine());
        this.assertEquals("brrr stop", bmw.stopEngine());
        this.assertEquals(4, bmw.getWheels());
        if (this.isDebugOn()) {
          this.assertException(function () {
            bmw.getMaxSpeed();
          }, Error);
        }
        qx.Class.undefine("qx.test.Car");
        qx.Class.undefine("qx.test.Bmw");
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
        var boundAdd = qx.Bootstrap.bind(add, this);
        result = boundAdd(1, 3);
        this.assertEquals(context, this);
        this.assertEquals(4, result);
        context = null;
        var addOne = qx.Bootstrap.bind(add, this, 1);
        result = addOne(4);
        this.assertEquals(context, this);
        this.assertEquals(5, result);
      },
      testBindWithUndefinedArguments: function testBindWithUndefinedArguments() {
        var undef;
        var callback = function callback(undef, arg) {
          this.assertTrue(arg);
        };
        var bound = qx.Bootstrap.bind(callback, this, undef, true);
        bound();
      },
      testDefineShadowedMembers: function testDefineShadowedMembers() {
        qx.Bootstrap.define("qx.test.Construct", {
          extend: Object,
          members: {
            isPrototypeOf: 10,
            hasOwnProperty: 11,
            toLocaleString: 12,
            toString: 13,
            valueOf: 14
          }
        });
        var obj = new qx.test.Construct();
        this.assertEquals(10, obj.isPrototypeOf);
        this.assertEquals(11, obj.hasOwnProperty);
        this.assertEquals(12, obj.toLocaleString);
        this.assertEquals(13, obj.toString);
        this.assertEquals(14, obj.valueOf);
        qx.Class.undefine("qx.test.Construct");
      },
      testDefineShadowedStatics: function testDefineShadowedStatics() {
        qx.Bootstrap.define("qx.test.Construct", {
          extend: Object,
          statics: {
            isPrototypeOf: 10,
            toLocaleString: 12,
            toString: 13,
            valueOf: 14
          }
        });
        this.assertEquals(10, qx.test.Construct.isPrototypeOf);
        this.assertEquals(12, qx.test.Construct.toLocaleString);
        this.assertEquals(13, qx.test.Construct.toString);
        this.assertEquals(14, qx.test.Construct.valueOf);
        qx.Class.undefine("qx.test.Construct");
      }
    }
  });
  qx.test.Bootstrap.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Bootstrap.js.map?dt=1722153823017