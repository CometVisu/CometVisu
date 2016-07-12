/**
 * Unit tests for audio widget
 *
 * @author Tobias Bräutigam
 * @since 2016
 */

define( ['TemplateEngine', '_common', 'CometVisuMockup', 'plugin_ColorChooser'], function(engine, design, ClientMockup) {

  describe("testing a colorchooser plugin", function() {
    var templateEngine = engine.getInstance();
    templateEngine.visu = new ClientMockup();
    var creator = design.basicdesign.getCreator("colorchooser");

    it("should test the colorchooser creator", function() {
      var xml = document.createElement('template');
      xml.innerHTML = '<colorchooser><label>Test</label></colorchooser>';
      xml = xml.firstChild;
      var widget = $(creator.create(xml, 'id_0', null, 'colorchooser'));
    
      expect(widget).toHaveClass('colorChooser');
      expect(widget.find("div.label").text()).toBe('Test');
    
      var data = templateEngine.widgetDataGet('id_0');
      expect(data.path).toBe("id_0");
    });

    // test bug reported here:
    // https://knx-user-forum.de/forum/supportforen/cometvisu/963486-problem-milight-colorchooser-mit-oh-als-backend
    it("should test if the colorchooser gets initialized correctly", function() {
      spyOn(templateEngine.visu, 'write');
      

      var xml = document.createElement('template');
      xml.innerHTML = '<colorchooser><label>Test</label><address transform="OH:color" variant="rgb">Rgb_Test</address></colorchooser>';
      xml = xml.firstChild;
      var widgetString = creator.create(xml, 'id_0', null, 'colorchooser');

      var container =document.createElement('div');
      container.setAttribute("class","widget_container");
      container.setAttribute("id", 'id_0');
      container.innerHTML = widgetString;
      document.body.appendChild(container);

      templateEngine.postDOMSetupFns.forEach( function( thisFn ){
        thisFn();
      });

      // simulate the initial incoming data
      creator.update.call(container.children[0],'Rgb_Test', '246,0,20');
      expect(templateEngine.visu.write).not.toHaveBeenCalled();
      templateEngine.visu.write.calls.reset();
      document.body.removeChild(container);

      xml.innerHTML = '<colorchooser><label>Test</label><address transform="OH:color" variant="r">Rgb_Test</address></colorchooser>';
      xml = xml.firstChild;
      widgetString = creator.create(xml, 'id_0', null, 'colorchooser');

      container =document.createElement('div');
      container.setAttribute("class","widget_container");
      container.setAttribute("id", 'id_0');
      container.innerHTML = widgetString;
      document.body.appendChild(container);

      templateEngine.postDOMSetupFns.forEach( function( thisFn ){
        thisFn();
      });

      // simulate the initial incoming data
      creator.update.call(container.children[0],'Rgb_Test', '246');
      expect(templateEngine.visu.write).not.toHaveBeenCalled();

      document.body.removeChild(container);
    });
  });
});