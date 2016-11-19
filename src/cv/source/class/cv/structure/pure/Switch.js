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
qx.Class.define('cv.structure.pure.Switch', {
  extend: cv.structure.pure.AbstractWidget,
  include: [cv.role.Operate, cv.role.Update],

  /*
   ******************************************************
   PROPERTIES
   ******************************************************
   */
  properties: {
    onValue: {
      check: "String",
      init: "1"
    },
    offValue: {
      check: "String",
      init: "0"
    }
  },

  /*
   ******************************************************
   STATICS
   ******************************************************
   */
  statics: {
    getAttributeToPropertyMappings: function () {
      return {
        'on_value': {target: 'onValue', 'default': "1"},
        'off_value': {target: 'offValue', 'default': "0"}
      };
    }
  },

  /*
   ******************************************************
   MEMBERS
   ******************************************************
   */
  members: {

    /**
     * Called by parent class, which wraps this HTML-String in a widget-container
     * @returns {String} HTML string of this widget
     * @protected
     */
    _getInnerDomString: function () {
      return '<div class="actor switchUnpressed"><div class="value">-</div></div>';
    },

    /**
     * Handles the incoming data from the backend for this widget
     *
     * @method handleUpdate
     * @param value {any} incoming data (already transformed + mapped)
     */
    handleUpdate: function(value) {
      var actor = this.getActor();
      var off = this.applyMapping(this.getOffValue());
      qx.bom.element.Class.remove(actor, value == off ? 'switchPressed' : 'switchUnpressed');
      qx.bom.element.Class.add(actor, value == off ? 'switchUnpressed' : 'switchPressed');
    },

    /**
     * Get the value that should be send to backend after the action has been triggered
     *
     * @method getActionValue
     */
    getActionValue: function () {
      return (this.getBasicValue() == this.getOffValue() ? this.getOnValue() : this.getOffValue());
    }
  },

  defer: function() {
    // register the parser
    cv.xml.Parser.addHandler("switch", cv.structure.pure.Switch);
  }
}); // end define