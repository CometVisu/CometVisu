/**
 * Unit tests for info widget
 *
 */

define( ['TemplateEngine', '_common', 'widget_info'], function(engine, design) {

  describe("testing a info widget", function() {
    var templateEngine = engine.getInstance();

    it("should test the info creator", function() {
      var widget = $(this.createTestWidgetString("info", {}, "<label>Test</label>")[1]);
    
      expect(widget).toHaveClass('info');
      expect(widget.find("div.label").text()).toBe('Test');

      var data = templateEngine.widgetDataGet('id_0');
      expect(data.path).toBe("id_0");
    });

    it("should update an info widget", function() {
      var creator = this.createTestElement('info');

      creator.update.call(this.container.children[0], '12/7/37', 1);
      var actor = $(this.container.children[0].querySelectorAll('.actor')[0]);
      expect(actor).not.toBe(null);
      expect(actor.find('div.value').text()).toBe("1")
    });
  });
});