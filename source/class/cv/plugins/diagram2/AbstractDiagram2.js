/* AbstractDiagram2.js
 *
 * copyright (c) 2010-2026, Christian Mayer and the CometVisu contributors.
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
 * Diagrams drawn with d3, the successor of the flot based diagram plugin.
 *
 * The configuration is the one of the old plugin, only the widget names differ, so that both
 * can be used side by side while this one is being completed.
 *
 * <h4>widgets:</h4>
 * <ul>
 *   <li>diagram2</li>
 *   <li>diagram2_info</li>
 * </ul>
 *
 * <h4>attributes (per diagram):</h4>
 * <ul>
 *   <li>series:               optional, "hour", "day" (default), "week", "month", "year"</li>
 *   <li>period:               optional, number of "series" to be shown</li>
 *   <li>refresh:              optional, refresh-rate in seconds, no refresh if missing</li>
 *   <li>gridcolor:            optional, color for dataline and grid, HTML-colorcode</li>
 *   <li>gridwidth:            optional, stroke width of grid lines, axes and ticks, default 1</li>
 *   <li>gridopacity:          optional, how solid the grid lines are, 0 to 1, default 0.4</li>
 *   <li>borderwidth:          optional, stroke width of the frame around the plot, default 1</li>
 *   <li>linewidth:            optional, stroke width of the graphs, 1.5 for lines and 1 for
 *                             bar and point outlines when not set</li>
 *   <li>width, height:        optional, width and height of "inline"-diagram</li>
 *   <li>previewlabels:        optional, show labels on "inline"-diagram</li>
 *   <li>popup:                optional, make diagram clickable and open popup</li>
 *   <li>legend:               optional, "none", "both", "inline", "popup" select display of legend</li>
 *   <li>title:                optional, diagram title (overrides label-content)</li>
 * </ul>
 *
 * <h4>attributes (per graph):</h4>
 * <ul>
 *   <li>style:                optional, "lines" (default), "bars", "points" select graph type</li>
 *   <li>fill:                 optional, true or false - fill the space under the line / within the bar</li>
 *   <li>barWidth:             optional, width of bars in milliseconds (bar style graphs)</li>
 *   <li>align:                optional, "left", "center" (default), "right" alignment of bars</li>
 * </ul>
 *
 * @ignore(d3)
 */
