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
 */


/**
 * A group can be used to group a couple of widgets and optionally surround them with a border or name the group.
 *
 * @widget_example <settings selector=".widget_container[data-type=group]">
 *  <screenshot name="group_with_border">
 *    <caption>Group with border and name</caption>
 *    <data address="0/0/0">1</data>
 *    <data address="0/0/1">21</data>
 *  </screenshot>
 *  </settings>
 *  <group name="Example Group">
 *    <layout colspan="6" />
 *    <text><label>Some Text</label></text>
 *    <switch>
 *      <layout colspan="3" />
 *      <label>Switch</label>
 *      <address transform="DPT:1.001" mode="readwrite">0/0/0</address>
 *    </switch>
 *    <info format="%.1f °C">
 *      <layout colspan="3" />
 *      <label>Temperature</label>
 *      <address transform="DPT:9.001">0/0/1</address>
 *    </info>
 *  </group>
 *
 * @widget_example <settings selector=".widget_container[data-type=group]">
 *  <screenshot name="group_without_border">
 *    <caption>Hidden Group: no border no name</caption>
 *    <data address="0/0/0">1</data>
 *    <data address="0/0/1">21</data>
 *  </screenshot>
 *  </settings>
 *  <group nowidget="true">
 *    <layout colspan="6" />
 *    <text><label>Some Text</label></text>
 *    <switch>
 *      <layout colspan="3" />
 *      <label>Switch</label>
 *      <address transform="DPT:1.001" mode="readwrite">0/0/0</address>
 *    </switch>
 *    <info format="%.1f °C">
 *      <layout colspan="3" />
 *      <label>Temperature</label>
 *      <address transform="DPT:9.001">0/0/1</address>
 *    </info>
 *  </group>
 *
 * @module structure/pure/Group
 * @requires structure/pure
 * @author Christian Mayer
 * @since 0.8.0 (2012)
 */
define( ['_common'], function( design ) {
  "use strict";
  var basicdesign = design.basicdesign;
  
  design.basicdesign.addCreator('group', {
    maturity: design.Maturity.development,
    /**
     * Creates the widget HTML code
     *
     * @method create
     * @param {Element} element - DOM-Element
     * @param {String} path - internal path of the widget
     * @param {String} flavour - Flavour of the widget
     * @param {String} type - Page type (2d, 3d, ...)
     * @return {String} HTML code
     */
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
        templateEngine.widgetDataInsert( path, {
          'bind_click_to_widget': true, // for groups with pagejumps this is mandatory
          'target'  : target
        } );
      }
      return '<div class="' + classes + '">' + container + '</div>';
    },

    /**
     * Action performed when the group got clicked. If a target is specified in the group attributes
     * the action will switch to the page defined by the target.
     *
     * @method action
     * @param {String} path - Internal path of the widget
     * @param {Element} actor - DOMElement
     * @param {Boolean} isCanceled - If true the action does nothing
     */
    action: function( path, actor, isCanceled ) {
      if( isCanceled ) {
        return;
      }
      var data = templateEngine.widgetDataGet( path );
      if (data.target != 0) {
        templateEngine.scrollToPage( data.target );
      }
    }
  });

}); // end define