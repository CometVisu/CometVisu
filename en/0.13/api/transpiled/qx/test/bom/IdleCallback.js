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
      "qx.dev.unit.MMock": {
        "require": true
      },
      "qx.dev.unit.MRequirements": {
        "require": true
      },
      "qx.bom.IdleCallback": {},
      "qx.bom.client.Idle": {
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "client.idle": {
          "className": "qx.bom.client.Idle"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2016 GONICUS GmbH, Germany, http://www.gonicus.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Cajus Pollmeier (cajus)
  
  ************************************************************************ */

  qx.Class.define("qx.test.bom.IdleCallback", {
    extend: qx.dev.unit.TestCase,
    include: [qx.dev.unit.MMock, qx.dev.unit.MRequirements],
    members: {
      tearDown: function tearDown() {
        this.getSandbox().restore();
      },
      "test: emulated requestIdleCallback": function test_emulated_requestIdleCallback() {
        var setting = this.stub(qx.core.Environment, "get").withArgs("client.idle");
        setting.returns(false);
        var clb = this.spy();
        qx.bom.IdleCallback.request(clb);
        this.getSandbox().restore();
        this.wait(500, function () {
          this.assertCalledOnce(clb);
          this.assertFalse(clb.args[0][0].didTimeout);
          this.assertFunction(clb.args[0][0].timeRemaining);
          this.assertNumber(clb.args[0][0].timeRemaining());
          this.assertNumber(clb.args[0][0].timeRemaining(), 0);
        }, this);
      },
      "test: emulated cancelIdleCallback": function test_emulated_cancelIdleCallback() {
        var setting = this.stub(qx.core.Environment, "get").withArgs("client.idle");
        setting.returns(false);
        var clb = this.spy();
        var request = qx.bom.IdleCallback.request(clb);
        qx.bom.IdleCallback.cancel(request);
        this.getSandbox().restore();
        this.wait(500, function () {
          this.assertNotCalled(clb);
        }, this);
      },
      "test: native requestIdleCallback": function test_native_requestIdleCallback() {
        if (!qx.core.Environment.get("client.idle")) {
          this.skip();
        }
        var clb = this.spy();
        qx.bom.IdleCallback.request(clb);
        this.wait(500, function () {
          this.assertCalledOnce(clb);
          this.assertFalse(clb.args[0][0].didTimeout);
          this.assertFunction(clb.args[0][0].timeRemaining);
          this.assertNumber(clb.args[0][0].timeRemaining());
        }, this);
      },
      "test: native cancelIdleCallback": function test_native_cancelIdleCallback() {
        if (!qx.core.Environment.get("client.idle")) {
          this.skip();
        }
        var clb = this.spy();
        var request = qx.bom.IdleCallback.request(clb);
        qx.bom.IdleCallback.cancel(request);
        this.wait(500, function () {
          this.assertNotCalled(clb);
        }, this);
      }
    }
  });
  qx.test.bom.IdleCallback.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IdleCallback.js.map?dt=1735383858334