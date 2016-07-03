/**
 * Unit tests for audio widget
 *
 * @author Tobias Bräutigam
 * @since 2016
 */

define( ['TemplateEngine', '_common', 'widget_audio'], function(engine, design) {

  describe("testing a audio widget", function() {
    var templateEngine = engine.getInstance();

    it("should test the audio creator", function() {

      var creator = design.basicdesign.getCreator("audio");

      var xml = document.createElement('template');
      xml.innerHTML = '<audio><label>Test</label></audio>';
      xml = xml.firstChild;
      var widget = $(creator.create(xml, 'id_0', null, 'audio'));

      expect(widget).toHaveClass('audio');
      expect(widget.find("div.label").text()).toBe('Test');

      var data = templateEngine.widgetDataGet('id_0');
      expect(data.path).toBe("id_0");
    });
  });
});