function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
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
        "require": true
      },
      "cv.Config": {},
      "cv.IconHandler": {},
      "cv.core.notifications.Router": {},
      "cv.ui.NotificationCenter": {},
      "cv.parser.pure.WidgetParser": {},
      "qx.data.Array": {},
      "qx.log.Logger": {},
      "qx.io.request.Xhr": {},
      "qx.locale.Manager": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* MetaParser.js
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

  qx.Class.define('cv.parser.pure.MetaParser', {
    extend: qx.core.Object,
    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      parse: function parse(xml) {
        var _this = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                // parse external files
                _this.parseFiles(xml);

                // parse the icons
                xml.querySelectorAll('meta > icons icon-definition').forEach(_this.parseIcons, _this);

                // then the mappings
                xml.querySelectorAll('meta > mappings mapping').forEach(_this.parseMappings, _this);

                // then the stylings
                xml.querySelectorAll('meta > stylings styling').forEach(_this.parseStylings, _this);

                // then the status bar
                _this.parseStatusBar(xml);
                _this.parseStateNotifications(xml);
                _context.next = 8;
                return _this.parseTemplates(xml);
              case 8:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }))();
      },
      parseFiles: function parseFiles(xml) {
        var files = {
          css: [],
          js: []
        };
        xml.querySelectorAll('meta > files file').forEach(function (elem) {
          var type = elem.getAttribute('type');
          var content = elem.getAttribute('content');
          switch (type) {
            case 'css':
              files.css.push(elem.textContent);
              break;
            case 'js':
              if (content === 'plugin') {
                cv.Config.configSettings.pluginsToLoad.push(elem.textContent);
              } else {
                files.js.push(elem.textContent);
              }
              break;
            default:
              this.warn('ignoring unknown file type', type);
              break;
          }
        }, this);
        if (files.css.length > 0) {
          cv.Config.configSettings.stylesToLoad = cv.Config.configSettings.stylesToLoad.concat(files.css);
        }
        if (files.js.length > 0) {
          cv.Config.configSettings.scriptsToLoad = cv.Config.configSettings.scriptsToLoad.concat(files.js);
        }
      },
      parseIcons: function parseIcons(elem) {
        var icon = this.__P_8_0(elem);
        cv.Config.configSettings.iconsFromConfig.push(icon);
        cv.IconHandler.getInstance().insert(icon.name, icon.uri, icon.type, icon.flavour, icon.color, icon.styling, icon.dynamic, icon.source);
      },
      parseMappings: function parseMappings(elem) {
        var name = elem.getAttribute('name');
        var mapping = {};
        var formula = elem.querySelectorAll('formula');
        if (formula.length > 0) {
          mapping.formulaSource = formula[0].textContent;
          mapping.formula = new Function('x', 'var y;' + mapping.formulaSource + '; return y;');
        }
        var subElements = elem.querySelectorAll('entry');
        subElements.forEach(function (subElem) {
          var origin = subElem.childNodes;
          var value = [];
          for (var i = 0; i < origin.length; i++) {
            var v = origin[i];
            if (v && v.nodeType === 1 && v.nodeName.toLowerCase() === 'icon') {
              var iconDefinition = this.__P_8_0(v);
              var icon = cv.IconHandler.getInstance().getIconElement(iconDefinition.name, iconDefinition.type, iconDefinition.flavour, iconDefinition.color, iconDefinition.styling, iconDefinition['class']);
              icon.definition = iconDefinition;
              value.push(icon);
            } else if (v && v.nodeType === 3 && v.textContent.trim().length) {
              value.push(v.textContent.trim());
            }
          }
          // check for default entry
          var isDefaultValue = subElem.getAttribute('default');
          if (isDefaultValue !== undefined) {
            isDefaultValue = isDefaultValue === 'true';
          } else {
            isDefaultValue = false;
          }
          // now set the mapped values
          if (subElem.getAttribute('value')) {
            mapping[subElem.getAttribute('value')] = value.length === 1 ? value[0] : value;
            if (isDefaultValue) {
              mapping.defaultValue = subElem.getAttribute('value');
            }
          } else if (subElem.hasAttribute('range_min')) {
            if (!mapping.range) {
              mapping.range = {};
            }
            mapping.range[parseFloat(subElem.getAttribute('range_min'))] = [parseFloat(subElem.getAttribute('range_max')), value];
            if (isDefaultValue) {
              mapping.defaultValue = parseFloat(subElem.getAttribute('range_min'));
            }
          } else if (subElements.length === 1) {
            // use as catchall mapping
            mapping['*'] = value.length === 1 ? value[0] : value;
          }
        }, this);
        cv.Config.addMapping(name, mapping);
      },
      parseStylings: function parseStylings(elem) {
        var name = elem.getAttribute('name');
        var classnames = '';
        var styling = {};
        elem.querySelectorAll('entry').forEach(function (subElem) {
          classnames += subElem.textContent + ' ';
          // check for default entry
          var isDefaultValue = subElem.getAttribute('default');
          if (isDefaultValue !== undefined) {
            isDefaultValue = isDefaultValue === 'true';
          } else {
            isDefaultValue = false;
          }
          // now set the styling values
          if (subElem.getAttribute('value')) {
            styling[subElem.getAttribute('value')] = subElem.textContent;
            if (isDefaultValue) {
              styling.defaultValue = subElem.getAttribute('value');
            }
          } else {
            // a range
            if (!styling.range) {
              styling.range = {};
            }
            styling.range[parseFloat(subElem.getAttribute('range_min'))] = [parseFloat(subElem.getAttribute('range_max')), subElem.textContent];
            if (isDefaultValue) {
              styling.defaultValue = parseFloat(subElem.getAttribute('range_min'));
            }
          }
        }, this);
        styling.classnames = classnames.trim();
        cv.Config.addStyling(name, styling);
      },
      parseStatusBar: function parseStatusBar(xml) {
        var code = '';
        xml.querySelectorAll('meta > statusbar status').forEach(function (elem) {
          var condition = elem.getAttribute('condition');
          var extend = elem.getAttribute('hrefextend');
          var sPath = window.location.pathname;
          var sPage = sPath.substring(sPath.lastIndexOf('/') + 1);

          // @TODO: make this match once the new editor is finished-ish.
          var editMode = sPage === 'edit_config.html';

          // skip this element if it's edit-only and we are non-edit, or the other
          // way
          // round
          if (editMode && condition === '!edit') {
            return;
          }
          if (!editMode && condition === 'edit') {
            return;
          }
          if (cv.Config.testMode && condition === '!testMode') {
            return;
          }
          if (!cv.Config.testMode && condition === 'testMode') {
            return;
          }
          var text = elem.textContent;
          var search = '';

          // compability change to make existing customer configurations work with the new manager links
          // this replaces all document links to old manager tools with the new ones
          var linkMatch;
          var linkRegex = /href="([^"]+)"/gm;
          var matches = [];
          // eslint-disable-next-line no-cond-assign
          while (linkMatch = linkRegex.exec(text)) {
            matches.push(linkMatch);
          }
          var handled = false;
          var url = new URL(window.location.href);
          if (url.searchParams.has('config')) {
            search = url.searchParams.get('config');
            search = encodeURIComponent(search).replace(/[!'()*]/g, function (c) {
              return '%' + c.charCodeAt(0).toString(16);
            });
          }
          matches.forEach(function (match) {
            switch (match[1]) {
              case 'manager.php':
                text = text.replace(match[0], 'href="?manager=1" onclick="showManager(); return false;"');
                handled = true;
                break;
              case 'check_config.php':
                text = text.replace(match[0], 'href="#" onclick="qx.core.Init.getApplication().validateConfig(\'' + search + '\')"');
                handled = true;
                break;
              case 'editor/':
              case 'editor':
                {
                  var suffix = search ? '_' + search : '';
                  text = text.replace(match[0], 'href="' + window.location.pathname + '?config=' + search + '&manager=1&open=visu_config' + suffix + '.xml" onclick="showManager(\'open\', \'visu_config' + suffix + '.xml\')"');
                  handled = true;
                  break;
                }
            }
          });
          if (handled) {
            // this overrides the extends
            extend = null;
          }
          switch (extend) {
            case 'all':
              // append all parameters
              search = window.location.search.replace(/\$/g, '$$$$');
              text = text.replace(/(href="[^"]*)(")/g, '$1' + search + '$2');
              break;
            case 'config':
              {
                // append config file info
                search = window.location.search.replace(/\$/g, '$$$$');
                search = search.replace(/.*(config=[^&]*).*|.*/, '$1');
                var middle = text.replace(/.*href="([^"]*)".*/g, '{$1}');
                if (middle.indexOf('?') > 0) {
                  search = '&' + search;
                } else {
                  search = '?' + search;
                }
                text = text.replace(/(href="[^"]*)(")/g, '$1' + search + '$2');
                break;
              }
            case 'action':
              {
                search = window.location.search.replace(/\$/g, '$$$$');
                search = search.replace(/.*config=([^&]*).*|.*/, '$1');
                var match = /cv-action="([\w]+)"/.exec(text);
                if (match) {
                  var replacement = 'href="#" ';
                  switch (match[1]) {
                    case 'validate':
                      replacement += 'onclick="qx.core.Init.getApplication().validateConfig(\'' + search + '\')"';
                      break;
                    case 'edit':
                      {
                        var configFile = search ? 'visu_config_' + search + '.xml' : 'visu_config.xml';
                        replacement = 'href="' + window.location.pathname + '?config=' + search + '&manager=1&open=' + configFile + '" onclick="showManager(\'open\', \'' + configFile + '\'); return false;"';
                        break;
                      }
                  }
                  text = text.replace(match[0], replacement);
                }
                break;
              }
          }
          code += text;
        }, this);
        var footerElement = document.querySelector('.footer');
        footerElement.innerHTML += code;
      },
      parsePlugins: function parsePlugins(xml) {
        var pluginsToLoad = [];
        xml.querySelectorAll('meta > plugins plugin').forEach(function (elem) {
          var name = elem.getAttribute('name');
          if (name) {
            pluginsToLoad.push('plugin-' + name);
          }
        });
        return pluginsToLoad;
      },
      __P_8_0: function __P_8_0(elem) {
        var nullIsUndefined = function nullIsUndefined(x) {
          return x === null ? undefined : x;
        };
        return {
          name: nullIsUndefined(elem.getAttribute('name')),
          uri: nullIsUndefined(elem.getAttribute('uri')),
          type: nullIsUndefined(elem.getAttribute('type')),
          flavour: nullIsUndefined(elem.getAttribute('flavour')),
          color: nullIsUndefined(elem.getAttribute('color')),
          styling: nullIsUndefined(elem.getAttribute('styling')),
          dynamic: nullIsUndefined(elem.getAttribute('dynamic')),
          "class": nullIsUndefined(elem.getAttribute('class')),
          source: 'config'
        };
      },
      parseStateNotifications: function parseStateNotifications(xml) {
        var stateConfig = {};
        xml.querySelectorAll('meta > notifications state-notification').forEach(function (elem) {
          var target = cv.core.notifications.Router.getTarget(elem.getAttribute('target')) || cv.ui.NotificationCenter.getInstance();
          var addressContainer = elem.querySelector('addresses');
          var config = {
            target: target,
            severity: elem.getAttribute('severity'),
            skipInitial: elem.getAttribute('skip-initial') !== 'false',
            deletable: elem.getAttribute('deletable') !== 'false',
            unique: elem.getAttribute('unique') === 'true',
            valueMapping: addressContainer.getAttribute('value-mapping'),
            addressMapping: addressContainer.getAttribute('address-mapping')
          };
          var name = elem.getAttribute('name');
          if (name) {
            config.topic = 'cv.state.' + name;
          }
          var icon = elem.getAttribute('icon');
          if (icon) {
            config.icon = icon;
            var iconClasses = elem.getAttribute('icon-classes');
            if (iconClasses) {
              config.iconClasses = iconClasses;
            }
          }

          // templates
          var titleElem = elem.querySelector('title-template');
          if (titleElem) {
            config.titleTemplate = titleElem.innerHTML;
          }
          var messageElem = elem.querySelector('message-template');
          if (messageElem) {
            config.messageTemplate = messageElem.innerHTML;
          }

          // condition
          var conditionElem = elem.querySelector('condition');
          var condition = conditionElem.textContent;
          if (condition === 'true') {
            condition = true;
          } else if (condition === 'false') {
            condition = false;
          }
          config.condition = condition;
          var addresses = cv.parser.pure.WidgetParser.makeAddressList(addressContainer);
          // addresses
          Object.getOwnPropertyNames(addresses).forEach(function (address) {
            if (!Object.prototype.hasOwnProperty.call(stateConfig, address)) {
              stateConfig[address] = [];
            }
            var addressConfig = Object.assign({}, config);
            addressConfig.addressConfig = addresses[address];
            stateConfig[address].push(addressConfig);
          });
        });
        cv.core.notifications.Router.getInstance().registerStateUpdateHandler(stateConfig);
      },
      /**
       * Parses meta template definitions and add them to the WidgetParser
       * @param xml {HTMLElement}
       */
      parseTemplates: function parseTemplates(xml) {
        var _this2 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var __P_8_1;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                __P_8_1 = new qx.data.Array();
                return _context2.abrupt("return", new Promise(function (done, reject) {
                  var check = function check() {
                    if (__P_8_1.length === 0 && done) {
                      done();
                    }
                  };
                  var templates = xml.querySelectorAll('meta > templates template');
                  if (templates.length === 0) {
                    done();
                  } else {
                    templates.forEach(function (elem) {
                      var _this3 = this;
                      var templateName = elem.getAttribute('name');
                      qx.log.Logger.debug(this, 'loading template:', templateName);
                      var ref = elem.getAttribute('ref');
                      if (ref) {
                        // load template fom external file
                        var areq = new qx.io.request.Xhr(ref);
                        __P_8_1.push(ref);
                        qx.log.Logger.debug(this, 'loading template from file:', ref);
                        areq.set({
                          accept: 'text/plain',
                          cache: !cv.Config.forceReload
                        });
                        areq.addListenerOnce('success', function (e) {
                          var req = e.getTarget();
                          cv.parser.pure.WidgetParser.addTemplate(templateName,
                          // templates can only have one single root element, so we wrap it here
                          '<root>' + req.getResponseText() + '</root>');
                          __P_8_1.remove(areq.getUrl());
                          qx.log.Logger.debug(_this3, 'DONE loading template from file:', ref);
                          check();
                        });
                        areq.addListener('statusError', function () {
                          var message = {
                            topic: 'cv.config.error',
                            title: qx.locale.Manager.tr('Template loading error'),
                            severity: 'urgent',
                            deletable: true,
                            message: qx.locale.Manager.tr('Template \'%1\' could not be loaded from \'%2\'.', templateName, ref)
                          };
                          cv.core.notifications.Router.dispatchMessage(message.topic, message);
                          reject();
                        });
                        areq.send();
                      } else {
                        var cleaned = elem.innerHTML.replace(/\n\s*/g, '').trim();
                        cv.parser.pure.WidgetParser.addTemplate(templateName,
                        // templates can only have one single root element, so we wrap it here
                        '<root>' + cleaned + '</root>');
                      }
                    }, _this2);
                    check();
                  }
                }));
              case 2:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }))();
      }
    }
  });
  cv.parser.pure.MetaParser.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MetaParser.js.map?dt=1677362707605