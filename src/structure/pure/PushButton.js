/* PushButton.js 
 * 
 * copyright (c) 2010-2016, Christian Mayer and the CometVisu contributers.
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
 */


/**
 * TODO: complete docs
 *
 * @module structure/pure/PushButton
 * @requires structure/pure
 * @since 2013
 */
define( ['_common'], function( design ) {
  "use strict";
  var basicdesign = design.basicdesign;
  
  design.basicdesign.addCreator('pushbutton', {
  /**
   * Description
   * @method create
   * @param {} element
   * @param {} path
   * @param {} flavour
   * @param {} type
   * @return BinaryExpression
   */
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
  /**
   * Description
   * @method update
   * @param {} ga
   * @param {} d
   */
  update: function( ga, d ) { 
    var element = $(this),
        data  = templateEngine.widgetDataGetByElement( element );
    var actor   = element.find('.actor');
    var value = basicdesign.defaultUpdate( ga, d, element, true, element.parent().attr('id') );
    var off = templateEngine.map( data['upValue'], data['mapping'] );
    actor.removeClass( value == off ? 'switchPressed' : 'switchUnpressed' );
    actor.addClass(    value == off ? 'switchUnpressed' : 'switchPressed' );
  },
  /**
   * Description
   * @method downaction
   * @param {} path
   * @param {} actor
   */
  downaction: function( path, actor ) {
    var data = templateEngine.widgetDataGet( path );

    for (var addr in data.address) {
      if (!(data.address[addr][1] & 2)) continue; // skip when write flag not set
      if (data.address[addr][2]!=undefined && data.address[addr][2]!="down") continue; // skip when not down-variant
      templateEngine.visu.write(addr, templateEngine.transformEncode(data.address[addr][0], data.downValue));
    }
  },
  /**
   * Description
   * @method action
   * @param {} path
   * @param {} actor
   * @param {} isCanceled
   */
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