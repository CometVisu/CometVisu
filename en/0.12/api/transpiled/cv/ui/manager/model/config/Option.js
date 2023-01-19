(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Option.js 
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
   * Simple config entry.
   */
  qx.Class.define('cv.ui.manager.model.config.Option', {
    extend: qx.core.Object,

    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct(key, value) {
      qx.core.Object.constructor.call(this);
      this.setKey(key);
      this.setValue(value);
    },

    /*
    ***********************************************
      EVENTS
    ***********************************************
    */
    events: {
      // sent whenever the options key or value has been changed
      'change': 'qx.event.type.Event'
    },

    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      key: {
        check: 'String',
        init: '',
        event: 'changeKey',
        apply: '_applyChange'
      },
      value: {
        check: 'String',
        init: '',
        event: 'changeValue',
        apply: '_applyChange'
      }
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _applyChange: function _applyChange() {
        this.fireEvent('change');
      }
    }
  });
  cv.ui.manager.model.config.Option.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Option.js.map?dt=1674150456733