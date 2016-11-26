/**
 * Unit tests for line widget
 *
 * @author Tobias Bräutigam
 * @since 2016
 */
describe("testing a line widget", function() {

  it("should test the line creator", function() {

    var res = this.createTestWidgetString("line");

    var line = qx.bom.Html.clean([res[1]])[0];

    expect(qx.dom.Node.getName(line).toLowerCase()).toBe('hr');
    expect(res[0].getPath()).toBe("id_0");
  });
});