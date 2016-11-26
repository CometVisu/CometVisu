/**
 * Unit tests for slide widget
 *
 */
describe("testing a slide widget", function() {

  // disabled until jquery dep has been removed
  xit("should test the slide creator", function() {

    var res = this.createTestWidgetString("slide", {}, '<label>Test</label>');
    var widget = qx.bom.Html.clean([res[1]])[0];
    expect(res[0].getPath()).toBe("id_0");

    expect(widget).toHaveClass('slide');
    expect(widget).toHaveLabel('Test');

  });
});