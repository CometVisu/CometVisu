function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
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
      "qx.data.Array": {
        "construct": true
      },
      "qx.util.ResourceManager": {},
      "cv.Config": {},
      "qx.io.request.Xhr": {},
      "qx.core.Init": {},
      "cv.Version": {},
      "qx.util.Request": {},
      "qx.util.LibraryManager": {},
      "qx.xml.Document": {},
      "qx.locale.Manager": {},
      "cv.core.notifications.Router": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ConfigLoader.js
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
   * The ConfigLoader loads CometVisu config files from the backend. If the loaded config file contains
   * <include> elements those config parts are loaded and add to the XML-Document.
   *
   * @author Tobias Bräutigam <tbraeutigam@gmail.com>
   * @since 2018
   */

  qx.Class.define('cv.util.ConfigLoader', {
    extend: qx.core.Object,
    /*
    ******************************************************
      CONSTRUCTOR
    ******************************************************
    */
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.__P_530_0 = new qx.data.Array();
    },
    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      __P_530_0: null,
      __P_530_1: null,
      __P_530_2: null,
      __P_530_3: null,
      /**
       * Load a config file
       * @param callback
       * @param context
       */
      load: function load(callback, context) {
        var _this = this;
        this.__P_530_1 = callback;
        this.__P_530_2 = context;
        // get the data once the page was loaded
        var uri = qx.util.ResourceManager.getInstance().toUri('config/visu_config' + (cv.Config.configSuffix ? '_' + cv.Config.configSuffix : '') + '.xml');
        if (cv.Config.testMode) {
          // workaround for e2e-tests
          uri = 'resource/config/visu_config' + (cv.Config.configSuffix ? '_' + cv.Config.configSuffix : '') + '.xml';
        } else if (uri.indexOf('resource/') === -1) {
          // unknown config, try to add the resource part manually
          uri = uri.replace('config/', 'resource/config/');
        }
        this.debug('Requesting ' + uri);
        var ajaxRequest = new qx.io.request.Xhr(uri);
        this.__P_530_0.push(uri);
        ajaxRequest.set({
          accept: 'application/xml',
          cache: !cv.Config.forceReload
        });
        ajaxRequest.setUserData('noDemo', true);
        ajaxRequest.addListenerOnce('success', function (e) {
          qx.core.Init.getApplication().block(false);
          var req = e.getTarget();
          cv.Config.configServer = req.getResponseHeader('Server');
          var isTileStructure = /<config/m.test(req.getResponseText());
          // Response parsed according to the server's response content type
          var xml = req.getResponse();
          if (xml && typeof xml === 'string') {
            var parser = new DOMParser();
            if (isTileStructure) {
              xml = xml.replace('<config', '<config xmlns="http://www.w3.org/1999/xhtml"');
            }
            xml = parser.parseFromString(xml, 'text/xml');
          }
          if (!xml || !xml.documentElement || xml.getElementsByTagName('parsererror').length) {
            _this.configError('parsererror');
          } else {
            if (isTileStructure && !xml.documentElement.xmlns) {
              // wrong namespace
              var rawContent = req.getResponseText().replace('<config', '<config xmlns="http://www.w3.org/1999/xhtml"');
              var _parser = new DOMParser();
              xml = _parser.parseFromString(rawContent, 'text/xml');
            }
            _this.__P_530_3 = xml;
            xml.querySelectorAll('include').forEach(_this.loadInclude, _this);
            _this.__P_530_0.remove(ajaxRequest.getUrl());
            var systemLibVersion = isTileStructure ? cv.Version.LIBRARY_VERSION_TILE : cv.Version.LIBRARY_VERSION_PURE;
            // check the library version
            var xmlLibVersion = isTileStructure ? xml.documentElement.getAttribute('version') : xml.documentElement.getAttribute('lib_version');
            if (xmlLibVersion === undefined || xmlLibVersion === null) {
              xmlLibVersion = -1;
            } else if (xmlLibVersion === '0') {
              // special wildcard mode used in screenshot generation fixtures
              xmlLibVersion = systemLibVersion;
            } else {
              xmlLibVersion = parseInt(xmlLibVersion);
            }
            if (cv.Config.libraryCheck && xmlLibVersion < systemLibVersion) {
              _this.configError('libraryerror');
            } else {
              cv.Config.server = {};
              var backendName = '';
              if (req.getResponseHeader('X-CometVisu-Backend-Name')) {
                backendName = req.getResponseHeader('X-CometVisu-Backend-Name');
              }
              if (req.getResponseHeader('X-CometVisu-Backend-LoginUrl')) {
                _this.error('The usage of "X-CometVisu-Backend-LoginUrl" is deprecated. Please update the server setup.');
                var backendUrl = req.getResponseHeader('X-CometVisu-Backend-LoginUrl');
                if (!backendUrl.endsWith('/')) {
                  backendUrl += '/';
                }
                cv.Config.server.backendKnxdUrl = backendUrl;
                cv.Config.server.backendOpenHABUrl = backendUrl;
                if (!backendName && backendUrl.startsWith('/rest/')) {
                  backendName = 'openhab';
                }
              }
              if (req.getResponseHeader('X-CometVisu-Backend-KNXD-Url')) {
                cv.Config.server.backendKnxdUrl = req.getResponseHeader('X-CometVisu-Backend-KNXD-Url');
                if (backendName === '') {
                  backendName = 'knxd';
                }
              }
              if (req.getResponseHeader('X-CometVisu-Backend-MQTT-Url')) {
                cv.Config.server.backendMQTTUrl = req.getResponseHeader('X-CometVisu-Backend-MQTT-Url');
                if (backendName === '') {
                  backendName = 'mqtt';
                }
              }
              if (req.getResponseHeader('X-CometVisu-Backend-OpenHAB-Url')) {
                cv.Config.server.backendOpenHABUrl = req.getResponseHeader('X-CometVisu-Backend-OpenHAB-Url');
                if (backendName === '') {
                  backendName = 'openhab';
                }
              }
              if (backendName) {
                cv.Config.server.backend = backendName;
              }
              _this._checkQueue();
            }
          }
        });
        ajaxRequest.addListener('statusError', function (e) {
          var status = e.getTarget().getTransport().status;
          if (!qx.util.Request.isSuccessful(status) && ajaxRequest.getUserData('noDemo')) {
            ajaxRequest.setUserData('noDemo', false);
            ajaxRequest.setUserData('origUrl', ajaxRequest.getUrl());
            _this.__P_530_0.remove(ajaxRequest.getUrl());
            var demoUrl = ajaxRequest.getUrl().replace('config/', 'demo/');
            ajaxRequest.setUrl(demoUrl);
            _this.__P_530_0.push(demoUrl);
            ajaxRequest.send();
          } else if (!qx.util.Request.isSuccessful(status)) {
            _this.configError('filenotfound', [ajaxRequest.getUserData('origUrl'), ajaxRequest.getUrl()]);
          } else {
            _this.configError(status, null);
          }
        });
        ajaxRequest.send();
      },
      /**
       * Load an include source and replace it with the loaded content
       * @param includeElem {Element}
       */
      loadInclude: function loadInclude(includeElem) {
        var _this2 = this;
        var url = includeElem.getAttribute('src');
        if (!url.startsWith('/')) {
          url = qx.util.LibraryManager.getInstance().get('cv', 'resourceUri') + '/' + url;
        }
        this.__P_530_0.push(url);
        var xhr = new qx.io.request.Xhr(url);
        xhr.set({
          accept: 'text/plain',
          async: false
        });
        xhr.addListenerOnce('success', function (e) {
          var req = e.getTarget();
          var xml = qx.xml.Document.fromString('<root>' + req.getResponseText() + '</root>');
          includeElem.replaceWith.apply(includeElem, _toConsumableArray(xml.firstChild.childNodes));
          _this2.__P_530_0.remove(url);
          _this2._checkQueue();
        });
        xhr.addListener('statusError', function (e) {
          var status = e.getTarget().getTransport().status;
          if (!qx.util.Request.isSuccessful(status)) {
            _this2.configError('filenotfound', [xhr.getUrl(), '']);
          } else {
            _this2.configError(status, null);
          }
        });
        xhr.send();
      },
      /**
       * Check if everything is loaded and call the callback in this case
       * @private
       */
      _checkQueue: function _checkQueue() {
        if (this.__P_530_0.length === 0) {
          this.__P_530_1.call(this.__P_530_2, this.__P_530_3);
          this.dispose();
        }
      },
      /**
       * Handle errors that occur during loading ot the config file
       * @param textStatus {String} error status
       * @param additionalErrorInfo {String} error message
       */
      configError: function configError(textStatus, additionalErrorInfo) {
        var configSuffix = cv.Config.configSuffix ? cv.Config.configSuffix : '';
        var title = qx.locale.Manager.tr('Config-File Error!').translate().toString();
        var message = '';
        var actions;
        switch (textStatus) {
          case 'parsererror':
            message = qx.locale.Manager.tr('Invalid config file!') + '<br/><a href="javascript:showConfigErrors(\'' + configSuffix + '\')">' + qx.locale.Manager.tr('Please check!') + '</a>';
            break;
          case 'libraryerror':
            {
              var link = window.location.href.split('#')[0];
              if (link.indexOf('?') <= 0) {
                link += '?';
              }
              link += '&libraryCheck=false';
              message = qx.locale.Manager.tr('Config file has wrong library version!').translate().toString() + '<br/>' + qx.locale.Manager.tr('This can cause problems with your configuration').translate().toString() + '</br>' + '<p>' + qx.locale.Manager.tr('You can run the %1Configuration Upgrader%2.', '<a href="javascript:showConfigErrors(\'' + configSuffix + '\', {upgradeVersion: true})">', '</a>').translate().toString() + '</br>' + qx.locale.Manager.tr('Or you can start without upgrading %1with possible configuration problems%2', '<a href="' + link + '">', '</a>').translate().toString() + '</p>';
              break;
            }
          case 'filenotfound':
            message = qx.locale.Manager.tr('404: Config file not found. Neither as normal config (%1) nor as demo config (%2).', additionalErrorInfo[0], additionalErrorInfo[1]).translate().toString();
            message += '<br/>' + qx.locale.Manager.tr('You can open the manager to create or upload a config file.').translate().toString();
            actions = {
              link: [{
                title: qx.locale.Manager.tr('Open manager'),
                type: 'manager',
                action: function action() {
                  qx.core.Init.getApplication().showManager();
                },
                needsConfirmation: false
              }]
            };
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
          topic: 'cv.config.error',
          title: title,
          message: message,
          severity: 'urgent',
          unique: true
        };
        if (actions) {
          notification.actions = actions;
        }
        cv.core.notifications.Router.dispatchMessage(notification.topic, notification);
        this.error(this, message.toString());
        qx.core.Init.getApplication().block(false);
      }
    },
    /*
    ******************************************************
      DESTRUCTOR
    ******************************************************
    */
    destruct: function destruct() {
      // remove references
      this.__P_530_3 = null;
      this.__P_530_1 = null;
      this.__P_530_2 = null;
    }
  });
  cv.util.ConfigLoader.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=ConfigLoader.js.map?dt=1677345959912