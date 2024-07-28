(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.log.fixture.ClassA": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("qx.test.log.fixture.ClassB2", {
    extend: qx.test.log.fixture.ClassA,
    members: {
      _applyNewProperty: function _applyNewProperty() {
        qx.test.log.fixture.ClassB2.superclass.prototype._applyNewProperty.call(this);
        this._callCountApplyNewProperty++;
      }
    }
  });
  qx.test.log.fixture.ClassB2.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ClassB2.js.map?dt=1722151834025