/* _common.js
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

define(['joose', 'lib/cv/role/HasAddress'], function() {

  /**
   * @class cv.role.UpdateDOM
   */
  Role("cv.role.UpdateDOM", {

    methods: {

      /**
       * Method to handle all special cases for the value. The might come from
       * the mapping where it can be quite complex as it can contain icons.
       * value: the value that will be inserted
       * modifyFn: callback function that modifies the DOM
       * @method value2DOM
       * @param {} value
       * @param {} modifyFn
       */
      value2DOM: function( value, modifyFn ) {
        if (('string' === typeof value) || ('number' === typeof value))
          modifyFn(value);
        else if ('function' === typeof value)
          // thisValue(valueElement);
          console.error('typeof value === function - special case not handled anymore!');
        else if (!Array.isArray(value)) {
          var element = value.cloneNode();
          if (value.getContext) {
            fillRecoloredIcon(element);
          }
          modifyFn(element);
        } else {
          for (var i = 0; i < value.length; i++) {
            var thisValue = value[i];
            if (!thisValue) continue;

            if (('string' === typeof thisValue) || ('number' === typeof thisValue))
              modifyFn(thisValue);
            else if ('function' === typeof thisValue)
              // thisValue(valueElement);
              console.error('typeof value === function - special case not handled anymore!');
            else {
              var element = thisValue.cloneNode();
              if (thisValue.getContext) {
                fillRecoloredIcon(element);
              }
              modifyFn(element);
            }
          }
        }
      },

      /**
       *
       * @method updateDOM
       * @param value {any} value to write to the DOMElement
       */
      updateDOM: function( value ) {
        var valueElement = this.getValueElement();
        valueElement.empty();
        if (undefined !== value) {
          this.value2DOM(value, function (e) {
            valueElement.append(e)
          });
        }
        else {
          valueElement.append('-');
        }
      }
    }
  });
});