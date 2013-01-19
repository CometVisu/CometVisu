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

basicdesign.addCreator('rgb', {
  create: function( element, path, flavour, type ) {
    var $e = $(element);
    var layout = $e.children('layout')[0];
    var style = layout ? 'style="' + extractLayout( layout, type ) + '"' : '';
    
    var classes = 'widget clearfix rgb';
    if( $e.attr('align') ) {
      classes+=" "+$e.attr('align');
    }
    var ret_val = $('<div class="'+classes+'" ' + style + '/>');
    ret_val.setWidgetLayout($e);
    if( $e.attr('flavour') ) flavour = $e.attr('flavour');// sub design choice
    if( flavour ) ret_val.addClass( 'flavour_' + flavour );
    var label = extractLabel( $e.find('label')[0] );
    var address = makeAddressList($e, rgb_handleVariant);
    
    var actor = '<div class="actor" style="background: #ffffff;"></div>';
    var $actor = $(actor).data( {
      'address' : address,
    } );
    for( var addr in address ) 
    { 
      if( address[addr][1] & 1 ) $actor.bind( addr, this.update ); // only when read flag is set
    }
    ret_val.append( label ).append( $actor );
    return ret_val;
  },
  update: function(e,d) { 
    var element = $(this);
    var value = templateEngine.transformDecode( element.data('address')[ e.type ][0], d );
    var bg = element.css('background-color').replace(/[a-zA-Z()\s]/g, '').split(/,/);
    switch (element.data('address')[e.type][2]) {
    case 'r' :  bg[0] = value; break;
    case 'g' :  bg[1] = value; break;
    case 'b' :  bg[2] = value; break;
      default:
    }
    var bgs = "rgb(" + bg[0] + ", " + bg[1] + ", " + bg[2] + ")";
    element.css('background-color', bgs ); 
    
    
  },
});

function rgb_handleVariant(src, transform, mode, variant) {
	  return [true, variant];
}
