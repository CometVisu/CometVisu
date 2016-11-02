/* InfoTrigger.js 
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


/**
 * @module structure/pure/InfoTrigger
 * @author Christian Mayer
 * @since 2012
 */
define( ['_common', 'lib/cv/role/Operate', 'lib/cv/role/Update', 'lib/cv/role/HandleLongpress'], function() {
  "use strict";

  Class('cv.structure.pure.InfoTrigger', {
    isa: cv.structure.pure.AbstractWidget,
    does: [
      cv.role.Operate,
      cv.role.Update,
      cv.role.HasAnimatedButton,
      cv.role.HandleLongpress
    ],

    has: {
      'downValue'     : { is: 'r', init: 0 },
      'shortDownValue': { is: 'r', init: 0 },
      'downLabel'     : { is: 'r' },
      'upValue'       : { is: 'r', init: 0 },
      'shortUpValue'  : { is: 'r', init: 0 },
      'upLabel'       : { is: 'r' },
      'isAbsolute'    : { is: 'r' },
      'min'           : { is: 'r', init: 0 },
      'max'           : { is: 'r', init: 255 },
      'infoPosition'  : { is: 'r', init: 'middle' }
    },

    my : {
      methods: {
        getAttributeToPropertyMappings: function () {
          return {
            'downvalue'     : { target: 'downValue', default: 0 },
            'shortdownvalue': { target: 'shortDownValue', default: 0 },
            'downlabel'     : { target: 'downLabel' },
            'upvalue'       : { target: 'upValue', default: 0 },
            'shortupvalue'  : { target: 'shortUpValue', default:  0 },
            'uplabel'       : { target: 'upLabel' },
            'shorttime'     : { target: 'shortThreshold', transform: parseFloat, default: -1 },
            'change'    : { target: 'isAbsolute', transform: function(value) {
              return (value || 'relative') === "absolute";
            }},
            'min'           : { transform: parseFloat, default:  0 },
            'max'           : { transform: parseFloat, default: 255 },
            'infoposition'  : { target: 'infoPosition', default: 'left' }
          };
        },

        makeAddressListFn: function( src, transform, mode, variant ) {
          // Bit 0 = short, Bit 1 = button => 1|2 = 3 = short + button
          return [ true, variant == 'short' ? 1 : (variant == 'button' ? 2 : 1|2) ];
        }
      }
    },

    augment: {
      getDomString: function () {
        // create buttons + info
        var ret_val = '<div style="float:left;">';

        var actordown = '<div class="actor switchUnpressed downlabel" ';
        if ( this.getAlign() )
          actordown += 'style="text-align: ' + this.getAlign() + '" ';
        actordown += '>';
        actordown += '<div class="label">' + (this.getDownLabel() || '-') + '</div>';
        actordown += '</div>';

        var actorup = '<div class="actor switchUnpressed uplabel" ';
        if ( this.getAlign() )
          actorup += 'style="text-align: ' + this.getAlign() + '" ';
        actorup += '>';
        actorup += '<div class="label">' + (this.getUpLabel() || '+') + '</div>';
        actorup += '</div>';

        var actorinfo = '<div class="actor switchInvisible" ';
        if ( this.getAlign() )
          actorinfo += 'style="text-align: ' + this.getAlign() + '" ';
        actorinfo += '><div class="value">-</div></div>';

        switch (this.getInfoPosition()) {
          case 'middle':
            ret_val += actordown;
            ret_val += actorinfo;
            ret_val += actorup;
            break;
          case 'right':
            ret_val += actordown;
            ret_val += actorup;
            ret_val += actorinfo;
            break;
          default:
            ret_val += actorinfo;
            ret_val += actordown;
            ret_val += actorup;
            break;
        }

        return ret_val + '</div>';
      }
    },

    methods: {
      /**
       * Handles the incoming data from the backend for this widget
       *
       * @method handleUpdate
       * @param value {any} incoming data (already transformed + mapped)
       */
      handleUpdate: function(value) {
      },

      /**
       * Get the value that should be send to backend after the action has been triggered
       *
       * @method getActionValue
       */
      getActionValue: function (path, actor, isCanceled ) {
        var isDown              = actor.classList.contains('downlabel');
        if (this.isShortPress()) {
          return isDown ? this.getShortDownValue() : this.getShortUpValue();
        } else {
          return isDown ? this.getDownValue() : this.getUpValue();
        }
      },

      action: function( path, actor, isCanceled ) {
        if( isCanceled ) return;

        var value = this.getActionValue(path, actor, isCanceled);
        var bitMask = (this.isShortPress() ? 1 : 2);

        if( this.getIsAbsolute() )
        {
          value = parseFloat(this.getBasicValue());
          if( isNaN( value ) )
            value = 0; // anything is better than NaN...
          value = value + parseFloat(this.getActionValue(path, actor, isCanceled ));
          value = Math.max(value, this.getMin())
          value = Math.min(value, this.getMax())
        }
        var addresses = this.getAddress();
        for( var addr in addresses )
        {
          if( !(addresses[addr][1] & 2) ) continue; // skip when write flag not set
          if (addresses[addr][2] & bitMask) {
            templateEngine.visu.write( addr, this.applyTransformEncode(addr, value));
          }
        }
      }
    }
  });
  // register the parser
  cv.xml.Parser.addHandler("infotrigger", cv.structure.pure.InfoTrigger);
}); // end define