/* Chart.js
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
 * Shows an chart.
 * @asset(libs/d3.min.js)
 * @asset(libs/d3.min.js.map)
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
    TF: null,

    JS_LOADED: new Promise(async (resolve, reject) => {
      const check = () => typeof window.d3 === 'object';
      try {
        await cv.util.ScriptLoader.includeScript(qx.util.ResourceManager.getInstance().toUri('libs/d3.min.js'));
      } catch (e) {
        qx.log.Logger.error(this, 'Error loading D3:', e);
        reject(new Error('Error loading d3 library'));
        return;
      }

      if (!check()) {
        const timer = new qx.event.Timer(50);
        let counter = 0;
        timer.addListener('interval', () => {
          counter++;
          if (check()) {
            resolve(true);
          } else if (counter > 5) {
            timer.stop();
            qx.log.Logger.error(this, 'Error loading D3: D3 did not load within expected time');
            reject(new Error('Error loading d3 library'));
          }
        });
        timer.start();
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

        cv.ui.structure.tile.components.Chart.TF = d3.timeFormatDefaultLocale({
          dateTime: '%A, der %e. %B %Y, %X',
          date: '%d.%m.%Y',
          time: '%H:%M:%S',
          periods: [qx.locale.Date.getAmMarker().translate().toString(), qx.locale.Date.getPmMarker().translate().toString()],
          days: qx.locale.Date.getDayNames('wide', null, 'format').map(t => t.translate().toString()),

          shortDays: qx.locale.Date.getDayNames('narrow', null, 'stand-alone').map(t => t.translate().toString()),
          months: qx.locale.Date.getMonthNames('wide').map(t => t.translate().toString()),
          shortMonths: qx.locale.Date.getMonthNames('narrow', null, 'stand-alone').map(t => t.translate().toString())
        });
      } else {
        cv.ui.structure.tile.components.Chart.TF = d3.timeFormatDefaultLocale({
          dateTime: '%x, %X',
          date: '%-m/%-d/%Y',
          time: '%-I:%M:%S %p',
          periods: [qx.locale.Date.getAmMarker().translate().toString(), qx.locale.Date.getPmMarker().translate().toString()],
          days: qx.locale.Date.getDayNames('wide', null, 'format').map(t => t.translate().toString()),
          shortDays: qx.locale.Date.getDayNames('narrow', null, 'stand-alone').map(t => t.translate().toString()),
          months: qx.locale.Date.getMonthNames('wide').map(t => t.translate().toString()),
          shortMonths: qx.locale.Date.getMonthNames('narrow', null, 'stand-alone').map(t => t.translate().toString())
        });
      }
    }).catch(() => {}),

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
    },
    minY: {
      check: 'Number',
      nullable: true,
      apply: '__updateYRange',
      event: 'changeMinY'
    },
    maxY: {
      check: 'Number',
      nullable: true,
      apply: '__updateYRange',
      event: 'changeMaxY'
    },

    /** Margin of the widget (top) */
    marginTop: {
      check: 'Integer',
      init: 12,
      apply: '_applyMargin',
      event: 'changeMarginTop'
    },

    /** Margin of the widget (right) */
    marginRight: {
      check: 'Integer',
      init: 24,
      apply: '_applyMargin',
      event: 'changeMarginRight'
    },

    /** Margin of the widget (bottom) */
    marginBottom: {
      check: 'Integer',
      init: 20,
      apply: '_applyMargin',
      event: 'changeMarginBottom'
    },

    /** Margin of the widget (left) */
    marginLeft: {
      check: 'Integer',
      init: 24,
      apply: '_applyMargin',
      event: 'changeMarginLeft'
    },

    /**
     * The 'margin' property is a shorthand property for setting 'marginTop',
     * 'marginRight', 'marginBottom' and 'marginLeft' at the same time.
     *
     * If four values are specified they apply to top, right, bottom and left respectively.
     * If there is only one value, it applies to all sides, if there are two or three,
     * the missing values are taken from the opposite side.
     */
    margin: {
      group: ['marginTop', 'marginRight', 'marginBottom', 'marginLeft'],
      mode: 'shorthand'
    },

    width: {
      check: 'Number',
      init: 392,
      apply: '_applySize',
      event: 'changeWidth'
    },

    height: {
      check: 'Number',
      init: 192,
      apply: '_applySize',
      event: 'changeHeight'
    },

    aspectRatio: {
      check: 'Number',
      init: 392 / 192
    },

    inBackground: {
      check: 'Boolean',
      init: false
    },

    xAxis: {
      check: 'cv.ui.structure.tile.components.chart.XAxis',
      event: 'changeXAxis'
    },
    yAxis: {
      check: 'cv.ui.structure.tile.components.chart.YAxis',
      event: 'changeYAxis'
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
    _loaded: null,
    _datasets: null,
    _initializing: null,
    _navigationEnabled: null,
    __toolTipTimer: null,
    __showTooltip: false,
    __debouncedOnResize: null,
    __resizeTimeout: null,
    __startTs: null,
    __endTs: null,
    __autoHeightForFullscreen: false,
    __fullscreenRenderFrame: null,
    _yFormat: null,

    /**
    * @type {d3.Selection}
    */
    _tooltipIndicator: null,
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
    /**
     * @type {cv.ui.structure.tile.components.chart.Data}
     */
    data: null,

    async _init() {
      this._checkEnvironment();

      this._initializing = true;

      const element = this._element;
      await cv.ui.structure.tile.components.Chart.JS_LOADED;
      if (this.isDisposed()) {
        return;
      }
      this._id = cv.ui.structure.tile.components.Chart.ChartCounter++;
      
      this.setXAxis(new cv.ui.structure.tile.components.chart.XAxis(this));
      this.setYAxis(new cv.ui.structure.tile.components.chart.YAxis(this));
      this.data = new cv.ui.structure.tile.components.chart.Data(this);
      this.bind('minY', this.data, 'minY');
      this.bind('maxY', this.data, 'maxY');

      element.setAttribute('data-chart-id', this._id.toString());
      const inBackground = this._element.hasAttribute('background') && this._element.getAttribute('background') === 'true';
      this.setInBackground(inBackground);

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
        this.addListener('changeFullscreen', ev => this.__handleFullscreenChange(ev.getData()));
      }

      if (element.hasAttribute('refresh')) {
        this.setRefresh(parseInt(element.getAttribute('refresh')));
      }

      if (element.hasAttribute('min')) {
        const minY = parseFloat(element.getAttribute('min'));
        if (!isNaN(minY)) {
          this.setMinY(minY);
        }
      }
      if (element.hasAttribute('max')) {
        const maxY = parseFloat(element.getAttribute('max'));
        if (!isNaN(maxY)) {
          this.setMaxY(maxY);
        }
      }
      if (element.hasAttribute('tooltip-time-format')) {
        this._tooltipTimeFormat = cv.ui.structure.tile.components.Chart.TF.format(element.getAttribute('tooltip-time-format'));
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

        svg.on('pointerenter', ev => this._onPointerEntered(ev));
        svg.on('pointermove', ev => this._onPointerMoved(ev));
        svg.on('pointerleave', ev => this._onPointerLeft(ev));
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

      this._datasets = {};
      this._chartElements = [];
      const dataSets = Array.from(this._element.querySelectorAll(':scope > dataset'));
      const datasetSources = dataSets.map(elem => elem.getAttribute('src'));

      for (let dataSetElement of dataSets) {
        const dataSet = new cv.ui.structure.tile.components.chart.Dataset(dataSetElement, this);
        this._datasets[dataSet.getKey()] = dataSet;
      }

      let i = 0;
      for (const line of this._element.querySelectorAll(':scope > h-line, v-line')) {        
        if (line.hasAttribute('src')) {
          const sourceKey = line.getAttribute('src');
          const otherDataset = this._datasets[sourceKey];
          const dataSet = new cv.ui.structure.tile.components.chart.LineDataset(line, this);
          dataSet.setChartType(line.localName);
          dataSet.setIndex(i);
          if (!otherDataset) {
            this._datasets[dataSet.getKey()] = dataSet;
          } else {
            // this line gets its data from another dataset            
            dataSet.setSourceSet(otherDataset);
            this._datasets['derived-' + i] = dataSet;
          }
        } else {
          // lines with fixed values
          const dataSet = new cv.ui.structure.tile.components.chart.LineDataset(line, this);
          dataSet.setChartType(line.localName);
          dataSet.setIndex(i);
          this._datasets['fixed-' + i] = dataSet;
        }
        i++;
      }

      if (this._element.hasAttribute('background') && this._element.getAttribute('background') === 'true') {
        // no margins
        this.setMargin(this.getMarginTop(), 0, 0, 0);

        // because we have no margins we need to cut the overflow on the tile
        let tile = this._element.parentElement;
        while (tile && tile.localName !== 'cv-tile') {
          tile = tile.parentElement;
        }
        if (tile && tile.localName === 'cv-tile') {
          tile.style.overflow = 'hidden';
        }
      }

      this._initAxes();
      this._initChartContent();

      this._initializing = false;
      this.__updateTitle();
      qx.locale.Manager.getInstance().addListener('changeLocale', this._onLocaleChanged, this);

      // check if we have a read address for live updates
      const readAddresses = Array.from(element.querySelectorAll(':scope > cv-address:not([mode="write"])')).filter(elem => datasetSources.includes(elem.getAttribute('target')));
      if (readAddresses.length > 0) {
        element.addEventListener('stateUpdate', ev => {
          this.onStateUpdate(ev);
          // cancel event here
          ev.stopPropagation();
        });
      }
    },

    getXPos(i, isValue = false) {
      const scale = this.overrideXScale || this.getXAxis().getScale();
      if (isValue) {
        return scale(i);
      }
      return scale(this.data.times[i]);
    },

    getYPos(i, isValue = false) {
      if (isValue) {
        return this.getYAxis().getScale()(i);
      }
      return this.getYAxis().getScale()(this.data.values[i]);
    },

    getMinYPos() {
      return this.getYAxis().getRange()[0];
    },

    _applySize() {
      this.setAspectRatio(this.getWidth() / this.getHeight());
      d3.select(this._element).select('svg')
          .attr('viewBox', `0, 0, ${this.getWidth()}, ${this.getHeight()}`);
    },

    _applyMargin() {},

    __updateYRange(value, oldValue, name) {
      if (!this.isPropertyInitialized('yAxis')) {
        return;
      }
      if (name === 'maxY') {
        const minY = this.getMinY();
        if (minY !== null) {
          this.getYAxis().setDomain([minY, value]);
        }
      } else if (name === 'minY') {
        const maxY = this.getMaxY();
        if (maxY !== null) {
          this.getYAxis().setDomain([value, maxY]);
        }
      }
    },

    _initAxes() {
      const xAxis = this.getXAxis();
      const yAxis = this.getYAxis();

      // init some fixed settings
      let timeFormatString = '';
      let yFormat = '';

      const xSettings = {};
      const ySettings = {};

      const xAxisElement = this._element.querySelector(':scope > x-axis');
      if (xAxisElement) {
        if (xAxisElement.hasAttribute('format')) {
          timeFormatString = xAxisElement.getAttribute('format');
        }
        xSettings.show = true;
        xSettings.showLine = xAxisElement.hasAttribute('show-line') && xAxisElement.getAttribute('show-line') === 'true';
        if (xAxisElement.hasAttribute('tick-size')) {
          xSettings.tickSize = parseInt(xAxisElement.getAttribute('tick-size'));
        }

        if (xAxisElement.hasAttribute('min')) {
          const minX = parseFloat(xAxisElement.getAttribute('min'));
          if (!isNaN(minX)) {
            this.setMinX(minX);
          }
        }
        if (xAxisElement.hasAttribute('max')) {
          const maxX = parseFloat(xAxisElement.getAttribute('max'));
          if (!isNaN(maxX)) {
            this.setMaxX(maxX);
          }
        }
      } else {
        // fallback mode when no special axis element is there, to still support old configs
        if (this._element.hasAttribute('x-format')) {
          timeFormatString = this._element.getAttribute('x-format');
        }
        xSettings.show = !this._element.hasAttribute('show-x-axis') || this._element.getAttribute('show-x-axis') === 'true';
      }

      if (timeFormatString) {
        xSettings.tickFormat = date => cv.ui.structure.tile.components.Chart.TF.format(qx.locale.Manager['tr'](timeFormatString))(date);
      } else {
        // format auto-detection
        xSettings.tickFormat = this.multiTimeFormat();
      }

      const yAxisElement = this._element.querySelector(':scope > y-axis');
      if (yAxisElement) {
        if (yAxisElement.hasAttribute('format')) {
          yFormat = yAxisElement.getAttribute('format');
        }
        if (yAxisElement.hasAttribute('tick-size')) {
          ySettings.tickSize = parseInt(yAxisElement.getAttribute('tick-size'));
        }
        ySettings.show = true;
        ySettings.showLine = yAxisElement.hasAttribute('show-line') && yAxisElement.getAttribute('show-line') === 'true';

        if (yAxisElement.hasAttribute('min')) {
          const minY = parseFloat(yAxisElement.getAttribute('min'));
          if (!isNaN(minY)) {
            this.setMinY(minY);
          }
        }
        if (yAxisElement.hasAttribute('max')) {
          const maxY = parseFloat(yAxisElement.getAttribute('max'));
          if (!isNaN(maxY)) {
            this.setMaxY(maxY);
          }
        }
      } else {
        // fallback mode when no special axis element is there, to still support old configs
        if (this._element.hasAttribute('y-format')) {
          yFormat = this._element.getAttribute('y-format');
        }
        ySettings.show = !this._element.hasAttribute('show-y-axis') || this._element.getAttribute('show-y-axis') === 'true';
      }

      this._yFormat = yFormat;
      const showGrid = this._element.hasAttribute('show-grid') ? this._element.getAttribute('show-grid') : 'xy';
      xSettings.showGrid = showGrid.includes('x');
      ySettings.showGrid = showGrid.includes('y');

      xAxis.set(xSettings);      
      yAxis.set(ySettings);

      xAxis.render();
      yAxis.render();
    },

    _initChartContent() {
      const chartElements = [];
      let line = null; 
      let area = null;
      let bar = null; 
      let stackedBar = null;
      for (const key in this._datasets) {
        const ds = this._datasets[key];
        switch (ds.getChartType()) {
          case 'line': {
            if (!line) {
              line = new cv.ui.structure.tile.components.chart.LineGroup(this);
              chartElements.push(line);
            }
            line.addDataset(ds);
            if (ds.isShowArea()) {
              if (!area) {
                area = new cv.ui.structure.tile.components.chart.AreaGroup(this);
                chartElements.push(area);
              }
              area.addDataset(ds);
            }
            break;
          }

          case 'area': {
            if (!area) {
                area = new cv.ui.structure.tile.components.chart.AreaGroup(this);
                chartElements.push(area);
              }
              area.addDataset(ds);
            break;
          }

          case 'bar':
            //barGroups.set(key, I.filter(i => this.data.keys[i] === key));
            if (!bar) {
              bar = new cv.ui.structure.tile.components.chart.BarGroup(this);
              chartElements.push(bar);
            }
            bar.addDataset(ds);
            break;

          case 'stacked-bar':
            if (!stackedBar) {
              stackedBar = new cv.ui.structure.tile.components.chart.StackedBarGroup(this);
              chartElements.push(stackedBar);
            }
            stackedBar.addDataset(ds);
            break;
        }
      }
      this._chartElements = chartElements;
    },

    _onLocaleChanged() {
      this.__updateTitle();
      const popup = this._headerFooterParent.querySelector('div.popup.series');
      if (popup) {
        for (const option of popup.querySelectorAll('cv-option')) {
          option.textContent = this._seriesToShort(option.getAttribute('key'));
        }
      }
    },

    onStateUpdate(ev) {
      const targetDataset = this._element.querySelector(':scope > dataset[src="' + ev.detail.target + '"]');
      const config = this._datasets ? this._datasets[ev.detail.target] : null;
      if (targetDataset && config) {
        let ts = Date.now();
        if (config.getAggregationInterval()) {
          const mins = config.getAggregationInterval() * 60 * 1000;
          ts = Math.round(ts / mins) * mins;
        }
        this._renderChart({
          src: ev.detail.target,
          key: ev.detail.target,
          time: ts,
          value: ev.detail.state
        }, true);
      }
    },

    _onSeriesPrev() {
      this.setCurrentPeriod(this.getCurrentPeriod()+1);
    },

    _onSeriesChange(select) {
      if (this.getCurrentSeries() !== select) {
        this._initializing = true;
        // reset offset when series changed
        this.resetCurrentPeriod();
        this._initializing = false;
        // reset configuration, we need a new one
        this.setCurrentSeries(select);
      }
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
        const newSelection = this.getHeader(`.popup.series > cv-option[key='${series}']`);
        if (newSelection) {
          newSelection.setAttribute('selected', 'selected');
        }
      }
      this.__updateTimeRange();
    },
    

    __updateTimeRange() {
      if (this.isDisposed() || !this._element) {
        return;
      }
      const series = this.getCurrentSeries();

      const currentPeriod = this.getCurrentPeriod();
      let end = new Date();
      let periodStart = new Date();
      let interval = 0;
      switch (series) {
        case 'hour':
          interval = 60 * 60;
          periodStart = d3.timeHour.floor(periodStart);
          periodStart = d3.timeHour.offset(periodStart, -currentPeriod);
          end = d3.timeHour.offset(periodStart, 1);
          break;

        case 'day':
          interval = 24 * 60 * 60;
          periodStart = d3.timeDay.floor(periodStart);
          periodStart = d3.timeDay.offset(periodStart, -currentPeriod);
          end = d3.timeDay.offset(periodStart, 1);
          break;

        case 'week':
          interval = 7 * 24 * 60 * 60;
          periodStart = d3.timeMonday.floor(periodStart);
          periodStart = d3.timeMonday.offset(periodStart, -currentPeriod);
          end = d3.timeMonday.offset(periodStart, 1);
          break;

        case 'month':
          interval = 30 * 24 * 60 * 60;
          periodStart = d3.timeMonth.floor(periodStart);
          periodStart = d3.timeMonth.offset(periodStart, -currentPeriod);
          end = d3.timeMonth.offset(periodStart, 1);
          break;

        case 'year':
          interval = 365 * 24 * 60 * 60;
          periodStart = d3.timeYear.floor(periodStart);
          periodStart = d3.timeYear.offset(periodStart, -currentPeriod);
          end = d3.timeYear.offset(periodStart, 1);
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

      const promises = [];
      let options = {ttl: this.getRefresh()};
      for (const key in this._datasets) {
        const ts = this._datasets[key];
        const p = ts.fetch(
          this.getStartTime(),
          this.getEndTime(),
          this.getCurrentSeries(),
          this.getCurrentPeriod(),
          options
        );
        promises.push(p);
      }

      Promise.all(promises).then(responses => {
        if (!this.isDisposed()) {
          this._onSuccess(responses.filter(r => r !== null));
        }
      });
    },

    _onSuccess(chartData) {
      // wait some time to let the element size settle
      this.__resizeTimeout = setTimeout(() => {
        if (!this.isDisposed()) {
          // append all dataset fetched data to a single flat array
          this._onRendered(chartData.flat());
        }
      }, 100);
    },

    _onRendered(chartData, retries) {
      if (this.__resizeTimeout) {
        clearTimeout(this.__resizeTimeout);
        this.__resizeTimeout = null;
      }
      if (this.isDisposed()) {
        return;
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

        this.setWidth(width);
        this.setHeight(height);
        if (chartData) {
          this._renderChart(chartData);
          this._loaded = Date.now();
        } else {
          this._render();
        }
      }
    },

    __handleFullscreenChange(isFullscreen) {
      if (this.__fullscreenRenderFrame) {
        window.cancelAnimationFrame(this.__fullscreenRenderFrame);
        this.__fullscreenRenderFrame = null;
      }

      if (!isFullscreen && this.__autoHeightForFullscreen) {
        this._element.style.height = '';
        this.__autoHeightForFullscreen = false;
      }

      if (isFullscreen) {
        this._onRendered();
        return;
      }

      this.__fullscreenRenderFrame = window.requestAnimationFrame(() => {
        this.__fullscreenRenderFrame = window.requestAnimationFrame(() => {
          this.__fullscreenRenderFrame = null;
          if (!this.isDisposed()) {
            this._onRendered();
          }
        });
      });
    },

    _getSize() {
      const parent = this._element.parentElement;
      let padding = this.isInBackground() ? 0 : 8;
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
      const isFullscreenContainer = parent.localName === 'cv-popup' && parent.getAttribute('fullscreen') === 'true' ||
        this._element.getAttribute('allow-fullscreen') === 'true' && parent.parentElement.classList.contains('fullscreen');
      if (isFullscreenContainer && (!this._element.style.height || this.__autoHeightForFullscreen)) {
        // the parent container has height: auto, so we need to have one
        this._element.style.height = (height + this.getMarginTop() + this.getMarginBottom()) + 'px';
        this.__autoHeightForFullscreen = true;
      } else if (!isFullscreenContainer && this.__autoHeightForFullscreen) {
        this._element.style.height = '';
        this.__autoHeightForFullscreen = false;
      }
      return [width, height];
    },

    multiTimeFormat() {
      let locale = cv.ui.structure.tile.components.Chart.TF;

      const formatMillisecond = locale.format(qx.locale.Manager.tr('.%L'));
        const formatSecond = locale.format(qx.locale.Manager.tr(':%S'));
        const formatMinute = locale.format(qx.locale.Manager.tr('%I:%M'));
        const formatHour = locale.format(qx.locale.Manager.tr('%I %p'));
        const formatDay = locale.format(qx.locale.Manager.tr('%a %d'));
        const formatWeek = locale.format(qx.locale.Manager.tr('%b %d'));
        const formatMonth = locale.format(qx.locale.Manager.tr('%b'));
        const formatYear = locale.format(qx.locale.Manager.tr('%Y'));
      /**
       * @param date
       */
      function multiFormat(date) {
         return (d3.timeSecond(date) < date ? formatMillisecond
            : d3.timeMinute(date) < date ? formatSecond
            : d3.timeHour(date) < date ? formatMinute
            : d3.timeDay(date) < date ? formatHour
            : d3.timeMonth(date) < date ? (d3.timeWeek(date) < date ? formatDay : formatWeek)
            : d3.timeYear(date) < date ? formatMonth
            : formatYear)(date);
      }
      return date => d3.timeFormat(multiFormat(date))(date);
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

    getSvgElement(nodeName, classes, attributes) {
      return this._getSvgElement(d3.select(this._element).select('svg'), nodeName, classes, attributes);
    },

    getDataset(key) {
      return this._datasets[key];
    },

    _render() {
      // Render the chart elements without new data
      this.getXAxis().render();
      this.getYAxis().render();      
      for (const series of this._chartElements) {
        series.render();
      }

      let zero = d3.select(this._element).select('svg').select('.zero-line');
      if (zero) {
        const [x1, x2] = this.getXAxis().getRange();
        const y = this.getYPos(0.0, true);
        zero
          .attr('x1', x1)
          .attr('x2', x2)
          .attr('y1', y)
          .attr('y2', y);
      }
      this.__addLines();
    },

    /**
     * @param data
     * @param {Boolean} single Add a single data point to the chart
     * @private
     */
    _renderChart(data, single) {
      const xAxis = this.getXAxis();
      const yAxis = this.getYAxis();
      const svg = d3.select(this._element).select('svg');

      if (single) {
        if (!this.data.append(data)) {
          return;
        }
      } else {
        this.data.setData(data);        
      }

      const hasStackedBar = this._chartElements.some(group => group.getType() === 'stacked-bar');
      const hasBar = this._chartElements.some(group => group.getType() === 'bar');

      // Compute default domains, and unique the z-domain.
      if (hasBar || hasStackedBar) {
        this.data.interpolate(this.getCurrentSeries());
      }
      xAxis.setDomain(this.data.getTimesDomain());
      if (this.overrideXScale) {
        this.overrideXScale.domain(this.data.getTimesDomain());
      }
      if (!this.getMinY() && !this.getMaxY() && !hasStackedBar) {
        yAxis.setDomain(this.data.getValuesDomain());
      }

      this._tooltipIndicator = svg.select('g.tooltip-indicator');

      const defaultTransition = d3.transition()
        .duration(500)
        .ease(d3.easeLinear);
      for (const series of this._chartElements) {
        series.render(single ? undefined : defaultTransition);
      }

       // show zero line in grid for non-zero based charts
      if (this.data.getValuesDomain()[0] !== 0) {
        let targetContainer = this._chartElements.length > 0 ? this._chartElements[0].getContainer() : svg;
        let lineElem = targetContainer.select('.zero-line');
        if (lineElem.empty()) {
          lineElem = targetContainer.append('line')
            .attr('class', 'zero-line')
            .attr('stroke', 'currentColor')
            .attr('stroke-opacity', '15%');
        }
        const [x1, x2] = this.getXAxis().getRange();
        const y = this.getYPos(0.0, true);
        lineElem
          .attr('x1', x1)
          .attr('x2', x2)
          .attr('y1', y)
          .attr('y2', y);
      }

      // add fixed/calculated lines
      this.__addLines();

      // tooltipIndicator must be added last
      const tti = svg.select('g.tooltip-indicator');
      if (tti.empty()) {
        const [y1, y2] = this.getYAxis().getRange();
        svg.append('g')
          .attr('class', 'tooltip-indicator')
          .attr('display', 'none')
          .attr('stroke', 'currentColor')
          .append('line')
          .attr('x1', 0)
          .attr('x2', 0)
          .attr('y1', y1)
          .attr('y2', y2);
        this._tooltipIndicator = svg.select('g.tooltip-indicator');
      }
    },

    __addLines() {
      for (const key in this._datasets) {
        const ds = this._datasets[key];
        if (ds instanceof cv.ui.structure.tile.components.chart.LineDataset) {
          let targetContainer;
          let value = NaN;
          // handle line dataset
          const name = ds.getChartType();
          if (key.startsWith('fixed-')) {
            targetContainer = this._chartElements.length > 0 ? this._chartElements[0].getContainer() : null;
            if (name === 'h-line') {
              value = parseFloat(ds.getValue());
            } else {
              value = new Date(ds.getValue()).getTime();
            }
          } else {
            let targetGroup;
            let srcKey = key;
            let isLineKey = false;
            if (key.startsWith('derived-')) {
              const derivedFrom = ds.getSourceSet();
              srcKey = derivedFrom.getKey();              
            } else {
              isLineKey = !this.data.keys.includes(key);
            }
            targetGroup = this._chartElements.find(group => group.hasDataset(srcKey));
            targetContainer = targetGroup ? targetGroup.getContainer() : (this._chartElements.length > 0 ? this._chartElements[0].getContainer() : null);

            let indices = isLineKey ? this.data.getLineIndicesForKey(srcKey) : this.data.getIndicesForKey(srcKey);
            if (targetContainer) {
              if (!indices) {
                this.error('no data found for key ' + srcKey);
                continue;
              }
              if (name === 'h-line') {
                const values = isLineKey ? this.data.lineValues : this.data.values;
                // we can only do calculations for values on the Y-Axis for horizontal lines
                switch (ds.getValue()) {
                  case 'avg': {
                    let sum = 0.0;
                    for (const di of indices) {
                      sum += values[di];
                    }
                    value = sum / indices.length;
                    break;
                  }

                  case 'max':
                    value = d3.max(values.filter((v, i) => indices.includes(i), d => d));
                    break;

                  case 'min':
                    value = d3.min(values.filter((v, i) => indices.includes(i), d => d));
                    break;

                  default:
                    this.error('unknown value calculation: ' + ds.getValue());
                    break;
                }
              } else {
                value = isLineKey ? this.data.lineTimes[indices[0]] : this.data.times[indices[0]];
              }
            }
          }
          if (!targetContainer) {
            continue;
          }

          let lineElem = targetContainer.select(`.${name}-${ds.getIndex()}`);
          if (isNaN(value) && !lineElem.empty()) {
            // remove line
            lineElem.remove();
            if (ds.getShowValue()) {
              targetContainer.select(`.${name}-value-${ds.getIndex()}`).remove();
            }
          } else if (!isNaN(value)) {
            const valuecolor = ds.getValueColor();
            const lineColor =  cv.util.Color.opacify(ds.getColor(), this.getDatasetOpacity());
            if (lineElem.empty()) {
              lineElem = targetContainer.append('line')
                .attr('class', `${name}-${ds.getIndex()}`)
                .attr('stroke', lineColor);
            }
            let formatAttribute = 'y-format';
            let x1;
            let x2;
            let y1;
            let y2 = 0;
            const xScale = this.overrideXScale || this.getXAxis().getScale();
            const yScale = this.getYAxis().getScale();
            if (name === 'h-line') {
              [x1, x2] = this.getXAxis().getRange();
              y1 = yScale(value);
              y2 = y1;
            } else {
              [y1, y2] = this.getYAxis().getRange();
              x1 = xScale(value);
              x2 = x1;

              formatAttribute = 'x-format';
            }

            lineElem
              .attr('x1', x1)
              .attr('x2', x2)
              .attr('y1', y1)
              .attr('y2', y2);

            if (ds.getShowValue()) {
              const format = ds.getFormat() ||
                 (this._element.hasAttribute(formatAttribute) ? this._element.getAttribute(formatAttribute) : '%s');
              let valueElem = targetContainer.select(`.${name}-value-${ds.getIndex()}`);
              if (valueElem.empty()) {
                valueElem = targetContainer.append('text')
                  .attr('class', `${name}-value-${ds.getIndex()}`)
                  .attr('fill', valuecolor !== 'currentColor' ? valuecolor : lineColor)
                  .attr('font-size', '10')
                  .attr('text-anchor', 'start');
              }
              if (name === 'h-line') {
                // show value on right side of the chart
                valueElem
                  .attr('x', x2 + 2)
                  .attr('y', y1 + 5)
                  .text(cv.util.String.sprintf(format, value));
              } else {
                // show value on top of the chart
                valueElem
                  .attr('x', x1 + 2)
                  .attr('y', y2)
                  .text(cv.ui.structure.tile.components.Chart.TF.format(qx.locale.Manager['tr'](format))(value));
              }
            }
          }
        }
      }
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
        if (this._tooltipIndicator) {
          this._tooltipIndicator.attr('display', null);
          this._tooltipIndicator.raise();
        }
        this._tooltip.style.display = 'block';
        this._onPointerMoved(ev, true);
      } else {
        if (this._tooltipIndicator) {
          this._tooltipIndicator.attr('display', 'none');
        }
        const svg = this.getSvg();
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
          xm = this.getWidth()/2;
          ym = this.getHeight()/2;
        } else {
          return;
        }

        // closest point on x-axis
        const indices = this.data.lineIndices.length > 0 ? this.data.lineIndices : this.data.indices;
        const i = d3.least(indices, i => {
          const pos = this.getXPos(i);
          if (pos === undefined) {
            return Number.MAX_VALUE;
          }
          return Math.abs(pos - xm);
        });
        const scaleFactorX = this._element.offsetWidth / this.getWidth();
        const scaleFactorY = this._element.offsetHeight / this.getHeight();
        let xOffset = 0;
        const key = this.data.keys[i];
        const time = this.data.times[i];
        const dataset = this._datasets[key];
        if (dataset) {
          if (dataset.getChartType() === 'bar' || dataset.getChartType() === 'stacked-bar') {
            // find the bar group for this dataset
            const barGroup = this._chartElements.find(group => group.hasDataset(key));
            xOffset = barGroup ? (barGroup.getBandWidth() / 2) : 0;
          }
        }
        if (this._tooltipIndicator) {
          this._tooltipIndicator.attr('transform', `translate(${this.getXPos(i) + xOffset},0)`);
        }
        const cursorOffset = event && event.pointerType === 'mouse' ? 16 : 40;
        const timeString = this._tooltipTimeFormat ? this._tooltipTimeFormat(new Date(time)) : this.getXAxis().getTickFormat()(new Date(time));
        const valueStrings = [];
        // collect all y values for this time
        const otherYIndices = this.data.values.map((_, index) => index).filter(index => this.data.times[index] === time);
        for (const v of otherYIndices) {
          const k = this.data.keys[v];
          const ds = this._datasets[k];
          const lt = ds && ds.getTitle() ? `<span style='color: ${ds.getColor()}; font-weight: bold;'>| </span><i>${ds.getTitle()}:</i> ` : '';
          valueStrings.push(lt + cv.util.String.sprintf(this._yFormat, this.data.values[v]));
        }
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

        this._tooltip.innerHTML = `<strong>${timeString}</strong><br/>${valueStrings.join('<br/>')}`;
        this._tooltip.style.left = left + 'px';
        this._tooltip.style.top = top + 'px';
        
        d3.select(this._element).select('svg').property('value', this.data.data[i]).dispatch('input', {bubbles: true});
      }
    },

    getSvg() {
      return d3.select(this._element).select('svg');
    },

    /**
     * Retrieves the dataset opacity as a hexadecimal string based on the 'dataset-opacity' attribute.
     * The attribute value should be an integer between 0 and 99 (inclusive), representing the opacity percentage.
     * Converts the percentage to a value between 0x00 and 0xFF (0-255) and returns it as a hexadecimal string.
     * Returns null if the attribute is not present or the value is invalid.
     *
     * @returns {string|null} The opacity as a hexadecimal string, or null if not set or invalid.
     */
    getDatasetOpacity() {
      if (this._element.hasAttribute('dataset-opacity')) {
        const parsedOpacity = parseInt(this._element.getAttribute('dataset-opacity'));
        if (!isNaN(parsedOpacity) && parsedOpacity >= 0 && parsedOpacity <= 100) {
          return Math.round(255/100 * parsedOpacity).toString(16);
        }
      }
      return null;
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
    
    _disconnected() {
      super._disconnected();
      qx.locale.Manager.getInstance().removeListener('changeLocale', this._onLocaleChanged, this);
      if (this.__resizeTimeout) {
        clearTimeout(this.__resizeTimeout);
        this.__resizeTimeout = null;
      }
      if (this.__fullscreenRenderFrame) {
        window.cancelAnimationFrame(this.__fullscreenRenderFrame);
        this.__fullscreenRenderFrame = null;
      }
      if (this.__toolTipTimer) {
        clearTimeout(this.__toolTipTimer);
        this.__toolTipTimer = null;
      }
      if (cv.Config.unitTesting && this._datasets) {
        this._disposeMap('_datasets');
        this._datasets = {};
      }
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct() {
    this._disposeMap('_datasets');
    qx.locale.Manager.getInstance().removeListener('changeLocale', this._onLocaleChanged, this);
    if (this.__resizeTimeout) {
      clearTimeout(this.__resizeTimeout);
      this.__resizeTimeout = null;
    }
    if (this.__fullscreenRenderFrame) {
      window.cancelAnimationFrame(this.__fullscreenRenderFrame);
      this.__fullscreenRenderFrame = null;
    }
    if (this.__toolTipTimer) {
      clearTimeout(this.__toolTipTimer);
      this.__toolTipTimer = null;
    }
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
