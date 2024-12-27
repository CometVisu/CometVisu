(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "require": true
      },
      "qx.log.Logger": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  qx.Class.define("qx.test.log.fixture.ClassA", {
    extend: qx.core.Object,
    construct: function construct() {
      this._callCountApplyOldProperty = 0;
      this._callCountApplyNewProperty = 0;
      qx.log.Logger.deprecateMethodOverriding(this, qx.test.log.fixture.ClassA, "_applyOldProperty");
    },
    properties: {
      oldProperty: {
        init: "oldProperty",
        apply: "_applyOldProperty"
      },
      newProperty: {
        init: "newProperty",
        apply: "_applyNewProperty"
      }
    },
    members: {
      _callCountApplyOldProperty: null,
      _callCountApplyNewProperty: null,
      _applyOldProperty: function _applyOldProperty() {
        this._callCountApplyOldProperty++;
      },
      _applyNewProperty: function _applyNewProperty() {
        this._callCountApplyNewProperty++;
      },
      getCallCountApplyOldProperty: function getCallCountApplyOldProperty() {
        return this._callCountApplyOldProperty;
      },
      getCallCountApplyNewProperty: function getCallCountApplyNewProperty() {
        return this._callCountApplyNewProperty;
      }
    }
  });
  qx.test.log.fixture.ClassA.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ClassA.js.map?dt=1735341779157