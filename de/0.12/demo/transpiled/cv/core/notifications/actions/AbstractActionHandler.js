(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* AbstractActionHandler.js 
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
   * Opens a link in a new window.
   *
   * @author Tobias Bräutigam
   * @since 0.11.0
   */
  qx.Class.define("cv.core.notifications.actions.AbstractActionHandler", {
    extend: qx.core.Object,
    type: "abstract",

    /*
    ******************************************************
      PROPERTIES
    ******************************************************
    */
    properties: {
      needsConfirmation: {
        check: "Boolean",
        init: false
      },
      deleteMessageAfterExecution: {
        check: "Boolean",
        init: false
      },
      style: {
        check: "String",
        init: ""
      }
    },

    /*
    ***********************************************
      EVENTS
    ***********************************************
    */
    events: {
      close: 'qx.event.type.Event'
    }
  });
  cv.core.notifications.actions.AbstractActionHandler.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AbstractActionHandler.js.map?dt=1620146186432