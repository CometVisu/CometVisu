/**
 * Represents an entry in the filesystem (file or folder).
 */
qx.Class.define('cv.ui.manager.model.FileItem', {
  extend: qx.core.Object,
  include: qx.data.marshal.MEventBubbling,

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
      init : false,
      apply: '_applyLoaded'
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
      init : ""
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
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    __path: null,
    __onLoadCallback: null,

    _onOpen : function(value){

      if(!this.isLoaded() && value) {
        this.load();
      }
      this._maintainIcon();
    },

    _maintainIcon: function () {
      if (!this.isOverrideIcon()) {
        if (this.getType() === 'file') {
          this.setIcon(osparc.theme.osparcdark.Image.URLS.file);
        } else if (this.isOpen()) {
          this.setIcon(osparc.theme.osparcdark.Image.URLS['folder-open']);
        } else if (this.isMounted()) {
          this.setIcon('@MaterialIcons/folder_special/15');
        } else {
          this.setIcon(osparc.theme.osparcdark.Image.URLS.folder);
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
      return /visu_config.*\.xml/.test(this.getName());
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

    reload : function() {
      this.unload();
      return this.load();
    },
    
    _applyLoaded: function(value) {
      if (value) {
        this.__removeListeners();
      }
    },

    __addListeners: function () {
      var client = cv.io.rest.Client.getFsClient();
      client.addListener('readSuccess', this._onGet, this);
      client.addListener('readError', this._onError, this);
    },

    __removeListeners: function () {
      var client = cv.io.rest.Client.getFsClient();
      client.removeListener('readSuccess', this._onGet, this);
      client.removeListener('readError', this._onError, this);
    },

    _onGet: function (ev) {
      var data = ev.getData();
      var children = this.getChildren();
      children.removeAll();
      data.forEach(function (node) {
        var child = new cv.ui.manager.model.FileItem(null, this);
        child.set(node);
        children.push(child);
      });
      this.setChildren(children);
      this.sortElements();
      this.setLoaded(true);
      if (this.__onLoadCallback) {
        this.__onLoadCallback();
      }
      this.setLoading(false);
    },

    _onError: function (ev) {
      console.error(ev.getData());
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
        this.__addListeners();
        if (callback) {
          this.__onLoadCallback = callback.bind(context || this);
        }
        cv.io.rest.Client.getFsClient().read({path: this.getFullPath()});
      }
    },

    getFullPath: function () {
      var parentFolder = this.getParentFolder();
      if (!parentFolder) {
        parentFolder = '';
      } else if (!parentFolder.endsWith('/')) {
        parentFolder += '/';
      }
      return parentFolder + this.getName();
    },

    /**
     *  Sort entries: folders first, files then
     */
    sortElements: function () {
      var sortF = function (a, b) {
        if (a.getType() === 'dir') {
          if (b.getType() === 'dir') {
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
    this.__removeListeners();
  } 
});
