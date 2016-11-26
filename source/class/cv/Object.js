

qx.Class.define('cv.Object', {
  extend: qx.core.Object,

  include: cv.oo.MMethodChaining,

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