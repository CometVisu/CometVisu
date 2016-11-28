/* AbstractBasicWidget.js 
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
 * @class cv.structure.pure.AbstractBasicWidget
 */
qx.Class.define('cv.structure.pure.AbstractBasicWidget', {
  extend: cv.Object,
  type: "abstract",

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct: function(props) {
    this.set(props);
  },

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    // Define ENUM of maturity levels for features, so that e.g. the editor can
    // ignore some widgets when they are not supported yet
    Maturity : {
      release: 0,
      development: 1
    },

    parse: function (element, path, flavour, pageType) {
      return cv.data.Model.getInstance().setWidgetData( path, {
        'path': path,
        '$$type': cv.xml.Parser.getElementType(element),
        'pageType': pageType
      });
    }
  },

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    path : {
      check: "String"
    },
    $$type : {
      check: "String"
    },
    pageType  : {
      check: ["text", "2d", "3d"],
      init: "text"
    },
    parentWidget: {
      check: "cv.structure.pure.AbstractBasicWidget",
      init: null
    }
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {

    /**
     * Returns the DOMElement of this widget
     */
    getDomElement: function() {
      return qx.bom.Selector.query('#'+this.getPath())[0];
    },

    getDomString : function() {
      return this.INNER();
    }
  }
});
