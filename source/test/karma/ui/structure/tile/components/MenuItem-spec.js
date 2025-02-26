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
 * Unit tests for <cv-menu-item> component
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing the <cv-menu-item> component of the tile structure', () => {
  let oldController;

  beforeEach(function() {
    oldController = cv.Application.structureController;
    cv.Application.structureController = cv.ui.structure.tile.Controller.getInstance();
    document.body.classList.remove('loading');
    document.body.innerHTML = '';
  });

  afterEach(() => {
    cv.Application.structureController = oldController;
    document.body.classList.add('loading');
  });

  it('should create a default menu-item', function() {
    const element = this.createTileWidgetWithComponent('cv-menu-item', {}, '');
    expect(element).toBeDefined();
    expect(element.tagName).toBe('CV-MENU-ITEM');
    expect(element._instance instanceof cv.ui.structure.tile.components.MenuItem).toBe(true);
  });

  it('should create a menu-item that toggles a state', function() {
    const element = this.createTileWidgetWithComponent('cv-menu-item', {
      action: 'toggleState'
    }, '<cv-address mode="read">a1</cv-address><cv-address mode="write">a2</cv-address>');
    const writeAddress = element.querySelector('cv-address[mode="write"]');
    const readAddress = element.querySelector('cv-address[mode="read"]');
    cv.data.Model.getInstance().onUpdate('a1', '1');

    spyOn(writeAddress, 'dispatchEvent');

    // this is done in cv.ui.structure.tile.components.Menu but we need to do it here
    element.addEventListener('click', event => {
      element._instance.onClick(event);
    });
    element.click();
    let ev = writeAddress.dispatchEvent.calls.mostRecent().args[0];

    expect(ev.detail).toEqual({
      value: false,
      source: element._instance
    });

    readAddress.setAttribute('value', 'yes');
    cv.data.Model.getInstance().onUpdate('a1', '0');
    writeAddress.dispatchEvent.calls.reset();

    // current state is false (1 != yes), click should send true
    element.click();
    ev = writeAddress.dispatchEvent.calls.mostRecent().args[0];

    expect(ev.detail).toEqual({
      value: true,
      source: element._instance
    });

    cv.data.Model.getInstance().onUpdate('a1', 'yes');
    writeAddress.dispatchEvent.calls.reset();

    // current state is false (yes == yes), click should send false
    element.click();
    ev = writeAddress.dispatchEvent.calls.mostRecent().args[0];

    expect(ev.detail).toEqual({
      value: false,
      source: element._instance
    });

  });

  it('should create a menu-item that opens a popup', function() {
    const element = this.createTileWidgetWithComponent('cv-menu-item', {
      action: 'popup'
    }, '<cv-popup></cv-popup>');
    const popup = element.querySelector('cv-popup');
    spyOn(popup._instance, 'open');

    // this is done in cv.ui.structure.tile.components.Menu but we need to do it here
    element.addEventListener('click', event => {
      element._instance.onClick(event);
    });
    element.click();

    expect(popup._instance.open).toHaveBeenCalled();
  });
});
