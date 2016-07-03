/**
 * Unit tests for reload widget
 *
 */

define( ['TemplateEngine', '_common', 'widget_reload'], function(engine, design) {

  describe("testing a reload widget", function() {
    var templateEngine = engine.getInstance();

    it("should test the reload creator", function() {

      var creator = design.basicdesign.getCreator("reload");

      var xml = document.createElement('template');
      xml.innerHTML = '<reload></reload>';
      xml = xml.firstChild;
      var widget = $(creator.create(xml, 'id_0', null, 'reload'));
      var data = templateEngine.widgetDataGet('id_0');
      expect(data.path).toBe("id_0");
    });
  });
});