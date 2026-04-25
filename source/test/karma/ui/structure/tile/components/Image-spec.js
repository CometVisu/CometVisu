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
 * Unit tests for <cv-image> component
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing the <cv-image> component of the tile structure', () => {
  let oldController;

  beforeEach(function() {
    oldController = cv.Application.structureController;
    cv.Application.structureController = cv.ui.structure.tile.Controller.getInstance();
    document.body.classList.remove('loading');
    document.body.innerHTML = '';

    qx.dev.FakeServer.getInstance().configure([
      {
        method: 'get',
        url: /.*Test.svg.*/,
        response: [
          200,
            { 'Content-Type': 'image/svg+xml' },
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><svg></svg>'
          ]
      }
    ]);
  });

  afterEach(() => {
    cv.Application.structureController = oldController;
    document.body.classList.add('loading');
    qx.dev.FakeServer.getInstance().restore();
  });

  it('should create a default image', function() {
    const element = this.createTileWidgetWithComponent('cv-image', {src: 'Test.svg'}, '');
    expect(element).not.toBeNull();
    expect(element.tagName).toBe('CV-IMAGE');
    expect(element._instance instanceof cv.ui.structure.tile.components.Image).toBe(true);
    const baseUrl = window.location.origin + '/';

    expect(element.querySelector(':scope > img').getAttribute('src')).toBe(baseUrl + 'Test.svg');
    element.click();
    expect(element.querySelector(':scope > img').getAttribute('src').startsWith(baseUrl + 'Test.svg?r=')).toBe(true);
  });

  it('should create a proxied image', function() {
    const element = this.createTileWidgetWithComponent('cv-image', {
      src: 'Test.svg',
      proxy: true
    }, '');

    const url = new URL(cv.io.rest.Client.getBaseUrl() + '/proxy', window.location.origin);
    url.searchParams.set('url', 'Test.svg');
    expect(element.querySelector(':scope > img').getAttribute('src')).toBe(url.toString());
  });

  it('should create a refreshing image', function() {
    const element = this.createTileWidgetWithComponent('cv-image', {
      src: 'Test.svg',
      refresh: '60'
    }, '<cv-address mode="read" target="refresh">Test</cv-address>');

    expect(element._instance.getRefresh()).toBe(60);

    const baseUrl = window.location.origin + '/';
    let src = element.querySelector(':scope > img').getAttribute('src');
    expect(src).toBe(baseUrl + 'Test.svg');

    spyOn(element._instance, '_loadImage').and.callThrough();
    cv.data.Model.getInstance().onUpdate('Test', '1');
    expect(element._instance._loadImage).toHaveBeenCalled();
    expect(element.querySelector(':scope > img').getAttribute('src')).not.toBe(src);
  });

  it('should create a image with basic auth', function(done) {
    let element;
    const url = new URL(cv.io.rest.Client.getBaseUrl() + '/proxy', window.location.origin);
    url.searchParams.set('url', 'Test.svg');

    qx.dev.FakeServer.getInstance().restore();
    qx.dev.FakeServer.getInstance().configure([{
      method: 'get',
      url: /.*Test.svg/,
      response: function(request) {
        request.respond(200, { 'Content-Type': 'image/svg+xml' },
          '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><svg></svg>');

        expect(element.querySelector(':scope > img').getAttribute('src').startsWith('blob:')).toBe(true);
        expect(request.requestHeaders.Authorization).toBe('Basic ' + window.btoa('test:pw'));

        done();
      }
    }]);

    element = this.createTileWidgetWithComponent('cv-image', {
      src: 'Test.svg',
      'auth-type': 'basic',
      username: 'test',
      password: 'pw'
    }, '');

  });

  it('should create a image with bearer auth', function(done) {
    let element;
    const url = new URL(cv.io.rest.Client.getBaseUrl() + '/proxy', window.location.origin);
    url.searchParams.set('url', 'Test.svg');

    qx.dev.FakeServer.getInstance().restore();
    qx.dev.FakeServer.getInstance().configure([{
      method: 'get',
      url: /.*Test.svg/,
      response: function(request) {
        request.respond(200, { 'Content-Type': 'image/svg+xml' },
          '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><svg></svg>');

        expect(element.querySelector(':scope > img').getAttribute('src').startsWith('blob:')).toBe(true);
        expect(request.requestHeaders.Authorization).toBe('Bearer token');

        done();
      }
    }]);

    element = this.createTileWidgetWithComponent('cv-image', {
      src: 'Test.svg',
      'auth-type': 'bearer',
      username: 'token'
    }, '');

  });

  it('should create a proxied image with basic auth', function() {
    const element = this.createTileWidgetWithComponent('cv-image', {
      src: 'Test.svg',
      proxy: true,
      'auth-type': 'basic'
    }, '');

    const url = new URL(cv.io.rest.Client.getBaseUrl() + '/proxy', window.location.origin);
    url.searchParams.set('url', 'Test.svg');
    url.searchParams.set('auth-type', 'basic');

    expect(element.querySelector(':scope > img').getAttribute('src')).toBe(url.toString());

  });
});
