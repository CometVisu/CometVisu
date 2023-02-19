(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.form.Button": {
        "require": true
      },
      "com.zenesis.qx.upload.MUploadButton": {
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
   * Implementation of an UploadButton
   */
  qx.Class.define("com.zenesis.qx.upload.UploadButton", {
    extend: qx.ui.form.Button,
    include: [com.zenesis.qx.upload.MUploadButton],
    members: {}
  });
  com.zenesis.qx.upload.UploadButton.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=UploadButton.js.map?dt=1676809336762