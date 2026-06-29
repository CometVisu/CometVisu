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
  /* YAxis.js
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
  qx.Class.define('cv.ui.structure.tile.components.chart.YAxis', {
    extend: cv.ui.structure.tile.components.chart.AbstractAxis,
    /**
     * 
     * @param {cv.ui.structure.tile.components.Chart} chart 
     * @param type
     * @param right
     */
    construct: function construct(chart) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'axis';
      var right = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      cv.ui.structure.tile.components.chart.AbstractAxis.constructor.call(this, chart, type);
      this.initScale(d3.scaleLinear());
      this._right = right;
      if (this._right) {
        this._chart.addListener('changeMarginRight', this._updateTransform, this);
        this._chart.addListener('changeWidth', this._updateTransform, this);
      } else {
        this._chart.addListener('changeMarginLeft', this._updateTransform, this);
      }
      this._chart.addListener('changeHeight', this._updateRange, this);
      this._chart.addListener('changeMarginTop', this._updateRange, this);
      this._chart.addListener('changeMarginBottom', this._updateRange, this);
      this._updateRange();
      this._chart.bind('height', this, 'ticks', {
        converter: function converter(height) {
          return Math.round(height / 60);
        }
      });
      this._axis = this._right ? d3.axisRight(this.getScale()) : d3.axisLeft(this.getScale());
      this._axis.ticks(this.getTicks(), this.getTickFormat());
    },
    members: {
      _applyDomain: function _applyDomain(domain) {
        cv.ui.structure.tile.components.chart.YAxis.superclass.prototype._applyDomain.call(this, domain);
        if (this.isShow()) {
          var maxValue = this.getTickFormat() ? this.getTickFormat()(domain[1]) : domain[1].toFixed(domain[1] < 1 ? 2 : 1);
          // check if we need more space for the y-axis
          if (maxValue.length >= 2) {
            this._chart.setMarginLeft(maxValue.length * 8);
          }
        }
      },
      render: function render() {
        if (this.isShow()) {
          if (!this._element) {
            this._element = this._chart.getSvgElement('g', [this.getType(), 'y', this.right ? 'right' : 'left']);
          }
          this._updateTransform();
          if (this.getLabel() && this._element.select('text').empty()) {
            this._element.append('text').attr('x', this._right ? this._chart.getWidth() + this._chart.getMarginRight() : -this._chart.getMarginLeft()).attr('y', 10).attr('fill', 'currentColor').attr('text-anchor', 'start').text(this.getLabel());
          }
          this._element.call(this._axis);
          this._applyShowLine(this.getShowLine());
          this._applyShowGrid(this.getShowGrid());
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
          this._chart.removeListener('changeHeight', this._updateRange, this);
          this._chart.removeListener('changeMarginTop', this._updateRange, this);
          this._chart.removeListener('changeMarginBottom', this._updateRange, this);
          this.setRange(range);
        } else {
          this._chart.addListener('changeHeight', this._updateRange, this);
          this._chart.addListener('changeMarginTop', this._updateRange, this);
          this._chart.addListener('changeMarginBottom', this._updateRange, this);
          this._updateRange();
        }
      },
      _updateTransform: function _updateTransform() {
        if (!this._element) {
          return;
        }
        var text = this._element.select('text');
        if (this._right) {
          this._element.attr('transform', "translate(".concat(this._chart.getWidth() - this._chart.getMarginRight(), ",0)"));
          if (!text.empty()) {
            text.attr('x', this._chart.getWidth() + this._chart.getMarginRight());
          }
        } else {
          this._element.attr('transform', "translate(".concat(this._chart.getMarginLeft(), ",0)"));
          if (!text.empty()) {
            text.attr('x', -this._chart.getMarginLeft());
          }
        }
      },
      _updateRange: function _updateRange() {
        var range = this.getRange();
        var rangeStart = this._chart.getHeight() - this._chart.getMarginBottom();
        var rangeEnd = this._chart.getMarginTop();
        if (range[0] !== rangeStart || range[1] !== rangeEnd) {
          this.setRange([rangeStart, rangeEnd]);
        }
      },
      _applyShowGrid: function _applyShowGrid(value) {
        if (value) {
          this._chart.addListener('changeWidth', this._updateTickSize, this);
          this._chart.addListener('changeMarginLeft', this._updateTickSize, this);
          this._chart.addListener('changeMarginRight', this._updateTickSize, this);
        } else {
          this._chart.removeListener('changeWidth', this._updateTickSize, this);
          this._chart.removeListener('changeMarginLeft', this._updateTickSize, this);
          this._chart.removeListener('changeMarginRight', this._updateTickSize, this);
        }
        this._updateTickSize();
      },
      _updateTickSize: function _updateTickSize() {
        if (this.getShowGrid()) {
          this._axis.tickSizeInner(-this._chart.getWidth() + this._chart.getMarginRight() + this._chart.getMarginLeft()).tickSizeOuter(0);
        } else {
          // back to default
          this._axis.tickSize(6);
        }
      }
    }
  });
  cv.ui.structure.tile.components.chart.YAxis.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=YAxis.js.map?dt=1782705771433