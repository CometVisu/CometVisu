/**
 * Unit tests for switch widget
 *
 * @author Tobias Bräutigam
 * @since 2016
 */

define( ['templateengine', '_common', 'cometvisu-mockup', 'widget_switch'], function(engine, design, ClientMockup) {

  describe("testing a switch", function() {
    var templateEngine = engine.getInstance();
    templateEngine.visu = new ClientMockup();

    it("should test the switch creator", function() {
      var creator = design.basicdesign.getCreator("switch");

      var xml = document.createElement('template');
      xml.innerHTML = '<switch><label>Test</label><address transform="DPT:1.001" mode="readwrite">12/7/37</address></switch>';
      xml = xml.firstChild;
      var switchString = creator.create(xml, 'id_0', 'potassium', 'switch');
      expect(switchString).toBe('<div class="widget clearfix switch  flavour_potassium" ><div class="label">Test</div><div class="actor switchUnpressed"><div class="value">-</div></div></div>');

      var data = templateEngine.widgetDataGet('id_0');
      expect(data.on_value).toBe(1);
      expect(data.off_value).toBe(0);
    });

    it("should test the switch creator with different on/off values", function() {
      var creator = design.basicdesign.getCreator("switch");

      var xml = document.createElement('template');
      xml.innerHTML = '<switch on_value="turn_on" off_value="turn_off"><label>Test</label><address transform="DPT:1.001" mode="readwrite">12/7/37</address></switch>';
      xml = xml.firstChild;
      var switchString = creator.create(xml, 'id_0', 'potassium', 'switch');
      expect(switchString).toBe('<div class="widget clearfix switch  flavour_potassium" ><div class="label">Test</div><div class="actor switchUnpressed"><div class="value">-</div></div></div>');

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

      expect(actor.hasClass('switchPressed')).toBeTruthy();
      expect(actor.hasClass('switchUnpressed')).toBeFalsy();

      creator.update.call(container.children[0],'12/7/37', 0);
      expect(actor.hasClass('switchPressed')).toBeFalsy();
      expect(actor.hasClass('switchUnpressed')).toBeTruthy();
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
      creator.action.call('id_0', actor, true);
      expect(templateEngine.visu.write).not.toHaveBeenCalled();

      creator.action('id_0', actor, false);
      expect(templateEngine.visu.write).toHaveBeenCalledWith('12/7/37', '81');

      creator.update.call(container.children[0],'12/7/37', 1);

      creator.action('id_0', actor, false);
      expect(templateEngine.visu.write).toHaveBeenCalledWith('12/7/37', '80');
    });
  });
});