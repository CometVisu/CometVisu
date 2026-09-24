/* Plot.js
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
 * Draws the graphs of a diagram2 widget with d3.
 *
 * One instance owns the svg inside the given element and redraws itself whenever that element
 * changes its size. The interface follows the plot object of the flot based diagram plugin
 * closely - create it once, hand in the data, draw - so that the widget around it stays the same.
 *
 * @ignore(d3)
 * @ignore(ResizeObserver)
 */
qx.Class.define('cv.plugins.diagram2.Plot', {
  extend: qx.core.Object,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  /**
   * @param element {Element} container the diagram is drawn into
   * @param options {Map} axes, colors, legend and tooltip settings of the widget
   */
  construct(element, options) {
    super();
    this._element = element;
    this._options = Object.assign(
      {
        axes: [],
        gridcolor: '#81664B',
        tooltip: false,
        timeformat: null,
        timeformatTooltip: '%d.%m.%Y %H:%M',
        legend: { show: false, position: 'ne' },
        showLabels: true,
        interactive: false,
        zoomYAxis: false,
        gridWidth: cv.plugins.diagram2.Plot.GRID_WIDTH,
        gridOpacity: cv.plugins.diagram2.Plot.GRID_OPACITY,
        borderWidth: cv.plugins.diagram2.Plot.BORDER_WIDTH,
        // null keeps the two defaults below, a number applies to lines and outlines alike
        lineWidth: null
      },
      options || {}
    );

    this._series = [];
    this.__build();
  },

  /*
  ***********************************************
    EVENTS
  ***********************************************
  */
  events: {
    /** the visible time range has been changed by the user, data for it should be loaded */
    rangeChanged: 'qx.event.type.Data'
  },

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    /** the palette flot uses for series without a configured color */
    COLORS: ['#edc240', '#afd8f8', '#cb4b4b', '#4da74d', '#9440ed'],

    BACKGROUND: '#000000',
    /** the legend background of the flot based diagram, at its default opacity of 0.85 */
    LEGEND_BACKGROUND: 'rgba(16, 16, 16, 0.85)',

    /** flot draws this border around the color box of a legend entry */
    LEGEND_BOX_BORDER: '#ccc',

    /** flot draws the tick labels in this color, in a font one step smaller than the widget */
    LABEL_COLOR: '#545454',

    /** the size jquery.flot.axislabels.js uses for the title of an axis */
    AXIS_TITLE_SIZE: 14,

    /** the room every side keeps between the outermost label and the edge of the diagram */
    PLOT_PADDING: 3,

    /** what flot keeps between two axes on the same side, its grid.axisMargin */
    AXIS_GAP: 8,

    /** what the designs give the tooltip of the flot based diagram */
    TOOLTIP_BACKGROUND: '#fee',
    TOOLTIP_BORDER: '#fdd',
    TOOLTIP_COLOR: '#000000',

    /** flot draws the area below a filled line with 40% of the line color */
    FILL_OPACITY: 0.4,

    /** the zoom step of the flot navigate plugin */
    ZOOM_AMOUNT: 1.5,

    /** flots autoscaleMargin for value axes: 2% of the span above and below the data */
    AUTOSCALE_MARGIN: 0.02,

    /**
     * The default stroke widths. flot is heavier here: it draws its grid lines with 1 as well,
     * but the frame around the plotting area with grid.borderWidth 2 and every graph with
     * lines.lineWidth 2 - bars and points included. The attributes gridwidth, borderwidth and
     * linewidth reach those values.
     */
    GRID_WIDTH: 1,
    BORDER_WIDTH: 1,
    LINE_WIDTH: 1.5,
    /** the outline of bars and points has always been thinner than the line of a graph */
    OUTLINE_WIDTH: 1,

    /**
     * How solid the grid lines are drawn. The flot based diagram uses the full grid color - its
     * own default of 22% alpha never applies, because the plugin sets grid.tickColor itself - so
     * gridopacity 1 is the value that matches it.
     */
    GRID_OPACITY: 0.4
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _element: null,
    _options: null,
    _series: null,
    _svg: null,
    /** everything draw() creates lives in here, the catching surface stays outside of it */
    _content: null,
    _capture: null,
    _legend: null,
    _tooltip: null,
    _marker: null,
    _observer: null,
    _layout: null,
    /** canvas and context used to measure the width of a label */
    __canvas: null,
    __context: null,
    /** the time range the user has panned or zoomed to, in milliseconds */
    _view: null,
    /** the value ranges the user has zoomed to, by axis number */
    _yViews: null,

    /**
     * Replaces the data of the diagram. It is drawn by the next draw().
     * @param series {Array} one entry per graph
     */
    setData(series) {
      this._series = Array.isArray(series) ? series.filter(entry => !!entry) : [];
    },

    /**
     * The data currently shown.
     * @return {Array}
     */
    getData() {
      return this._series;
    },

    /**
     * The time range the user has panned or zoomed to, null while the diagram shows its data as
     * it came in.
     * @return {Array|null} start and end in milliseconds
     */
    getView() {
      return this._view;
    },

    /**
     * Draws everything: grid, axes, graphs and legend. Doing nothing while the element has no
     * size is intended - the resize observer calls again as soon as it has one.
     */
    draw() {
      const width = this._element.clientWidth;
      const height = this._element.clientHeight;
      if (!width || !height) {
        return;
      }

      const axes = this.__axes();
      const layout = this.__layout(width, height, axes);
      this._layout = layout;

      this._svg.attr('width', width).attr('height', height).attr('viewBox', `0 0 ${width} ${height}`);
      this._content.selectAll('*').remove();

      this.__drawGrid(layout);
      this.__drawAxes(layout);
      this.__drawSeries(layout);
      this.__drawFrame(layout);
      this.__drawLegend(layout);

      this._marker = this._content.append('circle').attr('class', 'marker').attr('r', 3).style('display', 'none');
    },

    /**
     * Drops the observer and the elements. The widget calls this when its popup closes.
     */
    shutdown() {
      if (this._observer) {
        this._observer.disconnect();
        this._observer = null;
      }
      if (this._element) {
        this._element.innerHTML = '';
      }
      this._svg = null;
      this._content = null;
      this._capture = null;
      this._legend = null;
      this._tooltip = null;
      this._marker = null;
      this.__canvas = null;
      this.__context = null;
    },

    /**
     * Creates the svg, the legend and the tooltip inside the container.
     */
    __build() {
      const element = this._element;
      element.innerHTML = '';
      if (window.getComputedStyle(element).position === 'static') {
        // the legend and the tooltip are placed relative to the diagram
        element.style.position = 'relative';
      }
      // only the plotting area is dark, the margin with the labels keeps the design behind it
      element.style.overflow = 'hidden';

      this._svg = d3
        .select(element)
        .append('svg')
        .attr('class', 'diagram2-plot')
        .style('display', 'block')
        .style('width', '100%')
        .style('height', '100%');

      // Everything that is drawn lives in this group, draw() empties it. Above it sits a surface
      // that is never removed: iOS delivers the rest of a gesture to the element the finger
      // started on, and if that element is gone with the redraw, the gesture dies there.
      this._content = this._svg.append('g').attr('class', 'content');
      this._capture = this._svg
        .append('rect')
        .attr('class', 'capture')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', '100%')
        .attr('height', '100%')
        .attr('fill', 'none')
        .style('pointer-events', 'all');

      this._legend = d3
        .select(element)
        .append('div')
        .attr('class', 'diagram2-legend')
        .style('position', 'absolute')
        .style('display', 'none')
        .style('padding', '3px 5px')
        .style('line-height', '1.4')
        .style('pointer-events', 'none')
        // measured on a flot diagram: the labels run in the size of the tick labels, in the grid color
        .style('font-size', this.__labelSize() + 'px')
        .style('color', this._options.gridcolor)
        .style('background-color', cv.plugins.diagram2.Plot.LEGEND_BACKGROUND);

      this._tooltip = d3
        .select(element)
        .append('div')
        .attr('class', 'diagram2-tooltip')
        .style('position', 'absolute')
        .style('display', 'none')
        // the values the designs give flots tooltip, see "#diagramTooltip, #flotTip"
        .style('padding', '2px')
        .style('text-align', 'center')
        .style('pointer-events', 'none')
        .style('border', '1px solid ' + cv.plugins.diagram2.Plot.TOOLTIP_BORDER)
        .style('background-color', cv.plugins.diagram2.Plot.TOOLTIP_BACKGROUND)
        .style('color', cv.plugins.diagram2.Plot.TOOLTIP_COLOR)
        .style('opacity', 0.8);

      if (this._options.tooltip) {
        const node = this._svg.node();
        node.addEventListener('pointermove', e => this.__onPointerMove(e));
        node.addEventListener('pointerleave', () => this.__hideTooltip());
      }

      if (this._options.interactive) {
        this.__bindGestures();
      }

      this._observer = new ResizeObserver(() => this.draw());
      this._observer.observe(element);
    },

    /**
     * Panning and zooming, the way the flot based diagram does it: drag to pan, double click and
     * the wheel to zoom, one finger to pan and two fingers to zoom on a touch screen. d3-zoom
     * recognizes all of that, sets touch-action itself and registers its wheel listener as active -
     * hand written listeners could not do that reliably on iOS. Only the arithmetic stays here:
     * the difference to the previous transform becomes a pan or a zoom of the visible range.
     */
    __bindGestures() {
      const node = this._svg.node();
      node.style.cursor = 'move';

      // d3-zoom does not set this itself, only d3-drag does. Without it iOS claims a one finger
      // drag for scrolling the page, and the touchmove events that follow are no longer
      // cancelable, so the gesture never reaches the diagram.
      node.style.touchAction = 'none';
      this._element.style.touchAction = 'none';
      node.addEventListener(
        'touchmove',
        event => {
          if (node.__zooming && event.cancelable) {
            event.preventDefault();
          }
        },
        { passive: false }
      );

      let last = d3.zoomIdentity;
      const behaviour = d3
        .zoom()
        .on('zoom', event => {
          const transform = event.transform;
          // d3.pointer() cannot read a touch event, and two fingers zoom around their middle,
          // so the position comes from all pointers of the gesture
          const points = event.sourceEvent ? d3.pointers(event.sourceEvent, node) : [];
          const point = points.length ? [d3.mean(points, p => p[0]), d3.mean(points, p => p[1])] : null;
          if (transform.k !== last.k) {
            const layout = this._layout;
            const middle = layout ? (layout.margin.left + layout.width - layout.margin.right) / 2 : 0;
            this.__zoomAt(point ? point[0] : middle, transform.k / last.k, point ? point[1] : undefined);
          } else {
            this.__panBy(transform.x - last.x, transform.y - last.y);
          }
          last = transform;
        })
        .on('end', () => this.__fireRange());

      this._svg.call(behaviour);

      // flot zooms by 1.5 on a double click, d3 by 2 and with a transition
      this._svg.on('dblclick.zoom', null);
      this._svg.on('dblclick', event => {
        event.preventDefault();
        // the event has to travel along, otherwise the zoom listener has no pointer to
        // zoom around and would fall back to the middle of the diagram
        behaviour.scaleBy(this._svg, cv.plugins.diagram2.Plot.ZOOM_AMOUNT, d3.pointer(event, node), event);
      });
    },


    /**
     * Zooms around a point, exactly like flots navigate plugin: the value under the pointer stays
     * where it is and the visible range shrinks to 1/amount.
     * @param px {Number} distance from the left edge of the diagram
     * @param amount {Number} bigger than 1 zooms in
     * @param py {Number?} distance from the top edge, for the value axes
     */
    __zoomAt(px, amount, py) {
      const layout = this._layout;
      if (!layout || !amount || amount <= 0) {
        return;
      }

      const x = layout.x;
      const range = x.range();
      const width = range[1] - range[0];
      if (width <= 0) {
        return;
      }
      const factor = (px - range[0]) / width;
      const left = x.invert(px - (factor * width) / amount).getTime();
      const right = x.invert(px + ((1 - factor) * width) / amount).getTime();
      if (!(right > left)) {
        return;
      }
      this._view = [left, right];

      if (this._options.zoomYAxis) {
        this._yViews = this._yViews || {};
        layout.axes.forEach(axis => {
          const scale = axis.scale;
          const yRange = scale.range();
          const height = yRange[0] - yRange[1];
          if (height <= 0) {
            return;
          }
          // the value under the pointer stays put here as well, like in flot
          const center = typeof py === 'number' ? py : (yRange[0] + yRange[1]) / 2;
          const share = (center - yRange[1]) / height;
          const top = scale.invert(center - (share * height) / amount);
          const bottom = scale.invert(center + ((1 - share) * height) / amount);
          this._yViews[axis.index] = [Math.min(top, bottom), Math.max(top, bottom)];
        });
      }

      this.draw();
    },

    /**
     * Moves the visible range by a distance in pixels.
     * @param dx {Number} horizontal distance
     * @param dy {Number} vertical distance
     */
    __panBy(dx, dy) {
      const layout = this._layout;
      if (!layout || (!dx && !dy)) {
        return;
      }

      if (dx) {
        const x = layout.x;
        const range = x.range();
        const shift = x.invert(range[0]).getTime() - x.invert(range[0] + dx).getTime();
        const domain = x.domain();
        this._view = [domain[0].getTime() + shift, domain[1].getTime() + shift];
      }

      // the value axis only moves when it is zoomable, otherwise it stays on the data
      if (dy && this._options.zoomYAxis) {
        this._yViews = this._yViews || {};
        layout.axes.forEach(axis => {
          const scale = axis.scale;
          const shift = scale.invert(scale.range()[0]) - scale.invert(scale.range()[0] + dy);
          const domain = scale.domain();
          this._yViews[axis.index] = [domain[0] - shift, domain[1] - shift];
        });
      }

      this.draw();
    },

    /**
     * Tells the widget which range is shown now, so that it can load the data for it.
     */
    __fireRange() {
      if (this._view) {
        this.fireDataEvent('rangeChanged', this._view.slice());
      }
    },

    /**
     * The y axes of the widget, with an implicit one when the configuration has none.
     * @return {Array}
     */
    __axes() {
      const axes = this._options.axes && this._options.axes.length ? this._options.axes : [{}];

      return axes.map(axis => ({
        axisLabel: axis.axisLabel || null,
        position: axis.position === 'right' ? 'right' : 'left',
        min: this.__number(axis.min),
        max: this.__number(axis.max),
        unit: axis.unit || '',
        decimals: this.__number(axis.decimals)
      }));
    },

    /**
     * A configured number, or null when it is not one. The parser hands the values on as
     * strings, an empty attribute must not become a 0.
     * @param value {var}
     * @return {Number|null}
     */
    __number(value) {
      if (value === null || value === undefined || value === '') {
        return null;
      }
      const number = parseFloat(value);

      return Number.isFinite(number) ? number : null;
    },

    /**
     * Scales, margins and formats for the current size.
     * @param width {Number}
     * @param height {Number}
     * @param axes {Array}
     * @return {Map}
     */
    __layout(width, height, axes) {
      const labels = this._options.showLabels;
      const fontSize = this.__labelSize();
      // the same room on every side: the topmost value label sits centered on the axis, the time
      // labels hang below their tick the way d3 places them, 6 pixels of tick plus 3 of padding
      const padding = cv.plugins.diagram2.Plot.PLOT_PADDING;
      const margin = {
        // room for a label at the very top of an axis, it sits centered on its tick and its box
        // reaches about 0.6 em above that point. Given back below when no axis has such a tick.
        top: labels ? padding + Math.ceil(fontSize * 0.6) : 2,
        right: labels ? padding : 2,
        bottom: labels ? padding + Math.round(fontSize) + 9 : 2,
        left: labels ? padding : 2
      };

      // the vertical range does not depend on the width of the labels, so the y scales can be
      // built first and their ticks measured afterwards
      const yRange = [height - margin.bottom, margin.top];
      axes.forEach((axis, index) => {
        axis.index = index + 1;
        axis.scale = d3.scaleLinear().domain(this.__domain(axis)).range(yRange);
        axis.format = this.__valueFormat(axis);
        // flot asks for 0.3 * sqrt(size) ticks, which keeps the axis readable instead of dense
        axis.ticks = this.__valueTicks(axis, Math.max(2, Math.round(0.3 * Math.sqrt(yRange[0] - yRange[1]))));
      });

      if (labels && !axes.some(axis => this.__hasTopTick(axis))) {
        // nothing is drawn up there, so the diagram keeps the same distance as on the other sides
        margin.top = padding;
        axes.forEach(axis => axis.scale.range([height - margin.bottom, margin.top]));
      }

      if (labels) {
        ['left', 'right'].forEach(side => {
          const own = axes.filter(axis => axis.position === side);
          if (!own.length) {
            return;
          }
          const gaps = (own.length - 1) * cv.plugins.diagram2.Plot.AXIS_GAP;
          const space = padding + gaps + own.reduce((sum, axis) => sum + this.__axisWidth(axis), 0);
          margin[side] = Math.min(space, Math.round(width / 3));
        });
      }

      const xRange = [margin.left, width - margin.right];
      const x = d3.scaleTime().domain(this.__timeDomain()).range(xRange);

      // the number of ticks flot asks for on a time axis
      const xTicks = Math.max(2, Math.round(0.3 * Math.sqrt(width)));
      const xFormat = this.__xFormat(x, xTicks);
      let xValues = x.ticks(xTicks);
      if (labels && xValues.length > 2) {
        // d3 rounds the number of ticks up to a nice time step and hands back more of them than
        // asked for, so dates can be long enough to run into each other. Every second one is
        // dropped until each label has room, which keeps the remaining ticks on round times.
        const labelWidth = this.__textWidth(xFormat(x.domain()[1]), fontSize) + 12;
        const room = Math.max(1, Math.floor((xRange[1] - xRange[0]) / labelWidth));
        if (xValues.length > room) {
          const step = Math.ceil(xValues.length / room);
          xValues = xValues.filter((value, index) => index % step === 0);
        }
      }

      return {
        width: width,
        height: height,
        fontSize: fontSize,
        margin: margin,
        axes: axes,
        x: x,
        xValues: xValues,
        xFormat: xFormat
      };
    },

    /**
     * The value range of one axis: what is configured, otherwise what the data of its graphs
     * needs.
     * @param axis {Map}
     * @return {Array}
     */
    __domain(axis) {
      if (this._yViews && this._yViews[axis.index]) {
        return this._yViews[axis.index].slice();
      }

      const values = [];
      this._series.forEach(entry => {
        if ((parseInt(entry.yaxis) || 1) !== axis.index) {
          return;
        }
        (entry.data || []).forEach(point => {
          if (point && Number.isFinite(point[1])) {
            values.push(point[1]);
          }
        });
      });

      const dataMin = values.length ? d3.min(values) : 0;
      const dataMax = values.length ? d3.max(values) : 1;
      let min = axis.min === null ? dataMin : axis.min;
      let max = axis.max === null ? dataMax : axis.max;
      if (min === max) {
        min -= 0.5;
        max += 0.5;
      }

      // flot keeps the graph off the border: it widens an automatic end by 2% of the span, but
      // never past zero when the data itself does not cross it (autoscaleMargin)
      const margin = cv.plugins.diagram2.Plot.AUTOSCALE_MARGIN;
      const span = max - min;
      if (axis.min === null) {
        min -= span * margin;
        if (min < 0 && dataMin >= 0) {
          min = 0;
        }
      }
      if (axis.max === null) {
        max += span * margin;
        if (max > 0 && dataMax <= 0) {
          max = 0;
        }
      }

      if (this._options.showLabels) {
        // with ticks flot widens the automatic ends up to the outermost one, without ticks the
        // padded values stay as they are
        const domain = d3.scaleLinear().domain([min, max]).nice().domain();
        if (axis.min === null) {
          min = domain[0];
        }
        if (axis.max === null) {
          max = domain[1];
        }
      }

      return [min, max];
    },

    /**
     * The time range of all graphs, the last hour while there is no data yet.
     * @return {Array}
     */
    __timeDomain() {
      if (this._view) {
        return [new Date(this._view[0]), new Date(this._view[1])];
      }

      let min = null;
      let max = null;
      this._series.forEach(entry => {
        (entry.data || []).forEach(point => {
          if (!point) {
            return;
          }
          if (min === null || point[0] < min) {
            min = point[0];
          }
          if (max === null || point[0] > max) {
            max = point[0];
          }
        });
      });

      if (min === null || min === max) {
        const now = max === null ? Date.now() : max;

        return [new Date(now - 3600000), new Date(now)];
      }

      return [new Date(min), new Date(max)];
    },

    /**
     * The tick values of a value axis. With a configured number of decimals the steps must not be
     * finer than that, otherwise two ticks would carry the same label - flot enlarges the step for
     * the same reason.
     * @param axis {Map}
     * @param count {Number} how many ticks would fit
     * @return {Array}
     */
    __valueTicks(axis, count) {
      let ticks = axis.scale.ticks(count);
      if (axis.decimals === null) {
        return ticks;
      }

      const smallest = Math.pow(10, -axis.decimals);
      const domain = axis.scale.domain();
      // more ticks than steps of the smallest visible difference cannot be told apart
      const fits = Math.floor(Math.abs(domain[1] - domain[0]) / smallest);
      let wanted = Math.max(2, Math.min(count, fits));
      ticks = axis.scale.ticks(wanted);
      while (wanted > 2 && ticks.length > 1 && ticks[1] - ticks[0] < smallest) {
        wanted = Math.max(2, Math.floor(wanted / 2));
        ticks = axis.scale.ticks(wanted);
      }

      return ticks;
    },

    /**
     * Formats a value the way the axis asks for: the configured number of decimals and its unit.
     * @param axis {Map}
     * @return {Function}
     */
    __valueFormat(axis) {
      if (axis.decimals !== null) {
        return value => value.toFixed(axis.decimals) + axis.unit;
      }

      const format = d3.format('~f');

      return value => format(value) + axis.unit;
    },

    /**
     * The formatter for the labels of the time axis: the configured pattern, otherwise the one
     * flot would choose for this tick distance. flot always writes 24 hour times unless the
     * configuration asks for a twelve hour clock, which the diagrams never do.
     * @param scale {Function} the time scale
     * @param ticks {Number} how many ticks are asked for
     * @return {Function}
     */
    __xFormat(scale, ticks) {
      if (this._options.timeformat) {
        return this.__timeFormat(this._options.timeformat);
      }

      const values = scale.ticks(ticks);
      const domain = scale.domain();
      const span = domain[1].getTime() - domain[0].getTime();
      const step =
        values.length > 1 ? values[1].getTime() - values[0].getTime() : span;

      const minute = 60000;
      const day = 24 * 60 * minute;
      const month = 30 * day;
      const year = 365.2425 * day;

      let pattern;
      if (step < minute) {
        pattern = '%H:%M:%S';
      } else if (step < day) {
        pattern = span < 2 * day ? '%H:%M' : '%b %d %H:%M';
      } else if (step < month) {
        pattern = '%b %d';
      } else if (step < year) {
        pattern = span < year ? '%b' : '%b %Y';
      } else {
        pattern = '%Y';
      }

      return this.__timeFormat(pattern);
    },

    /**
     * A date formatter for a strftime like pattern, the same placeholders flot understands.
     * @param pattern {String}
     * @return {Function}
     */
    __timeFormat(pattern) {
      const locale = cv.util.D3.TF;

      return locale ? locale.format(pattern) : d3.timeFormat(pattern);
    },

    __drawGrid(layout) {
      const color = this._options.gridcolor;
      const gridWidth = this._options.gridWidth;
      const gridOpacity = this._options.gridOpacity;
      const primary = layout.axes[0];
      const top = layout.margin.top;
      const bottom = layout.height - layout.margin.bottom;
      const grid = this._content.append('g').attr('class', 'grid');

      grid
        .append('rect')
        .attr('class', 'background')
        .attr('x', layout.margin.left)
        .attr('y', top)
        .attr('width', Math.max(0, layout.width - layout.margin.left - layout.margin.right))
        .attr('height', Math.max(0, bottom - top))
        .attr('fill', cv.plugins.diagram2.Plot.BACKGROUND);

      layout.xValues.forEach(tick => {
        const position = layout.x(tick);
        grid
          .append('line')
          .attr('x1', position)
          .attr('x2', position)
          .attr('y1', top)
          .attr('y2', bottom)
          .attr('stroke', color)
          .attr('stroke-opacity', gridOpacity)
          .attr('stroke-width', gridWidth);
      });

      primary.ticks.forEach(tick => {
        const position = primary.scale(tick);
        grid
          .append('line')
          .attr('x1', layout.margin.left)
          .attr('x2', layout.width - layout.margin.right)
          .attr('y1', position)
          .attr('y2', position)
          .attr('stroke', color)
          .attr('stroke-opacity', gridOpacity)
          .attr('stroke-width', gridWidth);
      });
    },

    /**
     * The border of the plotting area. It is drawn after the graphs, otherwise a series whose
     * first or last point sits on the edge would paint over it. An svg stroke straddles the edge,
     * so the border is inset by half its width and stays inside - flot draws it on -bw/2 for the
     * same reason.
     * @param layout {Map}
     */
    __drawFrame(layout) {
      const borderWidth = this._options.borderWidth;
      const inset = borderWidth / 2;
      const top = layout.margin.top;
      const bottom = layout.height - layout.margin.bottom;

      this._content
        .append('rect')
        .attr('class', 'frame')
        .attr('x', layout.margin.left + inset)
        .attr('y', top + inset)
        .attr('width', Math.max(0, layout.width - layout.margin.left - layout.margin.right - borderWidth))
        .attr('height', Math.max(0, bottom - top - borderWidth))
        .attr('fill', 'none')
        .attr('stroke', this._options.gridcolor)
        .attr('stroke-width', borderWidth);
    },

    __drawAxes(layout) {
      if (!this._options.showLabels) {
        return;
      }
      const color = this._options.gridcolor;

      const xAxis = d3.axisBottom(layout.x).tickValues(layout.xValues).tickSizeOuter(0);
      if (layout.xFormat) {
        xAxis.tickFormat(layout.xFormat);
      }
      this._content
        .append('g')
        .attr('class', 'axis x')
        .attr('transform', `translate(0,${layout.height - layout.margin.bottom})`)
        .call(xAxis)
        // d3 puts its own font on the group, that would be the reference for a relative size
        .call(g => g.attr('font-size', null).attr('font-family', null))
        .call(g =>
          g
            .selectAll('text')
            .attr('fill', cv.plugins.diagram2.Plot.LABEL_COLOR)
            .style('font-size', layout.fontSize + 'px')
        )
        .call(g => g.selectAll('line,path').attr('stroke', color).attr('stroke-width', this._options.gridWidth))
        .call(g => {
          // a time label sits centered on its tick, the outermost ones would be cut off at the
          // edge of the diagram - they are moved just far enough to stay inside
          const padding = cv.plugins.diagram2.Plot.PLOT_PADDING;
          g.selectAll('.tick text').each(function () {
            const box = this.getBoundingClientRect();
            const frame = this.ownerSVGElement.getBoundingClientRect();
            let shift = 0;
            if (box.left - frame.left < padding) {
              shift = padding - (box.left - frame.left);
            } else if (frame.right - box.right < padding) {
              shift = frame.right - box.right - padding;
            }
            if (shift) {
              this.setAttribute('dx', Math.round(shift));
            }
          });
        });

      let offsetLeft = layout.margin.left;
      let offsetRight = layout.width - layout.margin.right;
      // without the gap the labels of one axis would sit right on the line of the next one
      const gap = cv.plugins.diagram2.Plot.AXIS_GAP;
      layout.axes.forEach(axis => {
        if (axis.position === 'left') {
          this.__drawYAxis(layout, axis, offsetLeft);
          offsetLeft -= this.__axisWidth(axis) + gap;
        } else {
          this.__drawYAxis(layout, axis, offsetRight);
          offsetRight += this.__axisWidth(axis) + gap;
        }
      });
    },

    /**
     * How much room the labels of an axis need. An estimate by character count is enough, the
     * numbers are short and the exact metrics would cost a layout pass.
     * @param axis {Map}
     * @return {Number} width in pixels
     */
    __axisWidth(axis) {
      const size = this.__labelSize();
      const longest = axis.ticks.reduce((max, tick) => Math.max(max, this.__textWidth(axis.format(tick), size)), 0);

      return 8 + longest + (axis.axisLabel ? this.__titleSpace().space : 0);
    },

    /**
     * How much room the title of an axis takes beside the tick labels: the height of the rotated
     * line - the box of a text is about 1.2 em high - plus the gap to the labels.
     * @return {Map} height of the rotated line and the room it occupies
     */
    __titleSpace() {
      const height = Math.ceil(cv.plugins.diagram2.Plot.AXIS_TITLE_SIZE * 1.2);

      return { height: height, space: height + 4 };
    },

    /**
     * The size of the tick labels. flot renders its text one step smaller than the widget font,
     * so the labels grow and shrink with the design.
     * @return {Number} size in pixels
     */
    __labelSize() {
      const size = parseFloat(window.getComputedStyle(this._element).fontSize);

      return Number.isFinite(size) && size > 0 ? size * 0.8333 : 13;
    },

    /**
     * Whether the topmost tick of an axis carries a label at the very top of the diagram. Only
     * then room has to be kept free above the plotting area.
     * @param axis {Map}
     * @return {Boolean}
     */
    __hasTopTick(axis) {
      if (!axis.ticks.length) {
        return false;
      }
      const domain = axis.scale.domain();
      const span = Math.abs(domain[1] - domain[0]) || 1;

      return axis.ticks.some(tick => Math.abs(tick - domain[1]) < span / 1000);
    },

    /**
     * How wide a label really is. Estimating it by character count leaves unused room at the
     * left and right of the diagram, which the top and bottom do not have. Measured the way
     * cv.ui.structure.tile.components.RoundProgress does it, on a canvas in memory.
     * @param text {String}
     * @param size {Number} font size in pixels
     * @return {Number} width in pixels
     */
    __textWidth(text, size) {
      if (!this.__canvas) {
        this.__canvas = document.createElement('canvas');
        this.__context = this.__canvas.getContext('2d');
      }
      // the design may change the font, so it is read again for every layout
      const family = window.getComputedStyle(this._element).fontFamily || 'sans-serif';
      this.__context.font = size + 'px ' + family;

      return this.__context.measureText(text).width;
    },

    /**
     * Draws one y axis. The bundled d3 only has axisLeft, so both sides are drawn here and
     * look exactly alike.
     * @param layout {Map}
     * @param axis {Map}
     * @param x {Number} where the axis line sits
     */
    __drawYAxis(layout, axis, x) {
      const color = this._options.gridcolor;
      const gridWidth = this._options.gridWidth;
      const left = axis.position === 'left';
      const range = axis.scale.range();
      // 5 pixels of tick plus 3 of padding put the label 8 pixels beside the line, the distance
      // __axisWidth() reserves for it
      const generator = (left ? d3.axisLeft(axis.scale) : d3.axisRight(axis.scale))
        .tickValues(axis.ticks)
        .tickFormat(axis.format)
        .tickSize(5)
        .tickSizeOuter(0)
        .tickPadding(3);

      this._content
        .append('g')
        .attr('class', `axis y ${axis.position}`)
        .attr('transform', `translate(${x},0)`)
        .call(generator)
        // d3 puts its own font on the group, that would be the reference for a relative size
        .call(g => g.attr('font-size', null).attr('font-family', null))
        .call(g =>
          g
            .selectAll('text')
            .attr('fill', cv.plugins.diagram2.Plot.LABEL_COLOR)
            .style('font-size', this.__labelSize() + 'px')
        )
        .call(g => g.selectAll('line,path').attr('stroke', color).attr('stroke-width', gridWidth));

      if (axis.axisLabel) {
        const middle = (range[0] + range[1]) / 2;
        const title = this.__titleSpace();
        // the rotated text is centered on this line, so it sits half its height inside its own box
        const width = this.__axisWidth(axis);
        const labelX = left ? x - width + title.height / 2 : x + width - title.height / 2;
        this._content
          .append('text')
          .attr('class', 'axis-label')
          .attr('transform', `translate(${labelX},${middle}) rotate(${left ? -90 : 90})`)
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'middle')
          .attr('fill', color)
          .style('font-size', cv.plugins.diagram2.Plot.AXIS_TITLE_SIZE + 'px')
          .text(axis.axisLabel);
      }
    },

    __drawSeries(layout) {
      const clip = 'diagram2-clip-' + this.toHashCode();
      const top = layout.margin.top;
      const bottom = layout.height - layout.margin.bottom;
      this._content
        .append('clipPath')
        .attr('id', clip)
        .append('rect')
        .attr('x', layout.margin.left)
        .attr('y', top)
        .attr('width', Math.max(0, layout.width - layout.margin.left - layout.margin.right))
        .attr('height', Math.max(0, bottom - top));

      const graphs = this._content.append('g').attr('class', 'graphs').attr('clip-path', `url(#${clip})`);
      // a configured width counts for every shape, without one each keeps what it had
      const configured = this._options.lineWidth;
      const lineWidth = configured === null || configured === undefined ? cv.plugins.diagram2.Plot.LINE_WIDTH : configured;
      const outlineWidth = configured === null || configured === undefined ? cv.plugins.diagram2.Plot.OUTLINE_WIDTH : configured;

      this._series.forEach((entry, index) => {
        const axis = layout.axes[(parseInt(entry.yaxis) || 1) - 1] || layout.axes[0];
        const y = axis.scale;
        const x = layout.x;
        const color = this.getColor(entry, index);
        const data = entry.data || [];
        const defined = point => !!point && point[1] !== null && Number.isFinite(point[1]);

        if (entry.style === 'bars') {
          const width = Math.max(1, x(new Date(x.domain()[0].getTime() + (parseInt(entry.barWidth) || 1))) - x(x.domain()[0]));
          const base = y(Math.max(y.domain()[0], Math.min(0, y.domain()[1])));
          data.filter(defined).forEach(point => {
            const position = x(new Date(point[0]));
            const value = y(point[1]);
            graphs
              .append('rect')
              .attr('x', entry.align === 'left' ? position : entry.align === 'right' ? position - width : position - width / 2)
              .attr('y', Math.min(base, value))
              .attr('width', width)
              .attr('height', Math.abs(base - value))
              .attr('fill', entry.fill ? color : 'none')
              .attr('fill-opacity', cv.plugins.diagram2.Plot.FILL_OPACITY)
              .attr('stroke', color)
              .attr('stroke-width', outlineWidth);
          });
        } else if (entry.style === 'points') {
          data.filter(defined).forEach(point => {
            graphs
              .append('circle')
              .attr('cx', x(new Date(point[0])))
              .attr('cy', y(point[1]))
              .attr('r', 2)
              .attr('fill', entry.fill ? color : 'none')
              .attr('stroke', color)
              .attr('stroke-width', outlineWidth);
          });
        } else {
          const curve = entry.steps ? d3.curveStepAfter : d3.curveLinear;

          if (entry.fill) {
            const area = d3
              .area()
              .curve(curve)
              .defined(defined)
              .x(point => x(new Date(point[0])))
              .y0(y(Math.max(y.domain()[0], Math.min(0, y.domain()[1]))))
              .y1(point => y(point[1]));
            graphs
              .append('path')
              .attr('d', area(data))
              .attr('fill', color)
              .attr('fill-opacity', cv.plugins.diagram2.Plot.FILL_OPACITY)
              .attr('stroke', 'none');
          }

          const line = d3
            .line()
            .curve(curve)
            .defined(defined)
            .x(point => x(new Date(point[0])))
            .y(point => y(point[1]));
          graphs
            .append('path')
            .attr('d', line(data))
            .attr('fill', 'none')
            .attr('stroke', color)
            .attr('stroke-width', lineWidth);
        }
      });
    },

    /**
     * The color of a graph: the configured one, otherwise the next one of the palette.
     * @param entry {Map} graph
     * @param index {Number} position in the data
     * @return {String}
     */
    getColor(entry, index) {
      const palette = cv.plugins.diagram2.Plot.COLORS;

      return entry.color || palette[index % palette.length];
    },


    __drawLegend(layout) {
      const legend = this._options.legend;
      if (!legend || !legend.show || !this._series.length) {
        this._legend.style('display', 'none');

        return;
      }

      // inside the axes, not at the edge of the widget, the way flot places it
      const inset = 6;
      const margin = layout.margin;
      const position = legend.position || 'ne';
      this._legend
        .style('display', 'block')
        // designs float every div inside an actor, that would put the entries next to each other
        .style('float', 'none')
        .style('top', position.startsWith('n') ? margin.top + inset + 'px' : null)
        .style('bottom', position.startsWith('s') ? margin.bottom + inset + 'px' : null)
        .style('left', position.endsWith('w') ? margin.left + inset + 'px' : null)
        .style('right', position.endsWith('e') ? margin.right + inset + 'px' : null);

      this._legend.selectAll('*').remove();
      this._series.forEach((entry, index) => {
        const row = this._legend
          .append('div')
          .style('display', 'block')
          .style('float', 'none')
          .style('white-space', 'nowrap');
        // like flot: the color sits inside a frame with one pixel of air around it
        row
          .append('span')
          .style('display', 'inline-block')
          .style('float', 'none')
          .style('margin-right', '0.4em')
          .style('padding', '1px')
          .style('border', '1px solid ' + cv.plugins.diagram2.Plot.LEGEND_BOX_BORDER)
          .append('span')
          .style('display', 'block')
          .style('float', 'none')
          .style('width', '0.6em')
          .style('height', '0.6em')
          .style('background-color', this.getColor(entry, index));
        row.append('span').style('float', 'none').text(entry.label || '');
      });
    },

    /**
     * Shows the value of the graph point closest to the pointer.
     * @param event {Event} pointer event on the svg
     */
    __onPointerMove(event) {
      if (!this._layout || !this._series.length) {
        return;
      }
      if (event.pointerType === 'touch') {
        // a finger pans and zooms, it does not point at a value
        return;
      }
      const bounds = this._svg.node().getBoundingClientRect();
      const px = event.clientX - bounds.left;
      const py = event.clientY - bounds.top;
      const layout = this._layout;

      let best = null;
      this._series.forEach((entry, index) => {
        const axis = layout.axes[(parseInt(entry.yaxis) || 1) - 1] || layout.axes[0];
        (entry.data || []).forEach(point => {
          if (!point || point[1] === null || !Number.isFinite(point[1])) {
            return;
          }
          const dx = layout.x(new Date(point[0])) - px;
          const dy = axis.scale(point[1]) - py;
          const distance = dx * dx + dy * dy;
          if (!best || distance < best.distance) {
            best = { distance: distance, point: point, axis: axis, entry: entry, index: index };
          }
        });
      });

      if (!best || best.distance > 40 * 40) {
        this.__hideTooltip();

        return;
      }

      const time = this.__timeFormat(this._options.timeformatTooltip)(new Date(best.point[0]));
      this._tooltip.style('display', 'block').style('left', '0px').style('top', '0px').html(`${time}<br/>${best.axis.format(best.point[1])}`);

      // like flot: when it does not fit any more, the tooltip moves to the other side of the pointer
      const node = this._tooltip.node();
      const width = node.offsetWidth + 20;
      const height = node.offsetHeight + 10;
      const left = px > layout.width - width ? px - width : px + 20;
      const top = py > layout.height - height ? py - height : py + 10;
      this._tooltip.style('left', Math.max(0, left) + 'px').style('top', Math.max(0, top) + 'px');

      if (this._marker) {
        this._marker
          .style('display', null)
          .attr('cx', layout.x(new Date(best.point[0])))
          .attr('cy', best.axis.scale(best.point[1]))
          .attr('fill', this.getColor(best.entry, best.index));
      }
    },

    __hideTooltip() {
      if (this._tooltip) {
        this._tooltip.style('display', 'none');
      }
      if (this._marker) {
        this._marker.style('display', 'none');
      }
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct() {
    this.shutdown();
    this._element = null;
  }
});
