/* info.js (c) 2012 by Christian Mayer [CometVisu at ChristianMayer dot de]
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
 
design.basicdesign.addCreator('info', {
  create: function( element, path, flavour, type ) {
    var $e = $(element);
    
    // create the main structure
    var ret_val = basicdesign.createDefaultWidget( 'info', $e, path, flavour, type, this.update );
    
    // create the actor
    var $actor = $('<div class="actor"><div class="value"></div></div>');
    ret_val.append( $actor );
    
    // initially setting a value
    basicdesign.defaultUpdate(undefined, undefined, ret_val, true);
    
    return ret_val;
  },
  update:   function(e,d) { 
    var element = $(this);
    basicdesign.defaultUpdate( e, d, element, true );
  },
  update3d: design.basicdesign.defaultUpdate3d
});

}); // end define
