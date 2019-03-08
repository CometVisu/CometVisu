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

    getDirClient: function () {
      if (!this.__dirClient) {
        this.__dirClient = new qx.io.rest.Resource({
          get: {
            method: 'GET', url: '/fs/ls?folder={path}'
          }
        });
        this.__dirClient.setBaseUrl(this.BASE_URL);
        this.__dirClient.configureRequest(function (req, action) {
          if (action === 'get') {
            req.setAccept('application/json');
          }
        });
      }
      return this.__dirClient;
    }
  }
});
