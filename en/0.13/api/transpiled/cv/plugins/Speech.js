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
      "cv.ui.common.Update": {
        "require": true
      },
      "qx.log.Logger": {},
      "cv.parser.pure.WidgetParser": {
        "defer": "runtime"
      },
      "cv.data.Model": {},
      "cv.io.BackendConnections": {},
      "cv.core.notifications.SpeechHandler": {},
      "cv.ui.structure.WidgetFactory": {
        "defer": "runtime"
      }
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Speech.js 
   * 
   * copyright (c) 2010-2022, Christian Mayer and the CometVisu contributers.
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
    construct: function construct(props) {
      this._initOnCreate = true;
      qx.core.Object.constructor.call(this);
      this.set(props);
      this.__P_14_0 = {};
    },

    /*
     ******************************************************
     STATICS
     ******************************************************
     */
    statics: {
      parse: function parse(element, path) {
        if (!window.speechSynthesis) {
          qx.log.Logger.warn(this, 'this browser does not support the Web Speech API');
          return null;
        }

        var address = cv.parser.pure.WidgetParser.makeAddressList(element, path);
        return cv.data.Model.getInstance().setWidgetData(path, {
          'path': path,
          'language': element.getAttribute('lang') ? element.getAttribute('lang').toLowerCase() : null,
          'address': address,
          'mapping': element.getAttribute('mapping'),
          'repeatTimeout': element.getAttribute('repeat-timeout') ? parseInt(element.getAttribute('repeat-timeout')) : -1,
          '$$type': 'speech',
          // this widget needs to be initialized when the cache is used, otherwise it wont be available
          '$$initOnCacheLoad': true
        });
      }
    },

    /*
     ******************************************************
     PROPERTIES
     ******************************************************
     */
    properties: {
      path: {
        check: 'String'
      },
      $$type: {
        check: 'String'
      },
      $$initOnCacheLoad: {
        check: 'Boolean'
      },
      language: {
        check: 'String'
      },
      mapping: {
        check: 'String',
        init: ''
      },
      repeatTimeout: {
        check: 'Number',
        init: -1
      },
      parentWidget: {
        check: 'cv.ui.structure.pure.AbstractBasicWidget',
        init: null
      }
    },

    /*
     ******************************************************
     MEMBERS
     ******************************************************
     */
    members: {
      __P_14_0: null,
      getDomString: function getDomString() {
        return undefined;
      },
      _processIncomingValue: function _processIncomingValue(address, data) {
        // #1: transform the raw value to a JavaScript type
        var value = this.applyTransform(address, data); // #2: map it to a value the user wants to see

        return this.applyMapping(value);
      },
      handleUpdate: function handleUpdate(text, address) {
        if (!cv.io.BackendConnections.getClient().getDataReceived()) {
          // first call -> skipping
          this.__P_14_0[address] = {
            text: text,
            time: Date.now()
          };
          this.debug('skipping initial TTS for ' + text);
          return;
        }

        if (!text || text.length === 0) {
          // nothing to say
          this.debug('no text to speech given');
          return;
        }

        if (typeof text === 'string' && text.substring(0, 1) === '!') {
          // override repeatTimeout, force saying this
          text = text.substring(1);
        } else if (this.getRepeatTimeout() >= 0) {
          // do not repeat (within timeout when this.repeatTimeout > 0)
          if (this.__P_14_0[address] && this.__P_14_0[address].text === text && (this.getRepeatTimeout() === 0 || this.getRepeatTimeout() >= Math.round((Date.now() - this.__P_14_0[address].time) / 1000))) {
            // update time
            this.__P_14_0[address].time = Date.now(); // do not repeat

            this.debug('skipping TTS because of repetition ' + text);
            return;
          }
        }

        this.debug('changing lastSpeech from \'%s\' to \'%s\'', this.__P_14_0[address] ? this.__P_14_0[address].text : '', text);
        this.__P_14_0[address] = {
          text: text,
          time: Date.now()
        };
        cv.core.notifications.SpeechHandler.getInstance().say(text, this.getLanguage());
      }
    },
    defer: function defer(statics) {
      // register the parser
      cv.parser.pure.WidgetParser.addHandler('speech', cv.plugins.Speech);
      cv.ui.structure.WidgetFactory.registerClass('speech', statics);
    }
  });
  cv.plugins.Speech.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Speech.js.map?dt=1664548959908