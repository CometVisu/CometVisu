/* ConfigElement.js 
 * 
 * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
 * 
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
 */


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
    'action': 'qx.event.type.Data'
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

    _applyEditor: function (value, old) {
      if (old) {
        old.removeListener('changeClipboard', this._maintainClipboardButtons, this);
      }
      if (value) {
        value.addListener('changeClipboard', this._maintainClipboardButtons, this);
      }
    },

    _applyElement: function(value, old) {
      if (old) {
        old.removeRelatedBindings(this.getChildControl('delete-button'));
        old.removeRelatedBindings(this.getChildControl('cut-button'));
      }
      if (value) {
        const editable = value.isEditable();
        this.getChildControl('copy-button').setEnabled(true);
        if (editable) {
          value.bind('deletable', this.getChildControl('delete-button'), 'enabled');
          value.bind('deletable', this.getChildControl('cut-button'), 'enabled');
          this.getChildControl('view-button').exclude();
          this.getChildControl('edit-button').show();
          this.getChildControl('edit-button').setEnabled(value.getShowEditButton());
          let addable = value.getAddableChildren(true);
          this.getChildControl('create-button').setEnabled(addable.length > 0);
        } else {
          this.getChildControl('delete-button').setEnabled(false);
          this.getChildControl('cut-button').setEnabled(false);
          this.getChildControl('create-button').setEnabled(false);
          this.getChildControl('view-button').show();
          // enable view button when there are attributes to show
          this.getChildControl('view-button').setEnabled(value.getShowEditButton());
          this.getChildControl('edit-button').exclude();
        }
      } else {
        ['edit', 'delete', 'cut', 'copy', 'paste', 'create'].forEach(name => this.getChildControl(name + '-button').setEnabled(false));
      }
      this._maintainClipboardButtons();
    },

    _init: function () {
      ['view', 'edit', 'delete'].forEach(name => this.add(this.getChildControl(name + '-button')));
      this.addSeparator();
      ['cut', 'copy', 'paste'].forEach(name => this.add(this.getChildControl(name + '-button')));
      this.addSeparator();
      this.add(this.getChildControl('create-button'));
    },

    _maintainClipboardButtons: function () {
      const content = this.getEditor().getClipboard();
      const element = this.getElement();
      let enabled = (element ? element.isEditable() : false) && content instanceof cv.ui.manager.model.XmlElement;
      if (enabled) {
        // check if content is allowed as child here
        let addable = element.getAddableChildren(true);
        enabled = addable.includes(content.getName()) && element.isChildAllowedAtPosition(content, Number.POSITIVE_INFINITY);
      }
      this.getChildControl('paste-button').setEnabled(enabled);
    },

    // overridden
    _createChildControlImpl : function(id, hash) {
       let control;

       switch (id) {
         case 'view-button':
           control = this.__createButton('view', this.tr('View'), cv.theme.dark.Images.getIcon('view', 18));
           control.exclude();
           break;

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
  destruct: function () {
    this._commandGroup = null;
  }
});
