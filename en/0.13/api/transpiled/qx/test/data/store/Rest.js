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
      "qx.dev.unit.MMock": {
        "require": true
      },
      "qx.dev.unit.MRequirements": {
        "require": true
      },
      "qx.data.marshal.Json": {},
      "qx.data.store.Rest": {},
      "qx.io.rest.Resource": {},
      "qx.io.request.Xhr": {},
      "qx.io.request.AbstractRequest": {},
      "qx.core.AssertionError": {},
      "qx.dev.unit.RequirementError": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Tristan Koch (tristankoch)
  
  ************************************************************************ */

  qx.Class.define("qx.test.data.store.Rest", {
    extend: qx.dev.unit.TestCase,
    include: [qx.dev.unit.MMock, qx.dev.unit.MRequirements],
    members: {
      setUp: function setUp() {
        this.setUpDoubleRequest();
        var marshal = this.marshal = new qx.data.marshal.Json();
        marshal = this.shallowStub(marshal, qx.data.marshal.Json);
        this.injectStub(qx.data.marshal, "Json", marshal);
        marshal.toModel.returns({});
        this.setUpResource();
        this.store = new qx.data.store.Rest(this.res, "index");
      },
      setUpResource: function setUpResource() {
        this.res && this.res.dispose();
        var description = {
          index: {
            method: "GET",
            url: "/photos"
          }
        };
        return this.res = new qx.io.rest.Resource(description);
      },
      setUpDoubleRequest: function setUpDoubleRequest() {
        var req = this.req = new qx.io.request.Xhr(),
          res = this.res;

        // Stub request methods, leave event system intact
        req = this.shallowStub(req, qx.io.request.AbstractRequest);

        // Not dispose stub yet
        this.stub(req, "dispose");

        // Inject double and return
        this.injectStub(qx.io.request, "Xhr", req);
        return req;
      },
      tearDown: function tearDown() {
        this.getSandbox().restore();
        this.req.dispose();
        this.marshal.dispose();
        this.res.dispose();
        this.store.dispose();
      },
      "test: construct with res and action name": function testConstructWithResAndActionName() {
        var store = this.store;
        this.assertIdentical(store.getResource(), this.res);
        this.assertIdentical(store.getActionName(), "index");
      },
      "test: construct throws with missing res": function testConstructThrowsWithMissingRes() {
        this.require(["debug"]);
        var store;

        // Unfortunately, qx.core.Property throws a generic error
        this.assertException(function () {
          store = new qx.data.store.Rest(null, "index");
        }, Error, /property res/);
        store && store.dispose();
      },
      "test: construct throws with erroneous res": function testConstructThrowsWithErroneousRes() {
        this.require(["debug"]);
        var store;
        this.assertException(function () {
          store = new qx.data.store.Rest({}, "index");
        }, qx.core.AssertionError);
        store && store.dispose();
      },
      "test: construct throws with missing action": function testConstructThrowsWithMissingAction() {
        this.require(["debug"]);
        var store,
          res = this.res;
        this.assertException(function () {
          store = new qx.data.store.Rest(res, null);
        }, Error, /property actionName/);
        store && store.dispose();
      },
      "test: add listener for actionSuccess to res": function testAddListenerForActionSuccessToRes() {
        var res = this.res,
          store;
        this.stub(res, "addListener");
        store = new qx.data.store.Rest(res, "index");
        this.assertCalled(res.addListener);
        store.dispose();
      },
      "test: marshal response": function testMarshalResponse() {
        var res = this.res,
          store = this.store,
          marshal = this.marshal,
          data = {
            key: "value"
          };
        res.index();
        this.respond(data);
        this.assertCalledWith(marshal.toModel, data);
      },
      "test: populates model property with marshaled response": function testPopulatesModelPropertyWithMarshaledResponse() {
        // Do not stub marshal.Json
        qx.data.marshal.Json.restore();
        var res = this.setUpResource(),
          store = new qx.data.store.Rest(res, "index");
        res.index();
        this.respond({
          name: "Affe"
        });
        // this.assertEquals("Affe", store.getModel().getName());
        store.dispose();
      },
      "test: fires changeModel": function testFiresChangeModel() {
        // Do not stub marshal.Json
        qx.data.marshal.Json.restore();
        var res = this.setUpResource(),
          store = new qx.data.store.Rest(res, "index"),
          that = this;
        res.index();
        this.assertEventFired(store, "changeModel", function () {
          that.respond({
            name: "Affe"
          });
        });
        store.dispose();
        res.dispose();
      },
      "test: configure request with delegate": function testConfigureRequestWithDelegate() {
        var res = this.res,
          req = this.req;
        var configureRequest = this.spy(function (req) {
          req.setUserData("affe", true);
        });
        var delegate = {
          configureRequest: configureRequest
        };
        var store = new qx.data.store.Rest(res, "index", delegate);

        // Configure before sending
        this.assertNotCalled(req.send);
        res.index();
        this.assertCalledWith(configureRequest, req);
        this.assertTrue(req.getUserData("affe"));
        this.assertCalled(req.send);
        store.dispose();
      },
      "test: manipulate data with delegate before marshaling": function testManipulateDataWithDelegateBeforeMarshaling() {
        var res = this.res,
          data = {
            name: "Tiger"
          };
        var manipulateData = this.spy(function (data) {
          data.name = "Maus";
          return data;
        });
        var delegate = {
          manipulateData: manipulateData
        };
        var store = new qx.data.store.Rest(res, "index", delegate);
        res.index();
        this.respond(data);
        this.assertCalledWith(manipulateData, data);
        this.assertCalledWith(this.marshal.toModel, {
          name: "Maus"
        });
        store.dispose();
      },
      hasDebug: function hasDebug() {
        return false;
      },
      // Fake response
      respond: function respond(response) {
        var req = this.req;
        response = response || "";
        req.getPhase.returns("success");

        // Set parsed response
        req.getResponse.returns(response);
        req.fireEvent("success");
      },
      skip: function skip(msg) {
        throw new qx.dev.unit.RequirementError(null, msg);
      }
    }
  });
  qx.test.data.store.Rest.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Rest.js.map?dt=1726089053268