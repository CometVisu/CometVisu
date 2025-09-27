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
