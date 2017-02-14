qx.Class.define('cv.plugins.diagram.Info', {
  extend: cv.plugins.diagram.AbstractDiagram,
  include: [cv.ui.common.Update],

  /*
   ******************************************************
   CONSTRUCTOR
   ******************************************************
   */
  construct: function(props) {
    this._init = false;
    this.base(arguments, props);
  },

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    /**
     * Parses the widgets XML configuration and extracts the given information
     * to a simple key/value map.
     *
     * @param xml {Element} XML-Element
     * @param path {String} internal path of the widget
     * @param flavour {String} Flavour of the widget
     * @param pageType {String} Page type (2d, 3d, ...)
     */
    parse: function (xml, path, flavour, pageType) {
      var data = cv.plugins.diagram.AbstractDiagram.parse(xml, path, flavour, pageType);
      cv.parser.WidgetParser.parseAddress(xml, path);
      cv.parser.WidgetParser.parseFormat(xml, path);
      return data;
    }
  },


  /*
   ******************************************************
   MEMBERS
   ******************************************************
   */
  members: {
    _getInnerDomString: function() {
      return '<div class="actor clickable switchUnpressed"><div class="value">-</div></div>';
    },
    _update: function(address, data) {
      if (address !== undefined && data !== undefined) {
        return this.defaultUpdate(address, data, this.getDomElement(), true, this.getPath());
      }
    }
  },

  defer: function(statics) {
    // register the parser
    cv.parser.WidgetParser.addHandler("diagram_info", statics);
    cv.ui.structure.WidgetFactory.registerClass("diagram_info", statics);
  }
});