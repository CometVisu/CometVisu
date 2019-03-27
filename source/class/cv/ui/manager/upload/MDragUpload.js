/**
 * Add upload via drag&drop feature to this widget. The including widget must have a
 * "upload-dropbox" childcontrol.
 */
qx.Mixin.define("cv.ui.manager.upload.MDragUpload", {

  /*
  *****************************************************************************
     CONSTRUCTOR
  *****************************************************************************
  */
  construct : function() {
    this.setDroppable(true);
    if (this.getBounds()) {
      this._applyStartDragListeners();
    } else {
      this.addListenerOnce("appear", function() {
        this._applyStartDragListeners();
      }, this);
    }
    if (!(this._getLayout() instanceof qx.ui.layout.Grow)) {
      this.addListener('resize', this.__syncBounds, this);
    }
  },

  /*
  *****************************************************************************
     PROPERTIES
  *****************************************************************************
  */
  properties : {
    uploadMode: {
      check: "Boolean",
      init: false,
      apply: "__applyUploadMode"
    },

    uploadHint: {
      check: "String",
      init: ""
    }
  },

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    /**
     * Handles HTML5 drop events (dropping external files on dom element)
     * @param ev {Event}
     */
    onHtml5Drop : function (ev) {
      ev.preventDefault();
      this.__getFiles(ev).forEach(this.uploadFile, this);
    },

    /**
     * Uploads the dropped file to the correct folder:
     * - config files to the resources/config folder
     * - accepted media files to the resources/config/media folder
     * @param file {File}
     */
    uploadFile: function (file) {
      var isConfig = cv.ui.manager.model.FileItem.isConfigFile(file.name);

      var folder;
      if (isConfig) {
        // upload to root folder
        folder = new cv.ui.manager.model.FileItem('.');
      } else if (cv.ui.manager.tree.FileSystem.isAccepted(file.type)) {
        // upload to media folder
        folder = new cv.ui.manager.model.FileItem('media');
      }
      if (folder) {
        folder.set({
          type: 'dir'
        });
        var manager = new cv.ui.manager.upload.UploadMgr();
        manager.setFolder(folder);
        manager.uploadFile(file);
      }
    },

    hasDroppableFile: function (ev) {
      return this.__getFiles(ev).length > 0;
    },

    /**
     * Extracts acceptable files from event
     * @param ev {Event}
     * @private
     */
    __getFiles: function (ev) {
      var files = [];
      var i, l, file;

      if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (i = 0, l = ev.dataTransfer.items.length; i < l; i++) {
          // If dropped items aren't files, reject them
          var item = ev.dataTransfer.items[i];
          if (item.kind === 'file' && cv.ui.manager.tree.FileSystem.isAccepted(item.type)) {
            file = item.getAsFile();
            files.push(file);
          }
        }
      } else {
        for (i = 0, l = ev.dataTransfer.files.length; i < l; i++) {
          file = ev.dataTransfer.files[i];
          if (cv.ui.manager.tree.FileSystem.isAccepted(file.type)) {
            files.push(file);
          }
        }
      }
      return files;
    }
  },

  /*
  *****************************************************************************
     MEMBERS
  *****************************************************************************
  */
  members : {
    __hasEmptyInfo: null,

    __syncBounds: function () {
      var bounds = this.getBounds();
      this.getChildControl('upload-overlay').setUserBounds(bounds.left, bounds.top, bounds.width, bounds.height);
      this.getChildControl('upload-dropbox').setUserBounds(bounds.left, bounds.top, bounds.width, bounds.height);
    },

    // overridden
    _createMDragUploadChildControlImpl: function(id) {
      var control;
      var bounds = this.getBounds();

      switch(id) {
        case "upload-overlay":
          control = new qx.ui.container.Composite();
          control.setZIndex(1000000);
          control.exclude();
          if (!(this._getLayout() instanceof qx.ui.layout.Grow)) {
            control.setUserBounds(bounds.left, bounds.top, bounds.width, bounds.height);
          }
          this._add(control);
          this.getChildControl("upload-dropbox").bind("visibility", control, "visibility");
          break;

        case "upload-dropbox":
          control = new qx.ui.container.Composite(new qx.ui.layout.Atom().set({center: true}));
          var dropBox = new qx.ui.basic.Atom(this.getUploadHint(), cv.theme.dark.Images.getIcon('upload', 128));
          dropBox.set({
            allowGrowY: false
          });
          control.setAnonymous(true);
          control.add(dropBox);
          control.exclude();
          if (!(this._getLayout() instanceof qx.ui.layout.Grow)) {
            control.setUserBounds(bounds.left, bounds.top, bounds.width, bounds.height);
          }
          this._add(control);
          break;
      }
      return control;
    },

    __onStopDragging: function(ev) {
      ev.preventDefault();
      this.setUploadMode(false);
    },

    /**
     * Apply dragover/-leave listeners to the dashboard to recognize File uploads via Drag&Drop
     */
    _applyStartDragListeners: function() {
      // add the start listener to this widget
      this.getContentElement().getDomElement().addEventListener("dragenter", function(ev) {
        // ev.preventDefault();
        if (cv.ui.manager.upload.MDragUpload.hasDroppableFile(ev)) {
          // we have something to drop
          this.setUploadMode(true);
        }
      }.bind(this), false);
      if (this.getChildControl("upload-overlay").getBounds()) {
        this._applyDragListeners();
      } else {
        this.getChildControl("upload-overlay").addListenerOnce("appear", function() {
          this._applyDragListeners();
        }, this);
      }

    },

    /**
     * Apply dragover/-leave listeners to the dashboard to recognize File uploads via Drag&Drop
     */
    _applyDragListeners: function() {
      var element = this.getChildControl("upload-overlay").getContentElement().getDomElement();
      element.addEventListener("dragexit", function() {
        this.setUploadMode(false);
      }.bind(this), false);

      element.addEventListener("dragover", function(ev) {
        ev.preventDefault();
        if (cv.ui.manager.upload.MDragUpload.hasDroppableFile(ev)) {
          this.setUploadMode(true);
        }
      }.bind(this), false);
      document.addEventListener("dragleave", function(ev) {
        this.__onStopDragging(ev);
      }.bind(this), false);
      element.addEventListener("dragend", function() {
        this.setUploadMode(false);
      }.bind(this), false);

      element.addEventListener("drop", function(ev) {
        cv.ui.manager.upload.MDragUpload.onHtml5Drop(ev);
        this.__onStopDragging(ev);
      }.bind(this), false);
    },

    // property apply
    __applyUploadMode: function(value) {
      if (value === true) {
        this.getChildControl("upload-dropbox").show();
        this.setOpacity(0.2);
        if (this.hasChildControl("empty-info") && this.getChildControl("empty-info").isVisible()) {
          this.getChildControl("empty-info").exclude();
          this.__hasEmptyInfo = true;
        } else {
          this.__hasEmptyInfo = false;
        }
      } else {
        this.getChildControl("upload-dropbox").exclude();
        this.setOpacity(1.0);
        if (this.__hasEmptyInfo === true) {
          this.getChildControl("empty-info").show();
        }
      }
    }
  }
});