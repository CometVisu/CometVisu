/**
 * Unit tests for switch widget
 *
 * @author Tobias Bräutigam
 * @since 2016
 */
describe("testing a switch", function() {
  it("should test the switch creator", function() {

    var res = this.createTestElement("switch", {flavour: 'potassium'}, '<label>Test</label>');
    var switchWidget = qx.bom.Selector.matches(".switch", qx.dom.Hierarchy.getChildElements(res.getDomElement()))[0];

    expect(switchWidget).toHaveFlavour('potassium');
    var actor = res.getActor();
    expect(actor).not.toBeNull();
    expect(actor).toHaveClass("switchUnpressed");
    expect(actor).not.toHaveClass("switchPressed");

    var value = res.getValueElement();
    expect(value).not.toBeNull();
    expect(qx.dom.Node.getText(value)).toBe("-");

    var label = qx.bom.Selector.matches(".label", qx.dom.Hierarchy.getChildElements(switchWidget))[0];
    expect(label).not.toBeNull();
    expect(qx.dom.Node.getText(label)).toBe("Test");

    expect(res.getOnValue()).toBe("1");
    expect(res.getOffValue()).toBe("0");
  });

  it("should test the switch creator with different on/off values", function() {
    var res = this.createTestElement("switch", {on_value: "turn_on", off_value: "turn_off"});

    expect(res.getOnValue()).toBe('turn_on');
    expect(res.getOffValue()).toBe('turn_off');
  });

  it("should update a switch", function() {
    var res = this.createTestElement("switch", {}, '<label>Test</label>');

    res.update('12/7/37', 1);
    var actor = res.getActor();
    expect(actor).not.toBe(null);

    expect(actor).toHaveClass("switchPressed");
    expect(actor).not.toHaveClass("switchUnpressed");

    res.update('12/7/37', 0);
    expect(actor).toHaveClass("switchUnpressed");
    expect(actor).not.toHaveClass("switchPressed");
  });

  it('should trigger the switch action', function() {

    var res = this.createTestElement("switch", {}, '<label>Test</label>');
    cv.MessageBroker.getInstance().publish("setup.dom.finished");
    spyOn(res, 'sendToBackend');

    var actor = res.getActor();
    expect(actor).not.toBe(null);

    var Reg = qx.event.Registration;

    res.update('12/7/37', 0);

    Reg.fireEvent(actor, "tap", qx.event.type.Event, []);
    expect(res.sendToBackend).toHaveBeenCalledWith('1');

    res.update('12/7/37', 1);

    Reg.fireEvent(actor, "tap", qx.event.type.Event, []);
    expect(res.sendToBackend).toHaveBeenCalledWith('0');
  });
});