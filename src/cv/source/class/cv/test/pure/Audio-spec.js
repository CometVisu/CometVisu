/**
 * Unit tests for audio widget
 *
 * @author Tobias Bräutigam
 * @since 2016
 */

define( ['widget_audio'], function() {

  describe("testing a audio widget", function() {


    it("should test the audio creator", function() {

      var res = this.createTestWidgetString("audio", {id: 'test'}, '<label>Test</label>');
      var widget = res[1];
      var widgetInstance = res[0];

      expect(widget).toHaveClass('audio');
      expect(qx.bom.Selector.query("div.label", widget)[0].textContent).toBe('Test');

      var audio = widget.find("audio").get(0);

      expect(audio).not.toHaveAttribute("autoplay");
      expect(audio).not.toHaveAttribute("loop");
      expect(audio).not.toHaveAttribute("style");
      expect(audio).toHaveAttribute("controls");

      expect(widgetInstance.getPath()).toBe("id_0");

    });

    it("should test the audio creator with more attributes", function() {
      var res = this.createTestWidgetString("audio", {
        id: 'test',
        width: '50%',
        height: '50%',
        autoplay: 'true',
        loop: 'true'
      }, '<label>Test</label>');
      var widget = res[1];
      var widgetInstance = res[0];

      expect(widget).toHaveClass('audio');
      expect(qx.bom.Selector.query("div.label", widget)[0].textNode).toBe('Test');

      var audio = widget.find("audio").get(0);
      expect(audio).toHaveAttribute("autoplay");
      expect(audio).toHaveAttribute("loop");
      expect(audio).toHaveAttribute("controls");
      expect(qx.bom.element.Attribute.get(audio, 'style')).toBe('width:50%;height:50%;');
      expect(qx.bom.element.Attribute.get(audio, 'id')).toBe('test');

    });

    it("should update a audio item", function() {
      var widgetInstance = this.createTestElement("audio", {id: 'test'});

      var actor = document.getElementById('test');

      actor.paused = true;
      actor.play = jasmine.createSpy('playspy');

      widgetInstance.update('12/7/37', 0);
      expect(actor.play).not.toHaveBeenCalled();

      widgetInstance.update('12/7/37', 1);
      expect(actor.play).toHaveBeenCalled();
      actor.play.calls.reset();

      actor.paused = false;
      widgetInstance.update('12/7/37', 1);
      expect(actor.play).not.toHaveBeenCalled();
    });
  });
});