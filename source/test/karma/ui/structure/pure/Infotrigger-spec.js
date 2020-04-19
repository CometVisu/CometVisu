/* Infotrigger-spec.js 
 * 
 * copyright (c) 2010-2016, Christian Mayer and the CometVisu contributers.
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
 * Unit tests for infotrigger widget
 *
 */
describe("testing a infotrigger widget", function() {

  var simulateEvent = function (actor, type) {
    var posMap = qx.bom.element.Location.getPosition(actor);
    var x = posMap.left + 1;
    var y = posMap.top + 1;
    var eventData = {
      "bubbles": true,
      "button": -1,
      "clientX": x,
      "clientY": y,
      "currentTarget": actor,
      "pageX": x,
      "pageY": y,
      "returnValue": true,
      "screenX": x,
      "screenY": y,
      "detail": 0,
      "view": window,
      "type": type,
      "x": x,
      "y": y,
      "pointerId": 1,
      "width": 1,
      "height": 1,
      "pressure": 0,
      "tiltX": 0,
      "tiltY": 0,
      "pointerType": "mouse",
      "isPrimary": true,
      "target": actor
    };
    // down
    var nativeEvent = new window.PointerEvent(type, eventData);
    qx.event.Registration.fireEvent(actor, type, qx.event.type.Pointer, [nativeEvent, actor, actor, true, true]);
  };

  var realClient;
  beforeEach(function() {
    realClient = cv.TemplateEngine.getInstance().visu;
    var client = new cv.io.Mockup();
    cv.TemplateEngine.getInstance().visu = client
    spyOn(client, "write");
  });

  afterEach(function () {
    cv.TemplateEngine.getInstance().visu = realClient;
  })

  it("should test the infotrigger creator", function() {

    var obj = this.createTestElement("infotrigger", {}, "<label>Test</label>");
    var widget = obj.getWidgetElement();
    expect(widget).toHaveClass('infotrigger');
    expect(widget).toHaveLabel('Test');

    expect(obj.getPath()).toBe("id_0");

    // check infoposition
    var info = obj.getInfoActor();
    var actors = Array.from(widget.getElementsByTagName("*")).filter(function(m){return m.matches(".actor");});
    expect(actors.indexOf(info)).toBe(0);
  });

  it("should test the infotrigger creator", function() {
    var obj = this.createTestElement("infotrigger", {'align': 'right', 'infoposition': 'middle'});
    var widget = obj.getWidgetElement();
    var actors = widget.querySelectorAll("div.actor");
    actors.forEach(function(actor) {
      expect(window.getComputedStyle(actor)["text-align"]).toBe("right");
    }, this);

    // check infoposition
    var info = obj.getInfoActor();
    actors = Array.from(widget.getElementsByTagName("*")).filter(function(m){return m.matches(".actor");});
    expect(actors.indexOf(info)).toBe(1);
  });

  it("should test the infotrigger creator", function() {

    var obj = this.createTestElement("infotrigger", {'align': 'center', 'infoposition': 'right'});
    var widget = obj.getWidgetElement();
    var actors = widget.querySelectorAll("div.actor");
    actors.forEach(function(actor) {
      expect(window.getComputedStyle(actor)["text-align"]).toBe("center");
    }, this);

    // check infoposition
    var info = obj.getInfoActor();
    actors = Array.from(widget.getElementsByTagName("*")).filter(function(m){return m.matches(".actor");});
    expect(actors.indexOf(info)).toBe(2);
  });

  it("should update an infotrigger widget", function() {
    var creator = this.createTestElement('infotrigger');

    creator.update('12/7/37', 1);
    var actor = creator.getActor();
    expect(actor).not.toBe(null);
    expect(actor).toHaveValue("1");
  });

  it('should trigger the infotrigger action', function() {

    var creator = this.createTestElement('infotrigger', {
      change: 'absolute',
      upvalue: '1',
      downvalue: '-1',
      shortdownvalue: '-2',
      shortupvalue: '2'
    });
    spyOn(creator, "sendToBackend");

    var downActor = creator.getDownActor();
    var upActor = creator.getUpActor();
    expect(downActor).not.toBe(null);
    expect(upActor).not.toBe(null);

    this.initWidget(creator);

    creator.update('12/7/37', 0);
    simulateEvent(upActor, "pointerdown");
    simulateEvent(upActor, "pointerup");
    expect(creator.sendToBackend).toHaveBeenCalledWith(2, jasmine.any(Function));

    creator.update('12/7/37', 1);
    simulateEvent(upActor, "pointerdown");
    simulateEvent(upActor, "pointerup");
    expect(creator.sendToBackend).toHaveBeenCalledWith(3, jasmine.any(Function));
    creator.update('12/7/37', 2);

    simulateEvent(downActor, "pointerdown");
    simulateEvent(downActor, "pointerup");
    expect(creator.sendToBackend).toHaveBeenCalledWith(0, jasmine.any(Function));

    // test lower border
    creator.update('12/7/37', 0);
    simulateEvent(downActor, "pointerdown");
    simulateEvent(downActor, "pointerup");
    expect(creator.sendToBackend).toHaveBeenCalledWith(0, jasmine.any(Function));

    // test upper border
    creator.update('12/7/37', 255);
    simulateEvent(upActor, "pointerdown");
    simulateEvent(upActor, "pointerup");
    expect(creator.sendToBackend).toHaveBeenCalledWith(255, jasmine.any(Function));
  });

  it("should default all unknown infoposition values to left", function() {
    var creator = this.createTestElement('infotrigger', {infoposition: 1});
    expect(creator.getInfoPosition()).toBe('left');
  });

  it('should test the longpress', function(done) {
    var res = this.createTestElement("infotrigger", {
      shorttime: "100",
      'change': 'absolute', 'upvalue': '1', 'downvalue': '-1', 'shortupvalue': '2', 'shortdownvalue': '-2'
    }, '<label>Test</label>', ['1/0/0', '1/0/1'], [
      {'transform': 'DPT:1.001', 'mode': 'write', 'variant': 'button'},
      {'transform': 'DPT:1.001', 'mode': 'write', 'variant': 'short'}
    ]);

    this.initWidget(res);
    var client = cv.TemplateEngine.getInstance().visu;
    var actor = res.getUpActor();
    expect(actor).not.toBe(null);

    simulateEvent(actor, "pointerdown");
    expect(actor).toHaveClass("switchPressed");
    expect(actor).not.toHaveClass("switchUnpressed");

    setTimeout(function () {
      expect(client.write.calls.count()).toEqual(0);
      // up
      simulateEvent(actor, "pointerup");
      expect(actor).not.toHaveClass("switchPressed");
      expect(actor).toHaveClass("switchUnpressed");
      expect(client.write).toHaveBeenCalledWith('1/0/0', '81');
      qx.event.Registration.fireEvent(actor, "tap", qx.event.type.Event, []);
      expect(client.write.calls.count()).toEqual(1);
      done();
    }, 150);

  });

  it('should test the longpress send immediately', function(done) {
    var res = this.createTestElement("infotrigger", {
      shorttime: "100",
      'change': 'absolute', 'upvalue': '1', 'downvalue': '-1', 'shortupvalue': '2', 'shortdownvalue': '-2',
      "send-long-on-release": "false"
    }, '<label>Test</label>', ['1/0/0', '1/0/1'], [
      {'transform': 'DPT:1.001', 'mode': 'write', 'variant': 'button'},
      {'transform': 'DPT:1.001', 'mode': 'write', 'variant': 'short'}
    ]);

    this.initWidget(res);
    var client = cv.TemplateEngine.getInstance().visu;
    var actor = res.getUpActor();
    expect(actor).not.toBe(null);

    simulateEvent(actor, "pointerdown");
    expect(actor).toHaveClass("switchPressed");
    expect(actor).not.toHaveClass("switchUnpressed");

    setTimeout(function () {
      expect(client.write).toHaveBeenCalledWith('1/0/0', '81');
      expect(client.write.calls.count()).toEqual(1);

      // up
      simulateEvent(actor, "pointerup");
      expect(actor).not.toHaveClass("switchPressed");
      expect(actor).toHaveClass("switchUnpressed");
      qx.event.Registration.fireEvent(actor, "tap", qx.event.type.Event, []);

      expect(client.write).toHaveBeenCalledWith('1/0/0', '81');
      expect(client.write.calls.count()).toEqual(1);
      done();
    }, 150);

  });

  it('should test the shortpress', function(done) {
    var res = this.createTestElement("infotrigger", {
      shorttime: "500",
      'change': 'absolute', 'upvalue': '1', 'downvalue': '-1', 'shortupvalue': '2', 'shortdownvalue': '-2'
    }, '<label>Test</label>', ['1/0/0', '1/0/1'], [
      {'transform': 'DPT:6.001', 'mode': 'write', 'variant': 'button'},
      {'transform': 'DPT:6.001', 'mode': 'write', 'variant': 'short'}
    ]);

    this.initWidget(res);
    var client = cv.TemplateEngine.getInstance().visu;
    var actor = res.getUpActor();
    expect(actor).not.toBe(null);

    simulateEvent(actor, "pointerdown");
    expect(actor).toHaveClass("switchPressed");
    expect(actor).not.toHaveClass("switchUnpressed");

    setTimeout(function () {
      // up
      simulateEvent(actor, "pointerup");
      expect(actor).not.toHaveClass("switchPressed");
      expect(actor).toHaveClass("switchUnpressed");
      expect(client.write).toHaveBeenCalledWith('1/0/1', '82');

      qx.event.Registration.fireEvent(actor, "tap", qx.event.type.Event, []);
      expect(client.write.calls.count()).toEqual(1);
      done();
    }, 50);

  });
});