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
 * Unit tests for <cv-web> widget
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing the <cv-web> widget of the tile structure', () => {
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

  function createElement(src, proxy, refresh, fullScreen) {
    element = document.createElement('cv-web');
    element.setAttribute('src', src);
    if (proxy !== undefined) {
      element.setAttribute('proxy', proxy);
    }
    if (refresh !== undefined) {
      element.setAttribute('refresh', refresh);
    }
    if (fullScreen === true) {
      element.setAttribute('allow-fullscreen', 'true');
    }
    document.body.appendChild(element);

    // override the observer
    element._instance.setVisible(true);
  }

  it('should create an iframe with the given external URL', () => {
    createElement('https://www.cometvisu.org');
    const iframe = element.querySelector(':scope > iframe');
    expect(iframe).not.toBeNull();
    expect(iframe.getAttribute('src').startsWith('https://www.cometvisu.org/')).toBeTruthy();
  });

  it('should create an iframe with the given absolute URL', () => {
    createElement('/test.html');
    const iframe = element.querySelector(':scope > iframe');
    expect(iframe).not.toBeNull();
    expect(iframe.getAttribute('src').startsWith(window.location.origin + '/test.html')).toBeTruthy();
  });

  it('should create an iframe with the given relative URL', () => {
    createElement('mydir/test.html');
    const iframe = element.querySelector(':scope > iframe');
    expect(iframe).not.toBeNull();
    expect(iframe.getAttribute('src').startsWith(window.location.origin + '/mydir/test.html')).toBeTruthy();
  });

  it('should create an iframe with the given proxied URL', () => {
    createElement('mydir/test.html', true);
    const iframe = element.querySelector(':scope > iframe');
    expect(iframe).not.toBeNull();
    const proxyUrl = new URL(cv.io.rest.Client.getBaseUrl() + '/proxy', window.location.origin);
    proxyUrl.searchParams.set('url', 'mydir/test.html');
    expect(iframe.getAttribute('src').startsWith(proxyUrl.toString())).toBeTruthy();
  });

  it('should set a refresh value', () => {
    createElement('test.html', false, 10);
    expect(element._instance.getRefresh()).toEqual(10);
  });

  it('should set an auth-type for proxied URL', () => {
    element = document.createElement('cv-web');
    element.setAttribute('src', 'test.html');
    element.setAttribute('proxy', 'true');
    element.setAttribute('auth-type', 'basic');
    document.body.appendChild(element);
    // override the observer
    element._instance.setVisible(true);

    const proxyUrl = new URL(cv.io.rest.Client.getBaseUrl() + '/proxy', window.location.origin);
    proxyUrl.searchParams.set('url', 'test.html');
    proxyUrl.searchParams.set('auth-type', 'basic');
    const iframe = element.querySelector(':scope > iframe');
    expect(iframe).not.toBeNull();
    expect(iframe.getAttribute('src').startsWith(proxyUrl.toString())).toBeTruthy();
  });

  it('should create an iframe with option to span it to full screen', () => {
    createElement('https://www.cometvisu.org', false, undefined, true);
    expect(element.hasAttribute('allow-fullscreen')).toBeTruthy();
    const fsButton = element.querySelector(':scope > header button.fullscreen');
    expect(element.hasAttribute('fullscreen')).toBeFalsy();
    fsButton.click();
    expect(element.getAttribute('fullscreen')).toBe('true');
    fsButton.click();
    expect(element.getAttribute('fullscreen')).toBe('false');
  });

});
