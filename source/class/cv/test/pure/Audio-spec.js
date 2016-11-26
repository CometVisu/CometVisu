/**
 * Unit tests for audio widget
 *
 * @author Tobias Bräutigam
 * @since 2016
 */
describe("testing a audio widget", function() {

  it("should test the audio creator", function() {

    var res = this.createTestWidgetString("audio", {id: 'test'}, '<label>Test</label>');
    var widget = qx.bom.Html.clean([res[1]])[0];
    var widgetInstance = res[0];

    expect(widget).toHaveClass('audio');
    expect(widget).toHaveLabel('Test');

    var audio = qx.bom.Selector.query("audio", widget)[0];

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
    var widget = qx.bom.Html.clean([res[1]])[0];

    expect(widget).toHaveClass('audio');
    expect(widget).toHaveLabel('Test');

    var audio = qx.bom.Selector.query("audio", widget)[0];
    expect(audio).toHaveAttribute("autoplay");
    expect(audio).toHaveAttribute("loop");
    expect(audio).toHaveAttribute("controls");
    expect(qx.bom.element.Attribute.get(audio, 'style')).toBe('width:50%;height:50%;');
    expect(qx.bom.element.Attribute.get(audio, 'id')).toBe('test');

  });

  it("should update a audio item", function() {
    var widgetInstance = this.createTestElement("audio", {id: 'test'});

    var actor = widgetInstance.getActor();
    spyOn(actor, "play");

    spyOn(widgetInstance, "getActor").and.callFake(function() {
      return actor;
    });

    widgetInstance.update('12/7/37', 0);
    expect(actor.play).not.toHaveBeenCalled();

    widgetInstance.update('12/7/37', 1);
    expect(actor.play).toHaveBeenCalled();
  });
});