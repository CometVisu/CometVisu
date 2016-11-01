/**
 * Unit tests for image widget
 *
 * @author Tobias Bräutigam
 * @since 2016
 */

define( ['widget_image'], function() {

  describe("testing a image widget", function() {

    it("should test the image creator", function() {

      var res = this.createTestWidgetString("image", {
        flavour: 'potassium'
      }, '<label>Test</label>');

      var widget = $(res[1]);

      expect(widget).toHaveClass('image');
      // expect(widget.find("div.label").text()).toBe('Test');
      expect(res[0].getPath()).toBe("id_0");
      expect(widget.find("img").get(0).getAttribute("style")).toBe('');
    });
    it("should test the image creator and refreshing", function() {
      spyOn(cv.utils.Timer, "start");
      var res = this.createTestElement("image", {
        width: '50%',
        height: '51%',
        refresh: 5
      });
      var widget = res.getDomElement();
      cv.MessageBroker.my.publish("setup.dom.finished");

      expect(cv.utils.Timer.start).toHaveBeenCalled();
      expect(widget.find("img").get(0).getAttribute("style")).toBe('width:50%;height:51%;');
    });

    it("should test the image creator width size", function() {

      var res = this.createTestElement("image", {
        widthfit: 'true'
      });
      var widget = res.getDomElement();
      expect(widget.find("img").get(0).getAttribute("style")).toBe('max-width:100%;');
    });
  });
});