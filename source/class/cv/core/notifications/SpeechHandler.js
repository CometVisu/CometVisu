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
  construct: function() {
    this.base(arguments);
    this.__lastSpeech = {};
  },

  /*
  ******************************************************
    MEMBERS
  ******************************************************
  */
  members: {
    __lastSpeech: null,

    handleMessage: function(message, config) {
      var text = message.message || message.title;
      if (config.skipInitial && !this.__lastSpeech[message.topic]) {
        this.__lastSpeech[message.topic] = {
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

        if (text.substring(0,1) === "!") {
          // override repeatTimeout, force saying this
          text = text.substring(1);
        }
        else if (config.repeatTimeout >= 0) {
          // do not repeat (within timeout when this.repeatTimeout > 0)
          if (this.__lastSpeech[message.topic] && this.__lastSpeech[message.topic].text === text && (config.repeatTimeout === 0 ||
              config.repeatTimeout >= Math.round((Date.now()-this.__lastSpeech[message.topic].time)/1000))) {
            // update time
            this.__lastSpeech[message.topic].time = Date.now();
            // do not repeat
            this.debug("skipping TTS because of repetition " + text);
            return;
          }
        }

        this.__lastSpeech[message.topic] = {
          text: text,
          time: Date.now()
        };

        this.say(text);
      }
    },

    say: /* istanbul ignore next [no need to text the browsers TTS capability] */ function(text, language) {

      if (!window.speechSynthesis) {
        this.warn(this, "this browser does not support the Web Speech API");
        return;
      }
      var synth = window.speechSynthesis;

      if (!language) {
        language = qx.locale.Manager.getInstance().getLocale();
      }

      // speak
      var utterThis = new SpeechSynthesisUtterance(text);

      var selectedVoice, defaultVoice;
      var voices = synth.getVoices();
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
      this.debug("saying '"+text+"' in voice "+selectedVoice.name);
      synth.speak(utterThis);
    }
  }

});