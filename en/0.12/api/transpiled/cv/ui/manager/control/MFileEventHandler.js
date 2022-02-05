(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.event.message.Bus": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* MFileEventHandler.js 
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
   * Mixin for all classes that have to handle event on the 'cv.manager.file' topic.
   * Those classes need to implement the cv.ui.manager.control.IFileEventHandler interface.
   */
  qx.Mixin.define('cv.ui.manager.control.MFileEventHandler', {
    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct() {
      if (!this._disableFileEvents) {
        qx.event.message.Bus.subscribe('cv.manager.file', this._handleFileEvent, this);
      }
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _disableFileEvents: false
    },

    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      qx.event.message.Bus.unsubscribe('cv.manager.file', this._handleFileEvent, this);
    }
  });
  cv.ui.manager.control.MFileEventHandler.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MFileEventHandler.js.map?dt=1644052353901