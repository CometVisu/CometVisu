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

basicdesign.addCreator('toggle', {
  create: function( element, path, flavour, type ) {
    var $e = $(element);
    var layout = $e.children('layout')[0];
    var style = layout ? 'style="' + extractLayout( layout, type ) + '"' : '';
    var classes = 'widget clearfix toggle';
    if( $e.attr('align') ) {
      classes+=" "+$e.attr('align');
    }
    var ret_val = $('<div class="'+classes+'" ' + style + '/>');
    ret_val.setWidgetLayout($e);
    if( $e.attr('flavour') ) flavour = $e.attr('flavour');// sub design choice
    if( flavour ) ret_val.addClass( 'flavour_' + flavour );
    var label = extractLabel( $e.find('label')[0], flavour );
    var address = makeAddressList($e);
    var bindClickToWidget = templateEngine.bindClickToWidget;
    if ($e.attr("bind_click_to_widget")) bindClickToWidget = $e.attr("bind_click_to_widget")=="true";
    var actor = '<div class="actor switchUnpressed"><div class="value">-</div></div>';
    var $actor = $(actor).data( {
      'address' : address,
      'mapping' : $e.attr('mapping'),
      'styling' : $e.attr('styling'),
      'align'   : $e.attr('align'),
      'type'    : 'switch'
    } );
    var clickable = bindClickToWidget ? ret_val : $actor;
    clickable.bind( 'click', this.action );
    for( var addr in address ) $actor.bind( addr, this.update );
    ret_val.append( label ).append( $actor );
    return ret_val;
  },
  update: function(e,d) { 
    var element = $(this);
    var value = defaultUpdate( e, d, element );
    element.addClass('switchUnpressed');
  },
  action: function() {
    var data = $(this).find('.actor').size()==1 ? $(this).find('.actor').data() : $(this).data();
    var sendValue = templateEngine.getNextMappedValue(data.basicvalue, data.mapping);
    for( var addr in data.address )
    {
      if( !(data.address[addr][1] & 2) ) continue; // skip when write flag not set
      templateEngine.visu.write( addr.substr(1), templateEngine.transformEncode( data.address[addr][0], sendValue ) );
    }
  }
});
