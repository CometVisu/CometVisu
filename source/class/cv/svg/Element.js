qx.Class.define('cv.svg.Element', {
  extend: qx.html.Element,
  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function (tagName) {
    this.base(arguments);
    this.__svgElement = document.createElementNS('http://www.w3.org/2000/svg', tagName);
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _createDomElement : function() {
      return this.__svgElement;
    },
    getDomElement : function() {
      return this.__svgElement;
    }
  },

  destruct : function() {
    this.__svgElement.$$widget = null;
    this.__svgElement = null;
  }
});
