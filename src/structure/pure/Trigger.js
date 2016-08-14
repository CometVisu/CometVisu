/* Trigger.js 
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
 * @module structure/pure/Trigger
 * @requires structure/pure
 * @author Christian Mayer
 * @since 2012
 */
define( ['_common'], function( design ) {
  "use strict";
  var basicdesign = design.basicdesign;
  
  design.basicdesign.addCreator('trigger', {
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
    var 
      $e = $(element);
    
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
    var ret_val = basicdesign.createDefaultWidget( 'trigger', $e, path, flavour, type, null, makeAddressListFn );
    // and fill in widget specific data
    var data = templateEngine.widgetDataInsert( path, {
      'sendValue'  : $e.attr('value' )                || 0,
      'shorttime'  : parseFloat($e.attr('shorttime')) || -1,
      'shortValue' : $e.attr('shortvalue')            || 0
    } );
    
    // create the actor
    var actor = '<div class="actor switchUnpressed"><div class="value"></div></div>';
    
    // initially setting a value
    templateEngine.postDOMSetupFns.push( function(){
      basicdesign.defaultUpdate( undefined, data['sendValue'], $('#'+path), true, path );
    });
    return ret_val + actor + '</div>';
  },
  downaction: basicdesign.defaultButtonDownAnimationInheritAction,
  /**
   * Description
   * @method action
   * @param {} path
   * @param {} actor
   * @param {} isCanceled
   */
  action: function( path, actor, isCanceled ) {
    basicdesign.defaultButtonUpAnimationInheritAction( path, actor );
    if( isCanceled ) return;

    var 
      data = templateEngine.widgetDataGet( path ),
      isShort = Date.now() - templateEngine.handleMouseEvent.downtime < data.shorttime,
      bitMask = (isShort ? 1 : 2);
      
    for( var addr in data.address )
    {
      if (!(data.address[addr][1] & 2)) continue; // skip when write flag not set
      if (data.address[addr][2] & bitMask) {
        templateEngine.visu.write( addr, templateEngine.transformEncode( data.address[addr][0], isShort ? data.shortValue : data.sendValue ) );
      }
    }
  }
});

}); // end define