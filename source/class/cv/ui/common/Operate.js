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
    action(event) {
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
    downaction(event) {
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
    sendToBackend(value, filter, currentBusValues) {
      const encodedValues = {};
      for (const [id, address] of Object.entries(this.getAddress?.() ?? {})) {
        if (cv.data.Model.isWriteAddress(address) && (!filter || filter(address))) {
          try {
            const encoding = address.transform;
            const encodedValue = cv.Transform.encodeBusAndRaw(address, value);

            if (!currentBusValues || encodedValue.raw !== currentBusValues[encoding]) {
              const client = cv.io.BackendConnections.getClient(address.backendType);
              if (client) {
                client.write(id, encodedValue.bus, address);
              }
            }
            encodedValues[encoding] = encodedValue.raw;
          } catch (e) {
            if (!address.ignoreError) {
              const message = {
                topic: 'cv.transform.encode',
                title: qx.locale.Manager.tr('Transform encode error'),
                severity: 'urgent',
                unique: false,
                deletable: true,
                message: qx.locale.Manager.tr(
                  'Encode error: %1; selector: "%2"; value: %3',
                  e,
                  address.selector,
                  JSON.stringify(value)
                )
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
