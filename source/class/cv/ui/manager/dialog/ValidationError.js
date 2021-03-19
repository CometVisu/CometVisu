/**
 * Show validation errors for a config file.
 */
qx.Class.define('cv.ui.manager.dialog.ValidationError', {
  extend: dialog.Dialog,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function (properties, content, errors) {
    this.base(arguments, properties);
    this._content = content;
    this._errors = errors;
  },

  /*
  ***********************************************
    EVENTS
  ***********************************************
  */
  events: {
   action: "qx.event.type.Data"
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _content: null,
    _errors: null,

    /**
     * Create the main content of the widget
     */
    _createWidgetContent: function() {
      let container = this._createDialogContainer();
      let hbox = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
      container.add(hbox);
      this._image = new qx.ui.basic.Image();
      this._image.setVisibility("excluded");
      hbox.add(this._image);
      this._message = new qx.ui.basic.Label(this._message);
      this._message.setRich(true);
      this._message.setWidth(350);
      this._message.setAllowStretchX(true);
      hbox.add(this._message, { flex: 1 });

      // buttons
      let buttonPane = this._createButtonPane();

      // close button
      let closeButton = new qx.ui.form.Button(this.tr("Close"));
      closeButton.addListener("execute",  () => this.fireDataEvent('action', 'cancel'), this);

      let proceedButton = new qx.ui.form.Button(this.tr("Proceed"));
      proceedButton.addListener("execute", () => this.fireDataEvent('action', 'proceed'), this);

      let openSourceButton = new qx.ui.form.Button(this.tr("Open in source editor"));
      openSourceButton.addListener("execute", () => this.fireDataEvent('action', 'open-source'), this);

      buttonPane.add(closeButton);
      buttonPane.add(proceedButton);
      buttonPane.add(openSourceButton);

      container.add(buttonPane);
      this.add(container);


    },
  },
  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    this._content = null;
    this._errors = null;
  }
});
