/**
 * Unit tests for designtoggle widget
 *
 */

define( ['TemplateEngine', '_common', 'widget_designtoggle'], function(engine, design) {

  describe("testing a designtoggle widget", function() {
    var templateEngine = engine.getInstance();

    it("should test the designtoggle creator", function() {
      var widget = $(this.createTestWidgetString("designtoggle", {}, "<label>Test</label>")[1]);
    
      expect(widget).toHaveClass('toggle');
      expect(widget.find("div.label").text()).toBe('Test');

      var data = templateEngine.widgetDataGet('id_0');
      expect(data.path).toBe("id_0");
    });

    it('should trigger the designtoggle action', function() {

      spyOn($,'getJSON').and.callFake(function(path, callback) {
        callback(['metal','pure']);
      });
      var loc = window.location.href;
      var creator = this.createTestElement('designtoggle');
      spyOn(creator, 'setLocation');

      var actor = this.container.children[0].querySelectorAll('.actor')[0];
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
    });
  });
});