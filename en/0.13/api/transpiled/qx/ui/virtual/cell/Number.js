(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.virtual.cell.Cell": {
        "construct": true,
        "require": true
      },
      "qx.util.format.NumberFormat": {
        "usage": "dynamic",
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
       2004-2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Jonathan Weiß (jonathan_rass)
  
  ************************************************************************ */

  /**
   * Number cell renderer.
   *
   * Renders the call using the configured number formatter.
   */
  qx.Class.define("qx.ui.virtual.cell.Number", {
    extend: qx.ui.virtual.cell.Cell,
    /**
     * @param numberFormat {qx.util.format.NumberFormat|null} Optional number
     *   format to use.
     */
    construct: function construct(numberFormat) {
      qx.ui.virtual.cell.Cell.constructor.call(this);
      if (numberFormat) {
        this.setNumberFormat(numberFormat);
      }
    },
    properties: {
      /** The number format used to render the cell */
      numberFormat: {
        check: "qx.util.format.NumberFormat",
        // it is on intension that only one number format is used for
        // all instances
        init: new qx.util.format.NumberFormat()
      },
      // overridden
      appearance: {
        refine: true,
        init: "cell-number"
      }
    },
    members: {
      // overridden
      getContent: function getContent(value, states) {
        return value !== null ? this.getNumberFormat().format(value) : "";
      }
    }
  });
  qx.ui.virtual.cell.Number.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Number.js.map?dt=1700345611980