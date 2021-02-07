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
      "qx.ui.layout.HBox": {
        "construct": true
      },
      "qx.event.Timer": {},
      "qx.ui.basic.Image": {},
      "qx.ui.basic.Label": {},
      "cv.theme.dark.Images": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /**
   * View component that shows a snackbar message.
   */
  qx.Class.define('cv.ui.manager.snackbar.Message', {
    extend: qx.ui.core.Widget,

    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct() {
      qx.ui.core.Widget.constructor.call(this);

      this._setLayout(new qx.ui.layout.HBox(8));

      this.addListener('appear', this._onAppear, this);
    },

    /*
    ***********************************************
      EVENTS
    ***********************************************
    */
    events: {
      'close': 'qx.event.type.Data'
    },

    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      appearance: {
        refine: true,
        init: 'cv-snackbar-msg'
      },
      model: {
        check: 'cv.ui.manager.model.Message',
        nullable: true,
        apply: '_applyModel'
      },
      timeout: {
        check: 'Number',
        init: 5000,
        apply: '_applyTimeout'
      },
      type: {
        check: ['alert', 'hint', 'warning', 'error'],
        nullable: true,
        apply: '_applyType'
      }
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _timer: null,
      _applyModel: function _applyModel(value, old) {
        if (old) {
          old.removeRelatedBindings(this);
          old.removeRelatedBindings(this.getChildControl('content'));
        }

        if (value) {
          value.bind('title', this.getChildControl('content'), 'value');
          value.bind('type', this, 'type');
          value.bind('sticky', this, 'timeout', {
            converter: function converter(value) {
              return value ? 0 : 5000;
            }
          });
          this.getChildControl('close');
        }
      },
      _applyType: function _applyType(value) {
        if (value) {
          this.setDecorator(this.getAppearance() + '-' + value);
        } else {
          this.setDecorator(this.getAppearance());
        }
      },
      _applyTimeout: function _applyTimeout(value) {
        if (this._timer) {
          this._timer.stop();

          if (value === 0) {
            this._timer = null;
          }
        }
      },
      _onAppear: function _onAppear() {
        var timeout = this.getTimeout();

        if (this._timer) {
          this._timer.stop();
        }

        if (timeout > 0) {
          this._timer = qx.event.Timer.once(this.close, this, timeout);
        }
      },
      close: function close() {
        this.fireDataEvent('close', this.getModel());
      },
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id) {
        var control;

        switch (id) {
          case 'icon':
            control = new qx.ui.basic.Image();

            this._addAt(control, 0);

            break;

          case 'content':
            control = new qx.ui.basic.Label();

            this._addAt(control, 1, {
              flex: 1
            });

            break;

          case 'close':
            control = new qx.ui.basic.Image(cv.theme.dark.Images.getIcon('close', 15));
            control.addListener('tap', this.close, this);

            this._addAt(control, 2);

            break;
        }

        return control || cv.ui.manager.snackbar.Message.prototype._createChildControlImpl.base.call(this, id);
      }
    },

    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this._disposeObjects('_timer');
    }
  });
  cv.ui.manager.snackbar.Message.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Message.js.map?dt=1612700562627