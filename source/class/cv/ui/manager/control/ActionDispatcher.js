/**
 * The ActionDispatcher listens to the events in the 'cv.manager.action' topic and
 * dispatched those events to the currently relevant handler (e.g. the save event to the opened editor).
 */
qx.Class.define("cv.ui.manager.control.ActionDispatcher", {
  extend: qx.core.Object,
  type: "singleton",

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function () {
    this.base(arguments);
    qx.event.message.Bus.subscribe("cv.manager.action.*", this._onAction, this);
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    focusedWidget: {
      check: "cv.ui.manager.IActionHandler",
      nullable: true,
      apply: "_applyFocusedWidget"
    },

    main: {
      check: "cv.ui.manager.Main",
      nullable: true
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    updateBarButtons: function () {
      const actionHandler = this.getFocusedWidget();
      const menuBar = cv.ui.manager.MenuBar.getInstance();
      const config = menuBar.getButtonConfiguration();
      let button;
      Object.keys(config).forEach(function (actionId) {
        button = menuBar.getButton(actionId);
        if (button) {
          button.setEnabled(config[actionId].general || this.hasHandler(actionId));
          if (actionHandler) {
            actionHandler.configureButton(actionId, button);
          }
        }
      }, this);
    },

    _applyFocusedWidget: function (value, old) {
      if (old) {
        const menuBar = cv.ui.manager.MenuBar.getInstance();
        const config = menuBar.getButtonConfiguration();
        let button;
        Object.keys(config).forEach(function (actionId) {
          button = menuBar.getButton(actionId);
          if (button) {
            old.unConfigureButton(actionId, button);
          }
        }, this);
      }
      this.updateBarButtons();
    },

    /**
     * Check if there is an existing handler for the given actionName.
     * @param actionName
     * @return {Boolean}
     */
    hasHandler: function (actionName) {
      return !!this._getHandler(actionName);
    },

    _getHandler: function (actionName) {
      var handler = this.getFocusedWidget();
      var main = this.getMain();
      if (handler && handler.canHandleAction(actionName)) {
        return handler;
      } else if (main && main.canHandleAction(actionName)) {
        return main;
      }
    },

    _onAction: function (ev) {
      var topic = ev.getName();
      var actionName = topic.split(".").pop();
      var handler = this._getHandler(actionName);
      if (handler) {
        handler.handleAction(actionName, ev.getData());
      } else {
        this.warn("no action handler found for action: " + actionName);
      }
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    qx.event.message.Bus.subscribe("cv.manager.action.*", this._onAction, this);
  }
});
