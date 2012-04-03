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
  create: function( page, path ) {
    var $p = $(page);
    var layout = $p.find('layout')[0];
    var style = layout ? 'style="' + extractLayout( layout ) + '"' : '';
    var value = $p.attr('value') ? $p.attr('value') : 0;
    var ret_val = $('<div class="widget clearfix switch" ' + style + ' />');
    ret_val.setWidgetLayout($p);
    var labelElement = $p.find('label')[0];
    var label = labelElement ? '<div class="label">' + labelElement.textContent + '</div>' : '';
    var address = makeAddressList($p);
    var actor = '<div class="actor switchUnpressed ';
    if ( $p.attr( 'align' ) ) 
      actor += $p.attr( 'align' ); 
    actor += '">';
    var map = $p.attr('mapping');
    if( mappings[map] && mappings[map][value] )
      actor += '<div class="value">' + mappings[map][value] + '</div>';
    else
      actor += '<div class="value">' + value + '</div>';
    actor += '</div>';
    var $actor = $(actor).data( {
      'address' : address,
      'mapping' : $(page).attr('mapping'),
      'styling' : $(page).attr('styling'),
      'type'    : 'trigger',
      'align'   : $p.attr('align'),
      'sendValue': value
    } ).bind( 'click', this.action ).bind( 'mousedown', function(){
      $(this).removeClass('switchUnpressed').addClass('switchPressed');
    } ).bind( 'mouseup mouseout', function(){ // not perfect but simple
      $(this).removeClass('switchPressed').addClass('switchUnpressed');
    } ).setWidgetStyling(value);
    ret_val.append( label ).append( $actor );
    return ret_val;
  },
  action: function() {
    var data = $(this).data();
    for( var addr in data.address )
    {
      if( data.address[addr][1] == true ) continue; // skip read only
      visu.write( addr.substr(1), transformEncode( data.address[addr][0], data.sendValue ) );
    }
  },
  attributes: {
    value:   { type: 'string' , required: true  },
    mapping: { type: 'mapping', required: false },
    styling: { type: 'styling', required: false },
    align:   { type: 'string' , required: false },
    colspan: { type: 'numeric', required: false },
    rowspan: { type: 'numeric', required: false }
  },
  elements: {
    label:   { type: 'string' , required: true , multi: false },
    address: { type: 'address', required: true , multi: true  },
    layout:  { type: 'layout' , required: false, multi: false }
  },
  content: false
});