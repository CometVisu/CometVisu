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
      "cv.util.MStringTransforms": {
        "require": true
      },
      "qx.event.Timer": {},
      "cv.Application": {},
      "cv.ui.structure.tile.elements.Address": {},
      "cv.Version": {},
      "qx.locale.Manager": {},
      "cv.ui.structure.tile.Controller": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* Button.js
   *
   * copyright (c) 2010-2026, Christian Mayer and the CometVisu contributors.
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
   *
   * @author Tobias Bräutigam
   * @since 2022
   */
  qx.Class.define('cv.ui.structure.tile.components.Button', {
    extend: cv.ui.structure.tile.components.AbstractComponent,
    include: cv.util.MStringTransforms,
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      type: {
        check: ['button', 'trigger', 'push'],
        init: 'button'
      },
      on: {
        check: 'Boolean',
        init: false,
        apply: '_applyOn'
      },
      onClass: {
        check: 'String',
        init: 'active'
      },
      offClass: {
        check: 'String',
        init: 'inactive'
      },
      onValue: {
        check: 'String',
        init: '1'
      },
      offValue: {
        check: 'String',
        init: '0'
      },
      name: {
        check: 'String',
        init: '',
        apply: '_applyName'
      },
      progress: {
        check: 'Number',
        init: -1,
        apply: '_applyProgress',
        transform: '_parseInt'
      }
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _writeAddresses: null,
      __P_77_0: null,
      __P_77_1: null,
      _triggerOnValue: null,
      __P_77_2: null,
      _init: function _init() {
        var _this = this;
        cv.ui.structure.tile.components.Button.superclass.prototype._init.call(this);
        this.__P_77_2 = [];
        var element = this._element;
        if (element.hasAttribute('type')) {
          this.setType(element.getAttribute('type'));
        }
        if (element.hasAttribute('name')) {
          this.setName(element.getAttribute('name'));
        }
        if (element.hasAttribute('progress')) {
          this.setProgress(element.getAttribute('progress'));
        }
        if (element.hasAttribute('on-value')) {
          this.setOnValue(element.getAttribute('on-value'));
        }
        if (element.hasAttribute('off-value')) {
          this.setOffValue(element.getAttribute('off-value'));
        }
        var events = {};
        if (this._writeAddresses.length > 0) {
          var eventSource = element;
          if (element.getAttribute('whole-tile') === 'true') {
            // find parent tile and use it as event source
            var parent = element.parentElement;
            var level = 0;
            while (level <= 2) {
              if (parent.tagName.toLowerCase() === 'cv-tile') {
                eventSource = parent;
                eventSource.classList.add('clickable');
                break;
              }
              parent = parent.parentElement;
              level++;
            }
          }
          this._writeAddresses.forEach(function (addr) {
            var event = addr.hasAttribute('on') ? addr.getAttribute('on') : 'click';
            switch (event) {
              case 'click':
                events.click = function (ev) {
                  return _this.onClicked(ev);
                };
                break;
              case 'up':
                events.pointerup = function (ev) {
                  return _this.onPointerUp(ev);
                };
                break;
              case 'down':
                events.pointerdown = function (ev) {
                  return _this.onPointerDown(ev);
                };
                break;
            }
          });
          Object.getOwnPropertyNames(events).forEach(function (eventName) {
            return eventSource.addEventListener(eventName, function (ev) {
              events[eventName](ev);
            });
          });
        }
        if (element.hasAttribute('doc-link') && !Object.prototype.hasOwnProperty.call(events, 'click')) {
          element.addEventListener('click', function (ev) {
            _this.onClicked(ev);
          });
        }
        var triggerAddresses = [];
        if (this._readAddresses.length === 0 && (element.hasAttribute('mapping') || element.hasAttribute('styling'))) {
          // apply the trigger state
          triggerAddresses = this._writeAddresses.filter(function (addr) {
            return addr.hasAttribute('value') && !addr.hasAttribute('on');
          });
        }

        // detect button type
        if (triggerAddresses.length === 1) {
          // only one write address with a fixed value and no special event => simple trigger
          this.setType('trigger');
          if (!element.hasAttribute('on-value')) {
            // we consider the trigger address value as on-value when no one is given
            this._triggerOnValue = triggerAddresses[0].getAttribute('value');
          } else {
            this._triggerOnValue = this.getOnValue();
          }
          var value = triggerAddresses[0].getAttribute('value');
          this.__P_77_3(function () {
            // set it to the opposite of what is being sent when clicked to make the feedback simulation work
            // e.g. value="1", trigger is off and when clicked for a short amount of time in on state,
            // using == comparisons to make sure that e.g. 1 equals "1"
            // noinspection EqualityComparisonWithCoercionJS
            _this.setOn(value != _this._triggerOnValue);
          }, 1000);
        } else {
          var hasDown = false;
          var hasUp = false;
          this._writeAddresses.some(function (addr) {
            if (addr.hasAttribute('value') && addr.hasAttribute('on')) {
              if (!hasDown) {
                hasDown = addr.getAttribute('on') === 'down';
              }
              if (!hasUp) {
                hasUp = addr.getAttribute('on') === 'up';
              }
            }
            return hasUp && hasDown;
          });
          if (hasUp && hasDown) {
            // has an address for up and one for down event with a fixed value -> pushbutton
            this.setType('push');
          }
        }
        if (this.getType() !== 'trigger') {
          // delay this because we need the mappings to be ready
          this.__P_77_3(function () {
            return _this._applyOn();
          }, 1000);
        }
      },
      _initProgress: function _initProgress() {
        var element = this._element;
        this.__P_77_1 = 100 * Math.PI;
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 100 100');
        svg.setAttribute('type', 'circle');
        var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.classList.add('bar');
        circle.setAttribute('r', '49');
        circle.setAttribute('cx', '50');
        circle.setAttribute('cy', '50');
        circle.setAttribute('stroke-width', '2');
        circle.setAttribute('stroke-dasharray', this.__P_77_1 + ' ' + this.__P_77_1);
        circle.setAttribute('stroke-dashoffset', '' + this.__P_77_1);
        svg.appendChild(circle);
        element.appendChild(svg);
        // make sure that we do not override the progress bar by state appearance
        element.classList.add('progress');
      },
      _disconnected: function _disconnected() {
        this.__P_77_4();
        cv.ui.structure.tile.components.Button.superclass.prototype._disconnected.call(this);
      },
      __P_77_3: function __P_77_3(callback, delay) {
        var _this2 = this;
        var timer = qx.event.Timer.once(function () {
          _this2.__P_77_2 = _this2.__P_77_2.filter(function (entry) {
            return entry !== timer;
          });
          if (!_this2.__P_77_5()) {
            return;
          }
          callback();
        }, null, delay);
        this.__P_77_2.push(timer);
        return timer;
      },
      __P_77_4: function __P_77_4() {
        if (!this.__P_77_2) {
          return;
        }
        this.__P_77_2.forEach(function (timer) {
          return timer.stop();
        });
        this.__P_77_2 = [];
      },
      __P_77_5: function __P_77_5() {
        return !this.isDisposed() && this.isConnected();
      },
      _applyOn: function _applyOn() {
        if (this.isConnected()) {
          var value = this.isOn() ? this.getOnValue() : this.getOffValue();
          this._element.setAttribute('value', value || '');
          var mappedValue = this._mapValue(value);
          this._updateValue(mappedValue, value);
          var styleClass = this.isOn() ? this.getOnClass() : this.getOffClass();
          if (this._element.hasAttribute('styling')) {
            styleClass = this._getStyleClass(value);
          }
          this.setStyleClass(styleClass);
        }
      },
      _applyProgress: function _applyProgress(value) {
        var valueElement = this._element.querySelector(':scope > svg > circle.bar');
        if (!valueElement) {
          this._initProgress();
          valueElement = this._element.querySelector(':scope > svg > circle.bar');
        }
        if (valueElement) {
          if (this._element.hasAttribute('progress-mapping')) {
            value = cv.Application.structureController.mapValue(this._element.getAttribute('progress-mapping'), value, this._store);
          }
          valueElement.setAttribute('stroke-dashoffset', '' + (this.__P_77_1 - value / 100 * this.__P_77_1));
        }
      },
      _applyName: function _applyName(value) {
        if (!this.__P_77_0) {
          this.__P_77_0 = document.createElement('label');
          this.__P_77_0.classList.add('button-label');
          this._element.appendChild(this.__P_77_0);
        }
        this.__P_77_0.textContent = value;
      },
      _updateValue: function _updateValue(mappedValue, value) {
        var target = this._element.querySelector('.value');
        if (target && target.tagName.toLowerCase() === 'cv-icon') {
          if (target._instance) {
            target._instance.setId(mappedValue);
          } else {
            target.textContent = mappedValue;
          }
        } else {
          var elem = this._element.querySelector('span.value');
          if (elem) {
            elem.innerHTML = mappedValue;
          }
        }
      },
      /**
       * Handles the incoming data from the backend for this widget
       *
       * @param ev {CustomEvent} stateUpdate event fired from a cv-address component
       */
      onStateUpdate: function onStateUpdate(ev) {
        // using == comparisons to make sure that e.g. 1 equals "1"
        // noinspection EqualityComparisonWithCoercionJS
        var value = ev.detail.state == this.getOnValue();
        var target = ev.detail.target || 'default';
        if (ev.detail.source instanceof cv.ui.structure.tile.elements.Address) {
          var addressElement = ev.detail.source.getElement();
          if (addressElement.hasAttribute('value')) {
            // noinspection EqualityComparisonWithCoercionJS
            value = ev.detail.state == addressElement.getAttribute('value');
          }
        }
        if (target === 'default') {
          if (this.isOn() === value) {
            this._applyOn();
          } else {
            this.setOn(value);
          }
          ev.stopPropagation();
          return true;
        } else if (target === 'progress') {
          this.setProgress(ev.detail.state);
          ev.stopPropagation();
          return true;
        }
        return cv.ui.structure.tile.components.Button.superclass.prototype.onStateUpdate.call(this, ev);
      },
      onClicked: function onClicked(event) {
        var _this3 = this;
        this.createRipple(event);
        if (this._element.hasAttribute('doc-link')) {
          var relPath = this._element.getAttribute('doc-link');
          // add locale and version
          var baseVersion = cv.Version.VERSION.split('.').slice(0, 2).join('.');
          var language = qx.locale.Manager.getInstance().getLanguage();
          if (language !== 'de') {
            // documentation only exists in 'de' and 'en'
            language = 'en';
          }
          window.open("https://www.cometvisu.org/CometVisu/".concat(language, "/").concat(baseVersion, "/manual/").concat(relPath));
          event.stopPropagation();
        } else {
          if (!this._writeAddresses) {
            this._writeAddresses = Array.prototype.filter.call(this._element.querySelectorAll('addresses > cv-address'), function (address) {
              return !address.hasAttribute('mode') || address.getAttribute('mode') !== 'read';
            });
          }
          var ev = new CustomEvent('sendState', {
            detail: {
              value: this.isOn() ? this.getOffValue() : this.getOnValue(),
              source: this
            }
          });
          var wa = this._writeAddresses.filter(function (addr) {
            return !addr.hasAttribute('on') || addr.getAttribute('on') === 'click';
          });
          if (this.getType() === 'trigger') {
            // simulate feedback
            // using == comparisons to make sure that e.g. 1 equals "1"
            // noinspection EqualityComparisonWithCoercionJS
            var simulatedValue = wa[0].getAttribute('value') == this._triggerOnValue;
            this.setOn(simulatedValue);
            this.__P_77_3(function () {
              _this3.setOn(!simulatedValue);
            }, 500);
          }
          wa.forEach(function (address) {
            return address.dispatchEvent(ev);
          });
          event.stopPropagation();
        }
      },
      onPointerDown: function onPointerDown() {
        var _this4 = this;
        this._writeAddresses.filter(function (addr) {
          return addr.getAttribute('on') === 'down' && addr.hasAttribute('value');
        }).forEach(function (address) {
          address.dispatchEvent(new CustomEvent('sendState', {
            detail: {
              value: address.getAttribute('value'),
              source: _this4
            }
          }));
        });
      },
      onPointerUp: function onPointerUp() {
        var _this5 = this;
        this._writeAddresses.filter(function (addr) {
          return addr.getAttribute('on') === 'up' && addr.hasAttribute('value');
        }).forEach(function (address) {
          address.dispatchEvent(new CustomEvent('sendState', {
            detail: {
              value: address.getAttribute('value'),
              source: _this5
            }
          }));
        });
      },
      createRipple: function createRipple(event) {
        var button = event.currentTarget;
        var container = button.querySelector(':scope .ripple-container');
        if (!container) {
          container = document.createElement('div');
          container.classList.add('ripple-container');
          button.appendChild(container);
        }
        var circle = document.createElement('span');
        var diameter = Math.max(button.clientWidth, button.clientHeight);
        var radius = diameter / 2;
        circle.style.width = circle.style.height = "".concat(diameter, "px");
        var x = event.clientX - (button.offsetLeft + radius);
        var y = event.clientY - (button.offsetTop + radius);
        if (button === this._element) {
          x -= button.offsetParent.offsetLeft;
          y -= button.offsetParent.offsetTop;
        }
        circle.style.left = "".concat(x, "px");
        circle.style.top = "".concat(y, "px");
        circle.classList.add('ripple');
        // remove old ones
        container.querySelectorAll('.ripple').forEach(function (ripple) {
          return ripple.remove();
        });
        container.appendChild(circle);
      }
    },
    defer: function defer(QxClass) {
      customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'button', /*#__PURE__*/function (_QxConnector) {
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
  cv.ui.structure.tile.components.Button.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Button.js.map?dt=1782705770255