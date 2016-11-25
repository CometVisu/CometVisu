/**
 * Unit tests for line widget
 *
 * @author Tobias Bräutigam
 * @since 2016
 */
describe("testing a line widget", function() {

  it("should test the line creator", function() {

    var res = this.createTestWidgetString("line");

    var line = $(res[1]);

    expect(line.prop("tagName")).toBe('HR');

    var data = templateEngine.widgetDataGet('id_0');
    expect(res[0].getPath()).toBe("id_0");
  });
});