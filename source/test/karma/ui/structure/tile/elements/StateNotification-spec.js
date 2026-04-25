/*
 * Copyright (c) 2025-2026, Christian Mayer and the CometVisu contributors.
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
 *
 */

/**
 * Unit tests for <cv-state-notification> component
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing the <cv-state-notification> element of the tile structure', () => {
  let oldController;
  let element;

  const addressConfig = {
    transform: 'raw',
    mode: 3,
    selector: null,
    ignoreError: false,
    qos: 0,
    retain: false,
    variantInfo: null
  }
  const baseConfig = {
    target: null,
    severity: null,
    skipInitial: true,
    deletable: true,
    unique: false,
    valueMapping: null,
    addressMapping: null,
    enabled: true,
    condition: '1',
    addressConfig: addressConfig
  };

  beforeEach(() => {
    baseConfig.target = cv.ui.NotificationCenter.getInstance();
    oldController = cv.Application.structureController;
    cv.Application.structureController = cv.ui.structure.tile.Controller.getInstance();
    spyOn(cv.core.notifications.Router.getInstance(), 'registerStateUpdateHandler');
  });

  afterEach(() => {
    cv.Application.structureController = oldController;
    if (element) {
      element.remove();
    }
  });

  function createElement(groupAttributes, condition = '1', templates = '') {
    const template = document.createElement('template');
    if (!groupAttributes) {
      groupAttributes = {};
    }
    let attributesHTML = '';
    for (const key in groupAttributes) {
      attributesHTML += `${key}="${groupAttributes[key]}" `;
    }
    template.innerHTML = `<cv-state-notification ${attributesHTML}>${templates}<cv-condition>${condition}</cv-condition><cv-addresses><cv-address transform="raw">val1</cv-address></cv-addresses></cv-state-notification>`;
    element = template.content.firstChild;
    document.body.appendChild(element);
  }

  it('should register a stateUpdateHandler', () => {
    createElement();
    const router = cv.core.notifications.Router.getInstance();

    expect(router.registerStateUpdateHandler).toHaveBeenCalledOnceWith({
      val1: [baseConfig]
    });
  });

  it('should allow popup target', () => {
    createElement({target: 'popup'});
    const router = cv.core.notifications.Router.getInstance();

    expect(router.registerStateUpdateHandler).toHaveBeenCalledOnceWith({
      val1: [
        Object.assign({}, baseConfig,{
          target: cv.ui.PopupHandler
        })
      ]
    });
  });

  it('should allow speech target', () => {
    createElement({target: 'speech'});
    const router = cv.core.notifications.Router.getInstance();

    expect(router.registerStateUpdateHandler).toHaveBeenCalledOnceWith({
      val1: [
        Object.assign({}, baseConfig,{
          target: cv.core.notifications.SpeechHandler.getInstance()
        })
      ]
    });
  });

  it('should allow toast target', () => {
    createElement({target: 'toast'});
    const router = cv.core.notifications.Router.getInstance();

    expect(router.registerStateUpdateHandler).toHaveBeenCalledOnceWith({
      val1: [
        Object.assign({}, baseConfig,{
          target: cv.ui.ToastManager.getInstance()
        })
      ]
    });
  });

  it('should listen to model updates', () => {
    const model = cv.data.Model.getInstance();
    spyOn(model, 'addUpdateListener');
    spyOn(model, 'onUpdate');
    createElement({
      id: 'test',
      severity: 'high',
      enabled: false
    });

    expect(model.addUpdateListener).toHaveBeenCalledWith('notification:test:enabled', jasmine.any(Function), jasmine.any(Object), 'system');
    expect(model.addUpdateListener).toHaveBeenCalledWith('notification:test:severity', jasmine.any(Function), jasmine.any(Object), 'system');
    expect(model.onUpdate).toHaveBeenCalledWith('notification:test:enabled', false, 'system');
    expect(model.onUpdate).toHaveBeenCalledWith('notification:test:severity', 'high', 'system');
  });

  it('should handle model updates', () => {
    const router = cv.core.notifications.Router.getInstance();
    spyOn(router, 'enableStateUpdateHandler');
    spyOn(router, 'changeStateUpdateHandlerSeverity');
    createElement({
      id: 'test',
      severity: 'high',
      enabled: true
    });

    expect(router.enableStateUpdateHandler).toHaveBeenCalledOnceWith('test', true);
    expect(router.changeStateUpdateHandlerSeverity).toHaveBeenCalledOnceWith('test', 'high');
  });

  it('should handle different attributes', () => {
    createElement({
      name: 'test',
      icon: 'test-icon',
      'icon-classes': 'red blue'
    }, true);

    const router = cv.core.notifications.Router.getInstance();

    expect(router.registerStateUpdateHandler).toHaveBeenCalledOnceWith({
      val1: [
        Object.assign({}, baseConfig,{
          topic: 'cv.state.test',
          icon: 'test-icon',
          iconClasses: 'red blue',
          condition: true
        })
      ]
    });
  });

  it('should handle templates', () => {
    createElement({}, false, '<cv-title-template>test-title</cv-title-template><cv-message-template>test-message</cv-message-template>');

    const router = cv.core.notifications.Router.getInstance();

    expect(router.registerStateUpdateHandler).toHaveBeenCalledOnceWith({
      val1: [
        Object.assign({}, baseConfig,{
          titleTemplate: 'test-title',
          messageTemplate: 'test-message',
          condition: false
        })
      ]
    });
  });
});
