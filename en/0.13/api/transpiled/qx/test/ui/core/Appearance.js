(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.ui.LayoutTestCase": {
        "require": true
      },
      "qx.theme.manager.Appearance": {},
      "qx.test.ui.core.AppearanceTheme": {},
      "qx.test.ui.core.AppearanceTest": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  qx.Class.define("qx.test.ui.core.Appearance", {
    extend: qx.test.ui.LayoutTestCase,
    members: {
      __P_384_0: null,
      setUp: function setUp() {
        this.__P_384_0 = qx.theme.manager.Appearance.getInstance().getTheme();
        qx.theme.manager.Appearance.getInstance().setTheme(qx.test.ui.core.AppearanceTheme);
      },
      tearDown: function tearDown() {
        qx.test.ui.core.Appearance.superclass.prototype.tearDown.call(this);
        qx.theme.manager.Appearance.getInstance().setTheme(this.__P_384_0);
      },
      testDefault: function testDefault() {
        var a = new qx.test.ui.core.AppearanceTest();
        a.setAppearance("test");
        this.getRoot().add(a);
        a.getChildControl("text");
        this.flush();
        this.assertEquals("red", a.getBackgroundColor());
        this.assertEquals("blue", a.getChildControl("text").getBackgroundColor());
        a.destroy();
      },
      testFallback: function testFallback() {
        var a = new qx.test.ui.core.AppearanceTest();
        a.setAppearance("test2");
        this.getRoot().add(a);
        a.getChildControl("text");
        this.flush();
        this.assertEquals("yellow", a.getBackgroundColor());
        this.assertEquals("green", a.getChildControl("text").getBackgroundColor());
        a.destroy();
      },
      testChange: function testChange() {
        var a = new qx.test.ui.core.AppearanceTest();
        a.setAppearance("test2");
        this.getRoot().add(a);
        a.getChildControl("text");
        this.flush();
        this.assertEquals("yellow", a.getBackgroundColor());
        this.assertEquals("green", a.getChildControl("text").getBackgroundColor());
        a.setAppearance("test");
        this.flush();
        this.assertEquals("red", a.getBackgroundColor());
        this.assertEquals("blue", a.getChildControl("text").getBackgroundColor());
        a.destroy();
      },
      testReuseNotDefined: function testReuseNotDefined() {
        var a = new qx.test.ui.core.AppearanceTest();
        a.setAppearance("test");
        this.getRoot().add(a);
        a.getChildControl("text");
        a.getChildControl("text2").setAppearance("nix");
        this.flush();
        this.assertEquals("red", a.getBackgroundColor());
        this.assertEquals("blue", a.getChildControl("text").getBackgroundColor());
        a.setAppearance("test2");
        this.flush();
        this.assertEquals("yellow", a.getBackgroundColor());
        this.assertEquals("black", a.getChildControl("text2").getBackgroundColor());

        // check for the textfield fallback
        this.assertEquals("green", a.getChildControl("text").getBackgroundColor());
        a.destroy();
      }
    }
  });
  qx.test.ui.core.Appearance.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Appearance.js.map?dt=1722151836077