(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.type.BaseString": {
        "construct": true,
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
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  /**
   * This class contains the translation of a message and all information
   * to translate it again into a different language.
   */
  qx.Class.define("qx.locale.LocalizedString", {
    extend: qx.type.BaseString,

    /**
     * @param translation {String} The translated message
     * @param messageId {String} The messageId to translate
     * @param args {Array} list of arguments passed used as values for format strings
     * @param localized {Boolean} True if the string uses localize instead of translate
     */
    construct: function construct(translation, messageId, args, localized) {
      qx.type.BaseString.constructor.call(this, translation);
      this.__P_234_0 = messageId;
      this.__P_234_1 = !!localized;
      this.__P_234_2 = args;
    },
    members: {
      __P_234_1: null,
      __P_234_0: null,
      __P_234_2: null,

      /**
       * Get a translation of the string using the current locale.
       *
       * @return {qx.locale.LocalizedString|String} This string translated using the current
       *    locale.
       */
      translate: function translate() {
        if (this.__P_234_1) {
          return qx.locale.Manager.getInstance().localize(this.__P_234_0, this.__P_234_2);
        }

        return qx.locale.Manager.getInstance().translate(this.__P_234_0, this.__P_234_2);
      },

      /**
       * Returns the messageId.
       *
       * @return {String} The messageId of this localized String
       */
      getMessageId: function getMessageId() {
        return this.__P_234_0;
      }
    }
  });
  qx.locale.LocalizedString.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=LocalizedString.js.map?dt=1644052373517