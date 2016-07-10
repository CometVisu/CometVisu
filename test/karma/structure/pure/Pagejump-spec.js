/**
 * Unit tests for pagejump widget
 *
 */

define( ['TemplateEngine', '_common', 'widget_pagejump'], function(engine, design) {

  describe("testing a pagejump widget", function() {
    var templateEngine = engine.getInstance();

    it("should test the pagejump creator", function() {

      var creator = design.basicdesign.getCreator("pagejump");

      var xml = document.createElement('template');
      xml.innerHTML = '<pagejump><label>Test</label></pagejump>';
      xml = xml.firstChild;
      var widget = $(creator.create(xml, 'id_0', null, 'pagejump'));

      expect(widget).toHaveClass('pagejump');
      expect(widget.find("div.label").text()).toBe('Test');

      var data = templateEngine.widgetDataGet('id_0');
      expect(data.path).toBe("id_0");
    });
  });
});