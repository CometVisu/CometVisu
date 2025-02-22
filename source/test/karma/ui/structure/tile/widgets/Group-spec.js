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
 * Unit tests for <cv-group> widget
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing the <cv-group> widget of the tile structure', () => {
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

  function createElement(attributes, content) {
    const template = document.createElement('template');
    let attributesHTML = '';
    for (const key in attributes) {
      attributesHTML += `${key}="${attributes[key]}" `;
    }
    template.innerHTML = `<cv-group ${attributesHTML}>${content}</cv-group>`;
    element = template.content.firstChild;
    document.body.appendChild(element);

  }

  it('should create a group with a name', () => {
    createElement({ name: 'Test' },'');

    expect(element.tagName).toBe('CV-GROUP');
    expect(element.classList.contains('empty')).toBeTruthy();
    const title = element.querySelector('summary > label.title');
    expect(title).not.toBeNull();
    expect(title.textContent).toBe('Test');
    expect(title.classList.contains('last-of-title')).toBeTruthy();
  });

  it('should create a group with a name when the summary already exists', () => {
    createElement({ name: 'Test' },'<summary><label class="title">Old Name</label></summary>');

    expect(element.tagName).toBe('CV-GROUP');
    expect(element.classList.contains('empty')).toBeTruthy();
    const title = element.querySelector('summary > label.title');
    expect(title).not.toBeNull();
    expect(title.textContent).toBe('Test');
    expect(title.classList.contains('last-of-title')).toBeTruthy();
  });

  it('should create a group with an icon', () => {
    createElement({ icon: 'test' },'');

    expect(element.tagName).toBe('CV-GROUP');
    expect(element.classList.contains('empty')).toBeTruthy();
    const title = element.querySelector('summary > cv-icon.title');
    expect(title).not.toBeNull();
    expect(title.classList.contains('test')).toBeTruthy();
    expect(title.classList.contains('last-of-title')).toBeTruthy();
  });

  it('should create a group with an icon when the summary already exists', () => {
    createElement({ icon: 'test' },'<summary><cv-icon class="title old-icon"></cv-icon></summary>');

    expect(element.tagName).toBe('CV-GROUP');
    expect(element.classList.contains('empty')).toBeTruthy();
    const title = element.querySelector('summary > cv-icon.title');
    expect(title).not.toBeNull();
    expect(title.classList.contains('test')).toBeTruthy();
    expect(title.classList.contains('last-of-title')).toBeTruthy();
  });

  it('should create a group without summary', () => {
    createElement({},'');

    expect(element.tagName).toBe('CV-GROUP');
    expect(element.classList.contains('empty')).toBeTruthy();
    const summary = element.querySelector('summary');
    expect(summary).toBeNull();
  });

  it('should create a group with an title and an icon', () => {
    createElement({ name: 'Test', icon: 'test' },'');

    expect(element.tagName).toBe('CV-GROUP');
    expect(element.classList.contains('empty')).toBeTruthy();
    const title = element.querySelector('summary > label.title');
    const icon = element.querySelector('summary > cv-icon.title');
    expect(title).not.toBeNull();
    expect(icon).not.toBeNull();

    expect(title.classList.contains('last-of-title')).toBeTruthy();
    expect(icon.classList.contains('last-of-title')).toBeFalsy();
  });

  it('should create a group with content that opens on click', () => {
    createElement({ name: 'Test' },'<div>Content</div>');

    expect(element.tagName).toBe('CV-GROUP');
    expect(element.classList.contains('empty')).toBeFalsy();
    const summary = element.querySelector('summary');

    expect(element.hasAttribute('open')).toBeFalsy();
    summary.click();
    expect(element.hasAttribute('open')).toBeTruthy();
    summary.click();
    expect(element.hasAttribute('open')).toBeFalsy();
  });

  it('should create a value in the summary', () => {
    createElement({ name: 'Test' },'<cv-address transform="raw" target="summary">Test</cv-address>');

    expect(element.tagName).toBe('CV-GROUP');
    expect(element.classList.contains('empty')).toBeFalsy();

    expect(element.querySelector('summary > label.value')).toBeNull();
    cv.data.Model.getInstance().onUpdate('Test', 'Hello summary');
    const valueElem = element.querySelector('summary > label.value');
    expect(valueElem).not.toBeNull();
    expect(valueElem.textContent).toEqual('Hello summary');
  });

  it('should create a value in the summary', () => {
    createElement({ name: 'Test' },'<summary><label class="value">Old value</label></summary><cv-address transform="raw" target="summary">Test</cv-address>');

    expect(element.tagName).toBe('CV-GROUP');
    expect(element.classList.contains('empty')).toBeFalsy();

    const valueElem = element.querySelector('summary > label.value');
    cv.data.Model.getInstance().onUpdate('Test', 'Hello summary');
    expect(valueElem.textContent).toEqual('Hello summary');
  });
});

