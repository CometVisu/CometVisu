/* AbstractDiagram.js
 *
 * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
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
 * This plugins integrates flot (diagrams in javascript) into the visualization.
 * server-side data-storage is rrd or InfluxDB.
 *
 * short documentation
 *
 * <h4>widgets:</h4>
 * <ul>
 *   <li>diagram</li>
 *   <li>diagram_info</li>
 * </ul>
 *
 * <h4>attributes (per diagram):</h4>
 * <ul>
 *   <li>series:               optional, "hour", "day" (default), "week", "month", "year"</li>
 *   <li>period:               optional, number of "series" to be shown</li>
 *   <li>refresh:              optional, refresh-rate in seconds, no refresh if missing</li>
 *   <li>gridcolor:            optional, color for dataline and grid, HTML-colorcode</li>
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
 *   <li>fill:                 optional, true or false - fill the space under the line / within the bar (line / bar style graphs)</li>
 *   <li>barWidth:             optional, width of bars (bar style graphs)</li>
 *   <li>align:                optional, "left" (default), "center", "right" select qlignemnt of bars (bar style graphs)</li>
 * </ul>
 *
 * @author Michael Hausl [michael at hausl dot com]
 * @since 0.6.0
 *
 * @asset(plugins/diagram/influxfetch.php)
 * @asset(plugins/diagram/dep/flot/jquery.flot.min.js)
 * @asset(plugins/diagram/dep/flot/jquery.flot.touch.min.js)
 * @asset(plugins/diagram/dep/flot/jquery.flot.canvas.min.js)
 * @asset(plugins/diagram/dep/flot/jquery.flot.resize.min.js)
 * @asset(plugins/diagram/dep/flot/jquery.flot.time.min.js)
 * @asset(plugins/diagram/dep/flot/jquery.flot.axislabels.js)
 * @asset(plugins/diagram/dep/flot/jquery.flot.tooltip.min.js)
 * @asset(plugins/diagram/dep/flot/jquery.flot.navigate.min.js)
 */
