/* Info.js 
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
 *
 * @widget_example <settings>
 *   <caption>Show temperature in degree celcius</caption>
 *   <screenshot name="info_temp">
 *     <data address="0/0/0">19</data>
 *   </screenshot>
 * </settings>
 * <info format="%.1f °C">
 *   <label>outside temperature</label>
 *   <address transform="DPT:9.001">0/0/0</address>
 * </info>
 *
 * @module structure/pure/Info
 * @requires structure/pure
 * @author Christian Mayer
 * @since 0.8.0 (2012)
 */
define( ['_common'], function( design ) {
  "use strict";
  var basicdesign = design.basicdesign;
 
  design.basicdesign.addCreator('info', {
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

      // create the main structure
      var ret_val = basicdesign.createDefaultWidget( 'info', $e, path, flavour, type, this.update );

      // create the actor
      var actor = '<div class="actor"><div class="value">-</div></div>';
      ret_val += actor;

      return ret_val + '</div>';
    },

    /**
     * Handles updates of incoming data for this widget
     * @method update
     * @param {String} address - Source address of the incoming data
     * @param {String} value - Incoming data
     */
    update:   function( address, value ) {
      var element = $(this);
      basicdesign.defaultUpdate( address, value, element, true, element.parent().attr('id') );
    },

    update3d: design.basicdesign.defaultUpdate3d
  });

}); // end define
