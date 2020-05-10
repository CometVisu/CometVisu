(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.common.BasicUpdate": {
        "require": true
      },
      "qx.Class": {
        "construct": true
      },
      "cv.data.Model": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Update.js 
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
   * This role provides the update method for incoming data
   *
   */
  qx.Mixin.define("cv.ui.common.Update", {
    include: cv.ui.common.BasicUpdate,

    /*
     ******************************************************
     CONSTRUCTOR
     ******************************************************
     */
    construct: function construct() {
      if (this.getAddress) {
        if (this._initOnCreate === true) {
          this.__initUpdater();
        } else if (qx.Class.getEventType(this.constructor, "domReady")) {
          this.addListenerOnce("domReady", this.__initUpdater, this);
        }
      }
    },

    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      _initOnCreate: false,
      __initUpdater: function __initUpdater() {
        var model = cv.data.Model.getInstance();
        Object.getOwnPropertyNames(this.getAddress()).forEach(function (address) {
          if (!cv.data.Model.isReadAddress(this.getAddress()[address])) {
            // no read address
            return;
          }

          var state = model.getState(address);

          if (state !== undefined) {
            this.update(address, state);
          } //add listener


          model.addUpdateListener(address, this.update, this);
        }, this);
      },

      /**
       * Process the incoming data, update the shown value and the stylings
       *
       * @param address {String} Address of the incoming value
       * @param data {String} the incoming value
       */
      update: function update(address, data) {
        if (this._update) {
          this._update(address, data);
        } else {
          var value = this.processIncomingValue(address, data);

          if (this.handleUpdate) {
            this.handleUpdate(value, address);
          }
        }
      },
      processIncomingValue: function processIncomingValue(address, data) {
        if (this._processIncomingValue) {
          var value = this._processIncomingValue(address, data); // store it to be able to suppress sending of unchanged data


          if (value !== undefined) {
            this.setBasicValue(value);
          }

          return value;
        }

        return this.defaultUpdate(address, data, this.getDomElement(), true, this.getPath());
      },

      /**
       * Description
       *
       * @param ev {var}
       * @param data {var}
       */
      update3d: function update3d(ev, data) {
        var l = ev.data.layout;
        var pos = data.building2screen(new THREE.Vector3(l.x, l.y, l.z));
        ev.data.element.css('left', pos.x + 'px');
        ev.data.element.css('top', pos.y + 'px');
        var floorFilter = true;

        if (l.floorFilter) {
          floorFilter = data.getState('showFloor') === data.buildingProperties.floorNames[l.floorFilter];
        }

        ev.data.element.css('display', floorFilter ? '' : 'none');
      }
    }
  });
  cv.ui.common.Update.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Update.js.map?dt=1589125239734