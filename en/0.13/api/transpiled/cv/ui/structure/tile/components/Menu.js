function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

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
      _init: function _init() {
        var _this = this;

        var element = this._element;
        var model = element.getAttribute('model');

        if (!model) {
          this.error('no model defined, menu will be empty');
          return;
        }

        if (element.getAttribute('show-labels') === 'false') {
          this.setShowLabels(false);
        }

        if (model === 'pages') {
          qx.event.message.Bus.subscribe('setup.dom.append', this._onDomAppended, this);
          var rootList = document.createElement('ul');
          element.appendChild(rootList); // add hamburger menu

          var ham = document.createElement('a');
          ham.href = '#';
          ham.classList.add('menu');

          ham.onclick = function () {
            return _this._onHamburgerMenu();
          };

          var icon = document.createElement('i');
          icon.classList.add('ri-menu-line');
          ham.appendChild(icon);
          element.appendChild(ham);
          qx.event.message.Bus.subscribe('cv.ui.structure.tile.currentPage', this._onPageChange, this); // add some general listeners to close

          qx.event.Registration.addListener(document, 'pointerdown', this._onPointerDown, this);
          qx.event.Registration.addListener(this._element, 'swipe', this._onSwipe, this);
        } else {
          this.error('visual-model of type', model, 'is not implemented');
        }
      },
      _generateMenu: function _generateMenu() {
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

          this.__P_75_0(rootList, parentElement, currentPage, 0);
        }
      },
      _onHamburgerMenu: function _onHamburgerMenu() {
        this._element.classList.toggle('responsive');

        var _iterator = _createForOfIteratorHelper(this._element.querySelectorAll('details')),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var detail = _step.value;
            detail.setAttribute('open', '');
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      },

      /**
       * @param ev {qx.event.type.Event}
       * @private
       */
      _onPointerDown: function _onPointerDown(ev) {
        var target = ev.getTarget();

        if (target.classList.contains('menu') || target.parentElement && target.parentElement.classList.contains('menu')) {// clicked in hamburger menu, do nothing
        } else if (target.tagName.toLowerCase() !== 'summary' && target.tagName.toLowerCase() !== 'p') {
          // defer closing because it would prevent the link clicks and page selection
          qx.event.Timer.once(this._closeAll, this, 100);
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
        if (this._element.classList.contains('responsive')) {
          this._element.classList.remove('responsive');
        } else {
          var _iterator2 = _createForOfIteratorHelper(this._element.querySelectorAll('details[open]')),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var detail = _step2.value;

              if (!except || detail !== except) {
                detail.removeAttribute('open');
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      },
      __P_75_0: function __P_75_0(parentList, parentElement, currentPage, currentLevel) {
        var _this2 = this;

        if (!parentElement) {
          return;
        }

        var pages = parentElement.querySelectorAll(':scope > cv-page:not([menu="false"])');

        var _iterator3 = _createForOfIteratorHelper(pages.values()),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var page = _step3.value;
            var pageId = page.getAttribute('id');

            if (!pageId) {
              this.error('page has no id, skipping');
              continue;
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

            if (this.isShowLabels()) {
              var text = document.createTextNode(pageName);
              a.appendChild(text);
            }

            if (currentPage === pageId) {
              li.classList.add('active');
            }

            parentList.appendChild(li);
            var depth = this.getDepth();

            if ((depth < 0 || depth > currentLevel) && page.querySelectorAll(':scope > cv-page:not([menu="false"])').length > 0) {
              (function () {
                var details = document.createElement('div');
                details.classList.add('details');
                var summary = document.createElement('div');
                summary.classList.add('summary');
                summary.addEventListener('click', function (ev) {
                  if (details.hasAttribute('open')) {
                    details.removeAttribute('open');
                  } else {
                    details.setAttribute('open', '');
                  }
                });
                a.addEventListener('click', function (ev) {
                  // only stop propagation if we are not close to the right border
                  if (ev.pointerType !== 'touch' || ev.currentTarget.clientWidth - ev.offsetX >= 8) {
                    ev.stopPropagation();
                  }
                });
                var pageIcon = page.getAttribute('icon') || '';

                if (page.querySelector(':scope > *:not(cv-page)')) {
                  // only add this as link, when this page has real content
                  summary.appendChild(a);
                } else {
                  var p = document.createElement('p');

                  if (pageIcon) {
                    var _i = document.createElement('i');

                    _i.classList.add(pageIcon);

                    _i.title = pageName;
                    p.appendChild(_i);
                  }

                  if (_this2.isShowLabels()) {
                    p.appendChild(document.createTextNode(pageName));
                  }

                  summary.appendChild(p);
                }

                details.appendChild(summary);
                var subList = document.createElement('ul');
                details.appendChild(subList);

                _this2.__P_75_0(subList, page, currentPage, currentLevel++);

                li.appendChild(details);
              })();
            } else {
              li.appendChild(a);
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      },
      _onPageChange: function _onPageChange(ev) {
        var pageElement = ev.getData(); // unset all currently active

        var _iterator4 = _createForOfIteratorHelper(this._element.querySelectorAll('li.active, li.sub-active')),
            _step4;

        try {
          for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
            var link = _step4.value;
            link.classList.remove('active');
            link.classList.remove('sub-active');
          } // find link to current page

        } catch (err) {
          _iterator4.e(err);
        } finally {
          _iterator4.f();
        }

        var _iterator5 = _createForOfIteratorHelper(this._element.querySelectorAll("a[href=\"#".concat(pageElement.id, "\"]"))),
            _step5;

        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var _link = _step5.value;
            // activate all parents
            var parent = _link.parentElement;
            var activeName = 'active';

            while (parent && parent.tagName.toLowerCase() !== 'cv-menu') {
              if (parent.tagName.toLowerCase() === 'li') {
                parent.classList.add(activeName); // all other parents have a sub-menu active

                activeName = 'sub-active';
              }

              parent = parent.parentElement;
            }
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
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

//# sourceMappingURL=Menu.js.map?dt=1664548967481