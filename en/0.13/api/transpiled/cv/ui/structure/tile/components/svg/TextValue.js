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
   * TextValue shows an element that contains of an icon, an optional tile
   * and a value-text.
   *
   * @since 2023
   * @author Tobias Bräutigam
   */
  qx.Class.define('cv.ui.structure.tile.components.svg.TextValue', {
    extend: cv.ui.structure.tile.components.Value,
    include: cv.ui.structure.tile.components.svg.MGraphicsElement,
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      icon: {
        check: 'String',
        nullable: true,
        apply: '_applyIcon'
      },
      color: {
        check: 'String',
        init: 'var(--primaryText)',
        apply: '_applyColor'
      },
      iconColor: {
        check: 'String',
        init: 'var(--primaryText)',
        apply: '_applyIconColor'
      },
      scale: {
        check: 'Number',
        init: 1,
        apply: '_applyScale'
      },
      offsetY: {
        check: 'Number',
        init: 0,
        apply: '_applyOffsetY'
      },
      offsetX: {
        check: 'Number',
        init: 0,
        apply: '_applyOffsetX'
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
      _iconSize: null,
      _iconPosition: null,
      _debouncedUpdateRSize: null,
      getSvg: function getSvg() {
        return this._svg;
      },
      getParentSvg: function getParentSvg() {
        return this._svg ? this._svg.ownerSVGElement : null;
      },
      _init: function _init() {
        cv.ui.structure.tile.components.svg.TextValue.superclass.prototype._init.call(this);
        var element = this._element;
        this._findParentGridLayout();
        var parent = this._parentGridLayout ? this._parentGridLayout.getSvg() : element;
        this._iconSize = 24 * this.getScale();
        this._debouncedUpdateRSize = qx.util.Function.debounce(this._updateSize.bind(this), 10);
        this._parentGridLayout.addListener('changeSize', this._debouncedUpdateRSize, this);
        var ns = 'http://www.w3.org/2000/svg';

        // add surrounding svg node
        var svg = this._svg = document.createElementNS(ns, 'svg');
        svg.classList.add('text-value');
        for (var _i = 0, _arr = ['x', 'y']; _i < _arr.length; _i++) {
          var name = _arr[_i];
          if (element.hasAttribute(name)) {
            svg.setAttribute(name, element.getAttribute(name));
          }
        }
        parent.appendChild(svg);
        var group = document.createElementNS(ns, 'g');
        svg.appendChild(group);
        this._target = group;
        if (element.hasAttribute('icon')) {
          this._applyIcon(this.getIcon());
        }
        var value = document.createElementNS(ns, 'text');
        value.setAttribute('x', '0');
        value.setAttribute('y', '32');
        value.setAttribute('alignment-baseline', 'central');
        value.setAttribute('class', 'value');
        value.setAttribute('fill', this.getColor());
        this._target.appendChild(value);
        this.addListener('heightChanged', this._centerY, this);
        this.addListener('widthChanged', this._centerX, this);
        this._updateHeight();
        this._updateWidth();
        this._applyPosition();
        this._applyTitleOverride(this.getTitle());
      },
      _updateSize: function _updateSize() {
        var newScale = Math.min(2.5, (Math.min(this._parentGridLayout.getCellWidth(), this._parentGridLayout.getCellHeight()) - this._parentGridLayout.getSpacing()) / cv.ui.structure.tile.components.svg.MGraphicsElement.DefaultSize);
        if (newScale === 0.0) {
          return;
        }
        this.debug('new scale:', newScale);
        this.setScale(newScale);
      },
      _applyScale: function _applyScale(scale) {
        if (this._target) {
          this._target.setAttribute('transform', "scale(".concat(scale, ")"));
        }
        if (this._svg) {
          this.setHeight(cv.ui.structure.tile.components.svg.MGraphicsElement.DefaultSize * scale * this.getRowspan());
          this.setWidth(cv.ui.structure.tile.components.svg.MGraphicsElement.DefaultSize * scale * this.getColspan());
        }
      },
      _updateValue: function _updateValue(mappedValue, value) {
        if (this._target) {
          var target = this._target.querySelector('.value');
          target.textContent = mappedValue;
          this._debouncedDetectOverflow();
        }
      },
      _centerY: function _centerY() {
        this.setOffsetY(this.getHeight() / 2 - this._svg.getBBox().height / 2);
      },
      _centerX: function _centerX() {
        this.setOffsetX(this.getWidth() / 2 - this._svg.getBBox().width / 2);
      },
      _applyOffsetY: function _applyOffsetY(value) {
        var icon = this._target.querySelector('.icon-container');
        if (icon) {
          icon.setAttribute('y', "".concat(value));
        }
        var text = this._target.querySelector('text.value');
        if (text) {
          text.setAttribute('y', '' + (value + 32));
        }
        text = this._target.querySelector('text.title');
        if (text) {
          text.setAttribute('y', '' + (value + 16));
        }
      },
      _applyOffsetX: function _applyOffsetX() {},
      _applyTitleOverride: function _applyTitleOverride(title) {
        if (this._target) {
          if (title) {
            var text = this._target.querySelector('text.title');
            if (!text) {
              text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
              text.setAttribute('x', '0');
              text.setAttribute('y', '16');
              text.setAttribute('alignment-baseline', 'central');
              text.classList.add('title');
              this._target.appendChild(text);
            }
            text.textContent = title;
          } else {
            var _text = this._target.querySelector('text.title');
            if (_text) {
              _text.remove();
            }
          }
        }
      },
      _applyColor: function _applyColor(color) {
        if (this._target) {
          var target = this._target.querySelector('.value');
          if (color) {
            target.setAttribute('fill', color);
          } else {
            target.removeAttribute('fill');
          }
        }
      },
      _applyIconColor: function _applyIconColor(color) {
        var icon = this._target ? this._target.querySelector('cv-icon') : null;
        if (icon) {
          icon.style.color = color || 'inherit';
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
            fo.setAttribute('width', this._iconSize + 'px');
            fo.setAttribute('height', this._iconSize + 'px');
            fo.style.textAlign = 'center';
            icon = document.createElement('cv-icon');
            icon.classList.add(iconName);
            icon.style.fontSize = this._iconSize + 'px';
            if (this.getIconColor()) {
              icon.style.color = this.getIconColor();
            }
            fo.appendChild(icon);
            var value = this._target.querySelector('.value');
            if (value) {
              this._target.insertBefore(fo, value);
            } else {
              this._target.appendChild(fo);
            }
          }
        } else if (icon) {
          this._target.remove(icon);
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
          var width = 0;
          var wAttr = this._svg.getAttribute('width');
          if (wAttr) {
            width = parseInt(wAttr, 10);
          } else {
            var sizeReference = this._svg.getBBox();
            width = sizeReference.width;
          }
          this._queuedOverflowDetection = false;
          if (target.clientWidth > width) {
            target.classList.add('scroll');
          } else {
            target.classList.remove('scroll');
          }
        } else {
          this._queuedOverflowDetection = true;
        }
      }
    },
    defer: function defer(QxClass) {
      var _Class;
      customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'svg-text-value', (_Class = /*#__PURE__*/function (_QxConnector) {
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
  cv.ui.structure.tile.components.svg.TextValue.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=TextValue.js.map?dt=1726089034605