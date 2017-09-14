

describe("testing the Link action", function() {

  it("should create a button DOM element and open an url on click", function() {
    var action = new cv.core.notifications.actions.Link({
      title: "Title",
      url: "http://localhost/test",
      needsConfirmation: false
    });

    var actionButton = action.getDomElement();
    expect(qx.bom.element.Attribute.get(actionButton, "text")).toBe("Title");
    expect(actionButton).toHaveClass("action");

    var spy = spyOn(window, "open");
    var event = new qx.event.type.Event();
    event.init(true, true);
    event.setType("tap");

    qx.event.Registration.dispatchEvent(actionButton, event);
    expect(spy).toHaveBeenCalledWith("http://localhost/test", "_blank");
  });
});