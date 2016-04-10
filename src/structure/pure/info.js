/* info.js 
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
 *
 * @module Info 
 * @title  CometVisu Info 
 */


/**
 * @author Christian Mayer
 * @since 2012
 */
define( ['_common'], function( design ) {
  "use strict";
  var basicdesign = design.basicdesign;
 
  design.basicdesign.addCreator('info', {
  create: function( element, path, flavour, type ) {
    var $e = $(element);
    
    // create the main structure
    var ret_val = basicdesign.createDefaultWidget( 'info', $e, path, flavour, type, this.update );
    
    // create the actor
    var actor = '<div class="actor"><div class="value">-</div></div>';
    ret_val += actor;
    
    return ret_val + '</div>';
  },
  update:   function( ga, d ) { 
    var element = $(this);
    basicdesign.defaultUpdate( ga, d, element, true, element.parent().attr('id') );
  },
  update3d: design.basicdesign.defaultUpdate3d
});

}); // end define
