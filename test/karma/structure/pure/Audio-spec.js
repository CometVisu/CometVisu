/**
 * Unit tests for audio widget
 *
 * @author Tobias Bräutigam
 * @since 2016
 */

define( ['TemplateEngine', '_common', 'widget_audio'], function(engine, design) {

  describe("testing a audio widget", function() {
    var templateEngine = engine.getInstance();

    it("should test the audio creator", function() {

      var creator = design.basicdesign.getCreator("audio");

      var xml = document.createElement('template');
      xml.innerHTML = '<audio id="test"><label>Test</label></audio>';
      xml = xml.firstChild;
      var widget = $(creator.create(xml, 'id_0', null, 'audio'));

      expect(widget).toHaveClass('audio');
      expect(widget.find("div.label").text()).toBe('Test');

      var audio = widget.find("audio").get(0);

      expect(audio).not.toHaveAttribute("autoplay");
      expect(audio).not.toHaveAttribute("loop");
      expect(audio).not.toHaveAttribute("style");
      expect(audio).toHaveAttribute("controls");
      var data = templateEngine.widgetDataGet('id_0');
      expect(data.path).toBe("id_0");


      xml.innerHTML = '<audio id="test" width="50%" height="50%" autoplay="true" loop="true"><label>Test</label></audio>';
      xml = xml.firstChild;
      var widget = $(creator.create(xml, 'id_0', null, 'audio'));

      expect(widget).toHaveClass('audio');
      expect(widget.find("div.label").text()).toBe('Test');

      var audio = widget.find("audio").get(0);
      expect(audio).toHaveAttribute("autoplay");
      expect(audio).toHaveAttribute("loop");
      expect(audio).toHaveAttribute("controls");
      expect($(audio).attr('style')).toBe('width:50%;height:50%;');
      expect($(audio).attr('id')).toBe('test');

    });

    it("should update a audio item", function() {
      var creator = design.basicdesign.getCreator("audio");

      var xml = document.createElement('template');
      xml.innerHTML = '<audio id="test"><address transform="DPT:1.001" mode="readwrite">12/7/37</address></audio>';
      xml = xml.firstChild;
      var audioString = creator.create(xml, 'id_0', null, 'audio');
      var container =document.createElement('div');
      container.setAttribute("class","widget_container");
      container.setAttribute("id", 'id_0');
      container.innerHTML = audioString;
      document.body.appendChild(container);

      var actor = document.getElementById('test');
      actor.paused = true;
      actor.play = jasmine.createSpy('playspy');

      creator.update.call(container.children[0],'12/7/37', 0);
      expect(actor.play).not.toHaveBeenCalled();

      creator.update.call(container.children[0],'12/7/37', 1);
      expect(actor.play).toHaveBeenCalled();
      actor.play.calls.reset();

      actor.paused = false;
      creator.update.call(container.children[0],'12/7/37', 1);
      expect(actor.play).not.toHaveBeenCalled();

      document.body.removeChild(container);
    });
  });
});