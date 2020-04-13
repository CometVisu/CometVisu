/* Imagetrigger-spec.js 
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
 * Unit tests for imagetrigger widget
 *
 */
var templateEngine = cv.TemplateEngine.getInstance();

describe("testing a imagetrigger widget", function() {

  var con, spiedTimer;

  beforeEach(function() {
    con = qx.event.Timer;

    spyOn(qx.event, "Timer").and.callFake(function() {
      spiedTimer = new con();
      spyOn(spiedTimer, "start");
      return spiedTimer;
    });

  });

  afterEach(function(){
    qx.event.Timer = con;
  });

  it("should test the imagetrigger creator", function() {

    var res = this.createTestWidgetString("imagetrigger", {flavour: 'potassium'}, '<label>Test</label>');
    var widget = cv.util.String.htmlStringToDomElement(res[1]);

    expect(widget).toHaveClass('imagetrigger');
    expect(widget).toHaveClass('image');
    expect(widget).toHaveClass('flavour_potassium');
    expect(widget).toHaveLabel('Test');

    expect(res[0].getPath()).toBe("id_0");
  });

  it("should test the imagetriggers refresh behaviour", function() {
    var res = this.createTestElement("imagetrigger", {
      flavour: 'potassium',
      sendValue: 'on',
      refresh: '5',
      type: 'show',
      src: 'imgs',
      suffix: 'jpg'
    });

    this.initWidget(res);
    expect(spiedTimer.start).toHaveBeenCalled();
    expect(res.getSendValue()).toBe("on");
  });

  it("should update a imagetrigger in show mode", function() {
    var res = this.createTestElement("imagetrigger", {
      src: 'imgs',
      suffix: 'jpg',
      type: 'show'
    });

    res.update('12/7/37', 1);
    var actor = this.container.children[0].querySelector('.actor img');
    expect(actor).toBeVisible();
    expect(actor.getAttribute('src')).toBe('imgs.jpg');

    res.update('12/7/37', 0);
    expect(actor).not.toBeVisible();
  });

  it("should update a imagetrigger in select mode", function() {
    var res = this.createTestElement("imagetrigger", {
      src: 'imgs',
      suffix: 'jpg',
      type: 'select'
    });

    res.update('12/7/37', 1);
    var actor = this.container.children[0].querySelector('.actor img');

    expect(actor).toBeVisible();
    expect(actor.getAttribute('src')).toBe('imgs1.jpg');

    res.update('12/7/37', 0);
    expect(actor).not.toBeVisible();
  });

  it('should trigger the imagetrigger action', function() {
    var engine = cv.TemplateEngine.getInstance();
    var visu = jasmine.createSpyObj("visu", ['write']);
    engine.visu = visu;

    var res = this.createTestElement("imagetrigger", {
      src: 'imgs',
      suffix: 'jpg',
      type: 'show',
      sendValue: "1"
    });
    spyOn(res, "sendToBackend");
    this.initWidget(res);
    var Reg = qx.event.Registration;

    var actor = this.container.children[0].querySelector('.actor');
    expect(actor).not.toBe(null);

    // no write flag
    res.getAddress()['12/7/37'][1] = 1;

    Reg.fireEvent(actor, "tap", qx.event.type.Event, []);
    expect(engine.visu.write).not.toHaveBeenCalled();
    res.sendToBackend.calls.reset();

    res.getAddress()['12/7/37'][1] = 3;
    res.setSendValue("");
    Reg.fireEvent(actor, "tap", qx.event.type.Event, []);
    expect(res.sendToBackend).not.toHaveBeenCalled();
    res.setSendValue("1");

    Reg.fireEvent(actor, "tap", qx.event.type.Event, []);
    expect(res.sendToBackend).toHaveBeenCalledWith('1');
  });
});