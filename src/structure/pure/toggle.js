/* toggle.js 
 * 
 * copyright (c) 2010-2016 by Christian Mayer (ChristianMayer) [CometVisu at ChristianMayer dot de]
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
 * @module Toggle 
 * @title  CometVisu Toggle 
 * @version 0.9.1-RC2
 */

/**
 * @author Christian Mayer
 * @since 2012
 */
define( ['_common'], function( design ) {
  "use strict";
  var basicdesign = design.basicdesign;
 
  design.basicdesign.addCreator('toggle', {
  create: function( element, path, flavour, type ) {
    var $e = $(element);
    
    // create the main structure
    var ret_val = basicdesign.createDefaultWidget( 'toggle', $e, path, flavour, type, this.update );
    
    // create the actor
    ret_val += '<div class="actor switchUnpressed"><div class="value">-</div></div>';
    
    var data = templateEngine.widgetDataGet( path );
    
    return ret_val + '</div>';
  },
  update: function( ga, d ) { 
    var element = $(this);
    basicdesign.defaultUpdate( ga, d, element, true, element.parent().attr('id') );
  },
  downaction: basicdesign.defaultButtonDownAnimationInheritAction,
  action: function( path, actor, isCanceled ) {
    basicdesign.defaultButtonUpAnimationInheritAction( path, actor );
    if( isCanceled ) return;
    
    var 
      data  = templateEngine.widgetDataGet( path );

    var sendValue = templateEngine.getNextMappedValue( data.basicvalue, data.mapping );
    for( var addr in data.address )
    {
      if( !(data.address[addr][1] & 2) ) continue; // skip when write flag not set
      templateEngine.visu.write( addr, templateEngine.transformEncode( data.address[addr][0], sendValue ) );
    }
  }
});

}); // end define