/* PushButton.js 
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
 * @module structure/pure/PushButton
 * @requires structure/pure
 * @since 2013
 */
define( ['_common', 'lib/cv/role/Operate', 'lib/cv/role/Update'], function() {
  "use strict";

  Class('cv.structure.pure.PushButton', {
    isa: cv.structure.pure.AbstractWidget,
    does: [cv.role.Operate, cv.role.Update],

    has: {
      'downValue' : { is: 'r', init: 1 },
      'upValue'   : { is: 'r', init: 0 }
    },

    my : {
      methods: {
        getAttributeToPropertyMappings: function () {
          return {
            'downValue' : { target: 'downValue' , default: 1 },
            'upValue'   : { default: 0 }
          };
        },

        makeAddressListFn: function( src, transform, mode, variant ) {
          return [ true, variant ];
        }
      }
    },

    augment: {
      getDomString: function () {
        return '<div class="actor switchUnpressed"><div class="value">-</div></div>';
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
        var actor = this.getActor();
        var off = this.applyMapping(this.getUpValue());
        actor.removeClass( value == off ? 'switchPressed' : 'switchUnpressed' );
        actor.addClass(    value == off ? 'switchUnpressed' : 'switchPressed' );
      },

      /**
       * Get the value that should be send to backend after the action has been triggered
       *
       * @method getActionValue
       */
      getActionValue: function (path, actor, isCanceled, event) {
        if (event.type === "mouseup" || event.type === "touchend") {
          return this.getUpValue();
        } else {
          return this.getDownValue();
        }
      },

      action: function( path, actor, isCanceled, event ) {
        if( isCanceled ) return;
        var sendValue = this.getUpValue();
        this.sendToBackend(sendValue, function(address) {
          return (!address[2] || address[2] === "up");
        });
      },

      downaction: function(path, actor, isCanceled, event) {
        var sendValue = this.getDownValue();
        this.sendToBackend(sendValue, function(address) {
          return (!address[2] || address[2] === "down");
        });
      }
    }
  });
  // register the parser
  cv.xml.Parser.addHandler("pushbutton", cv.structure.pure.PushButton);
}); // end define