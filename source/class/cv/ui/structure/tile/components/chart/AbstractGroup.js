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
  construct(chart, type) {
    super();
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

    addDataset(dataset) {
      this._datasets.set(dataset.getKey(), dataset);
      this.initDataset(dataset);
    },

    init() { 
      this._element = this._chart.getSvgElement('g', [this.getType()], {
        fill: this.getFill(),
        stroke: this.getStroke(),
        'stroke-linecap': this.getStrokeLinecap(),
        'stroke-linejoin': this.getStrokeLinejoin(),
        'stroke-width': this.getStrokeWidth(),
        'stroke-opacity': this.getStrokeOpacity()
      });
    },
    initDataset(dataset) { },

    hasDataset(src) {
      return this._datasets.has(src);
    },

    getData() {
      const data = new Map();
      for (const ds of this._datasets.values()) {
        const key = ds.getKey();
        data.set(key, this._chart.data.getIndicesForKey(key));
      }
      return data;
    },

    render(transition) {
    },

    getContainer() {
      return this._element;
    },

    _applyFill(value, old) {
      if (this._element) {
        this._element.attr('fill', value);
      }
    },

    _applyStroke(value, old) {
      if (this._element) {
        this._element.attr('stroke', value);
      }
    },

    _applyStrokeLinecap(value, old) {
      if (this._element) {
        this._element.attr('stroke-linecap', value);
      }
    },

    _applyStrokeLinejoin(value, old) {
      if (this._element) {
        this._element.attr('stroke-linejoin', value);
      }
    },

    _applyStrokeWidth(value, old) {
      if (this._element) {
        this._element.attr('stroke-width', value);
      }
    },

    _applyStrokeOpacity(value, old) {
      if (this._element) {
        this._element.attr('stroke-opacity', value);
      }
    },

    _applyDataset(dataset, oldDs) {
    }

  },

  destruct() {
    this._chart = null;
    this._element = null;
  }
});
