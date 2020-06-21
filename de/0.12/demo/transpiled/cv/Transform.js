function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "cv.Config": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);

  /* Transform.js 
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
   * This class defines some default transformations like <code>raw</code>, <code>int</code> and <code>float</code>.
   * New transformation can be added and used. For example an openHAB transformation for a switch item is added by
   * {@link cv.transforms.OpenHab} like this:
   *
   * <pre class="javascript">
   *   cv.Transform.addTransform('OH', {
   *    'switch': {
   *      name: 'OH_Switch',
   *       encode: function (phy) {
   *         return phy == 1 ? 'ON' : 'OFF';
   *      },
   *
   *       decode: function (string) {
   *         if (cv.transforms.OpenHab.isUndefined(string)) return 0;
   *         return (string == "ON" || parseInt(string) > 0) ? 1 : 0;
   *       }
   *     }
   *   });
   * </pre>
   *
   * @author Christian Mayer
   * @since 2010
   */
  qx.Class.define('cv.Transform', {
    type: "static",

    /*
     ******************************************************
     STATICS
     ******************************************************
     */
    statics: {
      registry: {
        'raw': {
          name: 'Only the RAW value',
          encode: function encode(i) {
            return i;
          },
          decode: function decode(i) {
            return i;
          }
        },
        'int': {
          name: 'Cast to Int',
          encode: function encode(i) {
            return i.toString();
          },
          decode: function decode(i) {
            return parseInt(i);
          }
        },
        'float': {
          name: 'Cast to Float',
          encode: function encode(i) {
            return i.toString();
          },
          decode: function decode(i) {
            return parseFloat(i);
          }
        }
      },

      /* ***************************************************************************
       * All functions below are only in this, i.e. the default, file.
       * All further transforms will only have the above data structure.
       ************************************************************************** */

      /**
       * Add transformation rules to the registry
       * @param prefix {String} Transformation prefix (e.g. DPT for KNX transformations or OH for openHAB transformations)
       * @param transforms {Object} map of transformations
       */
      addTransform: function addTransform(prefix, transforms) {
        for (var _i = 0, _Object$entries = Object.entries(transforms); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
              transName = _Object$entries$_i[0],
              transform = _Object$entries$_i[1];

          if (transform.link) {
            this.registry[prefix + ':' + transName] = Object.assign({}, transforms[transform.link], transform);
          } else {
            this.registry[prefix + ':' + transName] = transform;
          }
        }
      },

      /**
       * Enforce that value stays within range
       * When value is not a valid number, the min value is returned
       * @param min {Number} lower threshold
       * @param value {var} value to clip
       * @param max {Number} upper threshold
       * @return {Number} the clipped value
       */
      clip: function clip(min, value, max) {
        value = +value; // enforce number

        return value > min ? value > max ? max : value : min;
      },

      /**
       * transform JavaScript to bus value and raw value
       *
       * @param transformation {String} type of the transformation
       * @param value {var} value to transform
       * @return {Object} object with both encoded values
       */
      encodeBusAndRaw: function encodeBusAndRaw(transformation, value) {
        if (cv.Config.testMode === true) {
          return {
            bus: value,
            raw: value
          };
        }

        var basetrans = transformation.split('.')[0];
        var encoding = transformation in cv.Transform.registry ? cv.Transform.registry[transformation].encode(value) : basetrans in cv.Transform.registry ? cv.Transform.registry[basetrans].encode(value) : value;
        return encoding.constructor === Object ? encoding : {
          bus: encoding,
          raw: encoding
        };
      },

      /**
       * transform JavaScript to bus value
       *
       * @param transformation {String} type of the transformation
       * @param value {var} value to transform
       * @return {var} the encoded value
       */
      encode: function encode(transformation, value) {
        return this.encodeBusAndRaw(transformation, value).bus;
      },

      /**
       * transform bus to JavaScript value
       * @param transformation {String} type of the transformation
       * @param value {var} value to transform
       * @return {var} the decoded value
       */
      decode: function decode(transformation, value) {
        if (cv.Config.testMode === true) {
          return value;
        }

        var basetrans = transformation.split('.')[0];
        return transformation in cv.Transform.registry ? cv.Transform.registry[transformation].decode(value) : basetrans in cv.Transform.registry ? cv.Transform.registry[basetrans].decode(value) : value;
      }
    }
  });
  cv.Transform.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Transform.js.map?dt=1592778965713