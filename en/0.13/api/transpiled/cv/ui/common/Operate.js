function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
(function () {
  var $$dbClassInfo = {
    "dependsOn": {
      "qx.Mixin": {
        "usage": "dynamic",
        "require": true
      },
      "cv.data.Model": {},
      "cv.Transform": {},
      "cv.io.BackendConnections": {},
      "qx.locale.Manager": {},
      "cv.core.notifications.Router": {}
    }
  };
  qx.Bootstrap.executePendingDefers($$dbClassInfo);
  /* Operate.js
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
   * Provides methods for widgets that can be controlled by the user.
   * Usually this operation includes sending values to the backend.
   */
  qx.Mixin.define('cv.ui.common.Operate', {
    /*
    ******************************************************
      MEMBERS
    ******************************************************
    */
    members: {
      /**
       * Action performed when the widget got clicked, sends data to the backend
       *
       * @param event {Event} tap event
       */
      action: function action(event) {
        if (event && this._skipNextEvent === event.getType()) {
          this._skipNextEvent = null;
          return;
        }
        if (this._action) {
          this._action(event);
        } else if (this.getActionValue) {
          this.sendToBackend(this.getActionValue(event));
        }
        if (event && event.getBubbles()) {
          event.stopPropagation();
        }
      },
      /**
       * Handles pointerdown events
       * @param event {Event} pointerdown event
       */
      downaction: function downaction(event) {
        if (this._downaction) {
          this._downaction(event);
        }
        if (event.getBubbles()) {
          event.stopPropagation();
        }
      },
      /**
       * Send the given value to all writeable addresses known to this widget
       *
       * @param value {any} value to send
       * @param filter {Function} optional filter function for addresses
       * @param currentBusValues {Object} optional: the (assumed) last encoded values
       *          that were sent on the bus. When the encoding of the new value
       *          to send is equal to the currentBusValues a transmission will
       *          be suppressed. The object is a hash with the encoding as a key
       *          for the encoded value
       * @return {Object} the object/hash of encoded values that were sent last time
       */
      sendToBackend: function sendToBackend(value, filter, currentBusValues) {
        var encodedValues = {};
        for (var _i = 0, _Object$entries = Object.entries((_this$getAddress = (_this$getAddress2 = this.getAddress) === null || _this$getAddress2 === void 0 ? void 0 : _this$getAddress2.call(this)) !== null && _this$getAddress !== void 0 ? _this$getAddress : {}); _i < _Object$entries.length; _i++) {
          var _this$getAddress, _this$getAddress2;
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            id = _Object$entries$_i[0],
            address = _Object$entries$_i[1];
          if (cv.data.Model.isWriteAddress(address) && (!filter || filter(address))) {
            try {
              var encoding = address.transform;
              var encodedValue = cv.Transform.encodeBusAndRaw(address, value);
              if (!currentBusValues || encodedValue.raw !== currentBusValues[encoding]) {
                var client = cv.io.BackendConnections.getClient(address.backendType);
                if (client) {
                  client.write(id, encodedValue.bus, address);
                }
              }
              encodedValues[encoding] = encodedValue.raw;
            } catch (e) {
              if (!address.ignoreError) {
                var message = {
                  topic: 'cv.transform.encode',
                  title: qx.locale.Manager.tr('Transform encode error'),
                  severity: 'urgent',
                  unique: false,
                  deletable: true,
                  message: qx.locale.Manager.tr('Encode error: %1; selector: "%2"; value: %3', e, address.selector, JSON.stringify(value))
                };
                cv.core.notifications.Router.dispatchMessage(message.topic, message);
              }
            }
          }
        }
        return encodedValues;
      }
    }
  });
  cv.ui.common.Operate.$$dbClassInfo = $$dbClassInfo;
})();

//# sourceMappingURL=Operate.js.map?dt=1735222453363