function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
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

//# sourceMappingURL=MetaParser.js.map?dt=1703705654192