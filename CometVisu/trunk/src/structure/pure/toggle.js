/* toggle.js (c) 2012 by Christian Mayer [CometVisu at ChristianMayer dot de]
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
 
design.basicdesign.addCreator('toggle', {
  create: function( element, path, flavour, type ) {
    var $e = $(element);
    
    // create the main structure
    var ret_val = basicdesign.createDefaultWidget( 'toggle', $e, path, flavour, type, this.update );
    
    // create the actor
    var $actor = $('<div class="actor switchUnpressed"><div class="value"></div></div>');
    ret_val.append( $actor );
    
    // bind to user action
    var bindClickToWidget = templateEngine.bindClickToWidget;
    if ( ret_val.data('bind_click_to_widget') ) bindClickToWidget = ret_val.data('bind_click_to_widget')==='true';
    var clickable = bindClickToWidget ? ret_val : $actor;
    basicdesign.createDefaultButtonAction( clickable, $actor, false, this.action );

    // initially setting a value
    basicdesign.defaultUpdate( undefined, undefined, ret_val, true );
    return ret_val;
  },
  update: function( e, d ) { 
    var element = $(this);
    basicdesign.defaultUpdate( e, d, element, true );
  },
  action: function(event) {
    var $this = $(this);
    if( undefined === $this.data().address ) $this = $this.parent();
    var data = $this.data();

    var sendValue = templateEngine.getNextMappedValue( data.basicvalue, data.mapping );
    for( var addr in data.address )
    {
      if( !(data.address[addr][1] & 2) ) continue; // skip when write flag not set
      templateEngine.visu.write( addr.substr(1), templateEngine.transformEncode( data.address[addr][0], sendValue ) );
    }
  }
});

}); // end define