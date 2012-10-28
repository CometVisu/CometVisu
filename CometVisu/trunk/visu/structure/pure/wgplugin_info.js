/* info.js (c) 2012 by Christian Mayer [CometVisu at ChristianMayer dot de]
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

basicdesign.addCreator('wgplugin_info', {
  create: function( element, path, flavour, type ) {
    var $e = $(element);
    var layout = $e.children('layout')[0];
    var style = layout ? 'style="' + extractLayout( layout, type ) + '"' : '';
    var ret_val = $('<div class="widget clearfix info" ' + style + ' />');
    //type == '3d' && ret_val.data( extractLayout3d( layout ) ).bind( 'update3d', this.update3d );
    type == '3d' && $(document).bind( 'update3d', {element: ret_val, layout: extractLayout3d( layout )}, this.update3d );
    
    ret_val.setWidgetLayout($e).makeWidgetLabel($e);
    var address = makeAddressList($e);
    
    var actor = '<div class="actor"><div class="value">-</div></div>';
    var $actor = $(actor).data({
      'variable' : $e.attr('variable'),
      'address'  : address,
      'format'   : $e.attr('format'),
      'mapping'  : $e.attr('mapping'),
      'styling'  : $e.attr('styling')
    });
    for( var addr in address ) $actor.bind( addr, this.update );
    ret_val.append( $actor );
    return ret_val;
  },
  update: function( e, data, passedElement )
  {
    var element = passedElement || $(this);
    
    var variable = element.data( 'variable' );
    var valueElement = element.find('.value');
    $.getJSON('/wg-plugindb.pl?name=' + variable, function(data) {
      element.setWidgetStyling( element.data( 'basicvalue' ) );
      
      if( element.data( 'align' ) )
        element.addClass(element.data( 'align' ) );
      valueElement.empty();
      valueElement.append( data[variable] );
    });
  },
  update3d: defaultUpdate3d
});