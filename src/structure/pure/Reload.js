/* Reload.js 
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
 * @module structure/pure/Reload
 * @requires structure/pure
 * @author Christian Mayer
 * @since 2014
 */
define( ['_common'], function( design ) {
  "use strict";
  var basicdesign = design.basicdesign;
  
  design.basicdesign.addCreator('reload', {
  /**
   * Description
   * @method create
   * @param {} element
   * @param {} path
   * @param {} flavour
   * @param {} type
   * @return Literal
   */
  create: function( element, path, flavour, type ) {
    var 
      e = $(element),
      address = basicdesign.makeAddressList(e, null);
    templateEngine.widgetDataInsert( path, {
      address: address,
      path: path
    });
    return '';
  },
  /**
   * Description
   * @method update
   * @param {} ga
   * @param {} d
   */
  update: function( ga, d ) {
    var
      data    = templateEngine.widgetDataGetByElement( this ),
      value   = templateEngine.transformDecode( data['address'][ ga ][0], d );
    if (value > 0) {
      window.location.reload(true);
    }
  }
});

}); // end define
