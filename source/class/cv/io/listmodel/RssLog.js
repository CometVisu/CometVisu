/**
 * Data retrieval for RssLog database.
 */
qx.Class.define('cv.io.listmodel.RssLog', {
  extend: qx.core.Object,
  implement: cv.io.listmodel.IListModel,

  /*
  ***********************************************
    CONSTRUCTOR
  ***********************************************
  */
  construct: function () {
    this.base(arguments);
    this.initModel(new qx.data.Array());
    this._initRequest();
  },

  /*
  ***********************************************
    PROPERTIES
  ***********************************************
  */
  properties: {
    model: {
      check: 'qx.data.Array',
      deferredInit: true
    },
    database: {
      check: 'String',
      nullable: true,
      apply: '_applyRequestData'
    },
    filter: {
      check: 'String',
      nullable: true,
      apply: '_applyRequestData'
    },
    future:     {
      check: 'String',
      nullable: true,
      apply: '_applyRequestData'
    },
    limit: {
      check: 'Number',
      init: 0,
      transform: '_parseInt',
      apply: '_applyRequestData'
    }
  },

  /*
  ***********************************************
    EVENTS
  ***********************************************
  */
  events: {
    finished: 'qy.event.type.Data'
  },

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    __request: null,

    _parseInt(value) {
      if (typeof value === 'string') {
        return parseInt(value);
      }
      return value;
    },

    _applyRequestData(value, old, name) {
      if (this.__request) {
        const data = this.__request.getRequestData();
        if (value) {
          data[name] = value;
        } else if (Object.prototype.hasOwnProperty.call(data, name)) {
          delete data[name];
        }
      }
    },

    _initRequest() {
      this.__request = new qx.io.request.Xhr(qx.util.ResourceManager.getInstance().toUri('plugins/rsslog/rsslog.php'));
      const requestData = {};
      if (this.getDatabase()) {
        requestData.database = this.getDatabase();
      }
      if (this.getFilter()) {
        requestData.f = this.getFilter();
      }
      if (this.getLimit()) {
        requestData.limit = this.getLimit();
      }
      if (this.getFuture()) {
        requestData.future = this.getFuture();
      }
      requestData.j = 1;
      this.__request.set({
        accept: 'application/json',
        requestData: requestData,
        method: 'GET'
      });
      this.__request.addListener('success', this.__updateModel, this);
      this.__request.addListener('error', function(ev) {
        this.error('C: #rss_%s, Error: %s, Feed: %s', this.getPath(), ev.getTarget().getResponse(), this.__request.getUrl());
        this.fireDataEvent('finished', false);
      }, this);
    },

    __updateModel(ev) {
      const response = ev.getTarget().getResponse();
      if (typeof response === 'string') {
        // no json -> error
        this.error('Expected JSON, but got response MIME:', ev.getTarget().getResponseContentType());
        this.error(response);
      } else {
        const model = this.getModel();
        model.replace(response.responseData.feed.entries);
      }
      this.fireDataEvent('finished', false);
    },

    async refresh() {
      if (this.__request) {
        try {
          await this._sendWithPromise();
        } catch (e) {
          this.error(e.message);
        }
      }
    },

    async _sendWithPromise() {
      return new Promise((resolve, reject) => {
        this.addListenerOnce('finished', ev => {
          if (ev.getData()) {
            resolve();
          } else {
            reject(new Error('request failed'));
          }
        });
        this.__request.send();
      });
    }
  },

  defer(clazz) {
    cv.io.listmodel.Registry.register(clazz);
  }
});
