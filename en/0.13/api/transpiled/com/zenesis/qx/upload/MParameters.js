(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ***********************************************************************
  
     UploadMgr - provides an API for uploading one or multiple files
     with progress feedback (on modern browsers), does not block the user 
     interface during uploads, supports cancelling uploads.
  
     http://qooxdoo.org
  
     Copyright:
       2011 Zenesis Limited, http://www.zenesis.com
  
     License:
       MIT: https://opensource.org/licenses/MIT
       
       This software is provided under the same licensing terms as Qooxdoo,
       please see the LICENSE file in the Qooxdoo project's top-level directory 
       for details.
  
     Authors:
   * John Spackman (john.spackman@zenesis.com)
  
   ************************************************************************/

  /**
   * This mixin adds get/setParam methods used by UploadManager, AbstractHandler,
   * and UploadButton
   */
  qx.Mixin.define("com.zenesis.qx.upload.MParameters", {
    members: {
      __P_564_0: null,
      /**
       * Sets a parameter value to be sent with the file
       *
       * @param name
       *          {String} name of the parameter
       * @param value
       *          {String} the value of the parameter, or null to delete a
       *          previous parameter
       */
      setParam: function setParam(name, value) {
        if (value !== null && typeof value != "string") value = "" + value;
        if (!this.__P_564_0) this.__P_564_0 = {};
        this.__P_564_0[name] = value;
      },
      /**
       * Returns a parameter value to be sent with the file
       *
       * @param name {String} Name of the parameter
       * @returns {Boolean}
       */
      getParam: function getParam(name) {
        return this.__P_564_0 && this.__P_564_0[name];
      },
      /**
       * Returns a list of parameter names
       *
       * @returns {Array}
       */
      getParamNames: function getParamNames() {
        var result = [];
        if (this.__P_564_0) for (var name in this.__P_564_0) result.push(name);
        return result;
      }
    }
  });
  com.zenesis.qx.upload.MParameters.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MParameters.js.map?dt=1691935457700