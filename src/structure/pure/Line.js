/* Line.js 
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
 * A line tag is used to display a horizontal line in the browser to allow for a grouped and thereby tidy display of
 * elements on one page. To specify the width of the line an optional &lt;layout/&gt;-child can be added.
 *
 * @widget_example <settings selector="hr">
 *   <caption>A line tag which uses 50% of the screen size (6 of 12 available columns)</caption>
 * </settings>
 * <line><layout colspan="6"/></line>
 *
 * @module structure/pure/Line
 * @requires structure/pure
 * @author Christian Mayer
 * @since 0.8.0 (2012)
 */
define( ['_common'], function( design ) {
  "use strict";
  var basicdesign = design.basicdesign;
  
  design.basicdesign.addCreator('line', {
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
    create:     function( element, path, flavour, type ) {
      var
        $e = $(element),
        classes = basicdesign.setWidgetLayout( $e, path ),
        ret_val = '<hr ' + (classes ? 'class="'+classes+'"' : '') + '/>';
      templateEngine.widgetDataInsert( path, {
        path: path
      });
      return ret_val;
    }
  });
}); // end define