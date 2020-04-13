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
      "qxl.apiviewer.dao.Class": {}
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
  qx.Class.define("qxl.apiviewer.dao.Event", {
    extend: qxl.apiviewer.dao.ClassItem,
    construct: function construct(meta, clazz) {
      qxl.apiviewer.dao.ClassItem.constructor.call(this, meta, clazz, meta.name);
      this._type = meta.type;
    },
    members: {
      getType: function getType() {
        return qxl.apiviewer.dao.Class.getClassByName(this._type);
      },
      getTypes: function getTypes() {
        if (this._type) {
          return [{
            type: this._type
          }];
        }

        return [];
      },

      /**
       * @Override
       */
      isRequiredByInterface: function isRequiredByInterface(iface) {
        var _this = this;

        return iface.getEvents().some(function (method) {
          return method.getName() == _this.getName();
        });
      }
    }
  });
  qxl.apiviewer.dao.Event.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Event.js.map?dt=1586772678878