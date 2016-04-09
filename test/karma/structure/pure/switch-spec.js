/**
 * Unit tests for switch widget
 *
 * @author Tobias Bräutigam
 * @since 2016
 */

define( ['templateengine', '_common', 'widget_switch'], function(engine, design) {
  
  describe("testing a switch", function() {
    var templateEngine = engine.getInstance();
    
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
  });
});