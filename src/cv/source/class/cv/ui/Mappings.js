/**
 * Mappings
 *
 * @author tobiasb
 * @since 2016
 */

qx.Class.define("cv.ui.Mappings", {
  type: "static",

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    mappings: { init: {} },

    addMapping: function (name, styling) {
      this.mappings[name] = styling;
    },

    getMapping: function (name) {
      return this.mappings[name];
    }
  }
});