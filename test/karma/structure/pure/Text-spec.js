/**
 * Unit tests for text widget
 *
 * @author Tobias Bräutigam
 * @since 2016
 */

define( ['widget_text'], function(engine) {

  describe("testing a text widget", function() {
    var templateEngine = engine.getInstance();

    it("should test the text creator", function() {

      var res = this.createTestWidgetString("test", {}, '<label>Test</label>');
      var text = $(res[1]);
      expect(res[0].getPath()).toBe("id_0");

      expect(text).toHaveClass('text');
      expect(text.find("div").text()).toBe('Test');
    });
  });
});