/**
 *
 */
qx.Class.define('cv.ui.manager.form.FileTabItem', {
  extend: qx.ui.core.Widget,
  implement : [qx.ui.form.IModel],
  include : [qx.ui.form.MModelProperty],

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function () {
    this.base(arguments);
    this._setLayout(new qx.ui.layout.HBox());
    this._createChildControlImpl('icon');
    this._createChildControlImpl('label');
    this._createChildControlImpl('close');

    this.addListener("pointerover", this._onPointerOver, this);
    this.addListener("pointerout", this._onPointerOut, this);
  },

  /*
  ***********************************************
    EVENTS
  ***********************************************
  */
  events: {
    'close': 'qx.event.type.Data',

    /** (Fired by {@link qx.ui.form.List}) */
    "action" : "qx.event.type.Event"
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    appearance: {
      refine: true,
      init: 'open-file-item'
    },

    label: {
      check: 'String',
      nullable: true,
      event: 'changeLabel'
    },

    icon: {
      check: 'String',
      nullable: true,
      apply: '_applyIcon'
    },

    permanent: {
      check: 'Boolean',
      init: false,
      apply: '_applyPermanent'
    },

    modified: {
      check: 'Boolean',
      init: false,
      apply: '_applyLabel'
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    // overridden
    /**
     * @lint ignoreReferenceField(_forwardStates)
     */
    _forwardStates :
      {
        focused : true,
        hovered : true,
        selected : true,
        dragover : true
      },


    /**
     * Event handler for the pointer over event.
     */
    _onPointerOver : function() {
      this.addState("hovered");
    },


    /**
     * Event handler for the pointer out event.
     */
    _onPointerOut : function() {
      this.removeState("hovered");
    },

    _applyPermanent: function (value) {
      this.setFont(value ? 'default' : 'italic');
    },

    _applyIcon: function (value) {
      var control = this.getChildControl('icon');
      control.setSource(value);
      if (value) {
        control.show();
      } else {
        control.exclude();
      }
    },

    _applyLabel: function () {
      var label = this.getChildControl("label", true);
      if (label) {
        label.setValue(this.getLabel() + (this.isModified() ? ' *' : ''));
      }
    },

    _onClose: function () {
      this.fireDataEvent('close', this.getModel());
    },

    // overridden
    _createChildControlImpl : function(id) {
       var control;

       switch (id) {
         case 'icon':
           control = new qx.ui.basic.Image();
           control.setAppearance('open-file-item/icon');
           control.setAnonymous(true);
           control.exclude();
           this._addAt(control, 0);
           break;

         case 'label':
           control = new qx.ui.basic.Label();
           control.setAppearance('open-file-item/label');
           this.bind('label', control, 'value');
           this._addAt(control, 1);
           break;

         case 'close':
           control = new qx.ui.basic.Image('decoration/tabview/close.gif');
           control.setAppearance('open-file-item/close');
           control.addListener('tap', this._onClose, this);
           this._addAt(control, 2);
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
    this.removeListener("pointerover", this._onPointerOver, this);
    this.removeListener("pointerout", this._onPointerOut, this);
  }
});
