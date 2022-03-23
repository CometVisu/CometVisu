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
      },
      "qx.data.Array": {
        "construct": true
      },
      "cv.ui.manager.model.config.Option": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Section.js 
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
   *
   */
  qx.Class.define('cv.ui.manager.model.config.Section', {
    extend: qx.core.Object,

    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct(name) {
      qx.core.Object.constructor.call(this);
      this.setName(name);
      this.initOptions(new qx.data.Array());
    },

    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      name: {
        check: 'String',
        event: 'changeName',
        init: ''
      },
      options: {
        check: 'qx.data.Array',
        deferredInit: true,
        event: 'changeOptions'
      }
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      addOption: function addOption(key, value) {
        var options = this.getOptions();
        var found = options.some(function (option) {
          if (option.getKey() === key) {
            option.setValue(value);
            return true;
          }

          return false;
        }, this);

        if (!found) {
          options.push(new cv.ui.manager.model.config.Option(key, value));
        }
      }
    }
  });
  cv.ui.manager.model.config.Section.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Section.js.map?dt=1648068862605