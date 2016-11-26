/**
 * Unit tests for break widget
 *
 * @author Tobias Bräutigam
 * @since 2016
 */
describe("testing a break", function() {

  it("should test the break creator", function() {
    var res = this.createTestWidgetString("break");
    expect(res[1]).toBe('<br/>');
    expect(res[0].getPath()).toBe("id_0");
  });
});