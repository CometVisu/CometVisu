/**
 * Unit tests for infotrigger widget
 *
 */
describe("testing a infotrigger widget", function() {

  it("should test the infotrigger creator", function() {

    var res = this.createTestWidgetString("infotrigger", {}, "<label>Test</label>")[1];
    var widget = qx.bom.Html.clean(res[1])[0];
    var obj = res[0];

    expect(widget).toHaveClass('infotrigger');
    expect(widget).toHaveLabel('Test-+');

    expect(obj.getPath()).toBe("id_0");

    // check infoposition
    var info = qx.bom.Selector.query(".actor.switchInvisible", obj.getDomElement())[0];
    expect(qx.dom.Hierarchy.getChildElements(obj.getDomElement()).indexOf(info)).toBe(0);
  });

  it("should test the infotrigger creator", function() {
    var widget = this.createTestWidgetString("infotrigger", {'align': 'right', 'infoposition': 'middle'})[1];
    widget = qx.bom.Html.clean([widget])[0];
    var actors = qx.bom.Selector.query("div.actor", widget);
    actors.forEach(function(actor) {
      expect(qx.bom.element.Style.get(actor, "text-align")).toBe("right");
    }, this);

    // check infoposition
    var info = qx.bom.Selector.query(".actor.switchInvisible", obj.getDomElement())[0];
    expect(qx.dom.Hierarchy.getChildElements(obj.getDomElement()).indexOf(info)).toBe(1);
  });

  it("should test the infotrigger creator", function() {

    var widget = this.createTestWidgetString("infotrigger", {'align': 'center', 'infoposition': 'right'})[1];
    widget = qx.bom.Html.clean([widget])[0];
    var actors = qx.bom.Selector.query("div.actor", widget);
    actors.forEach(function(actor) {
      expect(qx.bom.element.Style.get(actor, "text-align")).toBe("right");
    }, this);
    expect($(widget.find("div.actor")).css('text-align')).toBe('center');

    // check infoposition
    var info = qx.bom.Selector.query(".actor.switchInvisible", obj.getDomElement())[0];
    expect(qx.dom.Hierarchy.getChildElements(obj.getDomElement()).indexOf(info)).toBe(2);
  });

  it("should update an infotrigger widget", function() {
    var creator = this.createTestElement('infotrigger');

    creator.update('12/7/37', 1);
    var actor = creator.getActor();
    expect(actor).not.toBe(null);
    expect(actor).toHaveValue("1");
  });

  it('should trigger the infotrigger action', function() {

    var creator = this.createTestElement('infotrigger', {'change': 'absolute', 'upvalue': '1', 'downvalue': '-1'});
    spyOn(creator, "sendToBackend");

    var downActor = creator.getDownActor();
    var upActor = creator.getUpActor();
    expect(downActor).not.toBe(null);
    expect(upActor).not.toBe(null);

    cv.MessageBroker.getInstance().publish("setup.dom.finished");
    var Reg = qx.event.Registration;

    Reg.fireEvent(upActor, "tap", qx.event.type.Event, []);
    expect(creator.sendToBackend).toHaveBeenCalledWith('1');

    creator.update('12/7/37', 1);
    Reg.fireEvent(downActor, "tap", qx.event.type.Event, []);
    expect(tcreator.sendToBackend).toHaveBeenCalledWith('2');
    creator.update('12/7/37', 2);

    creator.action('id_0', downActor, false);
    expect(creator.sendToBackend).toHaveBeenCalledWith('1');

    // test lower border
    creator.update('12/7/37', 0);
    Reg.fireEvent(downActor, "tap", qx.event.type.Event, []);
    expect(creator.sendToBackend).toHaveBeenCalledWith('0');

    // test upper border
    creator.update('12/7/37', 255);
    Reg.fireEvent(upActor, "tap", qx.event.type.Event, []);
    expect(creator.sendToBackend).toHaveBeenCalledWith('255');
  });
});