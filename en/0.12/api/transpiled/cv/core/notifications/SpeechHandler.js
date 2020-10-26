(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.core.Object": {
        "construct": true,
        "require": true
      },
      "cv.core.notifications.IHandler": {
        "require": true
      },
      "cv.core.notifications.Router": {},
      "qx.locale.Manager": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* SpeechHandler.js 
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
   * SpeechHandler
   *
   * @author tobiasb
   * @since 2017
   *
   * @ignore(SpeechSynthesisUtterance)
   */
  qx.Class.define("cv.core.notifications.SpeechHandler", {
    extend: qx.core.Object,
    implement: cv.core.notifications.IHandler,
    type: "singleton",

    /*
    ******************************************************
      CONSTRUCTOR
    ******************************************************
    */
    construct: function construct() {
      qx.core.Object.constructor.call(this);
      this.__P_5_0 = {};
    },

    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      __P_5_0: null,
      handleMessage: function handleMessage(message, config) {
        var text = message.message || message.title;

        if (config.skipInitial && !this.__P_5_0[message.topic]) {
          this.__P_5_0[message.topic] = {
            text: text,
            time: Date.now()
          };
          return;
        }

        if (cv.core.notifications.Router.evaluateCondition(message)) {
          if (!text || text.length === 0) {
            // nothing to say
            this.debug("no text to speech given");
            return;
          }

          if (text.substring(0, 1) === "!") {
            // override repeatTimeout, force saying this
            text = text.substring(1);
          } else if (config.repeatTimeout >= 0) {
            // do not repeat (within timeout when this.repeatTimeout > 0)
            if (this.__P_5_0[message.topic] && this.__P_5_0[message.topic].text === text && (config.repeatTimeout === 0 || config.repeatTimeout >= Math.round((Date.now() - this.__P_5_0[message.topic].time) / 1000))) {
              // update time
              this.__P_5_0[message.topic].time = Date.now(); // do not repeat

              this.debug("skipping TTS because of repetition " + text);
              return;
            }
          }

          this.__P_5_0[message.topic] = {
            text: text,
            time: Date.now()
          };
          this.say(text);
        }
      },
      say:
      /* istanbul ignore next [no need to text the browsers TTS capability] */
      function say(text, language) {
        if (!window.speechSynthesis) {
          this.warn(this, "this browser does not support the Web Speech API");
          return;
        }

        var synth = window.speechSynthesis;

        if (!language) {
          language = qx.locale.Manager.getInstance().getLocale();
        } // speak


        var utterThis = new SpeechSynthesisUtterance(text);
        var selectedVoice, defaultVoice;
        var voices = synth.getVoices();

        if (voices.length === 0) {
          synth.onvoiceschanged = function () {
            this.say(text, language);
          }.bind(this);

          return;
        } else {
          synth.onvoiceschanged = null;
        }

        for (var i = 0, l = voices.length; i < l; i++) {
          if (language && voices[i].lang.substr(0, 2).toLowerCase() === language) {
            selectedVoice = voices[i];
          }

          if (voices[i]["default"]) {
            defaultVoice = voices[i];
          }
        }

        if (!selectedVoice) {
          selectedVoice = defaultVoice;
        }

        utterThis.voice = selectedVoice;
        this.debug("saying '" + text + "' in voice " + selectedVoice.name);
        synth.speak(utterThis);
      }
    }
  });
  cv.core.notifications.SpeechHandler.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=SpeechHandler.js.map?dt=1603737112292