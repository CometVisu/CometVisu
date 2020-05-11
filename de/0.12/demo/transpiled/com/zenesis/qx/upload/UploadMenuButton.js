(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.ui.menu.Button": {
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
  qx.Class.define("com.zenesis.qx.upload.UploadMenuButton", {
    extend: qx.ui.menu.Button,
    include: [com.zenesis.qx.upload.MUploadButton],
    members: {
      _onTap: function _onTap(evt) {
        var self = this;
        setTimeout(function () {
          self._onTap(evt);
        }, 100);
      }
    }
  });
  com.zenesis.qx.upload.UploadMenuButton.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=UploadMenuButton.js.map?dt=1589219663227