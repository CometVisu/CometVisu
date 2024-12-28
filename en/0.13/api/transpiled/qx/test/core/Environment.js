(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.ui.core.scroll.MScrollBarFactory": {
        "require": true
      },
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
      "qx.bom.client.Engine": {
        "require": true
      },
      "qx.bom.client.Browser": {
        "require": true
      },
      "qx.bom.client.Locale": {
        "require": true
      },
      "qx.bom.client.OperatingSystem": {
        "require": true
      },
      "qx.bom.client.Plugin": {
        "require": true
      },
      "qx.bom.client.Transport": {
        "require": true
      },
      "qx.bom.client.Html": {
        "require": true
      },
      "qx.bom.client.Stylesheet": {
        "require": true
      },
      "qx.bom.client.Xml": {
        "require": true
      },
      "qx.bom.client.Css": {
        "require": true
      },
      "qx.bom.client.PhoneGap": {
        "require": true
      },
      "qx.bom.client.Event": {
        "require": true
      },
      "qx.bom.client.EcmaScript": {
        "require": true
      },
      "qx.bom.client.Device": {
        "require": true
      },
      "qx.bom.client.Scroll": {
        "require": true
      },
      "qx.bom.client.CssAnimation": {
        "require": true
      },
      "qx.bom.client.CssTransform": {
        "require": true
      },
      "qx.bom.client.CssTransition": {
        "require": true
      }
    },
    "environment": {
      "provided": ["qx.test.core.Environment.affe"],
      "required": {
        "affe": {},
        "qx.test.core.Environment.affe": {},
        "engine.name": {
          "className": "qx.bom.client.Engine"
        },
        "engine.version": {
          "className": "qx.bom.client.Engine"
        },
        "browser.name": {
          "className": "qx.bom.client.Browser"
        },
        "browser.version": {
          "className": "qx.bom.client.Browser"
        },
        "browser.documentmode": {
          "className": "qx.bom.client.Browser"
        },
        "browser.quirksmode": {
          "className": "qx.bom.client.Browser"
        },
        "locale": {
          "className": "qx.bom.client.Locale"
        },
        "locale.variant": {
          "className": "qx.bom.client.Locale"
        },
        "os.name": {
          "className": "qx.bom.client.OperatingSystem"
        },
        "os.version": {
          "className": "qx.bom.client.OperatingSystem"
        },
        "plugin.quicktime": {
          "className": "qx.bom.client.Plugin"
        },
        "plugin.quicktime.version": {
          "className": "qx.bom.client.Plugin"
        },
        "plugin.skype": {
          "className": "qx.bom.client.Plugin"
        },
        "plugin.windowsmedia": {
          "className": "qx.bom.client.Plugin"
        },
        "plugin.windowsmedia.version": {
          "className": "qx.bom.client.Plugin"
        },
        "plugin.divx": {
          "className": "qx.bom.client.Plugin"
        },
        "plugin.divx.version": {
          "className": "qx.bom.client.Plugin"
        },
        "plugin.silverlight": {
          "className": "qx.bom.client.Plugin"
        },
        "plugin.silverlight.version": {
          "className": "qx.bom.client.Plugin"
        },
        "plugin.pdf": {
          "className": "qx.bom.client.Plugin"
        },
        "plugin.pdf.version": {
          "className": "qx.bom.client.Plugin"
        },
        "io.maxrequests": {
          "className": "qx.bom.client.Transport"
        },
        "io.ssl": {
          "className": "qx.bom.client.Transport"
        },
        "io.xhr": {
          "className": "qx.bom.client.Transport"
        },
        "html.webworker": {
          "className": "qx.bom.client.Html"
        },
        "html.geolocation": {
          "className": "qx.bom.client.Html"
        },
        "html.audio": {
          "className": "qx.bom.client.Html"
        },
        "html.audio.ogg": {
          "className": "qx.bom.client.Html"
        },
        "html.audio.mp3": {
          "className": "qx.bom.client.Html"
        },
        "html.audio.wav": {
          "className": "qx.bom.client.Html"
        },
        "html.audio.aif": {
          "className": "qx.bom.client.Html"
        },
        "html.audio.au": {
          "className": "qx.bom.client.Html"
        },
        "html.video": {
          "className": "qx.bom.client.Html"
        },
        "html.video.ogg": {
          "className": "qx.bom.client.Html"
        },
        "html.video.h264": {
          "className": "qx.bom.client.Html"
        },
        "html.video.webm": {
          "className": "qx.bom.client.Html"
        },
        "html.storage.local": {
          "className": "qx.bom.client.Html"
        },
        "html.storage.session": {
          "className": "qx.bom.client.Html"
        },
        "html.storage.userdata": {
          "className": "qx.bom.client.Html"
        },
        "html.classlist": {
          "className": "qx.bom.client.Html"
        },
        "html.xpath": {
          "className": "qx.bom.client.Html"
        },
        "html.xul": {
          "className": "qx.bom.client.Html"
        },
        "html.canvas": {
          "className": "qx.bom.client.Html"
        },
        "html.svg": {
          "className": "qx.bom.client.Html"
        },
        "html.vml": {
          "className": "qx.bom.client.Html"
        },
        "html.console": {
          "className": "qx.bom.client.Html"
        },
        "html.stylesheet.createstylesheet": {
          "className": "qx.bom.client.Stylesheet"
        },
        "html.stylesheet.insertrule": {
          "className": "qx.bom.client.Stylesheet"
        },
        "html.stylesheet.deleterule": {
          "className": "qx.bom.client.Stylesheet"
        },
        "html.stylesheet.addimport": {
          "className": "qx.bom.client.Stylesheet"
        },
        "html.stylesheet.removeimport": {
          "className": "qx.bom.client.Stylesheet"
        },
        "html.element.contains": {
          "className": "qx.bom.client.Html"
        },
        "html.element.compareDocumentPosition": {
          "className": "qx.bom.client.Html"
        },
        "html.element.textcontent": {
          "className": "qx.bom.client.Html"
        },
        "html.image.naturaldimensions": {
          "className": "qx.bom.client.Html"
        },
        "html.history.state": {
          "className": "qx.bom.client.Html"
        },
        "html.selection": {
          "className": "qx.bom.client.Html"
        },
        "html.node.isequalnode": {
          "className": "qx.bom.client.Html"
        },
        "xml.implementation": {
          "className": "qx.bom.client.Xml"
        },
        "xml.domparser": {
          "className": "qx.bom.client.Xml"
        },
        "xml.selectsinglenode": {
          "className": "qx.bom.client.Xml"
        },
        "xml.selectnodes": {
          "className": "qx.bom.client.Xml"
        },
        "xml.getelementsbytagnamens": {
          "className": "qx.bom.client.Xml"
        },
        "xml.domproperties": {
          "className": "qx.bom.client.Xml"
        },
        "xml.attributens": {
          "className": "qx.bom.client.Xml"
        },
        "xml.createnode": {
          "className": "qx.bom.client.Xml"
        },
        "xml.getqualifieditem": {
          "className": "qx.bom.client.Xml"
        },
        "xml.createelementns": {
          "className": "qx.bom.client.Xml"
        },
        "plugin.gears": {
          "className": "qx.bom.client.Plugin"
        },
        "plugin.activex": {
          "className": "qx.bom.client.Plugin"
        },
        "css.boxmodel": {
          "className": "qx.bom.client.Css"
        },
        "css.placeholder": {
          "className": "qx.bom.client.Css"
        },
        "css.rgba": {
          "className": "qx.bom.client.Css"
        },
        "css.boxshadow": {
          "className": "qx.bom.client.Css"
        },
        "css.borderradius": {
          "className": "qx.bom.client.Css"
        },
        "css.borderimage": {
          "className": "qx.bom.client.Css"
        },
        "css.borderimage.standardsyntax": {
          "className": "qx.bom.client.Css"
        },
        "css.textoverflow": {
          "className": "qx.bom.client.Css"
        },
        "css.userselect": {
          "className": "qx.bom.client.Css"
        },
        "css.userselect.none": {
          "className": "qx.bom.client.Css"
        },
        "css.usermodify": {
          "className": "qx.bom.client.Css"
        },
        "css.appearance": {
          "className": "qx.bom.client.Css"
        },
        "css.boxsizing": {
          "className": "qx.bom.client.Css"
        },
        "css.inlineblock": {
          "className": "qx.bom.client.Css"
        },
        "css.opacity": {
          "className": "qx.bom.client.Css"
        },
        "css.gradient.linear": {
          "className": "qx.bom.client.Css"
        },
        "css.gradient.radial": {
          "className": "qx.bom.client.Css"
        },
        "css.gradient.legacywebkit": {
          "className": "qx.bom.client.Css"
        },
        "css.alphaimageloaderneeded": {
          "className": "qx.bom.client.Css"
        },
        "css.pointerevents": {
          "className": "qx.bom.client.Css"
        },
        "phonegap": {
          "className": "qx.bom.client.PhoneGap"
        },
        "phonegap.notification": {
          "className": "qx.bom.client.PhoneGap"
        },
        "event.touch": {
          "className": "qx.bom.client.Event"
        },
        "event.help": {
          "className": "qx.bom.client.Event"
        },
        "event.hashchange": {
          "className": "qx.bom.client.Event"
        },
        "event.dispatchevent": {
          "className": "qx.bom.client.Event"
        },
        "event.customevent": {
          "className": "qx.bom.client.Event"
        },
        "event.mouseevent": {
          "className": "qx.bom.client.Event"
        },
        "ecmascript.error.stacktrace": {
          "className": "qx.bom.client.EcmaScript"
        },
        "ecmascript.array.indexof": {
          "className": "qx.bom.client.EcmaScript"
        },
        "ecmascript.array.lastindexof": {
          "className": "qx.bom.client.EcmaScript"
        },
        "ecmascript.array.foreach": {
          "className": "qx.bom.client.EcmaScript"
        },
        "ecmascript.array.filter": {
          "className": "qx.bom.client.EcmaScript"
        },
        "ecmascript.array.map": {
          "className": "qx.bom.client.EcmaScript"
        },
        "ecmascript.array.some": {
          "className": "qx.bom.client.EcmaScript"
        },
        "ecmascript.array.every": {
          "className": "qx.bom.client.EcmaScript"
        },
        "ecmascript.array.reduce": {
          "className": "qx.bom.client.EcmaScript"
        },
        "ecmascript.array.reduceright": {
          "className": "qx.bom.client.EcmaScript"
        },
        "ecmascript.function.bind": {
          "className": "qx.bom.client.EcmaScript"
        },
        "ecmascript.object.keys": {
          "className": "qx.bom.client.EcmaScript"
        },
        "ecmascript.date.now": {
          "className": "qx.bom.client.EcmaScript"
        },
        "ecmascript.error.toString": {
          "className": "qx.bom.client.EcmaScript"
        },
        "ecmascript.string.trim": {
          "className": "qx.bom.client.EcmaScript"
        },
        "ecmascript.string.endsWith": {
          "className": "qx.bom.client.EcmaScript"
        },
        "ecmascript.string.startsWith": {
          "className": "qx.bom.client.EcmaScript"
        },
        "device.name": {
          "className": "qx.bom.client.Device"
        },
        "device.type": {
          "className": "qx.bom.client.Device"
        },
        "device.pixelRatio": {
          "className": "qx.bom.client.Device"
        },
        "qx.application": {},
        "qx.debug.dispose.level": {},
        "qx.mobile.nativescroll": {
          "className": "qx.bom.client.Scroll"
        },
        "css.animation": {
          "className": "qx.bom.client.CssAnimation"
        },
        "css.transform": {
          "className": "qx.bom.client.CssTransform"
        },
        "css.transition": {
          "className": "qx.bom.client.CssTransition"
        },
        "css.transform.3d": {
          "className": "qx.bom.client.CssTransform"
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
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * @require(qx.ui.core.scroll.MScrollBarFactory)
   */

  qx.Class.define("qx.test.core.Environment", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      // /////////////////////////////////
      // TESTS FOR THE ENVIRONMENT CLASS
      // ////////////////////////////// //
      testGet: function testGet() {
        // fake the check
        qx.core.Environment.getChecks()["affe"] = function () {
          return "affe";
        };
        this.assertEquals("affe", qx.core.Environment.get("affe"));
        // clear the fake check
        delete qx.core.Environment.getChecks()["affe"];
        qx.core.Environment.invalidateCacheKey("affe");
      },
      testGetAsync: function testGetAsync() {
        // fake the check
        qx.core.Environment.getAsyncChecks()["affe"] = function (clb, self) {
          window.setTimeout(function () {
            clb.call(self, "affe");
          }, 0);
        };
        qx.core.Environment.getAsync("affe", function (result) {
          this.resume(function () {
            this.assertEquals("affe", result);
            // clear the fake check
            delete qx.core.Environment.getAsyncChecks()["affe"];
            qx.core.Environment.invalidateCacheKey("affe");
          }, this);
        }, this);
        this.wait();
      },
      testSelect: function testSelect() {
        // fake the check
        qx.core.Environment.getChecks()["affe"] = function () {
          return "affe";
        };
        var test;
        test = qx.core.Environment.select("affe", {
          affe: "affe"
        });
        this.assertEquals(test, "affe");
        // clear the fake check
        delete qx.core.Environment.getChecks()["affe"];
        qx.core.Environment.invalidateCacheKey("affe");
      },
      testSelectDefault: function testSelectDefault() {
        // fake the check
        qx.core.Environment.getChecks()["affe"] = function () {
          return "affe";
        };
        var test;
        test = qx.core.Environment.select("affe", {
          "default": "affe"
        });
        this.assertEquals(test, "affe");
        // clear the fake check
        delete qx.core.Environment.getChecks()["affe"];
        qx.core.Environment.invalidateCacheKey("affe");
      },
      testSelectAsync: function testSelectAsync() {
        // fake the check
        qx.core.Environment.addAsync("affe", function (clb, self) {
          window.setTimeout(function () {
            clb.call(self, "AFFE");
          }, 0);
        });
        qx.core.Environment.selectAsync("affe", {
          affe: function affe(result) {
            this.resume(function () {
              // clear the fake check
              delete qx.core.Environment.getChecks()["affe"];
              qx.core.Environment.invalidateCacheKey("affe");
              this.assertEquals("AFFE", result);
            }, this);
          }
        }, this);
        this.wait();
      },
      testCache: function testCache() {
        // fake the check
        qx.core.Environment.getChecks()["affe"] = function () {
          return "affe";
        };
        this.assertEquals("affe", qx.core.Environment.get("affe"));
        // clear the fake check
        delete qx.core.Environment.getChecks()["affe"];
        this.assertEquals("affe", qx.core.Environment.get("affe"));
        qx.core.Environment.invalidateCacheKey("affe");
      },
      testCacheInvalidation: function testCacheInvalidation() {
        // fake the check
        qx.core.Environment.getChecks()["affe"] = function () {
          return "affe";
        };
        this.assertEquals("affe", qx.core.Environment.get("affe"));
        qx.core.Environment.invalidateCacheKey("affe");

        // fake another check
        qx.core.Environment.getChecks()["affe"] = function () {
          return "affe2";
        };
        this.assertEquals("affe2", qx.core.Environment.get("affe"));

        // clear the fake check
        delete qx.core.Environment.getChecks()["affe"];
        qx.core.Environment.invalidateCacheKey("affe");
      },
      testAddFunction: function testAddFunction() {
        qx.core.Environment.add("qx.test.core.Environment.affe", function () {
          return "AFFE";
        });
        this.assertEquals("AFFE", qx.core.Environment.get("qx.test.core.Environment.affe"));

        // clear the check
        delete qx.core.Environment.getChecks()["qx.test.core.Environment.affe"];
        qx.core.Environment.invalidateCacheKey("qx.test.core.Environment.affe");
      },
      testAddValue: function testAddValue() {
        qx.core.Environment.add("qx.test.core.Environment.affe", "AFFE");
        this.assertEquals("AFFE", qx.core.Environment.get("qx.test.core.Environment.affe"));

        // clear the check
        delete qx.core.Environment.getChecks()["qx.test.core.Environment.affe"];
        qx.core.Environment.invalidateCacheKey("qx.test.core.Environment.affe");
      },
      testAddAsyncFunction: function testAddAsyncFunction() {
        qx.core.Environment.addAsync("affe", function (clb, self) {
          window.setTimeout(function () {
            clb.call(self, "AFFE");
          }, 0);
        });
        qx.core.Environment.getAsync("affe", function (result) {
          this.resume(function () {
            this.assertEquals("AFFE", result);
            // clear the fake check
            delete qx.core.Environment.getAsyncChecks()["affe"];
            qx.core.Environment.invalidateCacheKey("affe");
          }, this);
        }, this);
        this.wait();
      },
      testFilter: function testFilter() {
        // fake the checks
        qx.core.Environment.getChecks()["affe1"] = function () {
          return true;
        };
        qx.core.Environment.getChecks()["affe2"] = function () {
          return false;
        };
        qx.core.Environment.getChecks()["affe3"] = function () {
          return true;
        };
        var array = qx.core.Environment.filter({
          affe1: 1,
          affe2: 2,
          affe3: 3
        });
        this.assertEquals(2, array.length);
        this.assertEquals(1, array[0]);
        this.assertEquals(3, array[1]);

        // clear the fake check
        delete qx.core.Environment.getChecks()["affe1"];
        delete qx.core.Environment.getChecks()["affe2"];
        delete qx.core.Environment.getChecks()["affe3"];
        qx.core.Environment.invalidateCacheKey("affe1");
        qx.core.Environment.invalidateCacheKey("affe2");
        qx.core.Environment.invalidateCacheKey("affe3");
      },
      // //////////////////////////////
      // TESTS FOR THE CHECKS
      // //////////////////////////////
      testEngineName: function testEngineName() {
        this.assertNotEquals("", qx.core.Environment.get("engine.name"));
      },
      testEngineVersion: function testEngineVersion() {
        this.assertNotEquals("", qx.core.Environment.get("engine.version"));
      },
      testBrowser: function testBrowser() {
        this.assertNotEquals("", qx.core.Environment.get("browser.name"));
        this.assertNotEquals("", qx.core.Environment.get("browser.version"));
        qx.core.Environment.get("browser.documentmode");
        this.assertBoolean(qx.core.Environment.get("browser.quirksmode"));
      },
      testLocale: function testLocale() {
        this.assertNotEquals("", qx.core.Environment.get("locale"));
      },
      testVariant: function testVariant() {
        // just make sure the call is working
        qx.core.Environment.get("locale.variant");
      },
      testOS: function testOS() {
        // just make sure the call is working
        this.assertString(qx.core.Environment.get("os.name"));
        this.assertString(qx.core.Environment.get("os.version"));
      },
      testQuicktime: function testQuicktime() {
        // just make sure the call is working
        this.assertBoolean(qx.core.Environment.get("plugin.quicktime"));
        qx.core.Environment.get("plugin.quicktime.version");
      },
      testSkype: function testSkype() {
        // just make sure the call is working
        this.assertBoolean(qx.core.Environment.get("plugin.skype"));
      },
      testWmv: function testWmv() {
        // just make sure the call is working
        this.assertBoolean(qx.core.Environment.get("plugin.windowsmedia"));
        qx.core.Environment.get("plugin.windowsmedia.version");
      },
      testDivx: function testDivx() {
        // just make sure the call is working
        this.assertBoolean(qx.core.Environment.get("plugin.divx"));
        qx.core.Environment.get("plugin.divx.version");
      },
      testSilverlight: function testSilverlight() {
        // just make sure the call is working
        this.assertBoolean(qx.core.Environment.get("plugin.silverlight"));
        qx.core.Environment.get("plugin.silverlight.version");
      },
      testPdf: function testPdf() {
        // just make sure the call is working
        this.assertBoolean(qx.core.Environment.get("plugin.pdf"));
        qx.core.Environment.get("plugin.pdf.version");
      },
      testIO: function testIO() {
        // just make sure the call is working
        qx.core.Environment.get("io.maxrequests");
        this.assertBoolean(qx.core.Environment.get("io.ssl"));
      },
      testIOXhr: function testIOXhr() {
        var xhr = qx.core.Environment.get("io.xhr");
        this.assertString(xhr);

        // Should return "xhr" when standard XHR is available
        if (window.XMLHttpRequest && window.location.protocol !== "file:") {
          this.assertEquals("xhr", xhr);
        }
      },
      testHtml: function testHtml() {
        // just make sure the call is working
        this.assertBoolean(qx.core.Environment.get("html.webworker"));
        this.assertBoolean(qx.core.Environment.get("html.geolocation"));
        this.assertBoolean(qx.core.Environment.get("html.audio"));
        this.assertString(qx.core.Environment.get("html.audio.ogg"));
        this.assertString(qx.core.Environment.get("html.audio.mp3"));
        this.assertString(qx.core.Environment.get("html.audio.wav"));
        this.assertString(qx.core.Environment.get("html.audio.aif"));
        this.assertString(qx.core.Environment.get("html.audio.au"));
        this.assertBoolean(qx.core.Environment.get("html.video"));
        this.assertString(qx.core.Environment.get("html.video.ogg"));
        this.assertString(qx.core.Environment.get("html.video.h264"));
        this.assertString(qx.core.Environment.get("html.video.webm"));
        this.assertBoolean(qx.core.Environment.get("html.storage.local"));
        this.assertBoolean(qx.core.Environment.get("html.storage.session"));
        this.assertBoolean(qx.core.Environment.get("html.storage.userdata"));
        this.assertBoolean(qx.core.Environment.get("html.classlist"));
        this.assertBoolean(qx.core.Environment.get("html.xpath"));
        this.assertBoolean(qx.core.Environment.get("html.xul"));
        this.assertBoolean(qx.core.Environment.get("html.canvas"));
        this.assertBoolean(qx.core.Environment.get("html.svg"));
        this.assertBoolean(qx.core.Environment.get("html.vml"));
        this.assertBoolean(qx.core.Environment.get("html.console"));
        this.assertBoolean(qx.core.Environment.get("html.stylesheet.createstylesheet"));
        this.assertBoolean(qx.core.Environment.get("html.stylesheet.insertrule"));
        this.assertBoolean(qx.core.Environment.get("html.stylesheet.deleterule"));
        this.assertBoolean(qx.core.Environment.get("html.stylesheet.addimport"));
        this.assertBoolean(qx.core.Environment.get("html.stylesheet.removeimport"));
        this.assertBoolean(qx.core.Environment.get("html.element.contains"));
        this.assertBoolean(qx.core.Environment.get("html.element.compareDocumentPosition"));
        this.assertBoolean(qx.core.Environment.get("html.element.textcontent"));
        this.assertBoolean(qx.core.Environment.get("html.image.naturaldimensions"));
        this.assertBoolean(qx.core.Environment.get("html.history.state"));
        this.assertString(qx.core.Environment.get("html.selection"));
        this.assertBoolean(qx.core.Environment.get("html.node.isequalnode"));
      },
      testXml: function testXml() {
        this.assertBoolean(qx.core.Environment.get("xml.implementation"));
        this.assertBoolean(qx.core.Environment.get("xml.domparser"));
        this.assertBoolean(qx.core.Environment.get("xml.selectsinglenode"));
        this.assertBoolean(qx.core.Environment.get("xml.selectnodes"));
        this.assertBoolean(qx.core.Environment.get("xml.getelementsbytagnamens"));
        this.assertBoolean(qx.core.Environment.get("xml.domproperties"));
        this.assertBoolean(qx.core.Environment.get("xml.attributens"));
        this.assertBoolean(qx.core.Environment.get("xml.createnode"));
        this.assertBoolean(qx.core.Environment.get("xml.getqualifieditem"));
        this.assertBoolean(qx.core.Environment.get("xml.createelementns"));
      },
      testGears: function testGears() {
        this.assertBoolean(qx.core.Environment.get("plugin.gears"));
      },
      testActiveX: function testActiveX() {
        this.assertBoolean(qx.core.Environment.get("plugin.activex"));
      },
      testCss: function testCss() {
        this.assertNotEquals("", qx.core.Environment.get("css.boxmodel"));
        this.assertBoolean(qx.core.Environment.get("css.placeholder"));
        this.assertBoolean(qx.core.Environment.get("css.rgba"));
        var boxShadow = qx.core.Environment.get("css.boxshadow");
        this.assert(typeof boxShadow === "string" || boxShadow === null);
        var borderRadius = qx.core.Environment.get("css.borderradius");
        this.assert(typeof borderRadius == "string" || borderRadius === null);
        var borderImage = qx.core.Environment.get("css.borderimage");
        this.assert(typeof borderImage == "string" || borderImage === null);
        var borderImageSyntax = qx.core.Environment.get("css.borderimage.standardsyntax");
        this.assert(typeof borderImageSyntax == "boolean" || borderImageSyntax === null);
        var textOverflow = qx.core.Environment.get("css.textoverflow");
        this.assert(typeof textOverflow == "string" || textOverflow === null);
        var userSelect = qx.core.Environment.get("css.userselect");
        this.assert(typeof userSelect == "string" || userSelect === null);
        var userSelectNone = qx.core.Environment.get("css.userselect.none");
        this.assert(typeof userSelectNone == "string" || userSelectNone === null);
        var userModify = qx.core.Environment.get("css.usermodify");
        this.assert(typeof userModify == "string" || userModify === null);
        var appearance = qx.core.Environment.get("css.appearance");
        this.assert(typeof appearance == "string" || appearance === null);
        var boxSizing = qx.core.Environment.get("css.boxsizing");
        this.assert(typeof boxSizing == "string" || boxSizing === null);
        var inlineBlock = qx.core.Environment.get("css.inlineblock");
        this.assert(typeof inlineBlock == "string" || inlineBlock === null);
        this.assertBoolean(qx.core.Environment.get("css.opacity"));
        var linearGradient = qx.core.Environment.get("css.gradient.linear");
        this.assert(typeof linearGradient == "string" || linearGradient === null);
        var radialGradient = qx.core.Environment.get("css.gradient.radial");
        this.assert(typeof radialGradient == "string" || radialGradient === null);
        this.assertBoolean(qx.core.Environment.get("css.gradient.legacywebkit"));
        this.assertBoolean(qx.core.Environment.get("css.alphaimageloaderneeded"));
        this.assertBoolean(qx.core.Environment.get("css.pointerevents"));
      },
      testPhoneGap: function testPhoneGap() {
        this.assertBoolean(qx.core.Environment.get("phonegap"));
        this.assertBoolean(qx.core.Environment.get("phonegap.notification"));
      },
      testEvent: function testEvent() {
        this.assertBoolean(qx.core.Environment.get("event.touch"));
        this.assertBoolean(qx.core.Environment.get("event.help"));
        this.assertBoolean(qx.core.Environment.get("event.hashchange"));
        this.assertBoolean(qx.core.Environment.get("event.dispatchevent"));
        this.assertBoolean(qx.core.Environment.get("event.customevent"));
        this.assertBoolean(qx.core.Environment.get("event.mouseevent"));
      },
      testEcmaScript: function testEcmaScript() {
        var stackTrace = qx.core.Environment.get("ecmascript.error.stacktrace");
        this.assert(typeof stackTrace == "string" || stackTrace === null);
        this.assertBoolean(qx.core.Environment.get("ecmascript.array.indexof"));
        this.assertBoolean(qx.core.Environment.get("ecmascript.array.lastindexof"));
        this.assertBoolean(qx.core.Environment.get("ecmascript.array.foreach"));
        this.assertBoolean(qx.core.Environment.get("ecmascript.array.filter"));
        this.assertBoolean(qx.core.Environment.get("ecmascript.array.map"));
        this.assertBoolean(qx.core.Environment.get("ecmascript.array.some"));
        this.assertBoolean(qx.core.Environment.get("ecmascript.array.every"));
        this.assertBoolean(qx.core.Environment.get("ecmascript.array.reduce"));
        this.assertBoolean(qx.core.Environment.get("ecmascript.array.reduceright"));
        this.assertBoolean(qx.core.Environment.get("ecmascript.function.bind"));
        this.assertBoolean(qx.core.Environment.get("ecmascript.object.keys"));
        this.assertBoolean(qx.core.Environment.get("ecmascript.date.now"));
        this.assertBoolean(qx.core.Environment.get("ecmascript.error.toString"));
        this.assertBoolean(qx.core.Environment.get("ecmascript.string.trim"));
        this.assertBoolean(qx.core.Environment.get("ecmascript.string.endsWith"));
        this.assertBoolean(qx.core.Environment.get("ecmascript.string.startsWith"));
      },
      testDataUrl: function testDataUrl() {
        qx.core.Environment.getAsync("html.dataurl", function (result) {
          this.resume(function () {
            this.assertBoolean(result);
          }, this);
        }, this);
        this.wait();
      },
      testDevice: function testDevice() {
        this.assertString(qx.core.Environment.get("device.name"));
      },
      testDeviceType: function testDeviceType() {
        this.assertString(qx.core.Environment.get("device.type"));
      },
      testDevicePixelRatio: function testDevicePixelRatio() {
        this.assertNumber(qx.core.Environment.get("device.pixelRatio"));
      },
      testQx: function testQx() {
        this.assertBoolean(false, "1");
        this.assertBoolean(false, "2");
        this.assertString(qx.core.Environment.get("qx.application"), "3");
        this.assertNumber(qx.core.Environment.get("qx.debug.dispose.level"), "5");
        this.assertBoolean(true, "6");
        this.assertBoolean(false, "9");
        this.assertNumber(0, "10");
        this.assertBoolean(false, "11");
        this.assertBoolean(false, "12");
        this.assertBoolean(true, "13");
        this.assertBoolean(qx.core.Environment.get("qx.mobile.nativescroll"), "15");
        this.assertBoolean(true, "17");
      },
      testAnimationTransformTransition: function testAnimationTransformTransition() {
        // smoke test... make sure the method is doing something
        qx.core.Environment.get("css.animation");
        qx.core.Environment.get("css.transform");
        qx.core.Environment.get("css.transition");

        // 3d transform support
        this.assertBoolean(qx.core.Environment.get("css.transform.3d"));
      }
    }
  });
  qx.test.core.Environment.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Environment.js.map?dt=1735383859271