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
      "qx.test.html.ExampleElement$b1$b2": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("qx.test.html.ExampleElement$b1", {
    extend: qx.html.Element,
    construct: function construct() {
      qx.html.Element.constructor.call(this);
      this.setAttribute("id", "elem-b1");
      this.add(this.getQxObject("b2"));
    },
    members: {
      _createQxObjectImpl: function _createQxObjectImpl(id) {
        {
          var _qx$core$MObjectId;
          var object = (_qx$core$MObjectId = qx.core.MObjectId).handleObjects.apply(_qx$core$MObjectId, [qx.test.html.ExampleElement$b1, this].concat(Array.prototype.slice.call(arguments)));
          if (object !== undefined) {
            return object;
          }
        }
        switch (id) {
          case "b2":
            {
              return new qx.test.html.ExampleElement$b1$b2();
            }
        }
        return qx.test.html.ExampleElement$b1.superclass.prototype._createQxObjectImpl.call(this, id);
      }
    }
  });
  qx.test.html.ExampleElement$b1.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ExampleElement$b1.js.map?dt=1726089054128