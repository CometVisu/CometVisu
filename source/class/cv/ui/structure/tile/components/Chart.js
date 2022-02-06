/* eslint-disable arrow-body-style */
/**
 * Shows an chart.
 * @asset(libs/d3.min.js)
 * @ignore(d3)
 */
qx.Class.define('cv.ui.structure.tile.components.Chart', {
  extend: cv.ui.structure.tile.components.AbstractComponent,

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    CSS_LOADED: false
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
    _refreshTimer: null,
    _downloadedImage: null,
    _url: null,
    _headers: null,
    _request: null,
    _chart: null,
    _width: null,
    _height: null,

    async _init() {
      const element = this._element;
      if (element.hasAttribute('type')) {
        this.setType(element.getAttribute('type'));
      }
      if (!cv.ui.structure.tile.components.Chart.CSS_LOADED) {
        await cv.util.ScriptLoader.includeScript(qx.util.ResourceManager.getInstance().toUri('libs/d3.min.js'));
        cv.ui.structure.tile.components.Chart.CSS_LOADED = true;
      }

      // set the dimensions and margins of the graph
      const margin = {top: 24, right: 24, bottom: 24, left: 24};
      const width = this._width = 392 - margin.left - margin.right;
      const height = this._height = 192 - margin.top - margin.bottom;

      // append the svg object to the body of the page
      this._chart = d3.select(element)
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

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

      this._loadData();
    },

    _loadData() {
      const client = cv.TemplateEngine.getInstance().visu;
      let key;
      let url;
      let ts = {
        src: 'Temperature_FF_Living'
      };
      let start = new Date();
      start.setTime(start.getTime() - 60*60*24*1000);
      url = client.getResourcePath('charts', {
        src: ts.src,
        start: 'end-1day',
        end: 'now'
      });
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
        const client = cv.TemplateEngine.getClient('main');
        if (client.hasCustomChartsDataProcessor(tsdata)) {
          tsdata = client.processChartsData(tsdata);
        }
        const width = this._width;
        const height = this._height;
        // Add X axis --> it is a date format
        const x = d3.scaleTime()
          .domain(d3.extent(tsdata, d => d[0]))
          .range([ 0, width ]);

        this._chart.append('g')
          .attr('transform', `translate(0, ${height})`)
          .call(d3.axisBottom(x));

        // Add Y axis
        const y = d3.scaleLinear()
          .domain([d3.min(tsdata, d =>  +d[1]) - 1, d3.max(tsdata, d =>  +d[1]) + 1])
          .range([ height, 0 ]);

        this._chart.append('g')
          .call(d3.axisLeft(y).ticks(5));

        // Add the area
        this._chart.append('path')
          .datum(tsdata)
          .attr('fill', 'rgba(105,179,162,0.2)')
          .attr('stroke-width', 1.5)
          .attr('d', d3.area()
            .x(d => x(d[0]))
            .y0(() => this._height)
            .y1(d => y(d[1]))
          );

        // draw the line
        this._chart.append('path')
          .datum(tsdata)
          .attr('fill', 'none')
          .attr('stroke', 'rgb(105,179,162)')
          .attr('class', 'line')
          .attr('d', d3.line()
            .x(d => x(d[0]))
            .y(d => y(d[1]))
          );
      }
    },

    _onStatusError: function(ts, key, ev) {
      cv.core.notifications.Router.dispatchMessage('cv.charts.error', {
        title: qx.locale.Manager.tr('Chart communication error'),
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
