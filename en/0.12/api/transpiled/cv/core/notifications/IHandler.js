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

  /* IHandler.js 
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
   * Interface for notification handlers.
   *
   * @author Tobias Bräutigam
   * @since 0.11.0
   */
  qx.Interface.define('cv.core.notifications.IHandler', {
    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      /**
       * Handle messages from {@link cv.core.notifications.Router}
       * @param message {Map}
       * @param config {Map?} optional configuration of this message for the handler
       */
      handleMessage: function handleMessage(message, config) {} // jshint ignore:line

    }
  });
  cv.core.notifications.IHandler.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IHandler.js.map?dt=1589396198165