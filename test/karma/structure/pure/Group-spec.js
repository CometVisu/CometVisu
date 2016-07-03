/**
 * Unit tests for group widget
 *
 */

define( ['TemplateEngine', '_common', 'widget_group'], function(engine, design) {

  describe("testing a group widget", function() {
    var templateEngine = engine.getInstance();

    it("should test the group creator", function() {

      var creator = design.basicdesign.getCreator("group");

      var xml = document.createElement('template');
      xml.innerHTML = '<group></group>';
      xml = xml.firstChild;
      var widget = $(creator.create(xml, 'id_0', null, 'group'));
    
      expect(widget).toHaveClass('group');

      var data = templateEngine.widgetDataGet('id_0');
      expect(data.colspan).toBe(6);
      expect(data.colspanM).toBe(6);
      expect(data.colspanS).toBe(12);
    });
  });
});