/**
 * Displays folder content in an explorer like view.
 */
qx.Class.define("cv.ui.manager.viewer.Folder", {
  extend: cv.ui.manager.viewer.AbstractViewer,
  implement: [
    qx.ui.core.IMultiSelection,
    qx.ui.form.IModelSelection
  ],
  include: [
    qx.ui.core.MMultiSelectionHandling,
    qx.ui.core.MRemoteChildrenHandling,
    qx.ui.form.MModelSelection,
    cv.ui.manager.control.MFileEventHandler
  ],

  /*
 ***********************************************
   CONSTRUCTOR
 ***********************************************
 */
  construct: function (noToolbar) {
    this.base(arguments);
    cv.ui.manager.model.Preferences.getInstance().bind("startViewMode", this, "viewMode");
    this._isImageRegex = new RegExp("\\.(" + cv.ui.manager.viewer.Image.SUPPORTED_FILES.join("|") + ")$", "i");
    this.initModel(new qx.data.Array());
    this._setLayout(new qx.ui.layout.VBox(8));

    this._newItem = new cv.ui.manager.model.FileItem("new", "new", null).set({
      fake: true,
      type: "file",
      loaded: true,
      icon: cv.theme.dark.Images.getIcon("upload"),
      displayName: this.tr("Upload file"),
      special: "add-file"
    });

    this._debouncedOnFilter = qx.util.Function.debounce(this._onFilter, 500, false);
    if (!noToolbar) {
      this._createChildControl("toolbar");
    }
    this._createChildControl("filter");
  },

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    SUPPORTED_FILES: function isDir(item) {
      // noinspection JSConstructorReturnsPrimitive
      return item.getType() === "dir";
    },
    TITLE: qx.locale.Manager.tr("Show folder"),
    ICON: cv.theme.dark.Images.getIcon("folder", 18)
  },

  /*
  ***********************************************
    EVENTS
  ***********************************************
  */
  events: {
    /**
     * This event is fired after a list item was added to the list. The
     * {@link qx.event.type.Data#getData} method of the event returns the
     * added item.
     */
    addItem : "qx.event.type.Data",

    /**
     * This event is fired after a list item has been removed from the list.
     * The {@link qx.event.type.Data#getData} method of the event returns the
     * removed item.
     */
    removeItem : "qx.event.type.Data"
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    model: {
      check: "qx.data.Array",
      deferredInit: true
    },

    permanentFilter: {
      check: "Function",
      nullable: true,
      apply: "_onFilter"
    },

    showTextFilter: {
      check: "Boolean",
      init: true,
      apply: "_applyShowTextFilter"
    },

    labelConverter: {
      check: "Function",
      nullable: true
    },

    disableScrolling: {
      check: "Boolean",
      init: false,
      apply: "_applyDisableScrolling"
    },

    viewMode: {
      check: ["list", "preview"],
      init: "list",
      event: "changeViewMode"
    }
  },

  /*
 ***********************************************
   MEMBERS
 ***********************************************
 */
  members: {
    _controller: null,
    _isImageRegex: null,
    _newItem: null,

    /** @type {Class} Pointer to the selection manager to use */
    SELECTION_MANAGER : qx.ui.core.selection.ScrollArea,

    _defaultLabelConverter: function (name) {
      if (this.getViewMode() === "list") {
        // do not remove file type in list mode
        return name;
      }
      var parts = name.split(".");
      if (parts.length > 1) {
        parts.pop();
      }
      return parts.join(".");
    },

    _getDelegate: function () {
      var labelConverter = this.getLabelConverter();
      var converter = {
        converter: labelConverter ? labelConverter : this._defaultLabelConverter.bind(this)
      };
      return {
        createItem: function () {
          return new cv.ui.manager.form.FileListItem();
        },

        configureItem: function (item) {
          item.addListener("dbltap", this._onDblTap, this);
          item.addListener("contextmenu", this._onFsItemRightClick, this);
          item.addListener("action", this._onFsItemRightClick, this);
          item.setShowFileActions(true);
          this.bind("viewMode", item, "viewMode");
        }.bind(this),

        bindItem: function (controller, item, index) {
          controller.bindProperty("", "model", null, item, index);
          controller.bindProperty("displayName", "label", converter, item, index);
          controller.bindProperty("icon", "icon", {
            converter: function (source, file) {
              if (file.getType() === "file" && this._isImageRegex.test(file.getName())) {
                // use the image as icon
                return file.getServerPath();
              } 
                if (!source) {
                  return null;
                }
                // remove size from icon source
                var parts = source.split("/");
                if (parts.length === 3) {
                  parts.pop();
                }
                return parts.join("/");
            }.bind(this)
          }, item, index);
        }.bind(this)
      };
    },

    _onFsItemRightClick: function (ev) {
      var file = ev.getCurrentTarget().getModel();
      if (file.getSpecial() === "add-file") {
        ev.preventDefault();
        if (ev.getBubbles()) {
          ev.stopPropagation();
        }
        return;
      }
      var menu = cv.ui.manager.contextmenu.GlobalFileItem.getInstance();
      menu.configure(file);
      ev.getCurrentTarget().setContextMenu(menu);
      menu.openAtPointer(ev);

      // Do not show native menu
      // don't open any other contextmenus
      if (ev.getBubbles()) {
        ev.stop();
      }
    },

    _onDblTap: function (ev) {
      var file = ev.getCurrentTarget().getModel();
      if (file.getSpecial() === "add-file") {
        // Select file for upload

      } else {
        qx.event.message.Bus.dispatchByName("cv.manager.open", file);
      }
    },

    _applyFile: function (file, old) {
      if (old) {
        old.removeRelatedBindings(this);
        this.resetModel();
      }
      if (file) {
        var container = this.getChildControl("list");
        if (!this._controller) {
          this._controller = new qx.data.controller.List(null, container);
          this._controller.setDelegate(this._getDelegate());
        }
        file.bind("children", this, "model");
        var model = this.getModel();
        this._newItem.setParent(file);
        model.addListener("change", function () {
          if (this.getChildControl("filter").getValue() || this.getPermanentFilter()) {
            this._onFilter();
          } else {
            this._controller.setModel(model);
          }
        }, this);
        this._controller.setModel(model);
        file.load();
      } else {
        if (this._controller) {
          this._controller.resetModel();
        }
        this._newItem.resetParent();
      }
    },

    _handleFileEvent: function (ev) {
      var folder = this.getFile();
      var data = ev.getData();
      switch (data.action) {
        case "moved":
          folder.reload();
          break;

        case "added":
        case "uploaded":
        case "created":
          if (data.path.startsWith(folder.getFullPath())) {
            folder.reload();
          }
          break;

        case "deleted":
          if (folder) {
            if (data.path === folder.getFullPath()) {
              // this item has been deleted
              this.dispose();
            } else if (data.path.startsWith(folder.getFullPath())) {
              // delete child
              var children = folder.getChildren();
              children.some(function (child) {
                if (child.getFullPath() === data.path) {
                  children.remove(child);
                  this.removeRelatedBindings(child);
                  return true;
                }
              }, this);
            }
          }
          var children = this.getModel();
          children.some(function (child) {
            if (child.getFullPath() === data.path) {
              children.remove(child);
              this.removeRelatedBindings(child);
              return true;
            }
          }, this);
          break;
      }
    },

    _applyShowTextFilter: function (value) {
      this.getChildControl("filter").setVisibility(value ? "visible" : "excluded");
    },

    _onFilter: function () {
      if (this._controller) {
        var filterString = this.getChildControl("filter").getValue();
        var filterFunction = this.getPermanentFilter();
        var filtered = this.getModel().filter(function (file) {
          return (!filterFunction || filterFunction(file)) && (!filterString || file.getName().includes(filterString));
        });
        this._controller.setModel(filtered);
      }
    },

    getChildrenContainer: function () {
      return this.getChildControl("list");
    },

    /**
     * Handle child widget adds on the content pane
     *
     * @param e {qx.event.type.Data} the event instance
     */
    _onAddChild : function(e) {
      this.fireDataEvent("addItem", e.getData());
    },

    /**
     * Handle child widget removes on the content pane
     *
     * @param e {qx.event.type.Data} the event instance
     */
    _onRemoveChild : function(e) {
      this.fireDataEvent("removeItem", e.getData());
    },

    _onFileEvent: function (ev) {
      var data = ev.getData();
      switch (data.action) {
        case "deleted":
          break;
      }
    },

    _applyDisableScrolling: function (value) {
      if (value) {
        this.getChildControl("scroll").exclude();
        this._addAt(this.getChildControl("list"), 1, {flex: 1});
      } else {
        var scrollContainer = this.getChildControl("scroll");
        scrollContainer.show();
        scrollContainer.add(this.getChildControl("list"));
        this._addAt(scrollContainer, 1, {flex: 1});
      }
    },

    // overridden
    _createChildControlImpl : function(id) {
      var control;

      switch (id) {
        case "toolbar":
          control = new cv.ui.manager.ToolBar(null, ["new-file", "new-folder", "upload", "reload"]);
          this.bind("file", control, "folder");
          control.addListener("reload", function () {
            this.getFile().reload();
          }, this);
          this._addAt(control, 0);
          break;

        case "filter":
          control = new qx.ui.form.TextField();
          control.set({
            placeholder: this.tr("Filter by name..."),
            liveUpdate: true,
            margin: 8
          });
          if (!this.isShowTextFilter()) {
            control.exclude();
          }
          control.addListener("changeValue", this._debouncedOnFilter, this);
          this._addAt(control, 1);
          break;

        case "scroll":
          control = new qx.ui.container.Scroll();
          this._addAt(control, 2, {flex: 1});
          break;

        case "list":
          control = new qx.ui.container.Composite(new qx.ui.layout.Flow(8, 8));

          // Used to fire item add/remove events
          control.addListener("addChildWidget", this._onAddChild, this);
          control.addListener("removeChildWidget", this._onRemoveChild, this);
          if (this.isDisableScrolling()) {
            this._addAt(control, 1, {flex: 1});
          } else {
            this.getChildControl("scroll").add(control);
          }
          break;
      }

      return control || this.base(arguments, id);
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    this._disposeObjects("_controller");
    this._isImageRegex = null;
    cv.ui.manager.model.Preferences.getInstance().removeRelatedBindings(this);
  }
});
