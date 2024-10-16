(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.apiviewer.dao.ClassItem": {
        "construct": true,
        "require": true
      },
      "qxl.apiviewer.dao.Param": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2008 1&1 Internet AG, Germany, http://www.1und1.de
       2018 Zenesis Limited, http://www.zenesis.com
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * John Spackman (johnspackman)
       * Fabian Jakobs (fjakobs)
  
  ************************************************************************ */

  qx.Class.define("qxl.apiviewer.dao.PropertyMethod", {
    extend: qxl.apiviewer.dao.ClassItem,
    /**
     * Constructor for methods generated from properties
     * 
     * @param {*} meta the meta data for the property
     * @param {qxl.apiviewer.dao.Class} clazz 
     * @param {String} name 
     * @param {String} prefix - "get", "set", etc
     */
    construct: function construct(meta, clazz, name, prefix) {
      qxl.apiviewer.dao.ClassItem.constructor.call(this, meta, clazz, name);
      var type = meta.json.check;
      if (typeof type != "string") {
        type = "any";
      }
      this._params = [];
      if (prefix == "set") {
        this._params = [new qxl.apiviewer.dao.Param({
          "name": "@param",
          "body": "value {".concat(type, "} The value to set for the property ").concat(name),
          "paramName": "value",
          "description": "Sets the ".concat(name, " property."),
          "type": type
        }, this)];
      }
      if (prefix == "get" || prefix == "is") {
        this._return = new qxl.apiviewer.dao.Param({
          "name": "@return",
          "body": "{".concat(type, "} The value to of the property ").concat(name),
          "description": "The ".concat(name, " property."),
          "type": type
        }, this);
      }
      this._throws = [];
      this._applyFor = [];
    },
    members: {
      _params: null,
      _return: null,
      _throws: null,
      _propertyName: null,
      _applyFor: null,
      isStatic: function isStatic() {
        return this._meta.isStatic || false;
      },
      isAbstract: function isAbstract() {
        return this._meta.isAbstract || false;
      },
      isAsync: function isAsync() {
        return this._meta.async || false;
      },
      isConstructor: function isConstructor() {
        return this.getName() == "construct";
      },
      isFromProperty: function isFromProperty() {
        return Boolean(this._meta.property);
      },
      /**
       * @Override
       */
      isDeprecated: function isDeprecated() {
        return qxl.apiviewer.dao.PropertyMethod.superclass.prototype.isDeprecated.call(this) || this.getFromProperty() && this.getFromProperty().isDeprecated();
      },
      getParams: function getParams() {
        return this._params;
      },
      getReturn: function getReturn() {
        return this._return;
      },
      getThrows: function getThrows() {
        return this._throws;
      },
      getFromProperty: function getFromProperty() {
        return this._propertyName ? this.getClass().getProperty(this._propertyName) : null;
      },
      getApplyFor: function getApplyFor() {
        return this._applyFor;
      },
      /**
       * @Override
       */
      isRequiredByInterface: function isRequiredByInterface(iface) {
        var _this = this;
        return (iface.getMethods() || []).some(function (method) {
          return method.getName() == _this.getName();
        });
      }
    }
  });
  qxl.apiviewer.dao.PropertyMethod.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=PropertyMethod.js.map?dt=1729101277093