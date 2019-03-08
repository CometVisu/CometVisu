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

    hasChildren : {
      check : "Boolean",
      event : "changeHasChildren",
      apply : "_applyHasChildren",
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

    icon: {
      check: 'String',
      nullable: true,
      event: 'changeIcon'
    },

    rawData: {
      check: 'Object'
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
      if (this.getType() === 'file') {
        this.setIcon(osparc.theme.osparcdark.Image.URLS.file);
      } else if (this.isOpen()) {
        this.setIcon(osparc.theme.osparcdark.Image.URLS['folder-open']);
      } else {
        this.setIcon(osparc.theme.osparcdark.Image.URLS.folder);
      }
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
        cv.io.rest.Client.getDirClient().removeListener('getSuccess', this._onGet, this);
      }
    },

    _onGet: function (ev) {
      var data = ev.getData();
      var children = new qx.data.Array();
      data.forEach(function (node) {
        var child = new cv.ui.manager.model.FileItem(node.name, node.path, this);
        child.setType(node.type);
        child.setHasChildren(node.hasChildren && !!node.path);
        child.setRawData(node);
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

    load: function(callback, context) {
      // If currently loading, delay ready
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
        var client = cv.io.rest.Client.getDirClient();
        client.addListener('getSuccess', this._onGet, this);
        if (callback) {
          this.__onLoadCallback = callback.bind(context || this);
        }
        cv.io.rest.Client.getDirClient().get({path: this.__path});
      }
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
    cv.io.rest.Client.getDirClient().removeListener('getSuccess', this._onGet, this);
  } 
});
