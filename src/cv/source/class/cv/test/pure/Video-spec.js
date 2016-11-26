/**
 * Unit tests for video widget
 *
 */
describe("testing a video widget", function() {

  it("should test the video creator", function() {

    var res = this.createTestWidgetString("video", {src: ''}, '<label>Test</label>');
    var widget = qx.bom.Html.clean([res[1]])[0];
    expect(res[0].getPath()).toBe("id_0");

    expect(widget).toHaveClass('video');
    expect(widget).toHaveLabel('Test');


  });
});