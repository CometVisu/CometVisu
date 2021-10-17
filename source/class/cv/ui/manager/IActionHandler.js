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
    handleAction: function (actionName, data) {},

    /**
     * The ActionHandler can configure the menubutton itself, e.g. disable it, when that action is currently not possible
     * or change the button text / tooltip text etc.
     * @param actionId {String} ID of the action that button triggers
     * @param button {Widget} the button that should be configured
     */
    configureButton: function (actionId, button) {},

    /**
     * Undo all changes that have been applied to the button in configureButton
     * @param actionId {String} ID of the action that button triggers
     * @param button {Widget}
     */
    unConfigureButton: function (actionId, button) {}
  }
});
