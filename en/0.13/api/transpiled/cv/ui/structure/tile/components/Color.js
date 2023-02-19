function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
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
      __P_76_0: null,
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
            this.__P_76_0 = new cv.ui.structure.pure.ColorChooser(props);
            this.__P_76_0.addListener('colorChanged', this._onColorChanged, this);
            this._onColorChanged();
            popup.innerHTML = "<div class=\"widget_container\" style=\"margin-top: 24px; max-width: 100vw; width: 320px; max-height: 100vh; min-height: 320px; align-self: center\" id=\"".concat(path, "\" data-type=\"colorchooser\">").concat(this.__P_76_0.getDomString(), "</div>");
            element.appendChild(popup);
            element.addEventListener('click', function (ev) {
              var path = ev.path || ev.composedPath && ev.composedPath();
              if (path && path.indexOf(popup) < 0) {
                popup.getInstance().open();
              }
            });
            qx.event.Timer.once(function () {
              _this.__P_76_0._onDomReady();
            }, this, 0);
            this.setResizeTarget(popup);
            this.addListener('resized', function () {
              _this.__P_76_0.invalidateScreensize();
            });
          }
        }
      },
      _onColorChanged: function _onColorChanged() {
        var color = this.__P_76_0.getColor();
        var rgb = color.getComponent('rgb');
        var v = color.getComponent('v');
        this.setValue("#".concat(this.__P_76_1(rgb.r)).concat(this.__P_76_1(rgb.g)).concat(this.__P_76_1(rgb.b)).concat(this.__P_76_1(v)));
      },
      __P_76_1: function __P_76_1(v) {
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
      this._disposeObjects("__P_76_0");
    },
    defer: function defer(QxClass) {
      customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'color', /*#__PURE__*/function (_QxConnector) {
        "use strict";

        _inherits(_class, _QxConnector);
        var _super = _createSuper(_class);
        function _class() {
          _classCallCheck(this, _class);
          return _super.call(this, QxClass);
        }
        return _createClass(_class);
      }(QxConnector));
    }
  });
  cv.ui.structure.tile.components.Color.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Color.js.map?dt=1676809300511