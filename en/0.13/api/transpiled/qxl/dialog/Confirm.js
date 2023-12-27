(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.dialog.Dialog": {
        "require": true
      },
      "qx.ui.container.Composite": {},
      "qx.ui.layout.HBox": {},
      "qx.ui.basic.Image": {},
      "qx.ui.basic.Label": {},
      "qx.ui.form.Button": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "module.objectid": {}
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo dialog library
     https://github.com/qooxdoo/qxl.dialog
  
     Copyright:
       2007-2019 Christian Boulanger and others
  
     License:
       LGPL: http://www.gnu.org/licenses/lgpl.html
       EPL: http://www.eclipse.org/org/documents/epl-v10.php
       See the LICENSE file in the project's top-level directory for details.
  
  ************************************************************************ */

  /**
   * A dialog widget used to confirm a question or proposed course of action
   */
  qx.Class.define("qxl.dialog.Confirm", {
    extend: qxl.dialog.Dialog,
    statics: {
      /**
       * Returns singleton instance of this class. This method has to
       * be part of any subclass extending this widget.
       * @return {Object}
       */
      getInstance: function getInstance() {
        return this.superclass.getInstance(this.classname);
      }
    },
    properties: {
      /**
       * Label used for the "yes button"
       */
      yesButtonLabel: {
        check: "String",
        nullable: false,
        init: "Yes",
        event: "changeYesButtonLabel"
      },
      /**
       * Icon used for the "yes button"
       */
      yesButtonIcon: {
        check: "String",
        nullable: true,
        init: "qxl.dialog.icon.ok",
        event: "changeYesButtonIcon"
      },
      /**
       * Label used for the "no button"
       */
      noButtonLabel: {
        check: "String",
        nullable: false,
        init: "No",
        event: "changeNoButtonLabel"
      },
      /**
       * Icon used for the "no button"
       */
      noButtonIcon: {
        check: "String",
        nullable: true,
        init: "qxl.dialog.icon.cancel",
        event: "changeNoButtonIcon"
      },
      /**
       * This property controls the display of a cancel button
       */
      allowCancel: {
        refine: true,
        init: false
      }
    },
    members: {
      _yesButton: null,
      _noButton: null,
      /**
       * Create the main content of the widget
       */
      _createWidgetContent: function _createWidgetContent() {
        var container = this._createDialogContainer();
        var hbox = new qx.ui.container.Composite(new qx.ui.layout.HBox(10));
        container.add(hbox);
        this._image = new qx.ui.basic.Image();
        this._image.setVisibility("excluded");
        hbox.add(this._image);
        this._message = new qx.ui.basic.Label();
        this._message.setRich(true);
        this._message.setWidth(200);
        this._message.setAllowStretchX(true);
        hbox.add(this._message, {
          flex: 1
        });

        // buttons
        var buttonPane = this._createButtonPane();

        // yes button
        var yesButton = this._yesButton = new qx.ui.form.Button();
        yesButton.setAllowStretchX(true);
        yesButton.addListener("execute", this._handleYes, this);
        this.bind("yesButtonLabel", yesButton, "label");
        this.bind("yesButtonIcon", yesButton, "icon");
        yesButton.getChildControl("icon").set({
          width: 16,
          height: 16,
          scale: true
        });
        yesButton.setLabel(this.tr("yes"));
        // no button
        var noButton = this._noButton = new qx.ui.form.Button();
        noButton.setAllowStretchX(true);
        noButton.addListener("execute", this._handleNo, this);
        this.bind("noButtonLabel", noButton, "label");
        this.bind("noButtonIcon", noButton, "icon");
        noButton.getChildControl("icon").set({
          width: 16,
          height: 16,
          scale: true
        });
        noButton.setLabel(this.tr("no"));
        var cancelButton = this._createCancelButton();
        buttonPane.add(yesButton);
        buttonPane.add(noButton);
        buttonPane.add(cancelButton);
        container.add(buttonPane);
        this.add(container);

        // object id
        if (qx.core.Environment.get("module.objectid") === true) {
          yesButton.setQxObjectId("yes");
          this.getQxObject("buttons").addOwnedQxObject(yesButton);
          noButton.setQxObjectId("no");
          this.getQxObject("buttons").addOwnedQxObject(noButton);
        }
      },
      /**
       * Handle click on yes button. Calls callback with
       * a "true" value
       */
      _handleYes: function _handleYes() {
        this.hide();
        if (this.getCallback()) {
          this.getCallback().call(this.getContext(), true);
        }
        this.resetCallback();
      },
      /**
       * Handle click on no button. Calls callback with
       * a "false" value
       */
      _handleNo: function _handleNo() {
        this.hide();
        if (this.getCallback()) {
          this.getCallback().call(this.getContext(), false);
        }
      }
    }
  });
  qxl.dialog.Confirm.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Confirm.js.map?dt=1703705696078