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
      return cv.TemplateEngine.getInstance().widgetDataInsert( path, {
        'path': path,
        '$$type': this.getElementType(element),
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
    $$domElement : { },
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
      if (!this.$$domElement) {
        this.$$domElement = qx.bom.Selector.query('#'+this.getPath())[0];
      }
      return this.$$domElement
    },

    getDomString : function() {
      return this.INNER();
    }
  }
});
