/* structure_plugin-spec.js 
 * 
 * copyright (c) 2010-2018, Christian Mayer and the CometVisu contributers.
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
 * Unit tests for tr064 plugin
 *
 * @author Christian Mayer
 * @since 2018
 */
describe("testing a TR-064 plugin", function() {

  beforeAll(function(done) {
    cv.util.ScriptLoader.getInstance().setAllQueued(false);
    qx.io.PartLoader.require(['plugin-tr064'], function () {
      cv.util.ScriptLoader.getInstance().addListenerOnce("finished", function () {
        done();
      }, this);
      qx.event.Timer.once(function() {
        cv.util.ScriptLoader.getInstance().setAllQueued(true);
        cv.TemplateEngine.getInstance().setPartsLoaded(true);
      }, this, 10);
    }, this);
  });

  var originalTimeout;
  beforeEach(function() {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  it("should test the TR-064:calllist creator", function() {
    var res = this.createTestWidgetString("calllist", {id: 'test', device: 'testdevice'}, '<label>Test</label>');
    var widget = cv.util.String.htmlStringToDomElement(res[1]);
    var widgetInstance = res[0];

    expect(widget).toHaveClass('calllist');
    expect(widget).toHaveLabel('Test');

    expect(widgetInstance.getPath()).toBe("id_0");
  });

  it("should test the TR-064:calllist column selector and table filling", function(done) {
    var widgetInstance = this.createTestElement("calllist", {id: 'test', device: 'testdevice', columns:"type;tam;name;caller;date;nameOrCaller"}, '<label>Test</label>');
    spyOn(widgetInstance, '_displayCalllist').and.callThrough();

    var widget = widgetInstance.getDomElement();
    qx.event.message.Bus.dispatchByName("setup.dom.finished");

    widgetInstance.addListener('tr064ListRefreshed', function () {
      expect(widgetInstance._displayCalllist).toHaveBeenCalled();
      expect(widget.querySelector('tr').childElementCount).toBe(6); // expect 6 columns
      expect(widget.querySelectorAll('tr').length).toBe(3);         // expect 2 rows
      done();
    });
  });

  it("should test the TR-064:calllist refresh", function(done) {
    var widgetInstance = this.createTestElement("calllist", {id: 'test', device: 'testdevice', refresh:1, columns:"type;tam;date;nameOrCaller"}, '<label>Test</label>');
    spyOn(widgetInstance, 'refreshCalllist').and.callThrough();

    qx.event.message.Bus.dispatchByName("setup.dom.finished");
    var widget = widgetInstance.getDomElement();

    widgetInstance.addListener('tr064ListRefreshed', function () {
      expect(widget.querySelector('tr').childElementCount).toBe(4); // expect 4 columns
      expect(widgetInstance.refreshCalllist).toHaveBeenCalledWith('getCallListURI');
      done();
    });
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
});