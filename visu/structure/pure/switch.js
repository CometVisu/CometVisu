/* switch.js (c) 2012 by Christian Mayer [CometVisu at ChristianMayer dot de]
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

basicdesign.addCreator('switch', {
  create: function( element, path, flavour, type ) {
    var $e = $(element);
    var layout = $e.children('layout')[0];
    var style = layout ? 'style="' + extractLayout( layout, type ) + '"' : '';
    var classes = 'widget clearfix switch';
    if( $e.attr('align') ) {
      classes+=" "+$e.attr('align');
    }
    var ret_val = $('<div class="'+classes+'" ' + style + '/>');
    ret_val.setWidgetLayout($e);
    if( $e.attr('flavour') ) flavour = $e.attr('flavour');// sub design choice
    if( flavour ) ret_val.addClass( 'flavour_' + flavour );
    var label = extractLabel( $e.find('label')[0] );
    var address = makeAddressList($e);
    
    var actor = '<div class="actor switchUnpressed"><div class="value">-</div></div>';
    var $actor = $(actor).data( {
      'address' : address,
      'mapping' : $e.attr('mapping'),
      'styling' : $e.attr('styling'),
      'on_value'  : $e.attr('on_value' ) || 1,
      'off_value' : $e.attr('off_value') || 0,
      'align'   : $e.attr('align'),
      'type'    : 'switch'
    } ).bind( 'click', this.action );
    for( var addr in address ) 
    { 
      if( address[addr][1] & 1 ) $actor.bind( addr, this.update ); // only when read flag is set
    }
    ret_val.append( label ).append( $actor );
    return ret_val;
  },
  update: function(e,d) { 
    var element = $(this);
    var value = defaultUpdate( e, d, element );
    var off = map( element.data( 'off_value' ), element.data('mapping') );
    element.removeClass( value == off ? 'switchPressed' : 'switchUnpressed' );
    element.addClass(    value == off ? 'switchUnpressed' : 'switchPressed' );
  },
  action: function() {
    var data = $(this).data();
    for( var addr in data.address )
    {
      if( !(data.address[addr][1] & 2) ) continue; // skip when write flag not set
      visu.write( addr.substr(1), transformEncode( data.address[addr][0], data.basicvalue == data.off_value ? data.on_value : data.off_value ) );
    }
  }
});