(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.form.List": {
        "construct": true,
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2021-2021 Zenesis Limited https://www.zenesis.com
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * John Spackman (github.com/johnspackman)
  
  ************************************************************************ */

  /**
   * Provides a version of `qx.ui.form.List` which expects children to be instances
   * of `qx.ui.form.CheckBox` and has a `checked` property
   */
  qx.Class.define("qx.ui.form.CheckedList", {
    extend: qx.ui.form.List,
    construct: function construct() {
      qx.ui.form.List.constructor.call(this);
      this.__P_351_0 = {};
    },
    destruct: function destruct() {
      this.__P_351_0.dispose();
      this.__P_351_0 = null;
    },
    events: {
      /** Fired when the checked array changes, data is the array */
      changeChecked: "qx.event.type.Data"
    },
    members: {
      /** @type {Map<String,qx.ui.form.CheckBox>} map of checked items, indexed by hash code */
      __P_351_0: null,
      /**
       * Returns the array of checked items
       *
       * @return {qx.ui.form.CheckBox[]}
       */
      getChecked: function getChecked() {
        return Object.values(this.__P_351_0);
      },
      /**
       * Sets the array of checked items
       *
       * @param {qx.ui.form.CheckBox[]} the replacement array of checked items
       */
      setChecked: function setChecked(checked) {
        var _this = this;
        var oldData = this.getChecked();
        this.__P_351_1 = true;
        try {
          var toUncheck = {};
          Object.values(this.__P_351_0).forEach(function (item) {
            return toUncheck[item.toHashCode()] = item;
          });
          var replacement = {};
          if (!checked) {
            checked = [];
          } else {
            var someTurnedOn = false;
            checked.forEach(function (item) {
              var hash = item.toHashCode();
              if (!_this.__P_351_0[hash]) {
                someTurnedOn = true;
                item.setValue(true);
              }
              delete toUncheck[hash];
              replacement[hash] = item;
            });

            // Nothing turned on and nothing to turn off - then no change
            if (!someTurnedOn && Object.keys(toUncheck).length == 0) {
              return;
            }
          }
          Object.values(toUncheck).forEach(function (item) {
            return item.setValue(false);
          });
          this.__P_351_0 = replacement;
        } finally {
          this.__P_351_1 = false;
        }
        this.fireDataEvent("changeChecked", this.getChecked(), oldData);
      },
      /**
       * Clears the list of checked items
       */
      resetChecked: function resetChecked() {
        this.setChecked(null);
      },
      /*
       * @Override
       */
      _onAddChild: function _onAddChild(evt) {
        qx.ui.form.CheckedList.superclass.prototype._onAddChild.call(this, evt);
        var item = evt.getData();
        if (item.getValue()) {
          this.__P_351_2(item);
        }
        item.addListener("changeValue", this.__P_351_3, this);
      },
      /*
       * @Override
       */
      _onRemoveChild: function _onRemoveChild(evt) {
        qx.ui.form.CheckedList.superclass.prototype._onRemoveChild.call(this, evt);
        var item = evt.getData();
        item.removeListener("changeValue", this.__P_351_3, this);
        if (item.getValue()) {
          this.__P_351_2(item, true);
        }
      },
      /**
       * Event handler for when an item is [un]checked
       *
       * @param evt {qx.event.type.Data} the event
       */
      __P_351_3: function __P_351_3(evt) {
        if (this.__P_351_1) {
          return;
        }
        this.__P_351_2(evt.getTarget());
      },
      /**
       * Handles changes in the items checked state
       *
       * @param item {qx.ui.form.CheckBox} the item
       * @param removing {Boolean} whether the item is being removed (act as if unchecking)
       */
      __P_351_2: function __P_351_2(item, removing) {
        var hash = item.toHashCode();
        var checked = item.getValue();
        if (removing) {
          checked = false;
        }
        var changed = false;
        var oldData = this.getChecked();
        if (checked) {
          if (!this.__P_351_0[hash]) {
            changed = true;
            this.__P_351_0[hash] = item;
          }
        } else {
          if (this.__P_351_0[hash]) {
            delete this.__P_351_0[hash];
            changed = true;
          }
        }
        if (changed) {
          this.fireDataEvent("changeChecked", this.getChecked(), oldData);
        }
      }
    }
  });
  qx.ui.form.CheckedList.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=CheckedList.js.map?dt=1702901322209