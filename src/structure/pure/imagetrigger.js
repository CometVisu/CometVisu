/* imagetrigger.js 
 * 
 * copyright (c) 2010-2016 by Christian Mayer (ChristianMayer) [CometVisu at ChristianMayer dot de]
 * 
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 *
 * @module Imagetrigger 
 * @title  CometVisu Imagetrigger 
 */


/**
 * @author Christian Mayer
 * @since 2012
 */
define( ['_common'], function( design ) {
  "use strict";
  var basicdesign = design.basicdesign;
  
  design.basicdesign.addCreator('imagetrigger', {
  create: function( element, path, flavour, type ) { 
    var 
      $e = $(element),
      classes = basicdesign.setWidgetLayout( $e, path );
    classes += ' imagetrigger';
    if( $e.attr('flavour') ) flavour = $e.attr('flavour');// sub design choice
    if( flavour ) classes += ' flavour_' + flavour;
    var ret_val = '<div class="widget clearfix image '+(classes?classes:'')+'">';
    var value = $e.attr('value') ? $e.attr('value') : 0;
    ret_val += basicdesign.extractLabel( $e.find('label')[0], flavour );
    var address = basicdesign.makeAddressList($e);
    var layout = $e.children('layout')[0];
    var style = layout ? 'style="' + basicdesign.extractLayout( layout, type, {width:'100%'} ) + '"' : '';

    var actor = '<div class="actor">';
    if ( $e.attr('type')=='show' )
      actor += '<img src="' + $e.attr('src') + '.' + $e.attr('suffix') + '" ' + style + ' />';
    else
      actor += '<img src="" ' + style + ' />';
    actor += '</div>';
        
    actor += '</div>';
    var refresh = $e.attr('refresh') ? $e.attr('refresh')*1000 : 0;
    var data = templateEngine.widgetDataInsert( path, {
      'address':   address, 
      'refresh':   refresh,
      'src':       $e.attr('src'),
      'suffix':    $e.attr('suffix'),
      'sendValue': $e.attr('sendValue') || ""
    } );
    
    if (data.refresh) {
      templateEngine.postDOMSetupFns.push( function(){
        templateEngine.setupRefreshAction( path, data.refresh );
      });
    }
    
    return ret_val + actor + '</div>';
  },
  update: function( ga, d ) {
    var data  = templateEngine.widgetDataGetByElement( element );
    if ( data.address[e.type][1].writeonly == "true")
      return; // skip writeonly FIXME: writeonly shouldnt bind to update at all
    var val = templateEngine.transformDecode(data.address[ ga ][0], d);
    if (data.type == "show")
      if (val == 0)
        $(this).children().hide();
    else
      $(this).children().attr("src", data.src + '.' + data.suffix ).show();
    else if (data.type == "select")
      if (val == 0)
        $(this).children().hide();
    else
      $(this).children().attr("src", data.src + val + '.' + data.suffix ).show();
        
    //FIXME: add value if mapping exists 
    //FIXME: get image name from mapping
    //FIXME: add bitmask for multiple images
    //FIXME: add SVG-magics
  },
  action: function( path, actor, isCanceled ) {
    var 
      data = templateEngine.widgetDataGet( path );
    for( var addr in data.address ) {
      if( !(data.address[addr][1] & 2) )
        continue; // skip when write flag not set
      if( data.sendValue == "" )
        continue; // skip empty
      templateEngine.visu.write( addr, templateEngine.transformEncode( data.address[addr][0], data.sendValue ) );
    }
  }
});

}); // end define