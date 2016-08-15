/* Video.js 
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
 * @module structure/pure/Video
 * @requires structure/pure
 * @author Christian Mayer
 * @since 2012
 */
define( ['_common'], function( design ) {
  "use strict";
  var basicdesign = design.basicdesign;
  
  design.basicdesign.addCreator('video', {
  /**
   * Description
   * @method create
   * @param {} element
   * @param {} path
   * @param {} flavour
   * @param {} type
   * @return ret_val
   */
  create: function( element, path, flavour, type ) {
    var $e = $(element);
    
    // create the main structure
    var ret_val = basicdesign.createDefaultWidget( 'video', $e, path, flavour, type );
    // and fill in widget specific data
    var data = templateEngine.widgetDataInsert( path, {
      'width'   : $e.attr('with'),
      'height'  : $e.attr('height'),
      'src'     : $e.attr('src'),
      'autoplay': $e.attr('autoplay')
    } );
    
    // create the actor
    var style = '';
    if( data.width  ) style += 'width:'  + data.width  + ';';
    if( data.height ) style += 'height:' + data.height + ';';
    if( style != '' ) style = 'style="' + style + '"';
    var autoplay = (data.autoplay === 'true') ? ' autoplay="autoplay"' : '';
    var actor = '<div class="actor"><video src="' +$e.attr('src') + '" ' + style + autoplay + '  controls="controls" /></div>';
    ret_val += actor + '</div>';
    
    return ret_val;
  }
});

}); // end define