/**
 * Unit tests for %WIDGET_NAME% widget
 *
 */
describe("testing a %WIDGET_NAME% widget", function() {

  it("should test the %WIDGET_NAME% creator", function() {
    var res = this.createTestWidgetString("%WIDGET_NAME%", {}, "<label>Test</label>");
    var widget = qx.bom.Html.clean([res[1]])[0];
    var obj = res[0];

    expect(widget).toHaveClass('%WIDGET_NAME%');
    expect(widget).toHaveLabel('Test');
    expect(obj.getPath()).toBe("id_0");
  });
});