/* VirtualElementItem.js
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
 * Widget for node items in XML-File
 */
qx.Class.define("cv.ui.manager.tree.VirtualElementItem", {
  extend: qx.ui.tree.VirtualTreeItem,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct(label) {
    super(label);
    if (qx.core.Environment.get("device.touch")) {
      this.addState("touch");
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
      init: "element-tree-item",
    },

    name: {
      check: "String",
      init: "",
      event: "changeName",
      apply: "_applyName",
    },

    temporary: {
      check: "Boolean",
      init: false,
      apply: "_applyTemporary",
    },

    status: {
      check: ["valid", "error", "comment"],
      nullable: true,
      apply: "_applyStatus",
    },

    editable: {
      check: "Boolean",
      init: false,
    },

    sortable: {
      check: "Boolean",
      init: false,
      apply: "_applySortable",
    },

    droppable: {
      refine: true,
      init: true,
    },

    dragging: {
      check: "Boolean",
      init: false,
      apply: "_applyDragging",
    },
  },

  /*
  ***********************************************
    EVENTS
  ***********************************************
  */
  events: {
    edit: "qx.event.type.Data",
    action: "qx.event.type.Data",
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    // eslint-disable-line @qooxdoo/qx/no-refs-in-members
    // overridden
    /**
     * @lint ignoreReferenceField(_forwardStates)
     */
    _forwardStates: {
      selected: true,
      touch: true,
    },

    __labelAdded: false,

    _applyName(value) {
      this.getContentElement().setAttribute("data-nodename", value);
    },

    // this has to be set by model binding, because the qx way by adding a state does not survive a widget re-binding
    _applyDragging(value) {
      if (value) {
        this.addState("drag");
      } else {
        this.removeState("drag");
      }
    },

    _applyModel(value) {
      if (qx.core.Environment.get("device.touch")) {
        if (value) {
          const menuButton = this.getChildControl("menu-button");
          menuButton.show();
          let menu = menuButton.getMenu();
          menu.setEditor(value.getEditor());
          menu.setElement(value);
        } else {
          this.getChildControl("menu-button").hide();
        }
      } else if (this.hasChildControl("menu-button")) {
        this.getChildControl("menu-button").exclude();
      }
    },

    _applyTemporary(value) {
      if (value) {
        this.addState("temporary");
      } else {
        this.removeState("temporary");
      }
    },

    _applySortable(value) {
      if (value) {
        this.getChildControl("move-button").show();
      } else {
        this.getChildControl("move-button").hide();
      }
    },

    _applyStatus(value, old) {
      const icon = this.getChildControl("icon");
      const label = this.getChildControl("label");
      if (old) {
        icon.removeState(old);
        label.removeState(old);
      }
      if (value) {
        icon.addState(value);
        label.addState(value);
      }
    },

    _addWidgets() {
      super._addWidgets();
      const open = this.getChildControl("open", true);
      if (open && qx.core.Environment.get("device.touch")) {
        open.getContentElement().addClass("touch-tree-open-icon");
      }
    },

    // overridden
    _createChildControlImpl(id, hash) {
      let control;

      switch (id) {
        case "icon":
          control = new cv.ui.manager.basic.Image().set({
            forceScale: true,
            alignY: "middle",
            anonymous: true,
            source: this.getIcon(),
            maxWidth: 22,
            maxHeight: 22,
          });

          break;

        case "buttons":
          control = new qx.ui.container.Composite(new qx.ui.layout.HBox(8));
          control.setAnonymous(true);
          break;

        case "move-button":
          control = new qx.ui.basic.Atom(
            "",
            cv.theme.dark.Images.getIcon(
              "drag-handle",
              qx.core.Environment.get("device.touch") ? 36 : 18
            )
          );
          control.setToolTipText(this.tr("Drag to move"));
          control.setAnonymous(true);
          control.setShow("icon");
          this.getChildControl("buttons").addAt(control, 0);
          break;

        case "menu-button":
          control = new qx.ui.form.MenuButton(
            "",
            cv.theme.dark.Images.getIcon(
              "menu",
              qx.core.Environment.get("device.touch") ? 24 : 14
            ),
            new cv.ui.manager.contextmenu.ConfigElement()
          );
          control.getMenu().addListener("action", (ev) => {
            this.fireDataEvent("action", ev.getData());
          });
          this.getChildControl("buttons").addAt(control, 1);
          break;
      }

      return control || super._createChildControlImpl(id);
    },

    // overridden
    addLabel(text) {
      const label = this.getChildControl("label");

      if (this.__labelAdded) {
        this._remove(label);
      }

      if (text) {
        this.setLabel(text);
      } else {
        label.setValue(this.getLabel());
      }

      this._add(label);
      this._add(new qx.ui.core.Spacer(), { flex: 1 });
      const buttons = this.getChildControl("buttons");
      this._add(buttons);
      this.__labelAdded = true;
    },
  },
});
