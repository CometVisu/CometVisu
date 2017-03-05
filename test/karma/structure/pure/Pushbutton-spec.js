/**
 * Unit tests for pushbutton widget
 *
 */

define( ['TemplateEngine', '_common', 'widget_pushbutton'], function(engine, design) {

  describe("testing a pushbutton widget", function() {
    var templateEngine = engine.getInstance();

    it("should test the pushbutton creator", function() {

      var creator = design.basicdesign.getCreator("pushbutton");

      var xml = document.createElement('template');
      xml.innerHTML = '<pushbutton><label>Test</label></pushbutton>';
      xml = xml.firstChild;
      var widget = $(creator.create(xml, 'id_0', null, 'pushbutton'));
    
      expect(widget).toHaveClass('pushbutton');
      expect(widget.find("div.label").text()).toBe('Test');

      var data = templateEngine.widgetDataGet('id_0');
      expect(data.path).toBe("id_0");
    });
  });
});