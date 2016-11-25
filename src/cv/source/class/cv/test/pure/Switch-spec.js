/**
 * Unit tests for switch widget
 *
 * @author Tobias Bräutigam
 * @since 2016
 */
describe("testing a switch", function() {
  it("should test the switch creator", function() {

    var res = this.createTestElement("switch", {flavour: 'potassium'}, '<label>Test</label>');
    var switchWidget = $(res.getDomElement().find(".switch"));

    expect(switchWidget).toHaveFlavour('potassium');
    var actor = switchWidget.find(".actor");
    expect(actor).not.toBeNull();
    expect(actor).toHaveClass("switchUnpressed");
    expect(actor).not.toHaveClass("switchPressed");

    var value = actor.find(".value");
    expect(value).not.toBeNull();
    expect(value.text()).toBe("-");

    var label = switchWidget.find(".label");
    expect(label).not.toBeNull();
    expect(label.text()).toBe("Test");

    expect(res.getOnValue()).toBe(1);
    expect(res.getOffValue()).toBe(0);
  });

  it("should test the switch creator with different on/off values", function() {
    var res = this.createTestElement("switch", {on_value: "turn_on", off_value: "turn_off"});

    expect(res.getOnValue()).toBe('turn_on');
    expect(res.getOffValue()).toBe('turn_off');
  });

  it("should update a switch", function() {
    var res = this.createTestElement("switch", {}, '<label>Test</label>');

    res.update('12/7/37', 1);
    var actor = $(this.container.children[0].querySelectorAll('.actor')[0]);
    expect(actor).not.toBe(null);

    expect(actor).toHaveClass("switchPressed");
    expect(actor).not.toHaveClass("switchUnpressed");

    res.update('12/7/37', 0);
    expect(actor).toHaveClass("switchUnpressed");
    expect(actor).not.toHaveClass("switchPressed");
  });

  it('should trigger the switch action', function() {
    spyOn(templateEngine.visu, 'write');

    var res = this.createTestElement("switch", {}, '<label>Test</label>');

    var actor = res.getActor();
    expect(actor).not.toBe(null);

    //canceled call
    res.action('id_0', actor, true);
    expect(templateEngine.visu.write).not.toHaveBeenCalled();

    res.update('12/7/37', 0);

    res.action('id_0', actor, false);
    expect(templateEngine.visu.write).toHaveBeenCalledWith('12/7/37', '81');

    res.update('12/7/37', 1);

    res.action('id_0', actor, false);
    expect(templateEngine.visu.write).toHaveBeenCalledWith('12/7/37', '80');
  });
});