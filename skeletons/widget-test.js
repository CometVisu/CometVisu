/**
 * Unit tests for %WIDGET_NAME% widget
 *
 */
describe("testing a %WIDGET_NAME% widget", function() {

  it("should test the %WIDGET_NAME% creator", function() {
    var res = this.createTestWidgetString("%WIDGET_NAME%", {}, "<label>Test</label>");
    var widget = cv.util.String.htmlStringToDomElement(res[1]);
    var obj = res[0];

    expect(widget).toHaveClass('%WIDGET_NAME%');
    expect(widget).toHaveLabel('Test');
    expect(obj.getPath()).toBe("id_0");
  });
});