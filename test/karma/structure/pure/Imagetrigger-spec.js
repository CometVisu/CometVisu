/**
 * Unit tests for imagetrigger widget
 *
 */

define( ['TemplateEngine', '_common', 'widget_imagetrigger'], function(engine, design) {

  describe("testing a imagetrigger widget", function() {
    var templateEngine = engine.getInstance();

    it("should test the imagetrigger creator", function() {

      var creator = design.basicdesign.getCreator("imagetrigger");

      var xml = document.createElement('template');
      xml.innerHTML = '<imagetrigger><label>Test</label></imagetrigger>';
      xml = xml.firstChild;
      var widget = $(creator.create(xml, 'id_0', null, 'imagetrigger'));
    
      expect(widget).toHaveClass('imagetrigger');
      expect(widget.find("div.label").text()).toBe('Test');

      var data = templateEngine.widgetDataGet('id_0');
      expect(data.path).toBe("id_0");
    });
  });
});