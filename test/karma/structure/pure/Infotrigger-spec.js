/**
 * Unit tests for infotrigger widget
 *
 */

define( ['TemplateEngine', '_common', 'widget_infotrigger'], function(engine, design) {

  describe("testing a infotrigger widget", function() {
    var templateEngine = engine.getInstance();

    it("should test the infotrigger creator", function() {

      var widget = $(this.createTestWidgetString("infotrigger", {}, "<label>Test</label>")[1]);

      expect(widget).toHaveClass('infotrigger');
      expect(widget.find("div.label").text()).toBe('Test-+');

      var data = templateEngine.widgetDataGet('id_0');
      expect(data.path).toBe("id_0");

      // check infoposition
      var actors = $(widget.find("div.actor"));
      expect($(actors.get(0)).find('div.value').length).toBe(1);
      expect($(actors.get(1)).find('div.value').length).toBe(0);
      expect($(actors.get(2)).find('div.value').length).toBe(0);

      widget = $(this.createTestWidgetString("infotrigger", {'align': 'right', 'infoposition': 'middle'})[1]);
      expect($(widget.find("div.actor")).css('text-align')).toBe('right');
      actors = $(widget.find("div.actor"));

      // check infoposition
      expect($(actors.get(0)).find('div.value').length).toBe(0);
      expect($(actors.get(1)).find('div.value').length).toBe(1);
      expect($(actors.get(2)).find('div.value').length).toBe(0);

      widget = $(this.createTestWidgetString("infotrigger", {'align': 'center', 'infoposition': 'right'})[1]);
      expect($(widget.find("div.actor")).css('text-align')).toBe('center');
      actors = $(widget.find("div.actor"));

      // check infoposition
      expect($(actors.get(0)).find('div.value').length).toBe(0);
      expect($(actors.get(1)).find('div.value').length).toBe(0);
      expect($(actors.get(2)).find('div.value').length).toBe(1);
    });

    it("should update an infotrigger widget", function() {
      var creator = this.createTestElement('infotrigger');

      creator.update.call(this.container.children[0], '12/7/37', 1);
      var actor = $(this.container.children[0].querySelectorAll('.actor')[0]);
      expect(actor).not.toBe(null);
      expect(actor.find('div.value').text()).toBe("1")
    });

    it('should trigger the infotrigger action', function() {
      spyOn(templateEngine.visu, 'write');
      var creator = this.createTestElement('infotrigger', {'change': 'absolute', 'upvalue': '1', 'downvalue': '-1'});

      var downActor = this.container.children[0].querySelectorAll('.actor')[1];
      var upActor = this.container.children[0].querySelectorAll('.actor')[2];
      expect(downActor).not.toBe(null);
      expect(upActor).not.toBe(null);

      //canceled call
      creator.action('id_0', upActor, true);
      expect(templateEngine.visu.write).not.toHaveBeenCalled();

      creator.action('id_0', upActor, false);
      expect(templateEngine.visu.write).toHaveBeenCalledWith('12/7/37', '81');

      creator.update.call(this.container.children[0], '12/7/37', 1);
      creator.action('id_0', upActor, false);
      expect(templateEngine.visu.write).toHaveBeenCalledWith('12/7/37', '82');
      creator.update.call(this.container.children[0], '12/7/37', 2);

      creator.action('id_0', downActor, false);
      expect(templateEngine.visu.write).toHaveBeenCalledWith('12/7/37', '81');

      // test lower border
      creator.update.call(this.container.children[0], '12/7/37', 0);
      creator.action('id_0', downActor, false);
      expect(templateEngine.visu.write).toHaveBeenCalledWith('12/7/37', '80');

      // test upper border
      creator.update.call(this.container.children[0], '12/7/37', 255);
      creator.action('id_0', upActor, false);
      expect(templateEngine.visu.write).toHaveBeenCalledWith('12/7/37', 'ff');
    });
  });
});