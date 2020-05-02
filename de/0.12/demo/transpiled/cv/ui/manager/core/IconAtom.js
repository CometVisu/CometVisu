(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.basic.Atom": {
        "require": true
      },
      "cv.ui.manager.viewer.SvgIcon": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /**
   * Atom with cv.ui.manager.viewer.SvgIcon instead ob an qx.ui.basic.Image
   */
  qx.Class.define('cv.ui.manager.core.IconAtom', {
    extend: qx.ui.basic.Atom,

    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      appearance: {
        refine: true,
        init: 'cv-icon'
      }
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _applyLabel: function _applyLabel(value) {
        cv.ui.manager.core.IconAtom.prototype._applyLabel.base.call(this, value);

        this.getChildControl('icon').setName(value);
      },

      /**
       * Updates the visibility of the icon
       */
      _handleIcon: function _handleIcon() {
        if (!this.getChildControl('icon').getName() || this.getShow() === "label") {
          this._excludeChildControl("icon");
        } else {
          this._showChildControl("icon");
        }
      },
      // overridden
      _createChildControlImpl: function _createChildControlImpl(id) {
        var control;

        switch (id) {
          case 'icon':
            control = new cv.ui.manager.viewer.SvgIcon();
            control.setAnonymous(true);

            this._addAt(control, 0);

            break;
        }

        return control || cv.ui.manager.core.IconAtom.prototype._createChildControlImpl.base.call(this, id);
      }
    }
  });
  cv.ui.manager.core.IconAtom.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=IconAtom.js.map?dt=1588445991124