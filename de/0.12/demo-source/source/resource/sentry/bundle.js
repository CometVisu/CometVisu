/*! @sentry/browser 4.0.4 (fd30f82a) | https://github.com/getsentry/sentry-javascript */
var Sentry = (function (exports) {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __awaiter(thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

    function unwrapExports (x) {
    	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
    }

    function createCommonjsModule(fn, module) {
    	return module = { exports: {} }, fn(module, module.exports), module.exports;
    }

    var dist = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /** JSDoc */
    var Severity;
    (function (Severity) {
        /** JSDoc */
        Severity["Fatal"] = "fatal";
        /** JSDoc */
        Severity["Error"] = "error";
        /** JSDoc */
        Severity["Warning"] = "warning";
        /** JSDoc */
        Severity["Log"] = "log";
        /** JSDoc */
        Severity["Info"] = "info";
        /** JSDoc */
        Severity["Debug"] = "debug";
        /** JSDoc */
        Severity["Critical"] = "critical";
    })(Severity = exports.Severity || (exports.Severity = {}));
    // tslint:disable:no-unnecessary-qualifier no-namespace
    (function (Severity) {
        /**
         * Converts a string-based level into a {@link Severity}.
         *
         * @param level string representation of Severity
         * @returns Severity
         */
        function fromString(level) {
            switch (level) {
                case 'debug':
                    return Severity.Debug;
                case 'info':
                    return Severity.Info;
                case 'warn':
                case 'warning':
                    return Severity.Warning;
                case 'error':
                    return Severity.Error;
                case 'fatal':
                    return Severity.Fatal;
                case 'critical':
                    return Severity.Critical;
                case 'log':
                default:
                    return Severity.Log;
            }
        }
        Severity.fromString = fromString;
    })(Severity = exports.Severity || (exports.Severity = {}));
    /** The status of an event. */
    var Status;
    (function (Status) {
        /** The status could not be determined. */
        Status["Unknown"] = "unknown";
        /** The event was skipped due to configuration or callbacks. */
        Status["Skipped"] = "skipped";
        /** The event was sent to Sentry successfully. */
        Status["Success"] = "success";
        /** The client is currently rate limited and will try again later. */
        Status["RateLimit"] = "rate_limit";
        /** The event could not be processed. */
        Status["Invalid"] = "invalid";
        /** A server-side error ocurred during submission. */
        Status["Failed"] = "failed";
    })(Status = exports.Status || (exports.Status = {}));
    // tslint:disable:no-unnecessary-qualifier no-namespace
    (function (Status) {
        /**
         * Converts a HTTP status code into a {@link Status}.
         *
         * @param code The HTTP response status code.
         * @returns The send status or {@link Status.Unknown}.
         */
        function fromHttpCode(code) {
            if (code >= 200 && code < 300) {
                return Status.Success;
            }
            if (code === 429) {
                return Status.RateLimit;
            }
            if (code >= 400 && code < 500) {
                return Status.Invalid;
            }
            if (code >= 500) {
                return Status.Failed;
            }
            return Status.Unknown;
        }
        Status.fromHttpCode = fromHttpCode;
    })(Status = exports.Status || (exports.Status = {}));

    });

    unwrapExports(dist);
    var dist_1 = dist.Severity;
    var dist_2 = dist.Status;

    var is = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Checks whether given value's type is one of a few Error or Error-like
     * {@link isError}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isError(wat) {
        switch (Object.prototype.toString.call(wat)) {
            case '[object Error]':
                return true;
            case '[object Exception]':
                return true;
            case '[object DOMException]':
                return true;
            default:
                return wat instanceof Error;
        }
    }
    exports.isError = isError;
    /**
     * Checks whether given value's type is ErrorEvent
     * {@link isErrorEvent}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isErrorEvent(wat) {
        return Object.prototype.toString.call(wat) === '[object ErrorEvent]';
    }
    exports.isErrorEvent = isErrorEvent;
    /**
     * Checks whether given value's type is DOMError
     * {@link isDOMError}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isDOMError(wat) {
        return Object.prototype.toString.call(wat) === '[object DOMError]';
    }
    exports.isDOMError = isDOMError;
    /**
     * Checks whether given value's type is DOMException
     * {@link isDOMException}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isDOMException(wat) {
        return Object.prototype.toString.call(wat) === '[object DOMException]';
    }
    exports.isDOMException = isDOMException;
    /**
     * Checks whether given value's type is an undefined
     * {@link isUndefined}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isUndefined(wat) {
        return wat === void 0;
    }
    exports.isUndefined = isUndefined;
    /**
     * Checks whether given value's type is a function
     * {@link isFunction}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isFunction(wat) {
        return typeof wat === 'function';
    }
    exports.isFunction = isFunction;
    /**
     * Checks whether given value's type is a string
     * {@link isString}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isString(wat) {
        return Object.prototype.toString.call(wat) === '[object String]';
    }
    exports.isString = isString;
    /**
     * Checks whether given value's type is an array
     * {@link isArray}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isArray(wat) {
        return Object.prototype.toString.call(wat) === '[object Array]';
    }
    exports.isArray = isArray;
    /**
     * Checks whether given value's type is an object literal
     * {@link isPlainObject}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isPlainObject(wat) {
        return Object.prototype.toString.call(wat) === '[object Object]';
    }
    exports.isPlainObject = isPlainObject;
    /**
     * Checks whether given value's type is an regexp
     * {@link isRegExp}.
     *
     * @param wat A value to be checked.
     * @returns A boolean representing the result.
     */
    function isRegExp(wat) {
        return Object.prototype.toString.call(wat) === '[object RegExp]';
    }
    exports.isRegExp = isRegExp;

    });

    unwrapExports(is);
    var is_1 = is.isError;
    var is_2 = is.isErrorEvent;
    var is_3 = is.isDOMError;
    var is_4 = is.isDOMException;
    var is_5 = is.isUndefined;
    var is_6 = is.isFunction;
    var is_7 = is.isString;
    var is_8 = is.isArray;
    var is_9 = is.isPlainObject;
    var is_10 = is.isRegExp;

    var misc = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });

    /**
     * Safely get global scope object
     *
     * @returns Global scope object
     */
    // tslint:disable:strict-type-predicates
    function getGlobalObject() {
        return typeof window !== 'undefined'
            ? window
            : typeof commonjsGlobal !== 'undefined'
                ? commonjsGlobal
                : typeof self !== 'undefined'
                    ? self
                    : {};
    }
    exports.getGlobalObject = getGlobalObject;
    /**
     * UUID4 generator
     *
     * @returns string Generated UUID4.
     */
    function uuid4() {
        var global = getGlobalObject();
        var crypto = global.crypto || global.msCrypto;
        if (!(crypto === void 0) && crypto.getRandomValues) {
            // Use window.crypto API if available
            var arr = new Uint16Array(8);
            crypto.getRandomValues(arr);
            // set 4 in byte 7
            // tslint:disable-next-line:no-bitwise
            arr[3] = (arr[3] & 0xfff) | 0x4000;
            // set 2 most significant bits of byte 9 to '10'
            // tslint:disable-next-line:no-bitwise
            arr[4] = (arr[4] & 0x3fff) | 0x8000;
            var pad = function (num) {
                var v = num.toString(16);
                while (v.length < 4) {
                    v = "0" + v;
                }
                return v;
            };
            return (pad(arr[0]) + pad(arr[1]) + pad(arr[2]) + pad(arr[3]) + pad(arr[4]) + pad(arr[5]) + pad(arr[6]) + pad(arr[7]));
        }
        else {
            // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
            return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                // tslint:disable-next-line:no-bitwise
                var r = (Math.random() * 16) | 0;
                // tslint:disable-next-line:no-bitwise
                var v = c === 'x' ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            });
        }
    }
    exports.uuid4 = uuid4;
    /**
     * Given a child DOM element, returns a query-selector statement describing that
     * and its ancestors
     * e.g. [HTMLElement] => body > div > input#foo.btn[name=baz]
     * @returns generated DOM path
     */
    function htmlTreeAsString(elem) {
        var currentElem = elem;
        var MAX_TRAVERSE_HEIGHT = 5;
        var MAX_OUTPUT_LEN = 80;
        var out = [];
        var height = 0;
        var len = 0;
        var separator = ' > ';
        var sepLength = separator.length;
        var nextStr;
        while (currentElem && height++ < MAX_TRAVERSE_HEIGHT) {
            nextStr = htmlElementAsString(currentElem);
            // bail out if
            // - nextStr is the 'html' element
            // - the length of the string that would be created exceeds MAX_OUTPUT_LEN
            //   (ignore this limit if we are on the first iteration)
            if (nextStr === 'html' || (height > 1 && len + out.length * sepLength + nextStr.length >= MAX_OUTPUT_LEN)) {
                break;
            }
            out.push(nextStr);
            len += nextStr.length;
            currentElem = currentElem.parentNode;
        }
        return out.reverse().join(separator);
    }
    exports.htmlTreeAsString = htmlTreeAsString;
    /**
     * Returns a simple, query-selector representation of a DOM element
     * e.g. [HTMLElement] => input#foo.btn[name=baz]
     * @returns generated DOM path
     */
    function htmlElementAsString(elem) {
        var out = [];
        var className;
        var classes;
        var key;
        var attr;
        var i;
        if (!elem || !elem.tagName) {
            return '';
        }
        out.push(elem.tagName.toLowerCase());
        if (elem.id) {
            out.push("#" + elem.id);
        }
        className = elem.className;
        if (className && is.isString(className)) {
            classes = className.split(/\s+/);
            for (i = 0; i < classes.length; i++) {
                out.push("." + classes[i]);
            }
        }
        var attrWhitelist = ['type', 'name', 'title', 'alt'];
        for (i = 0; i < attrWhitelist.length; i++) {
            key = attrWhitelist[i];
            attr = elem.getAttribute(key);
            if (attr) {
                out.push("[" + key + "=\"" + attr + "\"]");
            }
        }
        return out.join('');
    }
    exports.htmlElementAsString = htmlElementAsString;
    /**
     * Parses string form of URL into an object
     * // borrowed from https://tools.ietf.org/html/rfc3986#appendix-B
     * // intentionally using regex and not <a/> href parsing trick because React Native and other
     * // environments where DOM might not be available
     * @returns parsed URL object
     */
    function parseUrl(url) {
        if (!url) {
            return {};
        }
        var match = url.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
        if (!match) {
            return {};
        }
        // coerce to undefined values to empty string so we don't get 'undefined'
        var query = match[6] || '';
        var fragment = match[8] || '';
        return {
            host: match[4],
            path: match[5],
            protocol: match[2],
            relative: match[5] + query + fragment,
        };
    }
    exports.parseUrl = parseUrl;
    /**
     * Extracts either message or type+value from an event that can be used for user-facing logs
     * @returns event's description
     */
    function getEventDescription(event) {
        if (event.message) {
            return event.message;
        }
        else if (event.exception && event.exception.values && event.exception.values[0]) {
            var exception = event.exception.values[0];
            if (exception.type && exception.value) {
                return exception.type + ": " + exception.value;
            }
            else {
                return exception.type || exception.value || event.event_id || '<unknown>';
            }
        }
        else {
            return event.event_id || '<unknown>';
        }
    }
    exports.getEventDescription = getEventDescription;

    });

    unwrapExports(misc);
    var misc_1 = misc.getGlobalObject;
    var misc_2 = misc.uuid4;
    var misc_3 = misc.htmlTreeAsString;
    var misc_4 = misc.htmlElementAsString;
    var misc_5 = misc.parseUrl;
    var misc_6 = misc.getEventDescription;

    var logger_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });

    // TODO: Implement different loggers for different environments
    var global = misc.getGlobalObject();
    /** JSDoc */
    var Logger = /** @class */ (function () {
        /** JSDoc */
        function Logger() {
            this.console = global.console;
            this.disabled = true;
        }
        /** JSDoc */
        Logger.prototype.disable = function () {
            this.disabled = true;
        };
        /** JSDoc */
        Logger.prototype.enable = function () {
            this.disabled = false;
        };
        /** JSDoc */
        Logger.prototype.log = function (message) {
            if (this.disabled) {
                return;
            }
            this.console.log("Sentry Logger [Log]: " + message); // tslint:disable-line:no-console
        };
        /** JSDoc */
        Logger.prototype.warn = function (message) {
            if (this.disabled) {
                return;
            }
            this.console.warn("Sentry Logger [Warn]: " + message); // tslint:disable-line:no-console
        };
        /** JSDoc */
        Logger.prototype.error = function (message) {
            if (this.disabled) {
                return;
            }
            this.console.error("Sentry Logger [Error]: " + message); // tslint:disable-line:no-console
        };
        return Logger;
    }());
    var logger = new Logger();
    exports.logger = logger;

    });

    unwrapExports(logger_1);
    var logger_2 = logger_1.logger;

    var scope = createCommonjsModule(function (module, exports) {
    var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
        __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    var __values = (commonjsGlobal && commonjsGlobal.__values) || function (o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    };
    var __read = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var __spread = (commonjsGlobal && commonjsGlobal.__spread) || function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
        return ar;
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Holds additional event information. {@link Scope.applyToEvent} will be
     * called by the client before an event will be sent.
     */
    var Scope = /** @class */ (function () {
        function Scope() {
            /** Flag if notifiying is happening. */
            this.notifyingListeners = false;
            /** Callback for client to receive scope changes. */
            this.scopeListeners = [];
            /** Callback list that will be called after {@link applyToEvent}. */
            this.eventProcessors = [];
            /** Array of breadcrumbs. */
            this.breadcrumbs = [];
            /** User */
            this.user = {};
            /** Tags */
            this.tags = {};
            /** Extra */
            this.extra = {};
        }
        /** Add internal on change listener. */
        Scope.prototype.addScopeListener = function (callback) {
            this.scopeListeners.push(callback);
        };
        /** Add new event processor that will be called after {@link applyToEvent}. */
        Scope.prototype.addEventProcessor = function (callback) {
            this.eventProcessors.push(callback);
            return this;
        };
        /**
         * This will be called on every set call.
         */
        Scope.prototype.notifyScopeListeners = function () {
            var _this = this;
            if (!this.notifyingListeners) {
                this.notifyingListeners = true;
                setTimeout(function () {
                    _this.scopeListeners.forEach(function (callback) {
                        callback(_this);
                    });
                    _this.notifyingListeners = false;
                }, 0);
            }
        };
        /**
         * This will be called after {@link applyToEvent} is finished.
         */
        Scope.prototype.notifyEventProcessors = function (event, hint) {
            return __awaiter(this, void 0, void 0, function () {
                var e_1, _a, processedEvent, _b, _c, processor, e_2, e_1_1;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            processedEvent = event;
                            _d.label = 1;
                        case 1:
                            _d.trys.push([1, 8, 9, 10]);
                            _b = __values(this.eventProcessors), _c = _b.next();
                            _d.label = 2;
                        case 2:
                            if (!!_c.done) return [3 /*break*/, 7];
                            processor = _c.value;
                            _d.label = 3;
                        case 3:
                            _d.trys.push([3, 5, , 6]);
                            return [4 /*yield*/, processor(__assign({}, processedEvent), hint)];
                        case 4:
                            processedEvent = _d.sent();
                            if (processedEvent === null) {
                                return [2 /*return*/, null];
                            }
                            return [3 /*break*/, 6];
                        case 5:
                            e_2 = _d.sent();
                            return [3 /*break*/, 6];
                        case 6:
                            _c = _b.next();
                            return [3 /*break*/, 2];
                        case 7: return [3 /*break*/, 10];
                        case 8:
                            e_1_1 = _d.sent();
                            e_1 = { error: e_1_1 };
                            return [3 /*break*/, 10];
                        case 9:
                            try {
                                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                            }
                            finally { if (e_1) throw e_1.error; }
                            return [7 /*endfinally*/];
                        case 10: return [2 /*return*/, processedEvent];
                    }
                });
            });
        };
        /**
         * Updates user context information for future events.
         * @param user User context object to merge into current context.
         */
        Scope.prototype.setUser = function (user) {
            this.user = user;
            this.notifyScopeListeners();
            return this;
        };
        /**
         * Updates tags context information for future events.
         * @param tags Tags context object to merge into current context.
         */
        Scope.prototype.setTag = function (key, value) {
            var _a;
            this.tags = __assign({}, this.tags, (_a = {}, _a[key] = value, _a));
            this.notifyScopeListeners();
            return this;
        };
        /**
         * Updates extra context information for future events.
         * @param extra context object to merge into current context.
         */
        Scope.prototype.setExtra = function (key, extra) {
            var _a;
            this.extra = __assign({}, this.extra, (_a = {}, _a[key] = extra, _a));
            this.notifyScopeListeners();
            return this;
        };
        /**
         * Sets the fingerprint on the scope to send with the events.
         * @param fingerprint string[] to group events in Sentry.
         */
        Scope.prototype.setFingerprint = function (fingerprint) {
            this.fingerprint = fingerprint;
            this.notifyScopeListeners();
            return this;
        };
        /**
         * Sets the level on the scope for future events.
         * @param level string {@link Severity}
         */
        Scope.prototype.setLevel = function (level) {
            this.level = level;
            this.notifyScopeListeners();
            return this;
        };
        /**
         * Inherit values from the parent scope.
         * @param scope to clone.
         */
        Scope.clone = function (scope) {
            var newScope = new Scope();
            Object.assign(newScope, scope, {
                scopeListeners: [],
            });
            if (scope) {
                newScope.eventProcessors = __spread(scope.eventProcessors);
            }
            return newScope;
        };
        /** Returns tags. */
        Scope.prototype.getTags = function () {
            return this.tags;
        };
        /** Returns extra. */
        Scope.prototype.getExtra = function () {
            return this.extra;
        };
        /** Returns extra. */
        Scope.prototype.getUser = function () {
            return this.user;
        };
        /** Returns fingerprint. */
        Scope.prototype.getFingerprint = function () {
            return this.fingerprint;
        };
        /** Returns breadcrumbs. */
        Scope.prototype.getBreadcrumbs = function () {
            return this.breadcrumbs;
        };
        /** Returns level. */
        Scope.prototype.getLevel = function () {
            return this.level;
        };
        /** Clears the current scope and resets its properties. */
        Scope.prototype.clear = function () {
            this.breadcrumbs = [];
            this.tags = {};
            this.extra = {};
            this.user = {};
            this.level = undefined;
            this.fingerprint = undefined;
            this.notifyScopeListeners();
        };
        /**
         * Sets the breadcrumbs in the scope
         * @param breadcrumbs Breadcrumb
         * @param maxBreadcrumbs number of max breadcrumbs to merged into event.
         */
        Scope.prototype.addBreadcrumb = function (breadcrumb, maxBreadcrumbs) {
            this.breadcrumbs =
                maxBreadcrumbs !== undefined && maxBreadcrumbs >= 0
                    ? __spread(this.breadcrumbs, [breadcrumb]).slice(-maxBreadcrumbs)
                    : __spread(this.breadcrumbs, [breadcrumb]);
            this.notifyScopeListeners();
        };
        /**
         * Applies the current context and fingerprint to the event.
         * Note that breadcrumbs will be added by the client.
         * Also if the event has already breadcrumbs on it, we do not merge them.
         * @param event SentryEvent
         * @param hint May contain additional informartion about the original exception.
         * @param maxBreadcrumbs number of max breadcrumbs to merged into event.
         */
        Scope.prototype.applyToEvent = function (event, hint, maxBreadcrumbs) {
            return __awaiter(this, void 0, void 0, function () {
                var hasNoBreadcrumbs;
                return __generator(this, function (_a) {
                    if (this.extra && Object.keys(this.extra).length) {
                        event.extra = __assign({}, this.extra, event.extra);
                    }
                    if (this.tags && Object.keys(this.tags).length) {
                        event.tags = __assign({}, this.tags, event.tags);
                    }
                    if (this.user && Object.keys(this.user).length) {
                        event.user = __assign({}, this.user, event.user);
                    }
                    if (this.fingerprint && event.fingerprint === undefined) {
                        event.fingerprint = this.fingerprint;
                    }
                    hasNoBreadcrumbs = !event.breadcrumbs || event.breadcrumbs.length === 0;
                    if (hasNoBreadcrumbs && this.breadcrumbs.length > 0) {
                        event.breadcrumbs =
                            maxBreadcrumbs !== undefined && maxBreadcrumbs >= 0
                                ? this.breadcrumbs.slice(-maxBreadcrumbs)
                                : this.breadcrumbs;
                    }
                    return [2 /*return*/, this.notifyEventProcessors(event, hint)];
                });
            });
        };
        return Scope;
    }());
    exports.Scope = Scope;

    });

    unwrapExports(scope);
    var scope_1 = scope.Scope;

    var hub = createCommonjsModule(function (module, exports) {
    var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
        __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    var __read = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var __spread = (commonjsGlobal && commonjsGlobal.__spread) || function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
        return ar;
    };
    Object.defineProperty(exports, "__esModule", { value: true });


    /**
     * API compatibility version of this hub.
     *
     * WARNING: This number should only be incresed when the global interface
     * changes a and new methods are introduced.
     */
    exports.API_VERSION = 3;
    /**
     * Internal class used to make sure we always have the latest internal functions
     * working in case we have a version conflict.
     */
    var Hub = /** @class */ (function () {
        /**
         * Creates a new instance of the hub, will push one {@link Layer} into the
         * internal stack on creation.
         *
         * @param client bound to the hub.
         * @param scope bound to the hub.
         * @param version number, higher number means higher priority.
         */
        function Hub(client, scope$$1, version) {
            if (scope$$1 === void 0) { scope$$1 = new scope.Scope(); }
            if (version === void 0) { version = exports.API_VERSION; }
            this.version = version;
            /** Is a {@link Layer}[] containing the client and scope */
            this.stack = [];
            this.stack.push({ client: client, scope: scope$$1 });
        }
        /**
         * Internal helper function to call a method on the top client if it exists.
         *
         * @param method The method to call on the client/client.
         * @param args Arguments to pass to the client/frontend.
         */
        Hub.prototype.invokeClient = function (method) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var _a;
            var top = this.getStackTop();
            if (top && top.client && top.client[method]) {
                (_a = top.client)[method].apply(_a, __spread(args, [top.scope]));
            }
        };
        /**
         * Internal helper function to call an async method on the top client if it
         * exists.
         *
         * @param method The method to call on the client/client.
         * @param args Arguments to pass to the client/frontend.
         */
        Hub.prototype.invokeClientAsync = function (method) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            var _a;
            var top = this.getStackTop();
            if (top && top.client && top.client[method]) {
                (_a = top.client)[method].apply(_a, __spread(args, [top.scope])).catch(function (err) {
                    console.error(err);
                });
            }
        };
        /**
         * Checks if this hub's version is older than the given version.
         *
         * @param version A version number to compare to.
         * @return True if the given version is newer; otherwise false.
         */
        Hub.prototype.isOlderThan = function (version) {
            return this.version < version;
        };
        /**
         * This binds the given client to the current scope.
         * @param client An SDK client (client) instance.
         */
        Hub.prototype.bindClient = function (client) {
            var top = this.getStackTop();
            top.client = client;
            if (top && top.scope && client) {
                top.scope.addScopeListener(function (s) {
                    if (client.getBackend) {
                        try {
                            client.getBackend().storeScope(s);
                        }
                        catch (_a) {
                            // Do nothing
                        }
                    }
                });
            }
        };
        /**
         * Create a new scope to store context information.
         *
         * The scope will be layered on top of the current one. It is isolated, i.e. all
         * breadcrumbs and context information added to this scope will be removed once
         * the scope ends. Be sure to always remove this scope with {@link this.popScope}
         * when the operation finishes or throws.
         *
         * @returns Scope, the new cloned scope
         */
        Hub.prototype.pushScope = function () {
            // We want to clone the content of prev scope
            var stack = this.getStack();
            var parentScope = stack.length > 0 ? stack[stack.length - 1].scope : undefined;
            var scope$$1 = scope.Scope.clone(parentScope);
            this.getStack().push({
                client: this.getClient(),
                scope: scope$$1,
            });
            return scope$$1;
        };
        /**
         * Removes a previously pushed scope from the stack.
         *
         * This restores the state before the scope was pushed. All breadcrumbs and
         * context information added since the last call to {@link this.pushScope} are
         * discarded.
         */
        Hub.prototype.popScope = function () {
            return this.getStack().pop() !== undefined;
        };
        /**
         * Creates a new scope with and executes the given operation within.
         * The scope is automatically removed once the operation
         * finishes or throws.
         *
         * This is essentially a convenience function for:
         *
         *     pushScope();
         *     callback();
         *     popScope();
         *
         * @param callback that will be enclosed into push/popScope.
         */
        Hub.prototype.withScope = function (callback) {
            var scope$$1 = this.pushScope();
            try {
                callback(scope$$1);
            }
            finally {
                this.popScope();
            }
        };
        /** Returns the client of the top stack. */
        Hub.prototype.getClient = function () {
            return this.getStackTop().client;
        };
        /** Returns the scope of the top stack. */
        Hub.prototype.getScope = function () {
            return this.getStackTop().scope;
        };
        /** Returns the scope stack for domains or the process. */
        Hub.prototype.getStack = function () {
            return this.stack;
        };
        /** Returns the topmost scope layer in the order domain > local > process. */
        Hub.prototype.getStackTop = function () {
            return this.stack[this.stack.length - 1];
        };
        /**
         * Captures an exception event and sends it to Sentry.
         *
         * @param exception An exception-like object.
         * @param hint May contain additional information about the original exception.
         * @returns The generated eventId.
         */
        Hub.prototype.captureException = function (exception, hint) {
            var eventId = (this._lastEventId = misc.uuid4());
            this.invokeClientAsync('captureException', exception, __assign({}, hint, { event_id: eventId }));
            return eventId;
        };
        /**
         * Captures a message event and sends it to Sentry.
         *
         * @param message The message to send to Sentry.
         * @param level Define the level of the message.
         * @param hint May contain additional information about the original exception.
         * @returns The generated eventId.
         */
        Hub.prototype.captureMessage = function (message, level, hint) {
            var eventId = (this._lastEventId = misc.uuid4());
            this.invokeClientAsync('captureMessage', message, level, __assign({}, hint, { event_id: eventId }));
            return eventId;
        };
        /**
         * Captures a manually created event and sends it to Sentry.
         *
         * @param event The event to send to Sentry.
         * @param hint May contain additional information about the original exception.
         */
        Hub.prototype.captureEvent = function (event, hint) {
            var eventId = (this._lastEventId = misc.uuid4());
            this.invokeClientAsync('captureEvent', event, __assign({}, hint, { event_id: eventId }));
            return eventId;
        };
        /**
         * This is the getter for lastEventId.
         *
         * @returns The last event id of a captured event.
         */
        Hub.prototype.lastEventId = function () {
            return this._lastEventId;
        };
        /**
         * Records a new breadcrumb which will be attached to future events.
         *
         * Breadcrumbs will be added to subsequent events to provide more context on
         * user's actions prior to an error or crash.
         *
         * @param breadcrumb The breadcrumb to record.
         * @param hint May contain additional information about the original breadcrumb.
         */
        Hub.prototype.addBreadcrumb = function (breadcrumb, hint) {
            this.invokeClient('addBreadcrumb', breadcrumb, __assign({}, hint));
        };
        /**
         * Callback to set context information onto the scope.
         *
         * @param callback Callback function that receives Scope.
         */
        Hub.prototype.configureScope = function (callback) {
            var top = this.getStackTop();
            if (top.scope && top.client) {
                // TODO: freeze flag
                callback(top.scope);
            }
        };
        return Hub;
    }());
    exports.Hub = Hub;

    });

    unwrapExports(hub);
    var hub_1 = hub.API_VERSION;
    var hub_2 = hub.Hub;

    var global$1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });


    /** Returns the global shim registry. */
    function getMainCarrier() {
        var carrier = misc.getGlobalObject();
        carrier.__SENTRY__ = carrier.__SENTRY__ || {
            hub: undefined,
        };
        return carrier.__SENTRY__;
    }
    exports.getMainCarrier = getMainCarrier;
    /**
     * Returns the default hub instance.
     *
     * If a hub is already registered in the global carrier but this module
     * contains a more recent version, it replaces the registered version.
     * Otherwise, the currently registered hub will be returned.
     */
    function getCurrentHub() {
        var registry = getMainCarrier();
        if (!registry.hub || registry.hub.isOlderThan(hub.API_VERSION)) {
            registry.hub = new hub.Hub();
        }
        return registry.hub;
    }
    exports.getCurrentHub = getCurrentHub;
    /**
     * This will create a new {@link Hub} and add to the passed object on
     * __SENTRY__.hub.
     * @param carrier object
     */
    function getHubFromCarrier(carrier) {
        if (carrier && carrier.__SENTRY__ && carrier.__SENTRY__.hub) {
            return carrier.__SENTRY__.hub;
        }
        else {
            carrier.__SENTRY__ = {};
            carrier.__SENTRY__.hub = new hub.Hub();
            return carrier.__SENTRY__.hub;
        }
    }
    exports.getHubFromCarrier = getHubFromCarrier;

    });

    unwrapExports(global$1);
    var global_1 = global$1.getMainCarrier;
    var global_2 = global$1.getCurrentHub;
    var global_3 = global$1.getHubFromCarrier;

    var dist$1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });

    exports.Scope = scope.Scope;

    exports.Hub = hub.Hub;

    exports.getCurrentHub = global$1.getCurrentHub;
    exports.getHubFromCarrier = global$1.getHubFromCarrier;

    });

    unwrapExports(dist$1);
    var dist_1$1 = dist$1.Scope;
    var dist_2$1 = dist$1.Hub;
    var dist_3 = dist$1.getCurrentHub;
    var dist_4 = dist$1.getHubFromCarrier;

    var dist$2 = createCommonjsModule(function (module, exports) {
    var __read = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var __spread = (commonjsGlobal && commonjsGlobal.__spread) || function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
        return ar;
    };
    Object.defineProperty(exports, "__esModule", { value: true });

    /**
     * This calls a function on the current hub.
     * @param method function to call on hub.
     * @param args to pass to function.
     */
    function callOnHub(method) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var hub = dist$1.getCurrentHub();
        if (hub && hub[method]) {
            // tslint:disable-next-line:no-unsafe-any
            return hub[method].apply(hub, __spread(args));
        }
        throw new Error("No hub defined or " + method + " was not found on the hub, please open a bug report.");
    }
    /**
     * Captures an exception event and sends it to Sentry.
     *
     * @param exception An exception-like object.
     * @returns The generated eventId.
     */
    function captureException(exception) {
        var syntheticException;
        try {
            throw new Error('Sentry syntheticException');
        }
        catch (exception) {
            syntheticException = exception;
        }
        return callOnHub('captureException', exception, {
            originalException: exception,
            syntheticException: syntheticException,
        });
    }
    exports.captureException = captureException;
    /**
     * Captures a message event and sends it to Sentry.
     *
     * @param message The message to send to Sentry.
     * @param level Define the level of the message.
     * @returns The generated eventId.
     */
    function captureMessage(message, level) {
        var syntheticException;
        try {
            throw new Error(message);
        }
        catch (exception) {
            syntheticException = exception;
        }
        return callOnHub('captureMessage', message, level, {
            originalException: message,
            syntheticException: syntheticException,
        });
    }
    exports.captureMessage = captureMessage;
    /**
     * Captures a manually created event and sends it to Sentry.
     *
     * @param event The event to send to Sentry.
     * @returns The generated eventId.
     */
    function captureEvent(event) {
        return callOnHub('captureEvent', event);
    }
    exports.captureEvent = captureEvent;
    /**
     * Records a new breadcrumb which will be attached to future events.
     *
     * Breadcrumbs will be added to subsequent events to provide more context on
     * user's actions prior to an error or crash.
     *
     * @param breadcrumb The breadcrumb to record.
     */
    function addBreadcrumb(breadcrumb) {
        callOnHub('addBreadcrumb', breadcrumb);
    }
    exports.addBreadcrumb = addBreadcrumb;
    /**
     * Callback to set context information onto the scope.
     * @param callback Callback function that receives Scope.
     */
    function configureScope(callback) {
        callOnHub('configureScope', callback);
    }
    exports.configureScope = configureScope;
    /**
     * Creates a new scope with and executes the given operation within.
     * The scope is automatically removed once the operation
     * finishes or throws.
     *
     * This is essentially a convenience function for:
     *
     *     pushScope();
     *     callback();
     *     popScope();
     *
     * @param callback that will be enclosed into push/popScope.
     */
    function withScope(callback) {
        callOnHub('withScope', callback);
    }
    exports.withScope = withScope;
    /**
     * Calls a function on the latest client. Use this with caution, it's meant as
     * in "internal" helper so we don't need to expose every possible function in
     * the shim. It is not guaranteed that the client actually implements the
     * function.
     *
     * @param method The method to call on the client/client.
     * @param args Arguments to pass to the client/fontend.
     */
    function _callOnClient(method) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        callOnHub.apply(void 0, __spread(['invokeClient', method], args));
    }
    exports._callOnClient = _callOnClient;

    });

    unwrapExports(dist$2);
    var dist_1$2 = dist$2.captureException;
    var dist_2$2 = dist$2.captureMessage;
    var dist_3$1 = dist$2.captureEvent;
    var dist_4$1 = dist$2.addBreadcrumb;
    var dist_5 = dist$2.configureScope;
    var dist_6 = dist$2.withScope;
    var dist_7 = dist$2._callOnClient;

    var object = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });

    /**
     * Transforms Error object into an object literal with all it's attributes
     * attached to it.
     *
     * Based on: https://github.com/ftlabs/js-abbreviate/blob/fa709e5f139e7770a71827b1893f22418097fbda/index.js#L95-L106
     *
     * @param error An Error containing all relevant information
     * @returns An object with all error properties
     */
    function objectifyError(error) {
        // These properties are implemented as magical getters and don't show up in `for-in` loop
        var err = {
            message: error.message,
            name: error.name,
            stack: error.stack,
        };
        for (var i in error) {
            if (Object.prototype.hasOwnProperty.call(error, i)) {
                err[i] = error[i];
            }
        }
        return err;
    }
    var NAN_VALUE = '[NaN]';
    var UNDEFINED_VALUE = '[undefined]';
    /**
     * Serializer function used as 2nd argument to JSON.serialize in `serialize()` util function.
     */
    function serializer() {
        var stack = [];
        var keys = [];
        var cycleReplacer = function (_, value) {
            if (stack[0] === value) {
                return '[Circular ~]';
            }
            return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join('.') + "]";
        };
        return function (key, value) {
            var currentValue = value;
            // NaN and undefined are not JSON.parseable, but we want to preserve this information
            // tslint:disable-next-line:no-unsafe-any
            if (Number.isNaN(value)) {
                currentValue = NAN_VALUE;
            }
            else if (is.isUndefined(value)) {
                currentValue = UNDEFINED_VALUE;
            }
            if (stack.length > 0) {
                var thisPos = stack.indexOf(this);
                if (thisPos !== -1) {
                    stack.splice(thisPos + 1);
                    keys.splice(thisPos, Infinity, key);
                }
                else {
                    stack.push(this);
                    keys.push(key);
                }
                if (stack.indexOf(currentValue) !== -1) {
                    currentValue = cycleReplacer.call(this, key, currentValue);
                }
            }
            else {
                stack.push(currentValue);
            }
            return currentValue instanceof Error ? objectifyError(currentValue) : currentValue;
        };
    }
    /**
     * Reviver function used as 2nd argument to JSON.parse in `deserialize()` util function.
     */
    function reviver(_key, value) {
        // NaN and undefined are not JSON.parseable, but we want to preserve this information
        if (value === NAN_VALUE) {
            return NaN;
        }
        if (value === UNDEFINED_VALUE) {
            return undefined;
        }
        return value;
    }
    /**
     * Serializes the given object into a string.
     * Like JSON.stringify, but doesn't throw on circular references.
     * Based on a `json-stringify-safe` package and modified to handle Errors serialization.
     *
     * The object must be serializable, i.e.:
     *  - Only primitive types are allowed (object, array, number, string, boolean)
     *  - Its depth should be considerably low for performance reasons
     *
     * @param object A JSON-serializable object.
     * @returns A string containing the serialized object.
     */
    function serialize(object) {
        return JSON.stringify(object, serializer());
    }
    exports.serialize = serialize;
    /**
     * Deserializes an object from a string previously serialized with
     * {@link serialize}.
     *
     * @param str A serialized object.
     * @returns The deserialized object.
     */
    function deserialize(str) {
        return JSON.parse(str, reviver);
    }
    exports.deserialize = deserialize;
    /**
     * Creates a deep copy of the given object.
     *
     * The object must be serializable, i.e.:
     *  - It must not contain any cycles
     *  - Only primitive types are allowed (object, array, number, string, boolean)
     *  - Its depth should be considerably low for performance reasons
     *
     * @param object A JSON-serializable object.
     * @returns The object clone.
     */
    function clone(object) {
        return deserialize(serialize(object));
    }
    exports.clone = clone;
    /**
     * Wrap a given object method with a higher-order function
     *
     * @param source An object that contains a method to be wrapped.
     * @param name A name of method to be wrapped.
     * @param replacement A function that should be used to wrap a given method.
     * @returns void
     */
    function fill(source, name, replacement) {
        if (!(name in source)) {
            return;
        }
        var original = source[name];
        var wrapped = replacement(original);
        wrapped.__sentry__ = true;
        wrapped.__sentry_original__ = original;
        wrapped.__sentry_wrapped__ = wrapped;
        source[name] = wrapped;
    }
    exports.fill = fill;
    /**
     * Encodes given object into url-friendly format
     *
     * @param object An object that contains serializable values
     * @returns string Encoded
     */
    function urlEncode(object) {
        return Object.keys(object)
            .map(
        // tslint:disable-next-line:no-unsafe-any
        function (key) { return encodeURIComponent(key) + "=" + encodeURIComponent(object[key]); })
            .join('&');
    }
    exports.urlEncode = urlEncode;
    // Default Node.js REPL depth
    var MAX_SERIALIZE_EXCEPTION_DEPTH = 3;
    // TODO: Or is it 200kb? 🤔 — Kamil
    // NOTE: Yes, it is
    // 50kB, as 100kB is max payload size, so half sounds reasonable
    var MAX_SERIALIZE_EXCEPTION_SIZE = 50 * 1024;
    var MAX_SERIALIZE_KEYS_LENGTH = 40;
    /** JSDoc */
    function utf8Length(value) {
        // tslint:disable-next-line:no-bitwise
        return ~-encodeURI(value).split(/%..|./).length;
    }
    /** JSDoc */
    function jsonSize(value) {
        return utf8Length(JSON.stringify(value));
    }
    /** JSDoc */
    function serializeValue(value) {
        var maxLength = 40;
        if (typeof value === 'string') {
            return value.length <= maxLength ? value : value.substr(0, maxLength - 1) + "\u2026";
        }
        else if (typeof value === 'number' || typeof value === 'boolean' || typeof value === 'undefined') {
            return value;
        }
        else if (Number.isNaN(value)) {
            // NaN and undefined are not JSON.parseable, but we want to preserve this information
            return '[NaN]';
        }
        else if (is.isUndefined(value)) {
            return '[undefined]';
        }
        var type = Object.prototype.toString.call(value);
        // Node.js REPL notation
        if (type === '[object Object]') {
            return '[Object]';
        }
        if (type === '[object Array]') {
            return '[Array]';
        }
        if (type === '[object Function]') {
            var name_1 = value.name;
            return name_1 ? "[Function: " + name_1 + "]" : '[Function]';
        }
        return value;
    }
    /** JSDoc */
    function serializeObject(value, depth) {
        if (depth === 0) {
            return serializeValue(value);
        }
        if (is.isPlainObject(value)) {
            var serialized_1 = {};
            var val_1 = value;
            Object.keys(val_1).forEach(function (key) {
                serialized_1[key] = serializeObject(val_1[key], depth - 1);
            });
            return serialized_1;
        }
        else if (Array.isArray(value)) {
            var val = value;
            return val.map(function (v) { return serializeObject(v, depth - 1); });
        }
        return serializeValue(value);
    }
    /** JSDoc */
    function limitObjectDepthToSize(object, depth, maxSize) {
        if (depth === void 0) { depth = MAX_SERIALIZE_EXCEPTION_DEPTH; }
        if (maxSize === void 0) { maxSize = MAX_SERIALIZE_EXCEPTION_SIZE; }
        var serialized = serializeObject(object, depth);
        if (jsonSize(serialize(serialized)) > maxSize) {
            return limitObjectDepthToSize(object, depth - 1);
        }
        return serialized;
    }
    exports.limitObjectDepthToSize = limitObjectDepthToSize;
    /** JSDoc */
    function serializeKeysToEventMessage(keys, maxLength) {
        if (maxLength === void 0) { maxLength = MAX_SERIALIZE_KEYS_LENGTH; }
        if (!keys.length) {
            return '[object has no keys]';
        }
        if (keys[0].length >= maxLength) {
            return keys[0];
        }
        for (var includedKeys = keys.length; includedKeys > 0; includedKeys--) {
            var serialized = keys.slice(0, includedKeys).join(', ');
            if (serialized.length > maxLength) {
                continue;
            }
            if (includedKeys === keys.length) {
                return serialized;
            }
            return serialized + "\u2026";
        }
        return '';
    }
    exports.serializeKeysToEventMessage = serializeKeysToEventMessage;

    });

    unwrapExports(object);
    var object_1 = object.serialize;
    var object_2 = object.deserialize;
    var object_3 = object.clone;
    var object_4 = object.fill;
    var object_5 = object.urlEncode;
    var object_6 = object.limitObjectDepthToSize;
    var object_7 = object.serializeKeysToEventMessage;

    var error = createCommonjsModule(function (module, exports) {
    var __extends = (commonjsGlobal && commonjsGlobal.__extends) || (function () {
        var extendStatics = function (d, b) {
            extendStatics = Object.setPrototypeOf ||
                ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
                function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
            return extendStatics(d, b);
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() { this.constructor = d; }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    })();
    Object.defineProperty(exports, "__esModule", { value: true });
    /** An error emitted by Sentry SDKs and related utilities. */
    var SentryError = /** @class */ (function (_super) {
        __extends(SentryError, _super);
        function SentryError(message) {
            var _newTarget = this.constructor;
            var _this = _super.call(this, message) || this;
            _this.message = message;
            // tslint:disable:no-unsafe-any
            _this.name = _newTarget.prototype.constructor.name;
            Object.setPrototypeOf(_this, _newTarget.prototype);
            return _this;
        }
        return SentryError;
    }(Error));
    exports.SentryError = SentryError;

    });

    unwrapExports(error);
    var error_1 = error.SentryError;

    var dsn = createCommonjsModule(function (module, exports) {
    var __read = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error$$1) { e = { error: error$$1 }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var __values = (commonjsGlobal && commonjsGlobal.__values) || function (o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    };
    Object.defineProperty(exports, "__esModule", { value: true });

    /** Regular expression used to parse a Dsn. */
    var DSN_REGEX = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+))?@)([\w\.-]+)(?::(\d+))?\/(.+)/;
    /** The Sentry Dsn, identifying a Sentry instance and project. */
    var Dsn = /** @class */ (function () {
        /** Creates a new Dsn component */
        function Dsn(from) {
            if (typeof from === 'string') {
                this.fromString(from);
            }
            else {
                this.fromComponents(from);
            }
            this.validate();
        }
        /**
         * Renders the string representation of this Dsn.
         *
         * By default, this will render the public representation without the password
         * component. To get the deprecated private representation, set `withPassword`
         * to true.
         *
         * @param withPassword When set to true, the password will be included.
         */
        Dsn.prototype.toString = function (withPassword) {
            if (withPassword === void 0) { withPassword = false; }
            // tslint:disable-next-line:no-this-assignment
            var _a = this, host = _a.host, path = _a.path, pass = _a.pass, port = _a.port, projectId = _a.projectId, protocol = _a.protocol, user = _a.user;
            return (protocol + "://" + user + (withPassword && pass ? ":" + pass : '') +
                ("@" + host + (port ? ":" + port : '') + "/" + (path ? path + "/" : path) + projectId));
        };
        /** Parses a string into this Dsn. */
        Dsn.prototype.fromString = function (str) {
            var match = DSN_REGEX.exec(str);
            if (!match) {
                throw new error.SentryError('Invalid Dsn');
            }
            var _a = __read(match.slice(1), 6), protocol = _a[0], user = _a[1], _b = _a[2], pass = _b === void 0 ? '' : _b, host = _a[3], _c = _a[4], port = _c === void 0 ? '' : _c, lastPath = _a[5];
            var path = '';
            var projectId = lastPath;
            var split = projectId.split('/');
            if (split.length > 1) {
                path = split.slice(0, -1).join('/');
                projectId = split.pop();
            }
            Object.assign(this, { host: host, pass: pass, path: path, projectId: projectId, port: port, protocol: protocol, user: user });
        };
        /** Maps Dsn components into this instance. */
        Dsn.prototype.fromComponents = function (components) {
            this.protocol = components.protocol;
            this.user = components.user;
            this.pass = components.pass || '';
            this.host = components.host;
            this.port = components.port || '';
            this.path = components.path || '';
            this.projectId = components.projectId;
        };
        /** Validates this Dsn and throws on error. */
        Dsn.prototype.validate = function () {
            var e_1, _a;
            try {
                for (var _b = __values(['protocol', 'user', 'host', 'projectId']), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var component = _c.value;
                    if (!this[component]) {
                        throw new error.SentryError("Invalid Dsn: Missing " + component);
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (this.protocol !== 'http' && this.protocol !== 'https') {
                throw new error.SentryError("Invalid Dsn: Unsupported protocol \"" + this.protocol + "\"");
            }
            if (this.port && isNaN(parseInt(this.port, 10))) {
                throw new error.SentryError("Invalid Dsn: Invalid port number \"" + this.port + "\"");
            }
        };
        return Dsn;
    }());
    exports.Dsn = Dsn;

    });

    unwrapExports(dsn);
    var dsn_1 = dsn.Dsn;

    var api = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });


    var SENTRY_API_VERSION = '7';
    /** Helper class to provide urls to different Sentry endpoints. */
    var API = /** @class */ (function () {
        /** Create a new instance of API */
        function API(dsn$$1) {
            this.dsn = dsn$$1;
            this.dsnObject = new dsn.Dsn(dsn$$1);
        }
        /** Returns the Dsn object. */
        API.prototype.getDsn = function () {
            return this.dsnObject;
        };
        /** Returns a string with auth headers in the url to the store endpoint. */
        API.prototype.getStoreEndpoint = function () {
            return "" + this.getBaseUrl() + this.getStoreEndpointPath();
        };
        /** Returns the store endpoint with auth added in url encoded. */
        API.prototype.getStoreEndpointWithUrlEncodedAuth = function () {
            var dsn$$1 = this.dsnObject;
            var auth = {
                sentry_key: dsn$$1.user,
                sentry_version: SENTRY_API_VERSION,
            };
            // Auth is intentionally sent as part of query string (NOT as custom HTTP header)
            // to avoid preflight CORS requests
            return this.getStoreEndpoint() + "?" + object.urlEncode(auth);
        };
        /** Returns the base path of the url including the port. */
        API.prototype.getBaseUrl = function () {
            var dsn$$1 = this.dsnObject;
            var protocol = dsn$$1.protocol ? dsn$$1.protocol + ":" : '';
            var port = dsn$$1.port ? ":" + dsn$$1.port : '';
            return protocol + "//" + dsn$$1.host + port;
        };
        /** Returns only the path component for the store endpoint. */
        API.prototype.getStoreEndpointPath = function () {
            var dsn$$1 = this.dsnObject;
            return (dsn$$1.path ? "/" + dsn$$1.path : '') + "/api/" + dsn$$1.projectId + "/store/";
        };
        /** Returns an object that can be used in request headers. */
        API.prototype.getRequestHeaders = function (clientName, clientVersion) {
            var dsn$$1 = this.dsnObject;
            var header = ["Sentry sentry_version=" + SENTRY_API_VERSION];
            header.push("sentry_timestamp=" + new Date().getTime());
            header.push("sentry_client=" + clientName + "/" + clientVersion);
            header.push("sentry_key=" + dsn$$1.user);
            return {
                'Content-Type': 'application/json',
                'X-Sentry-Auth': header.join(', '),
            };
        };
        /** Returns the url to the report dialog endpoint. */
        API.prototype.getReportDialogEndpoint = function (dialogOptions) {
            if (dialogOptions === void 0) { dialogOptions = {}; }
            var dsn$$1 = this.dsnObject;
            var endpoint = "" + this.getBaseUrl() + (dsn$$1.path ? "/" + dsn$$1.path : '') + "/api/embed/error-page/";
            var encodedOptions = [];
            encodedOptions.push("dsn=" + dsn$$1.toString());
            for (var key in dialogOptions) {
                if (key === 'user') {
                    if (!dialogOptions.user) {
                        continue;
                    }
                    if (dialogOptions.user.name) {
                        encodedOptions.push("name=" + encodeURIComponent(dialogOptions.user.name));
                    }
                    if (dialogOptions.user.email) {
                        encodedOptions.push("email=" + encodeURIComponent(dialogOptions.user.email));
                    }
                }
                else {
                    encodedOptions.push(encodeURIComponent(key) + "=" + encodeURIComponent(dialogOptions[key]));
                }
            }
            if (encodedOptions.length) {
                return endpoint + "?" + encodedOptions.join('&');
            }
            return endpoint;
        };
        return API;
    }());
    exports.API = API;

    });

    unwrapExports(api);
    var api_1 = api.API;

    var async = createCommonjsModule(function (module, exports) {
    var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Consumes the promise and logs the error when it rejects.
     * @param promise A promise to forget.
     */
    function forget(promise) {
        promise.catch(function (e) {
            // TODO: Use a better logging mechanism
            console.error(e);
        });
    }
    exports.forget = forget;
    /**
     * Helper to filter an array with asynchronous callbacks.
     *
     * @param array An array containing items to filter.
     * @param predicate An async predicate evaluated on every item.
     * @param thisArg Optional value passed as "this" into the callback.
     * @returns An array containing only values where the callback returned true.
     */
    function filterAsync(array, predicate, thisArg) {
        return __awaiter(this, void 0, void 0, function () {
            var verdicts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(array.map(predicate, thisArg))];
                    case 1:
                        verdicts = _a.sent();
                        return [2 /*return*/, array.filter(function (_, index) { return verdicts[index]; })];
                }
            });
        });
    }
    exports.filterAsync = filterAsync;

    });

    unwrapExports(async);
    var async_1 = async.forget;
    var async_2 = async.filterAsync;

    var string = createCommonjsModule(function (module, exports) {
    /**
     * Encodes given object into url-friendly format
     *
     * @param str An object that contains serializable values
     * @param max Maximum number of characters in truncated string
     * @returns string Encoded
     */
    var __values = (commonjsGlobal && commonjsGlobal.__values) || function (o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    function truncate(str, max) {
        if (max === 0) {
            return str;
        }
        return str.length <= max ? str : str.substr(0, max) + "\u2026";
    }
    exports.truncate = truncate;
    /**
     * This is basically just `trim_line` from
     * https://github.com/getsentry/sentry/blob/master/src/sentry/lang/javascript/processor.py#L67
     *
     * @param str An object that contains serializable values
     * @param max Maximum number of characters in truncated string
     * @returns string Encoded
     */
    function snipLine(line, colno) {
        var newLine = line;
        var ll = newLine.length;
        if (ll <= 150) {
            return newLine;
        }
        if (colno > ll) {
            colno = ll; // tslint:disable-line:no-parameter-reassignment
        }
        var start = Math.max(colno - 60, 0);
        if (start < 5) {
            start = 0;
        }
        var end = Math.min(start + 140, ll);
        if (end > ll - 5) {
            end = ll;
        }
        if (end === ll) {
            start = Math.max(end - 140, 0);
        }
        newLine = newLine.slice(start, end);
        if (start > 0) {
            newLine = "'{snip} " + newLine;
        }
        if (end < ll) {
            newLine += ' {snip}';
        }
        return newLine;
    }
    exports.snipLine = snipLine;
    /**
     * Join values in array
     * @param input array of values to be joined together
     * @param delimiter string to be placed in-between values
     * @returns Joined values
     */
    function safeJoin(input, delimiter) {
        var e_1, _a;
        if (!Array.isArray(input)) {
            return '';
        }
        var output = [];
        try {
            for (var input_1 = __values(input), input_1_1 = input_1.next(); !input_1_1.done; input_1_1 = input_1.next()) {
                var value = input_1_1.value;
                try {
                    output.push(String(value));
                }
                catch (e) {
                    output.push('[value cannot be serialized]');
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (input_1_1 && !input_1_1.done && (_a = input_1.return)) _a.call(input_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return output.join(delimiter);
    }
    exports.safeJoin = safeJoin;

    });

    unwrapExports(string);
    var string_1 = string.truncate;
    var string_2 = string.snipLine;
    var string_3 = string.safeJoin;

    var baseclient = createCommonjsModule(function (module, exports) {
    var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
        __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    Object.defineProperty(exports, "__esModule", { value: true });





    /** JSDoc */
    function beforeBreadcrumbConsoleLoopGuard(callback) {
        return __awaiter(this, void 0, void 0, function () {
            var global, levels, originalConsole, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        global = misc.getGlobalObject();
                        levels = ['debug', 'info', 'warn', 'error', 'log'];
                        if (!('console' in global)) {
                            return [2 /*return*/, callback()];
                        }
                        originalConsole = global.console;
                        // Restore all wrapped console methods
                        levels.forEach(function (level) {
                            if (level in global.console && originalConsole[level].__sentry__) {
                                originalConsole[level] = originalConsole[level].__sentry_original__;
                            }
                        });
                        return [4 /*yield*/, callback()];
                    case 1:
                        result = _a.sent();
                        // Revert restoration to wrapped state
                        levels.forEach(function (level) {
                            if (level in global.console && originalConsole[level].__sentry__) {
                                originalConsole[level] = originalConsole[level].__sentry_wrapped__;
                            }
                        });
                        return [2 /*return*/, result];
                }
            });
        });
    }
    /**
     * Default maximum number of breadcrumbs added to an event. Can be overwritten
     * with {@link Options.maxBreadcrumbs}.
     */
    var DEFAULT_BREADCRUMBS = 30;
    /**
     * Absolute maximum number of breadcrumbs added to an event. The
     * `maxBreadcrumbs` option cannot be higher than this value.
     */
    var MAX_BREADCRUMBS = 100;
    /**
     * By default, truncates URL values to 250 chars
     */
    var MAX_URL_LENGTH = 250;
    /**
     * Base implementation for all JavaScript SDK clients.
     *
     * Call the constructor with the corresponding backend constructor and options
     * specific to the client subclass. To access these options later, use
     * {@link Client.getOptions}. Also, the Backend instance is available via
     * {@link Client.getBackend}.
     *
     * If a Dsn is specified in the options, it will be parsed and stored. Use
     * {@link Client.getDsn} to retrieve the Dsn at any moment. In case the Dsn is
     * invalid, the constructor will throw a {@link SentryException}. Note that
     * without a valid Dsn, the SDK will not send any events to Sentry.
     *
     * Before sending an event via the backend, it is passed through
     * {@link BaseClient.prepareEvent} to add SDK information and scope data
     * (breadcrumbs and context). To add more custom information, override this
     * method and extend the resulting prepared event.
     *
     * To issue automatically created events (e.g. via instrumentation), use
     * {@link Client.captureEvent}. It will prepare the event and pass it through
     * the callback lifecycle. To issue auto-breadcrumbs, use
     * {@link Client.addBreadcrumb}.
     *
     * @example
     * class NodeClient extends BaseClient<NodeBackend, NodeOptions> {
     *   public constructor(options: NodeOptions) {
     *     super(NodeBackend, options);
     *   }
     *
     *   // ...
     * }
     */
    var BaseClient = /** @class */ (function () {
        /**
         * Initializes this client instance.
         *
         * @param backendClass A constructor function to create the backend.
         * @param options Options for the client.
         */
        function BaseClient(backendClass, options) {
            this.backend = new backendClass(options);
            this.options = options;
            if (options.dsn) {
                this.dsn = new dsn.Dsn(options.dsn);
            }
        }
        /**
         * @inheritDoc
         */
        BaseClient.prototype.install = function () {
            if (!this.isEnabled()) {
                return (this.installed = false);
            }
            var backend = this.getBackend();
            if (!this.installed && backend.install) {
                backend.install();
            }
            return (this.installed = true);
        };
        /**
         * Internal helper function to buffer promises.
         *
         * @param promise Any promise, but in this case Promise<SentryResponse>.
         */
        BaseClient.prototype.buffer = function (promise) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.getBackend()
                            .getBuffer()
                            .add(promise)];
                });
            });
        };
        /**
         * @inheritDoc
         */
        BaseClient.prototype.captureException = function (exception, hint, scope) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.buffer((function () { return __awaiter(_this, void 0, void 0, function () {
                            var event;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.getBackend().eventFromException(exception, hint)];
                                    case 1:
                                        event = _a.sent();
                                        return [2 /*return*/, this.captureEvent(event, hint, scope)];
                                }
                            });
                        }); })())];
                });
            });
        };
        /**
         * @inheritDoc
         */
        BaseClient.prototype.captureMessage = function (message, level, hint, scope) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.buffer((function () { return __awaiter(_this, void 0, void 0, function () {
                            var event;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.getBackend().eventFromMessage(message, level, hint)];
                                    case 1:
                                        event = _a.sent();
                                        return [2 /*return*/, this.captureEvent(event, hint, scope)];
                                }
                            });
                        }); })())];
                });
            });
        };
        /**
         * @inheritDoc
         */
        BaseClient.prototype.captureEvent = function (event, hint, scope) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    // Adding this here is technically not correct since if you call captureMessage/captureException it's already
                    // buffered. But since we not really need the count and we only need to know if the buffer is full or not,
                    // This is fine...
                    return [2 /*return*/, this.buffer((function () { return __awaiter(_this, void 0, void 0, function () {
                            var _this = this;
                            return __generator(this, function (_a) {
                                return [2 /*return*/, this.processEvent(event, function (finalEvent) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                                        return [2 /*return*/, this.getBackend().sendEvent(finalEvent)];
                                    }); }); }, hint, scope)];
                            });
                        }); })())];
                });
            });
        };
        /**
         * @inheritDoc
         */
        BaseClient.prototype.addBreadcrumb = function (breadcrumb, hint, scope) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, beforeBreadcrumb, _b, maxBreadcrumbs, timestamp, mergedBreadcrumb, finalBreadcrumb, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _a = this.getOptions(), beforeBreadcrumb = _a.beforeBreadcrumb, _b = _a.maxBreadcrumbs, maxBreadcrumbs = _b === void 0 ? DEFAULT_BREADCRUMBS : _b;
                            if (maxBreadcrumbs <= 0) {
                                return [2 /*return*/];
                            }
                            timestamp = new Date().getTime() / 1000;
                            mergedBreadcrumb = __assign({ timestamp: timestamp }, breadcrumb);
                            if (!beforeBreadcrumb) return [3 /*break*/, 2];
                            return [4 /*yield*/, beforeBreadcrumbConsoleLoopGuard(function () { return beforeBreadcrumb(mergedBreadcrumb, hint); })];
                        case 1:
                            _c = _d.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            _c = mergedBreadcrumb;
                            _d.label = 3;
                        case 3:
                            finalBreadcrumb = _c;
                            if (finalBreadcrumb === null) {
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, this.getBackend().storeBreadcrumb(finalBreadcrumb)];
                        case 4:
                            if ((_d.sent()) && scope) {
                                scope.addBreadcrumb(finalBreadcrumb, Math.min(maxBreadcrumbs, MAX_BREADCRUMBS));
                            }
                            return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * @inheritDoc
         */
        BaseClient.prototype.getDsn = function () {
            return this.dsn;
        };
        /**
         * @inheritDoc
         */
        BaseClient.prototype.getOptions = function () {
            return this.options;
        };
        /** Returns the current backend. */
        BaseClient.prototype.getBackend = function () {
            return this.backend;
        };
        /** Determines whether this SDK is enabled and a valid Dsn is present. */
        BaseClient.prototype.isEnabled = function () {
            return this.getOptions().enabled !== false && this.dsn !== undefined;
        };
        /**
         * Adds common information to events.
         *
         * The information includes release and environment from `options`,
         * breadcrumbs and context (extra, tags and user) from the scope.
         *
         * Information that is already present in the event is never overwritten. For
         * nested objects, such as the context, keys are merged.
         *
         * @param event The original event.
         * @param hint May contain additional informartion about the original exception.
         * @param scope A scope containing event metadata.
         * @returns A new event with more information.
         */
        BaseClient.prototype.prepareEvent = function (event, scope, hint) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, environment, _b, maxBreadcrumbs, release, repos, dist$$1, prepared, exception, request;
                return __generator(this, function (_c) {
                    _a = this.getOptions(), environment = _a.environment, _b = _a.maxBreadcrumbs, maxBreadcrumbs = _b === void 0 ? DEFAULT_BREADCRUMBS : _b, release = _a.release, repos = _a.repos, dist$$1 = _a.dist;
                    prepared = __assign({}, event);
                    if (prepared.environment === undefined && environment !== undefined) {
                        prepared.environment = environment;
                    }
                    if (prepared.release === undefined && release !== undefined) {
                        prepared.release = release;
                    }
                    if (prepared.repos === undefined && repos !== undefined) {
                        prepared.repos = repos;
                    }
                    if (prepared.dist === undefined && dist$$1 !== undefined) {
                        prepared.dist = dist$$1;
                    }
                    if (prepared.message) {
                        prepared.message = string.truncate(prepared.message, MAX_URL_LENGTH);
                    }
                    exception = prepared.exception && prepared.exception.values && prepared.exception.values[0];
                    if (exception && exception.value) {
                        exception.value = string.truncate(exception.value, MAX_URL_LENGTH);
                    }
                    request = prepared.request;
                    if (request && request.url) {
                        request.url = string.truncate(request.url, MAX_URL_LENGTH);
                    }
                    if (prepared.event_id === undefined) {
                        prepared.event_id = misc.uuid4();
                    }
                    // This should be the last thing called, since we want that
                    // {@link Hub.addEventProcessor} gets the finished prepared event.
                    if (scope) {
                        return [2 /*return*/, scope.applyToEvent(prepared, hint, Math.min(maxBreadcrumbs, MAX_BREADCRUMBS))];
                    }
                    return [2 /*return*/, prepared];
                });
            });
        };
        /**
         * Processes an event (either error or message) and sends it to Sentry.
         *
         * This also adds breadcrumbs and context information to the event. However,
         * platform specific meta data (such as the User's IP address) must be added
         * by the SDK implementor.
         *
         * The returned event status offers clues to whether the event was sent to
         * Sentry and accepted there. If the {@link Options.shouldSend} hook returns
         * `false`, the status will be {@link SendStatus.Skipped}. If the rate limit
         * was exceeded, the status will be {@link SendStatus.RateLimit}.
         *
         * @param event The event to send to Sentry.
         * @param send A function to actually send the event.
         * @param scope A scope containing event metadata.
         * @param hint May contain additional informartion about the original exception.
         * @returns A Promise that resolves with the event status.
         */
        BaseClient.prototype.processEvent = function (event, send, hint, scope) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, beforeSend, sampleRate, prepared, finalEvent, isInternalException, exception_1, response;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!this.isEnabled()) {
                                return [2 /*return*/, {
                                        status: dist.Status.Skipped,
                                    }];
                            }
                            _a = this.getOptions(), beforeSend = _a.beforeSend, sampleRate = _a.sampleRate;
                            if (typeof sampleRate === 'number' && sampleRate > Math.random()) {
                                return [2 /*return*/, {
                                        status: dist.Status.Skipped,
                                    }];
                            }
                            return [4 /*yield*/, this.prepareEvent(event, scope, hint)];
                        case 1:
                            prepared = _b.sent();
                            if (prepared === null) {
                                return [2 /*return*/, {
                                        status: dist.Status.Skipped,
                                    }];
                            }
                            finalEvent = prepared;
                            _b.label = 2;
                        case 2:
                            _b.trys.push([2, 5, , 6]);
                            isInternalException = hint && hint.data && hint.data.__sentry__ === true;
                            if (!(!isInternalException && beforeSend)) return [3 /*break*/, 4];
                            return [4 /*yield*/, beforeSend(prepared, hint)];
                        case 3:
                            finalEvent = _b.sent();
                            _b.label = 4;
                        case 4: return [3 /*break*/, 6];
                        case 5:
                            exception_1 = _b.sent();
                            async.forget(this.captureException(exception_1, {
                                data: {
                                    __sentry__: true,
                                },
                                originalException: exception_1,
                            }));
                            return [2 /*return*/, {
                                    reason: 'Event processing in beforeSend method threw an exception',
                                    status: dist.Status.Invalid,
                                }];
                        case 6:
                            if (finalEvent === null) {
                                return [2 /*return*/, {
                                        reason: 'Event dropped due to being discarded by beforeSend method',
                                        status: dist.Status.Skipped,
                                    }];
                            }
                            return [4 /*yield*/, send(finalEvent)];
                        case 7:
                            response = _b.sent();
                            response.event = finalEvent;
                            if (response.status === dist.Status.RateLimit) ;
                            return [2 /*return*/, response];
                    }
                });
            });
        };
        /**
         * @inheritDoc
         */
        BaseClient.prototype.close = function (timeout) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.getBackend()
                            .getBuffer()
                            .drain(timeout)];
                });
            });
        };
        return BaseClient;
    }());
    exports.BaseClient = BaseClient;

    });

    unwrapExports(baseclient);
    var baseclient_1 = baseclient.BaseClient;

    var requestbuffer = createCommonjsModule(function (module, exports) {
    var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    /** A simple queue that holds promises. */
    var RequestBuffer = /** @class */ (function () {
        function RequestBuffer() {
            /** Internal set of queued Promises */
            this.buffer = new Set();
        }
        /**
         * Add a promise to the queue.
         *
         * @param task Can be any Promise<T>
         * @returns The original promise.
         */
        RequestBuffer.prototype.add = function (task) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    this.buffer.add(task);
                    task.then(function () { return _this.buffer.delete(task); }).catch(function () { return _this.buffer.delete(task); });
                    return [2 /*return*/, task];
                });
            });
        };
        /**
         * This function returns the number of unresolved promises in the queue.
         */
        RequestBuffer.prototype.length = function () {
            return this.buffer.size;
        };
        /**
         * This will drain the whole queue, returns true if queue is empty or drained.
         * If timeout is provided and the queue takes longer to drain, the promise still resolves but with false.
         *
         * @param timeout Number in ms to wait until it resolves with false.
         */
        RequestBuffer.prototype.drain = function (timeout) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve) {
                            var capturedSetTimeout = setTimeout(function () {
                                if (timeout && timeout > 0) {
                                    resolve(false);
                                }
                            }, timeout);
                            Promise.all(_this.buffer.values())
                                .then(function () {
                                clearTimeout(capturedSetTimeout);
                                resolve(true);
                            })
                                .catch(function () {
                                resolve(true);
                            });
                        })];
                });
            });
        };
        return RequestBuffer;
    }());
    exports.RequestBuffer = RequestBuffer;

    });

    unwrapExports(requestbuffer);
    var requestbuffer_1 = requestbuffer.RequestBuffer;

    var basebackend = createCommonjsModule(function (module, exports) {
    var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    Object.defineProperty(exports, "__esModule", { value: true });



    /**
     * This is the base implemention of a Backend.
     */
    var BaseBackend = /** @class */ (function () {
        /** Creates a new browser backend instance. */
        function BaseBackend(options) {
            /** A simple buffer holding all requests. */
            this.buffer = new requestbuffer.RequestBuffer();
            this.options = options;
            if (!this.options.dsn) {
                logger_1.logger.warn('No DSN provided, backend will not do anything.');
            }
        }
        /**
         * @inheritDoc
         */
        BaseBackend.prototype.eventFromException = function (_exception, _hint) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    throw new error.SentryError('Backend has to implement `eventFromException` method');
                });
            });
        };
        /**
         * @inheritDoc
         */
        BaseBackend.prototype.eventFromMessage = function (_message, _level, _hint) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    throw new error.SentryError('Backend has to implement `eventFromMessage` method');
                });
            });
        };
        /**
         * @inheritDoc
         */
        BaseBackend.prototype.sendEvent = function (_event) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    throw new error.SentryError('Backend has to implement `sendEvent` method');
                });
            });
        };
        /**
         * @inheritDoc
         */
        BaseBackend.prototype.storeBreadcrumb = function (_) {
            return true;
        };
        /**
         * @inheritDoc
         */
        BaseBackend.prototype.storeScope = function (_) {
            // Noop
        };
        /**
         * @inheritDoc
         */
        BaseBackend.prototype.getBuffer = function () {
            return this.buffer;
        };
        return BaseBackend;
    }());
    exports.BaseBackend = BaseBackend;

    });

    unwrapExports(basebackend);
    var basebackend_1 = basebackend.BaseBackend;

    var interfaces = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    /** Console logging verbosity for the SDK. */
    var LogLevel;
    (function (LogLevel) {
        /** No logs will be generated. */
        LogLevel[LogLevel["None"] = 0] = "None";
        /** Only SDK internal errors will be logged. */
        LogLevel[LogLevel["Error"] = 1] = "Error";
        /** Information useful for debugging the SDK will be logged. */
        LogLevel[LogLevel["Debug"] = 2] = "Debug";
        /** All SDK actions will be logged. */
        LogLevel[LogLevel["Verbose"] = 3] = "Verbose";
    })(LogLevel = exports.LogLevel || (exports.LogLevel = {}));

    });

    unwrapExports(interfaces);
    var interfaces_1 = interfaces.LogLevel;

    var sdk = createCommonjsModule(function (module, exports) {
    var __read = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var __spread = (commonjsGlobal && commonjsGlobal.__spread) || function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
        return ar;
    };
    Object.defineProperty(exports, "__esModule", { value: true });


    /**
     * Internal function to create a new SDK client instance. The client is
     * installed and then bound to the current scope.
     *
     * @param clientClass The client class to instanciate.
     * @param options Options to pass to the client.
     * @returns The installed and bound client instance.
     */
    function initAndBind(clientClass, options, defaultIntegrations) {
        if (defaultIntegrations === void 0) { defaultIntegrations = []; }
        if (dist$1.getCurrentHub().getClient()) {
            return;
        }
        if (options.debug) {
            logger_1.logger.enable();
        }
        var client = new clientClass(options);
        client.install();
        // This should happen here if any integration uses {@link Hub.addEventProcessor}
        // there needs to be a client on the hub already.
        dist$1.getCurrentHub().bindClient(client);
        var integrations = options.defaultIntegrations === false ? [] : __spread(defaultIntegrations);
        if (Array.isArray(options.integrations)) {
            var providedIntegrationsNames_1 = options.integrations.map(function (i) { return i.name; });
            integrations = __spread(integrations.filter(function (integration) { return providedIntegrationsNames_1.indexOf(integration.name) === -1; }), options.integrations);
        }
        else if (typeof options.integrations === 'function') {
            integrations = options.integrations(integrations);
        }
        // Just in case someone will return non-array from a `itegrations` callback
        if (Array.isArray(integrations)) {
            integrations.forEach(function (integration) {
                integration.install(options);
                logger_1.logger.log("Integration installed: " + integration.name);
            });
        }
    }
    exports.initAndBind = initAndBind;

    });

    unwrapExports(sdk);
    var sdk_1 = sdk.initAndBind;

    var dedupe = createCommonjsModule(function (module, exports) {
    var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    Object.defineProperty(exports, "__esModule", { value: true });



    /** Deduplication filter */
    var Dedupe = /** @class */ (function () {
        function Dedupe() {
            /**
             * @inheritDoc
             */
            this.name = 'Dedupe';
        }
        /**
         * @inheritDoc
         */
        Dedupe.prototype.install = function () {
            var _this = this;
            dist$2.configureScope(function (scope) {
                scope.addEventProcessor(function (currentEvent) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        // Juuust in case something goes wrong
                        try {
                            if (this.shouldDropEvent(currentEvent, this.previousEvent)) {
                                return [2 /*return*/, null];
                            }
                        }
                        catch (_oO) {
                            return [2 /*return*/, (this.previousEvent = currentEvent)];
                        }
                        return [2 /*return*/, (this.previousEvent = currentEvent)];
                    });
                }); });
            });
        };
        /** JSDoc */
        Dedupe.prototype.shouldDropEvent = function (currentEvent, previousEvent) {
            if (!previousEvent) {
                return false;
            }
            if (this.isSameMessageEvent(currentEvent, previousEvent)) {
                logger_1.logger.warn("Event dropped due to being a duplicate of previous event (same message).\nEvent: " + misc.getEventDescription(currentEvent));
                return true;
            }
            if (this.isSameExceptionEvent(currentEvent, previousEvent)) {
                logger_1.logger.warn("Event dropped due to being a duplicate of previous event (same exception).\nEvent: " + misc.getEventDescription(currentEvent));
                return true;
            }
            return false;
        };
        /** JSDoc */
        Dedupe.prototype.isSameMessageEvent = function (currentEvent, previousEvent) {
            var currentMessage = currentEvent.message;
            var previousMessage = previousEvent.message;
            // If no event has a message, they were both exceptions, so bail out
            if (!currentMessage && !previousMessage) {
                return false;
            }
            // If only one event has a stacktrace, but not the other one, they are not the same
            if ((currentMessage && !previousMessage) || (!currentMessage && previousMessage)) {
                return false;
            }
            if (currentMessage !== previousMessage) {
                return false;
            }
            if (!this.isSameFingerprint(currentEvent, previousEvent)) {
                return false;
            }
            if (!this.isSameStacktrace(currentEvent, previousEvent)) {
                return false;
            }
            return true;
        };
        /** JSDoc */
        Dedupe.prototype.getFramesFromEvent = function (event) {
            var exception = event.exception;
            if (exception) {
                try {
                    // @ts-ignore
                    return exception.values[0].stacktrace.frames;
                }
                catch (_oO) {
                    return undefined;
                }
            }
            else if (event.stacktrace) {
                return event.stacktrace.frames;
            }
            else {
                return undefined;
            }
        };
        /** JSDoc */
        Dedupe.prototype.isSameStacktrace = function (currentEvent, previousEvent) {
            var currentFrames = this.getFramesFromEvent(currentEvent);
            var previousFrames = this.getFramesFromEvent(previousEvent);
            // If no event has a fingerprint, they are assumed to be the same
            if (!currentFrames && !previousFrames) {
                return true;
            }
            // If only one event has a stacktrace, but not the other one, they are not the same
            if ((currentFrames && !previousFrames) || (!currentFrames && previousFrames)) {
                return false;
            }
            currentFrames = currentFrames;
            previousFrames = previousFrames;
            // If number of frames differ, they are not the same
            if (previousFrames.length !== currentFrames.length) {
                return false;
            }
            // Otherwise, compare the two
            for (var i = 0; i < previousFrames.length; i++) {
                var frameA = previousFrames[i];
                var frameB = currentFrames[i];
                if (frameA.filename !== frameB.filename ||
                    frameA.lineno !== frameB.lineno ||
                    frameA.colno !== frameB.colno ||
                    frameA.function !== frameB.function) {
                    return false;
                }
            }
            return true;
        };
        /** JSDoc */
        Dedupe.prototype.getExceptionFromEvent = function (event) {
            return event.exception && event.exception.values && event.exception.values[0];
        };
        /** JSDoc */
        Dedupe.prototype.isSameExceptionEvent = function (currentEvent, previousEvent) {
            var previousException = this.getExceptionFromEvent(previousEvent);
            var currentException = this.getExceptionFromEvent(currentEvent);
            if (!previousException || !currentException) {
                return false;
            }
            if (previousException.type !== currentException.type || previousException.value !== currentException.value) {
                return false;
            }
            if (!this.isSameFingerprint(currentEvent, previousEvent)) {
                return false;
            }
            if (!this.isSameStacktrace(currentEvent, previousEvent)) {
                return false;
            }
            return true;
        };
        /** JSDoc */
        Dedupe.prototype.isSameFingerprint = function (currentEvent, previousEvent) {
            var currentFingerprint = currentEvent.fingerprint;
            var previousFingerprint = previousEvent.fingerprint;
            // If no event has a fingerprint, they are assumed to be the same
            if (!currentFingerprint && !previousFingerprint) {
                return true;
            }
            // If only one event has a fingerprint, but not the other one, they are not the same
            if ((currentFingerprint && !previousFingerprint) || (!currentFingerprint && previousFingerprint)) {
                return false;
            }
            currentFingerprint = currentFingerprint;
            previousFingerprint = previousFingerprint;
            // Otherwise, compare the two
            try {
                return !!(currentFingerprint.join('') === previousFingerprint.join(''));
            }
            catch (_oO) {
                return false;
            }
        };
        return Dedupe;
    }());
    exports.Dedupe = Dedupe;

    });

    unwrapExports(dedupe);
    var dedupe_1 = dedupe.Dedupe;

    var functiontostring = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var originalFunctionToString;
    /** Patch toString calls to return proper name for wrapped functions */
    var FunctionToString = /** @class */ (function () {
        function FunctionToString() {
            /**
             * @inheritDoc
             */
            this.name = 'FunctionToString';
        }
        /**
         * @inheritDoc
         */
        FunctionToString.prototype.install = function () {
            originalFunctionToString = Function.prototype.toString;
            Function.prototype.toString = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var context = this.__sentry__ ? this.__sentry_original__ : this;
                // tslint:disable-next-line:no-unsafe-any
                return originalFunctionToString.apply(context, args);
            };
        };
        return FunctionToString;
    }());
    exports.FunctionToString = FunctionToString;

    });

    unwrapExports(functiontostring);
    var functiontostring_1 = functiontostring.FunctionToString;

    var sdkinformation = createCommonjsModule(function (module, exports) {
    var __assign = (commonjsGlobal && commonjsGlobal.__assign) || function () {
        __assign = Object.assign || function(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                    t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    var __read = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var __spread = (commonjsGlobal && commonjsGlobal.__spread) || function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
        return ar;
    };
    Object.defineProperty(exports, "__esModule", { value: true });

    /** Adds SDK info to an event. */
    var SDKInformation = /** @class */ (function () {
        /**
         * @inheritDoc
         */
        function SDKInformation(config) {
            this.config = config;
            /**
             * @inheritDoc
             */
            this.name = 'SDKInformation';
        }
        /**
         * @inheritDoc
         */
        SDKInformation.prototype.install = function () {
            var _this = this;
            dist$2.configureScope(function (scope) {
                scope.addEventProcessor(function (event) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2 /*return*/, (__assign({}, event, { sdk: {
                                    name: this.config.sdkName,
                                    packages: __spread(((event.sdk && event.sdk.packages) || []), [
                                        {
                                            name: this.config.name,
                                            version: this.config.sdkVersion,
                                        },
                                    ]),
                                    version: this.config.sdkVersion,
                                } }))];
                    });
                }); });
            });
        };
        return SDKInformation;
    }());
    exports.SDKInformation = SDKInformation;

    });

    unwrapExports(sdkinformation);
    var sdkinformation_1 = sdkinformation.SDKInformation;

    var inboundfilters = createCommonjsModule(function (module, exports) {
    var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    var __read = (commonjsGlobal && commonjsGlobal.__read) || function (o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    };
    var __spread = (commonjsGlobal && commonjsGlobal.__spread) || function () {
        for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
        return ar;
    };
    Object.defineProperty(exports, "__esModule", { value: true });




    // "Script error." is hard coded into browsers for errors that it can't read.
    // this is the result of a script being pulled in from an external domain and CORS.
    var DEFAULT_IGNORE_ERRORS = [/^Script error\.?$/, /^Javascript error: Script error\.? on line 0$/];
    /** Inbound filters configurable by the user */
    var InboundFilters = /** @class */ (function () {
        function InboundFilters() {
            /** JSDoc */
            this.ignoreErrors = DEFAULT_IGNORE_ERRORS;
            /**
             * @inheritDoc
             */
            this.name = 'InboundFilters';
        }
        /**
         * @inheritDoc
         */
        InboundFilters.prototype.install = function (options) {
            var _this = this;
            if (options === void 0) { options = {}; }
            this.configureOptions(options);
            dist$2.configureScope(function (scope) {
                scope.addEventProcessor(function (event) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (this.shouldDropEvent(event)) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, event];
                    });
                }); });
            });
        };
        /** JSDoc */
        InboundFilters.prototype.shouldDropEvent = function (event) {
            if (this.isIgnoredError(event)) {
                logger_1.logger.warn("Event dropped due to being matched by `ignoreErrors` option.\nEvent: " + misc.getEventDescription(event));
                return true;
            }
            if (this.isBlacklistedUrl(event)) {
                logger_1.logger.warn("Event dropped due to being matched by `blacklistUrls` option.\nEvent: " + misc.getEventDescription(event) + ".\nUrl: " + this.getEventFilterUrl(event));
                return true;
            }
            if (!this.isWhitelistedUrl(event)) {
                logger_1.logger.warn("Event dropped due to not being matched by `whitelistUrls` option.\nEvent: " + misc.getEventDescription(event) + ".\nUrl: " + this.getEventFilterUrl(event));
                return true;
            }
            return false;
        };
        /** JSDoc */
        InboundFilters.prototype.isIgnoredError = function (event) {
            var _this = this;
            if (!this.ignoreErrors) {
                return false;
            }
            return this.getPossibleEventMessages(event).some(function (message) {
                // Not sure why TypeScript complains here...
                return _this.ignoreErrors.some(function (pattern) { return _this.isMatchingPattern(message, pattern); });
            });
        };
        /** JSDoc */
        InboundFilters.prototype.isBlacklistedUrl = function (event) {
            var _this = this;
            // TODO: Use Glob instead?
            if (!this.blacklistUrls) {
                return false;
            }
            var url = this.getEventFilterUrl(event);
            return !url ? false : this.blacklistUrls.some(function (pattern) { return _this.isMatchingPattern(url, pattern); });
        };
        /** JSDoc */
        InboundFilters.prototype.isWhitelistedUrl = function (event) {
            var _this = this;
            // TODO: Use Glob instead?
            if (!this.whitelistUrls) {
                return true;
            }
            var url = this.getEventFilterUrl(event);
            return !url ? true : this.whitelistUrls.some(function (pattern) { return _this.isMatchingPattern(url, pattern); });
        };
        /** JSDoc */
        InboundFilters.prototype.isMatchingPattern = function (value, pattern) {
            if (is.isRegExp(pattern)) {
                return pattern.test(value);
            }
            else if (typeof pattern === 'string') {
                return value.includes(pattern);
            }
            else {
                return false;
            }
        };
        /** JSDoc */
        InboundFilters.prototype.configureOptions = function (options) {
            if (options.ignoreErrors) {
                this.ignoreErrors = __spread(DEFAULT_IGNORE_ERRORS, options.ignoreErrors);
            }
            if (options.blacklistUrls) {
                this.blacklistUrls = __spread(options.blacklistUrls);
            }
            if (options.whitelistUrls) {
                this.whitelistUrls = __spread(options.whitelistUrls);
            }
        };
        /** JSDoc */
        InboundFilters.prototype.getPossibleEventMessages = function (event) {
            if (event.message) {
                return [event.message];
            }
            else if (event.exception) {
                try {
                    // tslint:disable-next-line:no-unsafe-any
                    var _a = event.exception.values[0], type = _a.type, value = _a.value;
                    return ["" + value, type + ": " + value];
                }
                catch (oO) {
                    logger_1.logger.error("Cannot extract message for event " + misc.getEventDescription(event));
                    return [];
                }
            }
            else {
                return [];
            }
        };
        /** JSDoc */
        InboundFilters.prototype.getEventFilterUrl = function (event) {
            try {
                if (event.stacktrace) {
                    // tslint:disable-next-line:no-unsafe-any
                    return event.stacktrace.frames[0].filename;
                }
                else if (event.exception) {
                    // tslint:disable-next-line:no-unsafe-any
                    return event.exception.values[0].stacktrace.frames[0].filename;
                }
                else {
                    return null;
                }
            }
            catch (oO) {
                logger_1.logger.error("Cannot extract url for event " + misc.getEventDescription(event));
                return null;
            }
        };
        return InboundFilters;
    }());
    exports.InboundFilters = InboundFilters;

    });

    unwrapExports(inboundfilters);
    var inboundfilters_1 = inboundfilters.InboundFilters;

    var debug = createCommonjsModule(function (module, exports) {
    var __awaiter = (commonjsGlobal && commonjsGlobal.__awaiter) || function (thisArg, _arguments, P, generator) {
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
    var __generator = (commonjsGlobal && commonjsGlobal.__generator) || function (thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    };
    Object.defineProperty(exports, "__esModule", { value: true });

    /** JSDoc */
    var Debug = /** @class */ (function () {
        function Debug() {
            /**
             * @inheritDoc
             */
            this.name = 'Debug';
        }
        /**
         * @inheritDoc
         */
        Debug.prototype.install = function () {
            var _this = this;
            dist$2.configureScope(function (scope) {
                scope.addEventProcessor(function (event) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        // tslint:disable-next-line:no-console
                        console.log(event);
                        return [2 /*return*/, event];
                    });
                }); });
            });
        };
        return Debug;
    }());
    exports.Debug = Debug;

    });

    unwrapExports(debug);
    var debug_1 = debug.Debug;

    var integrations = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });

    exports.Dedupe = dedupe.Dedupe;

    exports.FunctionToString = functiontostring.FunctionToString;

    exports.SDKInformation = sdkinformation.SDKInformation;

    exports.InboundFilters = inboundfilters.InboundFilters;

    exports.Debug = debug.Debug;

    });

    unwrapExports(integrations);
    var integrations_1 = integrations.Dedupe;
    var integrations_2 = integrations.FunctionToString;
    var integrations_3 = integrations.SDKInformation;
    var integrations_4 = integrations.InboundFilters;
    var integrations_5 = integrations.Debug;

    var dist$3 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });

    exports.logger = logger_1.logger;

    exports.addBreadcrumb = dist$2.addBreadcrumb;
    exports.captureException = dist$2.captureException;
    exports.captureEvent = dist$2.captureEvent;
    exports.captureMessage = dist$2.captureMessage;
    exports.configureScope = dist$2.configureScope;
    exports.withScope = dist$2.withScope;

    exports.getCurrentHub = dist$1.getCurrentHub;
    exports.Hub = dist$1.Hub;
    exports.getHubFromCarrier = dist$1.getHubFromCarrier;
    exports.Scope = dist$1.Scope;

    exports.API = api.API;

    exports.BaseClient = baseclient.BaseClient;

    exports.BaseBackend = basebackend.BaseBackend;

    exports.Dsn = dsn.Dsn;

    exports.SentryError = error.SentryError;

    exports.RequestBuffer = requestbuffer.RequestBuffer;

    exports.LogLevel = interfaces.LogLevel;

    exports.initAndBind = sdk.initAndBind;

    exports.Integrations = integrations;

    });

    unwrapExports(dist$3);
    var dist_1$3 = dist$3.logger;
    var dist_2$3 = dist$3.addBreadcrumb;
    var dist_3$2 = dist$3.captureException;
    var dist_4$2 = dist$3.captureEvent;
    var dist_5$1 = dist$3.captureMessage;
    var dist_6$1 = dist$3.configureScope;
    var dist_7$1 = dist$3.withScope;
    var dist_8 = dist$3.getCurrentHub;
    var dist_9 = dist$3.Hub;
    var dist_10 = dist$3.getHubFromCarrier;
    var dist_11 = dist$3.Scope;
    var dist_12 = dist$3.API;
    var dist_13 = dist$3.BaseClient;
    var dist_14 = dist$3.BaseBackend;
    var dist_15 = dist$3.Dsn;
    var dist_16 = dist$3.SentryError;
    var dist_17 = dist$3.RequestBuffer;
    var dist_18 = dist$3.LogLevel;
    var dist_19 = dist$3.initAndBind;
    var dist_20 = dist$3.Integrations;

    var supports = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", { value: true });

    /**
     * Tells whether current environment supports ErrorEvent objects
     * {@link supportsErrorEvent}.
     *
     * @returns Answer to the given question.
     */
    function supportsErrorEvent() {
        try {
            // tslint:disable:no-unused-expression
            new ErrorEvent('');
            return true;
        }
        catch (e) {
            return false;
        }
    }
    exports.supportsErrorEvent = supportsErrorEvent;
    /**
     * Tells whether current environment supports DOMError objects
     * {@link supportsDOMError}.
     *
     * @returns Answer to the given question.
     */
    function supportsDOMError() {
        try {
            // It really needs 1 argument, not 0.
            // Chrome: VM89:1 Uncaught TypeError: Failed to construct 'DOMError':
            // 1 argument required, but only 0 present.
            // @ts-ignore
            // tslint:disable:no-unused-expression
            new DOMError('');
            return true;
        }
        catch (e) {
            return false;
        }
    }
    exports.supportsDOMError = supportsDOMError;
    /**
     * Tells whether current environment supports DOMException objects
     * {@link supportsDOMException}.
     *
     * @returns Answer to the given question.
     */
    function supportsDOMException() {
        try {
            // tslint:disable:no-unused-expression
            new DOMException('');
            return true;
        }
        catch (e) {
            return false;
        }
    }
    exports.supportsDOMException = supportsDOMException;
    /**
     * Tells whether current environment supports Fetch API
     * {@link supportsFetch}.
     *
     * @returns Answer to the given question.
     */
    function supportsFetch() {
        if (!('fetch' in misc.getGlobalObject())) {
            return false;
        }
        try {
            // tslint:disable-next-line:no-unused-expression
            new Headers();
            // tslint:disable-next-line:no-unused-expression
            new Request('');
            // tslint:disable-next-line:no-unused-expression
            new Response();
            return true;
        }
        catch (e) {
            return false;
        }
    }
    exports.supportsFetch = supportsFetch;
    /**
     * Tells whether current environment supports Fetch API natively
     * {@link supportsNativeFetch}.
     *
     * @returns Answer to the given question.
     */
    function supportsNativeFetch() {
        if (!supportsFetch()) {
            return false;
        }
        var global = misc.getGlobalObject();
        var fetch = global.fetch;
        // tslint:disable-next-line:no-unsafe-any
        return fetch.toString().indexOf('native') !== -1;
    }
    exports.supportsNativeFetch = supportsNativeFetch;
    /**
     * Tells whether current environment supports sendBeacon API
     * {@link supportsBeacon}.
     *
     * @returns Answer to the given question.
     */
    function supportsBeacon() {
        var global = misc.getGlobalObject();
        return 'navigator' in global && 'sendBeacon' in global.navigator;
    }
    exports.supportsBeacon = supportsBeacon;
    /**
     * Tells whether current environment supports ReportingObserver API
     * {@link supportsReportingObserver}.
     *
     * @returns Answer to the given question.
     */
    function supportsReportingObserver() {
        return 'ReportingObserver' in misc.getGlobalObject();
    }
    exports.supportsReportingObserver = supportsReportingObserver;
    /**
     * Tells whether current environment supports Referrer Policy API
     * {@link supportsReferrerPolicy}.
     *
     * @returns Answer to the given question.
     */
    function supportsReferrerPolicy() {
        // Despite all stars in the sky saying that Edge supports old draft syntax, aka 'never', 'always', 'origin' and 'default
        // https://caniuse.com/#feat=referrer-policy
        // It doesn't. And it throw exception instead of ignoring this parameter...
        // REF: https://github.com/getsentry/raven-js/issues/1233
        if (!supportsFetch()) {
            return false;
        }
        try {
            // tslint:disable:no-unused-expression
            new Request('pickleRick', {
                referrerPolicy: 'origin',
            });
            return true;
        }
        catch (e) {
            return false;
        }
    }
    exports.supportsReferrerPolicy = supportsReferrerPolicy;
    /**
     * Tells whether current environment supports History API
     * {@link supportsHistory}.
     *
     * @returns Answer to the given question.
     */
    function supportsHistory() {
        // NOTE: in Chrome App environment, touching history.pushState, *even inside
        //       a try/catch block*, will cause Chrome to output an error to console.error
        // borrowed from: https://github.com/angular/angular.js/pull/13945/files
        var global = misc.getGlobalObject();
        var chrome = global.chrome;
        // tslint:disable-next-line:no-unsafe-any
        var isChromePackagedApp = chrome && chrome.app && chrome.app.runtime;
        var hasHistoryApi = 'history' in global && !!global.history.pushState && !!global.history.replaceState;
        return !isChromePackagedApp && hasHistoryApi;
    }
    exports.supportsHistory = supportsHistory;

    });

    unwrapExports(supports);
    var supports_1 = supports.supportsErrorEvent;
    var supports_2 = supports.supportsDOMError;
    var supports_3 = supports.supportsDOMException;
    var supports_4 = supports.supportsFetch;
    var supports_5 = supports.supportsNativeFetch;
    var supports_6 = supports.supportsBeacon;
    var supports_7 = supports.supportsReportingObserver;
    var supports_8 = supports.supportsReferrerPolicy;
    var supports_9 = supports.supportsHistory;

    var crypt = createCommonjsModule(function (module) {
    (function() {
      var base64map
          = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

      crypt = {
        // Bit-wise rotation left
        rotl: function(n, b) {
          return (n << b) | (n >>> (32 - b));
        },

        // Bit-wise rotation right
        rotr: function(n, b) {
          return (n << (32 - b)) | (n >>> b);
        },

        // Swap big-endian to little-endian and vice versa
        endian: function(n) {
          // If number given, swap endian
          if (n.constructor == Number) {
            return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
          }

          // Else, assume array and swap all items
          for (var i = 0; i < n.length; i++)
            n[i] = crypt.endian(n[i]);
          return n;
        },

        // Generate an array of any length of random bytes
        randomBytes: function(n) {
          for (var bytes = []; n > 0; n--)
            bytes.push(Math.floor(Math.random() * 256));
          return bytes;
        },

        // Convert a byte array to big-endian 32-bit words
        bytesToWords: function(bytes) {
          for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
            words[b >>> 5] |= bytes[i] << (24 - b % 32);
          return words;
        },

        // Convert big-endian 32-bit words to a byte array
        wordsToBytes: function(words) {
          for (var bytes = [], b = 0; b < words.length * 32; b += 8)
            bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
          return bytes;
        },

        // Convert a byte array to a hex string
        bytesToHex: function(bytes) {
          for (var hex = [], i = 0; i < bytes.length; i++) {
            hex.push((bytes[i] >>> 4).toString(16));
            hex.push((bytes[i] & 0xF).toString(16));
          }
          return hex.join('');
        },

        // Convert a hex string to a byte array
        hexToBytes: function(hex) {
          for (var bytes = [], c = 0; c < hex.length; c += 2)
            bytes.push(parseInt(hex.substr(c, 2), 16));
          return bytes;
        },

        // Convert a byte array to a base-64 string
        bytesToBase64: function(bytes) {
          for (var base64 = [], i = 0; i < bytes.length; i += 3) {
            var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
            for (var j = 0; j < 4; j++)
              if (i * 8 + j * 6 <= bytes.length * 8)
                base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
              else
                base64.push('=');
          }
          return base64.join('');
        },

        // Convert a base-64 string to a byte array
        base64ToBytes: function(base64) {
          // Remove non-base-64 characters
          base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

          for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
              imod4 = ++i % 4) {
            if (imod4 == 0) continue;
            bytes.push(((base64map.indexOf(base64.charAt(i - 1))
                & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
                | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
          }
          return bytes;
        }
      };

      module.exports = crypt;
    })();
    });

    var charenc = {
      // UTF-8 encoding
      utf8: {
        // Convert a string to a byte array
        stringToBytes: function(str) {
          return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
        },

        // Convert a byte array to a string
        bytesToString: function(bytes) {
          return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
        }
      },

      // Binary encoding
      bin: {
        // Convert a string to a byte array
        stringToBytes: function(str) {
          for (var bytes = [], i = 0; i < str.length; i++)
            bytes.push(str.charCodeAt(i) & 0xFF);
          return bytes;
        },

        // Convert a byte array to a string
        bytesToString: function(bytes) {
          for (var str = [], i = 0; i < bytes.length; i++)
            str.push(String.fromCharCode(bytes[i]));
          return str.join('');
        }
      }
    };

    var charenc_1 = charenc;

    /*!
     * Determine if an object is a Buffer
     *
     * @author   Feross Aboukhadijeh <https://feross.org>
     * @license  MIT
     */

    // The _isBuffer check is for Safari 5-7 support, because it's missing
    // Object.prototype.constructor. Remove this eventually
    var isBuffer_1 = function (obj) {
      return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
    };

    function isBuffer (obj) {
      return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
    }

    // For Node v0.10 support. Remove this eventually.
    function isSlowBuffer (obj) {
      return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
    }

    var md5 = createCommonjsModule(function (module) {
    (function(){
      var crypt$$1 = crypt,
          utf8 = charenc_1.utf8,
          isBuffer = isBuffer_1,
          bin = charenc_1.bin,

      // The core
      md5 = function (message, options) {
        // Convert to byte array
        if (message.constructor == String)
          if (options && options.encoding === 'binary')
            message = bin.stringToBytes(message);
          else
            message = utf8.stringToBytes(message);
        else if (isBuffer(message))
          message = Array.prototype.slice.call(message, 0);
        else if (!Array.isArray(message))
          message = message.toString();
        // else, assume byte array already

        var m = crypt$$1.bytesToWords(message),
            l = message.length * 8,
            a =  1732584193,
            b = -271733879,
            c = -1732584194,
            d =  271733878;

        // Swap endian
        for (var i = 0; i < m.length; i++) {
          m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
                 ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
        }

        // Padding
        m[l >>> 5] |= 0x80 << (l % 32);
        m[(((l + 64) >>> 9) << 4) + 14] = l;

        // Method shortcuts
        var FF = md5._ff,
            GG = md5._gg,
            HH = md5._hh,
            II = md5._ii;

        for (var i = 0; i < m.length; i += 16) {

          var aa = a,
              bb = b,
              cc = c,
              dd = d;

          a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
          d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
          c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
          b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
          a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
          d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
          c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
          b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
          a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
          d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
          c = FF(c, d, a, b, m[i+10], 17, -42063);
          b = FF(b, c, d, a, m[i+11], 22, -1990404162);
          a = FF(a, b, c, d, m[i+12],  7,  1804603682);
          d = FF(d, a, b, c, m[i+13], 12, -40341101);
          c = FF(c, d, a, b, m[i+14], 17, -1502002290);
          b = FF(b, c, d, a, m[i+15], 22,  1236535329);

          a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
          d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
          c = GG(c, d, a, b, m[i+11], 14,  643717713);
          b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
          a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
          d = GG(d, a, b, c, m[i+10],  9,  38016083);
          c = GG(c, d, a, b, m[i+15], 14, -660478335);
          b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
          a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
          d = GG(d, a, b, c, m[i+14],  9, -1019803690);
          c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
          b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
          a = GG(a, b, c, d, m[i+13],  5, -1444681467);
          d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
          c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
          b = GG(b, c, d, a, m[i+12], 20, -1926607734);

          a = HH(a, b, c, d, m[i+ 5],  4, -378558);
          d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
          c = HH(c, d, a, b, m[i+11], 16,  1839030562);
          b = HH(b, c, d, a, m[i+14], 23, -35309556);
          a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
          d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
          c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
          b = HH(b, c, d, a, m[i+10], 23, -1094730640);
          a = HH(a, b, c, d, m[i+13],  4,  681279174);
          d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
          c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
          b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
          a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
          d = HH(d, a, b, c, m[i+12], 11, -421815835);
          c = HH(c, d, a, b, m[i+15], 16,  530742520);
          b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

          a = II(a, b, c, d, m[i+ 0],  6, -198630844);
          d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
          c = II(c, d, a, b, m[i+14], 15, -1416354905);
          b = II(b, c, d, a, m[i+ 5], 21, -57434055);
          a = II(a, b, c, d, m[i+12],  6,  1700485571);
          d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
          c = II(c, d, a, b, m[i+10], 15, -1051523);
          b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
          a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
          d = II(d, a, b, c, m[i+15], 10, -30611744);
          c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
          b = II(b, c, d, a, m[i+13], 21,  1309151649);
          a = II(a, b, c, d, m[i+ 4],  6, -145523070);
          d = II(d, a, b, c, m[i+11], 10, -1120210379);
          c = II(c, d, a, b, m[i+ 2], 15,  718787259);
          b = II(b, c, d, a, m[i+ 9], 21, -343485551);

          a = (a + aa) >>> 0;
          b = (b + bb) >>> 0;
          c = (c + cc) >>> 0;
          d = (d + dd) >>> 0;
        }

        return crypt$$1.endian([a, b, c, d]);
      };

      // Auxiliary functions
      md5._ff  = function (a, b, c, d, x, s, t) {
        var n = a + (b & c | ~b & d) + (x >>> 0) + t;
        return ((n << s) | (n >>> (32 - s))) + b;
      };
      md5._gg  = function (a, b, c, d, x, s, t) {
        var n = a + (b & d | c & ~d) + (x >>> 0) + t;
        return ((n << s) | (n >>> (32 - s))) + b;
      };
      md5._hh  = function (a, b, c, d, x, s, t) {
        var n = a + (b ^ c ^ d) + (x >>> 0) + t;
        return ((n << s) | (n >>> (32 - s))) + b;
      };
      md5._ii  = function (a, b, c, d, x, s, t) {
        var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
        return ((n << s) | (n >>> (32 - s))) + b;
      };

      // Package private blocksize
      md5._blocksize = 16;
      md5._digestsize = 16;

      module.exports = function (message, options) {
        if (message === undefined || message === null)
          throw new Error('Illegal argument ' + message);

        var digestbytes = crypt$$1.wordsToBytes(md5(message, options));
        return options && options.asBytes ? digestbytes :
            options && options.asString ? bin.bytesToString(digestbytes) :
            crypt$$1.bytesToHex(digestbytes);
      };

    })();
    });

    var md5proxy = /*#__PURE__*/Object.freeze({
        default: md5,
        __moduleExports: md5
    });

    // tslint:disable
    /**
     * TraceKit - Cross brower stack traces
     *
     * This was originally forked from github.com/occ/TraceKit, but has since been
     * largely modified and is now maintained as part of Sentry JS SDK.
     *
     * NOTE: Last merge with upstream repository
     * Jul 11,2018 - #f03357c
     *
     * https://github.com/csnover/TraceKit
     * @license MIT
     * @namespace TraceKit
     */
    var window$1 = misc_1();
    var TraceKit = {
        wrap: function () { return function () { }; },
        report: false,
        collectWindowErrors: false,
        computeStackTrace: false,
        remoteFetching: false,
        linesOfContext: false,
        extendToAsynchronousCallbacks: false,
    };
    // var TraceKit: TraceKitInterface = {};
    // var TraceKit = {};
    // global reference to slice
    var _slice = [].slice;
    var UNKNOWN_FUNCTION = '?';
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Error_types
    var ERROR_TYPES_RE = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/;
    /**
     * A better form of hasOwnProperty<br/>
     * Example: `_has(MainHostObject, property) === true/false`
     *
     * @param {Object} object to check property
     * @param {string} key to check
     * @return {Boolean} true if the object has the key and it is not inherited
     */
    function _has(object, key) {
        return Object.prototype.hasOwnProperty.call(object, key);
    }
    /**
     * A safe form of location.href<br/>
     *
     * @return {string} location.href
     */
    function getLocationHref() {
        if (typeof document === 'undefined' || document.location == null)
            return '';
        return document.location.href;
    }
    /**
     * A safe form of location.origin<br/>
     *
     * @return {string} location.origin
     */
    function getLocationOrigin() {
        if (typeof document === 'undefined' || document.location == null)
            return '';
        // Oh dear IE10...
        if (!document.location.origin) {
            return (document.location.protocol +
                '//' +
                document.location.hostname +
                (document.location.port ? ':' + document.location.port : ''));
        }
        return document.location.origin;
    }
    /**
     * Wrap any function in a TraceKit reporter<br/>
     * Example: `func = TraceKit.wrap(func);`
     *
     * @param {Function} func Function to be wrapped
     * @return {Function} The wrapped func
     * @memberof TraceKit
     */
    TraceKit.wrap = function traceKitWrapper(func) {
        function wrapped() {
            try {
                // @ts-ignore
                return func.apply(this, arguments);
            }
            catch (e) {
                TraceKit.report(e);
                throw e;
            }
        }
        return wrapped;
    };
    /**
     * Cross-browser processing of unhandled exceptions
     *
     * Syntax:
     * ```js
     *   TraceKit.report.subscribe(function(stackInfo) { ... })
     *   TraceKit.report.unsubscribe(function(stackInfo) { ... })
     *   TraceKit.report(exception)
     *   try { ...code... } catch(ex) { TraceKit.report(ex); }
     * ```
     *
     * Supports:
     *   - Firefox: full stack trace with line numbers, plus column number
     *     on top frame; column number is not guaranteed
     *   - Opera: full stack trace with line and column numbers
     *   - Chrome: full stack trace with line and column numbers
     *   - Safari: line and column number for the top frame only; some frames
     *     may be missing, and column number is not guaranteed
     *   - IE: line and column number for the top frame only; some frames
     *     may be missing, and column number is not guaranteed
     *
     * In theory, TraceKit should work on all of the following versions:
     *   - IE5.5+ (only 8.0 tested)
     *   - Firefox 0.9+ (only 3.5+ tested)
     *   - Opera 7+ (only 10.50 tested; versions 9 and earlier may require
     *     Exceptions Have Stacktrace to be enabled in opera:config)
     *   - Safari 3+ (only 4+ tested)
     *   - Chrome 1+ (only 5+ tested)
     *   - Konqueror 3.5+ (untested)
     *
     * Requires TraceKit.computeStackTrace.
     *
     * Tries to catch all unhandled exceptions and report them to the
     * subscribed handlers. Please note that TraceKit.report will rethrow the
     * exception. This is REQUIRED in order to get a useful stack trace in IE.
     * If the exception does not reach the top of the browser, you will only
     * get a stack trace from the point where TraceKit.report was called.
     *
     * Handlers receive a TraceKit.StackTrace object as described in the
     * TraceKit.computeStackTrace docs.
     *
     * @memberof TraceKit
     * @namespace
     */
    TraceKit.report = (function reportModuleWrapper() {
        var handlers = [], lastException = null, lastExceptionStack = null;
        /**
         * Add a crash handler.
         * @param {Function} handler
         * @memberof TraceKit.report
         */
        function subscribe(handler) {
            // NOTE: We call both handlers manually in browser/integrations/globalhandler.ts
            // So user can choose which one he wants to attach
            // installGlobalHandler();
            // installGlobalUnhandledRejectionHandler();
            handlers.push(handler);
        }
        /**
         * Remove a crash handler.
         * @param {Function} handler
         * @memberof TraceKit.report
         */
        function unsubscribe(handler) {
            for (var i = handlers.length - 1; i >= 0; --i) {
                if (handlers[i] === handler) {
                    handlers.splice(i, 1);
                }
            }
            if (handlers.length === 0) {
                uninstallGlobalHandler();
                uninstallGlobalUnhandledRejectionHandler();
            }
        }
        /**
         * Dispatch stack information to all handlers.
         * @param {TraceKit.StackTrace} stack
         * @param {boolean} isWindowError Is this a top-level window error?
         * @param {Error=} error The error that's being handled (if available, null otherwise)
         * @memberof TraceKit.report
         * @throws An exception if an error occurs while calling an handler.
         */
        function notifyHandlers(stack, isWindowError, error) {
            var exception = null;
            if (isWindowError && !TraceKit.collectWindowErrors) {
                return;
            }
            for (var i in handlers) {
                if (_has(handlers, i)) {
                    try {
                        handlers[i](stack, isWindowError, error);
                    }
                    catch (inner) {
                        exception = inner;
                    }
                }
            }
            if (exception) {
                throw exception;
            }
        }
        var _oldOnerrorHandler, _onErrorHandlerInstalled;
        var _oldOnunhandledrejectionHandler, _onUnhandledRejectionHandlerInstalled;
        /**
         * Ensures all global unhandled exceptions are recorded.
         * Supported by Gecko and IE.
         * @param {string} message Error message.
         * @param {string} url URL of script that generated the exception.
         * @param {(number|string)} lineNo The line number at which the error occurred.
         * @param {(number|string)=} columnNo The column number at which the error occurred.
         * @param {Error=} errorObj The actual Error object.
         * @memberof TraceKit.report
         */
        function traceKitWindowOnError(message, url, lineNo, columnNo, errorObj) {
            var stack = null;
            // If 'errorObj' is ErrorEvent, get real Error from inside
            errorObj = is_2(errorObj) ? errorObj.error : errorObj;
            // If 'message' is ErrorEvent, get real message from inside
            message = is_2(message) ? message.message : message;
            if (lastExceptionStack) {
                TraceKit.computeStackTrace.augmentStackTraceWithInitialElement(lastExceptionStack, url, lineNo, message);
                processLastException();
            }
            else if (errorObj && is_1(errorObj)) {
                stack = TraceKit.computeStackTrace(errorObj);
                notifyHandlers(stack, true, errorObj);
            }
            else {
                var location = {
                    url: url,
                    line: lineNo,
                    column: columnNo,
                };
                var name;
                var msg = message; // must be new var or will modify original `arguments`
                if ({}.toString.call(message) === '[object String]') {
                    var groups = message.match(ERROR_TYPES_RE);
                    if (groups) {
                        name = groups[1];
                        msg = groups[2];
                    }
                }
                location.func = TraceKit.computeStackTrace.guessFunctionName(location.url, location.line);
                location.context = TraceKit.computeStackTrace.gatherContext(location.url, location.line);
                stack = {
                    name: name,
                    message: msg,
                    mode: 'onerror',
                    stack: [
                        __assign({}, location, { 
                            // Firefox sometimes doesn't return url correctly and this is an old behavior
                            // that I prefer to port here as well.
                            // It can be altered only here, as previously it's using `location.url` for other things — Kamil
                            url: location.url || getLocationHref() }),
                    ],
                };
                notifyHandlers(stack, true, null);
            }
            if (_oldOnerrorHandler) {
                // @ts-ignore
                return _oldOnerrorHandler.apply(this, arguments);
            }
            return false;
        }
        /**
         * Ensures all unhandled rejections are recorded.
         * @param {PromiseRejectionEvent} e event.
         * @memberof TraceKit.report
         * @see https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onunhandledrejection
         * @see https://developer.mozilla.org/en-US/docs/Web/API/PromiseRejectionEvent
         */
        function traceKitWindowOnUnhandledRejection(e) {
            var stack = TraceKit.computeStackTrace(e.reason);
            notifyHandlers(stack, true, e.reason);
        }
        /**
         * Install a global onerror handler
         * @memberof TraceKit.report
         */
        function installGlobalHandler() {
            if (_onErrorHandlerInstalled === true) {
                return;
            }
            _oldOnerrorHandler = window$1.onerror;
            window$1.onerror = traceKitWindowOnError;
            _onErrorHandlerInstalled = true;
        }
        /**
         * Uninstall the global onerror handler
         * @memberof TraceKit.report
         */
        function uninstallGlobalHandler() {
            if (_onErrorHandlerInstalled) {
                window$1.onerror = _oldOnerrorHandler;
                _onErrorHandlerInstalled = false;
            }
        }
        /**
         * Install a global onunhandledrejection handler
         * @memberof TraceKit.report
         */
        function installGlobalUnhandledRejectionHandler() {
            if (_onUnhandledRejectionHandlerInstalled === true) {
                return;
            }
            _oldOnunhandledrejectionHandler = window$1.onunhandledrejection;
            window$1.onunhandledrejection = traceKitWindowOnUnhandledRejection;
            _onUnhandledRejectionHandlerInstalled = true;
        }
        /**
         * Uninstall the global onunhandledrejection handler
         * @memberof TraceKit.report
         */
        function uninstallGlobalUnhandledRejectionHandler() {
            if (_onUnhandledRejectionHandlerInstalled) {
                window$1.onerror = _oldOnunhandledrejectionHandler;
                _onUnhandledRejectionHandlerInstalled = false;
            }
        }
        /**
         * Process the most recent exception
         * @memberof TraceKit.report
         */
        function processLastException() {
            var _lastExceptionStack = lastExceptionStack, _lastException = lastException;
            lastExceptionStack = null;
            lastException = null;
            notifyHandlers(_lastExceptionStack, false, _lastException);
        }
        /**
         * Reports an unhandled Error to TraceKit.
         * @param {Error} ex
         * @memberof TraceKit.report
         * @throws An exception if an incomplete stack trace is detected (old IE browsers).
         */
        function report(ex) {
            if (lastExceptionStack) {
                if (lastException === ex) {
                    return; // already caught by an inner catch block, ignore
                }
                else {
                    processLastException();
                }
            }
            var stack = TraceKit.computeStackTrace(ex);
            lastExceptionStack = stack;
            lastException = ex;
            // If the stack trace is incomplete, wait for 2 seconds for
            // slow slow IE to see if onerror occurs or not before reporting
            // this exception; otherwise, we will end up with an incomplete
            // stack trace
            setTimeout(function () {
                if (lastException === ex) {
                    processLastException();
                }
            }, stack.incomplete ? 2000 : 0);
            throw ex; // re-throw to propagate to the top level (and cause window.onerror)
        }
        report.subscribe = subscribe;
        report.unsubscribe = unsubscribe;
        report.installGlobalHandler = installGlobalHandler;
        report.installGlobalUnhandledRejectionHandler = installGlobalUnhandledRejectionHandler;
        return report;
    })();
    /**
     * An object representing a single stack frame.
     * @typedef {Object} StackFrame
     * @property {string} url The JavaScript or HTML file URL.
     * @property {string} func The function name, or empty for anonymous functions (if guessing did not work).
     * @property {string[]?} args The arguments passed to the function, if known.
     * @property {number=} line The line number, if known.
     * @property {number=} column The column number, if known.
     * @property {string[]} context An array of source code lines; the middle element corresponds to the correct line#.
     * @memberof TraceKit
     */
    /**
     * An object representing a JavaScript stack trace.
     * @typedef {Object} StackTrace
     * @property {string} name The name of the thrown exception.
     * @property {string} message The exception error message.
     * @property {TraceKit.StackFrame[]} stack An array of stack frames.
     * @property {string} mode 'stack', 'stacktrace', 'multiline', 'callers', 'onerror', or 'failed' -- method used to collect the stack trace.
     * @memberof TraceKit
     */
    /**
     * TraceKit.computeStackTrace: cross-browser stack traces in JavaScript
     *
     * Syntax:
     *   ```js
     *   s = TraceKit.computeStackTrace.ofCaller([depth])
     *   s = TraceKit.computeStackTrace(exception) // consider using TraceKit.report instead (see below)
     *   ```
     *
     * Supports:
     *   - Firefox:  full stack trace with line numbers and unreliable column
     *               number on top frame
     *   - Opera 10: full stack trace with line and column numbers
     *   - Opera 9-: full stack trace with line numbers
     *   - Chrome:   full stack trace with line and column numbers
     *   - Safari:   line and column number for the topmost stacktrace element
     *               only
     *   - IE:       no line numbers whatsoever
     *
     * Tries to guess names of anonymous functions by looking for assignments
     * in the source code. In IE and Safari, we have to guess source file names
     * by searching for function bodies inside all page scripts. This will not
     * work for scripts that are loaded cross-domain.
     * Here be dragons: some function names may be guessed incorrectly, and
     * duplicate functions may be mismatched.
     *
     * TraceKit.computeStackTrace should only be used for tracing purposes.
     * Logging of unhandled exceptions should be done with TraceKit.report,
     * which builds on top of TraceKit.computeStackTrace and provides better
     * IE support by utilizing the window.onerror event to retrieve information
     * about the top of the stack.
     *
     * Note: In IE and Safari, no stack trace is recorded on the Error object,
     * so computeStackTrace instead walks its *own* chain of callers.
     * This means that:
     *  * in Safari, some methods may be missing from the stack trace;
     *  * in IE, the topmost function in the stack trace will always be the
     *    caller of computeStackTrace.
     *
     * This is okay for tracing (because you are likely to be calling
     * computeStackTrace from the function you want to be the topmost element
     * of the stack trace anyway), but not okay for logging unhandled
     * exceptions (because your catch block will likely be far away from the
     * inner function that actually caused the exception).
     *
     * Tracing example:
     *  ```js
     *     function trace(message) {
     *         var stackInfo = TraceKit.computeStackTrace.ofCaller();
     *         var data = message + "\n";
     *         for(var i in stackInfo.stack) {
     *             var item = stackInfo.stack[i];
     *             data += (item.func || '[anonymous]') + "() in " + item.url + ":" + (item.line || '0') + "\n";
     *         }
     *         if (window.console)
     *             console.info(data);
     *         else
     *             alert(data);
     *     }
     * ```
     * @memberof TraceKit
     * @namespace
     */
    TraceKit.computeStackTrace = (function computeStackTraceWrapper() {
        var debug = false, sourceCache = {};
        /**
         * Attempts to retrieve source code via XMLHttpRequest, which is used
         * to look up anonymous function names.
         * @param {string} url URL of source code.
         * @return {string} Source contents.
         * @memberof TraceKit.computeStackTrace
         */
        function loadSource(url) {
            if (!TraceKit.remoteFetching) {
                //Only attempt request if remoteFetching is on.
                return '';
            }
            try {
                var getXHR = function () {
                    try {
                        return new window$1.XMLHttpRequest();
                    }
                    catch (e) {
                        // explicitly bubble up the exception if not found
                        return new window$1.ActiveXObject('Microsoft.XMLHTTP');
                    }
                };
                var request = getXHR();
                request.open('GET', url, false);
                request.send('');
                return request.responseText;
            }
            catch (e) {
                return '';
            }
        }
        /**
         * Retrieves source code from the source code cache.
         * @param {string} url URL of source code.
         * @return {Array.<string>} Source contents.
         * @memberof TraceKit.computeStackTrace
         */
        function getSource(url) {
            if (typeof url !== 'string') {
                return [];
            }
            if (!_has(sourceCache, url)) {
                // URL needs to be able to fetched within the acceptable domain.  Otherwise,
                // cross-domain errors will be triggered.
                /*
                            Regex matches:
                            0 - Full Url
                            1 - Protocol
                            2 - Domain
                            3 - Port (Useful for internal applications)
                            4 - Path
                        */
                var source = '';
                var domain = '';
                try {
                    domain = window$1.document.domain;
                }
                catch (e) { }
                var match = /(.*)\:\/\/([^:\/]+)([:\d]*)\/{0,1}([\s\S]*)/.exec(url);
                if (match && match[2] === domain) {
                    source = loadSource(url);
                }
                sourceCache[url] = source ? source.split('\n') : [];
            }
            return sourceCache[url];
        }
        /**
         * Tries to use an externally loaded copy of source code to determine
         * the name of a function by looking at the name of the variable it was
         * assigned to, if any.
         * @param {string} url URL of source code.
         * @param {(string|number)} lineNo Line number in source code.
         * @return {string} The function name, if discoverable.
         * @memberof TraceKit.computeStackTrace
         */
        function guessFunctionName(url, lineNo) {
            var reFunctionArgNames = /function ([^(]*)\(([^)]*)\)/, reGuessFunction = /['"]?([0-9A-Za-z$_]+)['"]?\s*[:=]\s*(function|eval|new Function)/, line = '', maxLines = 10, source = getSource(url), m;
            if (!source.length) {
                return UNKNOWN_FUNCTION;
            }
            // Walk backwards from the first line in the function until we find the line which
            // matches the pattern above, which is the function definition
            for (var i = 0; i < maxLines; ++i) {
                line = source[lineNo - i] + line;
                if (!is_5(line)) {
                    if ((m = reGuessFunction.exec(line))) {
                        return m[1];
                    }
                    else if ((m = reFunctionArgNames.exec(line))) {
                        return m[1];
                    }
                }
            }
            return UNKNOWN_FUNCTION;
        }
        /**
         * Retrieves the surrounding lines from where an exception occurred.
         * @param {string} url URL of source code.
         * @param {(string|number)} line Line number in source code to center around for context.
         * @return {?Array.<string>} Lines of source code.
         * @memberof TraceKit.computeStackTrace
         */
        function gatherContext(url, line) {
            var source = getSource(url);
            if (!source.length) {
                return null;
            }
            var context = [], 
            // linesBefore & linesAfter are inclusive with the offending line.
            // if linesOfContext is even, there will be one extra line
            //   *before* the offending line.
            linesBefore = Math.floor(TraceKit.linesOfContext / 2), 
            // Add one extra line if linesOfContext is odd
            linesAfter = linesBefore + (TraceKit.linesOfContext % 2), start = Math.max(0, line - linesBefore - 1), end = Math.min(source.length, line + linesAfter - 1);
            line -= 1; // convert to 0-based index
            for (var i = start; i < end; ++i) {
                if (!is_5(source[i])) {
                    context.push(source[i]);
                }
            }
            return context.length > 0 ? context : null;
        }
        /**
         * Escapes special characters, except for whitespace, in a string to be
         * used inside a regular expression as a string literal.
         * @param {string} text The string.
         * @return {string} The escaped string literal.
         * @memberof TraceKit.computeStackTrace
         */
        function escapeRegExp(text) {
            return text.replace(/[\-\[\]{}()*+?.,\\\^$|#]/g, '\\$&');
        }
        /**
         * Escapes special characters in a string to be used inside a regular
         * expression as a string literal. Also ensures that HTML entities will
         * be matched the same as their literal friends.
         * @param {string} body The string.
         * @return {string} The escaped string.
         * @memberof TraceKit.computeStackTrace
         */
        function escapeCodeAsRegExpForMatchingInsideHTML(body) {
            return escapeRegExp(body)
                .replace('<', '(?:<|&lt;)')
                .replace('>', '(?:>|&gt;)')
                .replace('&', '(?:&|&amp;)')
                .replace('"', '(?:"|&quot;)')
                .replace(/\s+/g, '\\s+');
        }
        /**
         * Determines where a code fragment occurs in the source code.
         * @param {RegExp} re The function definition.
         * @param {Array.<string>} urls A list of URLs to search.
         * @return {?Object.<string, (string|number)>} An object containing
         * the url, line, and column number of the defined function.
         * @memberof TraceKit.computeStackTrace
         */
        function findSourceInUrls(re, urls) {
            var source, m;
            for (var i = 0, j = urls.length; i < j; ++i) {
                if ((source = getSource(urls[i])).length) {
                    source = source.join('\n');
                    if ((m = re.exec(source))) {
                        return {
                            url: urls[i],
                            line: source.substring(0, m.index).split('\n').length,
                            column: m.index - source.lastIndexOf('\n', m.index) - 1,
                        };
                    }
                }
            }
            return null;
        }
        /**
         * Determines at which column a code fragment occurs on a line of the
         * source code.
         * @param {string} fragment The code fragment.
         * @param {string} url The URL to search.
         * @param {(string|number)} line The line number to examine.
         * @return {?number} The column number.
         * @memberof TraceKit.computeStackTrace
         */
        function findSourceInLine(fragment, url, line) {
            var source = getSource(url), re = new RegExp('\\b' + escapeRegExp(fragment) + '\\b'), m;
            line -= 1;
            if (source && source.length > line && (m = re.exec(source[line]))) {
                return m.index;
            }
            return null;
        }
        /**
         * Determines where a function was defined within the source code.
         * @param {(Function|string)} func A function reference or serialized
         * function definition.
         * @return {?Object.<string, (string|number)>} An object containing
         * the url, line, and column number of the defined function.
         * @memberof TraceKit.computeStackTrace
         */
        function findSourceByFunctionBody(func) {
            if (is_5(window$1 && window$1.document)) {
                return;
            }
            var urls = [getLocationHref()], scripts = window$1.document.getElementsByTagName('script'), body, code = '' + func, codeRE = /^function(?:\s+([\w$]+))?\s*\(([\w\s,]*)\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/, eventRE = /^function on([\w$]+)\s*\(event\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/, re, parts, result;
            for (var i = 0; i < scripts.length; ++i) {
                var script = scripts[i];
                if (script.src) {
                    urls.push(script.src);
                }
            }
            if (!(parts = codeRE.exec(code))) {
                re = new RegExp(escapeRegExp(code).replace(/\s+/g, '\\s+'));
            }
            // not sure if this is really necessary, but I don’t have a test
            // corpus large enough to confirm that and it was in the original.
            else {
                var name = parts[1] ? '\\s+' + parts[1] : '', args = parts[2].split(',').join('\\s*,\\s*');
                body = escapeRegExp(parts[3]).replace(/;$/, ';?'); // semicolon is inserted if the function ends with a comment.replace(/\s+/g, '\\s+');
                re = new RegExp('function' + name + '\\s*\\(\\s*' + args + '\\s*\\)\\s*{\\s*' + body + '\\s*}');
            }
            // look for a normal function definition
            if ((result = findSourceInUrls(re, urls))) {
                return result;
            }
            // look for an old-school event handler function
            if ((parts = eventRE.exec(code))) {
                var event = parts[1];
                body = escapeCodeAsRegExpForMatchingInsideHTML(parts[2]);
                // look for a function defined in HTML as an onXXX handler
                re = new RegExp('on' + event + '=[\\\'"]\\s*' + body + '\\s*[\\\'"]', 'i');
                if ((result = findSourceInUrls(re, urls[0]))) {
                    return result;
                }
                // look for ???
                re = new RegExp(body);
                if ((result = findSourceInUrls(re, urls))) {
                    return result;
                }
            }
            return null;
        }
        // Contents of Exception in various browsers.
        //
        // SAFARI:
        // ex.message = Can't find variable: qq
        // ex.line = 59
        // ex.sourceId = 580238192
        // ex.sourceURL = http://...
        // ex.expressionBeginOffset = 96
        // ex.expressionCaretOffset = 98
        // ex.expressionEndOffset = 98
        // ex.name = ReferenceError
        //
        // FIREFOX:
        // ex.message = qq is not defined
        // ex.fileName = http://...
        // ex.lineNumber = 59
        // ex.columnNumber = 69
        // ex.stack = ...stack trace... (see the example below)
        // ex.name = ReferenceError
        //
        // CHROME:
        // ex.message = qq is not defined
        // ex.name = ReferenceError
        // ex.type = not_defined
        // ex.arguments = ['aa']
        // ex.stack = ...stack trace...
        //
        // INTERNET EXPLORER:
        // ex.message = ...
        // ex.name = ReferenceError
        //
        // OPERA:
        // ex.message = ...message... (see the example below)
        // ex.name = ReferenceError
        // ex.opera#sourceloc = 11  (pretty much useless, duplicates the info in ex.message)
        // ex.stacktrace = n/a; see 'opera:config#UserPrefs|Exceptions Have Stacktrace'
        /**
         * Computes stack trace information from the stack property.
         * Chrome and Gecko use this property.
         * @param {Error} ex
         * @return {?TraceKit.StackTrace} Stack trace information.
         * @memberof TraceKit.computeStackTrace
         */
        function computeStackTraceFromStackProp(ex) {
            if (!ex.stack) {
                return null;
            }
            var chrome = /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|[a-z]:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, gecko = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|resource|moz-extension).*?:\/.*?|\[native code\]|[^@]*bundle)(?::(\d+))?(?::(\d+))?\s*$/i, winjs = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, 
            // Used to additionally parse URL/line/column from eval frames
            isEval, geckoEval = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, chromeEval = /\((\S*)(?::(\d+))(?::(\d+))\)/, lines = ex.stack.split('\n'), stack = [], submatch, parts, element, reference = /^(.*) is undefined$/.exec(ex.message);
            for (var i = 0, j = lines.length; i < j; ++i) {
                if ((parts = chrome.exec(lines[i]))) {
                    var isNative = parts[2] && parts[2].indexOf('native') === 0; // start of line
                    isEval = parts[2] && parts[2].indexOf('eval') === 0; // start of line
                    if (isEval && (submatch = chromeEval.exec(parts[2]))) {
                        // throw out eval line/column and use top-most line/column number
                        parts[2] = submatch[1]; // url
                        // NOTE: It's messing out our integration tests in Karma, let's see if we can live with it – Kamil
                        // parts[3] = submatch[2]; // line
                        // parts[4] = submatch[3]; // column
                    }
                    element = {
                        url: !isNative ? parts[2] : null,
                        func: parts[1] || UNKNOWN_FUNCTION,
                        args: isNative ? [parts[2]] : [],
                        line: parts[3] ? +parts[3] : null,
                        column: parts[4] ? +parts[4] : null,
                    };
                }
                else if ((parts = winjs.exec(lines[i]))) {
                    element = {
                        url: parts[2],
                        func: parts[1] || UNKNOWN_FUNCTION,
                        args: [],
                        line: +parts[3],
                        column: parts[4] ? +parts[4] : null,
                    };
                }
                else if ((parts = gecko.exec(lines[i]))) {
                    isEval = parts[3] && parts[3].indexOf(' > eval') > -1;
                    if (isEval && (submatch = geckoEval.exec(parts[3]))) {
                        // throw out eval line/column and use top-most line number
                        parts[3] = submatch[1];
                        // NOTE: It's messing out our integration tests in Karma, let's see if we can live with it – Kamil
                        // parts[4] = submatch[2];
                        // parts[5] = null; // no column when eval
                    }
                    else if (i === 0 && !parts[5] && !is_5(ex.columnNumber)) {
                        // FireFox uses this awesome columnNumber property for its top frame
                        // Also note, Firefox's column number is 0-based and everything else expects 1-based,
                        // so adding 1
                        // NOTE: this hack doesn't work if top-most frame is eval
                        stack[0].column = ex.columnNumber + 1;
                    }
                    element = {
                        url: parts[3],
                        func: parts[1] || UNKNOWN_FUNCTION,
                        args: parts[2] ? parts[2].split(',') : [],
                        line: parts[4] ? +parts[4] : null,
                        column: parts[5] ? +parts[5] : null,
                    };
                }
                else {
                    continue;
                }
                if (!element.func && element.line) {
                    element.func = guessFunctionName(element.url, element.line);
                }
                if (TraceKit.remoteFetching && element.url && element.url.substr(0, 5) === 'blob:') {
                    // Special case for handling JavaScript loaded into a blob.
                    // We use a synchronous AJAX request here as a blob is already in
                    // memory - it's not making a network request.  This will generate a warning
                    // in the browser console, but there has already been an error so that's not
                    // that much of an issue.
                    var xhr = new XMLHttpRequest();
                    xhr.open('GET', element.url, false);
                    xhr.send('');
                    // If we failed to download the source, skip this patch
                    if (xhr.status === 200) {
                        var source = xhr.responseText || '';
                        // We trim the source down to the last 300 characters as sourceMappingURL is always at the end of the file.
                        // Why 300? To be in line with: https://github.com/getsentry/sentry/blob/4af29e8f2350e20c28a6933354e4f42437b4ba42/src/sentry/lang/javascript/processor.py#L164-L175
                        source = source.slice(-300);
                        // Now we dig out the source map URL
                        var sourceMaps = source.match(/\/\/# sourceMappingURL=(.*)$/);
                        // If we don't find a source map comment or we find more than one, continue on to the next element.
                        if (sourceMaps) {
                            var sourceMapAddress = sourceMaps[1];
                            // Now we check to see if it's a relative URL.
                            // If it is, convert it to an absolute one.
                            if (sourceMapAddress.charAt(0) === '~') {
                                sourceMapAddress = getLocationOrigin() + sourceMapAddress.slice(1);
                            }
                            // Now we strip the '.map' off of the end of the URL and update the
                            // element so that Sentry can match the map to the blob.
                            element.url = sourceMapAddress.slice(0, -4);
                        }
                    }
                }
                element.context = element.line ? gatherContext(element.url, element.line) : null;
                stack.push(element);
            }
            if (!stack.length) {
                return null;
            }
            if (stack[0] && stack[0].line && !stack[0].column && reference) {
                stack[0].column = findSourceInLine(reference[1], stack[0].url, stack[0].line);
            }
            return {
                mode: 'stack',
                name: ex.name,
                message: ex.message,
                stack: stack,
            };
        }
        /**
         * Computes stack trace information from the stacktrace property.
         * Opera 10+ uses this property.
         * @param {Error} ex
         * @return {?TraceKit.StackTrace} Stack trace information.
         * @memberof TraceKit.computeStackTrace
         */
        function computeStackTraceFromStacktraceProp(ex) {
            // Access and store the stacktrace property before doing ANYTHING
            // else to it because Opera is not very good at providing it
            // reliably in other circumstances.
            var stacktrace = ex.stacktrace;
            if (!stacktrace) {
                return;
            }
            var opera10Regex = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i, opera11Regex = / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^\)]+))\((.*)\))? in (.*):\s*$/i, lines = stacktrace.split('\n'), stack = [], parts;
            for (var line = 0; line < lines.length; line += 2) {
                var element = null;
                if ((parts = opera10Regex.exec(lines[line]))) {
                    element = {
                        url: parts[2],
                        line: +parts[1],
                        column: null,
                        func: parts[3],
                        args: [],
                    };
                }
                else if ((parts = opera11Regex.exec(lines[line]))) {
                    element = {
                        url: parts[6],
                        line: +parts[1],
                        column: +parts[2],
                        func: parts[3] || parts[4],
                        args: parts[5] ? parts[5].split(',') : [],
                    };
                }
                if (element) {
                    if (!element.func && element.line) {
                        element.func = guessFunctionName(element.url, element.line);
                    }
                    if (element.line) {
                        try {
                            element.context = gatherContext(element.url, element.line);
                        }
                        catch (exc) { }
                    }
                    if (!element.context) {
                        element.context = [lines[line + 1]];
                    }
                    stack.push(element);
                }
            }
            if (!stack.length) {
                return null;
            }
            return {
                mode: 'stacktrace',
                name: ex.name,
                message: ex.message,
                stack: stack,
            };
        }
        /**
         * NOT TESTED.
         * Computes stack trace information from an error message that includes
         * the stack trace.
         * Opera 9 and earlier use this method if the option to show stack
         * traces is turned on in opera:config.
         * @param {Error} ex
         * @return {?TraceKit.StackTrace} Stack information.
         * @memberof TraceKit.computeStackTrace
         */
        function computeStackTraceFromOperaMultiLineMessage(ex) {
            // TODO: Clean this function up
            // Opera includes a stack trace into the exception message. An example is:
            //
            // Statement on line 3: Undefined variable: undefinedFunc
            // Backtrace:
            //   Line 3 of linked script file://localhost/Users/andreyvit/Projects/TraceKit/javascript-client/sample.js: In function zzz
            //         undefinedFunc(a);
            //   Line 7 of inline#1 script in file://localhost/Users/andreyvit/Projects/TraceKit/javascript-client/sample.html: In function yyy
            //           zzz(x, y, z);
            //   Line 3 of inline#1 script in file://localhost/Users/andreyvit/Projects/TraceKit/javascript-client/sample.html: In function xxx
            //           yyy(a, a, a);
            //   Line 1 of function script
            //     try { xxx('hi'); return false; } catch(ex) { TraceKit.report(ex); }
            //   ...
            var lines = ex.message.split('\n');
            if (lines.length < 4) {
                return null;
            }
            var lineRE1 = /^\s*Line (\d+) of linked script ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i, lineRE2 = /^\s*Line (\d+) of inline#(\d+) script in ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i, lineRE3 = /^\s*Line (\d+) of function script\s*$/i, stack = [], scripts = window$1 && window$1.document && window$1.document.getElementsByTagName('script'), inlineScriptBlocks = [], parts;
            for (var s in scripts) {
                if (_has(scripts, s) && !scripts[s].src) {
                    inlineScriptBlocks.push(scripts[s]);
                }
            }
            for (var line = 2; line < lines.length; line += 2) {
                var item = null;
                if ((parts = lineRE1.exec(lines[line]))) {
                    item = {
                        url: parts[2],
                        func: parts[3],
                        args: [],
                        line: +parts[1],
                        column: null,
                    };
                }
                else if ((parts = lineRE2.exec(lines[line]))) {
                    item = {
                        url: parts[3],
                        func: parts[4],
                        args: [],
                        line: +parts[1],
                        column: null,
                    };
                    var relativeLine = +parts[1]; // relative to the start of the <SCRIPT> block
                    var script = inlineScriptBlocks[parts[2] - 1];
                    if (script) {
                        var source = getSource(item.url);
                        if (source) {
                            source = source.join('\n');
                            var pos = source.indexOf(script.innerText);
                            if (pos >= 0) {
                                item.line = relativeLine + source.substring(0, pos).split('\n').length;
                            }
                        }
                    }
                }
                else if ((parts = lineRE3.exec(lines[line]))) {
                    var url = getLocationHref().replace(/#.*$/, '');
                    var re = new RegExp(escapeCodeAsRegExpForMatchingInsideHTML(lines[line + 1]));
                    var src = findSourceInUrls(re, [url]);
                    item = {
                        url: url,
                        func: '',
                        args: [],
                        line: src ? src.line : parts[1],
                        column: null,
                    };
                }
                if (item) {
                    if (!item.func) {
                        item.func = guessFunctionName(item.url, item.line);
                    }
                    var context = gatherContext(item.url, item.line);
                    var midline = context ? context[Math.floor(context.length / 2)] : null;
                    if (context && midline.replace(/^\s*/, '') === lines[line + 1].replace(/^\s*/, '')) {
                        item.context = context;
                    }
                    else {
                        // if (context) alert("Context mismatch. Correct midline:\n" + lines[i+1] + "\n\nMidline:\n" + midline + "\n\nContext:\n" + context.join("\n") + "\n\nURL:\n" + item.url);
                        item.context = [lines[line + 1]];
                    }
                    stack.push(item);
                }
            }
            if (!stack.length) {
                return null; // could not parse multiline exception message as Opera stack trace
            }
            return {
                mode: 'multiline',
                name: ex.name,
                message: lines[0],
                stack: stack,
            };
        }
        /**
         * Adds information about the first frame to incomplete stack traces.
         * Safari and IE require this to get complete data on the first frame.
         * @param {TraceKit.StackTrace} stackInfo Stack trace information from
         * one of the compute* methods.
         * @param {string} url The URL of the script that caused an error.
         * @param {(number|string)} lineNo The line number of the script that
         * caused an error.
         * @param {string=} message The error generated by the browser, which
         * hopefully contains the name of the object that caused the error.
         * @return {boolean} Whether or not the stack information was
         * augmented.
         * @memberof TraceKit.computeStackTrace
         */
        function augmentStackTraceWithInitialElement(stackInfo, url, lineNo, message) {
            var initial = {
                url: url,
                line: lineNo,
            };
            if (initial.url && initial.line) {
                stackInfo.incomplete = false;
                if (!initial.func) {
                    initial.func = guessFunctionName(initial.url, initial.line);
                }
                if (!initial.context) {
                    initial.context = gatherContext(initial.url, initial.line);
                }
                var reference = / '([^']+)' /.exec(message);
                if (reference) {
                    initial.column = findSourceInLine(reference[1], initial.url, initial.line);
                }
                if (stackInfo.stack.length > 0) {
                    if (stackInfo.stack[0].url === initial.url) {
                        if (stackInfo.stack[0].line === initial.line) {
                            return false; // already in stack trace
                        }
                        else if (!stackInfo.stack[0].line && stackInfo.stack[0].func === initial.func) {
                            stackInfo.stack[0].line = initial.line;
                            stackInfo.stack[0].context = initial.context;
                            return false;
                        }
                    }
                }
                stackInfo.stack.unshift(initial);
                stackInfo.partial = true;
                return true;
            }
            else {
                stackInfo.incomplete = true;
            }
            return false;
        }
        /**
         * Computes stack trace information by walking the arguments.caller
         * chain at the time the exception occurred. This will cause earlier
         * frames to be missed but is the only way to get any stack trace in
         * Safari and IE. The top frame is restored by
         * {@link augmentStackTraceWithInitialElement}.
         * @param {Error} ex
         * @return {TraceKit.StackTrace=} Stack trace information.
         * @memberof TraceKit.computeStackTrace
         */
        function computeStackTraceByWalkingCallerChain(ex, depth) {
            var functionName = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i, stack = [], funcs = {}, recursion = false, parts, item, source;
            for (var curr = computeStackTraceByWalkingCallerChain.caller; curr && !recursion; curr = curr.caller) {
                if (curr === computeStackTrace || curr === TraceKit.report) {
                    continue;
                }
                item = {
                    url: null,
                    func: UNKNOWN_FUNCTION,
                    args: [],
                    line: null,
                    column: null,
                };
                if (curr.name) {
                    item.func = curr.name;
                }
                else if ((parts = functionName.exec(curr.toString()))) {
                    item.func = parts[1];
                }
                if (typeof item.func === 'undefined') {
                    try {
                        item.func = parts.input.substring(0, parts.input.indexOf('{'));
                    }
                    catch (e) { }
                }
                if ((source = findSourceByFunctionBody(curr))) {
                    item.url = source.url;
                    item.line = source.line;
                    if (item.func === UNKNOWN_FUNCTION) {
                        item.func = guessFunctionName(item.url, item.line);
                    }
                    var reference = / '([^']+)' /.exec(ex.message || ex.description);
                    if (reference) {
                        item.column = findSourceInLine(reference[1], source.url, source.line);
                    }
                }
                if (funcs['' + curr]) {
                    recursion = true;
                }
                else {
                    funcs['' + curr] = true;
                }
                stack.push(item);
            }
            if (depth) {
                stack.splice(0, depth);
            }
            var result = {
                mode: 'callers',
                name: ex.name,
                message: ex.message,
                stack: stack,
            };
            augmentStackTraceWithInitialElement(result, ex.sourceURL || ex.fileName, ex.line || ex.lineNumber, ex.message || ex.description);
            return result;
        }
        /**
         * Computes a stack trace for an exception.
         * @param {Error} ex
         * @param {(string|number)=} depth
         * @memberof TraceKit.computeStackTrace
         */
        function computeStackTrace(ex, depth) {
            var stack = null;
            depth = depth == null ? 0 : +depth;
            try {
                // This must be tried first because Opera 10 *destroys*
                // its stacktrace property if you try to access the stack
                // property first!!
                stack = computeStackTraceFromStacktraceProp(ex);
                if (stack) {
                    return stack;
                }
            }
            catch (e) {
                if (debug) {
                    throw e;
                }
            }
            try {
                stack = computeStackTraceFromStackProp(ex);
                if (stack) {
                    return stack;
                }
            }
            catch (e) {
                if (debug) {
                    throw e;
                }
            }
            try {
                stack = computeStackTraceFromOperaMultiLineMessage(ex);
                if (stack) {
                    return stack;
                }
            }
            catch (e) {
                if (debug) {
                    throw e;
                }
            }
            try {
                stack = computeStackTraceByWalkingCallerChain(ex, depth + 1);
                if (stack) {
                    return stack;
                }
            }
            catch (e) {
                if (debug) {
                    throw e;
                }
            }
            return {
                name: ex.name,
                message: ex.message,
                mode: 'failed',
            };
        }
        /**
         * Logs a stacktrace starting from the previous call and working down.
         * @param {(number|string)=} depth How many frames deep to trace.
         * @return {TraceKit.StackTrace} Stack trace information.
         * @memberof TraceKit.computeStackTrace
         */
        function computeStackTraceOfCaller(depth) {
            depth = (depth == null ? 0 : +depth) + 1; // "+ 1" because "ofCaller" should drop one frame
            try {
                throw new Error();
            }
            catch (ex) {
                return computeStackTrace(ex, depth + 1);
            }
        }
        computeStackTrace.augmentStackTraceWithInitialElement = augmentStackTraceWithInitialElement;
        computeStackTrace.computeStackTraceFromStackProp = computeStackTraceFromStackProp;
        computeStackTrace.guessFunctionName = guessFunctionName;
        computeStackTrace.gatherContext = gatherContext;
        computeStackTrace.ofCaller = computeStackTraceOfCaller;
        computeStackTrace.getSource = getSource;
        return computeStackTrace;
    })();
    /**
     * Extends support for global error handling for asynchronous browser
     * functions. Adopted from Closure Library's errorhandler.js
     * @memberof TraceKit
     */
    TraceKit.extendToAsynchronousCallbacks = function () {
        var _helper = function _helper(fnName) {
            var originalFn = window$1[fnName];
            window$1[fnName] = function traceKitAsyncExtension() {
                // Make a copy of the arguments
                var args = _slice.call(arguments);
                var originalCallback = args[0];
                if (typeof originalCallback === 'function') {
                    args[0] = TraceKit.wrap(originalCallback);
                }
                // IE < 9 doesn't support .call/.apply on setInterval/setTimeout, but it
                // also only supports 2 argument and doesn't care what "this" is, so we
                // can just call the original function directly.
                if (originalFn.apply) {
                    return originalFn.apply(this, args);
                }
                else {
                    return originalFn(args[0], args[1]);
                }
            };
        };
        _helper('setTimeout');
        _helper('setInterval');
    };
    TraceKit.remoteFetching = false;
    TraceKit.collectWindowErrors = true;
    TraceKit.linesOfContext = 11;
    var subscribe = TraceKit.report.subscribe;
    var installGlobalHandler = TraceKit.report.installGlobalHandler;
    var installGlobalUnhandledRejectionHandler = TraceKit.report.installGlobalUnhandledRejectionHandler;
    var computeStackTrace = TraceKit.computeStackTrace;

    // Workaround for Rollup issue with overloading namespaces
    // https://github.com/rollup/rollup/issues/1267#issuecomment-296395734
    var md5$1 = (md5 || md5proxy);
    var STACKTRACE_LIMIT = 50;
    /** JSDoc */
    function exceptionFromStacktrace(stacktrace) {
        var frames = prepareFramesForEvent(stacktrace.stack);
        var exception = {
            stacktrace: { frames: frames },
            type: stacktrace.name,
            value: stacktrace.message,
        };
        // tslint:disable-next-line:strict-type-predicates
        if (exception.type === undefined && exception.value === '') {
            exception.value = 'Unrecoverable error caught';
        }
        return exception;
    }
    /** JSDoc */
    function eventFromPlainObject(exception, syntheticException) {
        var exceptionKeys = Object.keys(exception).sort();
        var event = {
            extra: {
                __serialized__: object_6(exception),
            },
            fingerprint: [md5$1(exceptionKeys.join(''))],
            message: "Non-Error exception captured with keys: " + object_7(exceptionKeys),
        };
        if (syntheticException) {
            var stacktrace = computeStackTrace(syntheticException);
            var frames_1 = prepareFramesForEvent(stacktrace.stack);
            event.stacktrace = {
                frames: frames_1,
            };
        }
        return event;
    }
    /** JSDoc */
    function eventFromStacktrace(stacktrace) {
        var exception = exceptionFromStacktrace(stacktrace);
        var transaction = stacktrace.url || (stacktrace.stack && stacktrace.stack[0].url) || '<unknown>';
        return {
            exception: {
                values: [exception],
            },
            transaction: transaction,
        };
    }
    /** JSDoc */
    function prepareFramesForEvent(stack) {
        if (!stack || !stack.length) {
            return [];
        }
        var localStack = stack;
        var firstFrameFunction = localStack[0].func || '';
        if (firstFrameFunction.includes('captureMessage') || firstFrameFunction.includes('captureException')) {
            localStack = localStack.slice(1);
        }
        // The frame where the crash happened, should be the last entry in the array
        return localStack
            .map(function (frame) { return ({
            colno: frame.column,
            filename: frame.url || localStack[0].url,
            function: frame.func || '?',
            in_app: true,
            lineno: frame.line,
        }); })
            .slice(0, STACKTRACE_LIMIT)
            .reverse();
    }

    /** Base Transport class implementation */
    var BaseTransport = /** @class */ (function () {
        function BaseTransport(options) {
            this.options = options;
            this.url = new dist_12(this.options.dsn).getStoreEndpointWithUrlEncodedAuth();
        }
        /**
         * @inheritDoc
         */
        BaseTransport.prototype.captureEvent = function (_) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    throw new dist_16('Transport Class has to implement `captureEvent` method');
                });
            });
        };
        return BaseTransport;
    }());

    var global$3 = misc_1();
    /** `fetch` based transport */
    var FetchTransport = /** @class */ (function (_super) {
        __extends(FetchTransport, _super);
        function FetchTransport() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @inheritDoc
         */
        FetchTransport.prototype.captureEvent = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var defaultOptions, response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            defaultOptions = {
                                body: object_1(event),
                                method: 'POST',
                                // Despite all stars in the sky saying that Edge supports old draft syntax, aka 'never', 'always', 'origin' and 'default
                                // https://caniuse.com/#feat=referrer-policy
                                // It doesn't. And it throw exception instead of ignoring this parameter...
                                // REF: https://github.com/getsentry/raven-js/issues/1233
                                referrerPolicy: (supports_8() ? 'origin' : ''),
                            };
                            return [4 /*yield*/, global$3.fetch(this.url, defaultOptions)];
                        case 1:
                            response = _a.sent();
                            return [2 /*return*/, {
                                    status: dist_2.fromHttpCode(response.status),
                                }];
                    }
                });
            });
        };
        return FetchTransport;
    }(BaseTransport));

    /** `XHR` based transport */
    var XHRTransport = /** @class */ (function (_super) {
        __extends(XHRTransport, _super);
        function XHRTransport() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @inheritDoc
         */
        XHRTransport.prototype.captureEvent = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var _this = this;
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            var request = new XMLHttpRequest();
                            request.onreadystatechange = function () {
                                if (request.readyState !== 4) {
                                    return;
                                }
                                if (request.status === 200) {
                                    resolve({
                                        status: dist_2.fromHttpCode(request.status),
                                    });
                                }
                                reject(request);
                            };
                            request.open('POST', _this.url);
                            request.send(object_1(event));
                        })];
                });
            });
        };
        return XHRTransport;
    }(BaseTransport));

    var global$4 = misc_1();
    /** `sendBeacon` based transport */
    var BeaconTransport = /** @class */ (function (_super) {
        __extends(BeaconTransport, _super);
        function BeaconTransport() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @inheritDoc
         */
        BeaconTransport.prototype.captureEvent = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var data, result;
                return __generator(this, function (_a) {
                    data = object_1(event);
                    result = global$4.navigator.sendBeacon(this.url, data);
                    return [2 /*return*/, {
                            status: result ? dist_2.Success : dist_2.Failed,
                        }];
                });
            });
        };
        return BeaconTransport;
    }(BaseTransport));



    var index$5 = /*#__PURE__*/Object.freeze({
        BaseTransport: BaseTransport,
        FetchTransport: FetchTransport,
        XHRTransport: XHRTransport,
        BeaconTransport: BeaconTransport
    });

    /** The Sentry Browser SDK Backend. */
    var BrowserBackend = /** @class */ (function (_super) {
        __extends(BrowserBackend, _super);
        function BrowserBackend() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @inheritDoc
         */
        BrowserBackend.prototype.install = function () {
            // We are only called by the client if the SDK is enabled and a valid Dsn
            // has been configured. If no Dsn is present, this indicates a programming
            // error.
            var dsn = this.options.dsn;
            if (!dsn) {
                throw new dist_16('Invariant exception: install() must not be called when disabled');
            }
            Error.stackTraceLimit = 50;
            return true;
        };
        /**
         * @inheritDoc
         */
        BrowserBackend.prototype.eventFromException = function (exception, hint) {
            return __awaiter(this, void 0, void 0, function () {
                var event, ex, ex, name_1, message, ex, ex;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(is_2(exception) && exception.error)) return [3 /*break*/, 1];
                            ex = exception;
                            exception = ex.error; // tslint:disable-line:no-parameter-reassignment
                            event = eventFromStacktrace(computeStackTrace(exception));
                            return [3 /*break*/, 7];
                        case 1:
                            if (!(is_3(exception) || is_4(exception))) return [3 /*break*/, 3];
                            ex = exception;
                            name_1 = ex.name || (is_3(ex) ? 'DOMError' : 'DOMException');
                            message = ex.message ? name_1 + ": " + ex.message : name_1;
                            return [4 /*yield*/, this.eventFromMessage(message, undefined, hint)];
                        case 2:
                            event = _a.sent();
                            return [3 /*break*/, 7];
                        case 3:
                            if (!is_1(exception)) return [3 /*break*/, 4];
                            // we have a real Error object, do nothing
                            event = eventFromStacktrace(computeStackTrace(exception));
                            return [3 /*break*/, 7];
                        case 4:
                            if (!(is_9(exception) && hint && hint.syntheticException)) return [3 /*break*/, 5];
                            ex = exception;
                            event = eventFromPlainObject(ex, hint.syntheticException);
                            return [3 /*break*/, 7];
                        case 5:
                            ex = exception;
                            return [4 /*yield*/, this.eventFromMessage(ex, undefined, hint)];
                        case 6:
                            event = _a.sent();
                            _a.label = 7;
                        case 7:
                            event = __assign({}, event, { event_id: hint && hint.event_id, exception: __assign({}, event.exception, { mechanism: {
                                        handled: true,
                                        type: 'generic',
                                    } }) });
                            return [2 /*return*/, event];
                    }
                });
            });
        };
        /**
         * @inheritDoc
         */
        BrowserBackend.prototype.eventFromMessage = function (message, level, hint) {
            if (level === void 0) { level = dist_1.Info; }
            return __awaiter(this, void 0, void 0, function () {
                var event, stacktrace, frames_1;
                return __generator(this, function (_a) {
                    event = {
                        event_id: hint && hint.event_id,
                        fingerprint: [message],
                        level: level,
                        message: message,
                    };
                    if (this.options.attachStacktrace && hint && hint.syntheticException) {
                        stacktrace = computeStackTrace(hint.syntheticException);
                        frames_1 = prepareFramesForEvent(stacktrace.stack);
                        event.stacktrace = {
                            frames: frames_1,
                        };
                    }
                    return [2 /*return*/, event];
                });
            });
        };
        /**
         * @inheritDoc
         */
        BrowserBackend.prototype.sendEvent = function (event) {
            return __awaiter(this, void 0, void 0, function () {
                var transportOptions;
                return __generator(this, function (_a) {
                    if (!this.options.dsn) {
                        dist_1$3.warn("Event has been skipped because no Dsn is configured.");
                        // We do nothing in case there is no DSN
                        return [2 /*return*/, { status: dist_2.Skipped, reason: "Event has been skipped because no Dsn is configured." }];
                    }
                    if (!this.transport) {
                        transportOptions = this.options.transportOptions
                            ? this.options.transportOptions
                            : { dsn: this.options.dsn };
                        if (this.options.transport) {
                            this.transport = new this.options.transport({ dsn: this.options.dsn });
                        }
                        else if (supports_6()) {
                            this.transport = new BeaconTransport(transportOptions);
                        }
                        else if (supports_4()) {
                            this.transport = new FetchTransport(transportOptions);
                        }
                        else {
                            this.transport = new XHRTransport(transportOptions);
                        }
                    }
                    return [2 /*return*/, this.transport.captureEvent(event)];
                });
            });
        };
        return BrowserBackend;
    }(dist_14));

    /**
     * The Sentry Browser SDK Client.
     *
     * @see BrowserOptions for documentation on configuration options.
     * @see SentryClient for usage documentation.
     */
    var BrowserClient = /** @class */ (function (_super) {
        __extends(BrowserClient, _super);
        /**
         * Creates a new Browser SDK instance.
         *
         * @param options Configuration options for this SDK.
         */
        function BrowserClient(options) {
            return _super.call(this, BrowserBackend, options) || this;
        }
        /**
         * @inheritDoc
         */
        BrowserClient.prototype.prepareEvent = function (event, scope, hint) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    event.platform = event.platform || 'javascript';
                    return [2 /*return*/, _super.prototype.prepareEvent.call(this, event, scope, hint)];
                });
            });
        };
        /** JSDoc */
        BrowserClient.prototype.showReportDialog = function (options) {
            // doesn't work without a document (React Native)
            var document = misc_1().document;
            if (!document) {
                return;
            }
            var dsn = options.dsn || this.getDsn();
            if (!options.eventId) {
                throw new dist_16('Missing `eventId` option in showReportDialog call');
            }
            if (!dsn) {
                throw new dist_16('Missing `Dsn` option in showReportDialog call');
            }
            var script = document.createElement('script');
            script.async = true;
            script.src = new dist_12(dsn).getReportDialogEndpoint(options);
            (document.head || document.body).appendChild(script);
        };
        return BrowserClient;
    }(dist_13));

    var debounceDuration = 1000;
    var keypressTimeout;
    var lastCapturedEvent;
    var ignoreOnError = 0;
    /** JSDoc */
    function shouldIgnoreOnError() {
        return ignoreOnError > 0;
    }
    /** JSDoc */
    function ignoreNextOnError() {
        // onerror should trigger before setTimeout
        ignoreOnError += 1;
        setTimeout(function () {
            ignoreOnError -= 1;
        });
    }
    /**
     * Instruments the given function and sends an event to Sentry every time the
     * function throws an exception.
     *
     * @param fn A function to wrap.
     * @returns The wrapped function.
     */
    function wrap(fn, options, before) {
        if (options === void 0) { options = {}; }
        if (!is_6(fn)) {
            return fn;
        }
        try {
            // We don't wanna wrap it twice
            if (fn.__sentry__) {
                return fn;
            }
            // If this has already been wrapped in the past, return that wrapped function
            if (fn.__sentry_wrapped__) {
                return fn.__sentry_wrapped__;
            }
        }
        catch (e) {
            // Just accessing custom props in some Selenium environments
            // can cause a "Permission denied" exception (see raven-js#495).
            // Bail on wrapping and return the function as-is (defers to window.onerror).
            return fn;
        }
        var wrapped = function () {
            var _this = this;
            if (before && is_6(before)) {
                before.apply(this, arguments);
            }
            try {
                // Attempt to invoke user-land function
                // NOTE: If you are a Sentry user, and you are seeing this stack frame, it
                //       means Raven caught an error invoking your application code. This is
                //       expected behavior and NOT indicative of a bug with Raven.js.
                var wrappedArguments = Array.from(arguments).map(function (arg) { return wrap(arg, options); });
                if (fn.handleEvent) {
                    return fn.handleEvent.apply(this, wrappedArguments);
                }
                else {
                    return fn.apply(this, wrappedArguments);
                }
            }
            catch (ex) {
                ignoreNextOnError();
                dist_7$1(function (scope) { return __awaiter(_this, void 0, void 0, function () {
                    var _this = this;
                    return __generator(this, function (_a) {
                        scope.addEventProcessor(function (event) { return __awaiter(_this, void 0, void 0, function () {
                            var processedEvent;
                            return __generator(this, function (_a) {
                                processedEvent = __assign({}, event);
                                if (options.mechanism) {
                                    processedEvent.exception = processedEvent.exception || {};
                                    processedEvent.exception.mechanism = options.mechanism;
                                }
                                return [2 /*return*/, processedEvent];
                            });
                        }); });
                        dist_8().captureException(ex, { originalException: ex });
                        return [2 /*return*/];
                    });
                }); });
                throw ex;
            }
        };
        // Accessing some objects may throw
        // ref: https://github.com/getsentry/sentry-javascript/issues/1168
        try {
            for (var property in fn) {
                if (Object.prototype.hasOwnProperty.call(fn, property)) {
                    wrapped[property] = fn[property];
                }
            }
        }
        catch (_oO) { } // tslint:disable-line:no-empty
        wrapped.prototype = fn.prototype;
        fn.__sentry_wrapped__ = wrapped;
        // Signal that this function has been wrapped/filled already
        // for both debugging and to prevent it to being wrapped/filled twice
        wrapped.__sentry__ = true;
        wrapped.__sentry_original__ = fn;
        return wrapped;
    }
    /**
     * Wraps addEventListener to capture UI breadcrumbs
     * @param eventName the event name (e.g. "click")
     * @returns wrapped breadcrumb events handler
     */
    function breadcrumbEventHandler(eventName) {
        return function (event) {
            // reset keypress timeout; e.g. triggering a 'click' after
            // a 'keypress' will reset the keypress debounce so that a new
            // set of keypresses can be recorded
            keypressTimeout = undefined;
            // It's possible this handler might trigger multiple times for the same
            // event (e.g. event propagation through node ancestors). Ignore if we've
            // already captured the event.
            if (lastCapturedEvent === event) {
                return;
            }
            lastCapturedEvent = event;
            // try/catch both:
            // - accessing event.target (see getsentry/raven-js#838, #768)
            // - `htmlTreeAsString` because it's complex, and just accessing the DOM incorrectly
            //   can throw an exception in some circumstances.
            var target;
            try {
                target = misc_3(event.target);
            }
            catch (e) {
                target = '<unknown>';
            }
            dist_8().addBreadcrumb({
                category: "ui." + eventName,
                message: target,
            }, {
                event: event,
                name: eventName,
            });
        };
    }
    /**
     * Wraps addEventListener to capture keypress UI events
     * @returns wrapped keypress events handler
     */
    function keypressEventHandler() {
        // TODO: if somehow user switches keypress target before
        //       debounce timeout is triggered, we will only capture
        //       a single breadcrumb from the FIRST target (acceptable?)
        return function (event) {
            var target;
            try {
                target = event.target;
            }
            catch (e) {
                // just accessing event properties can throw an exception in some rare circumstances
                // see: https://github.com/getsentry/raven-js/issues/838
                return;
            }
            var tagName = target && target.tagName;
            // only consider keypress events on actual input elements
            // this will disregard keypresses targeting body (e.g. tabbing
            // through elements, hotkeys, etc)
            if (!tagName || (tagName !== 'INPUT' && tagName !== 'TEXTAREA' && !target.isContentEditable)) {
                return;
            }
            // record first keypress in a series, but ignore subsequent
            // keypresses until debounce clears
            if (!keypressTimeout) {
                breadcrumbEventHandler('input')(event);
            }
            clearTimeout(keypressTimeout);
            keypressTimeout = setTimeout(function () {
                keypressTimeout = undefined;
            }, debounceDuration);
        };
    }

    /** Global handlers */
    var GlobalHandlers = /** @class */ (function () {
        function GlobalHandlers(options) {
            if (options === void 0) { options = {
                onerror: true,
                onunhandledrejection: true,
            }; }
            this.options = options;
            /**
             * @inheritDoc
             */
            this.name = 'GlobalHandlers';
        }
        /**
         * @inheritDoc
         */
        GlobalHandlers.prototype.install = function () {
            var _this = this;
            subscribe(function (stack, _, error) {
                // TODO: use stack.context to get a valuable information from TraceKit, eg.
                // [
                //   0: "  })"
                //   1: ""
                //   2: "  function foo () {"
                //   3: "    Sentry.captureException('some error')"
                //   4: "    Sentry.captureMessage('some message')"
                //   5: "    throw 'foo'"
                //   6: "  }"
                //   7: ""
                //   8: "  function bar () {"
                //   9: "    foo();"
                //   10: "  }"
                // ]
                if (shouldIgnoreOnError()) {
                    return;
                }
                dist_8().captureEvent(_this.eventFromGlobalHandler(stack), { originalException: error, data: { stack: stack } });
            });
            if (this.options.onerror) {
                dist_1$3.log('Global Handler attached: onerror');
                installGlobalHandler();
            }
            if (this.options.onunhandledrejection) {
                dist_1$3.log('Global Handler attached: onunhandledrejection');
                installGlobalUnhandledRejectionHandler();
            }
        };
        /** JSDoc */
        GlobalHandlers.prototype.eventFromGlobalHandler = function (stacktrace) {
            var event = eventFromStacktrace(stacktrace);
            return __assign({}, event, { exception: __assign({}, event.exception, { mechanism: {
                        handled: false,
                        type: stacktrace.mode === 'onerror' ? 'onerror' : 'onunhandledrejection',
                    } }) });
        };
        return GlobalHandlers;
    }());

    /** Wrap timer functions and event targets to catch errors and provide better meta data */
    var TryCatch = /** @class */ (function () {
        function TryCatch() {
            /** JSDoc */
            this.ignoreOnError = 0;
            /**
             * @inheritDoc
             */
            this.name = 'TryCatch';
        }
        /** JSDoc */
        TryCatch.prototype.wrapTimeFunction = function (original) {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var originalCallback = args[0];
                args[0] = wrap(originalCallback, {
                    mechanism: {
                        data: { function: original.name || '<anonymous>' },
                        handled: true,
                        type: 'instrument',
                    },
                });
                return original.apply(this, args);
            };
        };
        /** JSDoc */
        TryCatch.prototype.wrapRAF = function (original) {
            return function (callback) {
                return original(wrap(callback, {
                    mechanism: {
                        data: {
                            function: 'requestAnimationFrame',
                            handler: (original && original.name) || '<anonymous>',
                        },
                        handled: true,
                        type: 'instrument',
                    },
                }));
            };
        };
        /** JSDoc */
        TryCatch.prototype.wrapEventTarget = function (target) {
            var global = misc_1();
            var proto = global[target] && global[target].prototype;
            if (!proto || !proto.hasOwnProperty || !proto.hasOwnProperty('addEventListener')) {
                return;
            }
            object_4(proto, 'addEventListener', function (original) {
                return function (eventName, fn, options) {
                    try {
                        fn.handleEvent = wrap(fn.handleEvent.bind(fn), {
                            mechanism: {
                                data: {
                                    function: 'handleEvent',
                                    handler: fn.name || '<anonymous>',
                                    target: target,
                                },
                                handled: true,
                                type: 'instrument',
                            },
                        });
                    }
                    catch (err) {
                        // can sometimes get 'Permission denied to access property "handle Event'
                    }
                    // More breadcrumb DOM capture ... done here and not in `_instrumentBreadcrumbs`
                    // so that we don't have more than one wrapper function
                    var before;
                    var clickHandler;
                    var keypressHandler;
                    if (target === 'EventTarget' || target === 'Node') {
                        // NOTE: generating multiple handlers per addEventListener invocation, should
                        //       revisit and verify we can just use one (almost certainly)
                        clickHandler = breadcrumbEventHandler('click');
                        keypressHandler = keypressEventHandler();
                        before = function (event) {
                            // need to intercept every DOM event in `before` argument, in case that
                            // same wrapped method is re-used for different events (e.g. mousemove THEN click)
                            // see #724
                            if (!event) {
                                return;
                            }
                            var eventType;
                            try {
                                eventType = event.type;
                            }
                            catch (e) {
                                // just accessing event properties can throw an exception in some rare circumstances
                                // see: https://github.com/getsentry/raven-js/issues/838
                                return;
                            }
                            if (eventType === 'click') {
                                return clickHandler(event);
                            }
                            else if (eventType === 'keypress') {
                                return keypressHandler(event);
                            }
                        };
                    }
                    return original.call(this, eventName, wrap(fn, {
                        mechanism: {
                            data: {
                                function: 'addEventListener',
                                handler: fn.name || '<anonymous>',
                                target: target,
                            },
                            handled: true,
                            type: 'instrument',
                        },
                    }, before), options);
                };
            });
            object_4(proto, 'removeEventListener', function (original) {
                return function (eventName, fn, options) {
                    var callback = fn;
                    try {
                        callback = callback && (callback.__sentry_wrapped__ || callback);
                    }
                    catch (e) {
                        // ignore, accessing __sentry_wrapped__ will throw in some Selenium environments
                    }
                    return original.call(this, eventName, callback, options);
                };
            });
        };
        /**
         * Wrap timer functions and event targets to catch errors
         * and provide better metadata.
         */
        TryCatch.prototype.install = function () {
            this.ignoreOnError = this.ignoreOnError;
            var global = misc_1();
            object_4(global, 'setTimeout', this.wrapTimeFunction.bind(this));
            object_4(global, 'setInterval', this.wrapTimeFunction.bind(this));
            object_4(global, 'requestAnimationFrame', this.wrapRAF.bind(this));
            [
                'EventTarget',
                'Window',
                'Node',
                'ApplicationCache',
                'AudioTrackList',
                'ChannelMergerNode',
                'CryptoOperation',
                'EventSource',
                'FileReader',
                'HTMLUnknownElement',
                'IDBDatabase',
                'IDBRequest',
                'IDBTransaction',
                'KeyOperation',
                'MediaController',
                'MessagePort',
                'ModalWindow',
                'Notification',
                'SVGElementInstance',
                'Screen',
                'TextTrack',
                'TextTrackCue',
                'TextTrackList',
                'WebSocket',
                'WebSocketWorker',
                'Worker',
                'XMLHttpRequest',
                'XMLHttpRequestEventTarget',
                'XMLHttpRequestUpload',
            ].forEach(this.wrapEventTarget.bind(this));
        };
        return TryCatch;
    }());

    var global$5 = misc_1();
    var lastHref;
    /** JSDoc */
    function addSentryBreadcrumb(serializedData) {
        // There's always something that can go wrong with deserialization...
        try {
            var event_1 = object_2(serializedData);
            dist_8().addBreadcrumb({
                category: 'sentry',
                event_id: event_1.event_id,
                level: event_1.level || dist_1.fromString('error'),
                message: misc_6(event_1),
            }, {
                event: event_1,
            });
        }
        catch (_oO) {
            dist_1$3.error('Error while adding sentry type breadcrumb');
        }
    }
    /** Default Breadcrumbs instrumentations */
    var Breadcrumbs = /** @class */ (function () {
        /**
         * @inheritDoc
         */
        function Breadcrumbs(config) {
            if (config === void 0) { config = {
                beacon: true,
                console: true,
                dom: true,
                fetch: true,
                history: true,
                sentry: true,
                xhr: true,
            }; }
            this.config = config;
            /**
             * @inheritDoc
             */
            this.name = 'Breadcrumbs';
        }
        /** JSDoc */
        Breadcrumbs.prototype.instrumentBeacon = function (options) {
            if (!supports_6()) {
                return;
            }
            /** JSDoc */
            function beaconReplacementFunction(originalBeaconFunction) {
                return function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var url = args[0];
                    var data = args[1];
                    // If the browser successfully queues the request for delivery, the method returns "true" and returns "false" otherwise.
                    // https://developer.mozilla.org/en-US/docs/Web/API/Beacon_API/Using_the_Beacon_API
                    var result = originalBeaconFunction.apply(this, args);
                    // if Sentry key appears in URL, don't capture it as a request
                    // but rather as our own 'sentry' type breadcrumb
                    if (options.filterUrl && url.includes(options.filterUrl)) {
                        addSentryBreadcrumb(data);
                        return result;
                    }
                    // What is wrong with you TypeScript...
                    var breadcrumbData = {
                        category: 'beacon',
                        data: data,
                        type: 'http',
                    };
                    if (!result) {
                        breadcrumbData.level = dist_1.Error;
                    }
                    dist_8().addBreadcrumb(breadcrumbData, {
                        input: args,
                        result: result,
                    });
                    return result;
                };
            }
            object_4(global$5.navigator, 'sendBeacon', beaconReplacementFunction);
        };
        /** JSDoc */
        Breadcrumbs.prototype.instrumentConsole = function () {
            if (!('console' in global$5)) {
                return;
            }
            ['debug', 'info', 'warn', 'error', 'log'].forEach(function (level) {
                if (!(level in global$5.console)) {
                    return;
                }
                object_4(global$5.console, level, function (originalConsoleLevel) {
                    return function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        var breadcrumbData = {
                            category: 'console',
                            data: {
                                extra: {
                                    arguments: args.slice(1),
                                },
                                logger: 'console',
                            },
                            level: dist_1.fromString(level),
                            message: string_3(args, ' '),
                        };
                        if (level === 'assert') {
                            if (args[0] === false) {
                                breadcrumbData.message = "Assertion failed: " + (string_3(args.slice(1), ' ') || 'console.assert');
                                breadcrumbData.data.extra.arguments = args.slice(1);
                            }
                        }
                        dist_8().addBreadcrumb(breadcrumbData, {
                            input: args,
                            level: level,
                        });
                        // this fails for some browsers. :(
                        if (originalConsoleLevel) {
                            originalConsoleLevel.apply(global$5.console, args);
                        }
                    };
                });
            });
        };
        /** JSDoc */
        Breadcrumbs.prototype.instrumentDOM = function () {
            if (!('document' in global$5)) {
                return;
            }
            // Capture breadcrumbs from any click that is unhandled / bubbled up all the way
            // to the document. Do this before we instrument addEventListener.
            global$5.document.addEventListener('click', breadcrumbEventHandler('click'), false);
            global$5.document.addEventListener('keypress', keypressEventHandler(), false);
        };
        /** JSDoc */
        Breadcrumbs.prototype.instrumentFetch = function (options) {
            if (!supports_5()) {
                return;
            }
            object_4(global$5, 'fetch', function (originalFetch) {
                return function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var fetchInput = args[0];
                    var method = 'GET';
                    var url;
                    if (typeof fetchInput === 'string') {
                        url = fetchInput;
                    }
                    else if ('Request' in global$5 && fetchInput instanceof Request) {
                        url = fetchInput.url;
                        if (fetchInput.method) {
                            method = fetchInput.method;
                        }
                    }
                    else {
                        url = String(fetchInput);
                    }
                    if (args[1] && args[1].method) {
                        method = args[1].method;
                    }
                    // if Sentry key appears in URL, don't capture it as a request
                    // but rather as our own 'sentry' type breadcrumb
                    if (options.filterUrl && url.includes(options.filterUrl)) {
                        if (method === 'POST' && args[1] && args[1].body) {
                            addSentryBreadcrumb(args[1].body);
                        }
                        return originalFetch.apply(global$5, args);
                    }
                    var fetchData = {
                        method: method,
                        url: url,
                    };
                    return originalFetch
                        .apply(global$5, args)
                        .then(function (response) {
                        fetchData.status_code = response.status;
                        dist_8().addBreadcrumb({
                            category: 'fetch',
                            data: fetchData,
                            type: 'http',
                        }, {
                            input: args,
                            response: response,
                        });
                        return response;
                    })
                        .catch(function (error) {
                        dist_8().addBreadcrumb({
                            category: 'fetch',
                            data: fetchData,
                            level: dist_1.Error,
                            type: 'http',
                        }, {
                            error: error,
                            input: args,
                        });
                        throw error;
                    });
                };
            });
        };
        /** JSDoc */
        Breadcrumbs.prototype.instrumentHistory = function () {
            var _this = this;
            if (!supports_9()) {
                return;
            }
            var captureUrlChange = function (from, to) {
                var parsedLoc = misc_5(global$5.location.href);
                var parsedTo = misc_5(to);
                var parsedFrom = misc_5(from);
                // Initial pushState doesn't provide `from` information
                if (!parsedFrom.path) {
                    parsedFrom = parsedLoc;
                }
                // because onpopstate only tells you the "new" (to) value of location.href, and
                // not the previous (from) value, we need to track the value of the current URL
                // state ourselves
                lastHref = to;
                // Use only the path component of the URL if the URL matches the current
                // document (almost all the time when using pushState)
                if (parsedLoc.protocol === parsedTo.protocol && parsedLoc.host === parsedTo.host) {
                    // tslint:disable-next-line:no-parameter-reassignment
                    to = parsedTo.relative;
                }
                if (parsedLoc.protocol === parsedFrom.protocol && parsedLoc.host === parsedFrom.host) {
                    // tslint:disable-next-line:no-parameter-reassignment
                    from = parsedFrom.relative;
                }
                dist_8().addBreadcrumb({
                    category: 'navigation',
                    data: {
                        from: from,
                        to: to,
                    },
                });
            };
            // record navigation (URL) changes
            var oldOnPopState = global$5.onpopstate;
            global$5.onpopstate = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var currentHref = global$5.location.href;
                captureUrlChange(lastHref, currentHref);
                if (oldOnPopState) {
                    return oldOnPopState.apply(_this, args);
                }
            };
            /** JSDoc */
            function historyReplacementFunction(originalHistoryFunction) {
                // note history.pushState.length is 0; intentionally not declaring
                // params to preserve 0 arity
                return function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var url = args.length > 2 ? args[2] : undefined;
                    // url argument is optional
                    if (url) {
                        // coerce to string (this is what pushState does)
                        captureUrlChange(lastHref, String(url));
                    }
                    return originalHistoryFunction.apply(this, args);
                };
            }
            object_4(global$5.history, 'pushState', historyReplacementFunction);
            object_4(global$5.history, 'replaceState', historyReplacementFunction);
        };
        /** JSDoc */
        Breadcrumbs.prototype.instrumentXHR = function (options) {
            if (!('XMLHttpRequest' in global$5)) {
                return;
            }
            /** JSDoc */
            function wrapProp(prop, xhr) {
                // TODO: Fix XHR types
                if (prop in xhr && is_6(xhr[prop])) {
                    object_4(xhr, prop, function (original) {
                        return wrap(original, {
                            mechanism: {
                                data: {
                                    function: prop,
                                    handler: (original && original.name) || '<anonymous>',
                                },
                                handled: true,
                                type: 'instrument',
                            },
                        });
                    });
                }
            }
            var xhrproto = XMLHttpRequest.prototype;
            object_4(xhrproto, 'open', function (originalOpen) {
                return function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var url = args[1];
                    this.__sentry_xhr__ = {
                        method: args[0],
                        url: args[1],
                    };
                    // if Sentry key appears in URL, don't capture it as a request
                    // but rather as our own 'sentry' type breadcrumb
                    if (is_7(url) && (options.filterUrl && url.includes(options.filterUrl))) {
                        this.__sentry_own_request__ = true;
                    }
                    return originalOpen.apply(this, args);
                };
            });
            object_4(xhrproto, 'send', function (originalSend) {
                return function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    var xhr = this; // tslint:disable-line:no-this-assignment
                    if (xhr.__sentry_own_request__) {
                        addSentryBreadcrumb(args[0]);
                    }
                    /** JSDoc */
                    function onreadystatechangeHandler() {
                        if (xhr.readyState === 4) {
                            if (xhr.__sentry_own_request__) {
                                return;
                            }
                            try {
                                // touching statusCode in some platforms throws
                                // an exception
                                if (xhr.__sentry_xhr__) {
                                    xhr.__sentry_xhr__.status_code = xhr.status;
                                }
                            }
                            catch (e) {
                                /* do nothing */
                            }
                            dist_8().addBreadcrumb({
                                category: 'xhr',
                                data: xhr.__sentry_xhr__,
                                type: 'http',
                            }, {
                                xhr: xhr,
                            });
                        }
                    }
                    ['onload', 'onerror', 'onprogress'].forEach(function (prop) {
                        wrapProp(prop, xhr);
                    });
                    if ('onreadystatechange' in xhr && is_6(xhr.onreadystatechange)) {
                        object_4(xhr, 'onreadystatechange', function (original) {
                            return wrap(original, {
                                mechanism: {
                                    data: {
                                        function: 'onreadystatechange',
                                        handler: (original && original.name) || '<anonymous>',
                                    },
                                    handled: true,
                                    type: 'instrument',
                                },
                            }, onreadystatechangeHandler);
                        });
                    }
                    else {
                        // if onreadystatechange wasn't actually set by the page on this xhr, we
                        // are free to set our own and capture the breadcrumb
                        xhr.onreadystatechange = onreadystatechangeHandler;
                    }
                    return originalSend.apply(this, args);
                };
            });
        };
        /**
         * Instrument browser built-ins w/ breadcrumb capturing
         *  - Console API
         *  - DOM API (click/typing)
         *  - XMLHttpRequest API
         *  - Fetch API
         *  - History API
         *
         * Can be disabled or individually configured via the `autoBreadcrumbs` config option
         */
        Breadcrumbs.prototype.install = function (options) {
            if (options === void 0) { options = {}; }
            var filterUrl = options.dsn && new dist_12(options.dsn).getStoreEndpoint();
            if (this.config.console) {
                this.instrumentConsole();
            }
            if (this.config.dom) {
                this.instrumentDOM();
            }
            if (this.config.xhr) {
                this.instrumentXHR({ filterUrl: filterUrl });
            }
            if (this.config.fetch) {
                this.instrumentFetch({ filterUrl: filterUrl });
            }
            if (this.config.beacon) {
                this.instrumentBeacon({ filterUrl: filterUrl });
            }
            if (this.config.history) {
                this.instrumentHistory();
            }
        };
        return Breadcrumbs;
    }());

    var DEFAULT_KEY = 'cause';
    var DEFAULT_LIMIT = 5;
    /** Adds SDK info to an event. */
    var LinkedErrors = /** @class */ (function () {
        /**
         * @inheritDoc
         */
        function LinkedErrors(options) {
            if (options === void 0) { options = {}; }
            /**
             * @inheritDoc
             */
            this.name = 'LinkedErrors';
            this.key = options.key || DEFAULT_KEY;
            this.limit = options.limit || DEFAULT_LIMIT;
        }
        /**
         * @inheritDoc
         */
        LinkedErrors.prototype.install = function () {
            var _this = this;
            dist_6$1(function (scope) { return scope.addEventProcessor(_this.handler.bind(_this)); });
        };
        /**
         * @inheritDoc
         */
        LinkedErrors.prototype.handler = function (event, hint) {
            if (!event.exception || !event.exception.values || !hint || !(hint.originalException instanceof Error)) {
                return event;
            }
            var linkedErrors = this.walkErrorTree(hint.originalException, this.key);
            event.exception.values = __spread(event.exception.values, linkedErrors);
            return event;
        };
        /**
         * @inheritDoc
         */
        LinkedErrors.prototype.walkErrorTree = function (error, key, stack) {
            if (stack === void 0) { stack = []; }
            if (!(error[key] instanceof Error) || stack.length >= this.limit) {
                return stack;
            }
            var stacktrace = computeStackTrace(error[key]);
            var exception = exceptionFromStacktrace(stacktrace);
            return this.walkErrorTree(error[key], key, __spread(stack, [exception]));
        };
        return LinkedErrors;
    }());

    /** JSDoc */
    var ReportTypes;
    (function (ReportTypes) {
        /** JSDoc */
        ReportTypes["Crash"] = "crash";
        /** JSDoc */
        ReportTypes["Deprecation"] = "deprecation";
        /** JSDoc */
        ReportTypes["Intervention"] = "intervention";
    })(ReportTypes || (ReportTypes = {}));
    /** Reporting API integration - https://w3c.github.io/reporting/ */
    var ReportingObserver = /** @class */ (function () {
        /**
         * @inheritDoc
         */
        function ReportingObserver(config) {
            if (config === void 0) { config = {
                types: [ReportTypes.Crash, ReportTypes.Deprecation, ReportTypes.Intervention],
            }; }
            this.config = config;
            /**
             * @inheritDoc
             */
            this.name = 'ReportingObserver';
        }
        /**
         * @inheritDoc
         */
        ReportingObserver.prototype.install = function () {
            if (!supports_7()) {
                return;
            }
            var observer = new (misc_1().ReportingObserver)(this.handler.bind(this), {
                buffered: true,
                types: this.config.types,
            });
            observer.observe();
        };
        /**
         * @inheritDoc
         */
        ReportingObserver.prototype.handler = function (reports) {
            var e_1, _a;
            var _loop_1 = function (report) {
                dist_7$1(function (scope) {
                    scope.setExtra('url', report.url);
                    var label = "ReportingObserver [" + report.type + "]";
                    var details = 'No details available';
                    if (report.body) {
                        // Object.keys doesn't work on ReportBody, as all properties are inheirted
                        var plainBody = {};
                        // tslint:disable-next-line:forin
                        for (var prop in report.body) {
                            plainBody[prop] = report.body[prop];
                        }
                        scope.setExtra('body', plainBody);
                        if (report.type === ReportTypes.Crash) {
                            var body = report.body;
                            details = body.crashId + " " + body.reason;
                        }
                        else {
                            var body = report.body;
                            details = body.message;
                        }
                    }
                    dist_5$1(label + ": " + details);
                });
            };
            try {
                for (var reports_1 = __values(reports), reports_1_1 = reports_1.next(); !reports_1_1.done; reports_1_1 = reports_1.next()) {
                    var report = reports_1_1.value;
                    _loop_1(report);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (reports_1_1 && !reports_1_1.done && (_a = reports_1.return)) _a.call(reports_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        return ReportingObserver;
    }());

    var global$6 = misc_1();
    /** UserAgent */
    var UserAgent = /** @class */ (function () {
        function UserAgent() {
            /**
             * @inheritDoc
             */
            this.name = 'UserAgent';
        }
        /**
         * @inheritDoc
         */
        UserAgent.prototype.install = function () {
            var _this = this;
            dist_6$1(function (scope) {
                scope.addEventProcessor(function (event) { return __awaiter(_this, void 0, void 0, function () {
                    var request;
                    return __generator(this, function (_a) {
                        if (!global$6.navigator || !global$6.location) {
                            return [2 /*return*/, event];
                        }
                        request = event.request || {};
                        request.url = request.url || global$6.location.href;
                        request.headers = request.headers || {};
                        request.headers['User-Agent'] = global$6.navigator.userAgent;
                        return [2 /*return*/, __assign({}, event, { request: request })];
                    });
                }); });
            });
        };
        return UserAgent;
    }());

    /** JSDoc */
    var Ember = /** @class */ (function () {
        /**
         * @inheritDoc
         */
        function Ember(options) {
            if (options === void 0) { options = {}; }
            /**
             * @inheritDoc
             */
            this.name = 'Ember';
            this.Ember =
                options.Ember ||
                    misc_1().Ember;
        }
        /**
         * @inheritDoc
         */
        Ember.prototype.install = function () {
            var _this = this;
            if (!this.Ember) {
                return;
            }
            var oldOnError = this.Ember.onerror;
            this.Ember.onerror = function (error) {
                dist_7$1(function (scope) {
                    _this.addIntegrationToSdkInfo(scope);
                    dist_8().captureException(error, { originalException: error });
                });
                if (typeof oldOnError === 'function') {
                    oldOnError.call(_this.Ember, error);
                }
            };
            this.Ember.RSVP.on('error', function (reason) {
                var scope = dist_8().pushScope();
                if (reason instanceof Error) {
                    scope.setExtra('context', 'Unhandled Promise error detected');
                    _this.addIntegrationToSdkInfo(scope);
                    dist_8().captureException(reason, { originalException: reason });
                }
                else {
                    scope.setExtra('reason', reason);
                    _this.addIntegrationToSdkInfo(scope);
                    dist_5$1('Unhandled Promise error detected');
                }
                dist_8().popScope();
            });
        };
        /**
         * Appends SDK integrations
         * @param scope The scope currently used.
         */
        Ember.prototype.addIntegrationToSdkInfo = function (scope) {
            var _this = this;
            scope.addEventProcessor(function (event) { return __awaiter(_this, void 0, void 0, function () {
                var integrations;
                return __generator(this, function (_a) {
                    if (event.sdk) {
                        integrations = event.sdk.integrations || [];
                        event.sdk = __assign({}, event.sdk, { integrations: __spread(integrations, ['ember']) });
                    }
                    return [2 /*return*/, event];
                });
            }); });
        };
        return Ember;
    }());

    /** JSDoc */
    var Vue = /** @class */ (function () {
        /**
         * @inheritDoc
         */
        function Vue(options) {
            if (options === void 0) { options = {}; }
            /**
             * @inheritDoc
             */
            this.name = 'Vue';
            this.Vue =
                options.Vue ||
                    misc_1().Vue;
        }
        /** JSDoc */
        Vue.prototype.formatComponentName = function (vm) {
            if (vm.$root === vm) {
                return 'root instance';
            }
            var name = vm._isVue ? vm.$options.name || vm.$options._componentTag : vm.name;
            return ((name ? "component <" + name + ">" : 'anonymous component') +
                (vm._isVue && vm.$options.__file ? " at " + vm.$options.__file : ''));
        };
        /**
         * @inheritDoc
         */
        Vue.prototype.install = function () {
            var _this = this;
            if (!this.Vue || !this.Vue.config) {
                return;
            }
            var oldOnError = this.Vue.config.errorHandler;
            this.Vue.config.errorHandler = function (error, vm, info) {
                var metadata = {};
                if (is_9(vm)) {
                    metadata.componentName = _this.formatComponentName(vm);
                    metadata.propsData = vm.$options.propsData;
                }
                if (!is_5(info)) {
                    metadata.lifecycleHook = info;
                }
                dist_7$1(function (scope) {
                    Object.keys(metadata).forEach(function (key) {
                        scope.setExtra(key, metadata[key]);
                    });
                    scope.addEventProcessor(function (event) { return __awaiter(_this, void 0, void 0, function () {
                        var integrations;
                        return __generator(this, function (_a) {
                            if (event.sdk) {
                                integrations = event.sdk.integrations || [];
                                event.sdk = __assign({}, event.sdk, { integrations: __spread(integrations, ['vue']) });
                            }
                            return [2 /*return*/, event];
                        });
                    }); });
                    dist_8().captureException(error, { originalException: error });
                });
                if (typeof oldOnError === 'function') {
                    oldOnError.call(_this.Vue, error, vm, info);
                }
            };
        };
        return Vue;
    }());



    var BrowserIntegrations = /*#__PURE__*/Object.freeze({
        GlobalHandlers: GlobalHandlers,
        TryCatch: TryCatch,
        Breadcrumbs: Breadcrumbs,
        LinkedErrors: LinkedErrors,
        ReportingObserver: ReportingObserver,
        UserAgent: UserAgent,
        Ember: Ember,
        Vue: Vue
    });

    var SDK_NAME = 'sentry.javascript.browser';
    var SDK_VERSION = '4.0.4';

    var defaultIntegrations = [
        // Common
        new dist_20.Dedupe(),
        new dist_20.InboundFilters(),
        new dist_20.FunctionToString(),
        new dist_20.SDKInformation({
            name: 'npm:@sentry/browser',
            sdkName: SDK_NAME,
            sdkVersion: SDK_VERSION,
        }),
        // Native Wrappers
        new TryCatch(),
        new Breadcrumbs(),
        // Global Handlers
        new GlobalHandlers(),
        new ReportingObserver(),
        // Misc
        new LinkedErrors(),
        new UserAgent(),
    ];
    /**
     * The Sentry Browser SDK Client.
     *
     * To use this SDK, call the {@link init} function as early as possible when
     * loading the web page. To set context information or send manual events, use
     * the provided methods.
     *
     * @example
     * import { init } from '@sentry/browser';
     *
     * init({
     *   dsn: '__DSN__',
     *   // ...
     * });
     *
     * @example
     * import { configureScope } from '@sentry/browser';
     * configureScope((scope: Scope) => {
     *   scope.setExtra({ battery: 0.7 });
     *   scope.setTags({ user_mode: 'admin' });
     *   scope.setUser({ id: '4711' });
     * });
     *
     * @example
     * import { addBreadcrumb } from '@sentry/browser';
     * addBreadcrumb({
     *   message: 'My Breadcrumb',
     *   // ...
     * });
     *
     * @example
     * import * as Sentry from '@sentry/browser';
     * Sentry.captureMessage('Hello, world!');
     * Sentry.captureException(new Error('Good bye'));
     * Sentry.captureEvent({
     *   message: 'Manual',
     *   stacktrace: [
     *     // ...
     *   ],
     * });
     *
     * @see BrowserOptions for documentation on configuration options.
     */
    function init(options) {
        dist_19(BrowserClient, options, defaultIntegrations);
    }
    /**
     * Present the user with a report dialog.
     *
     * @param options Everything is optional, we try to fetch all info need from the global scope.
     */
    function showReportDialog(options) {
        if (options === void 0) { options = {}; }
        if (!options.eventId) {
            options.eventId = dist_8().lastEventId();
        }
        dist_8().getClient().showReportDialog(options);
    }
    /**
     * This is the getter for lastEventId.
     *
     * @returns The last event id of a captured event.
     */
    function lastEventId() {
        return dist_8().lastEventId();
    }
    /**
     * This function is here to be API compatible with the loader
     */
    function forceLoad() {
        // Noop
    }
    /**
     * This function is here to be API compatible with the loader
     */
    function onLoad(callback) {
        callback();
    }

    var INTEGRATIONS = __assign({}, dist_20, BrowserIntegrations);

    exports.Integrations = INTEGRATIONS;
    exports.Transports = index$5;
    exports.Severity = dist_1;
    exports.Status = dist_2;
    exports.addBreadcrumb = dist_2$3;
    exports.captureException = dist_3$2;
    exports.captureEvent = dist_4$2;
    exports.captureMessage = dist_5$1;
    exports.configureScope = dist_6$1;
    exports.withScope = dist_7$1;
    exports.getHubFromCarrier = dist_10;
    exports.getCurrentHub = dist_8;
    exports.Hub = dist_9;
    exports.Scope = dist_11;
    exports.BrowserBackend = BrowserBackend;
    exports.BrowserClient = BrowserClient;
    exports.defaultIntegrations = defaultIntegrations;
    exports.forceLoad = forceLoad;
    exports.init = init;
    exports.lastEventId = lastEventId;
    exports.onLoad = onLoad;
    exports.showReportDialog = showReportDialog;
    exports.SDK_NAME = SDK_NAME;
    exports.SDK_VERSION = SDK_VERSION;

    return exports;

}({}));
//# sourceMappingURL=bundle.js.map
