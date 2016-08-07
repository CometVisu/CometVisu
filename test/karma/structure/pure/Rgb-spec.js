/**
 * Unit tests for rgb widget
 *
 */

define( ['TemplateEngine', '_common', 'widget_rgb'], function(engine, design) {

  describe("testing a rgb widget", function() {
    var templateEngine = engine.getInstance();

    it("should test the rgb creator", function() {

      var creator = design.basicdesign.getCreator("rgb");

      var xml = document.createElement('template');
      xml.innerHTML = '<rgb><label>Test</label></rgb>';
      xml = xml.firstChild;
      var widget = $(creator.create(xml, 'id_0', null, 'rgb'));
    
      expect(widget).toHaveClass('rgb');
      expect(widget.find("div.label").text()).toBe('Test');

      var data = templateEngine.widgetDataGet('id_0');
      expect(data.path).toBe("id_0");
    });
  });
});