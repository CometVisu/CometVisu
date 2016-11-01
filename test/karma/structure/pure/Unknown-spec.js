/**
 * Unit tests for unkown widget
 *
 * @author Tobias Bräutigam
 * @since 2016
 */

define( ['widget_unknown'], function() {

  describe("testing a unknown widget", function() {

    it("should test the unknown creator", function() {

      var data = cv.xml.Parser.parse($('<unknown_widget/>')[0], 'id_0', null, "text");

      var inst = cv.structure.WidgetFactory.createInstance(data.$$type, data);
      var unknown = $(inst.getDomString());

      expect(unknown.find("pre").text()).toBe('unknown: unknown_widget');
    });
  });
});