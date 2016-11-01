/**
 * Unit tests for urltrigger widget
 *
 */

define( ['widget_urltrigger'], function() {

  describe("testing a urltrigger widget", function() {

    it("should test the urltrigger creator", function() {

      var res = this.createTestWidgetString("urltrigger", {}, '<label>Test</label>');
      var widget = $(res[1]);
      expect(res[0].getPath()).toBe("id_0");

      var creator = design.basicdesign.getCreator("urltrigger");

      expect(widget).toHaveClass('trigger');
      expect(widget.find("div.label").text()).toBe('Test');
    });
  });
});