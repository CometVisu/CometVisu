/**
 * Unit tests for infoaction widget
 *
 */
describe("testing a infoaction widget", function() {
  var templateEngine = engine.getInstance();

  it("should test the infoaction creator", function() {

    var res = this.createTestWidgetString("infoaction", {}, '<label>Test</label><widgetinfo><info></info></widgetinfo><widgetaction><switch></switch></widgetaction>');
    var widget = $(res[1]);
    expect(res[0].getPath()).toBe("id_0");

    expect(widget).toHaveClass('infoaction');
    expect(widget.find("div.label").text()).toBe('Test');

  });
});