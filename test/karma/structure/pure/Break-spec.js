/**
 * Unit tests for break widget
 *
 * @author Tobias Bräutigam
 * @since 2016
 */

define( ['TemplateEngine', '_common', 'widget_break'], function(engine, design) {

  describe("testing a break", function() {
    var templateEngine = engine.getInstance();

    it("should test the break creator", function() {

      var creator = design.basicdesign.getCreator("break");

      var xml = document.createElement('template');
      xml.innerHTML = '<break/>';
      xml = xml.firstChild;
      var breakString = creator.create(xml, 'id_0', null, 'break');

      expect(breakString).toBe('<br />');

      var data = templateEngine.widgetDataGet('id_0');
      expect(data.path).toBe("id_0");
    });
  });
});