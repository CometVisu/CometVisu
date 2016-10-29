/* Toggle.js 
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
 * TODO: complete docs
 *
 * @module structure/pure/Toggle
 * @requires structure/pure
 * @author Christian Mayer
 * @since 2012
 */
define( ['_common', 'lib/cv/role/Operate'], function() {
  "use strict";

  Class('cv.structure.pure.Toggle', {
    isa: cv.structure.pure.AbstractWidget,
    does: cv.role.Operate,

    my : {
      methods: {
        getAttributeToPropertyMappings: function () {
          return {};
        }
      }
    },

    augment: {
      getDomString: function () {
        return '<div class="actor switchUnpressed"><div class="value">-</div></div>';
      }
    },

    methods: {
      /**
       * Handles the incoming data from the backend for this widget
       *
       * @method handleUpdate
       * @param value {any} incoming data (already transformed + mapped)
       */
      handleUpdate: function(value) {
      },

      /**
       * Get the value that should be send to backend after the action has been triggered
       *
       * @method getActionValue
       */
      getActionValue: function () {
        return templateEngine.getNextMappedValue( this.getBasicValue(), this.getMapping() );
      },

      downaction: function(path, actor) {
        return this.defaultButtonDownAnimationInheritAction(path, actor);
      }
    }
  });
  // register the parser
  cv.xml.Parser.addHandler("toggle", cv.structure.pure.Toggle);
}); // end define