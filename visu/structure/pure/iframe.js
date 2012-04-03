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

VisuDesign.prototype.addCreator('iframe', {
  create: function( page, path ) {
    var $p = $(page);
    var ret_val = $('<div class="widget iframe" />');
    ret_val.setWidgetLayout($p);
    ret_val.append( '<div class="label">' + page.textContent + '</div>' );
    var style = '';
    if( $p.attr('width' ) ) {
      style += 'width:'  + $p.attr('width' ) + ';'; 
    } else {  // default width is 100% of widget space (fix bug #3175343 part 1)
      style += 'width: 100%;';
    }
    if( $p.attr('height') ) style += 'height:' + $p.attr('height') + ';';
    if( $p.attr('frameborder') == 'false' ) style += 'border: 0px ;';
    if( $p.attr('background') ) style += 'background-color:' + $p.attr('background') + ';';
    if( style != '' ) style = 'style="' + style + '"';
    var actor = '<div class="actor"><iframe src="' +$p.attr('src') + '" ' + style + '></iframe></div>';
    
    var refresh = $p.attr('refresh') ? $p.attr('refresh')*1000 : 0;
    ret_val.append( $(actor).data( {
      'refresh': refresh
    } ).each(setupRefreshAction) ); // abuse "each" to call in context...
    return ret_val;
  },
  attributes: {
    src:         { type: 'uri'    , required: true  },
    width:       { type: 'string' , required: false },
    height:      { type: 'string' , required: false },
    frameborder: { type: 'list'   , required: false, list: {'true': "yes", 'false': "no"} },
    background:  { type: 'string' , required: false },
    refresh:     { type: 'numeric', required: false },
    colspan:     { type: 'numeric', required: false },
    rowspan:     { type: 'numeric', required: false }
  },
  elements: {
    label: { type: 'string',    required: false, multi: false }
  },
  content: false
});