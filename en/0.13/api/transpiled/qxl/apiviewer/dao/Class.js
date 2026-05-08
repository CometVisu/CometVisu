function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qxl.apiviewer.dao.Node": {
        "construct": true,
        "require": true
      },
      "qxl.apiviewer.dao.Package": {
        "construct": true
      },
      "qxl.apiviewer.ClassLoader": {},
      "qxl.apiviewer.RequestUtil": {},
      "qxl.apiviewer.dao.Method": {},
      "qxl.apiviewer.dao.Constant": {},
      "qxl.apiviewer.dao.Event": {},
      "qxl.apiviewer.dao.Property": {},
      "qx.lang.String": {},
      "qxl.apiviewer.dao.PropertyMethod": {},
      "qxl.apiviewer.dao.ChildControl": {},
      "qx.Promise": {},
      "qx.lang.Array": {}
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
   * This Class wraps the access to the documentation data of classes.
   */
  qx.Class.define("qxl.apiviewer.dao.Class", {
    extend: qxl.apiviewer.dao.Node,
    /**
     * @param className
     */
    construct: function construct(className) {
      qxl.apiviewer.dao.Node.constructor.call(this);
      this._className = className;
      this._package = qxl.apiviewer.dao.Package.getParentPackage(className);
      this._package.addClass(this);
    },
    members: {
      _package: null,
      _construct: null,
      _destruct: null,
      _defer: null,
      _staticMethods: null,
      _constants: null,
      _members: null,
      _mixinMembers: null,
      _properties: null,
      _mixinProperties: null,
      _events: null,
      _mixinEvents: null,
      _superClass: null,
      _superInterfaces: null,
      _superMixins: null,
      _mixins: null,
      _loadingPromise: null,
      _loaded: false,
      __P_815_0: null,
      /**
       * retrieves the meta file name + path
       */
      getMetaFile: function getMetaFile() {
        return this.__P_815_0;
      },
      /**
       * Loads the class
       *
       * @return {Promise}
       */
      load: function load() {
        var _this = this;
        if (this._loadingPromise) {
          return this._loadingPromise;
        }
        var loadImpl = /*#__PURE__*/function () {
          var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
            var content, meta, _t;
            return _regenerator().w(function (_context) {
              while (1) switch (_context.p = _context.n) {
                case 0:
                  _this.__P_815_0 = qxl.apiviewer.ClassLoader.getBaseUri() + _this._className.replace(/\./g, "/") + ".json";
                  _context.p = 1;
                  _context.n = 2;
                  return qxl.apiviewer.RequestUtil.get(_this.__P_815_0);
                case 2:
                  content = _context.v;
                  _context.n = 4;
                  break;
                case 3:
                  _context.p = 3;
                  _t = _context.v;
                  _this.error("Couldn't load file: " + _this.__P_815_0 + " " + _t.message);
                case 4:
                  meta = JSON.parse(content);
                  _context.n = 5;
                  return _this._initMeta(meta);
                case 5:
                  _this._loaded = true;
                  return _context.a(2, _this);
              }
            }, _callee, null, [[1, 3]]);
          }));
          return function loadImpl() {
            return _ref.apply(this, arguments);
          };
        }();
        this.__P_815_1 = loadImpl();
        return this.__P_815_1;
      },
      isLoaded: function isLoaded() {
        return this._loaded;
      },
      /**
       * Loads meta data, including super classes/interfaces/mixins
       * @param meta
       * @return {qx.Promise}
       */
      _initMeta: function _initMeta(meta) {
        var _this2 = this;
        qxl.apiviewer.dao.Class.superclass.prototype._initMeta.call(this, meta);
        this._jsdoc = meta.jsdoc || {};
        this._construct = meta.construct ? [new qxl.apiviewer.dao.Method(meta.construct, this, "construct")] : [];
        this._destruct = meta.destruct ? [new qxl.apiviewer.dao.Method(meta.destruct, this, "destruct")] : [];
        this._defer = meta.defer ? [new qxl.apiviewer.dao.Method(meta.defer, this, "defer")] : [];
        this._staticMethods = [];
        this._constants = [];
        if (meta.statics) {
          for (var name in meta.statics) {
            var data = meta.statics[name];
            if (data.type == "variable") {
              this._constants.push(new qxl.apiviewer.dao.Constant(data, this, name));
            } else {
              data.isStatic = true;
              this._staticMethods.push(new qxl.apiviewer.dao.Method(data, this, name));
            }
          }
        }
        this._members = [];
        this._mixinMembers = [];
        if (meta.members) {
          for (var _name in meta.members) {
            var _data = meta.members[_name];
            if (_data.type == "function") {
              var obj = new qxl.apiviewer.dao.Method(_data, this, _name);
              if (_data.mixin) {
                this._mixinMembers.push(obj);
              } else {
                this._members.push(obj);
              }
            }
          }
        }
        this._events = [];
        this._mixinEvents = [];
        if (meta.events) {
          for (var _name2 in meta.events) {
            var _data2 = meta.events[_name2];
            var _obj = new qxl.apiviewer.dao.Event(_data2, this, _name2);
            if (_data2.mixin) {
              this._mixinEvents.push(_obj);
            } else {
              this._events.push(_obj);
            }
          }
        }
        this._properties = [];
        this._mixinProperties = [];
        if (meta.properties) {
          var _loop = function _loop() {
            var data = meta.properties[_name3];
            var obj = new qxl.apiviewer.dao.Property(data, _this2, _name3);
            if (data.mixin) {
              _this2._mixinProperties.push(obj);
            } else {
              _this2._properties.push(obj);
            }
            var upname = qx.lang.String.firstUp(_name3);
            var addPropertyMethod = function addPropertyMethod(methodName, prefix) {
              var methodObj = new qxl.apiviewer.dao.PropertyMethod(data, _this2, methodName, prefix);
              if (data.mixin) {
                _this2._mixinMembers.push(methodObj);
              } else {
                _this2._members.push(methodObj);
              }
            };
            addPropertyMethod("get" + upname, "get");
            if (data.type == "Boolean") {
              addPropertyMethod("is" + upname, "is");
            }
            addPropertyMethod("set" + upname, "set");
            addPropertyMethod("reset" + upname, "reset");
            if (meta.async) {
              addPropertyMethod("get" + upname + "Async", "get");
              addPropertyMethod("set" + upname + "Async", "set");
            }
            var evt = obj.getEvent();
            if (evt) {
              var objE = new qxl.apiviewer.dao.Event({
                location: obj.location,
                name: evt,
                type: "qx.event.type.Data",
                jsdoc: {
                  "@description": [{
                    name: "@description",
                    body: "Fired on change of the property {@link ".concat(data.overriddenFrom || "", "#").concat(_name3, " ").concat(_name3, "}")
                  }]
                }
              }, _this2);
              if (data.mixin) {
                _this2._mixinEvents.push(objE);
              } else {
                _this2._events.push(objE);
              }
            }
          };
          for (var _name3 in meta.properties) {
            _loop();
          }
        }
        this._childControls = [];
        var arr = this._jsdoc["@childControl"];
        if (arr) {
          arr.forEach(function (elem) {
            _this2._childControls.push(new qxl.apiviewer.dao.ChildControl(elem, _this2));
          });
        }
        var all = [];
        /**
         * @param tmp
         */
        function findClasses(tmp) {
          var p = qxl.apiviewer.dao.Class.findClasses(tmp);
          return p.then(function (classes) {
            classes.forEach(function (item) {
              all.push(item);
            });
            return classes;
          });
        }
        this._superClass = null;
        this._superInterfaces = [];
        this._superMixins = [];
        if (this._meta.type == "interface") {
          all.push(findClasses(meta.superClass).then(function (arr) {
            return _this2._superInterfaces = arr;
          }));
        } else if (this._meta.type == "mixin") {
          all.push(findClasses(meta.superClass).then(function (arr) {
            return _this2._superMixins = arr;
          }));
        } else {
          all.push(findClasses(meta.superClass).then(function (arr) {
            return _this2._superClass = arr[0] || null;
          }));
        }
        this._interfaces = [];
        findClasses(meta.interfaces).then(function (arr) {
          return _this2._interfaces = arr;
        });
        this._mixins = [];
        findClasses(meta.mixins).then(function (arr) {
          return _this2._mixins = arr;
        });
        return qx.Promise.all(all);
      },
      getPackage: function getPackage() {
        return this._package;
      },
      /**
       * Get the name of the class.
       *
       * @return {String} name of the class
       */
      getName: function getName() {
        return this._className;
      },
      /**
       * Get the full name of the class, including the package name.
       *
       * @return {String} full name of the class
       */
      getFullName: function getFullName() {
        return this._className;
      },
      /**
       * Get the package name of the class.
       *
       * @return {String} package name of the class
       */
      getPackageName: function getPackageName() {
        return this._package.getFullName();
      },
      /**
       * Get type of the class. Valid types are "class", "interface" and "mixin".
       *
       * @return {String} The type of the class. Valid types are "class",
       *         "interface" and "mixin".
       */
      getType: function getType() {
        return this._meta.type;
      },
      /**
       * Get whether the class is abstract.
       *
       * @return {Boolean} Whether the class is abstract.
       */
      isAbstract: function isAbstract() {
        return this._meta.isAbstract || false;
      },
      /**
       * Get whether the class is a static class.
       *
       * @return {Boolean} Whether the class is static.
       */
      isStatic: function isStatic() {
        return this._meta.isStatic || false;
      },
      /**
       * Get whether the class is a singleton.
       *
       * @return {Boolean} Whether the class is a singleton.
       */
      isSingleton: function isSingleton() {
        return this._meta.isSingleton || false;
      },
      /**
       * Get the super class of the class.
       *
       * @return {qxl.apiviewer.dao.Class} The super class of the class.
       */
      getSuperClass: function getSuperClass() {
        return this._superClass;
      },
      /**
       * Get the direct child classes of the class.
       *
       * @return {qx.Promise<qxl.apiviewer.dao.Class[]>} A list of direct child classes of the
       *         class.
       */
      getChildClasses: function getChildClasses() {
        if (!this._childClassesPromise) {
          if (this._meta.type == "class") {
            this._childClassesPromise = qxl.apiviewer.dao.Class.findClasses(this._meta.descendants);
          } else {
            this._childClassesPromise = qx.Promise.resolve([]);
          }
        }
        return this._childClassesPromise;
      },
      /**
       * Get all interfaces declared at the class declaration.
       *
       * @return {qxl.apiviewer.dao.Class[]} All interfaces declared at the class
       *         declaration.
       */
      getInterfaces: function getInterfaces() {
        return this._interfaces;
      },
      /**
       * Get all super interfaces. (Only for interfaces)
       *
       * @return {qxl.apiviewer.dao.Class[]} All super interfaces.
       */
      getSuperInterfaces: function getSuperInterfaces() {
        return this._superInterfaces;
      },
      /**
       * Get all mixins declared at the class declaration.
       *
       * @return {qxl.apiviewer.dao.Class[]} All mixins declared at the class
       *         declaration.
       */
      getMixins: function getMixins() {
        return this._mixins;
      },
      /**
       * Get all super mixins. (Only for mixins)
       *
       * @return {qxl.apiviewer.dao.Class[]} All super mixins.
       */
      getSuperMixins: function getSuperMixins() {
        return this._superMixins;
      },
      /**
       * Get all classes including this mixin. (Only for mixins)
       *
       * @return {qx.Promise<qxl.apiviewer.dao.Class[]>} All classes including this mixin.
       */
      getIncluder: function getIncluder() {
        if (!this._includersPromise) {
          if (this._meta.type == "mixin") {
            this._includersPromise = qxl.apiviewer.dao.Class.findClasses(this._meta.descendants);
          } else {
            this._includersPromise = qx.Promise.resolve([]);
          }
        }
        return this._includersPromise;
      },
      /**
       * Get all implementations of this interface. (Only for interfaces)
       *
       * @return {qx.Promise<qxl.apiviewer.dao.Class[]>} All implementations of this interface.
       */
      getImplementations: function getImplementations() {
        if (!this._implementationsPromise) {
          if (this._meta.type == "interface") {
            this._implementationsPromise = qxl.apiviewer.dao.Class.findClasses(this._meta.descendants);
          } else {
            this._implementationsPromise = qx.Promise.resolve([]);
          }
        }
        return this._implementationsPromise;
      },
      /**
       * Get the constructor of the class.
       *
       * @return {qxl.apiviewer.dao.Method} The constructor of the class.
       */
      getConstructor: function getConstructor() {
        return this._construct;
      },
      /**
       * Get all child controls
       *
       * @return {qxl.apiviewer.dao.ChildControl[]} All child controls.
       */
      getChildControls: function getChildControls() {
        return this._childControls;
      },
      /**
       * Get the members of the class.
       *
       * @return {qxl.apiviewer.dao.Method[]} The members of the class.
       * @deprecated Is this used any more????
       */
      getMembers: function getMembers() {
        return this._members;
      },
      /**
       * Get the members of the class.
       *
       * @return {qxl.apiviewer.dao.Method[]} The members of the class.
       */
      getMethods: function getMethods() {
        return this._members;
      },
      /**
       * Get the members of the class, contributed from mixins
       *
       * @return {qxl.apiviewer.dao.Method[]} The members of the class.
       * @deprecated Is this used any more????
       */
      getMixinMembers: function getMixinMembers() {
        return this._mixinMembers;
      },
      /**
       * Get the members of the class, contributed from mixins
       *
       * @return {qxl.apiviewer.dao.Method[]} The members of the class.
       */
      getMixinMethods: function getMixinMethods() {
        return this._mixinMembers;
      },
      /**
       * Get the statics of the class.
       *
       * @return {qxl.apiviewer.dao.Method[]} The statics of the class.
       */
      getStatics: function getStatics() {
        return this._staticMethods;
      },
      /**
       * Get the events of the class.
       *
       * @return {qxl.apiviewer.dao.Event[]} The events of the class.
       */
      getEvents: function getEvents() {
        return this._events;
      },
      /**
       * Get the events of the class, contributed from mixins
       *
       * @return {qxl.apiviewer.dao.Event[]} The events of the class.
       */
      getMixinEvents: function getMixinEvents() {
        return this._mixinEvents;
      },
      /**
       * Get the properties of the class.
       *
       * @return {qxl.apiviewer.dao.Property[]} The properties of the class.
       */
      getProperties: function getProperties() {
        return this._properties;
      },
      /**
       * Returns a property with a given name
       * @param name
       * @return {qxl.apiviewer.dao.Property} The named property
       */
      getProperty: function getProperty(name) {
        for (var i = 0; i < this._properties.length; i++) {
          var prop = this._properties[i];
          if (prop.getName() == name) {
            return prop;
          }
        }
        return null;
      },
      /**
       * Get the properties of the class, contributed from mixins
       *
       * @return {qxl.apiviewer.dao.Property[]} The properties of the class.
       */
      getMixinProperties: function getMixinProperties() {
        return this._mixinProperties;
      },
      /**
       * Get the constants of the class.
       *
       * @return {qxl.apiviewer.dao.Constant[]} The constants of the class.
       */
      getConstants: function getConstants() {
        return this._constants;
      },
      /**
       * Get all references declared using the "see" attribute.
       *
       * @return {String[]} A list of all references declared using the "see" attribute.
       */
      getSee: function getSee() {
        return (this._jsdoc["@see"] || []).map(function (item) {
          return item.body;
        });
      },
      getErrors: function getErrors() {
        return [];
      },
      /* COMPLEX FUNCTIONS */
      /**
       * Get the documentation nodes of all classes in the inheritance chain of a
       * class. The first entry in the list is the class itself.
       *
       * @param includeNativeObjects
       *          {Boolean} true if you want to get native JS objects too
       * @return {qxl.apiviewer.dao.Class[]} array of super classes of the given
       *         class.
       */
      getClassHierarchy: function getClassHierarchy(includeNativeObjects) {
        var result = [];
        for (var currentClass = this; currentClass; currentClass = currentClass.getSuperClass()) {
          var isNative = qxl.apiviewer.dao.Class.isNativeObject(currentClass);
          if (!isNative || includeNativeObjects) {
            result.push(currentClass);
          }
          if (isNative) {
            break;
          }
        }
        return result;
      },
      /**
       * Get the documentation nodes of all interfaces in the inheritance chain of
       * an interface. The first entry in the list is the interface itself.
       *
       * @return {qxl.apiviewer.dao.Class[]} array of super interfaces of the given
       *         interface.
       */
      getInterfaceHierarchy: function getInterfaceHierarchy() {
        var result = [];

        /**
         * @param currentClass
         */
        function add(currentClass) {
          result.push(currentClass);
          currentClass.getSuperInterfaces().forEach(function (itf) {
            return add(itf);
          });
        }
        add(this);
        return result;
      },
      /**
       * Returns a list of all interfaces the class implements directly.
       *
       * @param includeSuperClasses
       *          {Boolean?false} Whether the interfaces of all super classes
       *          should be returned as well.
       */
      getAllInterfaces: function getAllInterfaces(includeSuperClasses) {
        var interfaceNodes = [];
        var _ifaceRecurser = function ifaceRecurser(ifaceNode) {
          interfaceNodes.push(ifaceNode);
          (ifaceNode.getSuperInterfaces() || []).forEach(_ifaceRecurser);
        };
        var classNodes = includeSuperClasses ? this.getClassHierarchy() : [this];
        classNodes.forEach(function (classNode) {
          (classNode.getInterfaces() || []).forEach(_ifaceRecurser);
        });
        return interfaceNodes;
      },
      /**
       * Return a class item matching the given name.
       *
       * @param itemName
       *          {String} name of the class item
       * @return {qxl.apiviewer.dao.ClassItem} the class item.
       */
      getItemByNameFromMixins: function getItemByNameFromMixins(itemName) {
        return this._mixinMembers[itemName] || this._mixinProperties[itemName] || this._mixinEvents[itemName] || null;
      },
      /**
       * Return a class item matching the given name.
       *
       * @param itemName {String} name of the class item
       * @return {qxl.apiviewer.dao.ClassItem} the class item.
       */
      getItem: function getItem(itemName) {
        var itemListNames = ["getMembers", "getStatics", "getEvents", "getProperties", "getConstants",
        // "getAppearances",
        "getChildControls"];
        for (var i = 0; i < itemListNames.length; i++) {
          var list = this[itemListNames[i]]();
          if (list) {
            for (var j = 0; j < list.length; j++) {
              if (itemName == list[j].getName()) {
                return list[j];
              }
            }
          }
        }
        return null;
      },
      /**
       * Get an array of class items matching the given list name. Known list names are:
       * <ul>
       *   <li>events</li>
       *   <li>constructor</li>
       *   <li>properties</li>
       *   <li>methods</li>
       *   <li>methods-static</li>
       *   <li>constants</li>
       *   <li>appearances</li>
       *   <li>superInterfaces</li>
       *   <li>superMixins</li>
       * </li>
       *
       * @param listName {String} name of the item list
       * @return {apiviewer.dao.ClassItem[]} item list
       */
      getItemList: function getItemList(listName) {
        var methodMap = {
          events: "getEvents",
          constructor: "getConstructor",
          properties: "getProperties",
          methods: "getMembers",
          "methods-static": "getStatics",
          constants: "getConstants",
          //        "appearances" : "getAppearances",
          superInterfaces: "getSuperInterfaces",
          superMixins: "getSuperMixins",
          childControls: "getChildControls"
        };
        if (listName == "constructor") {
          return this.getConstructor() ? [this.getConstructor()] : [];
        }
        return this[methodMap[listName]]();
      },
      /**
       * Get a class item by the item list name and the item name.
       * Valid item list names are documented at {@link #getItemList}.
       * .
       * @param listName {String} name of the item list.
       * @param itemName {String} name of the class item.
       * @return {apiviewer.dao.ClassItem} the matching class item.
       */
      getItemByListAndName: function getItemByListAndName(listName, itemName) {
        var _this3 = this;
        var getItemByListAndNameInternal = function getItemByListAndNameInternal(listName) {
          var list = _this3.getItemList(listName);
          for (var j = 0; j < list.length; j++) {
            if (itemName == list[j].getName()) {
              return list[j];
            }
          }
          return null;
        };
        var item = getItemByListAndNameInternal(listName);
        if (!item && listName === "methods") {
          // try search method in static methods
          item = getItemByListAndNameInternal("methods-static");
        }
        return item;
      },
      loadDependedClasses: function loadDependedClasses() {
        return qxl.apiviewer.ClassLoader.loadClassList(this.getDependedClasses());
      },
      /**
       * Return a list of all classes, mixins and interfaces this class depends
       * on. This includes all super classes and their mixins/interfaces and the
       * class itself.
       *
       * @return {qx.Promise<Class[]>} array of dependent classes.
       */
      getDependedClasses: function getDependedClasses() {
        var foundClasses = [];
        /**
         * @param clazz
         */
        function findClasses(clazz) {
          if (qxl.apiviewer.dao.Class.isNativeObject(clazz)) {
            return;
          }
          clazz.load().then(function () {});
          foundClasses.push(clazz);
          clazz.getSuperClass() && findClasses(clazz.getSuperClass());
          (clazz.getMixins() || []).forEach(function () {
            return findClasses;
          });
          (clazz.getSuperMixins() || []).forEach(function () {
            return findClasses;
          });
          (clazz.getInterfaces() || []).forEach(function () {
            return findClasses;
          });
          (clazz.getSuperInterfaces() || []).forEach(function () {
            return findClasses;
          });
        }
        findClasses(this);
        return foundClasses;
      }
    },
    statics: {
      _native_classes: {
        Array: Array,
        Boolean: Boolean,
        Date: Date,
        Error: Error,
        Function: Function,
        Math: Math,
        Number: Number,
        Object: Object,
        RegExp: RegExp,
        String: String
      },
      /**
       * Get a class documentation by the class name.
       * @param className
       * {String} name of the class
       * @param create
       * @return {qxl.apiviewer.dao.Class} The class documentation
       */
      getClassByName: function getClassByName(className, create) {
        var nativeClass = qxl.apiviewer.dao.Class._native_classes[className];
        if (nativeClass !== undefined) {
          return nativeClass;
        }
        var pkg = qxl.apiviewer.dao.Package.getParentPackage(className);
        if (!pkg) {
          throw new Error("Cannot find a package for " + className);
        }
        var cls = pkg.getClassByName(className);
        if (!cls && create) {
          cls = new qxl.apiviewer.dao.Class(className);
        }
        return cls;
      },
      /**
       * Get a class documentation by the class name.
       * @param classNames
       * @param create
       * @return {qxl.apiviewer.dao.Class} The class documentation
       */
      getClassesByName: function getClassesByName(classNames, create) {
        classNames = qx.lang.Array.toNativeArray(classNames);
        var result = classNames.map(function (name) {
          return qxl.apiviewer.dao.Class.getClassByName(name, create);
        });
        return result;
      },
      findClasses: function findClasses(name) {
        if (!name) {
          return qx.Promise.resolve([]);
        }
        var all = qx.lang.Array.toNativeArray(name).filter(function (name) {
          return !qxl.apiviewer.dao.Class._native_classes[name];
        }).map(function (name) {
          var c = qxl.apiviewer.dao.Class.getClassByName(name);
          if (c) {
            c.load();
          }
          return c;
        });
        return qx.Promise.all(all);
      },
      /**
       * Checks if the Class is a qooxdoo qxl.apiviewer.dao.Class Object or a native
       * one
       *
       * @param clazz
       *          {qxl.apiviewer.dao.Class} the object to be checked
       * @return {Boolean} true if it is a JS native object
       */
      isNativeObject: function isNativeObject(clazz) {
        return clazz.classname !== "qxl.apiviewer.dao.Class";
      }
    }
  });
  qxl.apiviewer.dao.Class.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Class.js.map?dt=1778272859341