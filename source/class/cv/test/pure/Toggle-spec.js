/**
 * Unit tests for toggle widget
 *
 */
describe("testing a toggle widget", function() {

  it("should test the toggle creator", function() {

    var res = this.createTestWidgetString("toggle", {}, '<label>Test</label>');
    var widget = qx.bom.Html.clean([res[1]])[0];
    expect(res[0].getPath()).toBe("id_0");

    expect(widget).toHaveClass('toggle');
    expect(widget).toHaveLabel('Test');

  });
});