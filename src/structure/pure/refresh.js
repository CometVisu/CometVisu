/* refresh.js (c) 2014 by Christian Mayer [CometVisu at ChristianMayer dot de]
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
  
design.basicdesign.addCreator('refresh', {
  create: function( element, path, flavour, type ) {
    var $e = $(element);
    
    // create the main structure
    var ret_val = $( basicdesign.createDefaultWidget( 'refresh', $e, path, flavour, type, null ) + '</div>' );
    
    // create the actor
    var $actor = $('<div class="actor switchUnpressed"><div class="value"></div></div>');
    ret_val.append( $actor );
    
    var data = templateEngine.widgetDataGet( path );
    
    // initially setting a value
    basicdesign.defaultUpdate( undefined, $e.attr('value'), ret_val, true, path );
    return ret_val;
  },
  downaction: basicdesign.defaultButtonDownAnimationInheritAction,
  action: function( path, actor, isCanceled ) {
    basicdesign.defaultButtonUpAnimationInheritAction( path, actor );
    if( isCanceled ) return;
    
    templateEngine.visu.restart();
  }
});

}); // end define