/**
 * Unit tests for pushbutton widget
 *
 */

define( ['TemplateEngine', '_common', 'widget_pushbutton'], function(engine, design) {

  describe("testing a pushbutton widget", function() {
    var templateEngine = engine.getInstance();

    it("should test the pushbutton creator", function() {

      var res = this.createTestWidgetString("pushbutton", {}, '<label>Test</label>');
      var widget = $(res[1]);
      expect(res[0].getPath()).toBe("id_0");
    
      expect(widget).toHaveClass('pushbutton');
      expect(widget.find("div.label").text()).toBe('Test');
    });
  });
});