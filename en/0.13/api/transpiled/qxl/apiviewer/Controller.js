function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qxl.apiviewer.MWidgetRegistry": {
        "construct": true
      },
      "qxl.apiviewer.ClassLoader": {
        "construct": true
      },
      "qxl.apiviewer.TabViewController": {
        "construct": true
      },
      "qx.bom.History": {
        "construct": true
      },
      "qx.core.Init": {
        "construct": true
      },
      "qxl.apiviewer.dao.Class": {},
      "qxl.apiviewer.dao.Package": {},
      "qxl.apiviewer.UiModel": {},
      "qxl.apiviewer.LoadingIndicator": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
       2018 Zenesis Limited, http://www.zenesis.com
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * John Spackman (johnspackman)
       * Til Schneider (til132)
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
       * Fabian Jakobs (fjakobs)
       * Jonathan Weiß (jonathan_rass)
       * Henner Kollmann (hkollmann)
  
  ************************************************************************ */

  /**
   * Implements the dynamic behavior of the API viewer. The GUI is defined in
   * {@link Viewer}.
   *
   */
  qx.Class.define("qxl.apiviewer.Controller", {
    extend: qx.core.Object,
    /*
     * ****************************************************************************
     * CONSTRUCTOR
     * ****************************************************************************
     */
    /**
     * @param widgetRegistry
     *          {Viewer} the GUI
     *
     * @ignore (qx.$$appRoot)
     *
     */
    construct: function construct(widgetRegistry) {
      qx.core.Object.constructor.call(this);
      this._widgetRegistry = qxl.apiviewer.MWidgetRegistry;
      this._titlePrefix = "API Documentation";
      document.title = this._titlePrefix;
      qxl.apiviewer.ClassLoader.setBaseUri("".concat(qx.$$appRoot, "../resource/").concat(qxl.apiviewer.ClassLoader.RESOURCEPATH, "/"));
      this._detailLoader = this._widgetRegistry.getWidgetById("detail_loader");
      this._tabViewController = new qxl.apiviewer.TabViewController(this._widgetRegistry);
      this.__P_797_0();
      this._tree = this._widgetRegistry.getWidgetById("tree");
      this.__P_797_1();
      this.__P_797_2();
      var btn_inherited = this._widgetRegistry.getWidgetById("btn_inherited");
      var btn_included = this._widgetRegistry.getWidgetById("btn_included");
      btn_inherited.addListener("changeValue", this.__P_797_3, this);
      btn_included.addListener("changeValue", this.__P_797_3, this);
      this._history = qx.bom.History.getInstance();
      this.__P_797_4();
      qx.core.Init.getApplication().getRoot().addListener("pointerdown", function (e) {
        this.__P_797_5 = e.isShiftPressed() || e.isCtrlOrCommandPressed();
      }, this, true);
    },
    members: {
      __P_797_5: false,
      // overridden
      $$logCategory: "application",
      /**
       * Loads the API doc tree from the enviroment
       * doc tree.
       *
       * @param classes [] all classes to show
       */
      load: function load(classes) {
        var _this = this;
        setTimeout(function () {
          var start = new Date();
          var _iterator = _createForOfIteratorHelper(classes),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var classname = _step.value;
              qxl.apiviewer.dao.Class.getClassByName(classname, true);
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          var rootPackage = qxl.apiviewer.dao.Package.getPackage(null);
          var end = new Date();
          start = new Date();
          _this._tree.setTreeData(rootPackage);
          end = new Date();
          setTimeout(function () {
            // Handle bookmarks
            var state = _this._history.getState();
            if (state) {
              _this.__P_797_6(_this.__P_797_7(state));
            } else {
              _this.__P_797_6("");
            }
          });
        });
      },
      /**
       * binds the events of the TabView controller
       */
      __P_797_0: function __P_797_0() {
        this._tabViewController.addListener("classLinkTapped", function (evt) {
          this._updateHistory(evt.getData());
        }, this);
        this._tabViewController.addListener("changeSelection", function (evt) {
          var page = evt.getData()[0];
          if (this._ignoreTabViewSelection == true) {
            return;
          }
          if (page && page.getUserData("nodeName")) {
            var nodeName = page.getUserData("nodeName");
            var itemName = page.getUserData("itemName");
            if (itemName === null) {
              this._updateHistory(nodeName);
            } else {
              this._updateHistory(nodeName + "#" + itemName);
            }
          } else {
            this._tree.resetSelection();
          }
        }, this);
      },
      /**
       * binds the selection event of the package tree.
       */
      __P_797_1: function __P_797_1() {
        this._tree.addListener("changeSelection", function (evt) {
          var treeNode = evt.getData()[0];
          if (treeNode && treeNode.getUserData("nodeName") && !this._ignoreTreeSelection) {
            var nodeName = treeNode.getUserData("nodeName");

            // the history update will cause _selectClass to be called.
            this._updateHistory(nodeName);
          }
        }, this);
      },
      /**
       * binds the actions of the toolbar buttons.
       */
      __P_797_2: function __P_797_2() {
        var uiModel = qxl.apiviewer.UiModel.getInstance();
        var btn_inherited = this._widgetRegistry.getWidgetById("btn_inherited");
        btn_inherited.bind("value", uiModel, "showInherited");
        uiModel.bind("showInherited", btn_inherited, "value");
        var btn_included = this._widgetRegistry.getWidgetById("btn_included");
        btn_included.bind("value", uiModel, "showIncluded");
        uiModel.bind("showIncluded", btn_included, "value");
        var btn_expand = this._widgetRegistry.getWidgetById("btn_expand");
        btn_expand.bind("value", uiModel, "expandProperties");
        uiModel.bind("expandProperties", btn_expand, "value");
        var btn_protected = this._widgetRegistry.getWidgetById("btn_protected");
        btn_protected.bind("value", uiModel, "showProtected");
        uiModel.bind("showProtected", btn_protected, "value");
        var btn_private = this._widgetRegistry.getWidgetById("btn_private");
        btn_private.bind("value", uiModel, "showPrivate");
        uiModel.bind("showPrivate", btn_private, "value");
        var btn_internal = this._widgetRegistry.getWidgetById("btn_internal");
        btn_internal.bind("value", uiModel, "showInternal");
        uiModel.bind("showInternal", btn_internal, "value");
      },
      /**
       * Keeps the icon of the menubutton in sync with the menu checkboxes of
       * inherited and mixin includes.
       *
       */
      __P_797_3: function __P_797_3() {
        var menuButton = this._widgetRegistry.getWidgetById("menubtn_includes");
        var btn_inherited = this._widgetRegistry.getWidgetById("btn_inherited");
        var btn_included = this._widgetRegistry.getWidgetById("btn_included");
        var showInherited = btn_inherited.getValue();
        var showMixins = btn_included.getValue();
        if (showMixins && showInherited) {
          menuButton.setIcon("qxl/apiviewer/image/inherited_and_mixins_included.gif");
        }
        if (showInherited && !showMixins) {
          menuButton.setIcon("qxl/apiviewer/image/method_public_inherited18.gif");
        }
        if (!showInherited && showMixins) {
          menuButton.setIcon("qxl/apiviewer/image/overlay_mixin18.gif");
        }
        if (!showInherited && !showMixins) {
          menuButton.setIcon("qxl/apiviewer/image/includes.gif");
        }
      },
      /**
       * bind history events
       */
      __P_797_4: function __P_797_4() {
        this._history.addListener("changeState", function (evt) {
          var item = this.__P_797_7(evt.getData());
          if (item) {
            this.__P_797_6(item);
          }
        }, this);
      },
      /**
       * Push the class to the browser history
       *
       * @param className
       *          {String} name of the class
       */
      _updateHistory: function _updateHistory(className) {
        var newTitle = className + " - " + this._titlePrefix;
        qx.bom.History.getInstance().addToHistory(this.__P_797_8(className), newTitle);
      },
      /**
       * Display information about a class
       * @param classNode
       * {qxl.apiviewer.dao.Class} class node to display
       * @param callback
       * @param self
       */
      _selectClass: function _selectClass(classNode, callback, self) {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                _this2._detailLoader.exclude();
                _this2._tabViewController.showTabView();
                _context.n = 1;
                return classNode.loadDependedClasses();
              case 1:
                if (!(classNode instanceof qxl.apiviewer.dao.Class)) {
                  _context.n = 3;
                  break;
                }
                _context.n = 2;
                return _this2._tabViewController.openClass(classNode, _this2.__P_797_5);
              case 2:
                _context.n = 4;
                break;
              case 3:
                _context.n = 4;
                return _this2._tabViewController.openPackage(classNode, _this2.__P_797_5);
              case 4:
                callback && callback.call(self);
              case 5:
                return _context.a(2);
            }
          }, _callee);
        }))();
      },
      /**
       * Selects an item (class, property, method or constant).
       *
       * @param fullItemName
       *          {String} the full name of the item to select. (e.g.
       *          "qx.mypackage.MyClass" or "qx.mypackage.MyClass#myProperty")
       *
       */
      __P_797_6: function __P_797_6(fullItemName) {
        var _this3 = this;
        qxl.apiviewer.LoadingIndicator.getInstance().show();
        var className = fullItemName;
        var itemName = null;
        var hashPos = fullItemName.indexOf("#");
        if (hashPos != -1) {
          className = fullItemName.substring(0, hashPos);
          itemName = fullItemName.substring(hashPos + 1);
          var parenPos = itemName.indexOf("(");
          if (parenPos != -1) {
            itemName = itemName.substring(0, parenPos).trim();
          }
        }

        // ignore changeSelection events
        this._ignoreTreeSelection = true;
        this._tree.selectTreeNodeByClassName(className).then(function (couldSelectTreeNode) {
          _this3._ignoreTreeSelection = false;
          if (!couldSelectTreeNode) {
            _this3.error("Unknown class: " + className);
            qxl.apiviewer.LoadingIndicator.getInstance().hide();
            return;
          }
          var sel = _this3._tree.getSelection();
          var nodeName = sel[0].getUserData("nodeName") || className;
          _this3._ignoreTabViewSelection = true;
          _this3._selectClass(qxl.apiviewer.ClassLoader.getClassOrPackage(nodeName), function () {
            if (itemName) {
              _this3._tabViewController.isLoaded(function () {
                if (!_this3._tabViewController.showItem(itemName)) {
                  _this3.error("Unknown item of class '" + className + "': " + itemName);
                  qxl.apiviewer.LoadingIndicator.getInstance().hide();
                  _this3._updateHistory(className);
                  _this3._ignoreTabViewSelection = false;
                  return;
                }
                _this3._updateHistory(fullItemName);
                qxl.apiviewer.LoadingIndicator.getInstance().hide();
                _this3._ignoreTabViewSelection = false;
              });
            } else {
              qxl.apiviewer.LoadingIndicator.getInstance().hide();
              _this3._ignoreTabViewSelection = false;
            }
          });
        });
      },
      __P_797_8: function __P_797_8(state) {
        return state.replace(/(.*)#(.*)/g, "$1~$2");
      },
      __P_797_7: function __P_797_7(encodedState) {
        return encodedState.replace(/(.*)~(.*)/g, "$1#$2");
      }
    },
    /*
     * ****************************************************************************
     * DESTRUCTOR
     * ****************************************************************************
     */
    destruct: function destruct() {
      this._widgetRegistry = null;
      this._disposeObjects("_detailLoader", "_tree", "_history", "_tabViewController");
    }
  });
  qxl.apiviewer.Controller.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Controller.js.map?dt=1778272858600