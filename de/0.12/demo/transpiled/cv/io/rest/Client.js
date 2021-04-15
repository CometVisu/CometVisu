(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.TemplateEngine": {},
      "qx.util.Uri": {},
      "qx.io.rest.Resource": {},
      "cv.ui.manager.tree.FileSystem": {},
      "qx.lang.Array": {},
      "qx.lang.Type": {},
      "qx.log.Logger": {},
      "dialog.Dialog": {},
      "qx.locale.Manager": {},
      "cv.ui.manager.snackbar.Controller": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

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
      __P_114_0: null,
      __P_114_1: null,
      __P_114_2: null,
      __P_114_3: {},
      getBaseUrl: function getBaseUrl() {
        if (!this.BASE_URL) {
          var path = "";
          var engine = cv.TemplateEngine.getInstance();
          var clientBackend = engine.visu ? engine.visu.getBackend() : {};

          if (clientBackend.resources && clientBackend.resources.rest) {
            path = clientBackend.resources.rest;
          } else {
            path = qx.util.Uri.parseUri(window.location.href).directory + 'rest/manager/index.php';
          }

          this.BASE_URL = path;
        }

        return this.BASE_URL;
      },
      getConfigClient: function getConfigClient() {
        if (!this.__P_114_0) {
          var config = {
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
            "delete": {
              method: 'DELETE',
              url: '/config/hidden/{section}/{key}'
            },
            save: {
              method: 'PUT',
              url: '/config/hidden'
            }
          };
          this.__P_114_0 = new qx.io.rest.Resource(config);

          this.__P_114_0.setBaseUrl(this.getBaseUrl());

          this.__P_114_0.configureRequest(function (req, action) {
            if (action === 'save') {
              req.setRequestHeader('Content-Type', 'application/json');
            }

            req.setAccept('application/json');
          });

          this._enableSync(this.__P_114_0, config);
        }

        return this.__P_114_0;
      },
      getFsClient: function getFsClient() {
        if (!this.__P_114_1) {
          var config = {
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
            "delete": {
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
          this.__P_114_1 = new qx.io.rest.Resource(config);

          this.__P_114_1.setBaseUrl(this.getBaseUrl());

          this.__P_114_1.configureRequest(function (req, action, params) {
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

          this._enableSync(this.__P_114_1, config); // general listeners


          this.__P_114_1.addListener('updateSuccess', this._onSaveSuccess, this);

          this.__P_114_1.addListener('createSuccess', this._onSaveSuccess, this);

          this.__P_114_1.addListener('updateError', this._onSaveError, this);

          this.__P_114_1.addListener('createError', this._onSaveError, this);
        }

        return this.__P_114_1;
      },
      getDataProviderClient: function getDataProviderClient() {
        if (!this.__P_114_2) {
          var config = {
            designs: {
              method: 'GET',
              url: '/data/designs'
            },
            rrds: {
              method: 'GET',
              url: '/data/rrds'
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
          this.__P_114_2 = new qx.io.rest.Resource(config);

          this.__P_114_2.setBaseUrl(this.getBaseUrl());

          this._enableSync(this.__P_114_2, config);
        }

        return this.__P_114_2;
      },
      _enableSync: function _enableSync(client, config) {
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

            this.__P_114_3[client[callName].apply(client, args)] = callback.bind(context);
          }.bind(this);
        }, this); // add the general listeners

        client.addListener('success', function (ev) {
          var req = ev.getRequest();
          var id = parseInt(req.toHashCode(), 10);

          if (this.__P_114_3.hasOwnProperty(id)) {
            this.__P_114_3[id](null, ev.getData());

            delete this.__P_114_3[id];
          }
        }, this);
        client.addListener('error', function (ev) {
          var req = ev.getRequest();
          var id = parseInt(req.toHashCode(), 10);

          if (this.__P_114_3.hasOwnProperty(id)) {
            var data = ev.getData();
            var error;

            if (data) {
              error = data.message;
            } else {
              error = {
                status: ev.getRequest().getStatus(),
                statusText: ev.getRequest().getStatusText()
              };
            }

            qx.log.Logger.error(this, error);

            this.__P_114_3[id](error, null);

            delete this.__P_114_3[id];
          }

          if (req.getPhase() === 'load') {
            // error during load phase => backend not reachable
            dialog.Dialog.error(qx.locale.Manager.tr('Backend does not respond!'));
          }
        }, this);
      },
      _onSaveSuccess: function _onSaveSuccess(ev) {
        var req = ev.getRequest();
        var id = parseInt(req.toHashCode(), 10); // only handle this events, when there is no callback for it

        if (!this.__P_114_3.hasOwnProperty(id)) {
          cv.ui.manager.snackbar.Controller.info(qx.locale.Manager.tr('File has been saved'));
        }
      },
      _onSaveError: function _onSaveError(ev) {
        var req = ev.getRequest();
        var id = parseInt(req.toHashCode(), 10); // only handle this events, when there is no callback for it

        if (!this.__P_114_3.hasOwnProperty(id)) {
          cv.ui.manager.snackbar.Controller.error(qx.locale.Manager.tr('Error saving file'));
        }
      }
    }
  });
  cv.io.rest.Client.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Client.js.map?dt=1618504449006