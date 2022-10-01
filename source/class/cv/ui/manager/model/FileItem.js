/* FileItem.js
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
 * Represents an entry in the filesystem (file or folder).
 */
qx.Class.define("cv.ui.manager.model.FileItem", {
  extend: qx.core.Object,
  include: [
    qx.data.marshal.MEventBubbling,
    cv.ui.manager.control.MFileEventHandler,
  ],

  implement: [cv.ui.manager.control.IFileEventHandler],
  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct(name, path, parent, fakeChildren) {
    super();
    this.initChildren(new qx.data.Array());
    if (fakeChildren) {
      this.setFakeChildren(fakeChildren);
    }
    if (path) {
      if (!path.endsWith("/")) {
        path += "/";
      }
      this.__path = path;
    }
    if (name) {
      this.setName(name);
    }
    if (parent) {
      this.setParent(parent);
    }
    if (qx.core.Environment.get("qx.dynlocale")) {
      qx.locale.Manager.getInstance().addListener(
        "changeLocale",
        this._onChangeLocale,
        this
      );
    }
  },

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    ROOT: null,
    _fakeIconFile: null,
    _hiddenConfigFakeFile: null,
    _acceptedFiles: {
      ".": "*.xml",
      media: "*.js,*.jpg,*.gif,*.png,*.conf,*.svg,*.md,*.rst,*,css,*.txt",
    },

    isConfigFile(path) {
      return /visu_config.*\.xml/.test(path);
    },

    getConfigName(filename) {
      const match = /visu_config_?([^.]+)\.xml/.exec(filename);
      if (match) {
        return match[1];
      }
      return null;
    },

    getIconFile() {
      if (!this._fakeIconFile) {
        this._fakeIconFile = new cv.ui.manager.model.FileItem(
          "CometVisu-Icons",
          "",
          cv.ui.manager.model.FileItem.ROOT
        ).set({
          type: "file",
          overrideIcon: true,
          writeable: false,
          readable: true,
          open: true,
          loaded: true,
          hasChildren: false,
          fake: true,
          icon: cv.theme.dark.Images.getIcon("icons", 18),
        });
      }
      return this._fakeIconFile;
    },

    getHiddenConfigFile() {
      if (!this._hiddenConfigFakeFile) {
        this._hiddenConfigFakeFile = new cv.ui.manager.model.FileItem(
          "hidden.php",
          "",
          cv.ui.manager.model.FileItem.ROOT
        ).set({
          hasChildren: false,
          loaded: true,
          readable: true,
          writeable: true,
          overrideIcon: true,
          icon: cv.theme.dark.Images.getIcon("hidden-config", 15),
          type: "file",
          fake: true,
          displayName: qx.locale.Manager.tr("Hidden configuration"),
        });
      }
      return this._hiddenConfigFakeFile;
    },

    getAcceptedFiles(folder) {
      return this._acceptedFiles[folder.getFullPath()];
    },
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    open: {
      check: "Boolean",
      event: "changeOpen",
      apply: "_onOpen",
      init: false,
    },

    loaded: {
      check: "Boolean",
      event: "changeLoaded",
      init: false,
    },

    loading: {
      check: "Boolean",
      event: "changeLoading",
      init: false,
    },

    parent: {
      event: "changeParent",
      init: null,
    },

    children: {
      check: "qx.data.Array",
      event: "changeChildren",
      apply: "_applyEventPropagation",
      deferredInit: true,
    },

    fakeChildren: {
      check: "Array",
      nullable: true,
    },

    displayName: {
      check: "String",
      init: "",
      event: "changeDisplayName",
    },

    /**
     * Fake items only exist in the client not in the backend
     */
    fake: {
      check: "Boolean",
      init: false,
      event: "changeFake",
    },

    overrideIcon: {
      check: "Boolean",
      init: false,
    },

    icon: {
      check: "String",
      nullable: true,
      event: "changeIcon",
    },

    hash: {
      check: "Number",
      nullable: true,
    },

    editing: {
      check: "Boolean",
      init: false,
      event: "changeEditing",
    },

    /**
     * A special configuration option for mulitple purposes, e.g. creating a fake FileItem with a special
     * behaviour like an "Add new File" used in writeable Folders.
     */
    special: {
      check: "String",
      nullable: true,
      event: "changeSpecial",
    },

    /**
     * Temporary file are not save in the backend yet
     */
    temporary: {
      check: "Boolean",
      init: false,
      event: "changeTemporary",
    },

    /**
     * Validation result for this files content (e.g. config file validation)
     */
    valid: {
      check: "Boolean",
      init: true,
      event: "changeValid",
    },

    /**
     * The validation of this files content found some warnings
     */
    hasWarnings: {
      check: "Boolean",
      init: false,
      event: "changeHasWarnings",
    },

    /**
     * Temporary content to show, e.g. for new files, when there is no 'real' file with content yet to request from the backend
     * this content should be shown
     */
    content: {
      check: "String",
      nullable: true,
    },

    modified: {
      check: "Boolean",
      init: false,
      event: "changeModified",
    },

    // Backend properties

    hasChildren: {
      check: "Boolean",
      event: "changeHasChildren",
      apply: "_applyHasChildren",
      init: false,
    },

    name: {
      check: "String",
      event: "changeName",
      init: "",
      apply: "_applyName",
    },

    type: {
      check: ["dir", "file"],
      transform: "_toLowerCase",
      nullable: true,
      apply: "_maintainIcon",
    },

    parentFolder: {
      check: "String",
      nullable: true,
    },

    readable: {
      check: "Boolean",
      init: false,
      event: "changeReadable",
    },

    writeable: {
      check: "Boolean",
      init: false,
      event: "changeWriteable",
    },

    mounted: {
      check: "Boolean",
      init: false,
      event: "changeMounted",
    },

    trash: {
      check: "Boolean",
      init: false,
      event: "changeTrash",
    },

    inTrash: {
      check: "Boolean",
      init: false,
      event: "changeInTrash",
    },
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    __path: null,
    __fullPath: null,
    __onLoadCallback: null,

    _toLowerCase(name) {
      return name.toLowerCase();
    },

    isRelated(path) {
      return this.getFullPath() === path;
    },

    _handleFileEvent(ev) {
      if (this.isFake()) {
        return;
      }
      const data = ev.getData();
      switch (data.action) {
        case "moved":
          this.reload();
          break;

        case "added":
          if (
            this.getType() === "dir" &&
            data.path.startsWith(this.getFullPath())
          ) {
            this.reload();
          }
          break;

        case "deleted":
          if (data.path === this.getFullPath()) {
            // this item has been deleted
            this.dispose();
          } else if (
            this.getType() === "dir" &&
            data.path.startsWith(this.getFullPath())
          ) {
            // delete child
            const children = this.getChildren();
            children.some(function (child) {
              if (child.getFullPath() === data.path) {
                children.remove(child);
                this.removeRelatedBindings(child);
                return true;
              }
              return false;
            }, this);
          }
          break;
      }
    },

    _applyName(value, old) {
      this.__fullPath = null;
      if (
        value &&
        (this.getDisplayName() === null || this.getDisplayName() === old)
      ) {
        // use name as default display name
        this.setDisplayName(value);
      }
    },

    getPath() {
      if (!this.__path) {
        let parentFolder = this.getParentFolder();
        if (!parentFolder) {
          parentFolder = "";
        } else if (!parentFolder.endsWith("/")) {
          parentFolder += "/";
        }
        this.__path = parentFolder;
      }
      return this.__path;
    },

    _onOpen(value) {
      if (!this.isLoaded() && value) {
        this.load();
      }
      this._maintainIcon();
    },

    _maintainIcon() {
      if (!this.isOverrideIcon()) {
        if (this.getType() === "file") {
          this.setIcon(cv.theme.dark.Images.getIcon("file", 18));
        } else if (this.isTrash()) {
          this.setIcon(cv.theme.dark.Images.getIcon("trash", 18));
        } else if (this.isOpen()) {
          this.setIcon(cv.theme.dark.Images.getIcon("folder-open", 18));
        } else if (this.isMounted()) {
          this.setIcon(cv.theme.dark.Images.getIcon("mounted-folder", 18));
        } else {
          this.setIcon(cv.theme.dark.Images.getIcon("folder", 18));
        }
      }
    },

    isConfigFile() {
      return cv.ui.manager.model.FileItem.isConfigFile(this.getName());
    },

    _applyHasChildren(value) {
      if (value === true && this.getChildren().length === 0) {
        // add dummy child
        this.getChildren().push(new cv.ui.manager.model.FileItem(""));
      }
    },

    unload() {
      this.setLoaded(false);
      this.setLoading(false);
      this.getChildren()
        .removeAll()
        .forEach(function (child) {
          this.removeRelatedBindings(child);
        }, this);
    },

    reload(callback, context) {
      this.unload();
      return this.load(callback, context);
    },

    addChild(child) {
      const oldParent = child.getParent();
      if (oldParent !== this) {
        oldParent.getChildren().remove(child);
        oldParent.removeRelatedBindings(child);
      }
      child.setParent(this);
      if (child.getType() !== "dir" || !child.isMounted()) {
        // inherit the mounted state from the parent folder
        this.bind("mounted", child, "mounted");
      }
      this.getChildren().push(child);
    },

    _onGet(data) {
      const children = this.getChildren();
      children.removeAll().forEach(function (child) {
        this.removeRelatedBindings(child);
      }, this);
      if (data) {
        data.forEach(function (node) {
          const child = new cv.ui.manager.model.FileItem(null, null, this);
          if (Object.prototype.hasOwnProperty.call(node, "children")) {
            const nodeChildren = node.children;
            delete node.children;
            if (nodeChildren.length > 0) {
              child.getChildren().replace(nodeChildren);
              child.setLoaded(true);
            }
          }
          child.set(node);
          children.push(child);
        }, this);
      }
      if (this.getFakeChildren()) {
        children.append(this.getFakeChildren());
      }
      this.sortElements();

      this.setLoaded(true);
      if (this.__onLoadCallback) {
        this.__onLoadCallback();
      }
      this.setLoading(false);
    },

    _onError(err) {
      this.error(err);
      cv.ui.manager.snackbar.Controller.error(err);
      this.getChildren()
        .removeAll()
        .forEach(function (child) {
          this.removeRelatedBindings(child);
        }, this);
      this.setLoaded(true);
      if (this.__onLoadCallback) {
        this.__onLoadCallback();
      }
      this.setLoading(false);
    },

    load(callback, context) {
      // If currently loading, delay ready
      if (this.getType() === "file") {
        // nothing to load
        this.setLoaded(true);
        return;
      } else if (this.isFake()) {
        this.setLoaded(true);
        if (this.getFakeChildren()) {
          this.getChildren().append(this.getFakeChildren());
        }
        return;
      }
      if (this.isLoading()) {
        if (callback) {
          this.addListenerOnce("changeLoading", callback, context);
        }
      } else if (this.isLoaded()) {
        // If not done yet, resolve the child elements of this container
        if (callback) {
          callback.apply(context);
        }
      } else {
        this.setLoading(true);
        if (callback) {
          this.__onLoadCallback = callback.bind(context || this);
        }
        cv.io.rest.Client.getFsClient().readSync(
          { path: this.getFullPath() },
          function (err, res) {
            if (err) {
              this._onError(err);
            } else {
              this._onGet(res);
            }
          },
          this
        );
      }
    },

    /**
     * Returns the complete path needed for the REST API  to identify this file
     * @returns {null}
     */
    getFullPath() {
      if (!this.__fullPath) {
        this.__fullPath = this.getPath() + this.getName();
      }
      return this.__fullPath;
    },

    getBusTopic() {
      return "cv.manager.fs." + this.getFullPath().replace(/\//g, ".");
    },

    /**
     * Returns a fake URI that can be used to identify the file.
     * Used by monaco editor as model URI.
     * @returns {Uri}
     */
    getUri() {
      return "cv://" + this.getFullPath();
    },

    /**
     * Returns the path to this file for requests over HTTP (not the REST API)
     *
     * Note: Please be aware that this path does not work if the file is in a mounted folder
     * like the demo configs. The backend handles those mounts transparently to the client. But
     * because of that the client does not know the real path to the file.
     *
     * @returns {string}
     */
    getServerPath() {
      if (!this.isMounted()) {
        return (
          qx.util.LibraryManager.getInstance().get("cv", "resourceUri") +
          "/config/" +
          this.getFullPath()
        );
      }
      return (
        qx.util.LibraryManager.getInstance().get("cv", "resourceUri") +
        "/" +
        this.getFullPath()
      );
    },

    /**
     *  Sort entries: folders first, files then
     */
    sortElements() {
      const sortF = function (a, b) {
        if (a.getType() === "dir") {
          if (b.getType() === "dir") {
            if (a.isTrash()) {
              return 1;
            } else if (b.isTrash()) {
              return -1;
            }
            return a.getName().localeCompare(b.getName());
          }
          return -1;
        } else if (b.getType() === "dir") {
          return 1;
        }
        return a.getName().localeCompare(b.getName());
      };
      this.getChildren().sort(sortF);
    },

    openPath(path) {
      const parts = qx.lang.Type.isArray(path) ? path : path.split("/");
      const relPath = parts.shift();
      this.getChildren().some(function (child) {
        if (child.getName() === relPath) {
          child.load(function () {
            child.setOpen(true);
            if (parts.length > 0) {
              child.openPath(parts);
            }
          }, this);
          return true;
        }
        return false;
      }, this);
    },

    _onChangeLocale: qx.core.Environment.select("qx.dynlocale", {
      true() {
        const content = this.getDisplayName();
        if (content && content.translate) {
          this.setDisplayName(content.translate());
        }
      },

      false: null,
    }),
  },

  /*
  ***********************************************
    DESTRUCTOR  
  ***********************************************
  */
  destruct() {
    this.__fullPath = null;
  },
});
