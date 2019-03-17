/* Image.js 
 * 
 * copyright (c) 2010-2017, Christian Mayer and the CometVisu contributers.
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
 * <image src="resource/icon/CometVisu_orange.png" width="45px" height="32px">
 *   <layout colspan="2" />
 * </image>
 *
 * @author Christian Mayer
 * @since 0.8.0 (2012)
 */
qx.Class.define('cv.ui.structure.pure.Image', {
  extend: cv.ui.structure.AbstractWidget,

  include: cv.ui.common.Refresh,

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    width   : { check: "String", init: "100%" },
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
    __src: null,

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
      return '<div class="actor"><img src="' + this.__getSrc() + '" style="' + imgStyle + '" /></div>';
    },

    /**
     * Return the real src value
     */
    __getSrc: function() {
      if (!this.__src) {
        var src = this.getSrc();
        var parsedUri = qx.util.Uri.parseUri(this.getSrc());
        if (!parsedUri.protocol && !this.getSrc().startsWith("/")) {
          // is relative URI, use the ResourceManager
          src = qx.util.ResourceManager.getInstance().toUri(this.getSrc());
        }
        this.__src = src;
      }
      return this.__src;
    },

    // overridden
    getValueElement: function() {
      return qx.bom.Selector.query("img", this.getDomElement())[0];
    },

    // overridden
    _applyVisible: function(value) {
      var valueElem = this.getValueElement();
      if (!valueElem || this.getRefresh() > 0) {
        return;
      }
      if (value === true) {
        qx.bom.element.Attribute.set(valueElem, "src", this.__getSrc());
      } else {
        qx.bom.element.Attribute.set(valueElem, "src", "");
      }
    }
  },

  defer: function(statics) {
    cv.ui.structure.WidgetFactory.registerClass("image", statics);
  }
});
