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
    var eventData = {
      "bubbles": true,
      "button": -1,
      "clientX": 1241,
      "clientY": 360,
      "currentTarget": actor,
      "pageX": 1241,
      "pageY": 360,
      "returnValue": true,
      "screenX": 1241,
      "screenY": 490,
      "detail": 0,
      "view": window,
      "type": type,
      "x": 1241,
      "y": 360,
      "pointerId": 1,
      "width": 1,
      "height": 1,
      "pressure": 0,
      "tiltX": 0,
      "tiltY": 0,
      "pointerType": "mouse",
      "isPrimary": true
    };
    // down
    var nativeEvent = new window.PointerEvent(type, eventData);
    qx.event.Registration.fireEvent(actor, type, qx.event.type.Pointer, [nativeEvent, actor, actor, true, true]);
  };
  //
  it("should test the infotrigger creator", function() {

    var obj = this.createTestElement("infotrigger", {}, "<label>Test</label>");
    var widget = obj.getWidgetElement();
    expect(widget).toHaveClass('infotrigger');
    expect(widget).toHaveLabel('Test');

    expect(obj.getPath()).toBe("id_0");

    // check infoposition
    var info = obj.getInfoActor();
    var actors = qx.bom.Selector.matches(".actor", qx.dom.Hierarchy.getDescendants(widget));
    expect(actors.indexOf(info)).toBe(0);
  });

  it("should test the infotrigger creator", function() {
    var obj = this.createTestElement("infotrigger", {'align': 'right', 'infoposition': 'middle'});
    var widget = obj.getWidgetElement();
    var actors = qx.bom.Selector.query("div.actor", widget);
    actors.forEach(function(actor) {
      expect(qx.bom.element.Style.get(actor, "text-align")).toBe("right");
    }, this);

    // check infoposition
    var info = obj.getInfoActor();
    actors = qx.bom.Selector.matches(".actor", qx.dom.Hierarchy.getDescendants(widget));
    expect(actors.indexOf(info)).toBe(1);
  });

  it("should test the infotrigger creator", function() {

    var obj = this.createTestElement("infotrigger", {'align': 'center', 'infoposition': 'right'});
    var widget = obj.getWidgetElement();
    var actors = qx.bom.Selector.query("div.actor", widget);
    actors.forEach(function(actor) {
      expect(qx.bom.element.Style.get(actor, "text-align")).toBe("center");
    }, this);

    // check infoposition
    var info = obj.getInfoActor();
    actors = qx.bom.Selector.matches(".actor", qx.dom.Hierarchy.getDescendants(widget));
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
    var spy = spyOn(cv.TemplateEngine.getInstance().visu, "write");
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
      qx.event.Registration.fireEvent(actor, "tap", qx.event.type.Event, []);

      expect(spy).toHaveBeenCalledWith('1/0/0', '81');
      expect(spy.calls.count()).toEqual(1);
      done();
    }, 150);

  });

  it('should test the shortpress', function(done) {
    var res = this.createTestElement("infotrigger", {
      shorttime: "100",
      'change': 'absolute', 'upvalue': '1', 'downvalue': '-1', 'shortupvalue': '2', 'shortdownvalue': '-2'
    }, '<label>Test</label>', ['1/0/0', '1/0/1'], [
      {'transform': 'DPT:1.001', 'mode': 'write', 'variant': 'button'},
      {'transform': 'DPT:1.001', 'mode': 'write', 'variant': 'short'}
    ]);

    this.initWidget(res);
    var spy = spyOn(cv.TemplateEngine.getInstance().visu, "write");
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
      qx.event.Registration.fireEvent(actor, "tap", qx.event.type.Event, []);

      expect(spy).toHaveBeenCalledWith('1/0/1', '82');
      expect(spy.calls.count()).toEqual(1);
      done();
    }, 50);

  });
});