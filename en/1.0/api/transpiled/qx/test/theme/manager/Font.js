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
      "qx.theme.manager.Font": {},
      "qx.event.Registration": {},
      "qx.test.Theme": {},
      "qx.ui.core.queue.Manager": {},
      "qx.Theme": {},
      "qx.theme.simple.Font": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2010 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Alexander Steitz (aback)
  
  ************************************************************************ */

  qx.Class.define("qx.test.theme.manager.Font", {
    extend: qx.dev.unit.TestCase,
    members: {
      __P_381_0: null,
      __P_381_1: null,
      setUp: function setUp() {
        this.manager = qx.theme.manager.Font.getInstance();
        this.__P_381_0 = this.manager.getTheme();
        var eventMgr = qx.event.Registration.getManager(this.manager);

        // Serialize listeners (Array of {handler, self, type, capture})
        this.__P_381_1 = eventMgr.serializeListeners(this.manager);

        // Remove all listeners
        eventMgr.removeAllListeners(this.manager);
      },
      tearDown: function tearDown() {
        var _this = this;
        qx.test.Theme.themes = null;
        this.manager.setTheme(this.__P_381_0);
        this.__P_381_0 = null;

        // Restore all listeners
        if (this.__P_381_1) {
          this.__P_381_1.forEach(function (entry) {
            qx.event.Registration.addListener(_this.manager, entry.type, entry.handler, entry.self, entry.capture);
          });
          this.__P_381_1 = null;
        }
        qx.ui.core.queue.Manager.flush();
      },
      testInclude: function testInclude() {
        qx.Theme.define("qx.test.Theme.themes.A", {
          extend: qx.theme.simple.Font,
          fonts: {
            myfont: {
              include: "default",
              bold: true
            },
            mysecondfont: {
              include: "myfont",
              italic: true
            }
          }
        });
        this.manager.setTheme(qx.test.Theme.themes.A);
        var fontTheme = this.manager.getTheme();
        this.assertKeyInMap("size", fontTheme.fonts.myfont, "Including font theme failed");
        this.assertKeyInMap("family", fontTheme.fonts.myfont, "Including font theme failed");
        this.assertKeyInMap("bold", fontTheme.fonts.myfont, "Including font theme failed");
        this.assertKeyInMap("size", fontTheme.fonts.mysecondfont, "Including font theme failed");
        this.assertKeyInMap("family", fontTheme.fonts.mysecondfont, "Including font theme failed");
        this.assertKeyInMap("bold", fontTheme.fonts.mysecondfont, "Including font theme failed");
        this.assertKeyInMap("italic", fontTheme.fonts.mysecondfont, "Including font theme failed");
      }
    }
  });
  qx.test.theme.manager.Font.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Font.js.map?dt=1782967156386