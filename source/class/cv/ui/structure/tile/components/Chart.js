/* Chart.js
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

/* eslint-disable arrow-body-style */
/**
 * Shows an chart.
 * @asset(libs/d3.min.js)
 * @ignore(d3)
 */
qx.Class.define('cv.ui.structure.tile.components.Chart', {
  extend: cv.ui.structure.tile.components.AbstractComponent,
  include: [
    cv.ui.structure.tile.MVisibility,
    cv.ui.structure.tile.MRefresh,
    cv.ui.structure.tile.MResize,
    cv.ui.structure.tile.MFullscreen
  ],

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    ChartCounter: 0,
    DEFAULT_ASPECT_RATIO: 392/192,

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
          decimal: qx.locale.Number.getDecimalSeparator().translate().toString(),
          thousands: qx.locale.Number.getGroupSeparator().translate().toString(),
          grouping: [3],
          currency: ['€', '']
        });

        d3.timeFormatDefaultLocale({
          dateTime: '%A, der %e. %B %Y, %X',
          date: '%d.%m.%Y',
          time: '%H:%M:%S',
          periods: [qx.locale.Date.getAmMarker().translate().toString(), qx.locale.Date.getPmMarker().translate().toString()],
          days: qx.locale.Date.getDayNames('wide', null, 'format').map(t => t.translate().toString()),

          shortDays: qx.locale.Date.getDayNames('narrow', null, 'stand-alone').map(t => t.translate().toString()),
          months: qx.locale.Date.getMonthNames('wide').map(t => t.translate().toString()),
          shortMonths: qx.locale.Date.getMonthNames('narrow', null, 'stand-alone').map(t => t.translate().toString())
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
    currentSeries: {
      check: ['hour', 'day', 'week', 'month', 'year'],
      init: 'day',
      apply: '_applyCurrentSeries'
    },

    currentPeriod: {
      check: 'Number',
      init: 0,
      apply: '__updateTimeRange'
    },

    startTime: {
      check: 'Number',
      init: 0
    },

    endTime: {
      check: 'Number',
      init: 0
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _id: null,
    _downloadedImage: null,
    _url: null,
    _headers: null,
    _request: null,
    _width: null,
    _height: null,
    _loaded: null,
    _dataSetConfigs: null,
    _initializing: null,
    _navigationEnabled: null,
    __toolTipTimer: null,
    __showTooltip: false,
    __debouncedOnResize: null,
    __resizeTimeout: null,
    __startTs: null,
    __endTs: null,

    /**
    * @type {d3.Selection}
    */
    _dot: null,
    /**
     * @type {d3.Selection}
     */
    _svg: null,
    /**
     * @type {HTMLElement}
     */
    _tooltip: null,
    /**
     * @type {String}
     */
    _titleString: null,

    __helpers: null,
    __config: null,
    // all chart properties
    _chartConf: null,

    async _init() {
      this._checkEnvironment();

      this._initializing = true;
      const element = this._element;
      await cv.ui.structure.tile.components.Chart.JS_LOADED;
      this._id = cv.ui.structure.tile.components.Chart.ChartCounter++;

      element.setAttribute('data-chart-id', this._id.toString());
      const inBackground = this._element.hasAttribute('background') && this._element.getAttribute('background') === 'true';

      let title = this.getHeader('label.title');
      if (!inBackground && element.hasAttribute('title') && !title) {
        title = document.createElement('label');
        title.classList.add('title');
        let span = document.createElement('span');
        title.appendChild(span);
        span.textContent = element.getAttribute('title');
        this.appendToHeader(title);
      }

      if (title) {
        // save base title for updating
        this._titleString = title.textContent.trim();
      }

      let seriesSelection = [];
      if (!inBackground && element.hasAttribute('selection')) {
        const s = element.getAttribute('selection');
        if (s === 'none') {
          seriesSelection = [];
        } else if (s === 'all') {
          seriesSelection = ['hour', 'day', 'week', 'month', 'year'];
        } else {
          seriesSelection = s.split(',').map(n => n.trim().toLowerCase());
        }
      }
      if (element.hasAttribute('series')) {
        this.setCurrentSeries(element.getAttribute('series'));
      }
      const currentSeries = this.getCurrentSeries();
      if (seriesSelection.length > 0 && !seriesSelection.includes(currentSeries)) {
        seriesSelection.push(currentSeries);
      }
      this._navigationEnabled = seriesSelection.length > 0;
      if (seriesSelection.length > 0) {
        // back button
        let button = this._buttonFactory('ri-arrow-left-s-line', ['prev']);
        button.setAttribute('title', qx.locale.Manager.tr('previous'));
        button.addEventListener('click', () => this._onSeriesPrev());

        if (!title) {
          title = document.createElement('label');
          title.classList.add('title');
          let span = document.createElement('span');
          title.appendChild(span);
          this.appendToHeader(title);
        }

        title.parentElement.insertBefore(button, title);
        const i = document.createElement('i');
        i.classList.add('ri-arrow-down-s-fill');
        title.appendChild(i);

        // current selection
        const popup = document.createElement('div');
        popup.classList.add('popup', 'series');
        let option;
        for (const s of seriesSelection) {
          option = document.createElement('cv-option');
          option.setAttribute('key', s);
          if (s === currentSeries) {
            option.setAttribute('selected', 'selected');
          }
          option.textContent = this._seriesToShort(s);
          option.addEventListener('click', ev => {
            popup.style.display = 'none';
            this._onSeriesChange(ev.target.getAttribute('key'));
            ev.stopPropagation();
            ev.preventDefault();
          });
          popup.appendChild(option);
        }
        title.appendChild(popup);

        // make title clickable
        title.classList.add('clickable');
        title.addEventListener('click', ev => {
          const style = getComputedStyle(popup);
          if (style.getPropertyValue('display') === 'none') {
            popup.style.display = 'flex';
          } else {
            popup.style.display = 'none';
          }
          ev.stopPropagation();
          ev.preventDefault();
        });

        // forward button
        button = this._buttonFactory('ri-arrow-right-s-line', ['next']);
        button.setAttribute('title', qx.locale.Manager.tr('next'));
        // initially we cannot go into the future
        button.disabled = true;
        button.addEventListener('click', () => this._onSeriesNext());
        this.appendToHeader(button);
      }
      if (!inBackground && element.hasAttribute('allow-fullscreen') && element.getAttribute('allow-fullscreen') === 'true') {
        this._initFullscreenSwitch();

        // only on mobile we need this, because of height: auto
        if (document.body.classList.contains('mobile')) {
          this.addListener('changeFullscreen', () => this._onRendered());
        }
      }

      if (element.hasAttribute('refresh')) {
        this.setRefresh(parseInt(element.getAttribute('refresh')));
      }

      // create needed elements

      const svg = d3.select(this._element)
        .append('svg');

      let noToolTips = false;
      if (inBackground) {
        noToolTips = true;
        svg.style('opacity', 0.4);
      }

      if (!noToolTips) {
        this._tooltip = document.createElement('div');
        this._tooltip.classList.add('tooltip');
        this._tooltip.style.display = 'none';
        this._element.appendChild(this._tooltip);

        svg.on('pointerenter', this._onPointerEntered.bind(this));
        svg.on('pointermove', this._onPointerMoved.bind(this));
        svg.on('pointerleave', this._onPointerLeft.bind(this));
      }
      svg.on(
        'touchmove',
        event => {
          if (this._loaded) {
            let y = event.targetTouches[0].clientY;
            const pathRect = this._element.querySelector(':scope > svg').getBoundingClientRect();
            if (y > pathRect.y && y < pathRect.y + pathRect.height) {
              event.preventDefault();
            }
          }
        },
        { passive: false }
      );

      // init some fixed settings
      const format = this._element.hasAttribute('y-format') ? this._element.getAttribute('y-format') : '%s';
      let timeFormat = null;
      if (this._element.hasAttribute('x-format')) {
        const formatString = this._element.getAttribute('x-format');
        timeFormat = date => d3.timeFormat(formatString)(date);
      } else {
        // format auto-detection
        timeFormat = this.multiTimeFormat([
          [
            '%H:%M:%S',
            function (d) {
              return d.getSeconds();
            }
          ],

          [
            '%H:%M',
            function (d) {
              return d.getMinutes();
            }
          ],

          [
            '%H',
            function (d) {
              return d.getHours();
            }
          ],

          [
            '%a %d',
            function (d) {
              return d.getDay() && d.getDate() !== 1;
            }
          ],

          [
            '%b %d',
            function (d) {
              return d.getDate() !== 1;
            }
          ],

          [
            '%B',
            function (d) {
              return d.getMonth();
            }
          ],

          [
            '%Y',
            function () {
              return true;
            }
          ]
        ]);
      }
      this.__config = {
        x: d => d.time, // given d in data, returns the (temporal) x-value
        y: d => +d.value, // given d in data, returns the (quantitative) y-value
        z: d => d.key, // given d in data, returns the (categorical) z-value
        color: d => d && this._dataSetConfigs[d].color, // stroke color of line, as a constant or a function of *z*
        title: d => cv.util.String.sprintf(format, d.value), // given d in data, returns the title text
        curve: d3.curveLinear, // method of interpolation between points
        marginTop: 12, // top margin, in pixels
        marginRight: 24, // right margin, in pixels
        marginBottom: 20, // bottom margin, in pixels
        marginLeft: 24, // left margin, in pixels
        width: 392, // outer width, in pixels
        height: 192, // outer height, in pixels
        aspectRatio: 392/192,
        xType: d3.scaleTime, // type of x-scale
        xFormat: timeFormat, // a format specifier string for the x-axis
        yType: d3.scaleLinear, // type of y-scale
        yFormat: undefined, // a format specifier string for the y-axis
        yLabel: undefined, // a label for the y-axis
        strokeLinecap: undefined, // stroke line cap of line
        strokeLinejoin: undefined, // stroke line join of line
        strokeWidth: 1.5, // stroke width of line
        strokeOpacity: undefined, // stroke opacity of line
        mixBlendMode: 'normal', // blend mode of lines
        showArea: d => this._dataSetConfigs[d].showArea, // show area below the line,
        showXAxis: !this._element.hasAttribute('show-x-axis') || this._element.getAttribute('show-x-axis') === 'true',
        showYAxis: !this._element.hasAttribute('show-y-axis') || this._element.getAttribute('show-y-axis') === 'true',
        xPadding: 0.1 // amount of x-range to reserve to separate bars
      };

      this._initializing = false;
      this.__updateTitle();

      // check if we have a read address for live updates
      const datasetSources = Array.from(this._element.querySelectorAll(':scope > dataset')).map(elem => elem.getAttribute('src'));
      const readAddresses = Array.from(element.querySelectorAll(':scope > cv-address:not([mode="write"])')).filter(elem => datasetSources.includes(elem.getAttribute('target')));
      if (readAddresses.length > 0) {
        element.addEventListener('stateUpdate', ev => {
          this.onStateUpdate(ev);
          // cancel event here
          ev.stopPropagation();
        });
      }
    },

    onStateUpdate(ev) {
      const targetDataset = this._element.querySelector(':scope > dataset[src="'+ev.detail.target+'"]');
      const config = this._dataSetConfigs ? this._dataSetConfigs[ev.detail.target] : null;
      if (targetDataset && config) {
        let ts = Date.now();
        if (config.aggregationInterval) {
          const mins = config.aggregationInterval * 60 * 1000;
          ts = Math.round(ts / mins) * mins;
        }
        this._renderChart({
          src: ev.detail.target,
          time: ts,
          value: ev.detail.state
        }, true);
      }
    },

    _onSeriesPrev() {
      this.setCurrentPeriod(this.getCurrentPeriod()+1);
    },

    _onSeriesChange(select) {
      this._initializing = true;
      // reset offset when series changed
      this.resetCurrentPeriod();
      this._initializing = false;
      // reset configuration, we need a new one
      this._chartConf = null;
      this.setCurrentSeries(select);
    },

    _onSeriesNext() {
      const currentPeriod = this.getCurrentPeriod();
      if (currentPeriod > 0) {
        this.setCurrentPeriod(currentPeriod-1);
      }
    },

    refresh() {
      this._loaded = false;
      this.__updateTimeRange();
      this._loadData();
    },

    // triggered after a change os series or period
    _refreshData() {
      const nextButton = this.getHeader('.next');
      if (nextButton) {
        if (this.getCurrentPeriod() === 0) {
          nextButton.setAttribute('disabled', 'disabled');
        } else {
          nextButton.removeAttribute('disabled');
        }
      }

      if (!this._initializing && this.getStartTime() > 0 && this.getEndTime() > 0) {
        this._loaded = false;
        this._loadData();
      }
      this.__updateTitle();
    },

    _applyCurrentSeries(series) {
      const currentSelection = this.getHeader('.popup.series > cv-option[selected="selected"]');
      let alreadySelected = false;
      if (currentSelection) {
        if (currentSelection.getAttribute('key') !== series) {
          currentSelection.removeAttribute('selected');
        } else {
          alreadySelected = true;
        }
      }
      if (!alreadySelected) {
        const newSelection = this.getHeader(`.popup.series > cv-option[key="${series}"]`);
        if (newSelection) {
          newSelection.setAttribute('selected', 'selected');
        }
      }
      this.__updateTimeRange();
    },

    __updateTimeRange() {
      const series = this.getCurrentSeries();

      const currentPeriod = this.getCurrentPeriod();
      let end = new Date();
      let periodStart = new Date();
      let interval = 0;
      switch (series) {
        case 'hour':
          interval = 60 * 60;
          periodStart.setHours(periodStart.getHours() - currentPeriod, 0, 0, 0);
          end.setHours(periodStart.getHours() + 1, 0, 0, 0);
          break;

        case 'day':
          interval = 24 * 60 * 60;
          periodStart.setDate(periodStart.getDate() - currentPeriod);
          periodStart.setHours(0, 0, 0, 0);
          end.setDate(periodStart.getDate() + 1);
          end.setHours(0, 0, 0, 0);
          break;

        case 'week':
          interval = 7 * 24 * 60 * 60;
          periodStart.setDate(periodStart.getDate() - (periodStart.getDay() || 7) + 1 - 7 * currentPeriod);
          periodStart.setHours(0, 0, 0, 0);
          end.setDate(periodStart.getDate() + 7);
          end.setHours(0, 0, 0, 0);
          break;

        case 'month':
          interval = 30 * 24 * 60 * 60;
          periodStart.setMonth(periodStart.getMonth() - currentPeriod);
          periodStart.setDate(1);
          periodStart.setHours(0, 0, 0, 0);
          end.setMonth(periodStart.getMonth() + 1, 1);
          end.setHours(0, 0, 0, 0);
          break;

        case 'year':
          interval = 365 * 24 * 60 * 60;
          periodStart.setFullYear(periodStart.getFullYear() - currentPeriod);
          periodStart.setMonth(0, 1);
          periodStart.setHours(0, 0, 0, 0);
          end.setFullYear(periodStart.getFullYear() + 1);
          end.setMonth(periodStart.getMonth() + 1, 1);
          end.setHours(0, 0, 0, 0);
          break;
      }
      let startTs = Math.round(periodStart.getTime()/1000);
      let endTs = Math.round(end.getTime()/1000);
      if (this._element.getAttribute('background') === 'true' || !this._element.hasAttribute('selection')) {
        // when have no navigation, we can just use the old relative time range now - interval
        startTs = endTs -  interval;
      }
      this.setStartTime(startTs);
      this.setEndTime(endTs);
      this._refreshData();
    },

    _loadData() {
      if (this._loaded && Date.now() - this._loaded < 300000) {
        // don't reload within 5 minutes
        return;
      }
      const client = cv.io.BackendConnections.getClient();
      if (!client) {
        return;
      }
      if (!client.isConnected()) {
        client.addListenerOnce('changeConnected', () => {
          this._loadData();
        });
        return;
      }

      const dataSets = this._element.querySelectorAll(':scope > dataset');
      const promises = [];

      if (!this._dataSetConfigs) {
        this._dataSetConfigs = {};
        for (let dataSet of dataSets) {
          let ts = {
            showArea: true,
            color: '#FF9900',
            chartType: 'line',
            title: '',
            curve: 'linear',
            aggregationInterval: 0
          };

          let attr;
          let name;
          let value;
          for (let i = 0; i < dataSet.attributes.length; i++) {
            attr = dataSet.attributes.item(i);
            // CamelCase attribute names
            name = attr.name
              .split('-')
              .map((part, i) => {
                if (i > 0) {
                  return `${part.substring(0, 1).toUpperCase()}${part.substring(1)}`;
                }
                return part;
              })
              .join('');
            value = attr.value;
            if (value === 'true' || value === 'false') {
              value = value === 'true';
            } else if (/^\d+$/.test(value)) {
              value = parseInt(value);
            } else if (/^[\d.]+$/.test(value)) {
              value = parseFloat(value);
            }
            ts[name] = value;
          }
          const type = ts.src.split('://')[0].toLowerCase();
          ts.type = type;
          let key = ts.src;
          switch (type) {
            case 'flux':
              ts.source = new cv.io.timeseries.FluxSource(ts.src);
              if (ts.source.isInline()) {
                const fluxQuery = dataSet.textContent.trim();
                key = cv.ConfigCache.hashCode(fluxQuery).toString();
                ts.source.setQueryTemplate(fluxQuery);
              }
              break;

            case 'openhab':
              ts.source = new cv.io.timeseries.OpenhabPersistenceSource(ts.src);
              break;

            case 'rrd':
              ts.source = new cv.io.timeseries.RRDSource(ts.src);
              break;

            case 'demo':
              ts.source = new cv.io.timeseries.DemoSource(ts.src);
              break;

            default:
              this.error('unknown chart data source type ' + type);
              break;
          }
          ts.key = key;
          this._dataSetConfigs[key] = ts;
        }
      }

      for (const src in this._dataSetConfigs) {
        const ts = this._dataSetConfigs[src];

        if (!ts.source) {
          continue;
        }

        let options = {ttl: this.getRefresh()};

        this.debug('loading');
        promises.push(
          ts.source.fetch(
            this.getStartTime(),
            this.getEndTime(),
            this.getCurrentSeries(),
            this.getCurrentPeriod(),
            options
          ).then(data => {
              this.debug('successfully loaded');
              if (!this._lastRefresh) {
                this._lastRefresh = Date.now();
              }
              return {
                data: data || [],
                ts: ts
              };
            })
            .catch(err => {
              this._onStatusError(ts, err);
              return {
                data: [],
                ts: ts
              };
            })
        );
      }
      Promise.all(promises).then(responses => {
        this._onSuccess(responses);
      });
    },

    _onSuccess(data) {
      let chartData = [];

      for (let entry of data) {
        let tsdata = entry.data;
        if (tsdata !== null) {
          // TODO: stacked bar times (entry.ts.chartType === 'stacked-bar') must be aggregated, they have to be at the same time index for stacking
          const mins = entry.ts.aggregationInterval > 0 ? entry.ts.aggregationInterval * 60 * 1000 : 0;
          for (let [time, value] of tsdata) {
            chartData.push({
              key: entry.ts.key,
              src: entry.ts.src,
              time: mins > 0
                ? Math.round(time / mins) * mins : time,
              value
            });
          }
        }
      }

      if (this._element.hasAttribute('background') && this._element.getAttribute('background') === 'true') {
        // no margins
        this.__config = Object.assign(this.__config, {
          marginRight: 0,
          marginBottom: 0,
          marginLeft: 0
        });

        // because we have no margins we need to cut the overflow on the tile
        let tile = this._element.parentElement;
        while (tile && tile.localName !== 'cv-tile') {
          tile = tile.parentElement;
        }
        if (tile && tile.localName === 'cv-tile') {
          tile.style.overflow = 'hidden';
        }
      }

      // wait some time to let the element size settle
      window.requestAnimationFrame(() => {
        setTimeout(() => {
          this._onRendered(chartData);
        }, 100);
      });
    },

    _onRendered(chartData, retries) {
      if (this.__resizeTimeout) {
        clearTimeout(this.__resizeTimeout);
        this.__resizeTimeout = null;
      }
      if (this.isVisible()) {
        const [width, height] = this._getSize();
        if ((width < 20 || height < 10) && (!retries || retries <= 5)) {
          // this makes no sense
          this.__resizeTimeout = setTimeout(() => {
            this._onRendered(chartData, retries > 0 ? retries + 1 : 1);
          }, 150);
        }
        if (width < 20 || height < 10) {
          // do nothing, these values are invalid
          return;
        }

        this.__config.width = width;
        this.__config.height = height;
        d3.select(this._element).select('svg')
          .attr('viewBox', `0, 0, ${width}, ${height}`);
        if (chartData) {
          this._renderChart(chartData);
          this._loaded = Date.now();
        }
      }
    },

    _getSize() {
      const parent = this._element.parentElement;
      let padding = this._element.getAttribute('background') === 'true' ? 0 : 8;
      let containerWidth = this._element.offsetWidth - padding;
      let containerHeight = this._element.offsetHeight - padding;
      let factor = 1;

      const landscape = containerWidth > containerHeight;
      let width = 0;
      let height = 0;

      if (landscape && containerHeight > 0) {
        // obeying aspect ratio in landscape mode is not necessary
        width = Math.round(containerWidth / factor);
        height = Math.round(containerHeight / factor);
      } else {
        width = Math.round(containerWidth / factor);
        height = width / cv.ui.structure.tile.components.Chart.DEFAULT_ASPECT_RATIO;
      }
      if (!this._element.style.height && (parent.localName === 'cv-popup' && (parent.getAttribute('fullscreen') === 'true') ||
        (this._element.getAttribute('allow-fullscreen') === 'true' &&
          parent.parentElement.classList.contains('fullscreen')))) {
        // the parent container has height: auto, so we need to have one
        this._element.style.height = (height + this.__config.marginTop + this.__config.marginBottom) + 'px';
      }
      return [width, height];
    },

    multiTimeFormat(formatsArray) {
      /**
       * @param date
       */
      function multiFormat(date) {
        let i = 0;
        let found = false;
        let fmt = '%c';
        while (!found && i < formatsArray.length) {
          found = formatsArray[i][1](date);
          if (found) {
            fmt = formatsArray[i][0];
          }
          i++;
        }
        return fmt;
      }
      return date => d3.timeFormat(multiFormat(date))(date);
    },

    _onStatusError(ts, err) {
      cv.core.notifications.Router.dispatchMessage('cv.charts.error', {
        title: qx.locale.Manager.tr('Communication error'),
        severity: 'urgent',
        message: qx.locale.Manager.tr('ERROR:</br>%1', JSON.stringify(err))
      });

      this.error('Chart _onStatusError', ts, err);
    },

    /**
     * Get svg element selection (create if not exists)
     * @param parent d3.selection of the parent this element should be a child of
     * @param nodeName {String} Element name
     * @param classes {Array<String>} array of css classes used to identify this element
     * @param attributes {Map<String, String>?} set these attributes if the element has to be created, when it already exists these are ignored
     * @private
     */
    _getSvgElement(parent, nodeName, classes, attributes) {
      let elem = parent.select(nodeName + '.' + classes.join('.'));
      if (elem.empty()) {
        elem = parent.append(nodeName).attr('class', classes.join(' '));
        if (attributes) {
          for (const name in attributes) {
            elem.attr(name, attributes[name]);
          }
        }
      }
      return elem;
    },

    /**
     * Copyright 2021 Observable, Inc.
     * Released under the ISC license.
     * https://observablehq.com/@d3/multi-line-chart
     *
     * @param data
     * @param single
     * @private
     */
    _renderChart(data, single) {
      const config = this.__config;
      const svg = d3.select(this._element).select('svg');

      // Compute values.
      let X;
      let Y;
      let Z;
      let O;
      let T;
      if (single) {
        if (!this._helpers) {
          return;
        }
        X = this._helpers.X;
        Y = this._helpers.Y;
        Z = this._helpers.Z;
        O = this._helpers.O;
        T = this._helpers.T;
        if (X[X.length-1] === data.time) {
          // replace last value instead of adding one
          Y[Y.length-1] = data.value;
        } else {
          X.push(data.time);
          Y.push(data.value);
          Z.push(data.key);
          O.push(data);
          T.push(config.title === undefined ? data.src : config.title === null ? null : config.title(data));

          // cleanup
          X.shift();
          Y.shift();
          Z.shift();
          O.shift();
          T.shift();
        }
      } else {
        X = d3.map(data, config.x);
        Y = d3.map(data, config.y);
        Z = d3.map(data, config.z);
        O = d3.map(data, d => d);
        // Compute titles.
        T = config.title === undefined ? Z : config.title === null ? null : d3.map(data, config.title);
      }

      // Compute default domains, and unique the z-domain.
      let xDomain = d3.extent(X);
      let minVal = 0;
      let maxVal = 0;
      if (this._element.hasAttribute('min')) {
        const min = parseFloat(this._element.getAttribute('min'));
        if (!isNaN(min)) {
          minVal = min;
        }
      } else {
        minVal = d3.min(Y);
        if (minVal > 1.0) {
          minVal -= 1;
        }
      }
      if (this._element.hasAttribute('max')) {
        const max = parseFloat(this._element.getAttribute('max'));
        if (!isNaN(max)) {
          maxVal = max;
        }
      } else {
        maxVal = d3.max(Y);
        if (maxVal > 1.0) {
          // add some inner chart padding
          maxVal += 1;
        } else {
          maxVal += 0.1;
        }
      }
      const yDomain = [minVal, maxVal];
      const zDomain = new d3.InternSet(Z);
      // Omit any data not present in the z-domain.
      const I = d3.range(X.length).filter(i => zDomain.has(Z[i]));

      if (config.showYAxis) {
        const maxValue = config.yFormat ? config.yFormat(yDomain[1]) : yDomain[1].toFixed(maxVal < 1 ? 2 : 1);
        // check if we need more space for the y-axis
        if (maxValue.length >= 2) {
          config.marginLeft = maxValue.length * 8;
        }
      }

      const xTicks = config.width / 80;
      const yTicks = config.height / 60;
      const additionalXRangePadding = this._element.getAttribute('background') === 'true' ? 0 : 2;

      const xRange = [config.marginLeft + additionalXRangePadding, config.width - config.marginRight - additionalXRangePadding]; // [left, right]
      if (!this._chartConf) {
        const yRange = [config.height - config.marginBottom, config.marginTop]; // [bottom, top]

        // initialize everything once
        this._chartConf = {
          // x/y scales
          x: config.xType().range(xRange),
          y: config.yType().range(yRange)
        };
        this._chartConf.xAxis = config.showXAxis
          ? d3.axisBottom(this._chartConf.x)
            .ticks(xTicks)
            .tickSizeOuter(0)
            .tickFormat(config.xFormat)
          : undefined;
        this._chartConf.yAxis = config.showYAxis
          ? d3.axisLeft(this._chartConf.y).ticks(yTicks, config.yFormat)
          : undefined;


        // add elements
        const showGrid = this._element.hasAttribute('show-grid') ? this._element.getAttribute('show-grid') : 'xy';
        if (showGrid.includes('x')) {
          this._chartConf.xGrid = d3.axisBottom(this._chartConf.x).ticks(xTicks)
            .tickSize(-config.height + config.marginBottom + config.marginTop)
            .tickFormat('');
          this._getSvgElement(svg, 'g', ['grid', 'x'], {
            transform: `translate(0,${config.height - config.marginBottom})`
          })
            .call(this._chartConf.xGrid);
        }
        if (showGrid.includes('y')) {
          this._chartConf.yGrid = d3.axisLeft(this._chartConf.y).ticks(yTicks)
            .tickSize(-config.width + config.marginRight + config.marginLeft)
            .tickFormat('');

          this._getSvgElement(svg, 'g', ['grid', 'y'], {
            transform: `translate(${config.marginLeft},0)`
          })
            .call(this._chartConf.yGrid);
        }

        if (config.showXAxis) {
          this._getSvgElement(svg, 'g', ['axis', 'x'])
            .attr('transform', `translate(0,${config.height - config.marginBottom})`)
            .call(this._chartConf.xAxis);
        }

        if (config.showYAxis) {
          let yAxisElement = this._getSvgElement(svg, 'g', ['axis', 'y'])
            .attr('transform', `translate(${config.marginLeft},0)`);

          if (config.label && yAxisElement.select('text').empty()) {
            yAxisElement.append('text')
              .attr('x', -config.marginLeft)
              .attr('y', 10)
              .attr('fill', 'currentColor')
              .attr('text-anchor', 'start')
              .text(config.yLabel);
          }

          yAxisElement
            .call(this._chartConf.yAxis)
            .call(g => g.select('.domain').remove());
        }

        // find chart types
        const lineGroups = new Map();
        const areaGroups = new Map();
        const barGroups = new Map();
        const stackedBarGroups = new Map();
        const lineFunctions = {};
        const areaFunctions = {};
        let xBar;
        let xzScale;

        for (const key in this._dataSetConfigs) {
          switch (this._dataSetConfigs[key].chartType) {
            case 'line': {
              const idx = I.filter(i => Z[i] === key);
              lineGroups.set(key, idx);
              const curveName = this._dataSetConfigs[key].curve || 'linear';
              if (!Object.prototype.hasOwnProperty.call(lineFunctions, curveName)) {
                let curveFunction;
                switch (curveName) {
                  case 'linear':
                    curveFunction = d3.curveLinear;
                    break;

                  case 'step':
                    curveFunction = d3.curveStep;
                    break;

                  case 'natural':
                    curveFunction = d3.curveNatural;
                    break;
                }

                if (curveFunction) {
                  // Construct a line generator.
                  lineFunctions[curveName] = d3
                    .line()
                    .curve(curveFunction)
                    .x(i => this._chartConf.x(this._helpers.X[i]))
                    .y(i => this._chartConf.y(this._helpers.Y[i]));
                }

                if (this._dataSetConfigs[key].chartType === 'line' && typeof config.showArea === 'function' && config.showArea(key)) {
                  areaGroups.set(key, idx);
                  if (curveFunction) {
                    // Construct a line generator.
                    const minY = this._chartConf.y.range()[0];
                    areaFunctions[curveName] = d3
                      .area()
                      .curve(curveFunction)
                      .x(i => this._chartConf.x(this._helpers.X[i]))
                      .y0(() => minY)
                      .y1(i => this._chartConf.y(this._helpers.Y[i]));
                  }
                }
              }
              break;
            }

            case 'bar':
              barGroups.set(key, I.filter(i => Z[i] === key));
              if (!xBar) {
                xBar = d3.scaleBand().range(this._chartConf.x.range()).padding(config.xPadding);
              }
              if (!xzScale) {
                xzScale = d3.scaleBand().padding(0.05);
              }
              break;

            case 'stacked-bar':
              stackedBarGroups.set(key, I.filter(i => Z[i] === key));
              break;
          }
        }

        this._chartConf.lineGroups = lineGroups;
        this._chartConf.areaGroups = areaGroups;
        this._chartConf.barGroups = barGroups;
        this._chartConf.stackedBarGroups = stackedBarGroups;
        this._chartConf.lineFunctions = lineFunctions;
        this._chartConf.areaFunctions = areaFunctions;
        this._chartConf.xBar = xBar;
        if (xzScale) {
          this._chartConf.xz = xzScale;
        }

        // prepare elements for chart elements
        if (this._chartConf.lineGroups.size > 0) {
          this._chartConf.lineContainer = this._getSvgElement(svg, 'g', ['line'], {
            fill: 'none',
            stroke: typeof config.color === 'string' ? config.color : null,
            'stroke-linecap': config.strokeLinecap,
            'stroke-linejoin': config.strokeLinejoin,
            'stroke-width': config.strokeWidth,
            'stroke-opacity': config.strokeOpacity
          });
        }
        if (this._chartConf.areaGroups.size > 0) {
          this._chartConf.areaContainer = this._getSvgElement(svg, 'g', ['area'], {
            stroke: 'none',
            fill: typeof config.color === 'string' ? this.__opacifyColor(config.color, '30') : null
          });
        }
        if (this._chartConf.barGroups.size > 0) {
          this._chartConf.barContainer = this._getSvgElement(svg, 'g', ['bars']);
        }
      }

      // apply domains to scales
      this._chartConf.x.domain(xDomain);
      this._chartConf.y.domain(yDomain);

      this._helpers = { X, Y, I, T, Z, O };

      if (this._chartConf.xAxis) {
        this._getSvgElement(svg, 'g', ['axis', 'x'])
          .call(this._chartConf.xAxis);
      }

      if (this._chartConf.yAxis) {
        this._getSvgElement(svg, 'g', ['axis', 'y'])
          .call(this._chartConf.yAxis);
      }
      if (this._chartConf.xBar) {
        this._chartConf.xBar.domain(new d3.InternSet(X));
      }
      if (this._chartConf.xz) {
        this._chartConf.xz.domain(zDomain);
        this._chartConf.x.range([xRange[0], xRange[1] - this._chartConf.xBar.bandwidth()]);
        this._chartConf.xz.range([0, this._chartConf.xBar.bandwidth()]);
      }

      // update groups
      for (const key of this._chartConf.lineGroups.keys()) {
        const idx = I.filter(i => Z[i] === key);
        this._chartConf.lineGroups.set(key, idx);
      }
      for (const key of this._chartConf.areaGroups.keys()) {
        const idx = I.filter(i => Z[i] === key && Y[i] !== undefined);
        this._chartConf.areaGroups.set(key, idx);
      }
      for (const key of this._chartConf.barGroups.keys()) {
        const idx = I.filter(i => Z[i] === key && Y[i] !== undefined);
        this._chartConf.barGroups.set(key, idx);
      }
      for (const key of this._chartConf.stackedBarGroups.keys()) {
        const idx = I.filter(i => Z[i] === key && Y[i] !== undefined);
        this._chartConf.stackedBarGroups.set(key, idx);
      }

      this.__config = config;
      this._dot = svg.select('g.dot');

      // show zero line in grid for non-zero based charts
      if (minVal !== 0) {
        let targetContainer = this._chartConf.lineContainer || this._chartConf.areaContainer || this._chartConf.barContainer;
        let yValue = 0.0;
        let data = [0, X.length-1];
        let lineElem = targetContainer.select('.zero-line');
        if (lineElem.empty()) {
          lineElem = targetContainer.append('line')
            .attr('class', 'zero-line')
            .attr('stroke', 'currentColor')
            .attr('stroke-opacity', '15%');
        }
        if (X.length > 0) {
          const x1 = this._chartConf.x(X[data[0]]);
          const x2 = this._chartConf.x(X[X.length - 1]); // always draw until end of chart (not until end of src dataset)
          const y = this._chartConf.y(yValue);
          lineElem
            .attr('x1', x1)
            .attr('x2', x2)
            .attr('y1', y)
            .attr('y2', y);
        }
      }

      const t = d3.transition()
        .duration(single ? 0 : 500)
        .ease(d3.easeLinear);

      if (this._chartConf.lineContainer) {
        this._chartConf.lineContainer
          .selectAll('path')
          .data(this._chartConf.lineGroups)
          .join(
            enter => enter.append('path')
              .style('mix-blend-mode', config.mixBlendMode)
              .attr('stroke', typeof config.color === 'function' ? p => config.color(p[0]) : null)
          )
          .transition(t)
          .attr('d', d => {
            const curveName = this._dataSetConfigs[d[0]].curve || 'linear';
            const func = this._chartConf.lineFunctions[curveName] || this._chartConf.lineFunctions.linear;
            const val = func(d[1]);
            return val;
          });
      }

      // Add the area
      if (this._chartConf.areaContainer) {
        this._chartConf.areaContainer
          .selectAll('path')
          .data(this._chartConf.areaGroups)
          .join(
            enter => enter.append('path')
              .style('mix-blend-mode', config.mixBlendMode)
              .attr('fill', typeof config.color === 'function' ? p => this.__opacifyColor(config.color(p[0]), '30') : null)
          )
          .transition(t)
          .attr('d', d => {
            const curveName = this._dataSetConfigs[d[0]].curve || 'linear';
            const func = this._chartConf.areaFunctions[curveName] || this._chartConf.areaFunctions.linear;
            return func(d[1]);
          });
      }

      if (this._chartConf.barContainer) {
        const yMin = this._chartConf.y.range()[0];
        this._chartConf.barContainer
          .selectAll('g')
          .data(this._chartConf.barGroups)
          .join('g')
          .attr('fill', typeof config.color === 'function' ? d => config.color(d[0]) : null)
          .selectAll('rect')
          .data(d => {
            return d[1].map(val => {
              return {
                key: d[0],
                value: val
              };
            });
          })
          .join('rect')
          .attr('x', d => {
            const x = this._chartConf.x(X[d.value]);
            const xz =  this._chartConf.xz(d.key);
            return x + xz;
          })
          .attr('y', d => this._chartConf.y(Y[d.value]))
          .attr('width', this._chartConf.xz.bandwidth())
          .transition(t)
          .attr('height', d => yMin - this._chartConf.y(Y[d.value]));
      }

      // add fixed/calculated lines
      for (const [i, line] of this._element.querySelectorAll(':scope > h-line').entries()) {
        const src = line.getAttribute('src');
        let targetContainer = null;
        let data = null;
        let yValue = NaN;
        if (src) {
          if (this._chartConf.lineGroups.get(src)) {
            targetContainer = this._chartConf.lineContainer;
            data = this._chartConf.lineGroups.get(src);
          } else if (this._chartConf.areaGroups.get(src)) {
            targetContainer = this._chartConf.areaContainer;
            data = this._chartConf.areaGroups.get(src);
          } else if (this._chartConf.barGroups.get(src)) {
            targetContainer = this._chartConf.barContainer;
            data = this._chartConf.barGroups.get(src);
          }
          if (!data) {
            this.error('no data found for src ' + src);
            continue;
          }
          switch (line.getAttribute('value')) {
            case 'avg': {
              let sum = 0.0;
              for (const di of data) {
                sum += Y[di];
              }
              yValue = sum / data.length;
              break;
            }

            case 'max':
              yValue = d3.max(Y.filter((v, i) => data.includes(i), d => d));
              break;

            case 'min':
              yValue = d3.min(Y.filter((v, i) => data.includes(i), d => d));
              break;

            default:
              this.error('unknown value calculation: ' + line.getAttribute('value'));
              break;
          }
        } else {
          targetContainer = this._chartConf.lineContainer || this._chartConf.areaContainer || this._chartConf.barContainer;
          yValue = parseFloat(line.getAttribute('value'));
          data = [0, X.length-1];
        }
        if (!targetContainer) {
          continue;
        }

        let lineElem = targetContainer.select('.line-' + i);
        if (isNaN(yValue) && !lineElem.empty()) {
          // remove line
          lineElem.remove();
          if (line.getAttribute('show-value') === 'true') {
            targetContainer.select('.line-value-' + i).remove();
          }
        } else if (!isNaN(yValue)) {
          const color = line.getAttribute('color') || 'currentColor';
          if (lineElem.empty()) {
            lineElem = targetContainer.append('line')
              .attr('class', 'line-' + i)
              .attr('stroke', color);
          }
          const x1 = this._chartConf.x(X[data[0]]);
          const x2 = this._chartConf.x(X[X.length -1]); // always draw until end of chart (not until end of src dataset)
          const y = this._chartConf.y(yValue);
          lineElem
            .attr('x1', x1)
            .attr('x2', x2)
            .attr('y1', y)
            .attr('y2', y);

          if (line.getAttribute('show-value') === 'true') {
            const format = line.hasAttribute('format') ? line.getAttribute('format')
              : (this._element.hasAttribute('y-format') ? this._element.getAttribute('y-format') : '%s');
            let valueElem = targetContainer.select('.line-value-' + i);
            if (valueElem.empty()) {
              valueElem = targetContainer.append('text')
                .attr('class', 'line-value-' + i)
                .attr('fill', line.getAttribute('value-color') || color)
                .attr('font-size', '10')
                .attr('text-anchor', 'start');
            }
            // show value on right side of the chart
            valueElem
              .attr('x', x2 + 2)
              .attr('y', y + 5)
              .text(cv.util.String.sprintf(format, yValue));
          }
        }
      }

      // dot must be added last
      const dot = svg.select('g.dot');
      if (dot.empty()) {
        svg.append('g')
          .attr('class', 'dot')
          .attr('display', 'none')
          .attr('fill', 'currentColor')
          .append('circle')
          .attr('r', 2.5);
      }
      this._dot = svg.select('g.dot');
    },

    _onPointerEntered(ev) {
      if (this._loaded) {
        this.__toolTipTimer = setTimeout(() => {
          this.__activateTooltip(true, ev);
          this.__toolTipTimer = null;
        }, 500);
      }
    },

    _onPointerLeft(ev) {
      if (this.__toolTipTimer) {
        clearTimeout(this.__toolTipTimer);
      }

      if (this._loaded) {
        if (ev.relatedTarget !== this._tooltip) {
          this.__activateTooltip(false);
        }
      }
    },

    __activateTooltip(val, ev) {
      this.__showTooltip = val;
      if (val) {
        if (this._dot) {
          this._dot.attr('display', null);
          this._dot.raise();
        }
        this._tooltip.style.display = 'block';
        this._onPointerMoved(null, true);
      } else {
        if (this._dot) {
          this._dot.attr('display', 'none');
        }
        const svg = d3.select(this._element).select('svg');
        svg.node().value = null;
        svg.dispatch('input', {bubbles: true});
        this._tooltip.style.display = 'none';
      }
    },

    _onPointerMoved(event, center) {
      if (this._loaded && this.__showTooltip) {
        let xm = 0;
        let ym = 0;
        if (event) {
          [xm, ym] = d3.pointer(event);
        } else if (center) {
          xm = this.__config.width/2;
          ym = this.__config.height/2;
        } else {
          return;
        }
        const {X, Y, I, T, Z, O} = this._helpers;
        const {x, y, xz} = this._chartConf;
        const i = d3.least(I, i => Math.hypot(x(X[i]) - xm, y(Y[i]) - ym));
        const scaleFactorX = this._element.offsetWidth / this.__config.width;
        const scaleFactorY = this._element.offsetHeight / this.__config.height;
        // closest point
        const xOffset = xz ? (xz(Z[i]) + (typeof xz.bandwidth === 'function' ? xz.bandwidth() / 2 : 0)) : 0;
        this._dot.attr('transform', `translate(${x(X[i]) + xOffset},${y(Y[i])})`);
        if (T) {
          const cursorOffset = event && event.pointerType === 'mouse' ? 16 : 40;
          const timeString = this.__config.xFormat(new Date(X[i]));
          let top = ym * scaleFactorY - this._tooltip.offsetHeight;
          if (top < 0) {
            top += cursorOffset + this._tooltip.offsetHeight;
          } else {
            top -= cursorOffset;
          }

          let left = xm * scaleFactorX;
          if (left > this._element.offsetWidth / 2) {
            left -= this._tooltip.offsetWidth + cursorOffset;
          } else {
            left += cursorOffset;
          }

          const key = Z[i];
          const lineTitle = this._dataSetConfigs[key] && this._dataSetConfigs[key].title ? this._dataSetConfigs[key].title + ': ' : '';
          this._tooltip.innerHTML = `${timeString}<br/>${lineTitle}${T[i]}`;
          this._tooltip.style.left = left + 'px';
          this._tooltip.style.top = top + 'px';
        }
        d3.select(this._element).select('svg').property('value', O[i]).dispatch('input', {bubbles: true});
      }
    },

    __updateTitle() {
      if (this._navigationEnabled) {
        let title = this.getHeader('label.title span');
        if (title) {
          let chartTitle = this._titleString || '';
          title.textContent = (chartTitle ? chartTitle + ' - ' : '') + this._shownDateRange();
        }
      }
    },

    /**
     * Converts series to a shot string that is shown in a select box
     * @param series
     * @private
     */
    _seriesToShort(series) {
      switch (series) {
        case 'hour':
          return qx.locale.Manager.tr('Hour');

        case 'day':
          return qx.locale.Manager.tr('Day');

        case 'week':
          return qx.locale.Manager.tr('Week');

        case 'month':
          return qx.locale.Manager.tr('Month');

        case 'year':
          return qx.locale.Manager.tr('Year');
      }
      return '';
    },

    /**
     * Convert the currently shown date range into a human-readable string
     * @private
     */
    _shownDateRange() {
      const series = this.getCurrentSeries();
      const currentPeriod = this.getCurrentPeriod();
      const date = new Date();
      let format = new qx.util.format.DateFormat();
      switch (series) {
        case 'hour':
          date.setHours(date.getHours() - currentPeriod, 0, 0);
          format = new qx.util.format.DateFormat(qx.locale.Date.getDateTimeFormat('hmm', 'h:mm'));
          return format.format(date);

        case 'day':
          if (currentPeriod === 0) {
            return qx.locale.Manager.tr('today');
          } else if (currentPeriod === 1) {
            return qx.locale.Manager.tr('yesterday');
          }
          date.setDate(date.getDate() - currentPeriod);
          format = new qx.util.format.DateFormat(qx.locale.Date.getDateTimeFormat('MMMd', 'd. MMM'));
          return format.format(date);

        case 'week':
          date.setDate(date.getDate() - currentPeriod*7);
          return qx.locale.Manager.trc('CW = calendar week', 'CW %1', this.getWeekNumber(date));

        case 'month':
          date.setMonth(date.getMonth() - currentPeriod);
          if (date.getFullYear() === new Date().getFullYear()) {
            // no year needed
            format = new qx.util.format.DateFormat(qx.locale.Date.getDateTimeFormat('MMM', 'MMM'));
          } else {
            format = new qx.util.format.DateFormat(qx.locale.Date.getDateTimeFormat('yyMMM', 'MMM yy'));
          }
          return format.format(date);

        case 'year':
          return date.getFullYear() - currentPeriod;
      }
      return '';
    },

   getWeekNumber(d) {
      d = new Date(d.getFullYear(), d.getMonth(), d.getDate());
      // Set to the nearest Thursday: current date + 4 - current day number
      d.setDate(d.getDate() + 4 - (d.getDay() || 7));
      // Get first day of year
      const yearStart = new Date(d.getFullYear(), 0, 1);
      // Calculate full weeks to the nearest Thursday
      return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    },

    /**
     * add opacity to color
     * @param color
     * @param opacity {string} hex number 0 - 255
     * @return {string|*}
     * @private
     */
    __opacifyColor(color, opacity) {
      if (color.startsWith('var(')) {
        color = getComputedStyle(document.documentElement).getPropertyValue(color.substring(4, color.length-1));
      }
      if (color.startsWith('rgb(')) {
        return 'rgba(' + color.substring(4, color.length-1) + ', ' + (parseInt(opacity, 16) / 255).toFixed(2) + ')';
      } else if (color.startsWith('#') && color.length === 7) {
        return color + opacity;
      }
      return color;
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct() {
    this._chartConf = null;
    this._helpers = null;
  },

  defer(QxClass) {
    customElements.define(
      cv.ui.structure.tile.Controller.PREFIX + 'chart',
      class extends QxConnector {
        constructor() {
          super(QxClass);
        }
      }
    );
  }
});
