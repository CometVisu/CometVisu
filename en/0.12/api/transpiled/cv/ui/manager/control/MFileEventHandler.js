(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.event.message.Bus": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /**
   * Mixin for all classes that have to handle event on the 'cv.manager.file' topic.
   * Those classes need to implement the cv.ui.manager.control.IFileEventHandler interface.
   */
  qx.Mixin.define('cv.ui.manager.control.MFileEventHandler', {
    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct() {
      if (!this._disableFileEvents) {
        qx.event.message.Bus.subscribe('cv.manager.file', this._handleFileEvent, this);
      }
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _disableFileEvents: false
    },

    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      qx.event.message.Bus.unsubscribe('cv.manager.file', this._handleFileEvent, this);
    }
  });
  cv.ui.manager.control.MFileEventHandler.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MFileEventHandler.js.map?dt=1612698459150