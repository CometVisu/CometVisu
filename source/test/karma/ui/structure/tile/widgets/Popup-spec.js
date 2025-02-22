/*
 * Copyright (c) 2025, Christian Mayer and the CometVisu contributors.
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
/*
 * Copyright (c) 2025, Christian Mayer and the CometVisu contributors.
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
 * Unit tests for <cv-popup> widget
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing the <cv-popup> widget of the tile structure', () => {
  let oldController;
  let element;

  beforeEach(() => {
    oldController = cv.Application.structureController;
    cv.Application.structureController = cv.ui.structure.tile.Controller.getInstance();
  });

  afterEach(() => {
    cv.Application.structureController = oldController;
    if (element) {
      element.remove();
    }
  });

  it('should create a default popup', function() {
    element = this.createHTMLElement('cv-popup', {}, '', true);
    expect(element.tagName).toBe('CV-POPUP');
    expect(element.querySelector('header')).toBeNull();

    element._instance.open();
    expect(element.hasAttribute('open')).toBeTruthy();

    const closeButton = element.querySelector('button.close');
    closeButton.click();
    expect(element.hasAttribute('open')).toBeFalsy();
  });

  it('should create a modal popup with title and auto-close', function(done) {
    element = this.createHTMLElement('cv-popup', {
      title: 'Test',
      modal: true,
      closeable: false,
      "auto-close-timeout": 0.001
    }, '', true);

    expect(element.querySelector('button.close')).toBeNull();

    const popup = element._instance;
    spyOn(popup, 'registerModalPopup');
    spyOn(popup, 'unregisterModalPopup');
    expect(popup.registerModalPopup).not.toHaveBeenCalled();
    expect(popup.unregisterModalPopup).not.toHaveBeenCalled();

    // check title
    const header = element.querySelector('header > h2');
    expect(header).not.toBeNull();
    expect(header.textContent).toBe('Test');

    popup.open();
    expect(popup.registerModalPopup).toHaveBeenCalled();
    expect(element.hasAttribute('open')).toBeTruthy();

    setTimeout(() => {
      expect(popup.unregisterModalPopup).toHaveBeenCalled();
      expect(element.hasAttribute('open')).toBeFalsy();
      done();
    }, 10);

  });

  it('should open/close via state update', function() {
    element = this.createHTMLElement('cv-popup', {}, '<cv-address transform="OH:switch" target="open-close">popup</cv-address>', true);

    const model = cv.data.Model.getInstance();
    model.onUpdate('popup', 'ON');
    expect(element.hasAttribute('open')).toBeTruthy();

    model.onUpdate('popup', 'OFF');
    expect(element.hasAttribute('open')).toBeFalsy();
  });

  it('should open via state update', function() {
    element = this.createHTMLElement('cv-popup', {}, '<cv-address transform="OH:switch" target="open">popup</cv-address>', true);

    const model = cv.data.Model.getInstance();
    model.onUpdate('popup', 'OFF');
    expect(element.hasAttribute('open')).toBeFalsy();

    model.onUpdate('popup', 'ON');
    expect(element.hasAttribute('open')).toBeTruthy();
  });

  it('should open on fixed state value', function() {
    element = this.createHTMLElement('cv-popup', {}, '<cv-address transform="raw" target="open" value="yes">popup</cv-address>', true);

    const model = cv.data.Model.getInstance();
    model.onUpdate('popup', 'no');
    expect(element.hasAttribute('open')).toBeFalsy();

    model.onUpdate('popup', 'yes');
    expect(element.hasAttribute('open')).toBeTruthy();
  });

  it('should close via state update', function() {
    element = this.createHTMLElement('cv-popup', {}, '<cv-address transform="OH:switch" target="close">popup</cv-address>', true);

    const model = cv.data.Model.getInstance();
    element._instance.open();

    // do not close when state is not transformed to false
    model.onUpdate('popup', 'ON');
    expect(element.hasAttribute('open')).toBeTruthy();

    model.onUpdate('popup', 'OFF');
    expect(element.hasAttribute('open')).toBeFalsy();
  });

});

