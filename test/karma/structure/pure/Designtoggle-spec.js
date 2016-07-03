/**
 * Unit tests for designtoggle widget
 *
 */

define( ['TemplateEngine', '_common', 'widget_designtoggle'], function(engine, design) {

  describe("testing a designtoggle widget", function() {
    var templateEngine = engine.getInstance();

    it("should test the designtoggle creator", function() {

      var creator = design.basicdesign.getCreator("designtoggle");

      var xml = document.createElement('template');
      xml.innerHTML = '<designtoggle><label>Test</label></designtoggle>';
      xml = xml.firstChild;
      var widget = $(creator.create(xml, 'id_0', null, 'designtoggle'));
    
      expect(widget).toHaveClass('toggle');
      expect(widget.find("div.label").text()).toBe('Test');

      var data = templateEngine.widgetDataGet('id_0');
      expect(data.path).toBe("id_0");
    });
  });
});