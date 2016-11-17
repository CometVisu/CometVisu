/* _common.js
 *
 * copyright (c) 2010-2016, Christian Mayer and the CometVisu contributers.
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

define(['joose', 'lib/cv/role/HasAddress', 'lib/cv/role/BasicUpdate'], function() {

  /**
   * This role provides the update method for incoming data
   *
   * @class cv.role.Update
   */
  Role("cv.role.Update", {
    does: [
      cv.role.HasAddress,
      cv.role.BasicUpdate
    ],

    requires: [ 'getAddressListCallback', 'applyStyling' ],

    my: {
      after: {

        initialize: function(props) {
          if (this.getAddress()) {
            cv.MessageBroker.my.subscribe("setup.dom.finished", function () {
              // initially setting a value
              this.update(undefined, undefined);
            }, this);
          }
        }

      }
    },

    methods: {

      /**
       * Process the incoming data, update the shown value and the stylings
       *
       * @param address {String} Address of the incoming value
       * @param data {String} the incoming value
       */
      update: function(address, data) {
        var value = this.processIncomingValue(address, data);
        this.handleUpdate(value, address);
      },

      /**
       * Update styling of the widgets according to the transformed + mapped
       * incoming value
       *
       * @param value
       */
      handleUpdate: function(value) {
      },

      processIncomingValue: function(address, data) {
        return this.defaultUpdate(address, data, this.getDomElement(), true, this.getPath());
      },

      /**
       * Description
       * @method defaultUpdate3d
       * @param {} ev
       * @param {} data
       * @param {} passedElement
       */
      update3d: function( ev, data, passedElement )
      {
        //var element = passedElement || $(this);
        var l = ev.data.layout;
        var pos = data.building2screen( new THREE.Vector3( l.x, l.y, l.z ) );
        ev.data.element.css( 'left', pos.x + 'px' );
        ev.data.element.css( 'top' , pos.y + 'px' );

        var floorFilter = true;
        if( l.floorFilter) floorFilter = data.getState('showFloor') == data.buildingProperties.floorNames[ l.floorFilter ];
        ev.data.element.css( 'display', floorFilter ? '' : 'none' );
      }
    }
  });
});