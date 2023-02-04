/* StateNotification.js
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
 * Parse notification settings and load them into the cv.core.notifications.Router
 * @author Tobias Bräutigam
 * @since 2022
 */
qx.Class.define('cv.ui.structure.tile.elements.StateNotification', {
  extend: cv.ui.structure.tile.elements.AbstractCustomElement,

  /*
  ***********************************************
    MEMBERS
  ***********************************************
  */
  members: {
    _init() {
    const stateConfig = {};
    const elem = this._element;
    const target =
      cv.core.notifications.Router.getTarget(elem.getAttribute('target')) || cv.ui.NotificationCenter.getInstance();

    const addressContainer = elem.querySelector('cv-addresses');

    const config = {
      target: target,
      severity: elem.getAttribute('severity'),
      skipInitial: elem.getAttribute('skip-initial') !== 'false',
      deletable: elem.getAttribute('deletable') !== 'false',
      unique: elem.getAttribute('unique') === 'true',
      valueMapping: addressContainer.getAttribute('value-mapping'),
      addressMapping: addressContainer.getAttribute('address-mapping'),
      enabled: !elem.hasAttribute('enabled') || elem.getAttribute('enabled') === 'true'
    };
    if (elem.hasAttribute('id')) {
      config.id = elem.getAttribute('id');
      // notifications with id can be changed by the system backend, so we need to listen to some addresses
      const model = cv.data.Model.getInstance();
      model.addUpdateListener(`notification:${config.id}:enabled`, this._onStateUpdate, this, 'system');
      model.addUpdateListener(`notification:${config.id}:severity`, this._onStateUpdate, this, 'system');

      model.onUpdate(`notification:${config.id}:enabled`, config.enabled, 'system');
      model.onUpdate(`notification:${config.id}:severity`, config.severity, 'system');
    }

    const name = elem.getAttribute('name');
    if (name) {
      config.topic = 'cv.state.' + name;
    }
    const icon = elem.getAttribute('icon');
    if (icon) {
      config.icon = icon;
      const iconClasses = elem.getAttribute('icon-classes');
      if (iconClasses) {
        config.iconClasses = iconClasses;
      }
    }

    // templates
    const titleElem = elem.querySelector('cv-title-template');
    if (titleElem) {
      config.titleTemplate = titleElem.innerHTML;
    }
    const messageElem = elem.querySelector('cv-message-template');
    if (messageElem) {
      config.messageTemplate = messageElem.innerHTML;
    }

    // condition
    const conditionElem = elem.querySelector('cv-condition');
    let condition = conditionElem.textContent;
    if (condition === 'true') {
      condition = true;
    } else if (condition === 'false') {
      condition = false;
    }
    config.condition = condition;

    let address;
    for (const addressElement of addressContainer.querySelectorAll(':scope > cv-address')) {
      address = addressElement.textContent.trim();
      if (!Object.prototype.hasOwnProperty.call(stateConfig, address)) {
        stateConfig[address] = [];
      }
      const addressConfig = Object.assign({}, config);
      let mode = 1 | 2; // Bit 0 = read, Bit 1 = write  => 1|2 = 3 = readwrite
      switch (addressElement.getAttribute('mode')) {
        case 'disable':
          mode = 0;
          break;
        case 'read':
          mode = 1;
          break;
        case 'write':
          mode = 2;
          break;
        case 'readwrite':
          mode = 1 | 2;
          break;
      }
      addressConfig.addressConfig = {
        transform: addressElement.getAttribute('transform'),
        mode: mode,
        selector: addressElement.getAttribute('selector'),
        ignoreError: addressElement.getAttribute('ignore-error') === 'true',
        qos: (addressElement.getAttribute('qos') || 0) | 0, // force integer
        retain: addressElement.getAttribute('retain') === 'true',
        variantInfo: addressElement.getAttribute('variant')
      };
      stateConfig[address].push(addressConfig);
    }
    cv.core.notifications.Router.getInstance().registerStateUpdateHandler(stateConfig);
  },

    _onStateUpdate(address, state, initial, changed) {
      const [, id, property] = address.split(":");
      const router = cv.core.notifications.Router.getInstance();
      if (property === 'enabled') {
        router.enableStateUpdateHandler(id, state == 1);
      } else if (property === 'severity') {
        router.changeStateUpdateHandlerSeverity(id, state);
      }
    }
  },

  defer(Clazz) {
    customElements.define(
      cv.ui.structure.tile.Controller.PREFIX + 'state-notification',
      class extends QxConnector {
        constructor() {
          super(Clazz);
        }
      }
    );
  }
});
