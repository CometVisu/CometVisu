/**
 * A qx.ui.form.ListItem with an additional label overlay over the icon to show the file type
 */
qx.Class.define('cv.ui.manager.form.FileListItem', {
  extend: qx.ui.core.Widget,
  implement : [qx.ui.form.IModel],

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function (label, icon, model) {
    this.base(arguments, label, icon);
    this._setLayout(new qx.ui.layout.Canvas());

    if (model) {
      this.setModel(model);

    }
    this.addListener('pointerover', this._onPointerOver, this);
    this.addListener('pointerout', this._onPointerOut, this);
  },

  /*
  *****************************************************************************
     EVENTS
  *****************************************************************************
  */
  events: {
    /** (Fired by {@link qx.ui.form.List}) */
    'action' : 'qx.event.type.Event'
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    appearance: {
      refine: true,
      init: 'cv-file-item'
    },

    model: {
      nullable: true,
      event: 'changeModel',
      apply: '_applyModel',
      dereference: true,
      check: 'cv.ui.manager.model.FileItem'
    },

    /**
     * Show the action buttons.
     */
    showFileActions: {
      check: 'Boolean',
      init: false,
      apply: '_maintainFileActions'
    },

    /** The label/caption/text of the qx.ui.basic.Atom instance */
    label: {
      nullable: true,
      check: 'String',
      event: 'changeLabel'
    },

    /** Any URI String supported by qx.ui.basic.Image to display an icon */
    icon: {
      check: 'String',
      nullable: true,
      themeable: true,
      event: 'changeIcon'
    },

    /**
     * The space between the icon and the label
     */
    gap: {
      check : 'Integer',
      nullable : false,
      event : 'changeGap',
      themeable : true,
      init : 4
    },


    /**
     * Configure the visibility of the sub elements/widgets.
     * Possible values: both, label, icon
     */
    show: {
      init : 'both',
      check : [ 'both', 'label', 'icon' ],
      themeable : true,
      inheritable : true,
      event : 'changeShow'
    },


    /**
     * The position of the icon in relation to the text.
     * Only useful/needed if text and icon is configured and 'show' is configured as 'both' (default)
     */
    iconPosition: {
      init   : 'left',
      check : ['top', 'right', 'bottom', 'left', 'top-left', 'bottom-left' , 'top-right', 'bottom-right'],
      themeable : true,
      event: 'changeIconPosition'
    },


    /**
     * Whether the content should be rendered centrally when to much space
     * is available. Enabling this property centers in both axis. The behavior
     * when disabled of the centering depends on the {@link #iconPosition} property.
     * If the icon position is <code>left</code> or <code>right</code>, the X axis
     * is not centered, only the Y axis. If the icon position is <code>top</code>
     * or <code>bottom</code>, the Y axis is not centered. In case of e.g. an
     * icon position of <code>top-left</code> no axis is centered.
     */
    center : {
      init : false,
      check : 'Boolean',
      themeable : true,
      event: 'changeCenter'
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _replacementManager: null,

    // overridden
    /**
     * @lint ignoreReferenceField(_forwardStates)
     */
    _forwardStates :
      {
        focused : true,
        selected : true,
        dragover : true
      },


    /**
     * Event handler for the pointer over event.
     */
    _onPointerOver : function() {
      this.addState('hovered');
    },


    /**
     * Event handler for the pointer out event.
     */
    _onPointerOut : function() {
      this.removeState('hovered');
    },

    _applyModel: function (value) {
      if (value && value.getType() === 'file') {
        var control = this.getChildControl('file-type');
        var type = value.getName().split('.').pop();

        // do not use file types that are longer than 4 chars (not enough space)
        if (type.length <= 4) {
          var handled = false;
          switch (type) {
            case 'xml':
              control.setValue('</>');
              handled = true;
              break;

            case 'js':
              type = qx.lang.String.firstUp(type); // jshint ignore:line
            case 'css':
            case 'conf':
              control.setValue(type);
              handled = true;
              break;
          }
          if (handled) {
            control.show();
          } else {
            control.exclude();
          }
        } else {
          control.exclude();
        }

        // fill the open menu
        // Viewers first
        var openMenu = this.getChildControl('open-menu');
        openMenu.removeAll();
        var registry = cv.ui.manager.control.FileHandlerRegistry.getInstance();
        var defaultHandler = registry.getFileHandler(value);
        var availableViewers = registry.getAllFileHandlers(value, 'view');
        availableViewers.forEach(function (handlerConf) {
          var button = new qx.ui.menu.Button(handlerConf.Clazz.constructor.TITLE, handlerConf.Clazz.constructor.ICON);
          button.setAppearance('open-with-button');
          button.setUserData('handlerId', handlerConf.Clazz.classname);
          button.addListener('execute', this._onOpenWith, this);
          openMenu.add(button);
          if (defaultHandler.Clazz.classname === handlerConf.Clazz.classname) {
            button.addState('default');
          }
        }, this);

        var availableEditors = registry.getAllFileHandlers(value, 'edit');
        availableEditors.forEach(function (handlerConf) {
          var button = new qx.ui.menu.Button(handlerConf.Clazz.constructor.TITLE, handlerConf.Clazz.constructor.ICON);
          button.setAppearance('open-with-button');
          button.setUserData('handlerId', handlerConf.Clazz.classname);
          button.addListener('execute', this._onOpenWith, this);
          openMenu.add(button);
          if (defaultHandler.Clazz.classname === handlerConf.Clazz.classname) {
            button.addState('default');
          }
        }, this);

      } else {
        this.getChildControl('file-type').exclude();
      }
      this._maintainFileActions();
    },

    _onOpenWith: function (ev) {
      var handlerId = ev.getTarget().getUserData('handlerId');
      qx.event.message.Bus.dispatchByName('cv.manager.openWith', {
        file: this.getModel(),
        handler: handlerId
      });
    },

    _applyIcon: function (value, old) {
      this.base(arguments, value, old);
      if (value && !value.startsWith('@')) {
        var control = this.getChildControl('atom').getChildControl('icon');
        if (!cv.ui.manager.viewer.Image.getImageData(value)) {
          // wait for image to be loaded
          control.addListenerOnce('loaded', this.__scaleWithAspect, this);
        } else {
          this.__scaleWithAspect();
        }
      }
    },

    _maintainFileActions: function () {
      var file = this.getModel();
      if (this.isShowFileActions() && file) {
        this.getChildControl('download-button');
        this.getChildControl('open-button');
        this.getChildControl('delete-button').setEnabled(file.isWriteable());
        this.getChildControl('bottom-bar').show();
      } else {
        this.getChildControl('bottom-bar').exclude();
      }
    },

    __scaleWithAspect: function () {
      var data = cv.ui.manager.viewer.Image.getImageData(this.getIcon());
      var control = this.getChildControl('atom').getChildControl('icon');
      var sizeHint = control.getSizeHint();
      var width = sizeHint.width;
      var height = Math.round(1 / data.aspectRatio * width);
      var padding = [0, 0, 0, 0];
      if (height > sizeHint.height) {
        height = sizeHint.height;
        width = Math.round(data.aspectRatio * height);
        padding[1] = Math.round((sizeHint.width - width) / 2);
        padding[3] = padding[1];
      } else {
        padding[0] = Math.round((sizeHint.height - height) / 2);
        padding[2] = padding[0];
      }
      control.setPadding(padding);
    },

    _maintainFileTypePosition: function () {
      var iconBounds = this.getChildControl('atom').getChildControl('icon').getBounds();
      var top = Math.round(iconBounds.top + iconBounds.height / 2);
      this.getChildControl('file-type').setLayoutProperties({
        left: iconBounds.left,
        top: top,
        right: iconBounds.left + iconBounds.width,
        bottom: top + 18
      });
    },

    // overridden
    _createChildControlImpl : function(id) {
      var control;

      switch (id) {
        case 'atom':
          control = new qx.ui.basic.Atom();
          ['label', 'icon', 'gap', 'iconPosition', 'show', 'center'].forEach(function (prop) {
            this.bind(prop, control, prop);
          }, this);
          control.setAnonymous(true);
          this._add(control, {top: 0, left: 0, right: 0, bottom: 34});
          break;

        case 'file-type':
          control = new qx.ui.basic.Label();
          control.set({
            zIndex: 11,
            anonymous: true,
            font: 'title',
            textAlign: 'center',
            textColor: 'background-main'
          });
          var icon = this.getChildControl('atom').getChildControl('icon');
          icon.bind('visibility', control, 'visibility');
          icon.addListener('resize', this._maintainFileTypePosition, this);
          control.exclude();
          this._add(control);
          break;

        case 'bottom-bar':
          control = new qx.ui.container.Composite(new qx.ui.layout.HBox(4, 'center'));
          control.setAnonymous(true);
          this._add(control, {left: 0, bottom: 0, right: 0});
          break;

        case 'download-button':
          control = new qx.ui.form.Button(null, cv.theme.dark.Images.getIcon('download', 18));
          control.addListener('execute', function () {
            cv.ui.manager.control.FileController.getInstance().download(this.getModel());
          }, this);
          this.getChildControl('bottom-bar').add(control);
          break;

        case 'open-button':
          control = new qx.ui.form.MenuButton(null, cv.theme.dark.Images.getIcon('open-with', 18), this.getChildControl('open-menu'));
          this.getChildControl('bottom-bar').add(control);
          break;

        case 'open-menu':
          control = new qx.ui.menu.Menu();
          break;

        case 'delete-button':
          control = new qx.ui.form.Button(null, cv.theme.dark.Images.getIcon('delete', 18));
          control.addListener('execute', function () {
            qx.event.message.Bus.dispatchByName('cv.manager.action.delete', this.getModel());
          }, this);
          this.getChildControl('bottom-bar').add(control);
          break;

        case 'validate-button':
          control = new qx.ui.form.Button(null, cv.theme.dark.Images.getIcon('validate', 18));
          control.addListener('execute', function () {
            cv.ui.manager.control.FileController.getInstance().validate(this.getModel());
          }, this);
          this.getChildControl('bottom-bar').add(control);
          break;

        case 'replace-button':
          control = new com.zenesis.qx.upload.UploadButton(null, cv.theme.dark.Images.getIcon('upload', 18));
          this._replacementManager = new cv.ui.manager.upload.UploadMgr(control);
          this._replacementManager.setForce(true);
          this._replacementManager.addWidget(control);
          this.getChildControl('bottom-bar').add(control);
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
    this.removeListener('pointerover', this._onPointerOver, this);
    this.removeListener('pointerout', this._onPointerOut, this);

    this._disposeObjects('_replacementManager');
  }
});
