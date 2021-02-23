(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Interface": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /**
   * All Widgets that need to handle actions from the managers action event, need to implement this interface.
   */
  qx.Interface.define('cv.ui.manager.IActionHandler', {
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      /**
       * Checks if the action handle can process the action.
       * @param actionName {String} action name
       */
      canHandleAction: function canHandleAction(actionName) {},

      /**
       * Executes the action handling.
       * @param actionName {String} action name
       * @param data {var} action payload
       */
      handleAction: function handleAction(actionName, data) {}
    }
  });
  cv.ui.manager.IActionHandler.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IActionHandler.js.map?dt=1614107119428