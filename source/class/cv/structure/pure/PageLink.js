/* Page.js 
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
 * PageLink Widget for visible pages
 *
 * @class cv.structure.pure.PageLink
 */
qx.Class.define('cv.structure.pure.PageLink', {
  extend: cv.structure.pure.AbstractWidget,

  /*
   ******************************************************
   PROPERTIES
   ******************************************************
   */
  properties: {
    name : {
      check: "String"
    },
    wstyle : {
      check: "String",
      init: ''
    },
    address : {
      check: "Object",
      init: {}
    }
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    getDomString: function() {
      var layout = this.getLayout();

      var style = qx.lang.Type.isObject(layout) ? '' : 'style="' + cv.xml.Parser.extractLayout(layout, this.getPageType()) + '"';

      var ret_val = '<div class="widget clearfix link pagelink ' + this.getClasses() + '" ' + style + '>';
      ret_val += '<div class="actor" ' + this.getWstyle() + '><a href="javascript:">' + this.getName() + '</a></div>';
      ret_val += '</div>';
      return ret_val;
    },

    action: function() {
      cv.TemplateEngine.getInstance().scrollToPage( this.getPath() + '_' );
    }
  },

  defer: function() {
    cv.xml.Parser.addHandler("pagelink", cv.structure.pure.PageLink);
  }
}); // end define
