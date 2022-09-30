(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.basic.Atom": {
        "construct": true,
        "require": true
      },
      "qx.ui.form.IModel": {
        "require": true
      },
      "qx.ui.form.MModelProperty": {
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
  
  ************************************************************************ */

  /**
   * A item for a list. Could be added to all List like widgets but also
   * to the {@link qx.ui.form.SelectBox} and {@link qx.ui.form.ComboBox}.
   */
  qx.Class.define("qx.ui.form.ListItem", {
    extend: qx.ui.basic.Atom,
    implement: [qx.ui.form.IModel],
    include: [qx.ui.form.MModelProperty],

    /*
    *****************************************************************************
       CONSTRUCTOR
    *****************************************************************************
    */

    /**
     * @param label {String} Label to use
     * @param icon {String?null} Icon to use
     * @param model {String?null} The items value
     */
    construct: function construct(label, icon, model) {
      qx.ui.basic.Atom.constructor.call(this, label, icon);

      if (model != null) {
        this.setModel(model);
      }

      this.addListener("pointerover", this._onPointerOver, this);
      this.addListener("pointerout", this._onPointerOut, this);
    },

    /*
    *****************************************************************************
       EVENTS
    *****************************************************************************
    */
    events: {
      /** (Fired by {@link qx.ui.form.List}) */
      "action": "qx.event.type.Event"
    },

    /*
    *****************************************************************************
       PROPERTIES
    *****************************************************************************
    */
    properties: {
      appearance: {
        refine: true,
        init: "listitem"
      }
    },
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

      /**
       * Event handler for the pointer out event.
       */
      _onPointerOut: function _onPointerOut() {
        this.removeState("hovered");
      }
    },
    destruct: function destruct() {
      this.removeListener("pointerover", this._onPointerOver, this);
      this.removeListener("pointerout", this._onPointerOut, this);
    }
  });
  qx.ui.form.ListItem.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ListItem.js.map?dt=1664560766613