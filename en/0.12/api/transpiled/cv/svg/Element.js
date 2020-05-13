(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.html.Element": {
        "construct": true,
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("cv.svg.Element", {
    extend: qx.html.Element,

    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct(tagName) {
      qx.html.Element.constructor.call(this);
      this.__svgElement = document.createElementNS("http://www.w3.org/2000/svg", tagName);
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _createDomElement: function _createDomElement() {
        return this.__svgElement;
      },
      getDomElement: function getDomElement() {
        return this.__svgElement;
      }
    },
    destruct: function destruct() {
      this.__svgElement.$$widget = null;
      this.__svgElement = null;
    }
  });
  cv.svg.Element.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Element.js.map?dt=1589396243477