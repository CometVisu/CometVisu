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
      "qx.test.io.MRemoteTest": {
        "require": true
      },
      "qx.dev.unit.MRequirements": {
        "require": true
      },
      "qx.io.request.Xhr": {},
      "qx.event.Timer": {},
      "qx.util.Uri": {},
      "qx.bom.client.Engine": {
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "className": "qx.bom.client.Engine"
        }
      }
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

  qx.Class.define("qx.test.io.request.XhrWithRemote", {
    extend: qx.dev.unit.TestCase,
    include: [qx.test.io.MRemoteTest, qx.dev.unit.MRequirements],
    members: {
      setUp: function setUp() {
        this.req = new qx.io.request.Xhr();
        this.require(["http", "php"]);
      },
      tearDown: function tearDown() {
        this.req.dispose();
      },
      "test: fetch resource": function test_fetch_resource() {
        var _this = this;
        var req = this.req,
          url = this.noCache(this.getUrl("qx/test/xmlhttp/sample.txt"));
        req.addListener("success", function (e) {
          _this.resume(function () {
            this.assertEquals("SAMPLE", e.getTarget().getResponseText());
          }, _this);
        });
        req.setUrl(url);
        req.send();
        this.wait();
      },
      "test: recycle request": function test_recycle_request() {
        var _this2 = this;
        var req = new qx.io.request.Xhr(),
          url1 = this.noCache(this.getUrl("qx/test/xmlhttp/sample.txt") + "?1"),
          url2 = this.noCache(this.getUrl("qx/test/xmlhttp/sample.txt") + "?2"),
          count = 0;
        req.addListener("success", function () {
          count++;
          if (count == 2) {
            _this2.resume();
          } else {
            req.setUrl(url2);
            req.send();
          }
        });
        req.setUrl(url1);
        req.send();
        this.wait();
      },
      "test: progress phases": function test_progress_phases() {
        var _this3 = this;
        var req = this.req,
          phases = [],
          expectedPhases = ["opened", "sent", "loading", "load", "success"],
          url = this.getUrl("qx/test/xmlhttp/sample.txt");
        req.addListener("changePhase", function () {
          phases.push(req.getPhase());
          if (req.getPhase() === "success") {
            _this3.resume(function () {
              this.assertArrayEquals(expectedPhases, phases);
            }, _this3);
          }
        });
        req.setUrl(url);
        req.send();
        this.wait();
      },
      "test: progress phases when abort after send": function test_progress_phases_when_abort_after_send() {
        var _this4 = this;
        var req = this.req,
          phases = [],
          expectedPhases = ["opened", "sent", "abort"],
          url = this.getUrl("qx/test/xmlhttp/sample.txt");
        req.addListener("changePhase", function () {
          phases.push(req.getPhase());
          if (req.getPhase() === "abort") {
            _this4.assertArrayEquals(expectedPhases, phases);
          }
        });
        req.setUrl(url);
        req.send();
        req.abort();
      },
      "test: progress phases when abort after loading": function test_progress_phases_when_abort_after_loading() {
        var _this5 = this;
        // Note:
        //   * Breaks on Windows 7 and OS X in every browser because the loading phase
        //     is never entered
        //   * Also breaks on Windows 10 in every browser
        this.require(["noIe", "noWin7", "noOsx", "noWin10"]);
        var req = this.req,
          phases = [],
          expectedPhases = ["opened", "sent", "loading", "abort"],
          url = this.noCache(this.getUrl("qx/test/xmlhttp/loading.php")) + "&duration=100";
        req.addListener("changePhase", function () {
          phases.push(req.getPhase());
          if (req.getPhase() === "abort") {
            _this5.resume(function () {
              this.assertArrayEquals(expectedPhases, phases);
            });
          }
        });
        req.setUrl(url);
        req.send();

        // Abort loading. Give remote some time to respond.
        qx.event.Timer.once(function () {
          req.abort();
        }, this, 500);
        this.wait();
      },
      "test: timeout": function test_timeout() {
        var _this6 = this;
        var req = this.req,
          url = this.noCache(this.getUrl("qx/test/xmlhttp/loading.php")) + "&duration=100";
        req.addListener("timeout", function () {
          _this6.resume(function () {
            this.assertEquals("timeout", req.getPhase());
          });
        });
        req.setUrl(url);
        req.setTimeout(0.001);
        req.send();
        this.wait();
      },
      "test: timeout with header call": function test_timeout_with_header_call() {
        var _this7 = this;
        var req = this.req,
          url = this.noCache(this.getUrl("qx/test/xmlhttp/loading.php")) + "&duration=100";
        req.addListener("timeout", function () {
          _this7.resume(function () {
            try {
              req.getResponseHeader("X-UI-My-Header");
              throw new Error("DOM exception expected!");
            } catch (ex) {}
          });
        });
        req.setUrl(url);
        req.setTimeout(0.001);
        req.send();
        this.wait();
      },
      // "test: fetch resources simultaneously": function() {
      //   this.require(["php"]);
      //
      //   var count = 1,
      //       upTo = 20,
      //       startedAt = new Date(),
      //       duration = 0;
      //
      //   for (var i=0; i<upTo; i++) {
      //     var req = new qx.io.request.Xhr(),
      //         url = this.noCache(this.getUrl("qx/test/xmlhttp/loading.php")) + "&duration=6";
      //
      //     req.addListener("success", function() {
      //       this.resume(function() {
      //         // In seconds
      //         duration = (new Date() - startedAt) / 1000;
      //         this.debug("Request #" + count + " completed (" +  duration + ")");
      //         if (count == upTo) {
      //           return;
      //         }
      //
      //         ++count;
      //         this.wait(6000 + 1000);
      //       }, this);
      //     }, this);
      //
      //     req.setUrl(url);
      //     req.send();
      //   }
      //
      //   // Provided two concurrent requests are made (each 6s), 20 requests
      //   // (i.e. 10 packs of requests) should complete after 60s
      //   this.wait(60000 + 1000);
      // },
      noCache: function noCache(url) {
        return qx.util.Uri.appendParamsToUrl(url, "nocache=" + new Date().valueOf());
      },
      hasNoIe: function hasNoIe() {
        return !(qx.core.Environment.get("engine.name") == "mshtml");
      }
    }
  });
  qx.test.io.request.XhrWithRemote.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=XhrWithRemote.js.map?dt=1735341778578