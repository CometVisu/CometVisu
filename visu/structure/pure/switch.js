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
  create: function( page, path ) {
    var $p = $(page);
    var layout = $p.find('layout')[0];
    var style = layout ? 'style="' + extractLayout( layout ) + '"' : '';
    var ret_val = $('<div class="widget clearfix switch" ' + style + '/>');
    ret_val.setWidgetLayout($p)
    var labelElement = $p.find('label')[0];
    var label = labelElement ? '<div class="label">' + labelElement.textContent + '</div>' : '';
    var address = makeAddressList($p);
    var actor = '<div class="actor switchUnpressed"><div class="value">-</div></div>';
    var $actor = $(actor).data( {
      'address' : address,
      'mapping' : $p.attr('mapping'),
      'styling' : $p.attr('styling'),
      'on_value'  : $p.attr('on_value' ) || 1,
      'off_value' : $p.attr('off_value') || 0,
      'align'   : $p.attr('align'),
      'type'    : 'switch'
    } ).bind( 'click', this.action );
    for( var addr in address ) 
    { 
      if( !address[addr][2] ) $actor.bind( addr, this.update ); // no writeonly
    }
    ret_val.append( label ).append( $actor );
    return ret_val;
  },
  update: function(e,d) { 
    var element = $(this);
    var value = defaultUpdate( e, d, element );
    var off = map( element.data( 'off_value' ), element );
    element.removeClass( value == off ? 'switchPressed' : 'switchUnpressed' );
    element.addClass(    value == off ? 'switchUnpressed' : 'switchPressed' );
  },
  action: function() {
    var data = $(this).data();
    for( var addr in data.address )
    {
      if( data.address[addr][1] == true ) continue; // skip read only
      visu.write( addr.substr(1), transformEncode( data.address[addr][0], data.value == data.off_value ? data.on_value : data.off_value ) );
    }
  },
  attributes: {
    on_value:  { type: 'string' , required: false },
    off_value: { type: 'string' , required: false },
    mapping:   { type: 'mapping', required: false },
    styling:   { type: 'styling', required: false },
    align:     { type: 'string' , required: false },
    colspan:   { type: 'numeric', required: false },
    rowspan:   { type: 'numeric', required: false }
  },
  elements: {
    layout:    { type: 'layout' , required: false, multi: false },
    label:     { type: 'string' , required: true , multi: false },
    address:   { type: 'address', required: true , multi: true  }
  },
  content: false
});