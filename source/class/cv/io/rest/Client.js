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

    getConfigFileClient: function() {
      if (!this.__configFile) {
        this.__configFile = new qx.io.rest.Resource({
          get: {
            method: 'GET', url: '/fs/config/{name}'
          },
          put: {
            method: 'PUT', url: '/fs/config/{name}'
          },
          post: {
            method: 'POST', url: '/fs/config/{name}'
          },
          "delete": {
            method: 'DELETE', url: '/fs/config/{name}'
          }
        });
        this.__configFile.setBaseUrl(this.BASE_URL);
        this.__configFile.configureRequest(function (req, action) {
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
            method: 'POST', url: '/fs?path={path}'
          },
          "delete": {
            method: 'DELETE', url: '/fs?path={path}'
          }
        });
        this.__dirClient.setBaseUrl(this.BASE_URL);
        this.__dirClient.configureRequest(function (req, action, params) {
          if (action === 'update') {
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
              }
            }
            req.setAccept('application/json');
          }
        });
      }
      return this.__dirClient;
    }
  }
});
