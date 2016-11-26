/**
 * Unit tests for info widget
 *
 */
describe("testing a info widget", function() {

  it("should test the info creator", function() {
    var res = this.createTestWidgetString("info", {}, "<label>Test</label>");
    var widget = qx.bom.Html.clean([res[1]])[0];
    var obj = res[0];

    expect(widget).toHaveClass('info');
    expect(widget).toHaveLabel('Test');
    expect(obj.getPath()).toBe("id_0");
  });

  it("should update an info widget", function() {
    var creator = this.createTestElement('info');

    creator.update('12/7/37', 1);
    var actor = creator.getActor();
    expect(actor).not.toBe(null);
    expect(actor).toHaveValue("1");
  });
});