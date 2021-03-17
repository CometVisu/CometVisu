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
  construct: function (editor) {
    this.base(arguments);
    this.setEditor(editor);
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

    _applyEditor: function (value, old) {
      if (old) {
        old.removeListener('changeClipboard', this._maintainClipboardButtons, this);
      }
      if (value) {
        value.addListener('changeClipboard', this._maintainClipboardButtons, this);
      }
    },

    _applyElement: function(value) {
      if (value) {
        const editable = value.isEditable();
        const required = value.isRequired();
        this.getChildControl('edit-button').setEnabled(value.getShowEditButton());
        this.getChildControl('copy-button').setEnabled(true);
        ['delete', 'cut'].forEach(name => this.getChildControl(name + "-button").setEnabled(editable && !required));
        if (editable) {
          let addable = value.getAddableChildren(true);
          this.getChildControl('create-button').setEnabled(addable.length > 0);
        }
      } else {
        ['edit', 'delete', 'cut', 'copy', 'paste', 'create'].forEach(name =>this.getChildControl(name + "-button").setEnabled(false));
      }
      this._maintainClipboardButtons();
    },

    _init: function () {
      ['edit', 'delete'].forEach(name => this.add(this.getChildControl(name + "-button")));
      this.addSeparator();
      ['cut', 'copy', 'paste'].forEach(name => this.add(this.getChildControl(name + "-button")));
      this.addSeparator();
      this.add(this.getChildControl('create-button'));
    },

    _maintainClipboardButtons: function () {
      const enabled = (this.getElement() ? this.getElement().isEditable() : false) && !!this.getEditor().getClipboard();
      this.getChildControl('paste-button').setEnabled(enabled);
    },

    // overridden
    _createChildControlImpl : function(id, hash) {
       let control;

       switch (id) {
         case 'edit-button':
           control = this.__createButton('edit', this.tr('Edit'), cv.theme.dark.Images.getIcon('edit', 18));
           break;

         case 'delete-button':
           control = this.__createButton('delete', this.tr('Delete'), cv.theme.dark.Images.getIcon('delete', 18));
           break;

         case 'cut-button':
           control = this.__createButton('cut', this.tr('Cut'), cv.theme.dark.Images.getIcon('cut', 18));
           break;

         case 'copy-button':
           control = this.__createButton('copy', this.tr('Copy'), cv.theme.dark.Images.getIcon('copy', 18));
           break;

         case 'paste-button':
           control = this.__createButton('paste', this.tr('Paste'), cv.theme.dark.Images.getIcon('paste', 18));
           break;

         case 'create-menu':
           control = new qx.ui.menu.Menu();
           break;

         case 'create-button':
           control = this.__createButton('create', this.tr('Add child'), cv.theme.dark.Images.getIcon('add', 18));
           break;
       }

       return control || this.base(arguments, id);
    },

    __createButton: function (action, title, icon, command, menu) {
      const button = new qx.ui.menu.Button(title, icon, command, menu);
      button.addListener('execute', function () {
        this.fireDataEvent('action', {
          action: action,
          element: this.getElement()
        })
      }, this);
      return button;
    }
  },

  /*
  ***********************************************
    DESTRUCTOR
  ***********************************************
  */
  destruct: function () {
    this._commandGroup = null;
  }
});
