/**
 * Unit tests for unkown widget
 *
 * @author Tobias Bräutigam
 * @since 2016
 */

define( ['widget_unknown'], function() {

  describe("testing a unknown widget", function() {

    it("should test the unknown creator", function() {

      var res = this.createTestWidgetString("unknown_widget");

      var unknown = $(res[1]);

      expect(unknown.find("pre").text()).toBe('unknown: UNKNOWN_WIDGET');
    });
  });
});