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
  construct() {
    super();
    this.initModel(new qx.data.Array());
    this._initRequest();
  },

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    REQUIRES: ['php']
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

    future: {
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
    finished: 'qx.event.type.Data',
    // this event is sent when the model itself wants to trigger a list refresh.
    refresh: 'qx.event.type.Event'
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

    getRequestData() {
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
      return requestData;
    },

    _initRequest() {
      this.__request = new qx.io.request.Xhr(qx.util.ResourceManager.getInstance().toUri('plugins/rsslog/rsslog.php'));

      this.__request.set({
        accept: 'application/json',
        requestData: this.getRequestData(),
        method: 'GET'
      });

      this.__request.addListener('success', this.__updateModel, this);
      this.__request.addListener('error', ev => {
        this.error(
          'C: #rss_%s, Error: %s, Feed: %s',
          this.getPath(),
          ev.getTarget().getResponse(),
          this.__request.getUrl()
        );
        this.fireDataEvent('finished', false);
      });
      this.__request.addListener('timeout', ev => {
        this.error(
          'C: #rss_%s, timeout, Feed: %s',
          this.getPath(),
          this.__request.getUrl()
        );
        this.fireDataEvent('finished', false);
      });
    },

    __updateModel(ev) {
      const response = ev.getTarget().getResponse();
      if (typeof response === 'string') {
        // no json -> error
        this.error('Expected JSON, but got response MIME:', ev.getTarget().getResponseContentType());
        this.error(response);
        this.fireDataEvent('finished', false);
      } else {
        const model = this.getModel();
        for (const entry of response.responseData.feed.entries) {
          if (entry.mapping) {
            entry.mappedState = cv.Application.structureController.mapValue(entry.mapping, entry.state);
          }
        }
        model.replace(response.responseData.feed.entries);
        this.fireDataEvent('finished', true);
      }
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

    handleEvent(ev, data, model) {
      let handled = false;
      const requestData = {};
      if (this.getDatabase()) {
        requestData.database = this.getDatabase();
      }
      let needsConfirmation = false;
      let confirmTitle = '';
      let confirmMessage = '';
      switch (data.action) {
        case 'toggle-state':
          requestData.u = model.id;
          requestData.state = model.state === '0' ? '1' : '0';
          handled = true;
          break;

        case 'delete':
          requestData.d = model.id;
          needsConfirmation = data['no-confirm'] !== 'true';
          confirmTitle = qx.locale.Manager.tr('Confirm deletion');
          confirmMessage = qx.locale.Manager.tr('Do you really want to delete this entry?');
          handled = true;
          break;

        default:
          this.error('unhandled event ', data.action);
          break;
      }
      if (handled) {
        const req = new qx.io.request.Xhr(this.__request.getUrl());
        req.set({
          method: 'GET',
          accept: 'application/json',
          requestData: requestData
        });
        req.addListener('success', async () => {
          this.fireEvent('refresh');
        });
        if (needsConfirmation) {
          cv.ui.PopupHandler.confirm(confirmTitle, confirmMessage, confirmed => {
              if (confirmed) {
                req.send();
              }
            }
          );
        } else {
          req.send();
        }
      }

      return handled;
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
