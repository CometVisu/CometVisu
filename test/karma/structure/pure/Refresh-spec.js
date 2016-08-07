/**
 * Unit tests for refresh widget
 *
 */

define( ['TemplateEngine', '_common', 'widget_refresh'], function(engine, design) {

  describe("testing a refresh widget", function() {
    var templateEngine = engine.getInstance();

    it("should test the refresh creator", function() {

      var creator = design.basicdesign.getCreator("refresh");

      var xml = document.createElement('template');
      xml.innerHTML = '<refresh><label>Test</label></refresh>';
      xml = xml.firstChild;
      var widget = $(creator.create(xml, 'id_0', null, 'refresh'));
    
      expect(widget).toHaveClass('refresh');
      expect(widget.find("div.label").text()).toBe('Test');

      var data = templateEngine.widgetDataGet('id_0');
      expect(data.path).toBe("id_0");
    });
  });
});