/* Audio.js 
 * 
 * copyright (c) 2010-2016, Christian Mayer and the CometVisu contributers.
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
 * @widget_example <settings>
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
 * @module structure/pure/Audio
 * @requires structure/pure
 * @author Markus Damman
 * @since 0.8.4 (2014)
 */
define( [
  '_common',
  'lib/cv/xml/Parser',
  'lib/cv/role/Update'
], function() {
  "use strict";

  Class('cv.structure.pure.Audio', {
    isa: cv.structure.pure.AbstractWidget,

    does: cv.role.Update,

    has: {
      src: { is: 'r' },
      id: { is: 'r' },
      width: { is: 'r' },
      height: { is: 'r' },
      autoplay: { is: 'r' },
      loop: { is: 'r' },
      thresholdValue: { is: 'r' }
    },

    my : {
      methods: {
        getAttributeToPropertyMappings: function() {
          return {
            src: {},
            id: {},
            width: {},
            height: {},
            autoplay: {
              transform: function (value) {
                return value === "autoplay" || value === "true"
              }
            },
            loop: {
              transform: function (value) {
                return value === "loop" || value === "true"
              }
            },
            thresholdValue: {default: 1}
          };
        }
      }
    },

    augment: {
      getDomString: function () {
        // create the main structure
        // create the actor
        var style = '';
        if (this.width) style += 'width:' + this.width + ';';
        if (this.height) style += 'height:' + this.height + ';';
        if (style != '') style = 'style="' + style + '"';
        var autoplay = (this.autoplay) ? ' autoplay ' : '';
        var loop = (this.loop) ? ' loop ' : '';
        return '<div class="actor"><audio id="' + this.getId() + '" ' + autoplay + loop + style + ' controls> <source src="' + this.getSrc()+ '" > </audio> </div>';
      }
    },

    methods: {

      getActor: function() {
        if (!this.$$actorElement) {
          this.$$actorElement = this.getDomElement().find(".actor audio");
        }
        return this.$$actorElement;
      },

      /**
       * Handles updates of incoming data for this widget
       * @method update
       * @param {String} address - Source address of the incoming data
       * @param {String} value - Incoming data
       */
      handleUpdate: function (value, address) {
        var on = this.applyMapping(this.getThresholdValue());

        if (value >= on) {
          var audioWidget = this.getActor()[0];
          if (audioWidget.paused == true)
            audioWidget.play();
        }
      }
    }
  });
  // register the parser
  cv.xml.Parser.addHandler("audio", cv.structure.pure.Audio);
}); // end define