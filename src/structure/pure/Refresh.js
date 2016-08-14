/* Refresh.js 
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
 * @module structure/pure/Refresh
 * @requires structure/pure
 * @author Christian Mayer
 * @since 2014
 */
define( ['_common'], function( design ) {
  "use strict";
  var basicdesign = design.basicdesign;
  
  design.basicdesign.addCreator('refresh', {
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
    var ret_val = basicdesign.createDefaultWidget( 'refresh', $e, path, flavour, type, null );
    
    ret_val += '<div class="actor switchUnpressed"><div class="value">-</div></div>';
    
    var data = templateEngine.widgetDataGet( path );
    data.value = $e.attr('value');
    
    // initially setting a value
    templateEngine.postDOMSetupFns.push( function(){
      basicdesign.defaultUpdate( undefined, data.value, $('#'+path), true, path );
    });
    
    return ret_val + '</div>';
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
    
    templateEngine.visu.restart();
  }
});

}); // end define