/* Include.js 
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
 * Includes other configuration snippets. Note that this is no widget shown in your visualization it just gives
 * you the opportunity to split you configuration into multiple files. If you have a large configuration file
 * splitting it up might help to keep track of your configuration.
 *
 * @module structure/pure/Include
 * @requires structure/pure/
 * @author Christian Mayer
 * @since 0.8.0 (2012)
 */
define( ['_common'], function( design ) {
  "use strict";
  var basicdesign = design.basicdesign;
  
  design.basicdesign.addCreator('include', {
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
    create: function( page, path, flavour, type ) {
      // FIXME: the file gets requested twice, check which one can be removed
      var p = $.get( $(page).attr('src') );
      var p = $.ajax({
        url: $(page).attr('src'),
        dataType: 'xml',
        async: false
      });
      var child = (p.responseXML.childNodes[0]);
      return templateEngine.create_pages( child, path , flavour );
    }
  });

}); // end define