qx.Class.define('cv.plugins.diagram2.AbstractDiagram2', {
  extend: cv.ui.structure.pure.AbstractWidget,
  include: [cv.ui.common.Operate, cv.ui.common.Refresh],
  type: 'abstract',

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    /**
     * The designs give the diagram its box through the class of the old widget, e.g.
     * ".widget.diagram { white-space: nowrap }" - without it the widget stays at the default
     * width of 320 pixels. The parser asks this class, because parse() hands it in as the handler.
     * @param type {String} widget type, diagram2 or diagram2_info
     * @return {String} classes of the widget element
     */
    getDefaultClasses(type) {
      const legacy = type === 'diagram2_info' ? ' diagram_info' : ' diagram';

      return cv.parser.pure.WidgetParser.getDefaultClasses(type) + legacy;
    },

    /**
     * Parses the widgets XML configuration and extracts the given information
     * to a simple key/value map.
     * @param xml {Element} XML-Element
     * @param path {String} internal path of the widget
     * @param flavour {String} Flavour of the widget
     * @param pageType {String} Page type (2d, 3d, ...)
     * @param mappings {Map?} additional attribute to property mappings of the widget
     */
    parse(xml, path, flavour, pageType, mappings) {
      if (mappings) {
        mappings = Object.assign(mappings, this.getAttributeToPropertyMappings());
      } else {
        mappings = this.getAttributeToPropertyMappings();
      }
      cv.parser.pure.WidgetParser.parseElement(this, xml, path, flavour, pageType, mappings);

      cv.parser.pure.WidgetParser.parseRefresh(xml, path);

      const legend = xml.getAttribute('legend') || 'both';
      return cv.data.Model.getInstance().setWidgetData(path, {
        content: this.getDiagramElements(xml),
        legendInline: ['both', 'inline'].indexOf(legend) >= 0,
        legendPopup: ['both', 'popup'].indexOf(legend) >= 0
      });
    },

    /**
     * A number out of the configuration: the value the attribute names, the given default when it
     * is missing, is not a number, is negative or lies above the allowed maximum.
     * @param value {String|null} attribute value
     * @param fallback {Number|null} default of this attribute
     * @param max {Number?} highest allowed value, unbounded when not given
     * @return {Number|null}
     */
    numberAttribute(value, fallback, max) {
      const number = parseFloat(value);
      const allowed = Number.isFinite(number) && number >= 0 && (max === undefined || number <= max);

      return allowed ? number : fallback;
    },

    getAttributeToPropertyMappings() {
      return {
        series: { default: 'day' },
        seriesStart: { default: 'end-month' },
        seriesEnd: { default: 'now' },
        seriesResolution: { default: 300, transform: parseInt },
        period: { default: 1, transform: parseInt },
        legendposition: { default: 'ne' },
        timeformat: {},
        timeformatTooltip: { default: '%d.%m.%Y %H:%M' },
        zoomYAxis: {
          transform(value) {
            return value === 'true';
          }
        },

        title: { target: 'title' },
        refresh: {},
        gridcolor: { default: '#81664B' },
        gridwidth: {
          transform(value) {
            const plot = cv.plugins.diagram2.Plot;

            return cv.plugins.diagram2.AbstractDiagram2.numberAttribute(value, plot.GRID_WIDTH);
          }
        },

        gridopacity: {
          transform(value) {
            const plot = cv.plugins.diagram2.Plot;

            return cv.plugins.diagram2.AbstractDiagram2.numberAttribute(value, plot.GRID_OPACITY, 1);
          }
        },

        borderwidth: {
          transform(value) {
            const plot = cv.plugins.diagram2.Plot;

            return cv.plugins.diagram2.AbstractDiagram2.numberAttribute(value, plot.BORDER_WIDTH);
          }
        },

        linewidth: {
          transform(value) {
            // without a value the plot keeps its own defaults, they differ by shape
            return cv.plugins.diagram2.AbstractDiagram2.numberAttribute(value, null);
          }
        },
        previewlabels: {
          transform(value) {
            return value === 'true';
          }
        },

        popup: {
          transform(value) {
            return value === 'true';
          }
        },

        tooltip: {
          transform(value) {
            return value === 'true';
          }
        }
      };
    },

    /**
     * Reads the axes and the data sets out of the widgets XML.
     * @param xmlElement {Element} XML-Element of the widget
     * @return {Map} axes and time series of this diagram
     */
    getDiagramElements(xmlElement) {
      const retVal = {
        axes: [],
        axesnum: 0,
        ts: [],
        tsnum: 0
      };

      const axesNameIndex = {};

      xmlElement.querySelectorAll('axis').forEach(function (elem) {
        retVal.axes[retVal.axesnum] = {
          axisLabel: elem.getAttribute('label') || null,
          position: elem.getAttribute('position') || 'left',
          min: elem.getAttribute('min'),
          max: elem.getAttribute('max'),
          unit: elem.getAttribute('unit') || '',
          decimals: elem.getAttribute('decimals')
        };

        retVal.axesnum++;
        axesNameIndex[elem.textContent] = retVal.axesnum;
      }, this);

      // each backend gets the default of its own vocabulary
      const defaultCFunc = { influx: 'MEAN' };

      // old configurations use <rrd> for openHAB items as well, they are read from its persistence
      let clientType = null;
      const client = cv.io.BackendConnections.getClient();
      if (client && client.getType) {
        clientType = client.getType();
      }

      xmlElement.querySelectorAll('demo,rrd,influx,openhab').forEach(function (elem) {
        // influx names its data in an attribute, the others carry it as content - and accept the
        // attribute as well, the way the data sets of the tile structure are written
        const src = (elem.getAttribute('measurement') || elem.textContent || '').trim();
        const steps = (elem.getAttribute('steps') || 'false') === 'true';
        const fillMissing = elem.getAttribute('fillMissing');
        retVal.ts[retVal.tsnum] = {
          tsType: elem.tagName === 'rrd' && clientType === 'openhab' ? 'openhab' : elem.tagName,
          src: src,
          // the connection to read the history from, the default one when not set
          backend: elem.getAttribute('backend'),
          color: elem.getAttribute('color'),
          label: elem.getAttribute('label') || src,
          axisIndex: axesNameIndex[elem.getAttribute('yaxis')] || 1,
          steps: steps,
          fill: (elem.getAttribute('fill') || 'false') === 'true',
          scaling: parseFloat(elem.getAttribute('scaling')) || 1.0,
          cFunc: elem.getAttribute('consolidationFunction') || defaultCFunc[elem.tagName] || 'AVERAGE',
          fillTs: fillMissing === null ? (steps ? 'previous' : 'linear') : fillMissing,
          resol: parseInt(elem.getAttribute('resolution')),
          offset: parseInt(elem.getAttribute('offset')),
          style: elem.getAttribute('style') || 'lines',
          align: elem.getAttribute('align') || 'center',
          barWidth: elem.getAttribute('barWidth') || 1
        };

        if (elem.tagName === 'influx') {
          retVal.ts[retVal.tsnum].filter = this.getInfluxFilter(elem, 'AND');
          retVal.ts[retVal.tsnum].field = elem.getAttribute('field');
          retVal.ts[retVal.tsnum].authentication = elem.getAttribute('authentication');
        } else if (elem.tagName === 'rrd') {
          // an rrd file holds several data sources per row, this one picks the column
          let dsIndex = parseInt(elem.getAttribute('datasourceIndex'));
          if (!Number.isFinite(dsIndex) || dsIndex < 0) {
            dsIndex = 0;
          }
          retVal.ts[retVal.tsnum].dsIndex = dsIndex;
        }

        retVal.tsnum++;
      }, this);

      return retVal;
    },

    /**
     * Walks the filter elements of an influx data set and builds the query out of them.
     * @param elem {Element} element holding the filter children
     * @param type {String} how the children are joined, AND or OR
     * @return {String}
     */
    getInfluxFilter(elem, type) {
      const children = elem.children;
      let retval = '';

      for (let i = 0; i < children.length; i++) {
        const child = children[i];

        if (retval !== '') {
          retval += ' ' + type + ' ';
        }

        switch (child.tagName) {
          case 'and':
            retval += this.getInfluxFilter(child, 'AND');
            break;

          case 'or':
            retval += this.getInfluxFilter(child, 'OR');
            break;

          case 'tag':
            retval +=
              child.getAttribute('key') +
              ' ' +
              child.getAttribute('operator') +
              ' \'' +
              child.getAttribute('value') +
              '\'';
            break;

          default:
          // ignore unknown
        }
      }

      if (type) {
        return '(' + retval + ')';
      }

      return retval;
    },

    /**
     * The time series source of a data set. It is created once and kept on the data set.
     * @param ts {Map} data set configuration
     * @return {cv.io.timeseries.AbstractTimeSeriesSource|null}
     */
    getTimeSeriesSource(ts) {
      if (!ts.source) {
        switch (ts.tsType) {
          case 'demo':
            // the demo data always comes from the mockup client, it has no backend of its own
            ts.source = new cv.io.timeseries.DemoSource('demo://' + ts.src);
            break;

          case 'openhab': {
            const backend = ts.backend ? ts.backend + '@' : '';
            ts.source = new cv.io.timeseries.OpenhabPersistenceSource('openhab://' + backend + ts.src);
            break;
          }

          case 'influx': {
            const backend = ts.backend ? ts.backend + '@' : '';
            ts.source = new cv.io.timeseries.FluxSource('influx://' + backend + ts.src);
            if (ts.source.isInline()) {
              ts.source.setQueryTemplate(ts.filter);
            }
            break;
          }

          default:
            // rrd has no source class that can ask for a time range, fetchSeries builds its url
            return null;
        }
      }

      return ts.source;
    },

    /**
     * Retrieves the values of one data set. Sources that fetch on their own are asked directly,
     * the others through a request built by them.
     * @param ts {Map} data set configuration
     * @param settings {Map} start, end and resolution of the series
     * @param series {String} name of the series, e.g. "day"
     * @param period {Number} number of series shown
     * @param res {Number} resolution in seconds
     * @param refresh {Number} how long a response may be reused, in seconds
     * @param force {Boolean} ignore what has been cached
     * @return {Promise} resolves with the [timestamp, value] pairs
     */
    fetchSeries(ts, settings, series, period, res, refresh, force) {
      const source = this.getTimeSeriesSource(ts);
      if (!source) {
        if (ts.tsType === 'rrd') {
          return this.fetchRrd(ts, settings, res, refresh, force);
        }

        return Promise.reject(new Error('unknown chart data source type ' + ts.tsType));
      }

      if (typeof source.setHistoryOptions === 'function') {
        source.setHistoryOptions({
          aggregate: ts.cFunc,
          fill: ts.fillTs,
          // res is the resolution in seconds, either from the data set or from the series
          step: Number.isFinite(res) && res > 0 ? res * 1000 : undefined
        });
      }

      const config = source.getRequestConfig(settings.start, settings.end, series, period);
      if (config.fetch === false) {
        // this source retrieves the data itself, there is no url to request
        return source
          .fetchData(settings.start, settings.end, series, period)
          .then(data => source.processResponse(data) || []);
      }

      if (config.url) {
        const options = Object.assign({ ttl: force ? 0 : refresh }, config.options);

        return cv.io.Fetch.cachedFetch(config.url, options, config.proxy, cv.io.BackendConnections.getClient()).then(
          data => source.processResponse(data) || []
        );
      }

      return Promise.resolve([]);
    },

    /**
     * Reads an rrd file. There is no source class for it - the one in cv.io.timeseries pages
     * through single periods instead of asking for a range - so the url is built the way the flot
     * based plugin does it: the charts resource of the backend when it offers one, the rrdfetch
     * endpoint otherwise.
     * @param ts {Map} data set configuration
     * @param settings {Map} start, end and resolution of the series
     * @param res {Number} resolution in seconds
     * @param refresh {Number} how long a response may be reused, in seconds
     * @param force {Boolean} ignore what has been cached
     * @return {Promise}
     */
    fetchRrd(ts, settings, res, refresh, force) {
      const client = cv.io.BackendConnections.getClient();
      if (!client) {
        return Promise.reject(new Error('no backend connection for the rrd data'));
      }

      const charts = client.getResourcePath('charts', {
        src: ts.src,
        start: settings.start,
        end: settings.end
      });

      let url;
      if (charts !== null && charts !== undefined && charts !== '') {
        // some backends serve the data themselves, e.g. the persistence of openHAB
        url = charts;
      } else {
        url =
          client.getResourcePath('rrd') +
          '?rrd=' +
          encodeURIComponent(ts.src) +
          '.rrd&ds=' +
          encodeURIComponent(ts.cFunc) +
          // start and end are not encoded here: rrd wants the "+" in plain text
          '&start=' +
          settings.start +
          '&end=' +
          settings.end +
          '&res=' +
          encodeURIComponent(res) +
          (ts.fillTs ? '&fill=' + encodeURIComponent(ts.fillTs) : '');
      }

      return cv.io.Fetch.cachedFetch(url, { ttl: force ? 0 : refresh }, false, client).then(data => {
        if (client.hasCustomChartsDataProcessor && client.hasCustomChartsDataProcessor(data)) {
          return client.processChartsData(data, ts) || [];
        }

        return data || [];
      });
    },

    /**
     * Applies the configured time offset and scaling to the raw values.
     * @param ts {Map} data set configuration
     * @param tsdata {Array} raw [timestamp, value] pairs
     * @return {Array}
     */
    _scaleTsData(ts, tsdata) {
      const millisOffset = Number.isFinite(ts.offset) ? ts.offset * 1000 : 0;

      // a null value marks a gap in the data and has to stay one, parseFloat would
      // turn it into NaN and the graph would not be interrupted there.
      // an rrd row carries one value per data source, datasourceIndex picks the column - unless
      // the backend has already processed the data into plain values
      return ts.tsType === 'rrd'
        ? tsdata.map(x => [
            x[0] + millisOffset,
            x[1] === null ? null : parseFloat(Array.isArray(x[1]) ? x[1][ts.dsIndex || 0] : x[1]) * ts.scaling
          ])
        : tsdata.map(x => [x[0] + millisOffset, x[1] === null ? null : parseFloat(x[1]) * ts.scaling]);
    },

    /**
     * Repeats the last value at the current time, so that the graph is drawn up to now.
     * @param tsdata {Array} [timestamp, value] pairs
     * @param forceNowDatapoint {Boolean}
     * @return {Array}
     */
    _addNowDatapoint(tsdata, forceNowDatapoint) {
      if (forceNowDatapoint && tsdata.length > 0) {
        const last = Array.from(tsdata[tsdata.length - 1]); // force copy
        last[0] = Date.now();
        tsdata.push(last);
      }

      return tsdata;
    },

    /**
     * A data set could not be loaded, tell the user and let the diagram draw the rest.
     * @param ts {Map} data set configuration
     * @param err {Error|var} what went wrong
     */
    _onSourceError(ts, err) {
      const text = '' + (err && err.message ? err.message : err);
      cv.core.notifications.Router.dispatchMessage('cv.diagram.error', {
        title: qx.locale.Manager.tr('Diagram communication error'),
        severity: 'urgent',
        message: qx.locale.Manager.tr(
          'URL: %1<br/><br/>Response:</br>%2',
          JSON.stringify(ts.tsType + '://' + ts.src),
          text.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
        )
      });

      window.console.error('Diagram2 _onSourceError', ts, err);
    }
  },

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    content: {
      check: 'Object',
      init: {}
    },

    title: {
      check: 'String',
      nullable: true,
      apply: '_applyTitle'
    },

    series: {
      check: ['hour', 'day', 'week', 'month', 'year', 'fullday', 'custom'],
      init: 'day'
    },

    seriesStart: {
      check: 'String',
      init: 'end-month'
    },

    seriesEnd: {
      check: 'String',
      init: 'now'
    },

    seriesResolution: {
      check: 'Number',
      init: 300
    },

    forceNowDatapoint: {
      check: 'Boolean',
      init: true
    },

    period: {
      check: 'Number',
      init: 1
    },

    legendInline: {
      check: 'Boolean',
      init: true
    },

    legendPopup: {
      check: 'Boolean',
      init: true
    },

    legendposition: {
      check: ['nw', 'ne', 'sw', 'se'],
      init: 'ne'
    },

    timeformat: {
      check: 'String',
      nullable: true
    },

    timeformatTooltip: {
      check: 'String',
      init: '%d.%m.%Y %H:%M'
    },

    zoomYAxis: {
      check: 'Boolean',
      init: false
    },

    gridcolor: {
      check: 'String',
      init: '#81664B'
    },

    /** stroke width of the grid lines, the axes and their ticks */
    gridwidth: {
      check: 'Number',
      init: 1
    },

    /** how solid the grid lines are drawn, 0 to 1. The flot based diagram draws them with 1 */
    gridopacity: {
      check: 'Number',
      init: 0.4
    },

    /** stroke width of the frame around the plotting area */
    borderwidth: {
      check: 'Number',
      init: 1
    },

    /**
     * Stroke width of the graphs, their bar and point outlines included. Unset the plot draws
     * its lines with 1.5 and the outlines with 1, the way it always has.
     */
    linewidth: {
      check: 'Number',
      nullable: true,
      init: null
    },

    previewlabels: {
      check: 'Boolean',
      init: false
    },

    popup: {
      check: 'Boolean',
      init: false
    },

    tooltip: {
      check: 'Boolean',
      init: false
    }
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    _init: null,
    popupplot: null,
    plot: null,
    plotted: null,
    _timerPopup: null,
    __isPopup: false,

    // property apply
    _applyTitle(value) {
      if (value) {
        // override label
        this.setLabel('<div class="label">' + value + '</div>');
      }
    },

    _setupRefreshAction() {
      if (this.getRefresh()) {
        if (!this._timer) {
          this._timer = new qx.event.Timer(this.getRefresh());
          this._timer.addListener('interval', () => {
            this.loadDiagramData(this.plot, false, true);
          });
        }

        if (!this._timerPopup) {
          this._timerPopup = new qx.event.Timer(this.getRefresh());
          this._timerPopup.addListener('interval', () => {
            this.loadDiagramData(this.popupplot, true, true);
          });
        }
      }
    },

    /**
     * Stop the refresh timer
     *
     * @param timer {qx.event.Timer} stop this timer
     * @protected
     */
    _stopRefresh(timer) {
      if (timer && timer.isEnabled()) {
        timer.stop();
      }
    },

    /**
     * Start the refresh timer
     *
     * @param timer {qx.event.Timer} start this timer
     * @param runImmediately {Boolean} fire the timers 'interval' event immediately to trigger an refresh right now
     * @protected
     */
    _startRefresh(timer, runImmediately) {
      if (timer) {
        if (!timer.isEnabled()) {
          timer.start();
        }
        if (runImmediately === true) {
          timer.fireEvent('interval');
        }
      }
    },

    /**
     * Opens the diagram in a popup, when the configuration asks for one. The flot based plugin
     * ignores the attribute and always opens, diagram2 follows what the schema documents.
     */
    _action() {
      if (!this.getPopup()) {
        return;
      }

      const popupDiagram = qx.dom.Element.create('div', {
        class: 'diagram',
        id: this.getPath() + '_big',
        // fills the content area of the popup, the spacing comes from its padding.
        // margin has to be set because .popup div in designglobals.css defines 4px
        style: 'height: 100%; width: 100%; margin: 0'
      });

      this._init = true;
      const popup = cv.ui.PopupHandler.showPopup('diagram', {
        title: this.getLabel(),
        content: popupDiagram,
        page: this.getParentPage().getPath()
      });

      // this will be called when the popup is being closed.
      // NOTE: this will be called twice, one time for the foreground and one
      //       time for the background.
      popup.addListener('close', () => {
        this._stopRefresh(this._timerPopup);
        qx.event.Registration.removeAllListeners(popupDiagram);
        if (this.popupplot) {
          this.popupplot.shutdown();
          this.popupplot = null;
        }
      });

      const parent = popupDiagram.parentNode;
      // Equal spacing on all sides: a percentage padding refers to the width on the top
      // and bottom as well, so it is the same value everywhere. "margin: auto" only
      // centered horizontally, at the top and bottom it computes to 0. display: flex
      // makes the diagram sit exactly at the content box.
      Object.entries({
        height: '100%',
        width: '100%',
        margin: '0',
        padding: '2.5%',
        boxSizing: 'border-box',
        display: 'flex'
      }).forEach(function (key_value) {
        parent.style[key_value[0]] = key_value[1];
      });

      popupDiagram.innerHTML = '';
      qx.event.Registration.addListener(
        popupDiagram,
        'tap',
        function (event) {
          // don't let the popup know about the click, or it will close
          event.stopPropagation();
        },
        this
      );

      this.initDiagram(true);

      this._startRefresh(this._timerPopup, true);
    },

    /**
     * The element the diagram is drawn into.
     * @param isPopup {Boolean} the one of the popup or the one in the page
     * @return {Element|null}
     */
    _getPlotElement(isPopup) {
      if (isPopup) {
        return document.getElementById(this.getPath() + '_big');
      }
      const element = this.getDomElement();

      return element ? element.querySelector('.actor div') : null;
    },

    /**
     * Creates the plot and loads its data. d3 is loaded on the way, so this returns before the
     * diagram is on screen.
     * @param isPopup {Boolean}
     */
    initDiagram(isPopup) {
      if (!this._init) {
        return;
      }
      this._init = false;
      isPopup = isPopup || this.__isPopup;

      const element = this._getPlotElement(isPopup);
      if (!element) {
        // nothing to draw into, try again the next time the widget appears
        this._init = true;
        return;
      }

      cv.util.D3.load()
        .then(() => {
          const options = {
            axes: this.getContent().axes,
            gridcolor: this.getGridcolor(),
            gridWidth: this.getGridwidth(),
            gridOpacity: this.getGridopacity(),
            borderWidth: this.getBorderwidth(),
            lineWidth: this.getLinewidth(),
            tooltip: this.getTooltip(),
            timeformat: this.getTimeformat(),
            timeformatTooltip: this.getTimeformatTooltip(),
            legend: {
              show: (isPopup && this.isLegendPopup()) || (!isPopup && this.isLegendInline()),
              position: this.getLegendposition()
            },

            // the small diagram in the page only gets its labels when it is asked for them
            showLabels: isPopup || this.getPreviewlabels(),

            // panning and zooming is only offered in the popup, like in the flot based plugin
            interactive: isPopup,
            zoomYAxis: this.getZoomYAxis()
          };

          const plot = new cv.plugins.diagram2.Plot(element, options);
          if (isPopup) {
            // the same 200ms the old plugin waits before it reloads while panning
            const reload = qx.util.Function.debounce(() => this.loadDiagramData(plot, true, false), 200);
            plot.addListener('rangeChanged', reload);
          }
          if (isPopup) {
            this.popupplot = plot;
          } else {
            this.plot = plot;
          }
          this.plotted = true;
          plot.draw();

          this.loadDiagramData(plot, isPopup, false);
        })
        .catch(e => {
          this.error('diagram2 could not be drawn', e);
        });
    },

    /**
     * Start, end and resolution of the series to load.
     * @param view {Array?} time range the user has panned or zoomed to, in milliseconds
     * @param isInteractive {Boolean?} whether that range should be honoured
     * @return {Map|null}
     */
    getSeriesSettings(view, isInteractive) {
      const series = {
        hour: { res: 60, start: 'hour', end: 'now' },
        day: { res: 300, start: 'day', end: 'now' },
        fullday: { res: 300, start: 'day', end: 'midnight+24hour' },
        week: { res: 1800, start: 'week', end: 'now' },
        month: { res: 21600, start: 'month', end: 'now' },
        year: { res: 432000, start: 'year', end: 'now' }
      };

      const ret = {
        start: null,
        end: null,
        res: null
      };

      if (this.getSeries() === 'custom') {
        ret.start = this.getSeriesStart();
        ret.end = this.getSeriesEnd();
        ret.res = this.getSeriesResolution();
      } else {
        const selectedSeries = series[this.getSeries()];
        if (!selectedSeries) {
          return null;
        }

        ret.start = 'end-' + this.getPeriod() + selectedSeries.start;
        ret.end = selectedSeries.end;
        ret.res = this.getSeriesResolution() ? this.getSeriesResolution() : selectedSeries.res;
      }

      if (isInteractive && view) {
        // after panning or zooming the data starts where the user has moved to, the end stays
        // where the configuration puts it - the same as in the flot based plugin
        ret.start = (view[0] / 1000).toFixed(0);
      }

      return ret;
    },

    /**
     * Loads the data of all data sets and hands it to the plot.
     * @param plot {cv.plugins.diagram2.Plot} where the data is drawn
     * @param isPopup {Boolean} whether this is the diagram of the popup
     * @param forceReload {Boolean} ignore what has been cached
     */
    loadDiagramData(plot, isPopup, forceReload) {
      if (!plot) {
        return;
      }
      const settings = this.getSeriesSettings(plot.getView(), isPopup);
      if (!settings) {
        return;
      }

      const statics = cv.plugins.diagram2.AbstractDiagram2;
      const forceNowDatapoint = this.getForceNowDatapoint();
      const promises = this.getContent().ts.map(ts => {
        const res = Number.isFinite(ts.resol) ? ts.resol : settings.res;
        const refresh = this.getRefresh() ? this.getRefresh() : res;

        return statics
          .fetchSeries(ts, settings, this.getSeries(), this.getPeriod(), res, refresh, forceReload)
          .then(tsdata => statics._addNowDatapoint(statics._scaleTsData(ts, tsdata || []), forceNowDatapoint))
          .catch(err => {
            statics._onSourceError(ts, err);

            // an empty graph keeps the others and the axes of this diagram
            return [];
          })
          .then(tsdata => ({
            label: ts.label,
            color: ts.color,
            data: tsdata,
            yaxis: parseInt(ts.axisIndex),
            style: ts.style,
            steps: ts.steps,
            fill: ts.fill,
            barWidth: ts.barWidth,
            align: ts.align
          }));
      });

      Promise.all(promises).then(data => {
        plot.setData(data);
        plot.draw();
      });
    }
  },

  /*
  ******************************************************
    DESTRUCTOR
  ******************************************************
  */
  destruct() {
    if (this.plot) {
      this.plot.shutdown();
      this.plot = null;
    }
    if (this.popupplot) {
      this.popupplot.shutdown();
      this.popupplot = null;
    }
    if (this._timerPopup) {
      this._disposeObjects('_timerPopup');
    }
  }
});
