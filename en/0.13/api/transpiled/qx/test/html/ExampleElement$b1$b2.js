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
  qx.Class.define("qx.test.html.ExampleElement$b1$b2", {
    extend: qx.html.Element,
    construct: function construct() {
      qx.html.Element.constructor.call(this);
      this.setAttribute("id", "elem-b2");
      this.add(this.getQxObject("b3"));
    },
    members: {
      _createQxObjectImpl: function _createQxObjectImpl(id) {
        {
          var _qx$core$MObjectId;
          var object = (_qx$core$MObjectId = qx.core.MObjectId).handleObjects.apply(_qx$core$MObjectId, [qx.test.html.ExampleElement$b1$b2, this].concat(Array.prototype.slice.call(arguments)));
          if (object !== undefined) {
            return object;
          }
        }
        switch (id) {
          case "b3":
            {
              return qx.html.Jsx.createElement("div", {
                id: "elem-b3"
              }, "Group B end");
            }
        }
      }
    }
  });
  qx.test.html.ExampleElement$b1$b2.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ExampleElement$b1$b2.js.map?dt=1731948116064