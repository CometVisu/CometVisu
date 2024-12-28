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
      "qx.bom.client.CssAnimation": {
        "require": true
      },
      "qx.dev.unit.RequirementError": {},
      "qx.dom.Element": {},
      "qx.bom.element.Animation": {},
      "qx.bom.element.AnimationJs": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "css.animation": {
          "className": "qx.bom.client.CssAnimation"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2013 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Alexander Steitz (aback)
  
  ************************************************************************ */

  qx.Class.define("qx.test.bom.element.AnimationHandle", {
    extend: qx.dev.unit.TestCase,
    include: [qx.dev.unit.MMock, qx.dev.unit.MRequirements],
    members: {
      setUp: function setUp() {
        this.__P_315_0 = qx.core.Environment.get("css.animation");
        if (this.__P_315_0 == null) {
          // skip the test
          throw new qx.dev.unit.RequirementError("css.animation");
        }
      },
      "test stop of CSS animation": function test_stop_of_CSS_animation() {
        var el = qx.dom.Element.create("div");
        var handle = qx.bom.element.Animation.animate(el, {
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
        var spy = this.spy(qx.bom.element.AnimationJs, "stop");
        handle.on("start", spy);
        handle.stop();
        this.wait(500, function () {
          this.assertNotCalled(spy);
        }, this);
      }
    }
  });
  qx.test.bom.element.AnimationHandle.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AnimationHandle.js.map?dt=1735383858576