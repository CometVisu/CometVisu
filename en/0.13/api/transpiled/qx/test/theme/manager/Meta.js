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
        "construct": true,
        "require": true
      },
      "qx.Theme": {},
      "qx.test.theme.manager.mock.Color": {},
      "qx.test.theme.manager.mock.Decoration": {},
      "qx.test.theme.manager.mock.Font": {},
      "qx.test.theme.manager.mock.Appearance": {},
      "qx.theme.icon.Tango": {},
      "qx.theme.manager.Decoration": {},
      "qx.theme.manager.Color": {},
      "qx.theme.manager.Font": {},
      "qx.theme.manager.Appearance": {},
      "qx.bom.client.Engine": {
        "require": true
      },
      "qx.bom.client.Browser": {
        "require": true
      },
      "qx.theme.manager.Meta": {},
      "qx.event.Registration": {},
      "qx.ui.form.Button": {},
      "qx.ui.core.queue.Manager": {},
      "qx.bom.element.Style": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "className": "qx.bom.client.Engine"
        },
        "browser.documentmode": {
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
       2014 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Mustafa Sak (msak)
  
  ************************************************************************ */
  /**
   * @ignore(qx.test.theme.manager.MockAll)
   * @ignore(qx.test.theme.manager.MockAppearance)
   * @ignore(qx.test.theme.manager.MockDecoration)
   * @ignore(qx.test.theme.manager.MockColor)
   */

  qx.Class.define("qx.test.theme.manager.Meta", {
    extend: qx.test.ui.LayoutTestCase,
    construct: function construct() {
      qx.test.ui.LayoutTestCase.constructor.call(this);
      qx.Theme.define("qx.test.theme.manager.MockAll", {
        title: "Mock all theme manager",
        meta: {
          color: qx.test.theme.manager.mock.Color,
          decoration: qx.test.theme.manager.mock.Decoration,
          font: qx.test.theme.manager.mock.Font,
          appearance: qx.test.theme.manager.mock.Appearance,
          icon: qx.theme.icon.Tango
        }
      });
      qx.Theme.define("qx.test.theme.manager.MockAppearance", {
        title: "Mock only appearance manager",
        meta: {
          appearance: qx.test.theme.manager.mock.Appearance,
          decoration: qx.theme.manager.Decoration.getInstance().getTheme(),
          color: qx.theme.manager.Color.getInstance().getTheme(),
          font: qx.theme.manager.Font.getInstance().getTheme(),
          icon: qx.theme.icon.Tango
        }
      });
      qx.Theme.define("qx.test.theme.manager.MockDecoration", {
        title: "Mock only decorator manager",
        meta: {
          decoration: qx.test.theme.manager.mock.Decoration,
          color: qx.theme.manager.Color.getInstance().getTheme(),
          font: qx.theme.manager.Font.getInstance().getTheme(),
          appearance: qx.theme.manager.Appearance.getInstance().getTheme(),
          icon: qx.theme.icon.Tango
        }
      });
      qx.Theme.define("qx.test.theme.manager.MockColor", {
        title: "Mock only color manager",
        meta: {
          color: qx.test.theme.manager.mock.Color,
          decoration: qx.theme.manager.Decoration.getInstance().getTheme(),
          font: qx.theme.manager.Font.getInstance().getTheme(),
          appearance: qx.theme.manager.Appearance.getInstance().getTheme(),
          icon: qx.theme.icon.Tango
        }
      });
    },
    members: {
      __P_383_0: null,
      __P_383_1: null,
      __P_383_2: /(orange.*yellow|rgb\(255, 0, 0\).*rgb\(0, 0, 255\)|none|data:image\/png;base64,iVBORw0K)/,
      setUp: function setUp() {
        if (qx.core.Environment.get("engine.name") == "mshtml" && qx.core.Environment.get("browser.documentmode") < 9) {
          this.skip("Skipped in IE 8.");
        }
        this.manager = qx.theme.manager.Meta.getInstance();
        this.__P_383_0 = this.manager.getTheme();
        var eventMgr = qx.event.Registration.getManager(this.manager);

        // Serialize listeners (Array of {handler, self, type, capture})
        this.__P_383_1 = eventMgr.serializeListeners(this.manager);

        // Remove all listeners
        eventMgr.removeAllListeners(this.manager);

        // add a theme able widget
        this.__P_383_3 = new qx.ui.form.Button("Foo").set({
          appearance: "test-button-gradient"
        });
        this.getRoot().add(this.__P_383_3);
        qx.ui.core.queue.Manager.flush();
      },
      tearDown: function tearDown() {
        var _this = this;
        this.__P_383_3.destroy();
        this.manager.setTheme(this.__P_383_0);
        this.__P_383_0 = null;

        // Restore all listeners
        if (this.__P_383_1) {
          this.__P_383_1.forEach(function (entry) {
            qx.event.Registration.addListener(_this.manager, entry.type, entry.handler, entry.self, entry.capture);
          });
          this.__P_383_1 = null;
        }
        qx.ui.core.queue.Manager.flush();
      },
      testAllThemeManagerChanged: function testAllThemeManagerChanged() {
        qx.theme.manager.Meta.getInstance().setTheme(qx.test.theme.manager.MockAll);
        qx.ui.core.queue.Manager.flush();

        // button element
        var elem = this.__P_383_3.getContentElement().getDomElement();

        // mocked appearance theme defines a padding with 30px 80px
        this.assertEquals(qx.bom.element.Style.get(elem, "padding"), "30px 80px");

        // mocked color theme defines a gradient with 'orange' and 'yellow';
        // also check for corresponding rgb values (need for FireFox)
        this.assertNotNull(qx.bom.element.Style.get(elem, "backgroundImage").match(this.__P_383_2));

        // mocked decoration theme defines a border radius of 10 pixel
        this.assertEquals(qx.bom.element.Style.get(elem, "borderTopLeftRadius"), "10px");

        // button label element
        elem = this.__P_383_3.getChildControl("label").getContentElement().getDomElement();

        // mocked color theme defines red text color for button labels
        this.assertEquals(qx.bom.element.Style.get(elem, "color"), "rgb(255, 0, 0)");
      },
      testColorThemeManagerChanged: function testColorThemeManagerChanged() {
        qx.theme.manager.Meta.getInstance().setTheme(qx.test.theme.manager.MockColor);
        qx.ui.core.queue.Manager.flush();
        var elem = this.__P_383_3.getContentElement().getDomElement();
        // mocked color theme defines a gradient with 'orange' and 'yellow';
        // also check for corresponding rgb values (need for FireFox)
        this.assertNotNull(qx.bom.element.Style.get(elem, "backgroundImage").match(this.__P_383_2));
      },
      /*
          testDecoratorThemeManagerChanged : function()
          {
            qx.theme.manager.Meta.getInstance().setTheme(qx.test.theme.manager.MockDecoration);
            qx.ui.core.queue.Manager.flush();
      
            // mocked decoration theme defines a border radius of 10 pixel
            var elem = this.__button.getContentElement().getDomElement();
            this.assertEquals(qx.bom.element.Style.get(elem, "borderTopLeftRadius"), "10px");
          },
      */
      testAppearanceThemeManagerChanged: function testAppearanceThemeManagerChanged() {
        qx.theme.manager.Meta.getInstance().setTheme(qx.test.theme.manager.MockAppearance);
        qx.ui.core.queue.Manager.flush();

        // mocked appearance theme defines a padding with 30px 80px
        var elem = this.__P_383_3.getContentElement().getDomElement();
        this.assertEquals(qx.bom.element.Style.get(elem, "padding"), "30px 80px");
      },
      testColorThemeChanged: function testColorThemeChanged() {
        qx.theme.manager.Color.getInstance().setTheme(qx.test.theme.manager.mock.Color);
        qx.ui.core.queue.Manager.flush();
        var elem = this.__P_383_3.getContentElement().getDomElement();
        // mocked color theme defines a gradient with 'orange' and 'yellow';
        // also check for corresponding rgb values (need for FireFox)
        this.assertNotNull(qx.bom.element.Style.get(elem, "backgroundImage").match(this.__P_383_2));
      }
    },
    destruct: function destruct() {}
  });
  qx.test.theme.manager.Meta.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Meta.js.map?dt=1782595064829