qx.Class.define('cv.plugins.diagram.AbstractDiagram', {
  extend: cv.ui.structure.pure.AbstractWidget,
  include: [cv.ui.common.Operate, cv.ui.common.Refresh],
  type: 'abstract',

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct(props) {
    super(props);
    this._debouncedLoadDiagramData = qx.util.Function.debounce(this.loadDiagramData.bind(this), 200);
  },

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    cache: {},
    /**
     * Parses the widgets XML configuration and extracts the given information
     * to a simple key/value map.
     * @param xml {Element} XML-Element
     * @param path {String} internal path of the widget
     * @param flavour {String} Flavour of the widget
     * @param pageType {String} Page type (2d, 3d, ...)
     * @param mappings
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

    getDiagramElements(xmlElement) {
      const retVal = {
        axes: [],
        axesnum: 0,
        ts: [],
        tsnum: 0
      };

      const axesNameIndex = [];

      xmlElement.querySelectorAll('axis').forEach(function (elem) {
        const unit = elem.getAttribute('unit') || '';
        retVal.axes[retVal.axesnum] = {
          axisLabel: elem.getAttribute('label') || null,
          position: elem.getAttribute('position') || 'left',
          min: elem.getAttribute('min') || null,
          max: elem.getAttribute('max') || null,
          unit: unit,
          tickDecimals: elem.getAttribute('decimals') || null,
          tickFormatter(v, axis) {
            return v.toFixed(axis.tickDecimals) + unit;
          }
        };

        retVal.axesnum++;
        axesNameIndex[elem.textContent] = retVal.axesnum;
      }, this);

      xmlElement.querySelectorAll('influx,rrd').forEach(function (elem) {
        const src = elem.tagName === 'rrd' ? elem.textContent : elem.getAttribute('measurement');
        const steps = (elem.getAttribute('steps') || 'false') === 'true';
        const fillMissing = elem.getAttribute('fillMissing');
        retVal.ts[retVal.tsnum] = {
          tsType: elem.tagName,
          src: src,
          color: elem.getAttribute('color'),
          label: elem.getAttribute('label') || src,
          axisIndex: axesNameIndex[elem.getAttribute('yaxis')] || 1,
          steps: steps,
          fill: (elem.getAttribute('fill') || 'false') === 'true',
          scaling: parseFloat(elem.getAttribute('scaling')) || 1.0,
          cFunc: elem.getAttribute('consolidationFunction') || (elem.tagName === 'rrd' ? 'AVERAGE' : 'MEAN'),
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
        } else {
          let dsIndex = elem.getAttribute('datasourceIndex') || 0;
          if (dsIndex < 0) {
            dsIndex = 0;
          }
          retVal.ts[retVal.tsnum].dsIndex = dsIndex;
        }
        retVal.tsnum++;
      }, this);
      return retVal;
    },

    /**
     * Recursively walk through the elem to build filter sting
     * @param elem
     * @param type
     */
    getInfluxFilter(elem, type) {
      const children = elem.children;
      const length = children.length;
      let retval = '';
      let i = 0;

      for (; i < length; i++) {
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
     * Get the rrd or InfluxDB and put it's content in the cache.
     * @param ts
     * @param start
     * @param end
     * @param res
     * @param forceNowDatapoint
     * @param refresh {Number} time is seconds to refresh the data
     * @param force {Boolean} Update even when the cache is still valid
     * @param callback {Function} call when the data has arrived
     * @param callbackParameter
     */
    lookupTsCache(ts, start, end, res, forceNowDatapoint, refresh, force, callback, callbackParameter) {
      const client = cv.io.BackendConnections.getClient();
      let key;
      let url;
      const chartsResource = client.getResourcePath('charts', {
        src: ts.src,
        start: start,
        end: end
      });

      if (ts.tsType !== 'influx' && chartsResource !== null) {
        // the backend provides an charts resource that must be processed differently (e.g. openHABs persistence data
        url = chartsResource;
        key = url;
      } else {
        url =
          (ts.tsType === 'influx'
            ? 'resource/plugins/diagram/influxfetch.php?ts=' + ts.src
            : client.getResourcePath('rrd') + '?rrd=' + encodeURIComponent(ts.src) + '.rrd') +
          '&ds=' +
          encodeURIComponent(ts.cFunc) +
          // NOTE: don't encodeURIComponent `start` and `end` for RRD as the "+" needs to be in the URL in plain text
          //       although it looks wrong (as a "+" in a URL translates in the decode to a space: " ")
          '&start=' +
          (ts.tsType === 'rrd' ? start : encodeURIComponent(start)) +
          '&end=' +
          (ts.tsType === 'rrd' ? end : encodeURIComponent(end)) +
          '&res=' +
          encodeURIComponent(res) +
          (ts.fillTs ? '&fill=' + encodeURIComponent(ts.fillTs) : '') +
          (ts.filter ? '&filter=' + encodeURIComponent(ts.filter) : '') +
          (ts.field ? '&field=' + encodeURIComponent(ts.field) : '') +
          (ts.authentication ? '&auth=' + encodeURIComponent(ts.authentication) : '');
        key = url + (ts.tsType === 'rrd' ? '|' + ts.dsIndex : '');
      }
      let urlNotInCache = !(key in this.cache);
      let doLoad =
        force ||
        urlNotInCache ||
        !('data' in this.cache[key]) ||
        (refresh !== undefined && Date.now() - this.cache[key].timestamp > refresh * 1000);

      if (doLoad) {
        if (urlNotInCache) {
          this.cache[key] = { waitingCallbacks: [] };
        }
        this.cache[key].waitingCallbacks.push([callback, callbackParameter]);

        if (this.cache[key].waitingCallbacks.length === 1) {
          if (this.cache[key].xhr) {
            this.cache[key].xhr.dispose();
          }
          const xhr = new qx.io.request.Xhr(url);
          client.authorize(xhr);
          xhr.set({
            accept: 'application/json'
          });

          xhr.addListener('success', ev => {
            this._onSuccess(ts, key, ev, forceNowDatapoint);
          });
          xhr.addListener('statusError', ev => {
            this._onStatusError(ts, key, ev);
          });
          this.cache[key].xhr = xhr;
          xhr.send();
        }
      } else {
        callback(this.cache[key].data, callbackParameter);
      }
    },

    _onSuccess(ts, key, ev, forceNowDatapoint) {
      if (ev.getTarget().getResponseContentType() !== 'application/json') {
        this._onStatusError(ts, key, ev, qx.locale.Manager.tr('Bad MIME type. Expected "application/json", got "%1".', ev.getTarget().getResponseContentType()));
        return; // early exit
      }

      let tsdata = ev.getTarget().getResponse();
      if (tsdata !== null) {
        const client = cv.io.BackendConnections.getClient();
        // never convert influx data
        if (ts.tsType !== 'influx' && client.hasCustomChartsDataProcessor(tsdata)) {
          tsdata = client.processChartsData(tsdata, ts);
        } else {
          if (!(Array.isArray(tsdata))) {
            this._onStatusError(ts, key, ev, qx.locale.Manager.tr('Data is not in an array.'));
            return; // early exit
          }
          // calculate timestamp offset and scaling
          const millisOffset = Number.isFinite(ts.offset) ? ts.offset * 1000 : 0;
          tsdata = ts.tsType === 'rrd'
            ? tsdata.map(x => [x[0] + millisOffset, parseFloat(x[1][ts.dsIndex]) * ts.scaling])
            : tsdata.map(x => [x[0] + millisOffset, parseFloat(x[1]) * ts.scaling]);
        }
        let now = Date.now();

        if (forceNowDatapoint && tsdata.length > 0) {
          let last = Array.from(tsdata[tsdata.length - 1]); // force copy
          last[0] = now;
          tsdata.push(last);
        }

        this.cache[key].data = tsdata;
        this.cache[key].timestamp = now;

        this.cache[key].waitingCallbacks.forEach(function (waitingCallback) {
          waitingCallback[0](tsdata, waitingCallback[1]);
        }, this);
        this.cache[key].waitingCallbacks.length = 0; // empty array
      }
    },

    _onStatusError(ts, key, ev, additionalErrorMessage = '') {
      if (additionalErrorMessage !== '') {
        additionalErrorMessage += '<br/><br/>';
      }
      const responseText = ev._target._transport.responseText;
      cv.core.notifications.Router.dispatchMessage('cv.diagram.error', {
        title: qx.locale.Manager.tr('Diagram communication error'),
        severity: 'urgent',
        message: additionalErrorMessage + qx.locale.Manager.tr(
          'URL: %1<br/><br/>Response:</br>%2',
          JSON.stringify(key),
          (responseText.length > 500 ? responseText.slice(0, 499) + '…' : responseText)
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('\n', '<br/>')
        )
      });

      window.console.error('Diagram _onStatusError', ts, key, ev);
      const tsdata = [];

      this.cache[key].data = tsdata;
      this.cache[key].timestamp = Date.now();

      this.cache[key].waitingCallbacks.forEach(function (waitingCallback) {
        waitingCallback[0](tsdata, waitingCallback[1]);
      }, this);
      this.cache[key].waitingCallbacks.length = 0; // empty array
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
            this.loadDiagramData(this.popupplot, false, true);
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

    _action() {
      const popupDiagram = qx.dom.Element.create('div', {
        class: 'diagram',
        id: this.getPath() + '_big',
        style: 'height: 90%'
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
      Object.entries({ height: '100%', width: '95%', margin: 'auto' }).forEach(function (key_value) {
        parent.style[key_value[0]] = key_value[1];
      });

      // define parent as 100%!
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

    initDiagram(isPopup) {
      if (!this._init) {
        return;
      }
      this._init = false;
      isPopup = isPopup || this.__isPopup;

      const options = {
        canvas: true,
        tooltip: this.getTooltip(),
        tooltipOpts: {
          content: '<center>%x<br/>%y</center>',
          xDateFormat: this.getTimeformatTooltip(),
          shifts: {
            x: 20,
            y: 10
          },

          defaultTheme: false
        },

        zoom: {
          interactive: isPopup,
          trigger: 'dblclick',
          amount: 1.5
        },

        pan: {
          interactive: isPopup,
          cursor: 'move',
          frameRate: 20,
          triggerOnDrag: false
        },

        yaxes: JSON.parse(JSON.stringify(this.getContent().axes)), // deep copy to prevent side effects
        xaxes: [
          {
            mode: 'time',
            timeformat: this.getTimeformat()
          }
        ],

        legend: {
          show: (isPopup && this.isLegendPopup()) || (!isPopup && this.isLegendInline()),
          backgroundColor: '#101010',
          position: this.getLegendposition()
        },

        grid: {
          show: true,
          aboveData: false,
          color: this.getGridcolor(),
          backgroundColor: '#000000',
          tickColor: this.getGridcolor(),
          markingsColor: this.getGridcolor(),
          borderColor: this.getGridcolor(),
          hoverable: true
        },

        touch: {
          pan: isPopup ? 'x' : 'none', // what axis pan work
          scale: isPopup ? 'x' : 'none', // what axis zoom work
          autoWidth: false,
          autoHeight: false,
          delayTouchEnded: 500, // delay in ms before touchended event is fired if no more touches
          callback: null, // other plot draw callback
          simulClick: true, // plugin will generate Mouse click event to brwoser on tap or double tap
          tapThreshold: 150, // range of time where a tap event could be detected
          dbltapThreshold: 200, // delay needed to detect a double tap
          tapPrecision: 60 / 2 // tap events boundaries ( 60px square by default )
        }
      };

      options.yaxes.forEach(function (val) {
        Object.assign(val, {
          axisLabelColour: this.getGridcolor(),
          color: this.getGridcolor()
        });
      }, this);
      options.xaxes.forEach(function (val) {
        Object.assign(val, {
          axisLabelColour: this.getGridcolor(),
          color: this.getGridcolor()
        });
      }, this);
      if (isPopup) {
        Object.assign(options, {
          yaxis: {
            isPopup: true,
            zoomRange: this.getZoomYAxis() ? [null, null] : false
          },

          xaxis: {
            zoomRange: [null, null],
            panRange: [null, null]
          }
        });
      }
      if (this.getTooltip()) {
        options.grid.hoverable = true;
        options.grid.clickable = true;
      }

      if (!isPopup && !this.getPreviewlabels()) {
        Object.assign(options, {
          xaxes: [{ ticks: 0, mode: options.xaxes[0].mode }]
        });

        if (options.yaxes.length === 0) {
          options.yaxes[0] = {};
        }
        options.yaxes.forEach(function (val) {
          Object.assign(val, { ticks: 0, axisLabel: null });
        }, this);
      }

      // plot diagram initially with empty values
      const diagram = isPopup ? $('#' + this.getPath() + '_big') : $('#' + this.getPath() + ' .actor div');
      diagram.empty();
      const plot = $.plot(diagram, [], options);
      if (isPopup) {
        this.debug('popup plot generated');
        this.popupplot = plot;
      } else {
        this.debug('plot generated');
        this.plot = plot;
      }
      this.plotted = true;

      const that = this;
      diagram
        .bind('plotpan', function (event, plot) {
          that._debouncedLoadDiagramData(plot, isPopup, false);
        })
        .bind('plotzoom', function () {
          that.loadDiagramData(plot, isPopup, false);
        })
        .bind('touchended', function () {
          that.loadDiagramData(plot, isPopup, false);
        })
        .bind('tap', function () {
          const self = this;
          const container = $(self).closest('.widget_container')[0];
          if (!isPopup && container !== undefined) {
            const actor = $(self).closest('.actor')[0];
            const path = container.id;
            if (actor !== undefined && path.length > 0) {
              that.action();
            }
          }
        });

      if (!isPopup) {
        // disable touch plugin in non-popup
        plot.getPlaceholder().unbind('touchstart').unbind('touchmove').unbind('touchend');
      }

      this.loadDiagramData(plot, isPopup, false);
    },

    getSeriesSettings(xAxis, isInteractive) {
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
        // initial load, take parameters from custom configuration
        ret.start = this.getSeriesStart();
        ret.end = this.getSeriesEnd();
        ret.res = this.getSeriesResolution();
      } else {
        const selectedSeries = series[this.getSeries()];
        if (!selectedSeries) {
          return null;
        }

        // initial load, take parameters from configuration
        ret.start = 'end-' + this.getPeriod() + selectedSeries.start;
        ret.end = selectedSeries.end;
        ret.res = this.getSeriesResolution() ? this.getSeriesResolution() : selectedSeries.res;
      }

      if (xAxis.datamin && xAxis.datamax && isInteractive) {
        ret.start = (xAxis.min / 1000).toFixed(0);
      }
      return ret;
    },

    loadDiagramData(plot, isInteractive, forceReload) {
      if (!plot) {
        return;
      }
      const series = this.getSeriesSettings(plot.getAxes().xaxis, isInteractive);

      if (!series) {
        return;
      }

      // init
      let loadedData = [];
      let tsloaded = 0;
      let tsSuccessful = 0;
      // get all time series data
      this.getContent().ts.forEach(function (ts, index) {
        const res = Number.isFinite(ts.resol) ? ts.resol : series.res;
        const forceNowDatapoint = this.getForceNowDatapoint();
        const refresh = this.getRefresh() ? this.getRefresh() : res;

        cv.plugins.diagram.AbstractDiagram.lookupTsCache(
          ts,
          series.start,
          series.end,
          res,
          forceNowDatapoint,
          refresh,
          forceReload,
          function (tsdata) {
            tsloaded++;
            if (tsdata !== null) {
              tsSuccessful++;

              // store the data for diagram plotting
              loadedData[index] = {
                label: ts.label,
                color: ts.color,
                data: tsdata,
                yaxis: parseInt(ts.axisIndex),
                bars: {
                  show: ts.style === 'bars',
                  fill: ts.fill,
                  barWidth: parseInt(ts.barWidth),
                  align: ts.align
                },

                lines: {
                  show: ts.style === 'lines',
                  steps: ts.steps,
                  fill: ts.fill,
                  zero: false
                },

                points: { show: ts.style === 'points', fill: ts.fill }
              };
            }

            // if loading has finished, i.e. all time series have been retrieved,
            // go on and plot the diagram
            if (tsloaded === this.getContent().tsnum) {
              let fulldata;
              // If all time series were successfully loaded, no extra action is needed.
              // Otherwise we need to reduce the array to the loaded data.
              if (tsSuccessful === tsloaded) {
                fulldata = loadedData;
              } else {
                fulldata = [];
                let loadedIndex = -1;
                for (let j = 0; j < tsSuccessful; j++) {
                  for (let k = loadedIndex + 1; k < loadedData.length; k++) {
                    if (loadedData[k] !== null) {
                      fulldata[j] = loadedData[k];
                      loadedIndex = k;
                      break;
                    }
                  }
                }
              }

              // plot
              plot.setData(fulldata);
              plot.setupGrid();
              plot.draw();

              loadedData = [];
            }
          }.bind(this)
        );
      }, this);
    }
  },

  /*
  ******************************************************
    DESTRUCTOR
  ******************************************************
  */
  destruct() {
    if (this._timerPopup) {
      this._disposeObjects('_timerPopup');
    }
  },

  defer() {
    const loader = cv.util.ScriptLoader.getInstance();
    loader.addScripts(
      [
        'plugins/diagram/dep/flot/jquery.flot.min.js',
        'plugins/diagram/dep/flot/jquery.flot.touch.min.js',
        'plugins/diagram/dep/flot/jquery.flot.canvas.min.js',
        'plugins/diagram/dep/flot/jquery.flot.resize.min.js',
        'plugins/diagram/dep/flot/jquery.flot.time.min.js',
        'plugins/diagram/dep/flot/jquery.flot.axislabels.js',
        'plugins/diagram/dep/flot/jquery.flot.tooltip.min.js',
        'plugins/diagram/dep/flot/jquery.flot.navigate.min.js'
      ],

      [0]
    );
  }
});
