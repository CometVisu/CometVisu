/**
 * Unit tests for unkown widget
 *
 * @author Tobias Bräutigam
 * @since 2016
 */

define( ['TemplateEngine', '_common', 'widget_unknown'], function(engine, design) {

  describe("testing a unknown widget", function() {
    var templateEngine = engine.getInstance();

    it("should test the unknown creator", function() {

      var creator = design.basicdesign.getCreator("unknown");

      var xml = document.createElement('template');
      xml.innerHTML = '<unknown_widget/>';
      xml = xml.firstChild;
      var unknown = $(creator.create(xml, 'id_0', null, 'unknown'));

      expect(unknown.find("pre").text()).toBe('unknown: UNKNOWN_WIDGET');
    });
  });
});