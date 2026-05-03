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
 * Unit tests for <cv-group> widget
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing the <cv-group> widget of the tile structure', () => {
  let oldController;
  let oldTestMode;
  let element;

  beforeEach(() => {
    oldController = cv.Application.structureController;
    oldTestMode = cv.Config.testMode;
    cv.Application.structureController = cv.ui.structure.tile.Controller.getInstance();
  });

  afterEach(() => {
    cv.Application.structureController = oldController;
    cv.Config.testMode = oldTestMode;
    if (element) {
      element.remove();
    }
  });

  it('should create a group with a name', function() {
    element = this.createHTMLElement('cv-group', { name: 'Test' }, '', true);

    expect(element._instance instanceof cv.ui.structure.tile.widgets.Group).toBe(true);

    expect(element.tagName).toBe('CV-GROUP');
    expect(element.classList.contains('empty')).toBeTruthy();
    const title = element.querySelector('summary > label.title');

    expect(title).not.toBeNull();
    expect(title.textContent).toBe('Test');
    expect(title.classList.contains('last-of-title')).toBeTruthy();
  });

  it('should create a group with a name when the summary already exists', function() {
    element = this.createHTMLElement('cv-group', { name: 'Test' }, '<summary><label class="title">Old Name</label></summary>', true);

    expect(element.tagName).toBe('CV-GROUP');
    expect(element.classList.contains('empty')).toBeTruthy();
    const title = element.querySelector('summary > label.title');

    expect(title).not.toBeNull();
    expect(title.textContent).toBe('Test');
    expect(title.classList.contains('last-of-title')).toBeTruthy();
  });

  it('should create a group with an icon', function() {
    element = this.createHTMLElement('cv-group', { icon: 'test' }, '', true);

    expect(element.tagName).toBe('CV-GROUP');
    expect(element.classList.contains('empty')).toBeTruthy();
    const title = element.querySelector('summary > cv-icon.title');

    expect(title).not.toBeNull();
    expect(title.classList.contains('test')).toBeTruthy();
    expect(title.classList.contains('last-of-title')).toBeTruthy();
  });

  it('should create a group with an icon when the summary already exists', function() {
    element = this.createHTMLElement('cv-group', { icon: 'test' }, '<summary><cv-icon class="title old-icon"></cv-icon></summary>', true);

    expect(element.tagName).toBe('CV-GROUP');
    expect(element.classList.contains('empty')).toBeTruthy();
    const title = element.querySelector('summary > cv-icon.title');

    expect(title).not.toBeNull();
    expect(title.classList.contains('test')).toBeTruthy();
    expect(title.classList.contains('last-of-title')).toBeTruthy();
  });

  it('should create a group without summary', function() {
    element = this.createHTMLElement('cv-group', {  }, '', true);

    expect(element.tagName).toBe('CV-GROUP');
    expect(element.classList.contains('empty')).toBeTruthy();
    const summary = element.querySelector('summary');

    expect(summary).toBeNull();
  });

  it('should create a group with an title and an icon', function()  {
    element = this.createHTMLElement('cv-group', { name: 'Test', icon: 'test' }, '', true);

    expect(element.tagName).toBe('CV-GROUP');
    expect(element.classList.contains('empty')).toBeTruthy();
    const title = element.querySelector('summary > label.title');
    const icon = element.querySelector('summary > cv-icon.title');

    expect(title).not.toBeNull();
    expect(icon).not.toBeNull();

    expect(title.classList.contains('last-of-title')).toBeTruthy();
    expect(icon.classList.contains('last-of-title')).toBeFalsy();
  });

  it('should create a group with content that opens on click', function()  {
    element = this.createHTMLElement('cv-group', { name: 'Test' }, '<div>Content</div>', true);

    expect(element.tagName).toBe('CV-GROUP');
    expect(element.classList.contains('empty')).toBeFalsy();
    const summary = element.querySelector('summary');

    expect(element.hasAttribute('open')).toBeFalsy();
    summary.click();

    expect(element.hasAttribute('open')).toBeTruthy();
    summary.click();

    expect(element.hasAttribute('open')).toBeFalsy();
  });

  it('should create a value', function() {
    element = this.createHTMLElement('cv-group', { name: 'Test' }, '<cv-address transform="raw" target="summary">Test</cv-address>', true);

    expect(element.tagName).toBe('CV-GROUP');
    expect(element.classList.contains('empty')).toBeFalsy();

    expect(element.querySelector('summary > label.value')).toBeNull();
    cv.data.Model.getInstance().onUpdate('Test', 'Hello summary');
    const valueElem = element.querySelector('summary > label.value');

    expect(valueElem).not.toBeNull();
    expect(valueElem.textContent).toEqual('Hello summary');
  });

  it('should create a value in the summary', function() {
    element = this.createHTMLElement('cv-group', { name: 'Test' }, '<summary><label class="value">Old value</label></summary><cv-address transform="raw" target="summary">Test</cv-address>', true);

    expect(element.tagName).toBe('CV-GROUP');
    expect(element.classList.contains('empty')).toBeFalsy();

    const valueElem = element.querySelector('summary > label.value');
    cv.data.Model.getInstance().onUpdate('Test', 'Hello summary');

    expect(valueElem.textContent).toEqual('Hello summary');
  });

  it('should restore the summary value when the page gets activated later', function() {
    cv.Config.testMode = false;
    cv.data.Model.getInstance().onUpdate('Test', 'Hello summary');

    const page = document.createElement('cv-page');
    element = document.createElement('cv-group');
    element.setAttribute('name', 'Test');
    element.innerHTML = '<cv-address transform="raw" target="summary">Test</cv-address>';
    page.appendChild(element);
    document.body.appendChild(page);

    expect(element.querySelector('summary > label.value')).toBeNull();

    page.classList.add('active');
    qx.event.message.Bus.dispatchByName('cv.ui.structure.tile.currentPage', page);

    const valueElem = element.querySelector('summary > label.value');

    expect(valueElem).not.toBeNull();
    expect(valueElem.textContent).toBe('Hello summary');
  });
});

