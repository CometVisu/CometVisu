/**
 * Widget for filesystem items in a virtual tree.
 */
qx.Class.define("cv.ui.manager.tree.VirtualFsItem", {
  extend: qx.ui.tree.VirtualTreeItem,

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    appearance: {
      refine: true,
      init: "fs-tree-item"
    },

    editing: {
      check: "Boolean",
      init: false,
      apply: "_applyEditing"
    },

    name: {
      check: "String",
      init: "",
      event: "changeName"
    },

    temporary: {
      check: "Boolean",
      init: false,
      apply: "_applyTemporary"
    },

    status: {
      check: ["valid", "error"],
      nullable: true,
      apply: "_applyStatus"
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {

    _applyEditing: function (value, old) {
      if (value !== old) {
        var field = this.getChildControl("edit");
        if (value) {
          field.setValue(this.getLabel());
          field.show();
          qx.event.message.Bus.dispatchByName("cv.manager.tree.enable", false);
        } else {
          qx.event.message.Bus.dispatchByName("cv.manager.tree.enable", true);
          field.exclude();
          // save new name
          if (field.getValue() !== this.getName()) {
            cv.ui.manager.control.FileController.getInstance().rename(this.getModel(), field.getValue());
          }
        }
      }
    },
    _applyTemporary: function (value) {
      if (value) {
        this.addState("temporary");
      } else {
        this.removeState("temporary");
      }
    },

    // overridden
    _applyModel : function(value, old) {
      this.base(arguments, value, old);
      if (old) {
        old.removeRelatedBindings(this);
      }
      if (value) {
        if (value.isTrash()) {
          this.setLabel(this.tr("Trash"));
        } else {
          value.bind("name", this, "label");
          value.bind("valid", this, "status", {
            converter: function (value) {
              return value === true ? "valid" : "error";
            }
          });
        }
        value.bind("temporary", this, "temporary");
        if (value.getType() === "dir") {
          this.setDroppable(true);
          this.addListener("drop", this._onDrop, this);
        } else {
          this.setDroppable(false);
          this.removeListener("drop", this._onDrop, this);
        }
      }
    },

    _applyStatus: function (value) {
      var control = this.getChildControl("icon");
      if (value) {
        switch (value) {
          case "valid":
            control.removeState("error");
            break;

          case "error":
            control.addState("error");
            break;
        }
      }
    },

    /**
     * Handle drop events
     * @param ev {Event}
     * @private
     */
    _onDrop: function (ev) {
      console.log(ev.getRelatedTarget());
    },

    __cancelEditing: function () {
      this.getChildControl("edit").setValue(this.getName());
      this.setEditing(false);
    },

    _onKeypress: function (ev) {
      if (ev.getKeyIdentifier() === "Enter") {
        this.setEditing(false);
      } else if (ev.getKeyIdentifier() === "Esc") {
        this.__cancelEditing();
      }
    },

    // overridden
    _createChildControlImpl : function(id) {
       var control;

       switch (id) {
         case "edit":
           control = new qx.ui.form.TextField();
           control.addListener("keypress", this._onKeypress, this);
           control.exclude();
           control.addListener("changeVisibility", function (ev) {
              if (ev.getData() === "visible") {
                this.getChildControl("label").exclude();
              } else {
                this.getChildControl("label").show();
              }
           }, this);
           control.addListener("blur", function () {
             this.setEditing(false);
           }, this);
           this._add(control);
           break;
       }

       return control || this.base(arguments, id);
    }
  }
});
