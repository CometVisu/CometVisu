
qx.Class.define('cv.report.utils.FakeServer', {
  type: 'static',

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    _xhr: {},
    _responseDelays: [],
    _index : 0,

    init: function (log, build) {
      let prependResourcePath = null;
      qx.log.Logger.info(this, build+' log replaying in '+qx.core.Environment.get('cv.build'));
      if (build !== qx.core.Environment.get('cv.build')) {
        // the log has not been recorded in the same build as is is replayed, some paths must be adjusted
        if (build === 'build') {
          // map from build to source
          prependResourcePath = '../source/';
        }
      }

      // split by URI
      log.response.forEach(function (entry) {
        let url = entry.url;
        if (prependResourcePath && url.startsWith('resource/')) {
          url = prependResourcePath+url;
        }
        if (!this._xhr[url]) {
          this._xhr[url] = [];
        }
        this._xhr[url].push(entry);
        this._responseDelays.push(entry.delay);
      }, this);

      // configure server
      const server = qx.dev.FakeServer.getInstance().getFakeServer();
      server.respondWith(this.__respond.bind(this));
      this._responseDelays.unshift(10);
    },

    __respond: function(request) {
      const xhrData = cv.report.utils.FakeServer._xhr;
      let url = cv.report.Record.normalizeUrl(request.url);
      if (url.indexOf('nocache=') >= 0) {
        url = url.replace(/[\?|&]nocache=[0-9]+/, '');
      }
      if (!xhrData[url] && !url.startsWith('/') && qx.core.Environment.get('cv.build') === 'source') {
        url = '../source/' + url;
      }
      if (!xhrData[url] || xhrData[url].length === 0) {
        qx.log.Logger.error(this, '404: no logged responses for URI '+url+' found');
      } else {
        qx.log.Logger.debug(this, 'faking response for '+url);
        let response = '';
        if (xhrData[url].length === 1) {
          response = xhrData[url][0];
        } else {
          // multiple responses recorded use them as LIFO stack
          response = xhrData[url].shift();
        }

        if (request.readyState === 4 && request.status === 404) {
          // This is a hack, sometimes the request has a 404 status and send readystate
          // the respond would fail if we do not override it here
          request.readyState = 1;
        }
        request.respond(response.status, response.headers, response.body);
        cv.report.utils.FakeServer._index++;
      }
    },

    getResponse: function(url) {
      url = cv.report.Record.normalizeUrl(url);

      if (cv.report.utils.FakeServer._xhr[url]) {
        return cv.report.utils.FakeServer._xhr[url][0];
      }
      return null;
    },

    unqueueResponse: function(url) {
      url = cv.report.Record.normalizeUrl(url);
      if (cv.report.utils.FakeServer._xhr[url]) {
        return cv.report.utils.FakeServer._xhr[url].shift();
      }
      return null;
    }
  }
});
