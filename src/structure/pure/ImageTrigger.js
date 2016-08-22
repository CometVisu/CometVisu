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
 *  * type="show": Hides the image when incoming data == 0
 *  * type="select": Changes the image by appending the incoming data to the initial configured image source,
 *  or hide it when incoming data == 0
 *  Example:
 *  ```
 *  <imagetrigger src="icon/comet" suffix="svg" sendValue="clicked" type="select">
 *   <address transform="DPT:16.001" mode="readwrite">0/0/0</address>
 *  </imagetrigger>
 *  ```
 *  initially shows nothing. When the CometVisu receives the string '_icon' in address `0/0/0`,
 *  the image `icon/comet_opt_icon.svg` is shown. When the CometVisu receives '0' on address `0/0/0`,
 *  this image is hidden.
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
define( ['_common'], function( design ) {
  "use strict";
  var basicdesign = design.basicdesign;
  
  design.basicdesign.addCreator('imagetrigger', {
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
      var
        $e = $(element),
        classes = basicdesign.setWidgetLayout( $e, path );
      classes += ' imagetrigger';
      if( $e.attr('flavour') ) flavour = $e.attr('flavour');// sub design choice
      if( flavour ) classes += ' flavour_' + flavour;
      var ret_val = '<div class="widget clearfix image '+classes+'">';
      ret_val += basicdesign.extractLabel( $e.find('label')[0], flavour );
      var address = basicdesign.makeAddressList($e, null, path);
      var width = $e.attr('width') || "100%";
      var layout = basicdesign.parseLayout( $e.children('layout')[0], {width:width} );
      var style = "";
      if (!$.isEmptyObject(layout)) {
        style += basicdesign.extractLayout(layout, type);
      }
      if ($e.attr('height')) {
        style += 'height:' + $e.attr('height') + ';';
      }
      if (style.length > 0) {
        style = 'style="'+style+'"';
      }
      var actor = '<div class="actor">';
      if ( $e.attr('type')=='show' )
        actor += '<img src="' + $e.attr('src') + '.' + $e.attr('suffix') + '" ' + style + ' />';
      else
        actor += '<img src="" ' + style + ' />';

      actor += '</div>';

      actor += '</div>';
      var refresh = $e.attr('refresh') ? $e.attr('refresh')*1000 : 0;
      var data = templateEngine.widgetDataInsert( path, {
        'path'    : path,
        'address':   address,
        'refresh':   refresh,
        'layout' :   layout,
        'width'  : $e.attr('width'),
        'height' : $e.attr('height'),
        'src':       $e.attr('src'),
        'suffix':    $e.attr('suffix'),
        'sendValue': $e.attr('sendValue') || "",
        'update_type':      $e.attr('type')
      } );

      if (data.refresh) {
        templateEngine.postDOMSetupFns.push( function(){
          templateEngine.setupRefreshAction( path, data.refresh );
        });
      }

      return ret_val + actor + '</div>';
    },

    /**
     * Handles updates of incoming data for this widget
     * @method update
     * @param {String} address - Source address of the incoming data
     * @param {String} value - Incoming data
     */
    update: function( address, value ) {
      var element = $(this),
        data  = templateEngine.widgetDataGetByElement( element ),
        val = templateEngine.transformDecode(data.address[ address ][0], value);

      var imageChildren = element.find("img");
      if (data.update_type == "show") {
        if (val == 0) {
          imageChildren.hide();
        }
        else {
          imageChildren.attr("src", data.src + '.' + data.suffix).show();
        }
      }
      else if (data.update_type == "select") {
        if (val == 0) {
          imageChildren.hide();
        }
        else {
          imageChildren.attr("src", data.src + val + '.' + data.suffix).show();
        }
      }

      //TODO: add value if mapping exists
      //TODO: get image name from mapping
      //TODO: add bitmask for multiple images
      //TODO: add SVG-magics
    },

    /**
     * Action performed when the image got clicked
     *
     * @method action
     * @param {String} path - Internal path of the widget
     * @param {Element} actor - DOMElement
     * @param {Boolean} isCanceled - If true the action does nothing
     */
    action: function( path, actor, isCanceled ) {
      if( isCanceled ) return;
      var
        data = templateEngine.widgetDataGet( path );
      for( var addr in data.address ) {
        if( !(data.address[addr][1] & 2) )
          continue; // skip when write flag not set
        if( data.sendValue == "" )
          continue; // skip empty
        templateEngine.visu.write( addr, templateEngine.transformEncode( data.address[addr][0], data.sendValue ) );
      }
    }
  });

}); // end define