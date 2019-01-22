/* ActionRegistry.js 
 * 
 * copyright (c) 2010-2017, Christian Mayer and the CometVisu contributers.
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
 * Global notification handler that routes messages topic-dependent to different {@link cv.core.notifications.IHandler}
 * (e.g. NotificationCenter, Dialog, Toast, console.log, native notification, internal message bus ...)
 *
 * @author Tobias Bräutigam
 * @since 0.11.0
 */
qx.Class.define("cv.core.notifications.ActionRegistry", {
  type: "static",

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    __handlers: {},

    /**
     * Register an action handler for an action type.
     *
     * Note: There can only be one action handler per type. If there is currently
     *       another handler registered for this type it will be replaced.
     *
     * @param type {String} action type
     * @param handler {cv.core.notifications.IActionHandler}
     */
    registerActionHandler: function(type, handler) {
      if (this.__handlers[type]) {
        qx.log.Logger.warn(this, "there is already an action handler registered for '"+type+"' action. replacing now");
      }
      this.__handlers[type] = handler;
    },

    /**
     * Unregister an action handler for an action type.
     *
     * @param type {String} action type
     */
    unregisterActionHandler: function(type) {
      if (this.__handlers[type]) {
        delete this.__handlers[type];
      }
    },

    /**
     * Get an instance of the registered action handler for the requested action type.
     * @param type {String} action type
     * @param config {Map?} additional parameters that should be passed to the action handlers constructor
     * @return {cv.core.notifications.IActionHandler|null}
     */
    getActionHandler: function(type, config) {
      if (this.__handlers[type]) {
        return new (this.__handlers[type])(config);
      } else {
        return null;
      }
    },

    /**
     * Creates an action element for the given action type. Unsually this is a button or a similar DOMElement
     * with a listener attached.
     *
     * @param type {String} action type
     * @param config {Map} additional parameters that should be passed to the action handlers constructor
     * @return {Element|null}
     */
    createActionElement: function(type, config) {
      if (!this.__handlers[type]) {
        qx.log.Logger.error(this, "no action handler registered for '%1' action type", type);
        return null;
      } else {
        var actionHandler = new (this.__handlers[type])(config);
        return actionHandler.getDomElement();
      }
    }
  }
});
