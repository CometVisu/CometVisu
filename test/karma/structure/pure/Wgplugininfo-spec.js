/**
 * Unit tests for wgplugin_info widget
 *
 */

define( ['widget_wgplugin_info'], function() {

  describe("testing a wgplugin_info widget", function() {

    it("should test the wgplugin_info creator", function() {

      var res = this.createTestWidgetString("wgplugin_info", {}, '<label>Test</label>');
      var widget = $(res[1]);
      expect(res[0].getPath()).toBe("id_0");

      expect(widget).toHaveClass('info');
      expect(widget.find("div.label").text()).toBe('Test');
    });
  });
});