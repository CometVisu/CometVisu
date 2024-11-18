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
      "qx.dev.unit.TestCase": {
        "require": true
      },
      "qx.bom.media.Audio": {},
      "qx.bom.client.Browser": {
        "require": true
      }
    },
    "environment": {
      "provided": [],
      "required": {
        "qx.test.travis": {},
        "browser.name": {
          "className": "qx.bom.client.Browser"
        }
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* ************************************************************************
  
     qooxdoo - the new era of web development
  
     http://qooxdoo.org
  
     Copyright:
       2004-2010 1&1 Internet AG, Germany, http://www.1und1.de
  
     License:
       MIT: https://opensource.org/licenses/MIT
       See the LICENSE file in the project's top-level directory for details.
  
     Authors:
       * Adrian Olaru (adrianolaru)
  
  ************************************************************************ */

  /**
   * @ignore(DOMException)
   */

  qx.Class.define("qx.test.bom.media.MediaTestCase", {
    type: "abstract",
    extend: qx.dev.unit.TestCase,
    members: {
      _media: null,
      _src: null,
      _getSrc: function _getSrc() {},
      _createMedia: function _createMedia() {},
      _checkFeature: function _checkFeature() {},
      setUp: function setUp() {
        this._checkFeature();
        this._src = this._getSrc();
        this._media = this._createMedia();
      },
      tearDown: function tearDown() {
        this._media.dispose();
        this._media = null;
        this._src = null;
      },
      testId: function testId() {
        var id = "mediaid";
        this._media.setId(id);
        this.assertEquals(id, this._media.getId());
      },
      testVolume: function testVolume() {
        var exReg = /index.*?size.*?err/i;
        var that = this;
        this._media.setVolume(1);
        this.assertEquals(1, this._media.getVolume());
        this._media.setVolume(0);
        this.assertEquals(0, this._media.getVolume());
        this.assertException(function () {
          that._media.setVolume(-1);
        }, DOMException, exReg);
        this.assertException(function () {
          that._media.setVolume(2);
        }, DOMException, exReg);
      },
      testMute: function testMute() {
        this.assertFalse(this._media.isMuted());
        this._media.setMuted(true);
        this.assertTrue(this._media.isMuted());
        this._media.setMuted(false);
        this.assertFalse(this._media.isMuted());
      },
      testCurrentTime: function testCurrentTime() {
        var that = this;
        this.assertEquals(0, this._media.getCurrentTime());
      },
      testSource: function testSource() {
        this._media.dispose();
        this._media = new qx.bom.media.Audio();
        this._media.setSource(this._src);
        var _ref = this._src.split("/");
        var expectedFile = _ref[_ref.length - 1];
        _ref = this._media.getSource().split("/");
        var foundFile = _ref[_ref.length - 1];
        this.assertEquals(expectedFile, foundFile);
      },
      testControls: function testControls() {
        this.assertFalse(this._media.hasControls());
        this._media.showControls();
        this.assertTrue(this._media.hasControls());
        this._media.hideControls();
        this.assertFalse(this._media.hasControls());
      },
      testAutoplay: function testAutoplay() {
        this.assertFalse(this._media.getAutoplay());
        this._media.setAutoplay(true);
        this.assertTrue(this._media.getAutoplay());
        this._media.setAutoplay(false);
        this.assertFalse(this._media.getAutoplay());
      },
      testGetMediaObject: function testGetMediaObject() {
        this.assertElement(this._media.getMediaObject());
      },
      testPreload: function testPreload() {
        //default
        this.assertEquals("auto", this._media.getPreload(), "a");
        this._media.setPreload("none");
        this.assertEquals("none", this._media.getPreload());
        this._media.setPreload("metadata");
        this.assertEquals("metadata", this._media.getPreload(), "12");
        this._media.setPreload("auto");
        this.assertEquals("auto", this._media.getPreload(), "b");

        //the preload default is auto
        this._media.setPreload("none");
        this._media.setPreload("affe");
        this.assertEquals("auto", this._media.getPreload(), "c");
      },
      testLoop: function testLoop() {
        this.assertFalse(this._media.isLoop());
        this._media.setLoop(true);
        this.assertTrue(this._media.isLoop());
        this._media.setLoop(false);
        this.assertFalse(this._media.isLoop());
      },
      testVolumeChangeEvent: function testVolumeChangeEvent() {
        var _this = this;
        this._media.addListener("volumechange", function (e) {
          _this.resume(function () {
            this.assertEquals(0.5, this._media.getVolume());
          }, _this);
        });
        this._media.setVolume(0.5);
        this.wait();
      },
      // On safari this test fails, if we are running the
      // complete testsuite and the test is not the first
      // test in qx.test.bom.media.MediaTestCase. By naming
      // it with a blank behind test it is enqueued as the first
      // test and the test run succeeds.
      //
      // Note that the tests in qx.test.bom.media.MediaTestCase
      // are started seperately or this test is restarted after
      // it failed, then it succeeds.
      // This is some weird timing or caching issue which could
      // not be solved otherwise.
      //
      "test Play Event": function test_Play_Event() {
        var _this2 = this;
        if (navigator.plugins.length == 0) {
          this.skip("HTML5 audio/video play event test disabled on headless browsers");
        }
        // Disabled on travis because of events not being fired reliable
        if (qx.core.Environment.get("qx.test.travis") == "true") {
          this.skip("HTML5 audio/video play event test disabled on travis");
        }
        // BUG #8778
        if (qx.core.Environment.get("browser.name") == "mobile chrome") {
          this.skip("HTML5 audio/video playback must be triggered by user interaction in Chrome on Android.");
        }
        this.assertTrue(this._media.isPaused());
        this._media.addListener("play", function (e) {
          _this2.resume(function () {
            this.assertFalse(this._media.isPaused());
          }, _this2);
        });
        this._media.play();
        this.wait();
      }
    }
  });
  qx.test.bom.media.MediaTestCase.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=MediaTestCase.js.map?dt=1731948113001