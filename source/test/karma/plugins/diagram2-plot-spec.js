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
