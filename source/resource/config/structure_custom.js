/* structure_custom.js (c) 2010 by Christian Mayer [CometVisu at ChristianMayer dot de]
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 */

/**
 * This module defines the custom widget additions to the CometVisu visualisation.
 * @module Structure custom
*/
/*
* Custom changes could go here and look e.g. like
*
***************************************
qx.Class.define('cv.ui.structure.pure.Headline', {
  extend: cv.ui.structure.pure.AbstractWidget,

  statics: {
    // parse element from visu_config*.xml
    parse: function (xml, path, flavour, pageType) {
      var data = cv.parser.pure.WidgetParser.parseElement(this, xml, path, flavour, pageType);
      data.content = xml.textContent;
      return data;
    }
  },

  properties: {
    content: {
      check: 'String',
        init: ''
    }
  },

  members: {
    // generate the DOM string to be added to the GUI
    getDomString: function () {
      return '<h1 ' + (this.getClasses() ? 'class="'+this.getClasses()+'"' : '') + '>' + this.getContent() + '</h1>';
    }
  },

  // this function is executed when this file is loaded
  defer: function(statics) {
    // register the parser
    cv.parser.pure.WidgetParser.addHandler("headline", cv.ui.structure.pure.Headline);
    // register the widget
    cv.ui.structure.WidgetFactory.registerClass("headline", statics);
  }
});
****************************************
*/
