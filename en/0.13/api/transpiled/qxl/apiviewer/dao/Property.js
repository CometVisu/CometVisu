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
      "qxl.apiviewer.dao.Class": {},
      "qxl.apiviewer.ui.ClassViewer": {}
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

  /**
   * Represents a property
   *
      "paddingTop": {
        "location": {
          "start": {
            "line": 393,
            "column": 4
          },
          "end": {
            "line": 399,
            "column": 5
          }
        },
        "jsdoc": {
          "@description": [
            {
              "name": "@description",
              "body": "---------------------------------------------------------------------------\nPADDING\n---------------------------------------------------------------------------"
            },
            {
              "name": "@description",
              "body": "Padding of the widget (top)"
            }
          ]
        },
        "name": "paddingTop",
        "propertyType": "new",
        "themeable": true,
        "apply": "_applyPadding",
        "check": "Integer",
        "defaultValue": 0
      },
  
   */
  qx.Class.define("qxl.apiviewer.dao.Property", {
    extend: qxl.apiviewer.dao.ClassItem,
    construct: function construct(meta, clazz, name) {
      qxl.apiviewer.dao.ClassItem.constructor.call(this, meta, clazz, name);
    },
    members: {
      getTypes: function getTypes() {
        var result = [];

        if (this._meta.check) {
          result.push({
            type: this._meta.check
          });
        }

        return result;
      },

      /**
      * Returns the check attribute of the property definition if
      * the check attribute does not define an internal type or a
      * class. In this case use {@link #getTypes}.
      *
      * @return {String} the contents of the check attribute.
      */
      getCheck: function getCheck() {
        var check = this._meta.check;

        if (check && !qxl.apiviewer.dao.Class.getClassByName(check) && !qxl.apiviewer.ui.ClassViewer.PRIMITIVES[check]) {
          return check;
        }

        return null;
      },

      /**
      * @Override
      */
      isRequiredByInterface: function isRequiredByInterface(iface) {
        var _this = this;

        return iface.getProperties().some(function (method) {
          return method.getName() == _this.getName();
        });
      },
      getClassname: function getClassname() {
        return this._class.getName();
      },
      getPossibleValues: function getPossibleValues() {
        return this._meta.possibleValues || [];
      },
      getGroup: function getGroup() {
        return this._meta.group || [];
      },
      isPropertyGroup: function isPropertyGroup() {
        return Boolean(this._meta.group);
      },
      getType: function getType() {
        return this.getCheck();
      },
      getEvent: function getEvent() {
        return this._meta.event;
      },
      getApplyMethod: function getApplyMethod() {
        return this._meta.apply;
      },
      isNullable: function isNullable() {
        return Boolean(this._meta.nullable);
      },
      getDefaultValue: function getDefaultValue() {
        return this._meta.defaultValue;
      },
      isInheritable: function isInheritable() {
        return this._meta.inheritable || false;
      },
      isThemeable: function isThemeable() {
        return this._meta.themeable || false;
      },
      isRefined: function isRefined() {
        return this._meta.refine || false;
      }
    }
  });
  qxl.apiviewer.dao.Property.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Property.js.map?dt=1664297908183