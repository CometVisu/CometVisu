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
  construct: function (name, path, parent, fakeChildren) {
    this.base(arguments);
    this.initChildren(new qx.data.Array());
    if (fakeChildren) {
      this.setFakeChildren(fakeChildren);
    }
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
    },

    getConfigName: function (filename) {
      var match = /visu_config_?([^.]+)\.xml/.exec(filename);
      if (match) {
        return match[1];
      }
      return null;
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

    fakeChildren: {
      check: "Array",
      nullable: true
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
        if (callback) {
          callback.apply(context);
        }
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

    /**
     * Returns the complete path needed for the REST API  to identify this file
     * @returns {null}
     */
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
     * Returns the path to this file for requests over HTTP (not the REST API)
     * @returns {string}
     */
    getServerPath: function () {
      return qx.util.LibraryManager.getInstance().get('cv', 'resourceUri') + '/config/' + this.getFullPath();
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
