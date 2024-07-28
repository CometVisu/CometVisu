(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.log.fixture.ClassB1": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("qx.test.log.fixture.ClassC1", {
    extend: qx.test.log.fixture.ClassB1,
    members: {
      _applyNewProperty: function _applyNewProperty() {
        qx.test.log.fixture.ClassC1.superclass.prototype._applyNewProperty.call(this);
        this._callCountApplyNewProperty++;
      }
    }
  });
  qx.test.log.fixture.ClassC1.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ClassC1.js.map?dt=1722151834038