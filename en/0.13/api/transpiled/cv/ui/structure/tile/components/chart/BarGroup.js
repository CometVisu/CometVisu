function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
  /* BarGroup.js
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
   * Container that renders all datasets of type bar.
   * @ignore(d3)
   */
  qx.Class.define('cv.ui.structure.tile.components.chart.BarGroup', {
    extend: cv.ui.structure.tile.components.chart.AbstractGroup,
    /**
     * @param {cv.ui.structure.tile.components.Chart} chart 
     */
    construct: function construct(chart) {
      cv.ui.structure.tile.components.chart.AbstractGroup.constructor.call(this, chart, 'bar');
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
      _xzScale: null,
      init: function init() {
        cv.ui.structure.tile.components.chart.BarGroup.superclass.prototype.init.call(this);
        this._xBarScale = d3.scaleBand().padding(this.getXPadding());
        this._xzScale = d3.scaleBand().padding(0.05).range([0, this._xBarScale.bandwidth()]);
        this._chart.bind('xAxis.range', this, 'xRange');
        this._chart.overrideXScale = this._xBarScale;
      },
      getBandWidth: function getBandWidth() {
        return this._xzScale.bandwidth();
      },
      _applyXRange: function _applyXRange(value) {
        this._xBarScale.range(value);
        this._xzScale.range([0, this._xBarScale.bandwidth()]);
      },
      _applyXPadding: function _applyXPadding(value) {
        this._xBarScale.padding(value);
      },
      render: function render(transition) {
        var _this = this;
        var yMin = this._chart.getMinYPos();
        this._xzScale.domain(this._chart.data.getKeysDomain());
        var tickSize = this._chart.getXAxis().getTickSize() * 60000;
        if (tickSize > 0) {
          var filledTimes = [];
          var lastTime = 0;
          var _iterator = _createForOfIteratorHelper(this._chart.data.times),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var time = _step.value;
              if (lastTime === 0) {
                filledTimes.push(time);
              } else {
                var diff = time - lastTime;
                var numTicks = Math.floor(diff / tickSize);
                for (var i = 1; i <= numTicks; i++) {
                  filledTimes.push(lastTime + i * tickSize);
                }
              }
              lastTime = time;
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          this._xBarScale.domain(filledTimes);
        } else {
          this._xBarScale.domain(new d3.InternSet(this._chart.data.times));
        }
        this._xzScale.range([0, this._xBarScale.bandwidth()]);
        this._element.selectAll('g').data(this.getData()).join('g').attr('fill', function (p) {
          return cv.util.Color.opacify(_this._datasets.get(p[0]).getColor(), _this._chart.getDatasetOpacity());
        }).selectAll('rect').data(function (d) {
          return d[1].map(function (val) {
            return {
              key: d[0],
              index: val
            };
          });
        }).join('rect').attr('x', function (d) {
          var x = _this._chart.getXPos(d.index);
          var xz = _this._xzScale(d.key);
          return x + xz;
        }).attr('y', function (d) {
          return _this._chart.getYPos(d.index);
        }).attr('width', this._xzScale.bandwidth()).transition(transition).attr('height', function (d) {
          return yMin - _this._chart.getYPos(d.index);
        });
      }
    }
  });
  cv.ui.structure.tile.components.chart.BarGroup.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=BarGroup.js.map?dt=1778272816928