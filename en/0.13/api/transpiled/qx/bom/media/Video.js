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
       * Adrian Olaru (adrianolaru)
  
  ************************************************************************ */

  /**
   *
   * Media object for playing videos.
   *
   * NOTE: Instances of this class must be disposed of to free resources
   */
  qx.Class.define("qx.bom.media.Video", {
    extend: qx.bom.media.Abstract,
    /**
     * @param source {String} the source url to the sound file.
     */
    construct: function construct(source) {
      this._video = document.createElement("video");
      if (source) {
        this._video.src = source;
      }
      qx.bom.media.Abstract.constructor.call(this, this._video);
    },
    members: {
      _video: null,
      /**
       * Gets the width of the video element.
       *
       * @return {Number} the width of the video element
       */
      getWidth: function getWidth() {
        return this._video.width;
      },
      /**
       * Sets the width of the video element.
       *
       * @param value {Number} The new value of width.
       */
      setWidth: function setWidth(value) {
        this._video.width = value;
      },
      /**
       * Gets the height of the video element.
       *
       * @return {Number} the height of the video element
       */
      getHeight: function getHeight() {
        return this._video.height;
      },
      /**
       * Sets the height of the video element.
       *
       * @param value {Number} The new value of height.
       */
      setHeight: function setHeight(value) {
        this._video.height = value;
      },
      /**
       * Gets the width of the video.
       *
       * @return {Number} the width of the video
       */
      getVideoWidth: function getVideoWidth() {
        return this._video.videoWidth;
      },
      /**
       * Gets the height of the video.
       *
       * @return {Number} the height of the video
       */
      getVideoHeight: function getVideoHeight() {
        return this._video.videoHeight;
      },
      /**
       * Gets the poster of the video.
       *
       * @return {String} the URL of an image to act as the video poster
       */
      getPoster: function getPoster() {
        return this._video.poster;
      },
      /**
       * Sets the poster of the video.
       *
       * @param value {String} The new value of poster.
       */
      setPoster: function setPoster(value) {
        this._video.poster = value;
      }
    }
  });
  qx.bom.media.Video.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Video.js.map?dt=1709410145896