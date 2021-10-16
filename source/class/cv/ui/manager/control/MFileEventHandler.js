/**
 * Mixin for all classes that have to handle event on the 'cv.manager.file' topic.
 * Those classes need to implement the cv.ui.manager.control.IFileEventHandler interface.
 */
qx.Mixin.define("cv.ui.manager.control.MFileEventHandler", {
  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function () {
    if (qx.core.Environment.get("qx.debug")) {
      qx.core.Assert.assertInterface(this, cv.ui.manager.control.IFileEventHandler);
    }
    if (!this._disableFileEvents) {
      qx.event.message.Bus.subscribe("cv.manager.file", this._handleFileEvent, this);
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
  destruct: function () {
    qx.event.message.Bus.unsubscribe("cv.manager.file", this._handleFileEvent, this);
  }
});
