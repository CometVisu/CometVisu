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
        this.__dirClient = new qx.io.rest.Resource({
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
        });
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
          } else if (action === 'move') {
            req.setRequestHeader('Content-Type', 'text/plain');
          }
        });

        // general listeners
        this.__dirClient.addListener('updateSuccess', this._onSaveSuccess, this);
        this.__dirClient.addListener('createSuccess', this._onSaveSuccess, this);
        this.__dirClient.addListener('updateError', this._onSaveError, this);
        this.__dirClient.addListener('createError', this._onSaveError, this);
      }
      return this.__dirClient;
    },

    _onSaveSuccess: function () {
      var msg = new cv.ui.manager.model.Message();
      msg.set({
        title: qx.locale.Manager.tr('File has been saved')
      });
      qx.event.message.Bus.dispatchByName('cv.manager.msg.snackbar', msg);
    },

    _onSaveError: function () {
      var msg = new cv.ui.manager.model.Message();
      msg.set({
        title: qx.locale.Manager.tr('Error saving file'),
        type: 'error',
        sticky: true
      });
      qx.event.message.Bus.dispatchByName('cv.manager.msg.snackbar', msg);
    }
  }
});
