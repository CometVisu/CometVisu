/* structure_plugin.js (c) 2010 by Christian Mayer [CometVisu at ChristianMayer dot de]
 *
 * This program is free software; you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation; either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA
*/

/**
 * Use the Web Speech API (https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
 * to make text-to-speech service available. This plugin listens to a address and forwards the
 * incoming data to the browser TTS engine (if the browser supports it)
 */
define( ['structure_custom' ], function( VisuDesign_Custom ) {
  "use strict";

  /**
   * This is a custom function that extends the available widgets.
   * It's purpose is to change the design of the visu during runtime
   * to demonstrate all available
   */
  VisuDesign_Custom.prototype.addCreator("speech", {
    that: this,

    create: function( element, path) {
      if (!window.speechSynthesis) {
        console.log("this browser does not support the Web Speech API");
        return "";
      }
      var $e = $(element);
      var address = templateEngine.design.makeAddressList($e, false, path);

      var lang = null;
      var data = templateEngine.widgetDataInsert( path, {
        'language'   : $e.attr('lang') ? $e.attr('lang').toLowerCase() : null,
        'address' : address,
        'type'    : 'speech'
      });
      return "";
    },

    update: function(address, text) {
      if (!text || text.length === 0) {
        // nothing to say
        return;
      }
      var element = $(this);
      var path = element.attr('id');
      var data = templateEngine.widgetDataGet(path);

      var synth = window.speechSynthesis;

      // speak
      var utterThis = new SpeechSynthesisUtterance(text);

      var selectedVoice, defaultVoice;
      var voices = synth.getVoices();
      for (var i = 0, l = voices.length; i < l; i++) {
        if (data.language && voices[i].lang.substr(0, 2).toLowerCase() === data.language) {
          selectedVoice = voices[i];
        }
        if (voices[i].default) {
          defaultVoice = voices[i];
        }
      }
      if (!selectedVoice) {
        selectedVoice = defaultVoice;
      }
      utterThis.voice = selectedVoice;
      synth.speak(utterThis);
    }
  });

});