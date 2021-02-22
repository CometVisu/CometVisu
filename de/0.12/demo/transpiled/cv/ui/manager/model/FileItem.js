(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.data.marshal.MEventBubbling": {
        "require": true
      },
      "cv.ui.manager.control.MFileEventHandler": {
        "require": true
      },
      "cv.ui.manager.control.IFileEventHandler": {
        "require": true
      },
      "qx.data.Array": {
        "construct": true
      },
      "cv.theme.dark.Images": {},
      "qx.locale.Manager": {},
      "cv.ui.manager.snackbar.Controller": {},
      "cv.io.rest.Client": {},
      "qx.util.LibraryManager": {},
      "qx.lang.Type": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /**
   * Represents an entry in the filesystem (file or folder).
   */
  qx.Class.define('cv.ui.manager.model.FileItem', {
    extend: qx.core.Object,
    include: [qx.data.marshal.MEventBubbling, cv.ui.manager.control.MFileEventHandler],
    implement: [cv.ui.manager.control.IFileEventHandler],

    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct(name, path, parent, fakeChildren) {
      qx.core.Object.constructor.call(this);
      this.initChildren(new qx.data.Array());

      if (fakeChildren) {
        this.setFakeChildren(fakeChildren);
      }

      if (path) {
        if (!path.endsWith('/')) {
          path += '/';
        }

        this.__P_38_0 = path;
      }

      if (name) {
        this.setName(name);
      }

      if (parent) {
        this.setParent(parent);
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
        '.': '*.xml',
        'media': '*.js,*.jpg,*.gif,*.png,*.conf,*.svg,*.md,*.rst,*,css,*.txt'
      },
      isConfigFile: function isConfigFile(path) {
        return /visu_config.*\.xml/.test(path);
      },
      getConfigName: function getConfigName(filename) {
        var match = /visu_config_?([^.]+)\.xml/.exec(filename);

        if (match) {
          return match[1];
        }

        return null;
      },
      getIconFile: function getIconFile() {
        if (!this._fakeIconFile) {
          this._fakeIconFile = new cv.ui.manager.model.FileItem('CometVisu-Icons', '', cv.ui.manager.model.FileItem.ROOT).set({
            type: 'file',
            overrideIcon: true,
            writeable: false,
            readable: true,
            open: true,
            loaded: true,
            hasChildren: false,
            fake: true,
            icon: cv.theme.dark.Images.getIcon('icons', 18)
          });
        }

        return this._fakeIconFile;
      },
      getHiddenConfigFile: function getHiddenConfigFile() {
        if (!this._hiddenConfigFakeFile) {
          this._hiddenConfigFakeFile = new cv.ui.manager.model.FileItem('hidden.php', '', cv.ui.manager.model.FileItem.ROOT).set({
            hasChildren: false,
            loaded: true,
            readable: true,
            writeable: true,
            overrideIcon: true,
            icon: cv.theme.dark.Images.getIcon('hidden-config', 15),
            type: "file",
            fake: true,
            displayName: qx.locale.Manager.tr('Hidden configuration')
          });
        }

        return this._hiddenConfigFakeFile;
      },
      getAcceptedFiles: function getAcceptedFiles(folder) {
        return this._acceptedFiles[folder.getFullPath()];
      }
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
        init: false
      },
      loaded: {
        check: "Boolean",
        event: "changeLoaded",
        init: false
      },
      loading: {
        check: "Boolean",
        event: "changeLoading",
        init: false
      },
      parent: {
        event: "changeParent",
        init: null
      },
      children: {
        check: "qx.data.Array",
        event: "changeChildren",
        apply: "_applyEventPropagation",
        deferredInit: true
      },
      fakeChildren: {
        check: "Array",
        nullable: true
      },
      displayName: {
        check: 'String',
        init: "",
        event: 'changeDisplayName'
      },

      /**
       * Fake items only exist in the client not in the backend
       */
      fake: {
        check: 'Boolean',
        init: false,
        event: 'changeFake'
      },
      overrideIcon: {
        check: 'Boolean',
        init: false
      },
      icon: {
        check: 'String',
        nullable: true,
        event: 'changeIcon'
      },
      hash: {
        check: 'Number',
        nullable: true
      },
      editing: {
        check: 'Boolean',
        init: false,
        event: 'changeEditing'
      },

      /**
       * A special configuration option for mulitple purposes, e.g. creating a fake FileItem with a special
       * behaviour like an "Add new File" used in writeable Folders.
       */
      special: {
        check: 'String',
        nullable: true,
        event: 'changeSpecial'
      },

      /**
       * Temporary file are not save in the backend yet
       */
      temporary: {
        check: 'Boolean',
        init: false,
        event: 'changeTemporary'
      },

      /**
       * Validation result for this files content (e.g. config file validation)
       */
      valid: {
        check: 'Boolean',
        init: true,
        event: 'changeValid'
      },

      /**
       * The validation of this files content found some warnings
       */
      hasWarnings: {
        check: 'Boolean',
        init: false,
        event: 'changeHasWarnings'
      },

      /**
       * Temporary content to show, e.g. for new files, when there is no 'real' file with content yet to request from the backend
       * this content should be shown
       */
      content: {
        check: 'String',
        nullable: true
      },
      modified: {
        check: 'Boolean',
        init: false,
        event: 'changeModified'
      },
      // Backend properties
      hasChildren: {
        check: "Boolean",
        event: "changeHasChildren",
        apply: "_applyHasChildren",
        init: false
      },
      name: {
        check: "String",
        event: "changeName",
        init: "",
        apply: '_applyName'
      },
      type: {
        check: ['dir', 'file'],
        transform: "_toLowerCase",
        nullable: true,
        apply: '_maintainIcon'
      },
      parentFolder: {
        check: 'String',
        nullable: true
      },
      readable: {
        check: 'Boolean',
        init: false,
        event: 'changeReadable'
      },
      writeable: {
        check: 'Boolean',
        init: false,
        event: 'changeWriteable'
      },
      mounted: {
        check: 'Boolean',
        init: false,
        event: 'changeMounted'
      },
      trash: {
        check: 'Boolean',
        init: false,
        event: 'changeTrash'
      },
      inTrash: {
        check: 'Boolean',
        init: false,
        event: 'changeInTrash'
      }
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      __P_38_0: null,
      __P_38_1: null,
      __P_38_2: null,
      _toLowerCase: function _toLowerCase(name) {
        return name.toLowerCase();
      },
      isRelated: function isRelated(path) {
        return this.getFullPath() === path;
      },
      _handleFileEvent: function _handleFileEvent(ev) {
        if (this.isFake()) {
          return;
        }

        var data = ev.getData();

        switch (data.action) {
          case 'moved':
            this.reload();
            break;

          case 'added':
            if (this.getType() === 'dir' && data.path.startsWith(this.getFullPath())) {
              this.reload();
            }

            break;

          case 'deleted':
            if (data.path === this.getFullPath()) {
              // this item has been deleted
              this.dispose();
            } else if (this.getType() === 'dir' && data.path.startsWith(this.getFullPath())) {
              // delete child
              var children = this.getChildren();
              children.some(function (child) {
                if (child.getFullPath() === data.path) {
                  children.remove(child);
                  this.removeRelatedBindings(child);
                  return true;
                }
              }, this);
            }

            break;
        }
      },
      _applyName: function _applyName(value, old) {
        this.__P_38_1 = null;

        if (value && (this.getDisplayName() === null || this.getDisplayName() === old)) {
          // use name as default display name
          this.setDisplayName(value);
        }
      },
      getPath: function getPath() {
        if (!this.__P_38_0) {
          var parentFolder = this.getParentFolder();

          if (!parentFolder) {
            parentFolder = '';
          } else if (!parentFolder.endsWith('/')) {
            parentFolder += '/';
          }

          this.__P_38_0 = parentFolder;
        }

        return this.__P_38_0;
      },
      _onOpen: function _onOpen(value) {
        if (!this.isLoaded() && value) {
          this.load();
        }

        this._maintainIcon();
      },
      _maintainIcon: function _maintainIcon() {
        if (!this.isOverrideIcon()) {
          if (this.getType() === 'file') {
            this.setIcon(cv.theme.dark.Images.getIcon('file', 18));
          } else if (this.isTrash()) {
            this.setIcon(cv.theme.dark.Images.getIcon('trash', 18));
          } else if (this.isOpen()) {
            this.setIcon(cv.theme.dark.Images.getIcon('folder-open', 18));
          } else if (this.isMounted()) {
            this.setIcon(cv.theme.dark.Images.getIcon('mounted-folder', 18));
          } else {
            this.setIcon(cv.theme.dark.Images.getIcon('folder', 18));
          }
        }
      },
      isConfigFile: function isConfigFile() {
        return cv.ui.manager.model.FileItem.isConfigFile(this.getName());
      },
      _applyHasChildren: function _applyHasChildren(value) {
        if (value === true && this.getChildren().length === 0) {
          // add dummy child
          this.getChildren().push(new cv.ui.manager.model.FileItem(''));
        }
      },
      unload: function unload() {
        this.setLoaded(false);
        this.setLoading(false);
        this.getChildren().removeAll().forEach(function (child) {
          this.removeRelatedBindings(child);
        }, this);
      },
      reload: function reload(callback, context) {
        this.unload();
        return this.load(callback, context);
      },
      addChild: function addChild(child) {
        var oldParent = child.getParent();

        if (oldParent !== this) {
          oldParent.getChildren().remove(child);
          oldParent.removeRelatedBindings(child);
        }

        child.setParent(this);

        if (child.getType() !== "dir" || !child.isMounted()) {
          // inherit the mounted state from the parent folder
          this.bind('mounted', child, 'mounted');
        }

        this.getChildren().push(child);
      },
      _onGet: function _onGet(data) {
        var children = this.getChildren();
        children.removeAll().forEach(function (child) {
          this.removeRelatedBindings(child);
        }, this);

        if (data) {
          data.forEach(function (node) {
            var child = new cv.ui.manager.model.FileItem(null, null, this);

            if (node.hasOwnProperty('children')) {
              var nodeChildren = node.children;
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

        if (this.__P_38_2) {
          this.__P_38_2();
        }

        this.setLoading(false);
      },
      _onError: function _onError(err) {
        console.error(err);
        cv.ui.manager.snackbar.Controller.error(err);
        this.getChildren().removeAll().forEach(function (child) {
          this.removeRelatedBindings(child);
        }, this);
        this.setLoaded(true);

        if (this.__P_38_2) {
          this.__P_38_2();
        }

        this.setLoading(false);
      },
      load: function load(callback, context) {
        // If currently loading, delay ready
        if (this.getType() === 'file') {
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
        } // If not done yet, resolve the child elements of this container
        else if (this.isLoaded()) {
            if (callback) {
              callback.apply(context);
            }
          } else {
            this.setLoading(true);

            if (callback) {
              this.__P_38_2 = callback.bind(context || this);
            }

            cv.io.rest.Client.getFsClient().readSync({
              path: this.getFullPath()
            }, function (err, res) {
              if (err) {
                this._onError(err);
              } else {
                this._onGet(res);
              }
            }, this);
          }
      },

      /**
       * Returns the complete path needed for the REST API  to identify this file
       * @returns {null}
       */
      getFullPath: function getFullPath() {
        if (!this.__P_38_1) {
          this.__P_38_1 = this.getPath() + this.getName();
        }

        return this.__P_38_1;
      },
      getBusTopic: function getBusTopic() {
        return 'cv.manager.fs.' + this.getFullPath().replace(/\//g, '.');
      },

      /**
       * Returns a fake URI that can be used to identify the file.
       * Used by monaco editor as model URI.
       * @returns {Uri}
       */
      getUri: function getUri() {
        return 'cv://' + this.getFullPath();
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
      getServerPath: function getServerPath() {
        return qx.util.LibraryManager.getInstance().get('cv', 'resourceUri') + '/config/' + this.getFullPath();
      },

      /**
       *  Sort entries: folders first, files then
       */
      sortElements: function sortElements() {
        var sortF = function sortF(a, b) {
          if (a.getType() === 'dir') {
            if (b.getType() === 'dir') {
              if (a.isTrash()) {
                return 1;
              } else if (b.isTrash()) {
                return -1;
              }

              return a.getName().localeCompare(b.getName());
            } else {
              return -1;
            }
          } else if (b.getType() === 'dir') {
            return 1;
          } else {
            return a.getName().localeCompare(b.getName());
          }
        };

        this.getChildren().sort(sortF);
      },
      openPath: function openPath(path) {
        var parts = qx.lang.Type.isArray(path) ? path : path.split('/');
        var relPath = parts.shift();
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
        }, this);
      }
    },

    /*
    ***********************************************
      DESTRUCTOR  
    ***********************************************
    */
    destruct: function destruct() {
      this.__P_38_1 = null;
    }
  });
  cv.ui.manager.model.FileItem.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=FileItem.js.map?dt=1614016340750