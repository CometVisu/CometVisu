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
      "qx.Mixin": {},
      "qx.core.Object": {},
      "qx.test.testclasses.BaseClassIncluded": {},
      "qx.test.testclasses.BaseClassPatched": {},
      "qx.test.testclasses.BaseClassBoth": {},
      "qx.test.testclasses.DerivedClassIncluded": {},
      "qx.test.testclasses.DerivedClassPatched": {},
      "qx.test.testclasses.DerivedClassBoth": {},
      "qx.test.testclasses.RootClass": {}
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
   * @ignore(qx.ExtendUseLog1, qx.Mix, qx.MLogger, qx.MMix1, qx.MMix1.foo)
   * @ignore(qx.MMix2, qx.MPatch, qx.Patch1, qx.Patch2, qx.UseLog1, qx.UseLog2)
   * @ignore(qx.UseLog3)
   */

  qx.Class.define("qx.test.Mixin", {
    extend: qx.dev.unit.TestCase,
    members: {
      testMixinBasic: function testMixinBasic() {
        qx.Mixin.define("qx.MMix1", {
          statics: {
            data: null,
            foo: function foo() {
              return "foo";
            }
          },
          members: {
            bar: function bar() {
              return "bar";
            }
          },
          properties: {
            color: {}
          }
        });
        qx.Mixin.define("qx.MMix2", {
          members: {
            bar: function bar() {
              return "bar";
            }
          }
        });
        qx.Class.define("qx.Mix", {
          extend: Object,
          include: qx.MMix1,
          construct: function construct() {}
        });
        this.assertEquals("foo", qx.MMix1.foo());
        this.assertEquals("bar", new qx.Mix().bar());
        var mix = new qx.Mix();
        mix.setColor("red");
        this.assertEquals("red", mix.getColor());
        if (this.isDebugOn()) {
          this.assertException(function () {
            qx.Class.define("qx.Mix1", {
              extend: Object,
              include: [qx.MMix1, qx.MMix2],
              construct: function construct() {}
            });
          }, Error, "Overwriting member", "t1");
          this.assertException(function () {
            qx.Class.define("qx.Mix2", {
              extend: Object,
              include: qx.MMix1,
              construct: function construct() {},
              members: {
                bar: function bar() {
                  return "bar";
                }
              }
            });
          }, Error, "Overwriting member", "t2");
        }

        // this is allowed
        qx.Class.define("qx.Mix3", {
          extend: Object,
          include: qx.MMix1,
          construct: function construct() {},
          statics: {
            foo: function foo() {
              return "foo";
            }
          }
        });
        if (this.isDebugOn()) {
          this.assertException(function () {
            qx.Class.define("qx.Mix4", {
              extend: Object,
              include: qx.MMix1,
              construct: function construct() {},
              properties: {
                color: {}
              }
            });
          }, Error, "already has a property", "t3");
        }
      },
      testInclude: function testInclude() {
        qx.Mixin.define("qx.MLogger", {
          members: {
            log: function log(msg) {
              return msg;
            }
          }
        });

        // normal usage
        qx.Class.define("qx.UseLog1", {
          extend: Object,
          construct: function construct() {}
        });
        qx.Class.include(qx.UseLog1, qx.MLogger);
        this.assertEquals("Juhu", new qx.UseLog1().log("Juhu"));

        // not allowed to overwrite!
        qx.Class.define("qx.UseLog2", {
          extend: Object,
          construct: function construct() {},
          members: {
            log: function log() {
              return "foo";
            }
          }
        });
        if (this.isDebugOn()) {
          this.assertException(function () {
            qx.Class.include(qx.UseLog2, qx.MLogger);
          }, Error, "Overwriting member");
        }

        // allowed to overwrite!
        qx.Class.define("qx.UseLog3", {
          extend: Object,
          construct: function construct() {},
          members: {
            log: function log() {
              return "foo";
            }
          }
        });
        this.assertEquals("foo", new qx.UseLog3().log("Juhu"));
        qx.Class.patch(qx.UseLog3, qx.MLogger);
        this.assertEquals("Juhu", new qx.UseLog3().log("Juhu"));

        // extended classes must have included methods as well
        qx.Class.define("qx.ExtendUseLog1", {
          extend: qx.UseLog1
        });
        this.assertEquals("Juhu", new qx.ExtendUseLog1().log("Juhu"));
      },
      testPatchOverwritten: function testPatchOverwritten() {
        qx.Class.define("qx.Patch1", {
          extend: qx.core.Object,
          members: {
            sayJuhu: function sayJuhu() {
              return "Juhu";
            },
            foo: function foo() {
              return "foo";
            }
          }
        });
        qx.Class.define("qx.Patch2", {
          extend: qx.core.Object,
          members: {
            sayJuhu: function sayJuhu() {
              return "Huhu";
            },
            foo: function foo() {
              return "bar";
            }
          }
        });
        qx.Mixin.define("qx.MPatch", {
          members: {
            sayJuhu: function sayJuhu() {
              return qx.Mixin.baseClassMethod(this.constructor, qx.MPatch, "sayJuhu").call(this) + " Kinners";
            },
            /** @lint ignoreUndeclaredPrivates(__b) */foo: function foo(dontRecurs) {
              var s = "";
              if (!dontRecurs) {
                this.__P_301_0 = new qx.Patch2();
                s += "++" + this.__P_301_0.foo(true) + "__";
              }
              s += qx.Mixin.baseClassMethod(this.constructor, qx.MPatch, "foo").call(this);
              return s;
            }
          }
        });
        if (this.isDebugOn()) {
          this.assertException(function () {
            qx.Class.include(qx.Patch1, qx.MPatch);
          }, Error, new RegExp('Overwriting member ".*" of Class ".*" is not allowed!'));
        }
        qx.Class.patch(qx.Patch1, qx.MPatch);
        qx.Class.patch(qx.Patch2, qx.MPatch);
        var o = new qx.Patch1();
        this.assertEquals("Juhu Kinners", o.sayJuhu());
        o.dispose();
        var o = new qx.Patch2();
        this.assertEquals("Huhu Kinners", o.sayJuhu());
        o.dispose();

        // very special case with recursive calls from different classes to
        // the mixin member
        var o = new qx.Patch1();
        this.assertEquals("++bar__foo", o.foo());
        o.__P_301_0.dispose();
        o.dispose();
      },
      testPatchConstructors: function testPatchConstructors() {
        this.assertTrue(qx.test.testclasses.BaseClassIncluded.constructor === qx.test.testclasses.BaseClassIncluded);
        this.assertTrue(qx.test.testclasses.BaseClassPatched.constructor === qx.test.testclasses.BaseClassPatched);
        this.assertTrue(qx.test.testclasses.BaseClassBoth.constructor === qx.test.testclasses.BaseClassBoth);
        this.assertTrue(qx.test.testclasses.DerivedClassIncluded.constructor === qx.test.testclasses.DerivedClassIncluded);
        this.assertTrue(qx.test.testclasses.DerivedClassPatched.constructor === qx.test.testclasses.DerivedClassPatched);
        this.assertTrue(qx.test.testclasses.DerivedClassBoth.constructor === qx.test.testclasses.DerivedClassBoth);
        var objBaseIncluded = new qx.test.testclasses.BaseClassIncluded();
        this.assertArrayEquals(["root", "base", "mixin-one", "mixin-two"], objBaseIncluded.state);
        this.assertEquals("mixin-one", objBaseIncluded.getSomething());
        var objIncluded = new qx.test.testclasses.DerivedClassIncluded();
        this.assertArrayEquals(["root", "base", "mixin-one", "mixin-two", "derived"], objIncluded.state);
        this.assertEquals("mixin-one:derived", objIncluded.getSomething());
        var objBasePatched = new qx.test.testclasses.BaseClassPatched();
        this.assertArrayEquals(["root", "base", "mixin-one", "mixin-two"], objBasePatched.state);
        this.assertEquals("mixin-one", objBasePatched.getSomething());
        var objPatched = new qx.test.testclasses.DerivedClassPatched();
        this.assertArrayEquals(["root", "base", "mixin-one", "mixin-two", "derived"], objPatched.state);
        this.assertEquals("mixin-one:derived", objPatched.getSomething());
        var objBaseBoth = new qx.test.testclasses.BaseClassBoth();
        this.assertArrayEquals(["root", "base", "mixin-one", "mixin-two"], objBaseBoth.state);
        this.assertEquals("mixin-one", objBaseBoth.getSomething());
        var objBoth = new qx.test.testclasses.DerivedClassBoth();
        this.assertArrayEquals(["root", "base", "mixin-one", "mixin-two", "derived"], objBoth.state);
        this.assertEquals("mixin-one:derived", objBoth.getSomething());
        this.assertTrue(objBaseIncluded.constructor === qx.test.testclasses.BaseClassIncluded);
        this.assertTrue(objIncluded.constructor === qx.test.testclasses.DerivedClassIncluded);
        this.assertTrue(objBasePatched.constructor === qx.test.testclasses.BaseClassPatched);
        this.assertTrue(objPatched.constructor === qx.test.testclasses.DerivedClassPatched);
        this.assertTrue(objBaseBoth.constructor === qx.test.testclasses.BaseClassBoth);
        this.assertTrue(objBoth.constructor === qx.test.testclasses.DerivedClassBoth);
        this.assertTrue(objBaseIncluded instanceof qx.test.testclasses.BaseClassIncluded);
        this.assertTrue(objIncluded instanceof qx.test.testclasses.DerivedClassIncluded);
        this.assertTrue(objIncluded instanceof qx.test.testclasses.BaseClassIncluded);
        this.assertTrue(objBasePatched instanceof qx.test.testclasses.BaseClassPatched);
        this.assertTrue(objPatched instanceof qx.test.testclasses.BaseClassPatched);
        this.assertTrue(objPatched instanceof qx.test.testclasses.DerivedClassPatched);
        this.assertTrue(objBaseBoth instanceof qx.test.testclasses.BaseClassBoth);
        this.assertTrue(objBoth instanceof qx.test.testclasses.BaseClassBoth);
        this.assertTrue(objBoth instanceof qx.test.testclasses.DerivedClassBoth);
        this.assertTrue(objBaseIncluded instanceof qx.test.testclasses.RootClass);
        this.assertTrue(objBaseBoth instanceof qx.test.testclasses.RootClass);
        this.assertTrue(objPatched instanceof qx.test.testclasses.RootClass);
      },
      testPatchDouble: function testPatchDouble() {
        qx.Class.define("qx.Patch_1", {
          extend: qx.core.Object,
          members: {
            sayJuhu: function sayJuhu() {
              return "Juhu 1";
            }
          }
        });
        qx.Class.define("qx.Patch_2", {
          extend: qx.core.Object,
          members: {
            sayJuhu: function sayJuhu() {
              return "Juhu 2";
            }
          }
        });
        qx.Mixin.define("qx.MPatch", {
          members: {
            sayJuhu: function sayJuhu() {
              return qx.Mixin.baseClassMethod(this.constructor, qx.MPatch, "sayJuhu").call(this) + " Mixin";
            }
          }
        });
        qx.Class.patch(qx.Patch_1, qx.MPatch);
        qx.Class.patch(qx.Patch_2, qx.MPatch);
        var o = new qx.Patch_1();
        this.assertEquals("Juhu 1 Mixin", o.sayJuhu());
        o.dispose();
        var o = new qx.Patch_2();
        this.assertEquals("Juhu 2 Mixin", o.sayJuhu());
        o.dispose();
      },
      testPatchOverwrittenDerived: function testPatchOverwrittenDerived() {
        qx.Class.define("qx.Patch", {
          extend: qx.core.Object,
          members: {
            sayJuhu: function sayJuhu() {
              return "Juhu";
            }
          }
        });
        qx.Class.define("qx.PatchDerived", {
          extend: qx.Patch,
          members: {
            sayJuhu: function sayJuhu() {
              return qx.PatchDerived.superclass.prototype.sayJuhu.call(this) + " Derived";
            }
          }
        });
        qx.Mixin.define("qx.MPatch", {
          members: {
            sayJuhu: function sayJuhu() {
              return qx.Mixin.baseClassMethod(this.constructor, qx.MPatch, "sayJuhu").call(this) + " Mixin";
            }
          }
        });
        qx.Class.patch(qx.PatchDerived, qx.MPatch);
        var o = new qx.PatchDerived();
        this.assertEquals("Juhu Derived Mixin", o.sayJuhu());
        o.dispose();
      },
      testPatchOverwrittenDerivedInBaseClass: function testPatchOverwrittenDerivedInBaseClass() {
        qx.Mixin.define("qx.MPatch", {
          members: {
            sayJuhu: function sayJuhu() {
              return qx.Mixin.baseClassMethod(this.constructor, qx.MPatch, "sayJuhu").call(this) + " Mixin";
            }
          }
        });
        qx.Class.define("qx.Patch", {
          extend: qx.core.Object,
          members: {
            sayJuhu: function sayJuhu() {
              return "Juhu";
            }
          }
        });
        qx.Class.define("qx.PatchDerived", {
          extend: qx.Patch,
          members: {
            sayJuhu: function sayJuhu() {
              return qx.PatchDerived.superclass.prototype.sayJuhu.call(this) + " Derived";
            }
          }
        });
        qx.Class.patch(qx.Patch, qx.MPatch);
        var o = new qx.Patch();
        this.assertEquals("Juhu Mixin", o.sayJuhu());
        o.dispose();
        var o = new qx.PatchDerived();
        this.assertEquals("Juhu Mixin Derived", o.sayJuhu());
        o.dispose();
      },
      testPatchMultiOverwrittenDerived: function testPatchMultiOverwrittenDerived() {
        qx.Class.define("qx.A", {
          extend: qx.core.Object,
          members: {
            sayJuhu: function sayJuhu() {
              return "A";
            }
          }
        });
        qx.Class.define("qx.B", {
          extend: qx.A,
          members: {
            sayJuhu: function sayJuhu() {
              return qx.B.superclass.prototype.sayJuhu.call(this) + " B";
            }
          }
        });
        qx.Class.define("qx.C", {
          extend: qx.B,
          members: {
            sayJuhu: function sayJuhu() {
              return qx.C.superclass.prototype.sayJuhu.call(this) + " C";
            }
          }
        });
        qx.Mixin.define("qx.MA", {
          members: {
            sayJuhu: function sayJuhu() {
              return qx.Mixin.baseClassMethod(this.constructor, qx.MA, "sayJuhu").call(this) + " MA";
            }
          }
        });
        qx.Mixin.define("qx.MB", {
          members: {
            sayJuhu: function sayJuhu() {
              return qx.Mixin.baseClassMethod(this.constructor, qx.MB, "sayJuhu").call(this) + " MB";
            }
          }
        });
        qx.Mixin.define("qx.MC", {
          members: {
            sayJuhu: function sayJuhu() {
              return qx.Mixin.baseClassMethod(this.constructor, qx.MC, "sayJuhu").call(this) + " MC";
            }
          }
        });
        qx.Class.patch(qx.A, qx.MA);
        qx.Class.patch(qx.B, qx.MB);
        qx.Class.patch(qx.C, qx.MC);
        var o = new qx.C();
        this.assertEquals("A MA B MB C MC", o.sayJuhu());
        o.dispose();
      },
      testDoubleMixin: function testDoubleMixin() {
        qx.Class.define("qx.D", {
          extend: qx.core.Object,
          members: {
            sayJuhu: function sayJuhu() {
              return "Double";
            }
          }
        });
        qx.Mixin.define("qx.MDA", {
          members: {
            sayJuhu: function sayJuhu() {
              return qx.Mixin.baseClassMethod(this.constructor, qx.MDA, "sayJuhu").call(this) + " MA";
            }
          }
        });
        qx.Mixin.define("qx.MDB", {
          members: {
            sayJuhu: function sayJuhu() {
              return qx.Mixin.baseClassMethod(this.constructor, qx.MDB, "sayJuhu").call(this) + " MB";
            }
          }
        });
        qx.Class.patch(qx.D, qx.MDA);
        qx.Class.patch(qx.D, qx.MDB);
        var o = new qx.D();
        this.assertEquals("Double MA MB", o.sayJuhu());
        o.dispose();
      },
      testDoubleMixinWithSuperStruct: function testDoubleMixinWithSuperStruct() {
        qx.Class.define("qx.E1", {
          extend: qx.core.Object,
          members: {
            sayJuhu: function sayJuhu() {
              return "E1";
            }
          }
        });
        qx.Mixin.define("qx.ME1a", {
          members: {
            sayJuhu: function sayJuhu() {
              return "".concat(qx.Mixin.baseClassMethod(this.constructor, qx.ME1a, "sayJuhu").call(this), " ME1");
            }
          }
        });
        qx.Mixin.define("qx.ME1b", {
          members: {
            // does not implement `sayJuhu`
          }
        });
        qx.Class.define("qx.E2", {
          extend: qx.E1,
          members: {
            sayJuhu: function sayJuhu() {
              return "".concat(qx.E2.superclass.prototype.sayJuhu.call(this), " E2");
            }
          }
        });
        qx.Mixin.define("qx.ME2a", {
          members: {
            sayJuhu: function sayJuhu() {
              return "".concat(qx.Mixin.baseClassMethod(this.constructor, qx.ME2a, "sayJuhu").call(this), " ME2a");
            }
          }
        });
        qx.Mixin.define("qx.ME2b", {
          members: {
            sayJuhu: function sayJuhu() {
              return "".concat(qx.Mixin.baseClassMethod(this.constructor, qx.ME2b, "sayJuhu").call(this), " ME2b");
            }
          }
        });
        qx.Class.patch(qx.E1, qx.ME1a);
        qx.Class.patch(qx.E1, qx.ME1b);
        qx.Class.patch(qx.E2, qx.ME2a);
        qx.Class.patch(qx.E2, qx.ME2b);
        var e = new qx.E2();
        this.assertEquals("E1 ME1 E2 ME2a ME2b", e.sayJuhu());
        e.dispose();
      },
      /**
       * tests a large structure to ensure that combinations of patch order,
       * presence of given method, nor patched class count have an impact on
       * the behavior of `super` in mixin methods.
       */
      testLotsMixinLotsSuper: function testLotsMixinLotsSuper() {
        qx.Class.define("qx.G1", {
          extend: qx.core.Object,
          members: {
            sayJuhu: function sayJuhu() {
              return "G1";
            }
          }
        });
        qx.Mixin.define("qx.M1G1", {
          members: {
            sayJuhu: function sayJuhu() {
              return "".concat(qx.Mixin.baseClassMethod(this.constructor, qx.M1G1, "sayJuhu").call(this), " M1G1");
            }
          }
        });
        qx.Class.patch(qx.G1, qx.M1G1);
        qx.Mixin.define("qx.M2G1", {
          members: {
            sayJuhu: function sayJuhu() {
              return "".concat(qx.Mixin.baseClassMethod(this.constructor, qx.M2G1, "sayJuhu").call(this), " M2G1");
            }
          }
        });
        qx.Class.patch(qx.G1, qx.M2G1);
        qx.Mixin.define("qx.M3G1", {
          members: {
            sayJuhu: function sayJuhu() {
              return "".concat(qx.Mixin.baseClassMethod(this.constructor, qx.M3G1, "sayJuhu").call(this), " M3G1");
            }
          }
        });
        qx.Class.patch(qx.G1, qx.M3G1);
        qx.Mixin.define("qx.M4G1", {
          members: {
            sayJuhu: function sayJuhu() {
              return "".concat(qx.Mixin.baseClassMethod(this.constructor, qx.M4G1, "sayJuhu").call(this), " M4G1");
            }
          }
        });
        qx.Class.patch(qx.G1, qx.M4G1);
        qx.Mixin.define("qx.M5G1", {
          members: {
            // does not implement `sayJuhu`
          }
        });
        qx.Class.patch(qx.G1, qx.M5G1);
        qx.Mixin.define("qx.M6G1", {
          members: {
            // does not implement `sayJuhu`
          }
        });
        qx.Class.patch(qx.G1, qx.M6G1);
        qx.Class.define("qx.G2", {
          extend: qx.G1,
          members: {
            sayJuhu: function sayJuhu() {
              return "".concat(qx.G2.superclass.prototype.sayJuhu.call(this), " G2");
            }
          }
        });
        qx.Mixin.define("qx.M1G2", {
          members: {
            sayJuhu: function sayJuhu() {
              return "".concat(qx.Mixin.baseClassMethod(this.constructor, qx.M1G2, "sayJuhu").call(this), " M1G2");
            }
          }
        });
        qx.Class.patch(qx.G2, qx.M1G2);
        qx.Mixin.define("qx.M2G2", {
          members: {
            sayJuhu: function sayJuhu() {
              return "".concat(qx.Mixin.baseClassMethod(this.constructor, qx.M2G2, "sayJuhu").call(this), " M2G2");
            }
          }
        });
        qx.Class.patch(qx.G2, qx.M2G2);
        qx.Mixin.define("qx.M3G2", {
          members: {
            // does not implement `sayJuhu`
          }
        });
        qx.Class.patch(qx.G2, qx.M3G2);
        qx.Mixin.define("qx.M4G2", {
          members: {
            sayJuhu: function sayJuhu() {
              return "".concat(qx.Mixin.baseClassMethod(this.constructor, qx.M4G2, "sayJuhu").call(this), " M4G2");
            }
          }
        });
        qx.Class.patch(qx.G2, qx.M4G2);
        qx.Mixin.define("qx.M5G2", {
          members: {
            sayJuhu: function sayJuhu() {
              return "".concat(qx.Mixin.baseClassMethod(this.constructor, qx.M5G2, "sayJuhu").call(this), " M5G2");
            }
          }
        });
        qx.Class.patch(qx.G2, qx.M5G2);
        qx.Class.define("qx.G3", {
          extend: qx.G2,
          members: {
            sayJuhu: function sayJuhu() {
              return "".concat(qx.G3.superclass.prototype.sayJuhu.call(this), " G3");
            }
          }
        });
        qx.Mixin.define("qx.M1G3", {
          members: {
            // does not implement `sayJuhu`
          }
        });
        qx.Class.patch(qx.G3, qx.M1G3);
        qx.Mixin.define("qx.M2G3", {
          members: {
            sayJuhu: function sayJuhu() {
              return "".concat(qx.Mixin.baseClassMethod(this.constructor, qx.M2G3, "sayJuhu").call(this), " M2G3");
            }
          }
        });
        qx.Class.patch(qx.G3, qx.M2G3);
        qx.Mixin.define("qx.M3G3", {
          members: {
            sayJuhu: function sayJuhu() {
              return "".concat(qx.Mixin.baseClassMethod(this.constructor, qx.M3G3, "sayJuhu").call(this), " M3G3");
            }
          }
        });
        qx.Class.patch(qx.G3, qx.M3G3);
        qx.Mixin.define("qx.M4G3", {
          members: {
            // does not implement `sayJuhu`
          }
        });
        qx.Class.patch(qx.G3, qx.M4G3);
        qx.Class.define("qx.G4", {
          extend: qx.G3,
          members: {
            sayJuhu: function sayJuhu() {
              return "".concat(qx.G4.superclass.prototype.sayJuhu.call(this), " G4");
            }
          }
        });
        qx.Mixin.define("qx.M1G4", {
          members: {
            sayJuhu: function sayJuhu() {
              return "".concat(qx.Mixin.baseClassMethod(this.constructor, qx.M1G4, "sayJuhu").call(this), " M1G4");
            }
          }
        });
        qx.Class.patch(qx.G4, qx.M1G4);
        qx.Mixin.define("qx.M2G4", {
          members: {
            // does not implement `sayJuhu`
          }
        });
        qx.Class.patch(qx.G4, qx.M2G4);
        qx.Mixin.define("qx.M3G4", {
          members: {
            sayJuhu: function sayJuhu() {
              return "".concat(qx.Mixin.baseClassMethod(this.constructor, qx.M3G4, "sayJuhu").call(this), " M3G4");
            }
          }
        });
        qx.Class.patch(qx.G4, qx.M3G4);
        qx.Class.define("qx.G5", {
          extend: qx.G4,
          members: {
            sayJuhu: function sayJuhu() {
              return "".concat(qx.G5.superclass.prototype.sayJuhu.call(this), " G5");
            }
          }
        });
        qx.Mixin.define("qx.M1G5", {
          members: {
            sayJuhu: function sayJuhu() {
              return "".concat(qx.Mixin.baseClassMethod(this.constructor, qx.M1G5, "sayJuhu").call(this), " M1G5");
            }
          }
        });
        qx.Class.patch(qx.G5, qx.M1G5);
        qx.Mixin.define("qx.M2G5", {
          members: {
            // does not implement `sayJuhu`
          }
        });
        qx.Class.patch(qx.G5, qx.M2G5);
        var g5 = new qx.G5();
        this.assertEquals("G1 M1G1 M2G1 M3G1 M4G1 G2 M1G2 M2G2 M4G2 M5G2 G3 M2G3 M3G3 G4 M1G4 M3G4 G5 M1G5", g5.sayJuhu());
        g5.dispose();
      }
    }
  });
  qx.test.Mixin.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Mixin.js.map?dt=1735341774752