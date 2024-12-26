(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.ui.layout.Grow": {
        "construct": true
      },
      "qx.ui.form.TextField": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("qx.test.ui.core.AppearanceTest", {
    extend: qx.ui.core.Widget,
    construct: function construct() {
      qx.ui.core.Widget.constructor.call(this);
      this._setLayout(new qx.ui.layout.Grow());
    },
    members: {
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        if (id == "text" || id == "text2") {
          var control = new qx.ui.form.TextField("affe");
          this._add(control);
          return control;
        }
        return qx.test.ui.core.AppearanceTest.superclass.prototype._createChildControlImpl.call(this, id);
      }
    }
  });
  qx.test.ui.core.AppearanceTest.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AppearanceTest.js.map?dt=1735222431029