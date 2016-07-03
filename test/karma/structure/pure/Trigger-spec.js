/**
 * Unit tests for trigger widget
 *
 */

define( ['TemplateEngine', '_common', 'widget_trigger'], function(engine, design) {

  describe("testing a trigger widget", function() {
    var templateEngine = engine.getInstance();

    it("should test the trigger creator", function() {

      var creator = design.basicdesign.getCreator("trigger");

      var xml = document.createElement('template');
      xml.innerHTML = '<trigger><label>Test</label></trigger>';
      xml = xml.firstChild;
      var widget = $(creator.create(xml, 'id_0', null, 'trigger'));
    
      expect(widget).toHaveClass('trigger');
      expect(widget.find("div.label").text()).toBe('Test');

      var data = templateEngine.widgetDataGet('id_0');
      expect(data.path).toBe("id_0");
    });
  });
});