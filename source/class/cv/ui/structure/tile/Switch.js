/* Switch.js 
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
 * The switch widget shows two states (e.g. ON and OFF) and can toggle between them.
 *
 * @widgetexample <settings>
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
 *
 *
 * @author Tobias Bräutigam
 * @since 2021
 */
qx.Class.define('cv.ui.structure.tile.Switch', {
  extend: cv.ui.structure.tile.AbstractTileWidget,
  include: [cv.ui.common.Operate, cv.ui.common.Update],

  /*
   ******************************************************
   PROPERTIES
   ******************************************************
   */
  properties: {
    onValue: {
      check: 'String',
      init: '1'
    },
    offValue: {
      check: 'String',
      init: '0'
    }
  },

  /*
   ******************************************************
   MEMBERS
   ******************************************************
   */
  members: {
    __actorElement: null,
    __valueElement: null,

    // overridden
    _getInnerDom: function () {
      const element = this._domElement = document.createElement('div');
      element.classList.add('tile');

      // control row
      const middleRow = document.createElement('div');
      middleRow.classList.add('row', 'middle', 'colspan-3');
      const actorElement = this.__actorElement = document.createElement('button');
      actorElement.classList.add('round-button', 'unpressed');
      const valueElement = this.__valueElement = document.createElement('span');
      valueElement.classList.add('value');
      valueElement.textContent = 'I';
      actorElement.appendChild(valueElement);
      middleRow.appendChild(actorElement);

      // bottom row
      const bottomRow = document.createElement('div');
      bottomRow.classList.add('row', 'last', 'colspan-3');
      const label = document.createElement('label');
      label.classList.add('primary');
      label.textContent = this.getLabel();
      bottomRow.appendChild(label);

      element.appendChild(middleRow);
      element.appendChild(bottomRow);
      return element;
    },

    getActor() {
      return this.__actorElement;
    },

    getValueElement() {
      return this.__valueElement;
    },

    /**
     * Handles the incoming data from the backend for this widget
     *
     * @param value {any} incoming data (already transformed + mapped)
     */
    handleUpdate: function(value) {
      const actor = this.__actorElement;
      // compare against the unmapped value
      value = this.getBasicValue();
      const off = this.getOffValue();
      // using == comparisons to make sure that e.g. 1 equals "1"
      // noinspection EqualityComparisonWithCoercionJS
      actor.classList.remove(value == off ? 'pressed' : 'unpressed');
      // noinspection EqualityComparisonWithCoercionJS
      actor.classList.add(value == off ? 'unpressed' : 'pressed');
    },

    /**
     * Get the value that should be send to backend after the action has been triggered
     * @return {var}
     */
    getActionValue: function () {
      // using == comparisons to make sure that e.g. 1 equals "1"
      // noinspection EqualityComparisonWithCoercionJS
      return (this.getBasicValue() == this.getOffValue() ? this.getOnValue() : this.getOffValue());
    }
  },

  destruct: function () {
    this.__actorElement = null;
    this.__valueElement = null;
  }
});
