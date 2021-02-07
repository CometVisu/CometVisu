(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.event.type.Pointer": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2014 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christopher Zuendorf (czuendorf)
  
  ************************************************************************ */

  /**
   * Pinch is a multi pointer gesture fired when two finger moved towards
   * or away from each other. It contains the scaling factor of the pinch.
   */
  qx.Class.define("qx.event.type.Pinch", {
    extend: qx.event.type.Pointer,
    members: {
      // overridden
      _cloneNativeEvent: function _cloneNativeEvent(nativeEvent, clone) {
        var clone = qx.event.type.Pinch.prototype._cloneNativeEvent.base.call(this, nativeEvent, clone);

        clone.scale = nativeEvent.scale;
        return clone;
      },

      /**
       * Returns the calculated scale of this event.
       *
       * @return {Float} the scale value of this event.
       */
      getScale: function getScale() {
        return this._native.scale;
      }
    }
  });
  qx.event.type.Pinch.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Pinch.js.map?dt=1612690401017