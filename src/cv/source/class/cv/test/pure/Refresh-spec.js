/**
 * Unit tests for refresh widget
 *
 */
describe("testing a refresh widget", function() {

  it("should test the refresh creator", function() {
    var res = this.createTestWidgetString("refresh", {}, '<label>Test</label>');
    var widget = $(res[1]);
    expect(res[0].getPath()).toBe("id_0");

    expect(widget).toHaveClass('refresh');
    expect(widget.find("div.label").text()).toBe('Test');
  });
});