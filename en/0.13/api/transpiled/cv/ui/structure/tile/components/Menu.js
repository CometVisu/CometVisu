function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
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
      "cv.ui.structure.tile.components.AbstractComponent": {
        "require": true
      },
      "cv.ui.structure.tile.MStringTransforms": {
        "require": true
      },
      "qx.event.message.Bus": {},
      "qx.event.Registration": {},
      "qx.event.Timer": {},
      "cv.Application": {},
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
    include: [cv.ui.structure.tile.MStringTransforms],
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
        init: true,
        apply: '_applyShowLabels',
        transform: '_parseBoolean'
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
      _applyShowLabels: function _applyShowLabels(val) {
        if (val) {
          this._element.classList.remove('compact');
        } else {
          this._element.classList.add('compact');
        }
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
                this.__P_82_0(rootList, parentElement, currentPage, 0);
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
      __P_82_0: function __P_82_0(parentList, parentElement, currentPage, currentLevel) {
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
              return 1; // continue
            }
            var pageName = page.getAttribute('name') || '';
            var pageIcon = page.getAttribute('icon') || '';
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.setAttribute('href', '#' + pageId);
            a.setAttribute('data-page-id', pageId);
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
              a.setAttribute('href', '#');
              a.addEventListener('click', function (ev) {
                cv.Application.structureController.scrollToPage(pageId);
                ev.stopPropagation();
                ev.preventDefault();
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
                p.addEventListener('click', function (ev) {
                  if (details.hasAttribute('open')) {
                    _this3._closeDetail(details);
                  } else {
                    _this3._openDetail(details);
                  }
                });
              }
              var expander = document.createElement('i');
              expander.classList.add('expander');
              expander.classList.add('ri-arrow-down-s-line');
              summary.appendChild(expander);
              expander.addEventListener('click', function (ev) {
                if (details.hasAttribute('open')) {
                  _this3._closeDetail(details);
                } else {
                  _this3._openDetail(details);
                }
              });
              details.appendChild(summary);
              var subList = document.createElement('ul');
              details.appendChild(subList);
              _this3.__P_82_0(subList, page, currentPage, currentLevel + 1);
              li.appendChild(details);
            } else {
              li.appendChild(a);
            }
          };
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            if (_loop2()) continue;
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
        var _iterator6 = _createForOfIteratorHelper(this._element.querySelectorAll("a[data-page-id=\"".concat(pageElement.id, "\"]"))),
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

        function _class() {
          _classCallCheck(this, _class);
          return _callSuper(this, _class, [QxClass]);
        }
        _inherits(_class, _QxConnector);
        return _createClass(_class, null, [{
          key: "observedAttributes",
          get: function get() {
            return ['appearance', 'depth', 'show-labels'];
          }
        }]);
      }(QxConnector));
    }
  });
  cv.ui.structure.tile.components.Menu.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Menu.js.map?dt=1735341761911