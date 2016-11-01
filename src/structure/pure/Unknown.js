/* Unknown.js 
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
 * Fallback widget shown when an unknown widget is defined in the configuration.
 * You must not use this one directly.
 *
 * @module structure/pure/Unknown
 * @requires structure/pure
 * @author Christian Mayer
 * @since 0.8.0 (2012)
 */
define( ['joose', '_common'], function() {
  "use strict";

  Class('cv.structure.pure.Unknown', {
    isa: cv.Object,

    my: {
      methods: {
        parse: function() {

        }
      }
    },

    methods: {
      getDomString: function () {
        return '<div class="widget clearfix">'
          + '<pre>unknown: ' + this.$$type + '</pre>'
          + '</div>';
      }
    }
  });

  // register the parser
  cv.xml.Parser.addHandler("unknown", cv.structure.pure.Unknown);
}); // end define