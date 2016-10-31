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
define( ['_common'], function() {
  "use strict";

  Class('cv.structure.pure.Include', {
    isa: cv.structure.pure.AbstractBasicWidget,

    does: cv.role.HasChildren,

    has : {
      maturity : { is: 'r', init: cv.structure.pure.AbstractBasicWidget.my.Maturity.development},

      methods: {
        parse: function( page, path, flavour, pageType ) {
          // TODO: needs to be tested
          var p = $.ajax({
            url: $(page).attr('src'),
            dataType: 'xml',
            async: false
          });
          var child = (p.responseXML.childNodes[0]);
          templateEngine.create_pages( child, path , flavour );
        }
      }
    },

    methods: {
      getDomString: function () {
        return '';
      }
    }
  });
  // register the parser
  cv.xml.Parser.addHandler("include", cv.structure.pure.Include);
}); // end define