(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.dev.unit.TestCase": {
        "require": true
      },
      "qx.dev.unit.MMock": {
        "require": true
      },
      "qx.core.Object": {},
      "qx.core.MObjectId": {},
      "qx.ui.form.TextField": {},
      "qx.core.Id": {},
      "qx.Mixin": {},
      "qx.core.MAssert": {}
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
   * @ignore(demo.MyClass)
   * @ignore(demo.SuperClass)
   * @ignore(demo.SubClass)
   * @ignore(demo.ObjectOnly)
   */
  /* global demo */

  qx.Class.define("qx.test.core.ObjectId", {
    extend: qx.dev.unit.TestCase,
    include: qx.dev.unit.MMock,
    members: {
      testGetObject: function testGetObject() {
        var clazz = qx.Class.define("demo.MyClass", {
          extend: qx.core.Object,
          members: {
            _createQxObjectImpl: function _createQxObjectImpl(id) {
              {
                var _qx$core$MObjectId;
                var object = (_qx$core$MObjectId = qx.core.MObjectId).handleObjects.apply(_qx$core$MObjectId, [demo.MyClass, this].concat(Array.prototype.slice.call(arguments)));
                if (object !== undefined) {
                  return object;
                }
              }
              switch (id) {
                case "txt":
                  return new qx.ui.form.TextField();
              }
              return demo.MyClass.superclass.prototype._createQxObjectImpl.call(this, id);
            }
          }
        });
        var obj = new demo.MyClass();
        var Id = qx.core.Id.getInstance();
        Id.register(obj, "test");
        var txt = obj.getQxObject("txt");
        this.assertTrue(txt === obj.getQxObject("txt"));
        this.assertTrue(txt.getQxObjectId() === "txt");
        this.assertTrue(Id.getQxObject("test") === obj);
        this.assertTrue(Id.getQxObject("test/txt") === txt);
        obj.removeOwnedQxObject(txt);
        var txt2 = obj.getQxObject("txt");
        this.assertTrue(txt !== txt2);
        this.assertTrue(txt2 === obj.getQxObject("txt"));
        txt.setQxObjectId("txt-orig");
        obj.addOwnedQxObject(txt);
        this.assertTrue(txt === obj.getQxObject("txt-orig"));
        var obj2 = new demo.MyClass();
        obj2.addOwnedQxObject(txt);
        this.assertTrue(obj.getQxObject("txt-orig") === undefined);
        this.assertTrue(obj2.getQxObject("txt-orig") === txt);
        Id.unregister("test");
        this.assertTrue(!Id.getQxObject("test"));
      },
      testObjectsSection: function testObjectsSection() {
        var SuperClass = qx.Class.define("demo.SuperClass", {
          extend: qx.core.Object,
          objects: {
            overriddenObject: function overriddenObject() {
              return "overridden object in superclass";
            },
            inheritedObject: function inheritedObject() {
              return "inherited object";
            },
            modifiedObject: function modifiedObject() {
              return "modified object";
            }
          },
          members: {
            _createQxObjectImpl: function _createQxObjectImpl(id) {
              {
                var _qx$core$MObjectId2;
                var object = (_qx$core$MObjectId2 = qx.core.MObjectId).handleObjects.apply(_qx$core$MObjectId2, [demo.SuperClass, this].concat(Array.prototype.slice.call(arguments)));
                if (object !== undefined) {
                  return object;
                }
              }
              switch (id) {
                case "superCreateQxObjectImpl":
                  return "superCreateQxObjectImpl";
              }
              return demo.SuperClass.superclass.prototype._createQxObjectImpl.call(this, id);
            }
          }
        });
        var Mixin = qx.Mixin.define("demo.Mixin", {
          objects: {
            mixedObject: function mixedObject() {
              return "mixed object";
            },
            mixedOverriddenObject: function mixedOverriddenObject() {
              return "mixed object";
            }
          },
          members: {}
        });
        var SubClass = qx.Class.define("demo.SubClass", {
          extend: SuperClass,
          include: [qx.core.MAssert, Mixin],
          objects: {
            commonObject: function commonObject() {
              return "common object in objects section";
            },
            overriddenObject: function overriddenObject() {
              return "overridden object in subclass";
            },
            modifiedObject: function modifiedObject() {
              return demo.SubClass.superclass.prototype._createQxObjectImpl.call(this, "modifiedObject") + " + some changes";
            },
            mixedOverriddenObject: function mixedOverriddenObject() {
              return "mixed overridden object";
            }
          },
          members: {
            _createQxObjectImpl: function _createQxObjectImpl(id) {
              {
                var _qx$core$MObjectId3;
                var object = (_qx$core$MObjectId3 = qx.core.MObjectId).handleObjects.apply(_qx$core$MObjectId3, [demo.SubClass, this].concat(Array.prototype.slice.call(arguments)));
                if (object !== undefined) {
                  return object;
                }
              }
              switch (id) {
                case "commonObject":
                  return "common object in _createQxObjectImpl";
                case "onlyInQxObjectImpl":
                  return "onlyInQxObjectImpl";
              }
              return demo.SubClass.superclass.prototype._createQxObjectImpl.call(this, id);
            }
          }
        });
        var obj = new SubClass();
        this.assertEquals("common object in objects section", obj.getQxObject("commonObject"));
        this.assertEquals("onlyInQxObjectImpl", obj.getQxObject("onlyInQxObjectImpl"));
        this.assertEquals("overridden object in subclass", obj.getQxObject("overriddenObject"));
        this.assertEquals("inherited object", obj.getQxObject("inheritedObject"));
        this.assertEquals("modified object + some changes", obj.getQxObject("modifiedObject"));
        this.assertEquals("superCreateQxObjectImpl", obj.getQxObject("superCreateQxObjectImpl"));
        this.assertEquals("mixed object", obj.getQxObject("mixedObject"));
        this.assertEquals("mixed overridden object", obj.getQxObject("mixedOverriddenObject"));
        var ObjectOnlyClass = qx.Class.define("demo.ObjectOnly", {
          extend: qx.core.Object,
          objects: {
            onlyInQxObjectImpl: function onlyInQxObjectImpl() {
              return "onlyInQxObjectImpl";
            }
          },
          members: {
            _createQxObjectImpl: function _createQxObjectImpl() {
              var _demo$ObjectOnly$supe;
              {
                var _qx$core$MObjectId4;
                var object = (_qx$core$MObjectId4 = qx.core.MObjectId).handleObjects.apply(_qx$core$MObjectId4, [demo.ObjectOnly, this].concat(Array.prototype.slice.call(arguments)));
                if (object !== undefined) {
                  return object;
                }
              }
              return (_demo$ObjectOnly$supe = demo.ObjectOnly.superclass.prototype._createQxObjectImpl).call.apply(_demo$ObjectOnly$supe, [this].concat(Array.prototype.slice.call(arguments)));
            }
          }
        });
        var objectsOnlyObject = new ObjectOnlyClass();
        this.assertEquals("onlyInQxObjectImpl", objectsOnlyObject.getQxObject("onlyInQxObjectImpl"));
      },
      ensureNullPermissible: function ensureNullPermissible() {
        var Clazz = qx.Clazz.define("demo.NullPermissible", {
          objects: {
            objects: function objects() {
              return null;
            }
          },
          members: {
            _createQxObjectImpl: function _createQxObjectImpl(id) {
              {
                var _qx$core$MObjectId5;
                var object = (_qx$core$MObjectId5 = qx.core.MObjectId).handleObjects.apply(_qx$core$MObjectId5, [qx.test.core.ObjectId, this].concat(Array.prototype.slice.call(arguments)));
                if (object !== undefined) {
                  return object;
                }
              }
              if (id === "members") {
                return null;
              }
            }
          }
        });
        var newClazz = new Clazz();
        this.assertTrue(newClazz.getQxObject("objects") === null);
        this.assertTrue(newClazz.getQxObject("members") === null);
      }
    }
  });
  qx.test.core.ObjectId.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ObjectId.js.map?dt=1722153825152