qx.Class.define('cv.plugins.diagram.Info', {
  extend: cv.plugins.diagram.AbstractDiagram,
  include: [cv.role.Update],

  /*
   ******************************************************
   CONSTRUCTOR
   ******************************************************
   */
  construct: function(props) {
    this.base(arguments, props);
    this._init = false;
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
    cv.xml.Parser.addHandler("diagram_info", cv.plugins.diagram.Info);
    cv.xml.Parser.addHook("diagram_info", "after", cv.plugins.diagram.AbstractDiagram.afterParse, cv.plugins.diagram.AbstractDiagram);
    cv.ui.structure.WidgetFactory.registerClass("diagram_info", statics);
  }
});