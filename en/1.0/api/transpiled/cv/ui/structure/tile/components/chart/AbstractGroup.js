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
      "qx.core.Object": {
        "construct": true,
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* AbstractGroup.js
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
   * Base class for all chart series types.
   * @ignore(d3)
   */
  qx.Class.define('cv.ui.structure.tile.components.chart.AbstractGroup', {
    extend: qx.core.Object,
    type: 'abstract',
    /**
     * @param {cv.ui.structure.tile.components.Chart} chart 
     * @param type
     */
    construct: function construct(chart, type) {
      qx.core.Object.constructor.call(this);
      this._chart = chart;
      this._datasets = new Map();
      this.initType(type);
      this.init();
    },
    properties: {
      type: {
        check: 'String',
        deferredInit: true
      },
      stroke: {
        check: 'String',
        init: 'none',
        apply: '_applyStroke'
      },
      /**
      * Stroke linecap style
      */
      strokeLinecap: {
        check: ['butt', 'round', 'square'],
        init: 'round',
        apply: '_applyStrokeLinecap'
      },
      /**
       * Stroke linejoin style
       */
      strokeLinejoin: {
        check: ['miter', 'round', 'bevel'],
        init: 'round',
        apply: '_applyStrokeLinejoin'
      },
      /**
       * Stroke width
       */
      strokeWidth: {
        check: 'Number',
        init: 1.5,
        apply: '_applyStrokeWidth'
      },
      /**
       * Stroke opacity
       */
      strokeOpacity: {
        check: 'Number',
        init: 1,
        apply: '_applyStrokeOpacity'
      },
      fill: {
        check: 'String',
        init: 'none',
        apply: '_applyFill'
      },
      mixBlendMode: {
        check: ['normal', 'multiply', 'screen', 'overlay'],
        init: 'normal'
      }
    },
    members: {
      _chart: null,
      _element: null,
      _datasets: null,
      addDataset: function addDataset(dataset) {
        this._datasets.set(dataset.getKey(), dataset);
        this.initDataset(dataset);
      },
      init: function init() {
        this._element = this._chart.getSvgElement('g', [this.getType()], {
          fill: this.getFill(),
          stroke: this.getStroke(),
          'stroke-linecap': this.getStrokeLinecap(),
          'stroke-linejoin': this.getStrokeLinejoin(),
          'stroke-width': this.getStrokeWidth(),
          'stroke-opacity': this.getStrokeOpacity()
        });
      },
      initDataset: function initDataset(dataset) {},
      hasDataset: function hasDataset(src) {
        return this._datasets.has(src);
      },
      getData: function getData() {
        var data = new Map();
        var _iterator = _createForOfIteratorHelper(this._datasets.values()),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var ds = _step.value;
            var key = ds.getKey();
            data.set(key, this._chart.data.getIndicesForKey(key));
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        return data;
      },
      render: function render(transition) {},
      getContainer: function getContainer() {
        return this._element;
      },
      _applyFill: function _applyFill(value, old) {
        if (this._element) {
          this._element.attr('fill', value);
        }
      },
      _applyStroke: function _applyStroke(value, old) {
        if (this._element) {
          this._element.attr('stroke', value);
        }
      },
      _applyStrokeLinecap: function _applyStrokeLinecap(value, old) {
        if (this._element) {
          this._element.attr('stroke-linecap', value);
        }
      },
      _applyStrokeLinejoin: function _applyStrokeLinejoin(value, old) {
        if (this._element) {
          this._element.attr('stroke-linejoin', value);
        }
      },
      _applyStrokeWidth: function _applyStrokeWidth(value, old) {
        if (this._element) {
          this._element.attr('stroke-width', value);
        }
      },
      _applyStrokeOpacity: function _applyStrokeOpacity(value, old) {
        if (this._element) {
          this._element.attr('stroke-opacity', value);
        }
      },
      _applyDataset: function _applyDataset(dataset, oldDs) {}
    },
    destruct: function destruct() {
      this._chart = null;
      this._element = null;
    }
  });
  cv.ui.structure.tile.components.chart.AbstractGroup.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AbstractGroup.js.map?dt=1782705771211