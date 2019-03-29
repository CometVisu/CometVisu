/**
 * Represents an entry in the filesystem (file or folder).
 */
qx.Class.define('cv.ui.manager.model.FileItem', {
  extend: qx.core.Object,
  include: [
    qx.data.marshal.MEventBubbling,
    cv.ui.manager.control.MFileEventHandler
  ],
  implement: [cv.ui.manager.control.IFileEventHandler],
  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function (name, path, parent) {
    this.base(arguments);
    this.initChildren(new qx.data.Array());
    this.__path = path;
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
    isConfigFile: function (path) {
      return /visu_config.*\.xml/.test(path);
    }
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    open : {
      check : "Boolean",
      event : "changeOpen",
      apply : "_onOpen",
      init : false
    },

    loaded : {
      check : "Boolean",
      event : "changeLoaded",
      init : false
    },

    loading : {
      check : "Boolean",
      event : "changeLoading",
      init : false
    },

    parent : {
      event : "changeParent",
      init : null
    },

    children : {
      check : "qx.data.Array",
      event : "changeChildren",
      apply: "_applyEventPropagation",
      deferredInit : true
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
     * The opening state: permanent false behaves like a quick preview, where
     * the current file content is replaces by the next selected file on single click.
     * In permanent mode a new tab will be created, which content will not be replaced.
     */
    permanent: {
      check: 'Boolean',
      init: false,
      event: 'changePermanent'
    },

    modified: {
      check: 'Boolean',
      init: false,
      event: 'changeModfied',
      apply: '_applyModified'
    },

    valid: {
      check: 'Boolean',
      init: true,
      event: 'changeValid'
    },

    // Backend properties

    hasChildren : {
      check : "Boolean",
      event : "changeHasChildren",
      apply : "_applyHasChildren",
      init : false
    },

    name : {
      check : "String",
      event : "changeName",
      init : "",
      apply: '_applyName'
    },

    type: {
      check: ['dir', 'file'],
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
    __path: null,
    __fullPath: null,
    __onLoadCallback: null,

    isRelated: function (path) {
      return this.getFullPath() === path;
    },

    _handleFileEvent: function (ev) {
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
                return true;
              }
            }, this);
          }
          break;
      }
    },

    rename: function (newName) {
      var client = cv.io.rest.Client.getFsClient();
      var newPath = this.__path || '';
      if (newPath.length > 0 && !newPath.endsWith('/')) {
        newPath += '/';
      }
      newPath += newName;
      if (this.getUserData('new') === true) {
        // create new item
        client.createSync({path: newPath, type: this.getType()}, function (err) {
          if (err) {
            cv.ui.manager.snackbar.Controller.error(err);
          } else {
            cv.ui.manager.snackbar.Controller.info(this.getType() === 'file' ?
              qx.locale.Manager.tr('File has been created') :
              qx.locale.Manager.tr('Folder has been created')
            );
            this.setUserData('new', null);
            this.resetModified();
            this.setName(newName);
            this.reload();
          }
        }, this);
      } else if (this.getFullPath() !== newPath) {
        client.moveSync({src: this.getFullPath(), target: newPath}, function (err) {
          if (err) {
            cv.ui.manager.snackbar.Controller.error(err);
          } else {
            cv.ui.manager.snackbar.Controller.info(this.getType() === 'file' ?
              qx.locale.Manager.tr('File has been renamed') :
              qx.locale.Manager.tr('Folder has been renamed')
            );
            this.setName(newName);
            this.resetModified();
            this.reload();
          }
          this.resetEditing();
        }, this);
      }
    },

    /**
     * Move file to another path
     * @param target {String} new path of the file
     */
    move: function (target) {
      var client = cv.io.rest.Client.getFsClient();
      client.moveSync({src: this.getFullPath(), target: target}, function (err) {
        if (err) {
          cv.ui.manager.snackbar.Controller.error(err);
        } else {
          cv.ui.manager.snackbar.Controller.info(this.getType() === 'file' ?
            qx.locale.Manager.tr('File has been moved') :
            qx.locale.Manager.tr('Folder has been moved')
          );
          qx.event.message.Bus.dispatchByName('cv.manager.file', {
            action: 'moved',
            path: this.getFullPath()
          });
        }
      }, this);
    },

    /**
     * Restore file from trash by moving it out of the trash to the old path
     * @param target {String} new path of the file
     */
    restore: function () {
      if (this.isInTrash()) {
        var client = cv.io.rest.Client.getFsClient();
        var target = this.getFullPath().replace('.trash/', '');
        client.moveSync({src: this.getFullPath(), target: target}, function (err) {
          if (err) {
            cv.ui.manager.snackbar.Controller.error(err);
          } else {
            cv.ui.manager.snackbar.Controller.info(this.getType() === 'file' ?
              qx.locale.Manager.tr('File has been restored') :
              qx.locale.Manager.tr('Folder has been restored')
            );
            qx.event.message.Bus.dispatchByName('cv.manager.file', {
              action: 'restored',
              path: this.getFullPath()
            });
          }
        }, this);
      }
    },

    'delete': function(callback, context) {
      if (this.getUserData('new') === true) {
        // new file, no need to call the backend
        if (callback) {
          callback.apply(context);
        }
      } else {
        var client = cv.io.rest.Client.getFsClient();
        client.deleteSync({path: this.getFullPath(), force: this.isTrash()}, null, function (err) {
          if (err) {
            cv.ui.manager.snackbar.Controller.error(err);
          } else {
            var message;
            if (this.isTrash()) {
              message = qx.locale.Manager.tr('Trash has been cleared');
            } else if (this.isInTrash()) {
              message = this.getType() === 'file' ?
                qx.locale.Manager.tr('File has been removed from trash') :
                qx.locale.Manager.tr('Folder has been removed from trash');
            } else {
              message = this.getType() === 'file' ?
                qx.locale.Manager.tr('File has been deleted') :
                qx.locale.Manager.tr('Folder has been deleted');
            }
            cv.ui.manager.snackbar.Controller.info(message);
            if (callback) {
              callback.apply(context);
            }
            qx.event.message.Bus.dispatchByName('cv.manager.file', {
              action: 'deleted',
              path: this.getFullPath()
            });
          }
        }, this);
      }
    },

    download: function () {
      if (this.getType() === 'file') {
        var element = document.createElement('a');
        element.setAttribute('href', cv.io.rest.Client.BASE_URL + '/fs?download=true&path=' + this.getFullPath());
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
      }
    },

    _applyName: function () {
      this.__fullPath = null;
    },

    getPath: function () {
      return this.__path;
    },

    _onOpen : function(value){

      if(!this.isLoaded() && value) {
        this.load();
      }
      this._maintainIcon();
    },

    _maintainIcon: function () {
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

    _applyModified: function (value) {
      if (value && !this.isPermanent()) {
        // change to permanent once we have a modification
        this.setPermanent(true);
      }
    },

    isConfigFile: function () {
      return cv.ui.manager.model.FileItem.isConfigFile(this.getName());
    },

    _applyHasChildren: function (value) {
      if (value === true && this.getChildren().length === 0) {
        // add dummy child
        this.getChildren().push(new cv.ui.manager.model.FileItem(''));
      }
    },

    unload: function() {
      this.setLoaded(false);
      this.setLoading(false);
      this.getChildren().removeAll();
    },

    reload : function(callback, context) {
      this.unload();
      return this.load(callback, context);
    },

    addChild: function (child) {
      var oldParent = child.getParent();
      if (oldParent !== this) {
        oldParent.getChildren().remove(child);
      }
      child.setParent(this);
      this.getChildren().push(child);
    },

    _onGet: function (data) {
      var children = this.getChildren();
      children.removeAll();
      if (data) {
        data.forEach(function (node) {
          var child = new cv.ui.manager.model.FileItem(null, null, this);
          child.set(node);
          children.push(child);
        }, this);
        this.setChildren(children);
        this.sortElements();
      }
      this.setLoaded(true);
      if (this.__onLoadCallback) {
        this.__onLoadCallback();
      }
      this.setLoading(false);
    },

    _onError: function (err) {
      console.error(err);
      cv.ui.manager.snackbar.Controller.error(err);
      this.getChildren().removeAll();
      this.setLoaded(true);
      if (this.__onLoadCallback) {
        this.__onLoadCallback();
      }
      this.setLoading(false);
    },

    load: function(callback, context) {
      // If currently loading, delay ready
      if (this.getType() === 'file') {
        // nothing to load
        this.setLoaded(true);
      }
      if (this.isLoading()) {
        if (callback) {
          this.addListenerOnce("changeLoading", callback, context);
        }
      }
      // If not done yet, resolve the child elements of this container
      else if (this.isLoaded()) {
        callback.apply(context);
      }
      else {
        this.setLoading(true);
        if (callback) {
          this.__onLoadCallback = callback.bind(context || this);
        }
        cv.io.rest.Client.getFsClient().readSync({path: this.getFullPath()}, function (err, res) {
          if (err) {
            this._onError(err);
          } else {
            this._onGet(res);
          }
        }, this);
      }
    },

    getFullPath: function () {
      if (!this.__fullPath) {
        var parentFolder = this.getParentFolder();
        if (!parentFolder) {
          parentFolder = '';
        } else if (!parentFolder.endsWith('/')) {
          parentFolder += '/';
        }
        this.__fullPath = parentFolder + this.getName();
      }
      return this.__fullPath;
    },

    /**
     * Returns a fake URI that can be used to identify the file.
     * Used by monaco editor as model URI.
     * @returns {Uri}
     */
    getUri: function () {
      return 'cv://' + this.getFullPath();
    },

    /**
     *  Sort entries: folders first, files then
     */
    sortElements: function () {
      var sortF = function (a, b) {
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
    }
  },
  
  /*
  ***********************************************
    DESTRUCTOR  
  ***********************************************
  */
  destruct: function () {
    this.__fullPath = null;
  } 
});
