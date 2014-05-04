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
  create: function( element, path, flavour, type ) {
    var $e = $(element);
    var ret_val = $('<div class="widget clearfix group" />');
    if( $e.attr('flavour') ) flavour = $e.attr('flavour');// sub design choice
    var hstyle  = '';                                     // heading style
    if( $e.attr('align') ) hstyle += 'text-align:' + $e.attr('align') + ';';
    if( hstyle != '' ) hstyle = 'style="' + hstyle + '"';
    basicdesign.setWidgetLayout( ret_val, $e );
    if ($e.attr('nowidget')=='true') {
      ret_val.removeClass('widget');
    }
    if ( $e.attr('class') ) {
      ret_val.addClass('custom_'+$e.attr('class'));
    }
    var childs = $e.children().not('layout');
    var container = $( '<div class="clearfix"/>' );
    if( $e.attr('name') ) container.append( '<h2 ' + hstyle + '>' + $e.attr('name') + '</h2>' );
    $( childs ).each( function(i){
        container.append( templateEngine.create_pages( childs[i], path + '_' + i, flavour ) );
    } );
    if( flavour ) ret_val.addClass( 'flavour_' + flavour );

    if ( $e.attr('target') )  {
      var target = $e.attr('target') ? $e.attr('target') : '0';
      ret_val.addClass('clickable');
      ret_val.data( {
        'type'    : 'pagejump',
        'target'  : target
      } ).bind( 'click', this.action );
      templateEngine.setWidgetStyling(ret_val, target);
    }

    ret_val.append( container );
    return ret_val;
  },
  action: function () {
    var data = $(this).data();
    if (data.target != 0) templateEngine.scrollToPage( data.target );
  } 
});
