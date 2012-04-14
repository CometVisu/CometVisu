/* iframe.js (c) 2012 by Christian Mayer [CometVisu at ChristianMayer dot de]
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

basicdesign.addCreator('iframe', {
  create: function( element, path ) {
    var $e = $(element);
    var layout = $e.find('layout')[0];
    var style = layout ? 'style="' + extractLayout( layout ) + '"' : '';
    var ret_val = $('<div class="widget iframe" ' + style + '/>');
    ret_val.setWidgetLayout($e);
    ret_val.append( '<div class="label">' + element.textContent + '</div>' );
    var iframeStyle = '';
    if( $e.attr('width' ) ) {
      iframeStyle += 'width:'  + $e.attr('width' ) + ';'; 
    } else {  // default width is 100% of widget space (fix bug #3175343 part 1)
      iframeStyle += 'width: 100%;';
    }
    if( $e.attr('height') ) iframeStyle += 'height:' + $e.attr('height') + ';';
    if( $e.attr('frameborder') == 'false' ) style += 'border: 0px ;';
    if( $e.attr('background') ) iframeStyle += 'background-color:' + $e.attr('background') + ';';
    if( iframeStyle != '' ) iframeStyle = 'style="' + iframeStyle + '"';
    var actor = '<div class="actor"><iframe src="' +$e.attr('src') + '" ' + iframeStyle + '></iframe></div>';
    
    var refresh = $e.attr('refresh') ? $e.attr('refresh')*1000 : 0;
    ret_val.append( $(actor).data( {
      'refresh': refresh
    } ).each(setupRefreshAction) ); // abuse "each" to call in context...
    return ret_val;
  },
  attributes: {
    src:         { type: 'uri'    , required: true  },
    width:       { type: 'string' , required: false }, // only for the iframe - not the widget!
    height:      { type: 'string' , required: false }, // only for the iframe - not the widget!
    frameborder: { type: 'list'   , required: false, list: {'true': "yes", 'false': "no"} },
    background:  { type: 'string' , required: false },
    refresh:     { type: 'numeric', required: false },
    colspan:     { type: 'numeric', required: false },
    rowspan:     { type: 'numeric', required: false }
  },
  elements: {
    layout:      { type: 'layout' , required: false, multi: false },
    label:       { type: 'string' , required: false, multi: false }
  },
  content: false
});