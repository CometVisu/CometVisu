/**
 * Unit tests for group widget
 *
 */

define( ['TemplateEngine', '_common', 'widget_group'], function(engine, design) {

  describe("testing a group widget", function() {
    var templateEngine = engine.getInstance();

    it("should test the group creator", function() {

      var creator = design.basicdesign.getCreator("group");

      var xml = document.createElement('template');
      xml.innerHTML = '<group></group>';
      xml = xml.firstChild;
      var widget = $(creator.create(xml, 'id_0', null, 'group'));
    
      expect(widget).toHaveClass('group');
      expect(widget).toHaveClass('widget');

      var data = templateEngine.widgetDataGet('id_0');
      expect(data.colspan).toBe(6);
      expect(data.colspanM).toBe(6);
      expect(data.colspanS).toBe(12);

      xml.innerHTML = '<group nowidget="true" class="test" flavour="potassium" align="right" name="Test" target="target"><text/></group>';
      xml = xml.firstChild;
      var widget = $(creator.create(xml, 'id_0', null, 'group'));

      expect(widget).toHaveClass('group');
      expect(widget).toHaveClass('custom_test');
      expect(widget).toHaveClass('flavour_potassium');
      expect(widget).toHaveClass('clickable');
      expect(widget).not.toHaveClass('widget');

      expect($(widget.find('h2').get(0)).text()).toBe("Test")
    });

    it('should trigger the group action', function() {

      spyOn(templateEngine, 'scrollToPage');
      var creator = design.basicdesign.getCreator("group");
      
      var xml = document.createElement('template');
      xml.innerHTML = '<group target="target"></group>';
      xml = xml.firstChild;
      var widgetString = creator.create(xml, 'id_0', null, 'group');
      var container =document.createElement('div');
      container.setAttribute("class","widget_container");
      container.setAttribute("id", 'id_0');
      container.innerHTML = widgetString;
      document.body.appendChild(container);
      var actor = container.children[0].querySelectorAll('.actor')[0];
      expect(actor).not.toBe(null);

      //canceled call
      creator.action('id_0', actor, true);
      expect(templateEngine.scrollToPage).not.toHaveBeenCalled();

      creator.action('id_0', actor, false);
      expect(templateEngine.scrollToPage).toHaveBeenCalledWith("target");
      document.body.removeChild(container);
    });
  });
});