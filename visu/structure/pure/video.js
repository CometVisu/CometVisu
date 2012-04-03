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

VisuDesign.prototype.addCreator('video', {
  create: function( page, path ) {
    var $p = $(page);
    var ret_val = $('<div class="widget clearfix video" />');
    ret_val.setWidgetLayout($p);
    var labelElement = $p.find('label')[0];
    ret_val.append( labelElement ? '<div class="label">' + labelElement.textContent + '</div>' : '' );
    var autoplay = ($p.attr('autoplay') && $p.attr('autoplay')=='true') ? ' autoplay="autoplay"' : '';
    var style = '';
    if( $p.attr('width' ) ) style += 'width:'  + $p.attr('width' ) + ';';
    if( $p.attr('height') ) style += 'height:' + $p.attr('height') + ';';
    if( style != '' ) style = 'style="' + style + '"';
    var actor = '<div class="actor"><video src="' +$p.attr('src') + '" ' + style + autoplay + '  controls="controls" /></div>';
    ret_val.append( $(actor).data( {} ) );
    return ret_val;
  },
  attributes: {
    src:      { type: 'uri'    , required: true  },
    width:    { type: 'string' , required: false },
    height:   { type: 'string' , required: false },
    autoplay: { type: 'list'   , required: true, list: {'true': "yes", 'false': "no"} },
    colspan:  { type: 'numeric', required: false },
    rowspan:  { type: 'numeric', required: false }
  },
  elements: {
    label:    { type: 'string' , required: false, multi: false }
  },
  content: false
});