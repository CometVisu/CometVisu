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
 * Unit tests for <cv-page> widget
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing the <cv-page> widget of the tile structure', () => {
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

  it('should create a page and toggle its contentVisibility', () => {
    element = document.createElement('cv-page');
    document.body.appendChild(element);

    expect(element.classList.contains('no-content-visibility')).toBeFalsy();
    expect(element.style.contentVisibility).toBe('');
    expect(element.style.display).toBe('');

    const page = element._instance;
    page.setVisibility('visible');
    expect(element.style.contentVisibility).toBe('visible');
    expect(element.style.display).toBe('');
    page.setVisibility('hidden');
    expect(element.style.contentVisibility).toBe('hidden');
    expect(element.style.display).toBe('');
    page.setVisibility('excluded');
    expect(element.style.contentVisibility).toBe('hidden');
    expect(element.style.display).toBe('');
  });

  it('should create a page and toggle its visibility for old browsers', () => {
    spyOn(qx.core.Environment, 'get').and.callFake((key) => {
      if (key === 'browser.name') {
        return 'firefox';
      } else if (key === 'browser.version') {
        return '124.0';
      }
    });

    element = document.createElement('cv-page');
    document.body.appendChild(element);

    expect(element.classList.contains('no-content-visibility')).toBeTruthy();
    expect(element.style.contentVisibility).toBe('');
    expect(element.style.display).toBe('');

    const page = element._instance;
    page.setVisibility('hidden');
    expect(element.style.contentVisibility).toBe('');
    expect(element.style.display).toBe('none');
    page.setVisibility('visible');
    expect(element.style.contentVisibility).toBe('');
    expect(element.style.display).toBe('inline');
    page.setVisibility('excluded');
    expect(element.style.contentVisibility).toBe('');
    expect(element.style.display).toBe('none');
  });

  it('should create a cv-row', () => {
    element = document.createElement('cv-row');
    const template = document.createElement('template');
    template.innerHTML = `<cv-row rowspan="3" colspan="3"></cv-row>`;
    element = template.content.firstChild;
    document.body.appendChild(element);

    expect(element.classList.contains('colspan-3')).toBeTruthy();
    expect(element.classList.contains('rowspan-3')).toBeTruthy();
  });
});

