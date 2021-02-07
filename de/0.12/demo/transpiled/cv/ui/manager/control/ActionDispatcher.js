(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.event.message.Bus": {
        "construct": true
      },
      "cv.ui.manager.MenuBar": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /**
   * The ActionDispatcher listens to the events in the 'cv.manager.action' topic and
   * dispatched those events to the currently relevant handler (e.g. the save event to the opened editor).
   */
  qx.Class.define('cv.ui.manager.control.ActionDispatcher', {
    extend: qx.core.Object,
    type: 'singleton',

    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      qx.event.message.Bus.subscribe('cv.manager.action.*', this._onAction, this);
    },

    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      focusedWidget: {
        check: 'cv.ui.manager.IActionHandler',
        nullable: true,
        apply: 'updateBarButtons'
      },
      main: {
        check: 'cv.ui.manager.Main',
        nullable: true
      }
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      updateBarButtons: function updateBarButtons() {
        var menuBar = cv.ui.manager.MenuBar.getInstance();
        var config = menuBar.getButtonConfiguration();
        var button;
        Object.keys(config).forEach(function (actionId) {
          button = menuBar.getButton(actionId);

          if (button) {
            button.setEnabled(config[actionId].general || this.hasHandler(actionId));
          }
        }, this);
      },

      /**
       * Check if there is an existing handler for the given actionName.
       * @return {Boolean}
       */
      hasHandler: function hasHandler(actionName) {
        return !!this._getHandler(actionName);
      },
      _getHandler: function _getHandler(actionName) {
        var handler = this.getFocusedWidget();
        var main = this.getMain();

        if (handler && handler.canHandleAction(actionName)) {
          return handler;
        } else if (main && main.canHandleAction(actionName)) {
          return main;
        }
      },
      _onAction: function _onAction(ev) {
        var topic = ev.getName();
        var actionName = topic.split('.').pop();

        var handler = this._getHandler(actionName);

        if (handler) {
          handler.handleAction(actionName, ev.getData());
        } else {
          this.warn('no action handler found for action: ' + actionName);
        }
      }
    },

    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      qx.event.message.Bus.subscribe('cv.manager.action.*', this._onAction, this);
    }
  });
  cv.ui.manager.control.ActionDispatcher.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ActionDispatcher.js.map?dt=1612691001294