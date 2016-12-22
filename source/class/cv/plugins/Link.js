/* structure_plugin.js 
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
 * This plugins integrates a simple link.
 *
 * @author Stefan Borchert [stefan@borchert.cc]
 * @since 2015
 */
qx.Class.define('cv.plugins.Link', {
  extend: cv.structure.AbstractBasicWidget,

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    cssClass: {
      check: "String",
      init: ''
    },
    text: {
      check: "String",
      init: ''
    },
    href: {
      check: "String",
      init: ''
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
        'class': {target: 'cssClass'},
        'text': {},
        'href': {}
      };
    }
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    getDomString: function () {
      var classes = "link";
      if (this.getCssClass()) {
        classes += " "+this.getCssClass();
      }
      var href = this.getHref() ? ' href="'+this.getHref()+'"' : '';
      return '<a class="'+classes+'"'+href+'>' + this.getText() + '</a>';
    }
  },

  defer: function() {
    cv.xml.Parser.addHandler("link", cv.plugins.Link);
  }
});
