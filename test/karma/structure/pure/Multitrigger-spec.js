/**
 * Unit tests for multitrigger widget
 *
 */

define( ['TemplateEngine', '_common', 'widget_multitrigger'], function(engine, design) {

  describe("testing a multitrigger widget", function() {
    var templateEngine = engine.getInstance();

    it("should test the multitrigger creator", function() {

      var creator = design.basicdesign.getCreator("multitrigger");

      var xml = document.createElement('template');
      xml.innerHTML = '<multitrigger><label>Test</label></multitrigger>';
      xml = xml.firstChild;
      var widget = $(creator.create(xml, 'id_0', null, 'multitrigger'));
    
      expect(widget).toHaveClass('multitrigger');
      expect(widget.find("div.label").text()).toBe('Test');

      var data = templateEngine.widgetDataGet('id_0');
      expect(data.path).toBe("id_0");
    });
  });
});