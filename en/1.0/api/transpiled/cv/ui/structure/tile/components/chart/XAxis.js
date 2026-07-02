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
      "cv.ui.structure.tile.components.chart.AbstractAxis": {
        "construct": true,
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* XAxis.js
   *
   * Copyright (c) 2010-2026, Christian Mayer and the CometVisu contributors.
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
   * @ignore(d3)
   */
  qx.Class.define('cv.ui.structure.tile.components.chart.XAxis', {
    extend: cv.ui.structure.tile.components.chart.AbstractAxis,
    /**
     * @param {cv.ui.structure.tile.components.Chart} chart 
     * @param type
     * @param top
     */
    construct: function construct(chart) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'axis';
      var top = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      cv.ui.structure.tile.components.chart.AbstractAxis.constructor.call(this, chart, type);
      this.initScale(d3.scaleTime());
      this._top = top;
      if (this._top) {
        this._chart.addListener('changeMarginTop', this._updateTransform, this);
      } else {
        this._chart.addListener('changeHeight', this._updateTransform, this);
        this._chart.addListener('changeMarginBottom', this._updateTransform, this);
      }
      this._chart.addListener('changeWidth', this._updateRange, this);
      this._chart.addListener('changeMarginLeft', this._updateRange, this);
      this._chart.addListener('changeMarginRight', this._updateRange, this);
      this._updateRange();
      this._chart.bind('width', this, 'ticks', {
        converter: function converter(width) {
          return Math.round(width / 80);
        }
      });
      this._axis = this._top ? d3.axisTop(this.getScale()) : d3.axisBottom(this.getScale());
      this._axis.ticks(this.getTicks(), this.getTickFormat());
    },
    members: {
      render: function render() {
        if (this.isShow()) {
          if (!this._element) {
            this._element = this._chart.getSvgElement('g', [this.getType(), 'x', this._top ? 'top' : 'bottom']);
          }
          this._element.call(this._axis);
          this._applyShowLine(this.getShowLine());
          this._applyShowGrid(this.getShowGrid());
          this._updateTransform();
          this._rendered = true;
        } else {
          if (this._element) {
            this._element.remove();
            this._element = null;
          }
          this._rendered = false;
        }
      },
      setRangeOverride: function setRangeOverride(range) {
        if (range) {
          this._chart.removeListener('changeWidth', this._updateRange, this);
          this._chart.removeListener('changeMarginLeft', this._updateRange, this);
          this._chart.removeListener('changeMarginRight', this._updateRange, this);
          this.setRange(range);
        } else {
          this._chart.addListener('changeWidth', this._updateRange, this);
          this._chart.addListener('changeMarginLeft', this._updateRange, this);
          this._chart.addListener('changeMarginRight', this._updateRange, this);
          this._updateRange();
        }
      },
      _updateTransform: function _updateTransform() {
        if (!this._element) {
          return;
        }
        if (this._top) {
          this._element.attr('transform', "translate(0,".concat(this._chart.getMarginTop(), ")"));
        } else {
          this._element.attr('transform', "translate(0,".concat(this._chart.getHeight() - this._chart.getMarginBottom(), ")"));
        }
      },
      _updateRange: function _updateRange() {
        var range = this.getRange();
        var additionalXRangePadding = this._chart.isInBackground() ? 0 : 2;
        var rangeStart = this._chart.getMarginLeft() + additionalXRangePadding;
        var rangeEnd = this._chart.getWidth() - this._chart.getMarginRight() - additionalXRangePadding;
        if (this.getRangeConverter()) {
          var _this$getRangeConvert = this.getRangeConverter()([rangeStart, rangeEnd]);
          var _this$getRangeConvert2 = _slicedToArray(_this$getRangeConvert, 2);
          rangeStart = _this$getRangeConvert2[0];
          rangeEnd = _this$getRangeConvert2[1];
        }
        if (range[0] !== rangeStart || range[1] !== rangeEnd) {
          this.setRange([rangeStart, rangeEnd]);
        }
      },
      _applyShowGrid: function _applyShowGrid(value) {
        if (value) {
          this._chart.addListener('changeHeight', this._updateTickSize, this);
          this._chart.addListener('changeMarginBottom', this._updateTickSize, this);
          this._chart.addListener('changeMarginTop', this._updateTickSize, this);
        } else {
          this._chart.removeListener('changeHeight', this._updateTickSize, this);
          this._chart.removeListener('changeMarginBottom', this._updateTickSize, this);
          this._chart.removeListener('changeMarginTop', this._updateTickSize, this);
        }
        this._updateTickSize();
      },
      _updateTickSize: function _updateTickSize() {
        if (this.getShowGrid()) {
          this._axis.tickSizeInner(-this._chart.getHeight() + this._chart.getMarginBottom() + this._chart.getMarginTop()).tickSizeOuter(0);
        } else {
          // back to default
          this._axis.tickSize(6);
        }
      }
    }
  });
  cv.ui.structure.tile.components.chart.XAxis.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=XAxis.js.map?dt=1782967142222