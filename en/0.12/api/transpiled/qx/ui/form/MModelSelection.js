(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.data.Array": {
        "construct": true
      },
      "qx.lang.Array": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2009 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * This mixin offers the selection of the model properties.
   * It can only be included if the object including it implements the
   * {@link qx.ui.core.ISingleSelection} interface and the selectables implement
   * the {@link qx.ui.form.IModel} interface.
   */
  qx.Mixin.define("qx.ui.form.MModelSelection", {
    construct: function construct() {
      // create the selection array
      this.__P_303_0 = new qx.data.Array(); // listen to the changes

      this.__P_303_0.addListener("change", this.__P_303_1, this);

      this.addListener("changeSelection", this.__P_303_2, this);
    },
    events: {
      /**
       * Pseudo event. It will never be fired because the array itself can not
       * be changed. But the event description is needed for the data binding.
       */
      changeModelSelection: "qx.event.type.Data"
    },
    members: {
      __P_303_0: null,
      __P_303_3: false,

      /**
       * Handler for the selection change of the including class e.g. SelectBox,
       * List, ...
       * It sets the new modelSelection via {@link #setModelSelection}.
       */
      __P_303_2: function __P_303_2() {
        if (this.__P_303_3) {
          return;
        }

        var data = this.getSelection(); // create the array with the modes inside

        var modelSelection = [];

        for (var i = 0; i < data.length; i++) {
          var item = data[i]; // fallback if getModel is not implemented

          var model = item.getModel ? item.getModel() : null;

          if (model !== null) {
            modelSelection.push(model);
          }
        }

        try {
          this.setModelSelection(modelSelection);
        } catch (e) {
          throw new Error("Could not set the model selection. Maybe your models are not unique? " + e);
        }
      },

      /**
       * Listener for the change of the internal model selection data array.
       */
      __P_303_1: function __P_303_1() {
        this.__P_303_3 = true;
        var selectables = this.getSelectables(true);
        var itemSelection = [];

        var modelSelection = this.__P_303_0.toArray();

        for (var i = 0; i < modelSelection.length; i++) {
          var model = modelSelection[i];

          for (var j = 0; j < selectables.length; j++) {
            var selectable = selectables[j]; // fallback if getModel is not implemented

            var selectableModel = selectable.getModel ? selectable.getModel() : null;

            if (model === selectableModel) {
              itemSelection.push(selectable);
              break;
            }
          }
        }

        this.setSelection(itemSelection);
        this.__P_303_3 = false; // check if the setting has worked

        var currentSelection = this.getSelection();

        if (!qx.lang.Array.equals(currentSelection, itemSelection)) {
          // if not, set the actual selection
          this.__P_303_2();
        }
      },

      /**
       * Returns always an array of the models of the selected items. If no
       * item is selected or no model is given, the array will be empty.
       *
       * *CAREFUL!* The model selection can only work if every item item in the
       * selection providing widget has a model property!
       *
       * @return {qx.data.Array} An array of the models of the selected items.
       */
      getModelSelection: function getModelSelection() {
        return this.__P_303_0;
      },

      /**
       * Takes the given models in the array and searches for the corresponding
       * selectables. If an selectable does have that model attached, it will be
       * selected.
       *
       * *Attention:* This method can have a time complexity of O(n^2)!
       *
       * *CAREFUL!* The model selection can only work if every item item in the
       * selection providing widget has a model property!
       *
       * @param modelSelection {Array} An array of models, which should be
       *   selected.
       */
      setModelSelection: function setModelSelection(modelSelection) {
        // check for null values
        if (!modelSelection) {
          this.__P_303_0.removeAll();

          return;
        }

        // add the first two parameter
        modelSelection.unshift(this.__P_303_0.getLength()); // remove index

        modelSelection.unshift(0); // start index

        var returnArray = this.__P_303_0.splice.apply(this.__P_303_0, modelSelection);

        returnArray.dispose();
      }
    },
    destruct: function destruct() {
      this._disposeObjects("__P_303_0");
    }
  });
  qx.ui.form.MModelSelection.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MModelSelection.js.map?dt=1612700584294