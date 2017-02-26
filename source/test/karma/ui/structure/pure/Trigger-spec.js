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
  var templateEngine = cv.TemplateEngine.getInstance();

  // templateEngine.visu = new ClientMockup();
  // var creator = design.basicdesign.getCreator("trigger");
  // var container;
  //
  // beforeEach(function() {
  //
  //   var xml = document.createElement('template');
  //   xml.innerHTML = '<trigger value="1" shortvalue="0" shorttime="100" flavour="potassium"><label>Test</label><address transform="DPT:1.001" mode="readwrite">12/7/37</address></trigger>';
  //   xml = xml.firstChild;
  //   var triggerString = creator.create(xml, 'id_0', null, 'trigger');
  //
  //   container = document.createElement('div');
  //   container.setAttribute("class","widget_container");
  //   container.setAttribute("id", 'id_0');
  //   container.innerHTML = triggerString;
  //   document.body.appendChild(container);
  //
  // });
  //
  // afterEach(function() {
  //   document.body.removeChild(container);
  // });

  it("should test the trigger creator", function() {

    var res = this.createTestElement("trigger", {
      value:"1",
      shortvalue: "0",
      shorttime: "100",
      flavour: "potassium"
    }, '<label>Test</label>');

    var widget = qx.bom.Selector.query('#id_0 .widget')[0];

    expect(widget).toHaveFlavour('potassium');

    var actor = qx.bom.Selector.matches(".actor", qx.dom.Hierarchy.getChildElements(widget))[0];
    expect(actor).not.toBeNull();
    expect(actor).toHaveClass("switchUnpressed");
    expect(actor).not.toHaveClass("switchPressed");

    var value = qx.bom.Selector.matches(".value", qx.dom.Hierarchy.getChildElements(actor))[0];
    expect(value).not.toBeNull();
    expect(qx.dom.Node.getText(value)).toBe("-");

    this.initWidget(res);

    expect(qx.dom.Node.getText(value)).toBe("1");

    var label = qx.bom.Selector.matches(".label", qx.dom.Hierarchy.getChildElements(widget))[0];
    expect(label).not.toBeNull();
    expect(qx.dom.Node.getText(label)).toBe("Test");

    expect(res.getSendValue()).toBe("1");
    expect(res.getShortValue()).toBe("0");
    expect(res.getShortThreshold()).toBe(100);

  });

  it('should trigger the trigger downaction', function() {

    var res = this.createTestElement("trigger", {
      value:"1",
      shortvalue: "0",
      shorttime: "100",
      flavour: "potassium"
    }, '<label>Test</label>');

    this.initWidget(res);

    spyOn(res, "sendToBackend");
    var actor = res.getActor();
    expect(actor).not.toBe(null);

    var Reg = qx.event.Registration;

    // longpress
    Reg.fireEvent(actor, "longtap", qx.event.type.Event, []);
    expect(res.sendToBackend).toHaveBeenCalledWith('1', jasmine.any(Function));

    //shortpress
    Reg.fireEvent(actor, "tap", qx.event.type.Event, []);
    expect(res.sendToBackend).toHaveBeenCalledWith('0', jasmine.any(Function));

    // down
    Reg.fireEvent(actor, "pointerdown", qx.event.type.Event, []);
    expect(actor).toHaveClass("switchPressed");
    expect(actor).not.toHaveClass("switchUnpressed");
    // up
    Reg.fireEvent(actor, "pointerup", qx.event.type.Event, []);
    expect(actor).not.toHaveClass("switchPressed");
    expect(actor).toHaveClass("switchUnpressed");
  });
});