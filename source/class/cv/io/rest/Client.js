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
            method: 'DELETE', url: '/fs?path={path}'
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
          if (action === 'update' || action === 'create') {
            var parts = params.path.split('.');
            if (parts.length > 1) {
              var type = parts.pop();
              switch (type) {
                case 'xml':
                  req.setRequestHeader('Content-Type', 'text/xml');
                  break;

                case 'js':
                  req.setRequestHeader('Content-Type', 'text/javascript');
                  break;

                case 'php':
                  req.setRequestHeader('Content-Type', 'application/x-httpd-php');
                  break;

                case 'css':
                  req.setRequestHeader('Content-Type', 'text/css');
                  break;

                default:
                  req.setRequestHeader('Content-Type', 'text/plain');
                  break;
              }
            } else {
              req.setRequestHeader('Content-Type', 'text/plain');
            }
            req.setAccept('application/json');
          }
        });

        // install the callback calls
        Object.keys(config).forEach(function (callName) {
          this.__dirClient[callName + 'Sync'] = function () {
            var args = qx.lang.Array.fromArguments(arguments);
            var callback;
            var context = args.pop();
            if (qx.lang.Type.isFunction(context)) {
              callback = context;
              context = this;
            } else {
              callback = args.pop();
            }
            this.__callbacks[this.__dirClient[callName].apply(this.__dirClient, args)] = callback.bind(context);
          }.bind(this);
        }, this);

        // general listeners
        this.__dirClient.addListener('updateSuccess', this._onSaveSuccess, this);
        this.__dirClient.addListener('createSuccess', this._onSaveSuccess, this);
        this.__dirClient.addListener('updateError', this._onSaveError, this);
        this.__dirClient.addListener('createError', this._onSaveError, this);
        this.__dirClient.addListener('success', function (ev) {
          var req = ev.getRequest();
          var id = parseInt(req.toHashCode(), 10);
          if (this.__callbacks.hasOwnProperty(id)) {
            this.__callbacks[id](null, ev.getData());
            delete this.__callbacks[id];
          }
        }, this);

        this.__dirClient.addListener('error', function (ev) {
          var req = ev.getRequest();
          var id = parseInt(req.toHashCode(), 10);
          if (this.__callbacks.hasOwnProperty(id)) {
            qx.log.Logger.error(this, ev.getData());
            this.__callbacks[id](ev.getData().message, null);
            delete this.__callbacks[id];
          }
        }, this);
      }
      return this.__dirClient;
    },

    getDataProviderClient: function () {
      if (!this.__dpClient) {
        var config = {
          designs: {
            method: 'GET', url: '/data/designs'
          }
        };
        this.__dpClient = new qx.io.rest.Resource(config);
        this.__dpClient.setBaseUrl(this.BASE_URL);
      }
      return this.__dpClient;
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
