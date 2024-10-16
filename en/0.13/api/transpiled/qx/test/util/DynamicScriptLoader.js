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
      "qx.util.DynamicScriptLoader": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2016 Visionet GmbH, http://www.visionet.de
       2016 OETIKER+PARTNER AG, https://www.oetiker.ch
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Dietrich Streifert (level420)
       * Tobias Oetiker (oetiker)
  
  ************************************************************************ */

  /* ************************************************************************
   ************************************************************************ */
  /**
   *
   * @asset(qx/test/dynamicscriptloader/*)
   *
   * @ignore(qx.test.DYNAMICSCRIPTTEST.*)
   * @ignore(qx.dynamicScriptLoadTest.*)
   */

  qx.Class.define("qx.test.util.DynamicScriptLoader", {
    extend: qx.dev.unit.TestCase,
    members: {
      setUp: function setUp() {
        if (qx.test.DYNAMICSCRIPTTEST) {
          delete qx.test.DYNAMICSCRIPTTEST;
        }
      },
      tearDown: function tearDown() {
        if (qx.test.DYNAMICSCRIPTTEST) {
          delete qx.test.DYNAMICSCRIPTTEST;
        }
      },
      "test 1: dynamic parallel loading": function test_1_dynamic_parallel_loading() {
        var _this = this;
        var l1 = new qx.util.DynamicScriptLoader(["qx/test/dynamicscriptloader/first.js", "qx/test/dynamicscriptloader/second.js", "qx/test/dynamicscriptloader/third.js"]);
        var l2 = new qx.util.DynamicScriptLoader(["qx/test/dynamicscriptloader/first.js", "qx/test/dynamicscriptloader/second.js"]);
        var l1Ready = false;
        var l2Ready = false;
        l1.addListenerOnce("ready", function () {
          l1Ready = true;
          _this.resume(function () {
            this.assertTrue(l1Ready && l2Ready);
            this.assertEquals(qx.test.DYNAMICSCRIPTTEST.second.third, "dynamically loaded");
          }, _this);
        });
        l2.addListenerOnce("ready", function () {
          l2Ready = true;
          _this.assertTrue(!l1Ready && l2Ready);
        });
        l1.start();
        l2.start();
        this.wait();
      },
      "test 2: do not load again": function test_2_do_not_load_again() {
        var _this2 = this;
        var loader = new qx.util.DynamicScriptLoader(["qx/test/dynamicscriptloader/first.js", "qx/test/dynamicscriptloader/second.js", "qx/test/dynamicscriptloader/third.js"]);
        var noEvent = true;
        var checkId = loader.addListener("loaded", function (e) {
          if (e.getData().status !== "preloaded") {
            noEvent = false;
          }
        });
        loader.addListenerOnce("ready", function () {
          _this2.assertTrue(noEvent);
        });
        loader.start();
      },
      "test 3: fail to load": function test_3_fail_to_load() {
        var _this3 = this;
        var loader = new qx.util.DynamicScriptLoader(["qx/test/dynamicscriptloader/xyc.js"]);
        loader.addListenerOnce("failed", function (e) {
          var data = e.getData();
          _this3.resume(function () {
            this.assertEquals(data.script, "qx/test/dynamicscriptloader/xyc.js");
          }, _this3);
        });
        loader.start();
        this.wait();
      },
      "test 4: double start": function test_4_double_start() {
        var loader = new qx.util.DynamicScriptLoader("qx/test/dynamicscriptloader/first.js");
        loader.start();
        try {
          loader.start();
        } catch (e) {
          this.assertEquals(e.message, "you can only call start once per instance");
        }
      }
    }
  });
  qx.test.util.DynamicScriptLoader.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=DynamicScriptLoader.js.map?dt=1729101247764