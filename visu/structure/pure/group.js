/* group.js (c) 2012 by Christian Mayer [CometVisu at ChristianMayer dot de]
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

basicdesign.addCreator('group', {
  maturity: Maturity.development,
  create: function( element, path, flavour ) {
    var $e = $(element);
    var ret_val = $('<div class="widget clearfix group" />');
    if( $e.attr('flavour') ) flavour = $e.attr('flavour');// sub design choice
    var hstyle  = '';                                     // heading style
    if( $e.attr('align') ) hstyle += 'text-align:' + $e.attr('align') + ';';
    if( hstyle != '' ) hstyle = 'style="' + hstyle + '"';
    ret_val.setWidgetLayout($e);
    if ($e.attr('nowidget')=='true') {
      ret_val.removeClass('widget');
    }
    var childs = $e.children();
    var container = $( '<div class="clearfix"/>' );
    if( $e.attr('name') ) container.append( '<h2 ' + hstyle + '>' + $e.attr('name') + '</h2>' );
    $( childs ).each( function(i){
        container.append( create_pages( childs[i], path + '_' + i, flavour ) );
    } );
    if( flavour ) ret_val.addClass( 'flavour_' + flavour );
    ret_val.append( container );
    return ret_val;
  },
  attributes: {
    align:    { type: 'string' , required: false },
    flavour:  { type: 'string' , required: false },
    colspan:  { type: 'numeric', required: false },
    rowspan:  { type: 'numeric', required: false },
    nowidget: { type: 'string' , required: false },
    name:     { type: 'string' , required: true  }
  },
  elements:   {},
  content:    true
});