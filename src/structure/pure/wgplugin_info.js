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

define( ['_common'], function( design ) {
  var basicdesign = design.basicdesign;
  
design.basicdesign.addCreator('wgplugin_info', {
  create: function( element, path, flavour, type ) {
    var $e = $(element);
    var layout = $e.children('layout')[0];
    var style = layout ? 'style="' + basicdesign.extractLayout( layout, type ) + '"' : '';
    var classes = basicdesign.setWidgetLayout( $e, path );
    var ret_val = $('<div class="widget clearfix info '+(classes?classes:'')+'" ' + style + ' />');
    //type == '3d' && ret_val.data( extractLayout3d( layout ) ).bind( 'update3d', this.update3d );
    type == '3d' && $(document).bind( 'update3d', {element: ret_val, layout: basicdesign.extractLayout3d( layout )}, this.update3d );
    
    basicdesign.makeWidgetLabel( ret_val, $e, flavour );
    if( $e.attr('flavour') ) flavour = $e.attr('flavour');// sub design choice
    if( flavour ) ret_val.addClass( 'flavour_' + flavour );
    var address = basicdesign.makeAddressList($e);
    
    var actor = '<div class="actor"><div class="value">-</div></div>';
    templateEngine.widgetDataInsert( path, {
      'variable' : $e.attr('variable'),
      'address'  : address,
    } );
    var $actor = $(actor);
    for( var addr in address ) $actor.bind( addr, this.update );
    ret_val.append( $actor );
    return ret_val;
  },
  update: function( e, d, passedElement )
  {
    var 
      element = passedElement || $(this),
      widgetData = templateEngine.widgetDataGetByElement( element ),
      variable = widgetData[ 'variable' ],
      valueElement = element.find('.value');
      
    $.getJSON('/wg-plugindb.pl?name=' + variable, function(data) {
      templateEngine.setWidgetStyling( element, widgetData.basicvalue, widgetData.styling );
      
      if( widgetData[ 'align' ] )
        element.addClass(widgetData[ 'align' ] );
      valueElement.empty();
      valueElement.append( widgetData[variable] );
    });
  },
  update3d: design.basicdesign.defaultUpdate3d
});

}); // end define