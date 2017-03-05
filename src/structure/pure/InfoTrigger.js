/* InfoTrigger.js 
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
 * @module structure/pure/InfoTrigger
 * @author Christian Mayer
 * @since 2012
 */
define( ['_common'], function( design ) {
  "use strict";
  var basicdesign = design.basicdesign;
 
  design.basicdesign.addCreator('infotrigger', {
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
    /**
     * Description
     * @method makeAddressListFn
     * @param {} src
     * @param {} transform
     * @param {} mode
     * @param {} variant
     * @return ArrayExpression
     */
    var makeAddressListFn = function( src, transform, mode, variant ) {
      // Bit 0 = short, Bit 1 = button => 1|2 = 3 = short + button
      return [ true, variant == 'short' ? 1 : (variant == 'button' ? 2 : 1|2) ];
    }
    var ret_val = basicdesign.createDefaultWidget( 'infotrigger', $e, path, flavour, type, this.update, makeAddressListFn );
    // and fill in widget specific data
    var data = templateEngine.widgetDataInsert( path, {
      'downvalue'     : $e.attr('downvalue' )            || 0,
      'shortdownvalue': $e.attr('shortdownvalue')        || 0,
      'downlabel'     : $e.attr('downlabel')                 ,
      'upvalue'       : $e.attr('upvalue' )              || 0,
      'shortupvalue'  : $e.attr('shortupvalue')          || 0,
      'uplabel'       : $e.attr('uplabel')                   ,
      'shorttime'     : parseFloat($e.attr('shorttime')) || -1,
      'isAbsolute'    : ($e.attr('change')               || 'relative') == 'absolute',
      'min'           : parseFloat($e.attr('min'))       || 0,
      'max'           : parseFloat($e.attr('max'))       || 255,
      'align'         : $e.attr('align')
    } );

    // create buttons + info
    ret_val += '<div style="float:left;">';

    var actordown = '<div class="actor switchUnpressed downlabel" ';
    if ( data.align ) 
      actordown += 'style="text-align: ' + data.align + '" '; 
    actordown += '>';
    actordown += '<div class="label">' + (data.downlabel || '-') + '</div>';
    actordown += '</div>';

    var actorup = '<div class="actor switchUnpressed uplabel" ';
    if ( data.align ) 
      actorup += 'style="text-align: ' + data.align + '" '; 
    actorup += '>';
    actorup += '<div class="label">' + (data.uplabel || '+') + '</div>';
    actorup += '</div>';

    var actorinfo = '<div class="actor switchInvisible" ';
    if ( data.align ) 
      actorinfo += 'style="text-align: ' + data.align + '" '; 
    actorinfo += '><div class="value">-</div></div>';

    switch ($e.attr('infoposition')) {
      case 'middle':
        ret_val += actordown;
        ret_val += actorinfo;
        ret_val += actorup;
        break;
      case 'right':
        ret_val += actordown;
        ret_val += actorup;
        ret_val += actorinfo;
        break;
      default:
        ret_val += actorinfo;
        ret_val += actordown;
        ret_val += actorup;
        break;
    }

    return ret_val+ '</div></div>';
  },

  /**
   * Description
   * @method update
   * @param {} ga
   * @param {} d
   */
  update: function( ga, d ) { 
    var element = $(this);
    var value = basicdesign.defaultUpdate( ga, d, element, true, element.parent().attr('id') );
  },
  downaction: basicdesign.defaultButtonDownAnimation,
  /**
   * Description
   * @method action
   * @param {} path
   * @param {} actor
   * @param {} isCanceled
   */
  action: function( path, actor, isCanceled ) {
    basicdesign.defaultButtonUpAnimation( path, actor );
    if( isCanceled ) return;

    var
      isDown     = actor.classList.contains('downlabel'),
      data       = templateEngine.widgetDataGet( path ),
      buttonDataValue      = data[ isDown ? 'downvalue'      : 'upvalue'      ],
      buttonDataShortvalue = data[ isDown ? 'shortdownvalue' : 'shortupvalue' ],
      isShort = Date.now() - templateEngine.handleMouseEvent.downtime < data.shorttime,
      value = isShort ? buttonDataShortvalue : buttonDataValue,
      bitMask = (isShort ? 1 : 2);
      
    if( data.isAbsolute )
    {
      value = parseFloat(data.basicvalue);
      if( isNaN( value ) )
        value = 0; // anything is better than NaN...
      value = value + parseFloat(isShort ? buttonDataShortvalue : buttonDataValue);
      if (value < data.min ) value = data.min;
      if( value > data.max ) value = data.max;
    }
    for( var addr in data.address )
    {
      if( !(data.address[addr][1] & 2) ) continue; // skip when write flag not set
      if (data.address[addr][2] & bitMask) {
        templateEngine.visu.write( addr, templateEngine.transformEncode( data.address[addr][0], value ) );
      }
    }
  }
});

}); // end define