

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
    var callCounter = 0;
    qx.Class.define("cv.test.MessageHandler", {
      extend: qx.core.Object,
      implement: cv.core.notifications.IHandler,

      members: {
        handleMessage: function() {
          callCounter++;
        }
      }
    });

    var handler = new cv.test.MessageHandler();
    var spiedHandleMessage = spyOn(handler, "handleMessage").and.callThrough();

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

    // get target from message
    var spy = spyOn(cv.ui.PopupHandler, "handleMessage");
    router.dispatchMessage("test.message", {target: "popup"});
    expect(spy).toHaveBeenCalled();

    spiedHandleMessage.calls.reset();
    // test unknown topic
    router.dispatchMessage("unknown.message", {});
    expect(spiedHandleMessage).not.toHaveBeenCalled();

    // for some reason the spy does not count the number of calls right, so we use our own counter
    callCounter = 0;
    // dispatch with wildcard
    router.dispatchMessage("test.*", {});
    expect(spy).toHaveBeenCalled();
    expect(callCounter).toEqual(2);
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

    qx.Class.undefine("cv.test.MessageHandler");
    router.unregisterStateUpdatehandler(["0/0/1"]);
  });

  it("should test the target mapping", function() {
    expect(cv.core.notifications.Router.getTarget("popup")).toEqual(cv.ui.PopupHandler);
    expect(cv.core.notifications.Router.getTarget("notificationCenter")).toEqual(cv.ui.NotificationCenter.getInstance());

    // prevent speech target if no browser support
    var speechSynthesis = window.speechSynthesis;
    delete window.speechSynthesis;
    expect(cv.core.notifications.Router.getTarget("speech")).toBeUndefined();
    window.speechSynthesis = speechSynthesis;
    expect(cv.core.notifications.Router.getTarget("speech")).toEqual(cv.core.notifications.SpeechHandler.getInstance());

    expect(cv.core.notifications.Router.getTarget("unknown")).toBeNull();
  });
});