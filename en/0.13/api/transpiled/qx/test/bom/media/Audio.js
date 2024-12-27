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
      "qx.bom.media.Audio": {}
    },
    "environment": {
      "provided": [],
      "required": {
        "html.audio.mp3": {
          "className": "qx.bom.client.Html"
        },
        "html.audio.ogg": {
          "className": "qx.bom.client.Html"
        },
        "html.audio.wav": {
          "className": "qx.bom.client.Html"
        },
        "html.audio": {
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

  qx.Class.define("qx.test.bom.media.Audio", {
    extend: qx.test.bom.media.MediaTestCase,
    include: [qx.dev.unit.MRequirements],
    members: {
      _getSrc: function _getSrc() {
        if (qx.core.Environment.get("html.audio.mp3")) {
          return qx.util.ResourceManager.getInstance().toUri("qx/test/media/knock.mp3");
        } else if (qx.core.Environment.get("html.audio.ogg")) {
          return qx.util.ResourceManager.getInstance().toUri("qx/test/media/knock.ogg");
        } else if (qx.core.Environment.get("html.audio.wav")) {
          return qx.util.ResourceManager.getInstance().toUri("qx/test/media/knock.wav");
        }
      },
      _createMedia: function _createMedia() {
        return new qx.bom.media.Audio(this._src);
      },
      _checkFeature: function _checkFeature() {
        this.require(["audio"]);
      },
      hasAudio: function hasAudio() {
        return qx.core.Environment.get("html.audio");
      }
    }
  });
  qx.test.bom.media.Audio.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Audio.js.map?dt=1735341775529