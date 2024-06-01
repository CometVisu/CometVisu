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
      "cv.ui.structure.tile.MResize": {
        "require": true
      },
      "cv.parser.pure.widgets.ColorChooser": {},
      "cv.ui.structure.pure.ColorChooser": {},
      "qx.event.Timer": {},
      "cv.ui.structure.tile.Controller": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* Color.js
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
   * Shows a html color input
   * @author Tobias Bräutigam
   * @since 2022
   */
  qx.Class.define('cv.ui.structure.tile.components.Color', {
    extend: cv.ui.structure.tile.components.AbstractComponent,
    include: cv.ui.structure.tile.MResize,
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      throttleInterval: {
        check: 'Number',
        init: 250,
        apply: '_applyThrottleInterval'
      }
    },
    /*
    ***********************************************
      STATICS
    ***********************************************
    */
    statics: {
      CC_COUNTER: 0
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      __P_78_0: null,
      _init: function _init() {
        var _this = this;
        var element = this._element;
        if (element.hasAttribute('throttle-interval')) {
          this.setThrottleInterval(parseInt(element.getAttribute('throttle-interval')));
        }

        // init components
        var mode = element.hasAttribute('mode') ? element.getAttribute('mode') : 'popup';
        if (mode === 'popup') {
          var popup = element.querySelector(':scope > cv-popup');
          if (!popup) {
            popup = document.createElement('cv-popup');
            popup.setAttribute('modal', 'true');
            if (element.hasAttribute('title')) {
              popup.setAttribute('title', element.getAttribute('title'));
            }
            var addresses = {};
            var _iterator = _createForOfIteratorHelper(element.querySelectorAll(':scope > cv-address')),
              _step;
            try {
              for (_iterator.s(); !(_step = _iterator.n()).done;) {
                var elem = _step.value;
                var src = elem.textContent;
                var transform = elem.getAttribute('transform');
                var _mode = 1 | 2; // Bit 0 = read, Bit 1 = write  => 1|2 = 3 = readwrite
                switch (elem.getAttribute('mode')) {
                  case 'disable':
                    _mode = 0;
                    break;
                  case 'read':
                    _mode = 1;
                    break;
                  case 'write':
                    _mode = 2;
                    break;
                  case 'readwrite':
                    _mode = 1 | 2;
                    break;
                }
                var variantInfo = cv.parser.pure.widgets.ColorChooser.makeAddressListFn(src, transform, _mode, elem.getAttribute('variant'));
                addresses[src.trim()] = {
                  transform: transform,
                  mode: _mode,
                  variantInfo: variantInfo[1]
                };
              }
            } catch (err) {
              _iterator.e(err);
            } finally {
              _iterator.f();
            }
            cv.ui.structure.tile.components.Color.CC_COUNTER++;
            var path = 'id_0_' + cv.ui.structure.tile.components.Color.CC_COUNTER;
            var props = {
              path: path,
              $$type: 'colorchooser',
              classes: 'widget colorchooser',
              layout: {
                colspan: 1
              },
              controls: element.hasAttribute('controls') ? element.getAttribute('controls') : 'triangle',
              address: addresses,
              throttleInterval: this.getThrottleInterval()
            };
            cv.parser.pure.widgets.ColorChooser.parseAttributes(element, props);
            this.__P_78_0 = new cv.ui.structure.pure.ColorChooser(props);
            this.__P_78_0.addListener('colorChanged', this._onColorChanged, this);
            this._onColorChanged();
            popup.innerHTML = "<div class=\"widget_container\" style=\"margin-top: 24px; max-width: 100vw; width: 320px; max-height: 100vh; min-height: 320px; align-self: center\" id=\"".concat(path, "\" data-type=\"colorchooser\">").concat(this.__P_78_0.getDomString(), "</div>");
            element.appendChild(popup);
            element.addEventListener('click', function (ev) {
              var path = ev.path || ev.composedPath && ev.composedPath();
              if (path && path.indexOf(popup) < 0) {
                popup.getInstance().open();
              }
            });
            qx.event.Timer.once(function () {
              _this.__P_78_0._onDomReady();
            }, this, 0);
            this.setResizeTarget(popup);
            this.addListener('resized', function () {
              _this.__P_78_0.invalidateScreensize();
            });
          }
        }
      },
      _onColorChanged: function _onColorChanged() {
        var color = this.__P_78_0.getColor();
        var rgb = color.getComponent('rgb');
        var v = color.getComponent('v');
        this.setValue("#".concat(this.__P_78_1(rgb.r)).concat(this.__P_78_1(rgb.g)).concat(this.__P_78_1(rgb.b)).concat(this.__P_78_1(v)));
      },
      __P_78_1: function __P_78_1(v) {
        return Math.round(v * 255).toString(16).padStart(2, '0');
      },
      _updateValue: function _updateValue(mappedValue, value) {
        var target = this._element.querySelector(':scope > .value');
        var rgb = mappedValue.substring(0, 7);
        if (target) {
          var tagName = target.tagName.toLowerCase();
          var alpha = mappedValue.length === 9 ? parseInt(mappedValue.substring(7, 9), 16) / 255 : 1.0;
          switch (tagName) {
            case 'cv-icon':
              target.style.color = rgb;
              target.style.opacity = Math.max(alpha, 0.2); // do not blend it out totally
              break;
          }
        } else {
          // only if we do not have another value handler
          this._element.style.backgroundColor = mappedValue;
        }
      }
    },
    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this._disposeObjects("__P_78_0");
    },
    defer: function defer(QxClass) {
      customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'color', /*#__PURE__*/function (_QxConnector) {
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
  cv.ui.structure.tile.components.Color.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Color.js.map?dt=1717235368567