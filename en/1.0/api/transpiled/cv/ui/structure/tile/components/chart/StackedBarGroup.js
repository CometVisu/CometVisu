(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.structure.tile.components.chart.AbstractGroup": {
        "construct": true,
        "require": true
      },
      "cv.util.Color": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* StackedBarGroup.js
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
   * Container that renders all datasets of type stacked-bar.
   * @ignore(d3)
   */
  qx.Class.define('cv.ui.structure.tile.components.chart.StackedBarGroup', {
    extend: cv.ui.structure.tile.components.chart.AbstractGroup,
    /**
     * @param {cv.ui.structure.tile.components.Chart} chart 
     */
    construct: function construct(chart) {
      cv.ui.structure.tile.components.chart.AbstractGroup.constructor.call(this, chart, 'stacked-bar');
    },
    properties: {
      xRange: {
        check: 'Array',
        init: [0, 100],
        apply: '_applyXRange'
      },
      xPadding: {
        check: 'Number',
        init: 0.5,
        apply: '_applyXPadding'
      }
    },
    members: {
      _xBarScale: null,
      _stack: null,
      _colorScale: null,
      init: function init() {
        cv.ui.structure.tile.components.chart.StackedBarGroup.superclass.prototype.init.call(this);
        this._xBarScale = d3.scaleBand().padding(this.getXPadding());
        this._chart.bind('xAxis.range', this, 'xRange');
        this._chart.overrideXScale = this._xBarScale;
        this._stack = d3.stack().offset(d3.stackOffsetDiverging).value(function (d, key) {
          var entry = d[1].get(key);
          return entry ? entry.value : 0;
        });
        this._colorScale = d3.scaleOrdinal();
      },
      initDataset: function initDataset() {
        var _this = this;
        var keys = this._datasets.keys().toArray();
        this._colorScale.domain(keys).range(keys.map(function (key) {
          return _this._datasets.get(key).getColor();
        }));
      },
      getBandWidth: function getBandWidth() {
        return this._xBarScale.bandwidth();
      },
      _applyXRange: function _applyXRange(value) {
        this._xBarScale.range(value);
      },
      _applyXPadding: function _applyXPadding(value) {
        this._xBarScale.padding(value);
      },
      render: function render(transition) {
        var _this2 = this;
        var keys = d3.union(this._chart.data.keys.filter(function (key) {
          return _this2._datasets.has(key);
        }));
        if (keys.length === 0) {
          return;
        }
        this._stack.keys(keys);
        var stack = this._stack(d3.index(this._chart.data.data, function (d) {
          return d.time;
        }, function (d) {
          return d.key;
        }));
        var minY = d3.min(stack, function (d) {
          return d3.min(d, function (d) {
            return d[0];
          });
        });
        var maxY = d3.max(stack, function (d) {
          return d3.max(d, function (d) {
            return d[1];
          });
        });
        this._chart.setMinY(minY || null);
        this._chart.setMaxY(maxY || null);
        this._xBarScale.domain(new d3.InternSet(this._chart.data.times));
        this._element.selectAll('g').data(stack).join('g').attr('fill', function (d) {
          return cv.util.Color.opacify(_this2._colorScale(d.key), _this2._chart.getDatasetOpacity());
        }).selectAll('rect')
        // enter a second time = loop subgroup per subgroup to add all rectangles
        .data(function (d) {
          return d;
        }).join('rect').attr('x', function (d) {
          return _this2._xBarScale(d.data[0]);
        }).attr('y', function (d) {
          return _this2._chart.getYPos(d[1], true);
        }).attr('height', function (d) {
          return _this2._chart.getYPos(d[0], true) - _this2._chart.getYPos(d[1], true);
        }).attr('width', this._xBarScale.bandwidth()).transition(transition);
      }
    }
  });
  cv.ui.structure.tile.components.chart.StackedBarGroup.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=StackedBarGroup.js.map?dt=1782705771386