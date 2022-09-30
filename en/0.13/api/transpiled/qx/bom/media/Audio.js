(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.bom.media.Abstract": {
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
       2004-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Tino Butz (tbtz)
       * Adrian Olaru (adrianolaru)
  
  ************************************************************************ */

  /**
   *
   * Media object for playing sounds.
   * 
   * NOTE: Instances of this class must be disposed of to free resources
   */
  qx.Class.define("qx.bom.media.Audio", {
    extend: qx.bom.media.Abstract,

    /**
     * @param source {String} the source url to the sound file.
     */
    construct: function construct(source) {
      this._audio = new window.Audio(source ? source : "");
      qx.bom.media.Abstract.constructor.call(this, this._audio);
    },
    members: {
      _audio: null
    }
  });
  qx.bom.media.Audio.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Audio.js.map?dt=1664557338071