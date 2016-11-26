
qx.Class.define('cv.io.request.Xhr', {
  extend: qx.io.request.Xhr,

  /*
  ******************************************************
    PROPERTIES
  ******************************************************
  */
  properties: {
    beforeSend: {
      check: "Function",
      nullable: true
    }
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    send: function() {
      var beforeSend = this.getBeforeSend();
      if (beforeSend) {
        beforeSend(this);
      }
      this.base(arguments);
    }
  }
});