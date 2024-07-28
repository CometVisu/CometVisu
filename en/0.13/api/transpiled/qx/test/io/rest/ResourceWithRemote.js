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
      "qx.dev.unit.MRequirements": {
        "require": true
      },
      "qx.test.io.MRemoteTest": {
        "require": true
      },
      "qx.io.rest.Resource": {}
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

  /* ************************************************************************
  
  
  ************************************************************************ */
  /**
   *
   * @asset(qx/test/xmlhttp/random.php)
   * @asset(qx/test/xmlhttp/long_poll.php)
   * @asset(qx/test/xmlhttp/sample.txt)
   */

  qx.Class.define("qx.test.io.rest.ResourceWithRemote", {
    extend: qx.dev.unit.TestCase,
    include: [qx.dev.unit.MRequirements, qx.test.io.MRemoteTest],
    members: {
      setUp: function setUp() {
        this.require(["http", "php"]);
        this.res = new qx.io.rest.Resource();
      },
      tearDown: function tearDown() {
        this.res.dispose();
      },
      "test: invoke action and handle response": function test_invoke_action_and_handle_response() {
        var _this = this;
        // Handles GET
        var url = this.getUrl("qx/test/xmlhttp/sample.txt"),
          res = this.res;
        res.map("get", "GET", url);
        res.addListener("getSuccess", function (e) {
          _this.resume(function () {
            this.assertEquals("SAMPLE", e.getData());
          }, _this);
        });
        res.get();
        this.wait();
      },
      "test: invoke action and handle failure": function test_invoke_action_and_handle_failure() {
        var _this2 = this;
        this.require(["http"]);
        var url = "/not-found",
          res = this.res;
        res.map("get", "GET", url);
        res.addListener("error", function (e) {
          _this2.resume(function () {
            this.assertEquals("statusError", e.getPhase());
            this.assertEquals("get", e.getAction());
          }, _this2);
        });
        res.get();
        this.wait();
      },
      "test: poll action": function test_poll_action() {
        var _this3 = this;
        // Handles GET
        this.require(["php"]);
        var url = this.getUrl("qx/test/xmlhttp/random.php"),
          res = this.res,
          count = 0,
          previousResponse = "";
        res.map("get", "GET", url);

        // Response headers must contain explicit cache control for this
        // to work in IE
        res.addListener("getSuccess", function (e) {
          var response = e.getData();
          count++;
          _this3.assert(response.length === 32, "Response must be MD5");
          _this3.assertNotEquals(previousResponse, response, "Response must be different from previous");
          previousResponse = response;
          if (count >= 10) {
            _this3.resume();
          }
        });
        res.poll("get", 100);
        this.wait();
      },
      "test: long poll": function test_long_poll() {
        var _this4 = this;
        this.require(["php"]);
        var res = this.res,
          url = this.getUrl("qx/test/xmlhttp/long_poll.php"),
          count = 0,
          responses = [];
        res.map("get", "GET", url);
        res.addListener("getSuccess", function (e) {
          var response = e.getData();
          responses.push(response);
          if (++count >= 5) {
            _this4.resume(function () {
              this.assert(parseFloat(responses[4]) > parseFloat(responses[0]), "Must increase");
            }, _this4);
          }
        });
        res.longPoll("get");
        this.wait();
      }
    }
  });
  qx.test.io.rest.ResourceWithRemote.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ResourceWithRemote.js.map?dt=1722153828330