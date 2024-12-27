(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.dev.unit.TestCase": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  qx.Class.define("qx.test.lang.Webkit", {
    extend: qx.dev.unit.TestCase,
    members: {
      testSwitch: function testSwitch() {
        this.assertEquals(this, this._switchFunction(12));
        this.assertEquals(this, this._switchFunction(this));
      },
      _switchFunction: function _switchFunction(val) {
        switch (val) {
          case this:
            break;
          default:
            break;
        }
        return this;
      }
    }
  });
  qx.test.lang.Webkit.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Webkit.js.map?dt=1735341778946