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
      },
      "qx.lang.String": {
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
  qx.Class.define("qxl.apiviewer.dao.Method", {
    extend: qxl.apiviewer.dao.ClassItem,
    construct: function construct(meta, clazz, name) {
      var _this = this;

      qxl.apiviewer.dao.ClassItem.constructor.call(this, meta, clazz, name);
      this._params = (this._jsdoc["@params"] || this._jsdoc["@param"] || []).map(function (item) {
        return new qxl.apiviewer.dao.Param(item, _this);
      });
      var arr = this._jsdoc["@return"];

      if (arr && arr.length) {
        this._return = new qxl.apiviewer.dao.Param(arr[0], this);
      }

      arr = this._jsdoc["@throws"];
      this._throws = arr && arr.length ? new qxl.apiviewer.dao.Param(arr[0], this) : [];

      if (meta.property) {
        var m = name.match(/^(get|set|is)(.*)$/);

        if (m) {
          this._propertyName = qx.lang.String.firstLow(m[2]);
        }
      }

      this._applyFor = meta.applyFor || [];
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
        return qxl.apiviewer.dao.Method.prototype.isDeprecated.base.call(this) || this.getFromProperty() && this.getFromProperty().isDeprecated();
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
        var _this2 = this;

        return (iface.getMethods() || []).some(function (method) {
          return method.getName() == _this2.getName();
        });
      }
    }
  });
  qxl.apiviewer.dao.Method.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Method.js.map?dt=1614107156574