/**
 * Unit tests for reload widget
 *
 */

define( ['widget_reload'], function() {

  describe("testing a reload widget", function() {

    it("should test the reload creator", function() {
      var res = this.createTestWidgetString("reload");
      expect(res[0].getPath()).toBe("id_0");
    });
  });
});