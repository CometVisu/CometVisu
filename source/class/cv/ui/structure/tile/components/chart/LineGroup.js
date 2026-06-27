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
  construct(chart) {
    super(chart, 'line');    
  },

  members: {
    _lineFunctions: null,

    init() {
      super.init();
      this._lineFunctions = {};
      // Construct the default line generator.
      this._lineFunctions.linear = d3
        .line()
        .curve(d3.curveLinear)
        .x(i => this._chart.getXPos(i))
        .y(i => this._chart.getYPos(i));
    },

    initDataset(dataset) {
      const curveName = dataset.getCurve();
      let curveFunction;
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
        this._lineFunctions[curveName] = d3
          .line()
          .curve(curveFunction)
          .x(i => this._chart.getXPos(i))
          .y(i => this._chart.getYPos(i));
      }
    },

    render(transition) {
      const data = this.getData();
      this._element.selectAll('path')
        .data(data)
        .join(
          enter => enter.append('path')
            .style('mix-blend-mode', this.getMixBlendMode())
            .attr('stroke', p => cv.util.Color.opacify(this._datasets.get(p[0]).getColor(), this._chart.getDatasetOpacity()))
        )
        .transition(transition)
        .attr('d', d => {
          const curveName = this._datasets.get(d[0]).getCurve();
          const func = this._lineFunctions[curveName] || this._lineFunctions.linear;
          const val = func(d[1]);
          return val;
        });
    }
  }
});
