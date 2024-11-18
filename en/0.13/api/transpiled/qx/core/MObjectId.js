function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.core.Object.allowUndefinedObjectId": {}
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2017 Zenesis Limited, http://www.zenesis.com
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * John Spackman (john.spackman@zenesis.com, @johnspackman)
  
  ************************************************************************ */

  /**
   * A mixin providing objects by ID and owners.
   *
   * The typical use of IDs is to override the `_createQxObjectImpl` method and create
   * new instances on demand; all code should access these instances by calling
   * `getQxObject`.
   */
  qx.Mixin.define("qx.core.MObjectId", {
    /*
     * ****************************************************************************
     * PROPERTIES
     * ****************************************************************************
     */

    properties: {
      /** The owning object */
      qxOwner: {
        init: null,
        check: "qx.core.Object",
        nullable: true,
        apply: "_applyQxOwner"
      },
      /** {String} The ID of the object.  */
      qxObjectId: {
        init: null,
        check: function check(value) {
          return value === null || typeof value == "string" && value.indexOf("/") < 0;
        },
        nullable: true,
        apply: "_applyQxObjectId"
      }
    },
    /*
     * ****************************************************************************
     * MEMBERS
     * ****************************************************************************
     */
    statics: {
      handleObjects: function handleObjects(clazz, instance, id) {
        var _objectsDef$id, _clazz$$$includes;
        var objectsDef = clazz.$$objects;
        var clazzObject = objectsDef === null || objectsDef === void 0 || (_objectsDef$id = objectsDef[id]) === null || _objectsDef$id === void 0 ? void 0 : _objectsDef$id.call(instance);
        if (clazzObject !== undefined) {
          return clazzObject;
        }
        var _iterator = _createForOfIteratorHelper((_clazz$$$includes = clazz.$$includes) !== null && _clazz$$$includes !== void 0 ? _clazz$$$includes : []),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var mixin = _step.value;
            var mixinObject = qx.core.MObjectId.handleObjects(mixin, instance, id);
            if (mixinObject !== undefined) {
              return mixinObject;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        return undefined;
      }
    },
    members: {
      __P_173_0: null,
      __P_173_1: false,
      /**
       * Apply owner
       */
      _applyQxOwner: function _applyQxOwner(value, oldValue) {
        if (!this.__P_173_1) {
          throw new Error("Please use API methods to change owner, not the property");
        }
      },
      /**
       * Apply objectId
       */
      _applyQxObjectId: function _applyQxObjectId(value, oldValue) {
        if (!this.__P_173_1) {
          var owner = this.getQxOwner();
          if (owner) {
            owner.__P_173_2(this, value, oldValue);
          }
          this._cascadeQxObjectIdChanges();
        }
      },
      /**
       * Called when a child's objectId changes
       */
      __P_173_2: function __P_173_2(obj, newId, oldId) {
        delete this.__P_173_0[oldId];
        this.__P_173_0[newId] = obj;
      },
      /**
       * Reflect changes to IDs or owners
       */
      _cascadeQxObjectIdChanges: function _cascadeQxObjectIdChanges() {
        if (typeof this.getContentElement == "function") {
          var contentElement = this.getContentElement();
          if (contentElement) {
            contentElement.updateObjectId();
          }
        }
        if (this.__P_173_0) {
          for (var name in this.__P_173_0) {
            var obj = this.__P_173_0[name];
            if (obj instanceof qx.core.Object) {
              obj._cascadeQxObjectIdChanges();
            }
          }
        }
      },
      /**
       * Returns the object with the specified ID
       *
       * @param id
       *          {String} ID of the object
       * @return {qx.core.Object?} the found object
       */
      getQxObject: function getQxObject(id) {
        if (this.__P_173_0) {
          var obj = this.__P_173_0[id];
          if (obj !== undefined) {
            return obj;
          }
        }

        // Separate out the child control ID
        var controlId = null;
        var pos = id.indexOf("#");
        if (pos > -1) {
          controlId = id.substring(pos + 1);
          id = id.substring(0, pos);
        }
        var result = undefined;

        // Handle paths
        if (id.indexOf("/") > -1) {
          var segments = id.split("/");
          var target = this;
          var found = segments.every(function (segment) {
            if (!segment.length) {
              return true;
            }
            if (!target) {
              return false;
            }
            var tmp;
            if (segment === "..") {
              tmp = target.getQxOwner();
            } else {
              tmp = target.getQxObject(segment);
            }
            if (tmp !== undefined) {
              target = tmp;
              return true;
            }
          });
          if (found) {
            result = target;
          }
        } else {
          // No object, creating the object
          result = this._createQxObject(id);
        }
        if (result && controlId) {
          var childControl = result.getChildControl(controlId);
          return childControl;
        }
        if (!qx.core.Environment.get("qx.core.Object.allowUndefinedObjectId")) {
          if (result === undefined) {
            throw new Error("Cannot find a QX Object in ".concat(this.classname, " [").concat(this, "] with id=").concat(id));
          }
        }
        return result;
      },
      /**
       * Creates the object and adds it to a list; most classes are expected to
       * override `_createQxObjectImpl` NOT this method.
       *
       * @param id {String} ID of the object
       * @return {qx.core.Object?} the created object
       */
      _createQxObject: function _createQxObject(id) {
        var result = this._createQxObjectImpl(id);
        if (result !== undefined) {
          this.addOwnedQxObject(result, id);
        }
        return result;
      },
      /**
       * Creates the object, intended to be overridden. Null is a valid return
       * value and will be cached by `getQxObject`, however `undefined` is NOT a
       * valid value and so will not be cached meaning that `_createQxObjectImpl`
       * will be called multiple times until a valid value is returned.
       *
       * @param id {String} ID of the object
       * @return {qx.core.Object?} the created object
       */
      _createQxObjectImpl: function _createQxObjectImpl(id) {
        return undefined;
      },
      /**
       * Adds an object as owned by this object
       *
       * @param obj {qx.core.Object} the object to register
       * @param id {String?} the id to set when registering the object
       */
      addOwnedQxObject: function addOwnedQxObject(obj, id) {
        if (!this.__P_173_0) {
          this.__P_173_0 = {};
        }
        if (!(obj instanceof qx.core.Object)) {
          if (!id) {
            throw new Error("Cannot register an object that has no ID, obj=" + obj);
          }
          if (this.__P_173_0[id]) {
            throw new Error("Cannot register an object with ID '" + id + "' because that ID is already in use, this=" + this + ", obj=" + obj);
          }
          this.__P_173_0[id] = obj;
          return;
        }
        var thatOwner = obj.getQxOwner();
        if (thatOwner === this) {
          return;
        }
        obj.__P_173_1 = true;
        try {
          if (thatOwner) {
            thatOwner.__P_173_3(obj);
          }
          if (id === undefined) {
            id = obj.getQxObjectId();
          }
          if (!id) {
            throw new Error("Cannot register an object that has no ID, obj=" + obj);
          }
          if (this.__P_173_0[id]) {
            throw new Error("Cannot register an object with ID '" + id + "' because that ID is already in use, this=" + this + ", obj=" + obj);
          }
          if (obj.getQxOwner() != null) {
            throw new Error("Cannot register an object with ID '" + id + "' because it is already owned by another object this=" + this + ", obj=" + obj);
          }
          obj.setQxOwner(this);
          obj.setQxObjectId(id);
          obj._cascadeQxObjectIdChanges();
        } finally {
          obj.__P_173_1 = false;
        }
        this.__P_173_0[id] = obj;
      },
      /**
       * Discards an object from the list of owned objects; note that this does
       * not dispose of the object, simply forgets it if it exists.
       *
       * @param args {String|Object} the ID of the object to discard, or the object itself
       */
      removeOwnedQxObject: function removeOwnedQxObject(args) {
        if (!this.__P_173_0) {
          throw new Error("Cannot discard object because it is not owned by this, this=" + this + ", object=" + obj);
        }
        var id;
        var obj;
        if (typeof args === "string") {
          if (args.indexOf("/") > -1) {
            throw new Error("Cannot discard owned objects based on a path");
          }
          id = args;
          obj = this.__P_173_0[id];
          if (obj === undefined) {
            return;
          }
        } else {
          obj = args;
          if (!(obj instanceof qx.core.Object)) {
            throw new Error("Cannot discard object by reference because it is not a Qooxdoo object, please remove it using the original ID; object=" + obj);
          }
          id = obj.getQxObjectId();
          if (this.__P_173_0[id] !== obj) {
            throw new Error("Cannot discard object because it is not owned by this, this=" + this + ", object=" + obj);
          }
        }
        if (obj !== null) {
          if (!(obj instanceof qx.core.Object)) {
            this.__P_173_3(obj);
            delete this.__P_173_0[id];
          } else {
            obj.__P_173_1 = true;
            try {
              this.__P_173_3(obj);
              obj._cascadeQxObjectIdChanges();
            } finally {
              obj.__P_173_1 = false;
            }
          }
        }
      },
      /**
       * Removes an owned object
       *
       * @param obj {qx.core.Object} the object
       */
      __P_173_3: function __P_173_3(obj) {
        if (obj !== null) {
          var id = obj.getQxObjectId();
          obj.setQxOwner(null);
          delete this.__P_173_0[id];
        }
      },
      /**
       * Returns an array of objects that are owned by this object, or an empty
       * array if none exists.
       *
       * @return {Array}
       */
      getOwnedQxObjects: function getOwnedQxObjects() {
        return this.__P_173_0 ? Object.values(this.__P_173_0) : [];
      }
    }
  });
  qx.core.MObjectId.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MObjectId.js.map?dt=1731948102724