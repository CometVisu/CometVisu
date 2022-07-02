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

  /* States.js 
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
   * This class holds all states that are maintained by the {@link cv.ui.layout.ResizeHandler}.
   * Other classes can use the instance of this class {@link cv.ui.layout.ResizeHandler.states} to listen to changes
   * to the states.
   */
  qx.Class.define('cv.ui.layout.States', {
    extend: qx.core.Object,

    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      pageSizeInvalid: {
        check: 'Boolean',
        init: true,
        event: 'changePageSizeInvalid'
      },
      backdropInvalid: {
        check: 'Boolean',
        init: true,
        event: 'changeBackdropInvalid'
      },
      navbarInvalid: {
        check: 'Boolean',
        init: true,
        event: 'changeNavbarInvalid'
      },
      rowspanInvalid: {
        check: 'Boolean',
        init: true,
        event: 'changeRowspanInvalid'
      }
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      resetAll: function resetAll() {
        ['pageSizeInvalid', 'backdropInvalid', 'navbarInvalid', 'rowspanInvalid'].forEach(this.reset, this);
      }
    }
  });
  cv.ui.layout.States.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=States.js.map?dt=1656748422093