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
      "qx.util.ResourceManager": {
        "construct": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /**
   * Worker script that handles file related operations like modification checking or xml validation
   */
  qx.Class.define('cv.data.FileWorker', {
    extend: qx.core.Object,
    type: 'singleton',

    /*
    ***********************************************
      CONSTRUCTOR
    ***********************************************
    */
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this._files = [];
      this._worker = new Worker(qx.util.ResourceManager.getInstance().toUri('manager/worker.js'));
      this._worker.onmessage = this._onMessage.bind(this);
      this._validationCallbacks = {};
    },

    /*
    ***********************************************
      EVENTS
    ***********************************************
    */
    events: {
      message: 'qx.event.type.Data'
    },

    /*
    ***********************************************
      MEMBERS
    ***********************************************
    */
    members: {
      _worker: null,
      _validationCallbacks: null,
      _counter: 0,
      postMessage: function postMessage(msg) {
        this._worker.postMessage(msg);
      },
      validateConfig: function validateConfig(url) {
        return new Promise(function (resolve, reject) {
          // check if there is already one validation request ongoing
          if (!Object.prototype.hasOwnProperty.call(this._validationCallbacks, url)) {
            this._validationCallbacks[url] = [resolve];

            this._worker.postMessage(['validateConfig', {
              path: url
            }]);
          } else {
            this._validationCallbacks[url].push(resolve);
          }
        }.bind(this));
      },
      validateXmlConfig: function validateXmlConfig(code) {
        return new Promise(function (resolve, reject) {
          var id = this._counter++;
          this._validationCallbacks[id] = [resolve];

          this._worker.postMessage(['validateXmlConfig', id, code, true]);
        }.bind(this));
      },
      _onMessage: function _onMessage(e) {
        var topic = e.data.shift();
        var data = e.data.shift();
        var path = e.data.shift();

        switch (topic) {
          case 'validationResult':
            if (Object.prototype.hasOwnProperty.call(this._validationCallbacks, path)) {
              var callbacks = this._validationCallbacks[path];
              delete this._validationCallbacks[path];
              callbacks.forEach(function (cb) {
                cb(data);
              });
            }

            break;
        }

        this.fireDataEvent('message', {
          topic: topic,
          data: data,
          path: path
        });
      }
    },

    /*
    ***********************************************
      DESTRUCTOR
    ***********************************************
    */
    destruct: function destruct() {
      this._worker = null;
    }
  });
  cv.data.FileWorker.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=FileWorker.js.map?dt=1642787827506