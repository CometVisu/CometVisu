(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.dialog.Alert": {
        "require": true
      },
      "qx.ui.container.Composite": {},
      "qx.ui.layout.HBox": {},
      "qx.ui.container.Scroll": {},
      "qx.bom.Document": {},
      "qx.core.Init": {},
      "qx.ui.basic.Image": {},
      "qx.ui.basic.Label": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /**
   * A dialog that alerts the user to something.
   *
   */
  qx.Class.define("cv.ui.manager.dialog.BigAlert", {
    extend: qxl.dialog.Alert,
    members: {
      /**
       * Create the main content of the widget
       */
      _createWidgetContent: function _createWidgetContent() {
        var container = this._createDialogContainer();

        this.add(container);
        var hbox = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
        var scroll = new qx.ui.container.Scroll(hbox);
        scroll.setMaxHeight(qx.bom.Document.getHeight() - 132);
        qx.core.Init.getApplication().getRoot().addListener('resize', function () {
          scroll.setMaxHeight(qx.bom.Document.getHeight() - 132);
        }, this);
        container.add(scroll);
        hbox.bind('width', scroll, 'width');
        hbox.bind('height', scroll, 'height');
        this._image = new qx.ui.basic.Image(this.getImage() || "qxl.dialog.icon.info").set({
          scale: true,
          height: 32,
          width: 32
        });
        hbox.add(this._image);
        this._message = new qx.ui.basic.Label();

        this._message.setRich(true);

        this._message.setWidth(200);

        this._message.setAllowStretchX(true);

        hbox.add(this._message, {
          flex: 1
        });

        var buttonPane = this._createButtonPane();

        var okButton = this._createOkButton();

        buttonPane.add(okButton);
        container.add(buttonPane);
      }
    }
  });
  cv.ui.manager.dialog.BigAlert.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=BigAlert.js.map?dt=1620513271992