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

define(['joose', 'lib/cv/role/HasAddress'], function() {
  Role("cv.role.Update", {
    does: cv.role.HasAddress,

    requires: [ 'handleUpdate', 'getAddressListCallback', 'applyStyling' ],

    has: {
      value             : { is: 'rw' },
      basicValue        : { is: 'rw' }
    },

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
        this.handleUpdate(value);
      },

      /**
       * Update styling of the widgets accourding to the transformed + mapped
       * incoming value
       *
       * @param value
       */
      handleUpdate: function(value) {
      },

      processIncomingValue: function(address, data) {
        return this.defaultUpdate(address, data, this.getDomElement(), true, this.getPath());
      },

      applyTransform: function(address, data) {
        if (address) {
          var transform = this.getAddress()[address][0];
          // transform the raw value to a JavaScript type
          return templateEngine.transformDecode(transform, data);
        }
        return data;
      },

      applyTransformEncode: function(address, data) {
        if (address) {
          var transform = this.getAddress()[address][0];
          // transform the raw value to a JavaScript type
          return templateEngine.transformEncode(transform, data);
        }
        return data;
      },

      applyMapping: function(value) {
        return templateEngine.map(value, this.getMapping());
      },

      applyFormat: function(value, address) {
        if (this.getFormat()) {
          if (!this.formatValueCache) {
            this.formatValueCache = [this.getFormat()];
          }

          var argListPos = (this.getAddress() && this.getAddress()[address]) ? this.getAddress()[address][3] : 1;

          this.formatValueCache[argListPos] = value;

          return sprintf.apply(this, this.formatValueCache);
        }
        return value;
      },

      defaultValueHandling: function( address, data ) {

        // #1: transform the raw value to a JavaScript type
        var value = this.applyTransform(address, data);

        // store it to be able to suppress sending of unchanged data
        this.setBasicValue(value);

        // #2: map it to a value the user wants to see
        value = this.applyMapping(value);

        // #3: format it in a way the user understands the value
        value = this.applyFormat(value);

        this.setValue(value);

        if (undefined !== value && value.constructor == Date) {
          switch (this.getAddress()[address][0]) // special case for KNX
          {
            case 'DPT:10.001':
              value = value.toLocaleTimeString();
              break;
            case 'DPT:11.001':
              value = value.toLocaleDateString();
              break;
            case 'OH:datetime':
              value = value.toLocaleDateString();
              break;
            case 'OH:time':
              value = value.toLocaleTimeString();
              break;
          }
        }

        this.applyStyling(this.getBasicValue());
        // #4 will happen outside: style the value to be pretty
        return value;
      },

      /**
       * Method to handle all special cases for the value. The might come from
       * the mapping where it can be quite complex as it can contain icons.
       * value: the value that will be inserted
       * modifyFn: callback function that modifies the DOM
       * @method defaultValue2DOM
       * @param {} value
       * @param {} modifyFn
       */
      defaultValue2DOM: function( value, modifyFn ) {
        if (('string' === typeof value) || ('number' === typeof value))
          modifyFn(value);
        else if ('function' === typeof value)
        // thisValue(valueElement);
          console.error('typeof value === function - special case not handled anymore!');
        else if (!Array.isArray(value)) {
          var element = value.cloneNode();
          if (value.getContext) {
            fillRecoloredIcon(element);
          }
          modifyFn(element);
        } else {
          for (var i = 0; i < value.length; i++) {
            var thisValue = value[i];
            if (!thisValue) continue;

            if (('string' === typeof thisValue) || ('number' === typeof thisValue))
              modifyFn(thisValue);
            else if ('function' === typeof thisValue)
            // thisValue(valueElement);
              console.error('typeof value === function - special case not handled anymore!');
            else {
              var element = thisValue.cloneNode();
              if (thisValue.getContext) {
                fillRecoloredIcon(element);
              }
              modifyFn(element);
            }
          }
        }
      },

      /**
       * ga:            address
       * data:          the raw value from the bus
       * passedElement: the element to update
       * @method defaultUpdate
       * @param {} ga
       * @param {} data
       * @param {} passedElement
       * @param {} newVersion
       * @param {} path
       * @return value
       */
      defaultUpdate: function( ga, data, passedElement) {
        ///console.log(ga, data, passedElement, newVersion );
        var element = passedElement || this.getDomElement();
        var value = this.defaultValueHandling(ga, data);

        // TODO: check if this is the right place for this
        // might be if the styling removes the align class
        if (this.getAlign())
          element.addClass(this.getAlign());

        var valueElement = element.find('.value');
        valueElement.empty();
        if (undefined !== value)
          this.defaultValue2DOM(value, function (e) {
            valueElement.append(e)
          });
        else
          valueElement.append('-');

        return value;
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