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
  /* AbstractAxis.js
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
  qx.Class.define('cv.ui.structure.tile.components.chart.AbstractAxis', {
    extend: qx.core.Object,
    type: 'abstract',
    /**
     * 
     * @param {cv.ui.structure.tile.components.Chart} chart 
     * @param type
     */
    construct: function construct(chart, type) {
      qx.core.Object.constructor.call(this);
      this._chart = chart;
      this.initType(type);
    },
    properties: {
      type: {
        check: ['axis', 'grid'],
        deferredInit: true
      },
      scale: {
        check: 'Function',
        deferredInit: true,
        event: 'changeScale'
      },
      domain: {
        check: 'Array',
        init: [0, 100],
        apply: '_applyDomain',
        event: 'domainChanged'
      },
      range: {
        check: 'Array',
        init: [0, 100],
        apply: '_applyRange',
        event: 'rangeChanged'
      },
      rangeConverter: {
        check: 'Function',
        nullable: true
      },
      show: {
        check: 'Boolean',
        init: true,
        apply: '_applyShow'
      },
      ticks: {
        check: 'Number',
        init: 5,
        apply: '_applyTicks',
        event: 'ticksChanged'
      },
      tickFormat: {
        check: 'Function',
        nullable: true,
        apply: '_applyTickFormat'
      },
      label: {
        check: 'String',
        init: '',
        apply: '_applyLabel'
      },
      showLine: {
        check: 'Boolean',
        init: true,
        apply: '_applyShowLine'
      },
      showGrid: {
        check: 'Boolean',
        init: false,
        apply: '_applyShowGrid'
      },
      tickSize: {
        check: 'Number',
        init: 0,
        apply: '_applyTickSize'
      }
    },
    members: {
      /**
       * @type {d3.Axis}
       */
      _axis: null,
      /**
       * @type {SVGElement}
       */
      _element: null,
      /**
       * @type {Boolean}
       */
      _rendered: null,
      render: function render() {},
      _applyDomain: function _applyDomain(value, old) {
        // Custom logic for applying domain changes for YAxis
        this.getScale().domain(value);
        if (this._element) {
          this._element.call(this._axis);
        }
      },
      _applyShowLine: function _applyShowLine(value) {
        if (this._element) {
          this._element.select('.domain').style('display', value ? 'block' : 'none');
        }
      },
      _applyShowGrid: function _applyShowGrid(value) {},
      _applyRange: function _applyRange(value, old) {
        // Custom logic for applying range changes for YAxis
        this.getScale().range(value);
        if (this._element) {
          this._element.call(this._axis);
        }
      },
      _applyTickFormat: function _applyTickFormat(value) {
        if (this._axis) {
          this._axis.tickFormat(value);
        }
      },
      _applyTicks: function _applyTicks(value) {
        if (this._axis) {
          this._axis.ticks(value);
        }
      },
      _applyTickSize: function _applyTickSize(value) {
        if (this._axis) {
          this._axis.tickSize(value);
        }
      },
      _applyShow: function _applyShow() {
        this.render();
      }
    },
    destruct: function destruct() {
      this._chart = null;
      this._axis = null;
      if (this._element) {
        this._element.remove();
        this._element = null;
      }
    }
  });
  cv.ui.structure.tile.components.chart.AbstractAxis.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AbstractAxis.js.map?dt=1782967141877