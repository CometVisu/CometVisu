/**
 * Unit tests for %WIDGET_NAME% widget
 *
 */

define( ['TemplateEngine', '_common', 'widget_%WIDGET_NAME%'], function(engine, design) {

  describe("testing a %WIDGET_NAME% widget", function() {
    var templateEngine = engine.getInstance();

    it("should test the %WIDGET_NAME% creator", function() {
      var widget = $(this.createTestWidgetString("%WIDGET_NAME%", {}, "<label>Test</label>")[1]);
    
      expect(widget).toHaveClass('%WIDGET_NAME%');
      expect(widget.find("div.label").text()).toBe('Test');

      var data = templateEngine.widgetDataGet('id_0');
      expect(data.path).toBe("id_0");
    });
  });
});