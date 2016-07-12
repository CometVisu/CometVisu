/**
 * Unit tests for designtoggle widget
 *
 */

define( ['TemplateEngine', '_common', 'widget_designtoggle'], function(engine, design) {

  describe("testing a designtoggle widget", function() {
    var templateEngine = engine.getInstance();

    it("should test the designtoggle creator", function() {
      var creator = design.basicdesign.getCreator("designtoggle");

      var xml = document.createElement('template');
      xml.innerHTML = '<designtoggle><label>Test</label></designtoggle>';
      xml = xml.firstChild;
      var widget = $(creator.create(xml, 'id_0', null, 'designtoggle'));
    
      expect(widget).toHaveClass('toggle');
      expect(widget.find("div.label").text()).toBe('Test');

      var data = templateEngine.widgetDataGet('id_0');
      expect(data.path).toBe("id_0");
    });

    it('should trigger the switch action', function() {

      spyOn($,'getJSON').and.callFake(function(path, callback) {
        callback(['metal','pure']);
      });
      var loc = window.location.href;
      var creator = design.basicdesign.getCreator("designtoggle");
      spyOn(creator, 'setLocation');

      var xml = document.createElement('template');
      xml.innerHTML = '<designtoggle><label>Test</label></designtoggle>';
      xml = xml.firstChild;
      var widgetString = creator.create(xml, 'id_0', null, 'designtoggle');
      var container =document.createElement('div');
      container.setAttribute("class","widget_container");
      container.setAttribute("id", 'id_0');
      container.innerHTML = widgetString;
      document.body.appendChild(container);
      var actor = container.children[0].querySelectorAll('.actor')[0];
      expect(actor).not.toBe(null);

      //canceled call
      creator.action('id_0', actor, true);
      expect(creator.setLocation).not.toHaveBeenCalled();

      creator.action('id_0', actor, false);
      expect(creator.setLocation).toHaveBeenCalledWith(loc+"?design=metal");

      spyOn(creator,'getLocation').and.returnValue(loc+"?design=pure");
      creator.action('id_0', actor, false);
      expect(creator.setLocation).toHaveBeenCalledWith(loc+"?design=metal");

      creator.getLocation.and.returnValue(loc+"?other=parameter");
      creator.action('id_0', actor, false);
      expect(creator.setLocation).toHaveBeenCalledWith(loc+"?other=parameter&design=metal");

      document.body.removeChild(container);
    });
  });
});