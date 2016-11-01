/* ImageTrigger.js 
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
 * Adds an image like the {@link structure/pure/Image} widget, but additionally the image can be changed by incoming
 * data and can send data to the backend by clicking on it.
 * There modes to react on incoming data:
 *
 * * type="show": Hides the image when incoming data == 0
 * * type="select": Changes the image by appending the incoming data to the initial configured image source,
 *   or hide it when incoming data == 0
 *
 * Example:
 * ```
 * <imagetrigger src="icon/comet" suffix="svg" sendValue="clicked" type="select">
 *  <address transform="DPT:16.001" mode="readwrite">0/0/0</address>
 * </imagetrigger>
 * ```
 * initially shows nothing. When the CometVisu receives the string '_icon' in address `0/0/0`,
 * the image `icon/comet_opt_icon.svg` is shown. When the CometVisu receives '0' on address `0/0/0`,
 * this image is hidden.
 *
 * @widget_example <settings>
 *   <screenshot name="image_trigger">
 *     <caption>Image changed by incoming data 'blue'</caption>
 *     <data address="0/0/0">blue</data>
 *   </screenshot>
 *   <screenshot name="image_trigger_changes">
 *     <caption>Image changed by incoming data 'grey'</caption>
 *     <data address="0/0/0">grey</data>
 *   </screenshot>
 * </settings>
 * <imagetrigger src="icon/CometVisu_" suffix="png" sendValue="clicked" type="select" width="45px" height="32px">
 *   <layout colspan="1" />
 *   <address transform="DPT:16.001" mode="readwrite">0/0/0</address>
 * </imagetrigger>
 *
 * @widget_example <settings>
 *   <caption>Disable layout width by settings it to '0', to have widget with == image width</caption>
 *   <screenshot name="image_trigger_colspan0">
 *     <data address="0/0/0">1</data>
 *   </screenshot>
 * </settings>
 * <imagetrigger src="icon/CometVisu_orange" suffix="png" sendValue="clicked" type="show" width="45px" height="32px">
 *   <layout colspan="0" />
 *   <address transform="DPT:1.001" mode="readwrite">0/0/0</address>
 * </imagetrigger>
 *
 * @module structure/pure/ImageTrigger
 * @requires structure/pure
 * @author Christian Mayer
 * @since 0.8.0 (2012)
 */
define( ['_common',
  'lib/cv/role/Operate',
  'lib/cv/role/Refresh',
  'lib/cv/role/Update',
  'lib/cv/MessageBroker',
  'lib/cv/role/HasAddress'], function() {
  "use strict";

  Class('cv.structure.pure.ImageTrigger', {
    isa: cv.structure.pure.AbstractWidget,
    does: [
      cv.role.Operate,
      cv.role.HasAddress,
      cv.role.HasAnimatedButton,
      cv.role.Refresh,
      cv.role.Update
    ],

    has: {
      height: {is: 'r', init: 0},
      updateType: {is: 'r', init: ''},
      width: {is: 'r', init: '100%'},
      src: { is: 'r' },
      suffix: { is: 'r' },
      sendValue: { is: 'rw', default: ''}
    },

    my : {
      methods: {
        getAttributeToPropertyMappings: function () {
          return {
            'height' : { target: 'sendValue', default: 0 },
            'type'  : { target: 'updateType', default: '' },
            'src': { },
            'suffix': { },
            'sendValue': { default: ''}
          };
        },
        getDefaultClasses: function(type) {
          // additional image class
          return 'widget clearfix image '+type.toLowerCase();
        }
      }
    },

    augment: {
      getDomString: function () {

        var style = "";
        if (!$.isEmptyObject(this.getLayout())) {
          style += this.extractLayout(this.getLayout(), this.getPageType());
        }
        if (this.getHeight()) {
          style += 'height:' + this.getHeight() + ';';
        }
        if (style.length > 0) {
          style = ' style="'+style+'"';
        }

        var actor = '<div class="actor">';
        if ( this.getUpdateType() == 'show' ) {
          actor += '<img src="' + this.getSrc() + '.' + this.getSuffix() + '"' + style.trim() + ' />';
        }
        else {
          actor += '<img src=""' + style + ' />';
        }

        actor += '</div>';
        return actor;
      }
    },

    methods: {

      handleUpdate: function(value) {
        var imageChildren = this.getDomElement().find("img");
        if (this.getUpdateType() == "show") {
          if (value == 0) {
            imageChildren.hide();
          }
          else {
            imageChildren.attr("src", this.getSrc() + '.' + this.getSuffix()).show();
          }
        }
        else if (this.getUpdateType() == "select") {
          if (value == 0) {
            imageChildren.hide();
          }
          else {
            imageChildren.attr("src", this.getSrc() + value + '.' + this.getSuffix()).show();
          }
        }

        //TODO: add value if mapping exists
        //TODO: get image name from mapping
        //TODO: add bitmask for multiple images
        //TODO: add SVG-magics
      },

      action: function( path, actor, isCanceled ) {
        if (isCanceled) return;

        if (this.getSendValue() == "") return;
        var addresses = this.getAddress();

        for (var addr in addresses) {
          if (!(addresses[addr][1] & 2)) {
            continue; // skip when write flag not set
          }
          templateEngine.visu.write( addr, this.applyTransformEncode(addr, this.getSendValue() ) );
        }
      }
    }
  });
  // register the parser
  cv.xml.Parser.addHandler("imagetrigger", cv.structure.pure.ImageTrigger);
}); // end define