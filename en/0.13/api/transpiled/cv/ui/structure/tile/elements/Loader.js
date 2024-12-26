function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.structure.tile.elements.AbstractCustomElement": {
        "require": true
      },
      "qx.io.request.Xhr": {},
      "cv.Config": {},
      "cv.Application": {},
      "qx.util.Request": {},
      "qx.locale.Manager": {},
      "cv.core.notifications.Router": {},
      "cv.ui.structure.tile.Controller": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* Loader.js
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
   * Loads external content like CSS/JS files, config-content or a template file.
   *
   *  @author Tobias Bräutigam
   *  @since 2022
   */
  qx.Class.define('cv.ui.structure.tile.elements.Loader', {
    extend: cv.ui.structure.tile.elements.AbstractCustomElement,
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _init: function _init() {
        var element = this._element;
        var type = element.getAttribute('type');
        var src = element.getAttribute('src');
        var loaderElement;
        if (src) {
          switch (type) {
            case 'css':
              loaderElement = document.createElement('link');
              loaderElement.setAttribute('type', 'text/css');
              loaderElement.setAttribute('rel', 'stylesheet');
              loaderElement.setAttribute('href', src);
              break;
            case 'js':
              loaderElement = document.createElement('script');
              loaderElement.setAttribute('type', 'text/javascript');
              loaderElement.setAttribute('src', src);
              break;
            case 'templates':
              this.loadXml(src, type);
              break;
          }
          if (loaderElement) {
            element.appendChild(loaderElement);
          }
        }
      },
      loadXml: function loadXml(uri) {
        var _this = this;
        var ajaxRequest = new qx.io.request.Xhr(uri);
        ajaxRequest.set({
          accept: 'application/xml',
          cache: !cv.Config.forceReload
        });
        ajaxRequest.addListenerOnce('success', function (e) {
          var content = e.getTarget().getResponse();
          var htmlContent = content;
          var target = cv.Application.structureController.getRenderTarget();
          // we need the documents to be in HTML namespace
          if (!htmlContent.documentElement.xmlns) {
            var text = e.getTarget().getResponseText();
            text = text.replace('<templates', '<templates xmlns="http://www.w3.org/1999/xhtml"');
            var parser = new DOMParser();
            htmlContent = parser.parseFromString(text, 'text/xml');
          }
          var child;
          while (child = htmlContent.documentElement.firstElementChild) {
            target.appendChild(child);
          }
          // register custom elements for templates in this document
          cv.Application.structureController.registerTemplates(content);
        });
        ajaxRequest.addListener('statusError', function (e) {
          var status = e.getTarget().getTransport().status;
          if (!qx.util.Request.isSuccessful(status)) {
            _this.handleError('filenotfound', ajaxRequest.getUrl());
          } else {
            _this.handleError(status, null);
          }
        });
        ajaxRequest.send();
      },
      handleError: function handleError(textStatus, additionalErrorInfo) {
        var title = qx.locale.Manager.tr('File Error!').translate().toString();
        var message = '';
        var actions;
        switch (textStatus) {
          case 'parsererror':
            message = qx.locale.Manager.tr('Invalid XML file!');
            break;
          case 'filenotfound':
            message = qx.locale.Manager.tr('404: File not found, %1.', additionalErrorInfo).translate().toString();
            break;
          default:
            message = qx.locale.Manager.tr('Unhandled error of type "%1"', textStatus).translate().toString();
            if (additionalErrorInfo) {
              message += ': ' + additionalErrorInfo;
            } else {
              message += '.';
            }
        }
        var notification = {
          topic: 'cv.error',
          title: title,
          message: message
        };
        if (actions) {
          notification.actions = actions;
        }
        cv.core.notifications.Router.dispatchMessage(notification.topic, notification);
        this.error(this, message.toString());
      }
    },
    defer: function defer(Clazz) {
      customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'loader', /*#__PURE__*/function (_QxConnector) {
        "use strict";

        function _class() {
          _classCallCheck(this, _class);
          return _callSuper(this, _class, [Clazz]);
        }
        _inherits(_class, _QxConnector);
        return _createClass(_class);
      }(QxConnector));
    }
  });
  cv.ui.structure.tile.elements.Loader.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Loader.js.map?dt=1735222413101