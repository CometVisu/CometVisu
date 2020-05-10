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
       * @param prefix {String} Tranformation prefix (e.g. DPT for KNX tranformations or OH for openHAB transformations)
       * @param transforms {Map} map of transformations
       */
      addTransform: function addTransform(prefix, transforms) {
        for (var trans in transforms) {
          if (transforms[trans].link) {
            this.registry[prefix + ':' + trans] = Object.assign({}, transforms[transforms[trans].link], transforms[trans]);
          } else {
            this.registry[prefix + ':' + trans] = transforms[trans];
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
       * transform JavaScript to bus value
       *
       * @param transformation {String} type of the transformation
       * @param value {var} value to transform
       * @return {var} the encoded value
       */
      encode: function encode(transformation, value) {
        if (cv.Config.testMode === true) {
          return value;
        }

        var basetrans = transformation.split('.')[0];
        return transformation in cv.Transform.registry ? cv.Transform.registry[transformation].encode(value) : basetrans in cv.Transform.registry ? cv.Transform.registry[basetrans].encode(value) : value;
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

//# sourceMappingURL=Transform.js.map?dt=1589123585634