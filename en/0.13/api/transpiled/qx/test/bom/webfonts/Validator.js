(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.bom.webfonts.Abstract": {
        "require": true
      },
      "qx.dev.unit.MRequirements": {
        "require": true
      },
      "qx.bom.webfonts.Validator": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
  ************************************************************************ */

  qx.Class.define("qx.test.bom.webfonts.Validator", {
    extend: qx.test.bom.webfonts.Abstract,
    include: [qx.dev.unit.MRequirements],
    members: {
      setUp: function setUp() {
        this.require(["webFontSupport"]);
        this.__P_322_0 = new qx.bom.webfonts.Validator();
      },
      tearDown: function tearDown() {
        if (this.__P_322_0) {
          this.__P_322_0.dispose();
          delete this.__P_322_0;
        }
        qx.bom.webfonts.Validator.removeDefaultHelperElements();
      },
      testValidFont: function testValidFont() {
        var _this = this;
        this.__P_322_0.setFontFamily("monospace, courier");
        this.__P_322_0.addListener("changeStatus", function (ev) {
          var result = ev.getData();
          _this.resume(function (ev) {
            this.assertTrue(result.valid);
          }, _this);
        });
        var that = this;
        window.setTimeout(function () {
          that.__P_322_0.validate();
        }, 0);
        this.wait(10000);
      },
      testInvalidFont: function testInvalidFont() {
        var _this2 = this;
        this.__P_322_0.setFontFamily("zzzzzzzzzzzzzzz");
        this.__P_322_0.setTimeout(250);
        this.__P_322_0.addListener("changeStatus", function (ev) {
          var result = ev.getData();
          _this2.resume(function (ev) {
            this.assertFalse(result.valid);
          }, _this2);
        });
        var that = this;
        window.setTimeout(function () {
          that.__P_322_0.validate();
        }, 0);
        this.wait(500);
      }
    }
  });
  qx.test.bom.webfonts.Validator.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Validator.js.map?dt=1722153824814