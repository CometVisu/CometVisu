/**
 * Widget for node items in XML-File
 */
qx.Class.define('cv.ui.manager.tree.VirtualElementItem', {
  extend: qx.ui.tree.VirtualTreeItem,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function (label) {
    this.base(arguments, label);
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    appearance: {
      refine: true,
      init: 'element-tree-item'
    },

    name: {
      check: 'String',
      init: '',
      event: 'changeName'
    },

    temporary: {
      check: 'Boolean',
      init: false,
      apply: '_applyTemporary'
    },

    status: {
      check: ['valid', 'error', 'comment'],
      nullable: true,
      apply: '_applyStatus'
    },

    editable: {
      check: 'Boolean',
      init: false
    },

    sortable: {
      check: 'Boolean',
      init: false,
      apply: '_applySortable'
    },

    droppable: {
      refine: true,
      init: true
    }
  },

  /*
  ***********************************************
    EVENTS
  ***********************************************
  */
  events: {
    edit: 'qx.event.type.Data'
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    __labelAdded: false,

    _applyTemporary: function (value) {
      if (value) {
        this.addState('temporary');
      } else {
        this.removeState('temporary');
      }
    },

    _applySortable: function (value) {
      if (value) {
        this.getChildControl('move-button').show();
      } else {
        this.getChildControl('move-button').hide();
      }
    },

    _applyStatus: function (value, old) {
      const icon = this.getChildControl('icon');
      const label = this.getChildControl('label');
      if (old) {
        icon.removeState(old);
        label.removeState(old);
      }
      if (value) {
        icon.addState(value);
        label.addState(value);
      }
    },

    // overridden
    _createChildControlImpl : function(id, hash) {
       var control;

       switch (id) {
         case 'buttons':
           control = new qx.ui.container.Composite(new qx.ui.layout.HBox());
           control.setAnonymous(true);
           break;

         case 'move-button':
           control = new qx.ui.basic.Atom('', cv.theme.dark.Images.getIcon('drag-handle', 18));
           control.setToolTipText(this.tr("Drag to move"));
           control.setAnonymous(true);
           this.getChildControl('buttons').add(control);
           break;
       }

       return control || this.base(arguments, id);
    },

    // overridden
    addLabel : function(text) {
      var label = this.getChildControl("label");

      if (this.__labelAdded) {
        this._remove(label);
      }

      if (text) {
        this.setLabel(text);
      } else {
        label.setValue(this.getLabel());
      }

      this._add(label, {flex: 1});
      const buttons = this.getChildControl('buttons');
      this._add(buttons);
      this.__labelAdded = true;
    },
  }
});
