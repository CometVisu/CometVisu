

describe('test the notification router', function () {
  var router = null;

  beforeEach(function() {
    router = cv.core.notifications.Router.getInstance();
  });

  afterEach(function() {
    router.clear();
  });

  it("should evaluate a message condition", function() {

    // no condition means true
    expect(cv.core.notifications.Router.evaluateCondition({})).toBeTruthy();

    expect(cv.core.notifications.Router.evaluateCondition({condition: true})).toBeTruthy();
    expect(cv.core.notifications.Router.evaluateCondition({condition: false})).toBeFalsy();

    expect(cv.core.notifications.Router.evaluateCondition({condition: function() { return true; }})).toBeTruthy();
    expect(cv.core.notifications.Router.evaluateCondition({condition: function() { return false; }})).toBeFalsy();

    expect(cv.core.notifications.Router.evaluateCondition({condition: "unknown-condition"})).toBeUndefined();
  });

  it("should test the static message dispatching", function() {
    var spied = spyOn(router, "dispatchMessage");
    expect(spied).not.toHaveBeenCalled();
    cv.core.notifications.Router.dispatchMessage("test.unknown", {});
    expect(spied).toHaveBeenCalled();
  });

  it("should test the routing", function() {
    qx.Class.define("cv.test.MessageHandler", {
      extend: qx.core.Object,
      implement: cv.core.notifications.IHandler,

      members: {
        handleMessage: function() {}
      }
    });

    var handler = new cv.test.MessageHandler();
    var spiedHandleMessage = spyOn(handler, "handleMessage");

    router.registerMessageHandler(handler, {
      "test.message": {},
      "test.wildcard.*": {}
    });

    expect(spiedHandleMessage).not.toHaveBeenCalled();

    router.dispatchMessage("test.unknown", {});
    expect(spiedHandleMessage).not.toHaveBeenCalled();

    router.dispatchMessage("test.message.other", {});
    expect(spiedHandleMessage).not.toHaveBeenCalled();

    router.dispatchMessage("test.message", {});
    expect(spiedHandleMessage).toHaveBeenCalled();

    // test the wildcard
    spiedHandleMessage.calls.reset();
    expect(spiedHandleMessage).not.toHaveBeenCalled();

    router.dispatchMessage("test.wildcard.anything.thats.possible", {});
    expect(spiedHandleMessage).toHaveBeenCalled();
  });

  it("should test the state notification handling", function() {
    var config = {
      "0/0/1": [{
        topic: "cv.state.0/0/1",
        target: cv.ui.PopupHandler,
        severity: "normal",
        skipInitial: true,
        deletable: true,
        unique: true,
        valueMapping: "mapping-name",
        addressMapping: "mapping-name",
        titleTemplate: "Kitchen light on",
        messageTemplate: "turned on at {{ time }} o'clock",
        condition: 1,
        addressConfig: ["raw"]
      }]
    };
    router.registerStateUpdateHandler(config);

    var model = cv.data.Model.getInstance();
    model.onUpdate("0/0/1", 1);

    var popup = qx.bom.Selector.query("#popup_0")[0];

    // initial state should trigger no popup
    expect(popup).toBeUndefined();

    model.onUpdate("0/0/1", 0);
    popup = qx.bom.Selector.query("#popup_0")[0];
    // still no popup cause value is 0
    expect(popup).toBeUndefined();

    model.onUpdate("0/0/1", 1);
    popup = qx.bom.Selector.query("#popup_0")[0];
    expect(popup).not.toBeUndefined();

    model.onUpdate("0/0/1", 0);
    popup = qx.bom.Selector.query("#popup_0")[0];
    // as the condition isn't met anymore the popup must be gone
    expect(popup).toBeUndefined();
  });
});