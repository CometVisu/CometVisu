/* pushbutton.js 
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
 * @module Pushbutton 
 * @title  CometVisu Pushbutton 
 * @version 0.9.1-RC2
 */

/**
 * @since 2013
 */
define( ['_common'], function( design ) {
  "use strict";
  var basicdesign = design.basicdesign;
  
  design.basicdesign.addCreator('pushbutton', {
  create: function( element, path, flavour, type ) {
    var $e = $(element);
    
    // create the main structure
    var ret_val = basicdesign.createDefaultWidget( 'pushbutton', $e, path, flavour, type, this.update, function( src, transform, mode, variant ) {
      return [ true, variant ];
    } );
    // and fill in widget specific data
    var data = templateEngine.widgetDataInsert( path, {
      'downValue'  : $e.attr('downValue' ) || 1,
      'upValue' : $e.attr('upValue') || 0
    } );

    ret_val += '<div class="actor switchUnpressed"><div class="value">-</div></div>';

    return ret_val + '</div>';
  },
  update: function( ga, d ) { 
    var element = $(this),
        data  = templateEngine.widgetDataGetByElement( element );
    var actor   = element.find('.actor');
    var value = basicdesign.defaultUpdate( ga, d, element, true, element.parent().attr('id') );
    var off = templateEngine.map( data['upValue'], data['mapping'] );
    actor.removeClass( value == off ? 'switchPressed' : 'switchUnpressed' );
    actor.addClass(    value == off ? 'switchUnpressed' : 'switchPressed' );
  },
  downaction: function( path, actor ) {
    var data = templateEngine.widgetDataGet( path );

    for (var addr in data.address) {
      if (!(data.address[addr][1] & 2)) continue; // skip when write flag not set
      if (data.address[addr][2]!=undefined && data.address[addr][2]!="down") continue; // skip when not down-variant
      templateEngine.visu.write(addr, templateEngine.transformEncode(data.address[addr][0], data.downValue));
    }
  },
  action: function( path, actor, isCanceled ) {
    var data = templateEngine.widgetDataGet( path );

    for (var addr in data.address) {
      if (!(data.address[addr][1] & 2)) continue; // skip when write flag not set
      if (data.address[addr][2]!=undefined && data.address[addr][2]!="up") continue; // skip when not up-variant
      templateEngine.visu.write(addr, templateEngine.transformEncode(data.address[addr][0], data.upValue));
    }
  }
});

}); // end define