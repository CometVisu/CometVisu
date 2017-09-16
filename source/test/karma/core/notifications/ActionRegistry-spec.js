

describe('test the ActionRegistry', function () {

  it("should register an action handler", function() {
    var actionHandler = function() {
      this.getDomElement = function() {
        return "test";
      };
    };

    cv.core.notifications.ActionRegistry.registerActionHandler("test", actionHandler);
    expect(cv.core.notifications.ActionRegistry.createActionElement("unknown")).toBeNull();
    expect(cv.core.notifications.ActionRegistry.createActionElement("test"), {}).toEqual("test");
    cv.core.notifications.ActionRegistry.unregisterActionHandler("test");
  });
});