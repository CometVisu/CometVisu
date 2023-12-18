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
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.structure.tile.elements.AbstractCustomElement": {
        "construct": true,
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
   *
   * @author Tobias Bräutigam
   * @since 2022
   */
  qx.Class.define('cv.ui.structure.tile.components.Button', {
    extend: cv.ui.structure.tile.elements.AbstractCustomElement,
    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct(element) {
      cv.ui.structure.tile.elements.AbstractCustomElement.constructor.call(this, element);
      this.__P_76_0 = new Map();
    },
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
      styleClass: {
        check: 'String',
        nullable: true,
        apply: '_applyStyleClass'
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
      __P_76_1: null,
      __P_76_2: null,
      /**
       * @var {Map} value store for addresses to be able to use them e.g. in mapping formulas
       */
      __P_76_0: null,
      _parseInt: function _parseInt(val) {
        var intVal = parseInt(val);
        return Number.isNaN(intVal) ? 0 : intVal;
      },
      _init: function _init() {
        var _this = this;
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
        var hasReadAddress = false;
        var writeAddresses = [];
        Array.prototype.forEach.call(element.querySelectorAll(':scope > cv-address'), function (address) {
          var mode = address.hasAttribute('mode') ? address.getAttribute('mode') : 'readwrite';
          switch (mode) {
            case 'readwrite':
              hasReadAddress = true;
              writeAddresses.push(address);
              break;
            case 'read':
              hasReadAddress = true;
              break;
            case 'write':
              writeAddresses.push(address);
              break;
          }
        });
        this._writeAddresses = writeAddresses;
        var events = {};
        if (writeAddresses.length > 0) {
          var eventSource = element;
          if (element.getAttribute('whole-tile') === 'true') {
            // find parent tile and use it as event source
            var parent = element.parentElement;
            var level = 0;
            while (level <= 2) {
              parent = parent.parentElement;
              level++;
              if (parent.tagName.toLowerCase() === 'cv-tile') {
                eventSource = parent;
                eventSource.classList.add('clickable');
              }
            }
          }
          writeAddresses.forEach(function (addr) {
            var event = addr.hasAttribute('on') ? addr.getAttribute('on') : 'click';
            switch (event) {
              case 'click':
                events.click = _this.onClicked.bind(_this);
                break;
              case 'up':
                events.pointerup = _this.onPointerUp.bind(_this);
                break;
              case 'down':
                events.pointerdown = _this.onPointerDown.bind(_this);
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
        if (hasReadAddress) {
          element.addEventListener('stateUpdate', function (ev) {
            _this.onStateUpdate(ev);
            // cancel event here
            ev.stopPropagation();
          });
        } else if (element.hasAttribute('mapping') || element.hasAttribute('styling')) {
          // apply the trigger state
          var triggerAddresses = writeAddresses.filter(function (addr) {
            return addr.hasAttribute('value') && !addr.hasAttribute('on');
          });
          if (triggerAddresses.length === 1) {
            var value = triggerAddresses[0].getAttribute('value');
            qx.event.Timer.once(function () {
              // using == comparisons to make sure that e.g. 1 equals "1"
              // noinspection EqualityComparisonWithCoercionJS
              _this.setOn(value == _this.getOnValue());
            }, this, 1000);
          }
        }

        // detect button type
        if (!hasReadAddress && writeAddresses.filter(function (addr) {
          return addr.hasAttribute('value') && !addr.hasAttribute('on');
        }).length === 1) {
          // only one write address with a fixed value and no special event => simple trigger
          this.setType('trigger');
        } else {
          var hasDown = false;
          var hasUp = false;
          writeAddresses.some(function (addr) {
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
      },
      _initProgress: function _initProgress() {
        var element = this._element;
        this.__P_76_2 = 100 * Math.PI;
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 100 100');
        svg.setAttribute('type', 'circle');
        var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.classList.add('bar');
        circle.setAttribute('r', '49');
        circle.setAttribute('cx', '50');
        circle.setAttribute('cy', '50');
        circle.setAttribute('stroke-width', '2');
        circle.setAttribute('stroke-dasharray', this.__P_76_2 + ' ' + this.__P_76_2);
        circle.setAttribute('stroke-dashoffset', '' + this.__P_76_2);
        svg.appendChild(circle);
        element.appendChild(svg);
        // make sure that we do not override the progress bar by state appearance
        element.classList.add('progress');
      },
      _applyConnected: function _applyConnected(value) {
        cv.ui.structure.tile.components.Button.superclass.prototype._applyConnected.call(this, value);
        if (value) {
          if (this.getType() !== 'trigger') {
            // delay this because we need the mappings to be ready
            qx.event.Timer.once(this._applyOn, this, 1000);
          }
        }
      },
      _applyOn: function _applyOn() {
        if (this.isConnected()) {
          var value = this.isOn() ? this.getOnValue() : this.getOffValue();
          this._element.setAttribute('value', value || '');
          var mappedValue = value;
          if (this._element.hasAttribute('mapping')) {
            mappedValue = cv.Application.structureController.mapValue(this._element.getAttribute('mapping'), value, this.__P_76_0);
          }
          var target = this._element.querySelector('.value');
          if (target && target.tagName.toLowerCase() === 'cv-icon') {
            if (target._instance) {
              target._instance.setId(mappedValue);
            } else {
              target.textContent = mappedValue;
            }
          } else {
            this.updateValue(mappedValue);
          }
          var styleClass = this.isOn() ? this.getOnClass() : this.getOffClass();
          if (this._element.hasAttribute('styling')) {
            styleClass = cv.Application.structureController.styleValue(this._element.getAttribute('styling'), value, this.__P_76_0);
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
            value = cv.Application.structureController.mapValue(this._element.getAttribute('progress-mapping'), value, this.__P_76_0);
          }
          valueElement.setAttribute('stroke-dashoffset', '' + (this.__P_76_2 - value / 100 * this.__P_76_2));
        }
      },
      _applyStyleClass: function _applyStyleClass(value, oldValue) {
        var classes = this._element.classList;
        if (oldValue && classes.contains(oldValue)) {
          classes.remove(oldValue);
        }
        if (value) {
          classes.add(value);
        }
      },
      _applyName: function _applyName(value) {
        if (!this.__P_76_1) {
          this.__P_76_1 = document.createElement('label');
          this.__P_76_1.classList.add('button-label');
          this._element.appendChild(this.__P_76_1);
        }
        this.__P_76_1.textContent = value;
      },
      updateValue: function updateValue(value) {
        var elem = this._element.querySelector('span.value');
        if (elem) {
          elem.innerHTML = value;
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
          this.setOn(value);
        } else if (target === 'progress') {
          this.setProgress(ev.detail.state);
        } else if (target.startsWith('store:')) {
          this.__P_76_0.set(target.substring(6), ev.detail.state);
        } else if (target === 'store') {
          // use address as store key
          this.__P_76_0.set(ev.detail.address, ev.detail.state);
        }
      },
      onClicked: function onClicked(event) {
        var _this2 = this;
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
          if (this.getType() === 'trigger') {
            // simulate feedback
            this.setOn(true);
            qx.event.Timer.once(function () {
              _this2.setOn(false);
            }, null, 250);
          }
          this._writeAddresses.filter(function (addr) {
            return !addr.hasAttribute('on') || addr.getAttribute('on') === 'click';
          }).forEach(function (address) {
            return address.dispatchEvent(ev);
          });
          event.stopPropagation();
        }
      },
      onPointerDown: function onPointerDown() {
        var _this3 = this;
        this._writeAddresses.filter(function (addr) {
          return addr.getAttribute('on') === 'down' && addr.hasAttribute('value');
        }).forEach(function (address) {
          address.dispatchEvent(new CustomEvent('sendState', {
            detail: {
              value: address.getAttribute('value'),
              source: _this3
            }
          }));
        });
      },
      onPointerUp: function onPointerUp() {
        var _this4 = this;
        this._writeAddresses.filter(function (addr) {
          return addr.getAttribute('on') === 'up' && addr.hasAttribute('value');
        }).forEach(function (address) {
          address.dispatchEvent(new CustomEvent('sendState', {
            detail: {
              value: address.getAttribute('value'),
              source: _this4
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
  cv.ui.structure.tile.components.Button.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Button.js.map?dt=1702901291491