/* video.js (c) 2012 by Christian Mayer [CometVisu at ChristianMayer dot de]
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

basicdesign.addCreator('video', {
  create: function( element, path, flavour, type ) {
    var $e = $(element);
    
    // create the main structure
    var ret_val = basicdesign.createDefaultWidget( 'video', $e, path, flavour, type );
    // and fill in widget specific data
    ret_val.data( {
      'width'   : $e.attr('with'),
      'height'  : $e.attr('height'),
      'src'     : $e.attr('src'),
      'autoplay': $e.attr('autoplay')
    } );
    var data = ret_val.data();
    
    // create the actor
    var style = '';
    if( data.width  ) style += 'width:'  + data.width  + ';';
    if( data.height ) style += 'height:' + data.height + ';';
    if( style != '' ) style = 'style="' + style + '"';
    var autoplay = (data.autoplay === 'true') ? ' autoplay="autoplay"' : '';
    var $actor = $('<div class="actor"><video src="' +$e.attr('src') + '" ' + style + autoplay + '  controls="controls" /></div>');
    ret_val.append( $actor );
    
    return ret_val;
  }
});