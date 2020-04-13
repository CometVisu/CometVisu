(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.ui.structure.AbstractWidget": {
        "require": true
      },
      "cv.ui.common.Update": {
        "require": true
      },
      "cv.ui.structure.WidgetFactory": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Audio.js 
   * 
   * copyright (c) 2010-2017, Christian Mayer and the CometVisu contributers.
   * 
   * This program is free software; you can redistribute it and/or modify it
   * under the terms of the GNU General Public License as published by the Free
   * Software Foundation; either version 3 of the License, or (at your option)
   * any later version.
   *
   * This program is distributed in the hope that it will be useful, but WITHOUT
   * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
   * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
   * more details.
   *
   * You should have received a copy of the GNU General Public License along
   * with this program; if not, write to the Free Software Foundation, Inc.,
   * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
   */

  /**
   * The audio widget embeds an audio file, which can be automatically played by incoming data
   *
   * @widgetexample <settings>
   *   <screenshot name="audio_example">
   *    <caption>Default example for defining an audio widget in the configuration</caption>
   *    <data address="0/0/0">1</data>
   *   </screenshot>
   * </settings>
   * <audio id="audio_widget" src="path/to/audio_file.mp3">
   *   <layout colspan="4" />
   *   <label>Audio</label>
   *   <address transform="DPT:1.001" mode="read">0/0/0</address>
   * </audio>
   *
   *
   * @author Markus Damman
   * @since 0.8.4 (2014)
   */
  qx.Class.define('cv.ui.structure.pure.Audio', {
    extend: cv.ui.structure.AbstractWidget,
    include: cv.ui.common.Update,

    /*
    ******************************************************
      PROPERTIES
    ******************************************************
    */
    properties: {
      src: {
        check: "String",
        nullable: true
      },
      id: {
        check: "String",
        nullable: true
      },
      width: {
        check: "String",
        nullable: true
      },
      height: {
        check: "String",
        nullable: true
      },
      autoplay: {
        check: "Boolean",
        init: false
      },
      loop: {
        check: "Boolean",
        init: false
      },
      thresholdValue: {
        check: "Number",
        init: 1
      }
    },

    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      // overridden
      _getInnerDomString: function _getInnerDomString() {
        // create the main structure
        // create the actor
        var style = '';

        if (this.getWidth()) {
          style += 'width:' + this.getWidth() + ';';
        }

        if (this.getHeight()) {
          style += 'height:' + this.getHeight() + ';';
        }

        if (style !== '') {
          style = 'style="' + style + '"';
        }

        var autoplay = this.isAutoplay() ? ' autoplay ' : '';
        var loop = this.isLoop() ? ' loop ' : '';
        return '<div class="actor"><audio id="' + this.getId() + '" ' + autoplay + loop + style + ' controls> <source src="' + this.getSrc() + '" > </audio> </div>';
      },
      // overridden
      getActor: function getActor() {
        return this.getDomElement().querySelector(".actor audio");
      },

      /**
       * Handles updates of incoming data for this widget
       *
       * @param address {String} Source address of the incoming data
       * @param value {String} Incoming data
       */
      _update: function _update(address, value) {
        var on = this.applyMapping(this.getThresholdValue());

        if (value >= on) {
          var audioWidget = this.getActor();

          if (audioWidget.paused === true) {
            audioWidget.play();
          }
        }
      }
    },
    defer: function defer(statics) {
      cv.ui.structure.WidgetFactory.registerClass("audio", statics);
    }
  });
  cv.ui.structure.pure.Audio.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Audio.js.map?dt=1586772877663