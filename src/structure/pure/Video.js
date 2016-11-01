/* Video.js 
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
 * @module structure/pure/Video
 * @requires structure/pure
 * @author Christian Mayer
 * @since 2012
 */
define( ['_common', 'lib/cv/role/Refresh'], function() {
  "use strict";

  Class('cv.structure.pure.Video', {
    isa: cv.structure.pure.AbstractWidget,

    has: {
      width   : { is: 'r' },
      height  : { is: 'r' },
      src     : { is: 'r' },
      autoplay: { is: 'r', init: false }
    },

    my : {
      methods: {
        getAttributeToPropertyMappings: function () {
          return {
            'width'       :   {},
            'height'      :   {},
            'src'         :   {},
            'autoplay'    :   { target: 'autoplay', transform: function(value) {
              return value === "true";
            }}
          };
        }
      }
    },

    methods: {
      getDomString: function () {
        // create the actor
        var style = '';
        if (this.getWidth()) {
          style += 'width:'  + this.getWidth() + ';';
        }
        if (this.getHeight()) {
          style += 'height:' + this.getHeight() + ';';
        }
        if( style != '' ) style = 'style="' + style + '"';
        var autoplay = (this.getAutoplay() === true) ? ' autoplay="autoplay"' : '';
        return '<div class="actor"><video src="' +this.getSrc() + '" ' + style + autoplay + '  controls="controls" /></div>';
      }
    }
  });
  // register the parser
  cv.xml.Parser.addHandler("video", cv.structure.pure.Video);
}); // end define