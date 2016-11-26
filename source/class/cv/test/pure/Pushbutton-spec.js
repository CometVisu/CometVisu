/**
 * Unit tests for pushbutton widget
 *
 */
describe("testing a pushbutton widget", function() {

  it("should test the pushbutton creator", function() {

    var res = this.createTestWidgetString("pushbutton", {}, '<label>Test</label>');
    var widget = qx.bom.Html.clean([res[1]])[0];
    expect(res[0].getPath()).toBe("id_0");

    expect(widget).toHaveClass('pushbutton');
    expect(widget).toHaveLabel('Test');
  });
});