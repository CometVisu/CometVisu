/**
 * Unit tests for wgplugin_info widget
 *
 */
describe("testing a wgplugin_info widget", function() {

  it("should test the wgplugin_info creator", function() {

    var res = this.createTestWidgetString("wgplugin_info", {}, '<label>Test</label>');
    var widget = qx.bom.Html.clean([res[1]])[0];
    expect(res[0].getPath()).toBe("id_0");

    expect(widget).toHaveClass('info');
    expect(widget).toHaveLabel('Test');
  });
});