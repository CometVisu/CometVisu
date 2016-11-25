/**
 * Unit tests for slide widget
 *
 */
describe("testing a slide widget", function() {
  var templateEngine = engine.getInstance();

  it("should test the slide creator", function() {

    var res = this.createTestWidgetString("slide", {}, '<label>Test</label>');
    var widget = $(res[1]);
    expect(res[0].getPath()).toBe("id_0");

    expect(widget).toHaveClass('slide');
    expect(widget.find("div.label").text()).toBe('Test');

  });
});