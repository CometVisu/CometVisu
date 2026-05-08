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
      "qx.theme.manager.Icon": {},
      "qx.event.Registration": {},
      "qx.test.Theme": {},
      "qx.ui.core.queue.Manager": {},
      "qx.Theme": {},
      "qx.util.AliasManager": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  qx.Class.define("qx.test.theme.manager.Icon", {
    extend: qx.dev.unit.TestCase,
    members: {
      __P_382_0: null,
      __P_382_1: null,
      setUp: function setUp() {
        this.manager = qx.theme.manager.Icon.getInstance();
        this.__P_382_0 = this.manager.getTheme();
        var eventMgr = qx.event.Registration.getManager(this.manager);

        // Serialize listeners (Array of {handler, self, type, capture})
        this.__P_382_1 = eventMgr.serializeListeners(this.manager);

        // Remove all listeners
        eventMgr.removeAllListeners(this.manager);
      },
      tearDown: function tearDown() {
        var _this = this;
        qx.test.Theme.themes = null;
        this.manager.setTheme(this.__P_382_0);
        this.__P_382_0 = null;

        // Restore all listeners
        if (this.__P_382_1) {
          this.__P_382_1.forEach(function (entry) {
            qx.event.Registration.addListener(_this.manager, entry.type, entry.handler, entry.self, entry.capture);
          });
          this.__P_382_1 = null;
        }
        qx.ui.core.queue.Manager.flush();
      },
      testAlias: function testAlias() {
        qx.Theme.define("qx.test.Theme.themes.A", {
          aliases: {
            icon: "test/icon",
            custom: "test/custom"
          }
        });
        this.manager.setTheme(qx.test.Theme.themes.A);

        // make sure the icon alias is set
        var alias = qx.util.AliasManager.getInstance();
        this.assertEquals("test/icon", alias.resolve("icon"));
        this.assertEquals("test/custom", alias.resolve("custom"));
      },
      testAliasExtend: function testAliasExtend() {
        qx.Theme.define("qx.test.Theme.themes.A", {
          aliases: {
            icon: "test/icon",
            custom: "test/custom"
          }
        });
        qx.Theme.define("qx.test.Theme.themes.B", {
          extend: qx.test.Theme.themes.A
        });
        this.manager.setTheme(qx.test.Theme.themes.B);

        // make sure the icon alias is set
        var alias = qx.util.AliasManager.getInstance();
        this.assertEquals("test/icon", alias.resolve("icon"));
        this.assertEquals("test/custom", alias.resolve("custom"));
      },
      testAliasOverride: function testAliasOverride() {
        qx.Theme.define("qx.test.Theme.themes.A", {
          aliases: {
            icon: "test/icon",
            custom: "test/custom"
          }
        });
        qx.Theme.define("qx.test.Theme.themes.B", {
          extend: qx.test.Theme.themes.A,
          aliases: {
            icon: "juhu/icon"
          }
        });
        this.manager.setTheme(qx.test.Theme.themes.B);

        // make sure the icon alias is set
        var alias = qx.util.AliasManager.getInstance();
        this.assertEquals("juhu/icon", alias.resolve("icon"));
        this.assertEquals("test/custom", alias.resolve("custom"));
      },
      testChangeThemeEventFired: function testChangeThemeEventFired() {
        qx.Theme.define("qx.test.Theme.themes.A", {
          aliases: {
            icon: "my/icon/Theme"
          }
        });
        var that = this;
        this.assertEventFired(this.manager, "changeTheme", function () {
          that.manager.setTheme(qx.test.Theme.themes.A);
        }, function (e) {
          that.assertIdentical(e.getData(), qx.test.Theme.themes.A, "Setting theme failed!");
        });
      }
    }
  });
  qx.test.theme.manager.Icon.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Icon.js.map?dt=1778272835321