function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.structure.tile.components.AbstractComponent": {
        "require": true
      },
      "qx.event.message.Bus": {},
      "qx.event.Registration": {},
      "qx.event.Timer": {},
      "cv.ui.structure.tile.Controller": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* Menu.js
   *
   * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
   *
   * This program is free software; you can redistribute it and/or modify it
   * under the terms of the GNU General Public License as published by the Free
   * Software Foundation; either version 3 of the License, or (at your option)
   * any later version.
   *
   * This program is distributed in the hope that it will be useful, but WITHOUT
   * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
   * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
   * more details.
   *
   * You should have received a copy of the GNU General Public License along
   * with this program; if not, write to the Free Software Foundation, Inc.,
   * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
   */

  /**
   * Generates a menu of a model, currently only the pages model is implemented.
   *
   * @author Tobias Bräutigam
   * @since 2022
   */
  qx.Class.define('cv.ui.structure.tile.components.Menu', {
    extend: cv.ui.structure.tile.components.AbstractComponent,
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      model: {
        check: ['pages', 'menuItems'],
        apply: '_applyModel'
      },
      appearance: {
        check: ['text', 'icons', 'dock'],
        init: 'text',
        apply: '_applyAppearance'
      },
      depth: {
        check: '!isNaN(value) && value >= -1 && value <= 100',
        init: -1,
        apply: '_applyDepth'
      },
      domReady: {
        check: 'Boolean',
        init: false,
        apply: '_generateMenu'
      },
      showLabels: {
        check: 'Boolean',
        init: true
      }
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _applyAppearance: function _applyAppearance(value, oldValue) {
        var main = document.querySelector('main');
        if (oldValue === 'dock') {
          main.classList.remove('has-dock');
        }
        if (value === 'dock') {
          main.classList.add('has-dock');
        }
      },
      _applyDepth: function _applyDepth() {
        if (this.isDomReady()) {
          this._generateMenu();
        }
      },
      _onDomAppended: function _onDomAppended() {
        this.setDomReady(true);
        qx.event.message.Bus.unsubscribe('setup.dom.append', this._onDomAppended, this);
      },
      _applyModel: function _applyModel(model) {
        var _this = this;
        if (model) {
          var rootList = document.createElement('ul');
          this._element.appendChild(rootList);
          if (model === 'pages') {
            // add hamburger menu
            var ham = document.createElement('a');
            ham.href = '#';
            ham.classList.add('menu');
            ham.onclick = function (event) {
              return _this._onHamburgerMenu(event);
            };
            var icon = document.createElement('i');
            ham.appendChild(icon);
            this._element.appendChild(ham);
            qx.event.message.Bus.subscribe('setup.dom.append', this._onDomAppended, this);
            qx.event.message.Bus.subscribe('cv.ui.structure.tile.currentPage', this._onPageChange, this);
            qx.event.Registration.addListener(this._element, 'swipe', this._onSwipe, this);
            icon.classList.add('ri-menu-line');
          } else if (model === 'menuItems') {
            // add hamburger menu
            var _icon = document.createElement('i');
            _icon.classList.add('ri-more-2-fill');
            this._element.appendChild(_icon);
            // listen on whole element
            this._element.onclick = function (event) {
              return _this._onHamburgerMenu(event);
            };
            rootList.classList.add('context-menu');
            this._generateMenu();
          }
        } else {
          this.error('visual-model of type', model, 'is not implemented');
        }
      },
      _init: function _init() {
        var element = this._element;
        var model = element.hasAttribute('model') ? element.getAttribute('model') : element.querySelectorAll(':scope > cv-menu-item').length > 0 ? 'menuItems' : null;
        if (!model) {
          this.error('no model defined, menu will be empty');
          return;
        }
        if (element.getAttribute('show-labels') === 'false') {
          this.setShowLabels(false);
        }
        this.setModel(model);
      },
      _generateMenu: function _generateMenu() {
        var _this2 = this;
        switch (this.getModel()) {
          case 'pages':
            {
              var currentPage = window.location.hash.substring(1);
              var parentElement = document.querySelector('main');
              if (parentElement) {
                var firstPage = document.querySelector('cv-page');
                if (firstPage) {
                  parentElement = firstPage.parentElement;
                }
              }
              var rootList = this._element.querySelector(':scope > ul');
              if (rootList) {
                rootList.replaceChildren();
                this.__P_78_0(rootList, parentElement, currentPage, 0);
              }
              break;
            }
          case 'menuItems':
            {
              var _rootList = this._element.querySelector(':scope > ul');
              if (_rootList) {
                _rootList.replaceChildren();
                var _iterator = _createForOfIteratorHelper(this._element.querySelectorAll(':scope > cv-menu-item')),
                  _step;
                try {
                  var _loop = function _loop() {
                    var item = _step.value;
                    var pageName = item.getAttribute('name') || '';
                    var pageIcon = item.getAttribute('icon') || '';
                    var li = document.createElement('li');
                    if (pageIcon) {
                      var i = document.createElement('i');
                      i.classList.add(pageIcon);
                      i.title = pageName;
                      li.appendChild(i);
                    }
                    if (_this2.isShowLabels()) {
                      var text = document.createTextNode(pageName);
                      li.appendChild(text);
                    }
                    li.addEventListener('click', function (event) {
                      item.getInstance().onClick(event);
                    });
                    _rootList.appendChild(li);
                  };
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    _loop();
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }
              }
              break;
            }
        }
      },
      _onHamburgerMenu: function _onHamburgerMenu(event) {
        var toggleClass = 'open';
        if (this.getModel() === 'pages') {
          toggleClass = 'responsive';
          var _iterator2 = _createForOfIteratorHelper(this._element.querySelectorAll('.details')),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var detail = _step2.value;
              detail.setAttribute('open', '');
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
        this._element.classList.toggle(toggleClass);
        event.stopPropagation();
        if (this._element.classList.contains(toggleClass)) {
          // add some general listeners to close
          qx.event.Registration.addListener(document, 'pointerdown', this._onPointerDown, this);
          qx.event.Registration.addListener(document.body.querySelector(':scope > main'), 'scroll', this._closeAll, this);
        }
      },
      /**
       * @param ev {qx.event.type.Event}
       * @private
       */
      _onPointerDown: function _onPointerDown(ev) {
        var target = ev.getTarget();
        if (target.classList.contains('menu') || target.parentElement && target.parentElement.classList.contains('menu') || target.nodeName.toLowerCase() === 'cv-menu' || target.parentElement && target.parentElement.nodeName.toLowerCase() === 'cv-menu') {
          // clicked in hamburger menu, do nothing
        } else if (target.tagName.toLowerCase() !== '.summary' && target.tagName.toLowerCase() !== 'p') {
          // defer closing because it would prevent the link clicks and page selection
          qx.event.Timer.once(this._closeAll, this, 500);
        } else {
          // close others
          this._closeAll(ev.getTarget().parentElement);
        }
      },
      _onSwipe: function _onSwipe(ev) {
        if (ev.getDirection() === 'left') {
          // goto next if there is one
          var next = this._element.querySelector('li.active + li > a');
          if (next) {
            next.click();
          }
        } else {
          var current = this._element.querySelector('li.active');
          if (current && current.previousElementSibling && current.previousElementSibling.tagName.toLowerCase() === 'li') {
            var prev = current.previousElementSibling.querySelector(':scope > a');
            if (prev) {
              prev.click();
            }
          }
        }
      },
      /**
       * Close all open sub-menus
       * @param except {Element?} do not close this one
       * @private
       */
      _closeAll: function _closeAll(except) {
        if (this._element.classList.contains('open')) {
          this._element.classList.remove('open');
        } else if (this._element.classList.contains('responsive')) {
          this._element.classList.remove('responsive');
        } else {
          var _iterator3 = _createForOfIteratorHelper(this._element.querySelectorAll('.details[open]')),
            _step3;
          try {
            for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
              var detail = _step3.value;
              if (!except || detail !== except) {
                detail.removeAttribute('open');
              }
            }
          } catch (err) {
            _iterator3.e(err);
          } finally {
            _iterator3.f();
          }
        }
        if (this._element.querySelectorAll('.details[open]').length === 0) {
          qx.event.Registration.removeListener(document, 'pointerdown', this._onPointerDown, this);
          qx.event.Registration.removeListener(document.body.querySelector(':scope > main'), 'scroll', this._closeAll, this);
        }
      },
      _openDetail: function _openDetail(item) {
        var first = this._element.querySelectorAll('.details[open]').length === 0;
        item.setAttribute('open', '');
        if (first) {
          qx.event.Registration.addListener(document, 'pointerdown', this._onPointerDown, this);
          qx.event.Registration.addListener(document.body.querySelector(':scope > main'), 'scroll', this._closeAll, this);
        }
      },
      _closeDetail: function _closeDetail(item) {
        item.removeAttribute('open');
        if (this._element.querySelectorAll('.details[open]').length === 0) {
          // remove listeners
          qx.event.Registration.removeListener(document, 'pointerdown', this._onPointerDown, this);
          qx.event.Registration.removeListener(document.body.querySelector(':scope > main'), 'scroll', this._closeAll, this);
        }
      },
      __P_78_0: function __P_78_0(parentList, parentElement, currentPage, currentLevel) {
        var _this3 = this;
        if (!parentElement) {
          return;
        }
        var pages = parentElement.querySelectorAll(':scope > cv-page:not([menu="false"])');
        var _iterator4 = _createForOfIteratorHelper(pages.values()),
          _step4;
        try {
          var _loop2 = function _loop2() {
            var page = _step4.value;
            var pageId = page.getAttribute('id');
            if (!pageId) {
              _this3.error('page has no id, skipping');
              return "continue";
            }
            var pageName = page.getAttribute('name') || '';
            var pageIcon = page.getAttribute('icon') || '';
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.setAttribute('href', '#' + pageId);
            if (pageIcon) {
              var i = document.createElement('i');
              i.classList.add(pageIcon);
              i.title = pageName;
              a.appendChild(i);
            }
            if (_this3.isShowLabels() || currentLevel > 0) {
              var text = document.createTextNode(pageName);
              a.appendChild(text);
            }
            if (currentPage === pageId) {
              li.classList.add('active');
            }
            parentList.appendChild(li);
            var depth = _this3.getDepth();
            if ((depth < 0 || depth > currentLevel) && page.querySelectorAll(':scope > cv-page:not([menu="false"])').length > 0) {
              var details = document.createElement('div');
              details.classList.add('details');
              var summary = document.createElement('div');
              summary.classList.add('summary');
              summary.addEventListener('click', function (ev) {
                if (details.hasAttribute('open')) {
                  _this3._closeDetail(details);
                } else {
                  _this3._openDetail(details);
                }
              });
              a.addEventListener('click', function (ev) {
                // only stop propagation if we are not close to the right border
                if (ev.pointerType !== 'touch' || ev.currentTarget.clientWidth - ev.offsetX >= 8) {
                  ev.stopPropagation();
                }
              });
              var _pageIcon = page.getAttribute('icon') || '';
              if (page.querySelector(':scope > *:not(cv-page)')) {
                // only add this as link, when this page has real content
                summary.appendChild(a);
              } else {
                var p = document.createElement('p');
                if (_pageIcon) {
                  var _i = document.createElement('i');
                  _i.classList.add(_pageIcon);
                  _i.title = pageName;
                  p.appendChild(_i);
                }
                if (_this3.isShowLabels()) {
                  p.appendChild(document.createTextNode(pageName));
                }
                summary.appendChild(p);
              }
              details.appendChild(summary);
              var subList = document.createElement('ul');
              details.appendChild(subList);
              _this3.__P_78_0(subList, page, currentPage, currentLevel + 1);
              li.appendChild(details);
            } else {
              li.appendChild(a);
            }
          };
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var _ret = _loop2();
            if (_ret === "continue") continue;
          }
        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }
      },
      _onPageChange: function _onPageChange(ev) {
        var pageElement = ev.getData();
        // unset all currently active
        var _iterator5 = _createForOfIteratorHelper(this._element.querySelectorAll('li.active, li.sub-active')),
          _step5;
        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var link = _step5.value;
            link.classList.remove('active');
            link.classList.remove('sub-active');
          }
          // find link to current page
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
        var _iterator6 = _createForOfIteratorHelper(this._element.querySelectorAll("a[href=\"#".concat(pageElement.id, "\"]"))),
          _step6;
        try {
          for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
            var _link = _step6.value;
            // activate all parents
            var parent = _link.parentElement;
            var activeName = 'active';
            while (parent && parent.tagName.toLowerCase() !== 'cv-menu') {
              if (parent.tagName.toLowerCase() === 'li') {
                parent.classList.add(activeName);
                // all other parents have a sub-menu active
                activeName = 'sub-active';
              }
              parent = parent.parentElement;
            }
          }
        } catch (err) {
          _iterator6.e(err);
        } finally {
          _iterator6.f();
        }
      }
    },
    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      qx.event.Registration.removeListener(document, 'pointerdown', this._onPointerDown, this);
      qx.event.message.Bus.unsubscribe('cv.ui.structure.tile.currentPage', this._onPageChange, this);
    },
    defer: function defer(QxClass) {
      customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'menu', /*#__PURE__*/function (_QxConnector) {
        "use strict";

        _inherits(_class, _QxConnector);
        var _super = _createSuper(_class);
        function _class() {
          _classCallCheck(this, _class);
          return _super.call(this, QxClass);
        }
        _createClass(_class, null, [{
          key: "observedAttributes",
          get: function get() {
            return ['appearance', 'depth'];
          }
        }]);
        return _class;
      }(QxConnector));
    }
  });
  cv.ui.structure.tile.components.Menu.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Menu.js.map?dt=1676809300947