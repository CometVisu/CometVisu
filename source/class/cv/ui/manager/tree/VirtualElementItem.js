/**
 * Widget for node items in XML-File
 */
qx.Class.define('cv.ui.manager.tree.VirtualElementItem', {
  extend: qx.ui.tree.VirtualTreeItem,

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
      check: ['valid', 'error'],
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

    _applyStatus: function (value) {
      var control = this.getChildControl('icon');
      if (value) {
        switch (value) {
          case 'valid':
            control.removeState('error');
            break;

          case 'error':
            control.addState('error');
            break;
        }
      }
    },

    /**
     * Handle drop events
     * @param ev {Event}
     * @private
     */
    _onDrop: function (ev) {
      console.log(ev.getRelatedTarget());
    },

    // overridden
    _createChildControlImpl : function(id, hash) {
       var control;

       switch (id) {
         case 'buttons':
           control = new qx.ui.container.Composite(new qx.ui.layout.HBox());
           break;

         case 'move-button':
           control = new qx.ui.basic.Atom('', cv.theme.dark.Images.getIcon('drag-handle', 18));
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
