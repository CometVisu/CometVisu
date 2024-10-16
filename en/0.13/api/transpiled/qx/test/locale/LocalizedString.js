(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.dev.unit.TestCase": {
        "require": true
      },
      "qx.locale.MTranslation": {
        "require": true
      },
      "qx.dev.unit.MRequirements": {
        "require": true
      },
      "qx.locale.LocalizedString": {},
      "qx.locale.Date": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2006-2012 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Thomas Herchenroeder (thron7)
  
  ************************************************************************ */

  qx.Class.define("qx.test.locale.LocalizedString", {
    extend: qx.dev.unit.TestCase,
    include: [qx.locale.MTranslation, qx.dev.unit.MRequirements],
    members: {
      testTranslation: function testTranslation() {
        this.require(["qx.debug"]);
        this.assertException(function () {
          var ls = new qx.locale.LocalizedString("foo", "id", "xyz");
          ls.translate();
        });
      },
      testLocalizeVsTranslate: function testLocalizeVsTranslate() {
        this.assertEquals(qx.locale.Date.getMonthName("wide", new Date().getMonth()).toString(), qx.locale.Date.getMonthName("wide", new Date().getMonth()).translate().toString());
      }
    }
  });
  qx.test.locale.LocalizedString.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=LocalizedString.js.map?dt=1729101241961