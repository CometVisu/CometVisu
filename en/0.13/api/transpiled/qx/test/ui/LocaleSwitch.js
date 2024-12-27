(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.ui.LayoutTestCase": {
        "construct": true,
        "require": true
      },
      "qx.locale.MTranslation": {
        "require": true
      },
      "qx.locale.Manager": {
        "construct": true
      },
      "qx.ui.command.Command": {},
      "qx.ui.menu.Button": {},
      "qx.ui.basic.Label": {},
      "qx.ui.core.Widget": {}
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
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  qx.Class.define("qx.test.ui.LocaleSwitch", {
    extend: qx.test.ui.LayoutTestCase,
    include: qx.locale.MTranslation,
    construct: function construct() {
      qx.test.ui.LayoutTestCase.constructor.call(this);
      this.manager = qx.locale.Manager.getInstance();
    },
    members: {
      manager: null,
      __P_379_0: null,
      setUp: function setUp() {
        if (!this.__P_379_0) {
          // add dummy translations
          this.manager.addTranslation("en_QX", {
            "test one": "test one",
            "test two": "test two",
            "test Hello %1!": "test Hello %1!",
            "test Jonny": "test Jonny",
            "test One car": "test One car",
            "test %1 cars": "test %1 cars",
            key_short_Shift: "Shift"
          });
          this.manager.addTranslation("de_QX", {
            "test one": "Eins",
            "test two": "Zwei",
            "test Hello %1!": "Servus %1!",
            "test Jonny": "Jonathan",
            "test One car": "Ein Auto",
            "test %1 cars": "%1 Autos",
            key_short_Shift: "Umschalt"
          });
          this.__P_379_0 = true;
        }
        this.manager.setLocale("en_QX");
      },
      tearDown: function tearDown() {
        this.manager.resetLocale();
      },
      testCommandInMenuButton: function testCommandInMenuButton() {
        var command = new qx.ui.command.Command("Shift-A");
        var menuButton = new qx.ui.menu.Button("Juhu", null, command);
        this.assertEquals("Shift+A", command.toString());
        this.assertEquals("Shift+A", menuButton.getChildControl("shortcut").getValue());
        this.manager.setLocale("de_QX");
        this.assertEquals("Umschalt+A", command.toString());
        this.assertEquals("Umschalt+A", menuButton.getChildControl("shortcut").getValue());
        menuButton.dispose();
        command.dispose();
      },
      testLabel: function testLabel() {
        var label = new qx.ui.basic.Label(this.tr("test one"));
        this.getRoot().add(label);
        this.assertEquals("test one", label.getValue());
        this.manager.setLocale("de_QX");
        this.assertEquals("Eins", label.getValue());
        this.manager.setLocale("en_QX");
        label.setValue(this.tr("test Hello %1!", this.tr("test Jonny")));
        this.assertEquals("test Hello test Jonny!", label.getValue());
        this.manager.setLocale("de_QX");
        this.assertEquals("Servus Jonathan!", label.getValue());

        // de -> en
        label.setValue(this.tr("test two"));
        this.assertEquals("Zwei", label.getValue());
        this.manager.setLocale("en_QX");
        this.assertEquals("test two", label.getValue());
        label.destroy();
      },
      testToolTipText: function testToolTipText() {
        var widget = new qx.ui.core.Widget();
        this.getRoot().add(widget);
        widget.setToolTipText(this.tr("test one"));
        this.assertEquals("test one", widget.getToolTipText());
        this.manager.setLocale("de_QX");
        this.assertEquals("Eins", widget.getToolTipText());
        widget.destroy();
      }
    }
  });
  qx.test.ui.LocaleSwitch.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=LocaleSwitch.js.map?dt=1735341780493