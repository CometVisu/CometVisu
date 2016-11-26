/**
 * Unit tests for designtoggle widget
 *
 */
describe("testing a designtoggle widget", function() {

  it("should test the designtoggle creator", function() {
    var res = this.createTestWidgetString("designtoggle", {}, "<label>Test</label>");
    var widget = qx.bom.Html.clean([res[1]])[0];

    expect(widget).toHaveClass('toggle');
    expect(widget).toHaveLabel('Test');

    expect(res[0].getPath()).toBe("id_0");
  });

  it('should trigger the designtoggle action', function() {

    var spiedStore;
    var originalConstructor = qx.data.store.Json;
    spyOn(qx.data.store, 'Json').and.callFake(function(url) {
      spiedStore = new originalConstructor();
      return spiedStore;
    });

    var loc = window.location.href;
    var creator = this.createTestElement('designtoggle');
    spyOn(creator, 'setLocation');
    spiedStore.fireDataEvent("loaded", ['metal','pure']);
    var actor = creator.getActor();
    expect(actor).not.toBe(null);

    var Reg = qx.event.Registration;
    cv.MessageBroker.getInstance().publish("setup.dom.finished");

    Reg.fireEvent(actor, "tap", qx.event.type.Event, []);
    expect(creator.setLocation).toHaveBeenCalledWith(loc+"?design=metal");

    spyOn(creator,'getLocation').and.returnValue(loc+"?design=pure");
    Reg.fireEvent(actor, "tap", qx.event.type.Event, []);
    expect(creator.setLocation).toHaveBeenCalledWith(loc+"?design=metal");

    creator.getLocation.and.returnValue(loc+"?other=parameter");
    Reg.fireEvent(actor, "tap", qx.event.type.Event, []);
    expect(creator.setLocation).toHaveBeenCalledWith(loc+"?other=parameter&design=metal");
  });
});