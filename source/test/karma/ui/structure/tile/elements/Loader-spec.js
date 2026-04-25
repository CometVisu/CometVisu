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
 * Unit tests for <cv-loader> component
 *
 * @author Tobias Bräutigam
 * @since 2025
 */
describe('testing the <cv-loader> element of the tile structure', () => {
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

  function createElement(type, src) {
    element = document.createElement('cv-loader');
    spyOn(element, 'appendChild');
    element.setAttribute('src', src);
    element.setAttribute('type', type);
    document.body.appendChild(element);
  }

  it('should load CSS files', () => {
    createElement('css', 'test.css');

    expect(element.appendChild).toHaveBeenCalled();
    const loaderElem = element.appendChild.calls.mostRecent().args[0];
    expect(loaderElem.tagName).toBe('LINK');
    expect(loaderElem.getAttribute('type')).toBe('text/css');
    expect(loaderElem.getAttribute('rel')).toBe('stylesheet');
    expect(loaderElem.getAttribute('href')).toBe('test.css');
  });

  it('should load JS files', () => {
    createElement('js', 'test.js');

    expect(element.appendChild).toHaveBeenCalled();
    const loaderElem = element.appendChild.calls.mostRecent().args[0];
    expect(loaderElem.tagName).toBe('SCRIPT');
    expect(loaderElem.getAttribute('type')).toBe('text/javascript');
    expect(loaderElem.getAttribute('src')).toBe('test.js');
  });

  it('should load template files', done => {
    qx.dev.FakeServer.getInstance().configure([
      {
        method: 'GET',
        url: 'test.xml',
        response: request => {
          request.respond(
            200,
            { 'Content-Type': 'application/xml' },
            '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><templates structure="tile"><template id="test-widget"><cv-tile/></template></templates>'
          );

          const template = document.body.querySelector('template#test-widget');
          expect(template).not.toBeNull();

          qx.dev.FakeServer.getInstance().restore();
          done();
        }
      }
    ]);
    createElement('templates', 'test.xml');
  });

  it('should handle unloadable template files', done => {
    spyOn(cv.core.notifications.Router, 'dispatchMessage');
    qx.dev.FakeServer.getInstance().configure([
      {
        method: 'GET',
        url: 'test.xml',
        response: request => {
          request.respond(
            404,
            {  },
            ''
          );

          expect(cv.core.notifications.Router.dispatchMessage).toHaveBeenCalledWith('cv.error', jasmine.any(Object));

          qx.dev.FakeServer.getInstance().restore();
          done();
        }
      }
    ]);
    createElement('templates', 'test.xml');
  });
});
