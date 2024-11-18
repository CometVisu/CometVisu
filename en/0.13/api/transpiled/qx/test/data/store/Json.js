(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.io.request.Xhr": {
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.dev.unit.TestCase": {
        "require": true
      },
      "qx.dev.unit.MMock": {
        "require": true
      },
      "qx.data.store.Json": {},
      "qx.util.ResourceManager": {},
      "qx.util.AliasManager": {},
      "qx.core.Object": {},
      "qx.Mixin": {},
      "qx.event.Timer": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
       * Tristan Koch (tristankoch)
  
  ************************************************************************ */

  /* ************************************************************************
   ************************************************************************ */

  /**
   *
   * @asset(qx/test/*)
   * @ignore(qx.data.model, qx.test.O, qx.test.M, qx.test.M1, qx.test.M2)
   * @require(qx.io.request.Xhr)
   */

  qx.Class.define("qx.test.data.store.Json", {
    extend: qx.dev.unit.TestCase,
    include: qx.dev.unit.MMock,
    members: {
      __P_338_0: null,
      __P_338_1: null,
      __P_338_2: null,
      /**
       * @lint ignoreDeprecated(eval)
       */
      setUp: function setUp() {
        this.__P_338_0 = new qx.data.store.Json();
        this.__P_338_1 = eval("({s: 'String', n: 12, b: true})");
        this.__P_338_2 = ["s", "n", "b"];
        this.url = qx.util.ResourceManager.getInstance().toUri("qx/test/primitive.json");
      },
      setUpFakeRequest: function setUpFakeRequest() {
        var req = this.request = new qx.io.request.Xhr(this.url);
        req.send = req.setParser = function () {};
        req.dispose = qx.io.request.Xhr.prototype.dispose;
        this.stub(qx.io.request, "Xhr").returns(this.stub(req));
      },
      tearDown: function tearDown() {
        this.getSandbox().restore();
        if (this.request) {
          // Restore manually (is unreachable from sandbox)
          if (typeof this.request.dispose.restore == "function") {
            this.request.dispose.restore();
          }

          // Dispose
          this.request.dispose();
        }
        this.__P_338_0.dispose();

        // Remove the former created classes
        qx.data.model = {};
        for (var name in qx.Class.$$registry) {
          if (name.search("qx.data.model") != -1) {
            delete qx.Class.$$registry[name];
          }
        }
      },
      testConfigureNewTransportConstructor: function testConfigureNewTransportConstructor() {
        var store = new qx.data.store.Json(this.url, null, false);
        store.dispose();
      },
      testLoadUrl: function testLoadUrl() {
        var _this = this;
        this.__P_338_0.addListener("loaded", function () {
          _this.resume(function () {
            var model = this.__P_338_0.getModel();
            this.assertEquals("String", model.getString(), "The model is not created how it should!");
          }, _this);
        });
        var url = this.url;
        this.__P_338_0.setUrl(url);
        this.wait();
      },
      testProgressStates: function testProgressStates() {
        var _this2 = this;
        var url = this.url,
          states = [];
        this.__P_338_0.addListener("changeState", function (evt) {
          var state = evt.getData();
          states.push(state);
          if (state == "completed") {
            _this2.resume(function () {
              var expected = ["configured", "sending", "receiving", "completed"];
              this.assertArrayEquals(expected, states);
            });
          }
        });
        this.__P_338_0.setUrl(url);
        this.wait();
      },
      testLoadResource: function testLoadResource() {
        var _this3 = this;
        this.__P_338_0.addListener("loaded", function () {
          _this3.resume(function () {
            var model = this.__P_338_0.getModel();
            this.assertEquals("String", model.getString(), "The model is not created how it should!");
          }, _this3);
        });
        var resource = "qx/test/primitive.json";
        this.__P_338_0.setUrl(resource);
        this.wait();
      },
      testParseErrorForResource: function testParseErrorForResource() {
        var _this4 = this;
        this.__P_338_0.addListener("parseError", function (ev) {
          _this4.resume(function () {
            this.assertString(ev.getData().response, "Parse error object does not contain response!");
            this.assertObject(ev.getData().error, "Parse error object does not contain parser exception!");
          }, _this4);
        });
        var resource = "qx/test/failing.json";
        this.__P_338_0.setUrl(resource);
        this.wait();
      },
      testLoadAlias: function testLoadAlias() {
        var _this5 = this;
        this.__P_338_0.addListener("loaded", function () {
          _this5.resume(function () {
            var model = this.__P_338_0.getModel();
            this.assertEquals("String", model.getString(), "The model is not created how it should!");
            qx.util.AliasManager.getInstance().remove("testLoadResource");
          }, _this5);
        });

        // invoke alias handling
        qx.util.AliasManager.getInstance().add("testLoadResource", "qx/test");
        var alias = "testLoadResource/primitive.json";
        this.__P_338_0.setUrl(alias);
        this.wait();
      },
      testDispose: function testDispose() {
        this.__P_338_0.setUrl(this.url);
        this.__P_338_0.dispose();
      },
      testWholePrimitive: function testWholePrimitive() {
        var _this6 = this;
        this.__P_338_0.addListener("loaded", function () {
          _this6.resume(function () {
            var model = this.__P_338_0.getModel();
            this.assertEquals("String", model.getString(), "The model is not created how it should!");
            this.assertEquals(12, model.getNumber(), "The model is not created how it should!");
            this.assertEquals(true, model.getBoolean(), "The model is not created how it should!");
            this.assertNull(model.getNull(), "The model is not created how it should!");
          }, _this6);
        });
        var url = this.url;
        this.__P_338_0.setUrl(url);
        this.wait();
      },
      testWholeArray: function testWholeArray() {
        var _this7 = this;
        this.__P_338_0.addListener("loaded", function () {
          _this7.resume(function () {
            var model = this.__P_338_0.getModel();
            this.assertNotNull(model.getArray(), "The model is not created how it should!");
            this.assertEquals("qx.data.Array", model.getArray().classname, "Wrong array class.");
            this.assertEquals("a", model.getArray().getItem(0), "Wrong content of the array.");
            this.assertEquals("b", model.getArray().getItem(1), "Wrong content of the array.");
            this.assertEquals("c", model.getArray().getItem(2), "Wrong content of the array.");
          }, _this7);
        });
        var url = qx.util.ResourceManager.getInstance().toUri("qx/test/array.json");
        this.__P_338_0.setUrl(url);
        this.wait();
      },
      testWholeObject: function testWholeObject() {
        var _this8 = this;
        this.__P_338_0.addListener("loaded", function () {
          _this8.resume(function () {
            var model = this.__P_338_0.getModel();
            this.assertNotNull(model.getO(), "The model is not created how it should!");
            this.assertEquals("a", model.getO().getA(), "Wrong content of the object.");
            this.assertEquals("b", model.getO().getB(), "Wrong content of the object.");
          }, _this8);
        });
        var url = qx.util.ResourceManager.getInstance().toUri("qx/test/object.json");
        this.__P_338_0.setUrl(url);
        this.wait();
      },
      testOwnClassWith: function testOwnClassWith() {
        var _this9 = this;
        // define a test class
        qx.Class.define("qx.test.AB", {
          extend: qx.core.Object,
          properties: {
            a: {
              check: "String",
              event: "changeA"
            },
            b: {
              check: "String",
              event: "changeB"
            }
          }
        });
        var delegate = {
          getModelClass: function getModelClass(properties) {
            if (properties == "a|b" || properties == "a|b♥") {
              return qx.Class.getByName("qx.test.AB");
            }
            return null;
          }
        };
        this.__P_338_0 = new qx.data.store.Json(null, delegate);
        this.__P_338_0.addListener("loaded", function () {
          _this9.resume(function () {
            var model = this.__P_338_0.getModel();
            this.assertNotNull(model.getO(), "The model is not created how it should!");
            this.assertEquals("qx.test.AB", model.getO().classname, "Not the given class used!");
            this.assertEquals("a", model.getO().getA(), "Wrong content of the object.");
            this.assertEquals("b", model.getO().getB(), "Wrong content of the object.");
          }, _this9);
        });
        var url = qx.util.ResourceManager.getInstance().toUri("qx/test/object.json");
        this.__P_338_0.setUrl(url);
        this.wait();
      },
      testOwnClassWithout: function testOwnClassWithout() {
        var _this10 = this;
        var delegate = {
          getModelClass: function getModelClass(properties) {
            return null;
          }
        };
        this.__P_338_0 = new qx.data.store.Json(null, delegate);
        this.__P_338_0.addListener("loaded", function () {
          _this10.resume(function () {
            var model = this.__P_338_0.getModel();
            this.assertNotNull(model.getO(), "The model is not created how it should!");
            this.assertEquals("a", model.getO().getA(), "Wrong content of the object.");
            this.assertEquals("b", model.getO().getB(), "Wrong content of the object.");
          }, _this10);
        });
        var url = qx.util.ResourceManager.getInstance().toUri("qx/test/object.json");
        this.__P_338_0.setUrl(url);
        this.wait();
      },
      testOwnSuperclassWith: function testOwnSuperclassWith() {
        var _this11 = this;
        // define a test class
        qx.Class.define("qx.test.O", {
          extend: qx.core.Object
        });
        var delegate = {
          getModelSuperClass: function getModelSuperClass(properties) {
            return qx.test.O;
          }
        };
        this.__P_338_0 = new qx.data.store.Json(null, delegate);
        this.__P_338_0.addListener("loaded", function () {
          _this11.resume(function () {
            var model = this.__P_338_0.getModel();
            this.assertTrue(qx.Class.isSubClassOf(model.constructor, qx.test.O));
            this.assertNotNull(model.getO(), "The model is not created how it should!");
            this.assertTrue(qx.Class.isSubClassOf(model.getO().constructor, qx.test.O));
            this.assertEquals("a", model.getO().getA(), "Wrong content of the object.");
            this.assertEquals("b", model.getO().getB(), "Wrong content of the object.");
          }, _this11);
        });
        var url = qx.util.ResourceManager.getInstance().toUri("qx/test/object.json");
        this.__P_338_0.setUrl(url);
        this.wait();
      },
      testOwnSuperclassWithout: function testOwnSuperclassWithout() {
        var _this12 = this;
        // define a test class
        qx.Class.define("qx.test.O", {
          extend: qx.core.Object
        });
        var delegate = {
          getModelSuperClass: function getModelSuperClass(properties) {
            return null;
          }
        };
        this.__P_338_0 = new qx.data.store.Json(null, delegate);
        this.__P_338_0.addListener("loaded", function () {
          _this12.resume(function () {
            var model = this.__P_338_0.getModel();
            this.assertNotNull(model.getO(), "The model is not created how it should!");
            this.assertEquals("a", model.getO().getA(), "Wrong content of the object.");
            this.assertEquals("b", model.getO().getB(), "Wrong content of the object.");
          }, _this12);
        });
        var url = qx.util.ResourceManager.getInstance().toUri("qx/test/object.json");
        this.__P_338_0.setUrl(url);
        this.wait();
      },
      testOwnMixinWithout: function testOwnMixinWithout() {
        var _this13 = this;
        var delegate = {
          getModelMixins: function getModelMixins(properties) {
            return null;
          }
        };
        this.__P_338_0 = new qx.data.store.Json(null, delegate);
        this.__P_338_0.addListener("loaded", function () {
          _this13.resume(function () {
            var model = this.__P_338_0.getModel();
            this.assertNotNull(model.getO(), "The model is not created how it should!");
            this.assertEquals("a", model.getO().getA(), "Wrong content of the object.");
            this.assertEquals("b", model.getO().getB(), "Wrong content of the object.");
          }, _this13);
        });
        var url = qx.util.ResourceManager.getInstance().toUri("qx/test/object.json");
        this.__P_338_0.setUrl(url);
        this.wait();
      },
      testOwnMixinWith: function testOwnMixinWith() {
        var _this14 = this;
        // define a test class
        qx.Mixin.define("qx.test.M", {
          members: {
            a: function a() {
              return true;
            }
          }
        });
        var delegate = {
          getModelMixins: function getModelMixins(properties) {
            return qx.test.M;
          }
        };
        this.__P_338_0 = new qx.data.store.Json(null, delegate);
        this.__P_338_0.addListener("loaded", function () {
          _this14.resume(function () {
            var model = this.__P_338_0.getModel();
            this.assertTrue(model.a(), "Mixin not included.");
            this.assertNotNull(model.getO(), "The model is not created how it should!");
            this.assertTrue(model.getO().a(), "Mixin not included.");
            this.assertEquals("a", model.getO().getA(), "Wrong content of the object.");
            this.assertEquals("b", model.getO().getB(), "Wrong content of the object.");
          }, _this14);
        });
        var url = qx.util.ResourceManager.getInstance().toUri("qx/test/object.json");
        this.__P_338_0.setUrl(url);
        this.wait();
      },
      testOwnMixinWithMultiple: function testOwnMixinWithMultiple() {
        var _this15 = this;
        // define a test class
        qx.Mixin.define("qx.test.M1", {
          members: {
            a: function a() {
              return true;
            }
          }
        });
        qx.Mixin.define("qx.test.M2", {
          members: {
            b: function b() {
              return true;
            }
          }
        });
        var delegate = {
          getModelMixins: function getModelMixins(properties) {
            return [qx.test.M1, qx.test.M2];
          }
        };
        this.__P_338_0 = new qx.data.store.Json(null, delegate);
        this.__P_338_0.addListener("loaded", function () {
          _this15.resume(function () {
            var model = this.__P_338_0.getModel();
            this.assertTrue(model.a(), "Mixin not included.");
            this.assertTrue(model.b(), "Mixin not included.");
            this.assertNotNull(model.getO(), "The model is not created how it should!");
            this.assertTrue(model.getO().a(), "Mixin not included.");
            this.assertEquals("a", model.getO().getA(), "Wrong content of the object.");
            this.assertEquals("b", model.getO().getB(), "Wrong content of the object.");
          }, _this15);
        });
        var url = qx.util.ResourceManager.getInstance().toUri("qx/test/object.json");
        this.__P_338_0.setUrl(url);
        this.wait();
      },
      testManipulatePrimitive: function testManipulatePrimitive() {
        var _this16 = this;
        var delegate = {
          manipulateData: function manipulateData(data) {
            return data;
          }
        };
        this.spy(delegate, "manipulateData");
        this.__P_338_0.dispose();
        this.__P_338_0 = new qx.data.store.Json(null, delegate);
        this.__P_338_0.addListener("loaded", function () {
          _this16.resume(function () {
            this.assertCalled(delegate.manipulateData);
          }, _this16);
        });
        var url = this.url;
        this.__P_338_0.setUrl(url);
        this.wait();
      },
      testConfigureRequestPrimitive: function testConfigureRequestPrimitive() {
        var _this17 = this;
        var delegate,
          self = this;
        delegate = {
          configureRequest: function configureRequest(request) {
            self.assertInstance(request, qx.io.request.Xhr);
          }
        };
        this.spy(delegate, "configureRequest");
        this.__P_338_0.dispose();
        this.__P_338_0 = new qx.data.store.Json(null, delegate);
        this.__P_338_0.addListener("loaded", function () {
          _this17.resume(function () {
            this.assertCalled(delegate.configureRequest);
          }, _this17);
        });
        var url = this.url;
        this.__P_338_0.setUrl(url);
        this.wait();
      },
      testDisposeOldModel: function testDisposeOldModel() {
        var _this18 = this;
        this.__P_338_0.addListener("loaded", function () {
          _this18.resume(function () {
            var model = this.__P_338_0.getModel();
            // check if the new model is not the old model
            this.assertNotEquals(fakeModel, model);
            // check if the old model has been disposed
            this.assertTrue(fakeModel.isDisposed());
          }, _this18);
        });

        // set a fake model
        var fakeModel = new qx.core.Object();
        this.__P_338_0.setModel(fakeModel);
        var url = this.url;
        this.__P_338_0.setUrl(url);
        this.wait();
      },
      testDisposeRequest: function testDisposeRequest() {
        this.setUpFakeRequest();
        this.__P_338_0.setUrl(this.url);
        this.__P_338_0.dispose();
        this.assertCalled(this.request.dispose);
      },
      testDisposeRequestDone: function testDisposeRequestDone() {
        var _this19 = this;
        this.setUpFakeRequest();
        var url = this.url;
        this.__P_338_0.addListener("loaded", function () {
          _this19.resume(function () {
            this.__P_338_0.dispose();
            this.assertCalled(this.request.dispose);
          }, _this19);
        });
        this.__P_338_0.setUrl(url);
      },
      testErrorEvent: function testErrorEvent() {
        var _this20 = this;
        this.__P_338_0.addListener("error", function (ev) {
          _this20.resume(function () {
            this.assertNotNull(ev);
          }, _this20);
        });
        this.__P_338_0.setUrl("not-found");
        this.wait();
      },
      "test Internal Server Error": function test_Internal_Server_Error() {
        var _this21 = this;
        this.useFakeServer();
        var server = this.getServer();
        server.respondWith("GET", "/foo", [500, {
          "Content-Type": "application/json"
        }, "SERVER ERROR"]);
        this.__P_338_0.addListener("error", function (e) {
          _this21.resume(function () {
            this.assertTrue(e.getData().getPhase() == "statusError");
          });
        });
        qx.event.Timer.once(function () {
          this.__P_338_0.setUrl("/foo");
          server.respond();
        }, this, 500);
        this.wait(1000);
      }
    }
  });
  qx.test.data.store.Json.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Json.js.map?dt=1731948115248