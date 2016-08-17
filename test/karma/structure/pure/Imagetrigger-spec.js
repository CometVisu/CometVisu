/**
 * Unit tests for imagetrigger widget
 *
 */

define( ['TemplateEngine', '_common', 'widget_imagetrigger'], function(engine, design) {

  describe("testing a imagetrigger widget", function() {
    var templateEngine = engine.getInstance();

    it("should test the imagetrigger creator", function() {

      var creator = design.basicdesign.getCreator("imagetrigger");

      var xml = document.createElement('template');
      xml.innerHTML = '<imagetrigger><label>Test</label></imagetrigger>';
      xml = xml.firstChild;
      var widget = $(creator.create(xml, 'id_0', null, 'imagetrigger'));
    
      expect(widget).toHaveClass('imagetrigger');
      expect(widget).toHaveClass('image');
      expect(widget.find("div.label").text()).toBe('Test');

      var data = templateEngine.widgetDataGet('id_0');
      expect(data.path).toBe("id_0");

      spyOn(templateEngine, "setupRefreshAction");
      xml.innerHTML = '<imagetrigger flavour="potassium" sendValue="on" refresh="5" type="show"><label>Test</label></imagetrigger>';
      xml = xml.firstChild;
      widget = $(creator.create(xml, 'id_0', null, 'imagetrigger'));
      templateEngine.postDOMSetupFns.forEach( function( thisFn ){
        thisFn();
      });
      expect(templateEngine.setupRefreshAction).toHaveBeenCalled();
      expect(widget).toHaveClass('flavour_potassium');
      data = templateEngine.widgetDataGet('id_0');
      expect(data.sendValue).toBe("on");
    });

    it("should update a imagetrigger", function() {
      var creator = design.basicdesign.getCreator("imagetrigger");

      var xml = document.createElement('template');
      xml.innerHTML = '<imagetrigger src="imgs" suffix="jpg" type="show"><label>Test</label><address transform="DPT:1.001" mode="readwrite">12/7/37</address></imagetrigger>';
      xml = xml.firstChild;
      var widgetString = creator.create(xml, 'id_0', null, 'imagetrigger');
      var container =document.createElement('div');
      container.setAttribute("class","widget_container");
      container.setAttribute("id", 'id_0');
      container.innerHTML = widgetString;
      document.body.appendChild(container);

      creator.update.call(container.children[0],'12/7/37', 1);
      var actor = $(container.children[0].querySelectorAll('.actor img')[0]);
      expect(actor).toBeVisible();
      expect(actor.attr('src')).toBe('imgs.jpg');

      creator.update.call(container.children[0],'12/7/37', 0);
      expect(actor).not.toBeVisible();

      document.body.removeChild(container);

      xml.innerHTML = '<imagetrigger src="imgs" suffix="jpg" type="select"><label>Test</label><address transform="DPT:1.001" mode="readwrite">12/7/37</address></imagetrigger>';
      xml = xml.firstChild;
      var widgetString = creator.create(xml, 'id_0', null, 'imagetrigger');
      var container =document.createElement('div');
      container.setAttribute("class","widget_container");
      container.setAttribute("id", 'id_0');
      container.innerHTML = widgetString;
      document.body.appendChild(container);

      creator.update.call(container.children[0],'12/7/37', 1);
      var actor = $(container.children[0].querySelectorAll('.actor img')[0]);
      expect(actor).toBeVisible();
      expect(actor.attr('src')).toBe('imgs1.jpg');

      creator.update.call(container.children[0],'12/7/37', 0);
      expect(actor).not.toBeVisible();

      document.body.removeChild(container);
    });

    it('should trigger the imagetrigger action', function() {
      spyOn(templateEngine.visu, 'write');

      var creator = design.basicdesign.getCreator("imagetrigger");

      var xml = document.createElement('template');
      xml.innerHTML = '<imagetrigger src="imgs" suffix="jpg" type="show" sendValue="1"><label>Test</label><address transform="DPT:1.001" mode="readwrite">12/7/37</address></imagetrigger>';
      xml = xml.firstChild;
      var widgetString = creator.create(xml, 'id_0', null, 'imagetrigger');
      var container =document.createElement('div');
      container.setAttribute("class","widget_container");
      container.setAttribute("id", 'id_0');
      container.innerHTML = widgetString;
      document.body.appendChild(container);
      var actor = container.children[0].querySelectorAll('.actor')[0];
      expect(actor).not.toBe(null);

      //canceled call
      creator.action('id_0', actor, true);
      expect(templateEngine.visu.write).not.toHaveBeenCalled();

      // no write flag
      data = templateEngine.widgetDataGet('id_0');
      data.address['12/7/37'][1] = 1;

      creator.action('id_0', actor, false);
      expect(templateEngine.visu.write).not.toHaveBeenCalled();

      data.address['12/7/37'][1] = 3;
      data.sendValue = "";
      creator.action('id_0', actor, false);
      expect(templateEngine.visu.write).not.toHaveBeenCalled();
      data.sendValue = "1";

      creator.action('id_0', actor, false);
      expect(templateEngine.visu.write).toHaveBeenCalledWith('12/7/37', '81');

      document.body.removeChild(container);
    });
  });
});