/* Switch.js 
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
 * The switch widget shows two states (e.g. ON and OFF) and can toggle between them.
 *
 * @widget_example <settings>
 *   <caption>Configuration example of a switch widget using mapping and styling</caption>
 *   <screenshot name="switch_example_on">
 *    <caption>Switch turned on</caption>
 *    <data address="0/0/0">1</data>
 *   </screenshot>
 *   <screenshot name="switch_example_off">
 *    <caption>Switch turned off</caption>
 *    <data address="0/0/0">0</data>
 *   </screenshot>
 * </settings>
 * <meta>
 *  <mappings>
 *    <mapping name="OnOff">
 *      <entry value="0">O</entry>
 *      <entry value="1">I</entry>
 *    </mapping>
 *  </mappings>
 *  <stylings>
 *    <styling name="GreyGreen">
 *      <entry value="0">grey</entry>
 *      <entry value="1">green</entry>
 *    </styling>
 *  </stylings>
 * </meta>
 * <switch mapping="OnOff" styling="GreyGreen">
 *   <layout colspan="3" />
 *   <label>Switch</label>
 *   <address transform="DPT:1.001" mode="readwrite">0/0/0</address>
 * </switch>
 * @module structure/pure/Switch
 * @requires structure/pure
 * @author Christian Mayer
 * @since 0.8.0 (2012)
 */
define( ['_common'], function() {
  "use strict";

  Class('cv.structure.pure.Switch', {
    isa: cv.structure.pure.AbstractWidget,

    has: {
      onValue: { is: 'r' },
      offValue: { is: 'r' }
    },

    my : {
      methods: {
        getAttributeToPropertyMappings: function () {
          return {
            'on_value':   { target: 'onValue',  default: 1 },
            'off_value':  { target: 'offValue', default: 0 }
          };
        }
      }
    },

    augment: {
      getDomString: function () {
        return '<div class="actor switchUnpressed"><div class="value">-</div></div>';
      }
    },

    methods: {
      /**
       * Handles the incoming data from the backend for this widget
       *
       * @method handleUpdate
       * @param value {any} incoming data (already transformed + mapped)
       */
      handleUpdate: function(value) {
        var actor = this.getActor();
        var off = templateEngine.map(this.getOffValue(), this.getMapping());
        actor.removeClass(value == off ? 'switchPressed' : 'switchUnpressed');
        actor.addClass(value == off ? 'switchUnpressed' : 'switchPressed');
      },

      /**
       * Action performed when the switch got clicked, sends data to the backend
       *
       * @method action
       * @param {String} path - Internal path of the widget
       * @param {Element} actor - DOMElement
       * @param {Boolean} isCanceled - If true the action does nothing
       */
      action: function (path, actor, isCanceled) {
        if (isCanceled) return;
        this.sendToBackend(this.getBasicValue() == this.getOffValue() ? this.getOnValue() : this.getOffValue());
      }
    }
  });
  // register the parser
  cv.xml.Parser.addHandler("switch", cv.structure.pure.Switch);
}); // end define