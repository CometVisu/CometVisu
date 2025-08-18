/**
 * Area series component for CometVisu.
 * @ignore(d3)
 */
qx.Class.define('cv.ui.structure.tile.components.chart.AreaGroup', {
  extend: cv.ui.structure.tile.components.chart.AbstractGroup,

  /**
   * @param {cv.ui.structure.tile.components.chart.Dataset} ds
   * @param {cv.ui.structure.tile.components.Chart} chart 
   */
  construct(chart) {
    super(chart, 'area');
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

    init() {
      this._element = this._chart.getSvgElement('g', [this.getType()], {
        fill: cv.util.Color.opacify(this.getFill(), this.getOpacity()),
        stroke: 'none'
      });

      this._areaFunctions = {};
      this._areaFunctions.linear = d3
        .area()
        .curve(d3.curveLinear)
        .x(i => this._chart.getXPos(i))
        .y0(() => this._chart.getMinYPos())
        .y1(i => this._chart.getYPos(i));

      this._chart.getYAxis().addListener('rangeChanged', this.render, this);
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
      }

      if (curveFunction) {
        // Construct a line generator.
        this._areaFunctions[curveName] = d3
          .area()
          .curve(curveFunction)
          .x(i => this._chart.getXPos(i))
          .y0(() => this._chart.getMinYPos())
          .y1(i => this._chart.getYPos(i));
      }
    },

    render(transition) {
      const svg = this._chart.getSvg();
      const data = this.getData();
      this._element
        .selectAll('path')
        .data(data)
        .join(
          enter => enter.append('path')
            .style('mix-blend-mode', this.getMixBlendMode())
            .attr('fill', p => {
              const ds = this._datasets.get(p[0]);
              const color = ds.getColor();
              if (ds.getGradient()) {
                const gradId = `${color.replaceAll(/\W/g, '')}Grad`;
                let lg = svg.select('#' + gradId);
                if (lg.empty()) {
                  const lg = svg.append('defs').append('linearGradient')
                    .attr('id', gradId)
                    .attr('x1', '0%')
                    .attr('x2', '0%')
                    .attr('y1', '0%')
                    .attr('y2', '100%');

                  lg.append('stop')
                    .attr('offset', '0%')
                    .style('stop-color', color)
                    .style('stop-opacity', 0.7);

                  lg.append('stop')
                    .attr('offset', '100%')
                    .style('stop-color', color)
                    .style('stop-opacity', 0);
                }
                return 'url(#' + gradId + ')';
              }
              return cv.util.Color.opacify(color, this.getOpacity());
            })
        )
        .transition(transition)
        .attr('d', d => {
          const curveName = this._datasets.get(d[0]).getCurve();
          const func = this._areaFunctions[curveName] || this._areaFunctions.linear;
          return func(d[1]);
        });
    }
  }
});