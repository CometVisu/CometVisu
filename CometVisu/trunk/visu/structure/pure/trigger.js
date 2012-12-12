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
    var layout = $e.children('layout')[0];
    var style = layout ? 'style="' + extractLayout( layout, type ) + '"' : '';
    var value = $e.attr('value') ? $e.attr('value') : 0;
    var classes = 'widget clearfix trigger';
    if( $e.attr('align') ) {
      classes+=" "+$e.attr('align');
    }
    var ret_val = $('<div class="'+classes+'" ' + style + '/>');
    ret_val.setWidgetLayout($e);
    if( $e.attr('flavour') ) flavour = $e.attr('flavour');// sub design choice
    if( flavour ) ret_val.addClass( 'flavour_' + flavour );
    var label = extractLabel( $e.find('label')[0] );
    var address = makeAddressList($e);
    var actor = '<div class="actor switchUnpressed ';
    if ( $e.attr( 'align' ) ) 
      actor += $e.attr( 'align' ); 
    actor += '"><div class="value"></div></div>';
    var $actor = $(actor);
    var valueElement = $actor.find('.value');
    var mappedValue = map( value, $e.attr('mapping') );
    if( ('string' == typeof mappedValue) || ('number' == typeof mappedValue) )
    {
      valueElement.append( mappedValue );
    } else 
    for( var i = 0; i < mappedValue.length; i++ )
    {
      valueElement.append( $(mappedValue[i]).clone() );
    }
    $actor.data( {
      'address' : address,
      'mapping' : $(element).attr('mapping'),
      'styling' : $(element).attr('styling'),
      'type'    : 'trigger',
      'align'   : $e.attr('align'),
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
      if( !(data.address[addr][1] & 2) ) continue; // skip when write flag not set
      visu.write( addr.substr(1), transformEncode( data.address[addr][0], data.sendValue ) );
    }
  }
});