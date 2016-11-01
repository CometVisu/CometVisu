/**
 * Unit tests for web widget
 *
 */

define( ['widget_web'], function() {

  describe("testing a web widget", function() {

    it("should test the web creator", function() {

      var res = this.createTestWidgetString("web", {}, '<label>Test</label>');
      var widget = $(res[1]);
      expect(res[0].getPath()).toBe("id_0");

      expect(widget).toHaveClass('web');
      expect(widget.find("div.label").text()).toBe('Test');

      var data = templateEngine.widgetDataGet('id_0');
    });
  });
});