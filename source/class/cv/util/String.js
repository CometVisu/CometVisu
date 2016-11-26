
qx.Class.define('cv.util.String', {
  type: "static",

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    __elem: null,

    /**
     * Decode HTML entities like &amp; to &
     * @param str {String} string to decode
     * @returns {String}
     */
    decodeHtmlEntities: function (str) {
      if (!this.__elem) {
        this.__elem = qx.dom.Element.create("span");
      }
      this.__elem.innerHTML = str;
      return this.__elem.innerText;
    }
  }

});