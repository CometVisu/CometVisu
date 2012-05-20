/* text.js (c) 2012 by Christian Mayer [CometVisu at ChristianMayer dot de]
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

basicdesign.addCreator('text', {
  create: function( element, path, flavour, type ) {
    var $e = $(element);
    var layout = $e.children('layout')[0];
    var style = layout ? 'style="' + extractLayout( layout, type ) + '"' : '';
    var ret_val = $('<div class="widget clearfix text" ' + style + '/>');
    ret_val.setWidgetLayout($e);
    var style = '';
    if( $e.attr('align') ) style += 'text-align:' + $e.attr('align') + ';';
    if( style != '' ) style = 'style="' + style + '"';
    var $div = $( '<div ' + style + '></div>' );
    $e.contents().each( function(){
      var $v = $(this);
      if( $v.is('icon') )
      {
        var i = icons.getIcon( $v.attr('name'), $v.attr('type'), flavour );
        if( i ) $div.append( i.clone() );
      } else
        $div.append( this.textContent );
    });
    ret_val.append( $div );
    return ret_val;
  },
  attributes: {
    align:   { type: 'string' , required: false },
    colspan: { type: 'numeric', required: false },
    rowspan: { type: 'numeric', required: false }
  },
  elements: {
    layout:  { type: 'layout' , required: false, multi: false }
  },
  content:   { type: 'string', required: true }
});