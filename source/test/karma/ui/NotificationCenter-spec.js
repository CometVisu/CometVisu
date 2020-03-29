
describe('test the NotificationCenter', function () {

  beforeEach(function(done) {
    // set animation time to 0
    cv.ui.NotificationCenter.SLIDE.duration = 0;
    cv.ui.NotificationCenter.BLINK.duration = 0;
    cv.ui.NotificationCenter.getInstance()._init();
    cv.ui.NotificationCenter.hide();
    setTimeout(done, 10);
  });

  afterEach(function() {
    cv.ui.NotificationCenter.clear(true);
    cv.ui.NotificationCenter.SLIDE.duration = 350;
    cv.ui.NotificationCenter.BLINK.duration = 1000;
  });

  it("should test some basics", function () {
    var center = cv.ui.NotificationCenter.getInstance();
    var severities = center.getSeverities();
    expect(severities.indexOf("low")).toBeGreaterThanOrEqual(0);
    expect(severities.indexOf("normal")).toBeGreaterThanOrEqual(0);
    expect(severities.indexOf("high")).toBeGreaterThanOrEqual(0);
    expect(severities.indexOf("urgent")).toBeGreaterThanOrEqual(0);
  });

  it('should toggle the visibility', function(done) {
    var center = cv.ui.NotificationCenter.getInstance();
    var element = document.querySelector("#notification-center");

    expect(element).not.toBeUndefined();

    expect(window.getComputedStyle(element)["transform"]).toEqual("none");
    center.show();
    setTimeout(function() {
      expect(window.getComputedStyle(element)["transform"]).toEqual("matrix(1, 0, 0, 1, -300, 0)");
      center.hide();
      setTimeout(function() {
        expect(window.getComputedStyle(element)["transform"]).toEqual("matrix(1, 0, 0, 1, 0, 0)");
        done();
      }, 10);
    }, 10);
  });

  it('should toggle the badge visibility', function(done) {
    var center = cv.ui.NotificationCenter.getInstance();
    var element = document.querySelector("#notification-center .badge");

    expect(element).not.toBeUndefined();

    expect(element.classList.contains("hidden")).toBeFalsy();
    center.disableBadge(true);
    setTimeout(function() {
      expect(element.classList.contains("hidden")).toBeTruthy();
      center.disableBadge(false);
      setTimeout(function() {
        expect(element.classList.contains("hidden")).toBeFalsy();
        done();
      }, 10);
    }, 10);
  });

  it('should handle messages', function() {
    var center = cv.ui.NotificationCenter.getInstance();
    var message = {
      topic: "cv.test",
      title: "Title",
      message: "Test message",
      severity: "normal"
    };
    var badge = document.querySelector("#notification-center .badge");
    expect(badge).not.toBeUndefined();

    center.handleMessage(Object.assign({}, message));
    expect(center.getMessages().getLength()).toBe(1);

    expect(badge.innerHTML).toEqual("1");
    expect(badge.classList.contains("normal")).toBeTruthy();

    // add message with higher severity
    message.severity = "high";
    message.unique = true;

    center.handleMessage(Object.assign({}, message));
    // as the message was unique it replaces the old one
    expect(center.getMessages().getLength()).toBe(1);

    expect(badge.innerHTML).toEqual("1");
    expect(badge.classList.contains("high")).toBeTruthy();

    // add message with higher severity
    message.severity = "urgent";
    message.unique = false;

    center.handleMessage(Object.assign({}, message));
    // as the message was unique it replaces the old one
    expect(center.getMessages().getLength()).toBe(2);

    expect(badge.innerHTML).toEqual("2");
    expect(badge.classList.contains("urgent")).toBeTruthy();

    // remove unique messages
    message.condition = false;
    message.unique = true;

    center.handleMessage(Object.assign({}, message));
    center.handleMessage(Object.assign({}, message));
    // as we had 2 messages with same topic both should be gone now
    expect(center.getMessages().getLength()).toBe(0);

    expect(badge.innerHTML).toBe('');
    expect(badge.classList.contains("urgent")).toBeFalsy();
  });

  it("should test the maxEntries limit", function() {
    var center = cv.ui.NotificationCenter.getInstance();
    center.setMaxEntries(5);
    var message = {
      topic: "cv.test",
      title: "Title",
      message: "Test message",
      severity: "normal"
    };

    for(var i=0; i< 10; i++) {
      var msg = Object.assign({}, message);
      msg.title = i;
      center.handleMessage(msg);
    }

    expect(center.getMessages().getLength()).toBe(5);
    expect(center.getMessages().getItem(0).title).toBe(5);

    // delete a message by index
    message = center.getMessages().getItem(0);
    expect(cv.ui.NotificationCenter.deleteMessage(message.id)).toBeTruthy();
    expect(center.getMessages().getLength()).toBe(4);
    expect(center.getMessages().getItem(0).title).toBe(6);

    // delete a message by index which is not deletable
    message = center.getMessages().getItem(0);
    message.deletable = false;
    expect(cv.ui.NotificationCenter.deleteMessage(message.id)).toBeFalsy();
    expect(center.getMessages().getLength()).toBe(4);
    expect(center.getMessages().getItem(0).title).toBe(6);
  });

  it("should perform a message action", function() {
    var center = cv.ui.NotificationCenter.getInstance();
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
      }
    };
    center.handleMessage(message);
    cv.ui.NotificationCenter.performAction(center.getMessages().getLength()-1);
    expect(spy).toHaveBeenCalled();
    cv.core.notifications.ActionRegistry.unregisterActionHandler("test");

    // message should have been deleted by action execution
    expect(center.getMessages().getLength()).toEqual(0);

    qx.Class.undefine("cv.test.ActionHandler");
  });

  it("should test the interaction handling with list items", function() {
    var center = cv.ui.NotificationCenter.getInstance();
    if (window.PointerEvent) {

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
        }
      };
      center.handleMessage(message);

      var messageElement = document.querySelector("#notification_0");
      spyOn(center, "deleteMessage");
      spyOn(center, "performAction");

      // click on the message content
      // qx.event.Registration.fireEvent(qx.bom.Selector.query(".content", messageElement)[0], "tap");
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
      var element = messageElement.querySelector(".content");
      element.dispatchEvent(down);
      element.dispatchEvent(up);
      expect(center.performAction).toHaveBeenCalledWith(0, jasmine.any(qx.event.type.Event));

      // click on the delete button
      element = messageElement.querySelector(".delete");
      element.dispatchEvent(down);
      element.dispatchEvent(up);
      expect(center.deleteMessage).toHaveBeenCalledWith(0, jasmine.any(qx.event.type.Event));
    }
  });
});