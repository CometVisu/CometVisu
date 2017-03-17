
qx.Class.define("cv.report.utils.FakeServer", {
  type: "static",

  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    _xhr: null,
    __fakeServer: null,

    init: function (log) {
      this._xhr = {};
      this.__fakeServer = qx.dev.FakeServer.getInstance();

      // split by URI
      log.response.forEach(function (entry) {
        if (!this._xhr[entry.url]) {
          this._xhr[entry.url] = [];
        }
        this._xhr[entry.url].push(entry);
      }, this);

      // Fake all requests
      this.__fakeServer.addFilter(function () {
        return false;
      });

      // add response
      this.__fakeServer.respondWith("GET", /.*/, this.__respond);
    },

    __respond: function(request) {
      var xhr = cv.report.utils.FakeServer._xhr;
      var url = cv.report.Record.normalizeUrl(request.url);
      if (url.indexOf("nocache=") >= 0) {
        url = url.replace(/[\?|&]nocache=[0-9]+/, "");
      }
      if (!xhr[url] || xhr[url].length === 0) {
        qx.log.Logger.error(this, "no logged responses for URI "+url+" found");
      } else {
        qx.log.Logger.debug(this, "faking response for "+url);
        var response = "";
        if (xhr[url].length === 1) {
          response = xhr[url][0];
        } else {
          // multiple responses recorded use them as LIFO stack
          response = xhr[url].unshift();
        }
        request.respond(response.status, response.headers, response.body);
      }
    }
  }
});