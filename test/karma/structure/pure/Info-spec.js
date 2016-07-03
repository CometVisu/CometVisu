/**
 * Unit tests for info widget
 *
 */

define( ['TemplateEngine', '_common', 'widget_info'], function(engine, design) {

  describe("testing a info widget", function() {
    var templateEngine = engine.getInstance();

    it("should test the info creator", function() {

      var creator = design.basicdesign.getCreator("info");

      var xml = document.createElement('template');
      xml.innerHTML = '<info><label>Test</label></info>';
      xml = xml.firstChild;
      var widget = $(creator.create(xml, 'id_0', null, 'info'));
    
      expect(widget).toHaveClass('info');
      expect(widget.find("div.label").text()).toBe('Test');

      var data = templateEngine.widgetDataGet('id_0');
      expect(data.path).toBe("id_0");
    });
  });
});