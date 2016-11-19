

qx.Class.define('cv.Object', {
  extend: qx.core.Object,

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
   string2number: function(value) {
     return parseFloat(value);
   },

    string2bool: function(value) {
      return !!value;
    }
  }
});