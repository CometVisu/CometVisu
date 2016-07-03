/**
 * Unit tests for %WIDGET_NAME% widget
 *
 */

define( ['TemplateEngine', '_common', 'widget_%WIDGET_NAME%'], function(engine, design) {

  describe("testing a %WIDGET_NAME% widget", function() {
    var templateEngine = engine.getInstance();

    it("should test the %WIDGET_NAME% creator", function() {

      var creator = design.basicdesign.getCreator("%WIDGET_NAME%");

      var xml = document.createElement('template');
      xml.innerHTML = '<%WIDGET_NAME%><label>Test</label></%WIDGET_NAME%>';
      xml = xml.firstChild;
      var widget = $(creator.create(xml, 'id_0', null, '%WIDGET_NAME%'));
    
      expect(widget).toHaveClass('%WIDGET_NAME%');
      expect(widget.find("div.label").text()).toBe('Test');

      var data = templateEngine.widgetDataGet('id_0');
      expect(data.path).toBe("id_0");
    });
  });
});