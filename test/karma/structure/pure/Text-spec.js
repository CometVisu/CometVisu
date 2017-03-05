/**
 * Unit tests for text widget
 *
 * @author Tobias Bräutigam
 * @since 2016
 */

define( ['TemplateEngine', '_common', 'widget_text'], function(engine, design) {

  describe("testing a text widget", function() {
    var templateEngine = engine.getInstance();

    it("should test the text creator", function() {

      var creator = design.basicdesign.getCreator("text");

      var xml = document.createElement('template');
      xml.innerHTML = '<text><label>Test</label></text>';
      xml = xml.firstChild;
      var text = $(creator.create(xml, 'id_0', null, 'text'));

      expect(text).toHaveClass('text');
      expect(text.find("div").text()).toBe('Test');

      var data = templateEngine.widgetDataGet('id_0');
      expect(data.path).toBe("id_0");
    });
  });
});