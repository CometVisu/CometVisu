qx.Class.define('cv.util.DynamicScriptLoader', {
  extend: qx.util.DynamicScriptLoader,

  /*
  ******************************************************
    CONSTRUCTOR
  ******************************************************
  */
  construct: function(scriptArr) {
    var queue = (qx.lang.Type.isString(scriptArr) ? [ scriptArr ] : qx.lang.Array.clone(scriptArr));
    if (cv.Config.forceReload === true) {
      // make sure that no cached script are loaded
      for (var i=0, l = queue.length; i<l; i++) {
        queue[i] = qx.util.ResourceManager.getInstance().toUri(queue[i])+"?"+Date.now();
      }
    }
    this.base(arguments, queue);
  }
});