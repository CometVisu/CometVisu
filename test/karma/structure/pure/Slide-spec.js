/**
 * Unit tests for slide widget
 *
 */

define( ['TemplateEngine', '_common', 'widget_slide'], function(engine, design) {

  describe("testing a slide widget", function() {
    var templateEngine = engine.getInstance();

    it("should test the slide creator", function() {

      var creator = design.basicdesign.getCreator("slide");

      var xml = document.createElement('template');
      xml.innerHTML = '<slide><label>Test</label></slide>';
      xml = xml.firstChild;
      var widget = $(creator.create(xml, 'id_0', null, 'slide'));
    
      expect(widget).toHaveClass('slide');
      expect(widget.find("div.label").text()).toBe('Test');

      var data = templateEngine.widgetDataGet('id_0');
      expect(data.path).toBe("id_0");
    });
  });
});