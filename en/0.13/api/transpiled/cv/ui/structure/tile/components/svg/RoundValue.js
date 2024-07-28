function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.structure.tile.components.Value": {
        "require": true
      },
      "cv.ui.structure.tile.components.svg.MGraphicsElement": {
        "require": true
      },
      "qx.util.Function": {},
      "cv.ui.structure.tile.Controller": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /**
   * RoundValue shows an element that contains of an icon and a value-text inside
   * a colored circle. The circle can also show a progress value in another color.
   * @since 2023
   * @author Tobias Bräutigam
   */
  qx.Class.define('cv.ui.structure.tile.components.svg.RoundValue', {
    extend: cv.ui.structure.tile.components.Value,
    include: cv.ui.structure.tile.components.svg.MGraphicsElement,
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      progress: {
        check: 'Number',
        apply: '_applyProgress'
      },
      min: {
        check: 'Number',
        init: 0
      },
      max: {
        check: 'Number',
        init: 100
      },
      showProgress: {
        check: 'Boolean',
        init: false,
        apply: '_applyShowProgress'
      },
      icon: {
        check: 'String',
        nullable: true,
        apply: '_applyIcon'
      },
      radius: {
        check: 'Number',
        init: 30,
        apply: '_applyRadius',
        transform: '_parseInt'
      },
      stroke: {
        check: 'Number',
        init: 2,
        apply: '_applyStroke',
        transform: '_parseFloat'
      },
      amount: {
        check: 'Number',
        init: 0,
        apply: '_applyAmount'
      }
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _target: null,
      _svg: null,
      __P_91_0: null,
      _radius: null,
      _iconSize: null,
      _iconOffset: null,
      _fixedRadius: null,
      getSvg: function getSvg() {
        return this._svg;
      },
      getParentSvg: function getParentSvg() {
        return this._svg ? this._svg.ownerSVGElement : null;
      },
      _init: function _init() {
        var _this = this;
        cv.ui.structure.tile.components.svg.RoundValue.superclass.prototype._init.call(this);
        var element = this._element;
        this._fixedRadius = element.hasAttribute('radius');
        var radius = this.getRadius();
        var strokeWidth = this.getStroke();
        this._findParentGridLayout();
        if (this._parentGridLayout && !this._fixedRadius) {
          this._debouncedUpdateRadius = qx.util.Function.debounce(this._updateRadius.bind(this), 10);
          this._parentGridLayout.addListener('changeSize', this._debouncedUpdateRadius, this);
        }
        var parent = this._parentGridLayout ? this._parentGridLayout.getSvg() : element;
        var ns = 'http://www.w3.org/2000/svg';

        // add surrounding svg node
        var svg = this._svg = document.createElementNS(ns, 'svg');
        this.setHeight(radius * 2);
        this.setWidth(radius * 2);
        svg.setAttribute('type', 'circle');
        for (var _i = 0, _arr = ['x', 'y']; _i < _arr.length; _i++) {
          var name = _arr[_i];
          if (element.hasAttribute(name)) {
            svg.setAttribute(name, element.getAttribute(name));
          }
        }
        parent.appendChild(svg);
        var group = document.createElementNS(ns, 'g');
        group.classList.add('round-value');
        group.setAttribute('fill', 'transparent');
        group.setAttribute('stroke-width', strokeWidth);
        svg.appendChild(group);
        this._target = group;
        this._applyRadius(radius);
        if (!element.hasAttribute('no-background')) {
          var bg = document.createElementNS(ns, 'circle');
          bg.classList.add('bg');
          if (this.__P_91_0) {
            bg.setAttribute('r', '' + this.__P_91_0);
          }
          bg.setAttribute('cx', '50%');
          bg.setAttribute('cy', '50%');
          if (element.hasAttribute('background-color')) {
            bg.style.stroke = element.getAttribute('background-color');
          }
          this._target.appendChild(bg);
        }
        this.setShowProgress(element.querySelectorAll(':scope > cv-address[target="progress"], :scope > cv-address-group[target="progress"]').length > 0);
        if (element.hasAttribute('icon')) {
          this._applyIcon(this.getIcon());
        }
        if (element.hasAttribute('min')) {
          var min = parseInt(element.getAttribute('min'));
          if (!isNaN(min)) {
            this.setMin(min);
          }
        }
        if (element.hasAttribute('max')) {
          var max = parseInt(element.getAttribute('max'));
          if (!isNaN(max)) {
            this.setMax(max);
          }
        }
        var value = document.createElementNS(ns, 'text');
        value.setAttribute('text-anchor', 'middle');
        value.setAttribute('alignment-baseline', 'central');
        value.setAttribute('x', '50%');
        value.setAttribute('y', '70%');
        value.setAttribute('class', 'value');
        value.setAttribute('fill', 'var(--primaryText)');
        value.style.fontSize = "".concat(this._iconSize - 4, "px");
        this._target.appendChild(value);
        this._updateHeight();
        this._updateWidth();

        // check if we have a sum of multiple addresses, then show the amount
        var sumGroup = element.querySelector(':scope > cv-address-group[operator="+"]');
        if (sumGroup) {
          if (!sumGroup._instance) {
            window.requestAnimationFrame(function () {
              sumGroup._instance.bind('nonZeroValues', _this, 'amount');
            });
          } else {
            sumGroup._instance.bind('nonZeroValues', this, 'amount');
          }
        } else {
          this.setAmount(element.querySelectorAll(':scope > cv-address:not([target])').length);
        }
        this._applyPosition();
        this._applyTitle(this.getTitle());
      },
      _updateRadius: function _updateRadius() {
        if (this._parentGridLayout) {
          var newRadius = Math.floor(Math.min(this._parentGridLayout.getCellWidth(), this._parentGridLayout.getCellHeight()) / 2);
          if (this.getRadius() !== newRadius) {
            this._element.setAttribute('radius', '' + newRadius);
          }
        }
      },
      _applyAmount: function _applyAmount(value) {
        var amount = this._target.querySelector('text.amount');
        var updateIconPosition = false;
        if (value > 1) {
          // show it
          if (!amount) {
            amount = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            amount.setAttribute('text-anchor', 'right');
            amount.setAttribute('alignment-baseline', 'central');
            amount.setAttribute('fill', 'var(--primaryText)');
            amount.classList.add('amount');
            amount.style.fontSize = "".concat(this._iconSize - 5, "px");
            this._target.appendChild(amount);
            this.__P_91_1();
          }
          if (this._iconOffset !== 5) {
            this._iconOffset = 5;
            updateIconPosition = true;
          }
          amount.textContent = value + 'x';
        } else if (amount) {
          amount.remove();
          if (this._iconOffset !== 0) {
            this._iconOffset = 0;
            updateIconPosition = true;
          }
        }
        if (updateIconPosition) {
          this.__P_91_2();
        }
      },
      __P_91_1: function __P_91_1() {
        var amount = this._target.querySelector('text.amount');
        if (amount) {
          var radius = this.getRadius();
          var halfSize = this._iconSize / 2;
          var x = radius * 0.8 - halfSize;
          var y = radius * 0.85 - halfSize;
          amount.setAttribute('x', "".concat(x));
          amount.setAttribute('y', "".concat(y));
        }
      },
      __P_91_2: function __P_91_2() {
        var icon = this._target.querySelector('cv-icon');
        if (icon) {
          icon.style.fontSize = this._iconSize + 'px';
        }
        var iconContainer = this._target.querySelector('foreignObject.icon-container');
        if (iconContainer) {
          var radius = this.getRadius();
          var halfSize = this._iconSize / 2;
          var x = radius - halfSize + this._iconOffset;
          var y = radius * 0.6 - halfSize;
          iconContainer.setAttribute('x', "".concat(x));
          iconContainer.setAttribute('y', "".concat(y));
          iconContainer.setAttribute('width', this._iconSize + '');
          iconContainer.setAttribute('height', this._iconSize + '');
        }
      },
      _applyRadius: function _applyRadius(radius) {
        this._updateNormalizedRadius();
        this._iconSize = Math.round(radius / 2);
        if (this._target) {
          this.__P_91_2();
          var value = this._target.querySelector('.value');
          if (value) {
            value.style.fontSize = "".concat(this._iconSize - 4, "px");
          }
          this.__P_91_1();
        }
        if (this._svg) {
          this.setHeight(radius * 2);
          this.setWidth(radius * 2);
        }
      },
      _applyStroke: function _applyStroke(stroke) {
        this._updateNormalizedRadius();
        if (this._target) {
          this._target.setAttribute('stroke-width', stroke);
        }
      },
      _updateNormalizedRadius: function _updateNormalizedRadius() {
        if (this._target) {
          var newValue = this.getRadius() - this.getStroke() / 2;
          if (this.__P_91_0 !== newValue) {
            this.__P_91_0 = newValue;
            var bg = this._target.querySelector('circle.bg');
            if (bg) {
              bg.setAttribute('r', '' + this.__P_91_0);
            }
            var bar = this._target.querySelector('circle.bar');
            if (bar) {
              bar.setAttribute('r', '' + this.__P_91_0);
            }
          }
        }
      },
      _updateValue: function _updateValue(mappedValue, value) {
        if (this._target) {
          var target = this._target.querySelector('.value');
          if (target) {
            target.textContent = mappedValue;
            this._debouncedDetectOverflow();
          }
        }
      },
      _applyShowProgress: function _applyShowProgress(value) {
        if (value) {
          var bar = this._target.querySelector('circle.bar');
          this._target.classList.add('shows-progress');
          if (!bar) {
            bar = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            bar.classList.add('bar');
            bar.setAttribute('r', '' + this.__P_91_0);
            bar.setAttribute('cx', '50%');
            bar.setAttribute('cy', '50%');
            bar.setAttribute('pathLength', '100');
            bar.setAttribute('stroke-dashoffset', '25');
            bar.setAttribute('stroke-dasharray', '0 100');
            if (this._element.hasAttribute('foreground-color')) {
              bar.style.stroke = this._element.getAttribute('foreground-color');
            }
            this._target.appendChild(bar);
          }
        } else {
          var _bar = this._target.querySelector('circle.bar');
          if (_bar) {
            this._target.removeChild(_bar);
          }
          this._target.classList.remove('shows-progress');
        }
      },
      _applyIcon: function _applyIcon(iconName) {
        if (!this._target) {
          return;
        }
        var icon = this._target.querySelector('cv-icon');
        if (iconName) {
          if (!icon) {
            var fo = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
            fo.setAttribute('class', 'icon-container');
            fo.style.textAlign = 'center';
            icon = document.createElement('cv-icon');
            icon.classList.add(iconName);
            icon.style.fontSize = this._iconSize + 'px';
            fo.appendChild(icon);
            this._target.appendChild(fo);
            this.__P_91_2();
          }
        } else if (icon) {
          this._target.remove(icon);
        }
      },
      _applyProgress: function _applyProgress(value) {
        if (this.isConnected()) {
          var valueInRange = value - this.getMin();
          var percent = Math.max(0, Math.min(100, 100 / (this.getMax() - this.getMin()) * valueInRange));
          var title = this._target.querySelector(':scope > title');
          if (!title) {
            title = document.createElementNS('http://www.w3.org/2000/svg', 'title');
            this._target.appendChild(title);
          }
          title.textContent = percent + '%';
          var valueElement = this._target.querySelector('circle.bar');
          valueElement.setAttribute('stroke-dasharray', "".concat(percent, " ").concat(100 - percent));
        }
      },
      _applyStyleClass: function _applyStyleClass(value, oldValue) {
        var classes = this._target.classList;
        if (oldValue && classes.contains(oldValue)) {
          classes.remove(oldValue);
        }
        if (value) {
          classes.add(value);
        }
      },
      _detectOverflow: function _detectOverflow() {
        if (this.isVisible()) {
          var target = this._target.querySelector('.value');
          var sizeReference = this._target.querySelector('circle.bg').getBBox();
          this._queuedOverflowDetection = false;
          if (target.clientWidth > sizeReference.width) {
            target.classList.add('scroll');
          } else {
            target.classList.remove('scroll');
          }
        } else {
          this._queuedOverflowDetection = true;
        }
      },
      onStateUpdate: function onStateUpdate(ev) {
        if (ev.detail.target === 'progress') {
          this.setProgress(ev.detail.state);
          ev.stopPropagation();
          return true;
        }
        return cv.ui.structure.tile.components.svg.RoundValue.superclass.prototype.onStateUpdate.call(this, ev);
      }
    },
    defer: function defer(QxClass) {
      var _Class;
      customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'svg-round-value', (_Class = /*#__PURE__*/function (_QxConnector) {
        "use strict";

        function _Class() {
          _classCallCheck(this, _Class);
          return _callSuper(this, _Class, [QxClass]);
        }
        _inherits(_Class, _QxConnector);
        return _createClass(_Class);
      }(QxConnector), _defineProperty(_Class, "observedAttributes", ['icon', 'x', 'y', 'row', 'column', 'rowspan', 'colspan', 'radius', 'stroke', 'title']), _Class));
    }
  });
  cv.ui.structure.tile.components.svg.RoundValue.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=RoundValue.js.map?dt=1722151813300