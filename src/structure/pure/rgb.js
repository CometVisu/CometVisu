/* image.js (c) 2012 by Christian Mayer [CometVisu at ChristianMayer dot de]
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 */

define( ['_common'], function( design ) {
  var basicdesign = design.basicdesign;
  
design.basicdesign.addCreator('rgb', {
  create: function( element, path, flavour, type ) {
    var $e = $(element);
    
    // create the main structure
    function rgb_handleVariant(src, transform, mode, variant) {
      return [true, variant];
    }
    var ret_val = basicdesign.createDefaultWidget( 'rgb', $e, path, flavour, type, this.update, rgb_handleVariant );
    
    // create the actor
    var $actor = $('<div class="actor"><div class="value"></div></div>');
    ret_val.append( $actor );
    
    return ret_val;
  },
  update: function(e,d) { 
    var element = $(this),
        valElem = element.find('.value');
    var value = templateEngine.transformDecode( element.data('address')[ e.type ][0], d );
    var bg = valElem.css('background-color').replace(/[a-zA-Z()\s]/g, '').split(/,/);
    if( 3 !== bg.length )
      bg = [0, 0, 0];
    switch (element.data('address')[e.type][2]) {
    case 'r' :  bg[0] = value; break;
    case 'g' :  bg[1] = value; break;
    case 'b' :  bg[2] = value; break;
      default:
    }
    var bgs = "rgb(" + bg[0] + ", " + bg[1] + ", " + bg[2] + ")";
    valElem.css('background-color', bgs ); 
  },
});

}); // end define

