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
      "qx.ui.basic.Image": {},
      "qx.ui.container.Composite": {},
      "qx.ui.layout.HBox": {},
      "qx.ui.container.Scroll": {},
      "qx.bom.Document": {},
      "qx.core.Init": {},
      "qx.ui.basic.Label": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* BigAlert.js
   *
   * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
   *
   * This program is free software; you can redistribute it and/or modify it
   * under the terms of the GNU General Public License as published by the Free
   * Software Foundation; either version 3 of the License, or (at your option)
   * any later version.
   *
   * This program is distributed in the hope that it will be useful, but WITHOUT
   * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
   * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
   * more details.
   *
   * You should have received a copy of the GNU General Public License along
   * with this program; if not, write to the Free Software Foundation, Inc.,
   * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
   */

  /**
   * A dialog that alerts the user to something.
   *
   */
  qx.Class.define('cv.ui.manager.dialog.BigAlert', {
    extend: qxl.dialog.Alert,
    members: {
      _hbox: null,
      _applyImage: function _applyImage(value, old) {
        if (!this._image) {
          this._image = new qx.ui.basic.Image().set({
            scale: true,
            height: 32,
            width: 32
          });
          this._hbox.addAt(this._image, 0);
        }
        this._image.setSource(value);
        this._image.setVisibility(value ? 'visible' : 'excluded');
      },
      /**
       * Create the main content of the widget
       */
      _createWidgetContent: function _createWidgetContent() {
        var container = this._createDialogContainer();
        this.add(container);
        var hbox = this._hbox = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
        var scroll = new qx.ui.container.Scroll(hbox);
        scroll.setMaxHeight(qx.bom.Document.getHeight() - 132);
        qx.core.Init.getApplication().getRoot().addListener('resize', function () {
          scroll.setMaxHeight(qx.bom.Document.getHeight() - 132);
        });
        container.add(scroll);
        hbox.bind('width', scroll, 'width');
        hbox.bind('height', scroll, 'height');
        var image = this.getImage();
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
        hbox.addAt(this._message, 1, {
          flex: 1
        });
        var buttonPane = this._createButtonPane();
        var okButton = this._createOkButton();
        buttonPane.add(okButton);
        container.add(buttonPane);
      }
    },
    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this._disposeObjects('_hbox');
    }
  });
  cv.ui.manager.dialog.BigAlert.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=BigAlert.js.map?dt=1672653474453