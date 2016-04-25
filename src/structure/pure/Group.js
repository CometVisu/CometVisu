/* Group.js 
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
 *
 * @module Group 
 * @title  CometVisu Group 
 */


/**
 * @author Christian Mayer
 * @since 2012
 */
define( ['_common'], function( design ) {
  "use strict";
  var basicdesign = design.basicdesign;
  
  design.basicdesign.addCreator('group', {
  maturity: design.Maturity.development,
  create: function( element, path, flavour, type ) {
    var $e = $(element);
    var classes = 'clearfix group ' + basicdesign.setWidgetLayout( $e, path );
    if ( $e.attr('class') ) {
      classes += ' custom_' + $e.attr( 'class' );
    }
    if ($e.attr('nowidget')!=='true') classes = 'widget ' + classes;
    if( $e.attr('flavour') ) flavour = $e.attr('flavour');// sub design choice
    if( flavour ) classes += ' flavour_' + flavour;
    var hstyle  = '';                                     // heading style
    if( $e.attr('align') ) hstyle += 'text-align:' + $e.attr('align') + ';';
    if( hstyle != '' ) hstyle = 'style="' + hstyle + '"';
    var childs = $e.children().not('layout');
    var container = '<div class="clearfix">';
    if( $e.attr('name') ) container += '<h2 ' + hstyle + '>' + $e.attr('name') + '</h2>';
                              
    $( childs ).each( function(i){
      container += templateEngine.create_pages( childs[i], path + '_' + i, flavour );
    } );
    container += '</div>';

    if ( $e.attr('target') )  {
      var target = $e.attr('target') ;
      classes += ' clickable';
      var data = templateEngine.widgetDataInsert( path, {
        'bind_click_to_widget': true, // for groups with pagejumps this is mandatory
        'target'  : target
      } );
    }
    return '<div class="' + classes + '">' + container + '</div>';
  },
  action: function( path, actor, isCanceled ) {
    var data = templateEngine.widgetDataGet( path );
    if( isCanceled ) return;
    if (data.target != 0) templateEngine.scrollToPage( data.target );
  } 
});

}); // end define