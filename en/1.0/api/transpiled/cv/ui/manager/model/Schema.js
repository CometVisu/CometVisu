function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "qx.util.ResourceManager": {},
      "qx.io.request.Xhr": {},
      "qx.xml.Document": {},
      "cv.ui.manager.model.schema.Element": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* Schema.js
   *
   * copyright (c) 2010-2026, Christian Mayer and the CometVisu contributors.
   *
   * This program is free software; you can redistribute it and/or modify it
   * under the terms of the GNU General Public License as published by the Free
   * Software Foundation; either version 3 of the License, or (at your option)
   * any later version.
   *
   * This program is distributed in the hope that it will be useful, but WITHOUT
   * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
   * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
   * more details.
   *
   * You should have received a copy of the GNU General Public License along
   * with this program; if not, write to the Free Software Foundation, Inc.,
   * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
   */

  /**
   *
   */
  qx.Class.define('cv.ui.manager.model.Schema', {
    extend: qx.core.Object,
    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct(filename) {
      qx.core.Object.constructor.call(this);
      if (!filename || !filename.match(/\.xsd$/)) {
        throw new Error('no, empty or invalid filename given, can not instantiate without one');
      }
      this.__filename = filename;
      this.setStructure(filename.endsWith('visu_config_tile.xsd') ? 'tile' : 'pure');
      this.__P_46_0 = {};
      this.__P_46_1 = {};
      this.__P_46_2 = {};
      this._cacheXSD();
    },
    /*
    ***********************************************
      STATICS
    ***********************************************
    */
    statics: {
      __P_46_3: {},
      getInstance: function getInstance(schemaFile) {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var schema;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                if (Object.prototype.hasOwnProperty.call(_this.__P_46_3, schemaFile)) {
                  _context.n = 1;
                  break;
                }
                schema = _this.__P_46_3[schemaFile] = new cv.ui.manager.model.Schema(qx.util.ResourceManager.getInstance().toUri(schemaFile));
                if (schema.isLoaded()) {
                  _context.n = 1;
                  break;
                }
                return _context.a(2, new Promise(function (resolve, reject) {
                  var timer = setTimeout(function () {
                    reject(new Error('timeout loading schema file'));
                  }, 5000);
                  schema.addListenerOnce('changeLoaded', function () {
                    clearTimeout(timer);
                    resolve(schema);
                  });
                }));
              case 1:
                return _context.a(2, _this.__P_46_3[schemaFile]);
            }
          }, _callee);
        }))();
      }
    },
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      loaded: {
        check: 'Boolean',
        init: false,
        event: 'changeLoaded'
      },
      structure: {
        check: ['pure', 'tile'],
        apply: '_applyStructure'
      }
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      __filename: null,
      /**
       * object of the schema/xsd
       * @var object
       */
      __P_46_4: null,
      /**
       * object of allowed root-level elements
       * @var object
       */
      __P_46_0: null,
      /**
       * cache for referenced nods
       * @var object
       */
      __P_46_1: null,
      /**
       * cache for getTypeNode
       * @var object
       */
      __P_46_2: null,
      /**
       * cache for #text-SchemaElement
       * @var object
       */
      __P_46_5: null,
      /**
       * cache for #comment-SchemaElement
       * @var object
       */
      __P_46_6: null,
      /**
       * @var {Array<String>}
       */
      _widgetNames: null,
      /**
       * @var {String}
       */
      __P_46_7: null,
      /**
       * @var {String}
       */
      __P_46_8: null,
      /**
       * @var {String}
       */
      __P_46_9: null,
      _applyStructure: function _applyStructure(structure) {
        if (structure === 'tile') {
          this.__P_46_7 = 'config';
          this.__P_46_8 = 'main';
          this.__P_46_9 = 'cv-page';
        } else {
          this.__P_46_7 = 'pages';
          this.__P_46_9 = 'page';
        }
      },
      onLoaded: function onLoaded(callback, context) {
        if (this.isLoaded()) {
          callback.call(context);
        } else {
          this.addListenerOnce('changeLoaded', callback, context);
        }
      },
      /**
       * load and cache the xsd from the server
       */
      _cacheXSD: function _cacheXSD() {
        var _this2 = this;
        var ajaxRequest = new qx.io.request.Xhr(this.__filename);
        ajaxRequest.set({
          accept: 'application/xml'
        });
        ajaxRequest.addListenerOnce('success', /*#__PURE__*/function () {
          var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(e) {
            var req, xml, includeXml, _iterator, _step, include, target, _iterator2, _step2, includedChild, _iterator3, _step3, _includedChild, _t, _t2;
            return _regenerator().w(function (_context2) {
              while (1) switch (_context2.p = _context2.n) {
                case 0:
                  req = e.getTarget(); // Response parsed according to the server's response content type
                  xml = req.getResponse();
                  if (xml && typeof xml === 'string') {
                    xml = qx.xml.Document.fromString(xml);
                  }
                  // embed all includes
                  _iterator = _createForOfIteratorHelper(xml.querySelectorAll('schema include'));
                  _context2.p = 1;
                  _iterator.s();
                case 2:
                  if ((_step = _iterator.n()).done) {
                    _context2.n = 9;
                    break;
                  }
                  include = _step.value;
                  target = include.parentElement;
                  include.remove();
                  _context2.p = 3;
                  _context2.n = 4;
                  return _this2.loadXml('resource/' + include.getAttribute('schemaLocation'));
                case 4:
                  includeXml = _context2.v;
                  _iterator2 = _createForOfIteratorHelper(includeXml.querySelectorAll('schema > *'));
                  try {
                    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                      includedChild = _step2.value;
                      target.appendChild(includedChild);
                    }
                  } catch (err) {
                    _iterator2.e(err);
                  } finally {
                    _iterator2.f();
                  }
                  _context2.n = 8;
                  break;
                case 5:
                  _context2.p = 5;
                  _t = _context2.v;
                  if (!(include.getAttribute('schemaLocation') === 'config/custom_visu_config.xsd')) {
                    _context2.n = 7;
                    break;
                  }
                  _this2.warn('use has no custom_visu_config.xsd, using default one as fallback');
                  _context2.n = 6;
                  return _this2.loadXml('resource/custom_visu_config.xsd');
                case 6:
                  includeXml = _context2.v;
                  _iterator3 = _createForOfIteratorHelper(includeXml.querySelectorAll('schema > *'));
                  try {
                    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
                      _includedChild = _step3.value;
                      target.appendChild(_includedChild);
                    }
                  } catch (err) {
                    _iterator3.e(err);
                  } finally {
                    _iterator3.f();
                  }
                  _context2.n = 8;
                  break;
                case 7:
                  _this2.error('failed to load schema include', _t);
                case 8:
                  _context2.n = 2;
                  break;
                case 9:
                  _context2.n = 11;
                  break;
                case 10:
                  _context2.p = 10;
                  _t2 = _context2.v;
                  _iterator.e(_t2);
                case 11:
                  _context2.p = 11;
                  _iterator.f();
                  return _context2.f(11);
                case 12:
                  _this2.__P_46_4 = xml;

                  // parse the data, to have at least a list of root-level-elements
                  _this2._parseXSD();
                case 13:
                  return _context2.a(2);
              }
            }, _callee2, null, [[3, 5], [1, 10, 11, 12]]);
          }));
          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }());
        ajaxRequest.send();
      },
      loadXml: function loadXml(file) {
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                return _context3.a(2, new Promise(function (resolve, reject) {
                  var ajaxRequest = new qx.io.request.Xhr(file);
                  ajaxRequest.set({
                    accept: 'application/xml'
                  });
                  ajaxRequest.addListenerOnce('success', function (e) {
                    var req = e.getTarget();
                    // Response parsed according to the server's response content type
                    var xml = req.getResponse();
                    if (xml && typeof xml === 'string') {
                      xml = qx.xml.Document.fromString(xml);
                    }
                    resolve(xml);
                  });
                  ajaxRequest.addListenerOnce('statusError', function (e) {
                    var req = e.getTarget();
                    reject(new Error(file + ': ' + req.getStatusText()));
                  });
                  ajaxRequest.send();
                }));
            }
          }, _callee3);
        }))();
      },
      /**
       * parse the schema once
       */
      _parseXSD: function _parseXSD() {
        var _this3 = this;
        // make a list of root-level elements
        this.__P_46_4.querySelectorAll('schema > element').forEach(function (element) {
          var name = element.getAttribute('name');
          _this3.__P_46_0[name] = new cv.ui.manager.model.schema.Element(element, _this3);
        });
        this.setLoaded(true);
      },
      getElementNode: function getElementNode(name) {
        if (Object.prototype.hasOwnProperty.call(this.__P_46_0, name)) {
          return this.__P_46_0[name];
        }
        throw new Error('schema/xsd appears to be invalid, element ' + name + ' not allowed on root level');
      },
      /**
       * dive into the schema and find the element that is being pulled in by a ref.
       * Do so recursively.
       * referenced nodes can be top-level-nodes only!
       *
       * @param   type       string  Type of the node (e.g. element, attributeGroup, ...)
       * @param   refName    string  Name as per the ref-attribute
       * @param   noFallback boolean Don't look up other types as fallback, if the requested type is not found
       * @return  object          jQuery-object of the ref'ed element
       */
      getReferencedNode: function getReferencedNode(type, refName, noFallback) {
        if (Object.prototype.hasOwnProperty.call(this.__P_46_1, type) && Object.prototype.hasOwnProperty.call(this.__P_46_1[type], refName)) {
          return this.__P_46_1[type][refName];
        }
        var fallbackType = type === 'simpleType' ? 'complexType' : 'simpleType';
        if (!noFallback) {
          if (Object.prototype.hasOwnProperty.call(this.__P_46_1, fallbackType) && Object.prototype.hasOwnProperty.call(this.__P_46_1[fallbackType], refName)) {
            return this.__P_46_1[fallbackType][refName];
          }
        }
        var selector = 'schema > ' + type + '[name="' + refName + '"]';
        var ref = this.__P_46_4.querySelector(selector);
        if (!ref && !noFallback) {
          try {
            ref = this.getReferencedNode(fallbackType, refName, true);
          } catch (e) {}
        }
        if (!ref) {
          throw new Error('schema/xsd appears to be invalid, reference ' + type + ' "' + refName + '" can not be found');
        }
        if (ref.hasAttribute('ref')) {
          // do it recursively, if necessary
          ref = this.getReferencedNode(type, ref.getAttribute('ref'));
        }
        if (!Object.prototype.hasOwnProperty.call(this.__P_46_1, type)) {
          this.__P_46_1[type] = {};
        }

        // fill the cache
        this.__P_46_1[type][refName] = ref;
        return ref;
      },
      /**
       * get the definition of a type, be it complex or simple
       *
       * @param   type    string  Type of type to find (either simple or complex)
       * @param   name    string  Name of the type to find
       */
      getTypeNode: function getTypeNode(type, name) {
        if (Object.prototype.hasOwnProperty.call(this.__P_46_2, type) && Object.prototype.hasOwnProperty.call(this.__P_46_2[type], name)) {
          return this.__P_46_2[type][name];
        }
        var typeNode = this.__P_46_4.querySelector(type + 'Type[name="' + name + '"]');
        if (!typeNode) {
          throw new Error('schema/xsd appears to be invalid, ' + type + 'Type "' + name + '" can not be found');
        }
        if (typeof this.__P_46_2[type] == 'undefined') {
          this.__P_46_2[type] = {};
        }

        // fill the cache
        this.__P_46_2[type][name] = typeNode;
        return typeNode;
      },
      /**
       * get a SchemaElement for a #text-node
       *
       * @return  object  SchemaElement for #text-node
       */
      getTextNodeSchemaElement: function getTextNodeSchemaElement() {
        if (this.__P_46_5 === null) {
          // text-content is always a simple string
          var tmpXML = this.__P_46_4.createElement('element');
          tmpXML.setAttribute('name', '#text');
          tmpXML.setAttribute('type', 'xsd:string');
          this.__P_46_5 = new cv.ui.manager.model.schema.Element(tmpXML, this);
        }
        return this.__P_46_5;
      },
      /**
       * get a SchemaElement for a #comment-node
       *
       * @return  object  SchemaElement for #comment-node
       */
      getCommentNodeSchemaElement: function getCommentNodeSchemaElement() {
        if (this.__P_46_6 === null) {
          // text-content is always a simple string
          var tmpXML = this.__P_46_4.createElement('element');
          tmpXML.setAttribute('name', '#comment');
          tmpXML.setAttribute('type', 'xsd:string');
          tmpXML.setAttribute('minOccurs', '0');
          tmpXML.setAttribute('maxOccurs', 'unbounded');
          this.__P_46_6 = new cv.ui.manager.model.schema.Element(tmpXML, this);
        }
        return this.__P_46_6;
      },
      /**
       * get the DOM for this Schema
       *
       * @return  object  DOM
       */
      getSchemaDOM: function getSchemaDOM() {
        return this.__P_46_4;
      },
      /**
       * A CometVisu-Schema specific helper function that returns an array of all widget names.
       * @returns {Array<String>}
       */
      getWidgetNames: function getWidgetNames() {
        if (!this._widgetNames) {
          var root = this.getElementNode(this.__P_46_7);
          var pageParent = root;
          if (this.__P_46_8) {
            pageParent = root.getSchemaElementForElementName(this.__P_46_8);
          }
          var page = pageParent.getSchemaElementForElementName(this.__P_46_9);
          this._widgetNames = Object.keys(page.getAllowedElements()).filter(function (name) {
            return !name.startsWith('#') && name !== 'layout';
          });
        }
        return this._widgetNames;
      },
      isRoot: function isRoot(name) {
        return name === this.__P_46_7;
      },
      isPage: function isPage(name) {
        return name = this.__P_46_9;
      }
    },
    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this.__P_46_4 = null;
      this._disposeObjects("__P_46_6", "__P_46_5");
      this._disposeMap("__P_46_0");
      this.__P_46_1 = null;
      this.__P_46_2 = null;
      this._widgetNames = null;
    }
  });
  cv.ui.manager.model.Schema.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Schema.js.map?dt=1782967139342