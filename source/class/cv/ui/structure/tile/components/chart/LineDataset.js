/* LineDataset.js
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

qx.Class.define('cv.ui.structure.tile.components.chart.LineDataset', {
  extend: cv.ui.structure.tile.components.chart.Dataset,

  properties: {
    chartType: {
      refine: true,
      init: 'h-line'
    },
    value: {
        // ['avg', 'min', 'max'] or a fixed value (for h-lines) / time (for v-lines)
        nullable: true
    },
    valueColor: {
        check: 'String',
        init: 'currentColor'
    },
    sourceSet: {
        check: 'cv.ui.structure.tile.components.chart.Dataset',
        nullable: true
    },
    format: {
        check: 'String',
        init: ''
    },
    index: {
        check: 'Number',
        init: 0
    },
    showValue: {
      refine: true,
      init: false
    }
  },

  members: {
    async fetch(start, end, series, offset, options) {
        if (!this.getSourceSet()) {
            return super.fetch(start, end, series, offset, options);
        }
        return null;
    }
  }
});
