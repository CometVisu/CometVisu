/**
 * @ignore(d3)
 */
qx.Class.define('cv.ui.structure.tile.components.chart.AbstractAxis', {
  extend: qx.core.Object,
  type: 'abstract',

  /**
   * 
   * @param {cv.ui.structure.tile.components.Chart} chart 
   */
  construct(chart, type) {
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

    render() { },

    _applyDomain(value, old) {
      // Custom logic for applying domain changes for YAxis
      this.getScale().domain(value);
      if (this._element) {
        this._element.call(this._axis);
      }
    },

    _applyShowLine(value) {
      if (this._element) {
        this._element.select('.domain').style('display', value ? 'block' : 'none');
      }
    },

    _applyShowGrid(value) {},

    _applyRange(value, old) {
      // Custom logic for applying range changes for YAxis
      this.getScale().range(value);
      if (this._element) {
        this._element.call(this._axis);
      }
    },

    _applyTickFormat(value) {
      if (this._axis) {
        this._axis.tickFormat(value);
      }
    },

    _applyTicks(value) {
      if (this._axis) {
        this._axis.ticks(value);
      }
    },

    _applyTickSize(value) {
      if (this._axis) {
        this._axis.tickSize(value);
      }
    },  

    _applyShow() {
      this.render();
    }
  },

  destruct() {
    this._chart = null;
    this._axis = null;
    if (this._element) {
      this._element.remove();
      this._element = null;
    }
  }
});