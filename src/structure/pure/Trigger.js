/* Trigger.js 
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
 * TODO: complete docs
 *
 * @module structure/pure/Trigger
 * @requires structure/pure
 * @author Christian Mayer
 * @since 2012
 */
define( ['_common', 'lib/cv/role/Operate', 'lib/cv/MessageBroker',
  'lib/cv/role/HasAddress', 'lib/cv/role/BasicUpdate', 'lib/cv/role/HandleLongpress'], function() {
  "use strict";

  Class('cv.structure.pure.Trigger', {
    isa: cv.structure.pure.AbstractWidget,
    does: [
      cv.role.Operate,
      cv.role.HasAddress,
      cv.role.HasAnimatedButton,
      cv.role.BasicUpdate,
      cv.role.HandleLongpress
    ],

    has: {
      sendValue: { is: 'r', init: 0 },
      shortValue: { is: 'r', init: 0 }
    },

    my : {
      methods: {
        getAttributeToPropertyMappings: function () {
          return {
            'value'      : { target: 'sendValue' , default: 0 },
            'shorttime'  : { target: 'shortThreshold', default: -1, transform: parseFloat},
            'shortValue' : { target: 'shortValue', default: 0 }
          };
        },

        makeAddressListFn: function( src, transform, mode, variant ) {
          // Bit 0 = short, Bit 1 = button => 1|2 = 3 = short + button
          return [ true, variant == 'short' ? 1 : (variant == 'button' ? 2 : 1|2) ];
        }
      }
    },

    after : {
      initialize : function (props) {
        cv.MessageBroker.my.subscribe("setup.dom.finished", function() {
          this.defaultUpdate(undefined, this.getSendValue(), this.getDomElement(), true, this.getPath());
        }, this);
      }
    },

    augment: {
      getDomString: function () {
        return '<div class="actor switchUnpressed"><div class="value">-</div></div>';
      }
    },

    methods: {

      /**
       * Get the value that should be send to backend after the action has been triggered
       *
       * @method getActionValue
       */
      getActionValue: function (path, actor, isCanceled, event) {
        return this.isShortPress() ? this.getShortValue() : this.getSendValue();
      },

      action: function( path, actor, isCanceled ) {
        if( isCanceled ) return;

        var bitMask = (this.isShortPress() ? 1 : 2);
        var sendValue = this.getActionValue();

        this.sendToBackend(sendValue, function(address) {
          return !!(address[2] & bitMask);
        });
      }
    }
  });
  // register the parser
  cv.xml.Parser.addHandler("trigger", cv.structure.pure.Trigger);
}); // end define