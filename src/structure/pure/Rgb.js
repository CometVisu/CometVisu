/* Rgb.js 
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
 * @module structure/pure/Rgb
 * @author Christian Mayer
 * @since 2012
 */
define( ['_common', 'lib/cv/role/Update'], function() {
  "use strict";

  Class('cv.structure.pure.Rgb', {
    isa: cv.structure.pure.AbstractWidget,
    does: [cv.role.Update],

    my : {
      methods: {
        makeAddressListFn: function(src, transform, mode, variant) {
          return [true, variant];
        }
      }
    },

    augment: {
      getDomString: function () {
        return '<div class="actor"><div class="value"></div></div>';
      }
    },

    methods: {
      /**
       * Handles the incoming data from the backend for this widget
       *
       * @method handleUpdate
       * @param value {any} incoming data (already transformed + mapped)
       */
      handleUpdate: function(value, ga) {
        var valElem = this.getValueElement();

        var bg = valElem.css('background-color').replace(/[a-zA-Z()\s]/g, '').split(/,/);
        if( 3 !== bg.length ) {
          bg = [0, 0, 0];
        }
        switch (this.getAddress()[ ga ][2]) {
          case 'r' :  bg[0] = value; break;
          case 'g' :  bg[1] = value; break;
          case 'b' :  bg[2] = value; break;
          default:
        }
        var bgs = "rgb(" + bg[0] + ", " + bg[1] + ", " + bg[2] + ")";
        valElem.css('background-color', bgs );
      }
    }
  });
  // register the parser
  cv.xml.Parser.addHandler("rgb", cv.structure.pure.Rgb);
}); // end define