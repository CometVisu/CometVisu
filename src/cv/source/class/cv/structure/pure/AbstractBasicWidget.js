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
