/* Speech.js 
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
 * Use the Web Speech API (https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
 * to make text-to-speech service available. This plugin listens to a address and forwards the
 * incoming data to the browser TTS engine (if the browser supports it)
 *
 * <h4>Simple example</h4>
 * <pre class="sunlight-highlight-xml">
 * &lt;speech lang=&quot;en&quot;&gt;
 *  &lt;address transform=&quot;OH:string&quot; mode=&quot;read&quot;&gt;Speak&lt;/address&gt;
 * &lt;/speech&gt;
 * </pre>
 *
 * <h4>Example preventing repetition within a timeout and use mapping</h4>
 * <pre class="sunlight-highlight-xml">
 * ...
 * &lt;meta&gt;
 *  &lt;plugins&gt;
 *    &lt;plugin name=&quot;speech&quot; /&gt;
 *  &lt;/plugins&gt;
 *  &lt;mappings&gt;
 *    &lt;mapping name=&quot;speak&quot;&gt;
 *      &lt;entry value=&quot;0&quot;&gt;Hello, welcome home&lt;/entry&gt;
 *      &lt;entry value=&quot;1&quot;&gt;Please close all windows&lt;/entry&gt;
 *      &lt;entry value=&quot;2&quot;&gt;Please close all doors&lt;/entry&gt;
 *    &lt;/mapping&gt;
 *  &lt;/mappings&gt;
 * &lt;/meta&gt;
 * ...
 * &lt;speech lang=&quot;en&quot; repeat-timout=&quot;300&quot; mapping=&quot;speak&quot;&gt;
 *  &lt;address transform=&quot;DPT:5.010&quot; mode=&quot;read&quot;&gt;Speak&lt;/address&gt;
 * &lt;/speech&gt;
 * </pre>
 *
 * @author Tobias Bräutigam
 * @since 0.10.0
 *
 */
qx.Class.define('cv.plugins.Speech', {
  extend: qx.core.Object,
  include: cv.ui.common.Update,

  /*
   ******************************************************
   CONSTRUCTOR
   ******************************************************
   */
  construct: function(props) {
    this._initOnCreate = true;
    this.base(arguments);
    this.set(props);
    this.__lastSpeech = {};
  },


  /*
   ******************************************************
   STATICS
   ******************************************************
   */
  statics: {
    parse: function (element, path) {
      if (!window.speechSynthesis) {
        qx.log.Logger.warn(this, "this browser does not support the Web Speech API");
        return;
      }

      var address = cv.parser.WidgetParser.makeAddressList(element, path);

      return cv.data.Model.getInstance().setWidgetData( path, {
        'path'    : path,
        'language': qx.bom.element.Attribute.get(element, 'lang') ? qx.bom.element.Attribute.get(element, 'lang') .toLowerCase() : null,
        'address' : address,
        'mapping' : qx.bom.element.Attribute.get(element, 'mapping'),
        'repeatTimeout': qx.bom.element.Attribute.get(element, 'repeat-timeout') ? parseInt(qx.bom.element.Attribute.get(element, 'repeat-timeout')) : -1,
        '$$type'  : 'speech'
      });
    }
  },

  /*
   ******************************************************
   PROPERTIES
   ******************************************************
   */
  properties: {
    path              : { check: "String" },
    $$type            : { check: "String" },
    language          : { check: "String" },
    mapping           : { check: "String", init: "" },
    repeatTimeout     : { check: "Number", init: -1 },
    parentWidget: {
      check: "cv.ui.structure.AbstractBasicWidget",
      init: null
    }
  },

  /*
   ******************************************************
   MEMBERS
   ******************************************************
   */
  members: {
    __lastSpeech : null,

    getDomString: function() {
      return undefined;
    },

    _processIncomingValue: function(address, data) {
      // #1: transform the raw value to a JavaScript type
      var value = this.applyTransform(address, data);

      // #2: map it to a value the user wants to see
      return this.applyMapping(value);
    },

    handleUpdate: function(text, address) {

      if (!cv.TemplateEngine.getInstance().visu.getDataReceived()) {
        // first call -> skipping
        this.__lastSpeech[address] = {
          text: text,
          time: Date.now()
        };
        this.debug("skipping initial TTS for "+text);
        return;
      }

      if (!text || text.length === 0) {
        // nothing to say
        this.debug("no text to speech given");
        return;
      }

      if (typeof text === "string" && text.substring(0,1) === "!") {
        // override repeatTimeout, force saying this
        text = text.substring(1);
      }
      else if (this.getRepeatTimeout() >= 0) {
        // do not repeat (within timeout when this.repeatTimeout > 0)
        if (this.__lastSpeech[address] && this.__lastSpeech[address].text === text && (this.getRepeatTimeout() === 0 ||
          this.getRepeatTimeout() >= Math.round((Date.now()-this.__lastSpeech[address].time)/1000))) {
          // update time
          this.__lastSpeech[address].time = Date.now();
          // do not repeat
          this.debug("skipping TTS because of repetition " + text);
          return;
        }
      }
      this.debug("changing lastSpeech from '%s' to '%s'", this.__lastSpeech[address] ? this.__lastSpeech[address].text : "", text);
      this.__lastSpeech[address] = {
        text: text,
        time: Date.now()
      };

      cv.core.notifications.SpeechHandler.getInstance().say(text, this.getLanguage());
    }
  },

  defer: function(statics) {
    // register the parser
    cv.parser.WidgetParser.addHandler("speech", cv.plugins.Speech);
    cv.ui.structure.WidgetFactory.registerClass("speech", statics);
  }
});
