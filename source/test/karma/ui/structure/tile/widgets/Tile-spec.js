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
 * Unit tests for <cv-tile> widget
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing the <cv-tile> widget of the tile structure', () => {
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

  it('should create a tile', function() {
    element = this.createHTMLElement('cv-tile',{  },'', true);

    expect(element.tagName).toBe('CV-TILE');
    expect(element._instance.isWidget()).toBeFalsy();
    expect(element._instance instanceof cv.ui.structure.tile.widgets.Tile).toBe(true);
  });

  it('should create a tile with background image', function() {
    element = this.createHTMLElement('cv-tile',{
      'background-image': 'test.jpg'
    },'', true);

    expect(element.style.backgroundImage).toBe('url("test.jpg")');
    expect(element.classList.contains('has-bg-image')).toBeTruthy();

    element._instance.resetBackgroundImage();
    expect(element.style.backgroundImage).toBe('');
    expect(element.classList.contains('has-bg-image')).toBeFalsy();
  });

  it('should create a tile with external ref and default target', function() {
    element = this.createHTMLElement('cv-tile',{
      'href': 'https://example.com'
    },'', true);

    spyOn(window, 'open');
    element.click();
    expect(window.open).toHaveBeenCalledWith('https://example.com', '_blank');
  });

  it('should create a tile with external ref and custom target', function() {
    element = this.createHTMLElement('cv-tile',{
      href: 'https://example.com',
      target: '_self'
    },'', true);

    spyOn(window, 'open');
    element.click();
    expect(window.open).toHaveBeenCalledWith('https://example.com', '_self');
  });

  it('should create a tile with a background image from state update', function() {
    element = this.createHTMLElement('cv-tile',{  },'<cv-address transform="raw" target="background-image">Test</cv-address>', true);

    expect(element.style.backgroundImage).toBe('');
    cv.data.Model.getInstance().onUpdate('Test', 'test.jpg');

    expect(element.style.backgroundImage).toBe('url("test.jpg")');
    expect(element.classList.contains('has-bg-image')).toBeTruthy();

    cv.data.Model.getInstance().onUpdate('Test', '');
    expect(element.style.backgroundImage).toBe('');
    expect(element.classList.contains('has-bg-image')).toBeFalsy();
  });

  it('should open a popup in the tile via state update', function() {
    const tileElement = this.createHTMLElement('cv-tile',{  },'<cv-address transform="OH:switch" target="popup">Test</cv-address>', false);
    const widget = document.createElement('cv-widget');
    widget.appendChild(tileElement);
    document.body.appendChild(widget);
    element = widget;

    cv.data.Model.getInstance().onUpdate('Test', 'ON');
    expect(widget.querySelector('button.close')).not.toBeNull();
    expect(widget.classList.contains('popup')).toBeTruthy();

    cv.data.Model.getInstance().onUpdate('Test', 'OFF');
    expect(widget.classList.contains('popup')).toBeFalsy();
  });

  it('should open a popup in the tile via state update on a specific value', function() {
    const tileElement = this.createHTMLElement('cv-tile',{},'<cv-address transform="raw" target="popup" value="open">Test</cv-address>', false);
    const widget = document.createElement('cv-widget');
    widget.appendChild(tileElement);
    document.body.appendChild(widget);
    element = widget;

    cv.data.Model.getInstance().onUpdate('Test', 'other');
    expect(widget.classList.contains('popup')).toBeFalsy();

    cv.data.Model.getInstance().onUpdate('Test', 'open');
    expect(widget.classList.contains('popup')).toBeTruthy();
  });

  it('should open a fullscreen popup in the tile via state update', function() {
    const tileElement = this.createHTMLElement('cv-tile',{  },'<cv-address transform="OH:switch" target="fullscreen-popup">Test</cv-address>', false);
    const widget = document.createElement('cv-widget');
    widget.appendChild(tileElement);
    document.body.appendChild(widget);
    element = widget;

    cv.data.Model.getInstance().onUpdate('Test', 'ON');
    expect(widget.querySelector('button.close')).not.toBeNull();
    expect(widget.classList.contains('popup')).toBeTruthy();
    expect(widget.classList.contains('fullscreen')).toBeTruthy();

    cv.data.Model.getInstance().onUpdate('Test', 'OFF');
    expect(widget.classList.contains('popup')).toBeFalsy();
    expect(widget.classList.contains('fullscreen')).toBeFalsy();
  });

  it('should show an outdated state on a tile', function() {
    element = this.createHTMLElement('cv-tile',{  },'<cv-address transform="OH:datetime" target="last-update:120"">Test</cv-address>', true);

    cv.data.Model.getInstance().onUpdate('Test', new Date().toISOString());
    expect(element.classList.contains('outdated')).toBeFalsy();

    const old = new Date();
    old.setHours(old.getHours() - 2);
    cv.data.Model.getInstance().onUpdate('Test', old.toISOString());
    expect(element.classList.contains('outdated')).toBeTruthy();

    const outdated = element.querySelector('.outdated');
    outdated.click();
    const outdatedValue = element.querySelector('.outdated-value');
    expect(outdatedValue).not.toBeNull();
    expect(outdatedValue.style.display).toBe('');

    outdatedValue.dispatchEvent(new PointerEvent('pointerdown'));
    expect(outdatedValue.style.display).toBe('none');

    const tile = element._instance;
    tile._lastUpdate = '-';
    tile.checkOutdated();
    expect(tile.isOutdated()).toBeTruthy();
    expect(tile.getOutdatedMessage()).toEqual(qx.locale.Manager.tr('Last update: unknown'));

    // tile._lastUpdate = [];
    // tile.checkOutdated();
    // expect(tile.getOutdatedMessage()).toBeNull();
  });


  it('should create a tile with internal popup and title', function() {
    element = this.createHTMLElement('cv-tile',{  },'<label class="title">Popup</label><cv-popup></cv-popup>', true);

    expect(element.classList.contains('has-title')).toBeTruthy();
    const tile = element._instance;
    const popup = element.querySelector('cv-popup');

    tile.open();
    expect(popup.hasAttribute('open')).toBeTruthy();

    tile.close();
    expect(popup.hasAttribute('open')).toBeFalsy();
  });
});

