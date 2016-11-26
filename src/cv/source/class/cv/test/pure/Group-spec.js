/**
 * Unit tests for group widget
 *
 */
describe("testing a group widget", function() {

  it("should test the group creator", function() {

    var res = this.createTestWidgetString("group");

    var widget = qx.bom.Html.clean([res[1]])[0];

    expect(widget).toHaveClass('group');
    expect(widget).toHaveClass('widget');
    expect(res[0].getColspan()).toBe(6);
    expect(res[0].getColspanM()).toBe(6);
    expect(res[0].getColspanS()).toBe(12);
  });

  it("should test the group creator with more attributes", function() {
    var res = this.createTestWidgetString("group", {
      nowidget: true,
      class: "test",
      flavour: "potassium",
      align: "right",
      name: "Test",
      target: "target"
    }, '<text/>');
    var widget = qx.bom.Html.clean([res[1]])[0];

    expect(widget).toHaveClass('group');
    expect(widget).toHaveClass('custom_test');
    expect(widget).toHaveClass('flavour_potassium');
    expect(widget).toHaveClass('clickable');
    expect(widget).not.toHaveClass('widget');

    expect(qx.dom.Node.getText(qx.bom.Selector.query("h2", widget)[0])).toBe("Test")
  });

  it('should trigger the group action', function() {

    spyOn(templateEngine, 'scrollToPage');
    var res = this.createTestElement("group", { target: "target" }, "", false);

    cv.MessageBroker.getInstance().publish("setup.dom.finished");
    var Reg = qx.event.Registration;

    var actor = res.getInteractionElement();
    expect(actor).not.toBe(null);

    Reg.fireEvent(actor, "tap", qx.event.type.Event, []);
    expect(templateEngine.scrollToPage).toHaveBeenCalledWith("target");
  });
});