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
  /* LineGroup.js
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
   * Container that renders all datasets of type line.
   * @ignore(d3)
   */
  qx.Class.define('cv.ui.structure.tile.components.chart.LineGroup', {
    extend: cv.ui.structure.tile.components.chart.AbstractGroup,
    /**
     * @param {cv.ui.structure.tile.components.Chart} chart 
     */
    construct: function construct(chart) {
      cv.ui.structure.tile.components.chart.AbstractGroup.constructor.call(this, chart, 'line');
    },
    members: {
      _lineFunctions: null,
      init: function init() {
        var _this = this;
        cv.ui.structure.tile.components.chart.LineGroup.superclass.prototype.init.call(this);
        this._lineFunctions = {};
        // Construct the default line generator.
        this._lineFunctions.linear = d3.line().curve(d3.curveLinear).x(function (i) {
          return _this._chart.getXPos(i);
        }).y(function (i) {
          return _this._chart.getYPos(i);
        });
      },
      initDataset: function initDataset(dataset) {
        var _this2 = this;
        var curveName = dataset.getCurve();
        var curveFunction;
        switch (curveName) {
          case 'step':
            curveFunction = d3.curveStep;
            break;
          case 'natural':
            curveFunction = d3.curveNatural;
            break;
          case 'basis':
            curveFunction = d3.curveBasis;
            break;
          case 'linear':
            curveFunction = d3.curveLinear;
            break;
        }
        if (curveFunction) {
          // Construct a line generator.
          this._lineFunctions[curveName] = d3.line().curve(curveFunction).x(function (i) {
            return _this2._chart.getXPos(i);
          }).y(function (i) {
            return _this2._chart.getYPos(i);
          });
        }
      },
      render: function render(transition) {
        var _this3 = this;
        var data = this.getData();
        this._element.selectAll('path').data(data).join(function (enter) {
          return enter.append('path').style('mix-blend-mode', _this3.getMixBlendMode()).attr('stroke', function (p) {
            return cv.util.Color.opacify(_this3._datasets.get(p[0]).getColor(), _this3._chart.getDatasetOpacity());
          });
        }).transition(transition).attr('d', function (d) {
          var curveName = _this3._datasets.get(d[0]).getCurve();
          var func = _this3._lineFunctions[curveName] || _this3._lineFunctions.linear;
          var val = func(d[1]);
          return val;
        });
      }
    }
  });
  cv.ui.structure.tile.components.chart.LineGroup.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=LineGroup.js.map?dt=1782967142181