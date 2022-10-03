/* AbstractViewer.js
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
 * Abstract base class for all widgets that can display file items.
 */
qx.Class.define("cv.ui.manager.viewer.AbstractViewer", {
  extend: qx.ui.core.Widget,
  implement: [cv.ui.manager.editor.IEditor, cv.ui.manager.IActionHandler],

  type: "abstract",

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct() {
    super();
    this._setLayout(new qx.ui.layout.Grow());
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    file: {
      check: "cv.ui.manager.model.FileItem",
      nullable: true,
      apply: "_applyFile",
      event: "changeFile"
    },

    /**
     * External viewers just open the file in a new frame but to not show a new tab in the manager for the opened file
     */
    external: {
      check: "Boolean",
      init: false
    },

    ready: {
      check: "Boolean",
      init: true,
      event: "changeReady"
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    canHandleAction() {
      return false;
    },
    handleAction() {},
    configureButton(button) {},
    unConfigureButton(button) {},
    save() {},
    getCurrentContent() {},

    _applyFile(file, old) {
      // show icon for file type
    },

    // overridden
    _createChildControlImpl(id) {
      let control;

      switch (id) {
        case "scroll":
          control = new qx.ui.container.Scroll();
          this._add(control);
          break;

        case "image":
          control = new qx.ui.basic.Atom();
          this.getChildControl("scroll").add(control);
          control
            .getChildControl("icon")
            .addListener("resize", this._scaleImage, this);
          break;
      }

      return control || super._createChildControlImpl(id);
    }
  }
});
