function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
      "qx.io.remote.Request": {},
      "qx.io.remote.Rpc": {},
      "qx.event.Registration": {},
      "qx.io.remote.Response": {},
      "qx.lang.Type": {},
      "qx.lang.Json": {},
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

  qx.Class.define("qx.test.io.remote.Rpc", {
    extend: qx.dev.unit.TestCase,
    include: qx.dev.unit.MMock,
    members: {
      setUpFakeRequest: function setUpFakeRequest() {
        var req = this.request = new qx.io.remote.Request();

        // In prototype chain
        req.setState = req.getSequenceNumber = req.setData = req.send = function () {};

        // Stub
        this.stub(req);
        req.addListener.restore();
        req.dispatchEvent.restore();
        req.getSequenceNumber.returns(undefined);

        // Inject
        this.injectStub(qx.io.remote, "Request", req);
      },
      tearDown: function tearDown() {
        this.getSandbox().restore();
      },
      "test: send request": function testSendRequest() {
        this.setUpFakeRequest();
        var rpc = new qx.io.remote.Rpc("/foo");
        rpc.callAsync();
        this.assertCalledOnce(this.request.send);
      },
      "test: request data for params with date contains date literal when convert dates": function testRequestDataForParamsWithDateContainsDateLiteralWhenConvertDates() {
        this.setUpFakeRequest();
        var obj = {
            date: new Date(Date.UTC(2020, 0, 1, 0, 0, 0, 123))
          },
          msg,
          data;
        var rpc = new qx.io.remote.Rpc();
        this.stub(rpc, "_isConvertDates").returns(true);
        this.stub(rpc, "createRpcData").returns({
          params: obj
        });
        rpc.callAsync();
        data = this.request.setData.getCall(0).args[0];
        msg = "Must contain converted date literal";
        this.assertMatch(data, /"new Date\(Date.UTC\(2020,0,1,0,0,0,123\)\)"/, msg);
      },
      "test: request data for params with nested date contains date literal when convert dates": function testRequestDataForParamsWithNestedDateContainsDateLiteralWhenConvertDates() {
        this.setUpFakeRequest();
        var obj = {
            nested: {
              date: new Date(Date.UTC(2020, 0, 1, 0, 0, 0, 123))
            }
          },
          msg,
          data;
        var rpc = new qx.io.remote.Rpc();
        this.stub(rpc, "_isConvertDates").returns(true);
        this.stub(rpc, "createRpcData").returns({
          params: obj
        });
        rpc.callAsync();
        data = this.request.setData.getCall(0).args[0];
        msg = "Must contain converted date literal";
        this.assertMatch(data, /"new Date\(Date.UTC\(2020,0,1,0,0,0,123\)\)"/, msg);
      },
      "test: response contains date from literal when convert dates": function testResponseContainsDateFromLiteralWhenConvertDates() {
        this.setUpFakeRequest();
        var rpc = new qx.io.remote.Rpc(),
          req = this.request,
          evt = qx.event.Registration.createEvent("completed", qx.io.remote.Response),
          str = '{"result": {"date": new Date(Date.UTC(2020,0,1,0,0,0,123))} }',
          that = this;
        this.stub(rpc, "_isConvertDates").returns(true);
        var callback = this.spy(function (result) {
          var msg = "Expected value to be date but found " + _typeof(result.date);
          that.assertTrue(qx.lang.Type.isDate(result.date), msg);
        });
        rpc.callAsync(callback);

        // Fake JSON-like (JavaScript) response
        evt.setContent(str);
        req.dispatchEvent(evt);
        this.assertCalled(callback);
      },
      "test: response contains date from literal when convert dates and json response": function testResponseContainsDateFromLiteralWhenConvertDatesAndJsonResponse() {
        this.setUpFakeRequest();
        var rpc = new qx.io.remote.Rpc(),
          req = this.request,
          evt = qx.event.Registration.createEvent("completed", qx.io.remote.Response),
          str = '{"result": {"date": "new Date(Date.UTC(2020,0,1,0,0,0,123))"} }',
          that = this;
        this.stub(rpc, "_isConvertDates").returns(true);
        this.stub(rpc, "_isResponseJson").returns(true);
        this.spy(qx.lang.Json, "parse");
        var callback = this.spy(function (result) {
          var msg;
          that.assertCalled(qx.lang.Json.parse);
          msg = "Expected value to be date but found " + _typeof(result.date);
          that.assertTrue(qx.lang.Type.isDate(result.date), msg);
        });
        rpc.callAsync(callback);

        // Fake JSON (String) response
        evt.setContent(str);
        req.dispatchEvent(evt);
        this.assertCalled(callback);
      },
      "test: response is parsed as JSON": function testResponseIsParsedAsJSON() {
        this.setUpFakeRequest();
        var rpc = new qx.io.remote.Rpc(),
          req = this.request,
          evt = qx.event.Registration.createEvent("completed", qx.io.remote.Response),
          str = '{"result": { "json" : true} }',
          that = this;
        this.stub(rpc, "_isConvertDates").returns(false);
        this.spy(qx.lang.Json, "parse");
        var callback = this.spy(function (result) {
          that.assertCalledWith(qx.lang.Json.parse, str);
        });
        rpc.callAsync(callback);

        // Fake JSON (String) response
        evt.setContent(str);
        req.dispatchEvent(evt);
        this.assertCalled(callback);
      },
      "test: response is not parsed when already object": function testResponseIsNotParsedWhenAlreadyObject() {
        this.setUpFakeRequest();
        var rpc = new qx.io.remote.Rpc(),
          req = this.request,
          evt = qx.event.Registration.createEvent("completed", qx.io.remote.Response),
          obj = {
            result: {
              json: true
            }
          },
          that = this;
        this.stub(rpc, "_isConvertDates").returns(false);
        this.spy(qx.lang.Json, "parse");
        var callback = this.spy(function (result) {
          that.assertNotCalled(qx.lang.Json.parse);
        });
        rpc.callAsync(callback);

        // Object response
        evt.setContent(obj);
        req.dispatchEvent(evt);
        this.assertCalled(callback);
      },
      //
      // isConvertDates()
      //
      "test: isConvertDates() returns true when Rpc true": function testIsConvertDatesReturnsTrueWhenRpcTrue() {
        var rpc = new qx.io.remote.Rpc();
        this.stub(qx.io.remote.Rpc, "CONVERT_DATES", true);
        this.assertEquals(true, rpc._isConvertDates());
      },
      skip: function skip(msg) {
        throw new qx.dev.unit.RequirementError(null, msg);
      }
    }
  });
  qx.test.io.remote.Rpc.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Rpc.js.map?dt=1726089054594