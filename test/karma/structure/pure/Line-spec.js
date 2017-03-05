/**
 * Unit tests for line widget
 *
 * @author Tobias Bräutigam
 * @since 2016
 */

define( ['TemplateEngine', '_common', 'widget_line'], function(engine, design) {

  describe("testing a line widget", function() {
    var templateEngine = engine.getInstance();

    it("should test the line creator", function() {

      var creator = design.basicdesign.getCreator("line");

      var xml = document.createElement('template');
      xml.innerHTML = '<line/>';
      xml = xml.firstChild;
      var line = $(creator.create(xml, 'id_0', null, 'unknown'));

      expect(line.prop("tagName")).toBe('HR');

      var data = templateEngine.widgetDataGet('id_0');
      expect(data.path).toBe("id_0");
    });
  });
});