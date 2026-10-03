/* Timeout-spec.js
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
 * Unit tests for the timeout plugin
 */
describe('testing the timeout plugin', function () {
  beforeAll(function (done) {
    cv.util.ScriptLoader.getInstance().setAllQueued(false);
    qx.io.PartLoader.require(['plugin-timeout'], function () {
      cv.util.ScriptLoader.getInstance().addListenerOnce('finished', function () {
        done();
      }, this);
      qx.event.Timer.once(function () {
        cv.util.ScriptLoader.getInstance().setAllQueued(true);
        cv.TemplateEngine.getInstance().setPartsLoaded(true);
      }, this, 10);
    }, this);
  });

  it('should mark the widget data to be initialized when the config cache is used', function () {
    const element = qx.xml.Document.fromString('<timeout target="Übersicht" time="120" />').documentElement;
    const data = cv.plugins.Timeout.parse(element, 'id_0', null, 'text');

    expect(data.$$type).toBe('timeout');
    expect(data.path).toBe('id_0');
    expect(data.target).toBe('Übersicht');
    expect(data.time).toBe(120);
    // The timeout widget has no DOM element, so it must be initialized explicitly when the
    // config is restored from the cache, otherwise its timer would never be started.
    expect(data.$$initOnCacheLoad).toBe(true);
  });
});
