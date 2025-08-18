/**
 * Container that renders all datasets of type bar.
 * @ignore(d3)
 */
qx.Class.define('cv.ui.structure.tile.components.chart.BarGroup', {
  extend: cv.ui.structure.tile.components.chart.AbstractGroup,

  /**
   * @param {cv.ui.structure.tile.components.Chart} chart 
   */
  construct(chart) {
    super(chart, 'bar');
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

    init() {      
      super.init();
      this._xBarScale = d3.scaleBand().padding(this.getXPadding());
      this._xzScale = d3.scaleBand().padding(0.05).range([0, this._xBarScale.bandwidth()]);
      this._chart.bind('xAxis.range', this, 'xRange');
      this._chart.overrideXScale = this._xBarScale;
    },

    getBandWidth() {
      return this._xzScale.bandwidth();
    },

    _applyXRange(value) {
      this._xBarScale.range(value);
      this._xzScale.range([0, this._xBarScale.bandwidth()]);
    },

    _applyXPadding(value) {
      this._xBarScale.padding(value);
    },

    render(transition) {
      const yMin = this._chart.getMinYPos();

      this._xzScale.domain(this._chart.data.getKeysDomain());
      const tickSize = this._chart.getXAxis().getTickSize() * 60000;
      if (tickSize > 0) {
        const filledTimes = [];
        let lastTime = 0;
        for (const time of this._chart.data.times) {
          if (lastTime === 0) {
            filledTimes.push(time);
          } else {
            const diff = time - lastTime;
            const numTicks = Math.floor(diff / tickSize);
            for (let i = 1; i <= numTicks; i++) {
              filledTimes.push(lastTime + i * tickSize);
            }
          }
          lastTime = time;
        }
        this._xBarScale.domain(filledTimes);
      } else {
        this._xBarScale.domain(new d3.InternSet(this._chart.data.times));
      } 
      this._xzScale.range([0, this._xBarScale.bandwidth()]);

      const xLabelOffset = 0;// (this._chartConf.xz.bandwidth() - config.xPadding)/2;
      this._element
        .selectAll('g')
        .data(this.getData())
        .join('g')
        .attr('fill', p => cv.util.Color.opacify(this._datasets.get(p[0]).getColor(), this._chart.getDatasetOpacity()))
        .selectAll('rect')
        .data(d => {
          return d[1].map(val => {
            return {
              key: d[0],
              index: val
            };
          });
        })
        .join('rect')
        .attr('x', (d) => {
          const x = this._chart.getXPos(d.index);
          const xz = this._xzScale(d.key);
          return x + xz;
        })
        .attr('y', d => this._chart.getYPos(d.index))
        .attr('width', this._xzScale.bandwidth())
        .transition(transition)
        .attr('height', d => yMin - this._chart.getYPos(d.index));
    }
  }
});