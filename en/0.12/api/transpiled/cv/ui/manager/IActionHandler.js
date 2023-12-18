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

  /* IActionHandler.js 
   * 
   * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
   * 
   * This program is free software; you can redistribute it and/or modify it
   * under the terms of the GNU General Public License as published by the Free
   * Software Foundation; either version 3 of the License, or (at your option)
   * any later version.
   *
   * This program is distributed in the hope that it will be useful, but WITHOUT
   * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
   * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
   * more details.
   *
   * You should have received a copy of the GNU General Public License along
   * with this program; if not, write to the Free Software Foundation, Inc.,
   * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
   */

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
      handleAction: function handleAction(actionName, data) {},

      /**
       * The ActionHandler can configure the menubutton itself, e.g. disable it, when that action is currently not possible
       * or change the button text / tooltip text etc.
       * @param actionId {String} ID of the action that button triggers
       * @param button {Widget} the button that should be configured
       */
      configureButton: function configureButton(actionId, button) {},

      /**
       * Undo all changes that have been applied to the button in configureButton
       * @param actionId {String} ID of the action that button triggers
       * @param button {Widget}
       */
      unConfigureButton: function unConfigureButton(actionId, button) {}
    }
  });
  cv.ui.manager.IActionHandler.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IActionHandler.js.map?dt=1702898791309