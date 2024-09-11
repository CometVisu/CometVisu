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
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
      "cv.ui.structure.tile.components.svg.MSvgGrid": {
        "require": true
      },
      "cv.ui.structure.tile.MResize": {
        "require": true
      },
      "cv.ui.structure.tile.MStringTransforms": {
        "require": true
      },
      "cv.ui.structure.tile.MFullscreen": {
        "require": true
      },
      "qx.event.Registration": {},
      "cv.ui.structure.tile.Controller": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /*
   * Copyright (c) 2023, Christian Mayer and the CometVisu contributors.
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
   *
   */

  /**
   * Flow management widget.
   *
   * @author Tobias Bräutigam
   * @since 2023
   *
   * @ignore(d3.select)
   * @ignore(screen)
   * @ignore(SVGElement)
   */
  qx.Class.define('cv.ui.structure.tile.components.Flow', {
    extend: cv.ui.structure.tile.components.AbstractComponent,
    include: [cv.ui.structure.tile.components.svg.MSvgGrid, cv.ui.structure.tile.MResize, cv.ui.structure.tile.MStringTransforms, cv.ui.structure.tile.MFullscreen],
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      pan: {
        check: 'Boolean',
        init: false,
        transform: '_stringToBool',
        apply: '_applyPan'
      },
      pagination: {
        check: ['none', 'horizontal', 'vertical', 'both'],
        init: 'none',
        apply: '_applyPagination'
      },
      centerX: {
        check: 'Boolean',
        init: false,
        apply: '_applyCenterX',
        transform: '_parseBoolean'
      },
      centerY: {
        check: 'Boolean',
        init: false,
        apply: '_applyCenterY',
        transform: '_parseBoolean'
      },
      fullscreenViewBox: {
        check: 'String',
        nullable: true,
        event: 'changeFullscreenViewBox'
      }
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      SVG: null,
      _dragPoint: null,
      _startPoint: null,
      _expiredTouchStart: null,
      _viewBoxBinding: null,
      _lastBBox: null,
      _additionalViewBoxUpdate: null,
      _ready: null,
      getSvg: function getSvg() {
        if (!this.SVG) {
          this.SVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
          this._element.appendChild(this.SVG);
        }
        return this.SVG;
      },
      _init: function _init() {
        var _this = this;
        cv.ui.structure.tile.components.Flow.superclass.prototype._init.call(this);
        this.getSvg();
        this.setResizeTarget(this._element);
        this._observer.observe(this.SVG);
        this.addListener('resized', this._updateDimensions, this);
        for (var _i = 0, _arr = ['changeRows', 'changeColumns', 'changeOuterPadding', 'changeSpacing']; _i < _arr.length; _i++) {
          var layoutEvent = _arr[_i];
          this.addListener(layoutEvent, this._updateCellSize, this);
        }
        var title = this.getHeader('label.title');
        var element = this._element;
        if (element.hasAttribute('title') && !title) {
          title = document.createElement('label');
          title.classList.add('title');
          var span = document.createElement('span');
          title.appendChild(span);
          span.textContent = element.getAttribute('title');
          this.appendToHeader(title);
        }
        if (element.hasAttribute('allow-fullscreen') && element.getAttribute('allow-fullscreen') === 'true') {
          this._initFullscreenSwitch();
          this.addListener('changeFullscreen', function (ev) {
            if (ev.getData()) {
              if (!_this._viewBoxBinding && _this.getFullscreenViewBox()) {
                _this._viewBoxBinding = _this.bind('fullscreenViewBox', _this, 'viewBox');
              }
            } else if (_this._viewBoxBinding) {
              _this.removeBinding(_this._viewBoxBinding);
              _this._viewBoxBinding = null;

              // restore old value
              if (_this._element.hasAttribute('view-box')) {
                _this.setViewBox(_this._element.getAttribute('view-box'));
              } else {
                _this.resetViewBox();
              }
            }
            _this._updateDimensions();
          });
        }
        this.addListener('changeViewBox', this._updateViewBox, this);
        window.requestAnimationFrame(function () {
          return _this._updateViewBox();
        });
        if (this.getPan()) {
          this._applyPan(true);
        }
        this._applyPagination(this.getPagination());
        if (element.querySelectorAll(':scope > cv-power-entity:not([type="house"]), :scope > cv-svg-round-value').length === 0) {
          // remove the house
          var house = element.querySelector(':scope > cv-power-entity[type="house"]');
          if (house) {
            house.remove();
          }
        }

        // make sure that the initial setup viewBox changes are not animated
        setTimeout(function () {
          _this._ready = true;
          _this._center();
        }, 2000);
      },
      _applyCenterX: function _applyCenterX(value) {
        if (value) {
          this.__P_79_0('row', this.getRows());
        }
      },
      _applyCenterY: function _applyCenterY(value) {
        if (value) {
          this.__P_79_0('column', this.getColumns());
        }
      },
      __P_79_0: function __P_79_0(selector, total) {
        // do not center the middle one(s)
        var skip = [];
        if (total > 2) {
          if (total % 2 > 0) {
            skip.push(Math.floor(total / 2));
          } else {
            skip.push(total / 2 - 1);
            skip.push(total / 2);
          }
        }
        for (var i = 0; i < total; i++) {
          if (!skip.includes(i)) {
            if (selector === 'row') {
              this.__P_79_1(this._element.querySelectorAll(":scope > *[row=\"".concat(i, "\"]")));
            } else {
              this.__P_79_2(this._element.querySelectorAll(":scope > *[column=\"".concat(i, "\"]")));
            }
          }
        }
      },
      __P_79_1: function __P_79_1(rowElements) {
        if (rowElements.length === 1) {
          rowElements[0].setAttribute('column', '1');
        } else if (rowElements.length === 2) {
          var sorted = Array.from(rowElements);
          sorted.sort(function (a, b) {
            return parseFloat(a.getAttribute('column')) - parseFloat(b.getAttribute('column'));
          });
          sorted[0].setAttribute('column', '0.5');
          sorted[1].setAttribute('column', '1.5');
        }
      },
      __P_79_2: function __P_79_2(columnElements) {
        if (columnElements.length === 1) {
          columnElements[0].setAttribute('row', '1');
        } else if (columnElements.length === 2) {
          var sorted = Array.from(columnElements);
          sorted.sort(function (a, b) {
            return parseFloat(a.getAttribute('row')) - parseFloat(b.getAttribute('row'));
          });
          sorted[0].setAttribute('row', '0.5');
          sorted[1].setAttribute('row', '1.5');
        }
      },
      _drag: function _drag(ev) {
        ev.preventDefault();
        ev.stopImmediatePropagation();
        var CTM = this.SVG.getScreenCTM().inverse();
        this._dragPoint.x = ev.clientX;
        this._dragPoint.y = ev.clientY;
        this._dragPoint = this._dragPoint.matrixTransform(CTM);
        this.SVG.viewBox.baseVal.x -= this._dragPoint.x - this._startPoint.x;
        this.SVG.viewBox.baseVal.y -= this._dragPoint.y - this._startPoint.y;
      },
      _cancelEvent: function _cancelEvent(ev) {
        ev.preventDefault();
        ev.stopImmediatePropagation();
      },
      _startDrag: function _startDrag(ev) {
        if (typeof this.drag !== 'function') {
          this.drag = this._drag.bind(this);
        }
        this._element.addEventListener('pointermove', this.drag);
        this._element.addEventListener('touchmove', this._cancelEvent);
        var CTM = this.SVG.getScreenCTM().inverse();
        this._dragPoint.x = ev.clientX;
        this._dragPoint.y = ev.clientY;
        this._startPoint = this._dragPoint.matrixTransform(CTM);
      },
      _endDrag: function _endDrag(ev) {
        if (this.drag) {
          this._element.removeEventListener('pointermove', this.drag);
        }
        this._element.removeEventListener('touchmove', this._cancelEvent);
      },
      _touchStart: function _touchStart(ev) {
        if (ev.touches.length === 1) {
          if (!this._expiredTouchStart) {
            this._expiredTouchStart = ev.timeStamp + 400;
          } else if (ev.timeStamp <= this._expiredTouchStart) {
            // remove the default of this event ( Zoom )
            //ev.preventDefault()
            this.resetDrag();
            // then reset the variable for other "double Touches" event
            this._expiredTouchStart = null;
          } else {
            // if the second touch was expired, make it as it's the first
            this._expiredTouchStart = ev.timeStamp + 400;
          }
        }
        ev.preventDefault();
      },
      _applyPan: function _applyPan(draggable) {
        if (this.SVG) {
          if (draggable) {
            this._dragPoint = this.SVG.createSVGPoint();
            if (typeof this.startDrag !== 'function') {
              this.startDrag = this._startDrag.bind(this);
            }
            if (typeof this.endDrag !== 'function') {
              this.endDrag = this._endDrag.bind(this);
            }
            if (typeof this.resetDrag !== 'function') {
              this.resetDrag = this._updateViewBox.bind(this);
            }
            if (typeof this.touchStart !== 'function') {
              this.touchStart = this._touchStart.bind(this);
            }
            this._element.addEventListener('pointerdown', this.startDrag);
            this._element.addEventListener('pointerup', this.endDrag);
            this._element.addEventListener('pointerleave', this.endDrag);
            this._element.addEventListener('pointercancel', this.endDrag);
            this._element.addEventListener('dblclick', this.resetDrag);
            this._element.addEventListener('touchstart', this.touchStart);
          } else {
            this._element.removeEventListener('pointerdown', this.startDrag);
            this._element.removeEventListener('pointerup', this.endDrag);
            this._element.removeEventListener('pointerleave', this.endDrag);
            this._element.removeEventListener('pointercancel', this.endDrag);
            this._element.removeEventListener('dblclick', this.resetDrag);
            this._element.removeEventListener('touchstart', this.touchStart);
          }
        }
      },
      _applyPagination: function _applyPagination(value) {
        var showH = value === 'both' || value === 'horizontal';
        var showV = value === 'both' || value === 'vertical';
        var addButtons = [];
        var removeButtons = [];
        if (showH) {
          addButtons.push('left');
          addButtons.push('right');
        } else {
          removeButtons.push('left');
          removeButtons.push('right');
        }
        if (showV) {
          addButtons.push('top');
          addButtons.push('bottom');
        } else {
          removeButtons.push('top');
          removeButtons.push('bottom');
        }
        for (var _i2 = 0, _addButtons = addButtons; _i2 < _addButtons.length; _i2++) {
          var dir = _addButtons[_i2];
          var button = this._element.querySelector("div.pagination.".concat(dir));
          if (!button) {
            button = document.createElement('div');
            button.classList.add('pagination', dir);
            this._element.appendChild(button);
          }
        }
        for (var _i3 = 0, _removeButtons = removeButtons; _i3 < _removeButtons.length; _i3++) {
          var _dir = _removeButtons[_i3];
          var _button = this._element.querySelector("div.pagination.".concat(_dir));
          if (_button) {
            _button.remove();
          }
        }
        this._updatePaginationButtons();
      },
      _enablePaginationButton: function _enablePaginationButton(button, dir, enabled) {
        var callback;
        switch (dir) {
          case 'left':
            callback = this._paginateLeft;
            break;
          case 'right':
            callback = this._paginateRight;
            break;
          case 'top':
            callback = this._paginateTop;
            break;
          case 'bottom':
            callback = this._paginateBottom;
            break;
        }
        if (enabled) {
          button.classList.add('clickable');
          qx.event.Registration.addListener(button, 'tap', callback, this);
        } else {
          if (button.classList.contains('clickable')) {
            button.classList.remove('clickable');
          }
          qx.event.Registration.removeListener(button, 'tap', callback, this);
        }
      },
      _updatePaginationButtons: function _updatePaginationButtons() {
        var _this$getViewBox$spli = this.getViewBox().split(' ').map(function (v) {
            return parseInt(v);
          }),
          _this$getViewBox$spli2 = _slicedToArray(_this$getViewBox$spli, 4),
          column = _this$getViewBox$spli2[0],
          row = _this$getViewBox$spli2[1],
          width = _this$getViewBox$spli2[2],
          height = _this$getViewBox$spli2[3];
        for (var _i4 = 0, _arr2 = ['top', 'bottom', 'left', 'right']; _i4 < _arr2.length; _i4++) {
          var dir = _arr2[_i4];
          var button = this._element.querySelector("div.pagination.".concat(dir));
          if (!button) {
            continue;
          }
          switch (dir) {
            case 'left':
              this._enablePaginationButton(button, dir, column - width >= 0);
              break;
            case 'right':
              this._enablePaginationButton(button, dir, column + width < this.getColumns());
              break;
            case 'top':
              this._enablePaginationButton(button, dir, row - height >= 0);
              break;
            case 'bottom':
              this._enablePaginationButton(button, dir, row + height < this.getRows());
              break;
          }
        }
      },
      _paginateLeft: function _paginateLeft() {
        this._paginate('left');
      },
      _paginateRight: function _paginateRight() {
        this._paginate('right');
      },
      _paginateTop: function _paginateTop() {
        this._paginate('top');
      },
      _paginateBottom: function _paginateBottom() {
        this._paginate('bottom');
      },
      _paginate: function _paginate(direction) {
        var _this$getViewBox$spli3 = this.getViewBox().split(' ').map(function (v) {
            return parseInt(v);
          }),
          _this$getViewBox$spli4 = _slicedToArray(_this$getViewBox$spli3, 4),
          column = _this$getViewBox$spli4[0],
          row = _this$getViewBox$spli4[1],
          width = _this$getViewBox$spli4[2],
          height = _this$getViewBox$spli4[3];
        switch (direction) {
          case 'left':
            if (column - width >= 0) {
              column -= width;
            }
            break;
          case 'right':
            if (column + width < this.getColumns()) {
              column += width;
            }
            break;
          case 'top':
            if (row - height >= 0) {
              row -= height;
            }
            break;
          case 'bottom':
            if (row + height < this.getRows()) {
              row += height;
            }
        }
        this._element.setAttribute('view-box', "".concat(column, " ").concat(row, " ").concat(width, " ").concat(height));
      },
      _updateDimensions: function _updateDimensions(ev) {
        var _this2 = this;
        if (ev) {
          var entry = ev.getData();
          if (entry.contentBoxSize) {
            if (entry.target instanceof SVGElement) {
              this._center(entry.contentRect.width, entry.contentRect.height);
              return;
            }
          }
        }
        var isFullscreen = this.isFullscreen();
        if (isFullscreen) {
          var minSize = Math.min(screen.availHeight, screen.availWidth);
          if (minSize > 600) {
            this.setOuterPadding(16);
            this.setSpacing(32);
          } else if (minSize >= 400) {
            this.setOuterPadding(16);
            this.setSpacing(26);
          }
          // set fixed height
          var height = 0;
          if (screen.availHeight > screen.availWidth) {
            var bbox = this.SVG.getBBox();
            height = Math.min(screen.availHeight, Math.max(bbox.height, this.getRows() * 100));
          } else {
            height = screen.availHeight;
          }
          if (this._tileElement) {
            this._tileElement.style.height = "".concat(height, "px");
          }
        } else {
          if (this._tileElement) {
            this._tileElement.style.height = 'unset';
          }
          if (this._element.hasAttribute('outer-padding')) {
            this.setOuterPadding(this._element.getAttribute('outer-padding'));
          } else {
            this.resetOuterPadding();
          }
          if (this._element.hasAttribute('spacing')) {
            this.setSpacing(this._element.getAttribute('spacing'));
          } else {
            this.resetSpacing();
          }
        }
        window.requestAnimationFrame(function () {
          return _this2._updateCellSize();
        });
      },
      _updateViewBox: function _updateViewBox() {
        var _this3 = this;
        var viewBox = this.getViewBox();
        if (viewBox) {
          var parts = viewBox.split(' ').map(function (v) {
            return parseInt(v);
          });
          if (parts.length === 4) {
            this._updatePaginationButtons();
            var totalOuterPadding = this.getOuterPadding() * 2;
            var x = this.getCellWidth() * parts[0] + (parts[0] > 1 ? (parts[0] - 1) * this.getSpacing() : 0);
            var y = this.getCellHeight() * parts[1] + (parts[1] > 1 ? (parts[1] - 1) * this.getSpacing() : 0);
            var width = totalOuterPadding + this.getCellWidth() * parts[2] + (parts[2] > 1 ? (parts[2] - 1) * this.getSpacing() : 0);
            var height = totalOuterPadding + this.getCellHeight() * parts[3] + (parts[3] > 1 ? (parts[3] - 1) * this.getSpacing() : 0);
            if (this._ready && _typeof(window.d3) === 'object') {
              var svg = d3.select(this._element).select('svg');
              svg.transition().duration(500).attr('viewBox', "".concat(x, " ").concat(y, " ").concat(width, " ").concat(height));
              setTimeout(function () {
                return _this3._center();
              }, 510);
            } else {
              this.SVG.setAttribute('viewBox', "".concat(x, " ").concat(y, " ").concat(width, " ").concat(height));
              setTimeout(function () {
                return _this3._center();
              }, 10);
            }
          }
        } else {
          this.SVG.removeAttribute('viewBox');
        }
      },
      _center: function _center(width, height) {
        var _this4 = this;
        if (this.SVG && this._ready) {
          var bbox = this.SVG.getBBox();
          if (this._lastBBox && this._lastBBox.width === bbox.width && this._lastBBox.height === bbox.height) {
            // no change
            return;
          }
          if (!width || !height) {
            var parts = this.SVG.hasAttribute('viewBox') ? this.SVG.getAttribute('viewBox').split(' ').map(function (v) {
              return parseInt(v);
            }) : [];
            if (parts.length === 4) {
              width = parts[2];
              height = parts[3];
            } else {
              return;
            }
          }
          var totalOuterPadding = this.getOuterPadding() * 2;
          var visibleColumns = this.getColumns();
          var visibleRows = this.getRows();
          var gridViewBox = this.getViewBox();
          var firstColumn = 0;
          var lastColumn = 2;
          var firstRow = 0;
          var lastRow = 2;
          if (gridViewBox) {
            var gridParts = gridViewBox.split(' ').map(function (s) {
              return parseInt(s);
            });
            visibleColumns = gridParts[2] - gridParts[0];
            visibleRows = gridParts[3] - gridParts[1];
            firstColumn = gridParts[0];
            lastColumn = firstColumn + gridParts[2] - 1;
            firstRow = gridParts[1];
            lastRow = firstRow + gridParts[3] - 1;
          }
          var usedColumns = 3;
          var usedRows = 3;
          var col;
          var row;
          var _iterator = _createForOfIteratorHelper(this._element.querySelectorAll('*[column]')),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var elem = _step.value;
              col = parseInt(elem.getAttribute('column')) + 1;
              if (firstColumn <= col && lastColumn > col && col > usedColumns) {
                usedColumns = col;
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          var _iterator2 = _createForOfIteratorHelper(this._element.querySelectorAll('*[row]')),
            _step2;
          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var _elem = _step2.value;
              row = parseInt(_elem.getAttribute('row')) + 1;
              if (firstRow <= col && lastRow > row && row > usedRows) {
                usedRows = row;
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
          var visibleWidth = usedColumns > visibleColumns ? visibleColumns / this.getColumns() : 1.0;
          var visibleHeight = usedRows > visibleRows ? visibleRows / this.getRows() : 1.0;
          var heightDiff = height - totalOuterPadding - bbox.height * visibleHeight;
          var widthDiff = width - totalOuterPadding - bbox.width * visibleWidth;
          if (heightDiff > 0 || widthDiff > 0) {
            this.SVG.setAttribute('transform', "translate(".concat(Math.max(0, widthDiff / 2), ", ").concat(Math.max(0, heightDiff / 2), ")"));
          } else {
            this.SVG.removeAttribute('transform');
          }
          this._lastBBox = bbox;
          window.requestAnimationFrame(function () {
            return _this4._center();
          });
        }
      },
      _updateCellSize: function _updateCellSize() {
        var _this5 = this;
        if (this._element.clientWidth === 0 || this._element.clientHeight === 0) {
          return;
        }
        var visibleColumns = this.getColumns();
        var visibleRows = this.getRows();
        var viewBox = this.getViewBox();
        if (viewBox) {
          var box = viewBox.split(' ').map(function (v) {
            return parseInt(v);
          });
          visibleColumns = box[2];
          visibleRows = box[3];
        }
        var padding = this.getOuterPadding() * 2;
        var spacing = this.getSpacing() / 2;
        var cellWidth = Math.floor((this._element.clientWidth - padding) / visibleColumns - spacing);
        var cellHeight = Math.floor((this._element.clientHeight - padding) / visibleRows - spacing);
        this.debug('cellWidth', cellWidth, 'cellHeight', cellHeight);
        var changed = this.getCellWidth() !== cellWidth || this.getCellHeight() !== cellHeight;
        this.setCellWidth(cellWidth);
        this.setCellHeight(cellHeight);
        if (changed) {
          window.requestAnimationFrame(function () {
            _this5._updateViewBox();
          });
        }
      },
      _stringToBool: function _stringToBool(value) {
        if (typeof value === 'string') {
          return value === 'true';
        } else if (value === null || value === undefined) {
          return false;
        }
        return value;
      }
    },
    defer: function defer(QxClass) {
      var _Class;
      customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'flow', (_Class = /*#__PURE__*/function (_QxConnector) {
        "use strict";

        function _Class() {
          _classCallCheck(this, _Class);
          return _callSuper(this, _Class, [QxClass]);
        }
        _inherits(_Class, _QxConnector);
        return _createClass(_Class);
      }(QxConnector), _defineProperty(_Class, "observedAttributes", ['view-box', 'fullscreen-view-box', 'pan', 'rows', 'columns', 'cell-width', 'cell-height', 'outer-padding', 'spacing', 'pagination', 'center-x', 'center-y']), _Class));
    }
  });
  cv.ui.structure.tile.components.Flow.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Flow.js.map?dt=1726089033582