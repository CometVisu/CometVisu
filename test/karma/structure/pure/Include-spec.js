/**
 * Unit tests for include widget
 *
 */

define( ['TemplateEngine', '_common', 'widget_include'], function(engine, design) {

  describe("testing a include widget", function() {
    var templateEngine = engine.getInstance();

    it("should test the include creator", function() {
      spyOn(templateEngine, "create_pages")
      spyOn($, "get");
      spyOn($, "ajax").and.callFake(function() {
        return {'responseXML': $.parseXML('<page name="Start"></page>')};
      });

      var child = $.parseXML('<page name="Start"></page>').childNodes[0];

      this.createTestWidgetString("include", {'src': 'test'});
      expect($.get).toHaveBeenCalledWith('test');
      expect(templateEngine.create_pages).toHaveBeenCalledWith(child, 'id_0', null);
    });
  });
});