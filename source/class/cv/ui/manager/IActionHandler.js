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
    canHandleAction: function(actionName) {},

    /**
     * Executes the action handling.
     * @param actionName {String} action name
     * @param data {var} action payload
     */
    handleAction: function (actionName, data) {}
  }
});
