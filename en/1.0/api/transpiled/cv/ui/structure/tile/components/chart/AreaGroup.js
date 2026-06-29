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
  /* AreaGroup.js
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
   * Area series component for CometVisu.
   * @ignore(d3)
   */
  qx.Class.define('cv.ui.structure.tile.components.chart.AreaGroup', {
    extend: cv.ui.structure.tile.components.chart.AbstractGroup,
    /**
     * @param {cv.ui.structure.tile.components.Chart} chart 
     */
    construct: function construct(chart) {
      cv.ui.structure.tile.components.chart.AbstractGroup.constructor.call(this, chart, 'area');
    },
    properties: {
      /**
       * Opacity of the area series in %.
       */
      opacity: {
        // Area opacity in percent
        check: 'Number',
        init: 20
      }
    },
    members: {
      _areaFunctions: null,
      init: function init() {
        var _this = this;
        this._element = this._chart.getSvgElement('g', [this.getType()], {
          fill: cv.util.Color.opacify(this.getFill(), this.getOpacity()),
          stroke: 'none'
        });
        this._areaFunctions = {};
        this._areaFunctions.linear = d3.area().curve(d3.curveLinear).x(function (i) {
          return _this._chart.getXPos(i);
        }).y0(function () {
          return _this._chart.getMinYPos();
        }).y1(function (i) {
          return _this._chart.getYPos(i);
        });
        this._chart.getYAxis().addListener('rangeChanged', this.render, this);
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
          this._areaFunctions[curveName] = d3.area().curve(curveFunction).x(function (i) {
            return _this2._chart.getXPos(i);
          }).y0(function () {
            return _this2._chart.getMinYPos();
          }).y1(function (i) {
            return _this2._chart.getYPos(i);
          });
        }
      },
      render: function render(transition) {
        var _this3 = this;
        var svg = this._chart.getSvg();
        var data = this.getData();
        this._element.selectAll('path').data(data).join(function (enter) {
          return enter.append('path').style('mix-blend-mode', _this3.getMixBlendMode()).attr('fill', function (p) {
            var ds = _this3._datasets.get(p[0]);
            var color = ds.getColor();
            if (ds.getGradient()) {
              var gradId = "".concat(color.replaceAll(/\W/g, ''), "Grad");
              var lg = svg.select('#' + gradId);
              if (lg.empty()) {
                var _lg = svg.append('defs').append('linearGradient').attr('id', gradId).attr('x1', '0%').attr('x2', '0%').attr('y1', '0%').attr('y2', '100%');
                _lg.append('stop').attr('offset', '0%').style('stop-color', color).style('stop-opacity', 0.7);
                _lg.append('stop').attr('offset', '100%').style('stop-color', color).style('stop-opacity', 0);
              }
              return 'url(#' + gradId + ')';
            }
            return cv.util.Color.opacify(color, _this3.getOpacity());
          });
        }).transition(transition).attr('d', function (d) {
          var curveName = _this3._datasets.get(d[0]).getCurve();
          var func = _this3._areaFunctions[curveName] || _this3._areaFunctions.linear;
          return func(d[1]);
        });
      }
    }
  });
  cv.ui.structure.tile.components.chart.AreaGroup.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AreaGroup.js.map?dt=1782705771227