function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

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

      this.__P_504_0();

      this._tree = this._widgetRegistry.getWidgetById("tree");

      this.__P_504_1();

      this.__P_504_2();

      var btn_inherited = this._widgetRegistry.getWidgetById("btn_inherited");

      var btn_included = this._widgetRegistry.getWidgetById("btn_included");

      btn_inherited.addListener("changeValue", this.__P_504_3, this);
      btn_included.addListener("changeValue", this.__P_504_3, this);
      this._history = qx.bom.History.getInstance();

      this.__P_504_4();

      qx.core.Init.getApplication().getRoot().addListener("pointerdown", function (e) {
        this.__P_504_5 = e.isShiftPressed() || e.isCtrlOrCommandPressed();
      }, this, true);
    },
    members: {
      __P_504_5: false,
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
              _this.__P_504_6(_this.__P_504_7(state));
            } else {
              _this.__P_504_6("");
            }
          });
        });
      },

      /**
       * binds the events of the TabView controller
       */
      __P_504_0: function __P_504_0() {
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
      __P_504_1: function __P_504_1() {
        this._tree.addListener("changeSelection", function (evt) {
          var treeNode = evt.getData()[0];

          if (treeNode && treeNode.getUserData("nodeName") && !this._ignoreTreeSelection) {
            var nodeName = treeNode.getUserData("nodeName"); // the history update will cause _selectClass to be called.

            this._updateHistory(nodeName);
          }
        }, this);
      },

      /**
       * binds the actions of the toolbar buttons.
       */
      __P_504_2: function __P_504_2() {
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
      __P_504_3: function __P_504_3() {
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
      __P_504_4: function __P_504_4() {
        this._history.addListener("changeState", function (evt) {
          var item = this.__P_504_7(evt.getData());

          if (item) {
            this.__P_504_6(item);
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
        qx.bom.History.getInstance().addToHistory(this.__P_504_8(className), newTitle);
      },

      /**
       * Display information about a class
       * @param classNode 
       * {qxl.apiviewer.dao.Class} class node to display
       * @param callback
       * @param self
       */
      _selectClass: function () {
        var _selectClass2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(classNode, callback, self) {
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  this._detailLoader.exclude();

                  this._tabViewController.showTabView();

                  _context.next = 4;
                  return classNode.loadDependedClasses();

                case 4:
                  if (!(classNode instanceof qxl.apiviewer.dao.Class)) {
                    _context.next = 9;
                    break;
                  }

                  _context.next = 7;
                  return this._tabViewController.openClass(classNode, this.__P_504_5);

                case 7:
                  _context.next = 11;
                  break;

                case 9:
                  _context.next = 11;
                  return this._tabViewController.openPackage(classNode, this.__P_504_5);

                case 11:
                  callback && callback.call(self);

                case 12:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        function _selectClass(_x, _x2, _x3) {
          return _selectClass2.apply(this, arguments);
        }

        return _selectClass;
      }(),

      /**
       * Selects an item (class, property, method or constant).
       * 
       * @param fullItemName
       *          {String} the full name of the item to select. (e.g.
       *          "qx.mypackage.MyClass" or "qx.mypackage.MyClass#myProperty")
       * 
       */
      __P_504_6: function __P_504_6(fullItemName) {
        var _this2 = this;

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
        } // ignore changeSelection events


        this._ignoreTreeSelection = true;

        this._tree.selectTreeNodeByClassName(className).then(function (couldSelectTreeNode) {
          _this2._ignoreTreeSelection = false;

          if (!couldSelectTreeNode) {
            _this2.error("Unknown class: " + className);

            qxl.apiviewer.LoadingIndicator.getInstance().hide();
            return;
          }

          var sel = _this2._tree.getSelection();

          var nodeName = sel[0].getUserData("nodeName") || className;
          _this2._ignoreTabViewSelection = true;

          _this2._selectClass(qxl.apiviewer.ClassLoader.getClassOrPackage(nodeName), function () {
            if (itemName) {
              _this2._tabViewController.isLoaded(function () {
                if (!_this2._tabViewController.showItem(itemName)) {
                  _this2.error("Unknown item of class '" + className + "': " + itemName);

                  qxl.apiviewer.LoadingIndicator.getInstance().hide();

                  _this2._updateHistory(className);

                  _this2._ignoreTabViewSelection = false;
                  return;
                }

                _this2._updateHistory(fullItemName);

                qxl.apiviewer.LoadingIndicator.getInstance().hide();
                _this2._ignoreTabViewSelection = false;
              });
            } else {
              qxl.apiviewer.LoadingIndicator.getInstance().hide();
              _this2._ignoreTabViewSelection = false;
            }
          });
        });
      },
      __P_504_8: function __P_504_8(state) {
        return state.replace(/(.*)#(.*)/g, "$1~$2");
      },
      __P_504_7: function __P_504_7(encodedState) {
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

//# sourceMappingURL=Controller.js.map?dt=1612698493938