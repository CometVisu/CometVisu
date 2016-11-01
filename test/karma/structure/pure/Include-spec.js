/**
 * Unit tests for include widget
 *
 */

define( ['widget_include'], function() {

  describe("testing a include widget", function() {

    it("should test the include creator", function() {
      spyOn(templateEngine, "create_pages");
      spyOn($, "ajax").and.callFake(function() {
        return {'responseXML': $.parseXML('<page name="Start"></page>')};
      });

      var child = $.parseXML('<page name="Start"></page>').childNodes[0];

      this.createTestWidgetString("include", {'src': 'test'});
      expect(templateEngine.create_pages).toHaveBeenCalledWith(child, 'id_0', null);
    });
  });
});