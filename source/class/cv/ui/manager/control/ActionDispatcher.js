/* ActionDispatcher.js
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
  construct() {
    super();
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
      apply: '_applyFocusedWidget'
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
    updateBarButtons() {
      const actionHandler = this.getFocusedWidget();
      const menuBar = cv.ui.manager.MenuBar.getInstance();
      const config = menuBar.getButtonConfiguration();
      let button;
      Object.keys(config).forEach(function (actionId) {
        button = menuBar.getButton(actionId);
        if (button) {
          button.setEnabled(
            config[actionId].general || this.hasHandler(actionId)
          );

          if (actionHandler) {
            actionHandler.configureButton(actionId, button);
          }
        }
      }, this);
    },

    _applyFocusedWidget(value, old) {
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
    hasHandler(actionName) {
      return !!this._getHandler(actionName);
    },

    _getHandler(actionName) {
      const handler = this.getFocusedWidget();
      const main = this.getMain();
      if (handler && handler.canHandleAction(actionName)) {
        return handler;
      } else if (main && main.canHandleAction(actionName)) {
        return main;
      }
      return null;
    },

    _onAction(ev) {
      const topic = ev.getName();
      const actionName = topic.split('.').pop();
      const handler = this._getHandler(actionName);
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
  destruct() {
    qx.event.message.Bus.subscribe('cv.manager.action.*', this._onAction, this);
  }
});
