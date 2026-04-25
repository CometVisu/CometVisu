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
 * Unit tests for <cv-menu> component
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing the <cv-menu> component of the tile structure', () => {
  let oldController;

  beforeEach(function() {
    oldController = cv.Application.structureController;
    cv.Application.structureController = cv.ui.structure.tile.Controller.getInstance();
    document.body.classList.remove('loading');
    document.body.innerHTML = '<main><cv-page id="first"><cv-page id="inner" class="active"></cv-page></cv-page></main>';
  });

  afterEach(() => {
    cv.Application.structureController = oldController;
    document.body.classList.add('loading');
  });

  it('should create a dock menu', function() {
    const element = this.createTileWidgetWithComponent('cv-menu', { appearance: 'dock' }, '');
    expect(element).not.toBeNull();
    expect(element.tagName).toBe('CV-MENU');
    expect(element._instance instanceof cv.ui.structure.tile.components.Menu).toBe(true);

    const main = document.querySelector('main');
    expect(main.classList.contains('has-dock')).toBe(true);
    element.setAttribute('appearance', 'icons');
    expect(main.classList.contains('has-dock')).toBe(false);
  });

  it('should create a menu with pages model', function() {
    const element = this.createTileWidgetWithComponent('cv-menu', {model: 'pages'}, '');

    qx.event.message.Bus.dispatchByName('setup.dom.append');
    expect(element.querySelectorAll(':scope > ul > li').length).toBe(1);
    expect(element.querySelectorAll(':scope > ul > li li').length).toBe(1);

    // open menu on click
    const ham = element.querySelector(':scope > a.menu');
    expect(ham).not.toBeNull();
    ham.click();
    expect(element.classList.contains('responsive')).toBe(true);

    spyOn(qx.event.Timer, 'once').and.callFake((callback, context, timeout) => {
      callback.call(context);
    });
    // close on click outside
    document.body.dispatchEvent(new PointerEvent('pointerdown', {
      bubbles: true,
      target: document.body
    }));

    expect(element.classList.contains('responsive')).toBe(false);
  });

  it('should remove global close listeners when the hamburger menu is toggled closed', function() {
    const element = this.createTileWidgetWithComponent('cv-menu', {model: 'pages'}, '');
    qx.event.message.Bus.dispatchByName('setup.dom.append');

    const ham = element.querySelector(':scope > a.menu');
    ham.click();
    expect(element.classList.contains('responsive')).toBe(true);

    ham.click();
    expect(element.classList.contains('responsive')).toBe(false);

    spyOn(qx.event.Timer, 'once');
    document.body.dispatchEvent(new PointerEvent('pointerdown', {
      bubbles: true,
      target: document.body
    }));

    expect(qx.event.Timer.once).not.toHaveBeenCalled();
  });

  it('should create a menu with menu-item model, icons-only', function() {
    const element = this.createTileWidgetWithComponent('cv-menu', {
      model: 'menuItems',
      'show-labels': 'false'
      },
      '<cv-menu-item name="Item 1" icon="ri-star-line"></cv-menu-item><cv-menu-item name="Item 2" icon="ri-volume-mute-line"></cv-menu-item>');

    qx.event.message.Bus.dispatchByName('setup.dom.append');
    expect(element.querySelectorAll(':scope > ul > li').length).toBe(2);
    const firstMenuItem = element.querySelector(':scope > cv-menu-item:first-child');

    // check that the labels are not visible
    expect( element.querySelector(':scope > ul > li:first-child').textContent).toBe('');
    element._instance.setShowLabels(true);

    const first = element.querySelector(':scope > ul > li:first-child');
    expect(first.textContent).toBe('Item 1');
    spyOn(firstMenuItem._instance, 'onClick');
    first.click();
    expect(firstMenuItem._instance.onClick).toHaveBeenCalled();

    // open menu on click
    element.click();
    expect(element.classList.contains('open')).toBe(true);

    spyOn(qx.event.Timer, 'once').and.callFake((callback, context, timeout) => {
      callback.call(context);
    });
    // close on click outside
    document.body.dispatchEvent(new PointerEvent('pointerdown', {bubbles: true, target: document.body}));
    expect(element.classList.contains('open')).toBe(false);
  });

  it('should create a menu for a multi-level pages model', function() {
    document.body.innerHTML = '<main>' +
      '<cv-page id="p1" name="p1"><span></span>' +
      '   <cv-page id="p1_1" name="p1_1"><span></span></cv-page>' +
      '   <cv-page id="p1_2" menu="false"></cv-page>' +
      '   <cv-page id="p1_3"  name="p1_3" icon="test"><span></span>' +
      '     <cv-page id="p1_3_1"  name="p1_3_1"><span></span></cv-page>' +
      '   </cv-page> ' +
      '</cv-page>' +
    '</main>';

    const element = this.createTileWidgetWithComponent('cv-menu', {model: 'pages'}, '');
    qx.event.message.Bus.dispatchByName('setup.dom.append');

    expect(element.querySelector(':scope > ul li a[data-page-id="p1_1"]')).not.toBeNull();
    // 1_2 should not be in the menu
    expect(element.querySelector(':scope > ul li a[data-page-id="p1_2"]')).toBeNull();
    expect(element.querySelector(':scope > ul li a[data-page-id="p1_3"]')).not.toBeNull();
    expect(element.querySelector(':scope > ul li a[data-page-id="p1_3_1"]')).not.toBeNull();

    // check active states
    let currentPage = 'p1_1';
    cv.Application.structureController.scrollToPage(currentPage, true);
    expect(element.querySelector(':scope > ul li.active')).not.toBeNull();
    expect(element.querySelector(':scope > ul li.active a').getAttribute('data-page-id')).toBe(currentPage);
    expect(element.querySelectorAll(':scope > ul li.sub-active').length).toBe(1);
    expect(element.querySelector(':scope > ul li:first-child').classList.contains('sub-active')).toBe(true);

    currentPage = 'p1_3_1';
    cv.Application.structureController.scrollToPage(currentPage, true);
    expect(element.querySelector(':scope > ul li.active > a').getAttribute('data-page-id')).toBe(currentPage);
    expect(element.querySelectorAll(':scope > ul li.sub-active').length).toBe(2);
    expect(element.querySelector(':scope > ul li.sub-active a[data-page-id="p1"]')).not.toBeNull();
    expect(element.querySelector(':scope > ul li.sub-active a[data-page-id="p1_3"]')).not.toBeNull();

    // open page from menu item
    currentPage = 'p1';
    element.querySelector(':scope > ul > li a[data-page-id="p1"]').click();
    expect(element.querySelector(':scope > ul li.active a').getAttribute('data-page-id')).toBe(currentPage);
    expect(element.querySelectorAll(':scope > ul li.sub-active').length).toBe(0);

    // open details
    const exp = element.querySelector(':scope > ul i.expander');
    const details = exp.parentElement.parentElement;
    exp.click();
    expect(details.hasAttribute('open')).toBe(true);
    exp.click();
    expect(details.hasAttribute('open')).toBe(false);

    // reduce menu depth
    element.setAttribute('depth', '1');
    expect(element.querySelector(':scope > ul li.sub-active a[data-page-id="p1_3_1"]')).toBeNull();
  });

  it('should navigate via swipe gestures', async function() {
    document.body.innerHTML = '<main>' +
      '<cv-page id="p1" name="p1">' +
      '   <cv-page id="p1_1"><span></span></cv-page>' +
      '   <cv-page id="p1_2"><span></span></cv-page>' +
      '   <cv-page id="p1_3"><span></span></cv-page> ' +
      '</cv-page>' +
      '</main>';

    const element = this.createTileWidgetWithComponent('cv-menu', {model: 'pages'}, '');
    qx.event.message.Bus.dispatchByName('setup.dom.append');
    let currentPage = 'p1_1';
    cv.Application.structureController.scrollToPage(currentPage, true);

    const left = jasmine.createSpyObj('qx.event.type.Swipe', {
      getDirection: 'left'
    });
    const right = jasmine.createSpyObj('qx.event.type.Swipe', {
      getDirection: 'right'
    });

    const doSwipe = async (swipe) => {
      return new Promise((resolve) => {
        qx.bom.History.getInstance().addListenerOnce('request', () => {
          resolve();
        });
        // some swipes to not trigger a change, just resolve after some time
        setTimeout(() => resolve(), 100);
        element._instance._onSwipe(swipe);
      });
    };

    expect(element.querySelector(':scope > ul li.active a').getAttribute('data-page-id')).toBe('p1_1');
    await doSwipe(left);
    expect(element.querySelector(':scope > ul li.active a').getAttribute('data-page-id')).toBe('p1_2');
    await doSwipe(left);
    expect(element.querySelector(':scope > ul li.active a').getAttribute('data-page-id')).toBe('p1_3');
    await doSwipe(left);
    expect(element.querySelector(':scope > ul li.active a').getAttribute('data-page-id')).toBe('p1_3');
    await doSwipe(right);
    expect(element.querySelector(':scope > ul li.active a').getAttribute('data-page-id')).toBe('p1_2');
    await doSwipe(right);
    expect(element.querySelector(':scope > ul li.active a').getAttribute('data-page-id')).toBe('p1_1');
    await doSwipe(right);
    expect(element.querySelector(':scope > ul li.active a').getAttribute('data-page-id')).toBe('p1_1');
  });
});
