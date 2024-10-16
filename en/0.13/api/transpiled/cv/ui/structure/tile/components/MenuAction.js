function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
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
      "cv.ui.structure.tile.elements.Address": {},
      "cv.ui.structure.tile.Controller": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ListItem.js
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
   * Represents an action that should be executed when the related menu item has been clicked.
   */
  qx.Class.define('cv.ui.structure.tile.components.MenuAction', {
    extend: cv.ui.structure.tile.components.AbstractComponent,
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _currentState: null,
      _init: function _init() {
        var _this = this;
        cv.ui.structure.tile.components.MenuAction.superclass.prototype._init.call(this);
        var action = this._element.getAttribute('action');
        switch (action) {
          case 'toggleState':
            {
              var hasAddress = false;
              var _iterator = _createForOfIteratorHelper(this._element.querySelectorAll(':scope > cv-address')),
                _step;
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  var address = _step.value;
                  hasAddress = true;
                  if (address.getAttribute('mode') !== 'write') {
                    this._element.addEventListener('stateUpdate', function (ev) {
                      _this.onStateUpdate(ev);
                      // cancel event here
                      ev.stopPropagation();
                    });
                  }
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
              if (!hasAddress) {
                this.error('a cv-menu-item with action "toggleState" needs at least one cv-address to read the write the state,');
              }
              break;
            }
          case 'popup':
            if (!this._element.querySelector(':scope > cv-popup')) {
              this.error('a cv-menu-item with action "popup" must have a cv-popup as child.');
            }
            break;
        }
      },
      onClick: function onClick(event) {
        switch (this._element.getAttribute('action')) {
          case 'popup':
            {
              var popup = this._element.querySelector(':scope > cv-popup');
              if (popup) {
                popup.getInstance().open();
              }
              event.stopPropagation();
              break;
            }
          case 'toggleState':
            {
              var ev = new CustomEvent('sendState', {
                detail: {
                  value: !this._currentState,
                  source: this
                }
              });
              var _iterator2 = _createForOfIteratorHelper(this._element.querySelectorAll(':scope > cv-address')),
                _step2;
              try {
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  var address = _step2.value;
                  if (address.getAttribute('mode') !== 'read') {
                    address.dispatchEvent(ev);
                  }
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
              event.stopPropagation();
              break;
            }
        }
      },
      /**
       * Handles the incoming data from the backend for this widget
       *
       * @param ev {CustomEvent} stateUpdate event fired from an cv-address component
       */
      onStateUpdate: function onStateUpdate(ev) {
        // using == comparisons to make sure that e.g. 1 equals "1"
        // noinspection EqualityComparisonWithCoercionJS
        var value = ev.detail.state == '1';
        if (ev.detail.source instanceof cv.ui.structure.tile.elements.Address) {
          var addressElement = ev.detail.source.getElement();
          if (addressElement.hasAttribute('value')) {
            // noinspection EqualityComparisonWithCoercionJS
            value = ev.detail.state == addressElement.getAttribute('value');
          }
        }
        this._currentState = value;
      }
    },
    defer: function defer(QxClass) {
      customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'menu-item', /*#__PURE__*/function (_QxConnector) {
        "use strict";

        function _class() {
          _classCallCheck(this, _class);
          return _callSuper(this, _class, [QxClass]);
        }
        _inherits(_class, _QxConnector);
        return _createClass(_class);
      }(QxConnector));
    }
  });
  cv.ui.structure.tile.components.MenuAction.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MenuAction.js.map?dt=1729101219762