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
 * @widgetexample
 * <image src="icon/CometVisu_orange.png" width="45px" height="32px">
 *   <layout colspan="2" />
 * </image>
 *
 * @author Christian Mayer
 * @since 0.8.0 (2012)
 */
qx.Class.define('cv.structure.pure.Image', {
  extend: cv.structure.AbstractWidget,

  include: cv.role.Refresh,

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    width   : { check: "String", nullable: true },
    height  : { check: "String", nullable: true },
    src     : { check: "String", init: "" },
    widthFit: { check: "Boolean", init: false }
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    // overridden
    _getInnerDomString: function () {
      // create the actor
      var imgStyle = '';
      if (this.getWidth()) {
        imgStyle += 'width:' + this.getWidth() + ';';
      }
      if (this.getWidthFit() === true) {
        imgStyle += 'max-width:100%;';
      }
      if (this.getHeight()) {
        imgStyle += 'height:' + this.getHeight() + ';';
      }
      var src = this.getSrc();
      var parsedUri = qx.util.Uri.parseUri(this.getSrc());
      if (!parsedUri.protocol &&  !this.getSrc().startsWith("/")) {
        // is relative URI, use the ResourceManager
        src = qx.util.ResourceManager.getInstance().toUri(this.getSrc())
      }
      return '<div class="actor"><img src="' + src + '" style="' + imgStyle + '" /></div>';
    }
  },

  defer: function(statics) {
    cv.structure.WidgetFactory.registerClass("image", statics);
  }
});
