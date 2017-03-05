/**
 * Unit tests for switch widget
 *
 * @author Tobias Bräutigam
 * @since 2016
 */

define( ['TemplateEngine', '_common', 'CometVisuMockup', 'widget_switch'], function(engine, design, ClientMockup) {

  describe("testing a switch", function() {

    var templateEngine = engine.getInstance();
    templateEngine.visu = new ClientMockup();

    it("should test the switch creator", function() {
      var creator = design.basicdesign.getCreator("switch");

      var xml = document.createElement('template');
      xml.innerHTML = '<switch><label>Test</label><address transform="DPT:1.001" mode="readwrite">12/7/37</address></switch>';
      xml = xml.firstChild;
      var switchWidget = $(creator.create(xml, 'id_0', 'potassium', 'switch'));

      expect(switchWidget).toHaveFlavour('potassium');
      var actor = switchWidget.find(".actor");
      expect(actor).not.toBeNull();
      expect(actor).toHaveClass("switchUnpressed");
      expect(actor).not.toHaveClass("switchPressed");

      var value = actor.find(".value");
      expect(value).not.toBeNull();
      expect(value.text()).toBe("-");
      
      var label = switchWidget.find(".label");
      expect(label).not.toBeNull();
      expect(label.text()).toBe("Test");

      var data = templateEngine.widgetDataGet('id_0');
      expect(data.on_value).toBe(1);
      expect(data.off_value).toBe(0);
    });

    it("should test the switch creator with different on/off values", function() {
      var creator = design.basicdesign.getCreator("switch");

      var xml = document.createElement('template');
      xml.innerHTML = '<switch on_value="turn_on" off_value="turn_off"><label>Test</label><address transform="DPT:1.001" mode="readwrite">12/7/37</address></switch>';
      xml = xml.firstChild;
      creator.create(xml, 'id_0', 'potassium', 'switch');

      var data = templateEngine.widgetDataGet('id_0');
      expect(data.on_value).toBe('turn_on');
      expect(data.off_value).toBe('turn_off');
    });

    it("should update a switch", function() {
      var creator = design.basicdesign.getCreator("switch");

      var xml = document.createElement('template');
      xml.innerHTML = '<switch><label>Test</label><address transform="DPT:1.001" mode="readwrite">12/7/37</address></switch>';
      xml = xml.firstChild;
      var switchString = creator.create(xml, 'id_0', null, 'switch');
      var container =document.createElement('div');
      container.setAttribute("class","widget_container");
      container.setAttribute("id", 'id_0');
      container.innerHTML = switchString;
      document.body.appendChild(container);

      creator.update.call(container.children[0],'12/7/37', 1);
      var actor = $(container.children[0].querySelectorAll('.actor')[0]);
      expect(actor).not.toBe(null);

      expect(actor).toHaveClass("switchPressed");
      expect(actor).not.toHaveClass("switchUnpressed");

      creator.update.call(container.children[0],'12/7/37', 0);
      expect(actor).toHaveClass("switchUnpressed");
      expect(actor).not.toHaveClass("switchPressed");

      document.body.removeChild(container);
    });

    it('should trigger the switch action', function() {
      spyOn(templateEngine.visu, 'write');

      var creator = design.basicdesign.getCreator("switch");

      var xml = document.createElement('template');
      xml.innerHTML = '<switch><label>Test</label><address transform="DPT:1.001" mode="readwrite">12/7/37</address></switch>';
      xml = xml.firstChild;
      var switchString = creator.create(xml, 'id_0', null, 'switch');
      var container =document.createElement('div');
      container.setAttribute("class","widget_container");
      container.setAttribute("id", 'id_0');
      container.innerHTML = switchString;
      document.body.appendChild(container);
      var actor = container.children[0].querySelectorAll('.actor')[0];
      expect(actor).not.toBe(null);

      //canceled call
      creator.action('id_0', actor, true);
      expect(templateEngine.visu.write).not.toHaveBeenCalled();

      creator.update.call(container.children[0],'12/7/37', 0);

      creator.action('id_0', actor, false);
      expect(templateEngine.visu.write).toHaveBeenCalledWith('12/7/37', '81');

      creator.update.call(container.children[0],'12/7/37', 1);

      creator.action('id_0', actor, false);
      expect(templateEngine.visu.write).toHaveBeenCalledWith('12/7/37', '80');
      
      document.body.removeChild(container);
    });
  });
});