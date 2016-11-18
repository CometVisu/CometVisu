/**
 * @class cv.structure.pure.AbstractBasicWidget
 */
qx.Class.define('cv.structure.pure.AbstractBasicWidget', {
  extend: cv.Object,
  type: "abstract",

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

    getElementType: function(element) {
      var type = element.nodeName.toLowerCase();
      if (type == "img") {
        // workaround for unittests (<image> gets replaced by <img>
        type = "image";
      }
      return type;
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
    path              : { },
    $$type            : { },
    $$domElement      : { },
    pageType          : { }
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
