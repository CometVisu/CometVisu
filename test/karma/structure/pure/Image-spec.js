/**
 * Unit tests for image widget
 *
 * @author Tobias Bräutigam
 * @since 2016
 */

define( ['jquery','TemplateEngine', '_common', 'widget_image'], function($, engine, design) {

  describe("testing a image widget", function() {
    var templateEngine = engine.getInstance();

    it("should test the image creator", function() {
      spyOn(templateEngine, "setupRefreshAction");

      var creator = design.basicdesign.getCreator("image");

      var xml = $.parseXML("<root/>");
      var image = xml.createElement('image');
      var label = xml.createElement('label');
      label.appendChild(xml.createTextNode("Test"));
      image.appendChild(label);
      xml.documentElement.appendChild(image);
      var widget = $(creator.create(xml.firstChild.firstChild, 'id_0', null, 'image'));

      expect(widget).toHaveClass('image');
      expect(widget.find("div.label").text()).toBe('Test');
      var data = templateEngine.widgetDataGet('id_0');
      expect(data.path).toBe("id_0");

      expect(widget.find("img").get(0).getAttribute("style")).toBe('');

      image.setAttribute("width", "50%");
      image.setAttribute("height", "51%");
      image.setAttribute("refresh", "5");
      widget = $(creator.create(xml.firstChild.firstChild, 'id_0', null, 'image'));

      templateEngine.postDOMSetupFns.forEach( function( thisFn ){
        thisFn();
      });
      expect(templateEngine.setupRefreshAction).toHaveBeenCalled();
      expect(widget.find("img").get(0).getAttribute("style")).toBe('width:50%;height:51%;');
      
      image.removeAttribute("width");
      image.removeAttribute("height");
      image.removeAttribute("refresh");
      image.setAttribute("widthfit", "true");
      widget = $(creator.create(xml.firstChild.firstChild, 'id_0', null, 'image'));
      expect(widget.find("img").get(0).getAttribute("style")).toBe('max-width:100%;');
    });
  });
});