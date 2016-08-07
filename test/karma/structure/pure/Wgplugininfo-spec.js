/**
 * Unit tests for wgplugin_info widget
 *
 */

define( ['TemplateEngine', '_common', 'widget_wgplugin_info'], function(engine, design) {

  describe("testing a wgplugin_info widget", function() {
    var templateEngine = engine.getInstance();

    it("should test the wgplugin_info creator", function() {

      var creator = design.basicdesign.getCreator("wgplugin_info");

      var xml = document.createElement('template');
      xml.innerHTML = '<wgplugin_info><label>Test</label></wgplugin_info>';
      xml = xml.firstChild;
      var widget = $(creator.create(xml, 'id_0', null, 'wgplugin_info'));
    
      expect(widget).toHaveClass('info');
      expect(widget.find("div.label").text()).toBe('Test');

      var data = templateEngine.widgetDataGet('id_0');
      expect(data.path).toBe("id_0");
    });
  });
});