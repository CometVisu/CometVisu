(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.form.AbstractSelectBox": {
        "construct": true,
        "require": true
      },
      "qx.ui.core.IMultiSelection": {
        "require": true
      },
      "qx.ui.form.IModelSelection": {
        "require": true
      },
      "qx.ui.form.IField": {
        "require": true
      },
      "qx.data.Array": {
        "construct": true
      },
      "qx.ui.popup.Popup": {},
      "qx.ui.layout.VBox": {},
      "qx.ui.form.Button": {},
      "qx.ui.form.CheckedList": {},
      "qx.ui.core.Spacer": {},
      "qx.ui.container.Composite": {},
      "qx.ui.layout.HBox": {},
      "qx.ui.form.Tag": {},
      "qx.ui.basic.Image": {},
      "qx.lang.Array": {}
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
   * A form widget which allows multiple selection with a drop down checked list.
   *
   * @childControl spacer {qx.ui.core.Spacer} flexible spacer widget
   * @childControl atom {qx.ui.basic.Atom} shows the text and icon of the content
   * @childControl arrow {qx.ui.basic.Image} shows the arrow to open the popup
   */
  qx.Class.define("qx.ui.form.CheckedSelectBox", {
    extend: qx.ui.form.AbstractSelectBox,
    implement: [qx.ui.core.IMultiSelection, qx.ui.form.IModelSelection, qx.ui.form.IField],
    construct: function construct() {
      qx.ui.form.AbstractSelectBox.constructor.call(this);
      this.__P_344_0 = new qx.data.Array();
      this.__P_344_0.addListener("change", this.__P_344_1, this);
      this.__P_344_2 = [];
      this._add(this._createChildControl("tags"), {
        flex: 1,
        flexShrink: true
      });
      this._add(this._createChildControl("spacer"));
      this._add(this._createChildControl("arrow"));

      // Register listener
      this.addListener("pointerover", this._onPointerOver, this);
      this.addListener("pointerout", this._onPointerOut, this);
      this.addListener("tap", this._onTap, this);
    },
    properties: {
      appearance: {
        refine: true,
        init: "checked-selectbox"
      }
    },
    events: {
      /** Event for psuedo property selection */
      changeSelection: "qx.event.type.Data",
      /** Event for psuedo property checked */
      changeChecked: "qx.event.type.Data",
      /** Event for psuedo property value */
      changeValue: "qx.event.type.Data",
      /** Event for psuedo property modelSelection */
      changeModelSelection: "qx.event.type.Data",
      /** Fired when a tag widget is added to the results; data is a map containing:
       * `tagWidget` - the tag widget being added
       * `item` - the item in the list that is checked
       * `itemModel` - the model item that backs the item
       */
      attachResultsTag: "qx.event.type.Data",
      /** Fired when a tag widget is removed from the results; data is a map containing:
       * `tagWidget` - the tag widget being added
       * `item` - the item in the list that is checked
       * `itemModel` - the model item that backs the item
       */
      detachResultsTag: "qx.event.type.Data"
    },
    members: {
      /** @type {qx.data.Array} the modelSelection psuedo property */
      __P_344_0: null,
      /** @type {qx.ui.basic.Atom[]} atoms used to show the selection */
      __P_344_2: null,
      /**
       * @Override
       * @lint ignoreReferenceField(_forwardStates)
       */
      _forwardStates: {
        focused: true
      },
      /**
       * @Override
       */
      _createChildControlImpl: function _createChildControlImpl(id, hash) {
        switch (id) {
          case "popup":
            var control = new qx.ui.popup.Popup(new qx.ui.layout.VBox()).set({
              autoHide: false,
              keepActive: false
            });
            control.add(this.getChildControl("allNone"));
            control.add(this.getChildControl("list"));
            control.addListener("changeVisibility", this._onPopupChangeVisibility, this);
            return control;
          case "allNone":
            var control = new qx.ui.form.Button("All / None").set({
              allowGrowX: false
            });
            control.addListener("execute", this._onAllNoneExecute, this);
            return control;
          case "list":
            var control = new qx.ui.form.CheckedList().set({
              focusable: false,
              keepFocus: true,
              height: null,
              width: null,
              maxHeight: this.getMaxListHeight()
            });
            control.addListener("changeChecked", this._onListChangeChecked, this);
            return control;
          case "spacer":
            return new qx.ui.core.Spacer();
          case "tags":
            return new qx.ui.container.Composite(new qx.ui.layout.HBox()).set({
              allowGrowX: false
            });
          case "tag":
            return new qx.ui.form.Tag();
          case "arrow":
            return new qx.ui.basic.Image().set({
              anonymous: true
            });
        }
        return qx.ui.form.CheckedSelectBox.superclass.prototype._createChildControlImpl.call(this, id);
      },
      /**
       * @Override
       * @see qx.ui.form.IField
       */
      getValue: function getValue() {
        return this.getSelection();
      },
      /**
       * @Override
       * @see qx.ui.form.IField
       */
      setValue: function setValue(value) {
        this.setSelection(value);
      },
      /**
       * @Override
       * @see qx.ui.form.IField
       */
      resetValue: function resetValue() {
        this.setSelection([]);
      },
      /**
       * Getter for psuedo property "checked"
       *
       * @return {qx.ui.form.IListItem[]}
       */
      getChecked: function getChecked() {
        return this.getChildControl("list").getChecked();
      },
      /**
       * Setter for psuedo property "checked"
       *
       * @param checked {qx.ui.form.IListItem[]}
       */
      setChecked: function setChecked(checked) {
        this.getChildControl("list").setChecked(checked);
      },
      /**
       * Reset for psuedo property "checked"
       */
      resetChecked: function resetChecked() {
        this.getChildControl("list").resetChecked();
      },
      /**
       * @Override
       * @see qx.ui.core.ISingleSelection
       */
      getSelection: function getSelection() {
        return this.getChildControl("list").getChecked();
      },
      /**
       * @Override
       * @see qx.ui.core.ISingleSelection
       */
      setSelection: function setSelection(items) {
        this.getChildControl("list").setChecked(items);
      },
      /**
       * @Override
       * @see qx.ui.core.ISingleSelection
       */
      resetSelection: function resetSelection() {
        this.getChildControl("list").setChecked([]);
      },
      /**
       * @Override
       * @see qx.ui.core.ISingleSelection
       */
      isSelected: function isSelected(item) {
        return qx.lang.Array.contains(this.getChildControl("list").getChecked(), item);
      },
      /**
       * @Override
       * @see qx.ui.core.ISingleSelection
       */
      isSelectionEmpty: function isSelectionEmpty() {
        return this.getChildControl("list").getChecked().length == 0;
      },
      /**
       * @Override
       * @see qx.ui.core.ISingleSelection
       */
      getSelectables: function getSelectables() {
        return this.getChildControl("list").getChildren();
      },
      /**
       * @Override
       * @see qx.ui.core.IMultiSelection
       */
      selectAll: function selectAll() {
        var lst = this.getChildControl("list");
        lst.setChecked(lst.getChildren());
      },
      /**
       * @Override
       * @see qx.ui.core.IMultiSelection
       */
      addToSelection: function addToSelection(item) {
        var lst = this.getChildControl("list");
        var checked = lst.getChecked();
        if (!qx.lang.Array.contain(checked, item)) {
          checked.push(item);
          lst.setChecked(checked);
        }
      },
      /**
       * @Override
       * @see qx.ui.core.IMultiSelection
       */
      removeFromSelection: function removeFromSelection(item) {
        var lst = this.getChildControl("list");
        var checked = lst.getChecked();
        if (qx.lang.Array.remove(checked, item)) {
          lst.setChecked(checked);
        }
      },
      /**
       * @Override
       * @see qx.ui.form.IModelSelection
       */
      setModelSelection: function setModelSelection(value) {
        this.__P_344_1.replace(value ? value : []);
      },
      /**
       * @Override
       * @see qx.ui.form.IModelSelection
       */
      getModelSelection: function getModelSelection() {
        return this.__P_344_0;
      },
      /**
       * Event handler for changes to the modelSelection array
       */
      __P_344_1: function __P_344_1(evt) {
        var checked = [];
        var selected = {};
        this.getModelSelection().forEach(function (itemModel) {
          return selected[itemModel.toHashCode()] = itemModel;
        });
        this.getChildren().forEach(function (item) {
          var itemModel = item.getModel();
          if (selected[itemModel.toHashCode()]) {
            checked.push(item);
          }
        });
        var lst = this.getChildControl("list");
        if (!qx.lang.Array.equals(checked, lst.getChecked())) {
          lst.setChecked(checked);
        }
      },
      /**
       * Event handler for the All/None button
       */
      _onAllNoneExecute: function _onAllNoneExecute() {
        var lst = this.getChildControl("list");
        var checked = lst.getChecked();
        if (checked.length == 0) {
          lst.setChecked(lst.getChildren());
        } else {
          lst.setChecked([]);
        }
      },
      /**
       * Event handler for changes to the list's checked array
       */
      _onListChangeChecked: function _onListChangeChecked(evt) {
        var _this = this;
        var lst = this.getChildControl("list");
        var modelSelection = lst.getChecked().map(function (item) {
          return item.getModel();
        });
        if (!qx.lang.Array.equals(modelSelection, this.getModelSelection().toArray())) {
          this.__P_344_0.replace(modelSelection);
          this.fireDataEvent("changeValue", this.getValue());
          var children = {};
          this.getChildren().forEach(function (item) {
            var itemModel = item.getModel();
            children[itemModel.toHashCode()] = item;
          });
          var tags = this.getChildControl("tags");
          var attachTag = function attachTag(tag, itemModel) {
            tags.add(tag);
            var item = children[itemModel.toHashCode()];
            tag.set({
              model: itemModel,
              label: item.getLabel()
            });
            _this.fireDataEvent("attachResultsTag", {
              tagWidget: tag,
              item: item,
              itemModel: itemModel
            });
          };
          var detachTag = function detachTag(tag) {
            var itemModel = tag.getModel();
            tag.setModel(null);
            tags.remove(tag);
            _this.fireDataEvent("detachResultsTag", {
              tagWidget: tag,
              item: children[itemModel.toHashCode()],
              itemModel: itemModel
            });
          };
          while (this.__P_344_2.length > modelSelection.length) {
            var tag = this.__P_344_2.pop();
            detachTag(tag);
          }
          modelSelection.forEach(function (itemModel, index) {
            var tag = _this.getChildControl("tag#" + index);
            if (_this.__P_344_2.length <= index) {
              _this.__P_344_2.push(tag);
            } else {
              _this.__P_344_2[index] = tag;
            }
            attachTag(tag, itemModel);
          });
        }
      },
      /**
       * Listener method for "pointerover" event
       * <ul>
       * <li>Adds state "hovered"</li>
       * <li>Removes "abandoned" and adds "pressed" state (if "abandoned" state is set)</li>
       * </ul>
       *
       * @param e {qx.event.type.Pointer} Pointer event
       */
      _onPointerOver: function _onPointerOver(e) {
        if (!this.isEnabled() || e.getTarget() !== this) {
          return;
        }
        if (this.hasState("abandoned")) {
          this.removeState("abandoned");
          this.addState("pressed");
        }
        this.addState("hovered");
      },
      /**
       * Listener method for "pointerout" event
       * <ul>
       * <li>Removes "hovered" state</li>
       * <li>Adds "abandoned" and removes "pressed" state (if "pressed" state is set)</li>
       * </ul>
       *
       * @param e {qx.event.type.Pointer} Pointer event
       */
      _onPointerOut: function _onPointerOut(e) {
        if (!this.isEnabled() || e.getTarget() !== this) {
          return;
        }
        this.removeState("hovered");
        if (this.hasState("pressed")) {
          this.removeState("pressed");
          this.addState("abandoned");
        }
      },
      /**
       * Toggles the popup's visibility.
       *
       * @param e {qx.event.type.Pointer} Pointer event
       */
      _onTap: function _onTap(e) {
        this.open();
      },
      /**
       * @Override
       */
      _onBlur: function _onBlur(evt) {
        var popup = this.getChildControl("popup");
        for (var widget = evt.getRelatedTarget(); widget; widget = widget.getLayoutParent()) {
          if (widget == popup) {
            evt.getRelatedTarget().addListenerOnce("blur", this._onBlur, this);
            return;
          }
        }
        this.close();
      }
    }
  });
  qx.ui.form.CheckedSelectBox.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=CheckedSelectBox.js.map?dt=1692560724996