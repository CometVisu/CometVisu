/* Text.js 
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
 * The text-tag defines static (non-changing) text to be displayed on a page. The content of a &lt;label&gt; with free text.
 *
 * @widget_example <settings>
 *   <caption>Configuration example of a centered text widget</caption>
 *   <screenshot name="text_example" />
 * </settings>
 * <text align="center"><label>Example text</label></text>
 *
 * @module structure/pure/Text
 * @requires structure/pure
 * @author Christian Mayer
 * @since 0.8.0 (2012)
 */
define( ['_common'], function( design ) {
  "use strict";
  var basicdesign = design.basicdesign;
  
  design.basicdesign.addCreator('text', {
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
    create : function(element, path, flavour, type) {
      var $e = $(element);

      // create the main structure
      var ret_val = basicdesign.createDefaultWidget( 'text', $e, path, flavour, type, this.update );

      var data = templateEngine.widgetDataInsert( path, {
        path: path
      });

      return ret_val + '</div>';
    }
  });

}); // end define
