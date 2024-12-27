(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.core.Environment": {
        "defer": "load",
        "require": true
      },
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.test.bom.media.MediaTestCase": {
        "require": true
      },
      "qx.dev.unit.MRequirements": {
        "require": true
      },
      "qx.bom.client.Html": {
        "require": true
      },
      "qx.util.ResourceManager": {},
      "qx.bom.media.Video": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "html.video.h264": {
          "className": "qx.bom.client.Html"
        },
        "html.video.ogg": {
          "className": "qx.bom.client.Html"
        },
        "html.video.webm": {
          "className": "qx.bom.client.Html"
        },
        "html.video": {
          "className": "qx.bom.client.Html"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2007-2011 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Adrian Olaru (adrianolaru)
  
  ************************************************************************ */

  /* ************************************************************************
  
  
  ************************************************************************ */
  /**
   *
   * @asset(qx/test/media/*)
   */

  qx.Class.define("qx.test.bom.media.Video", {
    extend: qx.test.bom.media.MediaTestCase,
    include: [qx.dev.unit.MRequirements],
    members: {
      _getSrc: function _getSrc() {
        if (qx.core.Environment.get("html.video.h264")) {
          return qx.util.ResourceManager.getInstance().toUri("qx/test/media/qx.mp4");
        } else if (qx.core.Environment.get("html.video.ogg")) {
          return qx.util.ResourceManager.getInstance().toUri("qx/test/media/qx.ogv");
        } else if (qx.core.Environment.get("html.video.webm")) {
          return qx.util.ResourceManager.getInstance().toUri("qx/test/media/qx.webm");
        }
      },
      _createMedia: function _createMedia() {
        return new qx.bom.media.Video(this._src);
      },
      _checkFeature: function _checkFeature() {
        this.require(["video"]);
      },
      hasVideo: function hasVideo() {
        return qx.core.Environment.get("html.video");
      },
      testWidth: function testWidth() {
        this._media.setWidth(200);
        this.assertEquals(200, this._media.getWidth());
      },
      testHeight: function testHeight() {
        this._media.setWidth(200);
        this.assertEquals(200, this._media.getWidth());
      },
      testVideoWidthAndHeight: function testVideoWidthAndHeight(e) {
        var _this = this;
        this.assertEquals(0, this._media.getVideoWidth());
        this.assertEquals(0, this._media.getVideoHeight());

        //we know the video width and hight when meta data is loaded
        this._media.addListener("loadedmetadata", function (e) {
          var v = e._target;
          _this.assertEquals(720, v.getVideoWidth());
          _this.assertEquals(704, v.getVideoHeight());
        });

        //or when the entire video is loaded
        this._media.addListener("loadeddata", function (e) {
          var v = e._target;
          _this.assertEquals(720, v.getVideoWidth());
          _this.assertEquals(704, v.getVideoHeight());
        });
      }
    }
  });
  qx.test.bom.media.Video.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Video.js.map?dt=1735341775561