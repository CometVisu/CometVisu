function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.embed.Html": {
        "construct": true,
        "require": true
      },
      "qxl.apiviewer.ObjectRegistry": {
        "construct": true
      },
      "qx.bom.client.Engine": {
        "require": true
      },
      "qx.dev.Tokenizer": {},
      "qx.util.StringBuilder": {},
      "qx.Promise": {},
      "qxl.apiviewer.LoadingIndicator": {},
      "qx.dom.Element": {},
      "qx.util.ResourceManager": {},
      "qxl.apiviewer.dao.Package": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "engine.name": {
          "className": "qx.bom.client.Engine"
        }
      }
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
       * Til Schneider (til132)
       * Sebastian Werner (wpbasti)
       * Andreas Ecker (ecker)
       * Fabian Jakobs (fjakobs)
       * Jonathan Weiß (jonathan_rass)
       * John Spackman (johnspackman)
       * Henner Kollmann (hkollmann)
  
  ************************************************************************ */

  qx.Class.define("qxl.apiviewer.ui.AbstractViewer", {
    type: "abstract",
    extend: qx.ui.embed.Html,
    construct: function construct() {
      qx.ui.embed.Html.constructor.call(this);
      this._infoPanelHash = {};
      this._infoPanels = [];
      this.setOverflowX("auto");
      this.setOverflowY("auto");
      this.getContentElement().setStyle("-webkit-overflow-scrolling", "touch");
      this.getContentElement().setStyle("touch-action", "pan-y");
      this.getContentElement().setStyle("-ms-touch-action", "pan-y");
      this.setAppearance("detailviewer");
      this._infoPanelHash = {};
      this._infoPanels = [];
      qxl.apiviewer.ObjectRegistry.register(this);
    },
    properties: {
      /** The class to display */
      docNode: {
        init: null,
        nullable: true,
        apply: "_applyDocNode",
        async: true
      },
      /** whether to display inherited items */
      showInherited: {
        check: "Boolean",
        init: false,
        apply: "_updatePanelsWithInheritedMembers"
      },
      /** whether to display included items */
      showIncluded: {
        check: "Boolean",
        init: true,
        apply: "_updatePanelsWithInheritedMembers"
      },
      /** whether to display protected items */
      expandProperties: {
        check: "Boolean",
        init: false,
        apply: "_updatePanels"
      },
      /** whether to display protected items */
      showProtected: {
        check: "Boolean",
        init: false,
        apply: "_updatePanels"
      },
      /** whether to display private items */
      showPrivate: {
        check: "Boolean",
        init: false,
        apply: "_updatePanels"
      },
      /** whether to display internal items */
      showInternal: {
        check: "Boolean",
        init: false,
        apply: "_updatePanels"
      }
    },
    statics: {
      /**
       * Change the target of all external links inside the given element to open in a new browser window.
       *
       * @param el {Element} Root element
       */
      fixLinks: function fixLinks(el) {
        var a = el.getElementsByTagName("a");
        for (var i = 0; i < a.length; i++) {
          if (typeof a[i].href == "string" && a[i].href.indexOf("http://") == 0) {
            a[i].target = "_blank";
          }
        }
      },
      highlightCode: function highlightCode(el) {
        var pres = el.getElementsByTagName("pre");
        for (var i = 0; i < pres.length; i++) {
          var element = pres[i];
          if (element.className !== "javascript") {
            continue;
          }
          if (qx.core.Environment.get("engine.name") == "mshtml") {
            // IE parser treats html added to a pre tag like normal html and removes
            // the whitespaces. To prevent this we create a wrapper element, add
            // to its innerHTML the pre tag and the javaScript code and replace the
            // existing pre element with the wrapper element.
            var preWrapper = document.createElement("div");
            var content = element.textContent || element.innerText;
            preWrapper.innerHTML = '<pre class="javascript">' + qx.dev.Tokenizer.javaScriptToHtml(content, true) + "</pre>";
            element.parentNode.replaceChild(preWrapper, element);
          } else {
            element.innerHTML = qx.dev.Tokenizer.javaScriptToHtml(element.textContent);
          }
        }
      }
    },
    events: {
      synced: "qx.event.type.Event"
    },
    members: {
      _infoPanelHash: null,
      _infoPanels: null,
      __P_579_0: false,
      _init: function _init(pkg) {
        var _this = this;
        this.__P_579_1();
        this.addListenerOnce("appear", function () {
          return _this._syncHtml();
        });
      },
      __P_579_1: function __P_579_1() {
        var html = new qx.util.StringBuilder();
        html.add('<div style="padding:24px;">');

        // Add title
        html.add("<h1></h1>");

        // Add TOC
        html.add('<div class="tocContainer"></div>');

        // Add description
        html.add("<div>", "</div>");

        // render panels
        var panels = this.getPanels();
        for (var i = 0; i < panels.length; i++) {
          var panel = panels[i];
          html.add(panel.getPanelHtml(this));
        }
        html.add("</div>");
        this.setHtml(html.get());
      },
      /**
       * Returns the HTML fragment for the title
       *
       * @abstract
       * @param classNode {qxl.apiviewer.dao.Class} the class documentation node for the title
       * @return {String} HTML fragment of the title
       */
      _getTitleHtml: function _getTitleHtml(classNode) {
        throw new Error("Abstract method called!");
      },
      _getTocHtml: function _getTocHtml(classNode) {
        throw new Error("Abstract method called!");
      },
      _getDescriptionHtml: function _getDescriptionHtml(classNode) {
        throw new Error("Abstract method called!");
      },
      /**
       * Initializes the content of the embedding DIV. Will be called by the
       * HtmlEmbed element initialization routine.
       *
       */
      _syncHtml: function _syncHtml() {
        var _this2 = this;
        return _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var oldTitleElem, element, divArr, panels, i, panel;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                oldTitleElem = _this2._titleElem;
                element = _this2.getContentElement().getDomElement().firstChild;
                divArr = element.childNodes;
                panels = _this2.getPanels();
                qxl.apiviewer.ui.AbstractViewer.fixLinks(element);
                _this2._titleElem = divArr[0];
                _this2._tocElem = divArr[1];
                _this2._classDescElem = divArr[2];
                for (i = 0; i < panels.length; i++) {
                  panel = panels[i];
                  panel.setElement(divArr[i + 3]);
                }
                if (!(oldTitleElem !== _this2._titleElem && _this2.getDocNode())) {
                  _context.next = 12;
                  break;
                }
                _context.next = 12;
                return _this2._applyDocNode(_this2.getDocNode());
              case 12:
                _this2.__P_579_0 = true;
                _this2.fireEvent("synced");
              case 14:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }))();
      },
      isValid: function isValid() {
        return this.__P_579_0;
      },
      addInfoPanel: function addInfoPanel(panel) {
        this._infoPanelHash[panel.toHashCode()] = panel;
        this._infoPanels.push(panel);
      },
      getPanels: function getPanels() {
        return this._infoPanels;
      },
      getPanelFromHashCode: function getPanelFromHashCode(hashCode) {
        return this._infoPanelHash[hashCode];
      },
      /**
       * Updates all info panels
       *
       * @return {qx.Promise}
       */
      _updatePanels: function _updatePanels() {
        var _this3 = this;
        if (!this.getDocNode()) {
          return qx.Promise.resolve();
        }
        qxl.apiviewer.LoadingIndicator.getInstance().show();
        var panels = this.getPanels();
        var all = panels.map(function (panel) {
          return panel.update(_this3, _this3.getDocNode());
        });
        return qx.Promise.all(all).then(function () {
          return qxl.apiviewer.LoadingIndicator.getInstance().hide();
        });
      },
      /**
       * Updates all info panels and TOC with items reflecting appearance/disappearance of panels
       * due to inherited members
       *
       * @return {qx.Promise}
       */
      _updatePanelsWithInheritedMembers: function _updatePanelsWithInheritedMembers() {
        var _this4 = this;
        if (!this.getDocNode()) {
          return qx.Promise.resolve();
        }
        return this._updatePanels().then(function () {
          if (_this4._tocElem) {
            qx.dom.Element.empty(_this4._tocElem);
            _this4._tocElem.appendChild(_this4._getTocHtml(_this4.getDocNode()));
          }
        });
      },
      /**
       * Shows the information about a class.
       *
       * @param classNode {qxl.apiviewer.dao.Class} the doc node of the class to show.
       */
      _applyDocNode: function _applyDocNode(classNode) {
        var _this5 = this;
        if (!this._titleElem) {
          return null;
        }
        this._titleElem.innerHTML = this._getTitleHtml(classNode);
        qx.dom.Element.empty(this._tocElem);
        this._tocElem.appendChild(this._getTocHtml(classNode));
        return this._getDescriptionHtml(classNode).then(function (html) {
          _this5._classDescElem.innerHTML = html;
          qxl.apiviewer.ui.AbstractViewer.fixLinks(_this5._classDescElem);
          qxl.apiviewer.ui.AbstractViewer.highlightCode(_this5._classDescElem);

          // Refresh the info viewers
          return _this5._updatePanels();
        });
      },
      /**
       * Event handler. Called when the user tapped a button for showing/hiding the
       * body of an info panel.
       * @param panel
       * @return {qx.Promise}
       */
      togglePanelVisibility: function togglePanelVisibility(panel) {
        try {
          panel.setIsOpen(!panel.getIsOpen());
          var imgElem = panel.getTitleElement().getElementsByTagName("img")[0];
          imgElem.src = qx.util.ResourceManager.getInstance().toUri(panel.getIsOpen() ? "qxl/apiviewer/image/close.gif" : "qxl/apiviewer/image/open.gif");
          return panel.update(this, this.getDocNode());
        } catch (exc) {
          this.error("Toggling info body failed", exc);
        }
        return null;
      },
      /**
       * Sorts the nodes in place.
       *
       * @param nodeArr {qxl.apiviewer.dao.ClassItem[]} array of class items
       */
      sortItems: function sortItems(nodeArr) {
        var WEIGHT = ["qxl.apiviewer.dao.Package", "qxl.apiviewer.dao.Class"];

        // Sort the nodeArr by name
        // Move protected methods to the end
        nodeArr.sort(function (obj1, obj2) {
          if (obj1.classname != obj2.classname) {
            var w1 = WEIGHT.indexOf(obj1.classname);
            var w2 = WEIGHT.indexOf(obj2.classname);
            if (w1 < 0) {
              w1 = 999;
            }
            if (w2 < 0) {
              w2 = 999;
            }
            return w1 < w2 ? -1 : w1 > w2 ? 1 : 0;
          }
          if (obj1 instanceof qxl.apiviewer.dao.Package) {
            var n1 = obj1.getFullName().toLowerCase();
            var n2 = obj2.getFullName().toLowerCase();
            return n1 < n2 ? -1 : n1 > n2 ? 1 : 0;
          }
          var sum1 = 0;
          if (obj1.isInternal()) {
            sum1 += 4;
          }
          if (obj1.isPrivate()) {
            sum1 += 2;
          }
          if (obj1.isProtected()) {
            sum1 += 1;
          }
          var sum2 = 0;
          if (obj2.isInternal()) {
            sum2 += 4;
          }
          if (obj2.isPrivate()) {
            sum2 += 2;
          }
          if (obj2.isProtected()) {
            sum2 += 1;
          }
          if (sum1 == sum2) {
            var name1 = obj1.getName();
            var name2 = obj2.getName();
            return name1.toLowerCase() < name2.toLowerCase() ? -1 : 1;
          }
          return sum1 - sum2;
        });
      }
    }
  });
  qxl.apiviewer.ui.AbstractViewer.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=AbstractViewer.js.map?dt=1677017737463