(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "com.zenesis.qx.upload.MParameters": {
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
   * This mixin provides a trivial way to make any widget suitable as a widget for
   * Uploader - the only trick is that the capture and releaseCapture methods in
   * qx.ui.core.Widget must not be fired.
   */
  qx.Mixin.define("com.zenesis.qx.upload.MUploadButton", {
    include: [com.zenesis.qx.upload.MParameters],
    properties: {
      /**
       * File types which are acceptable for upload; note that this is not guaranteed
       * because not all (older) browsers support it, but where available it will
       * restrict the file open dialog to only allow these file types.
       * 
       * This value is passed directly through to the input tag's accept attribute, so
       * the format can be seen here: {@link http://www.w3schools.com/tags/att_input_accept.asp};
       * in summary, it is a comma separated list of file extensions (with the dot) and/or
       * MIME types; EG:
       * 
       * 	.jpg,.png,.gif			-- Images
       * 	image/*,.mp4				-- Images and *.mp4
       */
      acceptUpload: {
        init: null,
        nullable: true,
        check: "String",
        event: "changeAcceptUpload"
      },

      /**
       * Whether to support multiple files (default=true); this is not supported
       * on older browsers
       */
      multiple: {
        check: "Boolean",
        init: false,
        nullable: false,
        event: "changeMultiple"
      },

      /**
       * Whether to support directories only (default=false); this is not supported
       * on older browsers
       */
      directory: {
        check: "Boolean",
        init: false,
        nullable: false,
        event: "changeDirectory"
      }
    },
    members: {
      // overridden
      capture: function capture() {// Nothing
      },
      // overridden
      releaseCapture: function releaseCapture() {// Nothing
      }
    }
  });
  com.zenesis.qx.upload.MUploadButton.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MUploadButton.js.map?dt=1664613659250