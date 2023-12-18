(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.lang.Array": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2010 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Christian Hagendorn (chris_schmidt)
       * Martin Wittemann (martinwittemann)
  
  ************************************************************************ */

  /**
   * The mixin controls the binding between model and item.
   *
   * @internal
   */
  qx.Mixin.define("qx.ui.list.core.MWidgetController", {
    construct: function construct() {
      this.__P_384_0 = [];
    },
    properties: {
      /**
       * The path to the property which holds the information that should be
       * shown as a label. This is only needed if objects are stored in the model.
       */
      labelPath: {
        check: "String",
        nullable: true
      },
      /**
       * The path to the property which holds the information that should be
       * shown as an icon. This is only needed if objects are stored in the model
       * and if the icon should be shown.
       */
      iconPath: {
        check: "String",
        nullable: true
      },
      /**
       * The path to the property which holds the information that should be
       * displayed as a group label. This is only needed if objects are stored in the
       * model.
       */
      groupLabelPath: {
        check: "String",
        nullable: true
      },
      /**
       * A map containing the options for the label binding. The possible keys
       * can be found in the {@link qx.data.SingleValueBinding} documentation.
       */
      labelOptions: {
        nullable: true
      },
      /**
       * A map containing the options for the icon binding. The possible keys
       * can be found in the {@link qx.data.SingleValueBinding} documentation.
       */
      iconOptions: {
        nullable: true
      },
      /**
       * A map containing the options for the group label binding. The possible keys
       * can be found in the {@link qx.data.SingleValueBinding} documentation.
       */
      groupLabelOptions: {
        nullable: true
      },
      /**
       * Delegation object, which can have one or more functions defined by the
       * {@link qx.ui.list.core.IListDelegate} interface.
       */
      delegate: {
        event: "changeDelegate",
        init: null,
        nullable: true
      }
    },
    members: {
      /** @type {Array} which contains the bounded items */
      __P_384_0: null,
      /**
       * Helper-Method for binding the default properties from
       * the model to the target widget. The used default properties
       * depends on the passed item. When the passed item is
       * a list item the "label" and "icon" property is used.
       * When the passed item is a group item the "value" property is
       * used.
       *
       * This method should only be called in the
       * {@link IListDelegate#bindItem} function
       * implemented by the {@link #delegate} property.
       *
       * @param item {qx.ui.core.Widget} The internally created and used
       *   list or group item.
       * @param index {Integer} The index of the item.
       */
      bindDefaultProperties: function bindDefaultProperties(item, index) {
        if (item.getUserData("cell.type") != "group") {
          // bind model first
          this.bindProperty("", "model", null, item, index);
          this.bindProperty(this.getLabelPath(), "label", this.getLabelOptions(), item, index);
          if (this.getIconPath() != null) {
            this.bindProperty(this.getIconPath(), "icon", this.getIconOptions(), item, index);
          }
        } else {
          this.bindProperty(this.getGroupLabelPath(), "value", this.getGroupLabelOptions(), item, index);
        }
      },
      /**
       * Helper-Method for binding a given property from the model to the target
       * widget.
       * This method should only be called in the
       * {@link IListDelegate#bindItem} function implemented by the
       * {@link #delegate} property.
       *
       * @param sourcePath {String | null} The path to the property in the model.
       *   If you use an empty string, the whole model item will be bound.
       * @param targetProperty {String} The name of the property in the target widget.
       * @param options {Map | null} The options to use for the binding.
       * @param targetWidget {qx.ui.core.Widget} The target widget.
       * @param index {Integer} The index of the current binding.
       */
      bindProperty: function bindProperty(sourcePath, targetProperty, options, targetWidget, index) {
        var type = targetWidget.getUserData("cell.type");
        var bindPath = this.__P_384_1(index, sourcePath, type);
        if (options) {
          options.ignoreConverter = "model";
        }
        var id = this._list.bind(bindPath, targetWidget, targetProperty, options);
        this.__P_384_2(targetWidget, id);
      },
      /**
       * Helper-Method for binding a given property from the target widget to
       * the model.
       * This method should only be called in the
       * {@link IListDelegate#bindItem} function implemented by the
       * {@link #delegate} property.
       *
       * @param targetPath {String | null} The path to the property in the model.
       * @param sourceProperty {String} The name of the property in the target.
       * @param options {Map | null} The options to use for the binding.
       * @param sourceWidget {qx.ui.core.Widget} The source widget.
       * @param index {Integer} The index of the current binding.
       */
      bindPropertyReverse: function bindPropertyReverse(targetPath, sourceProperty, options, sourceWidget, index) {
        var type = sourceWidget.getUserData("cell.type");
        var bindPath = this.__P_384_1(index, targetPath, type);
        var id = sourceWidget.bind(sourceProperty, this._list, bindPath, options);
        this.__P_384_2(sourceWidget, id);
      },
      /**
       * Remove all bindings from all bounded items.
       */
      removeBindings: function removeBindings() {
        while (this.__P_384_0.length > 0) {
          var item = this.__P_384_0.pop();
          this._removeBindingsFrom(item);
        }
      },
      /**
       * Configure the passed item if a delegate is set and the needed
       * function {@link IListDelegate#configureItem} is available.
       *
       * @param item {qx.ui.core.Widget} item to configure.
       */
      _configureItem: function _configureItem(item) {
        var delegate = this.getDelegate();
        if (delegate != null && delegate.configureItem != null) {
          delegate.configureItem(item);
        }
      },
      /**
       * Configure the passed item if a delegate is set and the needed
       * function {@link IListDelegate#configureGroupItem} is available.
       *
       * @param item {qx.ui.core.Widget} item to configure.
       */
      _configureGroupItem: function _configureGroupItem(item) {
        var delegate = this.getDelegate();
        if (delegate != null && delegate.configureGroupItem != null) {
          delegate.configureGroupItem(item);
        }
      },
      /**
       * Sets up the binding for the given item and index.
       *
       * @param item {qx.ui.core.Widget} The internally created and used item.
       * @param index {Integer} The index of the item.
       */
      _bindItem: function _bindItem(item, index) {
        var delegate = this.getDelegate();
        if (delegate != null && delegate.bindItem != null) {
          delegate.bindItem(this, item, index);
        } else {
          this.bindDefaultProperties(item, index);
        }
      },
      /**
       * Sets up the binding for the given group item and index.
       *
       * @param item {qx.ui.core.Widget} The internally created and used item.
       * @param index {Integer} The index of the item.
       */
      _bindGroupItem: function _bindGroupItem(item, index) {
        var delegate = this.getDelegate();
        if (delegate != null && delegate.bindGroupItem != null) {
          delegate.bindGroupItem(this, item, index);
        } else {
          this.bindDefaultProperties(item, index);
        }
      },
      /**
       * Removes the binding of the given item.
       *
       * @param item {qx.ui.core.Widget} The item which the binding should
       *   be removed.
       */
      _removeBindingsFrom: function _removeBindingsFrom(item) {
        var bindings = this.__P_384_3(item);
        while (bindings.length > 0) {
          var id = bindings.pop();
          try {
            this._list.removeBinding(id);
          } catch (e) {
            item.removeBinding(id);
          }
        }
        if (this.__P_384_0.includes(item)) {
          qx.lang.Array.remove(this.__P_384_0, item);
        }
      },
      /**
       * Helper method to create the path for binding.
       *
       * @param index {Integer} The index of the item.
       * @param path {String|null} The path to the property.
       * @param type {String} The type <code>["item", "group"]</code>.
       * @return {String} The binding path
       */
      __P_384_1: function __P_384_1(index, path, type) {
        var bindPath = "model[" + index + "]";
        if (type == "group") {
          bindPath = "groups[" + index + "]";
        }
        if (path != null && path != "") {
          bindPath += "." + path;
        }
        return bindPath;
      },
      /**
       * Helper method to save the binding for the widget.
       *
       * @param widget {qx.ui.core.Widget} widget to save binding.
       * @param id {var} the id from the binding.
       */
      __P_384_2: function __P_384_2(widget, id) {
        var bindings = this.__P_384_3(widget);
        if (!bindings.includes(id)) {
          bindings.push(id);
        }
        if (!this.__P_384_0.includes(widget)) {
          this.__P_384_0.push(widget);
        }
      },
      /**
       * Helper method which returns all bound id from the widget.
       *
       * @param widget {qx.ui.core.Widget} widget to get all binding.
       * @return {Array} all bound id's.
       */
      __P_384_3: function __P_384_3(widget) {
        var bindings = widget.getUserData("BindingIds");
        if (bindings == null) {
          bindings = [];
          widget.setUserData("BindingIds", bindings);
        }
        return bindings;
      }
    },
    destruct: function destruct() {
      this.__P_384_0 = null;
    }
  });
  qx.ui.list.core.MWidgetController.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MWidgetController.js.map?dt=1702901325483