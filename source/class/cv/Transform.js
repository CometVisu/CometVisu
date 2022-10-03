/* Transform.js
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
qx.Class.define("cv.Transform", {
  type: "static",

  /*
   ******************************************************
   STATICS
   ******************************************************
   */
  statics: {
    registry: {
      raw: {
        name: "Only the RAW value",
        encode(i) {
          return i;
        },
        decode(i) {
          return i;
        }
      },

      int: {
        name: "Cast to Int",
        encode(i) {
          return i.toString();
        },
        decode(i) {
          return parseInt(i);
        }
      },

      float: {
        name: "Cast to Float",
        encode(i) {
          return i.toString();
        },
        decode(i) {
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
    addTransform(prefix, transforms) {
      for (let [transName, transform] of Object.entries(transforms)) {
        if (transform.link) {
          this.registry[prefix + ":" + transName] = Object.assign(
            {},
            transforms[transform.link],
            transform
          );
        } else {
          this.registry[prefix + ":" + transName] = transform;
        }
      }
    },

    /**
     * Enforce that value stays within range
     * When value is not a valid number, the min value is returned
     * @param {number} min lower threshold
     * @param {any} value value to clip
     * @param {number} max upper threshold
     * @param [scaling] {Number} scale the clipping result by that amount
     * @return {number} the clipped value
     */
    clip(min, value, max, scaling = 1) {
      const _value = +value; // enforce number
      return (_value > min ? (_value > max ? max : _value) : min) * scaling;
    },

    /**
     * Enforce that value stays within range and is an integer
     * When value is not a valid number, the min value is returned
     * @param {number} min lower threshold
     * @param {any} value value to clip
     * @param {number} max upper threshold
     * @param [scaling] {Number} scale the clipping result by that amount
     * @return {number} the clipped value
     */
    clipInt(min, value, max, scaling = 1) {
      const _value = +value; // enforce number
      return Math.round(
        (_value > min ? (_value > max ? max : _value) : min) * scaling
      );
    },

    /**
     * transform JavaScript to bus value and raw value
     *
     * @param {{transform: string, selector: string?, ignoreError: string?, variantInfo: string?}} address - type of the transformation, as address object
     * @param {*} value - value to transform
     * @return {*} object with both encoded values
     */
    encodeBusAndRaw(address, value) {
      const { transform } = address;
      let { selector, variantInfo } = address;
      let basetrans = transform.split(".")[0];
      const encoding =
        transform in cv.Transform.registry
          ? cv.Transform.registry[transform].encode(value, variantInfo)
          : basetrans in cv.Transform.registry
          ? cv.Transform.registry[basetrans].encode(value, variantInfo)
          : value;

      if (typeof selector === "string") {
        let result = {};
        let lastPart = "start";
        let v = result; // use the fact that `v` is now a reference and not a copy
        while (selector !== "") {
          const { firstPart, remainingPart } = this.__getFirstElement(selector);
          if (isFinite(firstPart)) {
            v[lastPart] = [];
          } else {
            v[lastPart] = {};
          }
          v = v[lastPart];
          lastPart = firstPart;
          selector = remainingPart;
        }
        v[lastPart] = encoding;
        const retval = JSON.stringify(result.start);
        return { bus: retval, raw: retval };
      }
      return encoding.constructor === Object &&
        "bus" in encoding &&
        "raw" in encoding
        ? encoding
        : { bus: encoding, raw: encoding };
    },

    /**
     * transform JavaScript to bus value
     *
     * @param {{transform: string, selector: string?, ignoreError: string?}} address - type of the transformation, as address object
     * @param {*} value - value to transform
     * @return {*} the encoded value
     */
    encode(address, value) {
      return this.encodeBusAndRaw(address, value).bus;
    },

    /**
     * transform bus to JavaScript value
     * @param {{transform: string, selector: string?, ignoreError: string?, variantInfo: string?}} address - type of the transformation, as address object
     * @param {*} value - value to transform
     * @return {*} the decoded value
     */
    decode(address, value) {
      const { transform, ignoreError } = address;
      let { selector, variantInfo } = address;
      const basetrans = transform.split(".")[0];

      if (
        typeof value === "string" &&
        selector !== undefined &&
        selector !== null
      ) {
        // decode JSON
        const selectorOriginal = selector;

        try {
          let v = JSON.parse(value);
          while (selector !== "") {
            const { firstPart, remainingPart } =
              this.__getFirstElement(selector);
            if (typeof v === "object" && firstPart in v) {
              v = v[firstPart];
            } else {
              throw new Error(
                qx.locale.Manager.tr(
                  "Sub-selector \"%1\" does not fit to value %2",
                  selector,
                  JSON.stringify(v)
                )
              );
            }
            if (selector === remainingPart) {
              throw new Error(
                qx.locale.Manager.tr("Sub-selector error: \"%1\"", selector)
              );
            }
            selector = remainingPart;
          }
          value = v;
        } catch (e) {
          if (!ignoreError) {
            const message = {
              topic: "cv.transform.decode",
              title: qx.locale.Manager.tr("Transform decode error"),
              severity: "urgent",
              unique: false,
              deletable: true,
              message: qx.locale.Manager.tr(
                "decode: JSON.parse error: %1; selector: \"%2\"; value: %3",
                e,
                selectorOriginal,
                JSON.stringify(value)
              )
            };

            cv.core.notifications.Router.dispatchMessage(
              message.topic,
              message
            );
          }
          return "-";
        }
      }
      return transform in cv.Transform.registry
        ? cv.Transform.registry[transform].decode(value, variantInfo)
        : basetrans in cv.Transform.registry
        ? cv.Transform.registry[basetrans].decode(value, variantInfo)
        : value;
    },

    /**
     * Get the first element of the (JSON) selector
     * @param {string} selector - the JSON (sub-)selector
     * @returns {{firstPart: string, remainingPart: string}}
     */
    __getFirstElement(selector) {
      if (selector[0] === "[") {
        const [, firstPart, remainingPart] =
          selector.match(/^\[([^\]]*)]\.?(.*)/);
        if (
          (firstPart[0] === "\"" || firstPart[0] === "'") &&
          firstPart[0] === firstPart.substr(-1)
        ) {
          return {
            firstPart: firstPart.substr(1, firstPart.length - 2),
            remainingPart
          };
        } else if (isFinite(firstPart)) {
          return { firstPart, remainingPart };
        }
        throw qx.locale.Manager.tr(
          "Sub-selector \"%1\" has bad first part \"%2\"",
          selector,
          firstPart
        );
      } else {
        const [, firstPart, remainingPart] = selector.match(/^([^.[]*)\.?(.*)/);
        if (firstPart.length > 0) {
          return { firstPart, remainingPart };
        }
        throw qx.locale.Manager.tr("Sub-selector error: \"%1\"", selector);
      }
    }
  }
});
