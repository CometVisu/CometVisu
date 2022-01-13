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
  qx.Class.define('cv.svg.Element', {
    extend: qx.html.Element,

    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct(tagName) {
      qx.html.Element.constructor.call(this);
      this.__P_512_0 = document.createElementNS('http://www.w3.org/2000/svg', tagName);
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _createDomElement: function _createDomElement() {
        return this.__P_512_0;
      },
      getDomElement: function getDomElement() {
        return this.__P_512_0;
      }
    },
    destruct: function destruct() {
      this.__P_512_0.$$widget = null;
      this.__P_512_0 = null;
    }
  });
  cv.svg.Element.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Element.js.map?dt=1642098066397