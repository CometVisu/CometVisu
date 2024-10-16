function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Class": {
        "usage": "dynamic",
        "require": true
      },
      "qx.locale.Manager": {},
      "cv.core.notifications.Router": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
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
  qx.Class.define('cv.Transform', {
    type: 'static',
    /*
     ******************************************************
     STATICS
     ******************************************************
     */
    statics: {
      registry: {
        raw: {
          name: 'Only the RAW value',
          encode: function encode(i) {
            return i;
          },
          decode: function decode(i) {
            return i;
          }
        },
        "int": {
          name: 'Cast to Int',
          encode: function encode(i) {
            return i.toString();
          },
          decode: function decode(i) {
            return parseInt(i);
          }
        },
        "float": {
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
       * @param {number} min lower threshold
       * @param {any} value value to clip
       * @param {number} max upper threshold
       * @param [scaling] {Number} scale the clipping result by that amount
       * @return {number} the clipped value
       */
      clip: function clip(min, value, max) {
        var scaling = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
        var _value = +value; // enforce number
        return (_value > min ? _value > max ? max : _value : min) * scaling;
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
      clipInt: function clipInt(min, value, max) {
        var scaling = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;
        var _value = +value; // enforce number
        return Math.round((_value > min ? _value > max ? max : _value : min) * scaling);
      },
      /**
       * transform JavaScript to bus value and raw value
       *
       * @param {{transform: string, selector?: string, ignoreError?: string, variantInfo?: string}} address - type of the transformation, as address object
       * @param {*} value - value to transform
       * @return {*} object with both encoded values
       */
      encodeBusAndRaw: function encodeBusAndRaw(address, value) {
        var transform = address.transform;
        var selector = address.selector,
          variantInfo = address.variantInfo;
        var basetrans = transform.split('.')[0];
        var encoding = transform in cv.Transform.registry ? cv.Transform.registry[transform].encode(value, variantInfo) : basetrans in cv.Transform.registry ? cv.Transform.registry[basetrans].encode(value, variantInfo) : value;
        if (typeof selector === 'string') {
          var result = {};
          var lastPart = 'start';
          var v = result; // use the fact that `v` is now a reference and not a copy
          while (selector !== '') {
            var _this$__P_763_ = this.__P_763_0(selector),
              firstPart = _this$__P_763_.firstPart,
              remainingPart = _this$__P_763_.remainingPart;
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
          var retval = JSON.stringify(result.start);
          return {
            bus: retval,
            raw: retval
          };
        }
        return encoding.constructor === Object && 'bus' in encoding && 'raw' in encoding ? encoding : {
          bus: encoding,
          raw: encoding
        };
      },
      /**
       * transform JavaScript to bus value
       *
       * @param {{transform: string, selector?: string, ignoreError?: string}} address - type of the transformation, as address object
       * @param {*} value - value to transform
       * @return {*} the encoded value
       */
      encode: function encode(address, value) {
        return this.encodeBusAndRaw(address, value).bus;
      },
      /**
       * transform bus to JavaScript value
       * @param {{transform: string, selector?: string, ignoreError?: string, variantInfo?: string}} address - type of the transformation, as address object
       * @param {*} value - value to transform
       * @return {*} the decoded value
       */
      decode: function decode(address, value) {
        var transform = address.transform,
          ignoreError = address.ignoreError;
        var selector = address.selector,
          variantInfo = address.variantInfo;
        var basetrans = transform.split('.')[0];
        if (typeof value === 'string' && selector !== undefined && selector !== null) {
          // decode JSON
          var selectorOriginal = selector;
          try {
            var v = JSON.parse(value);
            while (selector !== '') {
              var _this$__P_763_2 = this.__P_763_0(selector),
                firstPart = _this$__P_763_2.firstPart,
                remainingPart = _this$__P_763_2.remainingPart;
              if (_typeof(v) === 'object' && firstPart in v) {
                v = v[firstPart];
              } else {
                throw new Error(qx.locale.Manager.tr('Sub-selector "%1" does not fit to value %2', selector, JSON.stringify(v)));
              }
              if (selector === remainingPart) {
                throw new Error(qx.locale.Manager.tr('Sub-selector error: "%1"', selector));
              }
              selector = remainingPart;
            }
            value = v;
          } catch (e) {
            if (!ignoreError) {
              var message = {
                topic: 'cv.transform.decode',
                title: qx.locale.Manager.tr('Transform decode error'),
                severity: 'urgent',
                unique: false,
                deletable: true,
                message: qx.locale.Manager.tr('decode: JSON.parse error: %1; selector: "%2"; value: %3', e, selectorOriginal, JSON.stringify(value))
              };
              cv.core.notifications.Router.dispatchMessage(message.topic, message);
            }
            return '-';
          }
        }
        return transform in cv.Transform.registry ? cv.Transform.registry[transform].decode(value, variantInfo) : basetrans in cv.Transform.registry ? cv.Transform.registry[basetrans].decode(value, variantInfo) : value;
      },
      /**
       * Get the first element of the (JSON) selector
       * @param {string} selector - the JSON (sub-)selector
       * @returns {{firstPart: string, remainingPart: string}}
       */
      __P_763_0: function __P_763_0(selector) {
        if (selector[0] === '[') {
          var _selector$match = selector.match(/^\[([^\]]*)]\.?(.*)/),
            _selector$match2 = _slicedToArray(_selector$match, 3),
            firstPart = _selector$match2[1],
            remainingPart = _selector$match2[2];
          if ((firstPart[0] === '"' || firstPart[0] === '\'') && firstPart[0] === firstPart.substr(-1)) {
            return {
              firstPart: firstPart.substr(1, firstPart.length - 2),
              remainingPart: remainingPart
            };
          } else if (isFinite(firstPart)) {
            return {
              firstPart: firstPart,
              remainingPart: remainingPart
            };
          }
          throw qx.locale.Manager.tr('Sub-selector "%1" has bad first part "%2"', selector, firstPart);
        } else {
          var _selector$match3 = selector.match(/^([^.[]*)\.?(.*)/),
            _selector$match4 = _slicedToArray(_selector$match3, 3),
            _firstPart = _selector$match4[1],
            _remainingPart = _selector$match4[2];
          if (_firstPart.length > 0) {
            return {
              firstPart: _firstPart,
              remainingPart: _remainingPart
            };
          }
          throw qx.locale.Manager.tr('Sub-selector error: "%1"', selector);
        }
      }
    }
  });
  cv.Transform.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Transform.js.map?dt=1729101273540