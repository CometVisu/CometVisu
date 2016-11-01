/**
 * Unit tests for toggle widget
 *
 */

define( ['TemplateEngine', '_common', 'widget_toggle'], function(engine, design) {

  describe("testing a toggle widget", function() {
    var templateEngine = engine.getInstance();

    it("should test the toggle creator", function() {

      var res = this.createTestWidgetString("toggle", {}, '<label>Test</label>');
      var widget = $(res[1]);
      expect(res[0].getPath()).toBe("id_0");
    
      expect(widget).toHaveClass('toggle');
      expect(widget.find("div.label").text()).toBe('Test');

    });
  });
});