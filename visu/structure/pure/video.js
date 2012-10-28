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
    var layout = $e.children('layout')[0];
    var style = layout ? 'style="' + extractLayout( layout, type ) + '"' : '';
    var ret_val = $('<div class="widget clearfix video" ' + style + '/>');
    ret_val.setWidgetLayout($e);
    ret_val.append( extractLabel( $e.find('label')[0] ) );
    var autoplay = ($e.attr('autoplay') && $e.attr('autoplay')=='true') ? ' autoplay="autoplay"' : '';
    var style = '';
    if( $e.attr('width' ) ) style += 'width:'  + $e.attr('width' ) + ';';
    if( $e.attr('height') ) style += 'height:' + $e.attr('height') + ';';
    if( style != '' ) style = 'style="' + style + '"';
    var actor = '<div class="actor"><video src="' +$e.attr('src') + '" ' + style + autoplay + '  controls="controls" /></div>';
    ret_val.append( $(actor).data( {} ) );
    return ret_val;
  }
});