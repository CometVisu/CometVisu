/**
 * Stylings
 *
 * @author tobiasb
 * @since 2016
 */

qx.Class.define("cv.ui.Stylings", {
  type: "static",

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    stylings: { init: {} },

    addStyling: function (name, styling) {
      this.stylings[name] = styling;
    },

    getStyling: function (name) {
      return this.stylings[name];
    }
  }
});