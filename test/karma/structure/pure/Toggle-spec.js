/**
 * Unit tests for toggle widget
 *
 */

define( ['TemplateEngine', '_common', 'widget_toggle'], function(engine, design) {

  describe("testing a toggle widget", function() {
    var templateEngine = engine.getInstance();

    it("should test the toggle creator", function() {

      var creator = design.basicdesign.getCreator("toggle");

      var xml = document.createElement('template');
      xml.innerHTML = '<toggle><label>Test</label></toggle>';
      xml = xml.firstChild;
      var widget = $(creator.create(xml, 'id_0', null, 'toggle'));
    
      expect(widget).toHaveClass('toggle');
      expect(widget.find("div.label").text()).toBe('Test');

      var data = templateEngine.widgetDataGet('id_0');
      expect(data.path).toBe("id_0");
    });
  });
});