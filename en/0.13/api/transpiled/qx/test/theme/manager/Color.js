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
      "qx.theme.manager.Color": {},
      "qx.event.Registration": {},
      "qx.core.ObjectRegistry": {},
      "qx.test.Theme": {},
      "qx.ui.core.queue.Manager": {},
      "qx.Theme": {},
      "qx.theme.indigo.Color": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2012 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (wittemann)
  
  ************************************************************************ */

  qx.Class.define("qx.test.theme.manager.Color", {
    extend: qx.dev.unit.TestCase,
    members: {
      __P_368_0: null,
      __P_368_1: null,
      setUp: function setUp() {
        this.manager = qx.theme.manager.Color.getInstance();
        this.__P_368_0 = this.manager.getTheme();
        var listener = qx.event.Registration.getManager(this.manager).getAllListeners();
        var hash = this.manager.$$hash || qx.core.ObjectRegistry.toHashCode(this.manager);
        this.__P_368_1 = _objectSpread({}, listener[hash]);
        delete listener[hash];
      },
      tearDown: function tearDown() {
        qx.test.Theme.themes = null;
        this.manager.setTheme(this.__P_368_0);
        this.__P_368_0 = null;
        var listener = qx.event.Registration.getManager(this.manager).getAllListeners();
        var hash = this.manager.$$hash || qx.core.ObjectRegistry.toHashCode(this.manager);
        listener[hash] = this.__P_368_1;
        this.__P_368_1 = null;
        qx.ui.core.queue.Manager.flush();
      },
      testInclude: function testInclude() {
        qx.Theme.define("qx.test.Theme.themes.A", {
          extend: qx.theme.indigo.Color,
          colors: {
            a: "#111111",
            b: "#222222",
            c: "#333333"
          }
        });
        this.manager.setTheme(qx.test.Theme.themes.A);
        var theme = this.manager.getTheme();
        this.assertEquals("#111111", theme.colors["a"]);
        this.assertEquals("#222222", theme.colors["b"]);
        this.assertEquals("#333333", theme.colors["c"]);
      },
      testResolve: function testResolve() {
        qx.Theme.define("qx.test.Theme.themes.A", {
          extend: qx.theme.indigo.Color,
          colors: {
            a: "#111111",
            b: "#222222",
            c: "#333333"
          }
        });
        this.manager.setTheme(qx.test.Theme.themes.A);
        this.assertEquals("#111111", this.manager.resolve("a"));
        this.assertEquals("#222222", this.manager.resolve("b"));
        this.assertEquals("#333333", this.manager.resolve("c"));
        this.assertEquals("d", this.manager.resolve("d"));
      },
      testResolveSelfReference: function testResolveSelfReference() {
        qx.Theme.define("qx.test.Theme.themes.A", {
          extend: qx.theme.indigo.Color,
          colors: {
            a: "#111111",
            b: "a",
            c: "b"
          }
        });
        this.manager.setTheme(qx.test.Theme.themes.A);
        this.assertEquals("#111111", this.manager.resolve("a"));
        this.assertEquals("#111111", this.manager.resolve("b"));
        this.assertEquals("#111111", this.manager.resolve("c"));
      },
      testResolveException: function testResolveException() {
        qx.Theme.define("qx.test.Theme.themes.A", {
          extend: qx.theme.indigo.Color,
          colors: {
            d: "xyz"
          }
        });
        var self = this;
        this.assertException(function () {
          self.manager.setTheme(qx.test.Theme.themes.A);
        });
        qx.Theme.define("qx.test.Theme.themes.A", {
          extend: qx.theme.indigo.Color,
          colors: {
            b: "a",
            c: "b"
          }
        });
        var self = this;
        this.assertException(function () {
          self.manager.setTheme(qx.test.Theme.themes.A);
        });
      }
    }
  });
  qx.test.theme.manager.Color.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Color.js.map?dt=1726089056723