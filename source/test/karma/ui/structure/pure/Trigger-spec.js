/* Trigger-spec.js 
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
 * Unit tests for trigger widget
 *
 * @author Tobias Bräutigam
 * @since 2016
 */
describe("testing a trigger", function() {
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

  it("should test the trigger creator", function() {

    var res = this.createTestElement("trigger", {
      value:"1",
      shortvalue: "0",
      shorttime: "100",
      flavour: "potassium"
    }, '<label>Test</label>');

    var widget = document.querySelector('#id_0 .widget');

    expect(widget).toHaveFlavour('potassium');

    var actor = Array.from(widget.children).filter(function(m){return m.matches(".actor");})[0];
    expect(actor).not.toBeNull();
    expect(actor).toHaveClass("switchUnpressed");
    expect(actor).not.toHaveClass("switchPressed");

    var value = Array.from(actor.children).filter(function(m){return m.matches(".value");})[0];
    expect(value).not.toBeNull();
    expect(value.innerText).toBe("-");

    this.initWidget(res);

    expect(value.innerText).toBe("1");

    var label = Array.from(widget.children).filter(function(m){return m.matches(".label");})[0];
    expect(label).not.toBeNull();
    expect(label.innerText).toBe("Test");

    expect(res.getSendValue()).toBe("1");
    expect(res.getShortValue()).toBe("0");
    expect(res.getShortThreshold()).toBe(100);

  });

  it('should trigger the trigger shortpress', function(done) {

    var res = this.createTestElement("trigger", {
      value: "1",
      shortvalue: "2",
      shorttime: "100",
      flavour: "potassium"
    }, '<label>Test</label>', ['1/0/0', '1/0/1'], [
      {'transform': 'DPT:5.010', 'mode': 'write', 'variant': 'button'},
      {'transform': 'DPT:5.010', 'mode': 'write', 'variant': 'short'}
    ]);

    this.initWidget(res);

    var client = cv.TemplateEngine.getInstance().visu;
    var actor = res.getInteractionElement();
    expect(actor).not.toBe(null);

    var Reg = qx.event.Registration;

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
      "type": "pointerdown",
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
    var nativeEvent = new window.PointerEvent("pointerdown", Object.assign(eventData, {
      type: "pointerup"
    }));
    Reg.fireEvent(actor, "pointerdown", qx.event.type.Pointer, [nativeEvent, actor, actor, true, true]);
    expect(actor).toHaveClass("switchPressed");
    expect(actor).not.toHaveClass("switchUnpressed");

    setTimeout(function () {
      // up
      nativeEvent = new window.PointerEvent("pointerup", Object.assign(eventData, {
        type: "pointerup"
      }));
      Reg.fireEvent(actor, "pointerup", qx.event.type.Pointer, [nativeEvent, actor, actor, true, true]);
      qx.event.Registration.fireEvent(actor, "tap", qx.event.type.Event, []);
      expect(actor).not.toHaveClass("switchPressed");
      expect(actor).toHaveClass("switchUnpressed");

      expect(client.write).toHaveBeenCalledWith('1/0/1', '8002', jasmine.any(Object));
      expect(client.write.calls.count()).toEqual(1);
      done();
    }, 10);

  });

  it('should test the longpress', function(done) {
    var res = this.createTestElement("trigger", {
      value: "1",
      shortvalue: "2",
      shorttime: "100",
      flavour: "potassium"
    }, '<label>Test</label>', ['1/0/0', '1/0/1'], [
      {'transform': 'DPT:5.010', 'mode': 'write', 'variant': 'button'},
      {'transform': 'DPT:5.010', 'mode': 'write', 'variant': 'short'}
    ]);

    this.initWidget(res);
    var client = cv.TemplateEngine.getInstance().visu
    var actor = res.getInteractionElement();
    expect(actor).not.toBe(null);

    var Reg = qx.event.Registration;

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
      "type": "pointerdown",
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
    var nativeEvent = new window.PointerEvent("pointerdown", Object.assign(eventData, {
      type: "pointerup"
    }));
    Reg.fireEvent(actor, "pointerdown", qx.event.type.Pointer, [nativeEvent, actor, actor, true, true]);
    expect(actor).toHaveClass("switchPressed");
    expect(actor).not.toHaveClass("switchUnpressed");

    setTimeout(function () {
      expect(client.write.calls.count()).toEqual(0);

      // up
      nativeEvent = new window.PointerEvent("pointerup", Object.assign(eventData, {
        type: "pointerup"
      }));
      Reg.fireEvent(actor, "pointerup", qx.event.type.Pointer, [nativeEvent, actor, actor, true, true]);
      qx.event.Registration.fireEvent(actor, "tap", qx.event.type.Event, []);
      expect(actor).not.toHaveClass("switchPressed");
      expect(actor).toHaveClass("switchUnpressed");

      expect(client.write).toHaveBeenCalledWith('1/0/0', '8001', jasmine.any(Object));
      expect(client.write.calls.count()).toEqual(1);
      done();
    }, 150);

  });

  it('should test the longpress send immediately', function(done) {
    var res = this.createTestElement("trigger", {
      value: "1",
      shortvalue: "2",
      shorttime: "100",
      flavour: "potassium",
      "send-long-on-release": "false"
    }, '<label>Test</label>', ['1/0/0', '1/0/1'], [
      {'transform': 'DPT:5.010', 'mode': 'write', 'variant': 'button'},
      {'transform': 'DPT:5.010', 'mode': 'write', 'variant': 'short'}
    ]);

    this.initWidget(res);
    var client = cv.TemplateEngine.getInstance().visu;
    var actor = res.getInteractionElement();
    expect(actor).not.toBe(null);

    var Reg = qx.event.Registration;

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
      "type": "pointerdown",
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
    var nativeEvent = new window.PointerEvent("pointerdown", Object.assign(eventData, {
      type: "pointerup"
    }));
    Reg.fireEvent(actor, "pointerdown", qx.event.type.Pointer, [nativeEvent, actor, actor, true, true]);
    expect(actor).toHaveClass("switchPressed");
    expect(actor).not.toHaveClass("switchUnpressed");

    setTimeout(function () {
      expect(client.write).toHaveBeenCalledWith('1/0/0', '8001', jasmine.any(Object));
      expect(client.write.calls.count()).toEqual(1);

      // up
      nativeEvent = new window.PointerEvent("pointerup", Object.assign(eventData, {
        type: "pointerup"
      }));
      Reg.fireEvent(actor, "pointerup", qx.event.type.Pointer, [nativeEvent, actor, actor, true, true]);
      expect(actor).not.toHaveClass("switchPressed");
      expect(actor).toHaveClass("switchUnpressed");

      expect(client.write).toHaveBeenCalledWith('1/0/0', '8001', jasmine.any(Object));
      expect(client.write.calls.count()).toEqual(1);
      done();
    }, 150);

  });
});