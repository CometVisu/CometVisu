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

  /* Message.js 
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
   * Model for Messages shown in Snackbar/Dialog (usually error, warnings or info messages).
   */
  qx.Class.define('cv.ui.manager.model.Message', {
    extend: qx.core.Object,

    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      title: {
        check: 'String',
        init: '',
        event: 'changeTitle'
      },
      content: {
        check: 'String',
        init: '',
        event: 'changeContent'
      },
      type: {
        check: ['alert', 'hint', 'warning', 'error'],
        nullable: true,
        event: 'changeType'
      },
      sticky: {
        check: 'Boolean',
        init: false,
        event: 'changeSticky'
      }
    }
  });
  cv.ui.manager.model.Message.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Message.js.map?dt=1656748385323