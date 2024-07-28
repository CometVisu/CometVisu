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
      "cv.ui.structure.tile.components.AbstractComponent": {
        "require": true
      },
      "cv.ui.structure.tile.MVisibility": {
        "require": true
      },
      "cv.ui.structure.tile.MRefresh": {
        "require": true
      },
      "cv.io.rest.Client": {},
      "cv.ui.structure.tile.Controller": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* Image.js
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
   * Shows an image.
   *
   * HINT: Proxy mode needs an PHP environment with php-curl installed.
   */
  qx.Class.define('cv.ui.structure.tile.components.Image', {
    extend: cv.ui.structure.tile.components.AbstractComponent,
    include: [cv.ui.structure.tile.MVisibility, cv.ui.structure.tile.MRefresh],
    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _downloadedImage: null,
      _url: null,
      _headers: null,
      _request: null,
      _init: function _init() {
        var _this = this;
        var element = this._element;
        var img = element.querySelector(':scope > img');
        if (!img) {
          img = document.createElement('img');
          element.appendChild(img);
        }
        element.addEventListener('click', function () {
          return _this.refresh();
        });
        var src = element.getAttribute('src');
        var base = window.location.origin;
        if (src.substring(0, 1) !== '/' && src.substring(0, 4) !== 'http') {
          // relative url
          base += window.location.pathname;
        }
        this._url = new URL(src, base);
        var useProxy = element.hasAttribute('proxy') && element.getAttribute('proxy') === 'true';
        if (useProxy) {
          this._url = new URL(cv.io.rest.Client.getBaseUrl() + '/proxy', window.location.origin);
          this._url.searchParams.set('url', element.getAttribute('src'));
        }
        this._headers = {};
        if (element.hasAttribute('auth-type')) {
          if (useProxy) {
            this._url.searchParams.set('auth-type', element.getAttribute('auth-type').toLowerCase());
          } else {
            switch (element.getAttribute('auth-type').toLowerCase()) {
              case 'basic':
                this._headers['Authorization'] = 'Basic ' + window.btoa(element.getAttribute('username') + ':' + element.getAttribute('password'));
                break;
              case 'bearer':
                this._headers['Authorization'] = 'Bearer ' + element.getAttribute('username');
                break;
              default:
                this.error('unknown authorization type' + element.getAttribute('auth-type'));
                break;
            }
          }
        }
        this._loadImage();
        if (element.hasAttribute('refresh')) {
          this.setRefresh(parseInt(element.getAttribute('refresh')));
        }
      },
      _loadImage: function _loadImage() {
        var _this2 = this;
        var img = this._element.querySelector(':scope > img');
        if (Object.keys(this._headers).length > 0) {
          var request = new XMLHttpRequest();
          request.responseType = 'blob';
          request.open('get', this._url.toString(), true);
          Object.keys(this._headers).forEach(function (name) {
            request.setRequestHeader(name, _this2._headers[name]);
          });
          request.onreadystatechange = function (e) {
            if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
              img.src = URL.createObjectURL(request.response);
              img.onload = function () {
                URL.revokeObjectURL(img.src);
              };
            }
          };
          request.send(null);
        } else {
          img.src = this._url.toString();
        }
      },
      refresh: function refresh() {
        var img = this._element.querySelector(':scope > img');
        if (img) {
          this._url.searchParams.set('r', '' + Math.random());
          this._loadImage();
        }
      },
      /**
       * Handles the incoming data from the backend for this widget
       *
       * @param ev {CustomEvent} stateUpdate event fired from a cv-address component
       */
      onStateUpdate: function onStateUpdate(ev) {
        if (!cv.ui.structure.tile.components.Image.superclass.prototype.onStateUpdate.call(this, ev)) {
          if (ev.detail.target === 'refresh') {
            if (ev.detail.state) {
              this.refresh();
            }
          } else {
            this.debug('unhandled address target', ev.detail.target);
          }
        }
      }
    },
    defer: function defer(QxClass) {
      customElements.define(cv.ui.structure.tile.Controller.PREFIX + 'image', /*#__PURE__*/function (_QxConnector) {
        "use strict";

        function _class() {
          _classCallCheck(this, _class);
          return _callSuper(this, _class, [QxClass]);
        }
        _inherits(_class, _QxConnector);
        return _createClass(_class);
      }(QxConnector));
    }
  });
  cv.ui.structure.tile.components.Image.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Image.js.map?dt=1722151812437