function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
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
      "cv.ui.manager.editor.data.Provider": {
        "construct": true
      },
      "cv.ui.manager.model.Schema": {},
      "qx.xml.Document": {},
      "qx.locale.Manager": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* Config.js
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
   * XSD-based code completion provider for the monaco text editor.
   *
   * @since 0.11.0
   * @author Tobias Bräutigam
   */
  qx.Class.define('cv.ui.manager.editor.completion.Config', {
    extend: qx.core.Object,
    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    /**
     *
     */
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.__P_37_0 = {};
      this.__P_37_1 = {};
      this._dataProvider = cv.ui.manager.editor.data.Provider.getInstance();
    },
    /*
    ***********************************************
      PROPERTIES
    ***********************************************
    */
    properties: {
      currentPath: {
        check: 'String',
        nullable: true,
        apply: '_applyCurrentPath'
      }
    },
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _schemas: null,
      __P_37_2: null,
      __P_37_0: null,
      __P_37_3: null,
      _dataProvider: null,
      __P_37_4: null,
      __P_37_5: null,
      _getSuggestions: null,
      _applyCurrentPath: function _applyCurrentPath() {
        this.__P_37_2 = null;
        this.__P_37_4 = '';
      },
      setStructure: function setStructure(name) {
        var _this = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
          var loaded, _t;
          return _regenerator().w(function (_context) {
            while (1) switch (_context.n) {
              case 0:
                loaded = Object.prototype.hasOwnProperty.call(_this.__P_37_1, name);
                _t = name;
                _context.n = _t === 'pure' ? 1 : _t === 'tile' ? 4 : 7;
                break;
              case 1:
                if (loaded) {
                  _context.n = 3;
                  break;
                }
                _context.n = 2;
                return cv.ui.manager.model.Schema.getInstance('visu_config.xsd');
              case 2:
                _this.__P_37_1.pure = _context.v;
              case 3:
                _this.__P_37_2 = _this.__P_37_1.pure;
                _this.__P_37_4 = 'pages';
                _this.__P_37_5 = 'meta';
                _this._getSuggestions = _this.providePureCompletionItems;
                return _context.a(3, 7);
              case 4:
                if (loaded) {
                  _context.n = 6;
                  break;
                }
                _context.n = 5;
                return cv.ui.manager.model.Schema.getInstance('visu_config_tile.xsd');
              case 5:
                _this.__P_37_1.tile = _context.v;
              case 6:
                _this.__P_37_2 = _this.__P_37_1.tile;
                _this.__P_37_4 = 'config';
                _this.__P_37_5 = 'cv-meta';
                _this._getSuggestions = _this.provideTileCompletionItems;
                return _context.a(3, 7);
              case 7:
                return _context.a(2);
            }
          }, _callee);
        }))();
      },
      getLastOpenedTag: function getLastOpenedTag(text) {
        // get all tags inside the content
        var tags = text.match(/<\/*(?=\S*)([a-zA-Z-]+)/g);
        if (!tags) {
          return null;
        }
        // we need to know which tags are closed
        var closingTags = [];
        for (var i = tags.length - 1; i >= 0; i--) {
          if (tags[i].indexOf('</') === 0) {
            closingTags.push(tags[i].substring('</'.length));
          } else {
            // get the last position of the tag
            var tagPosition = text.lastIndexOf(tags[i]);
            var tag = tags[i].substring('<'.length);
            var closingBracketIdx = text.indexOf('/>', tagPosition);
            // if the tag wasn't closed
            if (closingBracketIdx === -1) {
              // if there are no closing tags or the current tag wasn't closed
              if (!closingTags.length || closingTags[closingTags.length - 1] !== tag) {
                // we found our tag, but let's get the information if we are looking for
                // a child element or an attribute
                text = text.substring(tagPosition);
                var openedTag = text.indexOf('<') > text.indexOf('>');
                var contentSearch = false;
                var currentAttribute = null;
                if (openedTag) {
                  var attrMatch = /([\w\-_\.\d]+)="[^"]*$/.exec(text);
                  contentSearch = !!attrMatch;
                  currentAttribute = attrMatch ? attrMatch[1] : null;
                }
                var filteredElementSearch = /<[\w-_\d]+$/.test(text);
                var attributesMatch = _toConsumableArray(text.matchAll(/\s([^=]+)="([^"]+)"/g));
                var attributes = {};
                var _iterator = _createForOfIteratorHelper(attributesMatch),
                  _step;
                try {
                  for (_iterator.s(); !(_step = _iterator.n()).done;) {
                    var match = _step.value;
                    attributes[match[1]] = match[2];
                  }
                } catch (err) {
                  _iterator.e(err);
                } finally {
                  _iterator.f();
                }
                return {
                  tagName: tag,
                  currentAttribute: currentAttribute,
                  attributes: attributes,
                  filteredElementSearch: filteredElementSearch,
                  isAttributeSearch: !filteredElementSearch && openedTag && !contentSearch,
                  isContentSearch: contentSearch,
                  text: text
                };
              }
              // remove the last closed tag
              closingTags.splice(closingTags.length - 1, 1);
            }
            // remove the last checked tag and continue processing the rest of the content
            text = text.substring(0, tagPosition);
          }
        }
        return null;
      },
      findElements: function findElements(parent, elementName, maxDepth, currentDepth, inMeta) {
        var cache = inMeta === true ? this.__P_37_3 : this.__P_37_0;
        if (elementName in cache) {
          return cache[elementName];
        }
        if (maxDepth < currentDepth) {
          return null;
        }
        if (!parent) {
          parent = this.__P_37_2.getElementNode(this.__P_37_4);
        }
        if (currentDepth === undefined) {
          currentDepth = 1;
        }
        var allowedElements = parent.getAllowedElements();
        // console.log(parent.name+" looking for "+elementName+" in tree level "+currentDepth+ "(<"+maxDepth+") ("+Object.getOwnPropertyNames(allowedElements).join(", ")+")");
        if (elementName in allowedElements) {
          // console.log("found "+elementName+" in tree level "+currentDepth);
          this.__P_37_0[elementName] = allowedElements[elementName];
          return allowedElements[elementName];
        }
        for (var element in allowedElements) {
          if (inMeta !== true && element === this.__P_37_5) {
            continue;
          }
          if (maxDepth > currentDepth) {
            var result = this.findElements(allowedElements[element], elementName, maxDepth, currentDepth + 1);
            if (result) {
              cache[elementName] = result;
              // console.log("found " + elementName + " in tree level " + currentDepth);
              return result;
            }
          }
        }
        return null;
      },
      isItemAvailable: function isItemAvailable(itemName, maxOccurs, items) {
        // the default for 'maxOccurs' is 1
        maxOccurs = maxOccurs || '1';
        // the element can appere infinite times, so it is available
        if (maxOccurs && maxOccurs === 'unbounded') {
          return true;
        }
        // count how many times the element appeared
        var count = 0;
        for (var i = 0; i < items.length; i++) {
          if (items[i] === itemName) {
            count++;
          }
        }
        // if it didn't appear yet, or it can appear again, then it
        // is available, otherwise it't not
        return count === 0 || parseInt(maxOccurs) > count;
      },
      getElementString: function getElementString(element, indent, prefix) {
        var insertText = indent + prefix + element.getName() + ' ';
        // add all required attributes with default values
        var allowedAttributes = element.getAllowedAttributes();
        Object.getOwnPropertyNames(allowedAttributes).forEach(function (attr) {
          var attribute = allowedAttributes[attr];
          if (!attribute.isOptional) {
            insertText += attr + '="' + (attribute.getDefaultValue() ? attribute.getDefaultValue() : '') + '" ';
          }
        });
        // add mandatory children
        var requiredElements = element.getRequiredElements();
        var allowedContent = element.getAllowedContent();
        var isContentAllowed = allowedContent._text || requiredElements.length > 0 || !!allowedContent._grouping;
        if (!isContentAllowed) {
          // close tag
          insertText = insertText.trim() + '/';
        } else {
          // close open tag
          insertText = insertText.trim() + '>';

          // insert required elements
          var children = 0;
          requiredElements.forEach(function (elemName) {
            var elem = this.findElements(element, elemName, 1, 0);
            if (elem) {
              insertText += '\n    ' + this.getElementString(elem, indent + '    ', '<') + '>';
              children++;
            }
          }, this);
          // add closing tag
          if (children > 0) {
            insertText += '\n' + indent;
          }
          insertText += '</' + element.getName();
        }
        return insertText;
      },
      getAvailableElements: function getAvailableElements(element, usedItems) {
        var availableItems = [];
        var children = element.getAllowedElements();

        // if there are no such elements, then there are no suggestions
        if (!children) {
          return [];
        }
        Object.getOwnPropertyNames(children).filter(function (name) {
          return !name.startsWith('#');
        }).forEach(function (name) {
          // get all element attributes
          var childElem = children[name];
          // the element is a suggestion if it's available
          if (this.isItemAvailable(childElem.getName(), childElem.getBounds().max, usedItems)) {
            // mark it as a 'field', and get the documentation
            availableItems.push({
              label: childElem.getName(),
              insertText: this.getElementString(childElem, '', ''),
              kind: window.monaco.languages.CompletionItemKind.Field,
              detail: childElem.getType(),
              documentation: childElem.getDocumentation().join('\n')
            });
          }
        }, this);
        // return the suggestions we found
        return availableItems;
      },
      getAvailableAttributes: function getAvailableAttributes(element, usedChildTags) {
        var availableItems = [];
        // get all attributes for the element
        var attrs = element.getAllowedAttributes();
        Object.getOwnPropertyNames(attrs).forEach(function (name) {
          var attr = attrs[name];
          // accept it in a suggestion list only the attribute is not used yet
          if (usedChildTags.indexOf(attr.name) === -1) {
            // mark it as a 'property', and get it's documentation
            availableItems.push({
              label: attr.getName(),
              insertText: attr.getName() + '=""',
              kind: window.monaco.languages.CompletionItemKind.Property,
              detail: attr.getTypeString(),
              documentation: attr.getDocumentation().join('\n')
            });
          }
        }, this);

        // return the elements we found
        return availableItems;
      },
      detectSchema: function detectSchema(completeText) {
        var _this2 = this;
        return _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2() {
          var match;
          return _regenerator().w(function (_context2) {
            while (1) switch (_context2.n) {
              case 0:
                match = /:noNamespaceSchemaLocation="([^"]+)"/.exec(completeText.substring(0, 200));
                if (!(match && match[1].endsWith('visu_config_tile.xsd'))) {
                  _context2.n = 2;
                  break;
                }
                _context2.n = 1;
                return _this2.setStructure('tile');
              case 1:
                _context2.n = 3;
                break;
              case 2:
                _context2.n = 3;
                return _this2.setStructure('pure');
              case 3:
                return _context2.a(2);
            }
          }, _callee2);
        }))();
      },
      getProvider: function getProvider() {
        return {
          triggerCharacters: ['<', '"'],
          provideCompletionItems: (/*#__PURE__*/function () {
            var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(model, position) {
              var completeText;
              return _regenerator().w(function (_context3) {
                while (1) switch (_context3.n) {
                  case 0:
                    this.setCurrentPath(model.uri.toString());
                    completeText = model.getValue();
                    if (this.__P_37_2) {
                      _context3.n = 1;
                      break;
                    }
                    _context3.n = 1;
                    return this.detectSchema(completeText);
                  case 1:
                    if (!this._getSuggestions) {
                      _context3.n = 2;
                      break;
                    }
                    return _context3.a(2, this._getSuggestions(model, position));
                  case 2:
                    return _context3.a(2, {
                      suggestions: []
                    });
                }
              }, _callee3, this);
            }));
            return function (_x, _x2) {
              return _ref.apply(this, arguments);
            };
          }()).bind(this)
        };
      },
      providePureCompletionItems: function providePureCompletionItems(model, position) {
        // get editor content before the pointer
        var textUntilPosition = model.getValueInRange({
          startLineNumber: 1,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column
        });

        // parse mappings
        var completeText = model.getValue();
        var metaEndPos = completeText.indexOf('</meta>');
        var textMeta = metaEndPos > 0 ? completeText.substring(0, metaEndPos) : completeText;
        var mappingNames = [];
        var stylingNames = [];
        var templates = {};
        var map;
        var vmap;
        var regex = /<mapping name="([^"]+)"/gm;
        while ((map = regex.exec(textMeta)) !== null) {
          mappingNames.push(map[1]);
        }
        regex = /<styling name="([^"]+)"/gm;
        while ((map = regex.exec(textMeta)) !== null) {
          stylingNames.push(map[1]);
        }
        var templatesStart = textMeta.indexOf('<templates>');
        if (templatesStart >= 0) {
          var templatesString = textMeta.substring(templatesStart + 11, textMeta.indexOf('</templates>') - 12).replace(/(?:\r\n|\r|\n)/g, '');
          templatesString.split('</template>').forEach(function (rawTemplate) {
            var nameMatch = /<template name="([^"]+)"/.exec(rawTemplate);
            if (nameMatch) {
              // search for variables
              var variables = [];
              var vregex = /{{{?\s*([\w\d]+)\s*}?}}/gm;
              while ((vmap = vregex.exec(rawTemplate)) !== null) {
                variables.push(vmap[1]);
              }
              templates[nameMatch[1]] = variables;
            }
          }, this);
        }

        // if we want suggestions, inside of which tag are we?
        var lastOpenedTag = this.getLastOpenedTag(textUntilPosition);
        // console.log(lastOpenedTag);
        // get opened tags to see what tag we should look for in the XSD schema
        var openedTags = [];
        // attrobutes of the ancestors
        var openedAttributes = [];
        // get the elements/attributes that are already mentioned in the element we're in
        var usedItems = [];
        var isAttributeSearch = lastOpenedTag && lastOpenedTag.isAttributeSearch;
        var isContentSearch = lastOpenedTag && lastOpenedTag.isContentSearch;
        var filteredElementSearch = lastOpenedTag && lastOpenedTag.filteredElementSearch;
        // no need to calculate the position in the XSD schema if we are in the root element
        var parts;
        if (lastOpenedTag) {
          // try to create a valid XML document
          parts = lastOpenedTag.text.split(' ');
          parts.shift();
          var cleanedText = textUntilPosition;
          if (parts.length) {
            cleanedText = cleanedText.substring(0, cleanedText.length - parts.join(' ').length) + '>';
          }
          // parse the content (not cleared text) into an xml document
          var xmlDoc = qx.xml.Document.fromString(cleanedText);
          var lastChild = xmlDoc.lastElementChild;
          var i;
          var lastFound = false;
          while (lastChild && lastChild.tagName.toLowerCase() !== 'parsererror') {
            openedTags.push(lastChild.tagName);
            openedAttributes.push(lastChild.attributes);
            // if we found our last opened tag
            if (lastChild.tagName === lastOpenedTag.tagName) {
              lastFound = true;
              // if we are looking for attributes, then used items should
              // be the attributes we already used
              if (lastOpenedTag.isAttributeSearch && lastChild.outerHTML === lastOpenedTag.text) {
                var attrs = lastChild.attributes;
                for (i = 0; i < attrs.length; i++) {
                  usedItems.push(attrs[i].nodeName);
                }
              } else {
                // if we are looking for child elements, then used items
                // should be the elements that were already used
                var children = lastChild.children;
                for (i = 0; i < children.length; i++) {
                  if (children[i].tagName.toLowerCase() !== 'parsererror') {
                    usedItems.push(children[i].tagName);
                  }
                }
              }
              break;
            }
            // we haven't found the last opened tag yet, so we move to
            // the next element
            lastChild = lastChild.lastElementChild;
          }
          if (!lastFound) {
            // fallback -> parse string
            if (isAttributeSearch || isContentSearch) {
              parts = lastOpenedTag.text.split(' ');
              // skip tag name
              parts.shift();
              parts.forEach(function (entry) {
                usedItems.push(entry.split('=').shift());
              });
            }
          }
        }
        var res = [];
        var match;
        // find the last opened tag in the schema to see what elements/attributes it can have
        var searchedElement = openedTags[openedTags.length - 1];
        if (isContentSearch) {
          // handle data providers if the is one relevant
          if (lastOpenedTag.tagName === 'pages' && lastOpenedTag.currentAttribute === 'design') {
            return this._dataProvider.getDesigns(null, null, 'pure').then(function (sugg) {
              return {
                suggestions: sugg
              };
            });
          } else if (lastOpenedTag.tagName === 'address' && lastOpenedTag.currentAttribute === 'transform') {
            return {
              suggestions: this._dataProvider.getTransforms()
            };
          } else if (lastOpenedTag.tagName === 'plugin' && lastOpenedTag.currentAttribute === 'name') {
            return {
              suggestions: this._dataProvider.getPlugins()
            };
          } else if (lastOpenedTag.tagName === 'icon' && lastOpenedTag.currentAttribute === 'name') {
            return {
              suggestions: this._dataProvider.getIcons('monaco', {
                cache: false
              }, completeText)
            };
          } else if (lastOpenedTag.tagName === 'influx') {
            if (lastOpenedTag.currentAttribute === 'measurement') {
              return this._dataProvider.getInfluxDBs().then(function (suggestions) {
                return {
                  suggestions: suggestions
                };
              });
            } else if (lastOpenedTag.currentAttribute === 'field') {
              match = /measurement="([^"]+)"/.exec(lastOpenedTag.text);
              if (match) {
                return this._dataProvider.getInfluxDBFields(match[1]).then(function (suggestions) {
                  return {
                    suggestions: suggestions
                  };
                });
              }
            }
          } else if (lastOpenedTag.tagName === 'tag' && (lastOpenedTag.currentAttribute === 'key' || lastOpenedTag.currentAttribute === 'value') && openedTags.includes('influx')) {
            var influxAttributes = openedAttributes[openedTags.indexOf('influx')];
            var attr = influxAttributes.getNamedItem('measurement');
            if (attr) {
              if (lastOpenedTag.currentAttribute === 'key') {
                return this._dataProvider.getInfluxDBTags(attr.value).then(function (suggestions) {
                  return {
                    suggestions: suggestions
                  };
                });
              } else if (lastOpenedTag.currentAttribute === 'value') {
                match = /key="([^"]+)"/.exec(lastOpenedTag.text);
                if (match) {
                  return this._dataProvider.getInfluxDBValues(attr.value, match[1]).then(function (suggestions) {
                    return {
                      suggestions: suggestions
                    };
                  });
                }
              }
            }
          } else if (lastOpenedTag.tagName === 'template' && lastOpenedTag.currentAttribute === 'name' && openedTags.includes('meta')) {
            res = Object.keys(templates).map(function (name) {
              return {
                label: name,
                insertText: name,
                kind: window.monaco.languages.CompletionItemKind.EnumMember
              };
            }, this);
            return {
              suggestions: res
            };
          } else if (lastOpenedTag.tagName === 'value' && lastOpenedTag.currentAttribute === 'name' && !openedTags.includes('meta') && openedTags.includes('template')) {
            // TODO: find out template name
            var templateNames = Object.keys(templates);
            templateNames.forEach(function (name) {
              templates[name].forEach(function (variableName) {
                res.push({
                  label: variableName,
                  insertText: variableName,
                  detail: qx.locale.Manager.tr('Variable from template %1', name),
                  kind: window.monaco.languages.CompletionItemKind.Variable
                });
              }, this);
            }, this);
            return {
              suggestions: res
            };
          } else if (lastOpenedTag.currentAttribute === 'mapping') {
            res = mappingNames.map(function (mappingName) {
              return {
                label: mappingName,
                insertText: mappingName,
                kind: window.monaco.languages.CompletionItemKind.EnumMember
              };
            }, this);
            return {
              suggestions: res
            };
          } else if (lastOpenedTag.currentAttribute === 'styling') {
            res = stylingNames.map(function (stylingName) {
              return {
                label: stylingName,
                insertText: stylingName,
                kind: window.monaco.languages.CompletionItemKind.EnumMember
              };
            }, this);
            return {
              suggestions: res
            };
          }

          // TODO: completions that have to be retrieved from the backend
          // * rrds
          // * Influx: dbs, tags fields
          // * media files

          searchedElement = lastOpenedTag.tagName;
        } else if (!isAttributeSearch && filteredElementSearch) {
          searchedElement = openedTags[openedTags.length - 2];
        } else if (lastOpenedTag.tagName === 'address' && lastOpenedTag.currentAttribute === null) {
          var backendName = lastOpenedTag.attributes['backend'] || 'main';
          return this._dataProvider.getAddresses('monaco', null, backendName).then(function (res) {
            return {
              suggestions: res
            };
          });
        }
        if (searchedElement === 'rrd') {
          return this._dataProvider.getRrds('monaco').then(function (res) {
            return {
              suggestions: res
            };
          });
        } else if (searchedElement === 'file' && !isAttributeSearch && !isContentSearch && openedTags.includes('files')) {
          match = /type="([^"]+)"/.exec(lastOpenedTag.text);
          var typeFilter = match ? match[1] : null;
          return this._dataProvider.getMediaFiles(typeFilter).then(function (suggestions) {
            return {
              suggestions: suggestions
            };
          });
        }
        var currentItem = this.findElements(this.__P_37_2.getElementNode('pages'), searchedElement, openedTags.length, openedTags.includes('meta'));

        // return available elements/attributes if the tag exists in the schema, or an empty
        // array if it doesn't
        if (isContentSearch) {
          var currentAttribute = usedItems[usedItems.length - 1];
          if (currentItem && currentAttribute in currentItem.getAllowedAttributes()) {
            var attribute = currentItem.getAllowedAttributes()[currentAttribute];
            var type = attribute.getTypeString();
            attribute.getEnumeration().forEach(function (entry) {
              res.push({
                label: entry,
                insertText: entry,
                kind: window.monaco.languages.CompletionItemKind.Value,
                detail: type,
                documentation: attribute.getDocumentation().join('\n')
              });
            });
          }
        } else if (isAttributeSearch) {
          // get attributes completions
          res = currentItem ? this.getAvailableAttributes(currentItem, usedItems) : [];
        } else {
          // get elements completions
          // eslint-disable-next-line no-lonely-if
          if (lastOpenedTag && lastOpenedTag.text.endsWith('</')) {
            res.push({
              label: lastOpenedTag.tagName,
              insertText: lastOpenedTag.tagName,
              kind: window.monaco.languages.CompletionItemKind.Field
            });
          } else {
            res = currentItem ? this.getAvailableElements(currentItem, usedItems) : [];
          }
        }
        return {
          suggestions: res
        };
      },
      provideTileCompletionItems: function provideTileCompletionItems(model, position) {
        // get editor content before the pointer
        var textUntilPosition = model.getValueInRange({
          startLineNumber: 1,
          startColumn: 1,
          endLineNumber: position.lineNumber,
          endColumn: position.column
        });

        // parse mappings
        var completeText = model.getValue();
        var metaEndPos = completeText.indexOf('</cv-meta>');
        var textMeta = metaEndPos > 0 ? completeText.substring(0, metaEndPos) : completeText;
        var mappingNames = [];
        var stylingNames = [];
        var map;
        var regex = /<cv-mapping name="([^"]+)"/gm;
        while ((map = regex.exec(textMeta)) !== null) {
          mappingNames.push(map[1]);
        }
        regex = /<cv-styling name="([^"]+)"/gm;
        while ((map = regex.exec(textMeta)) !== null) {
          stylingNames.push(map[1]);
        }

        // if we want suggestions, inside which tag are we?
        var lastOpenedTag = this.getLastOpenedTag(textUntilPosition);
        // console.log(lastOpenedTag);
        // get opened tags to see what tag we should look for in the XSD schema
        var openedTags = [];
        // attributes of the ancestors
        var openedAttributes = [];
        // get the elements/attributes that are already mentioned in the element we're in
        var usedItems = [];
        var isAttributeSearch = lastOpenedTag && lastOpenedTag.isAttributeSearch;
        var isContentSearch = lastOpenedTag && lastOpenedTag.isContentSearch;
        var filteredElementSearch = lastOpenedTag && lastOpenedTag.filteredElementSearch;
        // no need to calculate the position in the XSD schema if we are in the root element
        var parts;
        if (lastOpenedTag) {
          // try to create a valid XML document
          parts = lastOpenedTag.text.split(' ');
          parts.shift();
          var cleanedText = textUntilPosition;
          if (parts.length) {
            cleanedText = cleanedText.substring(0, cleanedText.length - parts.join(' ').length) + '>';
          }
          // parse the content (not cleared text) into a xml document
          var xmlDoc = qx.xml.Document.fromString(cleanedText);
          var lastChild = xmlDoc.lastElementChild;
          var i;
          var lastFound = false;
          while (lastChild) {
            openedTags.push(lastChild.tagName);
            openedAttributes.push(lastChild.attributes);
            // if we found our last opened tag
            if (lastChild.tagName === lastOpenedTag.tagName) {
              lastFound = true;
              // if we are looking for attributes, then used items should
              // be the attributes we already used
              if (lastOpenedTag.isAttributeSearch && lastChild.outerHTML === lastOpenedTag.text) {
                var attrs = lastChild.attributes;
                for (i = 0; i < attrs.length; i++) {
                  usedItems.push(attrs[i].nodeName);
                }
              } else {
                // if we are looking for child elements, then used items
                // should be the elements that were already used
                var children = lastChild.children;
                for (i = 0; i < children.length; i++) {
                  if (children[i].tagName.toLowerCase() !== 'parsererror') {
                    usedItems.push(children[i].tagName);
                  }
                }
              }
              break;
            }
            // we haven't found the last opened tag yet, so we move to
            // the next element
            lastChild = lastChild.lastElementChild;
          }
          if (!lastFound) {
            // fallback -> parse string
            if (isAttributeSearch || isContentSearch) {
              parts = lastOpenedTag.text.split(' ');
              // skip tag name
              parts.shift();
              parts.forEach(function (entry) {
                usedItems.push(entry.split('=').shift());
              });
            }
          }
        }
        var res = [];
        var match;
        // find the last opened tag in the schema to see what elements/attributes it can have
        var searchedElement = openedTags[openedTags.length - 1];
        if (isContentSearch) {
          // handle data providers if the is one relevant
          if (lastOpenedTag.tagName === 'config' && lastOpenedTag.currentAttribute === 'design') {
            var suggestions = this._dataProvider.getDesigns(null, null, 'tile');
            return {
              suggestions: suggestions
            };
          } else if (lastOpenedTag.tagName === 'cv-address' && lastOpenedTag.currentAttribute === 'transform') {
            return {
              suggestions: this._dataProvider.getTransforms()
            };
          } else if (lastOpenedTag.tagName === 'cv-icon' && lastOpenedTag.currentAttribute === 'name') {
            return {
              suggestions: this._dataProvider.getIcons()
            };
          } else if (lastOpenedTag.currentAttribute === 'mapping') {
            res = mappingNames.map(function (mappingName) {
              return {
                label: mappingName,
                insertText: mappingName,
                kind: window.monaco.languages.CompletionItemKind.EnumMember
              };
            }, this);
            return {
              suggestions: res
            };
          } else if (lastOpenedTag.currentAttribute === 'styling') {
            res = stylingNames.map(function (stylingName) {
              return {
                label: stylingName,
                insertText: stylingName,
                kind: window.monaco.languages.CompletionItemKind.EnumMember
              };
            }, this);
            return {
              suggestions: res
            };
          }
          searchedElement = lastOpenedTag.tagName;
        } else if (!isAttributeSearch && filteredElementSearch) {
          searchedElement = openedTags[openedTags.length - 2];
        } else if (lastOpenedTag.tagName === 'cv-address' && lastOpenedTag.currentAttribute === null) {
          var backendName = lastOpenedTag.attributes['backend'] || 'main';
          return this._dataProvider.getAddresses('monaco', null, backendName).then(function (res) {
            return {
              suggestions: res
            };
          });
        } else if (lastOpenedTag.tagName === 'cv-chart' && lastOpenedTag.currentAttribute === 'src') {
          return this._dataProvider.getRrds('monaco').then(function (res) {
            return {
              suggestions: res
            };
          });
        } else if (lastOpenedTag.tagName === 'cv-loader' && lastOpenedTag.currentAttribute === 'src') {
          match = /type="([^"]+)"/.exec(lastOpenedTag.text);
          var typeFilter = match ? match[1] : null;
          return this._dataProvider.getMediaFiles(typeFilter).then(function (suggestions) {
            return {
              suggestions: suggestions
            };
          });
        }
        var currentItem = this.findElements(this.__P_37_2.getElementNode('config'), searchedElement, openedTags.length, openedTags.includes('cv-meta'));

        // return available elements/attributes if the tag exists in the schema, or an empty
        // array if it doesn't
        if (isContentSearch) {
          var currentAttribute = lastOpenedTag.currentAttribute;
          if (currentItem && currentAttribute in currentItem.getAllowedAttributes()) {
            var attribute = currentItem.getAllowedAttributes()[currentAttribute];
            var type = attribute.getTypeString();
            attribute.getEnumeration().forEach(function (entry) {
              res.push({
                label: entry,
                insertText: entry,
                kind: window.monaco.languages.CompletionItemKind.Value,
                detail: type,
                documentation: attribute.getDocumentation().join('\n')
              });
            });
          }
        } else if (isAttributeSearch) {
          // get attributes completions
          res = currentItem ? this.getAvailableAttributes(currentItem, usedItems) : [];
        } else {
          // get elements completions
          // eslint-disable-next-line no-lonely-if
          if (lastOpenedTag && lastOpenedTag.text.endsWith('</')) {
            res.push({
              label: lastOpenedTag.tagName,
              insertText: lastOpenedTag.tagName,
              kind: window.monaco.languages.CompletionItemKind.Field
            });
          } else {
            res = currentItem ? this.getAvailableElements(currentItem, usedItems) : [];
          }
        }
        return {
          suggestions: res
        };
      }
    },
    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this.__P_37_0 = null;
      this._schema = null;
      this._dataProvider = null;
    }
  });
  cv.ui.manager.editor.completion.Config.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Config.js.map?dt=1782705767784