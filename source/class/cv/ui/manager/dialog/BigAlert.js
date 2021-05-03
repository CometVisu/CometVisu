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
    _createWidgetContent: function() {
      let container = this._createDialogContainer();
      this.add(container);
      let hbox = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
      let scroll = new qx.ui.container.Scroll(hbox);
      scroll.setMaxHeight(qx.bom.Document.getHeight() - 132);
      qx.core.Init.getApplication().getRoot().addListener('resize', function () {
        scroll.setMaxHeight(qx.bom.Document.getHeight() - 132);
      }, this);
      container.add(scroll);
      hbox.bind('width', scroll, 'width');
      hbox.bind('height', scroll, 'height');
      this._image = new qx.ui.basic.Image(
        this.getImage() || "qxl.dialog.icon.info"
      ).set({
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
      let buttonPane = this._createButtonPane();
      let okButton = this._createOkButton();
      buttonPane.add(okButton);
      container.add(buttonPane);
    }
  }
});