function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

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
      "cv.ui.structure.tile.Controller": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Page.js 
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
   * Creates a new sub page and adds a corresponding link to the current page.
   *
   * @ignore(InstallTrigger)
   * @author Tobias Bräutigam
   * @since 2021
   */
  qx.Class.define('cv.ui.structure.tile.widgets.Page', {
    extend: cv.ui.structure.tile.components.AbstractComponent,

    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      visibility: {
        refine: true,
        init: 'excluded'
      }
    },

    /*
     ******************************************************
     MEMBERS
     ******************************************************
     */
    members: {
      _supportsContentVisibility: null,
      _init: function _init() {
        if (typeof InstallTrigger !== 'undefined') {
          // firefox does not support content-visibility CSS property
          // see: https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility
          this._element.classList.add('no-content-visibility');

          this._supportsContentVisibility = false;
        } else {
          this._supportsContentVisibility = true;
        }
      },
      _applyVisibility: function _applyVisibility(value) {
        switch (value) {
          case 'visible':
            if (this._supportsContentVisibility) {
              this._element.style.contentVisibility = 'visible';
            } else if (this._visibleDisplayMode) {
              this._element.style.display = this._visibleDisplayMode || 'initial';
            }

            break;

          case 'hidden':
          case 'excluded':
            if (this._supportsContentVisibility) {
              this._element.style.contentVisibility = 'hidden';
            } else {
              this._visibleDisplayMode = getComputedStyle(this._element).getPropertyValue('display');
              this._element.style.display = 'none';
            }

            break;
        }
      }
    },
    defer: function defer(QxClass) {
      customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'page', /*#__PURE__*/function (_QxConnector) {
        "use strict";

        _inherits(_class, _QxConnector);

        var _super = _createSuper(_class);

        function _class() {
          _classCallCheck(this, _class);

          return _super.call(this, QxClass);
        }

        return _class;
      }(QxConnector));
      customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'row', /*#__PURE__*/function (_HTMLElement) {
        "use strict";

        _inherits(_class2, _HTMLElement);

        var _super2 = _createSuper(_class2);

        function _class2() {
          var _this;

          _classCallCheck(this, _class2);

          _this = _super2.call(this);

          if (_this.hasAttribute('colspan')) {
            _this.classList.add('colspan-' + _this.getAttribute('colspan'));
          }

          if (_this.hasAttribute('rowspan')) {
            _this.classList.add('rowspan-' + _this.getAttribute('rowspan'));
          }

          return _this;
        }

        return _class2;
      }( /*#__PURE__*/_wrapNativeSuper(HTMLElement)));
    }
  });
  cv.ui.structure.tile.widgets.Page.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Page.js.map?dt=1664552156591