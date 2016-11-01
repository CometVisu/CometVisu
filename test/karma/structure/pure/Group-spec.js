/**
 * Unit tests for group widget
 *
 */

define( ['widget_group', 'widget_text'], function() {

  describe("testing a group widget", function() {

    it("should test the group creator", function() {

      var res = this.createTestWidgetString("group");

      var widget = $(res[1]);

      expect(widget).toHaveClass('group');
      expect(widget).toHaveClass('widget');
      expect(res[0].getColspan()).toBe(6);
      expect(res[0].getColspanM()).toBe(6);
      expect(res[0].getColspanS()).toBe(12);
    });

    it("should test the group creator with more attributes", function() {
      var res = this.createTestWidgetString("group", {
        nowidget: true,
        class: "test",
        flavour: "potassium",
        align: "right",
        name: "Test",
        target: "target"
      }, '<text/>');
      var widget = $(res[1]);

      expect(widget).toHaveClass('group');
      expect(widget).toHaveClass('custom_test');
      expect(widget).toHaveClass('flavour_potassium');
      expect(widget).toHaveClass('clickable');
      expect(widget).not.toHaveClass('widget');

      expect($(widget.find('h2').get(0)).text()).toBe("Test")
    });

    it('should trigger the group action', function() {

      spyOn(templateEngine, 'scrollToPage');
      var res = this.createTestElement("group", { target: "target" });

      var actor = this.container.children[0].querySelectorAll('.actor')[0];
      expect(actor).not.toBe(null);

      //canceled call
      res.action('id_0', actor, true);
      expect(templateEngine.scrollToPage).not.toHaveBeenCalled();

      res.action('id_0', actor, false);
      expect(templateEngine.scrollToPage).toHaveBeenCalledWith("target");
    });
  });
});