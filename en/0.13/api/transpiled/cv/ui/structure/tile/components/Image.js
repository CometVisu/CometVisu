function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

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
          switch (element.getAttribute('auth-type').toLowerCase()) {
            case 'basic':
              if (useProxy) {
                this._url.searchParams.set('authorization', 'Basic ' + window.btoa(element.getAttribute('username') + ':' + element.getAttribute('password')));
              } else {
                this._headers['Authorization'] = 'Basic ' + window.btoa(element.getAttribute('username') + ':' + element.getAttribute('password'));
              }

              break;
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

        _inherits(_class, _QxConnector);

        var _super = _createSuper(_class);

        function _class() {
          _classCallCheck(this, _class);

          return _super.call(this, QxClass);
        }

        return _class;
      }(QxConnector));
    }
  });
  cv.ui.structure.tile.components.Image.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Image.js.map?dt=1664560747121