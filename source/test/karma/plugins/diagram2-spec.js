/* diagram2-spec.js
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
 * Unit tests for the configuration parsing of the diagram2 plugin. What it reads out of the
 * widgets XML has to match the flot based plugin, that is what makes it a replacement.
 */
describe('testing the diagram2 plugin', function () {
  beforeAll(function (done) {
    cv.util.ScriptLoader.getInstance().setAllQueued(false);
    qx.io.PartLoader.require(
      ['plugin-diagram2', 'plugin-diagram'],
      function () {
        cv.util.ScriptLoader.getInstance().addListenerOnce(
          'finished',
          function () {
            done();
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

  const parse = function (xml) {
    return new DOMParser().parseFromString(xml, 'application/xml').documentElement;
  };

  const content = function (xml) {
    return cv.plugins.diagram2.AbstractDiagram2.getDiagramElements(parse(xml));
  };

  it('should read the axes and index them by their name', function () {
    const res = content(
      '<diagram2>' +
        '<axis unit=" °C" decimals="1" min="10" max="30" label="Temperatur">temp</axis>' +
        '<axis unit=" %" position="right">percent</axis>' +
        '<rrd yaxis="percent">ventil</rrd>' +
        '<rrd yaxis="temp">temperatur</rrd>' +
        '<rrd yaxis="unbekannt">sonstiges</rrd>' +
        '</diagram2>'
    );

    expect(res.axesnum).toBe(2);
    expect(res.axes[0].unit).toBe(' °C');
    expect(res.axes[0].decimals).toBe('1');
    expect(res.axes[0].min).toBe('10');
    expect(res.axes[0].max).toBe('30');
    expect(res.axes[0].axisLabel).toBe('Temperatur');
    expect(res.axes[0].position).toBe('left');
    expect(res.axes[1].position).toBe('right');
    expect(res.axes[1].axisLabel).toBeNull();

    // the y axis is chosen by the name in the element content
    expect(res.ts[0].axisIndex).toBe(2);
    expect(res.ts[1].axisIndex).toBe(1);
    // an unknown name falls back to the first axis
    expect(res.ts[2].axisIndex).toBe(1);
  });

  it('should apply the defaults of a data set', function () {
    const res = content('<diagram2><rrd>temperatur</rrd></diagram2>');
    const ts = res.ts[0];

    expect(res.tsnum).toBe(1);
    expect(ts.tsType).toBe('rrd');
    expect(ts.src).toBe('temperatur');
    // without a label the name of the data is shown
    expect(ts.label).toBe('temperatur');
    expect(ts.axisIndex).toBe(1);
    expect(ts.steps).toBe(false);
    expect(ts.fill).toBe(false);
    expect(ts.scaling).toBe(1.0);
    // everything but influx falls back to the average
    expect(ts.cFunc).toBe('AVERAGE');
    expect(ts.fillTs).toBe('linear');
    expect(ts.style).toBe('lines');
    expect(ts.align).toBe('center');
    expect(ts.barWidth).toBe(1);
    expect(ts.backend).toBeNull();
  });

  it('should read every attribute of a data set', function () {
    const res = content(
      '<diagram2>' +
        '<influx backend="haus" measurement="kueche" color="#ff0000" label="Küche" steps="true" fill="true"' +
        ' scaling="0.001" offset="-3600" resolution="900" consolidationFunction="AVERAGE"' +
        ' fillMissing="none" style="bars" barWidth="1800000" align="left"/>' +
        '</diagram2>'
    );
    const ts = res.ts[0];

    expect(ts.backend).toBe('haus');
    expect(ts.color).toBe('#ff0000');
    expect(ts.label).toBe('Küche');
    expect(ts.steps).toBe(true);
    expect(ts.fill).toBe(true);
    expect(ts.scaling).toBe(0.001);
    expect(ts.offset).toBe(-3600);
    expect(ts.resol).toBe(900);
    expect(ts.cFunc).toBe('AVERAGE');
    expect(ts.fillTs).toBe('none');
    expect(ts.style).toBe('bars');
    expect(ts.barWidth).toBe('1800000');
    expect(ts.align).toBe('left');
  });

  it('should default the gap handling to the shape of the graph', function () {
    // a step graph holds its value, a line is drawn through the gap
    const steps = content('<diagram2><rrd steps="true">a</rrd></diagram2>');
    const lines = content('<diagram2><rrd>a</rrd></diagram2>');

    expect(steps.ts[0].fillTs).toBe('previous');
    expect(lines.ts[0].fillTs).toBe('linear');
  });

  it('should read demo data sets from the element and from the attribute', function () {
    const res = content(
      '<diagram2>' +
        '<demo>local-sine.json</demo>' +
        '<demo measurement="generator@wind" label="Wind"/>' +
        '</diagram2>'
    );

    expect(res.tsnum).toBe(2);
    expect(res.ts[0].tsType).toBe('demo');
    expect(res.ts[0].src).toBe('local-sine.json');
    expect(res.ts[1].src).toBe('generator@wind');
    expect(res.ts[1].label).toBe('Wind');
    expect(res.ts[0].cFunc).toBe('AVERAGE');
  });

  it('should read every source type with the defaults of its backend', function () {
    const res = content(
      '<diagram2>' +
        '<rrd datasourceIndex="1">eib_traffic</rrd>' +
        '<influx measurement="db/messungen" field="value" authentication="token"><tag key="room" operator="=" value="bad"/></influx>' +
        '<openhab>Temperatur_Bad</openhab>' +
        '<demo>local-sine.json</demo>' +
        '</diagram2>'
    );

    expect(res.tsnum).toBe(4);
    expect(res.ts.map(ts => ts.tsType)).toEqual(['rrd', 'influx', 'openhab', 'demo']);

    // influx brings its own default, the others keep the average
    expect(res.ts[0].cFunc).toBe('AVERAGE');
    expect(res.ts[1].cFunc).toBe('MEAN');
    expect(res.ts[2].cFunc).toBe('AVERAGE');

    // rrd rows carry one value per data source
    expect(res.ts[0].dsIndex).toBe(1);
    expect(res.ts[0].src).toBe('eib_traffic');

    // influx keeps its query parts
    expect(res.ts[1].src).toBe('db/messungen');
    expect(res.ts[1].field).toBe('value');
    expect(res.ts[1].authentication).toBe('token');
    expect(res.ts[1].filter).toBe('(room = \'bad\')');
  });

  it('should read an rrd of an openHAB backend from its persistence', function () {
    // old configurations use <rrd> for openHAB items, the backend decides how they are read
    spyOn(cv.io.BackendConnections, 'getClient').and.returnValue({ getType: () => 'openhab' });

    const res = content('<diagram2><rrd>Temperatur_Bad</rrd></diagram2>');

    expect(res.ts[0].tsType).toBe('openhab');
    expect(res.ts[0].src).toBe('Temperatur_Bad');
    expect(cv.plugins.diagram2.AbstractDiagram2.getTimeSeriesSource(res.ts[0])).toEqual(
      jasmine.any(cv.io.timeseries.OpenhabPersistenceSource)
    );
  });

  it('should build the filter of an influx data set from its children', function () {
    const res = content(
      '<diagram2>' +
        '<influx measurement="db/m">' +
        '<tag key="a" operator="=" value="1"/>' +
        '<or><tag key="b" operator="=" value="2"/><tag key="c" operator="!=" value="3"/></or>' +
        '</influx>' +
        '</diagram2>'
    );

    expect(res.ts[0].filter).toBe('(a = \'1\' AND (b = \'2\' OR c != \'3\'))');
  });

  it('should build a source for the other types as well', function () {
    const statics = cv.plugins.diagram2.AbstractDiagram2;
    const res = content(
      '<diagram2>' +
        '<openhab backend="haus">Temperatur_Bad</openhab>' +
        '<influx measurement="db/m">x</influx>' +
        '<rrd>eib_traffic</rrd>' +
        '</diagram2>'
    );

    expect(statics.getTimeSeriesSource(res.ts[0]) instanceof cv.io.timeseries.OpenhabPersistenceSource).toBeTrue();
    expect(statics.getTimeSeriesSource(res.ts[1]) instanceof cv.io.timeseries.FluxSource).toBeTrue();
    // rrd has no source class, its url is built while fetching
    expect(statics.getTimeSeriesSource(res.ts[2])).toBeNull();
  });

  it('should pick the column of an rrd row', function () {
    const statics = cv.plugins.diagram2.AbstractDiagram2;
    const rrd = { tsType: 'rrd', scaling: 2, dsIndex: 1 };
    const scaled = statics._scaleTsData(rrd, [
      [1000, [1, 5]],
      [2000, null],
      [3000, [7, 9]]
    ]);

    expect(scaled).toEqual([
      [1000, 10],
      [2000, null],
      [3000, 18]
    ]);

    // a backend that hands over plain values is read as it is
    expect(statics._scaleTsData(rrd, [[1000, 4]])).toEqual([[1000, 8]]);
  });

  it('should read the same values as the flot based plugin', function () {
    const xml =
      '<%NAME%>' +
      '<axis unit=" °C" decimals="1">temp</axis>' +
      '<rrd color="#00ff00" label="Bad" steps="true" fill="true"' +
      ' scaling="2" offset="60" resolution="300" consolidationFunction="MAX" style="points"' +
      ' yaxis="temp">bad</rrd>' +
      '</%NAME%>';
    const shared = [
      'tsType',
      'src',
      'color',
      'label',
      'axisIndex',
      'steps',
      'fill',
      'scaling',
      'cFunc',
      'fillTs',
      'resol',
      'offset',
      'style',
      'align',
      'barWidth'
    ];

    const own = content(xml.replace(/%NAME%/g, 'diagram2')).ts[0];
    const old = cv.plugins.diagram.AbstractDiagram.getDiagramElements(parse(xml.replace(/%NAME%/g, 'diagram'))).ts[0];

    shared.forEach(function (key) {
      expect(own[key])
        .withContext('attribute ' + key)
        .toEqual(old[key]);
    });
  });

  it('should build a source for every data set type', function () {
    const res = content(
      '<diagram2>' +
        '<openhab backend="haus">Temperatur_Wohnzimmer</openhab>' +
        '<demo>local-sine.json</demo>' +
        '<unbekannt>x</unbekannt>' +
        '</diagram2>'
    );
    const statics = cv.plugins.diagram2.AbstractDiagram2;

    const openhab = statics.getTimeSeriesSource(res.ts[0]);

    expect(openhab instanceof cv.io.timeseries.OpenhabPersistenceSource).toBeTrue();
    // the source is created once and kept
    expect(statics.getTimeSeriesSource(res.ts[0])).toBe(openhab);

    expect(statics.getTimeSeriesSource(res.ts[1]) instanceof cv.io.timeseries.DemoSource).toBeTrue();

    // an element diagram2 does not know is not read at all
    expect(res.tsnum).toBe(2);
    expect(statics.getTimeSeriesSource({ tsType: 'rrd', src: 'x' })).toBeNull();
  });

  it('should scale and shift the raw values', function () {
    const statics = cv.plugins.diagram2.AbstractDiagram2;
    const ts = { scaling: 2, offset: 60 };
    const scaled = statics._scaleTsData(ts, [
      [1000, 1],
      [2000, null],
      [3000, '3.5']
    ]);

    expect(scaled[0]).toEqual([61000, 2]);
    // a gap stays a gap, it must not become a NaN
    expect(scaled[1]).toEqual([62000, null]);
    expect(scaled[2]).toEqual([63000, 7]);

    // without an offset the timestamps are kept
    expect(statics._scaleTsData({ scaling: 1 }, [[1000, 1]])).toEqual([[1000, 1]]);
  });

  it('should draw the last value up to now when asked for it', function () {
    const statics = cv.plugins.diagram2.AbstractDiagram2;
    const data = [
      [1000, 1],
      [2000, 5]
    ];
    const extended = statics._addNowDatapoint(data.slice(), true);

    expect(extended.length).toBe(3);
    expect(extended[2][1]).toBe(5);
    expect(extended[2][0]).toBeGreaterThan(2000);

    expect(statics._addNowDatapoint(data.slice(), false).length).toBe(2);
    // nothing to repeat
    expect(statics._addNowDatapoint([], true).length).toBe(0);
  });

  it('should ask a source that fetches on its own for the history', async function () {
    const statics = cv.plugins.diagram2.AbstractDiagram2;
    const calls = {};
    const ts = {
      tsType: 'openhab',
      src: 'Temperatur_Bad',
      cFunc: 'AVERAGE',
      fillTs: 'previous',
      source: {
        setHistoryOptions(options) {
          calls.options = options;
        },
        getRequestConfig() {
          return { fetch: false };
        },
        fetchData(start, end, series, period) {
          calls.fetch = [start, end, series, period];

          return Promise.resolve([{ ts: 1, val: 2 }]);
        },
        processResponse(data) {
          calls.processed = data;

          return [[1, 2]];
        }
      }
    };

    const data = await statics.fetchSeries(ts, { start: 'end-3day', end: 'now', res: 300 }, 'day', 3, 300, 60, false);

    expect(calls.options.aggregate).toBe('AVERAGE');
    expect(calls.options.fill).toBe('previous');
    // the resolution is configured in seconds, the source wants milliseconds
    expect(calls.options.step).toBe(300000);
    expect(calls.fetch).toEqual(['end-3day', 'now', 'day', 3]);
    expect(calls.processed).toEqual([{ ts: 1, val: 2 }]);
    expect(data).toEqual([[1, 2]]);
  });

  it('should request the url of a source that has one', async function () {
    const statics = cv.plugins.diagram2.AbstractDiagram2;
    const ts = {
      tsType: 'demo',
      src: 'local-sine.json',
      source: {
        getRequestConfig() {
          return { url: 'charts/local-sine.json', proxy: false, options: { extra: true } };
        },
        processResponse(data) {
          return data;
        }
      }
    };
    spyOn(cv.io.Fetch, 'cachedFetch').and.resolveTo([[1, 2]]);

    const data = await statics.fetchSeries(ts, { start: 'end-1day', end: 'now', res: 300 }, 'day', 1, 300, 60, true);

    expect(data).toEqual([[1, 2]]);
    const args = cv.io.Fetch.cachedFetch.calls.mostRecent().args;

    expect(args[0]).toBe('charts/local-sine.json');
    // a forced reload must not be answered out of the cache
    expect(args[1].ttl).toBe(0);
    expect(args[1].extra).toBeTrue();
  });

  it('should take the panned range as the start of the next request', function () {
    // the settings only need the properties of the widget, not a whole instance
    const widget = {
      getSeries: () => 'day',
      getPeriod: () => 3,
      getSeriesResolution: () => 300,
      getSeriesStart: () => 'end-month',
      getSeriesEnd: () => 'now'
    };
    const settings = cv.plugins.diagram2.AbstractDiagram2.prototype.getSeriesSettings;
    const view = [1600000000000, 1600100000000];

    // without a range the configuration decides
    expect(settings.call(widget, null, true)).toEqual({ start: 'end-3day', end: 'now', res: 300 });

    // the panned range only counts for the interactive diagram, and only its start is used
    expect(settings.call(widget, view, true)).toEqual({ start: '1600000000', end: 'now', res: 300 });
    expect(settings.call(widget, view, false)).toEqual({ start: 'end-3day', end: 'now', res: 300 });

    // a custom series keeps its own start until the user moves the diagram
    const custom = Object.assign({}, widget, { getSeries: () => 'custom' });

    expect(settings.call(custom, null, true).start).toBe('end-month');
    expect(settings.call(custom, view, true).start).toBe('1600000000');
  });

  it('should keep the current look when nothing is configured', function () {
    const data = cv.plugins.diagram2.Diagram2.parse(parse('<diagram2><layout colspan="4"/></diagram2>'), 'id_widths_0');

    expect(data.gridwidth).toBe(1);
    expect(data.gridopacity).toBe(0.4);
    expect(data.borderwidth).toBe(1);
    // without a value the plot keeps its own defaults: 1.5 for lines, 1 for bar and point outlines
    expect(data.linewidth).toBeNull();
    expect(cv.plugins.diagram2.Plot.LINE_WIDTH).toBe(1.5);
    expect(cv.plugins.diagram2.Plot.OUTLINE_WIDTH).toBe(1);
  });

  it('should read the configured stroke widths and grid opacity', function () {
    const xml = '<diagram2 gridwidth="0.5" borderwidth="2" linewidth="2" gridopacity="1"><layout colspan="4"/></diagram2>';
    const data = cv.plugins.diagram2.Diagram2.parse(parse(xml), 'id_widths_1');

    // borderwidth 2, linewidth 2 and a solid grid are what the flot based diagram draws with
    expect(data.gridwidth).toBe(0.5);
    expect(data.borderwidth).toBe(2);
    expect(data.linewidth).toBe(2);
    expect(data.gridopacity).toBe(1);
  });

  it('should fall back to the default for an unusable value', function () {
    const mappings = cv.plugins.diagram2.AbstractDiagram2.getAttributeToPropertyMappings();

    // a value that is no number would end up as NaN and take the whole graph with it
    expect(mappings.linewidth.transform('dick')).toBeNull();
    expect(mappings.gridwidth.transform('-1')).toBe(1);
    expect(mappings.borderwidth.transform('')).toBe(1);
    expect(mappings.borderwidth.transform('0')).toBe(0);

    // an opacity only makes sense between 0 and 1
    expect(mappings.gridopacity.transform('blass')).toBe(0.4);
    expect(mappings.gridopacity.transform('2')).toBe(0.4);
    expect(mappings.gridopacity.transform('0')).toBe(0);
  });

  it('should register both widgets with the parser', function () {
    expect(cv.parser.pure.WidgetParser.getHandler('diagram2')).toBe(cv.plugins.diagram2.Diagram2);
    expect(cv.parser.pure.WidgetParser.getHandler('diagram2_info')).toBe(cv.plugins.diagram2.Info);
    // the flot based plugin keeps its own widgets, both can be used side by side
    expect(cv.parser.pure.WidgetParser.getHandler('diagram')).toBe(cv.plugins.diagram.Diagram);
  });
});
