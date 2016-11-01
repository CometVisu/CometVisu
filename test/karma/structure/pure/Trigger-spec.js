/**
 * Unit tests for trigger widget
 *
 * @author Tobias Bräutigam
 * @since 2016
 */

define( ['widget_switch'], function() {

  describe("testing a trigger", function() {
    // var templateEngine = engine.getInstance();
    // templateEngine.visu = new ClientMockup();
    // var creator = design.basicdesign.getCreator("trigger");
    // var container;
    //
    // beforeEach(function() {
    //
    //   var xml = document.createElement('template');
    //   xml.innerHTML = '<trigger value="1" shortvalue="0" shorttime="100" flavour="potassium"><label>Test</label><address transform="DPT:1.001" mode="readwrite">12/7/37</address></trigger>';
    //   xml = xml.firstChild;
    //   var triggerString = creator.create(xml, 'id_0', null, 'trigger');
    //
    //   container = document.createElement('div');
    //   container.setAttribute("class","widget_container");
    //   container.setAttribute("id", 'id_0');
    //   container.innerHTML = triggerString;
    //   document.body.appendChild(container);
    //
    // });
    //
    // afterEach(function() {
    //   document.body.removeChild(container);
    // });

    it("should test the trigger creator", function() {

      var res = this.createTestElement("trigger", {
        value:"1",
        shortvalue: "0",
        shorttime: "100",
        flavour: "potassium"
      }, '<label>Test</label>');

      var widget = $('#id_0 .widget');

      expect(widget).toHaveFlavour('potassium');

      var actor = widget.find(".actor");
      expect(actor).not.toBeNull();
      expect(actor).toHaveClass("switchUnpressed");
      expect(actor).not.toHaveClass("switchPressed");

      var value = actor.find(".value");
      expect(value).not.toBeNull();
      expect(value.text()).toBe("-");

      cv.MessageBroker.my.publish("setup.dom.finished");

      expect(value.text()).toBe("1");
      
      var label = widget.find(".label");
      expect(label).not.toBeNull();
      expect(label.text()).toBe("Test");

      expect(res.getSendValue()).toBe("1");
      expect(res.getShortValue()).toBe("0");
      expect(res.getShortTime()).toBe(100);

    });

    it('should trigger the trigger downaction', function() {
      spyOn(templateEngine.visu, 'write');

      var res = this.createTestElement("trigger", {
        value:"1",
        shortvalue: "0",
        shorttime: "100",
        flavour: "potassium"
      }, '<label>Test</label>');

      var actor = res.getActor();
      expect(actor).not.toBe(null);

      //downaction
      res.downaction('id_0', actor);
      expect($(actor)).toHaveClass("switchPressed");
      expect($(actor)).not.toHaveClass("switchUnpressed");

      //canceled call
      res.action('id_0', actor, true);
      expect(templateEngine.visu.write).not.toHaveBeenCalled();

      //simulate longpress
      templateEngine.handleMouseEvent.downtime = Date.now()-150;
      res.action('id_0', actor, false);
      expect(templateEngine.visu.write).toHaveBeenCalledWith('12/7/37', '81');


      //simulate shortpress
      templateEngine.handleMouseEvent.downtime = Date.now()-50;
      res.action('id_0', actor, false);
      expect(templateEngine.visu.write).toHaveBeenCalledWith('12/7/37', '80');
    });
  });
});