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
define( ['_common', 'lib/cv/role/Update'], function() {
  "use strict";

  Class('cv.structure.pure.Info', {
    isa: cv.structure.pure.AbstractWidget,
    does: cv.role.Update,

    augment: {
      getDomString: function () {
        return '<div class="actor"><div class="value">-</div></div>';
      }
    },

    methods: {
      handleUpdate: function(value) {
      },

      /**
       * Get the value that should be send to backend after the action has been triggered
       *
       * @method getActionValue
       */
      getActionValue: function () {
        return (this.getBasicValue() == this.getOffValue() ? this.getOnValue() : this.getOffValue());
      }
    }
  });
  // register the parser
  cv.xml.Parser.addHandler("info", cv.structure.pure.Info);
}); // end define
