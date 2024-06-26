/* IoBroker.js
 *
 * copyright (c) 2023-2024, Christian Mayer and the CometVisu contributers.
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
 * Transformations for the ioBroker backend
 *
 * @author Florian Schirmer
 * @since 2023
 */
qx.Class.define('cv.transforms.IoBroker', {
  /*
  ******************************************************
    STATICS
  ******************************************************
  */
  statics: {
    isUndefined(value) {
      return ['NaN', 'Uninitialized', 'NULL', 'UNDEF', undefined, null].indexOf(value) >= 0;
    }
  },

  /**
   * This class defines the default transforms: encode: transform JavaScript to
   * bus value decode: transform bus to JavaScript value
   */
  defer() {
    cv.Transform.addTransform('IOB', {
      number: {
        name: 'IOB_Number',
        lname: {
          de: 'Zahl',
          en: 'number'
        },
        example: '42',
        unit: '-',
        encode(value) {
          return parseFloat(value);
        },
        decode(value) {
          if (cv.transforms.IoBroker.isUndefined(value)) {
            return 0;
          }

          return parseFloat(value);
        }
      },
      string: {
        name: 'IOB_String',
        lname: {
          de: 'Zeichenkette',
          en: 'string'
        },
        example: '"abc"',
        unit: '-',
        encode(value) {
          return value.toString();
        },
        decode(value) {
          if (cv.transforms.IoBroker.isUndefined(value)) {
            return '';
          }

          return value.toString();
        }
      },
      switch: {
        name: 'IOB_Switch',
        lname: {
          de: 'Aus-An-Schalter',
          en: 'off on switch'
        },
        encode(value) {
          return ((value === 1) || (value === '1')) ? 'true' : 'false';
        },
        decode(value) {
          if (cv.transforms.IoBroker.isUndefined(value)) {
            return 0;
          }

          return (value === true) ? 1 : 0;
        }
      }
    });
  }
});
