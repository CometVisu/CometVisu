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
   * Option model for a VirtualComboBox / -SelectBox
   */
  qx.Class.define('cv.ui.manager.form.Option', {
    extend: qx.core.Object,

    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct(label, icon, value, hints) {
      qx.core.Object.constructor.call(this);

      if (label) {
        this.setLabel(label);
      }

      if (icon) {
        this.setIcon(icon);
      }

      if (value) {
        this.setValue(value);
      }

      if (hints) {
        this.setHints(hints);
      }
    },

    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      type: {
        check: ['default', 'group', 'state', 'error'],
        init: 'default',
        event: 'changeType'
      },
      label: {
        check: 'String',
        event: 'changeLabel'
      },
      icon: {
        event: 'changeIcon',
        nullable: true
      },
      value: {
        check: 'String',
        event: 'changeValue',
        nullable: true
      },
      hints: {
        check: 'Object',
        nullable: true
      }
    }
  });
  cv.ui.manager.form.Option.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Option.js.map?dt=1664609789452