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
      "qx.test.ui.LayoutTestCase": {
        "require": true
      },
      "qx.ui.embed.Iframe": {},
      "qx.ui.core.queue.Manager": {},
      "qx.util.ResourceManager": {},
      "qx.util.Uri": {},
      "qx.bom.client.Browser": {
        "require": true
      },
      "qx.ui.container.Composite": {},
      "qx.ui.layout.VBox": {}
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
       2007-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Alexander Steitz (aback)
  
  ************************************************************************ */

  qx.Class.define("qx.test.ui.embed.Iframe", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      __P_390_0: null,
      setUp: function setUp() {
        this.__P_390_0 = new qx.ui.embed.Iframe();
        this.__P_390_0.set({
          width: 200,
          height: 500
        });
      },
      tearDown: function tearDown() {
        this.__P_390_0.destroy();
      },
      testHiddenSetSourceInitial: function testHiddenSetSourceInitial() {
        this.__P_390_0.set({
          visibility: "hidden"
        });
        this.getRoot().add(this.__P_390_0);
        qx.ui.core.queue.Manager.flush();
        this.assertNotNull(this.__P_390_0.getContentElement().getDomElement());
      },
      testHiddenSetSource: function testHiddenSetSource() {
        var _this = this;
        this.getRoot().add(this.__P_390_0);
        qx.ui.core.queue.Manager.flush();
        this.__P_390_0.hide();
        qx.ui.core.queue.Manager.flush();
        var src = qx.util.ResourceManager.getInstance().toUri("qx/static/blank.html");
        src = qx.util.Uri.getAbsolute(src);
        this.__P_390_0.setSource(src);
        qx.ui.core.queue.Manager.flush();
        this.__P_390_0.addListenerOnce("load", function () {
          _this.resume(function () {
            this.assertEquals(this.__P_390_0.getSource(), this.__P_390_0.getWindow().location.href);
          });
        });
        this.wait(10000);
      },
      testGetWindow: function testGetWindow() {
        var _this2 = this;
        this.getRoot().add(this.__P_390_0);
        this.__P_390_0.addListener("load", function () {
          _this2.resume(function () {
            this.assertNotNull(this.__P_390_0.getWindow());
          }, _this2);
        });
        var src = qx.util.ResourceManager.getInstance().toUri("qx/static/blank.html");
        this.__P_390_0.setSource(src);
        this.wait(10000);
      },
      /** @ignore(require) */testSyncSourceAfterDOMMove: function testSyncSourceAfterDOMMove() {
        // This breaks (very) frequently when run under headless chrome on Travis; we can't
        //  track down the cause and it works just fine elsewhere.  Disabling this test on
        //  Chrome is an effective quick hack until someone can figure it out.
        if (qx.core.Environment.get("browser.name") == "chrome") {
          this.skip("Optimization makes this test fail frequently for chrome - skipping");
        }

        //  This also breaks on MacOS runners on GitHub with webkit
        try {
          var CI = require("process").env.CI;
          if (CI && qx.core.Environment.get("browser.name") === "webkit") {
            this.skip("Skipping for Webkit for MacOS");
          }
        } catch (e) {} // not on GitHub

        var rm = qx.util.ResourceManager.getInstance();
        var src1 = rm.toUri("qx/static/blank.html"); // <body></body>
        var src2 = rm.toUri("qx/test/hello.html"); // <body>Hello World!</body>

        var iframe = this.__P_390_0;
        var container0 = new qx.ui.container.Composite(new qx.ui.layout.VBox());
        var container1 = new qx.ui.container.Composite(new qx.ui.layout.VBox());
        var container2 = new qx.ui.container.Composite(new qx.ui.layout.VBox());
        container0.add(container1, {
          flex: 1
        });
        container0.add(container2, {
          flex: 1
        });
        this.getRoot().add(container0);
        iframe.setSource(src1); // "qx/static/blank.html"
        container1.add(iframe, {
          flex: 1
        });

        // Move iframe to another DOM location after half a second
        window.setTimeout(function () {
          iframe.setSource(src2); // "qx/test/hello.html"
          container2.add(iframe, {
            flex: 1
          });
        }, 500);

        // Check iframe body content after one second
        window.setTimeout(function () {
          this.resume(function () {
            var innerText = iframe.getWindow().document.body.innerText;

            // IE and edge deliver an extra blank at the end of
            // body.innerText
            if (typeof innerText == "string" && (qx.core.Environment.get("browser.name") == "edge" || qx.core.Environment.get("browser.name") == "ie")) {
              innerText = innerText.replace(/\s$/gm, "");
            }
            this.assertEquals("Hello World!", innerText);
          });
        }.bind(this), 4000);
        this.wait(10000);
      }
    }
  });
  qx.test.ui.embed.Iframe.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Iframe.js.map?dt=1735222431249