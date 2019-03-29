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
    BASE_URL: 'http://localhost:3000',
    __configFile: null,
    __dirClient: null,
    __dpClient: null,
    __callbacks: {},

    getConfigClient: function() {
      if (!this.__configFile) {
        this.__configFile = new qx.io.rest.Resource({
          get: {
            method: 'GET', url: '/config/hidden/{section}/{key}'
          },
          put: {
            method: 'PUT', url: '/config/hidden/{section}/{key}'
          },
          post: {
            method: 'POST', url: '/config/hidden/{section}/{key}'
          },
          "delete": {
            method: 'DELETE', url: '/config/hidden/{section}/{key}'
          },
          save: {
            method: 'PUT', url: '/config/hidden'
          }
        });
        this.__configFile.setBaseUrl(this.BASE_URL);
        this.__configFile.configureRequest(function (req, action) {
          if (action === 'save') {
            req.setRequestHeader('Content-Type', 'application/json');
          }
          if (action === 'get') {
            req.setAccept('text/xml');
          } else {
            req.setAccept('application/json');
          }
        });
      }
      return this.__configFile;
    },

    getFsClient: function () {
      if (!this.__dirClient) {
        var config = {
          read: {
            method: 'GET', url: '/fs?path={path}'
          },
          update: {
            method: 'PUT', url: '/fs?path={path}'
          },
          create: {
            method: 'POST', url: '/fs?path={path}&type={type}'
          },
          "delete": {
            method: 'DELETE', url: '/fs?path={path}&force={force}'
          },
          move: {
            method: 'PUT', url: '/fs/move?src={src}&target={target}'
          }
        };
        this.__dirClient = new qx.io.rest.Resource(config);
        this.__dirClient.setBaseUrl(this.BASE_URL);
        this.__dirClient.configureRequest(function (req, action, params) {
          if (params.hash) {
            req.setUrl(req.getUrl() + '&hash=' + params.hash);
          }
          if (params.recursive === true && action === 'read') {
            req.setUrl(req.getUrl() + '&recursive=true');
          }
          if (action === 'update' || action === 'create') {
            var parts = params.path.split('.');
            if (parts.length > 1) {
              var type = parts.pop();
              var mimetype = cv.ui.manager.tree.FileSystem.getMimetypeFromSuffix(type);
              req.setRequestHeader('Content-Type', mimetype || 'text/plain');
            } else {
              req.setRequestHeader('Content-Type', 'text/plain');
            }
            req.setAccept('application/json');
          }
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

    getDataProviderClient: function () {
      if (!this.__dpClient) {
        var config = {
          designs: {
            method: 'GET', url: '/data/designs'
          },
          rrds: {
            method: 'GET', url: '/data/rrds'
          },
          influxdbs: {
            method: 'GET', url: '/data/influxdbs?auth={auth}'
          },
          influxdbfields: {
            method: 'GET', url: '/data/influxdbfields?auth={auth}&measurement={measurement}'
          },
          influxdbtags: {
            method: 'GET', url: '/data/influxdbtags?auth={auth}&measurement={measurement}'
          }
        };
        this.__dpClient = new qx.io.rest.Resource(config);
        this.__dpClient.setBaseUrl(this.BASE_URL);

        this._enableSync(this.__dpClient, config);
      }
      return this.__dpClient;
    },

    _enableSync: function (client, config) {
      // install the callback calls
      Object.keys(config).forEach(function (callName) {
        client[callName + 'Sync'] = function () {
          var args = qx.lang.Array.fromArguments(arguments);
          var callback;
          var context = args.pop();
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
      client.addListener('success', function (ev) {
        var req = ev.getRequest();
        var id = parseInt(req.toHashCode(), 10);
        if (this.__callbacks.hasOwnProperty(id)) {
          this.__callbacks[id](null, ev.getData());
          delete this.__callbacks[id];
        }
      }, this);

      client.addListener('error', function (ev) {
        var req = ev.getRequest();
        var id = parseInt(req.toHashCode(), 10);
        if (this.__callbacks.hasOwnProperty(id)) {
          qx.log.Logger.error(this, ev.getData());
          this.__callbacks[id](ev.getData().message, null);
          delete this.__callbacks[id];
        }
        if (req.getPhase() === 'load') {
          // error during load phase => backend not reachable
          dialog.Dialog.error(qx.locale.Manager.tr('Backend does not respond!'));
        }
      }, this);
    },

    _onSaveSuccess: function (ev) {
      var req = ev.getRequest();
      var id = parseInt(req.toHashCode(), 10);
      // only handle this events, when there is no callback for it
      if (!this.__callbacks.hasOwnProperty(id)) {
        cv.ui.manager.snackbar.Controller.info(qx.locale.Manager.tr('File has been saved'));
      }
    },

    _onSaveError: function (ev) {
      var req = ev.getRequest();
      var id = parseInt(req.toHashCode(), 10);
      // only handle this events, when there is no callback for it
      if (!this.__callbacks.hasOwnProperty(id)) {
        cv.ui.manager.snackbar.Controller.error(qx.locale.Manager.tr('Error saving file'));
      }
    }
  }
});
