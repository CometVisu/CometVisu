/**
 * Unit tests for rgb widget
 *
 */
describe("testing a rgb widget", function() {

  it("should test the rgb creator", function() {

    var res = this.createTestWidgetString("rgb", {}, '<label>Test</label>');
    var widget = qx.bom.Html.clean([res[1]])[0];
    expect(res[0].getPath()).toBe("id_0");

    expect(widget).toHaveClass('rgb');
    expect(widget).toHaveLabel('Test');
  });
});