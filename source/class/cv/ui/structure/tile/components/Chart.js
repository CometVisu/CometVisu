/* eslint-disable arrow-body-style */
/**
 * Shows an chart.
 * @asset(libs/d3.min.js)
 * @ignore(d3)
 */
qx.Class.define('cv.ui.structure.tile.components.Chart', {
  extend: cv.ui.structure.tile.components.AbstractComponent,
  include: cv.ui.structure.tile.MVisibility,

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    JS_LOADED: new Promise(async (resolve, reject) => {
      const check = () => typeof window.d3 === 'object';
      await cv.util.ScriptLoader.includeScript(qx.util.ResourceManager.getInstance().toUri('libs/d3.min.js'));
      if (!check()) {
        const timer = new qx.event.Timer(50);
        let counter = 0;
        timer.addListener('interval', () => {
          counter++;
          if (check()) {
            resolve(true);
          } else if (counter > 5) {
            reject(new Error('Error loaded d3 library'));
          }
        });
      } else {
        resolve(true);
      }
    }).then(() => {
      if (qx.locale.Manager.getInstance().getLanguage() === 'de') {
        // localize
        d3.formatDefaultLocale({
          'decimal': ',',
          'thousands': '.',
          'grouping': [3],
          'currency': ['€', '']
        });

        d3.timeFormatDefaultLocale({
          'dateTime': '%A, der %e. %B %Y, %X',
          'date': '%d.%m.%Y',
          'time': '%H:%M:%S',
          'periods': [],
          'days': ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
          'shortDays': ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
          'months': ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
          'shortMonths': ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
        });
      }
    }),

    CONFIG: null
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    type: {
      check: ['axis-mixed', 'bar', 'line', 'scatter', 'pie', 'percentage'],
      init: 'line'
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _downloadedImage: null,
    _url: null,
    _headers: null,
    _request: null,
    _chart: null,
    _width: null,
    _height: null,
    _loaded: null,

    _initD3() {
      // set the dimensions and margins of the graph
/*      const margin = {top: 24, right: 24, bottom: 24, left: 24};
      this._width = 392 - margin.left - margin.right;
      this._height = 192 - margin.top - margin.bottom;*/

      // append the svg object to the body of the page
/*      this._chart = d3.select(this._element)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);*/
    },

    async _init() {
      const element = this._element;
      if (element.hasAttribute('type')) {
        this.setType(element.getAttribute('type'));
      }
      await cv.ui.structure.tile.components.Chart.JS_LOADED;
      //this._initD3();
      if (this.isVisible()) {
        this._loadData();
      }
    },

    _applyVisible(value) {
      if (value) {
        this._loadData();
      }
    },

    _loadData() {
      if (this._loaded && (Date.now() - this._loaded) < 300000) {
        // don't reload within 5 minutes
        return;
      }
      const client = cv.io.BackendConnections.getClient();
      let key;
      let url;
      const dataSet = this._element.querySelector(':scope > dataset');
      let ts = {
        showArea: true,
        color: '#FF9900',
        type: 'line',
        start: 'end-1day',
        end: 'now',
        xFormat: '%H:%M',
        xTicks: d3.timeHour.every(4)
      };
      let attr;
      let name;
      let value;
      for (let i = 0; i < dataSet.attributes.length; i++) {
        attr = dataSet.attributes.item(i);
        // CamelCase attribute names
        name = attr.name.split('-')
          .map((part, i) => {
            if (i > 0) {
              return `${part.substring(0, 1).toUpperCase()}${part.substring(1)}`;
            }
            return part;
          })
          .join('');
        value = attr.value;
        if (name === 'series') {
          switch (value) {
            case 'hour':
              ts.xTicks = d3.timeMinute.every(5);
              ts.start = 'end-1' + value;
              break;

            case 'day':
              ts.xTicks = d3.timeHour.every(4);
              ts.start = 'end-1' + value;
              break;

            case 'week':
              ts.xTicks = d3.timeDay.every(1);
              ts.start = 'end-1' + value;
              break;

            case 'month':
              ts.xTicks = d3.timeDay.every(5);
              ts.start = 'end-1' + value;
              break;

            case 'year':
              ts.xTicks = d3.timeDay.every(31);
              ts.start = 'end-1' + value;
              break;
          }
        } else {
          if (value === 'true' || value === 'false') {
            value = value === 'true';
          } else if (/^\d+$/.test(value)) {
            value = parseInt(value);
          } else if (/^[\d.]+$/.test(value)) {
            value = parseFloat(value);
          }
          ts[name] = value;
        }
      }
      let start = new Date();
      start.setTime(start.getTime() - 60*60*24*1000);
      url = client.getResourcePath('charts', {
        src: ts.src,
        start: ts.start,
        end: ts.end
      });
      if (!url) {
        return;
      }
      key = url;
      //url = client.getResourcePath('rrd') + '?rrd=' + encodeURIComponent(ts.src) + '.rrd';
      const xhr = new qx.io.request.Xhr(url);
      client.authorize(xhr);
      xhr.set({
        accept: 'application/json'
      });
      xhr.addListener('success', function(ev) {
        this._onSuccess(ts, key, ev);
      }, this);
      xhr.addListener('statusError', function(ev) {
        this._onStatusError(ts, key, ev);
      }, this);
      xhr.send();
    },

    _onSuccess: function(ts, key, ev) {
      if (!this.isVisible()) {
        return;
      }
      let tsdata = ev.getTarget().getResponse();
      if (tsdata !== null) {
        const client = cv.io.BackendConnections.getClient('main');
        if (client.hasCustomChartsDataProcessor(tsdata)) {
          tsdata = client.processChartsData(tsdata);
        }
        /*const width = this._width;
        const height = this._height;
        // Add X axis --> it is a date format
        const timeBoundaries = d3.extent(tsdata, d => d[0]);
        const x = d3.scaleTime()
          .domain(timeBoundaries)
          .range([ 0, width ]);

        this._chart.append('g')
          .attr('transform', `translate(0, ${height})`)
          .call(d3.axisBottom(x).ticks(ts.xTicks, ts.xFormat));

        // Add Y axis
        let minVal = d3.min(tsdata, d =>  +d[1]);
        if (minVal > 1.0) {
          minVal -= 1;
        }
        const maxVal = d3.max(tsdata, d =>  +d[1]) + 1;
        const y = d3.scaleLinear()
          .domain([minVal, maxVal])
          .range([ height, 0 ])
          .nice();

        const yTicks = y.ticks(5).filter(tick => Number.isInteger(tick));

        this._chart.append('g')
          .call(d3.axisLeft(y).tickValues(yTicks).tickFormat(d3.format('d')));

        // Add the area
        if (ts.showArea) {
          this._chart.append('path')
            .datum(tsdata)
            .attr('fill', ts.color + '30')
            .attr('d', d3.area()
              .x(d => x(d[0]))
              .y0(() => this._height)
              .y1(d => y(d[1]))
            );
        }

        // draw the line
        this._chart.append('path')
          .datum(tsdata)
          .attr('fill', 'none')
          .attr('stroke', ts.color)
          .attr('class', ts.type)
          .attr('d', d3.line()
            .x(d => x(d[0]))
            .y(d => y(d[1]))
          );*/

        let minVal = d3.min(tsdata, d =>  +d[1]);
        if (minVal > 1.0) {
          minVal -= 1;
        }
        const maxVal = d3.max(tsdata, d =>  +d[1]) + 1;

        const format = this._element.hasAttribute('format') ? this._element.getAttribute('format') : '%s' + (ts.unit ? ' ' + ts.unit : '');

        this._chart = this._lineChart(tsdata, {
          color: ts.color,
          title: d => {
            return cv.util.String.sprintf(format, d[1]);
          },
          yLabel: ts.unit,
          xDomain: d3.extent(tsdata, d => d[0]),
          yDomain: [minVal, maxVal],
          xFormat: ts.xFormat,
          showArea: ts.showArea,
          mixBlendMode: 'normal'
        });
        this._loaded = Date.now();
      }
    },

    _onStatusError: function(ts, key, ev) {
      cv.core.notifications.Router.dispatchMessage('cv.charts.error', {
        title: qx.locale.Manager.tr('Communication error'),
        severity: 'urgent',
        message: qx.locale.Manager.tr('URL: %1<br/><br/>Response:</br>%2', JSON.stringify(key), ev._target._transport.responseText)
      });
      this.error('Chart _onStatusError', ts, key, ev);
    },

    /**
     * Copyright 2021 Observable, Inc.
     * Released under the ISC license.
     * https://observablehq.com/@d3/multi-line-chart
     *
     * @param data
     * @param c
     * @private
     */
    _lineChart: function(data, c) {
      if (!cv.ui.structure.tile.components.Chart.CONFIG) {
        cv.ui.structure.tile.components.Chart.CONFIG = {
          x: d => d[0], // given d in data, returns the (temporal) x-value
          y: d => d[1], // given d in data, returns the (quantitative) y-value
          z: () => 1, // given d in data, returns the (categorical) z-value
          title: undefined, // given d in data, returns the title text
          defined: undefined, // for gaps in data
          curve: d3.curveLinear, // method of interpolation between points
          marginTop: 24, // top margin, in pixels
          marginRight: 24, // right margin, in pixels
          marginBottom: 24, // bottom margin, in pixels
          marginLeft: 30, // left margin, in pixels
          width: 392, // outer width, in pixels
          height: 192, // outer height, in pixels
          xType: d3.scaleTime, // type of x-scale
          xDomain: undefined, // [xmin, xmax]
          xRange: undefined, // [left, right]
          yType: d3.scaleLinear, // type of y-scale
          yDomain: undefined, // [ymin, ymax]
          yRange: undefined, // [bottom, top]
          yFormat: undefined, // a format specifier string for the y-axis
          yLabel: undefined, // a label for the y-axis
          zDomain: undefined, // array of z-values
          color: 'currentColor', // stroke color of line, as a constant or a function of *z*
          strokeLinecap: undefined, // stroke line cap of line
          strokeLinejoin: undefined, // stroke line join of line
          strokeWidth: 1.5, // stroke width of line
          strokeOpacity: undefined, // stroke opacity of line
          mixBlendMode: 'multiply', // blend mode of lines
          showArea: false // show area below the line
        };
      }
      const config = Object.assign(cv.ui.structure.tile.components.Chart.CONFIG, c);
      config.xRange = [config.marginLeft, config.width - config.marginRight]; // [left, right]
      config.yRange = [config.height - config.marginBottom, config.marginTop]; // [bottom, top]

      // Compute values.
      const X = d3.map(data, config.x);
      const Y = d3.map(data, config.y);
      const Z = d3.map(data, config.z);
      const O = d3.map(data, d => d);
      if (config.defined === undefined) {
        config.defined = (d, i) => !isNaN(X[i]) && !isNaN(Y[i]);
      }
      //const D = d3.map(data, config.defined);

      // Compute default domains, and unique the z-domain.
      if (config.xDomain === undefined) {
        config.xDomain = d3.extent(X);
      }
      if (config.yDomain === undefined) {
        config.yDomain = [0, d3.max(Y, d => typeof d === 'string' ? +d : d)];
      }
      if (config.zDomain === undefined) {
        config.zDomain = Z;
      }
      config.zDomain = new d3.InternSet(config.zDomain);

      // Omit any data not present in the z-domain.
      const I = d3.range(X.length).filter(i => config.zDomain.has(Z[i]));

      // Construct scales and axes.
      const xScale = config.xType(config.xDomain, config.xRange);
      const yScale = config.yType(config.yDomain, config.yRange);
      const xAxis = d3.axisBottom(xScale).ticks(config.width / 80).tickSizeOuter(0);
      const yAxis = d3.axisLeft(yScale).ticks(config.height / 60, config.yFormat);

      // Compute titles.
      const T = config.title === undefined ? Z : config.title === null ? null : d3.map(data, config.title);


      // Construct a line generator.
      const line = d3.line()
        //.defined(i => D[i])
        .curve(config.curve)
        .x(i => xScale(X[i]))
        .y(i => yScale(Y[i]));

      d3.select(this._element).select('svg').remove();

      //const svg = d3.create('svg')
      const svg = d3.select(this._element)
        .append('svg')
        .attr('width', config.width)
        .attr('height', config.height)
        .attr('viewBox', [0, 0, config.width, config.height])
        .attr('style', 'max-width: 100%; height: auto; height: intrinsic;')
        .style('-webkit-tap-highlight-color', 'transparent')
        .on('pointerenter', pointerentered)
        .on('pointermove', pointermoved)
        .on('pointerleave', pointerleft)
        .on('touchstart', event => event.preventDefault());

      svg.append('g')
        .attr('transform', `translate(0,${config.height - config.marginBottom})`)
        .call(xAxis);

      svg.append('g')
        .attr('transform', `translate(${config.marginLeft},0)`)
        .call(yAxis)
        .call(g => g.select('.domain').remove())
        .call(g => g.append('text')
          .attr('x', -config.marginLeft)
          .attr('y', 10)
          .attr('fill', 'currentColor')
          .attr('text-anchor', 'start')
          .text(config.yLabel));

      const path = svg.append('g')
        .attr('fill', 'none')
        .attr('stroke', typeof config.color === 'string' ? config.color : null)
        .attr('stroke-linecap', config.strokeLinecap)
        .attr('stroke-linejoin', config.strokeLinejoin)
        .attr('stroke-width', config.strokeWidth)
        .attr('stroke-opacity', config.strokeOpacity)
        .selectAll('path')
        .data(d3.group(I, i => Z[i]))
        .join('path')
        .style('mix-blend-mode', config.mixBlendMode)
        .attr('stroke', typeof config.color === 'function' ? ([z]) => config.color(z) : null)
        .attr('d', d => line(d[1]));

      // Add the area
      if (config.showArea) {
        const area = d3.area()
          //.defined(i => D[i])
          .curve(config.curve)
          .x(i => xScale(X[i]))
          .y0(() => config.yRange[0])
          .y1(i => yScale(Y[i]));

        svg.append('g')
          .attr('stroke', 'none')
          .attr('fill', typeof config.color === 'string' ? config.color + '30' : null)
          .selectAll('path')
          .data(d3.group(I, i => Z[i]))
          .join('path')
          .style('mix-blend-mode', config.mixBlendMode)
          .attr('fill', typeof config.color === 'function' ? ([z]) => config.color(z) + '30' : null)
          .attr('d', d => area(d[1]));
      }

      const dot = svg.append('g')
        .attr('display', 'none')
        .attr('fill', 'currentColor');

      dot.append('circle')
        .attr('r', 2.5);

      dot.append('text')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 10)
        .attr('text-anchor', 'middle')
        .attr('y', -8);

      function pointermoved(event) {
        const [xm, ym] = d3.pointer(event);
        const i = d3.least(I, i => Math.hypot(xScale(X[i]) - xm, yScale(Y[i]) - ym)); // closest point
        path.style('stroke', ([z]) => Z[i] === z ? null : '#ddd').filter(([z]) => Z[i] === z).raise();
        dot.attr('transform', `translate(${xScale(X[i])},${yScale(Y[i])})`);
        if (T) {
          dot.select('text').text(T[i]);
        }
        svg.property('value', O[i]).dispatch('input', {bubbles: true});
      }

      function pointerentered() {
        path.style('mix-blend-mode', null).style('stroke', '#ddd');
        dot.attr('display', null);
      }

      function pointerleft() {
        path.style('mix-blend-mode', config.mixBlendMode).style('stroke', null);
        dot.attr('display', 'none');
        svg.node().value = null;
        svg.dispatch('input', {bubbles: true});
      }
      return Object.assign(svg.node(), {value: null});
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    this._chart = null;
  },

  defer(QxClass) {
    customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'chart', class extends QxConnector {
      constructor() {
        super(QxClass);
      }
    });
  }
});
