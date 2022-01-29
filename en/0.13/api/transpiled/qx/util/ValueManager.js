(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
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
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
  
  ************************************************************************ */

  /**
   * Abstract base class for all managers of themed values.
   */
  qx.Class.define("qx.util.ValueManager", {
    type: "abstract",
    extend: qx.core.Object,

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */
    construct: function construct() {
      qx.core.Object.constructor.call(this); // Create empty dynamic map

      this._dynamic = {};
    },

    /*
    *****************************************************************************
       MEMBERS
    *****************************************************************************
    */
    members: {
      _dynamic: null,

      /**
       * Returns the dynamically interpreted result for the incoming value
       *
       * @param value {String} dynamically interpreted identifier
       * @return {var} return the (translated) result of the incoming value
       */
      resolveDynamic: function resolveDynamic(value) {
        return this._dynamic[value];
      },

      /**
       * Whether a value is interpreted dynamically
       *
       * @param value {String} dynamically interpreted identifier
       * @return {Boolean} returns true if the value is interpreted dynamically
       */
      isDynamic: function isDynamic(value) {
        return !!this._dynamic[value];
      },

      /**
       * Returns the dynamically interpreted result for the incoming value,
       * (if available), otherwise returns the original value
       * @param value {String} Value to resolve
       * @return {var} either returns the (translated) result of the incoming
       * value or the value itself
       */
      resolve: function resolve(value) {
        if (value && this._dynamic[value]) {
          return this._dynamic[value];
        }

        return value;
      },

      /**
       * Sets the dynamics map.
       * @param value {Map} The map.
       */
      _setDynamic: function _setDynamic(value) {
        this._dynamic = value;
      },

      /**
       * Returns the dynamics map.
       * @return {Map} The map.
       */
      _getDynamic: function _getDynamic() {
        return this._dynamic;
      }
    }
  });
  qx.util.ValueManager.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ValueManager.js.map?dt=1643473492446