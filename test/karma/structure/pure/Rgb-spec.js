/**
 * Unit tests for rgb widget
 *
 */

define( ['TemplateEngine', '_common', 'widget_rgb'], function(engine, design) {

  describe("testing a rgb widget", function() {
    var templateEngine = engine.getInstance();

    it("should test the rgb creator", function() {

      var res = this.createTestWidgetString("rgb", {}, '<label>Test</label>');
      var widget = $(res[1]);
      expect(res[0].getPath()).toBe("id_0");
    
      expect(widget).toHaveClass('rgb');
      expect(widget.find("div.label").text()).toBe('Test');
    });
  });
});