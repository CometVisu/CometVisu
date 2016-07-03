/**
 * Unit tests for video widget
 *
 */

define( ['TemplateEngine', '_common', 'widget_video'], function(engine, design) {

  describe("testing a video widget", function() {
    var templateEngine = engine.getInstance();

    it("should test the video creator", function() {

      var creator = design.basicdesign.getCreator("video");

      var xml = document.createElement('template');
      xml.innerHTML = '<video><label>Test</label></video>';
      xml = xml.firstChild;
      var widget = $(creator.create(xml, 'id_0', null, 'video'));
    
      expect(widget).toHaveClass('video');
      expect(widget.find("div.label").text()).toBe('Test');

      var data = templateEngine.widgetDataGet('id_0');
      expect(data.path).toBe("id_0");
    });
  });
});