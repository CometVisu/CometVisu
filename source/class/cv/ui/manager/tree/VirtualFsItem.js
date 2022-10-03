/* VirtualFsItem.js
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
    _applyEditing(value, old) {
      if (value !== old) {
        const field = this.getChildControl("edit");
        if (value) {
          field.setValue(this.getLabel());
          field.show();
          qx.event.message.Bus.dispatchByName("cv.manager.tree.enable", false);
        } else {
          qx.event.message.Bus.dispatchByName("cv.manager.tree.enable", true);
          field.exclude();
          // save new name
          if (field.getValue() !== this.getName()) {
            cv.ui.manager.control.FileController.getInstance().rename(
              this.getModel(),
              field.getValue()
            );
          }
        }
      }
    },
    _applyTemporary(value) {
      if (value) {
        this.addState("temporary");
      } else {
        this.removeState("temporary");
      }
    },

    // overridden
    _applyModel(value, old) {
      super._applyModel(value, old);
      if (old) {
        old.removeRelatedBindings(this);
      }
      if (value) {
        if (value.isTrash()) {
          this.setLabel(this.tr("Trash"));
        } else {
          value.bind("name", this, "label");
          value.bind("valid", this, "status", {
            converter(value) {
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

    _applyStatus(value) {
      const control = this.getChildControl("icon");
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
    _onDrop(ev) {
      this.info(ev.getRelatedTarget());
    },

    __cancelEditing() {
      this.getChildControl("edit").setValue(this.getName());
      this.setEditing(false);
    },

    _onKeypress(ev) {
      if (ev.getKeyIdentifier() === "Enter") {
        this.setEditing(false);
      } else if (ev.getKeyIdentifier() === "Esc") {
        this.__cancelEditing();
      }
    },

    // overridden
    _createChildControlImpl(id) {
      let control;

      switch (id) {
        case "edit":
          control = new qx.ui.form.TextField();
          control.addListener("keypress", this._onKeypress, this);
          control.exclude();
          control.addListener("changeVisibility", ev => {
            if (ev.getData() === "visible") {
              this.getChildControl("label").exclude();
            } else {
              this.getChildControl("label").show();
            }
          });
          control.addListener("blur", () => {
            this.setEditing(false);
          });
          this._add(control);
          break;
      }

      return control || super._createChildControlImpl(id);
    }
  }
});
