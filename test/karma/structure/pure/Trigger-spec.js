/**
 * Unit tests for trigger widget
 *
 * @author Tobias Bräutigam
 * @since 2016
 */

define( ['jquery', 'TemplateEngine', '_common', 'CometVisuMockup', 'widget_switch'], function($, engine, design, ClientMockup) {

  describe("testing a trigger", function() {
    var templateEngine = engine.getInstance();
    templateEngine.visu = new ClientMockup();
    var creator = design.basicdesign.getCreator("trigger");
    var container;

    beforeEach(function() {

      var xml = document.createElement('template');
      xml.innerHTML = '<trigger value="1" shortvalue="0" shorttime="100" flavour="potassium"><label>Test</label><address transform="DPT:1.001" mode="readwrite">12/7/37</address></trigger>';
      xml = xml.firstChild;
      var triggerString = creator.create(xml, 'id_0', null, 'trigger');

      container = document.createElement('div');
      container.setAttribute("class","widget_container");
      container.setAttribute("id", 'id_0');
      container.innerHTML = triggerString;
      document.body.appendChild(container);

    });

    afterEach(function() {
      document.body.removeChild(container);
    });

    it("should test the switch creator", function() {

      var widget = $('#id_0 .widget');

      expect(widget).toHaveFlavour('potassium');

      var actor = widget.find(".actor");
      expect(actor).not.toBeNull();
      expect(actor).toHaveClass("switchUnpressed");
      expect(actor).not.toHaveClass("switchPressed");

      var value = actor.find(".value");
      expect(value).not.toBeNull();
      expect(value.text()).toBe("");

      templateEngine.postDOMSetupFns.forEach( function( thisFn ){
        thisFn();
      });

      expect(value.text()).toBe("1");
      
      var label = widget.find(".label");
      expect(label).not.toBeNull();
      expect(label.text()).toBe("Test");

      var data = templateEngine.widgetDataGet('id_0');
      expect(data.sendValue).toBe("1");
      expect(data.shortValue).toBe("0");
      expect(data.shorttime).toBe(100);

    });

    it('should trigger the trigger downaction', function() {
      spyOn(templateEngine.visu, 'write');

      var actor = container.children[0].querySelectorAll('.actor')[0];
      expect(actor).not.toBe(null);

      //downaction
      creator.downaction('id_0', actor);
      expect($(actor)).toHaveClass("switchPressed");
      expect($(actor)).not.toHaveClass("switchUnpressed");

      //canceled call
      creator.action('id_0', actor, true);
      expect(templateEngine.visu.write).not.toHaveBeenCalled();

      //simulate longpress
      templateEngine.handleMouseEvent.downtime = Date.now()-150;
      creator.action('id_0', actor, false);
      expect(templateEngine.visu.write).toHaveBeenCalledWith('12/7/37', '81');


      //simulate shortpress
      templateEngine.handleMouseEvent.downtime = Date.now()-50;
      creator.action('id_0', actor, false);
      expect(templateEngine.visu.write).toHaveBeenCalledWith('12/7/37', '80');
    });
  });
});