/**
 *
 */
qx.Class.define('cv.io.Net', {
  type: 'static',

  /*
  ***********************************************
    STATICS
  ***********************************************
  */
  statics: {
    /**
     * Very basic window.fetch replacement that does not support the `init` parameter and therefore only supports
     * GET requests. Uses `qx.io.request.Xhr` internally which supports the XHR calls being recorded / replayed
     * by CometVisus own recording feature. window.fetch calls are nor supported by the recording feature and get lost.
     *
     * @param url {string}
     * @return {Promise<unknown>}
     */
    fetch(url) {
      return new Promise(resolve => {
        const xhr = new qx.io.request.Xhr(url);
        xhr.addListenerOnce('success', function (e) {
          const req = e.getTarget();
          const response = new Response(req.getResponse(), {
            status: req.getStatus(),
            statusText: req.getStatusText()
          });
          resolve(response);
        }, this);
        xhr.addListenerOnce('error', function (e) {
          const req = e.getTarget();
          const response = new Response(req.getResponse(), {
            status: req.getStatus(),
            statusText: req.getStatusText()
          });
          resolve(response);
        }, this);
        xhr.send();
      });
    }
  }
});
