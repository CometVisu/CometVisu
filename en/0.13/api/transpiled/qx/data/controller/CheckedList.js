(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.data.controller.List": {
        "construct": true,
        "require": true
      },
      "qx.data.Array": {
        "construct": true
      },
      "qx.ui.form.CheckBox": {},
      "qx.ui.core.queue.Widget": {}
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
   * Extension of `qx.data.controller.List` which adds support for `qx.ui.form.CheckedList`
   * and `qx.ui.form.CheckedSelectBox`.
   *
   * The principal is that the underlying `List` controller implementation has a model which
   * is the complete array of items that can be selected, and that array is used to populate
   * the UI widget (ie as normal).
   *
   * The `checked` psuedo property in this `CheckedList` controller relates to the checked
   * property of the UI widget.
   */
  qx.Class.define("qx.data.controller.CheckedList", {
    extend: qx.data.controller.List,
    /**
     * Constructor
     *
     * @param model {qx.data.Array?null} the model array
     * @param widget {qx.ui.core.Widget?null} the widget target
     * @param path {String} the path in the model for the caption
     */
    construct: function construct(model, widget, path) {
      qx.data.controller.List.constructor.call(this, null, widget, path);
      this.setChecked(new qx.data.Array());
      if (model) {
        this.setModel(model);
      }
    },
    properties: {
      checked: {
        init: null,
        nullable: true,
        check: "qx.data.Array",
        event: "changeChecked",
        apply: "_applyChecked"
      },
      /**
       * The path to the property which holds the information that should be
       * shown as a label for a tag for a checked item. This is only needed if
       * used with a CheckedSelectBox, and only if live updates of the label
       * are required.
       */
      checkedLabelPath: {
        check: "String",
        apply: "__P_181_0",
        nullable: true
      },
      /**
       * The path to the property which holds the information that should be
       * shown as an icon for a tag for a checked item. This is only needed if
       * used with a CheckedSelectBox, and only if live updates of the label
       * are required.
       */
      checkedIconPath: {
        check: "String",
        apply: "__P_181_0",
        nullable: true
      },
      /**
       * A map containing the options for the checkedLabel binding. The possible keys
       * can be found in the {@link qx.data.SingleValueBinding} documentation.
       */
      checkedLabelOptions: {
        apply: "__P_181_0",
        nullable: true
      },
      /**
       * A map containing the options for the checked icon binding. The possible keys
       * can be found in the {@link qx.data.SingleValueBinding} documentation.
       */
      checkedIconOptions: {
        apply: "__P_181_0",
        nullable: true
      }
    },
    members: {
      _applyChecked: function _applyChecked(value, oldValue) {
        if (oldValue) {
          oldValue.removeListener("change", this.__P_181_1, this);
        }
        if (value) {
          value.addListener("change", this.__P_181_1, this);
        }
        this._updateChecked();
      },
      /**
       * @Override
       */
      _createItem: function _createItem() {
        var delegate = this.getDelegate();
        var item;

        // check if a delegate and a create method is set
        if (delegate != null && delegate.createItem != null) {
          item = delegate.createItem();
        } else {
          item = new qx.ui.form.CheckBox();
        }

        // if there is a configure method, invoke it
        if (delegate != null && delegate.configureItem != null) {
          delegate.configureItem(item);
        }
        return item;
      },
      /**
       * Event handler for changes to the checked array
       *
       * @param evt {qx.event.type.Data} the event
       */
      __P_181_1: function __P_181_1(evt) {
        var data = evt.getData();
        if (data.type == "order") {
          return;
        }
        this._updateChecked();
      },
      /**
       * @Override
       */
      update: function update() {
        qx.data.controller.CheckedList.superclass.prototype.update.call(this);
        this._updateChecked();
      },
      /**
       * @Override
       */
      _setFilter: function _setFilter(value, old) {
        qx.data.controller.CheckedList.superclass.prototype._setFilter.call(this, value, old);
        this.__P_181_2 = true;
        qx.ui.core.queue.Widget.add(this);
      },
      /**
       * @Override
       */
      syncWidget: function syncWidget() {
        qx.data.controller.CheckedList.superclass.prototype.syncWidget.call(this);
        if (this.__P_181_2) {
          this._updateChecked();
        }
        this.__P_181_2 = null;
      },
      /**
       * @Override
       */
      _applyModel: function _applyModel(value, oldValue) {
        if (!value || !value.getLength()) {
          var checked = this.getChecked();
          if (checked) {
            checked.removeAll();
          }
        }
        qx.data.controller.CheckedList.superclass.prototype._applyModel.call(this, value, oldValue);
        this._updateChecked();
      },
      /**
       * @Override
       */
      _applyTarget: function _applyTarget(value, oldValue) {
        qx.data.controller.CheckedList.superclass.prototype._applyTarget.call(this, value, oldValue);
        if (oldValue) {
          oldValue.removeListener("changeChecked", this.__P_181_3, this);
          if (qx.Class.supportsEvent(oldValue.constructor, "attachResultsTag")) {
            oldValue.removeListener("attachResultsTag", this.__P_181_4, this);
            oldValue.removeListener("detachResultsTag", this.__P_181_5, this);
          }
        }
        if (value) {
          value.addListener("changeChecked", this.__P_181_3, this);
          if (qx.Class.supportsEvent(value.constructor, "attachResultsTag")) {
            value.addListener("attachResultsTag", this.__P_181_4, this);
            value.addListener("detachResultsTag", this.__P_181_5, this);
          }
        }
      },
      /**
       * Event handler for changes in the target widget's `checked` property
       */
      __P_181_3: function __P_181_3(evt) {
        if (this.__P_181_6) {
          return;
        }
        var target = this.getTarget();
        var replacement = [];
        target.getChecked().forEach(function (item) {
          var itemModel = item.getModel();
          if (itemModel) {
            replacement.push(itemModel);
          }
        });
        var checked = this.getChecked();
        if (checked) {
          checked.replace(replacement);
        }
      },
      /**
       * Event handler for changes in the target widget's `attachResults` property
       */
      __P_181_4: function __P_181_4(evt) {
        var _evt$getData = evt.getData(),
          tagWidget = _evt$getData.tagWidget,
          item = _evt$getData.item;
        item.setUserData(this.classname + ".tagWidget", tagWidget);
        this.__P_181_7(tagWidget, item);
      },
      /**
       * Event handler for changes in the target widget's `detachResults` property
       */
      __P_181_5: function __P_181_5(evt) {
        var _evt$getData2 = evt.getData(),
          tagWidget = _evt$getData2.tagWidget,
          item = _evt$getData2.item;
        this.__P_181_8(tagWidget, item);
        item.setUserData(this.classname + ".tagWidget", null);
      },
      /**
       * Updates all tags in the target widget
       */
      __P_181_0: function __P_181_0() {
        var _this = this;
        var target = this.getTarget();
        if (!target) {
          return;
        }
        target.getChecked().forEach(function (item) {
          var tagWidget = item.getUserData(_this.classname + ".tagWidget");
          _this.__P_181_8(tagWidget, item);
          _this.__P_181_7(tagWidget, item);
        });
      },
      /**
       * Attaches a single tag; used to bind to the tag so that live updates to the underlying model are reflected in tag names
       *
       * @param tagWidget {qx.ui.core.Widget} the widget which is the tag
       * @param item {qx.ui.core.Widget} the list item that lists the model item that this tag is for
       */
      __P_181_7: function __P_181_7(tagWidget, item) {
        var itemModel = item.getModel();
        var bindData = {};
        if (this.getCheckedLabelPath()) {
          bindData.checkedLabelId = itemModel.bind(this.getCheckedLabelPath(), tagWidget, "label", this.getCheckedLabelOptions());
        }
        if (this.getCheckedIconPath()) {
          bindData.checkedIconId = itemModel.bind(this.getCheckedIconPath(), tagWidget, "label", this.getCheckedIconOptions());
        }
        itemModel.setUserData(this.classname + ".bindData", bindData);
      },
      /**
       * Detaches a single tag, inverse of `__attachTag`
       *
       * @param tagWidget {qx.ui.core.Widget} the widget which is the tag
       * @param item {qx.ui.core.Widget} the list item that lists the model item that this tag is for
       */
      __P_181_8: function __P_181_8(tagWidget, item) {
        var itemModel = item.getModel();
        var bindData = itemModel.getUserData(this.classname + ".bindData");
        if (bindData) {
          if (bindData.checkedLabelId) {
            itemModel.removeBinding(bindData.checkedLabelId);
          }
          if (bindData.checkedIconId) {
            itemModel.removeBinding(bindData.checkedIconId);
          }
          itemModel.setUserData(this.classname + ".bindData", null);
        }
      },
      /**
       * Updates the checked widget items to match the array of checked model items
       */
      _updateChecked: function _updateChecked() {
        var target = this.getTarget();
        if (!target) {
          return;
        }
        if (this.__P_181_6) {
          return;
        }
        this.__P_181_6 = true;
        try {
          // Maps of the widget item, indexed by the hashcode of the model item
          var children = {};
          var toUncheck = {};
          target.getChildren().forEach(function (item) {
            var itemModel = item.getModel();
            if (itemModel) {
              var hash = itemModel.toHashCode();
              children[hash] = item;
              if (item.getValue()) {
                toUncheck[hash] = item;
              }
            }
          });
          var toRemove = [];
          var checked = this.getChecked();
          if (checked) {
            checked.forEach(function (itemModel) {
              var hash = itemModel.toHashCode();
              if (itemModel) {
                delete toUncheck[hash];
                if (children[hash]) {
                  children[hash].setValue(true);
                } else {
                  toRemove.push(itemModel);
                }
              }
            });
            Object.values(toUncheck).forEach(function (item) {
              return item.setValue(false);
            });
            toRemove.forEach(function (item) {
              return checked.remove(item);
            });
          }
        } finally {
          this.__P_181_6 = false;
        }
      }
    }
  });
  qx.data.controller.CheckedList.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=CheckedList.js.map?dt=1735222417651