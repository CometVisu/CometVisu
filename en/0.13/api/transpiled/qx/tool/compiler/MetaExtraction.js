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
      "qx.tool.utils.Json": {},
      "qx.tool.utils.Utils": {},
      "qx.tool.utils.files.Utils": {},
      "qx.tool.utils.BabelHelpers": {},
      "qx.tool.compiler.Console": {},
      "qx.tool.compiler.jsdoc.Parser": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  var fs = require("fs");
  var path = require("upath");
  qx.Class.define("qx.tool.compiler.MetaExtraction", {
    extend: qx.core.Object,
    construct: function construct(metaRootDir) {
      qx.core.Object.constructor.call(this);
      this.setMetaRootDir(metaRootDir || null);
    },
    properties: {
      /** Root directory for meta data; if provided then paths are stored relative, not absolute, which helps make
       * meta directories relocatable
       */
      metaRootDir: {
        init: null,
        nullable: true,
        check: "String"
      }
    },
    statics: {
      /** Meta Data Version - stored in meta data files */
      VERSION: 0.3
    },
    members: {
      /** @type{Object} the parsed data*/
      __P_493_0: null,
      /**
       * Loads the meta from disk
       *
       * @param {String} filename
       */
      loadMeta: function loadMeta(filename) {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var metaData;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                _context.n = 1;
                return qx.tool.utils.Json.loadJsonAsync(filename);
              case 1:
                metaData = _context.v;
                if ((metaData === null || metaData === void 0 ? void 0 : metaData.version) === qx.tool.compiler.MetaExtraction.VERSION) {
                  _this.__P_493_0 = metaData;
                } else {
                  _this.__P_493_0 = null;
                }
              case 2:
                return _context.a(2);
            }
          }, _callee);
        }))();
      },
      /**
       * Saves the meta to disk
       *
       * @param {String} filename
       */
      saveMeta: function saveMeta(filename) {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                _context2.n = 1;
                return qx.tool.utils.Utils.makeParentDir(filename);
              case 1:
                _context2.n = 2;
                return qx.tool.utils.Json.saveJsonAsync(filename, _this2.__P_493_0);
              case 2:
                return _context2.a(2);
            }
          }, _callee2);
        }))();
      },
      /**
       * Returns the actual meta data
       *
       * @returns {*}
       */
      getMetaData: function getMetaData() {
        return this.__P_493_0;
      },
      /**
       * Checks whether the meta data is out of date compared to the last modified
       * timestamp of the classname
       *
       * @returns {Boolean}
       */
      isOutOfDate: function isOutOfDate() {
        var _this3 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3() {
          var _this3$__P_493_;
          var classFilename, stat, lastModified;
          return _regenerator().w(function (_context3) {
            while (1) switch (_context3.n) {
              case 0:
                classFilename = _this3.__P_493_0.classFilename;
                if (_this3.getMetaRootDir()) {
                  classFilename = path.join(_this3.getMetaRootDir(), classFilename);
                }
                _context3.n = 1;
                return fs.promises.stat(classFilename);
              case 1:
                stat = _context3.v;
                lastModified = (_this3$__P_493_ = _this3.__P_493_0) === null || _this3$__P_493_ === void 0 ? void 0 : _this3$__P_493_.lastModified;
                if (!(lastModified && lastModified == stat.mtime.getTime())) {
                  _context3.n = 2;
                  break;
                }
                return _context3.a(2, false);
              case 2:
                return _context3.a(2, true);
            }
          }, _callee3);
        }))();
      },
      /**
       * Parses the file and returns the metadata
       *
       * @param {String} classFilename the .js file to parse
       * @return {Object}
       */
      parse: function parse(classFilename) {
        var _this4 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4() {
          var stat, babelCore, src, plugins, config, result;
          return _regenerator().w(function (_context4) {
            while (1) switch (_context4.n) {
              case 0:
                _context4.n = 1;
                return qx.tool.utils.files.Utils.correctCase(classFilename);
              case 1:
                classFilename = _context4.v;
                _context4.n = 2;
                return fs.promises.stat(classFilename);
              case 2:
                stat = _context4.v;
                _this4.__P_493_0 = {
                  version: qx.tool.compiler.MetaExtraction.VERSION,
                  lastModified: stat.mtime.getTime(),
                  lastModifiedIso: stat.mtime.toISOString()
                };
                if (_this4.getMetaRootDir()) {
                  _this4.__P_493_0.classFilename = path.relative(_this4.getMetaRootDir(), classFilename);
                } else {
                  _this4.__P_493_0.classFilename = path.resolve(classFilename);
                }
                babelCore = require("@babel/core");
                _context4.n = 3;
                return fs.promises.readFile(classFilename, "utf8");
              case 3:
                src = _context4.v;
                plugins = [require("@babel/plugin-syntax-jsx"), _this4.__P_493_1()];
                config = {
                  ast: true,
                  babelrc: false,
                  sourceFileName: classFilename,
                  filename: classFilename,
                  sourceMaps: false,
                  presets: [[{
                    plugins: plugins
                  }]],
                  parserOpts: {
                    allowSuperOutsideMethod: true,
                    sourceType: "script"
                  },
                  generatorOpts: {
                    retainLines: true,
                    compact: false
                  },
                  passPerPreset: true
                };
                result = babelCore.transform(src, config);
                return _context4.a(2, _this4.__P_493_0);
            }
          }, _callee4);
        }))();
      },
      /**
       * The Babel plugin
       *
       * @returns {Object}
       */
      __P_493_1: function __P_493_1() {
        var metaData = this.__P_493_0;
        var t = this;
        return {
          visitor: {
            Program: function Program(path) {
              path.skip();
              var found = false;
              path.get("body").forEach(function (path) {
                var node = path.node;
                if (node.type == "ExpressionStatement" && node.expression.type == "CallExpression") {
                  var str = qx.tool.utils.BabelHelpers.collapseMemberExpression(node.expression.callee);
                  var m = str.match(/^qx\.([a-z]+)\.define$/i);
                  var definingType = m && m[1];
                  if (definingType) {
                    if (found) {
                      qx.tool.compiler.Console.warn("Ignoring class '".concat(node.expression.arguments[0].value, "' in file '").concat(metaData.classFilename, "' because a class, mixin, or interface was already found in this file."));
                      return;
                    }
                    found = true;
                    metaData.type = definingType.toLowerCase();
                    metaData.location = {
                      start: node.loc.start,
                      end: node.loc.end
                    };
                    metaData.className = node.expression.arguments[0].value;
                    if (typeof metaData.className != "string") {
                      metaData.className = null;
                    }
                    metaData.jsdoc = qx.tool.utils.BabelHelpers.getJsDoc(node.leadingComments);
                    t.__P_493_2(path.get("expression.arguments")[1]);
                  }
                }
              });
            }
          }
        };
      },
      /**
       * Scans the class definition
       *
       * @param {NodePath} path
       */
      __P_493_2: function __P_493_2(path) {
        var _this5 = this;
        var metaData = this.__P_493_0;
        var getFunctionParams = function getFunctionParams(node) {
          if (node.type == "ObjectMethod") {
            return node.params;
          }
          if (node.value.type == "FunctionExpression") {
            return node.value.params;
          }
          throw new Error("Don't know how to get parameters from " + node.type);
        };
        var collapseParamMeta = function collapseParamMeta(node, meta) {
          getFunctionParams(node).forEach(function (param, i) {
            var name = qx.tool.utils.BabelHelpers.collapseParam(param, i);
            meta.params.push({
              name: name
            });
          });
        };
        path.skip();
        var ctorAnnotations = {};
        path.get("properties").forEach(function (path) {
          var property = path.node;
          var propertyName;
          if (property.key.type === "Identifier") {
            propertyName = property.key.name;
          } else if (property.key.type === "StringLiteral") {
            propertyName = property.key.value;
          }

          // Extend
          if (propertyName == "extend") {
            metaData.superClass = qx.tool.utils.BabelHelpers.collapseMemberExpression(property.value);
          }

          // Class Annotations
          else if (propertyName == "@") {
            metaData.annotation = path.get("value").toString();
          }

          // Core
          else if (propertyName == "implement" || propertyName == "include") {
            var name = propertyName == "include" ? "mixins" : "interfaces";
            metaData[name] = [];
            // eg: `include: [qx.my.first.MMixin, qx.my.next.MMixin, ..., qx.my.last.MMixin]`
            if (property.value.type == "ArrayExpression") {
              property.value.elements.forEach(function (element) {
                metaData[name].push(qx.tool.utils.BabelHelpers.collapseMemberExpression(element));
              });
            }
            // eg: `include: qx.my.MMixin`
            else if (property.value.type == "MemberExpression") {
              metaData[name].push(qx.tool.utils.BabelHelpers.collapseMemberExpression(property.value));
            }
            // eg, `include: qx.core.Environment.filter({...})`
            else if (property.value.type === "CallExpression") {
              var calleeLiteral = "";
              var current = property.value.callee;
              while (current) {
                var suffix = calleeLiteral ? ".".concat(calleeLiteral) : "";
                if (current.type === "MemberExpression") {
                  calleeLiteral = current.property.name + suffix;
                  current = current.object;
                  continue;
                } else if (current.type === "Identifier") {
                  calleeLiteral = current.name + suffix;
                  break;
                }
                throw new Error("".concat(metaData.className, ": error parsing mixin types: cannot resolve ").concat(property.value.callee.type, " in CallExpression"));
              }
              if (calleeLiteral === "qx.core.Environment.filter") {
                var _property$value$argum;
                var properties = (_property$value$argum = property.value.arguments[0]) === null || _property$value$argum === void 0 ? void 0 : _property$value$argum.properties;
                properties === null || properties === void 0 || properties.forEach(function (prop) {
                  return metaData[name].push(qx.tool.utils.BabelHelpers.collapseMemberExpression(prop.value));
                });
              } else {
                _this5.warn("".concat(metaData.className, ": could not determine mixin types from call `").concat(calleeLiteral, "`. Type support for this class may be limited."));
              }
            }
          }

          // Type
          else if (propertyName == "type") {
            metaData.isSingleton = property.value.value == "singleton";
            metaData["abstract"] = property.value.value == "abstract";
          }

          // Constructor & Destructor Annotations
          else if (propertyName == "@construct" || propertyName == "@destruct") {
            ctorAnnotations[propertyName] = path.get("value").toString();
          }

          // Constructor & Destructor Methods
          else if (propertyName == "construct" || propertyName == "destruct") {
            var memberMeta = metaData[propertyName] = {
              type: "function",
              params: [],
              location: {
                start: path.node.loc.start,
                end: path.node.loc.end
              }
            };
            collapseParamMeta(property, memberMeta);
          }

          // Events
          else if (propertyName == "events") {
            metaData.events = {};
            property.value.properties.forEach(function (event) {
              var name = event.key.name;
              metaData.events[name] = {
                type: null,
                jsdoc: qx.tool.utils.BabelHelpers.getJsDoc(event.leadingComments)
              };
              if (event.value.type == "StringLiteral") {
                metaData.events[name].type = event.value.value;
                metaData.events[name].location = {
                  start: event.loc.start,
                  end: event.loc.end
                };
              }
            });
          }

          // Properties
          else if (propertyName == "properties") {
            _this5.__P_493_3(path.get("value.properties"));
          }

          // Members & Statics
          else if (propertyName == "members" || propertyName == "statics") {
            var type = propertyName;
            var annotations = {};
            metaData[type] = {};
            path.get("value.properties").forEach(function (memberPath) {
              var member = memberPath.node;
              var name = qx.tool.utils.BabelHelpers.collapseMemberExpression(member.key);
              if (name[0] == "@") {
                annotations[name] = memberPath.get("value").toString();
                return;
              }
              var memberMeta = metaData[type][name] = {
                jsdoc: qx.tool.utils.BabelHelpers.getJsDoc(member.leadingComments)
              };
              memberMeta.access = name.startsWith("__") ? "private" : name.startsWith("_") ? "protected" : "public";
              memberMeta.location = {
                start: member.loc.start,
                end: member.loc.end
              };
              if (member.type === "ObjectMethod" || member.type === "ObjectProperty" && member.value.type === "FunctionExpression") {
                memberMeta.type = "function";
                memberMeta.params = [];
                collapseParamMeta(member, memberMeta);
              }
            });
            for (var metaName in annotations) {
              var bareName = metaName.substring(1);
              var _memberMeta = metaData[type][bareName];
              if (_memberMeta) {
                _memberMeta.annotation = annotations[metaName];
              }
            }
          }
        });
        if (ctorAnnotations["@construct"] && metaData.construct) {
          metaData.construct.annotation = ctorAnnotations["@construct"];
        }
        if (ctorAnnotations["@destruct"] && metaData.destruct) {
          metaData.destruct.annotation = ctorAnnotations["@destruct"];
        }
      },
      /**
       * Scans the properties in the class definition
       *
       * @param {NodePath[]} paths
       */
      __P_493_3: function __P_493_3(paths) {
        var metaData = this.__P_493_0;
        if (!metaData.properties) {
          metaData.properties = {};
        }
        paths.forEach(function (path) {
          path.skip();
          var property = path.node;
          var name = qx.tool.utils.BabelHelpers.collapseMemberExpression(property.key);
          metaData.properties[name] = {
            location: {
              start: path.node.loc.start,
              end: path.node.loc.end
            },
            json: qx.tool.utils.BabelHelpers.collectJson(property.value, true),
            jsdoc: qx.tool.utils.BabelHelpers.getJsDoc(property.leadingComments)
          };
        });
      },
      fixupJsDoc: function fixupJsDoc(typeResolver) {
        var metaData = this.__P_493_0;
        var fixupEntry = function fixupEntry(obj) {
          if (obj && obj.jsdoc) {
            var _obj$jsdoc$Return;
            qx.tool.compiler.jsdoc.Parser.parseJsDoc(obj.jsdoc, typeResolver);
            if (obj.jsdoc["@param"] && obj.params) {
              var paramsLookup = {};
              obj.params.forEach(function (param) {
                paramsLookup[param.name] = param;
              });
              obj.jsdoc["@param"].forEach(function (paramDoc) {
                var param = paramsLookup[paramDoc.paramName];
                if (param) {
                  if (paramDoc.type) {
                    param.type = paramDoc.type;
                  }
                  if (paramDoc.optional !== undefined) {
                    param.optional = paramDoc.optional;
                  }
                  if (paramDoc.defaultValue !== undefined) {
                    param.defaultValue = paramDoc.defaultValue;
                  }
                }
              });
            }
            var returnDoc = (_obj$jsdoc$Return = obj.jsdoc["@return"]) === null || _obj$jsdoc$Return === void 0 ? void 0 : _obj$jsdoc$Return[0];
            if (returnDoc) {
              obj.returnType = {
                type: returnDoc.type
              };
              if (returnDoc.optional !== undefined) {
                obj.returnType.optional = returnDoc.optional;
              }
              if (returnDoc.defaultValue !== undefined) {
                obj.returnType.defaultValue = returnDoc.defaultValue;
              }
            }
          }
        };
        var fixupSection = function fixupSection(sectionName) {
          var section = metaData[sectionName];
          if (section) {
            for (var name in section) {
              fixupEntry(section[name]);
            }
          }
        };
        fixupSection("properties");
        fixupSection("events");
        fixupSection("members");
        fixupSection("statics");
        fixupEntry(metaData.clazz);
        fixupEntry(metaData.construct);
        fixupEntry(metaData.destruct);
        fixupEntry(metaData.defer);
      }
    }
  });
  qx.tool.compiler.MetaExtraction.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MetaExtraction.js.map?dt=1778272843200