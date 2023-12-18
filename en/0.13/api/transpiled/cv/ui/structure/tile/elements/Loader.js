function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
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

        _inherits(_class, _QxConnector);
        var _super = _createSuper(_class);
        function _class() {
          _classCallCheck(this, _class);
          return _super.call(this, Clazz);
        }
        return _createClass(_class);
      }(QxConnector));
    }
  });
  cv.ui.structure.tile.elements.Loader.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Loader.js.map?dt=1702901294170