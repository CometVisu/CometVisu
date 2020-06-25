

describe("testing the Link action", function() {

  it("should create a button DOM element and open an url on click", function() {
    var action = new cv.core.notifications.actions.Link({
      title: "Title",
      url: "http://localhost/test",
      needsConfirmation: false
    });

    var actionButton = action.getDomElement();
    expect(actionButton.innerText).toBe("Title");
    expect(actionButton).toHaveClass("action");

    spyOn(cv.util.Location, "open");
    var event = new qx.event.type.Event();
    event.init(true, true);
    event.setType("tap");

    qx.event.Registration.dispatchEvent(actionButton, event);
    expect(cv.util.Location.open).toHaveBeenCalledWith("http://localhost/test", "_blank");
  });

  it("should transform string values of action property to functions", function() {
    var action = new cv.core.notifications.actions.Link({
      title: "Title",
      action: "reload",
      needsConfirmation: false
    });
    expect(typeof action.getAction() === 'function').toBeTruthy();

    action = new cv.core.notifications.actions.Link({
      title: "Title",
      action: "unknown",
      needsConfirmation: false
    });
    expect(action.getAction()).toBeNull();

    action = new cv.core.notifications.actions.Link({
      title: "Title",
      action: function() {},
      needsConfirmation: false
    });
    expect(typeof action.getAction() === 'function').toBeTruthy();
  });

  it("should execute the actions", function() {
    spyOn(cv.util.Location, "reload");
    var action = new cv.core.notifications.actions.Link({
      title: "Title",
      action: "reload",
      needsConfirmation: false
    });
    action.handleAction();
    expect(cv.util.Location.reload).toHaveBeenCalled();

    spyOn(cv.util.Location, "open");
    action = new cv.core.notifications.actions.Link({
      title: "Title",
      url: "/test",
      hidden: false,
      needsConfirmation: false
    });
    action.handleAction();
    expect(cv.util.Location.open).toHaveBeenCalled();

    var Con = qx.io.request.Xhr;
    var spiedXhr;
    spyOn(qx.io.request, 'Xhr').and.callFake(function(url) {
      var obj = new Con(url);
      spiedXhr = spyOn(obj, "send");
      return obj;
    });

    // open url in background
    action = new cv.core.notifications.actions.Link({
      title: "Title",
      url: "/test",
      hidden: true,
      needsConfirmation: false
    });
    action.handleAction();
    expect(spiedXhr).toHaveBeenCalled();
  });
});