(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.core.Widget": {
        "construct": true,
        "require": true
      },
      "qx.ui.form.IModel": {
        "require": true
      },
      "qx.ui.layout.HBox": {
        "construct": true
      },
      "qx.ui.basic.Image": {},
      "qx.ui.basic.Label": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /**
   *
   */
  qx.Class.define('cv.ui.manager.form.FileTabItem', {
    extend: qx.ui.core.Widget,
    implement: [qx.ui.form.IModel],

    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct() {
      qx.ui.core.Widget.constructor.call(this);

      this._setLayout(new qx.ui.layout.HBox());

      this._createChildControl('icon');

      this._createChildControl('label');

      this._createChildControl('close');

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
      "action": "qx.event.type.Event"
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
      writeable: {
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
    members: {
      // overridden

      /**
       * @lint ignoreReferenceField(_forwardStates)
       */
      _forwardStates: {
        focused: true,
        hovered: true,
        selected: true,
        dragover: true
      },

      /**
       * Event handler for the pointer over event.
       */
      _onPointerOver: function _onPointerOver() {
        this.addState("hovered");
      },
      _transformFilename: function _transformFilename(name) {
        if (name === '.') {
          return '';
        }

        return name;
      },

      /**
       * Event handler for the pointer out event.
       */
      _onPointerOut: function _onPointerOut() {
        this.removeState("hovered");
      },
      _applyPermanent: function _applyPermanent(value) {
        this.setFont(value ? 'default' : 'italic');
      },
      _applyCloseable: function _applyCloseable(value) {
        this.getChildControl('close').setVisibility(value ? 'visible' : 'excluded');
      },
      _applyModel: function _applyModel(value, old) {
        if (old) {
          old.removeRelatedBindings(this);
        }

        if (value) {
          value.bind('file.writeable', this, 'writeable');
        }
      },
      _applyIcon: function _applyIcon(value) {
        var control = this.getChildControl('icon');
        control.setSource(value);

        if (value) {
          control.show();
        } else {
          control.exclude();
        }
      },
      _applyLabel: function _applyLabel() {
        var label = this.getChildControl("label");
        var value = this.getLabel();

        if (value) {
          var labelValue = this.getLabel();

          if (!this.isWriteable() && !this.getModel().getFile().isFake()) {
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
      _onClose: function _onClose() {
        if (this.isCloseable()) {
          this.fireDataEvent('close', this.getModel());
        }
      },
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id) {
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

        return control || cv.ui.manager.form.FileTabItem.prototype._createChildControlImpl.base.call(this, id);
      }
    },

    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this.removeListener("pointerover", this._onPointerOver, this);
      this.removeListener("pointerout", this._onPointerOut, this);
    }
  });
  cv.ui.manager.form.FileTabItem.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=FileTabItem.js.map?dt=1603737116488