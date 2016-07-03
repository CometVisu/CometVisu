/**
 * Unit tests for urltrigger widget
 *
 */

define( ['TemplateEngine', '_common', 'widget_urltrigger'], function(engine, design) {

  describe("testing a urltrigger widget", function() {
    var templateEngine = engine.getInstance();

    it("should test the urltrigger creator", function() {

      var creator = design.basicdesign.getCreator("urltrigger");

      var xml = document.createElement('template');
      xml.innerHTML = '<urltrigger><label>Test</label></urltrigger>';
      xml = xml.firstChild;
      var widget = $(creator.create(xml, 'id_0', null, 'urltrigger'));
    
      expect(widget).toHaveClass('trigger');
      expect(widget.find("div.label").text()).toBe('Test');

      var data = templateEngine.widgetDataGet('id_0');
      expect(data.path).toBe("id_0");
    });
  });
});