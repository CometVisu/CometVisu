/**
 * Container that renders all datasets of type stacked-bar.
 * @ignore(d3)
 */
qx.Class.define('cv.ui.structure.tile.components.chart.StackedBarGroup', {
  extend: cv.ui.structure.tile.components.chart.AbstractGroup,

  /**
   * @param {cv.ui.structure.tile.components.Chart} chart 
   */
  construct(chart) {
    super(chart, 'stacked-bar');
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

    init() {
      super.init();
      this._xBarScale = d3.scaleBand().padding(this.getXPadding());
      this._chart.bind('xAxis.range', this, 'xRange');
      this._chart.overrideXScale = this._xBarScale;

      this._stack = d3.stack().offset(d3.stackOffsetDiverging)
        .value((d, key) => {
          const entry = d[1].get(key);
          return entry ? entry.value : 0;
        });

      this._colorScale = d3.scaleOrdinal();
    },

    initDataset() {
      const keys = this._datasets.keys().toArray();
      this._colorScale.domain(keys)
        .range(keys.map(key => this._datasets.get(key).getColor()));
    },


    getBandWidth() {
      return this._xBarScale.bandwidth();
    },

    _applyXRange(value) {
      this._xBarScale.range(value);
    },

    _applyXPadding(value) {
      this._xBarScale.padding(value);
    },

    render(transition) {
      const keys = d3.union(this._chart.data.keys.filter(key => this._datasets.has(key)));
      if (keys.length === 0) {
        return;
      }
      this._stack.keys(keys);
      const stack = this._stack(d3.index(this._chart.data.data, d => d.time, d => d.key));
      const minY = d3.min(stack, d => d3.min(d, d => d[0]));
      const maxY = d3.max(stack, d => d3.max(d, d => d[1]));
      this._chart.setMinY(minY || null);
      this._chart.setMaxY(maxY || null);
      this._xBarScale.domain(new d3.InternSet(this._chart.data.times));

      this._element
        .selectAll('g')
        .data(stack)
        .join('g')
        .attr('fill', d => cv.util.Color.opacify(this._colorScale(d.key), this._chart.getDatasetOpacity()))
        .selectAll('rect')
        // enter a second time = loop subgroup per subgroup to add all rectangles
        .data((d => d))
        .join('rect')
        .attr('x', d => this._xBarScale(d.data[0]))
        .attr('y', d => this._chart.getYPos(d[1], true))
        .attr('height', d => this._chart.getYPos(d[0], true) - this._chart.getYPos(d[1], true))
        .attr('width', this._xBarScale.bandwidth())
        .transition(transition);
    }
  }
});
