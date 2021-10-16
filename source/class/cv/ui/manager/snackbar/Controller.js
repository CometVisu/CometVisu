/**
 * Main view component responsible for showing a list of snackbar messages.
 */
qx.Class.define("cv.ui.manager.snackbar.Controller", {
  extend: qx.ui.core.Widget,
  type: "singleton",

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function () {
    this.base(arguments);
    this._setLayout(new qx.ui.layout.VBox(8));
    this.initMessages(new qx.data.Array());
    qx.event.message.Bus.subscribe("cv.manager.msg.snackbar", this._onMessage, this);
    this._listController = new qx.data.controller.List(this.getMessages(), this.getChildControl("list"));
    this._initDelegate();
  },

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    info: function (message) {
      const msg = new cv.ui.manager.model.Message();
      msg.set({
        title: message
      });
      qx.event.message.Bus.dispatchByName("cv.manager.msg.snackbar", msg);
    },

    error: function (message) {
      const msg = new cv.ui.manager.model.Message();
      if (typeof message === "object" && Object.prototype.hasOwnProperty.call(message, "statusText")) {
        message = message.statusText;
      }
      msg.set({
        title: message,
        type: "error",
        sticky: true
      });
      qx.event.message.Bus.dispatchByName("cv.manager.msg.snackbar", msg);
    }
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    appearance: {
      refine: true,
      init: "cv-snackbar"
    },

    messages: {
      check: "qx.data.Array",
      deferredInit: true,
      event: "changeMessages"
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _listController: null,

    _onMessage: function (ev) {
      const msg = ev.getData();
      if (msg instanceof cv.ui.manager.model.Message) {
        this.getMessages().push(msg);
        this.show();
      }
    },

    _onCloseMessage: function (ev) {
      const msg = ev.getData();
      this.getMessages().remove(msg);
      if (this.getMessages().length === 0) {
        this.exclude();
      }
    },

    _initDelegate: function () {
      this._listController.setDelegate({
        createItem: function () {
          const item = new cv.ui.manager.snackbar.Message();
          item.addListener("close", this._onCloseMessage, this);
          return item;
        }.bind(this),

        bindItem: function (controller, item, index) {
          controller.bindProperty("", "model", null, item, index);
        }
      });
    },

    // overridden
    _createChildControlImpl : function(id) {
      let control;

      switch (id) {
         case "list":
           control = new qx.ui.form.List();
           this._add(control, {flex: 1});
           break;
       }

       return control || this.base(arguments, id);
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    qx.event.message.Bus.unsubscribe("cv.manager.msg.snackbar", this._onMessage, this);
    this._disposeObjects("_listController");
  }
});
