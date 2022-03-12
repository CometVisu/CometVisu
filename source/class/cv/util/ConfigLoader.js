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
  construct: function () {
    this.base(arguments);
    this.__loadQueue = new qx.data.Array();
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    __loadQueue: null,
    __doneCallback: null,
    __doneCallbackContext: null,
    __xml: null,

    /**
     * Load a config file
     * @param callback
     * @param context
     */
    load: function (callback, context) {
      this.__doneCallback = callback;
      this.__doneCallbackContext = context;
      // get the data once the page was loaded
      let uri = qx.util.ResourceManager.getInstance().toUri('config/visu_config' + (cv.Config.configSuffix ? '_' + cv.Config.configSuffix : '') + '.xml');
      if (cv.Config.testMode) {
        // workaround for e2e-tests
        uri = 'resource/config/visu_config' + (cv.Config.configSuffix ? '_' + cv.Config.configSuffix : '') + '.xml';
      } else if (uri.indexOf('resource/') === -1) {
        // unknown config, try to add the resource part manually
        uri = uri.replace('config/', 'resource/config/');
      }
      this.debug('Requesting '+uri);
      const ajaxRequest = new qx.io.request.Xhr(uri);
      this.__loadQueue.push(uri);
      ajaxRequest.set({
        accept: 'application/xml',
        cache: !cv.Config.forceReload
      });
      ajaxRequest.setUserData('noDemo', true);
      ajaxRequest.addListenerOnce('success', function (e) {
        qx.core.Init.getApplication().block(false);
        const req = e.getTarget();
        cv.Config.configServer = req.getResponseHeader('Server');
        // Response parsed according to the server's response content type
        let xml = req.getResponse();
        if (xml && (typeof xml === 'string')) {
          xml = qx.xml.Document.fromString(xml);
        }
        this.__xml = xml;
        xml.querySelectorAll('include').forEach(this.loadInclude, this);
        this.__loadQueue.remove(ajaxRequest.getUrl());

        if (!xml || !xml.documentElement || xml.getElementsByTagName('parsererror').length) {
          this.configError('parsererror');
        } else {
          // check the library version
          let xmlLibVersion = xml.querySelector('pages').getAttribute('lib_version');
          if (xmlLibVersion === undefined) {
            xmlLibVersion = -1;
          } else if (xmlLibVersion === '0') {
            // special wildcard mode used in screenshot generation fixtures
            xmlLibVersion = cv.Version.LIBRARY_VERSION;
          } else {
            xmlLibVersion = parseInt(xmlLibVersion);
          }
          if (cv.Config.libraryCheck && xmlLibVersion < cv.Version.LIBRARY_VERSION) {
            this.configError('libraryerror');
          } else {
            cv.Config.server = {};
            let backendName = '';
            if (req.getResponseHeader('X-CometVisu-Backend-Name')) {
              backendName = req.getResponseHeader('X-CometVisu-Backend-Name');
            }
            if (req.getResponseHeader('X-CometVisu-Backend-LoginUrl')) {
              this.error('The usage of "X-CometVisu-Backend-LoginUrl" is deprecated. Please update the server setup.');
              let backendUrl = req.getResponseHeader('X-CometVisu-Backend-LoginUrl');
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
            this._checkQueue();
          }
        }
      }, this);

      ajaxRequest.addListener('statusError', function (e) {
        const status = e.getTarget().getTransport().status;
        if (!qx.util.Request.isSuccessful(status) && ajaxRequest.getUserData('noDemo')) {
          ajaxRequest.setUserData('noDemo', false);
          ajaxRequest.setUserData('origUrl', ajaxRequest.getUrl());
          this.__loadQueue.remove(ajaxRequest.getUrl());
          const demoUrl = ajaxRequest.getUrl().replace('config/', 'demo/');
          ajaxRequest.setUrl(demoUrl);
          this.__loadQueue.push(demoUrl);
          ajaxRequest.send();
        } else if (!qx.util.Request.isSuccessful(status)) {
          this.configError('filenotfound', [ajaxRequest.getUserData('origUrl'), ajaxRequest.getUrl()]);
        } else {
          this.configError(status, null);
        }
      }, this);

      ajaxRequest.send();
    },

    /**
     * Load an include source and replace it with the loaded content
     * @param includeElem {Element}
     */
    loadInclude: function (includeElem) {
      let url = includeElem.getAttribute('src');
      if (!url.startsWith('/')) {
        url = qx.util.LibraryManager.getInstance().get('cv', 'resourceUri') + '/' + url;
      }
      this.__loadQueue.push(url);
      const xhr = new qx.io.request.Xhr(url);
      xhr.set({
        accept: 'text/plain',
        async: false
      });
      xhr.addListenerOnce('success', function(e) {
        const req = e.getTarget();
        const xml = qx.xml.Document.fromString('<root>' + req.getResponseText() + '</root>');
        includeElem.replaceWith(...xml.firstChild.childNodes);
        this.__loadQueue.remove(url);
        this._checkQueue();
      }, this);
      xhr.addListener('statusError', function (e) {
        const status = e.getTarget().getTransport().status;
        if (!qx.util.Request.isSuccessful(status)) {
          this.configError('filenotfound', [xhr.getUrl(), '']);
        } else {
          this.configError(status, null);
        }
      }, this);
      xhr.send();
    },

    /**
     * Check if everything is loaded and call the callback in this case
     * @private
     */
    _checkQueue: function () {
      if (this.__loadQueue.length === 0) {
        this.__doneCallback.call(this.__doneCallbackContext, this.__xml);
        this.dispose();
      }
    },

    /**
     * Handle errors that occur during loading ot the config file
     * @param textStatus {String} error status
     * @param additionalErrorInfo {String} error message
     */
    configError: function(textStatus, additionalErrorInfo) {
      const configSuffix = (cv.Config.configSuffix ? cv.Config.configSuffix : '');
      const title = qx.locale.Manager.tr('Config-File Error!').translate().toString();
      let message = '';
      let actions;
      switch (textStatus) {
        case 'parsererror':
          message = qx.locale.Manager.tr('Invalid config file!')+'<br/><a href="#" onclick="showConfigErrors(\'' + configSuffix + '\')">'+qx.locale.Manager.tr('Please check!')+'</a>';
          break;
        case 'libraryerror': {
          let link = window.location.href.split('#')[0];
          if (link.indexOf('?') <= 0) {
            link += '?';
          }
          link += '&libraryCheck=false';
          message = qx.locale.Manager.tr('Config file has wrong library version!').translate().toString() + '<br/>' +
            qx.locale.Manager.tr('This can cause problems with your configuration').translate().toString() + '</br>' +
            '<p>' + qx.locale.Manager.tr('You can run the %1Configuration Upgrader%2.', '<a href="#" onclick="showConfigErrors(\'' + configSuffix + '\', {upgradeVersion: true})">', '</a>').translate().toString() + '</br>' +
            qx.locale.Manager.tr('Or you can start without upgrading %1with possible configuration problems%2', '<a href="' + link + '">', '</a>').translate().toString() + '</p>';
          break;
        }
        case 'filenotfound':
          message = qx.locale.Manager.tr('404: Config file not found. Neither as normal config (%1) nor as demo config (%2).', additionalErrorInfo[0], additionalErrorInfo[1]).translate().toString();
          message += '<br/>'  + qx.locale.Manager.tr('You can open the manager to create or upload a config file.').translate().toString();
          actions = {
            link: [
              {
                title: qx.locale.Manager.tr('Open manager'),
                type: 'manager',
                action: () => {
                  qx.core.Init.getApplication().showManager();
                },
                needsConfirmation: false
              }
            ]
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
      const notification = {
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
  destruct: function () {
    // remove references
    this.__xml = null;
    this.__doneCallback = null;
    this.__doneCallbackContext = null;
  }
});
