/* diagram2-plot-spec.js
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
 * Unit tests for the renderer of the diagram2 plugin. The plot really draws into a container of
 * its own, the assertions read what came out of it.
 *
 * A value axis on the right, step graphs and the gestures are missing here on purpose: they need
 * axisRight, curveStepAfter and zoom, which the bundled build of d3 does not export yet.
 */
describe('testing the plot of the diagram2 plugin', function () {
  const HOUR = 3600000;
  const START = Date.UTC(2024, 0, 2, 0, 0, 0);
  let element = null;
  let plot = null;

  beforeAll(function (done) {
    cv.util.ScriptLoader.getInstance().setAllQueued(false);
    qx.io.PartLoader.require(
      ['plugin-diagram2'],
      function () {
        cv.util.ScriptLoader.getInstance().addListenerOnce(
          'finished',
          function () {
            cv.util.D3.load().then(() => done());
          },
          this
        );
        qx.event.Timer.once(
          function () {
            cv.util.ScriptLoader.getInstance().setAllQueued(true);
            cv.TemplateEngine.getInstance().setPartsLoaded(true);
          },
          this,
          10
        );
      },
      this
    );
  });

  afterEach(function () {
    if (plot) {
      plot.shutdown();
      plot.dispose();
      plot = null;
    }
    if (element) {
      element.remove();
      element = null;
    }
  });

  /**
   * A rising line of hourly values, enough of them for a time axis with several ticks.
   */
  const series = function (options) {
    const data = [];
    for (let i = 0; i < 48; i++) {
      data.push([START + i * HOUR, 10 + i * 0.25]);
    }

    return Object.assign({ label: 'Temperatur', color: '#edc240', yaxis: 1, data: data }, options || {});
  };

  const draw = function (options, data) {
    element = document.createElement('div');
    element.style.width = '600px';
    element.style.height = '300px';
    element.style.fontSize = '16px';
    document.body.appendChild(element);

    plot = new cv.plugins.diagram2.Plot(element, options || {});
    plot.setData(data || [series()]);
    plot.draw();

    return plot;
  };

  const svg = function () {
    return element.querySelector('svg');
  };

  /** distance of the outermost drawn element to the edge of the svg, per side */
  const inset = function () {
    const box = svg().getBoundingClientRect();
    const nodes = Array.from(svg().querySelectorAll('g.grid rect, g.grid line, g.axis text, g.axis path, rect.frame'));
    const room = { left: Infinity, right: Infinity, top: Infinity, bottom: Infinity };
    nodes.forEach(node => {
      const own = node.getBoundingClientRect();
      if (own.width === 0 && own.height === 0) {
        return;
      }
      room.left = Math.min(room.left, own.left - box.left);
      room.right = Math.min(room.right, box.right - own.right);
      room.top = Math.min(room.top, own.top - box.top);
      room.bottom = Math.min(room.bottom, box.bottom - own.bottom);
    });

    return {
      left: Math.round(room.left),
      right: Math.round(room.right),
      top: Math.round(room.top),
      bottom: Math.round(room.bottom)
    };
  };

  const axis = function (unit, options) {
    return Object.assign({ unit: unit || '', decimals: 1 }, options || {});
  };

  it('should keep the drawn content in a group below a catching surface', function () {
    draw({ axes: [axis(' °C')] });

    const children = Array.from(svg().children).map(node => node.tagName + '.' + (node.getAttribute('class') || ''));

    // everything that is redrawn lives in the group, the surface above it stays for the whole
    // lifetime - a touch gesture dies when the element below the finger is removed
    expect(children[0]).toBe('g.content');
    expect(children[children.length - 1]).toBe('rect.capture');
    expect(svg().querySelector('rect.capture').style.pointerEvents).toBe('all');
    expect(svg().querySelectorAll('g.content > g.grid').length).toBe(1);
  });

  it('should draw the frame above the graphs', function () {
    draw({ axes: [axis(' °C')] });

    const nodes = Array.from(svg().querySelector('g.content').children).map(node => node.tagName + (node.getAttribute('class') ? '.' + node.getAttribute('class') : ''));

    // a series whose first or last point sits on the edge would paint over the frame otherwise
    expect(nodes.indexOf('rect.frame')).toBeGreaterThan(nodes.indexOf('g.graphs'));
  });

  it('should keep the same distance to every edge', function () {
    draw({ axes: [axis(' °C')], showLabels: true });

    const room = inset();
    const padding = cv.plugins.diagram2.Plot.PLOT_PADDING;

    // rounding of the text metrics gives a pixel here and there
    ['left', 'right', 'top', 'bottom'].forEach(function (side) {
      expect(Math.abs(room[side] - padding))
        .withContext(side + ' is ' + room[side])
        .toBeLessThan(3);
    });
  });

  it('should draw without labels in a two pixel frame', function () {
    draw({ axes: [axis(' °C')], showLabels: false });

    expect(svg().querySelectorAll('g.axis').length).toBe(0);
    const room = inset();
    expect(room.left).toBe(2);
    expect(room.right).toBe(2);
  });

  it('should keep a gap between two axes on the same side', function () {
    draw({ axes: [axis(' °C'), axis(' mg/l', { decimals: 2, min: 0, max: 1 })] }, [
      series(),
      series({ label: 'Chlor', yaxis: 2, color: '#4da74d' })
    ]);

    const groups = Array.from(svg().querySelectorAll('g.axis.y'));
    expect(groups.length).toBe(2);

    const box = svg().getBoundingClientRect();
    const columns = groups.map(function (group) {
      const texts = Array.from(group.querySelectorAll('text'));
      const line = group.querySelector('path.domain') || group.querySelector('line');

      return {
        line: line.getBoundingClientRect().left - box.left,
        left: Math.min.apply(null, texts.map(t => t.getBoundingClientRect().left - box.left))
      };
    });

    // the inner axis draws its labels to the left of its own line, the outer axis has to stay
    // clear of them
    const inner = columns[0].line > columns[1].line ? columns[0] : columns[1];
    const outer = columns[0].line > columns[1].line ? columns[1] : columns[0];
    expect(inner.left - outer.line).toBeGreaterThanOrEqual(cv.plugins.diagram2.Plot.AXIS_GAP - 1);
  });

  it('should keep the graph off the border, the way flot does', function () {
    draw({ axes: [axis(' °C')] });

    const scale = plot._layout.axes[0].scale;
    const domain = scale.domain();

    // the data runs from 10 to 21.75, flot widens an automatic end by 2 % of the span and then up
    // to the outermost tick
    expect(domain[0]).toBeLessThan(10);
    expect(domain[1]).toBeGreaterThan(21.75);
  });

  it('should leave a configured range alone', function () {
    draw({ axes: [axis(' °C', { min: 0, max: 100 })] });

    expect(plot._layout.axes[0].scale.domain()).toEqual([0, 100]);
  });

  it('should write the unit and the decimals on the value axis', function () {
    draw({ axes: [axis(' °C', { decimals: 2 })] });

    const labels = Array.from(svg().querySelectorAll('g.axis.y text')).map(node => node.textContent);
    expect(labels.length).toBeGreaterThan(1);
    labels.forEach(function (label) {
      expect(label).toMatch(/^-?\d+\.\d{2} °C$/);
    });
  });

  it('should write the time in a 24 hour format and keep the labels apart', function () {
    draw({ axes: [axis(' °C')] });

    const labels = Array.from(svg().querySelectorAll('g.axis.x text'));
    expect(labels.length).toBeGreaterThan(1);
    labels.forEach(node => expect(node.textContent).not.toMatch(/[AP]M/));

    const boxes = labels.map(node => node.getBoundingClientRect()).sort((a, b) => a.left - b.left);
    for (let i = 1; i < boxes.length; i++) {
      expect(boxes[i].left - boxes[i - 1].right)
        .withContext('gap between the time labels')
        .toBeGreaterThan(0);
    }
  });

  it('should draw with the stroke widths it has always used', function () {
    draw({ axes: [axis(' °C')] }, [series(), series({ label: 'Balken', style: 'bars', barWidth: HOUR })]);

    const statics = cv.plugins.diagram2.Plot;
    const line = svg().querySelector('g.graphs path');
    const bar = svg().querySelector('g.graphs rect');

    expect(line.getAttribute('stroke-width')).toBe(String(statics.LINE_WIDTH));
    expect(bar.getAttribute('stroke-width')).toBe(String(statics.OUTLINE_WIDTH));
    expect(svg().querySelector('rect.frame').getAttribute('stroke-width')).toBe(String(statics.BORDER_WIDTH));
    expect(svg().querySelector('g.grid line').getAttribute('stroke-width')).toBe(String(statics.GRID_WIDTH));
  });

  it('should take the configured stroke widths', function () {
    draw({ axes: [axis(' °C')], gridWidth: 3, borderWidth: 2, lineWidth: 4 }, [
      series(),
      series({ label: 'Balken', style: 'bars', barWidth: HOUR })
    ]);

    expect(svg().querySelector('g.graphs path').getAttribute('stroke-width')).toBe('4');
    // a configured width counts for the outlines as well
    expect(svg().querySelector('g.graphs rect').getAttribute('stroke-width')).toBe('4');
    expect(svg().querySelector('rect.frame').getAttribute('stroke-width')).toBe('2');
    expect(svg().querySelector('g.grid line').getAttribute('stroke-width')).toBe('3');
  });

  it('should draw the grid lines translucent and everything else solid', function () {
    draw({ axes: [axis(' °C')] });

    expect(svg().querySelector('g.grid line').getAttribute('stroke-opacity')).toBe(String(cv.plugins.diagram2.Plot.GRID_OPACITY));
    expect(svg().querySelector('rect.frame').getAttribute('stroke-opacity')).toBeNull();
    expect(svg().querySelector('g.axis.y path.domain').getAttribute('stroke-opacity')).toBeNull();

    plot.shutdown();
    element.remove();
    plot = null;
    element = null;

    draw({ axes: [axis(' °C')], gridOpacity: 1 });
    expect(svg().querySelector('g.grid line').getAttribute('stroke-opacity')).toBe('1');
  });

  it('should put the legend into the configured corner', function () {
    const corners = {
      nw: ['top', 'left'],
      ne: ['top', 'right'],
      sw: ['bottom', 'left'],
      se: ['bottom', 'right']
    };

    Object.keys(corners).forEach(function (position) {
      draw({ axes: [axis(' °C')], legend: { show: true, position: position } });

      const legend = element.querySelector('.diagram2-legend');
      expect(legend.style.display).toBe('block');
      corners[position].forEach(side => expect(legend.style[side]).not.toBe(''));

      // the label and the colour box of every graph
      expect(legend.textContent).toContain('Temperatur');
      const box = legend.querySelector('span > span');
      expect(box.style.backgroundColor).not.toBe('');

      plot.shutdown();
      plot.dispose();
      element.remove();
      plot = null;
      element = null;
    });
  });

  it('should show the value under the mouse and stay away from a finger', function () {
    draw({ axes: [axis(' °C')], tooltip: true });

    const layout = plot._layout;
    const point = plot.getData()[0].data[10];
    const box = svg().getBoundingClientRect();
    const move = function (type) {
      svg().dispatchEvent(
        new PointerEvent('pointermove', {
          bubbles: true,
          clientX: box.left + layout.x(new Date(point[0])),
          clientY: box.top + layout.axes[0].scale(point[1]),
          pointerType: type
        })
      );
    };
    const tooltip = element.querySelector('.diagram2-tooltip');

    move('mouse');
    expect(tooltip.style.display).toBe('block');
    expect(tooltip.textContent).toContain('12.5 °C');

    svg().dispatchEvent(new PointerEvent('pointerleave', { bubbles: true }));
    expect(tooltip.style.display).toBe('none');

    // a finger pans and zooms, it does not point at a value
    move('touch');
    expect(tooltip.style.display).toBe('none');
  });

  it('should hide the tooltip away from the graphs', function () {
    draw({ axes: [axis(' °C')], tooltip: true });

    const box = svg().getBoundingClientRect();
    svg().dispatchEvent(
      new PointerEvent('pointermove', {
        bubbles: true,
        clientX: box.left + plot._layout.margin.left + 5,
        clientY: box.top + plot._layout.margin.top + 5,
        pointerType: 'mouse'
      })
    );

    expect(element.querySelector('.diagram2-tooltip').style.display).toBe('none');
  });

  it('should draw the range the user has moved to instead of the range of the data', function () {
    draw({ axes: [axis(' °C')] });

    const full = plot._layout.x.domain().map(date => date.getTime());
    const view = [START + 6 * HOUR, START + 18 * HOUR];
    plot._view = view.slice();
    plot.draw();

    expect(plot.getView()).toEqual(view);
    expect(plot._layout.x.domain().map(date => date.getTime())).toEqual(view);
    expect(view[1] - view[0]).toBeLessThan(full[1] - full[0]);

    // new data does not throw the range away, the widget loads for exactly this window
    plot.setData([series()]);
    plot.draw();
    expect(plot._layout.x.domain().map(date => date.getTime())).toEqual(view);
  });

  it('should draw the value range the user has zoomed to', function () {
    draw({ axes: [axis(' °C')] });

    plot._yViews = { 1: [12, 15] };
    plot.draw();

    expect(plot._layout.axes[0].scale.domain()).toEqual([12, 15]);
    const labels = Array.from(svg().querySelectorAll('g.axis.y text')).map(node => parseFloat(node.textContent));
    expect(Math.min.apply(null, labels)).toBeGreaterThanOrEqual(12);
    expect(Math.max.apply(null, labels)).toBeLessThanOrEqual(15);
  });

  it('should redraw when the container changes its size', async function () {
    draw({ axes: [axis(' °C')] });

    const before = plot._layout.width;
    element.style.width = '400px';
    await new Promise(resolve => setTimeout(resolve, 300));

    expect(plot._layout.width).toBeLessThan(before);
    expect(Math.round(svg().getBoundingClientRect().width)).toBe(400);
  });

  /** a real mouse event, the way d3-zoom expects it: on the svg to start, on the window to follow */
  const mouse = function (type, x, y, target) {
    (target || window).dispatchEvent(
      new MouseEvent(type, { bubbles: true, cancelable: true, view: window, clientX: x, clientY: y })
    );
  };

  /** milliseconds one pixel of the time axis covers */
  const perPixel = function () {
    return plot._layout.x.invert(1).getTime() - plot._layout.x.invert(0).getTime();
  };

  it('should pan the time range while dragging', function () {
    draw({ axes: [axis(' °C')], interactive: true });

    const box = svg().getBoundingClientRect();
    const before = plot._layout.x.domain().map(date => date.getTime());
    const step = perPixel();
    const ranges = [];
    plot.addListener('rangeChanged', event => ranges.push(event.getData()));

    mouse('mousedown', box.left + 300, box.top + 150, svg());
    mouse('mousemove', box.left + 200, box.top + 150);
    mouse('mouseup', box.left + 200, box.top + 150);

    const view = plot.getView();
    // dragging to the left shows later values, the width of the window stays
    expect(view).not.toBeNull();
    expect(Math.round((view[0] - before[0]) / step)).toBe(100);
    expect(view[1] - view[0]).toBe(before[1] - before[0]);

    // the widget hears about it once, when the gesture ends
    expect(ranges.length).toBe(1);
    expect(ranges[0]).toEqual(view);
  });

  it('should zoom around the pointer with the wheel', function (done) {
    draw({ axes: [axis(' °C')], interactive: true });

    const box = svg().getBoundingClientRect();
    const before = plot._layout.x.domain().map(date => date.getTime());
    const under = plot._layout.x.invert(200).getTime();
    const ranges = [];
    plot.addListener('rangeChanged', event => ranges.push(event.getData()));

    svg().dispatchEvent(
      new WheelEvent('wheel', {
        bubbles: true,
        cancelable: true,
        view: window,
        clientX: box.left + 200,
        clientY: box.top + 150,
        deltaY: -100
      })
    );

    const view = plot.getView();
    expect(view[1] - view[0]).toBeLessThan(before[1] - before[0]);
    // the value under the pointer stays where it is, less than a pixel away
    expect(Math.abs(plot._layout.x.invert(200).getTime() - under) / perPixel()).toBeLessThan(1);

    // d3 reports the end of a wheel gesture after a moment of quiet
    setTimeout(function () {
      expect(ranges.length).toBe(1);
      expect(ranges[0]).toEqual(view);
      done();
    }, 300);
  });

  it('should zoom by the flot amount around the double clicked point', function () {
    draw({ axes: [axis(' °C')], interactive: true });

    const box = svg().getBoundingClientRect();
    const before = plot._layout.x.domain().map(date => date.getTime());
    const under = plot._layout.x.invert(200).getTime();

    svg().dispatchEvent(
      new MouseEvent('dblclick', {
        bubbles: true,
        cancelable: true,
        view: window,
        clientX: box.left + 200,
        clientY: box.top + 150
      })
    );

    const view = plot.getView();
    // flot zooms by 1.5 on a double click, d3 would use 2
    expect((before[1] - before[0]) / (view[1] - view[0])).toBeCloseTo(cv.plugins.diagram2.Plot.ZOOM_AMOUNT, 3);
    expect(Math.abs(plot._layout.x.invert(200).getTime() - under) / perPixel()).toBeLessThan(1);
  });

  it('should only move the value axis when zooming it is allowed', function () {
    draw({ axes: [axis(' °C')], interactive: true });

    const box = svg().getBoundingClientRect();
    const domain = plot._layout.axes[0].scale.domain();

    mouse('mousedown', box.left + 300, box.top + 100, svg());
    mouse('mousemove', box.left + 300, box.top + 160);
    mouse('mouseup', box.left + 300, box.top + 160);

    expect(plot._yViews).toBeNull();
    expect(plot._layout.axes[0].scale.domain()).toEqual(domain);

    plot.shutdown();
    plot.dispose();
    element.remove();
    plot = null;
    element = null;

    draw({ axes: [axis(' °C')], interactive: true, zoomYAxis: true });
    const second = svg().getBoundingClientRect();
    const before = plot._layout.axes[0].scale.domain();

    mouse('mousedown', second.left + 300, second.top + 100, svg());
    mouse('mousemove', second.left + 300, second.top + 160);
    mouse('mouseup', second.left + 300, second.top + 160);

    const after = plot._layout.axes[0].scale.domain();
    // dragging down shows smaller values, the height of the window stays
    expect(after[0]).toBeLessThan(before[0]);
    expect(after[1] - after[0]).toBeCloseTo(before[1] - before[0], 6);
  });

  it('should keep panning while the diagram redraws itself', function () {
    draw({ axes: [axis(' °C')], interactive: true });

    const box = svg().getBoundingClientRect();
    mouse('mousedown', box.left + 300, box.top + 150, svg());
    mouse('mousemove', box.left + 250, box.top + 150);
    const middle = plot.getView();

    // every redraw throws the drawn content away - the gesture has to survive that, otherwise it
    // dies on the first move on iOS, where the events follow the element the finger started on
    plot.draw();
    expect(svg().querySelector('rect.capture')).not.toBeNull();

    mouse('mousemove', box.left + 200, box.top + 150);
    mouse('mouseup', box.left + 200, box.top + 150);

    const view = plot.getView();
    expect(view[0]).toBeGreaterThan(middle[0]);
    expect(Math.round((view[0] - middle[0]) / perPixel())).toBe(50);
  });

  it('should zoom between two fingers', function () {
    // d3 only listens for touches when the browser claims to have a touch screen, which the
    // headless browser running these tests does not
    const points = navigator.maxTouchPoints;
    Object.defineProperty(navigator, 'maxTouchPoints', { value: 5, configurable: true });

    try {
      draw({ axes: [axis(' °C')], interactive: true });

      const box = svg().getBoundingClientRect();
      const before = plot._layout.x.domain().map(date => date.getTime());
      const middle = plot._layout.x.invert(250).getTime();
      // the identifier has to stay with the finger, d3 matches the touches of a move by it
      const touch = function (id, x) {
        return new Touch({ identifier: id, target: svg(), clientX: box.left + x, clientY: box.top + 150 });
      };
      const fingers = function (type, first, second) {
        const list = [touch(0, first), touch(1, second)];
        svg().dispatchEvent(
          new TouchEvent(type, {
            bubbles: true,
            cancelable: true,
            view: window,
            touches: type === 'touchend' ? [] : list,
            targetTouches: type === 'touchend' ? [] : list,
            changedTouches: list
          })
        );
      };

      // spreading the fingers from 100 to 200 pixels apart halves the visible range
      fingers('touchstart', 200, 300);
      fingers('touchmove', 150, 350);
      fingers('touchend', 150, 350);

      const view = plot.getView();
      expect((before[1] - before[0]) / (view[1] - view[0])).toBeCloseTo(2, 1);
      // the moment stays between the fingers
      expect(Math.abs(plot._layout.x.invert(250).getTime() - middle) / perPixel()).toBeLessThan(2);
    } finally {
      Object.defineProperty(navigator, 'maxTouchPoints', { value: points, configurable: true });
    }
  });

  it('should draw nothing while the container has no size', function () {
    element = document.createElement('div');
    element.style.width = '0px';
    element.style.height = '0px';
    document.body.appendChild(element);
    plot = new cv.plugins.diagram2.Plot(element, { axes: [axis(' °C')] });
    plot.setData([series()]);
    plot.draw();

    expect(element.querySelector('svg g.content').children.length).toBe(0);
  });
});
