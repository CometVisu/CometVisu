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
      "qx.test.html.ExampleElement$b1": {},
      "qx.core.MObjectId": {},
      "qx.html.Jsx": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("qx.test.html.ExampleElement", {
    extend: qx.html.Element,
    construct: function construct() {
      qx.html.Element.constructor.call(this);
      this.add(this.getQxObject("a1"));
      this.add(this.getQxObject("b1"));
    },
    objects: {
      a1: function a1() {
        return qx.html.Jsx.createElement("div", {
          id: "elem-a1"
        }, this.getQxObject("a2"));
      },
      a2: function a2() {
        return qx.html.Jsx.createElement("div", {
          id: "elem-a2"
        }, this.getQxObject("a3"));
      },
      a3: function a3() {
        return qx.html.Jsx.createElement("div", {
          id: "elem-a3"
        }, "Group A end");
      },
      b1: function b1() {
        return new qx.test.html.ExampleElement$b1();
      }
    },
    members: {
      _createQxObjectImpl: function _createQxObjectImpl() {
        var _qx$test$html$Example;
        {
          var _qx$core$MObjectId;
          var object = (_qx$core$MObjectId = qx.core.MObjectId).handleObjects.apply(_qx$core$MObjectId, [qx.test.html.ExampleElement, this].concat(Array.prototype.slice.call(arguments)));
          if (object !== undefined) {
            return object;
          }
        }
        return (_qx$test$html$Example = qx.test.html.ExampleElement.superclass.prototype._createQxObjectImpl).call.apply(_qx$test$html$Example, [this].concat(Array.prototype.slice.call(arguments)));
      }
    }
  });
  qx.test.html.ExampleElement.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ExampleElement.js.map?dt=1717235389771