function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.dev.unit.TestCase": {
        "require": true
      },
      "qx.Promise": {},
      "qx.core.Object": {},
      "qx.data.Array": {},
      "qx.event.GlobalError": {},
      "qx.core.Assert": {},
      "qx.data.marshal.Json": {},
      "qx.lang.Type": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.Promise.useNativePromise": {}
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("qx.test.Promise", {
    extend: qx.dev.unit.TestCase,
    members: {
      /**
       * Tests the isPromise method
       */
      testIsPromise: function testIsPromise() {
        var p = new qx.Promise(function () {});
        this.assertTrue(qx.Promise.isPromise(p));
        this.assertFalse(qx.Promise.isPromise(null));
        this.assertFalse(qx.Promise.isPromise({}));
        this.assertTrue(qx.Promise.isPromise(qx.Promise.resolve()));
        this.assertTrue(qx.Promise.isPromise(Promise.resolve()));
        this.assertTrue(qx.Promise.isPromise({
          then: function then() {}
        }));
      },
      /**
       * Tests a new promise that resolves with no errors
       */
      testNewPromise: function testNewPromise() {
        var self = this;
        var p = new qx.Promise(function (resolve, reject) {
          setTimeout(function () {
            resolve("ok");
          });
        }, this);
        p.then(function (value) {
          this.assertIdentical(this, self);
          this.assertEquals(value, "ok");
          this.resume();
        }, function (err) {
          this.assertTrue(false);
          this.resume();
        });
        this.wait(1000);
      },
      /**
       * Tests a new promise that is rejected
       */
      testReject: function testReject() {
        var self = this;
        var p = new qx.Promise(function (resolve, reject) {
          setTimeout(function () {
            reject(new Error("oops"));
          });
        }, this);
        p.then(function (value) {
          this.assertTrue(false);
          this.resume();
        }, function (err) {
          this.assertIdentical(this, self);
          this.assertEquals(err.message, "oops");
          this.resume();
        });
        this.wait(1000);
      },
      /**
       * Tests promise being rejected externally using `reject` method
       * Also tests binding catch
       */
      testExternalReject: function testExternalReject() {
        var promise = new qx.Promise();
        promise["catch"](function (e) {
          var _this = this;
          this.assertEquals("oops", e.message);
          setTimeout(function () {
            return _this.resume();
          }, 1);
        }, this);
        promise.reject(new Error("oops"));
        this.wait(1000);
      },
      /**
       * Tests that cancelling promise will cause `then` and `catch` to not be called
       * (finally must be called)
       */
      testCancel1: function testCancel1() {
        var _this2 = this;
        if (qx.core.Environment.get("qx.Promise.useNativePromise")) {
          console.warn("Skipping test because the native promise implementation of qx.Promise does not support cancellation");
          return;
        } else {
          var promise = new qx.Promise(function (resolve, reject) {
            setTimeout(function () {
              resolve();
            }, 500);
          });
          promise.then(function () {
            return _this2.fail("Should not call!");
          }).then(function () {
            return _this2.fail("Should not call!");
          });
          promise["catch"](function () {
            _this2.fail("Should not call!");
          });
          var output = "";
          promise.then(function () {
            return new qx.Promise(function (resolve, reject) {
              return reject(new Error("oops"));
            });
          })["catch"](function () {
            return _this2.fail("Should not call!");
          })["finally"](function () {
            output += "1";
          }).then(function () {
            _this2.fail("Should not call!");
          });
          var f = promise["finally"](function () {
            setTimeout(function () {
              output += "2";
              _this2.assertEquals("12", output);
              _this2.resume();
            }, 100);
          });
          this.assertInstance(f, qx.Promise);
          promise.cancel();
          this.wait(1000);
        }
      },
      /**
       * Ensures that non of the handlers in the chain are called when a promise is cancelled immediately
       */
      testCancel2: function testCancel2() {
        var _this3 = this;
        if (qx.core.Environment.get("qx.Promise.useNativePromise")) {
          console.warn("Skipping test because the native promise implementation of qx.Promise does not support cancellation");
          return;
        } else {
          var output = "";
          var promise = qx.Promise.resolve().then(function () {
            return new qx.Promise(function (resolve) {
              output += "1";
              setTimeout(resolve, 100);
            });
          }).then(function () {
            return new qx.Promise(function (resolve) {
              output += "2";
              setTimeout(resolve, 100);
            });
          }).then(function () {
            return new qx.Promise(function (resolve) {
              output += "3";
              setTimeout(resolve, 100);
            });
          })["finally"](function () {
            _this3.assertEquals("", output);
            _this3.resume();
          });
          promise.cancel();
          this.wait(1000);
        }
      },
      /**
       * Ensures that the promise chain does not continue after a promise is cancelled, except ALL the `finally` calls
       * which are both ancestors and descendants of the cancelled promise, which have not been called yet.
      
       */
      testCancel3: function testCancel3() {
        var _this4 = this;
        if (qx.core.Environment.get("qx.Promise.useNativePromise")) {
          console.warn("Skipping test because the native promise implementation of qx.Promise does not support cancellation");
          return;
        } else {
          var output = "";
          var promise = qx.Promise.resolve().then(function () {
            return new qx.Promise(function (resolve) {
              output += "1";
              setTimeout(resolve, 100);
            });
          }).then(function () {
            return new qx.Promise(function (resolve) {
              output += "2";
              setTimeout(resolve, 100);
              setTimeout(function () {
                return promise.cancel();
              }, 150);
            });
          })["finally"](function () {
            if (output.at(-1) !== "2") {
              _this4.fail("finally called twice!");
            }
            output += "3";
          }).then(function () {
            return new qx.Promise(function (resolve) {
              output += "4";
              setTimeout(resolve, 100);
            });
          }).then(function () {
            return new qx.Promise(function (resolve) {
              _this4.fail("Should not call!");
            });
          })["finally"](function () {
            output += "5";
          }).then(function () {
            return _this4.fail("should not call!");
          })["finally"](function () {
            output += "6";
          });
          var promise2 = promise.then(function () {
            return _this4.fail("should not call!");
          })["finally"](function () {
            output += "7";
          }).then(function () {
            return _this4.fail("should not call!");
          })["finally"](function () {
            output += "8";
            _this4.assertEquals("12345678", output);
            _this4.resume();
          });
          this.wait(1000);
        }
      },
      /**
       * Tests that cancelling a promise will not stop its chain from executing if there are promises which depend on some stages in the chain
       */
      testCancel4: function testCancel4() {
        var _this5 = this;
        if (qx.core.Environment.get("qx.Promise.useNativePromise")) {
          console.warn("Skipping test because the native promise implementation of qx.Promise does not support cancellation");
          return;
        } else {
          var output = "";
          var promise1 = qx.Promise.resolve().then(function () {
            output += "1";
          });
          var branch1 = promise1.then(function () {
            output += "2";
          });
          var branch2 = promise1.then(function () {
            return output += "3";
          })["finally"](function () {
            setTimeout(function () {
              _this5.assertEquals("13", output);
              _this5.resume();
            }, 100);
          });
          branch1.cancel();
          this.wait(1000);
        }
      },
      /**
       * Ensures exception is thrown when trying to call `then` for a promise which has already been cancelled.
       */
      testThenAfterCancel: function testThenAfterCancel() {
        var _this6 = this;
        if (qx.core.Environment.get("qx.Promise.useNativePromise")) {
          console.warn("Skipping test because the native promise implementation of qx.Promise does not support cancellation");
          return;
        } else {
          var promise = new qx.Promise(function (resolve, reject) {
            setTimeout(function () {
              resolve();
            }, 300);
          });
          promise.cancel();
          promise.then(function () {
            return _this6.fail("Should not call!");
          })["catch"](function (e) {
            _this6.assertEquals("late cancellation observer", e.message);
            setTimeout(_this6.resume(), 1);
          });
          this.wait(1000);
        }
      },
      /**
       * Ensures exception is thrown when trying to call `catch` for a promise which has already been cancelled.
       */
      testCatchAfterCancel: function testCatchAfterCancel() {
        var _this7 = this;
        if (qx.core.Environment.get("qx.Promise.useNativePromise")) {
          console.warn("Skipping test because the native promise implementation of qx.Promise does not support cancellation");
          return;
        } else {
          var promise = new qx.Promise(function (resolve, reject) {
            setTimeout(function () {
              resolve();
            }, 300);
          });
          promise.cancel();
          promise.then(function () {
            _this7.fail("Should not call!");
          })["catch"](function (e) {
            _this7.assertEquals("late cancellation observer", e.message);
            setTimeout(function () {
              return _this7.resume();
            }, 1);
          });
          this.wait(1000);
        }
      },
      /**
       * Ensures exception is thrown when trying to call `finally` for a promise which has already been cancelled.
       */
      testFinallyAfterCancel: function testFinallyAfterCancel() {
        var _this8 = this;
        if (qx.core.Environment.get("qx.Promise.useNativePromise")) {
          console.warn("Skipping test because the native promise implementation of qx.Promise does not support cancellation");
          return;
        } else {
          var promise = new qx.Promise(function (resolve, reject) {
            setTimeout(function () {
              resolve();
            }, 300);
          });
          promise.cancel();
          promise.then(function () {
            _this8.fail("Should not call!");
          })["catch"](function (e) {
            _this8.assertEquals("late cancellation observer", e.message);
            setTimeout(function () {
              return _this8.resume();
            }, 1);
          });
          this.wait(1000);
        }
      },
      /**
       * Ensures a promise can still be cancelled after it has been settled
       */
      testCancelAfterSettled: function testCancelAfterSettled() {
        var _this9 = this;
        if (qx.core.Environment.get("qx.Promise.useNativePromise")) {
          console.warn("Skipping test because the native promise implementation of qx.Promise does not support cancellation");
          return;
        } else {
          var promise = qx.Promise.resolve();
          promise.then(function () {
            promise.cancel();
          }).then(function () {
            setTimeout(function () {
              return _this9.resume();
            }, 1);
          });
          this.wait(1000);
        }
      },
      /**
       * Ensures that `finally` is run when the promise rejects
       */
      testCatchFinally: function testCatchFinally() {
        var caughtException = null;
        var t = this;
        qx.Promise.resolve().then(function () {
          throw new Error("oops");
        })["catch"](function (ex) {
          caughtException = ex;
        })["finally"](function () {
          var _this0 = this;
          this.assertNotNull(caughtException);
          this.assertIdentical(this, t);
          setTimeout(function () {
            return _this0.resume();
          }, 1);
        }, this);
        this.wait(1000);
      },
      /**
       * Tests that the `promisify` method works for operations functions.
       * Also ensures the return value of `.then` is a qx.Promise
       */
      testPromisifyResolve: function testPromisifyResolve() {
        var _this1 = this;
        function feedMe(fruit, callback) {
          setTimeout(function () {
            if (fruit == "raspberry") {
              callback(null, "That's nice");
            } else {
              callback(new Error("No thank you!"), null);
            }
          }, 100);
        }
        var feedMeAsync = qx.Promise.promisify(feedMe);
        feedMeAsync("raspberry").then(function (value) {
          _this1.assertEquals("That's nice", value);
          _this1.resume();
        });
        this.wait(1000);
      },
      /**
       * Tests that the `promisify` method works for unsuccessful operations
       */
      testPromisifyReject: function testPromisifyReject() {
        var _this10 = this;
        function feedMe(fruit, callback) {
          setTimeout(function () {
            if (fruit == "raspberry") {
              callback(null, "That's nice");
            } else {
              callback(new Error("No thank you!"), null);
            }
          }, 100);
        }
        var feedMeAsync = qx.Promise.promisify(feedMe);
        feedMeAsync("ping pong balls")["catch"](function (err) {
          _this10.assertEquals("No thank you!", err.message);
          _this10.resume();
        });
        this.wait(1000);
      },
      /**
       * Tests the qx.Promise.allOf method
       */
      testAllOf: function testAllOf() {
        var t = this;
        var dt = new Date();
        var obj = {
          a: new qx.Promise(),
          b: new qx.Promise(),
          c: new qx.Promise(),
          d: "four",
          e: dt
        };
        var promise = qx.Promise.allOf(obj);
        this.assertInstance(promise, qx.Promise);
        promise.then(function (obj2) {
          t.assertTrue(obj === obj2);
          t.assertEquals("one", obj.a);
          t.assertEquals("two", obj.b);
          t.assertEquals("three", obj.c);
          t.assertEquals("four", obj.d);
          t.assertTrue(obj.e === dt);
          setTimeout(function () {
            return t.resume();
          }, 1);
        });
        obj.a.then(function () {
          obj.b.resolve("two");
        });
        obj.b.then(function () {
          obj.c.resolve("three");
        });
        obj.a.resolve("one");
        t.wait(1000);
      },
      /**
       * Checks that if one of the promises in the allOf array rejects,
       * the overall result will reject
       */
      testAllOfReject: function testAllOfReject() {
        var t = this;
        var obj = {
          a: new qx.Promise(),
          b: new qx.Promise()
        };
        qx.Promise.allOf(qx.Promise.resolve(obj))["catch"](function (reason) {
          t.assertEquals("two", reason.message);
          setTimeout(function () {
            return t.resume();
          }, 1);
        });
        obj.b.reject(new Error("two"));
        obj.a.resolve("one");
        t.wait(1000);
      },
      /**
       * Tests the qx.Promise.allOf being passed a promise of an object instead of a straight value
       */
      testAllOfPromiseObj: function testAllOfPromiseObj() {
        var t = this;
        var obj = {
          a: new qx.Promise(),
          b: new qx.Promise()
        };
        qx.Promise.allOf(qx.Promise.resolve(obj)).then(function (obj2) {
          t.assertTrue(obj === obj2);
          t.assertEquals("one", obj.a);
          t.assertEquals("two", obj.b);
          setTimeout(function () {
            return t.resume();
          }, 1);
        });
        obj.a.then(function () {
          obj.b.resolve("two");
        });
        obj.a.resolve("one");
        t.wait(1000);
      },
      /**
       * Tests that setting a property value with a promise will delay setting the
       * value until the promise is resolved.  In this case, the property is *not*
       * marked as async and the setXxx method is used
       */
      testPropertySetValueAsPromise1: function testPropertySetValueAsPromise1() {
        var t = this;
        var Clazz = qx.Class.define("testPropertySetValueAsPromise1.Clazz", {
          extend: qx.core.Object,
          properties: {
            alpha: {
              init: null,
              nullable: true
            }
          }
        });
        this.assertTrue(!!Clazz.prototype.setAlpha);
        this.assertFalse(!!Clazz.prototype.setAlphaAsync);
        var obj = new Clazz();
        var p = new qx.Promise(function (resolve) {
          resolve(123);
        });
        obj.setAlpha(p);
        p.then(function () {
          t.assertEquals(123, obj.getAlpha());
          qx.Class.undefine("testPropertySetValueAsPromise1.Clazz");
          setTimeout(function () {
            return t.resume();
          }, 1);
        });
        this.wait(1000);
      },
      /**
       * Tests that setting a property value with a promise will delay setting the
       * value until the promise is resolved.  In this case, the property *is*
       * marked as async and the setXxxAsync method is used to test chaining
       */
      testPropertySetValueAsPromise2: function testPropertySetValueAsPromise2() {
        var t = this;
        var Clazz = qx.Class.define("testPropertySetValueAsPromise2.Clazz", {
          extend: qx.core.Object,
          properties: {
            alpha: {
              init: null,
              nullable: true,
              async: true
            }
          }
        });
        this.assertTrue(!!Clazz.prototype.setAlpha);
        this.assertTrue(!!Clazz.prototype.setAlphaAsync);
        var obj = new Clazz();
        var p = new qx.Promise(function (resolve) {
          resolve(123);
        });
        obj.setAlphaAsync(p).then(function () {
          t.assertEquals(123, obj.getAlpha());
          qx.Class.undefine("testPropertySetValueAsPromise2.Clazz");
          setTimeout(function () {
            return t.resume();
          }, 1);
        });
        this.wait(1000);
      },
      /**
       * Tests that a property apply method can return a promise; in this case, the
       * property is not marked as async so the apply method is only able to delay
       * the event handler
       */
      testPropertySetValueAsyncApply1: function testPropertySetValueAsyncApply1() {
        var t = this;
        var p;
        var Clazz = qx.Class.define("testPropertySetValueAsyncApply1.Clazz", {
          extend: qx.core.Object,
          properties: {
            alpha: {
              init: null,
              nullable: true,
              apply: "_applyAlpha",
              event: "changeAlpha"
            }
          },
          members: {
            _applyAlpha: function _applyAlpha(value, oldValue) {
              return p = new qx.Promise(function (resolve) {
                setTimeout(function () {
                  resolve("xyz");
                }, 250);
              });
            }
          }
        });
        var obj = new Clazz();
        var eventFired = 0;
        obj.addListener("changeAlpha", function (evt) {
          eventFired++;
        });
        obj.setAlpha("abc");
        this.assertTrue(!!p);
        this.assertEquals(0, eventFired);
        this.assertEquals("abc", obj.getAlpha());
        p.then(function (value) {
          this.assertEquals("xyz", value); // "xyz" because this is the internal promise
          this.assertEquals("abc", obj.getAlpha());
          this.assertEquals(1, eventFired);
          qx.Class.undefine("testPropertySetValueAsyncApply1.Clazz");
          t.resume();
        }, this);
        this.wait(1000);
      },
      /**
       * Tests that a property apply method can return a promise; in this case, the
       * property *is* marked as async, and we use the setAlphaAsync to test chaining
       */
      testPropertySetValueAsyncApply2: function testPropertySetValueAsyncApply2() {
        var t = this;
        var Clazz = qx.Class.define("testPropertySetValueAsyncApply2.Clazz", {
          extend: qx.core.Object,
          properties: {
            alpha: {
              init: null,
              nullable: true,
              async: true,
              apply: "_applyAlpha",
              event: "changeAlpha"
            }
          },
          members: {
            _applyAlpha: function _applyAlpha(value, oldValue) {
              return new qx.Promise(function (resolve) {
                setTimeout(function () {
                  resolve("xyz");
                }, 250);
              });
            }
          }
        });
        var obj = new Clazz();
        var eventFired = 0;
        obj.addListener("changeAlpha", function (evt) {
          eventFired++;
        });
        var p = obj.setAlphaAsync("abc");
        this.assertEquals(0, eventFired);
        p.then(function (value) {
          this.assertEquals("abc", value);
          this.assertEquals("abc", obj.getAlpha());
          this.assertEquals(1, eventFired);

          // Set the same value, should return a new promise but not fire an event
          p = obj.setAlphaAsync("abc");
          p.then(function (value) {
            this.assertEquals("abc", value);
            this.assertEquals("abc", obj.getAlpha());
            this.assertEquals(1, eventFired);
            qx.Class.undefine("testPropertySetValueAsyncApply2.Clazz");
            t.resume();
          }, this);
        }, this);
        this.wait(1000);
      },
      /**
       * Tests that a property apply method can take a promise
       */
      testPropertySetValueAsyncApply3: function testPropertySetValueAsyncApply3() {
        var t = this;
        var Clazz = qx.Class.define("testPropertySetValueAsyncApply3.Clazz", {
          extend: qx.core.Object,
          properties: {
            alpha: {
              init: null,
              nullable: true,
              check: "qx.Promise"
            }
          }
        });
        var obj = new Clazz();
        var p = qx.Promise.resolve("hello");
        obj.setAlpha(p);
        this.assertEquals(p, obj.getAlpha());
        qx.Class.undefine("testPropertySetValueAsyncApply3.Clazz");
      },
      testBinding: function testBinding() {
        var t = this;
        var AsyncClazz = qx.Class.define("testBinding.AsyncClazz", {
          extend: qx.core.Object,
          properties: {
            alpha: {
              init: null,
              nullable: true,
              async: true,
              event: "changeAlpha"
            }
          },
          members: {
            _applyAlpha: function _applyAlpha(value, oldValue) {
              return new qx.Promise(function (resolve) {
                setTimeout(resolve, 250);
              });
            }
          }
        });
        var SyncClazz = qx.Class.define("testBinding.SyncClazz", {
          extend: qx.core.Object,
          properties: {
            bravo: {
              init: null,
              nullable: true,
              event: "changeBravo"
            }
          }
        });

        /*
         * Test binding an async property to a "normal" sync property
         */
        var asyncToSync = new qx.Promise(function (resolve) {
          var _this11 = this;
          var asyncObj = new AsyncClazz();
          var syncObj = new SyncClazz();
          var p1 = new qx.Promise();
          asyncObj.addListenerOnce("changeAlphaAsync", function (evt) {
            var data = evt.getData();
            _this11.assertTrue(data instanceof qx.Promise);
            p1.resolve();
          });
          var p2 = new qx.Promise();
          var bravoEvents = 0;
          var id = syncObj.addListener("changeBravo", function (evt) {
            bravoEvents++;
            _this11.assertTrue(bravoEvents <= 2);
            var data = evt.getData();

            // First event is .bind() setting the initial value
            if (bravoEvents == 1) {
              _this11.assertNull(data);

              // Second event was caused by asyncObj.setAlphaAsync()
            } else if (bravoEvents == 2) {
              _this11.assertEquals("zyx", data);
              syncObj.removeListenerById(id);
              p2.resolve();
            }
          });
          asyncObj.getAlphaAsync();
          asyncObj.bind("alphaAsync", syncObj, "bravo");
          asyncObj.setAlphaAsync("zyx");
          qx.Promise.all([p1, p2]).then(function () {
            var _this12 = this;
            var p3 = new qx.Promise();
            syncObj.addListenerOnce("changeBravo", function (evt) {
              var data = evt.getData();
              _this12.assertEquals("wvu", data);
              p3.resolve();
            });
            asyncObj.setAlphaAsync("wvu");
            p3.then(function () {
              this.resume();
            }, this);
          }, this);
        }, this);

        /*
         * Test binding a "normal" sync property to an async property
         */
        asyncToSync.then(function () {
          var _this13 = this;
          var asyncObj = new AsyncClazz();
          var syncObj = new SyncClazz();
          var p1 = new qx.Promise();
          asyncObj.addListenerOnce("changeAlphaAsync", function (evt) {
            var data = evt.getData();
            _this13.assertEquals("def", data);
            p1.resolve();
          });
          syncObj.bind("bravo", asyncObj, "alphaAsync");
          syncObj.setBravo("def");
          p1.then(function () {
            var _this14 = this;
            var p2 = new qx.Promise();
            asyncObj.addListenerOnce("changeAlphaAsync", function (evt) {
              var data = evt.getData();
              _this14.assertEquals("ghi", data);
              p2.resolve();
            });
            syncObj.setBravo("ghi");
            return p2.then(function () {
              qx.Class.undefine("testBinding.AsyncClazz");
              qx.Class.undefine("testBinding.SyncClazz");
              this.resume();
            }, this);
          }, this);
        }, this);
        this.wait(1000);
      },
      /**
       * Tests event handlers bound to the "changeXxxAsync" events, and which return
       * a promise.  Event handlers must be triggered in sequence and by returning
       * a promise will defer subsequent event handlers from firing
       */
      testAsyncEventHandlers: function testAsyncEventHandlers() {
        var Clazz = qx.Class.define("testAsyncEventHandlers.Clazz", {
          extend: qx.core.Object,
          properties: {
            value: {},
            alpha: {
              init: null,
              nullable: true,
              async: true,
              apply: "_applyAlpha",
              event: "changeAlpha"
            },
            bravo: {
              init: null,
              nullable: true,
              async: true,
              apply: "_applyBravo",
              event: "changeBravo"
            }
          },
          members: {
            _applyAlpha: function _applyAlpha(value, oldValue) {
              var p = new qx.Promise(function (resolve) {
                console.log("in _applyAlpha qx.Promise, value=" + value);
                setTimeout(function () {
                  console.log("in _applyAlpha resolving qx.Promise, value=" + value);
                  resolve("xyz");
                }, 50);
              });
              console.log("in _applyAlpha, value=" + value + ", p=" + p);
              return p;
            },
            _applyBravo: function _applyBravo(value, oldValue) {
              return new qx.Promise(function (resolve) {
                setTimeout(function () {
                  resolve("uvw");
                }, 50);
              });
            }
          }
        });
        function createObj(name) {
          var obj = new Clazz().set({
            value: name
          });
          obj.addListener("changeAlphaAsync", function (evt) {
            var value = evt.getData();
            var p = new qx.Promise(function (resolve) {
              console.log(name + ": changeAlphaAsync 1 in qx.Promise, value=" + value);
              setTimeout(function () {
                if (str.length) {
                  str += ",";
                }
                str += name;
                console.log(name + ": changeAlphaAsync 1 resolving qx.Promise, value=" + value);
                resolve();
              }, 200);
            }).then(function () {
              console.log(name + ": changeAlphaAsync 1 resolved qx.Promise, value=" + value);
            });
            console.log(name + ": changeAlphaAsync 1, value=" + value + ", p=" + p);
            return p;
          });
          return obj;
        }
        var objOne = createObj("one");
        var objTwo = createObj("two");
        var str = "";
        objOne.addListener("changeAlphaAsync", function (evt) {
          var value = evt.getData();
          console.log("objOne.alphaAsync setting, value=" + value);
          return objTwo.setAlphaAsync("def").then(function () {
            str += "xxx";
            console.log("objOne.alphaAsync done, value=" + value);
          });
        });
        console.log("objOne.alphaAsync going to set value=abc");
        objOne.setAlphaAsync("abc").then(function () {
          console.log("objOne.alphaAsync completed set value=abc");
          this.assertEquals("one,twoxxx", str);
          qx.Class.undefine("testAsyncEventHandlers.Clazz");
          this.resume();
        }, this);
        this.wait(2500);
      },
      /**
       * Tests using bind() on async properties (using the "changeXxxAsync" events) between
       * a series of objects.  The test must show that the property values are fired in
       * order, and that if an async event handler returns a promise it defers bind from
       * propagating onto other objects.
       */
      testWaterfallBinding: function testWaterfallBinding() {
        var t = this;
        var Clazz = qx.Class.define("testWaterfallBinding.Clazz", {
          extend: qx.core.Object,
          properties: {
            value: {},
            alpha: {
              init: null,
              nullable: true,
              async: true,
              apply: "_applyAlpha",
              event: "changeAlpha"
            }
          },
          members: {
            _applyAlpha: function _applyAlpha(value, oldValue) {
              var t = this;
              console.log("pre applyAlpha[" + t.getValue() + "] = " + value);
              return new qx.Promise(function (resolve) {
                setTimeout(function () {
                  console.log("applyAlpha[" + t.getValue() + "] = " + value);
                  resolve("xyz");
                }, 50);
              });
            }
          }
        });
        var objs = [];
        var str = "";
        function trap(i) {
          var obj = new Clazz().set({
            value: i
          });
          var bindPromise;
          if (i > 0) {
            bindPromise = objs[i - 1].bindAsync("alphaAsync", obj, "alphaAsync");
          } else {
            bindPromise = qx.Promise.resolve(true);
          }
          return bindPromise.then(function () {
            obj.addListener("changeAlpha", function (evt) {
              var obj = evt.getTarget();
              var data = evt.getData();
              var delay = (5 - i + 1) * 100;
              console.log("pre changeAlpha " + obj.getValue() + " = " + data + " after " + delay);
              return new qx.Promise(function (resolve) {
                setTimeout(function () {
                  if (str.length) {
                    str += ",";
                  }
                  str += obj.getValue() + ":" + data;
                  console.log("changeAlpha " + obj.getValue() + " = " + data + " after " + delay);
                  resolve();
                }, delay);
              });
            });
            objs[i] = obj;
          });
        }
        qx.Promise.mapSeries([0, 1, 2, 3, 4], trap).then(function () {
          var p = objs[0].setAlphaAsync("abc");
          p.then(function () {
            t.assertEquals("0:abc,1:abc,2:abc,3:abc,4:abc", str);
            qx.Class.undefine("testWaterfallBinding.Clazz");
            t.resume();
          }, t);
        });
        this.wait(10000);
      },
      /**
       * Tests the each method of promise, using qx.data.Array which the native Promise
       * does not understand.  The values are scalar values
       */
      testEach1: function testEach1() {
        var t = this;
        var arr = new qx.data.Array();
        arr.push("a");
        arr.push("b");
        arr.push("c");
        var str = "";
        var promise = qx.Promise.resolve(arr);
        var forEachReturn = promise.forEach(function (item) {
          str += item;
          this.assertIdentical(t, this);
        }, this);
        forEachReturn.then(function () {
          t.assertEquals("abc", str);
          setTimeout(function () {
            return t.resume();
          }, 1);
        });
        this.assertInstance(forEachReturn, qx.Promise);
        t.wait(1000);
      },
      /**
       * Tests the each method of promise, using qx.data.Array which the native Promise
       * does not understand.  The values are a mixture of promises and scalar values
       */
      testEach2: function testEach2() {
        var t = this;
        var arr = new qx.data.Array();
        arr.push(new qx.Promise(function (resolve) {
          setTimeout(function () {
            resolve("a");
          }, 500);
        }));
        arr.push(new qx.Promise(function (resolve) {
          setTimeout(function () {
            resolve("b");
          }, 300);
        }));
        arr.push(new qx.Promise(function (resolve) {
          setTimeout(function () {
            resolve("c");
          }, 100);
        }));
        arr.push("d");
        arr.push("e");
        var str = "";
        var promise = qx.Promise.resolve(arr);
        this.assertInstance(promise, qx.Promise);
        var pEach = promise.forEach(function (item) {
          str += item;
        });
        this.assertInstance(pEach, qx.Promise);
        var pThen = pEach.then(function () {
          t.assertEquals("abcde", str);
          t.resume();
        });
        this.assertInstance(pThen, qx.Promise);
        t.wait(1000);
      },
      /**
       * Checks that the each method will reject if one of the promises in the array rejects
       */
      testEachReject: function testEachReject() {
        var _this15 = this;
        var arr = [qx.Promise.resolve("a"), qx.Promise.reject(new Error("b"))];
        var str = "";
        var promiseArr = qx.Promise.resolve(arr);
        var pEach = qx.Promise.forEach(promiseArr, function (item) {
          str += item;
        });
        pEach["catch"](function (reason) {
          _this15.assertEquals("b", reason.message);
          setTimeout(function () {
            return _this15.resume();
          }, 1);
        });
        this.wait(1000);
      },
      /**
       * Tests the `each` method being passed with a promise of an array,
       * not a straight array
       */
      testEachPromiseArray: function testEachPromiseArray() {
        var _this16 = this;
        var promiseArr = qx.Promise.resolve([1, 2, 3]);
        qx.Promise.forEach(promiseArr, function (item, index) {
          _this16.assertEquals(index, item - 1);
        }).then(function (result) {
          setTimeout(function () {
            return _this16.resume();
          }, 1);
        });
        this.wait(1000);
      },
      /**
       * Tests unhandled rejections being passed to the global error handler
       */
      testGlobalError: function testGlobalError() {
        var t = this;
        qx.event.GlobalError.setErrorHandler(function (ex) {
          t.assertEquals(ex.message, "oops");
          qx.event.GlobalError.setErrorHandler(null);
          t.resume();
        });
        var self = this;
        var p = new qx.Promise(function (resolve, reject) {
          setTimeout(function () {
            resolve("ok");
          });
        }, this);
        p.then(function (value) {
          throw new Error("oops");
        });
        this.wait(1000);
      },
      /**
       * Tests promisification of methods
       */
      testMethod: function testMethod() {
        var t = this;
        var fn = qx.Promise.method(function (value) {
          return value;
        });
        var promise = fn("yes");
        this.assertInstance(promise, qx.Promise);
        promise.then(function (value) {
          t.assertEquals(value, "yes");
          setTimeout(function () {
            return t.resume();
          }, 1);
        });
        this.wait(1000);
      },
      /**
       * Tests binding of all callbacks via .bind()
       */
      testBinding1: function testBinding1() {
        var t = this;
        var p = qx.Promise.resolve("hello").bind(this);
        p.then(function (value) {
          var _this17 = this;
          qx.core.Assert.assertIdentical(t, this);
          setTimeout(function () {
            return _this17.resume();
          }, 1);
        });
        this.wait(1000);
      },
      /**
       * Tests binding on a per-method basis
       */
      testBinding2: function testBinding2() {
        var t = this;
        var p = qx.Promise.forEach(["a", "b", "c"], function (item) {
          qx.core.Assert.assertIdentical(t, this);
        }, this).then(function (value) {
          var _this18 = this;
          qx.core.Assert.assertIdentical(t, this);
          setTimeout(function () {
            return _this18.resume();
          }, 1);
        }, this);
        this.wait(1000);
      },
      testMarshal: function testMarshal() {
        var marshal = new qx.data.marshal.Json();
        marshal.toClass(qx.test.Promise.TEST_MODEL.children[0], true);
        var model = marshal.toModel(qx.test.Promise.TEST_MODEL.children[0]);
      },
      /**
       * Tests binding where the context is static class
       */
      testBindingToStatic: function testBindingToStatic() {
        var t = this;
        qx.Promise.resolve(true).then(function () {
          qx.core.Assert.assertIdentical(qx.Promise, this);
          setTimeout(function () {
            return t.resume();
          }, 1);
        }, qx.Promise);
        this.wait(1000);
      },
      /**
       * Tests the context parameter for qx.Promise.resolve
       */
      testBindingResolve: function testBindingResolve() {
        var t = this;
        qx.Promise.resolve(true, this).then(function () {
          var _this19 = this;
          qx.core.Assert.assertIdentical(t, this);
          setTimeout(function () {
            return _this19.resume();
          }, 1);
        });
        this.wait(1000);
      },
      /**
       * Tests the context parameter for qx.Promise.reject
       */
      testBindingReject: function testBindingReject() {
        var t = this;
        qx.Promise.reject(new Error("Dummy Error"), this)["catch"](function () {
          var _this20 = this;
          qx.core.Assert.assertIdentical(t, this);
          setTimeout(function () {
            return _this20.resume();
          }, 1);
        });
        this.wait(1000);
      },
      /**
       * Tests wrapping of parameters preserves the original values
       */
      testWrapping: function testWrapping() {
        var t = this;
        new qx.Promise(function (resolve) {
          resolve();
        }).then(function () {
          return qx.Promise.all(["foo", new qx.data.Array(["a", "b", "c"])]);
        }).spread(function (str, arr) {
          t.assertEquals(str, "foo");
          t.assertInstance(arr, qx.data.Array);
          t.assertEquals(arr.join(""), "abc");
          setTimeout(function () {
            return t.resume();
          }, 1);
        });
        this.wait(1000);
      },
      /**
       * Tests the `race` method when no promises in the array reject
       */
      testRaceResolve: function testRaceResolve() {
        var _this21 = this;
        var promiseB = new qx.Promise(function (resolve) {
          setTimeout(function () {
            resolve("b");
          }, 200);
        });
        var promiseC = new qx.Promise(function (resolve) {
          setTimeout(function () {
            resolve("c");
          }, 100);
        });
        var promiseD = new qx.Promise(function (resolve) {
          setTimeout(function () {
            resolve("d");
          }, 300);
        });
        var arr = [promiseB, promiseC, promiseD];
        var promise = qx.Promise.resolve(arr).race();
        promise.then(function (val) {
          _this21.assertEquals("c", val);
          _this21.resume();
        });
        this.assertInstance(promise, qx.Promise);
        this.wait(1000);
      },
      /**
       * Tests the `race` method when one promise in the array rejects
       */
      testRaceReject: function testRaceReject() {
        var _this22 = this;
        var promiseB = new qx.Promise(function (resolve) {
          setTimeout(function () {
            resolve("b");
          }, 200);
        });
        var promiseC = new qx.Promise(function (resolve, reject) {
          setTimeout(function () {
            reject(new Error("c"));
          }, 100);
        });
        var arr = new qx.data.Array([promiseB, promiseC]);
        qx.Promise.resolve(arr).race().then(function (val) {
          _this22.fail("Should not resolve");
        })["catch"](function (err) {
          _this22.assertEquals("c", err.message);
          _this22.resume();
        });
        this.wait(1000);
      },
      /**
       * Tests the `race` method when the array contains a straight (i.e. non-promise) value
       */
      testRaceStraightValue: function testRaceStraightValue() {
        var _this23 = this;
        var promiseB = new qx.Promise(function (resolve) {
          setTimeout(function () {
            resolve("b");
          }, 200);
        });
        var arr = ["a", promiseB];
        qx.Promise.race(qx.Promise.resolve(arr)).then(function (val) {
          _this23.assertEquals("a", val);
          setTimeout(function () {
            return _this23.resume();
          }, 1);
        });
        this.wait(1000);
      },
      /**
       * Tests the `any` method when all promises in the array resolve
       */
      testAnyResolve: function testAnyResolve() {
        var _this24 = this;
        var promiseB = new qx.Promise(function (resolve) {
          setTimeout(function () {
            resolve("b");
          }, 200);
        });
        var promiseC = new qx.Promise(function (resolve) {
          setTimeout(function () {
            resolve("c");
          }, 100);
        });
        var promiseD = new qx.Promise(function (resolve) {
          setTimeout(function () {
            resolve("d");
          }, 300);
        });
        var arr = [promiseB, promiseC, promiseD];
        var promise = qx.Promise.resolve(arr).any();
        promise.then(function (val) {
          _this24.assertEquals("c", val);
          _this24.resume();
        });
        this.assertInstance(promise, qx.Promise);
        this.wait(1000);
      },
      /**
       * Tests the `any` method when one promise in the array rejects.
       * The overall result should the result of the first promise that resolves
       */
      testAnyOneReject: function testAnyOneReject() {
        var _this25 = this;
        var promiseB = new qx.Promise(function (resolve) {
          setTimeout(function () {
            resolve("b");
          }, 200);
        });
        var promiseC = new qx.Promise(function (resolve, reject) {
          setTimeout(function () {
            reject(new Error("c"));
          }, 100);
        });
        var promiseD = new qx.Promise(function (resolve) {
          setTimeout(function () {
            resolve("d");
          }, 300);
        });
        var arr = new qx.data.Array([promiseB, promiseC, promiseD]);
        qx.Promise.any(qx.Promise.resolve(arr)).then(function (val) {
          _this25.assertEquals("b", val);
          _this25.resume();
        });
        this.wait(1000);
      },
      /**
       * Tests the `any` method when all promises in the array reject.
       */
      testAnyAllReject: function testAnyAllReject() {
        var _this26 = this;
        var promiseB = new qx.Promise(function (resolve, reject) {
          setTimeout(function () {
            reject(new Error("b"));
          }, 200);
        });
        var promiseC = new qx.Promise(function (resolve, reject) {
          setTimeout(function () {
            reject(new Error("c"));
          }, 100);
        });
        var promiseD = new qx.Promise(function (resolve, reject) {
          setTimeout(function () {
            reject(new Error("d"));
          }, 300);
        });
        var arr = [promiseB, promiseC, promiseD];
        qx.Promise.resolve(arr).any()["catch"](function (aggErr) {
          _this26.resume();
        });
        this.wait(1000);
      },
      /**
       * Tests the `any` method when an empty array is passed in.
       */
      testAnyEmptyArray: function testAnyEmptyArray() {
        var _this27 = this;
        qx.Promise.resolve([]).any()["catch"](function (aggErr) {
          setTimeout(function () {
            return _this27.resume();
          }, 1);
        });
        this.wait(1000);
      },
      /**
       * Tests the `any` method when a straight (i.e. non-promise value) is passed in.
       * It should resolve to that value
       */
      testAnyStraightValue: function testAnyStraightValue() {
        var _this28 = this;
        var promiseB = new qx.Promise(function (resolve) {
          setTimeout(function () {
            resolve("b");
          }, 200);
        });
        var arr = ["a", promiseB];
        qx.Promise.resolve(arr).any().then(function (val) {
          _this28.assertEquals("a", val);
          setTimeout(function () {
            return _this28.resume();
          }, 1);
        });
        this.wait(1000);
      },
      /**
       * Tests that `reduce` succeeds when no promise rejects
       */
      testReduceResolve: function testReduceResolve() {
        var _this29 = this;
        var promiseB = qx.Promise.resolve(1);
        var promiseC = qx.Promise.resolve(2);
        var promiseD = qx.Promise.resolve(3);
        var arr = [promiseB, promiseC, promiseD];
        var promise = qx.Promise.resolve(arr).reduce(/*#__PURE__*/function () {
          var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(acc, item, index, length) {
            return _regenerator().w(function (_context) {
              while (1) switch (_context.n) {
                case 0:
                  _this29.assertEquals(index, item - 1);
                  _this29.assertEquals(length, 3);
                  return _context.a(2, acc + item);
              }
            }, _callee);
          }));
          return function (_x, _x2, _x3, _x4) {
            return _ref.apply(this, arguments);
          };
        }(), 0);
        promise.then(function (result) {
          _this29.assertEquals(6, result);
          setTimeout(function () {
            return _this29.resume();
          }, 1);
        });
        this.assertInstance(promise, qx.Promise);
        this.wait(1000);
      },
      /**
       * Tests that `reduce` rejects when one promise in the array rejects
       */
      testReduceOneReject: function testReduceOneReject() {
        var _this30 = this;
        var promiseB = new qx.Promise(function (resolve) {
          setTimeout(function () {
            resolve(2);
          }, 200);
        });
        var promiseC = new qx.Promise(function (resolve, reject) {
          setTimeout(function () {
            reject(new Error("oops"));
          }, 100);
        });
        var promiseD = new qx.Promise(function (resolve) {
          setTimeout(function () {
            resolve(4);
          }, 300);
        });
        var arr = new qx.data.Array([promiseB, promiseC, promiseD]);
        qx.Promise.reduce(qx.Promise.resolve(arr), /*#__PURE__*/function () {
          var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(acc, item) {
            return _regenerator().w(function (_context2) {
              while (1) switch (_context2.n) {
                case 0:
                  return _context2.a(2, acc + item);
              }
            }, _callee2);
          }));
          return function (_x5, _x6) {
            return _ref2.apply(this, arguments);
          };
        }(), 0)["catch"](function (err) {
          _this30.assertEquals("oops", err.message);
          _this30.resume();
        });
        this.wait(1000);
      },
      /**
       * Tests that `reduce` rejects when the reducer function throws an error
       */
      testReduceMapperReject: function testReduceMapperReject() {
        var _this31 = this;
        var promiseB = qx.Promise.resolve(2);
        var promiseC = qx.Promise.resolve(3);
        var promiseD = qx.Promise.resolve(4);
        var arr = [promiseB, promiseC, promiseD];
        qx.Promise.resolve(arr).reduce(/*#__PURE__*/function () {
          var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(acc, item) {
            return _regenerator().w(function (_context3) {
              while (1) switch (_context3.n) {
                case 0:
                  throw new Error("oops");
                case 1:
                  return _context3.a(2);
              }
            }, _callee3);
          }));
          return function (_x7, _x8) {
            return _ref3.apply(this, arguments);
          };
        }(), 0)["catch"](function (err) {
          _this31.assertEquals("oops", err.message);
          setTimeout(function () {
            return _this31.resume();
          }, 1);
        });
        this.wait(1000);
      },
      /**
       * Tests that `filter` succeeds when no promise rejects
       */
      testFilterResolve: function testFilterResolve() {
        var _this32 = this;
        var promiseB = qx.Promise.resolve(2);
        var promiseC = qx.Promise.resolve(3);
        var promiseD = qx.Promise.resolve(4);
        var promiseE = qx.Promise.resolve(5);
        var arr = [promiseB, promiseC, promiseD, promiseE, 6];
        var t = this;
        var p = qx.Promise.resolve(arr).filter(/*#__PURE__*/function () {
          var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(item, index, length) {
            return _regenerator().w(function (_context4) {
              while (1) switch (_context4.n) {
                case 0:
                  t.assertEquals(index, item - 2);
                  t.assertEquals(5, length);
                  t.assertIdentical(t, this);
                  return _context4.a(2, item % 2 === 0);
              }
            }, _callee4, this);
          }));
          return function (_x9, _x0, _x1) {
            return _ref4.apply(this, arguments);
          };
        }(), this);
        p.then(function (evens) {
          _this32.assertArrayEquals([2, 4, 6], evens);
          //force resume to run on next tick so that we call resume after wait
          setTimeout(function () {
            return _this32.resume();
          }, 1);
        });
        this.assertInstance(p, qx.Promise);
        this.wait(1000);
      },
      /**
       * Tests `concurrency` option for method `filter`
       */
      testFilterConcurrency: function testFilterConcurrency() {
        var _this33 = this;
        var arr = new qx.data.Array([qx.Promise.resolve(1), 2, 3, 4]);
        var maxReached = false;
        var concurrency = 2;
        var running = 0;
        var t = this;
        qx.Promise.filter(qx.Promise.resolve(arr), /*#__PURE__*/function () {
          var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(item) {
            return _regenerator().w(function (_context5) {
              while (1) switch (_context5.n) {
                case 0:
                  running++;
                  if (running > concurrency) {
                    t.fail("Too many running tasks");
                  } else if (running == concurrency) {
                    maxReached = true;
                  }
                  _context5.n = 1;
                  return new Promise(function (resolve) {
                    return setTimeout(resolve, 200);
                  });
                case 1:
                  running--;
                  return _context5.a(2, item % 2 === 0);
              }
            }, _callee5);
          }));
          return function (_x10) {
            return _ref5.apply(this, arguments);
          };
        }(), {
          concurrency: concurrency
        }).then(function (result) {
          _this33.assertTrue(maxReached);
          _this33.assertArrayEquals([2, 4], result);
          _this33.resume();
        });
        this.wait(1000);
      },
      /**
       * Tests that `filter` rejects when one promise in the array rejects
       */
      testFilterRejectValue: function testFilterRejectValue() {
        var _this34 = this;
        var promiseB = qx.Promise.reject(new Error("oops"));
        var promiseC = qx.Promise.resolve(3);
        var promiseD = qx.Promise.resolve(4);
        var arr = [promiseB, promiseC, promiseD, 6];
        qx.Promise.resolve(arr).filter(/*#__PURE__*/function () {
          var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(item, index, length) {
            return _regenerator().w(function (_context6) {
              while (1) switch (_context6.n) {
                case 0:
                  return _context6.a(2, item % 2 === 0);
              }
            }, _callee6);
          }));
          return function (_x11, _x12, _x13) {
            return _ref6.apply(this, arguments);
          };
        }())["catch"](function (e) {
          _this34.assertEquals("oops", e.message);
          setTimeout(function () {
            return _this34.resume();
          }, 1);
        });
        this.wait(1000);
      },
      /**
       * Tests that `filter` rejects when the iterator function throws an error
       */
      testFilterRejectFilterer: function testFilterRejectFilterer() {
        var _this35 = this;
        var promiseB = qx.Promise.resolve(2);
        var promiseC = qx.Promise.resolve(3);
        var promiseD = qx.Promise.resolve(4);
        var arr = [promiseB, promiseC, promiseD, 6];
        qx.Promise.resolve(arr).filter(/*#__PURE__*/function () {
          var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(item) {
            return _regenerator().w(function (_context7) {
              while (1) switch (_context7.n) {
                case 0:
                  throw new Error("oops");
                case 1:
                  return _context7.a(2);
              }
            }, _callee7);
          }));
          return function (_x14) {
            return _ref7.apply(this, arguments);
          };
        }())["catch"](function (e) {
          _this35.assertEquals("oops", e.message);
          setTimeout(function () {
            return _this35.resume();
          }, 1);
        });
        this.wait(1000);
      },
      /**
       * Tests that the `some` method resolves when no promise rejects
       */
      testSomeResolve: function testSomeResolve() {
        var _this36 = this;
        var promiseB = new qx.Promise(function (resolve) {
          setTimeout(function () {
            resolve(2);
          }, 200);
        });
        var promiseC = new qx.Promise(function (resolve) {
          setTimeout(function () {
            resolve(3);
          }, 100);
        });
        var promiseD = new qx.Promise(function (resolve) {
          setTimeout(function () {
            resolve(4);
          }, 300);
        });
        var arr = [promiseB, promiseC, promiseD, 6];
        var p = qx.Promise.resolve(arr).some(2);
        p.then(function (result) {
          _this36.assertArrayEquals([6, 3], result);
          _this36.resume();
        });
        this.assertInstance(p, qx.Promise);
        this.wait(1000);
      },
      /**
       * Tests that the `some` method still resolves when one promise rejects
       * such that enough promises still resolve.
       * Also tests with a straight value in the array
       */
      testSomeOneReject: function testSomeOneReject() {
        var _this37 = this;
        var promiseB = new qx.Promise(function (resolve, reject) {
          setTimeout(function () {
            reject(new Error("oops"));
          }, 200);
        });
        var promiseC = new qx.Promise(function (resolve) {
          setTimeout(function () {
            resolve(3);
          }, 100);
        });
        var promiseD = new qx.Promise(function (resolve) {
          setTimeout(function () {
            resolve(4);
          }, 300);
        });
        var arr = new qx.data.Array([promiseB, promiseC, promiseD, 6]);
        qx.Promise.some(qx.Promise.resolve(arr), 3).then(function (result) {
          _this37.assertArrayEquals([6, 3, 4], result);
          _this37.resume();
        });
        this.wait(1000);
      },
      /**
       * Ensures that the `some` method rejects
       * when too many promises reject such that there aren't enough
       * resolved promises to satisfy the count
       */
      testSomeTooManyReject: function testSomeTooManyReject() {
        var _this38 = this;
        var promiseB = new qx.Promise(function (resolve, reject) {
          setTimeout(function () {
            reject(new Error("oops"));
          }, 200);
        });
        var promiseC = new qx.Promise(function (resolve, reject) {
          setTimeout(function () {
            reject(new Error("oops1"));
          }, 100);
        });
        var promiseD = new qx.Promise(function (resolve) {
          setTimeout(function () {
            resolve(4);
          }, 300);
        });
        var arr = [promiseB, promiseC, promiseD, 6];
        qx.Promise.resolve(arr).some(3)["catch"](function (error) {
          var errors = qx.lang.Type.isArray(error.errors) ? error.errors : error;
          _this38.assertArrayEquals(["oops1", "oops"], errors.map(function (e) {
            return e.message;
          }));
          _this38.resume();
        });
        this.wait(1000);
      },
      /**
       * Ensures that the `map` method resolves when no promise rejects
       */
      testMapResolve: function testMapResolve() {
        var _this39 = this;
        var promiseB = qx.Promise.resolve(2);
        var promiseC = qx.Promise.resolve(3);
        var promiseD = qx.Promise.resolve(4);
        var arr = [promiseB, promiseC, promiseD, 5];
        var t = this;
        var p = qx.Promise.resolve(arr).map(function (item, index, length) {
          t.assertEquals(index, item - 2);
          t.assertEquals(length, 4);
          this.assertIdentical(t, this);
          return item * 2;
        }, this);
        p.then(function (result) {
          _this39.assertArrayEquals([4, 6, 8, 10], result);
          setTimeout(function () {
            return _this39.resume();
          }, 1);
        });
        this.assertInstance(p, qx.Promise);
        this.wait(1000);
      },
      /**
       * Tests the `concurrency` option of the `map` method
       */
      testMapConcurrency: function testMapConcurrency() {
        var _this40 = this;
        var promiseA = qx.Promise.resolve(1);
        var arr = new qx.data.Array([promiseA, 2, 3, 4]);
        var maxReached = false;
        var concurrency = 2;
        var running = 0;
        var t = this;
        var promise = qx.Promise.map(qx.Promise.resolve(arr), /*#__PURE__*/function () {
          var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(item) {
            return _regenerator().w(function (_context8) {
              while (1) switch (_context8.n) {
                case 0:
                  running++;
                  if (running > concurrency) {
                    t.fail("Too many running tasks");
                  } else if (running == concurrency) {
                    maxReached = true;
                  }
                  _context8.n = 1;
                  return new qx.Promise(function (resolve) {
                    return setTimeout(resolve, 200);
                  });
                case 1:
                  running--;
                  return _context8.a(2, item * 2);
              }
            }, _callee8);
          }));
          return function (_x15) {
            return _ref8.apply(this, arguments);
          };
        }(), {
          concurrency: concurrency
        }).then(function (result) {
          _this40.assertTrue(maxReached);
          _this40.assertArrayEquals([2, 4, 6, 8], result);
          _this40.resume();
        });
        this.assertInstance(promise, qx.Promise);
        this.wait(1000);
      },
      /**
       * Tests the `map` method when one promise in the array rejects
       */
      testMapOneReject: function testMapOneReject() {
        var _this41 = this;
        var promiseB = qx.Promise.resolve(2);
        var promiseC = qx.Promise.reject(new Error("oops"));
        var promiseD = qx.Promise.resolve(4);
        var arr = [promiseB, promiseC, promiseD];
        qx.Promise.resolve(arr).map(/*#__PURE__*/function () {
          var _ref9 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(item) {
            return _regenerator().w(function (_context9) {
              while (1) switch (_context9.n) {
                case 0:
                  return _context9.a(2, item * 2);
              }
            }, _callee9);
          }));
          return function (_x16) {
            return _ref9.apply(this, arguments);
          };
        }())["catch"](function (err) {
          _this41.assertEquals("oops", err.message);
          setTimeout(function () {
            return _this41.resume();
          }, 1);
        });
        this.wait(1000);
      },
      /**
       * Tests the `map` method rejects when the iterator (mapper) function rejects.
       */
      testMapMapperReject: function testMapMapperReject() {
        var _this42 = this;
        var promiseB = qx.Promise.resolve(2);
        var promiseC = qx.Promise.resolve(3);
        var promiseD = qx.Promise.resolve(4);
        var arr = [promiseB, promiseC, promiseD];
        qx.Promise.resolve(arr).map(/*#__PURE__*/function () {
          var _ref0 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(item) {
            return _regenerator().w(function (_context0) {
              while (1) switch (_context0.n) {
                case 0:
                  throw new Error("oops");
                case 1:
                  return _context0.a(2);
              }
            }, _callee0);
          }));
          return function (_x17) {
            return _ref0.apply(this, arguments);
          };
        }())["catch"](function (err) {
          _this42.assertEquals("oops", err.message);
          setTimeout(function () {
            return _this42.resume();
          }, 1);
        });
        this.wait(1000);
      },
      /**
       * Ensures the `mapSeries` method resolves when no promise rejects.
       * Also tests custom context for the iterator function
       */
      testMapSeriesResolve: function testMapSeriesResolve() {
        var _this43 = this;
        var promiseB = qx.Promise.resolve(1);
        var promiseC = qx.Promise.resolve(2);
        var promiseD = qx.Promise.resolve(3);
        var checkIndex = 0;
        var arr = [promiseB, promiseC, promiseD, 4];
        var p = qx.Promise.resolve(arr).mapSeries(/*#__PURE__*/function () {
          var _ref1 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1(item, index, length) {
            return _regenerator().w(function (_context1) {
              while (1) switch (_context1.n) {
                case 0:
                  _this43.assertEquals(checkIndex++, index);
                  _this43.assertEquals(4, length);
                  return _context1.a(2, item * 2);
              }
            }, _callee1);
          }));
          return function (_x18, _x19, _x20) {
            return _ref1.apply(this, arguments);
          };
        }());
        p.then(function (doubles) {
          _this43.assertArrayEquals([2, 4, 6, 8], doubles);
          setTimeout(function () {
            return _this43.resume();
          }, 1);
        });
        this.assertInstance(p, qx.Promise);
        this.wait(1000);
      },
      /**
       * Tests the `mapSeries` method when one promise in the array rejects.
       * The returned promise should reject.
       */
      testMapSeriesOneReject: function testMapSeriesOneReject() {
        var _this44 = this;
        var promiseB = qx.Promise.reject(new Error("oops"));
        var promiseC = qx.Promise.resolve(2);
        var promiseD = qx.Promise.resolve(3);
        var arr = [promiseB, promiseC, promiseD];
        qx.Promise.resolve(arr).mapSeries(/*#__PURE__*/function () {
          var _ref10 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee10(item) {
            return _regenerator().w(function (_context10) {
              while (1) switch (_context10.n) {
                case 0:
                  return _context10.a(2, item * 2);
              }
            }, _callee10);
          }));
          return function (_x21) {
            return _ref10.apply(this, arguments);
          };
        }())["catch"](function (e) {
          _this44.assertEquals("oops", e.message);
          setTimeout(function () {
            return _this44.resume();
          }, 1);
        });
        this.wait(1000);
      },
      /**
       * Tests the `mapSeries` method when the iterator rejects.
       * The returned promise should reject.
       */
      testMapSeriesMapperReject: function testMapSeriesMapperReject() {
        var _this45 = this;
        var promiseB = qx.Promise.resolve(2);
        var promiseC = qx.Promise.resolve(3);
        var promiseD = qx.Promise.resolve(4);
        var arr = [promiseB, promiseC, promiseD];
        qx.Promise.resolve(arr).mapSeries(/*#__PURE__*/function () {
          var _ref11 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee11(item) {
            return _regenerator().w(function (_context11) {
              while (1) switch (_context11.n) {
                case 0:
                  throw new Error("oops");
                case 1:
                  return _context11.a(2);
              }
            }, _callee11);
          }));
          return function (_x22) {
            return _ref11.apply(this, arguments);
          };
        }())["catch"](function (err) {
          _this45.assertEquals("oops", err.message);
          setTimeout(function () {
            return _this45.resume();
          }, 1);
        });
        this.wait(1000);
      },
      /**
       * Tests the `mapSeries` being passed with the promise of the array,
       * which is also a qx.data.Array, which the native Promise does not understand
       */
      testMapSeriesPromiseArray: function testMapSeriesPromiseArray() {
        var _this46 = this;
        var promiseArr = qx.Promise.resolve(new qx.data.Array([1, 2, 3]));
        qx.Promise.mapSeries(promiseArr, function (item, index) {
          _this46.assertEquals(index, item - 1);
          return item * 2;
        }).then(function (result) {
          setTimeout(function () {
            return _this46.resume();
          }, 1);
        });
        this.wait(1000);
      }
    },
    statics: {
      TEST_MODEL: {
        name: "qx",
        children: [{
          name: "test",
          children: [{
            name: "Class",
            children: [{
              name: "test: instantiate class in defer and access property"
            }, {
              name: "testAbstract"
            }, {
              name: "testAnonymous"
            }]
          }, {
            name: "Bootstrap",
            children: [{
              name: "test: define bootstrap class, which extends 'Error'"
            }, {
              name: "test: define class with constructor"
            }, {
              name: "test: extend from Bootstrap class"
            }]
          }]
        }]
      }
    }
  });
  qx.test.Promise.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Promise.js.map?dt=1782967152178