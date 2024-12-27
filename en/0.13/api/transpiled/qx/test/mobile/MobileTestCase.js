(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.dev.unit.TestCase": {
        "require": true
      },
      "qx.dev.unit.MRequirements": {
        "require": true
      },
      "qx.bom.client.Browser": {
        "require": true
      },
      "qx.dev.unit.RequirementError": {},
      "qx.core.Init": {},
      "qx.ui.mobile.core.Root": {},
      "qx.ui.mobile.core.Widget": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "browser.name": {
          "className": "qx.bom.client.Browser"
        },
        "browser.documentmode": {
          "className": "qx.bom.client.Browser"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Tino Butz (tbtz)
  
  ************************************************************************ */

  qx.Class.define("qx.test.mobile.MobileTestCase", {
    extend: qx.dev.unit.TestCase,
    include: [qx.dev.unit.MRequirements],
    statics: {
      _root: null,
      _oldApplicationFunction: null
    },
    members: {
      setUp: function setUp() {
        if (qx.core.Environment.get("browser.name") == "ie" && qx.core.Environment.get("browser.documentmode") < 10) {
          throw new qx.dev.unit.RequirementError("Mobile tests require Webkit, Gecko or IE10+");
        }
        qx.test.mobile.MobileTestCase._oldApplicationFunction = qx.core.Init.getApplication;
        var self = this;
        qx.core.Init.getApplication = function () {
          return {
            getRoot: function getRoot() {
              return self.getRoot();
            },
            addListener: function addListener() {
              return self.addListener.apply(self, arguments);
            },
            removeListener: function removeListener() {
              return self.removeListener.apply(self, arguments);
            },
            removeListenerById: function removeListenerById() {
              return self.removeListenerById.apply(self, arguments);
            },
            fireEvent: function fireEvent() {
              return self.fireEvent.apply(self, arguments);
            },
            fireDataEvent: function fireDataEvent() {
              return self.fireDataEvent.apply(self, arguments);
            },
            close: function close() {},
            terminate: function terminate() {}
          };
        };
      },
      tearDown: function tearDown() {
        this.getRoot().removeAll();
        qx.core.Init.getApplication = qx.test.mobile.MobileTestCase._oldApplicationFunction;
      },
      getRoot: function getRoot() {
        var clazz = qx.test.mobile.MobileTestCase;
        if (!clazz._root) {
          clazz._root = new qx.ui.mobile.core.Root();
        }
        return clazz._root;
      },
      assertQxMobileWidget: function assertQxMobileWidget(obj) {
        this.assertInstance(obj, qx.ui.mobile.core.Widget);
      }
    }
  });
  qx.test.mobile.MobileTestCase.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MobileTestCase.js.map?dt=1735341779224