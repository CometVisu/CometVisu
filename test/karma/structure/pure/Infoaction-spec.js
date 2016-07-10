/**
 * Unit tests for infoaction widget
 *
 */

define( ['TemplateEngine', '_common', 'widget_infoaction'], function(engine, design) {

  describe("testing a infoaction widget", function() {
    var templateEngine = engine.getInstance();

    it("should test the infoaction creator", function() {

      var creator = design.basicdesign.getCreator("infoaction");

      var xml = document.createElement('template');
      xml.innerHTML = '<infoaction><label>Test</label><widgetinfo><info></info></widgetinfo><widgetaction><switch></switch></widgetaction></infoaction>';
      xml = xml.firstChild;
      var widget = $(creator.create(xml, 'id_0', null, 'infoaction'));

      expect(widget).toHaveClass('infoaction');
      expect(widget.find("div.label").text()).toBe('Test');

      var data = templateEngine.widgetDataGet('id_0');
      expect(data.path).toBe("id_0");
    });
  });
});