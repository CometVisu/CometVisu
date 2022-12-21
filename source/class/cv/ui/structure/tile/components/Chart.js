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
          decimal: ',',
          thousands: '.',
          grouping: [3],
          currency: ['€', '']
        });

        d3.timeFormatDefaultLocale({
          dateTime: '%A, der %e. %B %Y, %X',
          date: '%d.%m.%Y',
          time: '%H:%M:%S',
          periods: ['AM', 'PM'],
          days: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],

          shortDays: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
          months: [
            'Januar',
            'Februar',
            'März',
            'April',
            'Mai',
            'Juni',
            'Juli',
            'August',
            'September',
            'Oktober',
            'November',
            'Dezember'
          ],

          shortMonths: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez']
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
    _dataSetConfigs: null,

    async _init() {
      const element = this._element;
      if (element.hasAttribute('type')) {
        this.setType(element.getAttribute('type'));
      }
      await cv.ui.structure.tile.components.Chart.JS_LOADED;
      if (this.isVisible()) {
        this._loadData();
      }
    },

    _applyVisible(value) {
      if (value && typeof window.d3 === 'object') {
        this._loadData();
      }
    },

    _loadData() {
      if (this._loaded && Date.now() - this._loaded < 300000) {
        // don't reload within 5 minutes
        return;
      }
      const client = cv.io.BackendConnections.getClient();
      let url;
      const dataSets = this._element.querySelectorAll(':scope > dataset');
      const promises = [];
      this._dataSetConfigs = {};
      for (let dataSet of dataSets) {
        let ts = {
          showArea: true,
          color: '#FF9900',
          type: dataSet.getAttribute('type') || 'line',
          start: 'end-1day',
          end: 'now',
          xFormat: this._element.getAttribute('x-format') || '%H:%M',
          xTicks: d3.timeHour.every(4)
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
        start.setTime(start.getTime() - 60 * 60 * 24 * 1000);
        url = client.getResourcePath('charts', {
          src: ts.src,
          start: ts.start,
          end: ts.end
        });

        if (!url) {
          continue;
        }
        this._dataSetConfigs[ts.src] = ts;
        promises.push(
          cv.io.Fetch.fetch(url, null, false, client)
            .then(data => {
              if (client.hasCustomChartsDataProcessor(data)) {
                data = client.processChartsData(data, ts);
              }
              return {
                data: data,
                ts: ts
              };
            })
            .catch(err => {
              this._onStatusError(ts, url, err);
            })
        );
      }
      Promise.all(promises).then(responses => {
        this._onSuccess(responses);
      });
    },

    _onSuccess(data) {
      if (!this.isVisible()) {
        return;
      }
      let chartData = [];

      for (let entry of data) {
        let tsdata = entry.data;
        if (tsdata !== null) {
          for (let [time, value] of tsdata) {
            chartData.push({
              src: entry.ts.src,
              time,
              value
            });
          }
        }
      }
      let minVal = d3.min(chartData, d => +d.value);
      let maxVal = d3.max(chartData, d => +d.value) + 1;
      if (minVal > 1.0) {
        minVal -= 1;
      }

      const format = this._element.hasAttribute('y-format') ? this._element.getAttribute('y-format') : '%s';

      this._chart = this._lineChart(chartData, {
        x: d => d.time,
        y: d => d.value,
        z: d => d.src,
        color: d => {
          return d && this._dataSetConfigs[d].color;
        },
        title: d => {
          return cv.util.String.sprintf(format, d.value);
        },
        //yLabel: ts.unit,
        xDomain: d3.extent(chartData, d => d.time),
        yDomain: [minVal, maxVal],
        showArea: d => {
          return this._dataSetConfigs[d].showArea;
        },
        mixBlendMode: 'normal',
        xFormat: this.multiTimeFormat([
          [
            '.%L',
            function (d) {
              return d.getMilliseconds();
            }
          ],

          [
            ':%S',
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
        ])
      });

      this._loaded = Date.now();
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

    _onStatusError(ts, key, err) {
      cv.core.notifications.Router.dispatchMessage('cv.charts.error', {
        title: qx.locale.Manager.tr('Communication error'),
        severity: 'urgent',
        message: qx.locale.Manager.tr('URL: %1<br/><br/>Response:</br>%2', JSON.stringify(key), err)
      });

      this.error('Chart _onStatusError', ts, key, err);
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
    _lineChart(data, c) {
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
          xFormat: undefined, // a format specifier string for the x-axis
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
          showArea: undefined, // show area below the line,
          xPadding: 0.1 // amount of x-range to reserve to separate bars
        };
      }
      const config = Object.assign({}, cv.ui.structure.tile.components.Chart.CONFIG, c);

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
        config.yDomain = [0, d3.max(Y, d => (typeof d === 'string' ? +d : d))];
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
      const xAxis = d3
        .axisBottom(xScale)
        .ticks(config.width / 80)
        .tickSizeOuter(0)
        .tickFormat(config.xFormat);
      const yAxis = d3.axisLeft(yScale).ticks(config.height / 60, config.yFormat);

      // Compute titles.
      const T = config.title === undefined ? Z : config.title === null ? null : d3.map(data, config.title);

      d3.select(this._element).select('svg').remove();

      let linePath;

      const pointerMoved = event => {
        const [xm, ym] = d3.pointer(event);
        const i = d3.least(I, i => Math.hypot(xScale(X[i]) - xm, yScale(Y[i]) - ym));

        // closest point
        dot.attr('transform', `translate(${xScale(X[i])},${yScale(Y[i])})`);
        if (T) {
          dot.select('text').text(T[i]);
        }
        svg.property('value', O[i]).dispatch('input', { bubbles: true });
      };

      const pointerEntered = () => {
        dot.attr('display', null);
      };

      const pointerLeft = () => {
        dot.attr('display', 'none');
        svg.node().value = null;
        svg.dispatch('input', { bubbles: true });
      };

      const svg = d3
        .select(this._element)
        .append('svg')
        .attr('viewBox', [0, 0, config.width, config.height])
        .attr('style', 'max-width: 100%; height: auto; height: intrinsic;')
        .style('-webkit-tap-highlight-color', 'transparent')
        .on('pointerenter', pointerEntered)
        .on('pointermove', pointerMoved)
        .on('pointerleave', pointerLeft)
        .on(
          'touchmove',
          event => {
            let y = event.targetTouches[0].clientY;
            if (linePath) {
              const pathRect = linePath.node().getBoundingClientRect();
              if (y > pathRect.y && y < pathRect.y + pathRect.height) {
                event.preventDefault();
              }
            }
          },
          { passive: false }
        );

      svg
        .append('g')
        .attr('transform', `translate(0,${config.height - config.marginBottom})`)
        .call(xAxis);

      svg
        .append('g')
        .attr('transform', `translate(${config.marginLeft},0)`)
        .call(yAxis)
        .call(g => g.select('.domain').remove())
        .call(g =>
          g
            .append('text')
            .attr('x', -config.marginLeft)
            .attr('y', 10)
            .attr('fill', 'currentColor')
            .attr('text-anchor', 'start')
            .text(config.yLabel)
        );

      const lineGroups = new Map();
      const areaGroups = new Map();
      const barGroups = new Map();
      for (let i of I) {
        const key = Z[i];
        if (typeof config.showArea === 'function' && config.showArea(key)) {
          if (!areaGroups.has(key)) {
            areaGroups.set(key, []);
          }
          areaGroups.get(key).push(i);
        }
        switch (this._dataSetConfigs[key].type) {
          case 'line':
            if (!lineGroups.has(key)) {
              lineGroups.set(key, []);
            }
            lineGroups.get(key).push(i);
            break;

          case 'bar':
            if (!barGroups.has(key)) {
              barGroups.set(key, []);
            }
            barGroups.get(key).push(i);
            break;
        }
      }

      if (lineGroups.size > 0) {
        // Construct a line generator.
        const line = d3
          .line()
          //.defined(i => D[i])
          .curve(config.curve)
          .x(i => xScale(X[i]))
          .y(i => yScale(Y[i]));

        linePath = svg
          .append('g')
          .attr('fill', 'none')
          .attr('stroke', typeof config.color === 'string' ? config.color : null)
          .attr('stroke-linecap', config.strokeLinecap)
          .attr('stroke-linejoin', config.strokeLinejoin)
          .attr('stroke-width', config.strokeWidth)
          .attr('stroke-opacity', config.strokeOpacity)
          .selectAll('path')
          .data(lineGroups)
          .join('path')
          .style('mix-blend-mode', config.mixBlendMode)
          .attr('stroke', typeof config.color === 'function' ? p => config.color(p[0]) : null)
          .attr('d', d => line(d[1]));
      }

      // Add the area
      if (areaGroups.size > 0) {
        const area = d3
          .area()
          //.defined(i => D[i])
          .curve(config.curve)
          .x(i => xScale(X[i]))
          .y0(() => config.yRange[0])
          .y1(i => yScale(Y[i]));

        svg
          .append('g')
          .attr('stroke', 'none')
          .attr('fill', typeof config.color === 'string' ? config.color + '30' : null)
          .selectAll('path')
          .data(areaGroups)
          .join('path')
          .style('mix-blend-mode', config.mixBlendMode)
          .attr('fill', typeof config.color === 'function' ? p => config.color(p[0]) + '30' : null)
          .attr('d', d => area(d[1]));
      }

      if (barGroups.size > 0) {
        const xBarScale = d3.scaleBand().domain(X).range(config.xRange).padding(config.xPadding);
        svg
          .append('g')
          .selectAll('g')
          .data(barGroups)
          .join('g')
          .attr('fill', typeof config.color === 'function' ? d => config.color(d[0]) + '30' : null)
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
          .attr('x', d => xBarScale(X[d.value]))
          .attr('y', d => yScale(Y[d.value]))
          .attr('height', d => config.yRange[0] - yScale(Y[d.value]))
          .attr('width', xBarScale.bandwidth());
      }

      const dot = svg.append('g').attr('display', 'none').attr('fill', 'currentColor');

      dot.append('circle').attr('r', 2.5);

      dot
        .append('text')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 10)
        .attr('text-anchor', 'middle')
        .attr('y', -8);

      return Object.assign(svg.node(), { value: null });
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct() {
    this._chart = null;
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
