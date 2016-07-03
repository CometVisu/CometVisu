/**
 * Unit tests for infotrigger widget
 *
 */

define( ['TemplateEngine', '_common', 'widget_infotrigger'], function(engine, design) {

  describe("testing a infotrigger widget", function() {
    var templateEngine = engine.getInstance();

    it("should test the infotrigger creator", function() {

      var creator = design.basicdesign.getCreator("infotrigger");

      var xml = document.createElement('template');
      xml.innerHTML = '<infotrigger><label>Test</label></infotrigger>';
      xml = xml.firstChild;
      var widget = $(creator.create(xml, 'id_0', null, 'infotrigger'));
    
      expect(widget).toHaveClass('infotrigger');
      expect(widget.find("div.label").text()).toBe('Test-+');

      var data = templateEngine.widgetDataGet('id_0');
      expect(data.path).toBe("id_0");
    });
  });
});