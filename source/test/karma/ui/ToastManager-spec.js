
describe('test the NotificationCenter', function () {

  var center = cv.ui.ToastManager.getInstance();

  beforeEach(function() {
    center._init();
  });

  afterEach(function() {
    center.clear(true);
  });

  it("should test some basics", function () {
    var severities = center.getSeverities();
    expect(severities.indexOf("low")).toBeGreaterThanOrEqual(0);
    expect(severities.indexOf("normal")).toBeGreaterThanOrEqual(0);
    expect(severities.indexOf("high")).toBeGreaterThanOrEqual(0);
    expect(severities.indexOf("urgent")).toBeGreaterThanOrEqual(0);
  });

  it('should handle messages', function() {

    var message = {
      topic: "cv.test",
      title: "Title",
      message: "Test message",
      severity: "normal",
      target: "toast"
    };

    center.handleMessage(qx.lang.Object.clone(message));
    expect(center.getMessages().getLength()).toBe(1);

    // add message with higher severity
    message.severity = "high";
    message.unique = true;

    var messageId = center.__idCounter-1;
    center.handleMessage(qx.lang.Object.clone(message));
    // as the message was unique it replaces the old one
    expect(center.getMessages().getLength()).toBe(1);

    var messageElement = qx.bom.Selector.query("#"+center.getMessageElementId()+messageId)[0];
    expect(qx.bom.element.Class.has(messageElement, "high")).toBeTruthy();

    // add message with higher severity
    message.severity = "urgent";
    message.unique = false;

    messageId = center.__idCounter;
    center.handleMessage(qx.lang.Object.clone(message));
    // as the message was unique it replaces the old one
    expect(center.getMessages().getLength()).toBe(2);

    messageElement = qx.bom.Selector.query("#"+center.getMessageElementId()+messageId)[0];
    expect(qx.bom.element.Class.has(messageElement, "urgent")).toBeTruthy();

    // remove unique messages
    message.condition = false;
    message.unique = true;

    center.handleMessage(qx.lang.Object.clone(message));
    center.handleMessage(qx.lang.Object.clone(message));
    // as we had 2 messages with same topic both should be gone now
    expect(center.getMessages().getLength()).toBe(0);

  });

  it("should test the maxEntries limit", function() {
    center.setMaxEntries(5);
    var message = {
      topic: "cv.test",
      title: "Title",
      message: "Test message",
      severity: "normal",
      target: "toast"
    };

    for(var i=0; i< 10; i++) {
      var msg = qx.lang.Object.clone(message);
      msg.title = i;
      center.handleMessage(msg);
    }

    expect(center.getMessages().getLength()).toBe(5);
    expect(center.getMessages().getItem(0).title).toBe(5);

    // delete a message by index
    center.deleteMessage(0);
    expect(center.getMessages().getLength()).toBe(4);
    expect(center.getMessages().getItem(0).title).toBe(6);

    // delete a message by index which is not deletable
    center.getMessages().getItem(0).deletable = false;
    center.deleteMessage(0);
    expect(center.getMessages().getLength()).toBe(4);
    expect(center.getMessages().getItem(0).title).toBe(6);
  });

  it("should perform a message action", function() {
    var spy = jasmine.createSpy();

    qx.Class.define("cv.test.ActionHandler", {
      extend: cv.core.notifications.actions.AbstractActionHandler,
      implement: cv.core.notifications.IActionHandler,

      members: {
        handleAction: function() {
          spy();
        },
        getDomElement: function() {
          return null;
        }
      }
    });
    cv.core.notifications.ActionRegistry.registerActionHandler("test", cv.test.ActionHandler);

    var message = {
      topic: "cv.test",
      title: "Title",
      message: "Test message",
      severity: "normal",
      actions: {
        test: [{
          needsConfirmation: false,
          deleteMessageAfterExecution: true
        }]
      },
      target: "toast"
    };
    center.handleMessage(message);
    center.performAction(center.getMessages().getLength()-1);
    expect(spy).toHaveBeenCalled();
    cv.core.notifications.ActionRegistry.unregisterActionHandler("test");

    // message should have been deleted by action execution
    expect(center.getMessages().getLength()).toEqual(0);

    qx.Class.undefine("cv.test.ActionHandler");
  });

  it("should test the interaction handling with list items", function() {
    if (window.PointerEvent) {
      // click on the message content
      var down = new PointerEvent("pointerdown", {
        bubbles: true,
        cancelable: true,
        view: window
      });
      var up = new PointerEvent("pointerup", {
        bubbles: true,
        cancelable: true,
        view: window
      });

      qx.Class.define("cv.test.ActionHandler", {
        extend: cv.core.notifications.actions.AbstractActionHandler,
        implement: cv.core.notifications.IActionHandler,

        members: {
          handleAction: function () {
          },
          getDomElement: function () {
            return null;
          }
        }
      });
      cv.core.notifications.ActionRegistry.registerActionHandler("test", cv.test.ActionHandler);

      spyOn(center, "deleteMessage");
      // test if message without action gets deleted
      var message = {
        topic: "cv.test",
        title: "Title",
        message: "Test message",
        severity: "normal",
        target: "toast"
      };
      var messageId = center.__idCounter;
      center.handleMessage(message);

      var element = qx.bom.Selector.query("#"+center.getMessageElementId()+messageId)[0];
      element.dispatchEvent(down);
      element.dispatchEvent(up);
      expect(center.deleteMessage).toHaveBeenCalledWith(messageId);

      message = {
        topic: "cv.test",
        title: "Title",
        message: "Test message",
        severity: "normal",
        actions: {
          test: [{
            needsConfirmation: false,
            deleteMessageAfterExecution: true
          }]
        },
        target: "toast"
      };

      center.handleMessage(message);

      element = qx.bom.Selector.query("#"+center.getMessageElementId()+messageId)[0];

      spyOn(center, "performAction");

      element.dispatchEvent(down);
      element.dispatchEvent(up);
      expect(center.performAction).toHaveBeenCalledWith(messageId, jasmine.any(qx.event.type.Event));

      center.deleteMessage(messageId);


    }
  });
});