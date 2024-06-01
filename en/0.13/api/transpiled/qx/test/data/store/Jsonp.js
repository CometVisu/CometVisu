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
      "qx.dev.unit.MRequirements": {
        "require": true
      },
      "qx.dev.unit.MMock": {
        "require": true
      },
      "qx.data.store.Jsonp": {},
      "qx.util.ResourceManager": {},
      "qx.io.request.Jsonp": {},
      "qx.bom.client.Browser": {
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "browser.name": {
          "className": "qx.bom.client.Browser"
        }
      }
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
  
  ************************************************************************ */

  /* ************************************************************************
  
  
  ************************************************************************ */
  /**
   * @ignore(qx.data.model)
   *
   * @asset(qx/test/*)
   */

  qx.Class.define("qx.test.data.store.Jsonp", {
    extend: qx.dev.unit.TestCase,
    include: [qx.dev.unit.MRequirements, qx.dev.unit.MMock],
    members: {
      __P_339_0: null,
      setUp: function setUp() {
        this.require(["php"]);
        this.__P_339_0 = new qx.data.store.Jsonp();
        this.url = qx.util.ResourceManager.getInstance().toUri("qx/test/jsonp_primitive.php");
      },
      tearDown: function tearDown() {
        this.getSandbox().restore();
        this.__P_339_0.dispose();
        if (this.request) {
          // From prototype
          delete this.request.dispose;

          // Dispose
          this.request.dispose();
        }

        // remove the former created classes
        qx.data.model = {};
        for (var name in qx.Class.$$registry) {
          if (name.search("qx.data.model") != -1) {
            delete qx.Class.$$registry[name];
          }
        }
      },
      isLocal: function isLocal() {
        return window.location.protocol == "file:";
      },
      setUpFakeRequest: function setUpFakeRequest() {
        var req = this.request = new qx.io.request.Jsonp();
        req.send = req.dispose = function () {};
        this.stub(qx.io.request, "Jsonp").returns(this.stub(req));
      },
      testSetCallbackParam: function testSetCallbackParam() {
        this.setUpFakeRequest();
        var store = new qx.data.store.Jsonp();
        store.setCallbackParam("myCallback");
        store.setUrl("/url");
        this.assertCalledWith(this.request.setCallbackParam, "myCallback");
        store.dispose();
      },
      testSetCallbackName: function testSetCallbackName() {
        this.setUpFakeRequest();
        var store = new qx.data.store.Jsonp();
        store.setCallbackName("myCallback");
        store.setUrl("/url");
        this.assertCalledWith(this.request.setCallbackName, "myCallback");
        store.dispose();
      },
      testWholePrimitive: function testWholePrimitive() {
        var _this = this;
        this.__P_339_0.addListener("loaded", function () {
          _this.resume(function () {
            var model = this.__P_339_0.getModel();
            this.assertEquals("String", model.getString(), "The model is not created how it should!");
            this.assertEquals(12, model.getNumber(), "The model is not created how it should!");
            this.assertEquals(true, model.getBoolean(), "The model is not created how it should!");
            this.assertNull(model.getNull(), "The model is not created how it should!");
          }, _this);
        });
        var url = this.url;
        this.__P_339_0.setUrl(url);
        this.wait();
      },
      testManipulatePrimitive: function testManipulatePrimitive() {
        var _this2 = this;
        var manipulated = false;
        var delegate = {
          manipulateData: function manipulateData(data) {
            manipulated = true;
            return data;
          }
        };
        var store = new qx.data.store.Jsonp(null, delegate, "callback");
        store.addListener("loaded", function () {
          _this2.resume(function () {
            this.assertTrue(manipulated);
          }, _this2);
        });
        var url = this.url;
        store.setUrl(url);
        this.wait();
        store.dispose();
      },
      testConfigureRequestPrimitive: function testConfigureRequestPrimitive() {
        var _this3 = this;
        var delegate,
          self = this;
        delegate = {
          configureRequest: function configureRequest(request) {
            self.assertInstance(request, qx.io.request.Jsonp);
          }
        };
        this.spy(delegate, "configureRequest");
        var store = new qx.data.store.Jsonp(null, delegate, "callback");
        store.addListener("loaded", function () {
          _this3.resume(function () {
            this.assertCalled(delegate.configureRequest);
          }, _this3);
        });
        var url = this.url;
        store.setUrl(url);
        this.wait();
      },
      testDisposeRequest: function testDisposeRequest() {
        this.setUpFakeRequest();
        var store = new qx.data.store.Jsonp(this.url);
        store.dispose();
        this.assertCalled(this.request.dispose);
      },
      testDisposeRequestDone: function testDisposeRequestDone() {
        var _this4 = this;
        this.setUpFakeRequest();
        var url = this.url;
        this.__P_339_0.addListener("loaded", function () {
          _this4.resume(function () {
            this.__P_339_0.dispose();
            this.assertCalled(this.request.dispose);
          }, _this4);
        });
        this.__P_339_0.setUrl(url);
      },
      testErrorEvent: function testErrorEvent() {
        var _this5 = this;
        // do not test that for IE and Opera because of the missing
        // error handler for script tags
        if (!(qx.core.Environment.get("browser.name") == "ie") && !(qx.core.Environment.get("browser.name") == "opera")) {
          this.__P_339_0.addListener("error", function () {
            _this5.resume(function () {}, _this5);
          });
          this.__P_339_0.setUrl("affe");
          this.wait();
        }
      }
    }
  });
  qx.test.data.store.Jsonp.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Jsonp.js.map?dt=1717235388933