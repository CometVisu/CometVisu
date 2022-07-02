/* FileTabItem.js 
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
 *
 */
qx.Class.define('cv.ui.manager.form.FileTabItem', {
  extend: qx.ui.core.Widget,
  implement : [qx.ui.form.IModel],

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function () {
    this.base(arguments);
    this._setLayout(new qx.ui.layout.HBox());
    this._createChildControl('icon');
    this._createChildControl('label');
    this._createChildControl('close');

    this.addListener('pointerover', this._onPointerOver, this);
    this.addListener('pointerout', this._onPointerOut, this);
  },

  /*
  ***********************************************
    EVENTS
  ***********************************************
  */
  events: {
    'close': 'qx.event.type.Data',

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
      init: 'open-file-item'
    },

    model: {
      nullable: true,
      event: 'changeModel',
      apply: '_applyModel',
      dereference: true
    },

    label: {
      check: 'String',
      nullable: true,
      transform: '_transformFilename',
      event: 'changeLabel',
      apply: '_applyLabel'
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
    },

    closeable: {
      check: 'Boolean',
      init: true,
      apply: '_applyCloseable'
    },

    writeable:{
      check: 'Boolean',
      init: true,
      apply: '_applyLabel'
    }
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: { // eslint-disable-line @qooxdoo/qx/no-refs-in-members
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
      this.addState('hovered');
    },

    _transformFilename: function(name) {
      if (name === '.') {
        return '';
      }
      return name;
    },

    /**
     * Event handler for the pointer out event.
     */
    _onPointerOut : function() {
      this.removeState('hovered');
    },

    _applyPermanent: function (value) {
      this.setFont(value ? 'default' : 'italic');
    },

    _applyCloseable: function (value) {
      this.getChildControl('close').setVisibility(value ? 'visible' : 'excluded');
    },

    _applyModel: function (value, old) {
      if (old) {
        old.removeRelatedBindings(this);
      }
      if (value) {
        value.bind('file.writeable', this, 'writeable');
      }
    },

    _applyIcon: function (value) {
      const control = this.getChildControl('icon');
      control.setSource(value);
      if (value) {
        control.show();
      } else {
        control.exclude();
      }
    },

    _applyLabel: function () {
      const label = this.getChildControl('label');
      const value = this.getLabel();
      if (value) {
        let labelValue = this.getLabel();
        // special treatment for hidden.php which is marked as fake, but has a special editor, so it has to be marked as not writeable
        if (!this.isWriteable() && (!this.getModel().getFile().isFake() || this.getModel().getFile().getName() === 'hidden.php')) {
          labelValue += ' !';
          this.setToolTipText(this.tr('This file is not writeable'));
        } else {
          this.resetToolTipText();
        }
        if (this.isModified()) {
          labelValue += ' *';
        }
        label.setValue(labelValue);
        label.show();
      } else {
        label.exclude();
        this.resetToolTipText();
      }
    },

    _onClose: function () {
      if (this.isCloseable()) {
        this.fireDataEvent('close', this.getModel());
      }
    },

    // overridden
    _createChildControlImpl : function(id) {
      let control;

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
           control.setAnonymous(true);
           this._addAt(control, 1);
           break;

         case 'close':
           control = new qx.ui.basic.Image('decoration/tabview/close.gif');
           control.setAppearance('open-file-item/close');
           if (this.isCloseable()) {
             control.addListener('tap', this._onClose, this);
           } else {
             control.exclude();
           }
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
    this.removeListener('pointerover', this._onPointerOver, this);
    this.removeListener('pointerout', this._onPointerOut, this);
  }
});
