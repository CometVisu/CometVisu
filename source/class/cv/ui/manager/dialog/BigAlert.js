/**
 * A dialog that alerts the user to something.
 *
 */
qx.Class.define("cv.ui.manager.dialog.BigAlert", {
  extend: qxl.dialog.Alert,
  members: {
    _hbox: null,

    _applyImage: function(value, old) {
      if (!this._image) {
        this._image = new qx.ui.basic.Image().set({
          scale: true,
          height: 32,
          width: 32
        });
        this._hbox.addAt(this._image, 0);
      }
      this._image.setSource(value);
      this._image.setVisibility(value ? "visible" : "excluded");
    },

    /**
     * Create the main content of the widget
     */
    _createWidgetContent: function() {
      let container = this._createDialogContainer();
      this.add(container);
      let hbox = this._hbox = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
      let scroll = new qx.ui.container.Scroll(hbox);
      scroll.setMaxHeight(qx.bom.Document.getHeight() - 132);
      qx.core.Init.getApplication().getRoot().addListener('resize', function () {
        scroll.setMaxHeight(qx.bom.Document.getHeight() - 132);
      }, this);
      container.add(scroll);
      hbox.bind('width', scroll, 'width');
      hbox.bind('height', scroll, 'height');
      const image = this.getImage();
      if (image) {
        this._image = new qx.ui.basic.Image(image).set({
          scale: true,
          height: 32,
          width: 32
        });
        hbox.add(this._image);
      }
      this._message = new qx.ui.basic.Label();
      this._message.setRich(true);
      this._message.setWidth(200);
      this._message.setAllowStretchX(true);
      hbox.addAt(this._message, 1,{
        flex: 1
      });
      let buttonPane = this._createButtonPane();
      let okButton = this._createOkButton();
      buttonPane.add(okButton);
      container.add(buttonPane);
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    this._disposeObjects("_hbox");
  }
});