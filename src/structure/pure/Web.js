/* Web.js 
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
 * @module structure/pure/Web
 * @requires structure/pure
 * @author Christian Mayer
 * @since 2012
 */
define( ['_common', 'lib/cv/role/Refresh', 'lib/cv/role/Update'], function() {
  "use strict";

  Class('cv.structure.pure.Web', {
    isa: cv.structure.pure.AbstractWidget,
    does: [
      cv.role.Update,
      cv.role.Refresh
    ],

    has: {
      address: {is: 'r', init: {}},
      width: {is: 'r'},
      height: {is: 'r'},
      frameborder: {is: 'r', init: false},
      background: {is: 'r'},
      scrolling: {is: 'r'},
      src: {is: 'r'}
    },

    my: {
      methods: {
        getAttributeToPropertyMappings: function () {
          return {
            address: {},
            width: {},
            height: {},
            frameborder: {
              transform: function (value) {
                return value === "true";
              }
            },
            background: {},
            src: {},
            scrolling: {}
          };
        }
      },

      after: {
        parse: function (xml, path) {
          var data = templateEngine.widgetDataGet(path);
          var ga = $(xml).attr("ga");
          if (ga) {
            templateEngine.addAddress(ga);
            if (templateEngine.backend.substr(0, 2) == "oh") {
              data.address['_' + ga] = ['OH:number', 0];
            } else {
              data.address['_' + ga] = ['DPT:1.001', 0];
            }
          }
        }
      }
    },

    augment: {

      getDomString: function () {
        var webStyle = '';
        if (this.getWidth()) {
          webStyle += 'width:' + this.getWidth() + ';';
        } else {  // default width is 100% of widget space (fix bug #3175343 part 1)
          webStyle += 'width: 100%;';
        }
        var style = this.getStyle();
        if (this.getHeight()) webStyle += 'height:' + this.getHeight() + ';';
        if (this.getFrameborder() === false) style += 'border: 0px ;';
        if (this.getBackground()) webStyle += 'background-color:' + this.getBackground() + ';';
        if (webStyle != '') webStyle = 'style="' + webStyle + '"';

        var scrolling = '';
        if (this.getScrolling()) scrolling = 'scrolling="' + this.getScrolling() + '"'; // add scrolling parameter to iframe
        return '<div class="actor"><iframe src="' + this.getSrc() + '" ' + webStyle + scrolling + '></iframe></div>'
      }
    },

    methods: {
      /**
       * Handles the incoming data from the backend for this widget
       *
       * @method handleUpdate
       * @param value {any} incoming data (already transformed + mapped)
       */
      update: function(address, data) {
        var addr = this.getAddress()[ address ];
        switch( addr[2] )
        {
          default:
            if (data === 1) {
              var iframe = this.getDomElement().find('iframe');
              iframe.attr('src', iframe.attr('src'));
              templateEngine.visu.write( address, templateEngine.transformEncode(addr[0], 0));
            }
            break;
        }
      }
    }
  });
  // register the parser
  cv.xml.Parser.addHandler("web", cv.structure.pure.Web);
}); // end define
