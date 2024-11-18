function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
      "qx.theme.manager.Decoration": {},
      "qx.event.Registration": {},
      "qx.core.ObjectRegistry": {},
      "qx.test.Theme": {},
      "qx.ui.core.queue.Manager": {},
      "qx.Theme": {},
      "qx.util.AliasManager": {},
      "qx.ui.style.Stylesheet": {},
      "qx.util.ColorUtil": {}
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

  qx.Class.define("qx.test.theme.manager.Decoration", {
    extend: qx.dev.unit.TestCase,
    members: {
      __P_369_0: null,
      __P_369_1: null,
      setUp: function setUp() {
        this.manager = qx.theme.manager.Decoration.getInstance();
        this.__P_369_0 = this.manager.getTheme();
        var listener = qx.event.Registration.getManager(this.manager).getAllListeners();
        var hash = this.manager.$$hash || qx.core.ObjectRegistry.toHashCode(this.manager);
        this.__P_369_1 = _objectSpread({}, listener[hash]);
        delete listener[hash];
      },
      tearDown: function tearDown() {
        qx.test.Theme.themes = null;
        this.manager.setTheme(this.__P_369_0);
        this.__P_369_0 = null;
        var listener = qx.event.Registration.getManager(this.manager).getAllListeners();
        var hash = this.manager.$$hash || qx.core.ObjectRegistry.toHashCode(this.manager);
        listener[hash] = this.__P_369_1;
        this.__P_369_1 = null;
        qx.ui.core.queue.Manager.flush();
      },
      testAlias: function testAlias() {
        qx.Theme.define("qx.test.Theme.themes.A", {
          aliases: {
            decoration: "test/decoration",
            custom: "test/custom"
          },
          decorations: {
            main: {
              style: {}
            },
            window: {
              style: {}
            }
          }
        });
        this.manager.setTheme(qx.test.Theme.themes.A);

        // make sure the decoration alias is set
        var alias = qx.util.AliasManager.getInstance();
        this.assertEquals("test/decoration", alias.resolve("decoration"));
        this.assertEquals("test/custom", alias.resolve("custom"));
      },
      testAliasExtend: function testAliasExtend() {
        qx.Theme.define("qx.test.Theme.themes.A", {
          aliases: {
            decoration: "test/decoration",
            custom: "test/custom"
          },
          decorations: {
            main: {
              style: {}
            },
            window: {
              style: {}
            }
          }
        });
        qx.Theme.define("qx.test.Theme.themes.B", {
          extend: qx.test.Theme.themes.A,
          decorations: {}
        });
        this.manager.setTheme(qx.test.Theme.themes.B);

        // make sure the decoration alias is set
        var alias = qx.util.AliasManager.getInstance();
        this.assertEquals("test/decoration", alias.resolve("decoration"));
        this.assertEquals("test/custom", alias.resolve("custom"));
      },
      testAliasOverride: function testAliasOverride() {
        qx.Theme.define("qx.test.Theme.themes.A", {
          aliases: {
            decoration: "test/decoration",
            custom: "test/custom"
          },
          decorations: {
            main: {
              style: {}
            },
            window: {
              style: {}
            }
          }
        });
        qx.Theme.define("qx.test.Theme.themes.B", {
          extend: qx.test.Theme.themes.A,
          aliases: {
            decoration: "juhu/decoration"
          },
          decorations: {}
        });
        this.manager.setTheme(qx.test.Theme.themes.B);

        // make sure the decoration alias is set
        var alias = qx.util.AliasManager.getInstance();
        this.assertEquals("juhu/decoration", alias.resolve("decoration"));
        this.assertEquals("test/custom", alias.resolve("custom"));
      },
      testChangeThemeEventFired: function testChangeThemeEventFired() {
        qx.Theme.define("qx.test.Theme.themes.A", {
          aliases: {
            decoration: "test/decoration",
            custom: "test/custom"
          },
          decorations: {
            main: {
              style: {}
            },
            window: {
              style: {}
            }
          }
        });
        var that = this;
        this.assertEventFired(this.manager, "changeTheme", function () {
          that.manager.setTheme(qx.test.Theme.themes.A);
        }, function (e) {
          that.assertIdentical(e.getData(), qx.test.Theme.themes.A, "Setting theme failed!");
        });
      },
      testAddCssClass: function testAddCssClass() {
        qx.Theme.define("qx.test.Theme.themes.B", {
          aliases: {
            decoration: "test/decoration",
            custom: "test/custom"
          },
          decorations: {
            main: {
              style: {}
            },
            window: {
              style: {}
            },
            "test-add-css": {
              style: {
                backgroundColor: "red",
                backgroundImage: "icon/16/places/folder-open.png"
              }
            }
          }
        });
        this.manager.setTheme(qx.test.Theme.themes.B);
        var selector = this.manager.addCssClass("test-add-css");
        var sheet = qx.ui.style.Stylesheet.getInstance();
        var elem = document.createElement("div");
        elem.setAttribute("class", selector);
        document.body.appendChild(elem);
        var compStyle = window.getComputedStyle(elem);
        this.assertEquals("255,0,0", qx.util.ColorUtil.cssStringToRgb(compStyle.getPropertyValue("background-color")));
      }
    }
  });
  qx.test.theme.manager.Decoration.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Decoration.js.map?dt=1731948118485