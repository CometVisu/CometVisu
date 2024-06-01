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
      "qx.html.Root": {},
      "qx.html.Iframe": {},
      "qx.util.ResourceManager": {},
      "qx.bom.Iframe": {},
      "qx.html.Element": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2010 1&1 Internet AG, Germany, http://www.1und1.de
  
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
   * @asset(qx/static/blank.html)
   */

  qx.Class.define("qx.test.html.Iframe", {
    extend: qx.dev.unit.TestCase,
    include: qx.dev.unit.MMock,
    members: {
      __P_347_0: null,
      __P_347_1: null,
      __P_347_2: null,
      __P_347_3: null,
      __P_347_4: false,
      setUp: function setUp() {
        var helper = document.createElement("div");
        document.body.appendChild(helper);
        this.__P_347_0 = new qx.html.Root(helper);
        this.__P_347_0.setAttribute("id", "doc");
        var frame = this.__P_347_1 = new qx.html.Iframe();
        this.__P_347_0.add(frame);

        // Source in parent directory is not of same origin
        // when using file protocol – use non-existing file
        // in same directory instead
        if (window.location.protocol === "file:") {
          this.__P_347_3 = "blank.html";
        } else {
          this.__P_347_3 = qx.util.ResourceManager.getInstance().toUri("qx/static/blank.html");
        }
      },
      "test: set source to URL with same origin": function testSetSourceToURLWithSameOrigin() {
        var _this = this;
        var frame = this.__P_347_1;
        var source = this.__P_347_3;
        frame.addListener("load", function () {
          _this.resume(function () {
            var element = frame.getDomElement();
            var currentUrl = qx.bom.Iframe.queryCurrentUrl(element) || element.src;
            var source = frame.getSource();
            var blank = "/blank.html$";
            var msg = function msg(actual) {
              return "Must be " + currentUrl + ", but was " + actual;
            };

            // BOM
            this.assertString(currentUrl);
            this.assertMatch(currentUrl, blank, msg(currentUrl));

            // HTML
            this.assertString(source);
            this.assertMatch(source, blank, msg(source));
          });
        });
        frame.setSource(source);
        qx.html.Element.flush();
        this.wait();
      },
      "test: update source on navigate": function testUpdateSourceOnNavigate() {
        var frame = this.__P_347_1;

        // As soon as the original frame has loaded,
        // fake user-action and browse
        var source = this.__P_347_3;
        frame.addListenerOnce("load", function () {
          qx.html.Element.flush();
          qx.bom.Iframe.setSource(frame.getDomElement(), source);
        });
        qx.html.Element.flush();

        // Give changed frame some time to load
        this.wait(500, function () {
          this.assertMatch(frame.getSource(), "/blank.html$");
        }, this);
      },
      "test: skip setting source if frame is already on URL": function testSkipSettingSourceIfFrameIsAlreadyOnURL() {
        var _this2 = this;
        var frame = this.__P_347_1;

        // As soon as the original frame has loaded,
        // fake user-action and browse
        var source = this.__P_347_3;
        frame.addListenerOnce("load", function () {
          qx.bom.Iframe.setSource(frame.getDomElement(), source);
        });
        qx.html.Element.flush();
        var origSetSource;
        frame.addListener("load", function () {
          origSetSource = qx.bom.Iframe.setSource;
          qx.bom.Iframe.setSource = function () {
            throw new Error("setSource");
          };
          try {
            var url = qx.bom.Iframe.queryCurrentUrl(frame.getDomElement());
            frame.setSource(url);
            qx.html.Element.flush();
            _this2.resume();
          } catch (e) {
            _this2.resume(function () {
              this.fail("Setting same URL must be skipped");
            });
          }
          qx.bom.Iframe.setSource = origSetSource;
        });
        this.wait();
      },
      "test: set null source if frame is cross-origin": function testSetNullSourceIfFrameIsCrossOrigin() {
        var _this3 = this;
        var frame = this.__P_347_1;
        if (this.__P_347_4) {
          this.skip("This test can only run once. Reload to run again.");
        }

        // On cross origin
        frame.addListener("load", function () {
          _this3.resume(function () {
            var elem = frame.getDomElement();
            this.spy(qx.bom.Iframe, "setSource");
            frame.setSource(null);
            this.assertCalledWith(qx.bom.Iframe.setSource, elem, null);
          });
        });
        frame.setSource("http://example.com");
        this.__P_347_4 = true;
        this.wait();
      },
      tearDown: function tearDown() {
        qx.html.Element.flush();
        var div = document.getElementById("doc");
        document.body.removeChild(div);
        this.getSandbox().restore();
        this.__P_347_1.dispose();
        this.__P_347_1 = null;
      }
    }
  });
  qx.test.html.Iframe.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Iframe.js.map?dt=1717235389824