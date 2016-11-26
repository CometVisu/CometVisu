/**
 * Unit tests for web widget
 *
 */
describe("testing a web widget", function() {

  it("should test the web creator", function() {

    var res = this.createTestWidgetString("web", {}, '<label>Test</label>');
    var widget = qx.bom.Html.clean([res[1]])[0];
    expect(res[0].getPath()).toBe("id_0");

    expect(widget).toHaveClass('web');
    expect(widget).toHaveLabel('Test');
  });
});