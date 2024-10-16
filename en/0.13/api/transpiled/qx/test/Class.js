function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "defer": "runtime",
        "require": true
      },
      "qx.dev.unit.TestCase": {
        "require": true
      },
      "qx.dev.unit.MRequirements": {
        "require": true
      },
      "qx.core.Object": {
        "defer": "runtime"
      },
      "qx.ui.core.MChildrenHandling": {},
      "qx.ui.core.Widget": {
        "defer": "runtime"
      },
      "qx.Mixin": {
        "defer": "runtime"
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.juhu": {}
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
  
  ************************************************************************ */

  /**
   * @ignore(qx.AbstractCar, qx.Bmw, qx.Car, qx.ConcreteCar, qx.Defer.*)
   * @ignore(qx.DeferFoo, qx.Empty, qx.FuncName, qx.MyClass, qx.MyMixin)
   * @ignore(qx.Single1.*, qx.test.u.u.*)
   * @ignore(qx.Insect, qx.Butterfly, qx.Firefly, qx.Grasshopper, qx.Bug)
  
   */

  qx.Class.define("qx.test.Class", {
    extend: qx.dev.unit.TestCase,
    include: [qx.dev.unit.MRequirements],
    members: {
      testAnonymous: function testAnonymous() {
        var clazz = qx.Class.define(null, {
          statics: {
            test: function test() {
              return true;
            }
          }
        });
        this.assertTrue(clazz.test());
      },
      testOverridePropertyMethod: function testOverridePropertyMethod() {
        this.require(["qx.debug"]);
        var C = qx.Class.define(null, {
          extend: qx.core.Object,
          properties: {
            prop: {
              init: "unset",
              check: "String",
              inheritable: true,
              themeable: true
            }
          }
        });
        var D = qx.Class.define(null, {
          extend: C,
          members: {
            setProp: function setProp(value) {
              return C.prototype.setProp.call(this, value + "-set");
            },
            getProp: function getProp() {
              return C.prototype.getProp.call(this) + "-get";
            }
          }
        });
        var d = new D();
        d.setProp("hello");
        this.assertEquals("hello-set-get", d.getProp());
      },
      testEmptyClass: function testEmptyClass() {
        qx.Class.define("qx.Empty", {
          extend: Object,
          construct: function construct() {}
        });
        var empty = new qx.Empty();
        this.assertEquals("object", _typeof(empty));
        this.assertTrue(empty instanceof qx.Empty);
      },
      testSuperClassCall: function testSuperClassCall() {
        qx.Class.define("qx.Car", {
          extend: qx.core.Object,
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
        var car = new qx.Car("Audi");
        this.assertEquals("start", car.startEngine());
        this.assertEquals("stop", car.stopEngine());
        this.assertEquals("Audi", car.getName());
        qx.Class.define("qx.Bmw", {
          extend: qx.Car,
          construct: function construct(name, prize) {
            qx.Car.constructor.call(this, name);
          },
          members: {
            startEngine: function startEngine() {
              var ret = qx.Bmw.superclass.prototype.startEngine.call(this);
              return "brrr " + ret;
            },
            stopEngine: function stopEngine() {
              var ret = qx.Bmw.superclass.prototype.stopEngine.call(this);
              return "brrr " + ret;
            },
            getWheels: function getWheels() {
              return qx.Bmw.WHEELS;
            },
            getMaxSpeed: function getMaxSpeed() {
              // call base in non overridden method
              qx.Bmw.superclass.prototype.getMaxSpeed.call(this);
            }
          },
          statics: {
            WHEELS: 4
          }
        });
        var bmw = new qx.Bmw("bmw", 44000);
        this.assertEquals("bmw", bmw.getName());
        this.assertEquals("brrr start", bmw.startEngine());
        this.assertEquals("brrr stop", bmw.stopEngine());
        this.assertEquals(4, bmw.getWheels());
        if (this.isDebugOn()) {
          this.assertException(function () {
            bmw.getMaxSpeed();
          }, Error);
        }
      },
      testAbstract: function testAbstract() {
        qx.Class.define("qx.AbstractCar", {
          extend: qx.core.Object,
          type: "abstract",
          construct: function construct(color) {
            this._color = color;
          },
          members: {
            startEngine: function startEngine() {}
          }
        });

        // instantiating abstract classes should fail
        if (this.isDebugOn()) {
          this.assertException(function () {
            new qx.AbstractCar("blue");
          }, Error, new RegExp("The class .* is abstract"));
        }

        // check if subclasses of abstract classes work
        qx.Class.define("qx.ConcreteCar", {
          extend: qx.AbstractCar,
          construct: function construct(color) {
            qx.AbstractCar.constructor.call(this, color);
          }
        });
        var car = new qx.ConcreteCar("red");
        this.assertNotUndefined(car);
        this.assertEquals("red", car._color);
      },
      testSingleton: function testSingleton() {
        qx.Class.define("qx.Single1", {
          extend: Object,
          type: "singleton",
          construct: function construct() {
            this._date = new Date().toString();
          }
        });

        // direct instantiation should fail
        if (this.isDebugOn()) {
          this.assertException(function () {
            new qx.Single1();
          }, Error, new RegExp("The class .* is a singleton"));
        }
        this.assertEquals(qx.Single1.getInstance()._date, qx.Single1.getInstance()._date, "getInstance should always return the same object!");
        qx.Class.undefine("qx.Single1");
      },
      testInvalidImplicitStatic: function testInvalidImplicitStatic() {
        // different error message if no "extend" key was configured
        if (this.isDebugOn()) {
          this.assertException(function () {
            qx.Class.define("qx.MyClass1", {
              include: [qx.ui.core.MChildrenHandling]
            });
          }, Error, new RegExp("Assumed static class.*"));
        }
      },
      testEnvironment: function testEnvironment() {
        qx.Class.define("qx.Setting1", {
          environment: {
            "qx.juhu": "kinners"
          }
        });
        this.assertEquals("kinners", qx.core.Environment.get("qx.juhu"));
        qx.Class.undefine("qx.Setting1");
      },
      testDefer: function testDefer() {
        // this is BAD practice, don't code like this!
        qx.Class.define("qx.Defer", {
          extend: qx.core.Object,
          defer: function defer(statics, members, properties) {
            statics.FOO = 12;
            statics.sayHello = function () {
              return "Hello";
            };
            members.sayJuhu = function () {
              return "Juhu";
            };
            properties.add("color", {});
          }
        });
        this.assertEquals(12, qx.Defer.FOO);
        this.assertEquals("Hello", qx.Defer.sayHello());
        var defer = new qx.Defer();
        this.assertEquals("Juhu", defer.sayJuhu());
        defer.setColor("red");
        this.assertEquals("red", defer.getColor());
        defer.dispose();
      },
      testSubClassOf: function testSubClassOf() {
        this.assertTrue(qx.Class.isSubClassOf(qx.ui.core.Widget, qx.core.Object));
      },
      testClassUndefine: function testClassUndefine() {
        qx.Class.define("qx.test.u.u.Undefine", {
          extend: qx.core.Object
        });
        this.assertNotUndefined(qx.test.u.u.Undefine);
        qx.Class.undefine("qx.test.u.u.Undefine");
        this.assertUndefined(qx.test["u"]);
      },
      testPatch: function testPatch() {
        qx.Mixin.define("qx.MyMixin", {
          properties: {
            property: {
              init: "p"
            }
          },
          members: {
            getP: function getP() {
              return "p";
            }
          }
        });
        qx.Class.define("qx.MyClass", {
          extend: qx.core.Object
        });
        qx.Class.patch(qx.MyClass, qx.MyMixin);
        var o = new qx.MyClass();

        // just check of the properties are ok
        this.assertEquals("p", o.getProperty());
        this.assertEquals("p", o.getP());

        // clean up
        o.dispose();
        qx.Class.undefine("qx.MyClass");
        qx.Class.undefine("qx.MyMixin");
      },
      testPatchWithConstructor: function testPatchWithConstructor() {
        qx.Mixin.define("qx.MyMixin", {
          construct: function construct() {
            this.__P_299_0 = "p";
          },
          properties: {
            property: {
              init: "p"
            }
          },
          members: {
            getP: function getP() {
              return this.__P_299_0;
            }
          }
        });
        qx.Class.define("qx.MyClass", {
          extend: qx.core.Object
        });
        qx.Class.patch(qx.MyClass, qx.MyMixin);
        var o = new qx.MyClass();

        // just check of the properties are ok
        this.assertEquals("p", o.getProperty());
        this.assertEquals("p", o.getP());

        // clean up
        o.dispose();
        qx.Class.undefine("qx.MyClass");
        qx.Class.undefine("qx.MyMixin");
      },
      testInclude: function testInclude() {
        qx.Mixin.define("qx.MyMixin", {
          properties: {
            property: {
              init: "p"
            }
          },
          members: {
            getP: function getP() {
              return "p";
            }
          }
        });
        qx.Class.define("qx.MyClass", {
          extend: qx.core.Object
        });
        qx.Class.include(qx.MyClass, qx.MyMixin);
        var o = new qx.MyClass();

        // just check of the properties are ok
        this.assertEquals("p", o.getProperty());
        this.assertEquals("p", o.getP());

        // clean up
        o.dispose();
        qx.Class.undefine("qx.MyClass");
        qx.Class.undefine("qx.MyMixin");
      },
      testIncludeWithConstructor: function testIncludeWithConstructor() {
        qx.Mixin.define("qx.MyMixin", {
          construct: function construct() {
            this.__P_299_0 = "p";
          },
          properties: {
            property: {
              init: "p"
            }
          },
          members: {
            getP: function getP() {
              return this.__P_299_0;
            }
          }
        });
        qx.Class.define("qx.MyClass", {
          extend: qx.core.Object
        });
        qx.Class.include(qx.MyClass, qx.MyMixin);
        var o = new qx.MyClass();

        // just check of the properties are ok
        this.assertEquals("p", o.getProperty());
        this.assertEquals("p", o.getP());

        // clean up
        o.dispose();
        qx.Class.undefine("qx.MyClass");
        qx.Class.undefine("qx.MyMixin");
      },
      testSubclasses: function testSubclasses() {
        qx.Class.define("qx.Insect", {
          extend: qx.core.Object
        });
        qx.Class.define("qx.Butterfly", {
          extend: qx.Insect
        });
        qx.Class.define("qx.Firefly", {
          extend: qx.Insect
        });
        qx.Class.define("qx.Grasshopper", {
          extend: qx.Insect
        });
        var subclasses = qx.Class.getSubclasses(qx.Insect);

        // we should find 3 subclasses of qx.Insect
        this.assertEquals(Object.keys(subclasses).length, 3);

        // qx.Firefly should be a subclass of qx.Insect
        this.assertEquals(subclasses["qx.Firefly"], qx.Firefly);
        subclasses = qx.Class.getSubclasses(qx.Firefly);

        // there should be no subclasses for qx.Firefly
        this.assertEquals(Object.keys(subclasses).length, 0);
        subclasses = qx.Class.getSubclasses(qx.Bug);

        // there should be no class qx.Bug
        this.assertEquals(subclasses, null);
      },
      "test: instantiate class in defer and access property": function test_instantiate_class_in_defer_and_access_property() {
        var self = this;
        qx.Class.define("qx.DeferFoo", {
          extend: qx.core.Object,
          properties: {
            juhu: {}
          },
          defer: function defer() {
            var df = new qx.DeferFoo();
            df.setJuhu("23");
            self.assertEquals("23", df.getJuhu());
            df.dispose();
          }
        });
        qx.Class.undefine("qx.DeferFoo");
      }
    }
  });
  qx.test.Class.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Class.js.map?dt=1729101236270