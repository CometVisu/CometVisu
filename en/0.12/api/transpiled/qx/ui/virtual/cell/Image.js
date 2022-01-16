(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.virtual.cell.AbstractImage": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2006 STZ-IDA, Germany, http://www.stz-ida.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Til Schneider (til132)
       * Carsten Lergenmueller (carstenl)
       * Jonathan Weiß (jonathan_rass)
  
  ************************************************************************ */
  qx.Class.define("qx.ui.virtual.cell.Image", {
    extend: qx.ui.virtual.cell.AbstractImage,

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      appearance: {
        refine: true,
        init: "cell-image"
      }
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      // overridden
      _identifyImage: function _identifyImage(value) {
        return value;
      }
    }
  });
  qx.ui.virtual.cell.Image.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Image.js.map?dt=1642362619652