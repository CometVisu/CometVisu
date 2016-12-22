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
 *
 *
 * @author Christian Mayer
 * @since 2012
 */
qx.Class.define('cv.structure.pure.Web', {
  extend: cv.structure.pure.AbstractWidget,
  include: [
    cv.role.Update,
    cv.role.Refresh
  ],

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {

    width: {
      check: "String",
      nullable: true
    },
    height: {
      check: "String",
      nullable: true
    },
    frameborder: {
      check: "Boolean",
      init: false
    },
    background: {
      check: "String",
      nullable: true
    },
    scrolling: {
      check: "String",
      nullable: true
    },
    src: {
      check: "String",
      nullable: true
    }
  },

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {

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
    },

    afterParse: function (xml, path) {
      var data = cv.data.Model.getInstance().getWidgetData(path);
      var ga = xml.getAttribute("ga");
      if (ga) {
        cv.data.Model.getInstance().addAddress(ga);
        if (cv.Config.backend.substr(0, 2) == "oh") {
          data.address['_' + ga] = ['OH:number', 0];
        } else {
          data.address['_' + ga] = ['DPT:1.001', 0];
        }
      }
    }
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    _getInnerDomString: function () {
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
    },

    /**
     * Handles the incoming data from the backend for this widget
     *
     *
     * @param value {any} incoming data (already transformed + mapped)
     */
    _update: function(address, data) {
      var addr = this.getAddress()[ address ];
      if (!addr) return;
      switch( addr[2] )
      {
        default:
          if (data === 1) {
            var iframe = qx.bom.Selector.query('iframe', this.getDomElement());
            qx.bom.element.Attribute.set(iframe, 'src', qx.bom.element.Attribute.get(iframe, 'src'));
            cv.TemplateEngine.getInstance().visu.write( address, cv.TemplateEngine.getInstance().transformEncode(addr[0], 0));
          }
          break;
      }
    }
  },

  defer: function() {
    // register the parser
    cv.xml.Parser.addHandler("web", cv.structure.pure.Web);
    cv.xml.Parser.addHook("web", "after", cv.structure.pure.Web.afterParse, cv.structure.pure.Web);
  }
});

