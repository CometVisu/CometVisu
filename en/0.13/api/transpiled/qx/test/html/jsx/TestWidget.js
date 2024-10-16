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
      },
      "qx.core.MObjectId": {},
      "qx.html.Jsx": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2019-2021 Zenesis Ltd, https://zenesis.com
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * John Spackman (johnspackman)
  
  ************************************************************************ */

  qx.Class.define("qx.test.html.jsx.TestWidget", {
    extend: qx.html.Element,
    construct: function construct() {
      qx.html.Element.constructor.call(this);
      this.add(this.getQxObject("header"));
      this.add(this.getQxObject("body"));
    },
    members: {
      _createQxObjectImpl: function _createQxObjectImpl(id) {
        {
          var _qx$core$MObjectId;
          var object = (_qx$core$MObjectId = qx.core.MObjectId).handleObjects.apply(_qx$core$MObjectId, [qx.test.html.jsx.TestWidget, this].concat(Array.prototype.slice.call(arguments)));
          if (object !== undefined) {
            return object;
          }
        }
        switch (id) {
          case "header":
            return qx.html.Jsx.createElement("div", {
              class: "header-class"
            });
          case "body":
            return qx.html.Jsx.createElement("div", {
              class: "body-class"
            }, this.getQxObject("labelOne"), this.getQxObject("labelTwo"));
          case "labelOne":
            return qx.html.Jsx.createElement("p", null, "Label One");
          case "labelTwo":
            return qx.html.Jsx.createElement("p", null, "Label Two");
        }
      }
    }
  });
  qx.test.html.jsx.TestWidget.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=TestWidget.js.map?dt=1729101240719