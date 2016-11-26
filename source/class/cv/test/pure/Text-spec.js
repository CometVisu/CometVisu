/**
 * Unit tests for text widget
 *
 * @author Tobias Bräutigam
 * @since 2016
 */
describe("testing a text widget", function() {

  it("should test the text creator", function() {

    var res = this.createTestWidgetString("text", {}, '<label>Test</label>');
    var text = qx.bom.Html.clean([res[1]])[0];
    expect(res[0].getPath()).toBe("id_0");

    expect(text).toHaveClass('text');
    expect(text).toHaveLabel('Test');
  });
});