(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.locale.Manager": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * Provides information about locale-dependent string formatting (like quotation
   * signs).
   *
   * @cldr()
   */
  qx.Class.define("qx.locale.String", {
    statics: {
      /**
       * Get quotation start sign
       *
       * @param locale {String} optional locale to be used
       * @return {String} quotation start sign
       */
      getQuotationStart: function getQuotationStart(locale) {
        return qx.locale.Manager.getInstance().localize("cldr_quotationStart", [], locale);
      },

      /**
       * Get quotation end sign
       *
       * @param locale {String} optional locale to be used
       * @return {String} quotation end sign
       */
      getQuotationEnd: function getQuotationEnd(locale) {
        return qx.locale.Manager.getInstance().localize("cldr_quotationEnd", [], locale);
      },

      /**
       * Get quotation alternative start sign
       *
       * @param locale {String} optional locale to be used
       * @return {String} alternative quotation start sign
       */
      getAlternateQuotationStart: function getAlternateQuotationStart(locale) {
        return qx.locale.Manager.getInstance().localize("cldr_alternateQuotationStart", [], locale);
      },

      /**
       * Get quotation alternative end sign
       *
       * @param locale {String} optional locale to be used
       * @return {String} alternative quotation end sign
       */
      getAlternateQuotationEnd: function getAlternateQuotationEnd(locale) {
        return qx.locale.Manager.getInstance().localize("cldr_alternateQuotationEnd", [], locale);
      }
    }
  });
  qx.locale.String.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=String.js.map?dt=1619883154338