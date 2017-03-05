/**
 * Unit tests for web widget
 *
 */

define( ['TemplateEngine', '_common', 'widget_web'], function(engine, design) {

  describe("testing a web widget", function() {
    var templateEngine = engine.getInstance();

    it("should test the web creator", function() {

      var creator = design.basicdesign.getCreator("web");

      var xml = document.createElement('template');
      xml.innerHTML = '<web><label>Test</label></web>';
      xml = xml.firstChild;
      var widget = $(creator.create(xml, 'id_0', null, 'web'));
    
      expect(widget).toHaveClass('web');
      expect(widget.find("div.label").text()).toBe('Test');

      var data = templateEngine.widgetDataGet('id_0');
      expect(data.path).toBe("id_0");
    });
  });
});