/**
 * Unit tests for refresh widget
 *
 */
describe("testing a refresh widget", function() {

  it("should test the refresh creator", function() {
    var res = this.createTestWidgetString("refresh", {}, '<label>Test</label>');
    var widget = qx.bom.Html.clean([res[1]])[0];
    expect(res[0].getPath()).toBe("id_0");

    expect(widget).toHaveClass('refresh');
    expect(widget).toHaveLabel('Test');
  });
});