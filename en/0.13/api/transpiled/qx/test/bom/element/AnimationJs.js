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
      "qx.dom.Element": {},
      "qx.bom.element.AnimationJs": {},
      "qx.bom.element.Style": {},
      "qx.bom.client.Browser": {
        "require": true
      },
      "qx.dev.unit.RequirementError": {},
      "qx.bom.element.Animation": {}
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
       2004-2012 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (wittemann)
  
  ************************************************************************ */
  qx.Class.define("qx.test.bom.element.AnimationJs", {
    extend: qx.dev.unit.TestCase,
    include: qx.dev.unit.MMock,
    members: {
      __P_315_0: null,
      testStop: function testStop() {
        var el = qx.dom.Element.create("div");
        var handle = qx.bom.element.AnimationJs.animate(el, {
          duration: 100,
          keyFrames: {
            0: {
              opacity: 1
            },
            100: {
              opacity: 0
            }
          },
          delay: 200
        });
        var spy = this.spy();
        handle.on("start", spy);
        handle.stop();
        this.wait(500, function () {
          this.assertNotCalled(spy);
        }, this);
      },
      setUp: function setUp() {
        this.__P_315_0 = qx.dom.Element.create("img");
        qx.bom.element.Style.setStyles(this.__P_315_0, {
          width: "200px",
          height: "200px"
        });
        document.body.appendChild(this.__P_315_0);
      },
      tearDown: function tearDown() {
        document.body.removeChild(this.__P_315_0);
        this.__P_315_0 = null;
      },
      "test animate properties which are CSS properties and element attributes": function test_animate_properties_which_are_CSS_properties_and_element_attributes() {
        // known to fail in chrome
        if (qx.core.Environment.get("browser.name") == "chrome") {
          throw new qx.dev.unit.RequirementError();
        }
        var handle = qx.bom.element.Animation.animate(this.__P_315_0, {
          duration: 100,
          keyFrames: {
            0: {
              width: "200px",
              height: "200px"
            },
            100: {
              width: "400px",
              height: "400px"
            }
          },
          keep: 100
        });
        this.wait(500, function () {
          this.assertEquals("400px", qx.bom.element.Style.get(this.__P_315_0, "width"));
          this.assertEquals("400px", qx.bom.element.Style.get(this.__P_315_0, "height"));
        }, this);
      }
    }
  });
  qx.test.bom.element.AnimationJs.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AnimationJs.js.map?dt=1722153824143