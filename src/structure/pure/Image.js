/* Image.js 
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
 * Adds an image to your visualization. Using the auto-refresh setting this widget can be used e.g. to show
 * a camera picture.
 *
 * @widget_example
 * <image src="icon/CometVisu_orange.png" width="45px" height="32px">
 *   <layout colspan="2" />
 * </image>
 *
 * @module structure/pure/Image
 * @requires structure/pure
 * @author Christian Mayer
 * @since 0.8.0 (2012)
 */
define( ['_common', 'lib/cv/role/Refresh'], function() {
  "use strict";

  Class('cv.structure.pure.Image', {
    isa: cv.structure.pure.AbstractWidget,

    does: cv.role.Refresh,

    has: {
      width   : { is: 'r' },
      height  : { is: 'r' },
      src     : { is: 'r' },
      widthFit: { is: 'r' }
    },

    my : {
      methods: {
        getAttributeToPropertyMappings: function () {
          return {
            'width'       :   {},
            'height'      :   {},
            'src'         :   {},
            'widthfit'    :   { target: 'widthFit', transform: function(value) {
              return value === true;
            }}
          };
        }
      }
    },

    methods: {
      getDomString: function () {
        // create the actor
        var imgStyle = '';
        if (this.getWidth()) {
          imgStyle += 'width:'  + this.getWidth() + ';';
        }
        if( this.getWidthFit() === true ) {
          imgStyle += 'max-width:100%;';
        }
        if (this.getHeight()) {
          imgStyle += 'height:' + this.getHeight() + ';';
        }
        return '<div class="actor"><img src="' + this.getSrc() + '" style="' + imgStyle + '" /></div>';
      }
    }
  });
  // register the parser
  cv.xml.Parser.addHandler("image", cv.structure.pure.Image);
}); // end define
