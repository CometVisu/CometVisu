(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.bom.client.Pdfjs": {
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
      "qx.core.Environment": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2014 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Richard Sternagel (rsternagel)
  
  ************************************************************************ */

  /**
   * Test for PDF.js detection.
   *
   * You can enable/disable it via "about:config"
   * and "pdfjs.disabled" (true/false).
   *
   * @require(qx.bom.client.Pdfjs)
   */
  qx.Class.define("qx.test.bom.client.Pdfjs", {
    extend: qx.dev.unit.TestCase,
    include: [qx.dev.unit.MRequirements],
    members: {
      "test: is PDF.js available": function test_is_PDFJs_available() {
        this.require(["firefox"]);
        qx.core.Environment.getAsync("plugin.pdfjs", function (result) {
          this.resume(function () {
            this.assertTrue(result);
          }, this);
        }, this);
        this.wait();
      }
    }
  });
  qx.test.bom.client.Pdfjs.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Pdfjs.js.map?dt=1731948112784