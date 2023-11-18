function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
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
   * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
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
      this.__P_36_0 = {};
      this.__P_36_1 = {};
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
      __P_36_2: null,
      __P_36_0: null,
      __P_36_3: null,
      _dataProvider: null,
      __P_36_4: null,
      __P_36_5: null,
      _getSuggestions: null,
      _applyCurrentPath: function _applyCurrentPath() {
        this.__P_36_2 = null;
        this.__P_36_4 = '';
      },
      setStructure: function setStructure(name) {
        var _this = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var loaded;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                loaded = Object.prototype.hasOwnProperty.call(_this.__P_36_1, name);
                _context.t0 = name;
                _context.next = _context.t0 === 'pure' ? 4 : _context.t0 === 'tile' ? 13 : 22;
                break;
              case 4:
                if (loaded) {
                  _context.next = 8;
                  break;
                }
                _context.next = 7;
                return cv.ui.manager.model.Schema.getInstance('visu_config.xsd');
              case 7:
                _this.__P_36_1.pure = _context.sent;
              case 8:
                _this.__P_36_2 = _this.__P_36_1.pure;
                _this.__P_36_4 = 'pages';
                _this.__P_36_5 = 'meta';
                _this._getSuggestions = _this.providePureCompletionItems;
                return _context.abrupt("break", 22);
              case 13:
                if (loaded) {
                  _context.next = 17;
                  break;
                }
                _context.next = 16;
                return cv.ui.manager.model.Schema.getInstance('visu_config_tile.xsd');
              case 16:
                _this.__P_36_1.tile = _context.sent;
              case 17:
                _this.__P_36_2 = _this.__P_36_1.tile;
                _this.__P_36_4 = 'config';
                _this.__P_36_5 = 'cv-meta';
                _this._getSuggestions = _this.provideTileCompletionItems;
                return _context.abrupt("break", 22);
              case 22:
              case "end":
                return _context.stop();
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
        var cache = inMeta === true ? this.__P_36_3 : this.__P_36_0;
        if (elementName in cache) {
          return cache[elementName];
        }
        if (maxDepth < currentDepth) {
          return null;
        }
        if (!parent) {
          parent = this.__P_36_2.getElementNode(this.__P_36_4);
        }
        if (currentDepth === undefined) {
          currentDepth = 1;
        }
        var allowedElements = parent.getAllowedElements();
        // console.log(parent.name+" looking for "+elementName+" in tree level "+currentDepth+ "(<"+maxDepth+") ("+Object.getOwnPropertyNames(allowedElements).join(", ")+")");
        if (elementName in allowedElements) {
          // console.log("found "+elementName+" in tree level "+currentDepth);
          this.__P_36_0[elementName] = allowedElements[elementName];
          return allowedElements[elementName];
        }
        for (var element in allowedElements) {
          if (inMeta !== true && element === this.__P_36_5) {
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
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var match;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                match = /:noNamespaceSchemaLocation="([^"]+)"/.exec(completeText.substring(0, 200));
                if (!(match && match[1].endsWith('visu_config_tile.xsd'))) {
                  _context2.next = 6;
                  break;
                }
                _context2.next = 4;
                return _this2.setStructure('tile');
              case 4:
                _context2.next = 8;
                break;
              case 6:
                _context2.next = 8;
                return _this2.setStructure('pure');
              case 8:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }))();
      },
      getProvider: function getProvider() {
        return {
          triggerCharacters: ['<', '"'],
          provideCompletionItems: /*#__PURE__*/function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(model, position) {
              var completeText;
              return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    this.setCurrentPath(model.uri.toString());
                    completeText = model.getValue();
                    if (this.__P_36_2) {
                      _context3.next = 5;
                      break;
                    }
                    _context3.next = 5;
                    return this.detectSchema(completeText);
                  case 5:
                    if (!this._getSuggestions) {
                      _context3.next = 7;
                      break;
                    }
                    return _context3.abrupt("return", this._getSuggestions(model, position));
                  case 7:
                    return _context3.abrupt("return", {
                      suggestions: []
                    });
                  case 8:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3, this);
            }));
            return function (_x, _x2) {
              return _ref.apply(this, arguments);
            };
          }().bind(this)
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
            // search for variables
            var variables = [];
            var vregex = /{{{?\s*([\w\d]+)\s*}?}}/gm;
            while ((vmap = vregex.exec(rawTemplate)) !== null) {
              variables.push(vmap[1]);
            }
            templates[nameMatch[1]] = variables;
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
        var currentItem = this.findElements(this.__P_36_2.getElementNode('pages'), searchedElement, openedTags.length, openedTags.includes('meta'));

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
        var currentItem = this.findElements(this.__P_36_2.getElementNode('config'), searchedElement, openedTags.length, openedTags.includes('cv-meta'));

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
      this.__P_36_0 = null;
      this._schema = null;
      this._dataProvider = null;
    }
  });
  cv.ui.manager.editor.completion.Config.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Config.js.map?dt=1700345580431