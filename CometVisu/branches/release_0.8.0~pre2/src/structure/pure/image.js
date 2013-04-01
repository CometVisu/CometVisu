/* image.js (c) 2012 by Christian Mayer [CometVisu at ChristianMayer dot de]
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

basicdesign.addCreator('image', {
  create: function( element, path, flavour, type ) {
    var $e = $(element);
    var layout = $e.children('layout')[0];
    var style = layout ? 'style="' + extractLayout( layout, type ) + '"' : '';
    var ret_val = $('<div class="widget clearfix image" ' + style + '/>');
    ret_val.setWidgetLayout($e);
    if( $e.attr('flavour') ) flavour = $e.attr('flavour');// sub design choice
    if( flavour ) ret_val.addClass( 'flavour_' + flavour );
    ret_val.append( extractLabel( $e.find('label')[0], flavour ) );
    var imgStyle = '';
    if( $e.attr('width' ) ) {
      imgStyle += 'width:'  + $e.attr('width' ) + ';';
    } else {
      imgStyle += 'width: 100%;';
    }
    if( $e.attr('height') ) imgStyle += 'height:' + $e.attr('height') + ';';
    if( imgStyle != '' ) imgStyle = 'style="' + imgStyle + '"';
    var actor = '<div class="actor"><img src="' +$e.attr('src') + '" ' + imgStyle + '/></div>';
    var refresh = $e.attr('refresh') ? $e.attr('refresh')*1000 : 0;
    ret_val.append( $(actor).data( {
      'refresh': refresh
    } ).each(templateEngine.setupRefreshAction) ); // abuse "each" to call in context...
    return ret_val;
  }
});