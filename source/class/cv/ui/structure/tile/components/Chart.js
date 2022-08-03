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
          'periods': ['AM', 'PM'],
          'days': ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
          'shortDays': ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
          'months': ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
          'shortMonths': ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
        });
      }
    })
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
      const margin = {top: 24, right: 24, bottom: 24, left: 24};
      const width = this._width = 392 - margin.left - margin.right;
      const height = this._height = 192 - margin.top - margin.bottom;

      // append the svg object to the body of the page
      this._chart = d3.select(this._element)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);
    },

    async _init() {
      const element = this._element;
      if (element.hasAttribute('type')) {
        this.setType(element.getAttribute('type'));
      }
      await cv.ui.structure.tile.components.Chart.JS_LOADED;
      this._initD3();
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
      let tsdata = ev.getTarget().getResponse();
      if (tsdata !== null) {
        const client = cv.io.BackendConnections.getClient('main');
        if (client.hasCustomChartsDataProcessor(tsdata)) {
          tsdata = client.processChartsData(tsdata);
        }
        const width = this._width;
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
          );
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
