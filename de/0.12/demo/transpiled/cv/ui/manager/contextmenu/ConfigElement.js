(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.menu.Menu": {
        "construct": true,
        "require": true
      },
      "qx.core.Init": {
        "construct": true
      },
      "cv.ui.manager.model.XmlElement": {},
      "cv.theme.dark.Images": {},
      "qx.ui.menu.Button": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /**
   * Contextmenu for an XML-Element in a CometVisu config file.
   */
  qx.Class.define('cv.ui.manager.contextmenu.ConfigElement', {
    extend: qx.ui.menu.Menu,

    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct(editor) {
      qx.ui.menu.Menu.constructor.call(this);

      if (editor) {
        this.setEditor(editor);
      }

      this._commandGroup = qx.core.Init.getApplication().getCommandManager().getActive();

      this._init();
    },

    /*
    ***********************************************
      EVENTS
    ***********************************************
    */
    events: {
      "action": "qx.event.type.Data"
    },

    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      element: {
        check: 'cv.ui.manager.model.XmlElement',
        nullable: true,
        apply: '_applyElement'
      },
      editor: {
        check: 'cv.ui.manager.editor.Tree',
        nullable: true,
        apply: '_applyEditor'
      }
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      /**
       * @var {qx.ui.command.GroupManager}
       */
      _commandGroup: null,
      _applyEditor: function _applyEditor(value, old) {
        if (old) {
          old.removeListener('changeClipboard', this._maintainClipboardButtons, this);
        }

        if (value) {
          value.addListener('changeClipboard', this._maintainClipboardButtons, this);
        }
      },
      _applyElement: function _applyElement(value, old) {
        var _this = this;

        if (old) {
          old.removeRelatedBindings(this.getChildControl("delete-button"));
          old.removeRelatedBindings(this.getChildControl("cut-button"));
        }

        if (value) {
          var editable = value.isEditable();
          this.getChildControl('copy-button').setEnabled(true);

          if (editable) {
            value.bind('deletable', this.getChildControl("delete-button"), 'enabled');
            value.bind('deletable', this.getChildControl("cut-button"), 'enabled');
            this.getChildControl('view-button').exclude();
            this.getChildControl('edit-button').show();
            this.getChildControl('edit-button').setEnabled(value.getShowEditButton());
            var addable = value.getAddableChildren(true);
            this.getChildControl('create-button').setEnabled(addable.length > 0);
          } else {
            this.getChildControl('delete-button').setEnabled(false);
            this.getChildControl('cut-button').setEnabled(false);
            this.getChildControl('create-button').setEnabled(false);
            this.getChildControl('view-button').show(); // enable view button when there are attributes to show

            this.getChildControl('view-button').setEnabled(value.getShowEditButton());
            this.getChildControl('edit-button').exclude();
          }
        } else {
          ['edit', 'delete', 'cut', 'copy', 'paste', 'create'].forEach(function (name) {
            return _this.getChildControl(name + "-button").setEnabled(false);
          });
        }

        this._maintainClipboardButtons();
      },
      _init: function _init() {
        var _this2 = this;

        ['view', 'edit', 'delete'].forEach(function (name) {
          return _this2.add(_this2.getChildControl(name + "-button"));
        });
        this.addSeparator();
        ['cut', 'copy', 'paste'].forEach(function (name) {
          return _this2.add(_this2.getChildControl(name + "-button"));
        });
        this.addSeparator();
        this.add(this.getChildControl('create-button'));
      },
      _maintainClipboardButtons: function _maintainClipboardButtons() {
        var content = this.getEditor().getClipboard();
        var element = this.getElement();
        var enabled = (element ? element.isEditable() : false) && content instanceof cv.ui.manager.model.XmlElement;

        if (enabled) {
          // check if content is allowed as child here
          var addable = element.getAddableChildren(true);
          enabled = addable.includes(content.getName()) && element.isChildAllowedAtPosition(content, Number.POSITIVE_INFINITY);
        }

        this.getChildControl('paste-button').setEnabled(enabled);
      },
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        var control;

        switch (id) {
          case 'view-button':
            control = this.__P_29_0('view', this.tr('View'), cv.theme.dark.Images.getIcon('view', 18));
            control.exclude();
            break;

          case 'edit-button':
            control = this.__P_29_0('edit', this.tr('Edit'), cv.theme.dark.Images.getIcon('edit', 18));
            break;

          case 'delete-button':
            control = this.__P_29_0('delete', this.tr('Delete'), cv.theme.dark.Images.getIcon('delete', 18));
            break;

          case 'cut-button':
            control = this.__P_29_0('cut', this.tr('Cut'), cv.theme.dark.Images.getIcon('cut', 18));
            break;

          case 'copy-button':
            control = this.__P_29_0('copy', this.tr('Copy'), cv.theme.dark.Images.getIcon('copy', 18));
            break;

          case 'paste-button':
            control = this.__P_29_0('paste', this.tr('Paste'), cv.theme.dark.Images.getIcon('paste', 18));
            break;

          case 'create-menu':
            control = new qx.ui.menu.Menu();
            break;

          case 'create-button':
            control = this.__P_29_0('create', this.tr('Add child'), cv.theme.dark.Images.getIcon('add', 18));
            break;
        }

        return control || cv.ui.manager.contextmenu.ConfigElement.prototype._createChildControlImpl.base.call(this, id);
      },
      __P_29_0: function __P_29_0(action, title, icon, command, menu) {
        var button = new qx.ui.menu.Button(title, icon, command, menu);
        button.addListener('execute', function () {
          this.fireDataEvent('action', {
            action: action,
            element: this.getElement()
          });
        }, this);
        return button;
      }
    },

    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this._commandGroup = null;
    }
  });
  cv.ui.manager.contextmenu.ConfigElement.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ConfigElement.js.map?dt=1625668963176