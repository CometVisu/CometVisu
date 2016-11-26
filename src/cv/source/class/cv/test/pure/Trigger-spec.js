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

    cv.MessageBroker.getInstance().publish("setup.dom.finished");

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

    cv.MessageBroker.getInstance().publish("setup.dom.finished");

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