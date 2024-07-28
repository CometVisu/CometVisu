/* Client.js
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
 *
 */
qx.Class.define('cv.io.rest.Client', {
  type: 'static',

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    BASE_URL: null,
    __configFile: null,
    __dirClient: null,
    __dpClient: null,
    __callbacks: {},
    AUTH_REQUIRED: false,

    getBaseUrl() {
      if (!this.BASE_URL) {
        let path = '';
        if (qx.core.Init.getApplication().isServedByOpenhab()) {
          path = '/rest/cv';
        } else {
          path =
            qx.util.Uri.parseUri(window.location.href).directory +
            'rest/manager/index.php';
        }
        this.BASE_URL = path;
      }
      return this.BASE_URL;
    },

    checkAuth(req) {
      if (this.AUTH_REQUIRED) {
        if (qx.core.Init.getApplication().isServedByOpenhab()) {
          const backend = cv.io.BackendConnections.getClientByType('openhab');
          if (backend) {
            backend.authorize(req);
          } else {
            qx.log.Logger.warn('no openHAB backend configured, cannot authorize');
          }
        } else {
          qx.log.Logger.warn('authentication is currently only implemented for the openHAB API backend');
        }
      }
    },

    getConfigClient() {
      if (!this.__configFile) {
        const config = {
          get: {
            method: 'GET',
            url: '/config/hidden/{section}/{key}'
          },

          put: {
            method: 'PUT',
            url: '/config/hidden/{section}/{key}'
          },

          post: {
            method: 'POST',
            url: '/config/hidden/{section}/{key}'
          },

          delete: {
            method: 'DELETE',
            url: '/config/hidden/{section}/{key}'
          },

          save: {
            method: 'PUT',
            url: '/config/hidden'
          }
        };

        this.__configFile = new qx.io.rest.Resource(config);
        this.__configFile.setBaseUrl(this.getBaseUrl());
        this.__configFile.configureRequest(function (req, action) {
          if (cv.Config.transactionId) {
            req.setRequestHeader('X-Transaction-ID', cv.Config.transactionId);
          }
          if (action === 'save') {
            req.setRequestHeader('Content-Type', 'application/json');
          }
          req.setAccept('application/json');
          cv.io.rest.Client.checkAuth(req);
        });

        this._enableSync(this.__configFile, config);
      }
      return this.__configFile;
    },

    getFsClient() {
      if (!this.__dirClient) {
        const config = {
          read: {
            method: 'GET',
            url: '/fs?path={path}'
          },

          update: {
            method: 'PUT',
            url: '/fs?path={path}'
          },

          create: {
            method: 'POST',
            url: '/fs?path={path}&type={type}'
          },

          delete: {
            method: 'DELETE',
            url: '/fs?path={path}&force={force}'
          },

          move: {
            method: 'PUT',
            url: '/fs/move?src={src}&target={target}'
          },

          checkEnvironment: {
            method: 'GET',
            url: '/fs/check'
          }
        };

        this.__dirClient = new qx.io.rest.Resource(config);
        this.__dirClient.setBaseUrl(this.getBaseUrl());
        this.__dirClient.configureRequest(function (req, action, params) {
          if (cv.Config.transactionId) {
            req.setRequestHeader('X-Transaction-ID', cv.Config.transactionId);
          }
          if (params.hash) {
            req.setUrl(req.getUrl() + '&hash=' + params.hash);
          }
          if (params.recursive === true && action === 'read') {
            req.setUrl(req.getUrl() + '&recursive=true');
          }
          if (action === 'update' || action === 'create') {
            const parts = params.path.split('.');
            if (parts.length > 1) {
              const type = parts.pop();
              const mimetype = cv.ui.manager.tree.FileSystem.getMimetypeFromSuffix(type);
              req.setRequestHeader('Content-Type', mimetype || 'text/plain');
            } else {
              req.setRequestHeader('Content-Type', 'text/plain');
            }
            req.setAccept('application/json');
          }
          cv.io.rest.Client.checkAuth(req);
        });

        this._enableSync(this.__dirClient, config);

        // general listeners
        this.__dirClient.addListener('updateSuccess', this._onSaveSuccess, this);

        this.__dirClient.addListener('createSuccess', this._onSaveSuccess, this);

        this.__dirClient.addListener('updateError', this._onSaveError, this);
        this.__dirClient.addListener('createError', this._onSaveError, this);
      }
      return this.__dirClient;
    },

    getDataProviderClient() {
      if (!this.__dpClient) {
        const config = {
          designs: {
            method: 'GET',
            url: '/data/designs'
          },

          rrds: {
            method: 'GET',
            url: '/data/rrds'
          },

          addresses: {
            method: 'GET',
            url: '/data/addresses'
          },

          influxdbs: {
            method: 'GET',
            url: '/data/influxdbs?auth={auth}'
          },

          influxdbfields: {
            method: 'GET',
            url: '/data/influxdbfields?auth={auth}&measurement={measurement}'
          },

          influxdbtags: {
            method: 'GET',
            url: '/data/influxdbtags?auth={auth}&measurement={measurement}'
          }
        };

        this.__dpClient = new qx.io.rest.Resource(config);
        this.__dpClient.setBaseUrl(this.getBaseUrl());
        if (cv.Config.transactionId) {
          this.__dpClient.configureRequest(function (req, action, params) {
            req.setRequestHeader('X-Transaction-ID', cv.Config.transactionId);
            cv.io.rest.Client.checkAuth(req);
          });
        }

        this._enableSync(this.__dpClient, config);
      }
      return this.__dpClient;
    },

    _enableSync(client, config) {
      // install the callback calls
      Object.keys(config).forEach(function (callName) {
        client[callName + 'Sync'] = function () {
          const args = qx.lang.Array.fromArguments(arguments);
          let callback;
          let context = args.pop();
          if (qx.lang.Type.isFunction(context)) {
            callback = context;
            context = this;
          } else {
            callback = args.pop();
          }
          this.__callbacks[client[callName].apply(client, args)] = callback.bind(context);
        }.bind(this);
      }, this);

      // add the general listeners
      client.addListener('success', ev => {
        const req = ev.getRequest();
        const id = parseInt(req.toHashCode(), 10);
        if (Object.prototype.hasOwnProperty.call(this.__callbacks, id)) {
          this.__callbacks[id](null, ev.getData());
          delete this.__callbacks[id];
        }
      });

      client.addListener('error', ev => {
        const req = ev.getRequest();
        const id = parseInt(req.toHashCode(), 10);
        if (Object.prototype.hasOwnProperty.call(this.__callbacks, id)) {
          const data = ev.getData();
          let error;
          if (data && data.message) {
            error = data.message;
          } else {
            error = {
              status: ev.getRequest().getStatus(),
              statusText: ev.getRequest().getStatusText()
            };
          }
          qx.log.Logger.error(this, error);
          this.__callbacks[id](error, null);
          delete this.__callbacks[id];
        }
        if (req.getPhase() === 'load') {
          // error during load phase => backend not reachable
          qxl.dialog.Dialog.error(qx.locale.Manager.tr('Backend does not respond!'));
        }
      });
    },

    _onSaveSuccess(ev) {
      const req = ev.getRequest();
      const id = parseInt(req.toHashCode(), 10);
      // only handle this events, when there is no callback for it
      if (!Object.prototype.hasOwnProperty.call(this.__callbacks, id)) {
        cv.ui.manager.snackbar.Controller.info(qx.locale.Manager.tr('File has been saved'));
      }
    },

    _onSaveError(ev) {
      const req = ev.getRequest();
      const id = parseInt(req.toHashCode(), 10);
      // only handle this events, when there is no callback for it
      if (!Object.prototype.hasOwnProperty.call(this.__callbacks, id)) {
        cv.ui.manager.snackbar.Controller.error(qx.locale.Manager.tr('Error saving file'));
      }
    }
  }
});
