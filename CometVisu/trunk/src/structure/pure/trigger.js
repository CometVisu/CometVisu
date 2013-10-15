/* trigger.js (c) 2012 by Christian Mayer [CometVisu at ChristianMayer dot de]
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

basicdesign.addCreator('trigger', {
  create: function( element, path, flavour, type ) {
    var $e = $(element);
    
    // create the main structure
    var makeAddressListFn = function( src, transform, mode, variant ) {
      return [true, variant=='short'];
    }
    var ret_val = basicdesign.createDefaultWidget( 'trigger', $e, path, flavour, type, null, makeAddressListFn );
    // and fill in widget specific data
    ret_val.data( {
      'sendValue'  : $e.attr('value' )                || 0,
      'shorttime'  : parseFloat($e.attr('shorttime')) || -1,
      'shortValue' : $e.attr('shortvalue')            || 0
    } );
    
    // create the actor
    var $actor = $('<div class="actor switchUnpressed"><div class="value"></div></div>');
    ret_val.append( $actor );
    
    // bind to user action
    var bindClickToWidget = templateEngine.bindClickToWidget;
    if ( ret_val.data('bind_click_to_widget') ) bindClickToWidget = ret_val.data('bind_click_to_widget')==='true';
    var clickable = bindClickToWidget ? ret_val : $actor;
    basicdesign.createDefaultButtonAction( clickable, $actor, this.downaction, this.action );

    // initially setting a value
    basicdesign.defaultUpdate(undefined, ret_val.data('sendValue'), ret_val, true);
    return ret_val;
  },
  downaction: function(event) {
    $(this).parent().data( 'downtime', new Date().getTime() );
  },
  action: function(event) {
    var $this = $(this);
    if( undefined === $this.data().address ) $this = $this.parent();
    var data = $this.data();
    
    if( data.downtime )
    {
      var isShort = (new Date().getTime()) - data.downtime < data.shorttime;
      for( var addr in data.address )
      {
        if( !(data.address[addr][1] & 2) ) continue; // skip when write flag not set
        if( isShort == data.address[addr][2] )
          templateEngine.visu.write( addr.substr(1), templateEngine.transformEncode( data.address[addr][0], isShort ? data.shortValue : data.sendValue ) );
      }
    }
  }
});